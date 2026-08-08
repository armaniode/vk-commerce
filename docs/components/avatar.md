# Avatar

`Avatar` — presentation component для изображения пользователя, текстового обозначения или переданной потребителем иконки. Реализация основана на публичном Avatar v1.1 из Lego Kit и использует VK foundation layer из `src/vk-commerce/tokens`.

## Public API

```ts
interface AvatarProps {
  size?: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56 | 64 | 72 | 80 | 88 | 96;
  content?: 'picture' | 'text' | 'icon';
  src?: string;
  alt?: string;
  label?: string;
  icon?: React.ReactNode;
  stories?: boolean;
  storyRingPlacement?: 'auto' | 'inside' | 'outside';
  overlay?: boolean;
  topLeftSlot?: React.ReactNode;
  topRightSlot?: React.ReactNode;
  bottomRightSlot?: React.ReactNode;
  bottomLeftSlot?: React.ReactNode;
  theme?: 'light' | 'dark';
  platform?: 'ios' | 'android' | 'desktop' | 'vkcom';
  className?: string;
}
```

Defaults:

- `size = 40`;
- `content = 'picture'`;
- `stories = false`;
- `storyRingPlacement = 'auto'`;
- `overlay = false`;
- `theme = 'light'`;
- `platform = 'ios'`.

## Supported sizes

Компонент использует дискретную матрицу без интерполяции.

| Size | Radius | Icon | Text | Auto stories placement | Separator |
| ---: | ---: | ---: | ---: | --- | ---: |
| 16 | 5 | 12 | 5 | outside | 1.2 |
| 20 | 6 | 12 | 8 | outside | 1.2 |
| 24 | 7 | 16 | 8 | outside | 1.2 |
| 28 | 8 | 16 | 10 | outside | 1.2 |
| 32 | 9 | 20 | 10 | outside | 1.2 |
| 36 | 11 | 24 | 13 | outside | 1.2 |
| 40 | 12 | 24 | 14 | inside | 3.6 |
| 44 | 13 | 24 | 14 | inside | 3.6 |
| 48 | 15 | 28 | 17 | inside | 3.6 |
| 56 | 17 | 28 | 18 | inside | 4.4 |
| 64 | 19 | 28 | 21 | inside | 5.2 |
| 72 | 21 | 36 | 26 | inside | 5.2 |
| 80 | 21 | 36 | 30 | inside | 6 |
| 88 | 21 | 36 | 30 | inside | 6.8 |
| 96 | 21 | 36 | 30 | inside | 6.8 |

Вариант `96+` представлен подтверждённой геометрией `96 × 96`, поэтому произвольные размеры больше 96 не поддерживаются.

## Content variants

### Picture

Изображение занимает весь content box и использует `object-fit: cover`. `alt` передаётся непосредственно в `img`. Если `src` отсутствует, компонент показывает локальный fallback с `background.secondary` и не загружает внешний asset.

Обычная рамка использует `stroke.imageBorderAlpha` и толщину `0.4px`.

```tsx
<Avatar
  alt="Алексей"
  content="picture"
  size={48}
  src="/mock/avatars/alexey.jpg"
/>
```

### Text

Фон берётся из `background.secondary`, цвет — из `text.primary`. Font family и semibold weight выбираются из указанного platform mode. Font size задаётся матрицей Avatar, line-height равен 100%, letter-spacing — 0.

Длинный `label` остаётся в одной строке и обрезается с ellipsis. Толщина рамки Text-варианта — `0.5px`.

```tsx
<Avatar content="text" label="VK" platform="android" size={40} />
```

### Icon

Фон использует `background.secondary`, цвет — `icon.primary`. Компонент принимает готовый `ReactNode` и ограничивает контейнер иконки размером из матрицы. SVG потребителя может наследовать `currentColor`.

```tsx
<Avatar content="icon" icon={<ProfileIcon />} size={40} />
```

## Stories

`stories` добавляет две независимые absolute layers и не изменяет размер content box:

- separator использует подтверждённую ширину для выбранного размера;
- accent stroke имеет ширину `1.6px` и использует `stroke.accent`;
- `auto` размещает ring снаружи для размеров 16–36 и внутри для 40–96;
- `inside` и `outside` позволяют явно изменить размещение, сохраняя separator width выбранного размера.

Для separator исходный устаревший semantic token не возвращается в foundation API. Внутри Avatar применяется component-local compatibility mapping: `primitiveColors.white` для Light и `primitiveColors.black` для Dark.

```tsx
<Avatar
  alt="История Марии"
  stories
  storyRingPlacement="auto"
  src="/mock/avatars/maria.jpg"
  theme="dark"
/>
```

## Overlay

`overlay` располагается над Picture, Text или Icon и под Stories и slots. Цвет берётся из `other.overlaySecondary`.

## Slots

Доступны четыре anchors:

- `topLeftSlot`;
- `topRightSlot`;
- `bottomRightSlot`;
- `bottomLeftSlot`.

Каждый anchor имеет размер `10 × 10px`, находится точно в углу Avatar и центрирует переданный `ReactNode`. Контент может визуально выходить за границы anchor. Slots рендерятся только для размеров от 24 и находятся выше Overlay и Stories.

```tsx
<Avatar
  bottomRightSlot={<StatusBadge />}
  label="АМ"
  content="text"
  size={56}
/>
```

## Theme и platform

Light и Dark выбираются через `getSemanticColors(theme)`; отдельные копии цветов внутри компонента не создаются. Platform mode влияет только на подтверждённые typography foundations Text-варианта:

- iOS, Desktop и vkCom используют `SF Pro`;
- Android использует `Roboto Flex`;
- semibold weight берётся из соответствующего platform config.

Геометрия Avatar одинакова на всех платформах.

## Accessibility

- Avatar не получает button semantics и не становится интерактивным автоматически.
- При наличии `src` значение `alt` передаётся в `img`.
- Пустой `alt` оставляет Picture декоративным без дополнительного ARIA label.
- Text и Icon не получают дополнительную роль.

## Текущие ограничения

- Иконки Lego не входят в компонент: `icon` передаётся потребителем.
- Badge components и Users Stack не реализованы; Avatar предоставляет только slot anchors.
- Отдельный Picture component не создаётся.
- Дополнительные avatar palettes не добавлены.
- Компонент не подключён к showcase.
