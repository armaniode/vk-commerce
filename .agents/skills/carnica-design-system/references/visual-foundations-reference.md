# Carnica Design System — visual foundations reference

> Canonical reference для всей дизайн-системы Carnica. **OWNER color tokens (D-27):** все остальные ref skills (`carnica-typography`, `carnica-components`, `carnica-ux-principles`, `carnica-color-token-selection`) ссылаются сюда за полными значениями. Здесь — light + dark theme полностью, `fake-invert` / `100%-invert` модификаторы, 17 typography стилей, Figma spacing/radius из `03_Carnica sizes`, icon source-of-truth, Figma library keys.

## TOC

1. [Color tokens — Light + Dark mode (полная таблица)](#1-color-tokens--light--dark-mode)
2. [Color tokens — модификаторы (fake-invert / 100%-invert) и surface/accent/glass/overlay](#2-color-tokens--модификаторы-и-расширенные-категории)
3. [Layering rules — правила наложения фонов](#3-layering-rules--правила-наложения-фонов)
4. [Typography stylenames — 17 стилей × LH × use](#4-typography-stylenames--17-стилей)
5. [Spacing scale (полная)](#5-spacing-scale)
6. [cornerRadius scale + nested radius rule](#6-cornerradius-scale)
7. [Иконы — source of truth](#7-иконы--source-of-truth)
8. [Figma library keys + variable keys](#8-figma-library-keys)

---

## 1. Color tokens — Light + Dark mode

### 1.1. background — фон страницы и крупных блоков

Основной цвет фона страницы — `background/primary`, далее наложение по очерёдности.

| Токен | Light | Dark | Описание |
|---|---|---|---|
| `background/primary` | `#F0F3F5` | `#181C23` | основной фон страницы (СЕРЫЙ light, не белый) |
| `background/secondary` | `#FFFFFF` | `#202632` | накладывается на primary — карточки, sheets |
| `background/tertiary` | `#F0F3F5` | `#28303F` | накладывается на secondary — неактивные табы |
| `background/additional01` | `#FFFFFF` | rgba(119,132,157, 0.12) | накладывается на tertiary |
| `background/additional02` | rgba(119,132,157, 0.12) | rgba(119,132,157, 0.12) | накладывается на additional01 |

> В light theme hex `primary` совпадает с `tertiary`, а `secondary` — с `additional01`. Несмотря на это, при наложении друг на друга соблюдается строгая очерёдность от primary к additional02.

### 1.2. elements — фон меньших элементов (карточки, чипы)

| Токен | Light | Dark | Описание |
|---|---|---|---|
| `elements/primary` | `#FFFFFF` | `#202632` | накладывается на `background/primary` |
| `elements/secondary` | `#F0F3F5` | `#28303F` | накладывается на `background/secondary` |
| `elements/tertiary` | `#E2E6ED` | `#28303F` | накладывается на `background/tertiary` (ветка snackbar) |
| `elements/disabled` | `#E2E6ED` | `#323C4E` | ТОЛЬКО для задизейбленных элементов |
| `elements/additional01` | `#FFFFFF` | rgba(119,132,157, 0.12) | накладывается на `background/additional01` |
| `elements/additional02` | rgba(119,132,157, 0.12) | rgba(119,132,157, 0.12) | накладывается на `background/additional02` |
| `elements/active` | `#202632` | `#FFFFFF` | полностью инвертный — активный (выбранный) элемент |

> **Ключевое**: hex `elements/primary` (#FFFFFF) совпадает с `background/secondary`. Это намеренно — elements используются поверх background.
>
> **Две ветки** secondary vs tertiary: в dark `secondary` = `tertiary` = #28303F; в light `tertiary` = `disabled` = #E2E6ED. Используй ОДНУ ветку (chips → secondary, snackbar → tertiary), не мешай. `disabled` — только для неактивных состояний.

### 1.3. content — цвет текста и графических элементов

| Токен | Light | Dark | Описание |
|---|---|---|---|
| `content/primary` | `#28303F` | `#FFFFFF` | основной цвет текста и иконок |
| `content/secondary` | `#77849D` | `#A5AEC0` | подсказки, лейблы, описания |
| `content/tertiary` | `#8E99AF` | `#77849D` | вспомогательный текст, плейсхолдеры |
| `content/disabled` | `#A5AEC0` | `#58657E` | задизейбленный текст и элементы |

**Контраст на белом фоне (light theme):**

| Токен | Hex | На `#FFFFFF` | На `#F0F3F5` | WCAG |
|---|---|---|---|---|
| `content/primary` | #28303F | 12.6:1 | 11.3:1 | AAA (любой текст) |
| `content/secondary` | #77849D | ~4.0:1 | ~3.6:1 | AA для small fail / AA для large pass |
| `content/tertiary` | #8E99AF | ~3.2:1 | ~2.9:1 | AA fail для small (design choice) |
| `content/disabled` | #A5AEC0 | ~2.7:1 | ~2.4:1 | only disabled |
| `brand/primary` | #FFC800 | **1.7:1** | 1.5:1 | **никогда не текст на светлом!** |

### 1.4. border — обводки и разделители

| Токен | Light | Dark | Описание |
|---|---|---|---|
| `border/primary` | `#C3C9D5` | `#58657E` | основная обводка |
| `border/secondary` | `#E2E6ED` | `#3C475D` | разделители между cells (hairline 1px) |

### 1.5. constant — неизменные цвета (одинаковы в обеих темах)

| Токен | Hex | Описание |
|---|---|---|
| `constant/light` | `#FFFFFF` | всегда белый — текст на success/error/link/accent-primary |
| `constant/dark` | `#28303F` | всегда тёмный — текст на brand/yellow |

### 1.6. brand — фирменные цвета (одинаковы в обеих темах)

| Токен | Hex | Описание |
|---|---|---|
| `brand/primary` | `#FFC800` | основной brand, CTA-кнопки, акценты |
| `brand/secondary` | `#FFD546` | светлый оттенок |
| `brand/tertiary` | `#F4B807` | тёмный оттенок |

**Правило**: `brand/primary` — только как фон под `content/primary` или `constant/dark`. НЕ как цвет текста на светлом (1.7:1 fail).

### 1.7. success / error / link — статусные цвета

| Токен | Hex | Текст на фоне |
|---|---|---|
| `success/primary` | `#00A55E` | `constant/light` |
| `success/secondary` | `#00C06D` | `constant/light` |
| `success/tertiary` | `#008F51` | `constant/light` |
| `error/primary` | `#F84A00` | `constant/light` |
| `error/secondary` | `#FF6524` | `constant/light` |
| `error/tertiary` | `#B83700` | `constant/light` |
| `link/primary` | `#1086F9` | `constant/light` |
| `link/secondary` | `#2E94FA` | `constant/light` |
| `link/tertiary` | `#0670DB` | `constant/light` |

---

## 2. Color tokens — модификаторы и расширенные категории

### 2.1. fake-invert — инверсия только в light theme

Hex совпадает с dark-вариантами обычных токенов. В dark theme эти токены = обычные tokens.

**background / elements / content / border** имеют fake-invert версии:

| Категория | Light hex (= dark обычный) | Назначение |
|---|---|---|
| `background/primary fake-invert` | `#181C23` | корневой фон тёмной страницы в light theme |
| `background/secondary fake-invert` | `#202632` | накладывается на primary-fi |
| `background/tertiary fake-invert` | `#28303F` | накладывается на secondary-fi |
| `background/additional fake-invert` | rgba(119,132,157, 0.12) | |
| `elements/primary fake-invert` | `#202632` | тёмный элемент на light background |
| `elements/secondary fake-invert` | `#28303F` | |
| `elements/tertiary fake-invert` | `#28303F` | |
| `elements/disabled fake-invert` | `#323C4E` | |
| `elements/additional01 fake-invert` | rgba(119,132,157, 0.12) | |
| `elements/active fake-invert` | `#FFFFFF` | активный элемент на fake invert |
| `content/primary fake-invert` | `#FFFFFF` | основной текст на fake invert фоне |
| `content/secondary fake-invert` | `#A5AEC0` | |
| `content/tertiary fake-invert` | `#77849D` | |
| `content/disabled fake-invert` | `#58657E` | |
| `border/primary fake-invert` | `#58657E` | |
| `border/secondary fake-invert` | `#3C475D` | |

### 2.2. 100%-invert — полная инверсия в обеих темах

Для элементов на фоне `elements/active`.

| Токен | Light | Dark |
|---|---|---|
| `content/primary 100%-invert` | `#FFFFFF` | `#28303F` |
| `content/secondary 100%-invert` | `#A5AEC0` | `#77849D` |
| `content/tertiary 100%-invert` | `#77849D` | `#8E99AF` |
| `content/disabled 100%-invert` | `#58657E` | `#A5AEC0` |
| `border/primary 100%-invert` | `#58657E` | `#C3C9D5` |
| `border/secondary 100%-invert` | `#3C475D` | `#E2E6ED` |

### 2.3. overlay — затемнения за модалками

| Токен | Light | Dark | Назначение |
|---|---|---|---|
| `overlay/XL` | rgba(24,28,35, 0.90) | rgba(0,0,0, 0.80) | сильное затемнение (модалка над контентом) |
| `overlay/L` | rgba(40,48,63, 0.20) | rgba(40,48,63, 0.20) | слабое затемнение |
| `overlay/M` | rgba(240,243,245, 0.80) | rgba(24,28,35, 0.80) | светлое затемнение |
| `overlay/S` | rgba(240,243,245, 0.30) | rgba(24,28,35, 0.30) | blur-фон sticky-хедера |
| `overlay/XS` | rgba(255,255,255, 0.10) | rgba(255,255,255, 0.10) | полупрозрачный фон |

### 2.4. glass — фоны со стеклянным эффектом

| Токен | Light | Dark | Назначение |
|---|---|---|---|
| `glass/primary` | rgba(240,243,245, 0.50) | rgba(40,48,63, 0.70) | стеклянная кнопка |
| `glass/secondary` | rgba(255,255,255, 0.50) | rgba(119,132,157, 0.12) | стеклянная кнопка вторичная |
| `glass/disabled` | rgba(226,230,237, 0.60) | rgba(50,60,78, 0.80) | disabled glass |
| `glass/invert` | rgba(32,38,50, 0.80) | rgba(255,255,255, 0.70) | инвертный glass |
| `glass/brand` | rgba(255,200,0, 0.80) | rgba(255,200,0, 0.80) | brand glass |
| `glass/error` | rgba(248,74,0, 0.80) | rgba(248,74,0, 0.80) | error glass |

### 2.5. surface — пастельные фоны (одинаковые в обеих темах)

Только для **иконных подложек** (icon-tile 64-80px в карточках товаров, illustrations). **НЕ для тэгов** — это нарушение P0 anti-slop.

| Токен | Hex | Текст на фоне |
|---|---|---|
| `surface/01-green` | `#CBF6E3` | `accent/01-green-primary` или `content/primary` |
| `surface/02-teal` | `#BFF8F1` | `accent/02-teal-primary` или `content/primary` |
| `surface/03-blue` | `#D7EBFE` | `accent/03-blue-primary` или `content/primary` |
| `surface/04-violet` | `#E7DFFB` | `accent/04-violet-primary` или `content/primary` |
| `surface/05-magenta` | `#FBDBEC` | `accent/05-magenta-primary` или `content/primary` |
| `surface/06-red` | `#FDD8D8` | `accent/06-red-primary` или `content/primary` |
| `surface/07-orange` | `#FFD8C7` | `accent/07-orange-primary` или `content/primary` |
| `surface/08-yellow` | `#FFE999` | `accent/08-yellow-primary` или `constant/dark` |

### 2.6. accent — насыщенные акцентные цвета

8 палитр × 3 уровня (primary насыщенный / secondary 44% / tertiary 24%). Одинаковые в обеих темах.

| Палитра | Primary (hex) | Secondary 44% | Tertiary 24% |
|---|---|---|---|
| 01-green | `#00A55E` | rgba(0,165,94, 0.44) | rgba(0,165,94, 0.24) |
| 02-teal | `#00A894` | rgba(0,168,148, 0.44) | rgba(0,168,148, 0.24) |
| 03-blue | `#1086F9` | rgba(16,134,249, 0.44) | rgba(16,134,249, 0.24) |
| 04-violet | `#7E56EB` | rgba(126,86,235, 0.44) | rgba(126,86,235, 0.24) |
| 05-magenta | `#E52E90` | rgba(229,46,144, 0.44) | rgba(229,46,144, 0.24) |
| 06-red | `#F43434` | rgba(244,52,52, 0.44) | rgba(244,52,52, 0.24) |
| 07-orange | `#F84A00` | rgba(248,74,0, 0.44) | rgba(248,74,0, 0.24) |
| 08-yellow | `#FFC800` | rgba(255,200,0, 0.44) | rgba(255,200,0, 0.24) |

Текст на `accent/*-primary` — `constant/light` (кроме yellow → `constant/dark`). Текст на `*-secondary` / `*-tertiary` — `content/primary` (полупрозрачные фоны пропускают текст).

### 2.7. Fallback colors для MCP screenshots

Fallback разрешён только внутри bound variable paint (через `fallback` параметр).

| Token | Fallback RGB (0-1) |
|---|---|
| `brand/primary` | `{ r: 1, g: 0.784, b: 0 }` |
| `content/primary` | `{ r: 0.157, g: 0.188, b: 0.247 }` |
| `content/secondary` | `{ r: 0.467, g: 0.518, b: 0.616 }` |
| `content/tertiary` | `{ r: 0.557, g: 0.6, b: 0.686 }` |
| `background/primary` | `{ r: 0.941, g: 0.953, b: 0.961 }` |
| `background/secondary` | `{ r: 1, g: 1, b: 1 }` |
| `elements/tertiary` | `{ r: 0.886, g: 0.902, b: 0.929 }` |

---

## 3. Layering rules — правила наложения фонов

### 3.1. Старшинство: background > elements

- Поверх `background/*` можно класть И `background/*`, И `elements/*`.
- Поверх `elements/*` можно класть ТОЛЬКО `elements/*`. background поверх elements — **запрещено**.

### 3.2. Цепочки наложения

```
background/primary
  ├─ background/secondary → tertiary → additional01 → additional02
  ├─ background/secondary fake-invert → tertiary-fi → additional-fi
  ├─ elements/primary → secondary → additional01 → additional02
  │                   └─ tertiary → additional01  (ветка snackbar)
  ├─ elements/primary fake-invert → secondary-fi → additional01-fi
  └─ elements/tertiary (исключения в компонентах)

background/secondary
  ├─ background/tertiary → additional01 → additional02
  ├─ background/tertiary fake-invert → additional-fi
  ├─ elements/secondary → additional01 → additional02
  └─ elements/secondary fake-invert → additional01-fi → additional02-fi

elements/primary
  ├─ elements/secondary → additional01 → additional02
  ├─ elements/tertiary → additional01 (ветка snackbar)
  └─ elements/secondary fake-invert → additional01-fi → additional02-fi
```

### 3.3. Три сценария fake-invert

**Сценарий A — Тёмная страница целиком** (промо-лендинг, геймер-раздел):
- Фон → `background/primary fake-invert`. Внутри → `secondary-fi` → `tertiary-fi` → `additional-fi`. Текст → `content/* fake-invert`.

**Сценарий B — Тёмный блок на светлой странице** (промо-карточка, hero, корзина):
- На `background/primary` → блок `background/secondary fake-invert` → внутри `tertiary-fi`.
- На `background/secondary` → блок `background/tertiary fake-invert` → внутри `additional-fi`.

**Сценарий C — Мелкий тёмный интерактивный элемент** (активный chip, выбранный таб):
- На `background/primary` → `elements/primary fake-invert`. На `background/secondary` → `elements/secondary fake-invert`.

> **Запрещено**: `background/primary fake-invert` поверх `background/primary`. Primary-fi — самостоятельный корневой фон, не вложенный блок.

### 3.4. Surface inversion rule (circular surface)

Любой circular / rounded surface-элемент (avatar, step-num, icon-chip, badge) обязан контрастировать с фоном через инверсию.

| Внешний фон | Surface элемента |
|---|---|
| `background/primary` (серый) | `background/secondary` (белый) |
| `background/secondary` (белый) | `background/tertiary` или `elements/secondary` (серый) |

Не отменяет правило `brand/primary` (#FFC800) — brand-yellow контрастен hue-сдвигом с обоими фонами.

### 3.5. Tag tone фоны (cross-ref `carnica-ux-principles` §16)

Только 5 разрешённых tone'ов для фонов тэгов в `tag 2.3`:

| Tone | Фон | Текст |
|---|---|---|
| `default` | `elements/secondary` (`#F0F3F5`) | `content/secondary` |
| `brand` | `brand/primary` (`#FFC800`) | `content/primary` |
| `invert` | `constant/dark` (`#28303F`) | `content/invert` (white) |
| `success` | `#CBF6E3` | `success/primary` |
| `error` | rgba(248,74,0, 0.12) | `error/primary` |

**Запрещено для тэгов**: цветные `surface-*` токены (yellow / blue / violet / teal / magenta / orange / red) — они для иконных подложек в карточках товаров, не для тэгов.

---

## 4. Typography stylenames — 17 стилей

Use `importStyleByKeyAsync(key)`. Source: library `02_Carnica typography`.

| Стиль | Size | LH | Unitless | Weight | Use case |
|---|---|---|---|---|---|
| `display/large` | 56 | 66 | 1.18 | 400 | WEB hero only (≥1024px), splash |
| `display/medium` | 40 | 48 | 1.20 | 400 | WEB H1, mobile key value |
| `display/small` | 32 | 36 | 1.13 | 400 | mobile hero, balance, цена крупная |
| `display/extrasmall` | 16 | 22 | 1.38 | 400 | артефакт — НЕ использовать как display |
| `headline/medium` | 40 | 40 | 1.00 | 400 | (legacy / редко) |
| `headline/small` | 24 | 24 | 1.00 | 400 | page title в скролле |
| `body/large` | 24 | 28 | 1.17 | 400 | крупные числа, dialog title |
| `body/medium` | 20 | 26 | 1.30 | 400 | section title, navbar title |
| `body/small` | 16 | 20 | 1.25 | 400 | основной UI text |
| `body/accent/large` | 24 | 28 | 1.17 | 500 | внутри `title 2.1` |
| `body/accent/medium` | 20 | 26 | 1.30 | 500 | внутри `cell 3.1` title |
| `body/accent/small` | 16 | 20 | 1.25 | 500 | внутри `button 2.5`, `tag 2.3` |
| `body/paragraph/large` | 24 | 36 | 1.50 | 400 | article/longread reading large |
| `body/paragraph/medium` | 20 | 30 | 1.50 | 400 | article/longread reading medium |
| `body/paragraph/small` | 16 | 24 | 1.50 | 400 | лонгриды, статьи, юридические тексты |
| `caption/medium` | 13 | 16 | 1.23 | 400 | timestamps, badge, метаданные |
| `caption/accent/medium` | 13 | 16 | 1.23 | 500 | badge внутри компонентов |

**Правило веса**: Regular 400 — основа всех новых макетов. Medium 500 (`*/accent`) — ТОЛЬКО внутри готовых компонентов (`button 2.5`, `cell 3.1`, `tag 2.3`, `title 2.1`), где автор уже зашил. В `createStyledText` для кастомного текста — всегда Regular 400.

**Минимумы читаемости**:
- Field value в input ≥ 16px (iOS force-zoom при <16)
- Button label ≥ 16px
- Caption ≥ 13px (никогда 12px для UI)
- Body для чтения ≥ 16px

Полная decision rule «когда какой стиль» (15 ситуаций × контекст) — `carnica-typography` Quick reference + Decision rules.

---

## 5. Spacing scale

Шкала из Figma `03_Carnica sizes`. Source of truth для имён и значений — Figma variable collection `Sizing`; runtime mirror — `src/carnica/tokens/spacing.ts`.

| Token | px | Carnica use |
|---|---|---|
| `spacing/negative 500` | -20 | negative offset / compensation |
| `spacing/negative 400` | -16 | negative offset / compensation |
| `spacing/negative 300` | -12 | negative offset / compensation |
| `spacing/negative 250` | -10 | negative offset / compensation |
| `spacing/negative 200` | -8 | negative offset / compensation |
| `spacing/negative 100` | -4 | negative offset / compensation |
| `spacing/negative 50` | -2 | negative offset / compensation |
| `spacing/0` | 0 | reset |
| `spacing/50` | 2 | hairline/tiny offset |
| `spacing/100` | 4 | tight gap, icon/text micro-gap |
| `spacing/150` | 6 | compact internal gap |
| `spacing/200` | 8 | small gap, grid gap |
| `spacing/250` | 10 | compact control padding |
| `spacing/300` | 12 | button text paddingY, compact block gap |
| `spacing/350` | 14 | intermediate compact gap |
| `spacing/400` | 16 | card vertical padding, standard internal gap |
| `spacing/450` | 18 | intermediate control padding |
| `spacing/500` | 20 | mobile horizontal padding, card horizontal |
| `spacing/600` | 24 | adjacent section gap |
| `spacing/800` | 32 | mobile section gap, card gap in feeds |
| `spacing/1000` | 40 | desktop/header/hero padding |
| `spacing/1200` | 48 | large container gap |
| `spacing/1600` | 64 | large section gap |
| `spacing/2000` | 80 | extra-large section gap |

**Inner-vs-outer rule**: `gap_inner < padding_outer`. Внутри карточки расстояния между детьми меньше, чем padding до краёв (Гештальт group).

**Между группами**: gap ≥ 2× gap внутри группы (Гештальт proximity).

**Margin direction**: single-direction (только margin-bottom или только margin-top) — избегать double-collapse.

Произвольные значения вне Figma spacing tokens — нарушение P1 anti-slop.

---

## 6. cornerRadius scale

| Token | px | Назначение |
|---|---|---|
| `radius/0` | 0 | без скругления |
| `radius/50` | 2 | микро-скругление |
| `radius/100` | 4 | малые controls |
| `radius/200` | 8 | мелкие чипы, badge |
| `radius/300` | 12 | input 2.3, маленький card, ico-tile внутри pill |
| `radius/400` | 16 | стандартный card-tile, banner |
| `radius/600` | 24 | средняя карточка |
| `radius/800` | 32 | крупная контентная карточка, dialog |
| `radius/1000` | 40 | очень крупная карточка / shell |
| `radius/infinite` | 10000 | pill-кнопки, chip-pill, tag 2.3, search field, fully-round controls |

### Nested radius rule

Если внутренний элемент расположен близко к краю внешнего (gap ≤ 12px):

```
R_inner = R_outer − gap
```

Все три значения (`R_outer`, `gap`, `R_inner`) должны быть из системы. Если результат вне системы — **подгоняй gap**, не округляй радиус.

Если gap > 12px — внутренний элемент визуально отделён, формула не применяется (любой radius из шкалы).

**Infinite effective**: `radius/infinite` визуально работает как fully-rounded/pill radius. Для nested-radius расчёта используй фактический rendered radius (`height / 2` для pill), не число `10000`.

**Примеры**:

| Контейнер | Gap | R_outer | R_inner | OK? |
|---|---|---|---|---|
| pill chip h=48 | 8 | rendered 24 | `radius/400` = 16 | ok |
| card `radius/800` | 8 | 32 | `radius/600` = 24 | ok |
| card `radius/800` | 16 | 32 | `radius/400` = 16 | ok |
| card `radius/600` | 12 | 24 | `radius/300` = 12 | ok |
| pill chip h=48 | 6 | rendered 24 | 18 | fail — gap должен быть `spacing/200` (8) или `spacing/300` (12) |
| card `radius/800` | 4 | 32 | 28 | fail — gap должен быть `spacing/200` (8) |

Произвольный radius вне Figma radius tokens — нарушение P1 anti-slop.

---

## 7. Иконы — source of truth

Source of truth по количеству и именам иконок — `src/carnica/icons-raw/`. На момент проверки в папке 354 SVG-файла, включая 4 legacy lowercase raw-файла (`check-round.svg`, `check-shield.svg`, `eye-close.svg`, `trash.svg`). Generated TSX-компоненты в `src/carnica/icons/` — производный слой, сейчас 350 файлов.

Source library: `04_Carnica icons`. Все иконки должны сохранять 24×24 viewBox и использовать `currentColor` в generated TSX. Filled/stroke/half-filled варианты — отдельные компоненты.

### Категории (примеры icon names)

| Категория | Примеры | Назначение |
|---|---|---|
| `actions` | burger menu, search, plus, minus, edit, delete, share, copy, save | действия пользователя |
| `navigation` | chevron (right/left/up/down), arrow, back, forward, home | навигация по экранам |
| `shop` | basket, cart, bag, gift, tag, discount | shopping flows, корзина |
| `user` | user, avatar, profile, group, account | профиль и аккаунт |
| `payment` | card, wallet, money, transfer, bonus | финансы и платежи |
| `file` | document, folder, file, attachment, download, upload | файлы и документы |
| `communication` | chat, message, mail, phone, call | коммуникация |
| `media` | play, pause, stop, volume, mute, camera, photo, video | медиа-контролы |
| `system` | settings, gear, lock, key, info, alert, check, close | системные индикаторы |
| `location` | pin, map, globe, send (filled location) | геолокация |

### Top-10 наиболее используемых

| Icon | Component set key | Variant |
|---|---|---|
| `chevron` | `c3d71609271cbaf0c05bd13c0aa00e1496efca65` | direction=right/left/up/down |
| `four square` | `8197c7ea96dfc1ad0dbb369d71bf28089fb1194e` | style=outline |
| `settings` | `5604ae221e2c126ae4b5558ffc9c148c95fe4c8b` | style=outline |
| `basket` | `6933b65a239206ed4d9ca1864148bbf892991d1e` | style=outline |
| `swap` | `7ec08fd4acab44ae895b2b05896acc607ce78336` | style=outline |
| `refresh` | `df7fd86f440f56fcb50fa7f2b7e714931e4865e2` | style=outline |
| `lock` | `b346e381c1f648b3bf20627a942634139c8f75ce` | style=outline |
| `globe` | `12dde6dfc8d8dad26dfe3a152cf05e878fc39f10` | style=outline |
| `pin` | `1cd225f8284fa7e2ef19316b67d865d64c5a9419` | style=outline |
| `plus round` | `106fd52e52f30b8762f0f66ec2418a2f6b2e7e68` | **style=stroke** (единственное исключение) |

### Правила экспорта/создания SVG

1. viewBox всегда `"0 0 24 24"` — даже если path меньше.
2. Если path не заполняет 24×24 — центрировать через `<g transform="translate(offsetX, offsetY)">` (offsetX = (24 - originalWidth) / 2).
3. `fill="currentColor"` (не hardcoded цвет) для recoloring.
4. `stroke="currentColor"` для stroke-иконок.
5. `width="24" height="24"` + `{...props}` для кастомизации.
6. Тип: `SVGProps<SVGSVGElement>`, именование: `Icon{PascalCase}`.

Полный каталог имен берётся из `src/carnica/icons-raw/`; category/barrel mapping — из generated `src/carnica/icons/`.

---

## 8. Figma library keys

Использование: `importComponentSetByKeyAsync(key)` для component sets, `importComponentByKeyAsync(key)` для single components, `importVariableByKeyAsync(key)` для color/typography variables, `importStyleByKeyAsync(key)` для text styles.

### Top-level libraries

| Library | Purpose | Поиск-фильтр (lk-префикс) |
|---|---|---|
| `01_Carnica colors 2.0` | semantic color variables (collection `semantic 2.0`) | `lk-d12e04223bf6dd34ac2fa9916d442a48ea390767c92ff0d2d93ff37f3de00edc5a361c1ba3517a8272ae621e11eed251281cf20696964a887e5c0c51c0a696ba` |
| `02_Carnica typography` | Beeline Sans text styles (17 стилей) | `lk-85b6c66f282073e2209893180d38a0725a47def8cd353cf3d772c57ed67548f8d9d37f5fb14d8da4e954129b999c596e6ea4a6eb65376c10a11104eaf87ef1e3` |
| `03_Carnica sizes` | spacing/radius float variables (collection `Sizing`) | `lk-f4949eed6c92c56fa229ec504defe4e1d393aec21fe04ab1ff7c71815627504027e1979de0149c0a3bdd54fb5b5f695bfa60dae17891bc6007686c345daba1ac` |
| `04_Carnica icons` | raw icon library; local source truth `src/carnica/icons-raw/` | `lk-d612279569ae664dca59a6bf4f62f91bba59160b038ac368e0333024fe3b466282faaa40ca7e8b0808cb694c9755a74e304253bd98b03a7f3b052cfe96f5f002` |
| `05_Carnica UI-kit APP` | mobile app components | `lk-b85c22e90535a19cf4726bdc327c0c9d6b5571d3572cc01b98c88ad8c9e15cae8013568c0b926b4cd660e007fe301763f5e1d9d49df8fd052da57596499899f2` |
| `06_Carnica UI-kit WEB` | web components | `lk-c9c208874e4af44945efe5a34e726e67c5c961d91d6bdf9dad85d06eadb27be0a9e33c4db7f2f3ca84b4802790b3c84b0b6a0893efe7ea4fa0d0fcd96fc13848` |

### Color variable keys (top-10)

| Token | Variable key |
|---|---|
| `content/primary` | `c80c9c858aa90f2c8fa8740a52e0c0d0fddfe3f6` |
| `content/secondary` | `01e934ed55198dc344d9ba8a6308f842e9bc9769` |
| `content/tertiary` | `61f01ba009b3fe97dd0f14527966e1c73adbf302` |
| `content/disabled` | `50c9040a96fee7ea5d431d6a474869628b1980ee` |
| `background/primary` | `32a044d2847c0718cee8dc912f2d6475b5949cf6` |
| `background/secondary` | `9173866ad1bf4a57a0f66d09d014f15127b6fef5` |
| `brand/primary` | `90e4493a54d99ec93767bd9ce5517a01ec51aec7` |
| `elements/primary` | `c8f24d970f4f52f6b3582c65592ac701da0fa99d` |
| `elements/tertiary` | `c410b0e6e71a6788e935fd4ad0cbefd0f973966d` |
| `elements/disabled` | `371a73280dc029ebf493ffe0b3b28c827307c281` |

Остальные tokens (error, success, link, surface, accent, overlay, glass, border) — ищи `importVariableByKeyAsync` по имени через library search в Figma. UUIDs не публикуются inline (вторичны и могут обновляться при пересборке коллекции).

### Typography style keys (полный список)

| Style | Key |
|---|---|
| `display/large` | `f57d7dc506ee1cde2b0c7cd804113a1894c76476` |
| `display/medium` | `cf93514b7fc39ef64f55e75aeac5effd96efe09e` |
| `display/small` | `b1ebc2ed65b8b394555704b0c89c77a359173239` |
| `display/extrasmall` | `cdd8ea24fb28e520f08a69ab2f1370a48c4ed594` |
| `headline/medium` | `17dc8ca0f07a80f5f61fc8f0ab93bd4ca46a9bc3` |
| `headline/small` | `14efb99dde3fe3d2772946c2bda20b1f11ddf621` |
| `body/large` | `51c9f570110e5a5cb1ccd8159fcf52cebb28ff06` |
| `body/medium` | `4584a792046ffdd8c980d564639a572e9dc652b6` |
| `body/small` | `8428078c7857504949384e0f950058330f79ef9c` |
| `body/accent/large` | `101b10a10e1e0de3ffb4fe923d9fb8051ac85fa0` |
| `body/accent/medium` | `0fcbded6bcc6dadabbeec58787c05dd3e0657f8d` |
| `body/accent/small` | `0aeda8963bdd9967bc3316237695732277b99c03` |
| `body/paragraph/large` | `79610ac1ec5f227a52d557acc96b397f151d8895` |
| `body/paragraph/medium` | `9a8aaf65da64ea5ee760376aba3c221b008a58f2` |
| `body/paragraph/small` | `5c45a4df1d51ddc52974a4b2f21619ee1a461539` |
| `caption/medium` | `2499f21c8d3edca28086216a366a132e1ba26348` |
| `caption/accent/medium` | `0b0e959651fa0e65e8fd3a371ab6722cf92ef29a` |

### Update policy

Library keys обновляются вместе с компонентами — если key изменился (новый component version в `05_Carnica UI-kit APP`), update в SKILL.md cross-link skill (`carnica-components`) + здесь в §8. Cross-ref: `carnica-components` decision rules «обновление library keys».

---

*Owner: `carnica-design-system` skill (D-27 OWNER pattern for color tokens / spacing / typography style keys).*
