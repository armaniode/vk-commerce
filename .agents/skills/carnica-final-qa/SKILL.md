---
name: carnica-final-qa
description: Финальная QA-проверка готового Carnica-артефакта перед сдачей — scorecard 5 критериев (Structure / Components / Visual similarity / Spacing / Typography) + Final QA checklist + ship-readiness verdict (ship / repair / переработать). Используй ТОЛЬКО когда артефакт готов и стоит вопрос «можно ли сдавать», «можно ли коммитить», «final review перед handoff». Для промежуточной оценки во время работы — carnica-critique (CAP-02). Триггеры: «финальный QA», «можно сдавать», «можно ли коммитить», «qa-scorecard», «оценить готовый», «проверить перед сдачей», «final review», «ship readiness», «final QA Carnica», а также любой ship-decision запрос в связке с Carnica/Beeline.
type: capability
---

# Carnica Final QA

Capability для финальной QA-проверки готового Carnica-артефакта перед сдачей / релизом / handoff дизайнеру. Производит scorecard 5 критериев с весами (Structure 30 / Components 25 / Visual similarity 20 / Spacing 15 / Typography 10) + Final QA checklist (22+ пункта) + orchestrated качественную часть через `carnica-critique` + ship-readiness verdict.

## Когда применять

- Готовый Carnica-артефакт (компонент / секция / экран) и вопрос «можно ли сдавать / коммитить / релизить».
- Финальная QA перед handoff дизайнеру или продуктовой команде Beeline.
- Перед записью результата в эталонный файл результата (зафиксировать scorecard + critique outcome + verdict).
- Перед релизом фичи / production deploy (если артефакт включает Carnica UI).
- Orchestrated из `carnica-figma-design` на шаге 6 (handoff после генерации).

## Когда НЕ применять

- **Промежуточная оценка во время работы** между секциями / после неудачной итерации — используй `carnica-critique` (CAP-02). Critique даёт 6-мерный pass с Keep/Fix/Quick Wins без формальной ship-readiness gate. Final-qa orchestrate critique как sub-step (шаг 5 Алгоритма), но добавляет compliance scorecard и формальный verdict.
- **Генерация / repair / правка дизайна** — используй `carnica-figma-design` (CAP-01) для целостной сборки или `carnica-anti-slop` для точечной правки P0/P1/P2. Этот skill — gate, не producer.
- **Прототипы для внутренних обсуждений** до прикрутки реальных данных — final QA даёт ложные сигналы по compliance на mock-данных.
- **Изменение методологии QA** (новые критерии, веса, threshold) — out of scope. Источник правды — этот SKILL.md.

## @references

> Lazy auto-load (D-07, `.agents/README.md` § 6): этот capability перечисляет ДОСТУПНЫЕ reference skills, агент сам решает КОГДА читать каждый по контексту шага алгоритма. Без выгрузки всех refs на старте — это сохраняет idle-токены.

- `carnica-anti-slop` — P0/P1/P2 запреты. **P0 нарушение → НЕ ship независимо от scorecard.** Подтягивается на шаге 1 (предpass проверка перед основным scorecard).
- `carnica-design-system` — **OWNER** color tokens (D-27), Figma spacing tokens `negative 500` ... `2000`, typography style keys. Подтягивается на шаге 2 (Structure scoring), шаге 3 (Components decision rules) и шаге 4 (Spacing + Typography 10 баллов).
- `carnica-typography` — иерархия ≤ 4 уровней, line-height unitless, font-weight 400/500, контраст WCAG. Подтягивается на шаге 4 (Typography 10 баллов scoring).
- `carnica-copy-tone` — lowercase UI, запрещённые фразы, units lowercase (гб не ГБ). Подтягивается на шаге 4 (consistency check, копирайт).
- `carnica-critique` — **orchestrated** на шаге 5 (качественная 6-мерная часть QA). D-36 однонаправленный граф: final-qa → critique (orchestrator → leaf-capability). Critique НЕ orchestrate final-qa.

## Алгоритм

1. **Шаг 1: Предpass anti-slop (P0/P1)** — подтяни `carnica-anti-slop/SKILL.md`. Пройди P0 список (catastrophic violations): hex напрямую в финальном paint, `detachInstance()`, ручная сборка вместо `importComponentSetByKeyAsync`, Bold/SemiBold в `createStyledText`, CAPS UI текст, `brand/primary` как цвет текста на светлом фоне. **Если ХОТЯ БЫ ОДИН P0 — НЕ ship** независимо от scorecard. Verdict = «repair P0 first». Прерви final-qa и передай артефакт обратно в `carnica-figma-design` или `carnica-anti-slop` для repair.

2. **Шаг 2: Structure scoring (30 баллов)** — оцени hierarchy, auto-layout, wrappers, scroll/fixed behavior, clipping. Подтяни `carnica-design-system/SKILL.md` для Figma spacing/radius tokens и правил nested radius. Шкала:
   - **30 (perfect):** иерархия + auto-layout везде + правильное clipping/wrapping + `counterAxisSizingMode='AUTO'` на кастомных горизонтальных frame.
   - **25 (strong):** одна-две мелких просадки (например, fixed width на text container, забытый `fills=[]` на одном frame).
   - **15 (functional):** несколько структурных проблем (нет auto-layout на 1-2 секциях, fixed coordinates вместо HUG/FILL).
   - **0-10 (broken):** нет auto-layout по экрану / hardcoded coordinates / нет clipping для viewport-демо.

3. **Шаг 3: Components scoring (25 баллов)** — оцени использование Carnica-компонентов через decision rules «какой компонент когда». Подтяни `carnica-design-system/SKILL.md` для component-decision-rules; при platform=APP — паспорта из `carnica-ui-kit-app`, при platform=WEB — `carnica-ui-kit-web`. Шкала:
   - **25:** все компоненты — Carnica, нет manual replacements, правильные variants и TEXT/BOOLEAN/INSTANCE_SWAP keys, gotchas применены (padding reset large only, chevron recolor в content/secondary, plus round `style=stroke`, `navbar modal 1.0` в модалках, `cell 3.1` в карточке `background=none`).
   - **20:** один компонент пропустил gotcha (например, chevron не перекрашен, или `button 2.5 size=medium` получил resetPadding).
   - **10:** несколько manual frames вместо Carnica-компонентов.
   - **0:** ручная сборка экрана без Carnica components.

4. **Шаг 4: Visual / Spacing / Typography scoring (45 баллов суммарно)** — три критерия одновременно:
   - **Visual similarity (20)** — overall composition, density, rhythm, reference matching. Сделай `get_screenshot` и сравни с brief / reference. Балл по визуальному соответствию.
   - **Spacing (15)** — side padding (20px mobile / 40px desktop), card padding (16-24), gaps, radius (32 main / 16 internal / 100 pill), edge-to-edge exceptions (4px только для wallet/card-holder). Подтяни `carnica-design-system/SKILL.md` § Spacing.
   - **Typography (10)** — style keys из шкалы 13/16/20/24/32/40/56, BeelineSans only, weights 400/500 only, иерархия ≤ 4 уровней, lowercase UI. Подтяни `carnica-typography/SKILL.md` для правил иерархии и line-height. Подтяни `carnica-copy-tone/SKILL.md` для casing/units lowercase (гб не ГБ, мбит не Мбит).

5. **Шаг 5: Orchestrate carnica-critique (качественная часть)** — вызови `carnica-critique` как sub-step (D-36 однонаправленный граф). Получи 6-мерный critique scorecard (Philosophy / Hierarchy / Detail / Functionality / Innovation / Brand Fidelity) + Keep/Fix/Quick Wins. Этот шаг **дополняет** compliance scorecard (шаги 1-4) качественной оценкой — потому что compliance scorecard ловит «правильно ли собрано», critique ловит «хорошо ли смотрится». **Brand Fidelity < 7 → repair** независимо от compliance scorecard (Carnica-hard block по D-38).

6. **Шаг 6: Final verdict (ship / repair / переработать)** — сумма scorecard баллов (max 100) + critique outcome:
   - **`90-100` + critique strong pass (Brand Fidelity ≥ 7, среднее ≥ 8)** → **ship**. Готово к handoff.
   - **`80-89` + critique pass (Brand Fidelity ≥ 7, среднее ≥ 7)** → **ship с reservations** (зафиксировать минорные Fix в TODO для следующей итерации, артефакт сдаётся).
   - **`60-79`** ИЛИ **critique repair recommended (Brand Fidelity < 7 ИЛИ любое измерение < 5)** → **repair iteration** с приоритетами по самым низким scorecard критериям + critique Fix/Quick Wins.
   - **`<60`** ИЛИ **critique broken (среднее < 5)** → **переработать** с нуля по конкретным failure points (передай в `carnica-figma-design` с brief на новую итерацию).

   Зафиксируй verdict в Output format с конкретными next steps и каналом передачи (commit / handoff дизайнеру / repair loop).

## Final QA checklist

Перед verdict «ship» пройди по списку. ≥ 1 unchecked → repair, не ship:

- [ ] Platform selected: APP or WEB.
- [ ] All required canonical rules были прочитаны (или соответствующие references подтянуты на шагах 1-5).
- [ ] Component shopping list существовал (из `carnica-figma-design` шаг 2).
- [ ] No direct hex as final paint; variables bound via `importVariableByKeyAsync`.
- [ ] Fallback RGB values match bound color variables.
- [ ] No `detachInstance()` calls.
- [ ] No manual UI where a Carnica component exists.
- [ ] Every component has correct variant and properties.
- [ ] Every custom container uses auto-layout.
- [ ] Text containers are `FILL` or `HUG`, not fixed width, unless explicitly allowed (wallet card-holder, viewport demo).
- [ ] `figma.createFrame()` helpers clear `fills=[]` immediately после создания.
- [ ] `layoutSizing*='FILL'` set после `parent.appendChild(child)`.
- [ ] `counterAxisSizingMode='AUTO'` on custom horizontal frames.
- [ ] Component padding reset applied only where allowed (`button 2.5 size=large` external layout container only; `size=medium/small` сохраняют internal padding).
- [ ] `navbar modal 1.0` used in modal / bottom sheet.
- [ ] `plus round` icon uses `style=stroke` (единственное исключение).
- [ ] `cell 3.1` in cards uses `background=none` (не `bg_secondary`).
- [ ] Cell and inline-text chevrons recolored to `content/secondary` через `recolorVectors()`.
- [ ] Screenshot был проверен после каждой major section во время сборки.
- [ ] Final screenshot сравнён с reference / brief.
- [ ] `Cmd+Shift+P` -> `Fix BeelineSans` reminder включён в handoff.
- [ ] Lowercase UI consistency: нет CAPS для UI текста, units lowercase (гб не ГБ, мбит не Мбит, ггц не ГГц).

## Output format

Skill производит следующий артефакт в чате:

````markdown
## Carnica Final QA — <название артефакта>

**Артефакт:** <эталонный экран GS-N | релиз feature X | handoff component Y>
**Reference (опц):** <Figma node | brief | эталонный экран>
**Generated:** <node id | code link>

### Compliance scorecard (max 100)

| Критерий | Вес | Балл | Заметки |
|---|---:|---:|---|
| Structure | 30 | 27 | auto-layout везде, одна fixed width просадка в text container |
| Components | 25 | 25 | все Carnica, chevron recolor применён, padding reset только large |
| Visual similarity | 20 | 18 | overall density совпадает с brief, hero чуть «глубже» |
| Spacing | 15 | 15 | side padding 20, card padding 16, radius 32 main / 16 internal |
| Typography | 10 | 9 | styles из шкалы, BeelineSans, одна заглавная в navbar (минор) |
| **Total** | **100** | **94** | — |

**Compliance status:** `90-100` — strong pass.

### Quality critique (orchestrated `carnica-critique`)

| Измерение | Балл | Бэнд |
|---|---|---|
| Philosophy consistency | 8 | strong |
| Visual hierarchy | 7 | strong |
| Detail execution | 8 | strong |
| Functionality | 9 | strong |
| Innovation | 6 | functional |
| Brand Fidelity | 8 | strong |

**Среднее:** 7.7 — pass. Brand Fidelity ≥ 7 ✓.

### Final QA checklist outcome

22 / 22 пройдено (1 минорный: navbar заглавная). ≥ 1 unchecked → would block ship — но этот пункт обсуждён с дизайнером как осознанное исключение, override applied.

### Verdict: **ship с reservations**

**Compliance:** 94/100 (strong pass).
**Critique:** среднее 7.7, Brand Fidelity 8 (pass).
**Final:** ship + зафиксировать в TODO для следующей итерации:
- Innovation 6 → добавить один Carnica-приём из visual-patterns в next iteration.
- Typography навbar заглавная — обсуди с copy-team на предмет перевода в lowercase.

**Next step:** handoff в дизайн-команду / commit / release. Запиши scorecard + critique + verdict в эталонный файл результата.
````

---

*Produces: scorecard table (5 критериев) + critique outcome (6 измерений orchestrated) + Final QA checklist + ship-readiness verdict.*

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: capability` — все три поля заполнены.
- [x] `name` соответствует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` соответствует middle-pushy формату с **verb-триггерами** («оцени», «проверь», «можно ли») + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` содержит явное «финальная», «готового», «перед сдачей», «ship readiness» (D-37 anti-overlap с CAP-02 in-process critique).
- [x] `description` содержит явное исключение «Для промежуточной — carnica-critique».
- [x] **Секция `## @references` присутствует и содержит ≥ 1 reference skill** (D-07) — фактически 5 (anti-slop, design-system, typography, copy-tone + orchestrated critique).
- [x] В описании `## @references` упомянут принцип lazy auto-load (агент подтягивает по контексту шага, не всё на старте).
- [x] Секция «Когда НЕ применять» содержит ≥ 2 пункта с указанием альтернативных skills (anti-overlap boundary) — фактически 4 (critique / figma-design+anti-slop / prototypes / methodology change).
- [x] Алгоритм имеет ≥ 3 шага в imperative form (§ 11 architecture) — фактически 6.
- [x] Output format — конкретный шаблон с разметкой (compliance scorecard table 5 критериев + critique table 6 измерений + checklist outcome + verdict).
- [x] Файл ≤ 250 строк (LIGHT D-24 — без `references/`, body содержит и scoring weights, и checklist, и orchestrated logic в одном файле).
- [x] Тяжёлая теория / полные справочники подтягиваются через `@references` lazy-load из существующих reference skills (анти-slop, design-system, typography, copy-tone, orchestrate critique).
- [x] Все `<...>` placeholders заполнены.
- [x] Все template-комментарии (HTML-комментарии из стартера) удалены.
- [x] Imperative form в body (§ 11 architecture). Запрещённые слова в имитации сомнения — отсутствуют (grep test: список в `.agents/README.md` § 11).
