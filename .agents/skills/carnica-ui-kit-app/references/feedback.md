# Carnica UI-kit APP — Обратная связь

Источник паспортов feedback-компонентов APP (loading / spinner / skeleton / status / snackbar / progress). См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

## spinner 2.1

**Library Key**: `8e1b37482fddc4a28e1a87577cb3286d32c20197` | **10 variants**

| Variant | Values |
|---------|--------|
| `theme` | `light`, `dark` |
| `color` | `constant dark/light`, `constant dark/brand`, `constant light/brand`, `brand`, `brand/invert` |

Runtime pairs from the linked Figma docs + attached JSON:

| `color` | Pair |
|---|---|
| `constant dark/light` | `constant/dark` + `constant/light` |
| `constant dark/brand` | `constant/dark` + `brand/primary` |
| `constant light/brand` | `constant/light` + `brand/primary` |
| `brand` | light: `constant/dark` + `brand/primary`; dark: `constant/light` + `brand/primary` |
| `brand/invert` | light: `constant/light` + `brand/primary`; dark: `constant/dark` + `brand/primary` |

Button loading mapping: `primary`/`destructive` -> `constant dark/light`; `tertiary` -> `brand/invert`; all secondary priorities -> `brand`.

## fullscreen spinner 2.1

**Library Key**: `dfd06b08d5d429be7541ccaf06a951779626f6fa` | **SINGLE component**

---

## snackbar 2.1

**Library Key**: `21510f68893d428d637e329402bbc3d8594ddd3d` | **8 variants**

| Variant | Values |
|---------|--------|
| `state` | `info`, `warning`, `error`, `success` |
| `icon close` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `subtitle#1392:5` | BOOLEAN | `true` |

---

## skeleton 2.1

**Library Key**: `d5dfeaa17c5e141f86a2f4f06e73868c3e6df2b3` | **4 variants**

| Variant | Values |
|---------|--------|
| `state` | `start`, `finish` |
| `invert` | `false`, `true` |

## skeleton text 1.0 (new)

**Library Key**: (pending — новый компонент) | **4 variants**

| Variant | Values |
|---------|--------|
| `state` | `start`, `finish` |
| `invert` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#33339:0` | TEXT | `текст` |

---

## loading page 2.1

**Library Key**: `69e167105a0aaae86e65b08e039c7ffcfe53f252` | **5 variants**

| Variant | Values |
|---------|--------|
| `fill` | `25%`, `50%`, `75%`, `83%`, `100%` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#6112:35` | TEXT | `подключаем, займёт полминуты` |
| `↩︎ subtitle#6112:34` | TEXT | `пришлём смс, как закончим` |
| `subtitle#6112:33` | BOOLEAN | `true` |
| `place content#11783:19` | BOOLEAN | `false` |
| `❖ swap instance#11783:10` | INSTANCE_SWAP | |

---

## status screen 4.0

**Library Key**: `19993623c40044f34001e88acc81f6cbd45802f7` | **9 variants**
> Старая версия 2.1 (`06b418cfc6395e243ffff3f45fce8318e0d3765a`) тоже опубликована, но deprecated.

| Variant | Values |
|---------|--------|
| `view` | `info`, `progress`, `success`, `error`, `skeleton` |
| `actions` | `true`, `false` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#30769:4` | TEXT | `заголовок` |
| `↩︎ subtitle#30769:8` | TEXT | `подзаголовок, желательно, в 1 – 3 строки` |
| `place content#32999:0` | BOOLEAN | `false` |
| `Slot#32690:10` | SLOT | |

> **Обновлён**: версия 4.0 (deprecated 2.1 ещё существует в файле). Проверить library key через `search_design_system`.

---

## error_empty state 3.0

**Library Key**: `6b271a07b0aab148bd0ebbf341cfa5e7e8935eab` | **3 variants**

> Полный property discovery pending (source page timeout). Основные свойства — из library catalog.

---

## progress step bar 2.1

**Library Key**: `0cd7573ecc28ed0e6a4bb07f455cdef1237a3d07` | **7 variants**

| Variant | Values |
|---------|--------|
| `steps count` | `2`, `3`, `4`, `5`, `6`, `7`, `8` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#18388:0` | TEXT | `шаг 1 из 2` |
| `↩︎ subtitle#18165:26` | TEXT | `ещё ~ 3 минуты` |
| `title#18157:0` | BOOLEAN | `true` |
| `subtitle#18157:8` | BOOLEAN | `true` |
| `bullet#18157:16` | BOOLEAN | `true` |
| ` step 2#18149:8` | BOOLEAN | `true` |
| ` step 3#18149:16` | BOOLEAN | `true` |
| ` step 4#18157:24` | BOOLEAN | `true` |
| ` step 5#18157:33` | BOOLEAN | `true` |
| ` step 6#18157:42` | BOOLEAN | `true` |
| `step 7#18165:0` | BOOLEAN | `true` |
| ` step 8#18165:9` | BOOLEAN | `true` |

---

## pagination 3.0

**Library Key**: НЕ ОПУБЛИКОВАН. Использовать `pagination 2.2`: `d824a6e04e351ee778935ea6d0efb4c98b2d0102` | **40 variants (в source), 20 в published 2.2**

| Variant | Values |
|---------|--------|
| `size` | `S`, `XS` |
| `direction` | `horizontal`, `vertical` |
| `count` | `2`–`10` |
| `skeleton` | `false`, `true` |

> **Обновлён**: версия 3.0 (deprecated 2.2 ещё существует). Проверить library key через `search_design_system`.
