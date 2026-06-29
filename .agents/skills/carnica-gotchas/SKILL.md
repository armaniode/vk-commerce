---
name: carnica-gotchas
description: Подводные камни Carnica при работе с Figma и кодом Beeline — Figma Plugin API gotchas (createFrame белый fill, layoutSizingHorizontal только после appendChild), BeelineSans fallback на системный шрифт, layout padding у button 2.5, chevron recolor в cell 3.1, button inline text 3.0 typo «priority=seсondary» с кириллической «с», CSS Grid 1fr expansion под img, dialog body scroll lock. Используй когда сталкиваешься с непонятным поведением Figma-инстансов, BeelineSans fallback, неожиданным spacing в Cell 3.1, ошибкой импорта компонента, layout shift в CSS Grid, проблемами скролла под dialog. Триггеры: «gotcha», «подводный камень», «не работает», «странное поведение», «ошибка», «компонент сломался», «padding не такой», «cell chevron», «BeelineSans fallback», «Figma Plugin error», «component import», «body scroll lock», «layout shift», «trap», «pitfall», «common error», «not working», «strange behaviour», «debug», «figma instance bug», а также любая непонятная проблема в Carnica.
type: reference
---

# Carnica Gotchas

Reverse-lookup index 16 подводных камней Carnica — Figma Plugin API, BeelineSans fallback, padding overrides, chevron recolor, button inline text typo, CSS Grid 1fr, dialog scroll. Этот skill идентифицирует **триггеры/симптомы** проблемы и отправляет в owner-skill за правилом/решением — он не дублирует правила, а маршрутизирует к ним.

## Когда обращаться

- Столкнулся со странным поведением Figma-инстанса: фрейм почему-то белый, padding не такой как ожидал, layout не FILL'ится
- BeelineSans отрендерился системным шрифтом или MCP screenshot показывает Inter/default placeholder при корректных node data
- Chevron в `cell 3.1` или `button inline text 3.0` слишком тёмный (default `content/primary`)
- `button.setProperties({ priority: 'secondary' })` не применяется на `button inline text 3.0` — подозреваю опечатку
- CSS Grid карточки с `1fr` разъезжаются — image растягивает track шире ожидаемой ширины
- Body экрана продолжает скроллиться при открытом `<dialog>` на mobile
- `importComponentSetByKeyAsync` или `importComponentByKeyAsync` падает с ошибкой
- Plus round иконка показывает лишний круг — выбран неверный variant
- Chips text collection 2.1 с `wrap=true` разбегаются хаотично, не центрированы
- Accordion content overflow за границы родителя

## Quick reference

| # | Gotcha (симптом) | Причина | Решение / owner skill |
|---|---|---|---|
| 1 | `figma.createFrame()` даёт непрозрачный белый фон | По дефолту `fills = [{type: 'SOLID', color: white}]` | `f.fills = []` сразу после createFrame; помести в helper `createVFrame`. Owner: `carnica-components` |
| 2 | Hex напрямую (`solid('#FFC800')`) ломает theming | Не подключен к variable — dark theme поломается | `importVariableByKeyAsync` → `brand/primary` (anti-slop P0). Owner: `carnica-design-system` + `carnica-anti-slop` |
| 3 | BeelineSans отрендерился системным шрифтом | font-family не загружен через `loadFontAsync` ИЛИ MCP screenshot показывает default Inter при корректных node data | `await loadFontAsync({family:"Beeline Sans", style:"Regular"})` перед setRange; если локальный файл зарегистрирован без пробела, fallback `family:"BeelineSans"`. Для standalone — Approach E (style first, then text). Для component instance — `setProperties` или Method A. Файлы: `assets/fonts/BeelineSans-Regular.{woff2,ttf}` + `Medium`. После генерации напомнить: `Cmd+Shift+P` → `Fix BeelineSans`. Owner: `carnica-typography` |
| 4 | `importComponentSetByKeyAsync` падает с ошибкой / для single component возвращает null | Не `await` ИЛИ перепутан тип: `navbar modal 1.0` / `StatusBar` / `home indicator` / `divider` — это **single components**, не sets | `await` обязательно. Для single — `importComponentByKeyAsync`, не `importComponentSetByKeyAsync`. Если key не работает — `search_design_system` + проверить `assetType`. Owner: `carnica-components` |
| 5 | Иконка кажется маленькой или off-center в 24x24 viewBox | path лежит в углу — не центрирован относительно viewBox | **Не центрировать через `<g transform="translate(...)">` обёртку** (правило до 2026-05-13 устарело). Все 350 иконок в `src/carnica/icons/` экспортированы в абсолютных 24×24 координатах через `exportAsync({format:'SVG_STRING'})` — если иконка off-center, **проблема в источнике Figma**, переэкспортируй через `scripts/icons-export/`. `fill="currentColor"`, `stroke="currentColor"`. Owner: `src/carnica/passports/icons.md` (§Метод) + `scripts/icons-export/README.md` |
| 6 | `button 2.5 size=medium/small` pill сплюснут после `resetPadding(btn)` | medium/small полагаются на internal paddings — обнуление ломает pill-форму | НЕ обнуляй internal padding у `size=medium` и `size=small`. У `size=large` редактируется только внешний 20px layout container, когда экран владеет side spacing. Owner: `carnica-components` |
| 7 | Chevron в `cell 3.1` правом view слишком тёмный | Default `right view settings` рисует chevron в `content/primary` (тёмный) | `recolorVectors(rightView, paintCS)` где `paintCS` — token `content/secondary`. Делать сразу после создания cell — это правило без исключений. Owner: `carnica-components` |
| 8 | `button inline text 3.0` `priority='secondary'` не применяется | Опечатка автора компонента: `'seсondary'` с **кириллической «с»** (не латинской `s`) | Use exact string `"seсondary"` (кириллица). Точная строка критична для `setProperties`. Owner: `carnica-components` |
| 9 | `accordion group 2.2` контент торчит за границы родителя | Дочерний фрейм с FIXED size внутри accordion — нет HUG | Use HUG для content frame inside accordion. Скрывать неиспользуемые items через BOOLEAN `2 line#17341:8` ... `10 line#17341:32`. Expanded/collapsed — nested line setting `activated='true'/'false'`. Owner: `carnica-components` |
| 10 | `chips text collection 2.1` с `wrap=true` разбегаются, не центрированы | Wrap включён, но primary/counter axis alignment — не CENTER | `counterAxisAlignItems = "CENTER"` и `primaryAxisAlignItems = "CENTER"`. Скрывать неиспользуемые chips через `.visible=false` (12 fixed nested instances). Owner: `carnica-components` |
| 11 | `input 2.3` phone-маска / card-маска не применяется | Неверный `type` variant — Carnica использует type-specific masks | type values: `text` / `phone` / `card` / `month` / `date` / `range` / `time` / `password` / `currency` / `code`. Для placeholder-like state — hidden label + value color `content/tertiary` + hidden right view. Focus state — nested `text input settings.setProperties({ state: 'entering' })`. Owner: `carnica-components` |
| 12 | `checkbox 2.1` BOOLEAN `setProperties` не применяется на nested labels | Carnica внутри checkbox использует разные property paths для разных nested elements | Direct `.visible` fallback приемлем когда `setProperties` не срабатывает. Mixed legal text colors — через `setRangeFills`. Owner: `carnica-components` |
| 13 | Body экрана продолжает скроллиться при открытом `<dialog>` на mobile | Native HTML5 `<dialog>.showModal()` блокирует interaction, но НЕ scroll. iOS Safari игнорирует `overflow: hidden` на body при touch-scroll | `position: fixed` + сохранение `window.scrollY` перед lock, восстановление через `window.scrollTo(0, scrollY)` при close-event. НЕ использовать `preventDefault` на wheel/touchmove (ломает scroll внутри dialog) и `overscroll-behavior: none` (не помогает). Owner: `carnica-components` (dialog 2.1) |
| 14 | CSS Grid карточки разъезжаются — image выходит за padding родителя | `1fr` это shorthand для `minmax(auto, 1fr)`; auto-min = min-content; для replaced (`<img>`/`<video>`) браузер интерпретирует `max-width` как min-content size | Use `grid-template-columns: minmax(0, 1fr)` + `width: 100%` на image. Track больше не растёт под min-content. Особенно актуально для responsive-карточек с media + текстом, hero-блоков, final-CTA с иллюстрацией. Owner: `carnica-visual-patterns` |
| 15 | Golden samples как ground truth (deprecated) | До D-08 PROJECT.md golden samples были canonical; теперь — evidence, не ground truth | Generate by **principles**, not examples. Golden — это evidence-loop куда landings новые workarounds (в skill bodies / references: `carnica-gotchas` body, `carnica-components/references/properties.md` + `decision-rules-extended.md`, `carnica-visual-patterns/references/patterns-full.md`, `carnica-figma-design` workflow), не наоборот. Owner: PROJECT.md decisions |
| 16 | Divider в cell-списке доходит до правого и левого края (выглядит «лежит на каждой иконке») | Default `divider horizontal 2.0` — 100% width, без inset от иконки cell | Wrap в VFrame с `paddingLeft=72, paddingRight=20` (inset). Аналогично для `cell 3.1` в padded card — `background=none` (НЕ `default on bg_secondary`, который даёт лишний серый фон). Для cell в card сбрасывать все 4 padding через `resetPadding()`. Owner: `carnica-components` |

## Decision rules

1. **Если столкнулся с gotcha — открой owner skill для полного правила** — этот REF только идентифицирует проблему по симптому; правило / контекст / связанные случаи живут у owner-skill. Не воспроизводи здесь полные таблицы — иди по cross-link.

2. **`figma.createFrame()` ВСЕГДА с `f.fills = []`** — иначе непрозрачный белый фон ломает layout (по дефолту `[{type: 'SOLID', color: white}]`). Помести в helper `createVFrame`/`createHFrame`, чтобы это происходило автоматически в каждом frame. Owner: `carnica-components`.

3. **Hex напрямую в paint = P0 anti-pattern** — никогда не пиши `solid('#FFC800')`. Используй `importVariableByKeyAsync` для получения variable + setBoundVariableForPaint с real RGB fallback (`{r:0,g:0,b:0}` рендерит чёрный в MCP screenshot даже при корректном binding). Owner: `carnica-design-system`. Запрет — `carnica-anti-slop`.

4. **Layout padding у `button 2.5 size=large`** — у large есть внешний 20px контейнер под fill-layout; редактируй только этот внешний контейнер, когда экран владеет side spacing. Medium/small полагаются на internal padding — обнуление превращает pill в плоский прямоугольник. Для cell 3.1 в padded card — `resetPadding()` всех 4 sides (L/R/T/B), потому что card уже даёт padding. Owner: `carnica-components`.

5. **Chevron recolor в cell 3.1 и button inline text — без исключений** — каждый instance с right view = settings/icon получает `recolorVectors(rightView, paintCS)` через token `content/secondary` сразу после создания. Default `content/primary` слишком тёмный для navigation-affordance. Owner: `carnica-components`.

6. **CSS Grid с img/video: `grid-template-columns: minmax(0, 1fr)`** — БЕЗ этого track expand'ится до min-content image (для replaced элементов = `max-width` ширина). Плюс `width: 100%` на image. Иначе hero/card с media разъезжается за padding родителя. Owner: `carnica-visual-patterns`.

7. **Async/await обязательно для `import*Async`** — `importComponentSetByKeyAsync`, `importComponentByKeyAsync`, `importVariableByKeyAsync`, `loadFontAsync`. Без await — uncaught promise rejection, MCP teardown. Перепутал component set vs single component? `navbar modal 1.0`, `StatusBar`, `home indicator`, `divider horizontal/vertical` — single. Owner: `carnica-components`.

8. **`loadFontAsync` перед `setRange*`** — `await loadFontAsync({family: "Beeline Sans", style: "Regular"})` (+ Medium если используется) обязательно ДО любого `setRangeFontSize`/`setRangeFills`; если локальная среда видит family без пробела, fallback `BeelineSans`. Если runtime не может загрузить шрифт — fallback: создать standalone text с available temp font, set `characters` + `textAutoResize` + alignment, потом применить Carnica text style последним, и не мутировать text properties повторно. Owner: `carnica-typography`.

## Anti-patterns common

Вытяжка из 16 gotchas — что **никогда** не делать:

- `figma.createFrame()` без `f.fills = []` → непрозрачный белый bg
- `resetPadding(btn)` без проверки size → `size=medium` теряет pill-форму
- `setProperties({'priority': 'secondary'})` с латиницей `s` → не применяется (нужна кириллическая «с»: `'seсondary'`)
- `solid('#FFC800')` вместо `importVariableByKeyAsync('brand/primary')` → ломает dark theme
- CSS `grid-template-columns: 1fr 1fr` без `minmax(0, 1fr)` → layout shift под img
- `plus round` с `style=outline` → лишний круг (использовать только `style=stroke`)
- Cell 3.1 в padded card с `background=default on bg_secondary` → доп серый фон (нужен `background=none`)
- Golden samples как canonical / ground truth → принципы > примеры (D-08)
- `event.preventDefault()` на wheel/touchmove как scroll lock → ломает scroll внутри dialog
- BeelineSans `font-family` без `loadFontAsync` → fallback на системный

## See also

- `carnica-components` — owner для большинства gotchas (createFrame fills, cell 3.1 chevron+background, button 2.5 layout padding, button inline text typo, accordion, chips, input, checkbox, dialog scroll lock, divider inset)
- `carnica-design-system` — gotcha 2 (hex напрямую → variable). Gotcha 5 (icon centring) — owner перенесён в `src/carnica/passports/icons.md` + `scripts/icons-export/` после 2026-05-13 переэкспорта.
- `carnica-typography` — gotcha 3 (BeelineSans loadFontAsync + Approach E + Method A + Fix BeelineSans hint)
- `carnica-anti-slop` — gotcha 2 как P0 запрет (hex напрямую = anti-slop)
- `carnica-visual-patterns` — gotcha 14 CSS Grid `minmax(0, 1fr)` + media replaced elements

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (≥5 RU + ≥3 EN) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться` (D-09).
- [x] Файл ≤ 500 строк (hard limit ARCH-02 — D-24 LIGHT без references/).
- [x] D-24 LIGHT: `references/` ОТСУТСТВУЕТ (171 строка source легко влезает в SKILL.md).
- [x] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа). Использован `## See also`.
- [x] D-27 ownership: gotchas = TRIGGERS/SYMPTOMS, правила/решения = owner skills через cross-link. Контент не дублируется — маршрутизируется.
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Imperative form в body: «Используй», «Не воспроизводи», «Помести в helper» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют в правилах.
- [x] Quick reference таблица содержит 16 gotchas с симптом+причина+решение/owner.
- [x] Cross-link на ≥ 5 owner skills (carnica-components, carnica-design-system, carnica-typography, carnica-anti-slop, carnica-visual-patterns).
- [x] Содержит специфические находки: «seсondary» (кириллическая «с»), `minmax(0`, chevron+recolorVectors, `loadFontAsync`, BeelineSans.
