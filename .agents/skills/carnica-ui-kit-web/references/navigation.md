# Carnica UI-kit WEB — Navigation

Источник паспортов навигационных компонентов WEB. См. `../SKILL.md` для Quick Start, Decision tree и top gotchas. Production header — см. `.agents/skills/carnica-components/references/header.md` (react-реализация для beeline.ru).

---

## title 2.1

**Library Key**: `eeb30c20a4a66a372b6542c388d8d737ab043650` | **20 variants**

| Variant | Values |
|---------|--------|
| `size` | `XL`, `L`, `M`, `S` |
| `reverse` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#17678:0` | TEXT | `часто задаваемые вопросы` |
| `↩︎ subtitle#17678:21` | TEXT | `поговорим о важном` |
| `subtitle#277:1` | BOOLEAN | `true` |
| `one more subtitle#6970:2` | BOOLEAN | `true` |

> WEB title имеет size=XL (нет в APP) и другие TEXT-ключи (`#17678:0` vs APP `#617:6`).

---

## tab 2.1

**Library Key**: `a4f75accc99eeb7c07e6662ca6263fcbe8800c26` | **12 variants**

| Variant | Values |
|---------|--------|
| `count` | `2`, `3`, `4`, `5`, `6` |
| `size` | `S`, `M` |
| `skeleton` | `false`, `true` |

---

## tabbar 2.1

**Library Key**: `d8bf38f5590d58cb3551c26bf7f763f04c204c8f` | **80 variants**

| Variant | Values |
|---------|--------|
| `device` | `mobile`, `desktop/tablet` |
| `invert` | `false`, `true` |
| `count` | `3`, `4`, `5` |
| `activated left button` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `left button#3295:2` | BOOLEAN | `true` |
| `left hover#12547:128` | BOOLEAN | `false` |
| `right counter#12547:146` | BOOLEAN | `true` |

---

## breadcrumbs 2.2

**Library Key**: `50fba4630c11fbd27a75e24b1eb052c4a4f351a7` | **10 variants**

| Variant | Values |
|---------|--------|
| `count` | `2`, `3`, `4`, `5` |
| `invert` | `false`, `true` |

> WEB-only компонент. Разделитель — «/», не «>».

---

## segmented control 2.2

**Library Key**: `d076561458b98eb603fbf38a6bad8d5e501ae02b` | **10 variants**

| Variant | Values |
|---------|--------|
| `type` | `text`, `icon` |
| `count` | `2`, `3` |
| `invert` | `false`, `true` |
| `skeleton` | `false`, `true` |

---

## address bar 1.0

**Library Key**: `c50cf7085e6dc07c3b0a410eabe3810f2501c91c` | **8 variants**

| Variant | Values |
|---------|--------|
| `device` | `mobile`, `desktop/tablet` |
| `mode` | `light`, `dark` |
| `type` | `full`, `compact` |

> WEB-only mockup адресной строки браузера. Не путать с настоящим browser-chrome.

---

## divider horizontal 2.0

**Library Key**: `b47c4cb27bbb001084f9c43d8c4e977c0c9eb00f` | **SINGLE**

## divider vertical 2.0

**Library Key**: `99bc08208de8a0d6600b527ce81a1a01e6fbdcad` | **SINGLE**

---

## header/main (production beeline.ru)

WEB-header реализация (light mode) — `header/main` component set из библиотеки `03_WEB-product-components` (Figma file `FU4Chchxuwku66ILPSG9mA`, component set node `75:589`).

Полная production-spec (variants по состояниям, точные spacing-токены, dark mode, mobile-вариант, BeelineBall logo инлайн SVG, IconBurgerMenu/IconSearch/IconBasket/IconUser ассеты) — `.agents/skills/carnica-components/references/header.md`. Этот файл — единственное место канонической спецификации `header/main`.

**Ключевое для импорта**:
- Component set уже содержит 8+ вариантов состояний (`desktop/неавторизованная/light`, `desktop/регион/light`, `desktop/корзина + авторизовання/light`, `mobile/неавторизованная/light` и др.).
- Каждый вариант — отдельный node-ID. Для импорта по node-ID использовать соответствующий Figma file key (`FU4Chchxuwku66ILPSG9mA`) и нужный variant.
- На single-page demo используется light mode; dark mode (node-IDs +2000..+3000) подкачивается отдельно через Figma MCP при необходимости.

**Обязательные элементы** (desktop): burger + logo + search + «помощь» + always-blurred overlay/s 30% opacity + backdrop-blur 15px.

**Опциональные элементы по состоянию**:
- `неавторизованная` → location pill + «войти» (yellow).
- `регион` → region alert 446×44 white pill (заменяет location).
- `авторизованная` → location pill + profile pill (avatar + номер).
- `корзина + ...` → добавить basket+badge слева от search.

Запрещено: ручной SVG логотипа beeline (только через `BeelineBall` React-компонент), hex `#FFC800` напрямую (только `bg-brand-primary` Tailwind token; legacy `bg-bee-yellow`), изменение порядка на desktop (burger → logo center → basket → search → help → войти/profile).
