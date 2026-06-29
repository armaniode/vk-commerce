# Header Component — Beeline WEB

Production-grade спецификация компонента **header/main** из Figma-библиотеки `03_WEB-product-components`. Применяется на всех страницах веб-магазина beeline.ru.

- **Figma file:** `FU4Chchxuwku66ILPSG9mA`
- **Component set:** `header/main` (node `75:589`)
- **React импорт логотипа:** `src/carnica/components/web/header/BeelineBall.tsx`
- **Runtime component:** `src/carnica/components/web/header/Header.tsx`

> **Этот файл — single source of truth для header/main.** REF-02 owner (D-08 leaves rule). Любые правки header — сюда.

## Table of contents

1. Обязательные элементы
2. Опциональные элементы (по состоянию)
3. Анатомия по вариантам (desktop / mobile)
4. Spacing — точные значения
5. Цвета и тёмная тема
6. Типографика
7. Decision rules
8. Связанные файлы
9. Полный список вариантов (Figma node-ID)

---

## 1. Обязательные элементы

В рамках дизайн-системы билайна **на desktop** всегда присутствуют четыре элемента. На mobile обязательными остаются только burger + logo (см. §3).

| # | Элемент | Компонент Carnica | Требования |
|---|---|---|---|
| 1 | Burger menu | `button 2.1` **size=medium, view=icon** | Icon = `IconBurgerMenu` (actions, component style `outline` 847:3888), 44×44, bg `elements/primary`, rounded-full |
| 2 | Logo beeline | `BeelineBall` (React inline SVG) | 44×44, фиксированные цвета: `brand/primary` #FFC800 + `#1B242C` + highlight gradient |
| 3 | Search | `button 2.1` **size=medium, view=icon** | Icon = `IconSearch` (actions, component `search` 849:5207), 44×44, bg `elements/primary`, rounded-full — **desktop only** |
| 4 | «помощь» | `button 2.1` **size=medium, view=text** | Text-only pill, bg `elements/primary`, h=44, px=16, py=12, label «помощь» в `body/accent/small` (16/500) — **desktop only** |

Дополнительно — всегда видимый декоративный слой: полупрозрачный серый `overlay/s` (#F0F3F54D, 30%) + `backdrop-blur: 15px`. Header «стеклянный», контент под ним читается размытым.

---

## 2. Опциональные элементы (по состоянию)

| Элемент | Когда появляется | Описание |
|---|---|---|
| **location pill** (Send icon **filled** 20px + «Москва» component-specific 18/400/22, не foundation typography token) | Desktop unauthorized/authorized, когда НЕ активен region-запрос | Inline ряд: filled Send-иконка + название города |
| **region alert** (white pill 446×44, rounded=40) | Desktop состояние `регион` — когда система хочет уточнить местоположение | Заменяет location pill. Содержит: «вы тут?» (`body/small` слева, `top:-8`), строку «📍 Москва и область», жёлтую кнопку «да» (brand/primary), серую кнопку «поменять регион» (`elements/secondary`) |
| **basket** button | Когда в корзине ≥1 товар (состояния `корзина + неавторизованная`, `корзина + авторизованная`) | `button 2.1` view=icon (IconBasket, actions) + **badge 2.2**: brand/primary pill с числом в `caption/medium` 12/400, накладывается в top-right кнопки (offset `right: +4, top: -4`) |
| **«войти»** button | Desktop unauthorized-состояния | `button 2.1` view=text, **bg=brand/primary #FFC800**, текст `constant/dark` #28303F. Финальный CTA справа |
| **profile pill** (avatar 32px + номер «+7 999 123 45 67») | Desktop authorized-состояния (заменяет «войти») | Shape: white rounded-40, pl=6 pr=20 py=6, gap=6. Avatar bg=`elements/secondary`, номер в `body/accent/small` |
| **user button** (icon) | Mobile unauthorized — справа вместо profile | `button 2.1` view=icon, IconUser (component `user` 849:4987), 44×44 white rounded-full |
| **avatar** (голый, без обёртки-кнопки) | Mobile authorized — справа | Avatar 44×44, white bg, rounded-150 (≈full) |
| **StatusBar** | Mobile (весь header высотой 107px) | iPhone-статус 47px сверху: время 9:41 слева, индикаторы сигнал/Wi-Fi/батарея справа. В production web можно скрыть |

---

## 3. Анатомия по вариантам

### 3.1 Desktop — каркас

```
┌──────────────────────────────────────────────────────────────────┐
│ px=40  py=16   · backdrop-blur-15 · bg overlay/s rgba(0.3)       │
│ flex items-center justify-between                                │
│ ┌──LEFT wrapper (flex-1, gap=24)─┐  CENTER  ┌──RIGHT wrapper──┐  │
│ │  🍔  📍 Москва                 │   ( )    │  🔍  помощь  войти │
│ └────────────────────────────────┘          └──────────────────┘  │
│                                                                  │
│ CENTER: beeline ball 44×44                                       │
│ RIGHT wrapper: flex-1, gap=8, justify-end                        │
└──────────────────────────────────────────────────────────────────┘
Height: 76px total, content: 44px, content width: до 1440px (канонический desktop)
```

### 3.2 Desktop — состояния

| Состояние | Left wrapper (после burger) | Right wrapper |
|---|---|---|
| `неавторизованная` | location pill | search → помощь → **войти** (yellow) |
| `регион` | **region alert 446×44** (gap=8 вместо 24!) | search → помощь → **войти** (yellow) |
| `авторизованная` | location pill | search → помощь → **profile pill** |
| `корзина + неавторизованная` | location pill | **basket+badge** → search → помощь → **войти** |
| `корзина + авторизовання` (sic, опечатка в Figma) | location pill | **basket+badge** → search → помощь → **profile pill** |

> **Важно:** в состоянии `регион` gap в left wrapper = **8px**, не 24px. В остальных — 24px.

### 3.3 Mobile — каркас

```
┌──────────────────────────────────┐
│  StatusBar (47px) 9:41 · ▓▓ 🔋    │
├──────────────────────────────────┤
│  px=20  py=0   · flex justify-   │
│  between     pb=8                │
│  🍔          ( )           👤    │
└──────────────────────────────────┘
Total: 107px (47 statusbar + 44 wrapper + 8 pb + 8 gap внутри col)
Mobile width: 375px
```

### 3.4 Mobile — состояния

| Состояние | Правый слот |
|---|---|
| `неавторизованная` | **user button** (44×44 white rounded-full, IconUser) |
| `корзина + неавторизованная` | basket+badge + user button |
| `авторизованная` | **avatar** (44×44, без кнопки-обёртки) |

> На mobile отсутствуют **location**, **search**, **помощь**, **войти** — они перенесены в burger-меню.

---

## 4. Spacing — точные значения

| Token | Value | Где |
|---|---|---|
| `spacing/1000` | 40px | Desktop horizontal padding header |
| `spacing/500` | 20px | Mobile horizontal padding wrapper |
| `spacing/400` | 16px | Desktop vertical padding, button text pills (px), region alert left-16 |
| `spacing/300` | 12px | Button text py |
| `spacing/250` | 10px | Icon button padding (44-10*2-24 = 0 → visually: 10px вокруг иконки 24px) |
| `spacing/200` | 8px | Gap в right wrapper, mobile column gap |
| `spacing/100` | 4px | Gap text-wrapper в button, badge inset offset |
| `spacing/600` | 24px | **Desktop left wrapper gap** (burger ↔ location) |
| `spacing/600` → `spacing/200` | 24 → 8 | В состоянии `регион` left wrapper gap **уменьшается** до 8 |

---

## 5. Цвета и тёмная тема

### Light mode (default)

| Роль | Переменная | Hex |
|---|---|---|
| Header blur background | `overlay/s` | `rgba(240,243,245,0.3)` + `backdrop-blur(15px)` |
| Иконка-кнопки + «помощь» + region alert + profile | `elements/primary` | `#FFFFFF` |
| Текст кнопок и location | `content/primary` | `#28303F` |
| «войти» + «да» + badge | `brand/primary` | `#FFC800` |
| «поменять регион» button | `elements/secondary` | `#F0F3F5` |
| Avatar background в profile pill | `elements/secondary` | `#F0F3F5` |

### Dark mode — краткая заметка

В Figma зеркально существует набор `dark mode=true` (node-ID +2000..+3000). Принципы:

- `overlay/s` → `overlay/s-invert` (тёмная полупрозрачная подложка)
- `elements/primary` → `elements-fake-invert/primary` (#202632 — кнопки не белые, а тёмно-серые)
- `content/primary` → `content-invert/primary` (#FFFFFF)
- `brand/primary` остаётся жёлтым (#FFC800) — brand константа
- `elements/secondary` → `elements-fake-invert/secondary` (#28303F)

На single-page demo используем только light mode. При расширении — подкачать полную спецификацию через Figma MCP (node 329:3314 и соседние).

---

## 6. Типографика

| Элемент | Стиль | Значение |
|---|---|---|
| Location «Москва» | component-specific text style | 18/400/22, Beeline Sans Regular; не foundation typography token |
| Кнопки «помощь» / «войти» / «да» / «поменять регион» / profile phone | `body/accent/small` | 16/500/20, Beeline Sans Medium |
| Region alert «вы тут?» + «Москва и область» | `body/small` | 16/400/20, Regular |
| Badge number | `caption/medium` | 12/400/16, Regular, color `constant/dark` на жёлтом фоне |
| Mobile StatusBar time | `Callout/Bold` (SF Pro Text 16/600/21) | Native iOS стиль |

---

## 7. Decision rules

### Когда использовать какой вариант

- **Авторизован пользователь?** → `profile pill` (desktop) или `avatar` (mobile). Иначе `войти` / `user button`.
- **В корзине ≥1 товар?** → добавь `basket` button с `badge` слева от search.
- **Система хочет уточнить регион?** → `region alert` вместо обычной location pill (только desktop). На mobile региональные запросы показываем отдельным sheet/dialog, не в header.
- **Ширина экрана < 768px?** → mobile layout: скрыть location, search, help. Убрать wrapper-flex-1 у left/right — всё в один ряд с `justify-between`.
- **На странице статус-бар iOS?** → только если макет рендерится как device-frame (витрина/презентация). В web-продакшене StatusBar не рендерим.

### Что **никогда** не делать

- Не создавай логотип beeline вручную как SVG в JSX. **Только** через `BeelineBall` компонент (`src/carnica/components/web/header/BeelineBall.tsx`).
- Не используй hex `#FFC800` напрямую для «войти» / «да» / badge — только `bg-brand-primary` (Tailwind token; legacy `bg-bee-yellow`).
- Не меняй порядок на desktop: burger всегда крайний слева, beeline ball всегда по центру (через `flex-1` по обе стороны), кнопки действий в правом wrapper в порядке **basket → search → help → [войти/profile]**.
- Не обёртывай avatar в button-pill на mobile authorized — по Figma avatar там голый.
- Не меняй gap 24 → 8 в left wrapper вне состояния `регион`.

---

## 8. Связанные файлы

| Путь | Содержание |
|---|---|
| `src/carnica/components/web/header/BeelineBall.tsx` | React inline-SVG логотипа (44×44) |
| `src/carnica/components/web/header/Header.tsx` | Текущая production-реализация, соответствует desktop unauthorized + mobile unauthorized |
| `src/carnica/icons/actions/IconBurgerMenu.tsx` | Иконка burger-меню (outline стиль) |
| `src/carnica/icons/actions/IconSearch.tsx` | Иконка поиска |
| `src/carnica/icons/shop/IconBasket.tsx` | Иконка корзины |
| `src/carnica/icons/user/IconUser.tsx` | Иконка профиля (mobile unauthorized) |

---

## 9. Полный список вариантов (Figma node-ID)

Для восстановления точной спецификации через Figma MCP:

| Node ID | Вариант |
|---|---|
| `71:992` | desktop, неавторизованная, light |
| `75:590` | desktop, регион, light |
| `118:580` | desktop, авторизованная, light |
| `118:611` | desktop, корзина + авторизовання, light |
| `118:656` | desktop, корзина + неавторизованная, light |
| `120:784` | mobile, неавторизованная, light |
| `120:791` | mobile, корзина + неавторизованная, light |
| `159:631` | mobile, авторизованная, light |
| `329:3314`, `329:3324`, `329:3336`, `329:3350`, `329:3366` | те же, но dark mode=true (desktop) |
| `329:3384`, `329:3391`, `329:3400` | те же, но dark mode=true (mobile) |

---

*Owner: `carnica-components` skill (D-08 leaves rule).*
