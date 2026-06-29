# Carnica UI-kit APP — Кнопки и действия

Источник паспортов button-компонентов APP. См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

## button 2.5

**Library Key**: `e091f3958e87ecfb8a446373fea1ecd020d1462b` | **294 variants**
**Node**: `1311:3203`

| Variant | Values |
|---------|--------|
| `style` | `default`, `glass` |
| `priority` | `primary`, `secondary on bg_primary`, `secondary on bg_secondary`, `secondary on bg_tertiary`, `secondary on bg_additional`, `tertiary`, `destructive` |
| `view` | `text`, `icon` |
| `state` | `default`, `pressed`, `disabled`, `loading` |
| `size` | `large`, `medium`, `small` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ label#137:0` | TEXT | `кнопка` |
| `↩︎ sale#10904:81` | TEXT | `100 ₽` |
| `sale#10904:0` | BOOLEAN | `false` |
| `badge#13704:0` | BOOLEAN | `false` |
| `left icon#25180:0` | BOOLEAN | `false` |
| `right icon#25180:97` | BOOLEAN | `false` |
| `❖ icon#1486:0` | INSTANCE_SWAP | основная иконка (view=icon) |
| `❖ left icon#25180:194` | INSTANCE_SWAP | левая иконка |
| `❖ right icon#25180:291` | INSTANCE_SWAP | правая иконка |

**Layout gotcha**: `size=large` (h=56) в Figma имеет внешний 20px контейнер для быстрого fill-layout; в React runtime этот внешний padding принадлежит родителю экрана. `size=medium` (h=44) и `size=small` (h=24) сохраняют внутренние paddings и hug-width.

**Variant gotchas**:
- `style=glass` не имеет `state=pressed`.
- `sale` доступен только для `size=large` и отображается с opacity 60% поверх выбранного текстового цвета.
- `left icon` / `right icon` доступны для `size=medium` и `size=small`, не для `large`.

```js
const set = await figma.importComponentSetByKeyAsync('e091f3958e87ecfb8a446373fea1ecd020d1462b');
const v = set.children.find(c =>
  c.name.includes('priority=primary') && c.name.includes('view=text') &&
  c.name.includes('size=medium') && c.name.includes('state=default') && c.name.includes('style=default')
);
const btn = v.createInstance();
btn.setProperties({ '↩︎ label#137:0': 'пополнить' });
```

---

## button inline text 3.0

**Library Key**: `8de7a4cdeb7ec59962d656236964b74c7c61f5ed` | **36 variants**

| Variant | Values |
|---------|--------|
| `priority` | `primary`, `seсondary` **(кириллическая «с»!)**, `destructive` |
| `state` | `default`, `pressed`, `disabled` |
| `icon background` | `false`, `true` |
| `bckg color` | `—`, `on bg primary`, `on bg secondary` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ text#538:0` | TEXT | `принять` |
| `right icon#623:0` | BOOLEAN | `false` |
| `left icon#1139:0` | BOOLEAN | `false` |
| `❖ right icon#623:18` | INSTANCE_SWAP | правая иконка (chevron для "все >") |
| `❖ left icon#1139:6` | INSTANCE_SWAP | левая иконка |

**Gotcha**: priority `"seсondary"` содержит **кириллическую «с»** — не латинскую `s`. Exact string критичен для setProperties.

---

## button inline icon 2.1

**Library Key**: `f471bb3db31d984114b692482ea1213202e30bdd` | **36 variants**

| Variant | Values |
|---------|--------|
| `priority` | `primary`, `secondary` |
| `state` | `default`, `pressed`, `disabled`, `loading` |
| `icon background` | `false`, `true` |
| `bckg color` | `—`, `on bg primary`, `on bg secondary` |

| Key | Type | Default |
|-----|------|---------|
| `❖ icon#209:0` | INSTANCE_SWAP | иконка |

---

## button box 1.0

**Library Key**: `a3fcb3970b4a83ff943331db5ac90b973fd40163` | **4 variants**

| Variant | Values |
|---------|--------|
| `style` | `default`, `glass` |
| `background` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `extra button#30927:3` | BOOLEAN | `true` |
| `caption downstare#30927:4` | BOOLEAN | `false` |
| `caption upstare#30927:5` | BOOLEAN | `false` |
| `home indicator#30927:6` | BOOLEAN | `false` |

---

## button ux 2.0

**Library Key**: `2eadf2e750cbb54b40840039f1f13cb663f12272` | **144 variants**

| Variant | Values |
|---------|--------|
| `priority` | `primary`, `secondary on bg_primary/bg_secondary/bg_tertiary`, `tertiary`, `destructive` |
| `view` | `custom text`, `ux text`, `icon` |
| `state` | `default`, `pressed`, `disabled`, `loading` |
| `size` | `large`, `medium` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ text#137:0` | TEXT | `кнопка` |
| `↩︎ sale#10904:81` | TEXT | `100 ₽` |
| `sale#10904:0` | BOOLEAN | `false` |
| `badge#13704:0` | BOOLEAN | `false` |
| `left icon#25180:0` | BOOLEAN | `false` |
| `right icon#25180:97` | BOOLEAN | `false` |
| `❖ icon#1486:0` | INSTANCE_SWAP | основная иконка |
| `❖ left icon#25180:194` | INSTANCE_SWAP | |
| `❖ right icon#25180:291` | INSTANCE_SWAP | |
