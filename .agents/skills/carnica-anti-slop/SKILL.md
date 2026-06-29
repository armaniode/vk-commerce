---
name: carnica-anti-slop
description: Anti-AI-slop trigger-листы Carnica — P0 auto-fail / P1 should-fix / P2 nice-to-fix запреты для финального QA Beeline. Используй перед сдачей дизайна или кода, чтобы поймать generic-AI клише, ложные градиенты, пастельные фоны тэгов, capslock в UI, justified text, hex без токена, ручной pill вместо tag 2.3, Bold/SemiBold в кастомном тексте, цвет brand/primary как текст. Триггеры: «anti-slop», «AI slop», «P0», «P1», «P2», «нет ли AI клише», «финальное QA», «можно сдавать», «slop check», «auto-fail», «качество», «проверка качества», «нет ли слопа», «ревью перед сдачей», «check for slop», «before final», «before commit», «generic AI», «AI generic», а также любая проверка Carnica-результата на generic AI-паттерны и финальное ревью качества перед сдачей.
type: reference
---

# Carnica Anti-AI-Slop

Этот skill хранит trigger-листы запретов с приоритетами P0/P1/P2 — «бинарный» чек «нарушено / не нарушено», который читается за 2 минуты и блокирует «безопасный generic-AI» до того, как он попадёт в финальную сборку. Подробные правила и причины — в owner skills (`carnica-typography`, `carnica-copy-tone`, `carnica-design-system`); сюда смотри для быстрого QA-прохода.

## Когда обращаться

- Финальное QA перед сдачей дизайна или кода Beeline — проход сверху вниз по P0 → P1 → P2
- Сверка результата на generic-AI клише после автогенерации (часто содержит slop)
- Регресс-чек: добавил фичу или секцию — пробежать P0, не появились ли новые нарушения
- Pre-commit / pre-PR review вручную перед коммитом крупного куска UI
- Сравнение двух вариантов «какой выглядит человечнее / Beeline-нее»
- Аудит чужого PR на знание Carnica-конвенций
- Подготовка к code review со старшим дизайнером / staff-инженером

## Quick reference

Формула качества: **80% проверенных Carnica-паттернов + 20% осознанного приёма**, который отличает экран от шаблонного. Без 20% получается compliance-серость. Без 80% — ломается бренд.

Метод применения: при финальном QA пройтись сверху вниз. Любое нарушение P0 = автоматический fail соответствующего критерия в `qa-scorecard.md` и требует repair iteration. P1 снижает балл на 10-20 пунктов. P2 — на 5.

### P0 — auto-fail (исправь немедленно)

Любое из этих нарушений делает экран непригодным к сдаче. qa-scorecard ставит 0 в категории, требуется repair iteration.

**Цвета и токены:**

- **`brand/primary` (#FFC800) как цвет текста** — на любом фоне. На светлом контраст 1.7:1 (нечитаемо физически), на тёмном жёлтый текст психологически читается как «alarm/warning» и ломает Carnica voice. Жёлтый — только фон под `content/primary`-текстом. → owner: `carnica-typography` (Decision rule #2 contrast) + `carnica-design-system` (полная таблица токенов).
- **Hex напрямую в коде** (`solid('#FFC800')`, `bg-[#FFC800]`) вместо bound variable / Carnica-токена — ломает theming и dark mode. Все final paints — через `importVariableByKeyAsync` с реальным fallback hex. → owner: `carnica-design-system` (color tokens).
- **`colorTokens.light` или `.dark` импортится напрямую в компонент** (`const colors = colorTokens.light`) — компонент жёстко прибит к одной теме, тёмная не переключается. Цвета только через CSS-vars / Tailwind (`bg-bee-*`, `text-bee-*`, `var(--bee-*)`) либо через `createDynamicColors()` + `useCarnicaTheme()` из `@carnica/shared` если нужны inline styles. → owner: `carnica-design-system` (theming convention).
- **Цветной `surface-*` токен как фон тэга** (surface-yellow/green/blue/violet/magenta/teal/orange/red) — это фоны иконок-плиток в карточках товаров, не для тэгов. Тэги — только `default` (серый), `brand`, `invert`, `success`, `error`. → owner: `carnica-ux-principles` §16 + `carnica-components` (tag 2.3 tones).
- **Чужие палитры** — Tailwind default indigo (#6366f1, #4f46e5), generic purple, любые цвета вне `DESIGN.md → Colors`. → owner: `carnica-design-system`.

**Типографика:**

- **Bold/SemiBold (700/600), Light (300), Thin (100)** в CSS или Figma textStyle — шрифта в этих весах **нет**, будет fallback на системный (визуально «отвалится»). Только Regular 400 и Medium 500. → owner: `carnica-typography` (Decision rule #12 weight).
- **`text-transform: uppercase` / CAPS LOCK в UI** — нарушает lowercase convention Beeline. CAPS-имитация через letter-spacing — то же. → owner: `carnica-copy-tone` + `carnica-ux-principles` §15.
- **Не-BeelineSans** — Inter, Roboto, Open Sans, SF Pro, любой serif как display. Только BeelineSans + системный fallback. После генерации — `Cmd+Shift+P` → `Fix BeelineSans`. → owner: `carnica-design-system` (typography).
- **`text-align: justify`** где угодно в UI — «реки» пустот, плохо для dyslexia (BDA 2023), запрещён WCAG для UI. → owner: `carnica-typography` (Decision rule #11 alignment).
- **Разный `font-size` в одной горизонтальной строке** (flex/inline-row) — все text-узлы внутри одной строки обязаны иметь один размер. Иерархия — через цвет/вес, не через размер в одной строке. → owner: `carnica-design-system` (Inline text-size rule).

**Копирайт и иконки:**

- **Эмодзи-иконки** (✨🚀⚡🎉) вместо иконок из `src/carnica/icons/` — если нужной иконки нет, взять ближайшую из 23 категорий или попросить добавить. → owner: `carnica-components` (icon catalog).
- **Неверный variant иконки** — filled вместо outline там, где речь о наличии услуги (wifi filled = «нет сигнала», а не «интернет»). → owner: `carnica-components` (Icon variant semantics).
- **Outline-X в круглой close-кнопке** — рисует второй круг внутри. Использовать stroke-X (аналог правила `plus round style=stroke`). → owner: `carnica-gotchas`.
- **Lorem ipsum / placeholder-копирайт** («ваш текст здесь», «название продукта») — недопустимо в финальной сборке. → owner: `carnica-copy-tone`.
- **Generic-AI-фразы**: «бесшовный опыт», «next-gen», «инновационный», «революция в», «всё в одном месте», «elevate», «unleash», «seamless». → owner: `carnica-copy-tone` (запрещённые фразы).
- **Точка в конце последнего предложения** короткой подписи, кнопки, лейбла, FAQ-вопроса — нарушает lowercase canon. → owner: `carnica-copy-tone` + `carnica-ux-principles` §15.

**Layout и компоненты:**

- **Ручная сборка вместо Carnica-компонента** — кнопка из `figma.createFrame` + текст, аватар из `createEllipse`, тэг как pill-фрейм, divider как rectangle 1px — auto-fail. → owner: `carnica-components` (anti-patterns §9).
- **Тени на карточках**, кроме явно разрешённых (collapsed wallet-cards: `y=-2 blur=10 8%`) — Carnica-минимализм держится на тени-нет-тени. → owner: `carnica-visual-patterns`.
- **Градиенты на фонах** карточек, кнопок, секций — исключения: `BeelineBall` (логотип), hero-баннеры с фотофоном. → owner: `carnica-design-references` §3.
- **`detachInstance()`** — компонент теряет связь с библиотекой. → owner: `carnica-gotchas`.

### P1 — should-fix (исправь, если не объяснишь причину)

Эти ошибки не делают экран непригодным, но дают «безопасный AI-вид». Должны быть исправлены перед сдачей, если есть время. Оставлено P1 → явно опиши причину в PR / комментарии.

**Композиция:**

- **Симметричная сетка 2×2** одинаковой ширины там, где должна быть асимметрия 43/57 — ритм-мертвый. → owner: `carnica-ux-principles` §14 + `carnica-visual-patterns` (asymmetric grid).
- **Отсутствие воздуха** между крупными секциями — если на экране <5 элементов, распределить по вертикали с 40-80px gap. → owner: `carnica-ux-principles` §8.
- **Одна большая монолитная карточка** там, где должна быть лента блоков (главный экран — лента продуктов в виде секций). → owner: `carnica-ux-principles` §13.
- **Display-стиль для длинного заголовка** (>5 слов на mobile 375px, >40 знаков) — понизить до `headline/small` или `body/large`. → owner: `carnica-typography` (Decision rule #3, #9).
- **Edge alignment нарушен** — текст `text-align: left`, но блок центрирован через `margin-inline: auto` (плавает в середине). Кнопка обязана совпадать с выравниванием текста заголовка (вертикальный отвес проходит по одной линии). → owner: `carnica-visual-patterns` (Edge alignment).
- **Размеры заголовков блоков лендинга не соответствуют системе** — hero `title-21--xl` (56/24), остальные секции `title-21--l` (40/20). Меньшие размеры (M/S/XS) — это подразделы и аккордеоны, не блоки верхнего уровня. → owner: `carnica-visual-patterns` (Landing section headings).
- **Сухой текст без визуального каркаса** — 2+ тезиса под заголовком должны быть chip-pill, карточки или нумерованные шаги с avatar, не параграфом. Серый параграф сразу после серого subtitle = двойная серость, AI-заполнитель. → owner: `carnica-visual-patterns` (Avoid bare text).
- **Avatar / icon-chip и текст рядом не выровнены по вертикальному центру** — родитель обязан иметь `align-items: center`. Никаких `padding-top` / `margin-top` / `align-self: flex-start` хаков. → owner: `carnica-visual-patterns` (Avatar + text vertical center).
- **Surface inversion нарушено** — circular surface-элемент сливается с фоном. На `background/primary` (серая страница) → `background/secondary` (белый); внутри белой карточки → `background/tertiary` или `elements/secondary` (серый). → owner: `carnica-design-system` (Surface inversion rule).
- **Маркированные / нумерованные списки оформлены как голый текст с буллетами** — любой `<ul>`/`<ol>` с 2+ пунктами в продуктовой секции обязан иметь визуальный каркас (мини-карточки / chip-pill / нумерованные шаги). Чистый `<li>` допустим только в long-form reading (FAQ, T&C, политика). → owner: `carnica-visual-patterns` (Avoid bare text).
- **Две текстовые кнопки рядом не стакаются на mobile** — пара decision-CTA на mobile ≤768px должна становиться вертикально (`flex-direction: column`), full-width. → owner: `carnica-visual-patterns` (Button stacking on mobile).
- **Дублирование информации между блоками одного экрана** — chip-ряд `10₽/гб · 1₽/мин · смс` + параграф «базовые условия: интернет — 10₽ за 1гб...» под ним — это AI-заполнитель. Метод проверки: на финальном QA для каждой пары соседних блоков задать вопрос «какую новую информацию блок Б добавляет к А?». → owner: `carnica-copy-tone` (no info duplication).

**Текст:**

- **Цвет как единственный индикатор** ошибки/успеха/состояния — должен быть текст или иконка вдобавок. → owner: `carnica-ux-principles` §2.
- **`headline/small 24/24` wrap'нулся в 3+ строк** — заменить на `display/small 32/36`. → owner: `carnica-typography` (Decision rule #4 LH).
- **5+ уровней иерархии** на одном экране — максимум 4 пары `(token, color)`. Исключение — data-dense экраны, но через вариации цвета, не размера. → owner: `carnica-typography` (Decision rule #1).

**Компоненты-уровни:**

- **Chevron не перекрашен в `content/secondary`** — дефолт `content/primary` слишком тёмный, «AI забыл доделать». Применять `recolorVectors(rightView, paintCS)` сразу после `cell 3.1` и `button inline text 3.0`. → owner: `carnica-gotchas`.
- **`cell 3.1` с `background=default on bg_secondary` внутри белой карточки** — даёт лишний серый фон. Использовать `background=none`. → owner: `carnica-gotchas`.
- **`plus round` со `style=outline`** вместо `style=stroke` — даёт лишний круг вокруг плюса. → owner: `carnica-gotchas`.
- **Padding обнулён не там.** У `button 2.5 size=large` можно редактировать внешний layout container, если экран владеет side spacing. У `size=medium/small` internal padding не обнулять. → owner: `carnica-gotchas`.
- **Modal page/dialog не соответствует Carnica-спеке** — произвольная ширина, drag-handle сверху (это iOS-паттерн), close-кнопка скрыта на mobile, page scroll не блокируется. → owner: `carnica-components` (Modal page / dialog) + `carnica-gotchas`.
- **Tag 2.3 с font-weight 500** или иной кастомизацией — XS 13/16, S 16/20, обе Regular 400, padding и radius фиксированы. → owner: `carnica-components` (WEB tag 2.3).
- **`title 2.1` с изменённым размером или жирностью** — только пять фиксированных размеров (XL/L/M/S/XS), всегда Regular 400. Менять можно только padding/color/alignment. → owner: `carnica-components` (WEB title 2.1).
- **Текстовая кнопка не Medium 500** — text-кнопки `button 2.5` large/medium имеют label в Medium; small использует caption regular из Figma. Если получается «тонкая» — проверить `font` shorthand с `inherit`-family. → owner: `carnica-components`.
- **Manual translateY-lift на hover вместо `scale(0.97)`** — `:hover` только `transform: scale(0.97) 200ms ease-out`, `:active` — `scale(0.95)`. Никаких translateY/box-shadow-всплытий/glow/pulse. → owner: `carnica-motion` §2 + §5 + `carnica-visual-patterns` (button hover).

**Геометрия:**

- **Произвольный радиус вне системы** — Carnica radii: `radius/0 · 50 · 100 · 200 · 300 · 400 · 600 · 800 · 1000 · infinite` = `0 · 2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 10000`. → owner: `carnica-design-system` (Radii).
- **Произвольный spacing вне шкалы** — шкала `spacing/negative 500 ... 2000` = `-20 · -16 · -12 · -10 · -8 · -4 · -2 · 0 · 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 32 · 40 · 48 · 64 · 80`. → owner: `carnica-design-system` (Spacing scale).
- **Nested-radius не считан по формуле** — внутренний элемент в gap ≤12px от края контейнера должен иметь `R_outer − gap`. → owner: `carnica-design-system` (Nested radius rule).
- **Inner-vs-outer нарушено** — расстояния между дочерними элементами карточки должны быть строго меньше padding до её краёв (`gap_inner < padding_outer`). → owner: `carnica-design-system` (Inner-vs-outer rule).
- **Якорь не применён в ряду карточек разной высоты** — нижние/верхние элементы должны быть прибиты к одной границе через `margin-top: auto`. `align-content: space-between` для этого запрещён. → owner: `carnica-design-system` (Anchor pattern).

### P2 — nice-to-fix (улучшит, но не критично)

Полировка. Quick wins, фикс если ≤5 минут на каждый. На критическом ревью эти моменты замечают.

- **`display/extrasmall 16` использован как display-роль** (заголовок, hero, ключевое число) — артефакт наименования, для 16px брать `body/small` или `body/paragraph/small`. → owner: `carnica-typography` (Decision rule #8).
- **`caption/medium 13` для основного описательного контента** — caption только timestamps, badges, footnotes. Описания — `body/small 16`. → owner: `carnica-typography` (Decision rule #9).
- **Числовые колонки без `tabular-nums`** — цены, балансы, транзакции «прыгают». Применять `font-variant-numeric: tabular-nums`. → owner: `carnica-typography` (Decision rule #6).
- **Inline-цифры с `tabular-nums`** в обычном тексте — proportional читается лучше; tabular только для колонок.
- **`max-width: 65ch` не применён** к long-form reading-блоку (FAQ, T&C, политика, описания тарифа на desktop). На mobile не нужен. → owner: `carnica-typography` (Decision rule #5).
- **Heading без `text-wrap: balance`** — на H1-H3 баланс последних строк, на параграфах `text-wrap: pretty`. → owner: `carnica-typography` (CSS rules).
- **Висячие предлоги/союзы в RU-тексте** — `text-wrap: pretty` это **не** решает (он работает с orphans). Применять `&nbsp;` после коротких слов: «и&nbsp;подключайте», «от&nbsp;ежемесячной», «не&nbsp;закончатся», «в&nbsp;любой», «по&nbsp;тарифу». Список: `в`, `с`, `к`, `у`, `о`, `и`, `а`, `но`, `от`, `до`, `по`, `за`, `на`, `не`, `ни`, `же`, `бы` + короткие наречия. → owner: `carnica-copy-tone`.
- **`letter-spacing` не равен 0** — Carnica: 0 во всех 17 стилях, не добавлять `tracking-*` классы. → owner: `carnica-typography` (Decision rule #6).
- **Loader как ручной spinning rect** вместо `loading page 2.1`, `spinner 2.1`, `skeleton 2.1`, `fullscreen spinner`. → owner: `carnica-components` §6.
- **`text-align: left/right` вместо `start/end`** — не RTL-ready (Beeline пока не локализуется, но best practice). → owner: `carnica-typography` (Decision rule #11).

## Decision rules

1. **Запусти P0 проход первым** — если хоть один P0 нарушен, исправь до сдачи. Не оправдывай «но работает» — это auto-fail для соответствующей категории `qa-scorecard.md` (0 баллов). P0 = бинарный блокер, не «мнение».

2. **Запусти P1 проход вторым** — если оставляешь P1 нарушение, явно опиши причину в PR / комментарии («оставлено: ..., потому что ...»). Без объяснения — исправь. Каждый P1 снижает балл на 10-20 пунктов.

3. **Запусти P2 проход третьим** — quick wins. Фикс если ≤5 минут на каждый. Каждый P2 снижает балл на 5.

4. **Примени 20% distinctive rule** — после исправлений сверь: содержит ли результат хотя бы один distinctive Beeline-паттерн? Если нет — добавь, иначе результат technically compliant, но «безопасно-серый». Список распознаваемых приёмов:
   - Асимметричная композиция там, где в шаблоне была бы 2×2 сетка
   - Wallet card-holder стопка (см. `carnica-ux-principles` §10)
   - Кастомные dot-progress-bars (см. `carnica-ux-principles` §12) вместо стандартного линейного прогресса
   - Editorial label `body/accent/small` CENTER над лентой продуктов вместо `title 2.1`
   - Glass-navbar с absolute-positioned stories, перекрывающими нижний край
   - Tight design-layout 8px gap в модалках/bundle (паттерн Beeline) вместо стандартных 16-24px
   - Большой воздух 40-80px между верхним и нижним блоком на простом экране
   - State-morph button (copy/save/like/follow через crossfade двух state-слоёв)

5. **Не пропускай связь с final-qa** — anti-slop не заменяет полный QA. После anti-slop пройди `carnica-final-qa` skill — там 6-мерное ревью (Components 25% / Visual similarity 20% / Spacing 15% / Typography 10% / Structure 30%). Anti-slop — это lightweight pass, final-qa — полное ревью. Любое P0 = автоматическая repair iteration.

6. **Не дублируй детали правил здесь** — этот skill хранит триггер-листы. Подробные правила и причины — в owner skills через `## See also`. Если возник вопрос «почему именно так» по конкретному P0/P1 — иди в owner skill (например, контраст brand/primary 1.7:1 → `carnica-typography`).

## See also

- `carnica-typography` — правила контраста, weight, alignment, иерархии (P0 нарушения: brand/primary как текст, justify, Bold/SemiBold, разный font-size в строке)
- `carnica-copy-tone` — lowercase / запрещённые AI-фразы / точки в конце / висячие предлоги (P0/P1/P2: CAPS, lorem ipsum, «бесшовный опыт», точка, &nbsp;)
- `carnica-design-system` — color tokens / spacing / radii / inline text-size / surface inversion / nested radius (P0/P1: hex напрямую, чужие палитры, surface-* фон, произвольный радиус/spacing)
- `carnica-components` — tag tones / button properties / icon variants / decision rules (P0/P1: ручная сборка, неверный variant иконки, tag font-weight, title 2.1 кастомизация)
- `carnica-ux-principles` — §15 lowercase / §16 фоны тэгов / §8 воздух / §13 лента / §14 асимметрия (P0/P1: CAPS, surface-* как фон тэга, монолит вместо ленты, 2×2 сетка)
- `carnica-visual-patterns` — distinctive patterns для 20% rule (avoid bare text, edge alignment, button hover, button stacking on mobile, avatar + text vertical center)
- `carnica-motion` — hover rules (P1: translateY-lift вместо scale(0.97))
- `carnica-gotchas` — chevron / cell background / plus round / padding / modal page (P1: API workaround'ы)
- `carnica-design-references` — допустимые градиенты и тёмные подложки (P0: градиенты на карточках кроме исключений)
- **После Phase 3:** `carnica-final-qa` — полное 6-мерное ревью (anti-slop = lightweight QA pass, final-qa = полный scorecard)

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (≥5 RU + ≥3 EN) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться` (D-09).
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [x] **D-24 LIGHT skill** — источник 169 строк < 250, тяжёлый материал отсутствует, `references/` директория НЕ создана (анти-паттерн D-24).
- [x] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа). Использован `## See also`.
- [x] Контент пересекается с другими ref skills (типографика, copy-tone, design-system, components) — owner ссылается через `## See also` + inline ссылки `→ owner: carnica-X` (§ 7 architecture, D-27 OWNER pattern).
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Imperative form в body: «Запусти», «Не оправдывай», «Не дублируй», «Исправь», «Примени» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют.
