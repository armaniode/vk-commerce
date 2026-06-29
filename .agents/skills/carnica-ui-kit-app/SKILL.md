---
name: carnica-ui-kit-app
description: Работа с APP-компонентами Carnica UI-kit для Beeline mobile-приложения — импорт через importComponentSetByKeyAsync, выбор variants, setProperties, padding reset, recolor chevron, gotchas. Используй когда задача про mobile UI / iOS-экран / APP-компоненты Beeline. Триггеры: «APP-компонент», «mobile Carnica», «cell 3.1», «button 2.5», «navbar 3.0», «tabbar», «paspoort APP», «setProperties», «importComponentSetByKeyAsync», «figma plugin api APP», а также любая работа с компонентами в mobile-контексте в связке с Carnica/Beeline. НЕ используй для WEB-компонентов — там carnica-ui-kit-web.
type: capability
---

# Carnica UI-kit APP

Capability для работы с APP-компонентами Carnica UI-kit (mobile приложение Beeline). Производит Figma Plugin API код для импорта component sets, выбора variants, setProperties, обнуления padding, перекраски chevron. Полные паспорта по 9 темам — в `references/`. Decision rules «какой компонент когда» (universal, не APP-only) — в `carnica-components` reference skill.

## Quick Start

```javascript
// 1. Импорт component set (см. ключи в references/{topic}.md)
const buttonSet = await figma.importComponentSetByKeyAsync('e091f3958e87ecfb8a446373fea1ecd020d1462b');

// 2. Найти variant
const variant = buttonSet.children.find(c =>
  c.name.includes('priority=primary') &&
  c.name.includes('size=large') &&
  c.name.includes('view=text') &&
  c.name.includes('state=default') &&
  c.name.includes('style=default')
);
const buttonInstance = variant.createInstance();

// 3. setProperties (variant names — точные строки из паспорта, часто с emoji/спецсимволами)
buttonInstance.setProperties({ '↩︎ label#137:0': 'оформить заказ' });

// 4. Large layout gotcha (см. references/buttons.md)
//    size=large имеет внешний 20px контейнер; medium/small сохраняют internal padding
if (variant.name.includes('size=large')) {
  buttonInstance.paddingLeft = 0;
  buttonInstance.paddingRight = 0;
}
```

Для single component (без вариантов) — `importComponentByKeyAsync(key)` + `createInstance()`. Property keys (`#uid`) идентичны между source file и опубликованной библиотекой.

## Когда применять

- При сборке mobile/iOS-экрана Beeline в Figma — любая работа с APP-компонентами.
- Когда нужно импортировать конкретный component set / single component и подобрать variants.
- Когда нужны APP-specific gotchas (chevron recolor, padding reset large only, navbar modal 1.0 в модалках, plus round style=stroke).
- Когда нужны точные ключи для Figma Plugin API (file `05_Carnica UI-kit APP`).
- Orchestrated из `carnica-figma-design` на шаге 2 при platform=APP.

## Когда НЕ применять

- **WEB-компоненты** — используй `carnica-ui-kit-web` (CAP-04). Ключи разные (`535b...8215` для WEB button 2.1 vs `e091...462b` для APP button 2.5), variants отличаются (WEB `device=desktop/mobile`, APP — нет; WEB hover state, APP — нет).
- **Decision rule «какой компонент когда»** — используй `carnica-components` (REF-02). Этот skill даёт паспорт известного компонента; `carnica-components` отвечает на вопрос «использовать `cell 3.1` или `cell grid 2.1`?».
- **Выбор token / styling** — используй `carnica-design-system` (REF-08). Этот skill даёт API код; design-system даёт token id.
- **Целостный экран** — используй `carnica-figma-design` (CAP-01). Этот skill — слой component passports; figma-design orchestrate сборку.

## @references

> Lazy auto-load (D-07, `.agents/README.md` § 6): этот capability перечисляет ДОСТУПНЫЕ reference skills, агент сам решает КОГДА читать каждый по контексту шага.

- `carnica-components` — decision rules «какой компонент когда», universal паспорта (не APP-only). Подтягивается на шаге 1 при выборе компонента из набора 50+ Carnica.
- `carnica-design-system` — **OWNER** color tokens (D-27) для variants и tone, typography style keys для TEXT properties. Подтягивается на шаге 3 (token setup для variant fills).

## Алгоритм

1. **Шаг 1: Определи компонент** — выбери Carnica APP-компонент под задачу. Если задача неоднозначная («строка списка с иконкой и chevron — `cell 3.1` или `cell grid 2.1`?»), подтяни `carnica-components/SKILL.md` Decision rules. Если уже знаешь компонент — открой `references/{topic}.md` за паспортом (например, `references/lists.md` для cell 3.1) — потому что полный паспорт лежит там, не в этом body.

2. **Шаг 2: Выбери variants** — из паспорта `references/{topic}.md` найди нужный variant name + value. Variant names — **точные строки** из Figma (часто с emoji/спецсимволами: `❖ left view settings`, `↩︎ text#538:0`, `↩︎ label#137:0`). Опечатка ломает setProperties без runtime-ошибки.

3. **Шаг 3: Импортируй и применяй** — вызови `importComponentSetByKeyAsync(key)` для set, `importComponentByKeyAsync(key)` для single. Затем `createInstance()`. Затем `setProperties({variantName: value})`. TEXT, BOOLEAN, INSTANCE_SWAP свойства — отдельные setProperties вызовы (порядок: variants → boolean → swap → text), потому что Figma Plugin API не гарантирует консистентность при смешанных payload.

4. **Шаг 4: APP-specific post-processing** — применяй gotchas из `## Top gotchas` ниже и `references/{topic}.md`:
   - **Large layout padding** у `button 2.5 size=large` (см. `references/buttons.md`) — внешний 20px контейнер можно редактировать под экран; medium/small сохраняют internal padding.
   - **Chevron recolor** в `content/secondary` — для cell 3.1 right view = settings (default `content/primary` слишком тёмный для navigation row, см. `references/lists.md`).
   - **plus round** ТОЛЬКО `style=stroke` — единственная иконка-исключение (см. `references/icons.md`).
   - **navbar modal 1.0** во ВСЕХ модалках, не navbar 3.0 (см. `references/modals.md`).

5. **Шаг 5: Token-биндинг** — подтяни `carnica-design-system/SKILL.md` для token keys. Применяй через `importVariableByKeyAsync` + `setBoundVariableForPaint` с fallback hex — потому что Figma Plugin API требует fallback paint значение даже при variable binding.

6. **Шаг 6: Screenshot QA** — сделай `get_screenshot` инстанса. Сравни визуально с паспортом из `references/{topic}.md`. Если не совпадает — gotcha не применён (chevron не перекрашен, padding не обнулён у large, default `default on bg_secondary` фон дал ДОП серый внутри белой карточки).

## Top gotchas

| Gotcha | Подробности |
|---|---|
| Chevron в cell 3.1 right view = settings — default `content/primary` (слишком тёмный) | `references/lists.md` § cell chevron recolor — `recolorVectors(rightView, paintCS)` после createInstance |
| Large layout padding у `button 2.5 size=large` (h=56, external paddingL/R=20) | `references/buttons.md` § button layout — внешний контейнер можно редактировать под экран; НЕ обнулять internal padding у medium/small |
| `plus round` использует `style=stroke`, не `outline` (единственная иконка-исключение) | `references/icons.md` § plus round style=stroke |
| Modal/bottom sheet → `navbar modal 1.0`, НЕ `navbar 3.0` | `references/modals.md` § navbar modal always |
| `cell 3.1` в белой карточке — `background=none` (НЕ `default on bg_secondary` — даёт ДОП серый внутри!) | `references/lists.md` § variant background |
| `button inline text 3.0` priority="**seсondary**" — кириллическая «с»! | `references/buttons.md` § button inline text 3.0 typo workaround |
| Avatar в `cell grid 2.1` — default size=M, обычно нужен size=L | `references/lists.md` § cell grid avatar size L |

## Полные паспорта компонентов

| Тема | Reference |
|---|---|
| Навигация (navbar 3.0, tabbar, status bar, home indicator, divider, title 2.1, tabs, segmented control) | `references/navigation.md` |
| Кнопки (button 2.5, button inline icon, button inline text, button ux, button box, iOS keyboard) | `references/buttons.md` |
| Списки (cell 3.1, cell grid 2.2, checkbox, accordion 2.2, chips, avatar 3.0, avatar group) | `references/lists.md` |
| Карточки (card large/medium/small 2.1, banner 2.1, banner group) | `references/cards.md` |
| Формы (input 2.3, search field, text area, select, date picker, picker, slider, stepper, switch, iOS keyboards) | `references/forms.md` |
| Метки и статусы (tag 2.3, badge 2.2, adtag, tooltip) | `references/tags.md` |
| Обратная связь (loading page, spinner, skeleton, status screen, error_empty state, snackbar, progress step bar, pagination) | `references/feedback.md` |
| Модалки (dialog 2.1, Alert, action sheet, sheet 2.2, modal page, navbar modal 1.0) | `references/modals.md` |
| Иконки + file input (10 ключевых иконок, plus round stroke gotcha, file input variants) | `references/icons.md` |

## Output format

Skill производит следующий артефакт в чате:

````markdown
## Carnica UI-kit APP — <название артефакта>

**Компонент:** <button 2.5 / cell 3.1 / navbar 3.0 / ...>
**Library Key:** <hex key>
**Variants:** <priority=primary, size=large, view=text>

### Variants и properties

| Variant / Property | Type | Value |
|---|---|---|
| `priority` | VARIANT | `primary` |
| `size` | VARIANT | `large` |
| `↩︎ label#137:0` | TEXT | `оформить заказ` |
| `left icon#25180:0` | BOOLEAN | `true` |
| `❖ left icon#25180:194` | INSTANCE_SWAP | `chevron right` |

### Figma Plugin API

```javascript
const set = await figma.importComponentSetByKeyAsync('e091...462b');
const variant = set.children.find(c =>
  c.name.includes('priority=primary') && c.name.includes('size=large')
);
const inst = variant.createInstance();
inst.setProperties({ '↩︎ label#137:0': 'оформить заказ' });
// Large outer padding reset/edit only when screen layout owns side spacing
inst.paddingLeft = 0;
inst.paddingRight = 0;
```

### Применённые gotchas

- ✓ Large outer padding handled: `inst.paddingLeft = 0` only when layout owns side spacing
- ✓ Chevron recolor: `recolorVectors(rightView, paintCS)` для cell instances
- ✓ Variant background: `none` (потому что внутри белой карточки)
````

---

*Source: existing `.agents/skills/carnica-ui-kit-app/SKILL.md` (1132 строки) — body retrofit'ен под capability template (Phase 1), 9 H2-секций мигрированы в `references/{topic}.md` (lossless 1:1).*

*Produces: Figma Plugin API код для APP-компонентов + variant lookup + gotcha-checked инстансы.*

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: capability` — все три поля заполнены.
- [x] `name` соответствует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` соответствует middle-pushy формату с **verb-триггерами** (`setProperties`, `importComponentSetByKeyAsync`, `paspoort APP`) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body (§ 3 architecture).
- [x] **Секция `## @references` присутствует и содержит ≥ 1 reference skill** (D-07, обязательно для capability) — фактически 2 entries (carnica-components, carnica-design-system).
- [x] В описании `## @references` упомянут принцип lazy auto-load (агент подтягивает по контексту шага, не всё на старте).
- [x] Секция «Когда НЕ применять» содержит ≥ 2 пункта с указанием альтернативных skills (anti-overlap boundary) — фактически 4 (ui-kit-web / components / design-system / figma-design).
- [x] Алгоритм имеет ≥ 3 шага в imperative form (§ 11 architecture) — фактически 6.
- [x] Output format — конкретный шаблон с разметкой, не абстрактное описание (variants table + Figma Plugin API код + applied gotchas).
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [x] Тяжёлая теория / полные справочники вынесены в `references/*.md` (§ 9 architecture) — 9 topic-refs (navigation/buttons/lists/cards/forms/tags/feedback/modals/icons).
- [x] Все `<...>` placeholders заполнены.
- [x] Все template-комментарии удалены.
- [x] Imperative form в body (§ 11 architecture). Запрещённые слова в имитации сомнения — отсутствуют (grep test: список в `.agents/README.md` § 11).
