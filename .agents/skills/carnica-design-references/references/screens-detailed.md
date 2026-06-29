# Screens Detailed — Carnica Design References

Детальные паттерны компонентов из реальных макетов Beeline 2026 + полные mobile/web spacing-таблицы + concrete reference screens (главный экран redesign + wallet redesign с card-holder).

> **Role:** этот файл — examples и observations из реальных макетов. Правила (типографика / цвет / spacing-токены) лежат в owner skills — `carnica-typography`, `carnica-design-system`, `carnica-visual-patterns`. Здесь — конкретные значения из 20 эталонных экранов.

## TOC

1. [Mobile spacing — точные значения](#1-mobile-spacing--точные-значения)
2. [Web spacing — desktop (1440px)](#2-web-spacing--desktop-1440px)
3. [Web spacing — mobile adaptive (375px)](#3-web-spacing--mobile-adaptive-375px)
4. [Паттерны компонентов — Buttons](#4-паттерны-компонентов--buttons)
5. [Паттерны компонентов — Pills / Chips](#5-паттерны-компонентов--pills--chips)
6. [Паттерны компонентов — Cards](#6-паттерны-компонентов--cards)
7. [Паттерны компонентов — Lists](#7-паттерны-компонентов--lists)
8. [Паттерны компонентов — Navigation](#8-паттерны-компонентов--navigation)
9. [Паттерны компонентов — Toggles / Badges / Banners](#9-паттерны-компонентов--toggles--badges--banners)
10. [Главный экран redesign — reference](#10-главный-экран-redesign--reference-gs-1-node-217-39898)
11. [Wallet redesign — reference](#11-wallet-redesign--reference-gs-3-node-220-5796)
12. [Типографика в wallet-card](#12-типографика-в-wallet-card)

---

## 1. Mobile spacing — точные значения

Из реальных макетов мобильного приложения (viewport 375px).

| Элемент | Значение |
|---|---|
| Page horizontal padding | 16px |
| Между секциями | 12-24px |
| Card internal padding | 16px horizontal, 14-20px vertical |
| Card border-radius | 16-20px (rounded-xl ~ rounded-2xl) |
| Список — высота строки | 48-56px |
| Список — иконка | 40px circle |
| Список — иконка → текст | 12-16px |
| Navigation bar | 56px высота |
| Tab bar | 56px высота |
| Touch target | 40-44px минимум |
| Stories/carousel gap | 8-12px |
| Grid gap (2 колонки) | 8px |
| Button height M | 44px |
| Button height L | 56px |

Между крупными секциями (верхний блок данных и нижний блок действий) — 40-80px (UX-принцип §8 «воздух»).

## 2. Web spacing — desktop (1440px)

Из реальных макетов веб-сайта beeline.ru (desktop viewport 1440px).

| Элемент | Значение |
|---|---|
| Viewport | 1440px |
| Content max-width | 1200px (120px отступы по бокам) |
| Header | px=40px, py=16px, высота ~76px |
| Между секциями | 60-80px |
| Card padding | 24-32px |
| Card border-radius | 24-32px |
| Button height L | 56px |
| Button height M | 44px |
| Chip height | 44px |
| Product card S | 218px ширина |
| Product card M | 460px ширина |
| Grid gap | 8-32px (зависит от контекста) |
| Footer height | 784px |

Header — `px=40` (десктоп horizontal padding); карточки в основном контенте — `px=24-32`. См. также `carnica-components/references/header.md` для anatomy header/main.

## 3. Web spacing — mobile adaptive (375px)

Из реальных макетов веб-сайта beeline.ru в мобильной адаптации (viewport 375px).

| Элемент | Значение |
|---|---|
| Viewport | 375px |
| Page horizontal padding | 4px (full-bleed frame), 20px внутри карточек |
| Card border-radius | 32px |
| Product card M | 327px (full-width) |
| Product card S | 160px (половина) |
| Between cards | 8px |
| Hero banner | 466px высота |
| Category card | 140x140px |
| Brand logo | 84x84px circle |

Отличие от mobile APP — на web mobile-адаптиве page horizontal padding 4px (full-bleed), а не 16px. Внутри карточек — 20px. cornerRadius 32 (а не 16-20 как в APP).

## 4. Паттерны компонентов — Buttons

Из реальных макетов (см. также `carnica-components` для decision rules «какой button»).

- **Primary CTA**: жёлтый `brand/primary` #FFC800, pill-форма, 44-56px высота
- **Secondary**: белый или прозрачный с border, pill-форма
- **Destructive**: оранжево-красный текст `error/primary` #F84A00, без фона — только для «выйти» (lowercase per `carnica-copy-tone`)
- **Inline text**: текстовая ссылка, `body/accent/small` 16/500, без подчёркивания

Button label inside `button 2.5` — `body/accent/small` Medium 500. Custom button label через `createStyledText` — `body/small` Regular 400 (`carnica-typography` weight rule).

## 5. Паттерны компонентов — Pills / Chips

Из реальных макетов (`chips text collection 2.1`, segmented control, custom pill).

- **Container**: округлый radius 24-64, серый фон `background/primary` #F0F3F5
- **Active tab**: белый фон + лёгкая тень ИЛИ жёлтый `brand/primary`
- **Inactive**: прозрачный
- **Высота**: 44px
- **Padding**: 12-16px horizontal

Pill button label в wallet-card (selected) — `body/accent/small` 16/500 на жёлтом фоне. См. также §11.

## 6. Паттерны компонентов — Cards

Из реальных макетов (`card large 2.1`, `card medium 2.1`, `card small 2.1`, custom card frames).

- **Фон**: белый `background/secondary` #FFFFFF
- **На сером фоне** `background/primary` #F0F3F5
- **border-radius**: 16-32px (mobile APP 16-20 / web 24-32)
- **Без теней** или очень лёгкие (drop shadow 8% opacity, blur 10, y=-2 для собранных карт стопки)
- **Padding**: 16-24px (mobile APP 16h/14-20v; web 24-32)
- **clipsContent: true** — обязательно для feed-блоков, card-holder, hero-баннеров

Карточки на главном экране Beeline 2026 НЕ обёрнуты в белый wrapper — каждая отдельная белая card прямо на сером фоне. См. §10.

## 7. Паттерны компонентов — Lists

Из реальных макетов (`cell 3.1`, custom list rows).

- **Icon circle**: 40px, серый фон `background/primary`
- **Title**: Medium 500 (внутри `cell 3.1`) или Regular 400 (custom через `createStyledText`)
- **Subtitle**: Regular 400, `content/secondary`
- **Chevron**: 24px, перекрашен в `content/secondary` через `recolorVectors()` (правило `carnica-components`)
- **Разделитель**: 1px hairline `border/secondary` #E2E6ED или без разделителей (только spacing)
- **Row height**: 48-56px
- **Iconaround → text gap**: 12-16px

Inset divider — обёрнутый в VFrame с `paddingLeft=72, paddingRight=20` — разделитель начинается от иконки и не выходит к правому краю.

## 8. Паттерны компонентов — Navigation

Из реальных макетов (`navbar 3.0`, `tabbar beeline 3.0`).

- **Back arrow**: top-left, круглая pill 44×44 (white/grey/glass background)
- **Page title**: centered (mobile iOS convention) или left-aligned (web)
- **Action icons**: top-right, 44×44 pill
- **Bottom tab bar**: 56px высота, icons + labels (caption 11-12px), yellow active indicator
- **Status bar iOS**: 47px (mobile device frame); в web-продакшене не рендерится

`style=glass` на navbar — полупрозрачные кнопки с blur (используется в reference screens главного экрана и wallet, см. §10-11).

## 9. Паттерны компонентов — Toggles / Badges / Banners

Из реальных макетов.

**Toggles** (`switch 2.2`):
- **ON**: тёмный `content/primary` #28303F (НЕ зелёный — монохромная эстетика Beeline)
- **OFF**: `elements/secondary` #E2E6ED
- **Высота**: ~24px

**Tags / Badges** (`tag 2.3`, `badge 2.2`):
- **Жёлтый** фон `brand/primary` — для скидок (`color=brand`)
- **Зелёный** / **синий** `success/error` — для информационных статусов (бесплатная доставка, трейд-ин)
- **Высота**: 32px, pill radius
- **Размер текста**: caption 12-13px

Запрещённые цветные surface-токены (`bg-surface-yellow/green/blue/violet/magenta/teal/orange/red`; legacy `bg-bee-surface-*`) — они для icon-подложек в карточках товаров, НЕ для tag-фонов. Owner правила — `carnica-ux-principles` §16.

**Banners (промо)**:
- **Тёмный фон** #222731 с яркими градиентами/фото
- **border-radius**: 24px
- **Контраст** с основным светлым интерфейсом — фокус внимания

## 10. Главный экран redesign — reference (GS-1, node 217-39898)

**File**: `GJXKeWvj14GIQ8EOw9Arac` (Carnica редизайн 2026)
**Node**: `217-39898`
**Тип**: APP, mobile 375px

### Navbar на главном экране

- `style=glass`, `background=true` — полупрозрачные кнопки
- Левая кнопка: аватар пользователя (без badge)
- Правая кнопка: bell + badge (view=dot)
- 2-я правая кнопка: включается через `❖ right view settings` → `2 button#27230:17=true`
- Иконки перекрашиваются в `content/secondary` через fills на VECTOR-нодах
- Stories: круглые аватары по центру навбара (absolute positioning)

### Account section

- Текст "основная сим" (или аналогичный) — `body/accent/small`, `content/secondary`, CENTER
- Номер телефона в белой pill (`background/secondary`, pill radius 100)
- Стиль номера: `display/small` (32/400/36), `content/primary`
- "все номера" — белая pill (`background/secondary`), `caption/medium`, `content/primary`

### Контент без белого wrapper

На главном экране карточки (баланс, bundle, digital family) располагаются **прямо на сером фоне** (`background/primary`), без общего белого контейнера. Каждая карточка — отдельный белый блок с `cornerRadius: 32`, `padding: 20`.

### Продуктовая лента

- Заголовок "другие продукты билайна": `body/accent/small`, `content/secondary`, CENTER
- Единый белый блок с секциями (стим, фильмы, игры, кэшбэк, книги)
- Каждая секция: визуальный якорь (обложки) + заголовок + описание + CTA-кнопка
- Заголовки секций: `body/accent/medium`, CENTER
- CTA: `button 2.5` secondary, text view, по центру

## 11. Wallet redesign — reference (GS-3, node 220-5796)

**File**: `GJXKeWvj14GIQ8EOw9Arac` (Carnica редизайн 2026)
**Node**: `220-5796`
**Тип**: APP, mobile 375px

### Navbar без заголовка

- `style=glass`, `background=true`
- Левая кнопка: chevron-left (back), glass pill
- Правая кнопка: `plus round` **style=stroke** (тонкий «+» без круга), glass pill
- **Title скрыт**: `settings.setProperties({'title#27239:0': false})`
- Высота ~123px (status bar + padding + 44h buttons row)

### Selected wallet-card (жёлтая)

- `bg=brand/primary` (#FFC800), `cornerRadius=32`, `padding=16`, `h=200 FIXED`
- Wrapper с `paddingLeft/Right=4` от края экрана (правило alt-padding 4px из `carnica-ux-principles` §10)
- **number-info row** (HFrame, gap=8, items-center):
  - `avatar 3.0` (`view=image`, `size=M`, `disabled=false`) — placeholder для фото
  - Text wrapper (VFrame, gap=0, FILL):
    - Phone `body/medium` (20/400), `content/primary`
    - Subtitle `body/small` (16/400), `content/primary` opacity=0.6
  - Balance `body/small`, `content/primary` opacity=0.6
- **actions row** (HFrame, gap=4, justify-between через SPACE_BETWEEN на card):
  - 2 × `button 2.5` (style=glass, priority=secondary on bg_secondary, view=text, size=medium)
  - Padding medium сохранён (16h/12v) — pill-форма

### Fast-actions (под selected card)

- Wrapper (VFrame, `paddingLeft/Right=20`, gap=12, items-center)
- **White card** (`bg=background/secondary`, `cornerRadius=32`, clipsContent):
  - 3 × `cell 3.1` (`background=none`, `title size=S`, padding=16):
    - Иконка (swap/refresh/lock outline) swap в `❖ left view settings → avatar → icon`
    - Title + subtitle через Method A
    - **Chevron recolor** в `content/secondary` через `recolorVectors(rightView, paintCS)`
  - 2 × `divider horizontal 2.0` (между cells), обёрнуты в VFrame с `paddingLeft=72, paddingRight=20` (inset)
- **button inline text 3.0** "все функции >":
  - `priority="seсondary"` (кириллическая «с»!)
  - `right icon#623:0=true`, swap на chevron-right
  - **Chevron recolor** в `content/secondary`

### Card-holder стопка (правило alt-padding 4px от края)

- 3 collapsed wallet-cards через `layoutPositioning='ABSOLUTE'` на main frame
- Main frame: `primaryAxisSizingMode='FIXED'`, `h=812`, `clipsContent=true`
- **Постепенное увеличение ширины и top** (narrow→wide, near→far):

| # | Ширина | Top | Height | Padding | Radius | Shadow |
|---|---|---|---|---|---|---|
| 1 (дальняя) | 297.27 | 712 | 162 | 12.96 | 25.92 | нет |
| 2 (средняя) | 330.3 | 722 | 180 | 14.4 | 28.8 | y=-2, blur=10, 8% |
| 3 (ближняя/видимая) | 367 | 732 | 200 | 16 | 32 | y=-2, blur=10, 8% |

- Каждая card центрируется: `card.x = (375 - card.width) / 2` → x=39/22/4
- Клиппинг main обрезает низ — видно только верхние ~80px самой ближней карты
- Внутреннее содержимое масштабируется через `scale = w / 367` (avatar size, item gap)

### Collapsed wallet-card (свёрнутая)

- `bg=background/secondary` (белая) + drop shadow (для 2/3 карты)
- **number-info row**: avatar `view=text` с green SOLID fill (`#00C06D`) + "М" + phone + subtitle + balance
- **actions row**: 2 × `button 2.5` (style=glass, priority=secondary on bg_primary — серый полупрозрачный)
- Самая верхняя (видимая) collapsed card: `Любимая ❤️` (title в `body/medium`) + "eSIM • +7 999 123 45 67" (subtitle)

## 12. Типографика в wallet-card

Конкретные стили из reference screen wallet (см. также `carnica-typography` для общих правил weight 400/500).

| Элемент | Стиль Carnica | Размер |
|---|---|---|
| Phone в selected | `body/medium` | 20/400 |
| Subtitle "eSIM • основная" | `body/small` | 16/400, opacity 0.6 |
| Balance "320.34 ₽" | `body/small` | 16/400, opacity 0.6 |
| Pill button label "моя подписка" | `body/accent/small` | 16/500 |
| Phone в collapsed | `body/medium` | 20/400 |
| Avatar label "М" | `body/accent/small` | 16/500 |

Все `*/accent` стили (Medium 500) — только внутри готовых компонентов (`button 2.5`, `avatar 3.0`). В кастомных текстах через `createStyledText` использовать Regular 400 (`carnica-typography` D-rule #12).
