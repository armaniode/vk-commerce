# Typography — академические основы

Это файл descriptive, не imperative — описывает обоснования правил, ссылается на источники. Прочитай нужную секцию, когда хочешь понять «ПОЧЕМУ именно так» (D-02). Для практических правил без объяснений — `SKILL.md`.

## TOC

1. Hierarchy levels (≤ 4 уровня)
2. Contrast — «emphasize by de-emphasizing»
3. Size selection — viewing distance, density, viewport
4. Line-height (leading) теория
5. Line length / measure (Bringhurst §2.1.2)
6. Letter-spacing — kerning vs tracking
7. Vertical rhythm — baseline grid vs spacing grid
8. Modular scale (Tim Brown, Spencer Mortensen)
9. Display vs Text styles (optical sizes)
10. Weight (Frutiger 9-step) — почему Carnica 400/500 only
11. Long-form vs UI — cognitive mode

---

## 1. Hierarchy levels — теоретическое обоснование (≤ 4 уровня)

Консенсус авторитетных источников: **3-5 уровней на экране максимум**.

| Источник | Позиция |
|---|---|
| Refactoring UI (Wathan/Schoger) | 3-4 уровня на экран, 6-8 размеров в системе |
| Material Design 3 | 15 ролей определено, на экране 3-5 |
| Apple HIG (iOS) | 11 Dynamic Type styles, на экране 3-4 |
| Butterick Practical Typography | 2-3 (идеалистичнее) |
| NN/g (eye-tracking) | >4 уровней замедляют сканирование |

Больше 4 уровней → размытая иерархия, cognitive load, визуальный шум, дублирование ролей. Refactoring UI пишет: «Hierarchy is everything» — иерархия делает интерфейс читаемым.

**Miller's 7±2 (рабочая память) НЕ применим** к визуальной иерархии — правильнее **Hick's Law** (3-5 элементов выбора).

### Ключевое правило Refactoring UI

Между соседними уровнями менять **один параметр** — размер ИЛИ вес ИЛИ цвет, не все сразу. Изменение трёх параметров одновременно (24/700/#000 → 14/400/#999) «кричит» — модель и пользователь видят «всё разное».

В Carnica, где вес по факту один (Regular), это размер или цвет. Компенсация за счёт spacing и больших size-jumps.

### Исключение для data-dense экранов

Финансы, admin dashboard, detail-таблицы — допустимо 5-6 уровней, но через вариации `color` одного размера, НЕ через новые размеры. Это позиция IBM Carbon (data tables).

---

## 2. Contrast — «emphasize by de-emphasizing»

Ключевая техника Refactoring UI: вместо «делать важное ярче» — делать остальное **светлее**, чтобы primary всплывал как единственное «тёмное пятно». Это инверсия интуитивного «надо подсветить» — практичнее работает «затушить окружение».

### Различать contrast ratio vs emphasis hierarchy

- **Contrast ratio** — физическая читаемость (WCAG), измеряется числом (12.6:1 на белом).
- **Emphasis hierarchy** — визуальный вес, как глаз воспринимает «громко/тихо».

Оба работают одновременно. Material 2 явно формализовал шкалу эмфазиса: **High emphasis 87%, Medium 60%, Disabled 38%** (opacity) — это шкала визуального веса, НЕ замена WCAG. WCAG проверяет читаемость, Material — иерархию.

В Carnica эмфазис строится не через opacity, а через токены `content/primary` → `content/secondary` → `content/tertiary` → `content/disabled` (разные hex с одинаковой формой роли).

---

## 3. Size selection — viewing distance, density, viewport

Apple HIG явно опирается на **viewing distance**: mobile ~30cm от глаз, desktop ~60cm. Это диктует базовый размер body:

- Mobile body — 16-17px
- Desktop body — 15-18px

Learn UI Design (Erik Kennedy) уточняет: на mobile 16px — индустриальный консенсус (iOS auto-zoom при <16px в input), на desktop диапазон шире из-за большего расстояния.

### Информационная важность

Material Design 3 разделяет роли:
- **Display** — крупный визуальный акцент (hero, splash, баланс, ключевые значения)
- **Headline** — заголовки секций
- **Body** — основной контент
- **Label** — utility (кнопки, лейблы внутри компонентов)

Это семантика, не «просто разный размер».

### Viewport-ограничения

`display/large 56` на mobile 375px запрещён — длинные слова обрезаются, hero-эффект ломается. Только web ≥1024. На mobile 375 hero — `display/small 32`.

### Тип чтения

Лонгриды, статьи и юридические тексты требуют `body/paragraph/*` (LH 1.5, WCAG 1.4.8 AAA), не `body/*` (LH 1.2-1.3). Обычный интерфейсный текст остаётся `body/*`, даже если занимает несколько строк.

---

## 4. Line-height (leading) теория

**Leading** — вертикальное расстояние baseline→baseline (термин из металлического набора: между свинцовыми строками клали свинцовые полосы — leading, от lead = свинец).

В CSS всегда **unitless** (`line-height: 1.4`), не px/em/% — MDN явно: «Prefer unitless values to avoid unexpected results due to inheritance». Unitless множится на текущий `font-size` у каждого потомка; px/em/% наследуются буквально и ломают пропорции при вложенности.

Butterick правило: «120-145% от size — оптимум для body».

### Зависимость ratio от size (Bringhurst §2.2.3)

Меньший размер → относительно **больший** LH ratio. Крупный глиф сам держит воздух внутри x-height; рыхлый LH на hero разрывает заголовок на несвязанные строки.

| Контент | Ratio | Обоснование |
|---|---|---|
| Display / hero (32-56px) | 1.0-1.2 | Крупный глиф держит воздух сам |
| Headline (24-40px) | 1.0-1.25 | Компромисс |
| Body UI (14-18px) | 1.2-1.4 | Лейблы, subtitle, cell |
| Body paragraph (article/longread reading) | 1.45-1.7 | WCAG 1.4.8, dyslexia-friendly |
| Caption (11-13px) | 1.2-1.35 | Короткий мелкий |

### Зависимость от line length (measure)

- 45-65 знаков → LH 1.3-1.4 достаточно
- 65-90 знаков → LH 1.5-1.6
- >90 знаков → LH 1.7, лучше ограничить `max-width: 65ch`
- Carnica mobile 375px при 16px ≈ 40-50 знаков → `body/*` комфортен для UI-текста; `body/paragraph/*` нужен только для article-like reading

### Carnica — два flavors LH

- `body/*` (ratio 1.17-1.30) — UI-текст
- `body/paragraph/*` (ratio 1.50) — лонгриды, статьи, юридические тексты
- `headline/small` 24/24 (ratio 1.0) — **tight-set традиция, НЕ баг**. Допустимо при 1-2 строках. Если wrap'ится в 3+ строк — переходить на `display/small` 32/36

---

## 5. Line length / measure (Bringhurst §2.1.2)

Классическое правило печатной типографики: **45-75 знаков на строку, 66 идеал** (Bringhurst). Butterick расширяет до 45-90 для UI.

### Механика чтения (NN/g)

Глаз делает саккады — скачки на 7-9 знаков. Перевод строки = **return sweep** — возврат влево. Если строка >75 знаков, глаз теряет следующую при return sweep (соскальзывает на другую строку). Если <30 знаков, ритм рваный — глаз не успевает войти в режим непрерывного чтения.

### WCAG 2.1 SC 1.4.8 AAA

Максимум **80 знаков на строку** для основного текста. Это AAA-уровень, но для reading-блоков (FAQ, T&C) выгодно держать ≤65ch.

### Carnica viewport-разрезы

| Контекст | Optimal знаков |
|---|---|
| Mobile body | 30-50 |
| Tablet narrow | 50-65 |
| Desktop long-form | 60-75 (66 ideal) |
| Marketing hero | 45-70 |
| UI labels / buttons / chips | не регулируется |
| Data tables / dashboards | не критично |

**Mobile 375px** − 2×20px padding = 335px. При 16px шрифте ≈40-42 знаков/строку — в классическом диапазоне. **Контроль не нужен** — frame сам ограничивает.

**Desktop до 1200px** — 16px на всю ширину = ~150 знаков, 2× превышает ideal. Нужно ограничивать `max-width: 65ch`.

### Почему `ch`, не `px`

`ch` = ширина глифа "0" — масштабируется с font-size, в отличие от `px`. При user zoom 200% (WCAG 1.4.4) или dynamic type — `65ch` остаётся 65 знаков, `640px` становится узкой колонкой.

---

## 6. Letter-spacing — kerning vs tracking

**Kerning ≠ tracking.** Kerning — попарная подстройка пробелов между конкретными парами глифов (встроена в шрифт автором). Tracking (CSS `letter-spacing`) — равномерная подгонка на всём отрезке текста.

Butterick жёстко: «If your font needs tracking — скорее всего это плохой шрифт». BeelineSans — корпоративный шрифт, спроектирован автором под нужные кегли.

### Индустриальные правила по размерам (если бы добавляли)

| Размер | Tracking | Почему |
|---|---|---|
| Display >40px | tight `-0.02…-0.05em` | На больших кеглях пробелы выглядят «рыхло» |
| Headline 24-40px | 0 | Нейтрально |
| Body 14-18px | 0 | Шрифт спроектирован под эти размеры |
| Caption <12px | loose `+0.01…+0.03em` | Мелкие глифы сливаются |
| CAPS-лейблы | `+0.05…+0.15em` | Прописные нарисованы плотно |

Material Design имеет tracking-токены по размерам. Carnica — **нет**, во всех 17 стилях `letter-spacing: 0`. Это **правильно** для качественного корпоративного шрифта: BeelineSans уже спроектирован под кегли, CAPS-tracking не актуален (CAPS запрещён §15 ux-principles).

### Tabular numbers (`font-variant-numeric: tabular-nums`)

Отдельная тема, не tracking. Это OpenType-фича, делающая цифры одинаковой ширины. Колонки сумм/цен выравниваются по разряду, счётчики не «прыгают» (`0:09 → 0:10`).

Включать: списки цен/балансов/транзакций, счётчики, таймеры, табличные данные. НЕ включать: inline-цифры в обычном тексте (proportional читается лучше).

---

## 7. Vertical rhythm — baseline grid vs spacing grid

### Baseline grid (Müller-Brockmann, Swiss school)

Строки текста выровнены по невидимой сетке 4/6/8pt. Каждый baseline попадает в линию сетки. Это даёт **visual rhythm** — глаз видит ритм.

Müller-Brockmann «Grid Systems in Graphic Design» — каноническая работа Swiss school. В print baseline grid обязателен.

### Почему baseline grid не прижился в UI

1. **Разная оптика шрифтов** (cap-height, x-height, descender) — одинаковый LH не даёт одинакового визуального baseline у разных шрифтов
2. **Responsive** ломает сетку на breakpoint'ах
3. **Иконки и изображения** имеют собственные bounding box'ы, несовместимые с baseline текста
4. **Дорого поддерживать** — каждое изменение размера/LH ломает rhythm
5. Material Design → density-agnostic **8dp spacing grid**, не baseline
6. Apple HIG → **4pt spacing grid**
7. IBM Carbon → **8px spacing + типографика кратна 4px**

### Spacing grid (что использует Carnica)

Margin/padding/gap кратны базовой единице. Carnica — 4px grid:
- **Spacing tokens**: `spacing/50` ... `spacing/2000` = 2/4/6/8/10/12/14/16/18/20/24/32/40/48/64/80; negative tokens — только для компенсаций
- **LH Carnica**: 16, 20, 22, 24, 26, 28, 30, 36, 40, 48, 66 — все кратны 2, большинство кратны 4

Ритм обеспечивается: (а) LH внутри стиля, (б) spacing из фиксированной шкалы, (в) proximity-правилом Гештальта (gap между группами ≥ 2× gap внутри группы).

### Single-direction margin («lobotomized owl»)

Использовать только `margin-bottom` (или top, но одно из двух последовательно) — избегать double spacing и непредсказуемого collapse соседних margin'ов.

---

## 8. Modular scale (Tim Brown, Spencer Mortensen)

Tim Brown (modularscale.com, 2011) — размеры генерируются умножением `base × ratio`, по аналогии с музыкальными интервалами. Spencer Mortensen формализовал математику.

### Канонические ratios

| Ratio | Название | Характер |
|---|---|---|
| 1.125 | major 2nd | едва заметный |
| 1.2 | minor 3rd | мягкий UI |
| **1.25** | **major 3rd** | **стандарт веба** |
| 1.333 | perfect 4th | выразительный |
| 1.414 | augmented 4th (√2) | «бумажный» |
| 1.5 | perfect 5th | драматичный |
| 1.618 | golden | editorial, избыточный для UI |

### Анализ шкалы Carnica (7 размеров: 13 → 16 → 20 → 24 → 32 → 40 → 56)

| Переход | Ratio | Ближайший канон |
|---|---|---|
| 13→16 | 1.231 | ≈ major 2nd+ |
| 16→20 | 1.250 | major 3rd |
| 20→24 | 1.200 | minor 3rd |
| 24→32 | 1.333 | perfect 4th |
| 32→40 | 1.250 | major 3rd |
| 40→56 | 1.400 | ≈ augmented 4th |

**Диагноз:** гибридная шкала в коридоре 1.2-1.4. Ratio растёт на display-переходах, чтобы крупные кегли «пробивали» — Material 3 делает то же. Скачков нет, «мёртвых зон» (>1.5×) и слишком близких пар (<1.125×) нет. **Математически здоровая шкала.**

### Сравнение с индустрией

- **Material 3** — 15 токенов, ratios 1.125-1.333
- **Apple HIG** — 10 Dynamic Type styles, ratios 1.06-1.27
- **Tailwind** — 13 размеров, ratio ~1.25
- **Carnica** — 7 размеров в sweet spot (6-8, Refactoring UI / Every Layout)

Carnica ближе всего к Material 3 по характеру.

---

## 9. Display vs Text styles (optical sizes)

Разделение display vs text родилось в металлическом наборе:
- **Мелкие кегли** резали с увеличенным x-height для чтения массивом (text)
- **Крупные** — с тонкими деталями для impact и mood (display)

Variable fonts вернули это различие через **`opsz` axis** (Roboto Flex, Source Serif 4 — автоматическое изменение пропорций глифа по размеру).

**Display и body — разные семантические роли**, не просто разный размер. Material 3 и Apple HIG явно различают.

### Display: impact + короткий текст

- Hero / H1 на лендингах
- Splash / welcome screens
- Ключевое число (баланс, большая цена, таймер)
- Full-screen status / promo-герой

Обычно НЕ для: navbar-title, section header, card title, dialog title, длинных строк (5+ слов на mobile).

### Headline: middle-ground с плотным LH

- Tight-set (ratio ~1.0) для коротких заголовков (1-2 строки)
- Если возможен перенос в 3+ строк — переходить на `display/small 32` с нормальным LH

### Body: основной контент

- `body/medium 20` — section title, navbar title, menu
- `body/small 16` — контент, подписи
- `body/large 24` — крупные числа в детализации

---

## 10. Weight (Frutiger 9-step) — почему Carnica 400/500 only

### Стандартная 9-step шкала (Adrian Frutiger, 1957)

100 Thin → 200 Extra Light → 300 Light → **400 Regular** → **500 Medium** → 600 SemiBold → 700 Bold → 800 Extra Bold → 900 Black.

CSS keywords: 400 = `normal`, 700 = `bold`.

### Сколько весов в дизайн-системе — консенсус индустрии

| Система | Весов | Набор |
|---|---|---|
| Refactoring UI (рекомендация) | 2 | Regular 400 + Bold 600/700 |
| Material Design 3 | 2-3 | Regular + Medium (+ Bold) |
| Apple HIG (SF Pro) | 4+ | Regular / Medium / Semibold / Bold |
| IBM Carbon, Shopify Polaris | 2 | Regular 400 + Semibold 600 |
| **Carnica** | **1-2** | Regular 400 (основа) + Medium 500 (только в готовых компонентах) |

### Carnica rationale — почему Regular 400 основа

- **Tone of voice** «близкий, человеческий, спокойный» — bold противоречит спокойствию
- **Premium pattern** — Apple pre-iOS 7, Muji, Uniqlo исторически избегают жирности («Bold is loud» — Butterick)
- **Lowercase UI** — bold + lowercase = визуальный конфликт
- **Иерархия Carnica строится через размер и цвет**, не через вес

### Компенсация отсутствия Bold — 4 инструмента (Refactoring UI)

1. **Размер** — 1.25×-1.5× ratio (body 16 → headline 20-24)
2. **Цвет** — `content/primary` #28303F vs `content/secondary` #77849D
3. **Spacing (Gestalt proximity)** — группировка через близость
4. **Background** — pill / chip / card выделяет сильнее, чем bold inline

«Emphasize by de-emphasizing» — вместо выделения важного делать окружение светлее.

### Что теряется без Bold и чем компенсируется

| Теряется | Компенсация |
|---|---|
| Inline emphasis («это **важно**») | Отдельная строка + primary на фоне secondary |
| Hero-punch маркетинга | `display/large 56/400` — размер даёт вес |
| Скорость сканирования заголовков (NN/g: bold на 15% быстрее) | Spacing + size ratio, паттерн `title 2.1` |
| Визуальная иерархия в плотных таблицах | Background pill, divider, proximity |

### Когда Medium 500 уместен

Только **внутри готовых Figma-компонентов**, где он уже зашит автором:
- `button 2.5` label
- `cell 3.1` title
- `tag 2.3` label
- `title 2.1`

В кастомных standalone-текстах через `createStyledText` — **только Regular 400**, исключений нет.

### Medium 500 и WCAG

Medium 500 **НЕ считается bold** для WCAG large-text threshold (bold = 700+). На `body/accent/medium 20/500` нужен контраст **4.5:1**, не 3:1.

---

## 11. Long-form vs UI — cognitive mode

### Главное отличие — когнитивный режим

- **Reading** = linear flow, саккады + return sweep, >10s, фокус на смысле → нужен стабильный ритм
- **UI-text** = scanning, прыжки по якорям (иконка, цвет, первое слово), <3s, фокус на распознавании функции → нужна плотность

Material 3 закрепил это в ролях:
- **body** = «main text for paragraphs»
- **label** = «utilitarian styles inside components»

### Параметры различия

| Параметр | UI-text | Reading |
|---|---|---|
| Line-height | 1.0-1.3 | ≥1.5 (WCAG 1.4.8 AAA) |
| Measure | не нормируется | 45-75 знаков (идеал 66); mobile 30-50 |
| Paragraph spacing | нет | ≥1.5× LH |
| Font-size | 13-16 допустимо | ≥16 |
| Text-align | center/right допустимы | always left, не justify |
| text-wrap | `balance` для headings | `pretty` для параграфов |
| Max-width | по layout | ~65ch / 680px |

### Hierarchy внутри long-form

- Sub-headings (H3/H4) — `body/medium 20` с margin-top ~1.5em
- Lists — gap = base LH параграфа
- **Emphasis только Medium 500** (в готовых компонентах) **или цвет** (Carnica нет Bold/Italic)
- Paragraph breaks — margin-bottom ≥0.75em (не `<br>`)
- Quote — border-left 2px + отступ 16-20px
- Links — underline + content/primary (цвет не единственный индикатор)

---

## Сводный список авторитетов

**Типографика:** Bringhurst "Elements of Typographic Style" (4th ed.) · Müller-Brockmann "Grid Systems in Graphic Design" · Butterick https://practicaltypography.com/ · Tim Brown https://www.modularscale.com/ · Spencer Mortensen https://spencermortensen.com/articles/typographic-scale/ · Adrian Frutiger (9-step weight scale, 1957).

**Дизайн-системы:** Refactoring UI https://www.refactoringui.com/ · Material Design 3 https://m3.material.io/ · Apple HIG https://developer.apple.com/design/human-interface-guidelines/ · IBM Carbon https://carbondesignsystem.com/ · Shopify Polaris https://polaris.shopify.com/ · USWDS https://designsystem.digital.gov/ · Every Layout https://every-layout.dev/.

**UX-исследования:** NN/g https://www.nngroup.com/ · Baymard https://baymard.com/ · Learn UI Design https://www.learnui.design/ · Pimp my Type https://pimpmytype.com/.

**Техническое:** MDN https://developer.mozilla.org/ · Chrome for Developers https://developer.chrome.com/.
