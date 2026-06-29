# Button (Carnica WEB, button 2.1)

## Мета
- **Пакет**: @carnica/ui-kit
- **Figma**: `06_Carnica UI-kit WEB` → `button 2.1` (node `440:1342`)
- **Версия API**: v2.1 (дата: 2026-04-23)
- **Статус**: актуальный

Из одного `button 2.1` (192 variants) в Figma локальный runtime сейчас поддерживает два независимых компонента:

| Компонент | Файл | Figma |
|---|---|---|
| `Button` | `src/carnica/components/web/buttons/Button.tsx` | `button 2.1` |
| `ButtonInlineText` | `src/carnica/components/web/buttons/ButtonInlineText.tsx` | `button inline text 2.1` |

---

## 1. `Button` — filled (`button 2.1`)

Discriminated union: `view='text'` (с `children`) **XOR** `view='icon'` (с `icon` + `aria-label`). Компилятор блокирует комбинацию icon + text.

### Props

| Prop | Тип | Default | Описание |
|---|---|---|---|
| `priority` | `'primary' \| 'secondary-on-primary' \| 'secondary-on-secondary' \| 'secondary-on-tertiary' \| 'tertiary' \| 'destructive'` | `'primary'` | Визуальный приоритет |
| `size` | `'l' \| 'm'` | `'l'` | 56px или 44px |
| `width` | `'default' \| 'full'` | `'default'` | `full` = растянуть на ширину родителя |
| `view` | `'text' \| 'icon'` | `'text'` | Discriminant. Влияет на остальные props |
| `children` | `ReactNode` | — | **Required** при `view='text'`. **Запрещено** при `view='icon'` |
| `icon` | `ReactNode` | — | **Required** при `view='icon'`. **Запрещено** при `view='text'` |
| `aria-label` | `string` | — | **Required** при `view='icon'` для a11y |
| `sale` | `ReactNode` | — | Перечёркнутая цена рядом с label. Только `view='text'` |
| `badge` | `boolean` | `false` | Красная точка-индикатор. Только `view='text'` |
| `loading` | `boolean` | `false` | Прелоадер вместо контента, `aria-busy="true"` |
| `disabled` | `boolean` | `false` | Блокировка + `cursor-not-allowed` |
| `className` | `string` | — | Доп. CSS |

### Дизайн-токены

- **Font**: `body/accent/small` = BeelineSans Medium 16/20/500 (`text-body-accent-sm`) — одинаково для L и M
- **Radius**: `radius/infinite` = 100px (`rounded-pill`)
- **Size L (view=text)**: height 56px, horiz padding 20px, gap 8px
- **Size M (view=text)**: height 44px, horiz padding **16px** (не 18px!), gap 4px
- **Size L (view=icon)**: 56×56, padding 0
- **Size M (view=icon)**: 44×44, padding 0

### Цветовые токены по priority

| priority | bg (default) | bg (pressed) | text | text (pressed) |
|---|---|---|---|---|
| primary | `brand/primary` #FFC800 | `brand/tertiary` #F4B807 | `constant/dark` #28303F | — |
| secondary-on-primary | `elements/primary` #FFFFFF | — | `content/primary` #28303F | `content/secondary` #77849D |
| secondary-on-secondary | `elements/secondary` #F0F3F5 | — | `content/primary` | `content/secondary` |
| secondary-on-tertiary | `elements/additional01` **#FFFFFF** | — | `content/primary` | `content/secondary` |
| tertiary | `elements/active` #202632 | — | `content/primary 100%-invert` #FFFFFF | `content/secondary 100%-invert` #A5AEC0 |
| destructive | `error/primary` #F84A00 | `error/secondary` #FF6524 | `constant/light` #FFFFFF | — |

> ⚠️ **Внимание на `secondary-on-tertiary`**: использует **белый** `el/additional01` (не `el/tertiary`). Название описывает фон-КОНТЕКСТ (кнопка лежит НА bg-tertiary #F0F3F5), а не цвет самой кнопки.

### Pressed-поведение

- `primary` / `destructive`: меняется **фон**.
- `secondary-*` / `tertiary`: меняется **цвет текста**, фон остаётся.

### Disabled (единое правило для всех priority)

- bg: `elements/disabled` #E2E6ED
- text: `content/disabled` #A5AEC0
- cursor: `not-allowed`

### Accessibility

- `aria-label` **обязателен** на `view='icon'` (enforced типами)
- `aria-busy="true"` при `loading=true`
- Focus ring: `ring-2 ring-constant-dark ring-offset-2` (для `tertiary` → `ring-brand-primary`; legacy `ring-bee-dark` / `ring-bee-yellow`)
- Контраст: primary yellow/dark = 10.7:1 ✓, destructive/white = 3.8:1 (OK для weight 500 по WCAG 1.4.3 large-text)

### Motion

- `transition-colors duration-150` — плавные смены цвета
- `motion-safe:active:scale-[0.98]` — лёгкий тактильный scale на press (GPU-only, без layout shift)
- Loader-точки: `motion-safe:animate-pulse-soft` — при reduced-motion точки статичны

### Примеры

```tsx
// Text-кнопка
<Button priority="primary" size="l">оформить</Button>
<Button priority="secondary-on-secondary" size="m">отменить</Button>
<Button priority="primary" sale="100 ₽">купить за 80 ₽</Button>
<Button priority="primary" badge>уведомления</Button>
<Button priority="destructive" size="l" width="full">удалить</Button>
<Button priority="primary" loading>загружается</Button>

// Icon-кнопка
<Button
  priority="secondary-on-secondary"
  size="m"
  view="icon"
  icon={<IconSearch className="w-5 h-5" aria-hidden />}
  aria-label="поиск"
/>

// НЕ РАБОТАЕТ (compile error):
<Button priority="primary" icon={<X/>}>текст</Button>          // icon не принадлежит view=text
<Button priority="primary" view="icon" icon={<X/>}>текст</Button>  // children не принадлежит view=icon
<Button priority="primary" view="icon" icon={<X/>} />           // нет aria-label
```

---

## 2. `ButtonInlineText` (`button inline text 2.1`)

Текстовая ссылка без фона. Поддерживает chevron-иконки слева/справа (для inline text это идиоматично).

### Props

| Prop | Тип | Default | Описание |
|---|---|---|---|
| `priority` | `'primary' \| 'secondary' \| 'destructive'` | `'primary'` | Цвет текста |
| `invert` | `boolean` | `false` | Для тёмных фонов |
| `iconLeft` | `ReactNode` | — | Иконка слева (обычно chevron) |
| `iconRight` | `ReactNode` | — | Иконка справа |
| `loading` / `disabled` / `className` / `children` | стандартные | | |

### Токены

- Font: `body/accent/small` (16/20/500)
- Primary: `content/primary` #28303F → active `content/secondary`
- Secondary: `content/secondary` #77849D → active `opacity-70`
- Destructive: `error/primary` #F84A00 → active `error/secondary`

### Пример

```tsx
<ButtonInlineText priority="primary" iconLeft={<IconChevronLeft />}>
  назад
</ButtonInlineText>
<ButtonInlineText priority="secondary" iconRight={<IconChevronRight />}>
  показать все
</ButtonInlineText>
<ButtonInlineText priority="destructive">удалить</ButtonInlineText>
```

## Миграция v0 → v2.1

Если в проекте был старый API:

| Старый код | Новый код |
|---|---|
| `<Button view="primary">текст</Button>` | `<Button priority="primary">текст</Button>` |
| `<Button view="primary" iconLeft={<X/>}>текст</Button>` | **Запрещено** — переверстать: либо убрать иконку, либо заменить на `<ButtonInlineText>` с chevron |
| `<Button view="primary" onlyIcon iconLeft={<X/>}/>` | `<Button priority="primary" view="icon" icon={<X/>} aria-label="..." />` |
| `<Button mode="inline" view="primary">…</Button>` | `<ButtonInlineText priority="primary">…</ButtonInlineText>` |
| `<Button mode="inline" onlyIcon iconLeft={<X/>}/>` | Нет локального runtime-аналога; использовать реальный `@carnica/ui-kit` или добавить отдельный компонент по новому паспорту |

> **В `view='text'` иконок нет**. Для стрелки-шеврона рядом с текстом используй `ButtonInlineText` с `iconLeft`/`iconRight`.

---

## Удалённые props (не использовать)

- `view` → переименовано в `priority`
- `mode` → убрано, разделено на 3 компонента
- `onlyIcon` → заменено на `view: 'icon'`
- `iconLeft` / `iconRight` / `iconLeftView` / `iconRightView` → в `Button` нет иконок при view=text. В `ButtonInlineText` есть chevron slot'ы
- `invert` в `Button` → invert только в inline-компонентах
- `secondary` / `secondary-invert` (deprecated priority) → использовать `secondary-on-primary`/`secondary-on-secondary`
