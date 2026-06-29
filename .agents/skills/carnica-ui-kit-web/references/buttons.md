# Carnica UI-kit WEB — Buttons

Источник паспортов button-компонентов WEB. См. `../SKILL.md` для Quick Start, Decision tree и top gotchas. Production header (где живут button-кнопки `button 2.1` view=icon/text) — `.agents/skills/carnica-components/references/header.md`.

---

## button 2.1

**Library Key**: `535b6bbdde21f97602bf9c6260b2a0d195528215` | **192 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop/tablet`, `mobile` |
| `priority` | `primary`, `secondary on bg_primary/secondary/tertiary`, `tertiary`, `destructive` |
| `view` | `text`, `icon` |
| `state` | `default`, `hover`, `pressed`, `disabled`, `loading` |
| `size` | `large`, `medium` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#6033:0` | TEXT | `кнопка` |
| `↩︎ sale#6043:0` | TEXT | `100 ₽` |
| `sale#6043:161` | BOOLEAN | `false` |
| `badge#8071:0` | BOOLEAN | `false` |
| `left icon#15154:0` | BOOLEAN | `false` |
| `right icon#13273:0` | BOOLEAN | `false` |
| `❖ icon#440:1` | INSTANCE_SWAP | основная (view=icon) |
| `❖ left icon#15154:193` | INSTANCE_SWAP | |
| `❖ right icon#15154:386` | INSTANCE_SWAP | |

> WEB button имеет `hover` state и `device` variant (нет в APP). TEXT key отличается: `#6033:0` (WEB) vs `#137:0` (APP).

---

## button inline text 2.1

**Library Key**: `1b0e18e52590c9301ebeabc344293044c4e7036b` | **24 variants**

| Variant | Values |
|---------|--------|
| `priority` | `primary`, `secondary`, `destructive` |
| `state` | `default`, `hover`, `pressed`, `disabled` |
| `invert` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#538:0` | TEXT | `принять` |
| `right icon#623:0` | BOOLEAN | `true` |
| `left icon#1139:0` | BOOLEAN | `false` |

> **КЛЮЧЕВОЕ WEB-отличие**: WEB `priority="secondary"` — **нормальная ЛАТИНИЦА**. В APP-аналоге `button inline text 3.0` priority — `"seсondary"` с **кириллической «с»** (latin-cyrillic confusable). При `setProperties` для WEB версии всегда передавать латинский `secondary` — не копировать значение из APP-кода!

---

## button inline icon 2.1

**Library Key**: `8a561f76b23983f71d38f94bc34b477b681703ca` | **42 variants**

| Variant | Values |
|---------|--------|
| `priority` | `primary`, `secondary` |
| `state` | `default`, `hover`, `pressed`, `disabled`, `loading` |
| `background` | `false`, `true` |
| `invert` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `❖ icon#2878:0` | INSTANCE_SWAP | иконка |
