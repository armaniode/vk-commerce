---
name: carnica-typography
description: Правила типографики Beeline для UI и длинного текста — выбор размера, line-height, контраст, иерархия, WCAG, читаемость. Используй когда работаешь со шрифтом BeelineSans, выбираешь стиль из шкалы Carnica, размер/вес текста, выравнивание, line-height, контраст, проверяешь читаемость long-form блока или пишешь CSS-правила типографики. Триггеры: «типографика», «шрифт», «BeelineSans», «line-height», «font-weight», «иерархия», «контраст», «измерь контраст», «выбери размер», «выравнивание», «long-form», «единицы измерения», «гб мб», «typography», «contrast», «type scale», «leading», «measure», а также любое обсуждение типографики, шрифта или текста в связке с Carnica/Beeline.
type: reference
---

# Carnica Typography

Этот skill хранит правила типографики Beeline: lookup-таблицы Carnica-шкалы (7 размеров), decision rules выбора размера/веса/контраста по контексту, единицы измерения (гб/мб/мин) и CSS-правила (line-height unitless, max-width 65ch, font-weight 400/500). Тяжёлая теория, полные WCAG-таблицы и audit-чеклист — в `references/`.

## Когда обращаться

- Выбираешь размер шрифта для нового экрана или секции, не знаешь брать display, headline или body
- Аудитишь контраст текста перед сдачей и сверяешь токены `content/*` по WCAG
- Решаешь, какой стиль использовать (display vs headline vs body vs paragraph vs caption) под конкретную роль
- Проверяешь читаемость long-form блока (лонгрид, статья, политика, help article) и нужна правильная LH
- Пишешь CSS — нужны правила line-height, max-width, text-wrap, font-weight, font-variant-numeric, text-align
- Сверяешь иерархию: на экране подозрительно много уровней (>4) — анти-паттерн
- Пишешь число с единицей измерения (гб, мбит, ггц, мин, ₽) и нужны правильный регистр + неразрывный пробел

## Quick reference

### Carnica typography scale (7 размеров)

| Стиль | Size px | LH px | Unitless | Use case |
|---|---|---|---|---|
| `display/large` | 56 | 66 | 1.18 | WEB hero only (≥1024), splash |
| `display/medium` | 40 | 48 | 1.20 | WEB H1, mobile key value |
| `display/small` | 32 | 36 | 1.13 | Universal: mobile hero, balance, WEB H2 |
| `headline/small` | 24 | 24 | 1.00 | Page title в скролле (tight-set, 1-2 строки) |
| `body/large` | 24 | 28 | 1.17 | Крупные числа, dialog title |
| `body/medium` | 20 | 26 | 1.30 | Section title, navbar title, menu |
| `body/small` | 16 | 20 | 1.25 | Основной UI текст, cell title/subtitle |
| `body/paragraph/small` | 16 | 24 | 1.50 | Лонгриды, статьи, юридические тексты |
| `caption/medium` | 13 | 16 | 1.23 | Timestamps, badge, метаданные |

Полная таблица (все 17 стилей × LH × use) — `references/tables.md`.

### Weight rule (одна фраза)

- **Regular 400** — основа всех новых макетов и кастомного текста через `createStyledText`.
- **Medium 500** (`*/accent`) — только внутри готовых Figma-компонентов (`button 2.5`, `cell 3.1`, `tag 2.3`, `title 2.1`), где зашит автором. В `createStyledText` запрещён.
- Bold (700), SemiBold (600), Light (300) **в BeelineSans отсутствуют** — будет fallback на системный шрифт.

### Единицы измерения (главное)

- Все сокращения единиц — **строчными**: «7,3 гб», «100 мбит/с», «2,4 ггц», «12 мин», «50 кб», «2 тб». **Не** «ГБ», «МИН».
- Десятичный разделитель — **запятая**: «7,3 гб», не «7.3 гб».
- Тысячи — **пробелом**: «1 199 ₽», «132 690 ₽», не «1,199 ₽».
- Пробел перед единицей и валютой — **неразрывный** (`&nbsp;` / Unicode U+00A0 / ALT+Space в Figma).
- Валюта `₽` после числа с неразрывным пробелом: «1 199 ₽». Не «руб.», не «RUB».

Полные правила (время, дата, кавычки, тире) — `references/tables.md` §«Единицы измерения».

### CSS-правила типографики

| Свойство | Carnica-правило | Зачем |
|---|---|---|
| `line-height` | unitless (`1.4`), не px/em/% | px/em ломают пропорции при наследовании (MDN) |
| `max-width` | `65ch` для reading-блоков на WEB | масштабируется с font-size, в отличие от px |
| `text-wrap` | `balance` для H1-H3, `pretty` для параграфов | баланс заголовков, убирает orphans |
| `text-align` | `start` / `end`, не `left` / `right` | logical properties, RTL-ready |
| `font-variant-numeric` | `tabular-nums` для числовых колонок | цифры одинаковой ширины, счётчик не «прыгает» |
| `letter-spacing` | `0` (default) везде | BeelineSans уже спроектирован под кегли |
| `font-weight` | только `400` или `500` | других нет в шрифте, будет fallback |
| `text-align: justify` | **запрещён** в UI всегда | «реки» пустот, плохо для dyslexia (BDA 2023) |
| `text-transform: uppercase` | **запрещён** для UI | lowercase tone-of-voice |

Полные CSS-патч примеры — `references/examples.md`.

## Decision rules

1. **Стилей на экране ≤ 4** — считай уникальные пары `токен + color` (`body/small + content/primary` и `body/small + content/secondary` — два разных стиля). Если >4 → ищи дубли ролей и убирай. Squint test: прищурься на макет, должны читаться 3-4 чётких уровня. Data-dense экраны (финансы, dashboard) — допустимо 5-6 через вариации цвета, не через новые размеры. → `references/theory.md` §1.

2. **Контраст: меняй один параметр между соседними уровнями** — size ИЛИ color, не оба сразу. Size-jumps ≥1.5×, лучше 2× (24→16 хорошо, 16→18 плохо). Применяй «emphasize by de-emphasizing»: вместо ярче primary — серее окружения. Inline токены: `content/primary` #28303F (12.6:1 на белом), `content/secondary` #77849D (~4.0:1), `brand/primary` #FFC800 (1.7:1 — **никогда** не цвет текста на светлом фоне). Полная таблица контраста токенов — skill `carnica-design-system`. Детали — `references/wcag.md`.

3. **Выбор размера — по контексту, не по роли** — ключевая ценность экрана или блока (баланс, цена, финальный статус) → `display/small 32`. Page title APP standalone hero → `display/small 32`, page title APP compact nav → `body/medium 20` или скрыт. WEB H1 → `display/medium 40`. Лонгрид/статья → `body/paragraph/small 16/24`. Caption/timestamp → `caption/medium 13`. Жёсткие минимумы: field value ≥16px (iOS force-zoom), button label ≥16px, caption никогда <13px. Полная карта 15 ситуаций — `references/tables.md`.

4. **Line-height: body/* vs body/paragraph/* — по режиму чтения, не по числу строк** — `body/paragraph/*` (LH 1.5) выбирай только для лонгридов, статей, юридических или справочных текстов, где пользователь читает последовательно. В обычном интерфейсе используй `body/*` (LH 1.17-1.30), даже если описание занимает несколько строк. Cell subtitle, snackbar, navbar title, карточки, модалки и onboarding UI — по умолчанию `body/*`. В CSS — unitless всегда (`line-height: 1.4`), не px/em/%. → `references/theory.md` §4.

5. **Line length / measure** — на mobile 375px не контролируй (frame сам ограничивает ≈40-50 знаков). На WEB для статей, лонгридов и юридических reading-блоков ставь `max-width: 65ch`. Обычные UI-описания не переводятся в `body/paragraph/*` только из-за длины, но слишком широкий текст всё равно ограничивай контейнером. `ch` (не `px`) — масштабируется с font-size. WCAG 1.4.8 AAA: ≤80 знаков. Связь с LH для reading-блоков: measure >60ch → LH ≥1.5. → `references/wcag.md` §1.4.8.

6. **Letter-spacing = 0 везде, tabular-nums для числовых колонок** — не добавляй `tracking-*` классы на body-тексте (BeelineSans уже под эти кегли). Удалять при аудите. `font-variant-numeric: tabular-nums` — для балансов, цен, транзакций, счётчиков, таймеров, табличных данных (колонки выравниваются, счётчики не «прыгают»). НЕ применять для inline-цифр в обычном тексте. → `references/tables.md` §«Letter-spacing».

7. **Vertical rhythm: 4px spacing grid** — все spacing из Figma-шкалы `spacing/50` ... `spacing/2000` (2/4/6/8/10/12/14/16/18/20/24/32/40/48/64/80; negative tokens только для компенсаций). Между группами gap ≥ 2× gap внутри группы (Гештальт proximity: 2-8px внутри, 12-32px между). margin-bottom заголовка = 0.5-1.5× LH, margin-top = 0 (single-direction margin, «lobotomized owl»). Между параграфами — 1× LH; между секциями — 2-3× LH (48/64/80). Иконки центрировать **оптически** по cap-height, не по baseline. → `references/theory.md` §7.

8. **Шкалу не расширять — 7 размеров достаточно** — 13/16/20/24/32/40/56 в коридоре 1.2-1.4 (математически здоровая). Fluid `clamp()` НЕ применяем (Carnica step-based). `display/extrasmall 16` — артефакт наименования, не использовать как display-стиль; для 16px-контента — `body/small`. Если появляется новый размер: ratio ≥1.125 к соседям, чётное pixel-значение (13 — единственное исключение). → `references/tables.md` §«Type scale ratios».

9. **Display vs Headline vs Body — impact vs readability** — display: impact + короткий текст (hero, splash, ключевое число), LH ratio ~1.2. На странице может быть несколько display-элементов, если они поддерживают иерархию и не конкурируют друг с другом. headline: tight LH (~1.0), 1-2 строки, переходит в display/small 32 при wrap в 3+ строки. body: основной UI-контент. Длина в display на mobile 375px: `display/medium 40` — ~10-12 знаков, `display/small 32` — ~14-18 знаков. Длинный заголовок (5+ слов) → понизить роль: display→headline→body. → `references/tables.md` §«15 ситуаций».

10. **Accessibility quick rules** — основной читаемый текст `content/primary`. **`brand/primary` (#FFC800) никогда как цвет текста на светлом фоне** (1.7:1 fail). Заголовки — настоящие `<h1>-<h6>`, не `<div>` со стилем. Читаемый текст ≥16px (13px только для caption/метаданных). Medium 500 НЕ считается bold для WCAG large-text — на `body/accent/medium 20/500` нужен 4.5:1, не 3:1. Полная база — `references/wcag.md` (SC 1.4.3 / 1.4.4 / 1.4.8 / 1.4.10 / 1.4.12).

11. **Выравнивание: left по умолчанию, center только короткое, justify запрещён** — list, form, settings, cell, long-form, Dialog 2.1 → **left**. Hero / splash / empty state / navbar title / feed-секция с коротким симметричным текстом → **center** допустим. Числовая колонка (цены, суммы) → **right**. **Justify — никогда** (BDA Dyslexia 2023, «реки» пустот). В CSS — `text-align: start/end`, не `left/right` (RTL-ready). Center на reading-параграфе — антипаттерн, край «плавает». → `references/examples.md` §«Alignment».

12. **Жирность: только 400/500, компенсация Bold через size + color + spacing + background** — Regular 400 — основа, Medium 500 — только внутри готовых компонентов (`button 2.5` label, `cell 3.1` title, `tag 2.3`, `title 2.1`). 4 инструмента компенсации Bold (Refactoring UI): размер (ratio 1.25-1.5×), цвет (primary vs secondary), spacing (Гештальт), background (pill/chip/card). Hero-punch — через `display/large 56/400`. Никаких `<strong>`/`<b>` с визуальным bold. → `references/theory.md` §10.

13. **Long-form vs UI — cognitive mode, не строки** — Reading: связный narrative, который читают последовательно (лонгрид, статья, юридический текст, help article) → `body/paragraph/*`, LH 1.5, `max-w-[65ch]`, left, `text-wrap: pretty`. UI: scannable label/статус, элемент с иконкой, title/subtitle/menu, карточка, модалка, onboarding или любое интерфейсное описание → `body/*` или `caption`, выравнивание по контексту. **Не привязывай к числу строк жёстко** — `body/small` допустим и для многострочного UI-описания. → `references/tables.md` §«Long-form vs UI».

## See also

- `carnica-design-system` — полная таблица color tokens (owner per D-27): contrast по фонам, dark theme, surface/elements
- `carnica-copy-tone` — tone-of-voice, запрещённые фразы, микрокопия, пунктуация
- `carnica-ux-principles` — UX-обоснования lowercase UI (§15), цвет не единственный индикатор, иерархия
- `carnica-anti-slop` — P0/P1/P2 trigger-листы на финальном QA (включает CAPS, justified, brand/primary как текст)
- `references/theory.md` — академические основы (Bringhurst, Butterick, NN/g, Refactoring UI, Material 3, Apple HIG, Frutiger 9-step)
- `references/wcag.md` — WCAG 2.2 SC (1.4.3 / 1.4.4 / 1.4.6 / 1.4.8 / 1.4.10 / 1.4.12 / 1.3.1 / 2.4.6), large-text threshold, BDA Dyslexia, Dynamic Type, semantic HTML
- `references/tables.md` — полные lookup-таблицы (17 стилей × LH, type scale ratios, контраст токенов матрица, CSS rules, единицы измерения)
- `references/examples.md` — до/после, anti-patterns, migration от Bold, audit checklist (15 пунктов)

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body (§ 3 architecture).
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [x] Тяжёлый материал (полные таблицы > 15 строк, теория, WCAG, edge cases) вынесен в `references/*.md` (§ 9 architecture).
- [x] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа).
- [x] Если контент пересекается с другим ref skill — один owner, остальные ссылаются через `See also` (§ 7 architecture).
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Imperative form в body: «Прочитай», «Выбери», «Не используй» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют.
