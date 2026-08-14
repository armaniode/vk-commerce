# Select

`Select` — интерактивный trigger VK Social Commerce для выбора значения. Компонент использует настоящий `<button type="button">`, но намеренно не реализует dropdown, popover или список options.

## Public API

```tsx
<Select
  value="Москва"
  status="default"
  open={false}
  theme="light"
  platform="ios"
  onClick={handleOpen}
/>
```

`SelectProps` наследует безопасные `ButtonHTMLAttributes<HTMLButtonElement>`, кроме `children`, `type` и `value`. Trigger всегда имеет `type="button"`.

Дополнительные props:

- `value?: ReactNode` — выбранное значение;
- `placeholder?: ReactNode` — текст при отсутствии значения;
- `chips?: ReactNode` — внешний набор chips;
- `status?: default | error | valid`, по умолчанию `default`;
- `open?: boolean` — сохраняет Active surface и управляет `aria-expanded`;
- `theme?: light | dark`, по умолчанию `light`;
- `platform?: ios | android | desktop | vkcom`, по умолчанию `ios`;
- `className` и стандартные button attributes.

Компонент поддерживает `ref` на `HTMLButtonElement`.

## Content model

Content определяется из данных, без отдельного public prop:

1. если `chips !== undefined` — Chips;
2. иначе если `value !== undefined && value !== null` — Filled;
3. иначе если `placeholder !== undefined` — Placeholder;
4. иначе — Empty.

Empty визуально показывает только chevron. Placeholder использует `text.secondary`, Filled — `text.primary`. Длинный однострочный content сокращается через ellipsis и не вытесняет chevron.

## Geometry и typography

- min-height — 52px;
- radius — 16px;
- horizontal padding — 16px;
- vertical padding — 14px;
- content gap — 8px;
- chevron container — 20×20;
- Body typography — 16.5px / 21px / weight 520;
- width — 100%, min-width — 0.

Font family и letter spacing берутся из выбранной platform foundation. Для SF Pro используется системный web stack, Android использует `"Roboto Flex", Roboto, Arial, sans-serif`.

## Visual states

- Default — `background.secondary` и `stroke.fieldBorderAlpha`;
- Hover — настоящий `:hover` и `states.hover.fieldBorderAlpha`;
- Active — focus или `open=true` и `states.active.fieldBorderAlpha`;
- Error — `status="error"`, `background.negativeTint` и `stroke.negative`;
- Valid — `status="valid"`, `background.secondary` и `stroke.positive`.

Error и Valid имеют приоритет над Hover, focus и `open`.

## Disabled

`disabled` передаётся в настоящий `<button disabled>`. Визуальная surface, border и content сохраняют выбранное состояние, после чего весь trigger композитится с opacity 52%. Дополнительный black/white overlay не используется.

## Chips

Chips mode сохраняет min-height 52px, но не фиксирует height. Контейнер переносит внешний content по строкам с gap 8px; surface растёт по содержимому, а chevron остаётся вертикально центрирован по полной высоте.

`Select` не экспортирует production `Chip`: потребитель передаёт `chips` как `ReactNode`. Это позволяет позже подключить отдельный компонент без изменения Select API.

## Chevron

Chevron — обязательная часть trigger и не выставляется отдельным prop. Точный локальный glyph хранится внутри namespace Select, имеет контейнер 20×20 и использует semantic `icon.secondary` через CSS mask.

## Accessibility

- root — `<button type="button">`;
- `aria-haspopup="listbox"` устанавливается компонентом;
- `aria-expanded` соответствует `open`;
- `disabled` остаётся нативным;
- `aria-label`, `aria-labelledby` и остальные безопасные button attributes прокидываются на trigger.

Select представляет только trigger. Listbox keyboard navigation появится вместе с отдельным dropdown/popover layer.

## Ограничения

- Android typography визуально может выглядеть немного тяжелее iOS и исходного образца, хотя computed values совпадают с прошедшим visual QA `Input`: `"Roboto Flex", Roboto, Arial, sans-serif`, 16.5px / 21px, weight 520, letter spacing -0.21px и `font-variation-settings: normal`. Это известное non-blocking отклонение; компенсировать его изменением weight или foundation tokens не следует;
- dropdown, popover, options и позиционирование меню не входят в компонент;
- production `Chip` не создаётся;
- `FormField` и `FormFields` не создаются;
- Select не реализует Textarea или DatePicker;
- warning, loading и другие неподтверждённые states отсутствуют.
