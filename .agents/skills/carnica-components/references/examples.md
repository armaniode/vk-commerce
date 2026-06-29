# Component Examples — Anti-patterns, Checklists, Decision Scenarios

Полный сборник анти-паттернов, чеклистов и сценарных примеров «когда какой компонент» для Carnica. Дополняет `references/decision-rules-extended.md` (тематические таблицы) конкретными «до/после» и cross-component compositions.

## Table of contents

1. Анти-паттерны — полный список «не делай / вместо этого»
2. Checklist перед каждой секцией экрана
3. Декomposition scenarios — when component to use
4. Cross-component compositions (типовые сборки экранов)
5. Property keys gotchas

---

## 1. Анти-паттерны — полный список «не делай / вместо этого»

Если компонент есть в Carnica — рисовать вручную **ЗАПРЕЩЕНО**. Ручные фреймы допустимы только для layout-контейнеров (page wrapper, section container, spacer).

| НИКОГДА не делай | Вместо этого |
|---|---|
| `figma.createFrame()` для кнопки | `importComponentSetByKeyAsync` → button 2.5 |
| `figma.createEllipse()` для аватара | avatar 3.0 (view=text, color=brand) |
| `figma.createRectangle()` для toggle | switch 2.2 |
| `figma.createFrame()` для строки списка | cell 3.1 |
| Ручной pill-фрейм для тега/бейджа | tag 2.3 или badge 2.2 |
| Цветной `surface-*` токен (yellow/green/blue/violet/magenta/teal/orange/red) как фон **тэга** | `tag 2.3` c color = `default`/`brand`/`invert`/`success`/`error` (см. ux-principles §16) |
| Написание UI-текста CAPS-ом (`ИТОГ`, `ОФОРМИТЬ`) или CSS `uppercase` | Lowercase всегда, исключения — имена/бренды/адреса/аббревиатуры (см. ux-principles §15) |
| Точка в конце последнего предложения подписи/кнопки | Убрать точку — она остаётся только как разделитель внутри абзаца |
| Ручной фрейм для карточки | card large/medium/small 2.1 |
| Ручной текст + кнопка для заголовка секции | title 2.1 |
| Ручные dots для пагинации | pagination 2.2 |
| Ручной прямоугольник для разделителя | divider horizontal 2.0 |
| Ручной spinner/loading | spinner 2.1 или loading page 2.1 |
| Hex-цвета напрямую (`solid('#FFC800')`) | `importVariableByKeyAsync` → переменные Carnica |
| `figma.createText()` без стиля | `createStyledText` с ключом из 02_Carnica typography |
| Ручной фрейм для поля ввода | input 2.3 (type=text/phone/card...) |
| Ручные chip-кнопки в ряд | chips text collection 2.1 |
| `figma.createFrame()` без `f.fills = []` | Всегда очищать fills — frames по дефолту **белые** |
| `resetPadding(btn)` без проверки size | Обнулять padding только у `size=large`, medium сохраняет defaults |
| `plus round` с `style=outline` | `plus round` ТОЛЬКО `style=stroke` (единственное исключение) |
| Chevron в cell/button inline text с default цветом | Перекрасить в `content/secondary` через `recolorVectors()` |
| Absolute positioned дети внутри auto-layout без `layoutPositioning='ABSOLUTE'` | Явно устанавливать `layoutPositioning='ABSOLUTE'` для card-holder стопки |
| Drag-handle сверху в WEB bottom-sheet | Убрать — это iOS-action-sheet паттерн, не Carnica WEB |
| Закрытие dialog только swipe-down на mobile | Close-button обязательна на всех viewport, 44×44, stroke X-icon |
| `font` shorthand с `inherit` family для button | Отдельно `font-weight: 500` + `font-family: ...` (Safari ignores shorthand) |
| `navbar 3.0` внутри модалки | `navbar modal 1.0` (single component, `importComponentByKeyAsync`) |
| Импорт `navbar modal 1.0` через `importComponentSetByKeyAsync` | `importComponentByKeyAsync` — это single component, не set |
| Произвольная ширина dialog (`max-width: 520px`) | Фиксированные L=600 / M=480 / S=360 (см. decision-rules-extended §13) |
| `outline-X` иконка внутри close-button | `stroke-X` (две `<path>`), потому что close уже круглая |
| Cell с `background=default on bg_secondary` внутри белой карточки | `background=none` (`default on bg_secondary` даёт ДОП серый фон) |
| Avatar по умолчанию `size=M` в cell grid 2.1 | Установи `size=L` — это рабочий паттерн, default слишком мелкий |
| Latin `secondary` для APP `button inline text 3.0` | Кириллическая «с»: `"seсondary"` — точная строка для setProperties |

## 2. Checklist перед каждой секцией экрана

Перед написанием кода `use_figma` для каждой секции:

- [ ] Составил список UI-элементов в секции
- [ ] Для каждого элемента проверил — есть ли компонент в таблицах `references/decision-rules-extended.md`
- [ ] Для каждого компонента записал: key, нужный variant, какие свойства менять
- [ ] Все цвета — через `importVariableByKeyAsync`, ни одного hex
- [ ] Все тексты вне компонентов — через `createStyledText` с ключом стиля
- [ ] Все тексты внутри компонентов — через Метод A (Inter Fallback)
- [ ] Ручные фреймы — ТОЛЬКО для layout-контейнеров (wrapper, section, spacer)
- [ ] Все `createFrame()` имеют `f.fills = []` (helper `createVFrame` должен делать это автоматически)
- [ ] Все cell 3.1 с right view — chevron перекрашен в `content/secondary` через `recolorVectors()`
- [ ] Plus round иконка использует `style=stroke` (не outline)
- [ ] Button 2.3 medium не получил `resetPadding` (только large обнуляем)
- [ ] Tag tone — только `default`/`brand`/`invert`/`success`/`error` (не surface-*)
- [ ] `navbar modal 1.0` импортирован как single component (`importComponentByKeyAsync`)
- [ ] avatar в cell grid 2.1 имеет `size=L` (не дефолт M)
- [ ] APP `button inline text 3.0` priority пишется кириллической «с» (`"seсondary"`)
- [ ] Dialog/modal page использует фиксированную ширину L/M/S, не произвольную
- [ ] Close-button в dialog видна на всех viewport
- [ ] Absolute positioned дети auto-layout имеют `layoutPositioning='ABSOLUTE'`

## 3. Декomposition scenarios — when component to use

Конкретные сценарии «что нужно → какой компонент»:

| Сценарий | Компонент | Почему |
|---|---|---|
| Список настроек: иконка + название + chevron | `cell 3.1` (right view = chevron) | стандартная строка списка с action |
| Список с checkbox для множественного выбора (например, «выбрать темы») | `checkbox 2.1` (не cell + ручной чекбокс) | специальный компонент со своим state |
| Toggle включения функции в строке списка | `cell 3.1` + `switch 2.2` в right view | toggle всегда внутри cell, не самостоятельно |
| Профиль с аватаром, именем, статусом, chevron | `cell 3.1` с left view=avatar | универсальная строка с аватаром |
| 2-3 быстрых action на главной (платежи, история) | `button box 1.0` (плитки) | специальный компонент для quick actions |
| 4-6 информационных плиток (security, услуги) | `cell grid 2.1` (avatar `size=L`) | информационная сетка, не button-box |
| Карточка тарифа с фото + цена + кнопка | `card medium 2.1` | контентная карточка с media |
| Промо-баннер с CTA на главной | `banner 2.1` (APP) или `banner card 2.1` (WEB) | рекламный блок |
| Карусель из 3-5 баннеров | `banner group 2.1` | компонент-обёртка карусели |
| Заголовок «мой тариф» + кнопка «изменить» справа | `title 2.1` (subtitle false, right action true) | section title с action |
| Заголовок «другие продукты билайна» НАД feed-блоком | standalone `body/accent/small`, `content/secondary`, CENTER | label-заголовок (легче title 2.1) |
| Подтверждение действия («удалить?») с двумя кнопками | `dialog 2.1` (M size, mobile → bottom sheet) | confirm-модалка |
| iOS-лист действий «поделиться / сохранить / удалить» | `action sheet 2.1` | iOS-нативный паттерн |
| Полноэкранная модальная страница с формой | `modal page 2.1` | большой контент с close |
| Аватар пользователя 40×40 | `avatar 3.0` (view=image или view=text, size=M) | не ручной ellipse |
| Группа из 3-4 аватаров (участники) | `avatar group 3.0` | специальный компонент стопки |
| Кнопка «все функции >» под списком (APP) | `button inline text 3.0` (priority `"seсondary"` — кириллическая «с», right icon chevron-right с recolor) | inline-ссылка с chevron |
| Кнопка «smile» / лайк / закладка | `button ux 2.0` (toggle) | UX-кнопка с состояниями |
| Поле ввода телефона | `input 2.3` (type=phone) | type=phone имеет правильную маску |
| Поле поиска в каталоге | `search field 2.2` (не input!) | отдельный компонент с состояниями |
| Аккордеон FAQ | `accordion group 2.2` | сворачиваемые секции |
| Линейный прогресс «1/5 шагов» | `progress step bar 2.1` | пошаговый прогресс |
| Dots под каруселью | `pagination 2.2` | специальный компонент-индикатор |
| Loading при открытии экрана (APP) | `loading page 2.1` | полноэкранный fullscreen-spinner |
| Skeleton-заглушки для feed-карточек | `skeleton 2.1` | placeholder контента |
| Snackbar «добавлено в избранное» | `snackbar 2.1` | toast-уведомление |

## 4. Cross-component compositions (типовые сборки экранов)

Типовые сценарии «комбинации компонентов для одного экрана»:

### Главный экран приложения (APP home)

```
navbar 3.0 (style=glass) + stories
  ↓
balance card (custom — wallet-card композиция: avatar + body/medium + body/small + buttons)
  ↓
bundle card (плотный info-блок, см. wallet exec spec)
  ↓
ленте «другие продукты билайна» (white card с секциями):
  label body/accent/small CENTER
    →section: visual anchors + body/accent/medium title CENTER + body/small description + button 2.5 secondary CTA
  ↓
tabbar beeline 3.0 (нижний таб-бар)
```

### Экран настроек / профиля (APP)

```
navbar 3.0 (style=default, title=true)
  ↓
white card (cornerRadius=32, padding=20):
  cell 3.1 (left view=avatar) — профиль
  divider horizontal 2.0 (paddingLeft=72, paddingRight=20)
  cell 3.1 — секция настроек (с chevron, recolor в content/secondary)
  cell 3.1 + switch 2.2 — toggle-настройка
  ...
  button inline text 3.0 (priority="seсondary", right icon=chevron) — «все функции >»
  ↓
tabbar beeline 3.0
```

### Confirm dialog (WEB)

```
backdrop (rgba(25,28,34,0.72) + blur 4px)
  ↓
dialog 2.1 — M size (480 px), bg/primary (#F0F3F5)
  close-button 44×44 (top:16 right:16, white, stroke-X icon)
  title в body/medium 20/400 (Carnica, не bold)
  body в body/small 16/400
  button 2.5 row (primary + secondary on bg_primary) — default 2 кнопки
```

### Wallet экран (APP)

```
clipped main frame (h=812, clipsContent=true)
  ↓
navbar 3.0 (style=glass, background=true, no title)
  ↓
selected wallet card (bg=brand/primary #FFC800, h=200 FIXED)
  number-info row (avatar + phone + balance)
  actions row (2 × button 2.5 style=glass)
  ↓
fast-actions white card (3 × cell 3.1 + 2 dividers + button inline text 3.0)
  ↓
collapsed cards stack (3 × cards, layoutPositioning='ABSOLUTE'):
  card-3 (ближняя, w=367, top=732, shadow)
  card-2 (средняя, w=330.3, top=722, shadow)
  card-1 (дальняя, w=297.27, top=712, без shadow)
```

### Header/main для WEB-магазина

См. полную spec — `references/header.md`. Краткая структура (desktop, неавторизованная):

```
header (px=40, py=16, backdrop-blur 15, overlay/s):
  LEFT (flex-1, gap=24):
    burger menu (button 2.1 icon)
    location pill (Send icon + «Москва»)
  CENTER:
    BeelineBall 44×44 (React inline SVG, НЕ ручной SVG!)
  RIGHT (flex-1, gap=8, justify-end):
    search (button 2.1 icon)
    «помощь» (button 2.1 text)
    «войти» (button 2.1 text, bg=brand/primary yellow)
```

## 5. Property keys gotchas

Конкретные ловушки property keys, которые легко пропустить:

- **`button inline text 3.0` (APP) priority — `"seсondary"` с кириллической «с».** Точная строка критична для `setProperties`. Latin `secondary` молча игнорируется. WEB `button inline text 2.1` использует нормальный латинский `secondary`.

- **`navbar modal 1.0` — single component, не set.** Импорт через `importComponentByKeyAsync`, иначе `importComponentSetByKeyAsync` бросит исключение.

- **`navbar 3.0` title control.** Чтобы скрыть title (например, на wallet экране): `settings.setProperties({'title#27239:0': false})`. Не путать с `↩︎ title#27230:0` (текст внутри title).

- **`cell 3.1` chevron recolor.** Default chevron в `❖ right view settings` — `content/primary` (тёмный). После создания cell всегда: `recolorVectors(rightView, paintCS)` где `paintCS = solidPaint(contentSecondaryVariable)`.

- **`cell 3.1` background в белой карточке.** Использовать `background=none`, не `default on bg_secondary` (он даёт ДОП серый фон внутри белой обёртки).

- **`cell grid 2.1` avatar size=L.** Дефолт avatar внутри cell grid — `size=M`, но обычно нужен `size=L`: 
  ```js
  const avatar = cellGrid.findOne(n => n.name.includes('avatar') && n.type === 'INSTANCE');
  avatar.setProperties({ view: 'icon', size: 'L' });
  ```

- **`button 2.5` layout padding.** У `size=large` есть внешний 20px контейнер под fill-layout; редактируй его только когда экран уже владеет side spacing. У `size=medium` и `size=small` сохраняй internal padding.

- **`iOS_NumericKeyboard` встроенная кнопка.** При `button#931:1=true` показывается CTA-кнопка над клавиатурой — не добавляй отдельный button. Доступ: `keyboard.findOne(n => n.name === 'button 2.1')`.

- **`chips text collection 2.1` wrap=true.** Чтобы wrapped chips центрировались: `chips.counterAxisAlignItems = 'CENTER'`, `chips.primaryAxisAlignItems = 'CENTER'`.

- **`checkbox 2.1` BOOLEAN issue.** Некоторые BOOLEAN properties могут не применяться через `setProperties`. Fallback: `.visible = false/true` на nested label nodes. Mixed text colors — `setRangeFills`.

- **`accordion group 2.2` line visibility.** Управляется BOOLEAN, не `count` variant. Скрыть линии 2-10: `accordionGroup.setProperties({ '2 line#17341:8': false, '3 line#17341:9': false, ... })`.

- **`plus round` icon — `style=stroke` всегда.** Единственная иконка, где `outline` ломает визуал (рисует лишний круг вокруг `+`). Аналогично `close round` внутри уже-круглой кнопки.

- **`figma.createFrame()` default белый.** Всегда сразу `f.fills = []` после создания, иначе frame с белым фоном просочится в дизайн. Использовать helper `createVFrame` / `createHFrame`, который очищает fills автоматически.

- **Absolute positioning в auto-layout.** Children с absolute position обязательно `card.layoutPositioning = 'ABSOLUTE'`, иначе auto-layout родителя двигает их по своей логике. Применимо к card-holder стопке (wallet collapsed cards).

---

*Owner: `carnica-components` skill (D-08 leaves rule).*
