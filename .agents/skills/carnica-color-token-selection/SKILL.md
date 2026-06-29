---
name: carnica-color-token-selection
description: Workflow выбора Carnica color token под конкретный контекст — фон карточки / текст на жёлтом / тёмный блок на светлой странице / hover-state / disabled. Используй когда нужно понять «какой токен взять для X», а не «список всех токенов». Триггеры: «выбери токен», «какой фон», «какой текст на», «токен для», «background или elements», «fake-invert сценарий A/B/C», «overlay для модалки», «brand или surface», «темная тема token», а также любая задача выбора цветового токена в связке с Carnica/Beeline. НЕ используй для полного справочника токенов — там carnica-design-system (REF-08 OWNER).
type: capability
---

# Carnica Color Token Selection

Hybrid capability для выбора Carnica color token под конкретный дизайн-контекст. Производит token id (например, `background/primary`, `elements/secondary fake-invert`, `surface/02-teal`) + обоснование «почему именно этот» + ссылку на полную спецификацию в `carnica-design-system`.

> **Hybrid (D-06, § 4 architecture):** workflow выбора → body этого skill, **полная спецификация tokens (light + dark, 12 категорий, 80+ значений)** → `carnica-design-system` (REF-08 OWNER, D-27). Этот skill **НЕ дублирует** таблицы — он отвечает «какой токен», а REF-08 — «какие значения».

## Когда применять

- При выборе цвета для конкретного UI-элемента: «фон карточки», «текст на яркой плашке», «оверлей за модалкой», «hover state кнопки».
- При работе с fake-invert сценариями: «вся страница тёмная в светлой теме» (A) / «тёмный блок на светлой странице» (B) / «маленький тёмный chip» (C).
- При проверке корректности наложения: «можно ли elements на `background/* fake-invert`?», «`elements/secondary` или `tertiary` для chips/snackbar?».
- При выборе варианта disabled / active / hover state.
- Orchestrated из `carnica-figma-design` на шаге 3 (Tokens & typography).

## Когда НЕ применять

- **Полный справочник tokens** (все 12 категорий: background / elements / content / overlay / glass / border / constant / brand / success / error / link / surface / accent с light + dark hex значениями) — используй `carnica-design-system` (REF-08 OWNER, D-27). Этот skill отвечает «какой токен», design-system — «какие значения».
- **Typography style keys** (шкала 13/16/20/24/32/40/56) — `carnica-design-system` § Quick reference + `carnica-typography` для иерархии. Этот skill — про color tokens, не про typography.
- **Spacing / radius scale** — `carnica-design-system` § Spacing / Radius. Этот skill — color only.
- **Применение токенов в Figma Plugin API** (`importVariableByKeyAsync` + `setBoundVariableForPaint`) — паттерн в `carnica-ui-kit-app` / `carnica-ui-kit-web` Quick Start. Этот skill даёт token id, ui-kit-* — Plugin API код.
- **Theme redesign** (создание новых tokens, перепроектирование палитры) — out of scope (vNext).

## @references

> Lazy auto-load (D-07, `.agents/README.md` § 6): этот capability перечисляет ДОСТУПНЫЕ reference skills, агент сам решает КОГДА читать каждый по контексту шага. На старте capability читается только этот SKILL.md.

- `carnica-design-system` — **PRIMARY OWNER** color tokens (D-27). Полная спецификация visual foundations (color values, typography, spacing, radius, icon source-of-truth) — в `carnica-design-system/references/visual-foundations-reference.md`. Подтягивается на шаге 4 (lookup конкретного hex / WCAG-контраста) и шаге 5 (token id formal name).
- `carnica-visual-patterns` — контекстные примеры применения tokens (где `brand/primary` в wallet selected card, где `surface/08-yellow` в icon-плитке, где `background/primary fake-invert` в промо-лендинге). Подтягивается на шаге 3 (поиск pattern с похожим контекстом).

## Алгоритм

1. **Шаг 1: Определи роль элемента** — что именно красишь? Категории:
   - **background** — крупные фоны (страница, секция, карточка-как-крупный-блок).
   - **elements** — фоны меньших элементов (кнопка, chip, маленькая карточка) поверх background.
   - **content** — текст и иконки.
   - **overlay** — затемнение за модалкой / полупрозрачные слои.
   - **border** — обводки и разделители.
   - **brand / success / error / link** — статусные / акцентные цвета.
   - **surface / accent** — пастельные / насыщенные акцентные фоны (теги, плитки).

   Это критически важно — token category вытекает прямо из роли. «Кнопка большая занимает почти весь экран» — всё равно elements, не background (правило старшинства: background > elements, поверх background можно elements, поверх elements — нельзя background).

2. **Шаг 2: Определи parent context** — на каком фоне лежит элемент? Это влияет на выбор ветки:
   - На `background/primary` (серый) → ставь `elements/primary` (белый) или `background/secondary` (если карточка крупная).
   - На `background/secondary` (белый) → ставь `elements/secondary` или `background/tertiary`.
   - На fake-invert фоне → используй fake-invert elements / content / border.
   - На `elements/active` (тёмный/белый инверт) → используй `content/* 100%-invert` / `border/* 100%-invert`.

3. **Шаг 3: Тёмный блок или fake-invert?** — если нужен тёмный блок на светлой странице (или похожий контекст у `carnica-visual-patterns`):
   - **Сценарий A** — вся страница тёмная в светлой теме → `background/primary fake-invert` корневой фон. Внутри: `secondary-fi` → `tertiary-fi` → `additional-fi`.
   - **Сценарий B** — тёмный блок поверх светлой страницы (промо-карточка) → `background/secondary fake-invert` на `background/primary` (или `background/tertiary fake-invert` на `background/secondary`). Внутри: следующий уровень fake-invert.
   - **Сценарий C** — мелкий тёмный интерактивный элемент (chip, активный таб, маленькая карточка) → `elements/primary fake-invert` или `elements/secondary fake-invert` поверх обычного background.

   ЗАПРЕЩЕНО: `background/primary fake-invert` поверх `background/primary` (primary-fi — корневой фон, не вложенный).

4. **Шаг 4: Текст на цветном фоне** — выбор content токена (см. lookup ниже). Когда нужен конкретный hex (например, для WCAG-контраста проверки на 4.5:1) — подтяни `carnica-design-system/references/visual-foundations-reference.md` § 1-2.

   ВАЖНО: **`brand/primary` (#FFC800) — НИКОГДА как цвет текста на светлом фоне** (контраст 1.7:1, текст нечитаем). Только как фон, текст на нём — `constant/dark`.

5. **Шаг 5: Проверь тёмную тему** — все Carnica tokens работают в light + dark. Hex разные. Прямой hex запрещён как итоговый paint — только через `importVariableByKeyAsync` + `setBoundVariableForPaint` (fallback hex для MCP screenshot, см. `carnica-figma-design`). Спецификация — `carnica-design-system/references/visual-foundations-reference.md`.

6. **Шаг 6: Зафиксируй выбор + обоснование** — Output format ниже. Token id + категория + обоснование + ссылка на REF-08 секцию + проверка contrast для текста (WCAG AA минимум для основного).

## Правила наложения (sticky cheatsheet)

### Старшинство: background > elements

- На background → можно background и elements.
- На elements → можно ТОЛЬКО elements. background поверх elements ЗАПРЕЩЁН.

### Цепочки

```
background/primary
  ├─ background/secondary → tertiary → additional01 → additional02
  ├─ background/secondary fake-invert → tertiary-fi → additional-fi
  ├─ elements/primary → secondary → additional01 → additional02
  │                   └─ tertiary → additional01  (альтернативная ветка)
  └─ elements/primary fake-invert → secondary-fi → additional01-fi

background/secondary
  ├─ background/tertiary → additional01 → additional02
  ├─ background/tertiary fake-invert → additional-fi
  ├─ elements/secondary → additional01 → additional02
  └─ elements/secondary fake-invert → additional01-fi
```

### Две ветки elements (D-27)

`elements/secondary` и `elements/tertiary` в тёмной теме совпадают, а в светлой — различаются. Выбирай ОДНУ ветку, не мешай:
- **Ветка A**: chips → `elements/primary` → **secondary** → `additional01`.
- **Ветка B**: snackbar → `elements/primary` → **tertiary** → `additional01`.

`elements/disabled` — ТОЛЬКО для неактивных состояний.

### Сценарии fake-invert (A / B / C)

- **A** — тёмная страница целиком (промо-лендинг, геймер-раздел): `background/primary fake-invert` корневой фон + `* fake-invert` внутри.
- **B** — тёмный блок на светлой странице (промо-карточка, корзина): `background/secondary fake-invert` на `background/primary` (или `background/tertiary fake-invert` на `background/secondary`) + `* fake-invert` внутри.
- **C** — мелкий тёмный элемент (chip, активный таб): `elements/primary fake-invert` или `elements/secondary fake-invert` поверх обычного background.

100%-invert — для текста и border на `elements/active` (активный/выбранный таб, выбранный toggle). Инвертирует и в light, и в dark теме.

### Текст на цветных плашках (quick lookup)

| Фон | Текст |
|---|---|
| `background/*` / `elements/*` (стандартные) | `content/*` |
| `background/* fake-invert` / `elements/* fake-invert` | `content/* fake-invert` |
| `elements/active` | `content/* 100%-invert` |
| `brand/*` | `constant/dark` |
| `success/*` | `constant/light` |
| `error/*` | `constant/light` |
| `link/*` | `constant/light` |
| `surface/*` | `content/primary` ИЛИ accent той же палитры ИЛИ `constant/dark` |
| `accent/*-primary` (кроме yellow) | `constant/light` |
| `accent/08-yellow-primary` | `constant/dark` |
| `accent/*-secondary` / `accent/*-tertiary` | `content/primary` |

## Quick lookup (decision tree)

| Контекст | Token |
|---|---|
| Фон страницы | `background/primary` |
| Карточка на странице | `elements/primary` (или `background/secondary` если крупная) |
| Внутренний элемент карточки | `elements/secondary` (на `background/primary`) или `elements/additional01` (на `background/secondary`) |
| Тёмный промо-блок на светлой странице (сценарий B) | `background/secondary fake-invert` поверх `background/primary` |
| CTA-кнопка (жёлтый) | Фон `brand/primary` + текст `constant/dark` |
| Тег / chip / badge статусный (см. `carnica-ux-principles` §16) | Фон `tag 2.3` `default` / `brand` / `invert` / `success` / `error` (5 tone, остальные `surface-*` запрещены как фон тэга) |
| Стеклянная кнопка (navbar overlay) | `glass/primary` + `backdrop-blur 15px` |
| Оверлей за модалкой | `overlay/XL` (сильное) или `overlay/M` (среднее) |
| Disabled элемент | Фон `elements/disabled` + текст `content/disabled` |
| Активный (выбранный) элемент | Фон `elements/active` + текст `content/primary 100%-invert` |
| Разделитель | `border/secondary` (тоньше) или `border/primary` (толще) |
| Brand-акцент (jaune) | Фон `brand/primary` + текст `constant/dark` |
| Цветной тег/бейдж — пастель | Фон `surface/0N-*` + текст `content/primary` |
| Цветной тег/бейдж — насыщенный | Фон `accent/0N-*-primary` + текст по правилу выше |

**Полная спецификация (все 12 категорий tokens с light + dark hex):** `carnica-design-system` (REF-08 OWNER, D-27) → `references/visual-foundations-reference.md` § 1-2.

## Чеклист валидации (после генерации)

После сборки макета переключи тему (light ↔ dark) и пройдись:

- [ ] Все элементы видны — ничего не «сливается» с фоном.
- [ ] Везде токены, не hex — если элемент не переключается при смене темы, использован голый hex.
- [ ] Текст на цветных плашках — константа (см. таблицу выше).
- [ ] В тёмной теме каждый вложенный слой светлее родительского (правило «от тёмного к светлому»).
- [ ] Ветка `elements/secondary` или `tertiary` выбрана одна — не смешаны.
- [ ] Сценарии fake-invert (A/B/C) не нарушены — `primary-fi` не вложен в `primary`.

## Output format

```markdown
## Token choice — <контекст>

**Контекст:** <фон карточки в wallet | text на яркой плашке | overlay для action sheet | ...>
**Parent:** <на каком фоне лежит элемент>

### Выбранные tokens

| Слой | Token | Категория | Обоснование |
|---|---|---|---|
| Фон элемента | `elements/primary` | elements | Карточка на `background/primary` → стандартное `elements/primary`. Контраст AAA на тексте `content/primary`. |
| Текст | `content/primary` | content | Стандартный читаемый текст на elements. |
| Бордер (опц) | `border/secondary` | border | Тонкий разделитель между cells. |

### Подсветка тёмной темы

Все три tokens работают в обеих темах автоматически. Hex-значения — `carnica-design-system/references/visual-foundations-reference.md` § 1.

### Hybrid note

Полная спецификация (light + dark hex, 12 категорий, 80+ tokens) — `carnica-design-system` (REF-08 OWNER, D-27). Этот ответ — workflow «какой токен», не «какие значения».
```

## Hybrid skill note

Этот skill — **hybrid** (D-06, § 4 architecture):
- **Workflow выбора** (6-шаговый decision tree + правила наложения + quick lookup) → body этого SKILL.md.
- **Полная справочная база** (12 категорий tokens × 2 темы × 80+ значений) → `carnica-design-system/references/visual-foundations-reference.md` (REF-08 OWNER, D-27).

Этот skill **НЕ дублирует** full tables — критическое правило для idle-токенов (≤ 30k). Когда нужен hex `surface/04-violet` — открой `carnica-design-system/references/visual-foundations-reference.md`. Когда нужен ответ «какой токен для тёмного блока на светлой странице» — body этого skill (шаг 3, сценарий B).

---

*Source: `.agents/skills/carnica-color-token-selection/SKILL.md` — body retrofit'нут под capability hybrid template (Phase 3). Секции 2.1-2.13 (full token tables) **УДАЛЕНЫ** как дубликаты REF-08 (D-27 OWNER). Сохранены: § 1 правила наложения, § 3 fake-invert сценарии A/B/C, § 4 текст на цветных плашках (quick lookup), § 5 чеклист валидации, § 6 быстрые решения.*

*Produces: token id (selected) + категория + обоснование + cross-link на REF-08 для hex значений.*

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: capability` — все три поля заполнены.
- [x] `name` соответствует convention `carnica-<topic>` и явно описывает назначение: выбор цветового токена.
- [x] `description` соответствует middle-pushy формату с **verb-триггерами** («выбери токен», «какой фон», «какой текст на») + anti-overlap с REF-08 owner + связка с Carnica/Beeline.
- [x] `description` не дублируется H2-секцией «Когда применять» в body.
- [x] **Секция `## @references` присутствует и содержит ≥ 1 reference skill** — фактически 2 (carnica-design-system PRIMARY OWNER + carnica-visual-patterns).
- [x] В описании `## @references` упомянут принцип lazy auto-load (агент подтягивает по контексту шага, не всё на старте).
- [x] Секция «Когда НЕ применять» содержит ≥ 2 пункта с указанием альтернативных skills — фактически 5 (design-system / typography / spacing / ui-kit-* / theme redesign).
- [x] Алгоритм имеет ≥ 3 шага в imperative form — фактически 6.
- [x] Output format — конкретный шаблон с разметкой (Token choice table + Hybrid note).
- [x] Файл ≤ 500 строк (hard limit ARCH-02). Target ≤ 300.
- [x] **D-27 OWNER pattern enforcement:** Section 2.1-2.13 full token tables УДАЛЕНЫ из body, заменены cross-link'ом на REF-08 `carnica-design-system/references/visual-foundations-reference.md`.
- [x] `## Hybrid skill note` присутствует (D-06, § 4 architecture) — этот skill единственный в Phase 3 с явной hybrid note.
- [x] Все `<...>` placeholders заполнены.
- [x] Все template-комментарии (HTML-комментарии из стартера) удалены.
- [x] Imperative form в body. Запрещённые слова в имитации сомнения — отсутствуют (grep test: список в `.agents/README.md` § 11).
