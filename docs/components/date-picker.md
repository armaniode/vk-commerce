# Date Picker

`DatePicker` — field/trigger VK Social Commerce для открытия внешнего picker layer. Текущая реализация не содержит calendar popover, date grid, month/year navigation или time menu.

## Public API

```tsx
<DatePicker
  type="date-range"
  startDate="01.02.1995"
  endDate="10.05.2023"
  status="default"
  open={false}
  onTriggerClick={openPicker}
  onClear={clearRange}
  theme="light"
  platform="ios"
/>
```

Поддержанные Type:

- `date`: `date?: string`;
- `date-time`: `date?: string`, `time?: string`;
- `date-range`: `startDate?: string`, `endDate?: string`.

Значения передаются уже отформатированными строками. Компонент не выполняет parsing, validation календарной даты или timezone conversion.

Общие props:

- `status?: default | error | valid`, по умолчанию `default`;
- `disabled?: boolean`;
- `open?: boolean` — сохраняет Active surface и управляет `aria-expanded`;
- `onTriggerClick` — открытие внешнего picker layer;
- `onClear` — очистка текущего значения;
- `theme?: light | dark`, по умолчанию `light`;
- `platform?: ios | android | desktop | vkcom`, по умолчанию `ios`;
- `className`, `aria-*` и безопасные button attributes передаются основной trigger-кнопке.

`DatePicker` поддерживает `ref` на основной `HTMLButtonElement`.

## Empty, Filled и partial values

Filled вычисляется по данным, отдельного prop нет:

- Date — передан непустой `date`;
- Date & Time — передан `date` или `time`;
- Date Range — передан `startDate` или `endDate`.

Empty показывает подтверждённые masks `__.__.____` и `__:__` с `text.secondary`, а справа — calendar icon. Заполненные сегменты используют `text.primary`.

Partial values сохраняют mask для отсутствующей части:

```text
01.02.1995   __:__
__.__.____   12:00
01.02.1995 — __.__.____
__.__.____ — 10.05.2023
```

## Geometry и typography

- height — 52px;
- radius — 16px;
- horizontal padding — 16px;
- vertical padding — 14px;
- content gap — 8px;
- Date & Time gap — 12px;
- Date Range dash region — 27px;
- calendar icon — 24×24;
- clear action — 24×24 с glyph 16×16;
- Typography/Text — 16px / 18.5px / weight 600;
- width — 100%, min-width — 0.

Font family и letter spacing берутся из выбранной platform foundation. Android использует Typography/Text выбранной платформы без локальных `font-variation-settings`.

## Visual states

- Default — `background.secondary` и `stroke.fieldBorderAlpha`;
- Hover — настоящий `:hover` и `states.hover.fieldBorderAlpha`;
- Active — focus внутри root или `open=true` и `states.active.fieldBorderAlpha`;
- Error — `status="error"`, `background.negativeTint` и `stroke.negative`;
- Valid — `status="valid"`, `background.secondary` и `stroke.positive`.

Error и Valid имеют приоритет над Hover, focus и `open`.

## Disabled

Trigger и интерактивный clear получают нативный `disabled`. Выбранные surface, border и content сохраняются, после чего весь visual root композитится с opacity 52%. Black/white overlay и background replacement не используются.

## Calendar и clear affordance

Empty использует точный локальный `calendar_outline_24`. Filled использует точный локальный `clear_16` в контейнере 24×24. Оба glyph наследуют semantic `icon.secondary` через CSS mask.

Если передан `onClear`, clear — настоящий sibling `<button>`: click не вызывает trigger и вызывает только `onClear`. Если callback отсутствует, source-equivalent glyph остаётся декоративным и не получает fake interactive role.

## Accessibility

- основная зона — `<button type="button">`;
- trigger устанавливает `aria-haspopup="dialog"` и `aria-expanded`;
- `aria-label`, `aria-labelledby`, `aria-describedby` и остальные безопасные button attributes прокидываются на trigger;
- clear action не вложен в trigger button;
- calendar keyboard navigation не реализуется без picker overlay.

## Ограничения

- calendar popover, calendar grid, month/year navigation и time picker popup не входят в компонент;
- production `FormField` и `FormFields` не создаются;
- значения не парсятся и не форматируются внутри visual component;
- internal segment Focus из low-level source намеренно отложен до появления editable/masked date-input interaction.
