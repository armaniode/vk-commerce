# Carnica UI-kit APP — Списки и контент

Источник паспортов list-компонентов APP. См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

## cell 3.1

**Library Key**: `b8778e5453de3f31a334a1179c313fffad89f39c` | **36 variants**

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

**Nested: `.left view`** — `cell.findOne(n => n.name === '❖ left view settings')`

| Key | Type | Values |
|-----|------|--------|
| `type` | VARIANT | `avatar`, `avatar group`, `icon` |
| `disabled` | VARIANT | `false`, `true` |
| `❖icon#16392:0` | INSTANCE_SWAP | иконка |

**Nested: `.right view`** — `cell.findOne(n => n.name === '❖ right view settings')`

| Key | Type | Values |
|-----|------|--------|
| `type` | VARIANT | `button`, `button inline`, `icon`, `tag`, `switch`, `checkbox`, `text` |
| `disabled` | VARIANT | `false`, `true` |
| `❖ left icon#16392:4` | INSTANCE_SWAP | |
| `❖ right icon#26848:0` | INSTANCE_SWAP | |
| `one more icon#26848:15` | BOOLEAN | `false` |

**Gotchas**:
- `background=none` для cells внутри белой карточки. `default on bg_secondary` даёт ДОП серый фон!
- Chevron в right view ВСЕГДА перекрашивать в `content/secondary` через `recolorVectors()`
- Обнулять padding на инстансе: `cell.paddingLeft=0; cell.paddingRight=0; ...`

---

## cell grid 2.2

**Library Key**: `ba2d5c74e859c45a172f612a536811dbdb73bad9` | **3 variants**

> **Обновлено** с 2.1 до 2.2

| Variant | Values |
|---------|--------|
| `disabled` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `⇧ title#6748:0` | TEXT | `отправить чек на почту` |

> `setProperties` для TEXT не обновляет визуально — менять через Method A на `label` text node.

**Nested: `❖ avatar`** — avatar 3.0 инстанс. Default `size=M`, обычно нужен `size=L`:
```js
const avatar = cg.findOne(n => n.name === '❖ avatar');
avatar.setProperties({ 'view': 'icon', 'size': 'L' });
```

---

## accordion group 2.2

**Library Key**: `4612d43d611a917d54b03d0bf92794b9c9c596d1` | **2 variants** (skeleton=false/true)

| Key | Type | Default |
|-----|------|---------|
| `2 line#17341:8` | BOOLEAN | `true` — видимость item #2 |
| `3 line#17341:11` | BOOLEAN | `true` |
| `4 line#17341:14` | BOOLEAN | `true` |
| `5 line#17341:17` | BOOLEAN | `true` |
| `6 line#17341:20` | BOOLEAN | `true` |
| `7 line#17341:23` | BOOLEAN | `true` |
| `8 line#17341:26` | BOOLEAN | `true` |
| `9 line#17341:29` | BOOLEAN | `true` |
| `10 line#17341:32` | BOOLEAN | `true` |

Item #1 всегда видим. Для N items — скрыть #(N+1)–#10.

**Nested: `.accordion item`** (N line settings) — `accordion.findOne(n => n.name === '1 line settings')`

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#17341:0` | TEXT | `заголовок` |
| `↩︎ subtitle#17341:4` | TEXT | `текст` |
| `❖ content#28317:0` | INSTANCE_SWAP | доп. контент |
| `activated` | VARIANT | `false` (`true` = expanded) |
| `view` | VARIANT | `text`, `custom` |

**Gotcha**: каждый nested item имеет padding — обнулять ВСЕ 4 стороны.

---

## chips text collection 2.1

**Library Key**: `b848915c032aae01a38bb523e4018c4af2c928ba` | **4 variants**

| Variant | Values |
|---------|--------|
| `wrap` | `false`, `true` |
| `skeleton` | `false`, `true` |

Содержит **12 фиксированных `.chips item` instances**. Лишние скрывать через `.visible=false`.

**Nested: `.chips item`** (key: `6147f519dc6b805ba1c8f8265a226040c52adeb1`)

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#2732:2` | TEXT | `финансы` |
| `placeholder#26148:17` | BOOLEAN | `true` |
| `counter#10639:0` | BOOLEAN | `false` |
| `↩︎ counter#10639:5` | TEXT | `3` |
| `right icon#4141:0` | BOOLEAN | `false` |
| `left icon#2732:1` | BOOLEAN | `false` |
| `badge#7407:0` | BOOLEAN | `false` |
| `❖ right icon#2739:3` | INSTANCE_SWAP | |
| `❖ left icon#4141:4` | INSTANCE_SWAP | |
| `❖ placeholder#26148:0` | INSTANCE_SWAP | |
| `background` | VARIANT | `default on bg_primary` |
| `activated` | VARIANT | `false`, `true` |
| `disabled` | VARIANT | `false`, `true` |
| `invert` | VARIANT | `false`, `true` |

**Gotcha**: для корректного wrap-layout задать `counterAxisAlignItems='CENTER'` + `primaryAxisAlignItems='CENTER'`.

---

## avatar 3.0

**Library Key**: `37e7d13eef2d569028bbace869a532a626e22279` | **116 variants**

| Variant | Values |
|---------|--------|
| `view` | `image`, `logo`, `icon`, `text`, `skeleton` |
| `size` | `S`, `M`, `L`, `XL` |
| `color` | `default on bg_primary/secondary/tertiary`, `brand`, `invert`, `custom`, `—` |
| `disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#16163:4` | TEXT | `ИИ` (initials, view=text) |
| `badge#16163:1` | BOOLEAN | `false` |
| `❖ icon#16163:3` | INSTANCE_SWAP | иконка (view=icon) |
| `❖ image#16163:2` | INSTANCE_SWAP | фото (view=image) |
| `❖ logo#16163:0` | INSTANCE_SWAP | лого (view=logo) |

---

## avatar group 3.0

**Library Key**: `0356c2c9e3434165104c0f3c91cbceb842b8e150` | **88 variants**

| Variant | Values |
|---------|--------|
| `size` | `S`, `M`, `L`, `XL` |
| `count` | `1`–`12` |
| `disabled` | `false`, `true` |
