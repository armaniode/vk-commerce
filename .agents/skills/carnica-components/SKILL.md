---
name: carnica-components
description: Правила выбора Carnica-компонентов: какой компонент когда, decision trees, готовые Figma keys (APP / WEB). Используй когда выбираешь компонент для секции экрана (cell vs cell grid vs card), для навигации (navbar vs tabbar), для действий (button vs button inline text vs button box), для overlay (dialog vs action sheet vs modal page) или для метки (tag vs badge vs adtag) в Carnica/Beeline. Триггеры: «какой компонент», «компонент для», «выбери компонент», «cell vs card», «navbar», «модалка», «оверлей», «список с иконкой», «component decision», «which component», «cell vs grid», «button vs link», «dialog vs modal», «Figma key», а также любой выбор Carnica-компонента в Figma или коде.
type: reference
---

# Carnica Components

Skill хранит decision rules «какой компонент когда» + точные Figma keys (APP / WEB) для импорта через Plugin API. Полные паспорта свойств — в `references/properties.md`, расширенная тематическая разбивка — в `references/decision-rules-extended.md`, production header/main — в `references/header.md`, анти-паттерны и сценарные примеры — в `references/examples.md`.

## Когда обращаться

- Перед каждой секцией экрана составляешь component shopping list — какие готовые Carnica-компоненты нужны
- Решаешь между близкими компонентами: cell 3.1 vs cell grid 2.1 vs card small 2.1, button 2.5 vs button inline text vs button box, tag 2.3 vs badge 2.2 vs adtag
- Импортируешь компонент через Figma Plugin API — нужен точный key (component set vs single component) и правильный variant
- Сверяешь корректность использования (anti-pattern check: ручной pill вместо tag 2.3, createEllipse вместо avatar)
- Выбираешь overlay: dialog 2.1 / action sheet / modal page / Alert / bottom sheet
- Имплементируешь header/main для Beeline WEB — нужна production spec с состояниями (см. `references/header.md`)

## Quick reference

Перед генерацией: **если компонент есть в Carnica — рисовать его вручную ЗАПРЕЩЕНО**. Ручные фреймы допустимы только для layout-контейнеров (wrapper / section / spacer).

### Топ-15 компонентов по частоте (полная таблица — `references/properties.md`)

| Тебе нужно | Компонент | APP key | WEB key | НЕ используй |
|---|---|---|---|---|
| Верхняя панель приложения (back + title + action) | **navbar 3.0** | `37960573...` | — | Ручной фрейм |
| Navbar внутри модалки (close + title) | **navbar modal 1.0** (single!) | `bef5f93f...` | — | navbar 3.0 в модалке |
| Нижний таб-бар приложения | **tabbar beeline 3.0** | `7cdac080...` | — | Ручной ряд иконок |
| Заголовок секции (опц. кнопка справа) | **title 2.1** | `a30889ae...` | `eeb30c20...` | Ручной текст + кнопка |
| Строка списка (иконка + текст + chevron/action) | **cell 3.1** | `b8778e54...` | `20c658e1...` | Ручной HFrame |
| Квадратная плитка в 2-col сетке | **cell grid 2.1** | `ba2d5c74...` | `09271f80...` | cell 3.1 или ручной фрейм |
| Кнопка-плитка с иконкой (быстрое действие) | **button box 1.0** | `a3fcb397...` | — | Ручной круг + label |
| Любая интерактивная кнопка с label | **button 2.5** | `e091f395...` | `535b6bbd...` | Ручной pill |
| Иконка-кнопка (без текста) | **button inline icon 2.1** | `f471bb3d...` | `8a561f76...` | Ручной круг с иконкой |
| Текстовая ссылка («подробнее», «все») | **button inline text 3.0** | `8de7a4cd...` | `1b0e18e5...` | Ручной текст с underline |
| Текстовая метка/статус («подключено», «−30%») | **tag 2.3** | `24b31d42...` | `50cca33a...` | Ручной pill |
| Dot/число-индикатор | **badge 2.2** | `6debf8f1...` | `171654a9...` | Ручной circle |
| Toggle on/off | **switch 2.2** | `a9466b9f...` | `26635849...` | Ручной circle + track |
| Поле ввода (text/phone/card/date/...) | **input 2.3** | `897ac5f2...` | `bd250abb...` | Ручной rectangle + text |
| Модальный диалог (confirm) | **dialog 2.1/2.2** | `296b1e4a...` | `80728eb1...` | Ручной overlay + card |

Полные keys (40-символьный hex) и passports всех ~40 компонентов — `references/properties.md`.

### Импорт через Figma Plugin API

- **Component set** (есть variants `priority`/`size`/`state`/...) — `figma.importComponentSetByKeyAsync(key)`
- **Single component** (без variants, например `navbar modal 1.0`) — `figma.importComponentByKeyAsync(key)`
- Property keys всегда с полным `#uid`-суффиксом — иначе `setProperties()` молча игнорирует

## Decision rules

1. **Navigation / каркас экрана** — выбери `navbar 3.0` для APP-экрана, `navbar modal 1.0` для модалки или bottom sheet (single component, импорт `importComponentByKeyAsync`), `tabbar beeline 3.0` для нижнего таба, `tabbar 2.1` для WEB. Status bar и home indicator — отдельные компоненты, не ручные прямоугольники. Полная таблица каркаса — `references/decision-rules-extended.md §Навигация`.

2. **Заголовок секции + опциональное action справа** — `title 2.1` всегда, не «ручной body/accent/medium + button inline text». Исключение: лёгкий label-заголовок над крупным контентным блоком (лента продуктов) — `body/accent/small`, `content/secondary`, CENTER через `createStyledText`. См. `references/decision-rules-extended.md §Заголовки`.

3. **Вертикальный список** — `cell 3.1` если строка имеет иконку/аватар слева + текст + действие справа. `checkbox 2.1` если множественный выбор. Toggle on/off в строке — `cell 3.1` + `switch 2.2` в right view. Аккордеон — `accordion group 2.2`. Любая попытка собрать строку через ручной HFrame — ошибка. См. `references/decision-rules-extended.md §Списки`.

4. **Cell 3.1 gotchas** (обязательно): variant `background=none` внутри белой карточки (иначе ДОП серый фон); chevron в `❖ right view settings` всегда recolor в `content/secondary` через `recolorVectors()` — default `content/primary` слишком тёмный; divider между cells оборачивай в VFrame с `paddingLeft=72, paddingRight=20` (inset). Полностью — `references/properties.md §APP cell 3.1`.

5. **Сетка 2-3 колонки** — `cell grid 2.1` для информационных плиток (настройки, услуги, toggle), `card small 2.1` для контентных карточек с изображением (промо, товар), `button box 1.0` для быстрых action-плиток с иконкой. Avatar внутри cell grid — обычно `view=icon`, `size=L` (default M слишком мелкий). См. `references/decision-rules-extended.md §Сетки`.

6. **Карточка** — `card large 2.1` для hero/promo, `card medium 2.1` для тарифа/услуги, `card small 2.1` для 2-col товарной сетки, `banner 2.1` для рекламы с action. Группа баннеров (carousel) — `banner group 2.1`. Wallet-card — кастом (свой layout с импортированными токенами + avatar + button + cells).

7. **Кнопка** — `button 2.5` для любой кнопки с label (variants: `priority` primary/secondary/tertiary/destructive, `size` large/medium/small, `view` text/icon), `button inline icon 2.1` для иконка-кнопки без label, `button inline text 3.0` для текстовой ссылки («подробнее»), `button box 1.0` для плитки с иконкой и подписью, `button ux 2.0` для toggle (like/bookmark). См. `references/properties.md §APP button 2.5`.

8. **Button 2.5 layout gotcha** — у `size=large` есть внешний 20px контейнер под fill-layout; редактируй его только когда экран уже владеет side spacing. У `size=medium` и `size=small` сохраняй internal padding, иначе pill визуально ломается. Полностью — `references/examples.md §Anti-patterns`.

9. **Button inline text 3.0 quirk (APP)** — priority пишется `"seсondary"` с **кириллической «с»** (не латинской `s`). Точная строка критична для `setProperties()`. WEB `button inline text 2.1` использует нормальный латинский `secondary`. См. `references/properties.md §APP button inline text 3.0`.

10. **Метка / бейдж** — `tag 2.3` для текстовой метки статуса/категории («подключено», «новый», «−30%»; XS/S size, цвета default/brand/invert/success/error/accent), `badge 2.2` для маленького индикатора (view=dot — красная точка, view=text — число, view=icon), `adtag 2.2/2.1` для рекламной/промо метки. НЕ используй ручной pill.

11. **Tag tone — только разрешённые** (cross-link с `carnica-ux-principles §16`, owner ux-principles): `default` / `brand` (#FFC800) / `invert` (#202632) / `success` / `error`. Цветной `surface-*` токен (yellow/green/blue/violet/magenta/teal/orange/red) как фон тэга — **ЗАПРЕЩЁН**: это фон icon-tile в карточках продуктов, не tag. Label всегда Regular 400, padding/radius фиксированы размером XS/S.

12. **Поле ввода** — `input 2.3` с правильным `type` (text/phone/card/month/date/range/time/password/currency/code) — у каждого type своя маска и клавиатура. Поиск — **`search field 2.2`** (НЕ input!): отдельный компонент с иконкой лупы, кнопкой очистки и состояниями default/activated/entering/filled. Textarea — `text area 2.2`, dropdown — `select 2.1/2.2`, calendar — `date picker 2.2`. См. `references/properties.md §APP input 2.3`.

13. **Overlay / модалка** — `dialog 2.1/2.2` для confirm (заголовок + текст + 1-2 кнопки; фикс. ширина L=600 / M=480 / S=360 на desktop; на mobile становится bottom sheet через `position:fixed; bottom:0`), `action sheet 2.1/2.2` для iOS-листа снизу с действиями (поделиться/удалить), `modal page 2.1` для полноэкранной модальной страницы, `Alert` для системного iOS-алерта. Carnica WEB bottom-sheet — **БЕЗ drag-handle** (это iOS-action-sheet паттерн, не Carnica). Close-button — обязательна на всех viewport, 44×44, stroke X-icon. См. `references/decision-rules-extended.md §Overlays`.

14. **Loading / error / progress** — `spinner 2.1` внутри контента, `fullscreen spinner` overlay, `loading page 2.1` при открытии экрана (APP), `skeleton 2.1` для заглушек контента, `status screen 2.1` для полноэкранного результата (success/error), `error_empty state 3.0` для пустого состояния, `snackbar 2.1` для toast, `progress step bar 2.1` для шагов, `pagination 2.2` для dots-индикатора карусели, `page pagination 2.1` для WEB-пагинации страниц.

15. **Icon variant — outline / filled / stroke** — `outline` (контур) для активного/работающего состояния (wifi работает, bell включён); `filled` (с диагональной полосой) для «отсутствия» / «выключенного» (wifi нет, mute); `stroke` — третий вариант для `plus round` (всегда!) и `close round` внутри уже-круглой кнопки (default `outline` рисует лишний круг). На лендинге, где продаём услугу — берём `outline`.

16. **Header WEB (production)** — `header/main` (component set из `03_WEB-product-components`). Обязательные элементы desktop: burger + BeelineBall logo + search + «помощь». Опциональные: location pill / region alert / basket+badge / «войти» / profile pill. Mobile: только burger + logo + user button / avatar. Логотип ТОЛЬКО через React inline SVG `BeelineBall.tsx`, никогда вручную. Полная spec со всеми 8 состояниями и Figma node-IDs — `references/header.md`.

17. **Анти-паттерн checklist (короткий)** — НЕ используй `figma.createFrame()` для кнопки / строки списка / поля ввода / карточки / разделителя; НЕ используй `figma.createEllipse()` для аватара; НЕ используй `figma.createRectangle()` для toggle; НЕ используй ручной pill для tag/badge; НЕ используй hex напрямую — только `importVariableByKeyAsync`; НЕ используй `figma.createText()` без стиля — `createStyledText` с ключом стиля; `plus round` ТОЛЬКО `style=stroke`; chevron в cell/button inline text ВСЕГДА recolor в `content/secondary`; `figma.createFrame()` всегда с `f.fills = []` (default белый!); absolute positioned дети в auto-layout всегда с `layoutPositioning='ABSOLUTE'`. Полный список — `references/examples.md §Анти-паттерны`.

## See also

- `carnica-ui-kit-app` — capability для APP-компонентов (Figma Plugin API import workflow, property keys, метод A для текстов внутри инстансов)
- `carnica-ui-kit-web` — capability для WEB-компонентов
- `carnica-design-system` — Figma library keys, color tokens, spacing (owner color tokens — этот skill копирует ≤ 3 значения inline)
- `carnica-ux-principles` — §15 регистр текста, §16 фоны тэгов (owner правила tag tone)
- `carnica-typography` — стили текста внутри компонентов и standalone `createStyledText`
- `carnica-gotchas` — chevron recolor, button padding, plus round stroke, и др. известные ловушки Plugin API
- `references/decision-rules-extended.md` — полная тематическая разбивка (10 групп) с обоими decision-rules файлами, объединёнными dedup-стратегией
- `references/properties.md` — component passports (~25 компонентов) с variants, property keys, gotchas
- `references/header.md` — production header/main для Beeline WEB: 8 состояний (desktop / mobile × неавторизованная / авторизованная / корзина / регион), точные spacing и цветовые токены, Figma node-IDs для восстановления через MCP
- `references/examples.md` — полная anti-patterns таблица, checklist перед каждой секцией, сценарные decision trees, cross-component compositions

---

## Acceptance checklist

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (10 RU + 7 EN) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться` (D-09).
- [x] Файл ≤ 500 строк (hard limit ARCH-02 пройден с запасом).
- [x] Тяжёлый материал (полные таблицы > 15 строк, passports, production header spec, anti-patterns) вынесен в `references/*.md` (§ 9 architecture).
- [x] **НЕТ секции `## @references`** — запрещено для reference skill (D-08, leaves графа). Использован `## See also`.
- [x] Контент пересекается с `carnica-ux-principles §16` (tag tone) — owner ux-principles, в SKILL.md inline правило + ссылка (§ 7 architecture, D-27 OWNER pattern).
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Footer указывает `Source: ...` (мигрант из 5 sources).
- [x] Imperative form в body: «Выбери», «Не используй», «Перекрась» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют в imperative секциях.
