---
name: carnica-visual-patterns
description: Визуальные паттерны Carnica/Beeline — каноничные композиции и spacing-правила (hero, wallet card-holder, dots progress LTR, asymmetric card grid, state-morph button, final CTA, numbered steps, lists in cards, edge alignment, avatar+text). Используй когда собираешь экран по референсам Beeline 2026, выбираешь композицию hero/feed/bundle для лендинга, решаешь asymmetric vs symmetric grid, реализуешь dots progress или state-morph button, проверяешь spacing и edge alignment перед сдачей. Триггеры: «паттерн», «композиция», «hero», «wallet», «card-holder», «dots progress», «card grid», «final CTA», «state-morph», «edge alignment», «numbered steps», «spacing», «visual pattern», «layout», «composition», «hero», «card», «grid», «landing», а также любая сборка Carnica-экрана по референсу Beeline 2026.
type: reference
---

# Carnica Visual Patterns

Этот skill хранит 20 канонических визуальных паттернов Beeline 2026: композиции (hero, wallet, feed, numbered steps), spacing-правила (canonical 12/20/24, edge alignment 4px/20px), реализационные шаблоны (dots progress LTR, state-morph button, final CTA с canonical asset). Index 20 паттернов в Quick reference, inline body для top-10 most-used, остальные 10 — в `references/patterns-full.md` с полными CSS / Figma Plugin API / размерами.

## Когда обращаться

- Собираешь экран по референсу Beeline 2026 (главный, wallet, bundle, settings) и не знаешь, какой паттерн взять
- Выбираешь композицию hero на лендинге — `hero-split` или `hero-floating-corners`
- Решаешь, нужна ли asymmetric card grid (2 ряда 43/57%) или обе карточки равной ширины
- Реализуешь dots progress и нужен правильный direction (жёлтые слева — оставшееся, серые справа — потраченное)
- Делаешь state-morph button (copy/save/like/follow) с crossfade двух слоёв вместо изменения textContent
- Проверяешь spacing и edge alignment перед сдачей — 4px для card-holder, 20px стандарт
- Размещаешь финальный CTA на лендинге — нужен canonical asset `connect-to-beeline.png` и max-height 444px
- Делаешь numbered steps (split layout: head слева, шаги справа с линией-коннектором)
- Размещаешь avatar/icon-chip рядом с текстом в flex-row — нужен `align-items: center`, без `padding-top` хаков
- Делаешь lists внутри карточек — inset dividers (paddingLeft=72, paddingRight=20)

## Quick reference — Index 20 паттернов

| # | Паттерн | Одной строкой | Подробности |
|---|---|---|---|
| 1 | General style | Beeline 2026 минимализм: белая карточка на сером фоне F0F3F5, brand-yellow только для CTA | `references/patterns-full.md` §1 |
| 2 | Spacing canonical | 12/20/24 шкала; landing-секции padding-block 60px desktop / 40px mobile | `references/patterns-full.md` §2 |
| 3 | Landing section headings | hero=XL (56/66), все остальные section heading=L (40/48), на mobile стэп вниз | `references/patterns-full.md` §3 |
| 4 | Hero composition variants | `hero-split` (default) vs `hero-floating-corners` (абстрактный продукт) | inline body ниже |
| 5 | Air / vertical split | большой padding 40-80px между блоками, не заполнять пустоту декорациями | `references/patterns-full.md` §5 |
| 6 | Dots progress LTR | жёлтые слева (remaining), серые справа (consumed); 6-12px диаметр, gap 1-3px | inline body ниже |
| 7 | Product feed on main screen | единый белый блок с секциями, cornerRadius 32, clipsContent | `references/patterns-full.md` §7 |
| 8 | Asymmetric card grid | 2 ряда: 43/57% + 57/43%; 1 ряд (без соседнего): обе 50/50 | inline body ниже |
| 9 | Wallet card-holder | selected жёлтая h=200 + 3 collapsed снизу (narrow→wide, near→far) через ABSOLUTE | inline body ниже |
| 10 | Bottom sheet / dense bundle modal | top radii 32, padding 4px wrapper, gap между картами 8px | `references/patterns-full.md` §10 |
| 11 | Lists in cards | `cell 3.1 background=none`, inset dividers (paddingLeft=72, paddingRight=20) | inline body ниже |
| 12 | State-morph button | crossfade двух state-слоёв через `inline-grid`, НЕ менять textContent | inline body ниже |
| 13 | Final CTA block | canonical asset `connect-to-beeline.png`, max-height 444px на desktop, dark bg | inline body ниже |
| 14 | Avatar + text vertical center | `align-items: center` на flex-row, без `padding-top` / `align-self` хаков | inline body ниже |
| 15 | Numbered steps split layout | head слева, шаги справа без подложки, линия-коннектор между кружками | inline body ниже |
| 16 | Edge alignment | 4px от края для card-holder и edge-to-edge heavy blocks; 20px стандарт | inline body ниже |
| 17 | Chip spacing | 4px gap (`--bee-spacing-100`) между chip'ами в ряд — единая группа | `references/patterns-full.md` §17 |
| 18 | Button stacking on mobile | 2+ текстовых кнопок рядом → mobile column, full width | `references/patterns-full.md` §18 |
| 19 | Avoid bare text | 2+ информационных тезисов → визуальный каркас (icon, chip, card, avatar) | `references/patterns-full.md` §19 |
| 20 | Forms with keyboard | content padding 20px; numeric keyboard CTA внутри клавиатуры | `references/patterns-full.md` §20 |

## Decision rules

Top-10 наиболее часто применимых паттернов — inline body. Полные CSS / Figma Plugin API / размеры — в `references/patterns-full.md` §N.

### 1. Hero composition variants — `hero-split` vs `hero-floating-corners`

Выбирай по природе продукта. Не миксовать обе композиции в одном лендинге.

- **`hero-split`** (default) — когда у продукта есть конкретный визуальный объект (устройство, упаковка, hero-template-image).
  - Layout: `display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 60px; align-items: center` на `.hero__inner`.
  - Слева: `.hero__copy` (заголовок `title-21 XL` + subtitle + price chips + CTA), `justify-items: start`.
  - Справа: `.hero__visual` с `<img>` 360-460px и лёгкой `hero-float` 6s (translateY ±8px).
  - Padding-block: 60px desktop, 40px mobile. На mobile стэк в одну колонку, картинка `order: -1` (сверху).
- **`hero-floating-corners`** — когда продукт абстрактный (условия тарифа, оплата, скорость, объёмы).
  - Layout: `.hero` — `display: grid; place-items: center; min-height: clamp(640px, 88vh, 920px); overflow: hidden`.
  - `.hero__inner` — flex column, `align-items: center; max-width: 720px; text-align: center`. Текст + chips + CTA — всё центрировано.
  - `.hero__deck` — `position: absolute; inset: 0; pointer-events: none; z-index: 1`. Внутри 3-5 декораций (`.coin`-метафора) с CSS-переменными `--x/--y/--r/--delay`.
  - Декорации в **двух диагональных углах**: top-right + bottom-left (или top-left + bottom-right). Симметрия top↔bottom без диагонали — anti-pattern, теряется «полёт».
  - Каждый декор анимируется отдельно (`coin-float` 8s ease-in-out, рандомные delays 0-2.4s). `prefers-reduced-motion: reduce` обнуляет анимацию.

Anti-pattern: использовать `hero-floating-corners` если есть отрисованный объект — `hero-split` лучше передаёт «вот эта вещь». Декорация не должна перекрывать текст ни на одном breakpoint (1440/1024/768/375). Не использовать одно decorations-семейство в hero и в Final CTA. → `references/patterns-full.md` §4.

### 2. Dots progress LTR — жёлтые слева (оставшееся), серые справа (потраченное)

Кастомный прогресс из маленьких кружков. Это НЕ стандартный компонент Carnica — собирается вручную из маленьких ellipse-элементов.

- **Алгоритм**: `threshold = round(remaining / total * totalColumns)`. Все точки с `col ≤ threshold` → жёлтые (`brand/primary` или `content/primary`), остальные → серые (`background/secondary` или `content/tertiary`).
- **НИКОГДА** не разделять по рядам (сверху/снизу). Только по колонкам (слева/справа).
- Диаметр точки **~6-12px**, gap **1-3px**.
- Используется для гб, минут, SMS на главном экране и экранах детализации.

Anti-pattern: цветные точки справа, серые слева; или цветные ряд сверху, серые ряд снизу — направление чтения LTR ломается. → `references/patterns-full.md` §6, `references/examples.md` §«Dots progress».

### 3. Wallet card-holder — selected жёлтая + 3 collapsed через ABSOLUTE positioning

GS-3 pattern. Метафора «колоды карт» — selected лежит сверху, collapsed под ней, виден нарастающий объём.

- **Main frame**: `375×812`, `primaryAxisSizingMode='FIXED'`, `clipsContent=true`, auto-layout VERTICAL.
- **Selected card wrapper**: side padding **4px** (правило edge alignment heavy blocks).
- **Selected card**: width 367, yellow `brand/primary`, `cornerRadius=32`, `padding=16`, `h=200`.
- **Fast actions** ниже selected card: side padding **20px** (стандарт).
- **Collapsed cards** — `absolute children` of main frame.

Метрики collapsed для 375px viewport:

| Card | Width | Top | Radius | Shadow |
|---|---:|---:|---:|---|
| far (дальняя) | 297 | 712 | 26 | нет |
| middle | 330 | 722 | 29 | `y=-2, blur=10, 8%` |
| near (ближняя) | 367 | 732 | 32 | `y=-2, blur=10, 8%` |

**Implementation order**: `appendChild(card)` → `card.layoutPositioning='ABSOLUTE'` → `resize` → `x/y`. Центрирование: `card.x = (375 - card.width) / 2` → x=39/22/4. Масштабирование внутреннего содержимого: `scale = w / 367`. Клиппинг main обрезает низ — видно только верхние ~80px самой ближней collapsed card. → `references/patterns-full.md` §9.

### 4. Asymmetric card grid — 43/57% для двухрядных, 50/50 для одиночного

Для **двух последовательных рядов** по 2 карточки:
- Первый ряд: `43% / 57%` (narrow + wide).
- Второй ряд: `57% / 43%` (wide + narrow).

Для **одиночного ряда** (без соседнего ряда карточек) — обе карточки **равной ширины** (50/50).

Реализация: `layoutWrap='WRAP'` на родителе, одной карточке `layoutSizingHorizontal='FIXED'` (144px), другой `'FILL'`. Не fixed-width текстовых контейнеров. Создаёт визуальный ритм вместо монотонной сетки. → `references/patterns-full.md` §8.

### 5. State-morph button — crossfade двух state-слоёв, НЕ менять textContent

Реализационный паттерн для in-place actions (copy/save/like/follow/mark-read), показывающих результат прямо в кнопке в течение ~1.5 сек.

- **Markup**: два `<span class="copy-state">` внутри кнопки — default-слой и done-слой.
- **Crossfade через `inline-grid`**: оба слоя в одной grid-cell (`grid-area: 1 / 1`). Размер кнопки = `max(width-A, width-B)` автоматически.
- **JS только переключает атрибут** (`data-copied="true"` / `data-state-active="true"`). Вся анимация в CSS.
- **Transition**: `opacity 180ms + transform 180ms + filter 180ms ease-out`. На активации done-слой: `opacity 0→1, scale(0.94)→scale(1), blur(4px)→blur(0)`. Default-слой одновременно: `opacity 1→0, scale(1)→scale(1.06), blur(0)→blur(4px)`.
- **`isolation: isolate`** на родителе — stacking-context, чтобы `filter: blur` не задевал соседей.
- **`pointer-events: none`** на скрытом слое.
- **`aria-live="polite"`** на кнопке, **`aria-hidden="true"`** на done-слое до активации.
- **Auto-reset** через `setTimeout(1500ms)` для one-shot (copy/send). Для toggle (like/save) — без таймера, переключение на каждый клик. **`clearTimeout`** обязателен в обработчике — иначе таймеры накапливаются.
- **`prefers-reduced-motion: reduce`** — `transition: opacity 100ms linear; transform: none; filter: none`.

Anti-pattern: менять `textContent` через JS без CSS-перехода (content «дёргается», width скачет, focus теряется). Stack через `position: absolute; top:0; left:0` — ломает baseline. Для операций >500ms показывать spinner, не state-morph. Motion-параметры (длительности, easing, обоснование) — `carnica-motion` §3 (cross-owner). → `references/patterns-full.md` §12.

### 6. Final CTA block — canonical asset connect-to-beeline.png + max-height 444px

Финальный CTA-блок (тёмная карточка с заголовком + единственной кнопкой) обязан использовать **canonical-asset** и иметь фиксированную max-height на desktop.

- **Иллюстрация**: `assets/images/connect-to-beeline.png` (тёмная SIM-card + жёлтая SIM-card с галочкой-стрелкой). Используется для ВСЕХ финальных CTA-блоков на лендингах билайн.
- **Подложка**: token `background/secondary fake-invert` = #202632; CSS var `--bee-background-secondary-fake-invert` (legacy `--bee-bg-secondary-fake-invert`). НЕ `content/primary` #28303F (это цвет текста, не background). НЕ белый `bg/secondary` — теряется контраст с белыми product-карточками выше.
- **Текст**: через `title-21--invert` modifier — h2 = `#FFFFFF`, subtitle = `rgba(255,255,255,.6)`.
- **Border-radius**: `card-l` (32px) desktop, `card-m` (24px) mobile.
- **Desktop max-height**: `max-height: 444px; overflow: hidden` — фиксирует пропорцию ~16:9.
- **Mobile**: max-height не применяется (естественный stack: текст + кнопка + иллюстрация).
- **Image fit на desktop** (width-based square, надёжный паттерн):
  ```css
  .final-cta__visual {
    width: min(calc(444px - 2 * var(--bee-spacing-1600)), 100%);  /* = min(316px, 100%) */
    aspect-ratio: 1 / 1;
  }
  .final-cta__visual img { width: 100%; height: 100%; object-fit: contain; }
  ```
- **Grid с media**: `grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr)` — НЕ `1.15fr 1fr` (image-track расширяет колонку past 1fr).

Anti-pattern: использовать hero-иллюстрацию страницы или generic Midjourney. `height: 100%` на visual + `aspect-ratio: 1/1` + `width: auto` — circular dependency, image обрезается снизу нестабильно. → `references/patterns-full.md` §13.

### 7. Avatar / icon-chip + adjacent text — vertical center alignment

Универсальное правило для **любой пары «circular surface-элемент + текстовый блок рядом»** в flex-row. Касается `.cell 3.1`, `.cond-card`, `.feature-card`, `.how__step`, `.cell-grid`, profile pill, product-tiles.

```css
.row {
  display: flex;
  align-items: center;          /* единственно правильное значение */
  gap: 16px;
}
```

**Никаких** `padding-top` / `margin-top` / `align-self: flex-start` на одном из элементов «чтобы выровнять». 

Почему не `flex-start`:
- `flex-start` ставит **верх** кружка по уровню первой строки текста. При кружке 48px и cap-height ≈21px у `body/medium` центр кружка оказывается **ниже** центра первой строки на ~13px — «съехало вниз».
- `padding-top` хак — ломается при изменении шрифтового размера, числа строк, межстрочного интервала.
- На разных breakpoint'ах текст переносится по-разному (1 строка → 4), `flex-start` даёт визуально разное смещение. `center` работает одинаково.

Исключение: text-блок >4 строк, и кружок «висит в пустоте» в середине — тогда `align-items: flex-start` с **одновременным** изменением layout (кружок в собственную grid-колонку с `align-self: start`). Это уже другой паттерн. → `references/patterns-full.md` §14.

### 8. Numbered steps — split layout (head слева, steps справа)

Альтернативная композиция блока «как это работает» для desktop ≥1024px и 2-4 шагов. Без белой подложки.

- **Layout**: grid `1fr 1fr`, gap 64px (`spacing/1600`, `--bee-spacing-1600`), `align-items: start`.
- **Steps**: flex column, gap 40px (`spacing/1000`, `--bee-spacing-1000`), `position: relative`.
- **Линия-коннектор** через `::before` на `.how__steps`:
  - `position: absolute; left: 23px` (для 48px кружка и 2px линии = (48/2 − 2/2) = 23px).
  - `top: 24px; bottom: 24px` (сдвиг на половину высоты кружка — линия начинается/заканчивается в центре первого/последнего кружка).
  - `width: 2px; background: var(--bee-bg-secondary)` — **цвет линии = цвет фона `.step-num`** (surface inversion: серая страница → bg/secondary белый, белая карточка → bg/tertiary серый).
  - `z-index: 0` на ::before.
- **Кружок поверх линии**: `.how__step { position: relative; z-index: 1 }` — кружок перекрывает линию. Поскольку цвета совпадают, перекрытие читается как «утолщение в кружке».
- **Vertical center**: `align-items: center` на `.how__step` (см. правило 7).
- **Mobile ≤1024px**: grid в одну колонку, gap 24px.
- **Длина subtitle слева**: `max-width: 36ch` — не растягиваться на всю левую колонку.

Anti-pattern: линия как `<hr>` или отдельные `<div>` между шагами — ломается ритм при разной длине subtitle. Brand-yellow заливка кружков (anti-slop P0). Хвост линии за последним кружком вниз. Sticky на head оправдан только при 6+ шагов. → `references/patterns-full.md` §15.

### 9. Lists in cards — inset dividers (paddingLeft=72, paddingRight=20)

Внутри белой карточки список cells оформляется так:

- **`cell 3.1` variant `background=none`** — НЕ `default on bg_secondary` (даёт ДОП серый фон внутри белой карточки).
- **Reset cell padding** если родительская карточка уже имеет padding (через `resetPadding()` все 4 стороны).
- **Recolor right chevron** в `content/secondary` через `recolorVectors(rightView, paintCS)` — default `content/primary` слишком тёмный для navigation.
- **Dividers**: `divider horizontal 2.0` обёрнут в **VFrame с `paddingLeft=72, paddingRight=20`** — это inset, чтобы divider начинался от иконки и не доходил до правого края.

Правило inset: divider должен «начинаться от иконки» — слева отступ = ширина icon (40-48px) + gap к тексту (16-24px) = ~72px. Справа — стандартный page-padding 20px. → `references/patterns-full.md` §11.

### 10. Edge alignment — 4px для heavy blocks, 20px стандарт

Standard page side padding для всего layout — **20px**.

Edge-to-edge heavy blocks (4px от края):
- Card-holder стопки в wallet
- Hero полноширинные баннеры
- Full-bleed карточки внутри модальных окон

External card radius 32, padding 20. Mobile frame 375px. Если старые reference notes говорят про 16px — это legacy. Новые genertion и golden samples используют 20px.

**Согласованность text-align и положения блока**:
- `text-align: left` → блок прижат к **левому** краю контейнера. НЕ `margin-inline: auto` (центрирует) + `text-align: left` одновременно — текст «выровнен по левому краю на 1/3 экрана», глаз цепляется за случайную линию.
- `text-align: center` → блок центрирован (`margin-inline: auto` или grid `place-items: center`).
- `text-align: right` → блок прижат к правому краю.

Реализация для hero left-aligned:
```css
.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: var(--bee-spacing-1600);
}
.hero__copy { max-width: 600px; justify-items: start; }  /* НЕ margin-inline: auto */
```

→ `references/patterns-full.md` §16, `references/examples.md` §«Edge alignment».

## See also

- `carnica-design-references` — каталог 20 макетов Beeline 2026 с node-IDs и примерами применения паттернов
- `carnica-ux-principles` — UX-обоснования паттернов: card-holder (§10), numbered steps как progressive disclosure (§5), 4px edge для wallet (§10)
- `carnica-motion` — motion-параметры для state-morph button (§3), hero-float анимация, coin-float — cross-owner для timing/easing
- `carnica-components` — Carnica компоненты, использующиеся в паттернах (cell 3.1, card large/medium/small, navbar, divider, avatar)
- `carnica-anti-slop` — P0/P1/P2 запреты, пересекающиеся с паттернами (CAPS, brand/primary как текст, ложная иерархия)
- `carnica-design-system` — color tokens (`background/primary` F0F3F5, `brand/primary` FFC800, `background/secondary fake-invert` 202632), spacing tokens, nested radius
- `references/patterns-full.md` — полные детали 20 паттернов с CSS / Figma Plugin API / dimensions / anti-patterns
- `references/examples.md` — конкретные до/после, типичные баги и их исправления

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (≥5 RU + ≥3 EN) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться` (D-09).
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [x] Тяжёлый материал (полные таблицы > 15 строк, CSS-патч примеры, Figma API код, edge cases) вынесен в `references/*.md` (§ 9 architecture).
- [x] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа).
- [x] Если контент пересекается с другим ref skill — один owner, остальные ссылаются через `See also` (§ 7 architecture). state-morph motion — owner `carnica-motion`; color tokens — owner `carnica-design-system`.
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Imperative form в body: «Выбирай», «Используй», «Не миксуй» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют.
