# Carnica UI-kit WEB — Tags & Status

Источник паспортов tag/badge/tooltip компонентов WEB. См. `../SKILL.md` для Quick Start, Decision tree и top gotchas.

---

## tag 2.3

**Library Key**: `50cca33a43e2f604470f08b6956052f4c058277a` | **20 variants**

| Variant | Values |
|---------|--------|
| `size` | `XS`, `S` |
| `color` | `default on bg_primary/secondary/tertiary`, `brand`, `invert`, `accent`, `error`, `success`, `custom` |
| `disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#15004:0` | TEXT | `текст tag` |
| `left icon#8206:0` | BOOLEAN | `false` |
| `right icon#15004:32` | BOOLEAN | `false` |
| `❖ left icon#8215:0` | INSTANCE_SWAP | |
| `❖  right icon#15004:15` | INSTANCE_SWAP | |

> WEB tag TEXT key: `#15004:0` (vs APP `#22934:0`).

---

## adtag 2.1

**Library Key**: `7f5c499eaec6b9a19dc2fc68e555eb29a5aad373` | **6 variants**

| Variant | Values |
|---------|--------|
| `size` | `S`, `M`, `L` |
| `background` | `light`, `dark` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#15007:0` | TEXT | `реклама` |

---

## badge 2.2

**Library Key**: `171654a914115b525cb010c45276bf3167fd9a78` | **3 variants**

| Variant | Values |
|---------|--------|
| `view` | `dot`, `text`, `icon` |

---

## tooltip 3.0

**Library Key**: `bd2f79fb452c4fbbfee1e5fd628e42c3b1286f70` | **24 variants**

| Variant | Values |
|---------|--------|
| `direction` | `↓ Bottom Center`, `↙ Bottom Left`, `↘ Bottom Right`, и др. |
| `invert` | `true`, `false` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#28704:0` | TEXT | `title` |
| `↩︎ subtitle#28704:25` | TEXT | `subtitle` |
| `subtitle#28778:0` | BOOLEAN | `true` |
| `button#18019:0` | BOOLEAN | `true` |

> WEB tooltip 3.0 имеет `button` prop (нет в APP tooltip 1.0).

---

## qr code 2.2

**Library Key**: `c493af91ae673bc0bfcd7ed0f3e495696e400a46` | **6 variants**

| Variant | Values |
|---------|--------|
| `size` | `S`, `M`, `L` |
| `invert` | `true`, `false` |

| Key | Type | Default |
|-----|------|---------|
| `❖ logo#11431:0` | INSTANCE_SWAP | лого в центре |
| `❖ qr code#15362:0` | INSTANCE_SWAP | QR-код |

> WEB-only компонент. См. также `references/modals.md` и `references/system.md` — qr code часто появляется внутри модалок/полноэкранных карт.
