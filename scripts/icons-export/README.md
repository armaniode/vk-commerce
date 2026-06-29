# Icons export pipeline

Скрипты массового переэкспорта SVG-иконок из Figma-файла `04_Carnica-icons` в TSX-компоненты репо.

## Зачем это

До 2026-05-13 иконки в `src/carnica/icons/` собирались через `get_design_context → WebFetch SVG`, что для сложных иконок давало артефакты pathData (`IconEyeClose` имела отрицательные координаты, `IconTrash`/`IconCheckShield` — сдвиги ~0.2 единиц от Figma эталона). Этот pipeline даёт **bit-exact** экспорт через `node.exportAsync({format:'SVG_STRING'})` Figma Plugin API.

## Файлы

```
scripts/icons-export/
├── manifest.json          # 181 COMPONENT_SET с вариантами (source of truth Figma)
├── mapping.json           # Сопоставление figma name+variant → TSX name + category (350 entries)
├── unmatched.json         # Что не сошлось (14 dup-32×32 файлов — skip)
├── batches.json           # Разбиение mapping на батчи для use_figma (~18/batch)
├── reconcile.mjs          # Строит mapping.json/unmatched.json из manifest.json
├── prepare-batches.mjs    # Разбивает mapping на батчи
├── save-batch.mjs         # Принимает массив SVG (stdin или tmp/batch-N-a/b.json) → src/carnica/icons-raw/
├── build-tsx.mjs          # SVG → TSX + регенерация index.ts всех категорий
├── make-preview.mjs       # QA-preview: старый TSX (git HEAD) vs новый TSX
├── tmp/                   # Промежуточные SVG-результаты use_figma (gitignored)
└── figma-screenshots/     # Screenshots с Figma для визуального сравнения
```

## Pipeline

### 1. Discovery (только при добавлении новых иконок или ребрендинге Figma)

Получить актуальный manifest всех `COMPONENT_SET` со страницы `icons`:

```js
// через mcp__claude_ai_Figma__use_figma, fileKey="TZDe0XXSr5W5idW3JndD0e"
const iconsPage = figma.root.children.find(p => p.name === "icons");
await figma.setCurrentPageAsync(iconsPage);
const sets = iconsPage.findAllWithCriteria({ types: ["COMPONENT_SET"] });
return sets.map(s => [s.name, s.children.map(v => [v.name, v.id])]);
```

Сохранить результат в `manifest.json` в текущем формате.

### 2. Reconciliation

```bash
node scripts/icons-export/reconcile.mjs
```

Создаёт `mapping.json` (350 пар figma_set+variant → TSX_name + category) и `unmatched.json`. При несовпадениях в `OVERRIDES`/`SET_OVERRIDES`/`NEW_ICON_CATEGORIES` — добавь записи в `reconcile.mjs`.

### 3. Batching

```bash
node scripts/icons-export/prepare-batches.mjs 18
```

Делит на 20 батчей × 18. Если `use_figma` упирается в 20KB output лимит — уменьши до 9 (или сплитуй каждый батч на a/b через 2 use_figma вызова).

### 4. Mass export (batch-by-batch)

Для каждого batchIdx (0...N-1):

```bash
# 1. Получить IDs из batches.json
node -e "console.log(JSON.stringify(require('./scripts/icons-export/batches.json').batches[<N>].items.map(i => i.id)))"
```

Затем вызвать `mcp__claude_ai_Figma__use_figma` с:

```js
const iconsPage = figma.root.children.find(p => p.name === "icons");
await figma.setCurrentPageAsync(iconsPage);
const ids = [/* IDs из шага 1 */];
const out = [];
for (const id of ids) {
  const n = figma.getNodeById(id);
  out.push(n ? await n.exportAsync({ format: "SVG_STRING" }) : null);
}
return out;
```

Результат записать в `tmp/batch-<N>.json` (массив SVG-строк), затем:

```bash
node scripts/icons-export/save-batch.mjs <N>
```

Скрипт читает `tmp/batch-<N>-a.json` + `tmp/batch-<N>-b.json` (split) или stdin, сохраняет SVG в `src/carnica/icons-raw/<TsxName>.svg`.

### 5. TSX generation

```bash
node scripts/icons-export/build-tsx.mjs
```

Из каждого `icons-raw/<TsxName>.svg` строит `src/carnica/icons/<category>/<TsxName>.tsx`:
- Убирает `<g transform>` обёртку
- Заменяет hex fills на `currentColor` (оставляет `fill="none"`)
- JSX-ifies атрибуты (`fill-rule` → `fillRule`)
- Регенерирует `index.ts` в каждой категории с сортированными экспортами

### 6. QA

```bash
node scripts/icons-export/make-preview.mjs
open scripts/icons-export/preview-qa.html
```

Side-by-side сравнение старых (из `git HEAD`) и новых TSX для 12 выборочных иконок.

## Особенности и подводные камни

- **Имена в Figma могут быть с пробелами / разным casing** (`check round`, `Face ID`, `eye_close`). Reconcile нормализует через `slugify` + `toPascal`. Опечатки сохранены as-is в репо (`compas`, `lable` → `IconLabel`).
- **Variant axes** не только `style=`: есть `Fill=`, `direction=`, `type=`. Обрабатывается через `variantSuffix()` + `FULL_OVERRIDES` (для direction-based — каждое направление = свой TSX).
- **Дубликаты имён** в Figma (`settings` ×2, `Mic` ×2, `pdf`/`doc`/... — 24×24 и 32×32 версии) маркируются `_duplicate: true` в `manifest.json`; 32×32 file-варианты намеренно пропускаются (нет TSX-пары).
- **`use_figma` 20KB лимит**: 18 SVG = ~27KB, не помещается. Спасают split a/b (по 9 IDs за вызов) — `save-batch.mjs` поддерживает оба формата.
- **`exportAsync` атомарный**: если упало — данные не записываются, retry безопасен.
- **IconInfinite** — единственный standalone COMPONENT (не SET) в Figma, добавлен в manifest вручную как `_standalone:true`.
