---
name: carnica-design-system
description: Дизайн-система Carnica (билайн) — color tokens, typography stylenames, spacing scale, иконы, Figma library keys. OWNER color tokens — все остальные skills ссылаются сюда за полной таблицей. Используй когда выбираешь цвет / spacing / типографический стиль, проверяешь корректность токена, ищешь Figma library key для importComponentSetByKeyAsync, работаешь с light / dark theme. Триггеры: «токен», «design system», «design tokens», «color», «цвет», «spacing», «padding», «margin», «typography style», «Beeline Sans size», «light theme», «dark theme», «Figma library key», «cornerRadius», «иконка», «иконы Carnica», «дизайн-система», «layering», «наложение фонов», «fake-invert», «hex», «token», «icons», а также любой выбор токена или library key дизайн-системы Carnica.
type: reference
---

# Carnica Design System

Этот skill — entry-point по дизайн-системе Carnica и **OWNER color tokens (D-27)**: единственный источник полных таблиц цветовых токенов. Остальные skills (`carnica-typography`, `carnica-components`, `carnica-ux-principles`, `carnica-color-token-selection`) копируют 1-3 значения inline и ссылаются сюда «полная таблица — `carnica-design-system`». В body — quick reference (≤ 30 самых частых tokens), правила выбора, layering rules. Полная база (light + dark theme, fake-invert, 17 typography стилей, spacing scale, radius scale, icon source-of-truth, Figma library keys) — `references/visual-foundations-reference.md`.

## Когда обращаться

- Выбираешь цвет — нужен правильный токен (background / content / brand / status / accent / surface)
- Импортируешь компонент через Figma Plugin API — нужен library key `importComponentSetByKeyAsync(...)` или `importVariableByKeyAsync(...)`
- Работаешь с dark theme или с тёмным блоком на светлой странице — нужны fake-invert или 100%-invert tokens
- Выбираешь typography stylename (display / headline / body / paragraph / caption) для текстового слоя
- Подбираешь spacing — между группами, секциями, внутри карточки (Figma tokens `negative 500` ... `2000`)
- Подбираешь cornerRadius — кнопка / тэг / карточка / диалог (Figma tokens `0` ... `1000`, `infinite`)
- Ищешь иконку в каталоге Carnica — source of truth `src/carnica/icons-raw/`
- Проверяешь корректность токена в макете (light ↔ dark switch, нет ли голого hex)

## Quick reference

### Color tokens — самые частые (light mode)

| Роль | Токен | Hex | Где |
|---|---|---|---|
| Фон страницы | `background/primary` | `#F0F3F5` | серый фон всех экранов (НЕ белый!) |
| Карточка | `background/secondary` | `#FFFFFF` | белые карточки, модалки, sheets |
| Tertiary bg | `background/tertiary` | F0F3F5 light / тёмный dark | неактивные табы, схлопнутые карточки |
| Основной текст | `content/primary` | `#28303F` | заголовки, тело текста, иконки |
| Вторичный текст | `content/secondary` | 4.0:1 на белом | описания, подписи, метаданные |
| Третичный текст | `content/tertiary` | плейсхолдеры | placeholders |
| Disabled | `content/disabled` | неактивный | неактивные элементы |
| Brand жёлтый | `brand/primary` | `#FFC800` | CTA-кнопки, акценты (НЕ как цвет текста — 1.7:1 fail!) |
| Error / выход | `error/primary` | F84A00 | «ВЫЙТИ», отрицательный баланс, ошибка |
| Success | `success/primary` | зелёный | подключено, чекмарки, +суммы |
| Border | `border/secondary` | hairline | тонкие линии 1px между cells |
| Overlay header | `overlay/s` | rgba(240,243,245,0.30) | blur-фон sticky-хедера |

Полная таблица (~90 tokens × light + dark, fake-invert, 100%-invert, accent 8 палитр × 3 уровня, surface, glass) — `references/visual-foundations-reference.md` §1-2.

### Typography stylenames (выжимка 9 из 17)

| Стиль | Size | LH | Use |
|---|---|---|---|
| `display/large` | 56 | 66 | WEB hero only (≥1024px) |
| `display/medium` | 40 | 48 | WEB H1 / mobile key value |
| `display/small` | 32 | 36 | mobile hero, balance, цена |
| `headline/small` | 24 | 24 | page title в скролле (tight-set) |
| `body/large` | 24 | 28 | крупные числа в детализации |
| `body/medium` | 20 | 26 | section title, navbar title |
| `body/small` | 16 | 20 | основной UI text, cell title/subtitle |
| `body/paragraph/small` | 16 | 24 | лонгриды, статьи, юридические тексты |
| `caption/medium` | 13 | 16 | timestamps, badge numbers |

Полная таблица (все 17 стилей × LH × weight × use case + decision rules выбора размера) — `carnica-typography` (Quick reference + Decision rules) + `references/visual-foundations-reference.md` §4.

### Spacing scale

Figma naming: `negative 500 · negative 400 · negative 300 · negative 250 · negative 200 · negative 100 · negative 50 · 0 · 50 · 100 · 150 · 200 · 250 · 300 · 350 · 400 · 450 · 500 · 600 · 800 · 1000 · 1200 · 1600 · 2000`. Значения: от `-20px` до `80px`. Стандарт padding в Carnica: **20** (`spacing/500`) mobile horizontal, **16** (`spacing/400`) card vertical, **40** (`spacing/1000`) web hero/header padding.

Полные правила (когда какой spacing, inner-vs-outer, Гештальт proximity) — `references/visual-foundations-reference.md` §5 + `carnica-typography` Decision rule #7.

### Radii (cornerRadius)

| Token | px | Назначение |
|---|---|---|
| `radius/0` | 0 | без скругления |
| `radius/50` | 2 | микро-скругление |
| `radius/100` | 4 | малые controls |
| `radius/200` | 8 | мелкие чипы, badge |
| `radius/300` | 12 | input, маленький card |
| `radius/400` | 16 | стандартный card-tile |
| `radius/600` | 24 | средняя карточка |
| `radius/800` | 32 | крупная карточка, dialog |
| `radius/1000` | 40 | очень крупная карточка / shell |
| `radius/infinite` | 10000 | pill-кнопки, chip-pill, fully-round controls |

Nested radius rule (`R_inner = R_outer - gap`), infinite radius behavior — `references/visual-foundations-reference.md` §6.

### Figma library keys (top-5)

| Library | Назначение |
|---|---|
| `01_Carnica colors 2.0` | semantic color variables (collection `semantic 2.0`) |
| `02_Carnica typography` | Beeline Sans text styles (17 стилей) |
| `04_Carnica icons` | raw SVG source in `src/carnica/icons-raw/` |
| `05_Carnica UI-kit APP` | mobile app components (cell, button, card, dialog) |
| `06_Carnica UI-kit WEB` | web components (header, breadcrumbs, banner) |

Полные UUID library keys + ключевые variable keys (color, typography) — `references/visual-foundations-reference.md` §8.

### Иконы (категории, выжимка)

Source of truth по количеству и именам — `src/carnica/icons-raw/`. Generated TSX в `src/carnica/icons/` является производным слоем. Все иконки используют 24×24 viewBox и `currentColor` после генерации; filled/stroke-варианты идут отдельными компонентами.

Полный каталог категорий + примеры icon names + library keys — `references/visual-foundations-reference.md` §7.

## Decision rules

1. **`background/primary` = серый `#F0F3F5`, НЕ белый** — самая частая ошибка миграции. Белый — `background/secondary` (`#FFFFFF`). В Carnica страница серая, карточки на ней — белые. Проверяй каждый раз когда видишь «white background» в макете или ТЗ.

2. **`brand/primary` (#FFC800) — НИКОГДА как цвет текста на светлом фоне** — контраст 1.7:1, нечитаемо. Использовать ТОЛЬКО как фон под `content/primary` (на жёлтом контраст 8.0:1 AAA). Для финального фокуса (цена «150 ₽» на тёмной карточке) — размер и вес, не жёлтый цвет-крикун. Cross-ref: `carnica-typography` Decision rule #2 (contrast).

3. **`content/secondary` для описаний / подписей** — даже если формально 4.0:1 на белом (technically AA fail для small text), это осознанный design choice Beeline. Не подменяй на `content/disabled` — disabled только для неактивных элементов.

4. **Все цвета — через `importVariableByKeyAsync(key)`** — НЕ hex напрямую (`solid('#FFC800')` — анти-паттерн P0 anti-slop). В CSS — через переменные `--bee-content-primary` и т.п., прямой hex запрещён за пределами `:root`. Cross-ref: `carnica-anti-slop` P0 «Цвета и токены».

5. **Layering: background > elements (старшинство)** — поверх `background/*` можно класть и background, и elements. Поверх `elements/*` — ТОЛЬКО elements, не background. На `background/primary` → `elements/primary` (#FFFFFF). На `background/secondary` → `elements/secondary` (#F0F3F5). Полная цепочка наложений + fake-invert правила — `references/visual-foundations-reference.md` §3.

6. **Surface inversion для circular элементов** — avatar / step-num / icon-chip / badge на сером фоне (`background/primary`) → белый surface (`background/secondary`); на белой карточке (`background/secondary`) → серый surface (`background/tertiary` или `elements/secondary`). Иначе кружок сливается с фоном и теряет геометрию. Не применяется к brand/accent цветным surface (они контрастны hue-сдвигом).

7. **Dark mode — отдельные tokens, не light hex в тёмной UI** — токен один (`content/primary`), hex меняется автоматически при переключении темы. В тёмной теме строгое правило: каждый вложенный слой — **светлее** родительского (от тёмных к светлым). Полная таблица light↔dark — `references/visual-foundations-reference.md` §1-2.

8. **fake-invert vs 100%-invert — разные сценарии** — canonical Figma spelling: `content/primary fake-invert`, `content/primary 100%-invert`. `fake-invert` инвертирует ТОЛЬКО в light theme (в dark hex совпадает с обычными tokens) — для тёмных блоков на светлой странице. `100%-invert` инвертирует в ОБЕИХ темах — для текста на `elements/active` (выбранный таб, toggle on). Три сценария fake-invert (тёмная страница / тёмный блок / тёмный элемент) — `references/visual-foundations-reference.md` §3.

9. **Typography stylenames — через ключи из `02_Carnica typography`** — не задавай size/weight/LH вручную в Figma. В коде — Tailwind-классы `text-display-sm` / `text-body-md` или CSS-переменные. Cross-ref: `carnica-typography` (полная decision rule «когда какой стиль»).

10. **Spacing — только из Figma spacing tokens** — используй имена `negative 500` ... `2000`, не произвольные числа. Между группами gap ≥ 2× gap внутри группы (Гештальт proximity). Cross-ref: `carnica-typography` Decision rule #7.

11. **cornerRadius — numeric tokens + `infinite`** — `radius/infinite` = `10000` для pill-кнопок, chip, tag, search field и fully-round controls. Карточки используют numeric tokens (`400` = 16, `600` = 24, `800` = 32, `1000` = 40). Nested radius: `R_inner = R_outer - gap` если gap ≤ 12px.

12. **Иконки — `style=outline` по умолчанию, viewBox 24×24** — единственное исключение `plus round` (`style=stroke`, без обводки-круга). `fill="currentColor"` для recoloring, `width="24" height="24"` + `{...props}`. Если path меньше 24×24 — центрируй через `<g transform="translate(offsetX, offsetY)">`. Cross-ref: `carnica-typography` (CSS conventions) + `carnica-components` (icon swap).

13. **Inline text-size rule (один размер в строке)** — в одной flex/inline-row все текстовые элементы имеют **один** `font-size` и одну `line-height`. Иерархия — через цвет (`content/primary` vs `content/secondary`) и вес (400 vs 500), не через размер. Размер меняется только **между разными строками**. Cross-ref: `carnica-anti-slop` P0 «Типографика».

14. **Тема — через CSS-vars, не через прямой импорт `colorTokens`** — компонент **никогда** не импортит `colorTokens.light` или `.dark` напрямую (`const colors = colorTokens.light`), потому что это хардкодит тему и ломает переключатель `[data-theme='dark']`. Цвета только через:
    - **Tailwind-классы** `bg-bee-*` / `text-bee-*` / `border-bee-*` — предпочитаемый путь. CSS-vars (`--bee-bg-primary` и т.д.) определены в `apps/showcase/src/index.css` и автоматически переключаются по `data-theme`.
    - **Inline `var(--bee-*)`** — если Tailwind-класс неудобен (например динамическая подстановка). Эквивалентно по поведению.
    - **`createDynamicColors()` + `useCarnicaTheme()`** из `@carnica/shared` — если компонент уже построен на статической map'е токенов в стиле `colors[tokenName]` (legacy паттерн как в `app/buttons/Button.tsx`). Proxy подменяет значения по текущей теме, хук триггерит re-render. Используется только при невозможности перейти на Tailwind/var. Cross-ref: `carnica-anti-slop` P0 «`colorTokens.light` импортится напрямую».

## See also

- `carnica-typography` — typography stylenames decision (выбор size / contrast formulas / weight rule) — содержит ≤ 3 inline contrast values + ссылку «полная таблица — carnica-design-system» (D-27 OWNER consumer)
- `carnica-components` — какие library keys для какого компонента + tag tone tokens — ссылается сюда за hex значениями tone'ов (`success`, `error`, `brand`, `default`)
- `carnica-ux-principles` §16 — фоны тэгов tone-based reasoning — ссылается сюда за полным списком разрешённых tone фонов
- `carnica-anti-slop` — hex напрямую = P0 нарушение; CAPS / justified / brand/primary как текст — anti-patterns
- `carnica-color-token-selection` (capability) — workflow выбора токена при генерации UI, использует references из этого skill
- `references/visual-foundations-reference.md` — полные таблицы: color tokens (light + dark + fake-invert + 100%-invert + accent + surface + glass + overlay + border) + typography 17 стилей + spacing scale + radius scale + icon source-of-truth + Figma library keys

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс `carnica-design-system`).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (12 RU + 7 EN) + связка с Carnica/Beeline.
- [x] `description` декларирует OWNER role («OWNER color tokens — все остальные skills ссылаются сюда»).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться`.
- [x] Файл ≤ 500 строк (hard limit ARCH-02) — фактически ~160.
- [x] Inline hex ≤ 30 в SKILL.md — фактически 9 (D-27 OWNER pattern соблюдён, остальное в `references/visual-foundations-reference.md`).
- [x] Тяжёлый материал (полные таблицы > 15 строк, fake-invert правила, icon source-of-truth, library UUIDs) вынесен в `references/visual-foundations-reference.md`.
- [x] **НЕТ секции `## @references`** — запрещено для reference skill (D-08, leaves графа). Использован `## See also`.
- [x] OWNER role (D-27) продемонстрирован: 4 cross-link consumer'а (typography / components / ux-principles / color-token-selection) упомянуты в See also.
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Imperative form в body: «Выбери», «Не используй», «Проверяй» — слова «следует», «возможно», «может быть» отсутствуют в decision rules.
