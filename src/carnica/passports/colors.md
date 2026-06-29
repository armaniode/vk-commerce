# Colors

## Мета

- **Пакет**: @carnica/themes
- **Имя в Figma**: 01_Carnica colors 2.0
- **Node**: 3001:78419
- **Дата снятия**: 2026-04-07
- **Сверено**: 2026-05-21 через `get_libraries`, `search_design_system`, `get_variable_defs`
- **Источник**: Figma MCP + локальный runtime `src/carnica/tokens/colors.ts`

## Иерархия именования

```
{category}/{level}
```

Уровни внутри каждой категории:

- **primary** — основной
- **secondary** — вторичный
- **tertiary** — третичный
- **disabled** — заблокированное состояние
- **active** — активное/нажатое состояние
- **additional01/02** — дополнительные

Модификаторы пишутся как часть имени переменной после уровня:

- `fake-invert` — для тёмных элементов внутри светлой темы, например `content/primary fake-invert`
- `**100%-invert**` — полная инверсия в обеих темах, например `content/primary 100%-invert`

## Семантические токены (светлая тема)

### Content — цвета текста и контента


| Токен               | Hex     | Описание                    |
| ------------------- | ------- | --------------------------- |
| `content/primary`   | #28303F | Основной текст              |
| `content/secondary` | #77849D | Вторичный текст             |
| `content/tertiary`  | #8E99AF | Третичный текст (подсказки) |
| `content/disabled`  | #A5AEC0 | Заблокированный текст       |


### Background — фоны страниц и секций


| Токен                     | Hex       | Описание                                        |
| ------------------------- | --------- | ----------------------------------------------- |
| `background/primary`      | #F0F3F5   | Основной фон (серый)                            |
| `background/secondary`    | #FFFFFF   | Вторичный фон (белый)                           |
| `background/tertiary`     | #F0F3F5   | Третичный фон                                   |
| `background/additional01` | #FFFFFF   | Дополнительный фон 1                            |
| `background/additional02` | #77849D1F | Дополнительный фон 2 (с прозрачностью)          |


### Elements — интерактивные элементы (кнопки, карточки)


| Токен                   | Hex       | Описание                           |
| ----------------------- | --------- | ---------------------------------- |
| `elements/primary`      | #FFFFFF   | Основной элемент                   |
| `elements/secondary`    | #F0F3F5   | Вторичный элемент                  |
| `elements/tertiary`     | #E2E6ED   | Третичный элемент                  |
| `elements/disabled`     | #E2E6ED   | Заблокированный элемент            |
| `elements/additional01` | #FFFFFF   | Дополнительный 1                   |
| `elements/additional02` | #77849D1F | Дополнительный 2 (с прозрачностью) |
| `elements/active`       | #202632   | Активный элемент (тёмный)          |


### Border — обводки


| Токен              | Hex     | Описание                    |
| ------------------ | ------- | --------------------------- |
| `border/primary`   | #C3C9D5 | Основная обводка            |
| `border/secondary` | #E2E6ED | Вторичная обводка (светлее) |

### Overlay — оверлеи с прозрачностью


| Токен        | Hex       | Описание                 |
| ------------ | --------- | ------------------------ |
| `overlay/XL` | #181C23E5 | Сильное затемнение (90%) |
| `overlay/L`  | #28303F33 | Лёгкое затемнение (20%)  |
| `overlay/M`  | #F0F3F5CC | Средний светлый (80%)    |
| `overlay/S`  | #F0F3F54D | Лёгкий светлый (30%)     |
| `overlay/XS` | #FFFFFF1A | Минимальный (10%)        |


### Glass — стекло / blur-эффекты


| Токен             | Hex       | Описание                     |
| ----------------- | --------- | ---------------------------- |
| `glass/primary`   | #F0F3F580 | Основное стекло (50%)        |
| `glass/secondary` | #FFFFFF80 | Вторичное стекло (50%)       |
| `glass/disabled`  | #E2E6ED99 | Заблокированное стекло (60%) |
| `glass/invert`    | #202632CC | Тёмное стекло (80%)          |
| `glass/brand`     | #FFC800CC | Брендовое стекло (80%)       |
| `glass/error`     | #F84A00CC | Стекло ошибки (80%)          |


## Семантические токены (тёмная тема)

### Core dark tokens


| Токен                     | Hex dark  |
| ------------------------- | --------- |
| `content/primary`         | #FFFFFF   |
| `content/secondary`       | #A5AEC0   |
| `content/tertiary`        | #77849D   |
| `content/disabled`        | #58657E   |
| `background/primary`      | #181C23   |
| `background/secondary`    | #202632   |
| `background/tertiary`     | #28303F   |
| `background/additional01` | #77849D1F |
| `background/additional02` | #77849D1F |
| `elements/primary`        | #202632   |
| `elements/secondary`      | #28303F   |
| `elements/tertiary`       | #28303F   |
| `elements/disabled`       | #323C4E   |
| `elements/additional01`   | #77849D1F |
| `elements/additional02`   | #77849D1F |
| `elements/active`         | #FFFFFF   |
| `border/primary`          | #58657E   |
| `border/secondary`        | #3C475D   |


### Overlay / glass dark tokens


| Токен             | Hex dark  |
| ----------------- | --------- |
| `overlay/XL`      | #000000CC |
| `overlay/L`       | #28303F33 |
| `overlay/M`       | #181C23CC |
| `overlay/S`       | #181C234D |
| `overlay/XS`      | #FFFFFF1A |
| `glass/primary`   | #28303FB3 |
| `glass/secondary` | #77849D1F |
| `glass/disabled`  | #323C4ECC |
| `glass/invert`    | #FFFFFFB3 |
| `glass/brand`     | #FFC800CC |
| `glass/error`     | #F84A00CC |


Static tokens (`constant`, `brand`, `error`, `success`, `link`, `surface`, `accent`) keep the same values in light and dark modes.

## Fake-invert (тёмные блоки внутри светлой темы)

### Content fake-invert


| Токен                           | Hex     |
| ------------------------------- | ------- |
| `content/primary fake-invert`   | #FFFFFF |
| `content/secondary fake-invert` | #A5AEC0 |
| `content/tertiary fake-invert`  | #77849D |
| `content/disabled fake-invert`  | #58657E |


### Background fake-invert


| Токен                               | Hex       |
| ----------------------------------- | --------- |
| `background/primary fake-invert`    | #181C23   |
| `background/secondary fake-invert`  | #202632   |
| `background/tertiary fake-invert`   | #28303F   |
| `background/additional fake-invert` | #77849D1F |


### Elements fake-invert


| Токен                               | Hex       |
| ----------------------------------- | --------- |
| `elements/primary fake-invert`      | #202632   |
| `elements/secondary fake-invert`    | #28303F   |
| `elements/tertiary fake-invert`     | #28303F   |
| `elements/disabled fake-invert`     | #323C4E   |
| `elements/additional01 fake-invert` | #77849D1F |
| `elements/additional02 fake-invert` | #77849D1F |
| `elements/active fake-invert`       | #FFFFFF   |


### Border fake-invert


| Токен                          | Hex     |
| ------------------------------ | ------- |
| `border/primary fake-invert`   | #58657E |
| `border/secondary fake-invert` | #3C475D |


## 100%-invert (полная инверсия)

### Content 100%-invert


| Токен                           | Light   | Dark    |
| ------------------------------- | ------- | ------- |
| `content/primary 100%-invert`   | #FFFFFF | #28303F |
| `content/secondary 100%-invert` | #A5AEC0 | #77849D |
| `content/tertiary 100%-invert`  | #77849D | #8E99AF |
| `content/disabled 100%-invert`  | #58657E | #A5AEC0 |


### Border 100%-invert


| Токен                          | Light   | Dark    |
| ------------------------------ | ------- | ------- |
| `border/primary 100%-invert`   | #58657E | #C3C9D5 |
| `border/secondary 100%-invert` | #3C475D | #E2E6ED |


## Глобальные / статические цвета

### Constant — неизменяемые


| Токен            | Hex     | Описание          |
| ---------------- | ------- | ----------------- |
| `constant/dark`  | #28303F | Тёмная константа  |
| `constant/light` | #FFFFFF | Светлая константа |


### Brand — бренд


| Токен             | Hex     | Описание                   |
| ----------------- | ------- | -------------------------- |
| `brand/primary`   | #FFC800 | Основной жёлтый            |
| `brand/secondary` | #FFD546 | Вторичный жёлтый (светлее) |
| `brand/tertiary`  | #F4B807 | Третичный жёлтый (pressed) |


### Error — ошибки / деструктивные действия


| Токен             | Hex     | Описание            |
| ----------------- | ------- | ------------------- |
| `error/primary`   | #F84A00 | Основной оранжевый  |
| `error/secondary` | #FF6524 | Вторичный (pressed) |
| `error/tertiary`  | #B83700 | Третичный (тёмный)  |


### Success — успех


| Токен               | Hex     | Описание            |
| ------------------- | ------- | ------------------- |
| `success/primary`   | #00A55E | Основной зелёный    |
| `success/secondary` | #00C06D | Вторичный (pressed) |
| `success/tertiary`  | #008F51 | Третичный (тёмный)  |


### Link — ссылки


| Токен            | Hex     | Описание            |
| ---------------- | ------- | ------------------- |
| `link/primary`   | #1086F9 | Основная ссылка     |
| `link/secondary` | #2E94FA | Вторичная (hover)   |
| `link/tertiary`  | #0670DB | Третичная (pressed) |


## Декоративные цвета

### Surface — пастельные фоны


| Токен                | Hex     | Цвет       |
| -------------------- | ------- | ---------- |
| `surface/01-green`   | #CBF6E3 | Зелёный    |
| `surface/02-teal`    | #BFF8F1 | Бирюзовый  |
| `surface/03-blue`    | #D7EBFE | Голубой    |
| `surface/04-violet`  | #E7DFFB | Фиолетовый |
| `surface/05-magenta` | #FBDBEC | Пурпурный  |
| `surface/06-red`     | #FDD8D8 | Красный    |
| `surface/07-orange`  | #FFD8C7 | Оранжевый  |
| `surface/08-yellow`  | #FFE999 | Жёлтый     |


### Accent — акцентные цвета (8 цветов × 3 уровня)

Каждый акцент имеет 3 уровня: primary (100%), secondary (44% alpha, hex `70`), tertiary (24% alpha, hex `3D`).


| Цвет       | Primary | Secondary | Tertiary  |
| ---------- | ------- | --------- | --------- |
| 01-green   | #00A55E | #00A55E70 | #00A55E3D |
| 02-teal    | #00A894 | #00A89470 | #00A8943D |
| 03-blue    | #1086F9 | #1086F970 | #1086F93D |
| 04-violet  | #7E56EB | #7E56EB70 | #7E56EB3D |
| 05-magenta | #E52E90 | #E52E9070 | #E52E903D |
| 06-red     | #F43434 | #F4343470 | #F434343D |
| 07-orange  | #F84A00 | #F84A0070 | #F84A003D |
| 08-yellow  | #FFC800 | #FFC80070 | #FFC8003D |


## Tailwind-классы

### Маппинг Figma-токенов → Tailwind


| Figma-токен                 | Tailwind class (фон)                                                    | Tailwind class (текст)                                                          |
| --------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| content/primary             | —                                                                       | `text-content-primary`; legacy `text-bee-content-primary`             |
| content/secondary           | —                                                                       | `text-content-secondary`; legacy `text-bee-content-secondary`         |
| content/tertiary            | —                                                                       | `text-content-tertiary`; legacy `text-bee-content-tertiary`           |
| content/disabled            | —                                                                       | `text-content-disabled`; legacy `text-bee-content-disabled`           |
| content/primary 100%-invert | —                                                                       | `text-content-primary-100-invert`; legacy `text-bee-content-invert`   |
| background/primary          | `bg-background-primary`; legacy `bg-bee-bg-primary`           | —                                                                               |
| background/secondary        | `bg-background-secondary`; legacy `bg-bee-bg-secondary`       | —                                                                               |
| background/tertiary         | `bg-background-tertiary`; legacy `bg-bee-bg-tertiary`         | —                                                                               |
| elements/primary            | `bg-elements-primary`; legacy `bg-bee-el-primary`             | —                                                                               |
| elements/secondary          | `bg-elements-secondary`; legacy `bg-bee-el-secondary`         | —                                                                               |
| elements/active             | `bg-elements-active`; legacy `bg-bee-el-active`               | —                                                                               |
| elements/disabled           | `bg-elements-disabled`; legacy `bg-bee-el-disabled`           | —                                                                               |
| brand/primary               | `bg-brand-primary`; legacy `bg-bee-yellow`                    | avoid as text on light                                                          |
| error/primary               | `bg-error-primary`; legacy `bg-bee-error`                     | `text-error-primary`; legacy `text-bee-error`                         |
| success/primary             | `bg-success-primary`; legacy `bg-bee-success`                 | `text-success-primary`; legacy `text-bee-success`                     |
| border/primary              | `border-border-primary`; legacy `border-bee-border-primary`   | —                                                                               |
| border/secondary            | `border-border-secondary`; legacy `border-bee-border-secondary` | —                                                                             |


## Ключевые правила

1. **background/primary = #F0F3F5** (серый, не белый!). Белый фон — это `background/secondary`
2. **elements/tertiary = elements/disabled** = #E2E6ED (одинаковый hex)
3. **Два modifier-типа**: `fake-invert` для тёмных блоков в светлой теме; `100%-invert` для текста/border на `elements/active` в обеих темах.
4. **Accent alpha**: secondary = 44% alpha (`70` в hex), tertiary = 24% alpha (`3D` в hex).
5. **Brand/tertiary** (#F4B807) — это pressed-состояние для brand/primary
