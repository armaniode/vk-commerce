# Carnica UI-kit WEB — Cards & Banners

Источник паспортов card-компонентов WEB (banner, banner card, banner group, newspaper view). См. `../SKILL.md` для Quick Start, Decision tree и top gotchas.

---

## banner 2.1

**Library Key**: `434f235fad5e144cab49535e208a57b871443cb6` | Source page timeout — property discovery pending.

## banner card 2.1

**Library Key**: `c181f8ac5f85df3ea700941c4d14167eefbb11fd`

> WEB-only компонент (мобильное приложение использует card medium/large 2.1). Применяется для full-bleed промо-блоков на главной beeline.ru.

## banner group 2.1

**Library Key**: `8fc5370d20b50f285a11e3ca89d9aa043da66303`

## newspaper view 2.1

**Library Key**: `20a077ecd7b8991899a942d75603714a528444a6` | **12 variants**

| Variant | Values |
|---------|--------|
| `device` | `desktop/tablet`, `mobile` |
| `type` | `header`, `content` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#18131:0` | TEXT | `как пополнить баланс...` |
| `↩︎ subtitle#18131:13` | TEXT | `предупредим о нежелательных...` |
| `↩︎ body#18131:26` | TEXT | (длинный текст статьи) |
| `↩︎ caption#5582:32` | TEXT | `подпись к картинке` |
| `caption#5582:17` | BOOLEAN | `true` |
| `upper text#5582:47` | BOOLEAN | `true` |
| `bottom text#5582:62` | BOOLEAN | `true` |
| `subtitle#8124:0` | BOOLEAN | `true` |
| `❖ content#5582:0` | INSTANCE_SWAP | |

> WEB-only компонент mixed media gallery — газетная раскладка (header + body + caption + content slot). В APP-аналогов нет.
