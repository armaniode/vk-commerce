# Button

`Button` — нативная кнопка VK Social Commerce для действий в мобильных экранах и React-прототипах. Компонент использует VK foundations и не зависит от других button-реализаций репозитория.

## Public API

```tsx
<Button
  size="medium"
  width="hugged"
  appearance="neutral"
  mode="primary"
  before={<SomeIcon />}
  after={<SomeIcon />}
  counter={3}
  theme="light"
  platform="ios"
>
  Button
</Button>
```

Основные props:

- `size`: `small | medium | large`, по умолчанию `small`;
- `width`: `hugged | filled`, по умолчанию `hugged`;
- `appearance`: `neutral | overlay | custom`, по умолчанию `neutral`;
- `mode`: `primary | secondary | outline | link`, по умолчанию `primary`;
- `theme`: `light | dark`, по умолчанию `light`;
- `platform`: `ios | android | desktop | vkcom`, по умолчанию `ios`;
- `disabled`: передаётся в нативный `<button disabled>`;
- стандартные безопасные атрибуты `<button>`, включая `type`, `name`, `onClick` и `aria-*`.

Типы запрещают комбинацию `width="filled"` и `mode="link"`: Filled + Link отсутствует в публичном source.

## Sizes

| Size | Высота | Radius | Padding X | Gap | Icon | Label |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `small` | 28 | 8 | 12 | 6 | 16 | 13.5 / 15 / 600 |
| `medium` | 38 | 12 | 14 | 6 | 20 | 15 / 18.5 / 580 |
| `large` | 52 | 16 | 16 | 6 | 24 | 18 / 21 / 600 |

Icon-only использует квадрат 28×28, 38×38 или 52×52. Link сохраняет высоту размера, но компенсирует обычный внешний horizontal padding и получает ширину по контенту.

## Width

- `hugged` — ширина определяется контентом;
- `filled` — кнопка занимает 100% ширины родителя, reference width из макета не является runtime-контрактом.

## Appearance и mode

Каждый appearance поддерживает `primary`, `secondary`, `outline` и `link`. Для `filled` доступны только `primary`, `secondary` и `outline`.

- `neutral` использует нейтральные semantic colors; Primary сохраняет объёмную поверхность, highlight и внутренние тени;
- `overlay` предназначен для контрастного фона и сохраняет подтверждённые прозрачность и backdrop blur;
- `custom` использует semantic accent purple из текущей темы.

Light/Dark выбирают значения из semantic foundations. Neutral Primary отдельно меняет тёмную glossy-поверхность в Light на светлую полупрозрачную поверхность в Dark.

## Content

Text-вариант принимает обязательный `children` и опциональные `before`, `after`, `counter`. `before` и `after` размещаются в контейнерах 16, 20 или 24 px и принимают внешний `ReactNode`.

```tsx
<Button before={<SomeIcon />} counter={3} after={<SomeIcon />}>
  Button
</Button>
```

Counter остаётся внутренней частью Button и принимает `ReactNode | number | string`. Его API позволяет позже заменить внутреннюю реализацию отдельным Counter без изменения потребительского кода.

## Icon-only

Icon-вариант принимает `icon`, не допускает одновременные `children`, `before`, `after` или `counter` и требует доступный `aria-label`.

```tsx
<Button icon={<SearchIcon />} aria-label="Поиск" size="medium" />
```

Indicator пока не перенесён: он зависит от отдельного Badge Dot. Lego Icons также не входят в Button; `before`, `after` и `icon` можно будет подключить к ним без изменения public API.

## Disabled

Disabled использует подтверждённую component-local opacity `0.52` и настоящий HTML-атрибут `disabled`. Это значение не добавляется в глобальные foundations.

## Platform

Geometry одинакова для `ios`, `android`, `desktop` и `vkcom`. Platform определяет font family и доступные foundation weights. Android использует `"Roboto Flex", Roboto, Arial, sans-serif`, чтобы отсутствие локально установленного Roboto Flex не приводило к serif fallback.

## Accessibility

- корневой элемент — нативный `<button>`;
- keyboard interaction и `disabled` остаются нативными;
- `focus-visible` показывает безопасный semantic accent outline;
- icon-only требует `aria-label`;
- компонент не добавляет собственные keyboard handlers.

## Ограничения

- Filled + Link не поддерживается;
- Indicator и Badge Dot не перенесены;
- Lego Icons не входят в компонент;
- отдельный публичный Counter пока не создан;
- Button не добавляет hover/pressed-состояния, не подтверждённые публичным source.
