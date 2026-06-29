# Carnica Design System

Дизайн-система билайн (Carnica) для генерации UI в коде и Figma. Структура файла — по 9-секционному стандарту, чтобы агент мог быстро находить нужный блок.

> **Canonical rules** → `rules/README.md`
> **Figma keys для импорта через API** → `rules/design-system.md`
> **Компоненты и свойства** → `rules/component-decision-rules.md`, `rules/component-properties.md`
> **Паттерны композиции** → `rules/visual-patterns.md`
> **Полные паспорта** → `src/carnica/passports/colors.md`, `typography.md`, `icons.md`

---

## 1. Visual Theme & Atmosphere

**Философия**: минимализм, премиум через спокойствие. Серый фон + белые карточки + один жёлтый акцент. Никакого декоративного шума, никаких градиентов на фонах, тени строго точечно.

**Настроение**: близкий человеческий тон, без пафоса. UI не давит — даёт пользователю воздух (40–80px между крупными секциями на простых экранах).

**Светотень**: минимум. Все поверхности плоские. Тени допустимы только в одном паттерне — collapsed wallet-cards (`y=-2 blur=10 8 %`).

**Контраст-стратегия**: иерархия через размер и цвет, не через вес шрифта (только Regular 400 + Medium 500). «Emphasize by de-emphasizing» — главное выделяется тем, что окружение становится светлее.

---

## 2. Color Palette & Roles

### Quick reference

| Токен | Hex | Tailwind |
|---|---|---|
| Brand Yellow | `#FFC800` | `bg-brand-primary` |
| Text Primary | `#28303F` | `text-content-primary` |
| Text Secondary | `#77849D` | `text-content-secondary` |
| Background gray | `#F0F3F5` | `bg-background-primary` |
| Background white | `#FFFFFF` | `bg-background-secondary` |
| Element Active | `#202632` | `bg-elements-active` |
| Border | `#E2E6ED` | `border-border-secondary` |
| Error | `#F84A00` | `text-error-primary` |
| Success | `#00A55E` | `text-success-primary` |

### Brand
- **Primary** `#FFC800` — основной жёлтый, **только CTA** и активные состояния. Никогда не цвет текста на светлом фоне (контраст 1.7:1).
- **Secondary** `#FFD546` — hover/lighter.
- **Tertiary** `#F4B807` — pressed.

### Content (текст и иконки)
- **primary** `#28303F` — основной текст
- **secondary** `#77849D` — вторичный
- **tertiary** `#8E99AF` — подсказки
- **disabled** `#A5AEC0` — неактивные

### Background
- **primary** `#F0F3F5` — серый фон страницы
- **secondary** `#FFFFFF` — белый фон карточек
- **overlay** `#191C22B2` — затемнение под модалками

### Elements (поверхности кнопок, карточек, инпутов)
- **primary** `#FFFFFF` — белая
- **secondary** `#F0F3F5` — серая
- **tertiary/disabled** `#E2E6ED`
- **active** `#202632` — тёмная

### Semantic
- **error** `#F84A00`
- **success** `#00A55E`
- **link** `#1086F9`

### Surface (пастельные фоны для иллюстраций и иконок-плиток в карточках товаров)
green `#CBF6E3`, teal `#BFF8F1`, blue `#D7EBFE`, violet `#E7DFFB`, magenta `#FBDBEC`, red `#FDD8D8`, orange `#FFD8C7`, yellow `#FFE999`.
Tailwind: `bg-surface-{color}`.
**Нельзя использовать как фоны тэгов и chip'ов** — см. `.claude/rules/ux-principles.md §16`.

### Accent (8 цветов × 3 уровня прозрачности: 100 / 70 / 24 %)
Tailwind primary: `bg-accent-{green|teal|blue|violet|magenta|red|orange|yellow}`.

### Правила использования

- Финальный paint — только через `importVariableByKeyAsync`, не direct hex.
- Fallback RGB должен совпадать с переменной (не `{r:0,g:0,b:0}`).
- `brand/primary` никогда как цвет текста на светлом фоне.
- Для тэгов — только `default` (серый), `brand`, `invert`, `success`, `error`. См. `.claude/rules/ux-principles.md §16`.

---

## 3. Typography Rules

**Шрифт**: BeelineSans, только два веса — **Regular 400** и **Medium 500**. Bold/SemiBold/Light отсутствуют, использование запрещено (будет fallback на системный).
**Letter-spacing**: 0 во всех 17 стилях.

### Шкала (7 размеров)

```
13 → 16 → 20 → 24 → 32 → 40 → 56
```

Здоровые ratios 1.2–1.4. Не расширять.

### Стили

| Стиль | Size/LH/Weight | Tailwind | Назначение |
|---|---|---|---|
| display/large | 56/66/400 | `text-display-lg` | Hero web ≥ 1024 |
| display/medium | 40/48/400 | `text-display-md` | Заголовок web |
| display/small | 32/36/400 | `text-display-sm` | Hero mobile, ключевое число |
| display/extrasmall | 16/22/400 | `text-display-xs` | артефакт наименования, **не использовать как display** |
| headline/medium | 40/40/400 | `text-headline-md` | Tight-set web |
| headline/small | 24/24/400 | `text-headline-sm` | Page title в скролле |
| body/large | 24/28/400 | `text-body-lg` | Крупные числа |
| body/medium | 20/26/400 | `text-body-md` | Card title, navbar title |
| body/small | 16/20/400 | `text-body-sm` | Базовый текст, cell title/subtitle |
| body/accent/* | same, **500** | `text-body-accent-*` | Только внутри готовых компонентов |
| body/paragraph/* | same, +LH 1.5 | `text-body-para-*` | Long-form reading: FAQ, T&C, описания |
| caption/medium | 13/16/400 | `text-caption-md` | Timestamps, badges, footnotes |
| caption/accent | 13/16/500 | `text-caption-accent-md` | Акцент в готовых компонентах |

### Правила выбора

- **Иерархия максимум 4 уровня** на экран. Между соседними меняется один параметр (size ИЛИ color).
- **Standalone текст** — всегда Regular 400. Medium только внутри `button 2.5` large/medium, `cell 3.1`, `tag 2.3`, `title 2.1`.
- **Long-form reading** (FAQ, T&C, описания тарифов) — `body/paragraph/*` с LH 1.5.
- **Number columns** — `tabular-nums` (см. `.claude/rules/typography-principles.md §6`).
- **Headings H1–H3** — `text-wrap: balance`. Параграфы — `text-wrap: pretty`.
- **Long-form desktop** — `max-width: 65ch`.

Подробная база: `.claude/rules/typography-principles.md`.

---

## 4. Component Stylings

Полный каталог — `rules/component-decision-rules.md` + `rules/component-properties.md` + skills `carnica-ui-kit-app`/`carnica-ui-kit-web`.

### Buttons (`button 2.5`)

- Pill-форма (radius 100px).
- Размеры: large 56h, medium 44h.
- Priority: primary (жёлтый), secondary (белый/прозрачный), tertiary (текст), destructive (оранжево-красный текст).
- Padding: large обнулять при wrapper'е с собственным padding; medium **сохранять defaults** (16h/12v).

### Cards

- Background: `bg-background-secondary` (#FFFFFF) на `bg-background-primary` (#F0F3F5).
- Radius: **32px** для главных карточек на mobile (не 12, не 16, не 24).
- Padding: 16–24px (mobile), 24–32px (desktop).
- Тени: нет, кроме `wallet collapsed cards`.

### Inputs (`input 2.3`)

- Type-варианты: text, phone, card, month, date, range, time, password, currency, code.
- Field value размер: 16px минимум (иначе iOS делает force-zoom).
- Label: caption/medium (13) или body/small (16) — меньше или равно field value.

### Navigation

- `navbar 3.0` — APP main nav.
- `navbar modal 1.0` — single component, для модалок (всегда importComponentByKeyAsync, не set).
- `tabbar beeline 3.0` — нижняя нав-панель приложения.
- `breadcrumbs 2.2` — WEB.

### Lists (`cell 3.1`)

- Любая строка с иконкой + title + (subtitle) + chevron/action.
- В белой карточке: `background=none`, не `default on bg_secondary`.
- Chevron в right view ВСЕГДА перекрашивать в `content/secondary` через `recolorVectors()`.
- Dividers оборачивать в VFrame с `paddingLeft=72, paddingRight=20`.

### Tags & Badges

- `tag 2.3` — текстовая метка. Только `default`, `brand`, `invert`, `success`, `error`.
- `badge 2.2` — индикатор: dot, text, icon.
- `adtag 2.2` — рекламная метка с особым стилем.

### Icons

- 179 иконок в `src/carnica/icons/` по 23 категориям.
- viewBox `0 0 24 24`, `fill="currentColor"` или `stroke="currentColor"`.
- Default style: `outline`. Единственное исключение — `plus round` использует `style=stroke`.

---

## 5. Layout Principles

### Mobile (375px)

| Элемент | Значение |
|---|---|
| Page horizontal padding | 20px (стандарт) |
| Edge exception | 4px (только для card-holder и тяжёлых full-bleed блоков) |
| Card radius (главные) | 32px |
| Card padding | 16h × 14–20v |
| Между секциями | 12–24px стандарт, 40–80px на простых экранах с воздухом |
| Список — высота строки | 48–56px |
| Tabbar | 56px |
| Touch target | 44px минимум |
| Button heights | M=44, L=56 |

### Web (desktop 1440)

| Элемент | Значение |
|---|---|
| Content max-width | 1200px |
| Header padding | 40h × 16v (76px высота) |
| Section gap | 60–80px |
| Card padding | 24–32px |
| Card radius | 24–32px |
| Long-form reading width | `max-width: 65ch` |

### Spacing scale

```
4 → 8 → 12 → 16 → 20 → 24 → 32 → 40 → 48 → 64
```

Все отступы кратны 4 (spacing grid). Не использовать значения вне шкалы (15, 17, 23 — запрещены).

### Гештальт-правило

Между группами gap ≥ 2× gap внутри группы. Внутри группы 2–8px, между группами 12–32px.

### Композиционные паттерны

- **Вертикальное разделение**: верх — данные, низ — действия. См. `.claude/rules/ux-principles.md §9`.
- **Воздух**: на простых экранах 40–80px между блоками.
- **Asymmetric grid**: 2 ряда карточек = 43/57 % ширин; 1 ряд = равные.
- **Card-holder стопка**: 4px edge exception, ABSOLUTE positioning, scaled width.
- **Editorial feed**: один белый блок с секциями, label вместо title.

---

## 6. Depth & Elevation

Carnica — плоский дизайн. Глубины через motion и layering, не через тени.

### Тени — точечно

| Где | Параметры |
|---|---|
| Wallet collapsed card #1 (дальняя) | нет |
| Wallet collapsed card #2 (средняя) | `y=-2, blur=10, 8 %` |
| Wallet collapsed card #3 (ближняя) | `y=-2, blur=10, 8 %` |
| Hover lift (web cards) | `0 2px 8px rgba(0,0,0,0.04)` 150ms |
| Sticky header glass | нет shadow, только `backdrop-blur-15` + overlay/s |

### Layering без теней

- **Z-stacking**: card-holder через `layoutPositioning='ABSOLUTE'`.
- **Glass-overlay**: `bg overlay/s rgba(240,243,245,0.3) + backdrop-blur(15px)` для navbar.
- **Modal scrim**: `overlay/xl rgba(25,28,34,0.7)`.

### Border radius

| Token | Value | Tailwind | Где |
|---|---|---|---|
| sm | 8px | `rounded-lg` | мелкие элементы |
| md | 12px | `rounded-xl` | карточки product UI |
| lg | 16px | `rounded-2xl` | модалки |
| xl | 24px | `rounded-3xl` | крупные блоки |
| **outer mobile** | **32px** | — | главные карточки на mobile |
| pill | 100px | `rounded-pill` | кнопки, pills |
| round | 50% | `rounded-full` | аватары |

---

## 7. Do's and Don'ts

### Do

- Использовать готовые Carnica-компоненты везде, где они есть.
- Все final paints через bound variables.
- Lowercase UI везде, кроме явных исключений.
- Иерархия через размер + цвет + spacing, не через вес.
- Один осознанный приём на экран (см. `rules/anti-ai-slop.md → 20 % distinctive choice`).
- `Cmd+Shift+P` → `Fix BeelineSans` после генерации в Figma.

### Don't

Полный список — `rules/anti-ai-slop.md`. Самые критичные:

- Direct hex как final paint.
- `brand/primary` как цвет текста.
- Bold/SemiBold (700/600) — шрифта нет.
- `text-transform: uppercase` или CAPS-имитация.
- Цветной `surface-*` токен как фон тэга.
- Эмодзи-иконки.
- Lorem ipsum, generic-AI-фразы.
- Ручная сборка вместо Carnica-компонента.
- Тени, кроме wallet collapsed cards.
- Градиенты на фонах карточек/кнопок/секций.
- `detachInstance()`.
- Justified text.
- Bouncy/pulse/glow на CTA.

---

## 8. Responsive Behavior

### Breakpoints

| Range | Контекст |
|---|---|
| 375px | iPhone стандарт, основной mobile |
| 768px | Tablet (используется редко) |
| 1024px | Tablet landscape / small laptop |
| 1440px | Desktop стандарт |
| ≥1920px | Wide desktop, content max-width 1200 не превышается |

### Переходы между breakpoints

- **Desktop → Mobile**: 2-col grid → single column. Sidebar → floating bottom bar 72px. Hero 520 → 466. Product grid M+S → M(327)+S(160).
- **Touch targets**: на mobile 44px минимум, на desktop 32px достаточно для cursor.
- **Long-form**: на desktop `max-width: 65ch`, на mobile 375px measure не контролировать (frame ограничивает).
- **Display sizes**: `display/large 56` запрещён на mobile 375 (длинные слова обрезаются). Использовать `display/small 32`.

### `prefers-reduced-motion`

Учитывать всегда. См. `rules/motion.md §1`.

### Dark mode

Поддерживается только в специальных контекстах (wallet, баннеры, корзина веба). Не основной режим. См. `.claude/rules/header-component.md §5` и `.claude/rules/code-conventions.md`.

---

## 9. Agent Prompt Guide

Quick-reference для агента: что-куда подставлять, чтобы получить Carnica-результат.

### Перед началом работы

1. Определить платформу: **APP или WEB**.
2. Прочитать canonical rules в порядке: `rules/README.md` → `rules/workflow.md` → `rules/design-system.md` → `rules/component-decision-rules.md` → `rules/anti-ai-slop.md`.
3. Если задача про Figma: `rules/component-properties.md` + skill `carnica-ui-kit-app` или `carnica-ui-kit-web`.
4. Если задача про код: `.claude/rules/code-conventions.md` + `DESIGN.md` (этот файл).

### Промпт-цепочка

См. `rules/prompt-templates.md`. Стадии: Preflight → Generation → Repair → Final QA.

Финальный QA = `rules/qa-scorecard.md` (compliance) + `rules/critique.md` (вкус). Оба должны пройти.

### Шорткаты для частых задач

- «Сделай кнопку Carnica» → `button 2.5`, priority по контексту, size large для главных CTA.
- «Сделай заголовок секции» → `title 2.1` (если с правым CTA) или `body/medium 20` (если без).
- «Сделай список» → `cell 3.1` с правильным background и chevron recolor.
- «Сделай форму» → `input 2.3` с правильным type, label `caption/medium 13` или `body/small 16`.
- «Сделай модалку» → `dialog 2.1` или `action sheet 2.2` или `modal page 2.1` с `navbar modal 1.0`.
- «Сделай empty state» → `error_empty state 3.0` + копия из `rules/copy-tone.md §6`.

### Карта файлов

| Если нужно… | Читать |
|---|---|
| Какой компонент использовать | `rules/component-decision-rules.md` |
| Ключи компонентов и properties | `rules/component-properties.md` + skills |
| Цвета и токены | `DESIGN.md` (этот файл) §2 + `src/carnica/passports/colors.md` |
| Типографика | `DESIGN.md` §3 + `.claude/rules/typography-principles.md` |
| Layout и spacing | `DESIGN.md` §5 + `rules/visual-patterns.md` |
| Запреты и anti-patterns | `rules/anti-ai-slop.md` |
| Motion | `rules/motion.md` |
| Копирайт | `rules/copy-tone.md` |
| Workaround'ы Figma API | `rules/known-gotchas.md` |
| Финальная оценка | `rules/qa-scorecard.md` + `rules/critique.md` |
| Промпты | `rules/prompt-templates.md` |
