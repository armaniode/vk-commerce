# Visual Patterns — полная справочная база 20 паттернов

Полные детали 20 канонических визуальных паттернов Beeline 2026: CSS-код, Figma Plugin API, спецификации, размеры, anti-patterns. Для quick-lookup и top-10 decision rules — `SKILL.md`. Для до/после и типичных багов — `examples.md`.

## TOC

1. [General style](#1-general-style)
2. [Spacing canonical](#2-spacing-canonical)
3. [Landing section headings](#3-landing-section-headings)
4. [Hero composition variants](#4-hero-composition-variants)
5. [Air / vertical split](#5-air--vertical-split)
6. [Dots progress LTR](#6-dots-progress-ltr)
7. [Product feed on main screen](#7-product-feed-on-main-screen)
8. [Asymmetric card grid](#8-asymmetric-card-grid)
9. [Wallet card-holder](#9-wallet-card-holder)
10. [Bottom sheet / dense bundle modal](#10-bottom-sheet--dense-bundle-modal)
11. [Lists in cards](#11-lists-in-cards)
12. [State-morph button](#12-state-morph-button)
13. [Final CTA block](#13-final-cta-block)
14. [Avatar / icon-chip + adjacent text](#14-avatar--icon-chip--adjacent-text)
15. [Numbered steps — split layout](#15-numbered-steps--split-layout)
16. [Edge alignment](#16-edge-alignment)
17. [Chip spacing](#17-chip-spacing)
18. [Button stacking on mobile](#18-button-stacking-on-mobile)
19. [Avoid bare text](#19-avoid-bare-text)
20. [Forms with keyboard](#20-forms-with-keyboard)

---

## 1. General style

Базовые принципы редизайна Beeline 2026.

- **Минимализм**, без декоративного шума.
- **Серый page background**: `background/primary` (#F0F3F5).
- **Белые карточки**: `background/secondary` (#FFFFFF).
- **Brand yellow** (#FFC800): только CTA, активное состояние, wallet selected card.
- **UI-текст в нижнем регистре**, кроме имён, брендов, аббревиатур, телефонов.
- **Максимум 3-4 уровня иерархии** на экране.
- **Основной вес standalone-текстов**: Regular 400.

Cross-link: `carnica-typography` (правила weight), `carnica-design-system` (color tokens), `carnica-ux-principles` §15 (lowercase UI).

---

## 2. Spacing canonical

| Context | Rule |
|---|---|
| Mobile frame | 375px |
| Standard page side padding | 20px |
| Edge-to-edge heavy blocks | 4px |
| External card radius | 32px |
| External card padding | 20px |
| Standard section gap (внутри блока) | 12-24px |
| **Landing section padding-block (desktop)** | **64px (`spacing/1600`, `--bee-spacing-1600`)** — gap между секциями = 128px |
| **Landing section padding-block (mobile ≤768)** | **40px (`spacing/1000`, `--bee-spacing-1000`)** — gap между секциями = 80px |
| Dense modal/bundle gap | 8px |
| Grid gap | 8px |
| Button M/L | 44px / 56px |

### Landing section spacing

Каждая `<section>` имеет одинаковый `padding-block` сверху и снизу. Зрительный gap между секциями = `padding-bottom_прев + padding-top_след`.

Anti-pattern:
- Не использовать `margin-block` для разделения секций — ломает collapse-логику и адаптив.
- Не миксовать разные значения сверху/снизу (`80px 100px`) — gap непредсказуемый.

Legacy: 16px page padding в старых reference notes — устаревшее; golden samples используют 20px, с 4px только для edge-to-edge.

---

## 3. Landing section headings

Заголовки секций лендинга на desktop используют ровно два размера компонента `title 2.1`:

| Секция | Size | Title font | Subtitle font | Когда |
|---|---|---|---|---|
| **Hero** (первый блок) | **`XL`** | 56/66 (display/large) | 24/28 (body/large) | главный заголовок страницы — единственный |
| **Все остальные блоки** | **`L`** | 40/48 (display/medium) | 20/26 (body/medium) | разделы: «условия», «как это работает», «вопросы», «отзывы» |

На mobile через `title-21--responsive` размеры стэпают вниз на ступень (XL → L → M). На 375px hero=L (40px), section heading=M (32px).

### Почему так

- **XL только для hero**: визуально доминирующий заголовок, виден без скролла, фокусирует внимание.
- **L для всех остальных**: чёткий ритм между блоками, все визуально равны по «весу», секции — параллельные части одной истории.
- **Не используем M для section headings**: M даёт ощущение «маленьких блоков», теряется иерархия страница → блок.
- **Не используем разные размеры между блоками** (conditions=M, how=S) — создаёт ложную иерархию.

### Anti-pattern

- Все заголовки одного размера M — hero не выделяется.
- Разные размеры между секциями (`conditions=M, how=S`) — ложная иерархия.

Cross-link: `carnica-anti-slop` → P1 Композиция; `carnica-design-system` → Typography styles.

---

## 4. Hero composition variants

Две **канонизированные** композиции. Выбор — по природе продукта. Не миксовать в одном лендинге.

### `hero-split` (default)

- Layout: `display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 60px; align-items: center` на `.hero__inner`.
- Слева: `.hero__copy` (заголовок `title-21 XL` + subtitle + price chips + CTA), `justify-items: start`.
- Справа: `.hero__visual` с `<img>` 360-460px и `hero-float` 6s (translateY ±8px).
- Padding-block: 60px desktop, 40px mobile. Mobile: стэк в одну колонку, изображение `order: -1` (сверху).
- **Когда брать**: у продукта есть конкретный визуальный объект — устройство, hero-template-image, упаковка тарифа.

### `hero-floating-corners`

- Layout: `.hero` — `display: grid; place-items: center; min-height: clamp(640px, 88vh, 920px); overflow: hidden`.
- `.hero__inner`: flex column, `align-items: center; max-width: 720px; text-align: center`.
- `.hero__deck`: `position: absolute; inset: 0; pointer-events: none; z-index: 1`. Внутри 3-5 `.coin`-метафор. Позиции через CSS-переменные `--x / --y / --r / --delay` на классах-слотах (`.coin--tr-a`, `.coin--bl-a`) — переопределяются в mobile media query.
- **Декорации в двух диагональных углах**: top-right + bottom-left (или top-left + bottom-right). Симметрия top↔bottom без диагонали ломает «полёт».
- Анимация: `coin-float` 8s ease-in-out, рандомные delays 0-2.4s. `prefers-reduced-motion: reduce` обнуляет.
- **Когда брать**: продукт абстрактный (условия тарифа, оплата, переносы остатка, скорость); декорации как метафора.

### Anti-pattern

- Не миксовать обе композиции.
- Не использовать `hero-floating-corners` если есть отрисованный объект — `hero-split` лучше передаёт «вот эта вещь».
- Не размещать декорации в одном углу или симметрично top↔bottom без диагонали.
- Декорация не должна перекрывать текст hero ни в одном breakpoint (1440 / 1024 / 768 / 375).
- Не использовать одно decorations-семейство в hero и Final CTA: hero — метафора продукта, Final CTA — `connect-to-beeline.png`.

Cross-link: `carnica-motion`; `examples.md` §1.

---

## 5. Air / vertical split

Screens with few elements should use visible air:

- **Top zone**: данные/статусы.
- **Bottom zone**: действия.
- **Large spacer** может быть `40-80px` или больше в простых экранах (например, GS-2).

Do not fill empty space with decoration.

Cross-link: `carnica-ux-principles` §8 «Воздух — пустое пространство как элемент дизайна», §9 «Вертикальное разделение экрана».

---

## 6. Dots progress LTR

Custom progress dots — там, где нет стандартного Carnica компонента.

- Dots — small ellipses, обычно **6-12px**.
- Gap **1-3px**.
- Fill direction — всегда **left-to-right**.
- Active/remaining — **слева**. Inactive/spent — **справа**.
- **Не разделять** active/inactive по рядам.

### Алгоритм

```js
const threshold = Math.round(remaining / total * totalColumns);
// все точки с col ≤ threshold → жёлтые/цветные; остальные → серые
```

### Цвета

- Цветные/активные (оставшееся): `brand/primary` (#FFC800) или `content/primary` (#28303F).
- Серые/неактивные (потраченное): `background/secondary` или `content/tertiary`.

Это **НЕ стандартный компонент Carnica** — собирается вручную из маленьких ellipse-элементов.

Cross-link: `examples.md` §2.

---

## 7. Product feed on main screen

Main screen может содержать **единый белый feed-блок** с несколькими внутренними секциями.

- **Feed block**: `cornerRadius=32`, `clipsContent=true`.
- **Каждая секция**: визуальный якорь (обложки) + centered title + centered description + CTA.
- **Title над feed**: standalone `body/accent/small` (16/500), `content/secondary`, CENTER.
- **Внутренние секции** разделены spacing'ом, не дividers'ами.

### Типографика секций внутри feed

- **Заголовок секции** (Steam, фильмы): `body/accent/medium` (20/500/26), CENTER.
- **Описание**: `body/small` или `caption/medium`, `content/secondary`, CENTER.
- **CTA**: `button 2.5` secondary, text view, по центру.

Cross-link: `carnica-ux-principles` §13 «Продуктовая лента (feed) на главном экране».

---

## 8. Asymmetric card grid

Для двух последовательных рядов по 2 карточки:

- **Первый ряд**: narrow/wide (`43% / 57%`).
- **Второй ряд**: wide/narrow (`57% / 43%`).
- **Одиночный ряд** (без соседнего): равные ширины (50/50).

### Реализация

- На родителе: `layoutWrap='WRAP'`.
- На карточках: одной — `FILL` / fixed width.
- Не задавать fixed-width текстовых контейнеров.

```js
// Figma Plugin API
parentRow.layoutWrap = 'WRAP';
narrowCard.layoutSizingHorizontal = 'FIXED';
narrowCard.resize(144, narrowCard.height);
wideCard.layoutSizingHorizontal = 'FILL';
```

Создаёт визуальный ритм вместо монотонной сетки.

Cross-link: `examples.md` §«Asymmetric card grid».

---

## 9. Wallet card-holder

GS-3 pattern. Метафора «колоды карт» — selected лежит сверху, collapsed под ней, виден нарастающий объём.

### Main frame

- Размер `375 × 812`, `primaryAxisSizingMode='FIXED'`, `clipsContent=true`, auto-layout VERTICAL.

### Selected card

- **Wrapper side padding**: `4px` (правило edge alignment heavy blocks).
- **Width** 367, fill `brand/primary` (#FFC800), `cornerRadius=32`, padding 16, **height 200 FIXED**.
- **Number-info row** (HFrame, gap=8, items-center): avatar 3.0 (`view=image, size=M`) + text wrapper (phone `body/medium` + subtitle `body/small` opacity 0.6) + balance `body/small` opacity 0.6.
- **Actions row** (HFrame, gap=4, SPACE_BETWEEN): 2 × `button 2.5` (style=glass, priority=secondary on bg_secondary, view=text, size=medium).

### Fast actions (под selected card)

- Wrapper: VFrame, `paddingLeft/Right=20`, gap=12, items-center.
- White card: `bg=background/secondary`, `cornerRadius=32`, clipsContent.
- 3 × `cell 3.1`: `background=none`, `title size=S`, padding=16. Chevron recolor в `content/secondary`.
- 2 × divider horizontal 2.0: обёрнуты в VFrame с `paddingLeft=72, paddingRight=20`.
- `button inline text 3.0` «все функции >»: `priority="seсondary"` (с кириллической «с»!), `right icon#623:0=true`, chevron recolor.

### Collapsed cards — ABSOLUTE positioning

Метрики для 375px viewport:

| Card | Width | Top | Height | Padding | Radius | Shadow |
|---|---:|---:|---:|---:|---:|---|
| far (дальняя) | 297.27 | 712 | 162 | 12.96 | 25.92 | нет |
| middle | 330.3 | 722 | 180 | 14.4 | 28.8 | `y=-2, blur=10, 8%` |
| near (видимая) | 367 | 732 | 200 | 16 | 32 | `y=-2, blur=10, 8%` |

### Implementation order

```js
main.appendChild(card);                  // 1. add as child
card.layoutPositioning = 'ABSOLUTE';     // 2. make absolute
card.resize(width, height);              // 3. resize
card.x = (375 - card.width) / 2;         // 4. position → x=39/22/4
card.y = topY;                           //              → y=712/722/732
```

### Содержимое collapsed card

- Background `background/secondary` (белая) + drop shadow для 2/3 карты.
- Number-info: avatar `view=text` green SOLID fill (#00C06D) + «М» + phone + subtitle + balance.
- Actions: 2 × `button 2.5` (style=glass, priority=secondary on bg_primary).
- Scale содержимого: `scale = card.width / 367` → масштабирование avatar size, item gap.

### Эффект клиппинга

Main frame `clipsContent=true` + `h=812` обрезает низ — видно только верхние ~80px ближней collapsed card. Пользователь видит стопку — понимает, что под выбранной есть другие аккаунты.

Cross-link: `carnica-ux-principles` §10 «Card-holder стопка» (UX-обоснование); `examples.md` §3.

---

## 10. Bottom sheet / dense bundle modal

GS-5 pattern.

- **Root overlay**: vertical frame, overlay fill, `clipsContent=true`.
- **Sheet**: `background/primary`, top radii `32`, bottom radii `0`.
- **First child of sheet**: `navbar modal 1.0` single component.
- **Content wrapper side padding**: `4px`.
- **Cards inside wrapper**: padding `20px` → visual inset становится `24px`.
- **Gap между major cards** в dense modal: `8px`.
- **Action surface**: final child с `background/secondary`, `padding 24h/20v`, top radii `32`.

Cross-link: `carnica-components` → navbar modal 1.0.

---

## 11. Lists in cards

Внутри белой карточки список cells оформляется так:

- **`cell 3.1` variant**: `background=none` — НЕ `default on bg_secondary` (даёт ДОП серый фон внутри белой карточки).
- **Reset cell padding** если родительская карточка уже имеет padding. Обнулять все 4 padding'а (L/R/T/B) через `resetPadding()`.
- **Recolor right chevron** в `content/secondary` через `recolorVectors(rightView, paintCS)` — default `content/primary` слишком тёмный для navigation.
- **Dividers**: `divider horizontal 2.0` обёрнут в **VFrame с `paddingLeft=72, paddingRight=20`** — inset, чтобы divider начинался от иконки и не доходил до правого края.

### Логика inset

Divider должен «начинаться от иконки»:
- Слева: ширина icon (40-48px) + gap к тексту (16-24px) = **~72px**.
- Справа: стандартный page-padding = **20px**.

### Figma Plugin API snippet

```js
const dividerWrapper = createVFrame({paddingLeft: 72, paddingRight: 20});
const divider = await importComponentByKeyAsync('b47c4cb27bbb001084f9c43d8c4e977c0c9eb00f');
dividerWrapper.appendChild(divider.createInstance());
```

Cross-link: `carnica-components` → cell 3.1, divider horizontal 2.0.

---

## 12. State-morph button

Реализационный паттерн для in-place actions (copy/save/like/follow/mark-read), показывающих результат прямо в кнопке в течение ~1.5 сек. Motion-параметры — `carnica-motion` §3 (cross-owner). Этот раздел — реализационный шаблон.

### Принцип

Два слоя-состояния (default + done) в одной grid-cell через `display: inline-grid; grid-area: 1 / 1`. JS переключает атрибут `data-state-active` / `data-copied` / `data-saved`. Вся анимация в CSS — crossfade `opacity + transform + filter:blur`, transition 180ms ease-out.

### Универсальная схема action'ов

| Action | Атрибут | default | done |
|---|---|---|---|
| copy promo | `data-copied` | icon-copy + «скопировать» | icon-check + «скопировано» |
| save | `data-saved` | icon-bookmark-outline | icon-bookmark-fill + «сохранено» |
| like | `data-liked` | icon-heart-outline + count | icon-heart-fill + count+1 |
| follow | `data-followed` | «подписаться» | icon-check + «подписан» |
| mark read | `data-read` | icon-mail-outline | icon-check + «отмечено» |
| send code | `data-sent` | icon-send + «отправить код» | icon-check + «отправлено» |

### CSS

```css
.morph-btn { display: inline-grid; align-items: center; justify-items: center; isolation: isolate; }
.morph-btn .morph-state {
  grid-area: 1 / 1;
  display: inline-flex; align-items: center; gap: 8px;
  transition: opacity 180ms ease-out, transform 180ms ease-out, filter 180ms ease-out;
  will-change: transform, filter, opacity;
}
.morph-btn .morph-state--off { opacity: 1; transform: scale(1); filter: blur(0); }
.morph-btn .morph-state--on { opacity: 0; transform: scale(0.94); filter: blur(4px); pointer-events: none; }
.morph-btn[data-state-active="true"] .morph-state--off { opacity: 0; transform: scale(1.06); filter: blur(4px); }
.morph-btn[data-state-active="true"] .morph-state--on { opacity: 1; transform: scale(1); filter: blur(0); pointer-events: auto; }
@media (prefers-reduced-motion: reduce) {
  .morph-btn .morph-state { transition: opacity 100ms linear; transform: none !important; filter: none !important; }
}
```

### JS (one-shot copy)

```js
btn.addEventListener('click', () => {
  navigator.clipboard.writeText(code).then(() => {
    btn.setAttribute('data-copied', 'true');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => btn.removeAttribute('data-copied'), 1500);
  });
});
```

Для toggle (like/save) — без `setTimeout`, переключать на каждый клик. Полный markup — `examples.md` §5.

### Тонкости

1. **Размер = max(A, B)**: `inline-grid` со стэком берёт `max-content` обоих слоёв — кнопка не дёргается.
2. **`isolation: isolate`**: `filter: blur` не задевает соседей.
3. **`pointer-events: none`** на скрытом слое — клики на видимый.
4. **`aria-live="polite"`** на кнопке, **`aria-hidden="true"`** на done-слое.
5. **`clearTimeout`** обязателен — таймеры накапливаются при повторных кликах.
6. **Mobile perf**: убрать `filter: blur`, оставить `opacity + scale`.
7. **НЕ `position: absolute`** для стэка — коллапс высоты.

### Anti-pattern

- Менять `textContent` без CSS-перехода — дёргается, width скачет, focus теряется.
- Применять для операций >500ms — нужен spinner.
- Stack через `position: absolute; top:0; left:0` — ломает baseline.
- Возвращать без анимации (`transition: none`).

Cross-link: `carnica-motion` §3; `examples.md` §5.

---

## 13. Final CTA block

Финальный CTA-блок (тёмная карточка с заголовком + единственной кнопкой) обязан использовать **canonical-asset** и иметь **фиксированную max-height на desktop**.

### Иллюстрация

**Используй `assets/images/connect-to-beeline.png`** для ВСЕХ финальных CTA-блоков лендингов билайн (тёмная SIM-card + жёлтая SIM-card с галочкой-стрелкой). Это canonical-asset.

Не использовать: hero-иллюстрацию страницы (уже отработала на первом экране); generic Midjourney-иллюстрации, фотографии устройств, абстрактные иконки.

### Подложка карточки

- **Background**: token `background/secondary fake-invert` (#202632), CSS var `--bee-background-secondary-fake-invert` — акцентный contrast-блок в самом конце страницы.
- **Color (текст)**: белый через `title-21--invert` modifier — h2 → `#FFFFFF`, subtitle → `rgba(255,255,255,.6)`.
- **Border-radius**: `card-l` (32px) desktop, `card-m` (24px) mobile.

Anti-pattern для background:
- `content/primary` (#28303F) — это цвет **текста**, не background. Семантическая ошибка.
- `bg/secondary` (#FFFFFF) — теряется контраст с белыми product-карточками выше.
- `background/tertiary fake-invert` — другой Carnica-токен с другим оттенком.

### Max-height + Image fit (desktop)

```css
:root { --bee-background-secondary-fake-invert: #202632; }

@media (min-width: 769px) {
  .final-cta__card {
    padding: var(--bee-spacing-1600); /* 64px */
    max-height: 444px;
    overflow: hidden;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    align-items: stretch;
  }
  .final-cta__visual {
    align-self: center; justify-self: end;
    width: min(calc(444px - 2 * var(--bee-spacing-1600)), 100%); /* = min(316px, 100%) */
    aspect-ratio: 1 / 1;
    display: flex; align-items: center; justify-content: center;
  }
  .final-cta__visual img {
    display: block; width: 100%; height: 100%; object-fit: contain;
  }
}
```

### Логика width-based square (надёжный паттерн)

1. Card `max-height: 444px`, padding 60px → padded зона = 324px высоты.
2. Visual `width: min(324px, 100%)` — квадрат 324px на широких viewport'ах, ширина column на узких.
3. `aspect-ratio: 1/1` → height = width (≤ 324px).
4. Высота квадрата всегда ≤ padded высоты card → нет overflow снизу.

«Fake-invert» означает «симулирует dark surface на светлой теме», в отличие от реального dark theme. На mobile **max-height не применяется** — блок естественно растягивается под stacked content.

### Markup

```html
<section class="final-cta">
  <div class="final-cta__card">
    <div class="final-cta__content">
      <header class="title-21 title-21--l title-21--invert">…</header>
      <button class="btn btn--primary">подключить</button>
    </div>
    <div class="final-cta__visual" aria-hidden="true">
      <img src="data:…" alt="" />
    </div>
  </div>
</section>
```

`alt=""` + `aria-hidden="true"` — иллюстрация декоративная.

### Anti-pattern: `height: 100%` + `aspect-ratio: 1/1` — circular dependency, image обрезается снизу нестабильно. Использовать только width-based pattern выше.

### Связанные правила

- Grid: `grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr)` — НЕ `1.15fr 1fr` (image-track расширяет колонку past 1fr). См. `carnica-gotchas` → CSS Grid.
- Vertical center text+image: `align-items: center` на grid + `align-self: stretch` + flex centering на visual.

Cross-link: `examples.md` §8.

---

## 14. Avatar / icon-chip + adjacent text

Универсальное правило для **любой пары «circular surface-элемент + текстовый блок рядом»** в horizontal flex-row: avatar, step-num, icon-chip, badge, иконка-плитка с подписью. Касается `.cell 3.1`, `.cond-card`, `.feature-card`, `.how__step`, `.cell-grid`, profile pill, product-tiles.

### Правило

`align-items: center` на flex-row родителе. **Никаких** `padding-top` / `margin-top` / `align-self: flex-start` на одном из элементов «чтобы выровнять».

```css
.row { display: flex; align-items: center; gap: 16px; }
```

Кружок 48px рядом с 1-строчным текстом → центр кружка по центру строки. Кружок 48px рядом с 4-строчным текстом → кружок по центру блока — читается как «связанный со всем текстом».

### Почему не `flex-start`

- `flex-start` ставит верх кружка по уровню первой строки. При кружке 48px и cap-height ≈21px у `body/medium` центр кружка оказывается ниже центра первой строки на ~13px — визуально «съехало вниз».
- `padding-top: Npx` на тексте — ad-hoc хак: ломается при изменении размера кружка / шрифта / числа строк / breakpoint'а. Каждый кейс требует своего pt.

### Anti-pattern

- `align-items: flex-start` + `padding-top` для оптического центрирования.
- `align-self: flex-start` на одном элементе, когда родитель `center` — inconsistent выравнивание.
- `line-height: 48px` на тексте для совпадения baseline'а с центром кружка — ломает многострочные кейсы.

### Метод проверки на QA

1. Найти flex-row родителей.
2. `align-items: center`.
3. На children нет `padding-top` / `margin-top` / `align-self`-overrides.
4. Прокликать breakpoints (1 / 2 / 3+ строк) — должно «работать само».

### Исключение

Text-блок >4 строк, кружок «висит в пустоте» — `align-items: flex-start` с одновременной сменой layout: кружок в собственную grid-колонку с `align-self: start`. Это уже другой паттерн (FAQ accordion с иконкой ?).

Cross-link: `examples.md` §6 «Avatar + text bug».

---

## 15. Numbered steps — split layout

Альтернативная композиция блока «как это работает». Без белой подложки. Двухколоночная сетка: заголовок слева, нумерованные шаги справа. Между кружками — тонкая вертикальная линия-коннектор.

### Когда применять

- Шагов 2-4 с subtitle 1-2 строки.
- Desktop ≥1024px, контентная зона ≥900px.
- Hierarchy «процесс»: заголовок — ЧТО, шаги — КАК.

### CSS

```css
.how--split .how__layout {
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;
}
.how--split .how__steps {
  list-style: none; padding: 0; margin: 0; position: relative; gap: 40px;
}
.how--split .how__steps::before {
  content: ""; position: absolute;
  left: 23px;                /* step-num.width/2 − line-width/2 = 48/2 − 2/2 */
  top: 24px; bottom: 24px;
  width: 2px;
  background: var(--bee-bg-secondary);  /* = цвет .step-num */
  z-index: 0;
}
.how--split .how__step {
  position: relative; z-index: 1; align-items: center;
}
.how--split .how__step .step-num { background: var(--bee-bg-secondary); }
@media (max-width: 1024px) {
  .how--split .how__layout { grid-template-columns: 1fr; gap: 24px; }
  .how--split .how__steps { gap: 24px; }
}
```

### Правила и тонкости

1. **Линия = продолжение кружка**: цвет `::before` **обязан совпадать** с фоном `.step-num` (surface inversion: серая страница → bg/secondary белый, белая карточка → bg/tertiary серый).
2. **`left = (step-num.width / 2) − (line-width / 2)`**: для 48px и 2px → 23px.
3. **`top/bottom = половина высоты кружка** (24px): линия в центре первого/последнего кружка.
4. **Кружок поверх линии**: `position: relative; z-index: 1` на `.how__step`. Цвета совпадают — перекрытие читается как «утолщение».
5. **Vertical center**: `align-items: center` (правило 14).
6. **Без белой подложки**: минус контейнер = минус cognitive layer.
7. **Mobile ≤1024px**: head наверх, шаги под ним. Ширина <360px и линия мешает — `display: none` на ::before.
8. **Subtitle слева**: `max-width: 36ch`.
9. **Вариация, не замена**: стандартный `.how__card` валиден среди 3+ информационных блоков; split — для блоков, где «как работает» — единственный объясняющий.

### Anti-pattern

- Линия как `<hr>` или `<div>` между шагами — ломается ритм при разной длине subtitle.
- Brand-yellow заливка кружков — `brand/primary` НИКОГДА не фон под текст (`carnica-anti-slop` P0).
- Tail линии за последним кружком («хвост» вниз).
- Sticky на head слева — переусложнение для 3 шагов (оправдано при 6+).

Cross-link: `carnica-ux-principles` §5; `examples.md` §7.

---

## 16. Edge alignment

Стандартный page side padding — **20px**. Edge-to-edge heavy blocks — **4px**.

| Контекст | Padding |
|---|---|
| Standard page side padding | 20px |
| Card-holder стопки в wallet | 4px |
| Hero полноширинные баннеры | 4px |
| Full-bleed карточки внутри модальных окон | 4px |
| Action sheet content | 4px |

Mobile frame: 375px. External card radius: 32px. External card padding: 20px. Legacy notice: 16px в старых reference notes — устаревшее; новые golden samples используют 20px.

### Согласованность text-align и положения блока

- `text-align: left` → блок прижат к **левому** краю контейнера.
- `text-align: center` → блок центрирован.
- `text-align: right` → блок прижат к правому краю.

### Проблема

Hero-блок `max-width: 760px; margin-inline: auto` внутри container 1200px → блок плавает в центре. Текст `text-align: left` начинается с левого края 760-блока, отстоящего от левого края страницы на ~260px. «Выровнено по левому краю на 1/3 экрана» — взгляд цепляется за случайную линию внутри.

### Реализация

```css
/* ❌ Плохо: блок центрирован, текст left */
.hero__copy {
  max-width: 760px;
  margin-inline: auto;   /* центрирует блок */
  text-align: left;       /* текст по левому */
}

/* ✅ Хорошо: блок прижат к левому краю container */
.hero__copy { max-width: 600px; justify-items: start; }
.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: var(--bee-spacing-1600);
}
```

### Когда `text-align: center` допустим

- Hero с центральной композицией (текст + иллюстрация **под** ним).
- Empty/error states с иконкой по центру.
- Footer disclosure под центрированным rule.

`text-align: center` идёт в паре с `align-items: center` / `margin-inline: auto`. **Никогда** не миксовать `text-align: left` с `margin-inline: auto`.

Cross-link: `carnica-ux-principles` §10; `examples.md` §9.

---

## 17. Chip spacing

Когда chip-pill стоят рядом в горизонтальный ряд (или wrap-grid), gap между ними **`4px` (`spacing/100`, `--bee-spacing-100`)**. Это даёт ощущение единой группы с минимальным «дыханием» — chip'ы читаются как один информационный блок.

| Контекст | Gap |
|---|---|
| Chip-pill ряд (hero pricing, фильтры, теги) | **4px** |
| Card-grid (cond-cards, product cards) | 16-24px (стандартный grid) |
| CTA-кнопки рядом | 12px (`spacing/300`, `--bee-spacing-300`) |
| Tag в составе строки текста | 4-8px |

### Почему 4px

- Chip — компактный информационный носитель с внутренним padding. Большой gap визуально превращает ряд chip'ов в «сетку» с лишним пустым пространством.
- 4px = одна базовая spacing-единица — минимальное разделение, при котором pill'ы не сливаются.
- Карточки и кнопки имеют другой характер «веса» — там 16-24 нужны для группировки.

### Anti-pattern

```css
/* ❌ — chip'ы как карточки, теряется ощущение единой группы */
.chips { gap: 16px; }

/* ✅ — chip'ы плотным рядом */
.chips { gap: 4px; }
```

---

## 18. Button stacking on mobile

Когда **две и более текстовых кнопки** рядом на desktop, на mobile (≤768px) они **обязаны** становиться друг под другом, full-width.

Применяется только если **обе** кнопки текстовые. Если одна icon-only (CTA + share-icon) — могут оставаться в одной строке.

```css
.cta-row { display: flex; gap: 12px; flex-wrap: wrap; }   /* desktop */
@media (max-width: 768px) {
  .cta-row { flex-direction: column; align-items: stretch; width: 100%; }
  .cta-row .btn { width: 100%; }
}
```

### Когда применяется

- Hero CTA-pair: «подключить» + «подробнее».
- Decision-кнопки: «отправить» + «отменить».
- End-state экраны: «попробовать снова» + «вернуться на главную».

### Когда НЕ применяется

- Текстовая кнопка + иконочная (CTA + share).
- Несколько icon-buttons в action-bar.
- Pill-фильтры / сегменты управления (scroll или wrap).

### Anti-pattern

```css
/* ❌ flex-wrap → кнопки слипшиеся 50/50, мелкие tap-targets */
@media (max-width: 768px) { .cta-row .btn { flex: 1 1 auto; } }
```

Cross-link: `carnica-anti-slop` → P1 Композиция.

---

## 19. Avoid bare text

**Любая связка из 2+ информационных тезисов не должна подаваться плоским абзацем.** Если контент можно разбить на пункты (фичи, шаги, преимущества, условия) — он **обязан** получить визуальный каркас.

Сухой текст после серого подзаголовка читается как «AI-заполнитель». Carnica опирается на яркие точечные акценты (icon-tile, brand-yellow ячейки, нумерованные avatar'ы).

### Когда нарушено

- Под заголовком блока 2+ предложений плоским параграфом, описывающие разные пункты.
- Большая карточка содержит только текст без визуальных якорей.
- Серый текст параграфа сразу после серого subtitle (визуально сливается).

### Как чинить — три решения

| Тип контента | Композиция | Carnica-компоненты |
|---|---|---|
| **Последовательность шагов** | stack, каждый шаг = цифра в avatar (`view=text, color=brand`) + заголовок + описание | `avatar 3.0/4.0 view=text`, `cell 3.1` |
| **Список преимуществ / фичей** | 2-4 chip-pill в ряд или 3 card-grid; иконка + короткий текст | hero-style chip, `cond-card`, `cell grid 2.1` |
| **Сравнение «было / стало»** | две колонки/карточки, у каждой свой icon-tile (нейтральный + brand) | `card medium 2.1`, `banner 2.1` |

### Минимальный набор визуальных якорей

- **icon-tile** 32×32 / 56×56 со скруглением (`radius/400 = 16` или `radius/200 = 8`), фон `elements/secondary` или `brand/primary`.
- **avatar `view=text`** 32-48px с цифрой для шагов; цвет `brand/primary`.
- **chip-pill** с иконкой слева и коротким текстом.
- **карточка** с padding 20-32, иконкой сверху.

### Чего избегать

- Лонгридный `body/paragraph/*` блок без визуальной структуры, если это не статья или юридический текст.
- Bullet-список простыми точками `•` — «email-стиль», не Carnica.
- Параграф `content/secondary` сразу после subtitle того же цвета.
- «Сухой» list-разделитель `<br>`-ами.

### Алгоритм

1. Контент разбивается на 2+ пунктов? → композиция из таблицы выше.
2. Одна цельная мысль ≤2 строк? → параграф.
3. Параграф 3+ строк, одна мысль? → оберни в карточку с акцентным элементом.

Cross-link: `carnica-anti-slop` → P1 Композиция.

---

## 20. Forms with keyboard

GS-4 pattern.

- **Form content side padding**: `20px`.
- **Inputs reset internal padding** when inside form wrapper.
- **Half-width inputs** идут в HORIZONTAL row с consistent gap.
- **Keyboard overlays content**: не treat keyboard как part of content scroll.
- **Numeric keyboard CTA**: использует keyboard internal button.

### `iOS_NumericKeyboard` — встроенная CTA

`iOS_NumericKeyboard` содержит `button 2.1` внутри. При `button#931:1: true` показывается CTA-кнопка над клавиатурой. Не нужен отдельный button компонент.

Настройка кнопки:
```js
const cta = keyboard.findOne(n => n.name === 'button 2.1');
cta.setProperties({/* свойства */});
```

Cross-link: `carnica-components` → input 2.3, iOS_NumericKeyboard.

---

*Owner: `carnica-visual-patterns` skill (D-08 leaves rule).*
