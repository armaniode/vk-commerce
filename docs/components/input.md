# Input

`Input` — нативное однострочное поле ввода VK Social Commerce. Компонент использует подтверждённые VK foundations, сохраняет семантику HTML `<input>` и не создаёт отдельный production-слой Form Fields.

## Public API

```tsx
<Input
  name="query"
  placeholder="Поиск"
  status="default"
  before={<SearchIcon />}
  theme="light"
  platform="ios"
  onChange={handleChange}
/>
```

`InputProps` наследует безопасные `InputHTMLAttributes<HTMLInputElement>`, кроме нативного `size`. Доступны `value`, `defaultValue`, `placeholder`, `onChange`, `name`, `type`, `disabled`, `readOnly`, `required`, `autoComplete`, `inputMode`, `aria-*` и остальные стандартные атрибуты.

Дополнительные props:

- `status`: `default | error | valid`, по умолчанию `default`;
- `before`, `after`: внешние `ReactNode` в контейнерах 24×24;
- `theme`: `light | dark`, по умолчанию `light`;
- `platform`: `ios | android | desktop | vkcom`, по умолчанию `ios`;
- `className`: класс корневой поверхности.

Компонент поддерживает `ref` на нативный `HTMLInputElement`.

## Content model

Figma source описывает `Empty`, `Placeholder` и `Filled` как instance swaps. В React они представлены нативной моделью поля:

- Empty — нет `value`/`defaultValue` и `placeholder`;
- Placeholder — значение отсутствует, передан `placeholder`;
- Filled — передан `value` или `defaultValue`.

Отдельного public prop `content` нет.

## Geometry и typography

- высота — 52px;
- radius — 16px;
- horizontal padding — 16px;
- content gap — 8px;
- before/after slots — 24×24;
- Body typography — 16.5px / 21px / weight 520;
- letter spacing и font family берутся из выбранной platform foundation.

Input занимает `width: 100%`, имеет `min-width: 0` и не фиксирует reference width 320px. Android использует `"Roboto Flex", Roboto, Arial, sans-serif`, чтобы отсутствие Roboto Flex не приводило к serif fallback.

## Visual states

- Default — `background.secondary` и `stroke.fieldBorderAlpha`;
- Hover — реальный `:hover` и `states.hover.fieldBorderAlpha`;
- Active — `:focus-within` и `states.active.fieldBorderAlpha`;
- Error — `status="error"`, `background.negativeTint` и `stroke.negative`;
- Valid — `status="valid"`, `background.secondary` и `stroke.positive`.

Error и Valid имеют приоритет над hover/focus. При `status="error"` компонент выставляет `aria-invalid`, если потребитель не передал собственное значение.

## Disabled

`disabled` передаётся в настоящий `<input disabled>`. Поверх content и surface рендерится отдельный clipped overlay с подтверждённой opacity `0.52`.

Source использует устаревший `Background / Background`, которого нет в public foundations. Поэтому Input применяет только component-local подтверждённое соответствие: white для Light и black для Dark. Глобальный compatibility token не создаётся.

## Before и after

`before` и `after` принимают внешний `ReactNode`; Lego Icons пока не входят в компонент. Slot наследует semantic icon color через `currentColor`, если переданный glyph это поддерживает.

Source capability `Clear Input` зафиксирована, но отложена до появления icon layer. Production Input не рисует собственный clear glyph и не добавляет не подтверждённый clear API.

## Accessibility

- используется настоящий `<input>`;
- keyboard interaction, focus, `disabled`, `readOnly` и form attributes остаются нативными;
- компонент не добавляет собственные keyboard handlers;
- переданный `ref` указывает на `HTMLInputElement`.

## Ограничения

- создаётся только Input, без `FormField` или `FormFields`;
- Select, Textarea и DatePicker не входят в этот этап;
- Clear Input и Lego Icons не перенесены;
- warning, loading и другие неподтверждённые statuses отсутствуют.
