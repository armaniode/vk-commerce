# Carnica UI-kit WEB — Forms

Источник паспортов form-компонентов WEB (input, search, textarea, select, date picker, checkbox, switch, stepper, picker, file input). См. `../SKILL.md` для Quick Start, Decision tree и top gotchas.

---

## input 2.3

**Library Key**: `bd250abb67fb8654de4177224be9aaccbfe20874` | **11 variants**

| Variant | Values |
|---------|--------|
| `type` | `text`, `phone`, `card`, `month`, `date`, `range`, `time`, `password`, `currency`, `code`, `skeleton` |

Sub-component `.inputText` (nested) — пример свойств:

| Key | Type | Default |
|-----|------|---------|
| `↩︎ text inside#17953:57` | TEXT | `Попов` |
| `↩︎ placeholder#17953:16` | TEXT | `с большой буквы :)` |
| `right view#142:32` | BOOLEAN | `true` |
| `clear icon#4077:0` | BOOLEAN | `true` |
| `caption#122:58` | BOOLEAN | `false` |
| `label#122:65` | BOOLEAN | `true` |
| `placeholder#18226:0` | BOOLEAN | `true` |
| `device` | VARIANT | `desktop/tablet` |
| `state` | VARIANT | `default`, `entering`, `filled` |
| `error` | VARIANT | `false`, `true` |
| `invert` | VARIANT | `false`, `true` |

> WEB input sub-components имеют `device` variant и TEXT keys отличаются от APP (`#17953:*` vs `#28956:*`).

---

## search field 2.1

**Library Key**: `0ee6a86d66c97839de8e02771c69a4512b6d055f` | **16 variants**

| Variant | Values |
|---------|--------|
| `state` | `default`, `activated`, `entering`, `filled` |
| `size` | `S`, `M` |
| `invert` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `cancel button#11557:0` | BOOLEAN | `true` |

---

## text area 2.2

**Library Key**: `da9eb541c02a5898d86be7576af40e23fe62878e` | **24 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop/tablet`, `mobile` |
| `state` | `default`, `activated`, `disabled-empty` |
| `error` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ placeholder#18043:0` | TEXT | `нам важно твое мнение` |
| `↩︎ text inside#18043:23` | TEXT | (длинный placeholder) |
| `label#6204:0` | BOOLEAN | `true` |
| `scroll#6204:21` | BOOLEAN | `true` |
| `caption block#6204:42` | BOOLEAN | `true` |
| `counter#6204:63` | BOOLEAN | `true` |
| `caption text#6221:84` | BOOLEAN | `true` |

---

## select 2.2

**Library Key**: `5c2ad52187b6831dcf29b8a5ebae05681de08716` | **48 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop/tablet`, `mobile` |
| `state` | `default`, `filled` |
| `error` | `false`, `true` |
| `invert` | `false`, `true` |
| `left view type` | `logo`, `icon` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ text inside#18071:0` | TEXT | `билайн` |
| `label #5147:0` | BOOLEAN | `true` |
| `left view#6444:0` | BOOLEAN | `true` |
| `caption#6465:0` | BOOLEAN | `true` |
| `❖ logo#5813:0` | INSTANCE_SWAP | |
| `❖ icon#5813:13` | INSTANCE_SWAP | |

---

## date picker 2.2

**Library Key**: `b91ec030743688f7d4ac820b667947cdbf474c01` | **12 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop`, `mobile` |
| `type` | `date`, `year`, `month` |
| `prefilled` | `true`, `false` |

| Key | Type | Default |
|-----|------|---------|
| `scroll#5783:0` | BOOLEAN | `false` |

---

## checkbox 2.1

**Library Key**: `450567310da86b896f8ec3964c983b33c5658c58` | **8 variants**

| Variant | Values |
|---------|--------|
| `activated` | `true`, `false` |
| `disabled` | `false`, `true` |
| `invert` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label left#3954:5` | TEXT | `текст` |
| `↩︎ label right#15635:9` | TEXT | `текст` |
| `label left#3954:0` | BOOLEAN | `false` |
| `label right#15635:0` | BOOLEAN | `false` |

> WEB checkbox TEXT keys отличаются от APP (`#3954:5` vs `#8763:58`).

---

## switch 2.1

**Library Key**: `2663584922a2f1ab74d9dcdc7e35ba5003a5f1f9` | **4 variants**

| Variant | Values |
|---------|--------|
| `activated` | `true`, `false` |
| `disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label left#9426:10` | TEXT | `текст` |
| `↩︎ label right#9592:5` | TEXT | `текст` |
| `label left#9426:15` | BOOLEAN | `false` |
| `label right#9592:0` | BOOLEAN | `false` |

---

## stepper 2.2

**Library Key**: `d5ad1d33d9ec8b327a975ac0b74ae34209982820` | **34 variants**

| Variant | Values |
|---------|--------|
| `direction` | `horizontal`, `vertical` |
| `state` | `default`, `disabled` |
| `color` | `default on bg_secondary`, `default on bg_primary` |
| `minus disabled` | `false`, `true` |
| `plus disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#17132:0` | TEXT | `1` |
| `label#4392:57` | BOOLEAN | `true` |

---

## picker 2.2

**Library Key**: `a5ddd76ff57dc966a98400a8fcf7e55a1ae09d8f` | **21 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop`, `mobile` |
| `state` | `filled`, `empty`, `error` |
| `avatar` | `true`, `false` |
| `subtitle` | `true`, `false` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `keyboard#9876:3` | BOOLEAN | `false` |
| `tab#9876:4` | BOOLEAN | `true` |
| `linear up#9878:0` | BOOLEAN | `true` |
| `linear down#9878:5` | BOOLEAN | `true` |
| `search field#9961:0` | BOOLEAN | `true` |

---

## file input

**Library Key**: (pending — проверить через search_design_system) | **12 variants**

| Variant | Values |
|---------|--------|
| `background` | `default on bg_primary`, `default on bg_secondary` |
| `hover` | `false`, `true` |
| `error` | `false`, `true` |
| `disabled` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `label#19360:0` | BOOLEAN | `true` |
| `caption#19360:9` | BOOLEAN | `true` |
| `file 1#19390:0` – `file 5#19390:36` | BOOLEAN | `false` |
