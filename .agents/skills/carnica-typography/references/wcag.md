# Typography — WCAG и accessibility

Файл descriptive, не imperative — фиксирует accessibility-обоснования с цитатами WCAG 2.2 SC, large-text threshold, BDA Dyslexia Style Guide 2023, Dynamic Type, semantic HTML. Для практических правил без объяснений — `SKILL.md`. Для академической теории — `references/theory.md`.

## TOC

1. WCAG 2.2 SC criteria для типографики
2. Large text определение
3. Контраст токенов Carnica — матрица
4. Минимальные размеры
5. Dyslexia-friendly (BDA Style Guide 2023)
6. Dynamic Type (iOS)
7. HTML семантика для WEB
8. Инструменты accessibility
9. Источники

---

## 1. WCAG 2.2 SC criteria — типографика

| SC | Уровень | Суть | Практика для Carnica |
|---|---|---|---|
| 1.4.3 Contrast (Min) | AA | Обычный текст ≥4.5:1, large text ≥3:1 | База для body |
| 1.4.4 Resize Text | AA | 200% zoom без поломки layout | `rem`/`em`, не фиксить высоты в px |
| 1.4.6 Contrast (Enhanced) | AAA | 7:1 обычный / 4.5:1 large | Цель для long-form контента |
| 1.4.8 Visual Presentation | AAA | LH ≥1.5, ширина ≤80 знаков, no justify | Применимо к paragraph-стилям |
| 1.4.10 Reflow | AA | 320px viewport без horizontal scroll | Запрет fixed-width текстовых контейнеров |
| 1.4.12 Text Spacing | AA | User override LH 1.5 / letter-spacing 0.12em / word-spacing 0.16em — без поломки | Не обрезать overflow в карточках с текстом |
| 1.3.1 Info and Relationships | A | Настоящие `<h1>-<h6>`, `<ul>/<li>`, `<button>` | Карточка «заголовок секции» = `<h2>`, не div |
| 2.4.6 Headings and Labels | AA | Заголовки описывают содержимое | Не использовать h1 как декорацию |

### Карта применения SC к Carnica-стилям

- `body/paragraph/small` (16/24, LH 1.5) — на границе 1.4.8 AAA
- `body/small` (16/20, LH 1.25) — для UI текста; на long-form НЕ применяем
- `caption/medium` (13) — выше индустриальных минимумов, OK для метаданных

---

## 2. Large text определение (WCAG)

WCAG различает обычный и large text для пороговых значений контраста:

- **≥18pt (24px) regular** или **≥14pt (~18.66px) bold** → допустим контраст **3:1** (SC 1.4.3 AA)
- Обычный текст — **4.5:1**

### Внимание: Medium 500 НЕ считается bold для WCAG

«Bold» для WCAG = font-weight 700+. Medium 500 — обычный текст. Поэтому:
- `body/accent/medium 20/500` — обычный текст для WCAG, нужен **4.5:1**, не 3:1
- `body/accent/small 16/500` — обычный текст, нужен 4.5:1
- `display/medium 40/400` (Regular) — large text, допустим 3:1
- `display/medium 40/500` (если бы было) — large text, допустим 3:1

Это критично при проверке контраста токенов на цветных фонах (например, `content/secondary` на жёлтой кнопке).

---

## 3. Контраст токенов Carnica — матрица

| Токен | На белом #FFFFFF | На сером #F0F3F5 | WCAG-классификация |
|---|---|---|---|
| `content/primary` #28303F | 12.6:1 | 11.3:1 | AAA (обычный + large) |
| `content/secondary` #77849D | ~4.0:1 | ~3.6:1 | На границе AA (обычный) |
| `content/tertiary` #8E99AF | ~3.2:1 | ~2.9:1 | AA large, не AA обычный |
| `content/disabled` #A5AEC0 | ~2.7:1 | ~2.4:1 | Только disabled |
| `brand/primary` #FFC800 | **1.7:1** | 1.5:1 | **АНТИ-ПАТТЕРН как текст** |

> **Полная таблица контраста токенов для всех фонов (dark theme, surface-*, elements-*) — skill `carnica-design-system`.** Здесь — минимальный inline-набор для решений по типографике (D-27 owner rule).

### Carnica-правила по контрасту

- `content/primary` — для основного читаемого текста, везде OK
- `content/secondary`, `content/tertiary` — как менее важный/вторичный контент, на любых размерах. Даже если формально проваливают AA для маленького текста — это осознанный design choice Beeline (приоритет визуальной иерархии)
- `content/disabled` — **только** для неактивных элементов
- **`brand/primary` (#FFC800)** — **НИКОГДА** не использовать как цвет текста на светлых фонах. Использовать ТОЛЬКО как фон под `content/primary` (на #FFC800 контраст 8.0:1, AAA)

---

## 4. Минимальные размеры

WCAG не задаёт явный минимум font-size, но индустрия конвергировалась:

| Источник | Минимум body |
|---|---|
| Apple HIG | 11pt (~14.6px) |
| Material Design | 11-12px |
| WebAIM | ≥16px рекомендация для body |
| Carnica `caption/medium` | 13px (выше Apple/Material минимумов) |
| Carnica `body/small` | 16px (соответствует WebAIM) |

iOS auto-zoom: при `<input>` с `font-size < 16px` Safari делает force-zoom при focus — поэтому **field value минимум 16px**.

Button label минимум 16px (Apple HIG: tap-target 44×44, текст должен быть читаем при touch).

Caption 13px — для метаданных, никогда для основного контента (анти-паттерн: caption для баланса).

---

## 5. Dyslexia-friendly (BDA Style Guide 2023)

BDA (British Dyslexia Association) — каноническая работа по типографике для дислексиков. ~10% людей имеют дислексию в той или иной степени.

Требования BDA Style Guide 2023:

- **Sans-serif шрифт** — BeelineSans подходит
- **LH ≥1.5** для paragraph → `body/paragraph/*` (1.5) выполняет
- **Letter-spacing 0** — приемлемо (увеличенный tracking путает)
- **Никаких italics** — в Carnica их нет
- **Никаких all-caps** — запрещено в Carnica (`ux-principles.md §15`)
- **Выравнивание: только left-aligned**, **never justified** («реки» пустот ломают чтение)
- **Paragraph spacing ≥1.5× LH**

### Почему justified text запрещён

«Реки» пустот в узких колонках (mobile 375 — катастрофа). Неконтролируемый word-spacing без hyphenation. Чтение замедляется на 13-18% для людей с дислексией. Работает только в книжных/газетных колонках с профессиональной H&J-вёрсткой — не в UI.

---

## 6. Dynamic Type (iOS)

~30% iOS-пользователей используют Dynamic Type — настройку увеличенного шрифта в системных настройках. Не учитывать = терять треть аудитории.

Carnica Figma-паттерны поддерживают user text-scaling из коробки:

- **HUG-контейнеры** — расширяются под текст
- **`textAutoResize: WIDTH_AND_HEIGHT`** на текстовых нодах
- **FILL / HUG** sizing-mode на родителях

Это эквивалент `rem`/`em` в CSS — при user-zoom 200% (WCAG 1.4.4) layout не ломается.

---

## 7. HTML семантика (WEB)

SC 1.3.1 Info and Relationships (A) требует настоящих семантических тегов, не `<div>` со стилем:

- `title 2.1` (Carnica) → настоящие `<h1>-<h6>`, не `<div class="title">`
- Cell-списки → `<ul>` / `<li>`
- Кнопки → `<button>`, не `<div onClick>`
- Ссылки с URL — `<a href>`, не `<button router.push>`
- Label + input через `<label for=...>` или обёртку `<label><input/></label>`
- `<html lang="ru">` — обязательно для screen readers и переноса слов

SC 2.4.6 Headings and Labels (AA) — заголовки должны описывать содержимое секции. h1 не использовать как декорацию.

---

## 8. Инструменты accessibility

**Контраст:**
- WebAIM Contrast Checker — https://webaim.org/resources/contrastchecker/
- Stark (Figma plugin) — контраст + color-blind simulation

**Audit (automated):**
- Chrome DevTools Lighthouse — Accessibility audit
- axe DevTools (Deque) — https://www.deque.com/axe/devtools/
- WAVE — https://wave.webaim.org/
- Pa11y CI — https://pa11y.org/

**Screen reader (manual):**
- NVDA (Windows, free)
- VoiceOver (macOS / iOS, built-in)
- TalkBack (Android, built-in)

### Important caveat

**Automated tools покрывают ~30-50% WCAG issues.** Остальное — manual testing. Нельзя полагаться только на Lighthouse / axe. Контраст текста на градиенте, screen reader порядок, focus visibility — только ручная проверка.

---

## 9. Источники

- WCAG 2.1 — https://www.w3.org/TR/WCAG21/
- WCAG 2.2 — https://www.w3.org/TR/WCAG22/
- WCAG 2.2 Quick Reference — https://www.w3.org/WAI/WCAG22/quickref/
- WebAIM Contrast — https://webaim.org/articles/contrast/
- Apple HIG Accessibility — https://developer.apple.com/design/human-interface-guidelines/accessibility
- BDA Dyslexia Style Guide 2023 — British Dyslexia Association
- MDN Accessible text — https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML
- A11Y Collective — https://www.a11y-collective.com/
