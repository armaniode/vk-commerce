---
name: carnica-figma-design
description: Универсальный workflow создания UI в Figma по принципам дизайн-системы Carnica/Beeline — отдельный компонент, многокомпонентная композиция или целый экран. Используй когда пользователь просит создать / собрать / нарисовать / спроектировать дизайн в Figma, либо когда нужно превратить требования в Figma-нод. Триггеры: «создай Carnica», «собери экран», «нарисуй компонент», «спроектируй секцию», «design в Figma», «figma make», «build screen Carnica», а также любая задача «придумать дизайн по правилам билайн» без явной ссылки на golden samples. НЕ используй для финального QA готового артефакта — там carnica-final-qa.
type: capability
---

# Carnica Figma Design

Универсальный capability для генерации Carnica-дизайна в Figma. Производит Figma Plugin API код (`importComponentSetByKeyAsync`, `setProperties`, `createStyledText`, `importVariableByKeyAsync`) для компонента / композиции / экрана. Опирается на принципы дизайн-системы — не воспроизводит golden samples.

## Когда применять

- Когда нужно создать новый Carnica-экран в Figma по описанию или brief'у (mobile или web).
- Когда нужно собрать многокомпонентную композицию (секция, hero-блок, форма) на основе принципов visual-patterns.
- Когда нужно превратить набор требований («показать баланс, кнопку оплаты, ссылку на детализацию») в Figma-ноды.
- Когда нужно прототипировать экран Carnica для дальнейшей оценки качества (с последующим in-process critique).
- Когда нужно собрать единичный компонент по паспорту (но если задача узкая «вставь button 2.5 с такими props» — лучше сразу `carnica-ui-kit-app` / `carnica-ui-kit-web`).

## Когда НЕ применять

- Финальная QA-проверка готового артефакта перед сдачей («можно ли сдавать?», «final review») — используй `carnica-final-qa`. Этот skill производит дизайн, не валидирует его на ship-readiness.
- In-process качественная оценка между секциями («оцени дизайн», «critique») — используй `carnica-critique` напрямую. Этот skill вызывает критику как один из шагов алгоритма (см. шаг 5), но НЕ заменяет его.
- Точечная вставка одного компонента по известному паспорту («вставь cell 3.1 с такой иконкой») — используй `carnica-ui-kit-app` (mobile) или `carnica-ui-kit-web` (web) напрямую. Universal workflow избыточен для одного setProperties.
- Воспроизведение конкретного эталонного экрана 1:1 («собери GS-3 wallet») — out of scope (D-06 Phase 1, эталонные экраны Carnica больше не ground truth, см. `.planning/PROJECT.md` → Key Decisions). Если нужен mood/density reference — открой соответствующий файл результата руками, но генерация идёт по принципам, не копированием.

## @references

> Lazy auto-load (D-07, `.agents/README.md` § 6): этот capability перечисляет ДОСТУПНЫЕ reference skills, агент сам решает КОГДА читать каждый по контексту шага. На старте capability читается только этот SKILL.md — references подтягиваются по триггерам внутри Алгоритма.

- `carnica-components` — decision rules «какой компонент когда», паспорта component sets, anti-pattern «не рисуй кнопку вручную, импортируй button 2.5». Подтягивается на шаге 2 (component shopping list).
- `references/icons-semantic.md` — decision tree «Need → Icon» для выбора иконки из 350 готовых в `src/carnica/icons/` по семантике UI-элемента. 7 кластеров (actions / status / finance / media / communication / navigation / content) + variant semantics (outline vs filled vs stroke). Подтягивается на шаге 2.5 (icon resolution) для каждого UI-элемента со значком.
- `carnica-design-system` — **OWNER** color tokens (D-27), Figma spacing/radius tokens, typography style keys (17 стилей Beeline Sans). Подтягивается на шаге 3 (выбор token и стиля).
- `carnica-typography` — иерархия (≤ 4 уровней), line-height unitless, font-weight 400/500 only, выбор размера под viewport, WCAG-контраст. Подтягивается на шаге 3 при работе с текстом.
- `carnica-visual-patterns` — 20 паттернов экранов (wallet card-holder стопка, hero floating-corners, stories carousel, asymmetric card grid, dot progress LTR, ...). Подтягивается на шаге 1 (выбор паттерна под задачу) и шаге 4 (генерация секций).
- `carnica-ux-principles` — 16 UX-правил (loading/empty/error, proximity, lowercase UI, фоны тегов, ...). Подтягивается на шаге 4 (генерация) для проверки UX-консистентности.
- `carnica-anti-slop` — P0/P1/P2 запреты («не используй цветной surface как фон тэга», «не CAPS», ...). Подтягивается на шагах 4-5 (in-process self-check) и 6 (предфинальный pass).
- `carnica-copy-tone` — voice, микрокопия, запрещённые фразы, lowercase units (гб не ГБ). Подтягивается на шаге 4 при заполнении текста.
- `carnica-motion` — длительности (200ms ease-out), easing, prefers-reduced-motion. Подтягивается на шаге 4, если задача требует анимации / transitions.
- `carnica-ui-kit-app` — APP component passports (navigation, buttons, lists, ...) — подтягивается на шаге 2, если platform = APP/mobile.
- `carnica-ui-kit-web` — WEB component passports — подтягивается на шаге 2, если platform = WEB.
- `carnica-critique` — orchestrated на шаге 5 (in-process качественное ревью между секциями).

## Алгоритм

1. **Шаг 1: Контекст и платформа** — определи платформу (APP/mobile width 375 ИЛИ WEB desktop+adaptive) и тип артефакта (компонент / композиция / экран). Прочитай `carnica-visual-patterns/SKILL.md` для выбора применимого паттерна — потому что 90% Carnica-задач уже описаны там (wallet card-holder, hero floating-corners, asymmetric card grid, и т. д.). Зафиксируй: platform + pattern_name.

2. **Шаг 2: Component shopping list** — прочитай `carnica-components/SKILL.md` decision rules «какой компонент когда». Для каждого UI-элемента задачи запиши: APP key или WEB key, import method (`importComponentSetByKeyAsync` для set, `importComponentByKeyAsync` для single), variants, TEXT/BOOLEAN/INSTANCE_SWAP keys, ключевые gotchas (padding reset для large only, chevron recolor, plus round style=stroke). При platform=APP подтяни `carnica-ui-kit-app/SKILL.md` для полных паспортов; при platform=WEB — `carnica-ui-kit-web/SKILL.md`. Без shopping list работа в Figma запрещена — потому что 80% slop-нарушений начинается с «нарисую кнопку вручную».

   **Параллельно — icon resolution.** Для каждого UI-элемента со значком (button с icon, cell с right view=icon, badge, tab, status indicator, list item, navigation) определи семантику («что обозначает») → подтяни `references/icons-semantic.md` → выбери конкретную иконку из 350 в `src/carnica/icons/`. Запиши выбор в shopping list (отдельная колонка `Icon`). Variant outline vs filled vs stroke — по правилам §«Variant semantics» гайда (state on/off, selected, round controls → `style=stroke`). **Запрещено**: рисовать иконку через path/vector вручную, использовать эмодзи (`✨🚀⚡🎉🔥`), брать из сторонних наборов (Material/Phosphor/Lucide), выбирать наугад без семантического обоснования — выбор = решение, не эстетика. Cross-link на запрет: `carnica-anti-slop` P0 (эмодзи-иконки).

3. **Шаг 3: Tokens и типографика** — прочитай `carnica-design-system/SKILL.md` (OWNER color tokens, D-27). Для каждого цвета на экране запиши token id (`background/primary`, `elements/primary`, `brand/primary` для CTA, …). Для каждого текста — typography style key (`display/small`, `body/medium`, `caption/medium`) + цвет токен. Если работаешь с типографикой нетривиально (иерархия 4+ уровней, длинный reading-блок, цифры в колонках) — подтяни `carnica-typography/SKILL.md` для правил line-height/measure/letter-spacing. Запрещено: hex напрямую в финальном paint (только через `importVariableByKeyAsync` + `setBoundVariableForPaint` с fallback).

4. **Шаг 4: Генерация секциями сверху вниз** — собирай экран секциями (navbar → hero → content blocks → bottom). Каждая секция = отдельный auto-layout frame (`createVFrame` или `createHFrame` с `fills = []` сразу). Применяй принципы из `carnica-ux-principles/SKILL.md` (proximity, lowercase UI, фоны тегов только из 5 разрешённых, consistent spacing). При работе с copy — `carnica-copy-tone/SKILL.md` (voice, units lowercase). При наличии motion/transitions — `carnica-motion/SKILL.md` (200ms ease-out default). После КАЖДОЙ секции делай `get_screenshot` и self-check по `carnica-anti-slop/SKILL.md` P0 списку — потому что один P0-нарушение в начале экрана ломает всё построение.

5. **Шаг 5: In-process critique** — после сборки 2-3 секций orchestrate `carnica-critique/SKILL.md` для 6-мерной качественной оценки текущего состояния. Особое внимание Brand Fidelity (≥ 7) и Detail execution (alignment, chevron recolor, divider inset 72px). Если средний балл < 7 ИЛИ Brand Fidelity < 7 — repair iteration с приоритетом по самым низким измерениям, не продолжай поверх сломанной секции.

6. **Шаг 6: Финальный sweep и handoff** — после завершения всех секций сделай полный `get_screenshot` экрана. Пройдись по `carnica-anti-slop/SKILL.md` P0+P1 списку финально. Зафиксируй reminder для дизайнера: `Cmd+Shift+P` → `Fix BeelineSans`. Если задача требует финального QA-вердикта «можно ли сдавать» — передай артефакт в `carnica-final-qa` (НЕ заменяй её этим шагом). Этот skill производит дизайн, final-qa выдаёт ship/repair/переработать.

## Output format

Skill производит следующий артефакт в чате (или в файле, если задача large-scale):

````markdown
## Carnica Figma Design — <название артефакта>

**Platform:** APP / WEB
**Pattern:** <wallet card-holder / hero floating-corners / asymmetric card grid / ...>
**Артефакт:** <компонент / секция / экран>

### Component shopping list

| Компонент | APP key / WEB key | Variants | Icon | Gotchas |
|---|---|---|---|---|
| `button 2.5` | APP `e091...462b` | priority=primary, size=large | `actions/IconSearch` | external large padding |
| `cell 3.1` | APP `b877...f39c` | background=none, size=S | `finance/IconWallet` | chevron recolor → content/secondary |
| ... | ... | ... | ... | ... |

### Tokens & typography

| Контекст | Token / Style key |
|---|---|
| Фон страницы | `background/primary` |
| Карточка | `elements/primary` |
| CTA-кнопка | `brand/primary` (fill) + `constant/dark` (label) |
| Заголовок секции | `body/accent/medium` (20/500) |
| Описание | `body/small` (16/400) + `content/secondary` |

### Figma Plugin API

```javascript
// 1. Import component set
const buttonSet = await figma.importComponentSetByKeyAsync('e091...462b');
const buttonInstance = buttonSet.defaultVariant.createInstance();
await buttonInstance.setProperties({
  'priority': 'primary',
  'size': 'large',
  'view': 'text',
});

// 2. Tokens
const bgVar = await figma.variables.importVariableByKeyAsync(bgPrimaryKey);
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0.941, g: 0.953, b: 0.961 } },
  'color',
  bgVar
);
mainFrame.fills = [paint];

// 3. Standalone text
async function createStyledText(parent, text, styleKey, fills) {
  const t = figma.createText();
  const style = await figma.importStyleByKeyAsync(styleKey);
  await t.setTextStyleIdAsync(style.id);
  // ... остальное по pattern: createText → setTextStyleIdAsync → fills → assemble
}

// 4. Assemble (секциями сверху вниз)
const navbar = await createNavbar(mainFrame);
const hero = await createHero(mainFrame);
const content = await createContent(mainFrame);
```

### In-process critique (orchestrated `carnica-critique`)

| Измерение | Балл | Evidence |
|---|---|---|
| Philosophy consistency | 8 | Один стиль заголовков, серый+белый+brand используется consistent |
| Visual hierarchy | 7 | 3 уровня иерархии читаются на squint test |
| Detail execution | 7 | Chevron recolor применён, divider inset = 72px |
| Functionality | 9 | Touch-targets ≥ 44, контраст AA |
| Innovation | 6 | Один Carnica-приём (card-holder стопка) применён осознанно |
| Brand Fidelity | 8 | Lowercase UI, BeelineSans, brand/primary только в CTA |

**Среднее:** 7.5 — strong pass с оговорками. Detail execution до 8 на repair.

### Reminder

После генерации напомни дизайнеру: `Cmd+Shift+P` → `Fix BeelineSans`.

### Verdict

<ship / repair iteration по Detail execution / переработать>. Next step: <carnica-final-qa для финального QA, либо repair, либо handoff>.
````

---

*Produces: Figma Plugin API код + component shopping list + tokens table + in-process critique scorecard + verdict.*

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: capability` — все три поля заполнены.
- [x] `name` соответствует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` соответствует middle-pushy формату с **verb-триггерами** («создай», «оцени», «выбери», «проверь») + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body (§ 3 architecture).
- [x] **Секция `## @references` присутствует и содержит ≥ 1 reference skill** (D-07, обязательно для capability) — фактически 11 entries.
- [x] В описании `## @references` упомянут принцип lazy auto-load (агент подтягивает по контексту шага, не всё на старте).
- [x] Секция «Когда НЕ применять» содержит ≥ 2 пункта с указанием альтернативных skills (anti-overlap boundary) — фактически 4 (final-qa / critique / ui-kit / GS reproduction).
- [x] Алгоритм имеет ≥ 3 шага в imperative form (§ 11 architecture) — фактически 6.
- [x] Output format — конкретный шаблон с разметкой, не абстрактное описание (component shopping list table + tokens table + Figma Plugin API код + critique scorecard + verdict).
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [x] Тяжёлая теория / полные справочники вынесены в `references/*.md` (§ 9 architecture) — для CAP-01 universal не требуется, всё в body + lazy-load refs из @references.
- [x] Все `<...>` placeholders заполнены.
- [x] Все template-комментарии (HTML-комментарии из стартера) удалены.
- [x] Imperative form в body (§ 11 architecture). Запрещённые слова в имитации сомнения — отсутствуют (grep test: список в `.agents/README.md` § 11).
