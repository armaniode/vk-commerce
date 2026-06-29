# Carnica UI-kit WEB — Lists & Content

Источник паспортов list-компонентов WEB (cell, cell grid, accordion, chips, avatar). См. `../SKILL.md` для Quick Start, Decision tree и top gotchas.

---

## cell 3.1

**Library Key**: `20c658e1fb9e28f70ed07d9e88c8248dbc419eba` | **36 variants**

| Variant | Values |
|---------|--------|
| `background` | `none`, `default on bg_primary`, `default on bg_secondary` |
| `skeleton` | `false`, `true` |
| `title size` | `S`, `L` |
| `reverse` | `true`, `false` |
| `disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#16440:33` | TEXT | `заголовок` |
| `↩︎ subtitle#16440:41` | TEXT | `подзаголовок` |
| `subtitle#16440:45` | BOOLEAN | `true` |
| `title#16443:0` | BOOLEAN | `true` |
| `left view#16392:12` | BOOLEAN | `true` |
| `right view#16392:16` | BOOLEAN | `true` |

> Property UIDs идентичны APP cell 3.1. Те же gotchas: chevron recolor, padding reset, background=none для карточек.

---

## cell grid 2.2

**Library Key**: `09271f808b4a7ab179fe532e2f28e772dc21c803` | **6 variants**

| Variant | Values |
|---------|--------|
| `size` | `M`, `L` |
| `disabled` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#6748:0` | TEXT | `отправить чек на почту` |

> WEB cell grid имеет variant `size` (M/L), которого нет в APP.

---

## accordion 2.2

**Library Key**: `8061224f40891ea4005b661e02f69b2822d3b976` | **4 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop/tablet`, `mobile` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `2 line#17341:8` – `10 line#17341:32` | BOOLEAN | `true` (visibility items #2-10) |

**Nested items**: `.accordion item desktop` и `.accordion item mobile` — разные компоненты!

| Key (desktop) | Key (mobile) | Type | Default |
|---------------|-------------|------|---------|
| `↩︎ title#16842:18` | `↩︎ title#17341:0` | TEXT | `заголовок` |
| `↩︎ subtitle#16842:25` | `↩︎ subtitle#17341:4` | TEXT | `текст` |
| `❖ content#4618:0` | `❖ content#4618:0` | INSTANCE_SWAP | |
| `activated` | `activated` | VARIANT | `false` |
| `view` | `view` | VARIANT | `text`, `custom` |

---

## chips text collection 2.2

**Library Key**: `cbd0f0231ee410d509306c8db111e4f5b41d9db1` | **4 variants**

| Variant | Values |
|---------|--------|
| `wrap` | `false`, `true` |
| `skeleton` | `false`, `true` |

---

## avatar 4.0

**Library Key**: `e565e20a138bddb3e1329bb38e088623b5caeea9` | **116 variants**

| Variant | Values |
|---------|--------|
| `view` | `image`, `logo`, `icon`, `text`, `skeleton` |
| `size` | `S`, `M`, `L`, `XL` |
| `color` | `—`, `default on bg_primary/secondary/tertiary`, `brand`, `invert`, `custom` |
| `disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#16163:4` | TEXT | `ИИ` |
| `badge#16163:1` | BOOLEAN | `false` |
| `❖ icon#16163:3` | INSTANCE_SWAP | |
| `❖ image#16163:2` | INSTANCE_SWAP | |
| `❖ logo#16163:0` | INSTANCE_SWAP | |

> Property UIDs идентичны APP avatar 3.0 (`#16163:*`).

---

## avatar group 4.0

**Library Key**: `bfdb2122f18a5e4b97b0798f03943de5538ddbe6` | **88 variants**

| Variant | Values |
|---------|--------|
| `size` | `S`, `M`, `L`, `XL` |
| `count` | `1`–`12` |
| `disabled` | `false`, `true` |
