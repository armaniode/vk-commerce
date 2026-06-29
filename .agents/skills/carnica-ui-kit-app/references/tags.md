# Carnica UI-kit APP — Метки и статусы

Источник паспортов tag/badge-компонентов APP. См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

> **Правило фонов тэгов** (см. ux-principles §16): tag 2.3 color может быть только из 5 разрешённых значений (default / brand / invert / success / error). Цветные `surface-*` токены для фонов тэгов запрещены.

## tag 2.3

**Library Key**: `24b31d42661e2df39f3b1b66efa04c4d5ce0032a` | **20 variants**

| Variant | Values |
|---------|--------|
| `size` | `XS`, `S` |
| `color` | `default on bg_primary/secondary/tertiary`, `brand`, `invert`, `accent`, `error`, `success`, `custom` |
| `disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#22934:0` | TEXT | `текст tag` |
| `left icon#13921:0` | BOOLEAN | `false` |
| `right icon#24821:0` | BOOLEAN | `false` |
| `❖ left icon#13921:15` | INSTANCE_SWAP | |
| `❖ right icon#24821:15` | INSTANCE_SWAP | |

---

## adtag 2.2

**Library Key**: `ad6d0d2c068bf1f844219320f43be9a615e8a3c2` | **6 variants**

| Variant | Values |
|---------|--------|
| `size` | `S`, `M`, `L` |
| `background` | `light`, `dark` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#24894:0` | TEXT | `реклама` |

---

## badge 3.0

**Library Key**: `6d34787991adf40a9db2b09099cfcad4517606f5` | **72 variants**
**Node**: `34792:150143`

| Variant | Values |
|---------|--------|
| `view` | `dot`, `text`, `icon` |
| `color` | `default on bg_primary`, `default on bg_secondary`, `default on bg_tertiary`, `brand`, `invert`, `accent`, `error`, `success`, `custom` |
| `size` | `S`, `M` |
| `stretch` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#34792:0` | TEXT | `2` |
| `❖ icon#34792:19` | INSTANCE_SWAP | icon component set |

**Geometry**:
- `view=dot`: `S=8x8`, `M=12x12`.
- `view=text` / `view=icon`: `S=16x16`, `M=24x24`.
- `stretch=true` applies only to `view=text`; fixed text badge contains one character.

**Color gotchas**:
- `custom` uses default `surface/08-yellow` with `constant/dark`; do not introduce free custom colors unless explicitly scoped.
- `default on bg_tertiary` is the white/default badge for tertiary context.
- Text and icon foregrounds are determined by `color`; do not manually recolor except through the component color variant.

**Usage gotchas**:
- Badge is non-clickable and belongs to a parent component.
- One parent component may have only one badge.
- Default badge disappears after parent interaction unless product logic intentionally keeps it visible.

---

## stories badge

**Library Key**: `a7827ed7ef8c9cc46656f1697c180436d98dc73d` | **2 variants**
**Node**: `5038:46214`

| Variant | Values |
|---------|--------|
| `activated` | `true`, `false` |

`stories badge` is separate from `badge 3.0`. Use it only inside stories-related parent components: `activated=true` is a filled `brand/primary` dot, `activated=false` is an outlined dot with `elements/additional02`.

---

## tooltip 1.0

**Library Key**: `2d7039d3b4677db45f2a17b00e9f836dd551e278` | **24 variants**

| Variant | Values |
|---------|--------|
| `direction` | `↓ Bottom Center`, `↙ Bottom Left`, `↘ Bottom Right`, `↑ Top Center`, `↖ Top Left`, `↗ Top Right`, `← Left Center`, `→ Right Center`, и др. |
| `invert` | `true`, `false` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#28704:0` | TEXT | `title` |
| `↩︎ subtitle#28704:25` | TEXT | `subtitle` |
| `subtitle#28778:0` | BOOLEAN | `true` |
