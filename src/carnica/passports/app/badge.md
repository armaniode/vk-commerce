# APP Badge (`badge 3.0`)

## Мета

- **Пакет**: @carnica/ui-kit APP
- **Figma**: `05_Carnica UI kit APP Copy` -> `.badge 3.0`
- **Node**: `34792:150143`
- **Component set key**: `6d34787991adf40a9db2b09099cfcad4517606f5`
- **Variants**: 72 variants
- **Runtime export**: `components.app.Badge`
- **Файл**: `src/carnica/components/app/badges/Badge.tsx`
- **Статус**: APP-ready

## Variant axes

| Axis | Values |
|---|---|
| `view` | `dot`, `text`, `icon` |
| `color` | `default on bg_primary`, `default on bg_secondary`, `default on bg_tertiary`, `brand`, `invert`, `accent`, `error`, `success`, `custom` |
| `size` | `S`, `M` |
| `stretch` | `false`, `true` |

`stretch=true` существует только для `view=text`. `dot` и `icon` всегда fixed-size.

## Runtime props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `view` | `'dot' \| 'text' \| 'icon'` | `'dot'` | Discriminant for badge shape. |
| `color` | Figma color string | `'default on bg_primary'` | Includes `custom`; runtime keeps Figma default custom color. |
| `size` | `'S' \| 'M'` | `'S'` | Dot and content views have different geometry. |
| `label` | `ReactNode` | required for text | Text counter/content. |
| `icon` | `ReactNode` | required for icon | Icon content, rendered with currentColor. |
| `stretch` | `boolean` | `true` for text | Only `view='text'`; `false` clamps to one symbol. |

## Type guard decisions

- `view='dot'` does not accept `label`, `icon`, or `stretch`.
- `view='text'` requires `label` and may use `stretch`.
- `view='icon'` requires `icon` and does not accept `label` or `stretch`.
- `color='custom'` uses Figma default `surface/08-yellow` with `constant/dark`; no separate custom color props.
- Badge is non-clickable and should live inside one parent component; one parent gets only one badge.

## Dimensions

| Variant | Runtime size |
|---|---|
| `view=dot, size=S` | 8x8 |
| `view=dot, size=M` | 12x12 |
| `view=text, size=S` | height 16, min-width 16, padding 4px inline |
| `view=text, size=M` | height 24, min-width 24, padding 6px inline / 2px block |
| `view=icon, size=S` | 16x16, icon box 10 |
| `view=icon, size=M` | 24x24, icon box 14 |

Figma documentation copy says `S — 16x16` and `M — 24x24` for some sections, but component geometry is the source of truth: dots are 8/12 and text/icon are 16/24.

## Colors

| `color` | Background | Foreground |
|---|---|---|
| `default on bg_primary` | `elements/primary` | `content/primary` |
| `default on bg_secondary` | `elements/secondary` | `content/primary` |
| `default on bg_tertiary` | `elements/additional01` over tertiary context | `content/primary` |
| `brand` | `brand/primary` | `constant/dark` |
| `invert` | `elements/active` | `content/primary 100%-invert` |
| `accent` | `link/primary` | `constant/light` |
| `error` | `error/primary` | `constant/light` |
| `success` | `success/primary` | `constant/light` |
| `custom` | `surface/08-yellow` | `constant/dark` |

## Figma properties

| Key | Type | Default |
|---|---|---|
| `↩︎ label#34792:0` | TEXT | `2` |
| `❖ icon#34792:19` | INSTANCE_SWAP | icon component set |
| `view` | VARIANT | `dot` |
| `color` | VARIANT | `default on bg_primary` |
| `size` | VARIANT | `S` |
| `stretch` | VARIANT | `false` |

## StoriesBadge

- **Figma**: `.stories badge`
- **Node**: `5038:46214`
- **Component set key**: `a7827ed7ef8c9cc46656f1697c180436d98dc73d`
- **Runtime export**: `components.app.StoriesBadge`
- **Variants**: `activated=true`, `activated=false`

`StoriesBadge` is a separate APP-only component for parent stories components. It is not a variant of `Badge`.

## Button integration

`button 2.5` exposes `badge#13704:0` as a boolean property only for `view=icon` states:

- `style=default`: `state=default` and `state=pressed`, all sizes.
- `style=glass`: `state=default`, all sizes.
- `state=disabled` and `state=loading`: no runtime badge.

Runtime keeps `Button` API as `badge?: boolean`. Badge label remains `"2"`, matching the Figma component property default.

## Examples

```tsx
import { Badge, StoriesBadge } from '../carnica/components/app';
import { IconBell } from '../carnica/icons/alert';

<Badge />
<Badge view="text" label="99+" color="accent" size="M" />
<Badge view="text" label="2" color="brand" stretch={false} />
<Badge view="icon" icon={<IconBell />} color="success" size="M" />
<StoriesBadge activated={false} />
```
