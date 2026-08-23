# Segmented Control

`SegmentedControl` — управляемый переключатель между двумя–пятью равноправными вариантами. Компонент использует нативные кнопки и не предполагает обязательной связи с tab panels.

## Public API

```tsx
const items = [
  { value: 'all', label: 'Все' },
  { value: 'photos', label: 'Фото' },
  { value: 'videos', label: 'Видео' },
] as const;

<SegmentedControl
  ariaLabel="Тип контента"
  items={items}
  onChange={setValue}
  platform="ios"
  theme="light"
  value={value}
/>
```

Основные props:

- `items` — tuple из 2–5 элементов;
- `value` — значение активного элемента;
- `onChange` — вызывается со значением нажатого элемента;
- `theme` — `light | dark`, по умолчанию `light`;
- `platform` — `ios | android | desktop | vkcom`, по умолчанию `ios`;
- `ariaLabel` — доступное название группы;
- `className` — дополнительный класс корневого контейнера.

Каждый item требует `value` и содержит `label`, `icon` либо оба. Icon-only item требует `ariaLabel`, чтобы нативная кнопка сохраняла доступное имя.

## Geometry

- корень занимает `100%` ширины родителя;
- outer padding — 2px;
- outer radius — 12px;
- минимальная высота item — 40px;
- item padding — 10px;
- active radius — 10px;
- gap между icon и label — 6px;
- элементы всегда занимают равную ширину.

Reference width не является runtime-контрактом компонента.

## Content

Label остаётся однострочным. Компонент намеренно не добавляет multiline или ellipsis, которых нет в подтверждённом source.

Icon передаётся внешним `ReactNode`. Segmented Control создаёт контейнер 20×20px и внутреннюю область glyph 16×16px; отдельная библиотека иконок не входит в компонент.

## Themes и platforms

Outer surface использует `background.secondary`. Active и inactive content используют `text.primary` и `text.secondary`.

Public foundation не экспортирует устаревший `Background / Background`. Для active surface компонент сохраняет подтверждённое локальное соответствие Light → `primitiveColors.white`, Dark → `primitiveColors.black`, не создавая нового глобального токена.

Typography использует platform foundations: `Font / Family / Base`, `fontSize.text`, `weight.semibold` и `letterSpacing.text`. Размер строки остаётся component-local: 18.5px. iOS использует безопасный Apple system font stack, Android — `"Roboto Flex", Roboto, Arial, sans-serif`.

## Accessibility

- корень использует `role="group"`;
- каждый segment — нативный `<button type="button">`;
- выбранный элемент получает `aria-pressed="true"`;
- keyboard activation остаётся нативной;
- `focus-visible` использует semantic accent outline;
- `ariaLabel` рекомендуется всегда передавать для описания назначения группы.

## Ограничения

- поддерживаются только 2–5 items;
- нет disabled, error, loading, badge и counter;
- нет sliding indicator, shadow, border, underline или анимации;
- компонент полностью controlled и не хранит выбранное значение внутри;
- layout wrapper с page padding и vertical spacing остаётся задачей потребителя.
