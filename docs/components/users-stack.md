# Users Stack

`UsersStack` компактно показывает два или три пользовательских Avatar и при необходимости добавляет однострочное описание справа.

## Зависимости

Каждый пользователь рендерится существующим `Avatar` с `size={20}` и `content="picture"`. `UsersStack` не дублирует геометрию, цвета или token logic Avatar.

## API

- `users` — строгий tuple из двух или трёх пользователей;
- `description` — необязательный текст справа;
- `theme` — `light` или `dark`, по умолчанию `light`;
- `platform` — `ios`, `android`, `desktop` или `vkcom`, по умолчанию `ios`;
- `className` — дополнительный класс корневого элемента.

## Геометрия и порядок

- размер каждого Avatar: `20×20px`;
- overlap соседних Avatar: `8px`;
- шаг по горизонтали: `12px`;
- ширина stack с тремя пользователями: `44px`;
- ширина stack с двумя пользователями: `32px`;
- `users[0]` находится слева и сзади;
- `users[users.length - 1]` находится справа и спереди.

Первые Avatar показываются через локальную CSS-маску размером `13.5×20px` и `margin-right: -1.5px`. Последний Avatar виден полностью. Размер самого Avatar не изменяется.

## Description

Между stack и description используется `spacing.sizeL` (`10px`). Текст использует `text.secondary`, platform base font family и `semiboldish` weight. Размер — `15px`, line-height — `18.5px`, letter-spacing — `0`.

Description занимает доступное пространство, имеет `min-width: 0` и обрезается через ellipsis. Размер `158×20px` относится к reference instance и не является обязательным width contract компонента.

## Theme и platform

`theme` передаётся Avatar и выбирает semantic `text.secondary` для description. `platform` передаётся Avatar и выбирает подтверждённые font family и weight description. Геометрия stack одинакова на всех платформах.

## Примеры

### Два пользователя

```tsx
<UsersStack
  users={[
    { src: '/a.jpg', alt: 'A' },
    { src: '/b.jpg', alt: 'B' },
  ]}
/>
```

### Три пользователя и description

```tsx
<UsersStack
  users={[
    { src: '/a.jpg', alt: 'A' },
    { src: '/b.jpg', alt: 'B' },
    { src: '/c.jpg', alt: 'C' },
  ]}
  description="Description"
/>
```

## Ограничения

- поддерживаются только два или три пользователя;
- Avatar всегда имеет размер `20` и Picture content;
- нет варианта с одним пользователем, `4+`, `+N`, `maxVisible` или произвольным размером;
- Stories, Overlay, Badge и другие Avatar extensions не входят в API;
- компонент не является интерактивным.
