# Typography — anti-patterns, до/после, audit checklist

Конкретные сценарии «до/после», anti-patterns с пояснениями, CSS-патч примеры, migration от legacy-привычек (Bold, CAPS, justified) к Carnica-конвенциям. Audit checklist для финального QA. Для практических правил без примеров — `SKILL.md`. Для теоретических обоснований — `references/theory.md` и `references/wcag.md`.

## TOC

1. Анти-паттерны контраста
2. CSS-патч примеры
3. Examples — display vs headline vs body
4. Examples — alignment
5. Migration примеры — типичные ошибки legacy
6. Audit checklist (15 пунктов)

---

## 1. Анти-паттерны контраста

### Brand/primary как цвет текста на светлом фоне

```tsx
// ❌ Плохо: 1.7:1, текст нечитаем
<span style={{color: '#FFC800'}}>оплачено</span>

// ✅ Хорошо: жёлтый — это фон, не цвет текста
<span className="bg-brand-primary text-content-primary px-2 rounded-pill">
  оплачено
</span>
```

Контраст #FFC800 на белом — 1.7:1, на сером #F0F3F5 — 1.5:1. WCAG fail на любом уровне.

### Caption для основной информации

```tsx
// ❌ Плохо: caption/medium 13 для баланса
<div className="text-caption-md">1 400 ₽</div>

// ✅ Хорошо: display/small 32 — баланс это главная ценность экрана
<div className="text-display-sm">1 400 ₽</div>
```

`caption/medium 13` для главной информации ломает иерархию. Caption = метаданные, timestamps, badge.

### body/small для статьи или лонгрида

```tsx
// ❌ Плохо: LH 1.25 на статье
<p className="text-body-sm">{articleText /* 200 слов */}</p>

// ✅ Хорошо: body/paragraph/small с LH 1.5
<p className="text-body-paragraph-sm max-w-[65ch]">{articleText}</p>
```

LH 1.25 на long-form чтении приводит к слипанию строк, нарушает WCAG 1.4.8 AAA (LH ≥1.5). Для обычного UI-текста, даже многострочного, остаётся `body/*`.

### Разные LH-ratio в одной иерархии

```tsx
// ❌ Плохо: card title 1.2 + subtitle 1.5 — ломает rhythm
<h3 style={{lineHeight: 1.2}}>Заголовок</h3>
<p style={{lineHeight: 1.5}}>описание</p>

// ✅ Хорошо: одна LH-family
<h3 className="text-body-md">Заголовок</h3>   {/* LH 1.30 */}
<p className="text-body-sm">описание</p>      {/* LH 1.25 */}
```

В одной карточке/секции — одна LH-family (`body/*` группа).

---

## 2. CSS-патч примеры

### text-wrap: balance для H1-H3

```css
/* CSS4 — баланс последних строк заголовка */
h1, h2, h3 {
  text-wrap: balance;
}

/* Chrome ограничивает ~6 строк — выше не работает */
```

Без `balance` длинный заголовок может оставить одно слово на последней строке («orphan» в типографике). С `balance` строки делятся равномерно.

### text-wrap: pretty для параграфов

```css
p, .prose {
  text-wrap: pretty;
}
```

Убирает orphans в параграфах (одно слово на последней строке) без замораживания layout как `balance`.

### tabular-nums для финансовых блоков

```tsx
// ❌ Плохо: proportional цифры — цены не выровнены
<div>
  <div>1 199 ₽</div>
  <div>132 690 ₽</div>
</div>

// ✅ Хорошо: tabular-nums — колонка выравнивается по разряду
<div className="tabular-nums">
  <div>1 199 ₽</div>
  <div>132 690 ₽</div>
</div>
```

Применять: цены в списке, счётчики, таймеры (`0:09 → 0:10`), табличные данные.

### text-align: start/end для RTL-readiness

```css
/* ❌ Плохо: физическое выравнивание — ломается при RTL */
.label { text-align: left; }
.price { text-align: right; }

/* ✅ Хорошо: логическое — автоматически зеркалится */
.label { text-align: start; }
.price { text-align: end; }
.hero  { text-align: center; }  /* center нейтрален */
```

Tailwind: `text-start` / `text-end` вместо `text-left` / `text-right`.

### max-width: 65ch для reading-блоков

```css
.article-body,
.terms-content,
.help-article,
.privacy-policy {
  max-width: 65ch;     /* масштабируется с font-size */
  text-wrap: pretty;
  line-height: 1.5;
}
```

`ch` (не `px`) — при user zoom 200% (WCAG 1.4.4) `65ch` остаётся 65 знаков.

---

## 3. Examples — display vs headline vs body

| Сценарий Carnica | Стиль | Почему |
|---|---|---|
| Hero на главной — «1 400 ₽» баланс | `display/small 32` | Ключевой акцент экрана |
| Hero «подключайте тариф» — короткий промо | `display/small 32` или `display/medium 40` (mobile/web) | impact + 2-3 слова |
| Page title APP «Илья Абрамов» (compact nav) | `body/accent/large 24` (в navbar 3.0) | Компонент задаёт |
| Page title APP standalone hero «безопасность» | `body/accent/large 24` (в составе title 2.1) | В готовом компоненте |
| Page title WEB «ваш заказ» | `display/medium 40` | WEB H1 default |
| Section title в карточке «способ получения» | `body/accent/medium 20` | Раздел внутри блока |
| Card title «мой тариф» | `body/accent/medium 20` | Заголовок плотной карточки |
| Cell title «переустановить eSIM» | `body/accent/small 16` (внутри cell 3.1) | Компонент задаёт |
| Cell subtitle «eSIM • основная» | `body/small 16` content/secondary | Метаданные, 1 строка |
| Статья / лонгрид (200 слов) | `body/paragraph/small 16/24` | Режим последовательного чтения |
| Dialog title «удалить?» | `body/large 24` | Carnica convention |
| Dialog body (1 предложение) | `body/small 16` | UI-текст, не reading |
| Snackbar «оплачено» | `body/small 16` | Пиковое внимание, всегда body/small |
| Timestamp «23 апреля, 15:14» | `caption/medium 13` | Метаданные |
| Badge number «3» | `caption/medium 13` | Badge convention |

### Длинный заголовок (5+ слов)

```tsx
// ❌ Плохо: display/medium 40 для длинного заголовка
<h1 className="text-display-md">подключите выгодный тариф для всей семьи прямо сейчас</h1>

// ✅ Хорошо: понизить роль display → headline → body
<h1 className="text-headline-sm max-w-[65ch] text-balance">
  подключите выгодный тариф для всей семьи прямо сейчас
</h1>
```

Display для длинного текста ломает hero-эффект. Понижаем размер до `headline/small` или даже `body/large`.

---

## 4. Examples — alignment

### Cell с value справа (table-style)

```tsx
<div className="flex justify-between">
  <span className="text-start text-body-sm">баланс</span>
  <span className="text-end tabular-nums text-body-sm">1 199 ₽</span>
</div>
```

Title — `start` (left в LTR), value — `end` (right в LTR), `tabular-nums` для выравнивания цифр.

### Статья / лонгрид — всегда left

```tsx
// ❌ Плохо: center на длинном тексте
<p className="text-center text-body-paragraph-sm">{articleText}</p>

// ✅ Хорошо: left, max-width 65ch
<p className="text-start text-body-paragraph-sm max-w-[65ch] text-pretty">
  {articleText}
</p>
```

Center на reading-параграфе — левый край «плавает», глаз теряет return point. Запрещено для статей, лонгридов, T&C и long-form.

### Hero на splash — center допустим

```tsx
// Короткий hero (1-3 строки) — center работает
<div className="text-center">
  <h1 className="text-display-sm">с возвращением</h1>
  <p className="text-body-sm text-content-secondary">войдите в свой номер</p>
</div>
```

Splash, welcome, empty state, navbar title — center допустим (1-3 строки, симметрично).

### Dialog — left (Carnica convention)

Carnica 2.1 dialog: title и body всегда `text-start`. Center в dialog — анти-паттерн (нарушает convention).

### Justified — никогда

`text-align: justify` запрещён в UI всегда. «Реки» пустот, BDA Dyslexia 2023 запрещает, чтение замедляется на 13-18% у дислексиков.

---

## 5. Migration примеры — типичные ошибки legacy

### От reflexive Bold к Carnica Regular + size compensation

```tsx
// ❌ Legacy reflexive Bold для emphasis
<p>описание тарифа: <strong>безлимитный</strong> интернет</p>

// ✅ Carnica — эмфазис через структуру, не Bold
<div>
  <h3 className="text-body-md">безлимитный интернет</h3>
  <p className="text-body-sm text-content-secondary">описание тарифа</p>
</div>

// Или: tag с brand background
<p>описание тарифа <Tag tone="brand">безлимитный</Tag> интернет</p>
```

BeelineSans не имеет Bold (700) — `<strong>` даёт fallback на системный шрифт.

### От justified text к left-aligned

```tsx
// ❌ Legacy print-style justified
<article style={{textAlign: 'justify'}}>{longArticle}</article>

// ✅ Carnica left + measure + LH
<article className="text-start max-w-[65ch] text-body-paragraph-sm text-pretty">
  {longArticle}
</article>
```

### От uppercase UI к lowercase + tag tone=brand

```tsx
// ❌ Legacy CAPS для emphasis
<button className="uppercase tracking-widest">ОФОРМИТЬ ЗАКАЗ</button>

// ✅ Carnica lowercase + button 2.5 primary
<Button priority="primary">оформить заказ</Button>
```

CAPS запрещён в UI (`ux-principles.md §15`), `tracking-*` запрещён на body-тексте, `<strong>` — fallback.

### От fixed-width к 65ch

`max-width: 640px` (legacy, не масштабируется при user zoom) → `max-width: 65ch` (масштабируется с font-size).

### От Bold для счётчика к tabular-nums

`fontWeight: bold` для «выделения» цифр → `font-variant-numeric: tabular-nums` (`tabular-nums` в Tailwind). Цифры одинаковой ширины, счётчик не «прыгает».

---

## 6. Audit checklist (15 пунктов)

Финальный QA по типографике перед сдачей. Группы по темам — Иерархия / Веса / Line-height / Выравнивание / Accessibility / CSS-технические.

### Иерархия и стили

- [ ] На экране не более 4 уровней иерархии (пар `токен + color`)
- [ ] Между соседними уровнями меняется один параметр (size ИЛИ color)
- [ ] Size-jumps ≥1.5× (лучше 2×)
- [ ] `brand/primary` не используется как цвет текста на светлом фоне
- [ ] Все стили через Carnica-токены, не «на глаз»

### Веса и стилизация

- [ ] Только Regular 400 в новых текстах (через `createStyledText` / прямой CSS)
- [ ] Medium 500 — только внутри готовых компонентов (button, cell, tag, title)
- [ ] Нет `<strong>` / `<b>` с visual bold
- [ ] Lowercase везде (кроме имён, брендов, аббревиатур eSIM/SMS/QR)
- [ ] Нет `text-transform: uppercase`, нет `letter-spacing` для CAPS-имитации

### Line-height и measure

- [ ] Лонгриды, статьи, юридические тексты → `body/paragraph/*`
- [ ] UI-текст, включая многострочные описания → `body/*` или `caption`
- [ ] CSS использует **unitless** line-height (`1.4`, не `24px` / `150%`)
- [ ] Desktop paragraph → `max-width: 65ch`
- [ ] Mobile — measure не контролировать

### Выравнивание

- [ ] Списки / формы / settings → left
- [ ] Reading-параграфы → left
- [ ] Числовые колонки → right (`text-end` + `tabular-nums`)
- [ ] Justify нигде
- [ ] Dialog → left (Carnica convention)
- [ ] `text-align: start/end` в CSS (RTL-ready)

### Accessibility

- [ ] Заголовки — настоящие `<h*>`-теги (не `<div>` со стилем)
- [ ] Читаемый текст ≥16px; 13px только для caption
- [ ] 200% zoom работает без срезов (WCAG 1.4.4)
- [ ] Длинные параграфы LH ≥1.5 (WCAG 1.4.8 AAA)
- [ ] Grayscale тест — статусы понятны без цвета

### CSS-технические

- [ ] `letter-spacing: 0` по умолчанию (нет `tracking-*` на body-тексте)
- [ ] Числовые значения в колонках → `tabular-nums`
- [ ] `text-wrap: balance` для H1-H3
- [ ] `text-wrap: pretty` для параграфов
- [ ] `font-weight` только 400 или 500

### Единицы и числа

- [ ] Единицы измерения строчными: «гб», «мбит», «ггц», «тб», «мин»
- [ ] Десятичный разделитель — запятая
- [ ] Тысячи — пробелом, не запятой
- [ ] Неразрывный пробел перед единицей и валютой
- [ ] Без точек в конце коротких подписей и кнопок
