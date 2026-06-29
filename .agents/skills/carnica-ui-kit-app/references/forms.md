# Carnica UI-kit APP — Формы

Источник паспортов form-компонентов APP. См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

## TOC

- [input 2.3](#input-23) — text/phone/card/month/date/range/time/password/currency/code/skeleton
- [search field 2.2](#search-field-22)
- [text area 2.2](#text-area-22)
- [select 2.1](#select-21)
- [date picker 2.2](#date-picker-22)
- [checkbox 2.1](#checkbox-21)
- [switch 2.2](#switch-22)
- [stepper 2.1](#stepper-21)
- [slider 2.1](#slider-21)
- [picker 2.2](#picker-22)
- [iOS_NumericKeyboard](#ios_numerickeyboard)
- [iOS_AlphabeticKeyboard](#ios_alphabetickeyboard)

---

## input 2.3

**Library Key**: `897ac5f2f1344d72e3a2c8c93c3b44d635e5d935` | **11 variants**

| Variant | Values |
|---------|--------|
| `type` | `text`, `phone`, `card`, `month`, `date`, `range`, `time`, `password`, `currency`, `code`, `skeleton` |

На top-level только `type`. Все свойства на **nested `text input settings`**:

| Key | Type | Default |
|-----|------|---------|
| `state` | VARIANT | `default`, `entering`, `filled` |
| `error` | VARIANT | `false`, `true` |
| `invert` | VARIANT | `false`, `true` |
| `↩︎ text inside#28956:0` | TEXT | `Попов` |
| `↩︎ placeholder#28890:4` | TEXT | `с большой буквы :)` |
| `right view#142:32` | BOOLEAN | `true` — иконка справа |
| `clear icon#8704:3` | BOOLEAN | `true` — кнопка очистки |
| `label#122:65` | BOOLEAN | `true` |
| `caption#122:58` | BOOLEAN | `false` |
| `placeholder#29482:0` | BOOLEAN | `true` |

**Nested: `label settings`** — `input.findOne(n => n.name === 'label settings')`

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#28885:1` | TEXT | `фамилия` |

**Gotcha**: input имеет встроенный `paddingLeft/Right=20` — обнулять если parent уже задаёт отступы.

---

## search field 2.2

**Library Key**: `22e5549f6f19bb5170f5302f7ccfb921a8ad73e0` | **8 variants**

| Variant | Values |
|---------|--------|
| `style` | `default`, `glass` |
| `state` | `default`, `activated`, `entering`, `filled` |

| Key | Type | Default |
|-----|------|---------|
| `button#27249:0` | BOOLEAN | `false` |

---

## text area 2.2

**Library Key**: `79cf9e1d83dc22ef61519cf45c00ed5a80d27f01` | **12 variants**

| Variant | Values |
|---------|--------|
| `state` | `default`, `activated`, `disabled-empty` |
| `error` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ placeholder#29060:0` | TEXT | `нам важно твоё мнение` |
| `↩︎ text inside#29062:12` | TEXT | (длинный текст) |
| `label#6204:0` | BOOLEAN | `true` |
| `scroll#6204:21` | BOOLEAN | `true` |
| `caption block#6204:42` | BOOLEAN | `true` |
| `counter#6204:63` | BOOLEAN | `true` |
| `caption text#11061:0` | BOOLEAN | `true` |

---

## select 2.1

**Library Key**: `653746d94ae03f5fdbf6dca83aba0ce15152ce66` | **48 variants**

| Variant | Values |
|---------|--------|
| `prefilled` | `true`, `false` |
| `state` | `default`, `filled` |
| `error` | `false`, `true` |
| `invert` | `false`, `true` |
| `left view type` | `logo`, `icon` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ text inside#29155:0` | TEXT | `билайн` |
| `label #5147:0` | BOOLEAN | `true` |
| `left view#6444:0` | BOOLEAN | `true` |
| `caption#6465:0` | BOOLEAN | `true` |
| `❖ logo#5813:0` | INSTANCE_SWAP | лого |
| `❖ icon#5813:13` | INSTANCE_SWAP | иконка |

---

## date picker 2.2

**Library Key**: `7090adca7cf94ab8f96e7729eb76cd9813d9e51a` | **6 variants**

| Variant | Values |
|---------|--------|
| `type calendar` | `date`, `year`, `month` |
| `prefilled` | `true`, `false` |

| Key | Type | Default |
|-----|------|---------|
| `scroll#10696:0` | BOOLEAN | `true` |

---

## checkbox 2.1

**Library Key**: `469a4c4664a7d9e66e638d54fdfa0312a03b820a` | **8 variants**

| Variant | Values |
|---------|--------|
| `activated` | `true`, `false` |
| `disabled` | `false`, `true` |
| `invert` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label right#8763:58` | TEXT | `текст` |
| `↩︎ label left#25858:5` | TEXT | `текст` |
| `label right#8763:53` | BOOLEAN | `false` |
| `label left#25858:0` | BOOLEAN | `false` |

---

## switch 2.2

**Library Key**: `a9466b9f64985c6ea052c858aa3dd44339ec100f` | **4 variants**

| Variant | Values |
|---------|--------|
| `activated` | `true`, `false` |
| `disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label left #15106:0` | TEXT | `текст` |
| `↩︎ label right #29121:5` | TEXT | `текст` |
| `label left #15106:5` | BOOLEAN | `false` |
| `label right #29121:0` | BOOLEAN | `false` |

---

## stepper 2.1

**Library Key**: `0c0acd35e8464b2b726c96d1e9a34efdd50e5898` | **34 variants**

| Variant | Values |
|---------|--------|
| `direction` | `horizontal`, `vertical` |
| `state` | `default`, `disabled` |
| `color` | `default on bg_secondary`, `default on bg_primary` |
| `minus disabled` | `false`, `true` |
| `plus disabled` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#22939:0` | TEXT | `1` |
| `label#4392:57` | BOOLEAN | `true` |

---

## slider 2.1

**Library Key**: `b18ed9bb1117d7ba5d33f6ca82d76e382c3fbe49` | **2 variants**

| Variant | Values |
|---------|--------|
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ left label #18747:0` | TEXT | `плохо` |
| `↩︎ right label #18747:3` | TEXT | `всё супер` |
| `↩︎ middle label #18747:6` | TEXT | `нормально` |
| `middle label #18343:46` | BOOLEAN | `true` |
| `labels #18343:47` | BOOLEAN | `true` |

---

## picker 2.2

**Library Key**: `d00a9fac6ab1873181d59e6beb21f038035c7501` | **7 variants**

| Variant | Values |
|---------|--------|
| `state` | `filled`, `empty`, `error` |
| `avatar` | `true`, `false` |
| `subtitle` | `true`, `false` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `linear down#14427:6` | BOOLEAN | `true` |
| `linear up#14427:7` | BOOLEAN | `true` |
| `keyboard#14427:8` | BOOLEAN | `false` |
| `tabs#15135:0` | BOOLEAN | `true` |

---

## iOS_NumericKeyboard

**Library Key**: `eb1ea39626022a391b9b953b04d921debc078a7d` | **2 variants**

| Variant | Values |
|---------|--------|
| `dark mode` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `button#931:1` | BOOLEAN | `false` — CTA-кнопка над клавиатурой |
| `predictive#931:4` | BOOLEAN | `false` |

**Внутри** — `button 2.1` instance: `keyboard.findOne(n => n.name === 'button 2.1')`.

---

## iOS_AlphabeticKeyboard

**Library Key**: (новый, не опубликован в библиотеке — pending) | **12 variants**

| Variant | Values |
|---------|--------|
| `dark mode` | `false`, `true` |
| `language` | `En`, `Ru` |
| `type` | `text` |
| `uppercase` | `true`, `false` |

| Key | Type | Default |
|-----|------|---------|
| `button#931:21` | BOOLEAN | `true` |
| `predictive#931:28` | BOOLEAN | `true` |
