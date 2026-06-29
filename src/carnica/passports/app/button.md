# APP Button (`button 2.5`)

## Мета

- **Пакет**: @carnica/ui-kit APP
- **Figma**: `05_Carnica UI kit APP Copy` → `button 2.5`
- **Node**: `1311:3203`
- **Component set key**: `e091f3958e87ecfb8a446373fea1ecd020d1462b`
- **Variants**: 294 variants
- **Runtime export**: `components.app.Button`
- **Файл**: `src/carnica/components/app/buttons/Button.tsx`
- **Статус**: APP-ready

## Variant axes

| Axis | Values |
|---|---|
| `style` | `default`, `glass` |
| `priority` | `primary`, `secondary on bg_primary`, `secondary on bg_secondary`, `secondary on bg_tertiary`, `secondary on bg_additional`, `tertiary`, `destructive` |
| `view` | `text`, `icon` |
| `state` | `default`, `pressed`, `disabled`, `loading` |
| `size` | `large`, `medium`, `small` |

Runtime API keeps Figma values exact, except Figma axis `style` is exposed as `appearance`, because React already uses `style` for inline CSS.

## Runtime props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `appearance` | `'default' \| 'glass'` | `'default'` | Maps to Figma `style`. `glass` has no `pressed` variant. |
| `priority` | Figma priority string | `'primary'` | Includes `secondary on bg_additional`. |
| `view` | `'text' \| 'icon'` | `'text'` | Discriminant for text vs icon button. |
| `state` | `'default' \| 'pressed' \| 'disabled' \| 'loading'` | `'default'` | Source of truth; component sets `disabled` and `aria-busy`. |
| `size` | `'large' \| 'medium' \| 'small'` | `'large'` | `large` = 56px, `medium` = 44px, `small` = 24px. |
| `children` | `ReactNode` | required for text | Text label. One line with ellipsis. |
| `sale` | `ReactNode` | — | Only `view='text'` + `size='large'`; rendered with 60% opacity. |
| `leftIcon` / `rightIcon` | `ReactNode` | — | Only `view='text'` + `size='medium'|'small'`. |
| `icon` | `ReactNode` | required for icon | Only `view='icon'`. |
| `aria-label` | `string` | required for icon | Required by types for icon-only button. |
| `badge` | `boolean` | `false` | Only `view='icon'`; renders APP `badge 3.0` with default label `2`. |

## Type guard decisions

- `appearance='glass'` does not accept `state='pressed'`, because the Figma set has no glass pressed variants.
- `view='icon'` requires `icon` and `aria-label`; it does not accept `children`.
- `sale` is large-text only and uses 60% opacity over its resolved text color.
- `leftIcon` and `rightIcon` are compact-text only: `medium` and `small`.
- `badge` remains boolean-only and is rendered only for Figma states that contain the badge layer.
- The external 20px side padding from the large Figma component is not baked into React; screen layout owns that padding.

## Badge integration

`badge#13704:0` is available only for `view=icon` in Figma:

| Button variant | Runtime badge |
|---|---|
| `style=default`, `state=default`, all sizes | `Badge view="text" size="S" stretch={false} label="2"` |
| `style=default`, `state=pressed`, all sizes | `Badge view="text" size="S" stretch={false} label="2"` |
| `style=glass`, `state=default`, all sizes | `Badge view="text" size="S" stretch={false} label="2"` |
| `state=disabled` / `state=loading` | no badge |

Badge color follows the nested Figma instances: `primary` and `destructive` use `color=accent`; all secondary and tertiary priorities use `color=brand`.

## Spinner integration

`state=loading` renders `components.app.Spinner` instead of button label/icon content.

| Button priority | Spinner color |
|---|---|
| `primary`, `destructive` | `constant dark/light` |
| `tertiary` | `brand/invert` |
| all `secondary ...` priorities | `brand` |

## Dimensions

| Variant | Runtime size |
|---|---|
| `size=large, view=text` | height 56, full width of parent, inner padding 20px |
| `size=large, view=icon` | 56x56, icon 24 |
| `size=medium, view=text` | height 44, hug width, padding 16px, icon 20 |
| `size=medium, view=icon` | 44x44, icon 24 |
| `size=small, view=text` | height 24, hug width, padding 6px, icon 16 |
| `size=small, view=icon` | 24x24, icon 16 |

## Figma properties

| Key | Type | Default |
|---|---|---|
| `↩︎ label#137:0` | TEXT | `кнопка` |
| `↩︎ sale#10904:81` | TEXT | `100 ₽` |
| `sale#10904:0` | BOOLEAN | `false` |
| `badge#13704:0` | BOOLEAN | `false` |
| `left icon#25180:0` | BOOLEAN | `false` |
| `right icon#25180:97` | BOOLEAN | `false` |
| `❖ icon#1486:0` | INSTANCE_SWAP | main icon for `view=icon` |
| `❖ left icon#25180:194` | INSTANCE_SWAP | compact text left icon |
| `❖ right icon#25180:291` | INSTANCE_SWAP | compact text right icon |

## Examples

```tsx
import { Button } from '../carnica/components/app';

<Button priority="primary">пополнить баланс</Button>

<Button
  priority="secondary on bg_secondary"
  size="medium"
>
  пока не надо
</Button>

<Button
  priority="secondary on bg_additional"
  size="small"
  leftIcon={<IconCalendar />}
>
  завтра
</Button>

<Button
  view="icon"
  icon={<IconSettings />}
  aria-label="настроить"
  badge
/>

<Button
  appearance="glass"
  priority="tertiary"
  state="loading"
>
  настроить
</Button>
```
