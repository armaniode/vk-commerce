# Component Properties

Canonical component passports для Carnica-компонентов: variants, property keys, gotchas. Для full platform catalogue использовать capability skills `carnica-ui-kit-app` и `carnica-ui-kit-web` (Figma Plugin API import workflow).

Этот файл — owner для component passports (D-08 leaves rule, owner REF-02 `carnica-components`).

## Table of contents

1. Import rule
2. APP navbar 3.0
3. APP navbar modal 1.0
4. APP button 2.5
5. APP button inline text 3.0
6. APP cell 3.1
7. APP cell grid 2.1
8. APP input 2.3
9. APP checkbox 2.1
10. APP iOS_NumericKeyboard
11. APP chips text collection 2.1
12. APP accordion group 2.2
13. APP avatar 3.0
14. WEB tag 2.3
15. WEB title 2.1
16. WEB button 2.3 — text-кнопки всегда Medium 500

---

## 1. Import rule

- Component set: `figma.importComponentSetByKeyAsync(key)`.
- Single component: `figma.importComponentByKeyAsync(key)`.
- Always use full property keys with `#uid`.

## 2. APP navbar 3.0

Key: `37960573b758b856e27d9ab2dfe2d0b4669d5ee9` (component set)

Top-level variant:

| Variant | Values |
|---|---|
| `view` | `default`, `search field`, `avatar` |

Nested `settings`:

| Key | Type | Values |
|---|---|---|
| `style` | VARIANT | `default`, `glass` |
| `background` | VARIANT | `false`, `true` |
| `right view` | VARIANT | `true`, `false` |
| `left view` | VARIANT | `true`, `false` |
| `align text` | VARIANT | `center` |
| `title#27239:0` | BOOLEAN | show title |
| `↩︎ title#27230:0` | TEXT | title text |

Nested `❖ right view settings`:

| Key | Type | Meaning |
|---|---|---|
| `2 button#27230:17` | BOOLEAN | show second right button |
| `type` | VARIANT | usually `button` |

Navbar button nested instances (`L button settings`, `R button settings`, `2R button settings`) expose button-like properties:

| Key | Type |
|---|---|
| `style` | VARIANT |
| `priority` | VARIANT |
| `badge#13704:0` | BOOLEAN |
| `❖ icon#1486:0` | INSTANCE_SWAP |

## 3. APP navbar modal 1.0

Key: `bef5f93f4a80c3ea80f50bcfcf13403bcee1ff6d` (single component)

Critical: import with `importComponentByKeyAsync`, not `importComponentSetByKeyAsync`.

```js
const comp = await figma.importComponentByKeyAsync('bef5f93f4a80c3ea80f50bcfcf13403bcee1ff6d');
const nav = comp.createInstance();
nav.layoutSizingHorizontal = 'FILL';
```

Use in every bottom sheet/modal that needs a drag handle.

## 4. APP button 2.5

Key: `e091f3958e87ecfb8a446373fea1ecd020d1462b` (component set)
Node: `1311:3203`
Variants: 294

Variants:

| Variant | Values |
|---|---|
| `style` | `default`, `glass` |
| `priority` | `primary`, `secondary on bg_primary`, `secondary on bg_secondary`, `secondary on bg_tertiary`, `secondary on bg_additional`, `tertiary`, `destructive` |
| `view` | `text`, `icon` |
| `state` | `default`, `pressed`, `disabled`, `loading` |
| `size` | `large`, `medium`, `small` |

Properties:

| Key | Type |
|---|---|
| `↩︎ label#137:0` | TEXT |
| `↩︎ sale#10904:81` | TEXT |
| `sale#10904:0` | BOOLEAN |
| `badge#13704:0` | BOOLEAN |
| `left icon#25180:0` | BOOLEAN |
| `right icon#25180:97` | BOOLEAN |
| `❖ icon#1486:0` | INSTANCE_SWAP |
| `❖ left icon#25180:194` | INSTANCE_SWAP |
| `❖ right icon#25180:291` | INSTANCE_SWAP |

Gotchas:
- `style=glass` has no `state=pressed` variants.
- `size=large` has an external 20px layout container; edit it only when the screen owns side spacing.
- Keep internal padding for `size=medium` and `size=small`.
- `sale` is large-only; `left icon` / `right icon` are compact text (`medium`/`small`) only.

## 5. APP button inline text 3.0

Key: `8de7a4cdeb7ec59962d656236964b74c7c61f5ed` (component set)

Gotcha: APP priority `seсondary` contains a Cyrillic `с`, not Latin `c`.

| Key | Type | Meaning |
|---|---|---|
| `↩︎ text#538:0` | TEXT | label |
| `right icon#623:0` | BOOLEAN | show right icon |
| `left icon#1139:0` | BOOLEAN | show left icon |
| `❖ right icon#623:18` | INSTANCE_SWAP | right icon |
| `❖ left icon#1139:6` | INSTANCE_SWAP | left icon |

For "все функции >": use priority `seсondary`, set `right icon#623:0 = true`, swap chevron `direction=right`, recolor icon to `content/secondary`.

WEB `button inline text 2.1` uses normal Latin `secondary`.

## 6. APP cell 3.1

Key: `b8778e5453de3f31a334a1179c313fffad89f39c` (component set)
WEB key: `20c658e1fb9e28f70ed07d9e88c8248dbc419eba`

Variants:

| Variant | Values |
|---|---|
| `background` | `none`, `default on bg_primary`, `default on bg_secondary` |
| `skeleton` | `false`, `true` |
| `title size` | `S`, `L` |
| `reverse` | `true`, `false` |
| `disabled` | `false`, `true` |

Properties:

| Key | Type |
|---|---|
| `↩︎ title#16440:33` | TEXT |
| `↩︎ subtitle#16440:41` | TEXT |
| `subtitle#16440:45` | BOOLEAN |
| `title#16443:0` | BOOLEAN |
| `left view#16392:12` | BOOLEAN |
| `right view#16392:16` | BOOLEAN |

Rules:

- In white cards use `background=none`, not `default on bg_secondary`.
- Reset padding when parent card already has padding.
- Recolor right chevron to `content/secondary`.
- For icon avatar: nested path `cell -> ❖ left view settings -> avatar`; switch avatar to `view=icon`, then set `❖ icon#16163:3` to icon variant id.

## 7. APP cell grid 2.1

Key: `ba2d5c74e859c45a172f612a536811dbdb73bad9`

Rules:

- Use for 2-column quick actions.
- Nested avatar usually needs `view=icon`, `size=L`.
- TEXT property for title can fail visually; if needed, update nested text node via Method A and restore style.
- Icons are swapped inside nested avatar, not by detaching.

## 8. APP input 2.3

Key: `897ac5f2f1344d72e3a2c8c93c3b44d635e5d935`

Nested `text input settings`:

| Key | Type | Values/Meaning |
|---|---|---|
| `state` | VARIANT | `default`, `entering`, `filled` |
| `↩︎ text inside#28956:0` | TEXT | value |
| `↩︎ placeholder#28890:4` | TEXT | placeholder |
| `right view#142:32` | BOOLEAN | scanner/right view |
| `label#122:65` | BOOLEAN | label |
| `caption#122:58` | BOOLEAN | caption |

Nested `label settings`:

| Key | Type |
|---|---|
| `↩︎ label#28885:1` | TEXT |

Rules:

- Reset padding to avoid double 20px inside form containers.
- Placeholder state: hide/empty label as needed, value text in `content/tertiary`, right view hidden.
- Focused/entering state: set nested `state = 'entering'`.

## 9. APP checkbox 2.1

Key: `469a4c4664a7d9e66e638d54fdfa0312a03b820a`

Known issue: some BOOLEAN properties may not apply via `setProperties`; direct `.visible` on nested label nodes is acceptable as fallback. Mixed text colors can be applied with `setRangeFills`.

## 10. APP iOS_NumericKeyboard

Key: `eb1ea39626022a391b9b953b04d921debc078a7d`

Important properties:

| Key | Type | Meaning |
|---|---|---|
| `button#931:1` | BOOLEAN | show CTA button |
| `predictive#931:4` | BOOLEAN | predictive row |
| `dark mode` | VARIANT | light/dark mode |

The keyboard contains a button; do not add a separate CTA button when `button#931:1 = true`.

## 11. APP chips text collection 2.1

Key: `b848915c032aae01a38bb523e4018c4af2c928ba`

Variants:

| Variant | Values |
|---|---|
| `wrap` | `false`, `true` |
| `skeleton` | `false`, `true` |

Nested `.chips item`:

| Key | Type |
|---|---|
| `↩︎ label#2732:2` | TEXT |
| `placeholder#26148:17` | BOOLEAN |
| `counter#10639:0` | BOOLEAN |
| `right icon#4141:0` | BOOLEAN |
| `left icon#2732:1` | BOOLEAN |
| `badge#7407:0` | BOOLEAN |

Rules:

- Collection has 12 fixed items; hide extra items with `.visible = false`.
- For centered wrapped rows: set collection `counterAxisAlignItems = 'CENTER'` and `primaryAxisAlignItems = 'CENTER'`.

## 12. APP accordion group 2.2

Key: `4612d43d611a917d54b03d0bf92794b9c9c596d1`

Variants:

| Variant | Values |
|---|---|
| `skeleton` | `false`, `true` |

Line visibility is controlled by BOOLEAN properties, not a `count` variant:

| Key range | Meaning |
|---|---|
| `2 line#17341:8` ... `10 line#17341:32` | show/hide lines 2-10 |

Nested line settings:

| Key | Type |
|---|---|
| `activated` | VARIANT `true`/`false` |
| `↩︎ title#17341:0` | TEXT |
| `↩︎ subtitle#17341:4` | TEXT |
| `❖ content#28317:0` | INSTANCE_SWAP |

Rules:

- Hide unused lines with BOOLEAN `false`.
- Expanded state is nested `activated='true'`.
- Reset padding on nested line settings when inside a padded card.

## 13. APP avatar 3.0

Key: `37e7d13eef2d569028bbace869a532a626e22279`

Common variants:

| Variant | Values |
|---|---|
| `view` | `image`, `logo`, `icon`, `text`, `skeleton` |
| `size` | `S`, `M`, `L`, `XL` |
| `disabled` | `false`, `true` |

For cells and grids, prefer `view=icon`; for user/account photos use `view=image` or `view=text`.

## 14. WEB tag 2.3

Key: `50cca33a43e2f604470f08b6956052f4c058277a` (component set)

Variants:

| Variant | Values |
|---|---|
| `size` | `XS`, `S` |
| `color` | `default on bg_primary`, `default on bg_secondary`, `default on bg_tertiary`, `brand`, `invert`, `accent`, `error`, `success`, `custom` |
| `disabled` | `false`, `true` |

Geometry:

| size | padding | label | radius |
|---|---|---|---|
| `XS` | `4 8` | 13 / 16 Regular **400** | pill (`radius/infinite`) |
| `S`  | `6 10` | 16 / 20 Regular **400** | pill |

Color → fill / text mapping:

| color | background | text |
|---|---|---|
| `default on bg_primary` | `elements/primary` (white) | `content/primary` |
| `default on bg_secondary` | `elements/secondary` (#F0F3F5) | `content/primary` |
| `default on bg_tertiary` | transparent (gradient overlay) | `content/primary` |
| `brand` | `brand/primary` (#FFC800) | `constant/dark` (#28303F) |
| `invert` | `elements/active` (#202632) | `content/primary 100%-invert` (white) |
| `success` | `success/primary` (#00A55E) | `constant/light` (white) |
| `error` | `error/primary` (#F84A00) | `constant/light` (white) |
| `accent` | `link/primary` (#1086F9) | `constant/light` (white) |

**Жёсткие правила:**

- Label всегда **Regular 400**, никогда не Medium/Bold (даже если кажется что нужно «жирнее» — нельзя).
- Цветной `surface-*` (yellow/green/blue/violet/magenta/teal/orange/red) **не использовать** как фон тэга — это фон icon-tile в карточках продуктов, не tag (см. `carnica-ux-principles §16`).
- Padding и radius **фиксированы** размером `XS`/`S` — нельзя кастомизировать.

## 15. WEB title 2.1

Key: `eeb30c20a4a66a372b6542c388d8d737ab043650`

Variants:

| Variant | Values |
|---|---|
| `size` | `XL`, `L`, `M`, `S`, `XS` |
| `subtitle` | `false`, `true` |
| `reverse` | `false`, `true` (subtitle сверху, title снизу) |
| `skeleton` | `false`, `true` |
| `oneMoreSubtitle` | `false`, `true` (только в skeleton — добавляет третью строку) |

Geometry (все размеры — Regular **400**, цвет: title `content/primary`, subtitle `content/secondary`):

| size | title fs/lh | subtitle fs/lh | gap | typical use |
|---|---|---|---|---|
| `XL` | 56 / 66 | 24 / 28 | 20 | desktop/tablet — единственный основной заголовок страницы |
| `L`  | 40 / 48 | 20 / 26 | 16 | mobile main / desktop section heading лендинга |
| `M`  | 32 / 36 | 16 / 20 | 12 | mobile section / desktop subsection-card heading |
| `S`  | 24 / 24 | 16 / 20 | 8  | mobile subsection / в карточке product/cond-card |
| `XS` | 16 / 22 | 16 / 20 | 8  | accordion-row, mobile only |

**Жёсткие правила (по Figma-доке):**

- Менять **размер** title/subtitle вне фиксированной шкалы — **нельзя**.
- Менять **жирность** (вес шрифта) — **нельзя**. И title, и subtitle всегда Regular 400.
- Менять внутренний `gap` между title и subtitle — **нельзя** (зашит размером).

**Можно:**

- Менять `padding` внешнего контейнера (через spacing-токены).
- Менять `color` текста (выбрав другой `content/*`-токен).
- Менять `text-align` (по умолчанию left, можно center или right).
- Truncate text с многоточием (для длинных заголовков в card).

См. `carnica-visual-patterns` skill → раздел про Landing section headings для выбора размера на лендинге.

## 16. WEB button 2.3 — text-кнопки всегда Medium 500

Key: `535b6bbdde21f97602bf9c6260b2a0d195528215` (component set, WEB).

Все text-кнопки в Carnica имеют `font-weight: 500` (Medium) для label'а — это часть button 2.3 spec, не настраивается. Применимо к `priority=primary` (yellow CTA), `secondary on bg_*`, `tertiary`, `destructive`.

При собственной имплементации `.btn` в коде:

```css
.btn { font-weight: 500; font-size: 16px; line-height: 20px; height: 56px; border-radius: 100px; }
.btn--medium { height: 44px; }
```

⚠ **Не использовать `font` shorthand с `inherit` family** — `font-weight` в shorthand с `inherit` family может игнорироваться в Safari/WebKit и весь блок отбрасывается. См. `carnica-gotchas` skill.

Heights:

| size | height | padding-inline |
|---|---|---|
| `large` | 56 | 32 |
| `medium` | 44 | 16 (defaults сохраняем — pill-форма ломается при reset) |

---

*Owner: `carnica-components` skill (D-08 leaves rule).*
