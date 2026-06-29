---
name: carnica-ui-kit-web
description: Работа с WEB-компонентами Carnica UI-kit для Beeline сайта (beeline.ru, desktop + mobile adaptive) — импорт через importComponentSetByKeyAsync, выбор variants (device=desktop/mobile, hover state), setProperties, gotchas. Используй когда задача про WEB UI / browser / адаптивная вёрстка Beeline / desktop+mobile вариант. Триггеры: «WEB-компонент», «desktop Beeline», «beeline.ru», «header main», «button 2.1», «cell 3.1 WEB», «breadcrumbs», «qr code», «newspaper view», «page pagination», «hover state», «device variant», а также любая работа с компонентами в web-контексте в связке с Carnica/Beeline. НЕ используй для APP/mobile-приложения — там carnica-ui-kit-app.
type: capability
---

# Carnica UI-kit WEB

Capability для работы с WEB-компонентами Carnica UI-kit (сайт Beeline beeline.ru, desktop + mobile adaptive). Производит Figma Plugin API код для WEB component sets с device variant и hover state. Полные паспорта по 9 темам — в `references/`. Decision rules «какой компонент когда» (universal) — в `carnica-components` reference skill.

## Quick Start

```javascript
// 1. Импорт WEB component set
const buttonSet = await figma.importComponentSetByKeyAsync('535b6bbdde21f97602bf9c6260b2a0d195528215'); // button 2.1 WEB
const buttonInstance = buttonSet.defaultVariant.createInstance();

// 2. setProperties (WEB-specific variants: device, hover)
await buttonInstance.setProperties({
  'priority': 'primary',     // ВНИМАНИЕ: WEB button inline text 2.1 priority="secondary" — ЛАТИНИЦА (в APP — кириллица «seсondary»!)
  'size': 'large',
  'view': 'text',
  'device': 'desktop/tablet', // WEB-only variant
  'state': 'default',         // 'default' / 'hover' / 'pressed' / 'disabled' / 'loading'
});

// 3. TEXT property (WEB TEXT key отличается от APP: `#6033:0` vs `#137:0`)
await buttonInstance.setProperties({
  '↩︎ label#6033:0': 'к оформлению',
});

// 4. WEB не требует APP-style padding reset — у button 2.1 другие spacing-defaults.
//    Полные паспорта и gotchas — в references/buttons.md.
```

Для single component (например `header/main`) — `importComponentByKeyAsync(key)`. Production-реализация `header/main` (beeline.ru, blur 15px overlay + 7+ состояний) — `.agents/skills/carnica-components/references/header.md`. Импорт идёт из отдельной библиотеки `03_WEB-product-components` (Figma file `FU4Chchxuwku66ILPSG9mA`).

## Когда применять

- При сборке WEB-экрана Beeline (desktop или mobile adaptive) — любая работа с WEB-компонентами библиотеки `06_Carnica UI-kit WEB`.
- Когда нужно импортировать конкретный WEB component set с device variant.
- Когда нужны WEB-specific gotchas: hover state, device variant desktop/mobile, button inline text 2.1 priority=**secondary** (латиница).
- Когда нужны точные ключи для Figma Plugin API из WEB-библиотеки.
- Orchestrated из `carnica-figma-design` на шаге 2 при `platform=WEB`.

## Когда НЕ применять

- **APP/mobile-приложение** — используй `carnica-ui-kit-app` (CAP-03). Ключи разные (`e091...462b` для APP button 2.5 vs `535b...8215` для WEB button 2.1), variants отличаются (APP не имеет `device` variant или `hover` state).
- **Decision rule «какой компонент когда»** — `carnica-components` (REF-02). Этот skill даёт паспорт уже известного компонента; `carnica-components` отвечает на вопрос «использовать `tabs 2.1` или `segmented control 2.2`?».
- **Выбор color token / typography** — `carnica-design-system` (REF-08, **OWNER** D-27). Этот skill упоминает variant `color`, но полная база — там.
- **Целостный экран Carnica** — `carnica-figma-design` (CAP-01). Universal capability оркестрирует этот skill на шаге 2.
- **Production header/main реализация (React + Tailwind для beeline.ru)** — `.agents/skills/carnica-components/references/header.md`. Этот skill даёт Figma node + spec; header.md даёт React-код и точные state-переходы.

## @references

> Lazy auto-load (D-07, `.agents/README.md` § 6): этот capability перечисляет ДОСТУПНЫЕ reference skills, агент сам решает КОГДА читать каждый по контексту шага. На старте читается только этот SKILL.md и при необходимости — конкретный `references/{topic}.md`.

- `carnica-components` — decision rules «какой компонент когда», паспорта component sets (REF-02). Подтягивается на шаге 1, если выбор компонента не очевиден.
- `carnica-design-system` — **OWNER** color tokens (D-27), spacing scale, typography style keys. Подтягивается на шаге 3 при работе с variant `color` и при выборе hex для `fallback` параметра.

## Алгоритм

1. **Шаг 1: Определи компонент и device** — какой WEB Carnica-компонент нужен. Зафиксируй `device` (`desktop/tablet` для viewport ≥768px или `mobile` для адаптива <768px) — потому что без device variant адаптивный компонент рендерится в дефолтном desktop-paint. Если задача неоднозначная («tabbar или tabs?») — прочитай `carnica-components/SKILL.md` Decision rules. Иначе — открой соответствующий `references/{topic}.md`.

2. **Шаг 2: Выбери variants (включая device + state)** — variant names передаются точно как в Figma. Особое внимание WEB-specific:
   - `device`: `desktop/tablet` ИЛИ `mobile` (для адаптивных компонентов — см. список в `references/system.md`).
   - `state`: `default` / `hover` / `pressed` / `disabled` / `loading` — потому что hover state отсутствует в APP и легко забыть зафиксировать в QA.
   - `priority` для **button inline text 2.1** = `"secondary"` — **ЛАТИНИЦА** (в APP `button inline text 3.0` — кириллическая «seсondary»! Копирование значения из APP-кода в WEB ломает setProperties).

3. **Шаг 3: Импортируй и применяй** — `importComponentSetByKeyAsync(key)` для component set, `importComponentByKeyAsync(key)` для single component (`StatusBar`, `home indicator`, `divider`, `address bar`). После `createInstance()` вызывай `setProperties()` в порядке variants → boolean → swap → text — потому что одновременная установка variant и swap иногда «не доезжает» до swap.

4. **Шаг 4: WEB-specific post-processing** — gotchas из `## Top gotchas` ниже и `references/{topic}.md`:
   - **breadcrumbs 2.2** — WEB-only, разделитель «/», не «>». См. `references/navigation.md`.
   - **qr code 2.2** — WEB-only (нет в APP). См. `references/tags.md` или `references/modals.md`.
   - **newspaper view 2.1** — WEB-only mixed media gallery. См. `references/cards.md`.
   - **page pagination 2.1** — WEB-only (1 2 3 ... N), **не путать** с `pagination 2.2` (dots-индикатор для carousel).
   - **address bar 1.0** — browser mockup для презентаций, НЕ настоящий browser-chrome.
   - **progress step bar 2.1** в WEB: steps 2-8 по умолчанию **скрыты** (`false`), в APP — показаны (`true`). Включать вручную.

5. **Шаг 5: Token-биндинг** — подтяни `carnica-design-system/SKILL.md` для color token keys и spacing-токенов. `importVariableByKeyAsync` + `setBoundVariableForPaint` с **обязательным** fallback hex параметром — потому что без fallback paint показывает чёрный при первом фрейме, до резолва переменной.

6. **Шаг 6: Screenshot QA + hover variant check** — `get_screenshot` инстанса. **Проверь default vs hover variant визуально** (для button 2.1, button inline text, cell 3.1) — это ключевое отличие от APP, где hover не существует. Сравни итог с паспортом из `references/{topic}.md`.

## Top gotchas (5-7 самых частых WEB-specific)

| Gotcha | Подробности |
|---|---|
| `button inline text 2.1` priority=`"secondary"` — **ЛАТИНИЦА** (НЕ кириллица как в APP) | `references/buttons.md` § button inline text 2.1 |
| `device` variant обязателен для адаптивных компонентов (`desktop/tablet` / `mobile`) | `references/system.md` § device variant |
| `state` variant `hover`/`pressed` — WEB-only (APP не имеет hover state) | `references/system.md` § hover state + `references/buttons.md` |
| `header/main` production beeline.ru — overlay/s rgba(0.3) + backdrop-blur 15px, отдельная библиотека `03_WEB-product-components` | `references/navigation.md` § header/main + `.agents/skills/carnica-components/references/header.md` |
| `breadcrumbs 2.2` разделитель «/», не «>» (WEB-only компонент) | `references/navigation.md` § breadcrumbs 2.2 |
| `pagination 2.2` (dots для карусели) ≠ `page pagination 2.1` (1 2 3 ... N номера страниц) | `references/feedback.md` § pagination 2.2 vs page pagination 2.1 |
| `qr code 2.2` WEB-only компонент (нет аналога в APP) | `references/tags.md` § qr code 2.2 |
| `progress step bar 2.1` в WEB: steps 2-8 default = `false` (скрыты), в APP — `true` | `references/feedback.md` § progress step bar 2.1 |

## Полные паспорта компонентов

| Тема | Reference |
|---|---|
| Навигация (title 2.1 WEB, tab, tabbar 2.1, breadcrumbs 2.2, segmented control, address bar 1.0, dividers + header/main cross-link) | `references/navigation.md` |
| Кнопки (button 2.1 device+hover, button inline text 2.1 priority=secondary ЛАТИНИЦА, button inline icon 2.1) | `references/buttons.md` |
| Списки (cell 3.1, cell grid 2.2 size variant, accordion 2.2 desktop/mobile разные, chips, avatar 4.0, avatar group 4.0) | `references/lists.md` |
| Карточки (banner 2.1, banner card 2.1, banner group, newspaper view 2.1 WEB-only) | `references/cards.md` |
| Формы (input 2.3 11 types, search field 2.1, text area, select 2.2, date picker, checkbox, switch, stepper, picker, file input) | `references/forms.md` |
| Метки и статусы (tag 2.3, adtag 2.1, badge 2.2, tooltip 3.0, qr code 2.2 WEB-only) | `references/tags.md` |
| Обратная связь (snackbar, spinner, skeleton, loading window WEB-only, status block 3.0 WEB-only, progress bar 2.1 WEB-only linear, page pagination 2.1 vs pagination 2.2 dots) | `references/feedback.md` |
| Модалки (dialog 2.2, action sheet 2.2, modal page 2.1, qr code cross-ref) | `references/modals.md` |
| System (StatusBar, home indicator + device variant gotcha + hover state gotcha + Ключевые отличия WEB от APP) | `references/system.md` |

---

*Source: existing `.agents/skills/carnica-ui-kit-web/SKILL.md` (887 строк) — body retrofit'ен под capability template (Phase 1), 9 H2-секций мигрированы в `references/{topic}.md` (lossless 1:1).*

*Produces: Figma Plugin API код для WEB-компонентов с device variant + hover state, либо ссылку на конкретный `references/{topic}.md` с полным паспортом.*

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: capability` — все три поля заполнены.
- [x] `name` соответствует convention `carnica-<topic>` (`carnica-ui-kit-web`, backward compat имя сохранено).
- [x] `description` соответствует middle-pushy формату с **verb-триггерами** + связка с Carnica/Beeline + WEB-specific (device variant, hover state, breadcrumbs, qr code, newspaper view, page pagination).
- [x] `description` содержит anti-overlap с CAP-03 `carnica-ui-kit-app` (явное «НЕ используй для APP/mobile-приложения — там carnica-ui-kit-app»).
- [x] **Секция `## @references` присутствует и содержит ≥ 1 reference skill** (D-07) — фактически 2 OTHER skill refs (`carnica-components`, `carnica-design-system`).
- [x] В описании `## @references` упомянут принцип lazy auto-load.
- [x] Секция «Когда НЕ применять» содержит ≥ 2 пункта с альтернативными skills (anti-overlap boundary) — фактически 5 (APP / decision rule / token / целостный экран / production header React).
- [x] Алгоритм имеет ≥ 3 шага в imperative form — фактически 6 (включая WEB-specific шаги 1 device + 2 hover variant + 4 post-processing + 6 hover QA).
- [x] `## Top gotchas` ≥ 5 WEB-specific (button inline text латиница, device variant, hover state, breadcrumbs, pagination 2.2 vs page pagination 2.1) — фактически 8.
- [x] Таблица «Полные паспорта компонентов» содержит 9 cross-links на own refs.
- [x] Файл ≤ 500 строк (target 300-400).
- [x] Тяжёлый контент (полные паспорта 887 строк) вынесен в `references/*.md` (9 файлов, sum 977 строк lossless).
- [x] Cross-link на `.agents/skills/carnica-components/references/header.md` присутствует (header/main production reference).
- [x] Imperative form в body. Запрещённые слова в имитации сомнения — отсутствуют (grep test: список в `.agents/README.md` § 11).
