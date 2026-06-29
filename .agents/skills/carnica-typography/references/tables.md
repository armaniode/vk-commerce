# Typography — полные lookup-таблицы

Полные справочные таблицы Carnica: 17 стилей × LH × use, type scale ratios (сравнение с индустрией), карта 15 ситуаций «когда какой стиль», CSS-правила, единицы измерения, display-стили по viewport'ам. Для практических правил без таблиц — `SKILL.md`. Для теоретических обоснований — `references/theory.md`.

## TOC

1. Carnica typography — 17 стилей (полная таблица)
2. Type scale ratios — Carnica vs индустрия
3. Карта «когда какой стиль» — 15 ситуаций
4. Line-height map — 17 стилей × контекст
5. Letter-spacing — индустриальные правила по размерам
6. Line length / measure — по контекстам
7. CSS-правила типографики Carnica (полная таблица)
8. Единицы измерения — полные правила сокращений
9. Display-стили на разных viewport'ах

---

## 1. Carnica typography — 17 стилей (полная таблица)

| Стиль | Size px | LH px | Unitless | Weight | Use case |
|---|---|---|---|---|---|
| `display/large` | 56 | 66 | 1.18 | 400 | WEB hero only (≥1024), splash |
| `display/medium` | 40 | 48 | 1.20 | 400 | WEB H1, mobile key value |
| `display/small` | 32 | 36 | 1.13 | 400 | Universal: mobile hero, balance, WEB H2 |
| `display/extrasmall` | 16 | 22 | 1.38 | 400 | Артефакт наименования — НЕ использовать |
| `headline/medium` | 40 | 40 | 1.00 | 400 | Page title tight-set, web |
| `headline/small` | 24 | 24 | 1.00 | 400 | Page title в скролле (1-2 строки) |
| `body/large` | 24 | 28 | 1.17 | 400 | Крупные числа, dialog title |
| `body/accent/large` | 24 | 28 | 1.17 | **500** | В готовых компонентах |
| `body/medium` | 20 | 26 | 1.30 | 400 | Section title, navbar title, menu |
| `body/accent/medium` | 20 | 26 | 1.30 | **500** | В готовых компонентах |
| `body/small` | 16 | 20 | 1.25 | 400 | Основной UI текст, cell title/subtitle |
| `body/accent/small` | 16 | 20 | 1.25 | **500** | В готовых компонентах (button label) |
| `body/paragraph/large` | 24 | 36 | 1.50 | 400 | Лонгрид/статья, крупный reading-текст |
| `body/paragraph/medium` | 20 | 30 | 1.50 | 400 | Лонгрид/статья, средний reading-текст |
| `body/paragraph/small` | 16 | 24 | 1.50 | 400 | Лонгриды, статьи, юридические тексты |
| `caption/medium` | 13 | 16 | 1.23 | 400 | Timestamps, badge, метаданные |
| `caption/accent/medium` | 13 | 16 | 1.23 | **500** | Badge, акцентная подпись внутри компонентов |

**Notes:**
- Weight 500 (`*/accent/*`) — только внутри готовых Figma-компонентов (button 2.5, cell 3.1, tag 2.3, title 2.1)
- `display/extrasmall 16` — семантический разрыв (16 это body-размер). Для 16px-контента использовать `body/small`
- `caption/medium 13` — редкое значение (большинство систем 12 или 14), но часть Carnica brand identity

---

## 2. Type scale ratios — Carnica vs индустрия

Carnica шкала 13 → 16 → 20 → 24 → 32 → 40 → 56:

| Переход | Ratio | Ближайший канон |
|---|---|---|
| 13→16 | 1.231 | ≈ major 2nd+ |
| 16→20 | 1.250 | major 3rd |
| 20→24 | 1.200 | minor 3rd |
| 24→32 | 1.333 | perfect 4th |
| 32→40 | 1.250 | major 3rd |
| 40→56 | 1.400 | ≈ augmented 4th |

| Система | Размеров | Ratio коридор |
|---|---|---|
| Material 3 | 15 токенов | 1.125-1.333 |
| Apple HIG | 10 Dynamic Type styles | 1.06-1.27 |
| Tailwind | 13 размеров | ~1.25 |
| Carnica | 7 размеров | 1.20-1.40 (гибрид) |

Carnica — sweet spot 6-8 (Refactoring UI / Every Layout). Расширять шкалу не нужно.

---

## 3. Карта «когда какой стиль» — 15 ситуаций

Полная таблица из `typography-principles.md §3`:

| # | Ситуация | По умолчанию | Диапазон | Что двигает выбор |
|---|---|---|---|---|
| 1 | Page title APP | `display/small 32` | body/small 16 ↔ display/small 32 | Compact nav vs standalone hero |
| 2 | Page title WEB | `display/medium 40` | headline/small 24 ↔ display/medium 40 | Контентная vs маркетинговая |
| 3 | Section header (label над блоком) | `body/small 16` | body/small 16 ↔ body/medium 20 | Нужен ли визуальный якорь |
| 4 | Card header | `body/medium 20` | body/small 16 ↔ body/large 24 | Плотность карточки |
| 5 | Balance / key number | `display/small 32` | body/large 24 ↔ display/medium 40 | Ключевой акцент экрана или блока |
| 6 | Description под заголовком | `body/small 16` | body/small 16 | Вариативности мало |
| 7 | Caption / timestamp | `caption/medium 13` | не уменьшать | Всегда 13 |
| 8 | Button label (в `button 2.5`) | `body/small 16` (auto) | не менять | Компонент задаёт |
| 9 | Form label | `caption/medium 13` | caption/medium 13 ↔ body/small 16 | Должен быть ≤ field value |
| 10 | Field value (в `input 2.3`) | `body/small 16` (auto) | не менять | iOS min 16 |
| 11 | FAQ question | `body/small 16` | body/small 16 ↔ body/medium 20 | Accordion выделяет |
| 12 | Longread / article text | `body/paragraph/small 16/24` | body/small 16 для UI-текста | Режим последовательного чтения |
| 13 | Snackbar text | `body/small 16` | caption 13 если 1 строка | Пиковое внимание |
| 14 | Dialog title | `body/large 24` | body/medium 20 ↔ headline/small 24 | Тон |
| 15 | Dialog body | `body/small 16` | body/paragraph/small только для embedded article/legal text | UI vs reading mode |

---

## 4. Line-height map — 17 стилей × контекст

| Контент | Carnica стиль | Ratio | WCAG |
|---|---|---|---|
| Display / hero (32-56px) | `display/*` | 1.13-1.20 | — (large text) |
| Headline (24-40px) | `headline/*` | 1.0-1.22 | — |
| Body UI (14-18px) | `body/*` | 1.25-1.30 | AA |
| Body paragraph (article/longread reading) | `body/paragraph/*` | 1.50 | 1.4.8 AAA на границе |
| Caption | `caption/medium` | 1.23 | — |

**Carnica LH values (px):** 16, 20, 22, 24, 26, 28, 30, 36, 40, 48, 66.
- Все кратны 2
- Большинство кратны 4
- Исключения (кратны только 2): 22 (display/extrasmall), 26 (body/medium), 30 (body/paragraph/medium), 66 (display/large)

---

## 5. Letter-spacing — индустриальные правила по размерам

| Размер | Tracking (индустрия) | Carnica позиция |
|---|---|---|
| Display >40px | tight `-0.02…-0.05em` | **0** |
| Headline 24-40px | 0 | 0 |
| Body 14-18px | 0 | 0 |
| Caption <12px | loose `+0.01…+0.03em` | 0 (caption у нас 13px) |
| CAPS-лейблы | `+0.05…+0.15em` | НЕ актуально (CAPS запрещён) |

**Carnica правило:** во всех 17 стилях `letter-spacing: 0`. BeelineSans — корпоративный шрифт, спроектирован автором под нужные кегли. Не добавлять tracking-токены по размерам.

### Tabular numbers (`font-variant-numeric: tabular-nums`)

Отдельная тема от letter-spacing. Делает цифры одинаковой ширины.

**Включать:**
- Списки цен, балансов, транзакций (колоночное выравнивание)
- Счётчики, таймеры, прогресс
- Табличные данные

**НЕ включать:**
- Inline-цифры в обычном тексте (proportional лучше читается)
- Хедеры и акцентные числа — по вкусу (баланс `display/small 32` можно без tabular)

---

## 6. Line length / measure — по контекстам

| Контекст | Optimal знаков | Carnica действие |
|---|---|---|
| Mobile body (375px) | 30-50 | Не контролировать — frame ограничивает |
| Tablet narrow | 50-65 | `max-width: 65ch` если ≥600px wide |
| Desktop long-form (1200px) | 60-75 (66 ideal) | `max-width: 65ch` обязательно |
| Marketing hero | 45-70 | `text-wrap: balance` |
| UI labels / buttons / chips | не регулируется | — |
| Data tables / dashboards | не критично | — |

**Связь с LH:**
- Для reading-блоков measure >60ch → LH ≥1.5
- Для UI-текста `body/*` остаётся дефолтом; длина сама по себе не переводит текст в `body/paragraph/*`
- На desktop в статьях/лонгридах — `body/paragraph/small` 16/24 + `max-width: 65ch`

**Где на WEB ограничивать `max-width: 65ch`:**

1. Лонгриды и статьи
2. Политика конфиденциальности / T&C
3. Help Center articles
4. Правовые или справочные тексты внутри продукта
5. Product descriptions только если это article-like reading block

---

## 7. CSS-правила типографики Carnica (полная таблица)

Из `code-conventions.md §CSS-правила`:

| # | Правило | Значение | Почему | Tailwind |
|---|---|---|---|---|
| 1 | `line-height` | unitless (`1.4`), не px/em/% | px/em ломают пропорции при наследовании (MDN) | — |
| 2 | `max-width` | `65ch` для reading-блоков на WEB | `ch` масштабируется с font-size, в отличие от px | `max-w-[65ch]` |
| 3 | `text-wrap` | `balance` для H1-H3 | баланс последних строк заголовка | — |
| 4 | `text-wrap` | `pretty` для параграфов | убирает orphans | — |
| 5 | `text-align` | `start` / `end`, не `left` / `right` | logical properties, RTL-ready | `text-start` / `text-end` |
| 6 | `font-variant-numeric` | `tabular-nums` для колонок чисел | цифры одинаковой ширины | `tabular-nums` |
| 7 | `font-weight` | только `400` или `500` | других нет в BeelineSans | — |
| 8 | `text-align: justify` | **запрещён** в UI всегда | «реки» пустот, плохо для dyslexia (BDA 2023) | — |
| 9 | `text-transform: uppercase` | **запрещён** для UI | lowercase tone-of-voice (исключения: iPhone, SMS, eSIM) | — |
| 10 | `letter-spacing` | `0` (default) везде | BeelineSans уже спроектирован под кегли | — |

### CSS patterns (готовые блоки)

```css
.prose {
  max-width: 65ch;
  text-wrap: pretty;
  text-align: start;
  line-height: 1.5;
}

h1, h2, h3 {
  text-wrap: balance;
}

.numeric-column {
  font-variant-numeric: tabular-nums;
}

.label {
  text-align: start;  /* не left — RTL-ready */
}

.price {
  text-align: end;    /* не right */
  font-variant-numeric: tabular-nums;
}
```

---

## 8. Единицы измерения — полные правила сокращений

Билайн-специфика, отличается от общерусского правила. Все сокращения единиц — **строчными**.

### Единицы — строчными, всегда

| ✅ Правильно | ❌ Неправильно |
|---|---|
| 7,3 гб | 7,3 ГБ |
| 100 мбит/с | 100 Мбит/с |
| 2,4 ггц | 2,4 ГГц |
| 50 кб | 50 КБ |
| 2 тб | 2 ТБ |
| 12 мин | 12 МИН |
| 30 дней | 30 дней (без сокращения, ОК) |

Это распространяется на пользовательский UI, техническую документацию, плейсхолдеры.

### Десятичный разделитель — запятая

- ✅ «7,3 гб», «2,4 ггц», «1 199,50 ₽»
- ❌ «7.3 гб», «2.4 ггц»

### Пробел перед единицей — неразрывный

- В коде: `7,3&nbsp;гб` или `7,3 гб` (Unicode U+00A0)
- В Figma: ALT+Space
- Цель: «7,3» и «гб» не разделяются на разные строки при wrap

### Тысячи — пробелом, не запятой

- ✅ «1 199 ₽», «132 690 ₽», «12 500 чел.»
- ❌ «1,199 ₽» (англоязычный формат), «1.199 ₽» (немецкий формат)

### Валюта

- ₽ после числа с неразрывным пробелом: «1 199 ₽»
- Не «руб.», не «р.», не «RUB»

### Время

- 24-часовой формат с двоеточием: «14:30», «09:05»
- Не «2:30 PM», не «14.30», не «14h30»

### Дата

- В UI коротко: «23 апреля», «15 января 2026»
- С указанием времени: «23 апреля, 15:14»
- Месяц всегда с маленькой буквы

> Связь с tone-of-voice (запрещённые фразы, lowercase правила, восклицательные знаки) — skill `carnica-copy-tone`.

---

## 9. Display-стили на разных viewport'ах

| Стиль | Mobile 375 | Desktop ≥1024 | Когда |
|---|---|---|---|
| `display/large 56` | **запрещено** | OK | Splash screens, hero только web |
| `display/medium 40` | короткий ключевой акцент (~10-12 знаков max) | OK | WEB H1, mobile только если текст короткий |
| `display/small 32` | OK (universal) | OK | Mobile hero, balance, WEB H2, splash на маленьких экранах |
| `display/extrasmall 16` | НЕ использовать как display | НЕ использовать как display | Артефакт наименования; для 16px → `body/small` |

### Длина текста в display (ориентиры)

| Viewport / стиль | Макс длина | Fallback |
|---|---|---|
| Mobile 375 / `display/medium 40` | ~10-12 знаков (1 слово) | `display/small 32` |
| Mobile 375 / `display/small 32` | ~14-18 знаков (2-3 слова) | `headline/small 24` |
| Desktop 1440 / `display/medium 40` | ~40 знаков | `headline/medium 40` |
| Desktop 1440 / `display/large 56` | ~24 знака | `display/medium 40` |
