# VK Lego Icons

## Sources

- [Lego Icons library](https://www.figma.com/design/jduFa1OK4ySPK5YrvhjPD8/%F0%9F%93%90-Lego-Icons?m=auto&node-id=0-1)
- [Lego Icons usage guide](https://www.figma.com/design/jduFa1OK4ySPK5YrvhjPD8/%F0%9F%93%90-Lego-Icons?m=auto&node-id=143-9798)

The production assets in `src/vk-commerce/icons/assets` are direct SVG
exports of Lego Icons source components. Their path geometry, viewport, and
source-specific form weight are not redrawn or normalized by hand.

## Public API

```tsx
import { Icon } from '../src/vk-commerce';

<Icon name="heart_outline" size={28} />
<Icon name="heart" size={28} label="Liked" />
```

`name` does not include a size suffix. `size` selects an exact source asset
from the documented grid: `12`, `16`, `20`, `24`, `28`, `32`,
`36`, or `48`.

The exported `iconNamesBySize`, `IconNameForSize`, and `IconSource` types
describe the valid name and size combinations. There is no cross-size fallback.
An unavailable pair throws a clear runtime error; the component never scales a
different source SVG to impersonate the requested size.

## Import policy

The standard size sections are imported completely unless a source item is one
of the following:

- a red/draft icon;
- a stub, placeholder, guide example, or anti-reference;
- an icon in the deprecated or archive sections;
- a Badge, Spinner, Top Bar-specific asset, reaction, or other composite;
- a color-specific or multi-color asset that cannot use the monochrome
  `currentColor` contract;
- a non-square asset outside the standard icon geometry;
- an unresolved duplicate with the same production name and source size.

For an unresolved source collision, the first component in the canonical size
section remains registered and the alternate is withheld. No artificial suffix
is invented.

The guide status convention is:

- 🔴 red means draft and is excluded;
- 🟡 yellow means the icon is usable by default and is included;
- 🟢 green means approved and is included.

The main size sections do not encode a complete yellow/green status on every
component, so a reliable split between those statuses cannot be derived for the
whole library. The explicitly yellow `shops_16` item is included as
`name="shops" size={16}`.

## Outline and fill

- Outline source names contain `_outline_`; production names retain
  `_outline`, for example `heart_outline`.
- Fill assets keep the regular source name, for example `heart`.
- Outline is the default for normal interface use.
- Fill is preferred for primary buttons, empty states and placeholders, Top
  Bars, priority actions in context menus and bottom sheets, Bottom Bars,
  related controls, and icons over content.
- Stateful actions over content, including like and bookmark, remain outline
  when required by the source guide.
- Small standalone icons around 12–14px may use fill, while icon-heavy lists
  should avoid excessive visual weight.

Published close/cancel actions use their exact Lego names such as `cross`,
`cross_outline`, and `cross_circle`. Aliases are not invented.

## Size and alignment

Each registered asset preserves its own source viewport. The rendered element
always has equal CSS width and height matching its registered source size.

Icons are treated as an extension of typography. `Icon` is an inline block
with an internal zero-width typographic strut. The strut uses the surrounding
font metrics and an icon-sized line box, so the icon exposes a real CSS baseline
without numeric or per-icon optical offsets.

The Figma file currently contains 21 components in the 56px section, including
one stub and 20 non-stub assets. They are inventoried but `56` is not exposed
through `IconSize` because the usage guide's primary production grid currently
ends at 48px.

## Color

Standard Lego Icons are rendered as monochrome CSS masks. Their alpha shape
comes from the unchanged source SVG and their presentation color comes from
`currentColor`. Consumers should apply an existing semantic text or icon color
to the parent.

Color-specific logos, coins, badges, and verification assets are not forced
through the monochrome registry. They require a separate asset contract if
introduced later.

## Accessibility

Icons are decorative by default and receive `aria-hidden="true"`.

Use `label` when an icon conveys meaning without adjacent accessible text:

```tsx
<Icon name="info_circle_outline" size={28} label="Information" />
```

This changes the element to `role="img"` with the supplied accessible label.
`title` adds a native tooltip and is also used as the accessible label when
`label` is omitted.

## Adding a newly published icon

1. Confirm the exact production-ready component name, status, and source size.
2. Exclude red/draft, deprecated, placeholder, and special component assets.
3. Export the exact component as SVG without modifying path geometry.
4. Save it under `assets/<size>/<name>.svg`, removing only the source size
   suffix and technically invalid filename characters when required.
5. Register only that exact pair in `iconNamesBySize` and `iconRegistry`.
6. Verify its source size, outline/fill classification, baseline, and
   `currentColor` behavior in the Icons catalogue.

Never copy a registered SVG into another size directory.
