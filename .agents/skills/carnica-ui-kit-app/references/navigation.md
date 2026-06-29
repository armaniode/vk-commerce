# Carnica UI-kit APP — Навигация

Источник паспортов навигационных компонентов APP. См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

## navbar 3.0

**Library Key**: `37960573b758b856e27d9ab2dfe2d0b4669d5ee9` | **168 variants**

| Variant | Values |
|---------|--------|
| `view` | `default`, `search field`, `avatar` |

> На top-level только `view`. Все остальные свойства на **вложенных инстансах**.

**Nested: `settings`** — `navbar.findOne(n => n.type === 'INSTANCE' && n.name === 'settings')`

| Key | Type | Values |
|-----|------|--------|
| `style` | VARIANT | `default`, `glass` |
| `background` | VARIANT | `false`, `true` |
| `right view` | VARIANT | `true`, `false` |
| `left view` | VARIANT | `true`, `false` |
| `align text` | VARIANT | `center` |
| `title#27239:0` | BOOLEAN | Показать заголовок |
| `↩︎ title#27230:0` | TEXT | Текст заголовка |

**Nested: `❖ right view settings`** — `navbar.findOne(n => n.name === '❖ right view settings')`

| Key | Type | Default |
|-----|------|---------|
| `2 button#27230:17` | BOOLEAN | `false` — показать 2-ю правую кнопку |
| `type` | VARIANT | `button` |

**Nested: `L/R/2R button settings`** — инстансы button 2.5 внутри navbar:

| Key | Type |
|-----|------|
| `style` | VARIANT (`glass`, `default`) |
| `priority` | VARIANT (`secondary on bg_secondary`) |
| `badge#13704:0` | BOOLEAN |
| `❖ icon#1486:0` | INSTANCE_SWAP |

```js
const set = await figma.importComponentSetByKeyAsync('37960573b758b856e27d9ab2dfe2d0b4669d5ee9');
const v = set.children.find(c => c.name.includes('view=default'));
const navbar = v.createInstance();
const settings = navbar.findOne(n => n.type === 'INSTANCE' && n.name === 'settings');
settings.setProperties({ 'style': 'glass', 'background': 'true', 'title#27239:0': false });
```

---

## navbar modal 1.0

**Library Key**: `bef5f93f4a80c3ea80f50bcfcf13403bcee1ff6d` | **SINGLE component**

```js
// КРИТИЧНО: importComponentByKeyAsync, НЕ importComponentSetByKeyAsync!
const comp = await figma.importComponentByKeyAsync('bef5f93f4a80c3ea80f50bcfcf13403bcee1ff6d');
const inst = comp.createInstance();
inst.layoutSizingHorizontal = 'FILL'; // 375 x 40px, содержит drag handle
```

**Правило**: обязательно во ВСЕХ модальных окнах (bottom sheet, dialog, action sheet). См. также `modals.md`.

---

## title 2.1

**Library Key**: `a30889ae37e403eb027eff1308408b0f0ca4f138` | **24 variants**

| Variant | Values |
|---------|--------|
| `size` | `XS`, `S`, `M` |
| `reverse` | `false`, `true` |
| `skeleton` | `false`, `true` |
| `❖ right view` | `button`, `button inline text`, `button inline icon`, `skeleron` |

| Key | Type | Default |
|-----|------|---------|
| `↩︎ title#617:6` | TEXT | `заголовок` |
| `↩︎ subtitle#617:0` | TEXT | `подзаголовок` |
| `subtitle#617:3` | BOOLEAN | `true` |
| `right view#6977:4` | BOOLEAN | `true` |
| `second button#6977:17` | BOOLEAN | `true` |
| `one more subtitle#6486:7` | BOOLEAN | `true` |

```js
const set = await figma.importComponentSetByKeyAsync('a30889ae37e403eb027eff1308408b0f0ca4f138');
const v = set.children.find(c => c.name.includes('size=M') && c.name.includes('skeleton=false'));
const title = v.createInstance();
title.setProperties({ '↩︎ title#617:6': 'мой тариф', 'subtitle#617:3': false, 'right view#6977:4': false });
```

---

## tabs 2.1

**Library Key**: `fff13b8c76a72f376727883709c190155d377bdf` | **12 variants**

| Variant | Values |
|---------|--------|
| `count` | `2`, `3`, `4`, `5`, `6` |
| `size` | `S`, `M` |
| `skeleton` | `false`, `true` |

> Нет TEXT/BOOLEAN/SWAP свойств на top-level. Кастомизация — через nested tab items.

---

## segmented control 2.1

**Library Key**: `e65d710fbe00f97be86694fc720163e283f4c796` | **5 variants**

| Variant | Values |
|---------|--------|
| `type` | `text`, `icon` |
| `count` | `2`, `3` |
| `skeleton` | `false`, `true` |

---

## tabbar beeline 3.0

**Library Key**: `7cdac0804e514fcb3899e09bccd77849e0b458e7` | **SINGLE component**

```js
const comp = await figma.importComponentByKeyAsync('7cdac0804e514fcb3899e09bccd77849e0b458e7');
const inst = comp.createInstance();
```

---

## StatusBar

**Library Key**: `e5a0afb64e9cc7ba868b1570e7bc8a7f731172de` | **SINGLE component**

## home indicator 1.1

**Library Key**: `5f897add939f815c2cc55cc717049b003226625b` | **SINGLE component**

## divider horizontal 2.0

**Library Key**: `3f859e41b341bec4b9ff40fb88bb3462124733bf` | **SINGLE component**

## divider vertical 2.0

**Library Key**: `459d6f9ab119e3681f26cec28bb50abd4a2f6b7f` | **SINGLE component**
