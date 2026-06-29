# Carnica UI-kit APP — Модалки и оверлеи

Источник паспортов modal-компонентов APP. См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

> **Правило navbar modal always**: во ВСЕХ модальных окнах (bottom sheet, dialog, action sheet, modal page) обязательно вставлять `navbar modal 1.0` (`bef5f93f4a80c3ea80f50bcfcf13403bcee1ff6d`, SINGLE component, `importComponentByKeyAsync`) — НЕ navbar 3.0. См. также `navigation.md` § navbar modal 1.0.

## dialog 2.1

**Library Key**: `296b1e4a5829cff87a0098b20fd90bf685f92568` | **2 variants**

| Variant | Values |
|---------|--------|
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `second button#757:0` | BOOLEAN | `true` |
| `place content#6239:4` | BOOLEAN | `false` |
| `❖ place content#23327:0` | INSTANCE_SWAP | |

---

## Alert

**Library Key**: `0935334b715d6a21794e49a590e9fd0e96c5fa9f` | **8 variants**

| Variant | Values |
|---------|--------|
| `Mode` | `Light`, `Dark` |
| `Buttons` | `1`, `2 (Side by Side)`, `2 Stacked`, `3 Stacked` |

| Key | Type | Default |
|-----|------|---------|
| `Title#63:3` | TEXT | `A Short Title Is Best` |
| `Description#63:1` | TEXT | `A message should be a short, complete sentence.` |
| `Show description#63:2` | BOOLEAN | `true` |
| `Show text field#65:7` | BOOLEAN | `false` |
| `Primary Action#234:0` | TEXT | `Action` |
| `Secondary Action#234:9` | TEXT | `Action` |
| `Tertiary Action#234:18` | TEXT | `Action` |

---

## action sheet 2.1

**Library Key**: `3a9a04819490dcfbc293b37194e0f3a65bd84f44` | **3 variants**

| Variant | Values |
|---------|--------|
| `button` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `title#9195:11` | BOOLEAN | `true` |
| `scroll#10702:7` | BOOLEAN | `true` |

---

## sheet 2.2 (new)

**Library Key**: `a4da9d3a1d5e353b99b8d17e66e3edbe468d5a5c` | **3 variants**

| Variant | Values |
|---------|--------|
| `state` | `hide`, `1/2 screen`, `full screen` |

| Key | Type | Default |
|-----|------|---------|
| `❖ place content#6668:1` | INSTANCE_SWAP | |
| `title #6825:0` | BOOLEAN | `true` |

---

## modal page 2.1

**Library Key**: `6f09570118fb5b7a49702965d5aad50825205ef8` | **SINGLE component**
