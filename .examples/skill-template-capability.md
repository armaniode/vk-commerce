# Skill template — Capability

> Стартер для нового **capability skill**. Capability skill выполняет workflow и производит артефакт (дизайн, ревью, выбор токена, отчёт). В отличие от reference (хранит знание), capability — DO, а не KNOW. Полная конвенция — `rules/skills-architecture.md` (критерии reference vs capability, naming, YAML frontmatter, `@references` граф, hybrid skills, parity).
>
> **Usage:**
> 1. `cp .examples/skill-template-capability.md .agents/skills/carnica-<topic>/SKILL.md`
> 2. Заполни все `<...>` placeholders.
> 3. Удали все `<!-- TEMPLATE: ... -->` комментарии перед коммитом.
> 4. Тяжёлая теория и edge cases — в `.agents/skills/carnica-<topic>/references/<topic>.md`. В body — рабочий алгоритм и lookup для текущего шага.
> 5. Прогони Acceptance checklist (внизу файла) перед PR.

<!-- TEMPLATE: всё, что ниже горизонтальной линии — это и есть скелет SKILL.md. Скопируй от YAML frontmatter и до Footer. Сам блок-инструкция выше — не переноси. -->

---

```yaml
---
name: carnica-<topic>
description: <Создание/ревью/выбор <артефакта> по правилам Carnica. Используй когда пользователь просит <действие> с <объектом>. Триггеры: «<глагол> <объект>», «<глагол> <ситуация>», «<синоним>», а также любое <тема> в связке с Carnica/Beeline.>
type: capability
---
```

# Carnica <Capability Name>

<!-- TEMPLATE: одно предложение, что делает skill (производит → артефакт). Не дублируй description. -->

<Одно-два предложения: что делает skill и какой артефакт производит. Без повторения триггеров из description.>

## Когда применять

<!-- TEMPLATE: 3-5 bullets с DO-сценариями. Каждый bullet — глагольная конструкция: «когда нужно создать X», «когда оценить Y», «когда выбрать Z». Это сценарии задачи, не trigger-фразы (триггеры — в description). -->

- <Сценарий 1 — конкретное «когда нужно сделать X»>
- <Сценарий 2>
- <Сценарий 3>

## Когда НЕ применять

<!-- TEMPLATE: explicit boundary. Перечисли смежные capabilities и reference skills, которые делают другую работу. Цель — анти-overlap, чтобы автоактивация не задевала чужую территорию. Минимум 2 пункта. -->

- <Сценарий, который выглядит похожим, но решается другим способом> — используй <`carnica-<other-capability>`> или <`carnica-<reference>`>.
- <Промежуточные проверки / быстрые правки, для которых полный workflow избыточен> — достаточно <ссылка на лёгкий путь>.

## @references

<!-- TEMPLATE: ОБЯЗАТЕЛЬНАЯ секция для capability (D-07, rules/skills-architecture.md § 6). Минимум 1 пункт. Формат — «`carnica-<ref>` — для <что именно подтягивает>».
ВАЖНО: это lazy auto-load — агент сам решает, КОГДА читать каждый ref в процессе workflow. Секция перечисляет ДОСТУПНЫЕ refs, а не «обязательные к чтению на старте». Это сохраняет idle-токены: capability подтягивает только тот ref, который нужен на конкретном шаге алгоритма.
Если у capability нет ни одного ref — это сигнал, что либо контент дублируется (вынеси в ref и сошлись), либо это не capability а reference с workflow-окраской. Проверь § 1 architecture. -->

- `carnica-<reference-1>` — для <темы 1>, подтягивается на шаге N алгоритма
- `carnica-<reference-2>` — для <темы 2>
- `carnica-<reference-3>` — для <темы 3>

## Алгоритм

<!-- TEMPLATE: пронумерованные шаги workflow в imperative form (§ 11 architecture). «Прочитай X», «Получи Y», «Применяй Z». НЕ «следует прочитать», «можно применить». Объясняй ПОЧЕМУ короткой связкой «— потому что W». Указывай явно, какой ref из @references подтягивается на каждом шаге, если уместно. -->

1. **<Шаг 1: подготовка / чтение источников>** — прочитай `carnica-<ref>/SKILL.md` и убедись, что есть <необходимый артефакт-вход>.
2. **<Шаг 2: основная работа>** — выполни <действие>, опираясь на <ref / правило>. Если <условие> — подтяни `<этого ref>/references/<deep-dive>.md`.
3. **<Шаг 3: проверка / валидация>** — пройдись по <чек-листу> и зафиксируй <результат>.
4. **<Шаг 4: формирование вывода>** — собери результат в Output format (см. ниже).
5. **<Шаг 5: принятие решения / verdict>** — на основании <критерия> прими <решение «принять / переделать / эскалировать»>.

## Output format

<!-- TEMPLATE: конкретный пример того, что skill производит на выходе. НЕ абстрактное описание «отчёт по дизайну», а реальный шаблон с разметкой. Это позволяет автору будущего skill сразу видеть, как должен выглядеть результат. -->

```markdown
## <Заголовок артефакта> — <название контекста>

<краткое summary одной строкой>

### <Раздел 1 артефакта>

- <bullet с конкретным значением>
- <bullet>

### <Раздел 2 артефакта>

| <колонка 1> | <колонка 2> |
| ----------- | ----------- |
| <значение>  | <значение>  |

### Вывод

<verdict в свободной форме: что принять / что доделать / какие следующие шаги>
```

## Hybrid skill note (опционально)

<!-- TEMPLATE: если skill в основном reference (хранит знание), но имеет workflow выбора (D-06, § 4 architecture — например, carnica-design-tokens отвечает «какой токен взять для X») — это hybrid. Hybrid → `type: capability`.
- Workflow-часть (3-5 шагов выбора) — в body выше.
- Тяжёлый справочник (полные таблицы токенов, list всех компонентов) — в `references/<topic>-full.md`.
Если skill — НЕ hybrid (чистый workflow), удали эту секцию полностью. -->

Этот skill — hybrid: <workflow выбора> в body, <полная справочная база> в `references/<topic>-full.md`. См. `rules/skills-architecture.md` § 4.

---

*Source: rules/<original-file>.md* — если skill мигрирован из существующего rules/-файла. Удали строку, если skill — оригинальный.

*Produces: <тип артефакта>* — например, `golden-samples/results/gs-N.md` для critique, или JSON-список выбранных токенов.

---

## Mini-пример (для ориентира; удалить в реальном SKILL.md)

<!-- TEMPLATE: ниже — short illustration, как выглядит правильно заполненный capability на ~5 строк алгоритма. Помогает автору почувствовать тон. УДАЛИ этот раздел целиком перед коммитом реального SKILL.md. -->

Например, для `carnica-critique`:

- **Когда применять:** после финальной сборки экрана, перед сдачей.
- **Когда НЕ применять:** для промежуточных проверок секций (там screenshot QA), для правки одного компонента (там anti-ai-slop checklist).
- **@references:** `carnica-anti-slop`, `carnica-typography`, `carnica-design-tokens`, `carnica-copy-tone`.
- **Алгоритм (укорочённо):** 1) прочитай `rules/critique.md`; 2) получи screenshot + reference; 3) пройдись по 6 измерениям; 4) каждой оценке — evidence; 5) собери Keep/Fix/Quick Wins; 6) verdict.
- **Output:** markdown-таблица 6 оценок + Evidence/Keep/Fix/Quick Wins + Вывод.

---

## Acceptance checklist (copy-paste для PR review)

<!-- TEMPLATE: оставь эту секцию в финальном SKILL.md как self-check. Авторы будущих skills копируют её в PR description и проходятся по пунктам. ARCH-02/03/04 enforce'ятся через этот checklist. -->

- [ ] YAML frontmatter содержит `name`, `description`, `type: capability` — все три поля заполнены.
- [ ] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [ ] `description` следует middle-pushy формату с **verb-триггерами** («создай», «оцени», «выбери», «проверь») + связка с Carnica/Beeline (§ 5 architecture).
- [ ] `description` не дублируется H2-секцией «Когда применять» в body (§ 3 architecture).
- [ ] **Секция `## @references` присутствует и содержит ≥ 1 reference skill** (D-07, обязательно для capability).
- [ ] В описании `@references` упомянут принцип lazy auto-load (агент подтягивает по контексту шага, не всё на старте).
- [ ] Секция «Когда НЕ применять» содержит ≥ 2 пункта с указанием альтернативных skills (anti-overlap boundary).
- [ ] Алгоритм имеет ≥ 3 шага в imperative form (§ 11 architecture).
- [ ] Output format — конкретный шаблон с разметкой, не абстрактное описание.
- [ ] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [ ] Тяжёлая теория / полные справочники вынесены в `references/*.md` (§ 9 architecture).
- [ ] Если skill — hybrid (D-06): отмечен в Hybrid skill note, workflow в body, тяжёлый справочник в `references/`.
- [ ] Все `<...>` placeholders заполнены.
- [ ] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [ ] Mini-пример удалён.
- [ ] Imperative form в body (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют.
