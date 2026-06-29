# Carnica UI-kit WEB — Feedback

Источник паспортов feedback-компонентов WEB (snackbar, spinner, skeleton, loading window, status block, progress bar, pagination). См. `../SKILL.md` для Quick Start, Decision tree и top gotchas.

---

## snackbar 2.1

**Library Key**: `cb3b3f3dda1b0065a953409f9c5c3e01206be3fd` | **16 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop/tablet`, `mobile` |
| `state` | `info`, `warning`, `error`, `success` |
| `icon close` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `subtitle#1001:17` | BOOLEAN | `true` |

---

## spinner 2.0

**Library Key**: `0e4e20123613b6666e6d9813b6f29cc1b42f3603` | **10 variants**

| Variant | Values |
|---------|--------|
| `theme` | `light`, `dark` |
| `color` | `brand`, `constant dark/brand`, `brand/invert`, `constant dark/light` |

## fullscreen spinner 2.0

**Library Key**: `434d7a86095f6dad6c9eb47eb4534307a633cd40` | **3 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop`, `tablet`, `mobile` |

| Key | Type | Default |
|-----|------|---------|
| `show text#8838:0` | BOOLEAN | `true` |
| `↩︎ text#18123:0` | TEXT | `загружаем ...` |

---

## skeleton 2.1

**Library Key**: `478b50b818a16f7dbf7b3c31c94ec39de1789808` | **4 variants**

| Variant | Values |
|---------|--------|
| `state` | `start`, `finish` |
| `invert` | `false`, `true` |

## skeleton text 1.0

**Library Key**: (pending) | **4 variants**

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#33339:0` | TEXT | `текст` |

---

## loading window 1.0

**Library Key**: `60ee0717106c9951c40e87aa476485b134bab160` | **15 variants**

| Variant | Values |
|---------|--------|
| `device` | `mobile`, `desktop`, `tablet` |
| `fill` | `25%`, `50%`, `75%`, `83%`, `100%` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#6112:35` | TEXT | `подключаем, займёт полминуты` |
| `↩︎ subtitle#6112:34` | TEXT | `пришлём смс, как закончим` |
| `subtitle#6112:33` | BOOLEAN | `true` |

> WEB-only компонент (полноэкранный progress window). В APP вместо него `loading page 2.1`.

---

## status block 3.0

**Library Key**: `6f515d395ce5d388fb5bb5712fe2736cbcd8db78` | **8 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop/tablet`, `mobile` |
| `state` | `info`, `progress`, `success`, `error` |

| Key | Type | Default |
|-----|------|---------|
| `second button#7111:0` | BOOLEAN | `true` |
| `actions#7111:9` | BOOLEAN | `true` |
| `action 2#7111:18` | BOOLEAN | `true` |
| `action 3#7111:27` | BOOLEAN | `true` |
| `place content#7111:45` | BOOLEAN | `true` |
| `banner#7111:54` | BOOLEAN | `true` |
| `❖ change content#7111:36` | INSTANCE_SWAP | |

> WEB-only компонент (статус-блок результата операции). В APP — `status screen 2.1` (полный экран).

## status block modal 1.0

**Library Key**: `ec3d70295a8c7607c7692deae4f9c2bd96786645` | **3 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop`, `tablet`, `mobile` |

| Key | Type | Default |
|-----|------|---------|
| `scroll#18433:0` | BOOLEAN | `false` |

---

## error_empty state 3.0

**Library Key**: `113a573d5ea6a6a405f726d0cfda51b08541c7a0` | Source page timeout — property discovery pending.

---

## progress bar 2.1

**Library Key**: `afe9a2a6b5096c37bea9ba809e1edd5847f2990a` | **10 variants**

| Variant | Values |
|---------|--------|
| `count` | `1`–`5` |
| `invert` | `false`, `true` |

> WEB-only компонент (линейный progress). В APP линейного progress bar нет — используется `progress step bar` или кастомные dot-индикаторы.

---

## progress step bar 2.1

**Library Key**: `9e4d8c4aaa22a83b587da73fae35d6b891c14b12` | **7 variants**

| Variant | Values |
|---------|--------|
| `steps count` | `2`–`8` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#18388:0` | TEXT | `шаг 1 из 2` |
| `↩︎ subtitle#18165:26` | TEXT | `ещё ~ 3 минуты` |
| `title#18157:0` | BOOLEAN | `true` |
| `subtitle#18157:8` | BOOLEAN | `true` |
| `bullet#18157:16` | BOOLEAN | `true` |
| `step 2#18149:8` – `step 8#18165:9` | BOOLEAN | `false` (default в WEB!) |

> WEB progress step bar: steps по умолчанию скрыты (`false`), в APP — показаны (`true`).

---

## pagination 2.2 vs page pagination 2.1 — НЕ ПУТАТЬ

**Два разных компонента с похожими именами:**

### pagination 2.2 (dots-индикатор для карусели)

**Library Key**: `5707b8d3efe6652bfa39f215c8306214886c8156` | **120 variants**

| Variant | Values |
|---------|--------|
| `size` | `M`, `S`, `XS` |
| `direction` | `horizontal`, `vertical` |
| `count` | `2`–`10` |
| `skeleton` | `false`, `true` |
| `auto scrolling` | `false`, `true` |

> WEB pagination 2.2 = **точки-индикаторы** для карусели (1 из 5 dots). Имеет `auto scrolling` variant и size=M (нет в APP).

### page pagination 2.1 (1 2 3 … N номера страниц)

**Library Key**: `f2b6cb4e9473dc55cb628d9a6199a6d223dbfa4d` | **12 variants**

| Variant | Values |
|---------|--------|
| `color` | `primary`, `secondary` |
| `count` | `≤5`, `5+` |
| `position` | `start`, `center`, `end` |

| Key | Type | Default |
|-----|------|---------|
| `right button#13196:0` | BOOLEAN | `false` |
| `left button#13201:0` | BOOLEAN | `false` |

> **WEB-only** компонент page pagination 2.1 — пагинация **номеров страниц** (1 2 3 ... N) для каталога/блога/таблицы. В APP-аналога нет.

**Правило выбора**:
- Карусель баннеров/фото → `pagination 2.2` (dots).
- Таблица товаров / список статей с явными страницами → `page pagination 2.1` (numbers).
