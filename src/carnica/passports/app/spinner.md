# APP Spinner (`spinner 2.1`)

## Мета

- **Пакет**: @carnica/ui-kit APP
- **Figma**: `05_Carnica UI kit APP Copy` -> `spinner 2.1`
- **Node**: `14447:9258`
- **Component set key**: `8e1b37482fddc4a28e1a87577cb3286d32c20197`
- **Variants**: 10 variants
- **Runtime export**: `components.app.Spinner`
- **Файл**: `src/carnica/components/app/spinner/Spinner.tsx`
- **Статус**: APP-ready

## Variant axes

| Axis | Values |
|---|---|
| `theme` | `light`, `dark` |
| `color` | `constant dark/light`, `constant dark/brand`, `constant light/brand`, `brand`, `brand/invert` |

## Runtime props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `theme` | `'light' \| 'dark'` | `'light'` | Matches the Figma theme switch. |
| `color` | Figma color string | `'constant dark/light'` | Selects one of five documented color pairs. |
| `size` | `number` | `20` | Runtime can scale from the Figma 32x32 Lottie source. |
| `aria-label` | `string` | — | If present, wrapper uses `role="status"`; otherwise spinner is decorative. |

## Colors

JSON files are the motion/color source of truth. Documentation text explains when to choose each variant.

| `color` | Runtime pair |
|---|---|
| `constant dark/light` | `constant/dark` / `constant/light` |
| `constant dark/brand` | `constant/dark` / `brand/primary` |
| `constant light/brand` | `constant/light` / `brand/primary` |
| `brand` | light: `constant/dark` / `brand/primary`; dark: `constant/light` / `brand/primary` |
| `brand/invert` | light: `constant/light` / `brand/primary`; dark: `constant/dark` / `brand/primary` |

Hex pairs from attached JSON:

| JSON | Pair |
|---|---|
| `28303F - FFFFFF.json` | `#28303F` / `#FFFFFF` |
| `28303F - FFC800.json` | `#28303F` / `#FFC800` |
| `FFC800 - FFFFFF.json` | `#FFC800` / `#FFFFFF` |

## Motion

- Figma source is a 32x32 Lottie animation, 60fps, 120 frames total.
- Runtime loop is `2000ms`.
- Easing is `cubic-bezier(0.2, 0, 0, 1)`.
- The first filled circle layer scales X from `0 -> 1 -> 0` over frames `0..50`.
- The second filled circle layer repeats the same transition over frames `60..110`.
- Static Lottie circles are treated as alpha mattes and map to the SVG clip path.
- Runtime uses inline SVG and CSS keyframes; no Lottie dependency is introduced.

## Button integration

`button 2.5` loading states render APP `Spinner` with the same size scale as before:

| Button size | Spinner size |
|---|---|
| `large` | 24 |
| `medium` | 20 |
| `small` | 14 |

Color mapping follows the Figma loading variants:

| Button priority | Spinner color |
|---|---|
| `primary`, `destructive` | `constant dark/light` |
| `tertiary` | `brand/invert` |
| all `secondary ...` priorities | `brand` |

## Examples

```tsx
import { Spinner } from '../carnica/components/app';

<Spinner />
<Spinner color="brand" size={24} />
<Spinner color="brand/invert" theme="dark" aria-label="загрузка" />
```
