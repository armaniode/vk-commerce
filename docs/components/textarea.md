# Textarea

`Textarea` — многострочное поле VK Social Commerce с нативной семантикой `<textarea>`, двумя режимами высоты и состояниями поля формы.

## Public API

```tsx
<Textarea
  height="hug"
  placeholder="Комментарий"
  status="default"
  theme="light"
  platform="ios"
/>
```

`TextareaProps` наследует безопасные `TextareaHTMLAttributes<HTMLTextAreaElement>`, кроме `rows`: высота управляется подтверждёнными вариантами `height="hug"` и `height="fixed"`.

Дополнительные props:

- `height?: hug | fixed`, по умолчанию `hug`;
- `status?: default | error | valid`, по умолчанию `default`;
- `before?: ReactNode` и `after?: ReactNode` — внешние элементы в слотах 24×24;
- `theme?: light | dark`, по умолчанию `light`;
- `platform?: ios | android | desktop | vkcom`, по умолчанию `ios`;
- `className` применяется к внешней surface.

Компонент поддерживает `ref` на `HTMLTextAreaElement`, native `value`, `defaultValue`, `placeholder`, `onChange`, `onInput`, `disabled`, `readOnly`, `required`, `maxLength`, `autoComplete` и `aria-*` attributes.

## Content model

Content определяется нативными данными, без отдельного prop:

1. пустое значение без `placeholder` — Empty;
2. пустое значение с `placeholder` — Placeholder;
3. `value` или `defaultValue` содержит текст — Filled.

Текст остаётся многострочным: переносится по строкам и не использует ellipsis или `white-space: nowrap`.

## Height

### Hug

- минимальная высота — 52px;
- высота вычисляется по настоящему `textarea.scrollHeight`;
- изменение controlled `value`, initial `defaultValue`, пользовательский input и изменение ширины запускают повторное измерение;
- максимальная высота — 208px;
- после достижения максимума включается нативная вертикальная прокрутка.

При прямом программном изменении DOM-свойства `ref.current.value` потребитель должен также отправить нативное событие `input`, как и для других uncontrolled form controls.

### Fixed

Высота всегда равна 120px. Внешняя surface не растёт, а переполненный текст прокручивается внутри.

## Geometry и typography

- radius — 16px;
- horizontal padding — 16px;
- vertical padding — 14px;
- content gap — 8px;
- before/after slots — 24×24;
- Body typography — 16.5px / 21px / weight 520;
- width — 100%, min-width — 0.

Font family и letter spacing берутся из выбранной platform foundation по той же схеме, что production `Input`. Textarea не добавляет `font-variation-settings`; Android использует `"Roboto Flex", Roboto, Arial, sans-serif`.

## Visual states

- Default — `background.secondary` и `stroke.fieldBorderAlpha`;
- Hover — настоящий `:hover` и `states.hover.fieldBorderAlpha`;
- Active — `:focus-within` и `states.active.fieldBorderAlpha`;
- Error — `status="error"`, `background.negativeTint` и `stroke.negative`;
- Valid — `status="valid"`, `background.secondary` и `stroke.positive`.

Error и Valid имеют приоритет над Hover и Active.

## Disabled

`disabled` передаётся в настоящий `<textarea disabled>`. Выбранные surface, border и content сохраняются, после чего весь visual root композитится с opacity 52%. Дополнительный black/white overlay не используется, а нативная browser opacity сброшена во избежание двойного затемнения.

## Before и After

Слоты принимают внешний `ReactNode`, наследуют `currentColor` и остаются у верхней строки при любой высоте Textarea. Lego Icons и автоматический Clear button в компонент не входят.

## Scrollbar

Scrollbar связан с настоящей прокруткой textarea. Для браузеров с WebKit scrollbar API используются container 10px, внутренний thumb 6px, вертикальные отступы 12px, rounded shape и `icon.medium` с opacity 48%. Точное отображение системного scrollbar может различаться между браузерами, которые ограничивают его стилизацию.

## Ограничения

- production `FormField` и `FormFields` не создаются;
- Select, Input, DatePicker и другие Form Fields не являются частью Textarea;
- автоматический Clear button и библиотека Lego Icons не переносятся;
- `rows` не входит в public API, поскольку высота задаётся `height` variant.
