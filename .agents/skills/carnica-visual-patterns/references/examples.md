# Visual Patterns — до/после, типичные баги, anti-patterns

Конкретные «до/после» примеры для топовых паттернов, разбор типичных багов, anti-patterns с пояснениями. Для самих правил — `SKILL.md`. Для полных спецификаций — `patterns-full.md`.

## TOC

1. [Hero composition — до и после](#1-hero-composition--до-и-после)
2. [Dots progress — анти-паттерны направления](#2-dots-progress--анти-паттерны-направления)
3. [Wallet — стопка против flat](#3-wallet--стопка-против-flat)
4. [Asymmetric card grid — конкретные пары](#4-asymmetric-card-grid--конкретные-пары)
5. [State-morph — crossfade vs textContent](#5-state-morph--crossfade-vs-textcontent)
6. [Avatar + text — common bug «padding-top hack»](#6-avatar--text--common-bug-padding-top-hack)
7. [Numbered steps — split vs stacked](#7-numbered-steps--split-vs-stacked)
8. [Final CTA — image fit антипаттерн](#8-final-cta--image-fit-антипаттерн)
9. [Edge alignment — text-align vs block position](#9-edge-alignment--text-align-vs-block-position)

---

## 1. Hero composition — до и после

### Анти-паттерн: микс `hero-split` и `hero-floating-corners`

Используй `hero-split` если у продукта есть конкретный визуальный объект (устройство, упаковка). Используй `hero-floating-corners` если продукт абстрактный (условия тарифа, оплата, переносы). Не миксовать обе композиции в одном лендинге.

```html
<!-- ❌ Плохо: lending для тарифа (абстрактный продукт), но использован hero-split -->
<section class="hero hero--split">
  <div class="hero__inner">
    <div class="hero__copy">…</div>
    <div class="hero__visual">
      <!-- generic Midjourney «трубка с молнией» — не передаёт суть -->
      <img src="abstract.png" />
    </div>
  </div>
</section>

<!-- ✅ Хорошо: hero-floating-corners с метафорой «монеты ↔ деньги» -->
<section class="hero hero--floating-corners">
  <div class="hero__inner">
    <h1 class="title-21__title">переноси остаток на следующий месяц</h1>
    <p class="title-21__subtitle">…</p>
    <button class="btn btn--primary">подключить</button>
  </div>
  <div class="hero__deck" aria-hidden="true">
    <div class="coin coin--tr-a"></div>
    <div class="coin coin--bl-a"></div>
    <div class="coin coin--bl-b"></div>
  </div>
</section>
```

### Анти-паттерн: декорации симметрично top↔bottom без диагонали

```html
<!-- ❌ Плохо: top-left + top-right (одна горизонталь, нет полёта) -->
<div class="hero__deck">
  <div class="coin coin--tl-a"></div>
  <div class="coin coin--tr-a"></div>
</div>

<!-- ✅ Хорошо: диагональ top-right + bottom-left -->
<div class="hero__deck">
  <div class="coin coin--tr-a"></div>
  <div class="coin coin--bl-a"></div>
  <div class="coin coin--bl-b"></div>
</div>
```

Симметричные top+bottom без диагонали ломают визуальный «полёт». Диагональ даёт ощущение динамики.

---

## 2. Dots progress — анти-паттерны направления

### Анти-паттерн: разделение по рядам (сверху/снизу)

НЕ разделяй цветные и серые точки по рядам — только по колонкам.

```js
// ❌ Плохо: верхний ряд — цветные, нижний — серые
// Глаз не считывает «оставшееся vs потраченное» — кажется, что это два разных параметра
const rowYellow = dots.slice(0, count);  // верхний ряд
const rowGray = dots.slice(count);       // нижний ряд

// ✅ Хорошо: один ряд, цветные слева, серые справа
const threshold = Math.round(remaining / total * totalColumns);
dots.forEach((dot, i) => {
  dot.fill = i <= threshold ? brandPrimary : contentTertiary;
});
```

### Анти-паттерн: цветные справа (RTL вместо LTR)

```js
// ❌ Плохо: цветные точки справа (потраченное визуально нарастает справа налево)
const threshold = totalColumns - Math.round(remaining / total * totalColumns);
dots.forEach((dot, i) => {
  dot.fill = i >= threshold ? brandPrimary : contentTertiary;
});

// ✅ Хорошо: цветные точки слева (оставшееся читается LTR)
const threshold = Math.round(remaining / total * totalColumns);
dots.forEach((dot, i) => {
  dot.fill = i <= threshold ? brandPrimary : contentTertiary;
});
```

В Carnica/Beeline всегда LTR: жёлтые слева = оставшееся, серые справа = потраченное. Это конвенция, не выбор дизайнера.

---

## 3. Wallet — стопка против flat

### Анти-паттерн: collapsed cards как обычные дети auto-layout

```js
// ❌ Плохо: collapsed cards добавлены как обычные дети — стопка ломается, всё стэкается вертикально
mainFrame.appendChild(selectedCard);
mainFrame.appendChild(fastActions);
mainFrame.appendChild(collapsedCardFar);
mainFrame.appendChild(collapsedCardMiddle);
mainFrame.appendChild(collapsedCardNear);
// → каждая card занимает свою строку, нет ощущения «колоды»

// ✅ Хорошо: collapsed cards через ABSOLUTE positioning
mainFrame.appendChild(selectedCard);
mainFrame.appendChild(fastActions);

[
  {card: collapsedCardFar, width: 297.27, top: 712, radius: 25.92},
  {card: collapsedCardMiddle, width: 330.3, top: 722, radius: 28.8},
  {card: collapsedCardNear, width: 367, top: 732, radius: 32}
].forEach(({card, width, top, radius}) => {
  mainFrame.appendChild(card);
  card.layoutPositioning = 'ABSOLUTE';
  card.resize(width, card.height);
  card.x = (375 - width) / 2;
  card.y = top;
  card.cornerRadius = radius;
});
```

Без ABSOLUTE positioning стопка превращается в плоский вертикальный список. Эффект «колоды» теряется. Main frame `clipsContent=true` + `h=812` обрезает низ — пользователь видит только верхние ~80px самой ближней collapsed card.

---

## 4. Asymmetric card grid — конкретные пары

### Анти-паттерн: обе карточки FILL в двухрядной композиции

```js
// ❌ Плохо: одинаковая ширина в обоих рядах — монотонная сетка
row1.layoutWrap = 'WRAP';
row1.children[0].layoutSizingHorizontal = 'FILL';
row1.children[1].layoutSizingHorizontal = 'FILL';
row2.children[0].layoutSizingHorizontal = 'FILL';
row2.children[1].layoutSizingHorizontal = 'FILL';

// ✅ Хорошо: 43/57 + 57/43 — визуальный ритм
row1.layoutWrap = 'WRAP';
row1.children[0].layoutSizingHorizontal = 'FIXED';
row1.children[0].resize(144, row1.children[0].height);  // 43% от ~335px → ~144px
row1.children[1].layoutSizingHorizontal = 'FILL';

row2.children[0].layoutSizingHorizontal = 'FILL';
row2.children[1].layoutSizingHorizontal = 'FIXED';
row2.children[1].resize(144, row2.children[1].height);
```

### Когда обе FILL — правильно

```js
// ✅ Одиночный ряд без соседнего ряда — обе FILL (50/50)
soloRow.children[0].layoutSizingHorizontal = 'FILL';
soloRow.children[1].layoutSizingHorizontal = 'FILL';
```

Правило: 2 ряда подряд → асимметрия (43/57 + 57/43). 1 ряд (без соседнего) → симметрия (50/50).

---

## 5. State-morph — crossfade vs textContent

### Анти-паттерн: менять `textContent` через JS

```html
<button class="copy-btn">скопировать</button>
```

```js
// ❌ Плохо: меняем textContent — width прыгает, focus теряется, нет CSS-transition
btn.addEventListener('click', function () {
  navigator.clipboard.writeText(code);
  btn.textContent = 'скопировано';
  setTimeout(() => btn.textContent = 'скопировать', 1500);
});
```

Что плохо:
- Width прыгает между «скопировать» (114px) и «скопировано» (118px) — кнопка дёргается.
- Focus теряется на mid-transition.
- Нет визуальной анимации — пользователь не видит «процесс».
- Screen reader не озвучивает изменение надёжно.

### Решение: crossfade двух слоёв

```html
<button class="copy-btn" data-copy-code="DISCO" aria-live="polite">
  <span class="copy-state copy-state--default">
    <svg>…icon-copy…</svg>
    <span>скопировать</span>
  </span>
  <span class="copy-state copy-state--done" aria-hidden="true">
    <svg>…icon-check…</svg>
    <span>скопировано</span>
  </span>
</button>
```

```css
.copy-btn {
  display: inline-grid;
  isolation: isolate;
}
.copy-btn .copy-state {
  grid-area: 1 / 1;  /* стэк в одной cell */
  transition: opacity 180ms, transform 180ms, filter 180ms;
}
.copy-btn .copy-state--done { opacity: 0; transform: scale(0.94); filter: blur(4px); pointer-events: none; }
.copy-btn[data-copied="true"] .copy-state--default { opacity: 0; transform: scale(1.06); filter: blur(4px); }
.copy-btn[data-copied="true"] .copy-state--done { opacity: 1; transform: scale(1); filter: blur(0); pointer-events: auto; }
```

```js
btn.addEventListener('click', function () {
  navigator.clipboard.writeText(code).then(() => {
    btn.setAttribute('data-copied', 'true');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => btn.removeAttribute('data-copied'), 1500);
  });
});
```

Что хорошо:
- Width = max(default, done) автоматически через `inline-grid` — кнопка не дёргается.
- CSS-transition даёт плавный crossfade.
- `aria-live="polite"` озвучивает новый текст.
- `pointer-events: none` на скрытом слое — клики правильно проходят.

### Анти-паттерн: `position: absolute` для стэка

```css
/* ❌ Плохо: коллапс высоты кнопки */
.copy-btn { position: relative; }
.copy-btn .copy-state--default { position: relative; }
.copy-btn .copy-state--done { position: absolute; top: 0; left: 0; }
```

Кнопка коллапсирует по высоте — оба слоя становятся вне нормального потока. `inline-grid` — единственный правильный способ.

---

## 6. Avatar + text — common bug «padding-top hack»

### Типичный баг: `padding-top` на тексте для центрирования

```css
/* ❌ Плохо: ad-hoc хак */
.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.feature-card .feature-card__text {
  padding-top: 12px;  /* пытаемся опустить текст */
}
.feature-card .feature-card__avatar {
  width: 48px; height: 48px;
}
```

Что ломается:
- При изменении кружка на 32px нужен другой `padding-top` (8px вместо 12px).
- При 4-строчном тексте `padding-top: 12px` визуально съезжает — кружок не в центре блока.
- На mobile, где text wrap'ится в 2 строки вместо 1, padding-top даёт другое смещение.
- Каждый кейс в проекте требует своего pt — не масштабируется.

### Решение: `align-items: center`

```css
/* ✅ Хорошо: одна строка решения */
.feature-card {
  display: flex;
  align-items: center;
  gap: 16px;
}
.feature-card .feature-card__text {
  /* никаких padding-top */
}
```

Работает одинаково для:
- 1-строчного текста: центр кружка по центру строки.
- 4-строчного текста: центр кружка по центру блока (читается как «связанный со всем текстом»).
- Любого размера кружка (24px / 32px / 48px / 56px).
- Любого breakpoint'а.

### Исключение: длинный текст с обязательной alignment к первой строке

```css
/* ✅ Только для article-like текста с акцентом на заголовок */
.faq-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
  align-items: start;  /* иконка ? прибита к первому слову вопроса */
}
.faq-item .faq-item__icon {
  align-self: start;
}
```

Это **другой паттерн** (grid с явной колонкой для иконки), не «flex-row с центрированием».

---

## 7. Numbered steps — split vs stacked

### Когда применять split layout

- Шагов 2-4.
- Desktop ≥1024px, контентная зона ≥900px.
- Hierarchy блока — «процесс»: заголовок объясняет ЧТО, шаги — КАК.

```html
<!-- ✅ Split layout: head слева, steps справа -->
<section class="how how--split">
  <div class="container how__layout">
    <header class="how__head title-21 title-21--l">
      <h2>как это работает</h2>
      <p>подключение за 3 шага</p>
    </header>
    <ol class="how__steps">
      <li class="how__step"><span class="step-num">1</span><div>…</div></li>
      <li class="how__step"><span class="step-num">2</span><div>…</div></li>
      <li class="how__step"><span class="step-num">3</span><div>…</div></li>
    </ol>
  </div>
</section>
```

### Когда стандартный stacked

- Блок один из 3+ информационных блоков подряд (условия → как → отзывы) — split создаёт ложную иерархию.
- Контентная зона <900px.
- Шагов 5+.

```html
<!-- ✅ Stacked layout: head сверху, white card со шагами снизу -->
<section class="how">
  <div class="container">
    <header class="how__head title-21 title-21--l">…</header>
    <div class="how__card">
      <ol class="how__steps">…</ol>
    </div>
  </div>
</section>
```

### Анти-паттерн: линия-коннектор как `<hr>`

```html
<!-- ❌ Плохо: <hr> между шагами — ломается ритм при разной длине subtitle -->
<ol class="how__steps">
  <li class="how__step">1 …</li>
  <hr class="how__line">
  <li class="how__step">2 …</li>
  <hr class="how__line">
  <li class="how__step">3 …</li>
</ol>
```

Если первый шаг имеет 1 строку subtitle, второй — 3 строки, `<hr>` стоит на разных вертикальных позициях относительно кружков. Линия рвётся визуально.

```css
/* ✅ Хорошо: ::before на родителе с absolute positioning */
.how__steps::before {
  content: "";
  position: absolute;
  left: 23px;
  top: 24px; bottom: 24px;
  width: 2px;
  background: var(--bee-bg-secondary);
  z-index: 0;
}
.how__step { position: relative; z-index: 1; }
```

Линия рисуется через `::before`, кружки лежат поверх (z-index). Цвет линии = цвет фона кружка — перекрытие читается как «утолщение».

### Анти-паттерн: brand-yellow кружки

```html
<!-- ❌ Плохо: brand-yellow заливка step-num с тёмным текстом — anti-slop P0 -->
<span class="step-num" style="background: #FFC800; color: #28303F">1</span>
```

`brand/primary` НИКОГДА не используется как фон под текст (см. `carnica-anti-slop` P0). Кружок должен иметь background = surface inversion (на серой странице → `bg/secondary` белый, в белой карточке → `bg/tertiary` серый).

---

## 8. Final CTA — image fit антипаттерн

### Анти-паттерн: `height: 100%` + `aspect-ratio: 1/1`

```css
/* ❌ Плохо: circular dependency, image обрезается снизу нестабильно */
.final-cta__visual {
  height: 100%;
  aspect-ratio: 1 / 1;
  width: auto;
}
```

Browser резолвит это так:
1. `height: 100%` → нужна высота grid track.
2. Grid track зависит от высоты `.final-cta__visual`.
3. `.final-cta__visual` высота = width / aspect-ratio.
4. `width: auto` — зависит от высоты grid track.

Circular dependency. На разных viewport'ах резолвится по-разному → image обрезается снизу нестабильно.

### Решение: width-based square

```css
/* ✅ Хорошо: width вытекает из card padding, height вытекает из width */
.final-cta__card {
  padding: var(--bee-spacing-1600); /* 64px */
  max-height: 444px;
  overflow: hidden;
}
.final-cta__visual {
  width: min(calc(444px - 2 * var(--bee-spacing-1600)), 100%);
  /* = min(316px, 100%) */
  aspect-ratio: 1 / 1;
}
.final-cta__visual img {
  width: 100%; height: 100%; object-fit: contain;
}
```

Логика:
1. Card max-height 444px, padding 64px → padded зона = 316px.
2. Visual width = min(316px, 100%) — квадрат 316px на широких viewport'ах, ширина column на узких.
3. Aspect-ratio 1/1 → height = width (≤ 316px).
4. Высота квадрата всегда ≤ padded высоты card → нет overflow снизу.

### Анти-паттерн: использование `content/primary` для background

```css
/* ❌ Плохо: content/primary это цвет ТЕКСТА, не background */
.final-cta__card {
  background: var(--bee-content-primary);  /* #28303F */
  color: #fff;
}
```

Семантическая ошибка. `content/primary` (#28303F) и `background/secondary fake-invert` (#202632) визуально близки, но семантически разные.

```css
/* ✅ Хорошо: правильный токен для inverse-accent background */
.final-cta__card {
  background: var(--bee-background-secondary-fake-invert);  /* #202632 */
  color: #fff;
}
:root { --bee-background-secondary-fake-invert: #202632; }
```

При миграции в Figma-токены семантическая аккуратность важна.

---

## 9. Edge alignment — text-align vs block position

### Анти-паттерн: `text-align: left` + `margin-inline: auto`

```css
/* ❌ Плохо: блок центрирован, текст в нём left-aligned */
.hero__copy {
  max-width: 760px;
  margin-inline: auto;       /* центрирует блок */
  text-align: left;          /* текст по левому */
}
```

Hero-блок 760px внутри container 1200px → блок плавает в центре. Текст внутри начинается с левого края этого 760-блока, который сам отстоит от левого края страницы на ~260px. Получается «выровнено по левому краю на 1/3 экрана».

### Решение: блок прижат к левому краю

```css
/* ✅ Хорошо: блок начинается с левого края контейнера */
.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: var(--bee-spacing-1600);
}
.hero__copy {
  max-width: 600px;
  justify-items: start;        /* в grid-context — прижимает к началу */
}
```

Теперь край текста = край контейнера (с учётом standard page padding 20px / 40px). Глаз цепляется за реальный край интерфейса.

### Когда `text-align: center` правильно

```css
/* ✅ Хорошо: hero-floating-corners — симметричная композиция */
.hero hero--floating-corners {
  display: grid;
  place-items: center;
}
.hero__inner {
  text-align: center;
  margin-inline: auto;         /* центрирует блок */
  max-width: 720px;
}
```

Симметрия — приём. Текст + иллюстрация под ним (или декорации в углах) выровнены по центру. `text-align: center` + `margin-inline: auto` работают в паре.

### Правило

```
text-align: left   → блок прижат к левому краю контейнера
text-align: center → блок центрирован в контейнере (margin-inline: auto или place-items: center)
text-align: right  → блок прижат к правому краю
```

Никогда не миксовать `text-align: left` с `margin-inline: auto`.

---

*Owner: `carnica-visual-patterns` skill (D-08 leaves rule).*
