# Carnica UI-kit WEB — Modals

Источник паспортов модальных компонентов WEB (dialog, action sheet, modal page, qr code). См. `../SKILL.md` для Quick Start, Decision tree и top gotchas.

---

## dialog 2.2

**Library Key**: `80728eb1c12eb5bbfc60fce63bf72df3f517b428` | Source page timeout — property discovery pending.

> Carnica WEB bottom-sheet — **БЕЗ drag-handle** (это iOS-action-sheet паттерн, не WEB Carnica). Close-button обязательна на всех viewport, 44×44, stroke X-icon.

---

## action sheet 2.2

**Library Key**: `8a5672ad2d973e2a69e04f0dbf13b1f8ac1ed85f` | **3 variants**

| Variant | Values |
|---------|--------|
| `state` | `empty`, `filled`, `skeleton` |

| Key | Type | Default |
|-----|------|---------|
| `3#2219:36` – `10#15196:16` | BOOLEAN | `true` (items 3-10 visibility) |
| `scroll#2219:48` | BOOLEAN | `true` |

---

## modal page 2.1

**Library Key**: `269a0e0514794428803b95948ec177f77893ac6f` | **9 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop`, `tablet`, `mobile` |
| `modal wide` | `L`, `M`, `S` |

| Key | Type | Default |
|-----|------|---------|
| `scroll#5558:0` | BOOLEAN | `true` |
| `❖ content#5558:1` | INSTANCE_SWAP | |

> WEB `modal wide`: `L`=600 (полная), `M`=480, `S`=360 на desktop; на mobile становится bottom sheet через `position:fixed; bottom:0`.

---

## qr code 2.2

См. `references/tags.md § qr code 2.2` — паспорт qr code также применим при использовании внутри модалок (полноэкранная карта оплаты, share QR, и т. д.). WEB-only компонент, в APP-аналога нет.
