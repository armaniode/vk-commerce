# Carnica UI-kit WEB — System

Источник паспортов system-компонентов WEB (StatusBar, home indicator) + WEB-specific system-level gotchas (device variant, hover state). См. `../SKILL.md` для Quick Start, Decision tree и top gotchas.

---

## StatusBar – iPhone

**Library Key**: `a115d46d3f00dedc15c33d3364c4e9941fa09656` | **SINGLE**

## Status Bar – iPad

**Library Key**: `227d25b4ba4aa719cb3c2059efd2108b7763bdf8` | **SINGLE**

## home indicator – iPhone

**Library Key**: `821dc91c538f15ca9f08deb8d94c9377ac2ee920` | **SINGLE**

## home indicator – iPad

**Library Key**: `4909198cdc0e293d64dfae6de9a15d7db6460e85` | **SINGLE**

> StatusBar/home indicator на WEB используются в device-mockup-преsентациях (когда экран рендерится как «iPhone-frame» для дизайн-показа). В production WEB-вёрстке (`html/css`) — НЕ рендерить.

---

## WEB-specific system gotchas

### device variant — desktop/tablet vs mobile

WEB Carnica-компоненты с поддержкой адаптива имеют variant `device`:
- `desktop/tablet` — для viewport ≥768px (десктоп + планшет, общий paint).
- `mobile` — для viewport <768px (адаптив сайта beeline.ru).

Компоненты с `device` variant: `button 2.1`, `tabbar 2.1`, `address bar 1.0`, `accordion 2.2`, `newspaper view 2.1`, `input 2.3` (sub), `text area 2.2`, `select 2.2`, `date picker 2.2`, `picker 2.2`, `snackbar 2.1`, `fullscreen spinner 2.0`, `loading window 1.0`, `status block 3.0`, `status block modal 1.0`, `modal page 2.1`.

При импорте обязательно указать корректное значение `device` (либо использовать `findOne` по имени для выбора варианта по device-метке).

### hover state — WEB only

WEB-компоненты с интерактивом имеют `state` variant с поддержкой `hover` / `pressed`:
- `button 2.1` state: `default`, `hover`, `pressed`, `disabled`, `loading`.
- `button inline text 2.1` state: `default`, `hover`, `pressed`, `disabled`.
- `button inline icon 2.1` state: `default`, `hover`, `pressed`, `disabled`, `loading`.

В APP-аналогах (touch-интерфейс mobile-приложения) hover state отсутствует. Это **ключевое отличие WEB от APP**.

При QA сборки экрана делать `get_screenshot` для variant=`hover` отдельно от `default` — иначе hover-поведение не зафиксировано.

### qr code component — WEB only

`qr code 2.2` — отдельный компонент с size (S/M/L) + invert variant. Применяется в модалках оплаты, share-функциях, на стилизованных промо-страницах. В APP-аналога нет.

### address bar 1.0 — browser mockup

`address bar 1.0` — это **визуальный mockup** браузерной адресной строки (для презентационных макетов и promo-страниц), НЕ настоящий browser-chrome. Используется как часть device-mockup композиции (например, «вот как наш сайт выглядит в Chrome»).

### Production header/main beeline.ru

Production-реализация `header/main` живёт в **отдельной библиотеке** `03_WEB-product-components` (Figma file `FU4Chchxuwku66ILPSG9mA`), не в основной библиотеке UI-kit WEB. Полная spec — `.agents/skills/carnica-components/references/header.md`. При сборке любого beeline.ru-экрана импортировать `header/main` оттуда, не пытаться собрать вручную.

---

## Ключевые отличия WEB от APP

| Аспект | APP | WEB |
|--------|-----|-----|
| **device variant** | нет | `desktop/tablet` / `mobile` |
| **hover state** | нет | есть (кнопки, cells) |
| **button TEXT key** | `↩︎ label#137:0` | `↩︎ label#6033:0` |
| **button inline text** | `priority="seсondary"` (кирилл.) | `priority="secondary"` (лат.) |
| **avatar** | 3.0 | 4.0 (те же UIDs) |
| **title TEXT key** | `↩︎ title#617:6` | `↩︎ title#17678:0` |
| **accordion items** | одинаковые для всех | desktop/mobile — разные компоненты |
| **WEB-only** | — | breadcrumbs, progress bar, qr code, newspaper view, page pagination, status block, loading window, address bar |
| **APP-only** | navbar 3.0, navbar modal 1.0, tabbar beeline 3.0, card small/medium/large, button box, button ux, slider, iOS keyboards | — |

> **Общие property UIDs** (одинаковы в APP и WEB): cell 3.1 (`#16440:*`, `#16392:*`), avatar (`#16163:*`), accordion line visibility (`#17341:*`).
