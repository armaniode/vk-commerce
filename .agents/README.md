# Архитектура skills для Carnica

Документ — единый источник правды по конвенции skills в Carnica Rules Template. Любой автор skill (reference или capability) сначала читает этот файл, потом пишет SKILL.md по нужному template.

**Core Value привязка:** skills существуют, чтобы idle-сессия (промпт без Carnica-контекста) держала ≤ 30k токенов. Тяжёлый знаниевый контент живёт в `{skill}/references/*.md` и подгружается только когда trigger-фраза в description сработает. Этот документ объясняет, как разрезать контент так, чтобы lazy-load работал.

**Источник best practices:** `~/.claude/plugins/marketplaces/claude-plugins-official/plugins/skill-creator/skills/skill-creator/SKILL.md` — Anthropic skill-creator. Carnica адаптирует, не переоткрывает. Здесь — только carnica-specific обвязка (`type` поле, parent-symlink parity, naming `carnica-{topic}`, русские триггеры в description).

---

## 1. Reference vs Capability

Критерий выбора типа skill — **по интенту пользователя**: знание или работа.

| Признак         | Reference                                              | Capability                                                         |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| Что делает      | KNOW — хранит знание, lookup-таблицы, decision rules   | DO — выполняет workflow, производит артефакт                       |
| Output          | Ответ на вопрос «как правильно X в Carnica»            | Готовый дизайн / ревью / выбранный токен                           |
| Стиль триггера  | Тема + контекст («работа с типографикой Beeline»)      | Глагол + объект («создай Carnica button», «оцени экран»)           |
| Пример          | `carnica-typography` (Phase 2), `carnica-design-system` | `carnica-critique`, `carnica-figma-design`                         |
| Зависимости     | Leaves графа — ref→ref запрещены                       | Имеет `## @references` секцию со списком reference skills          |

Если skill *в основном* хранит знание, но имеет короткий workflow выбора (например, `carnica-color-token-selection` отвечает «какой цветовой токен взять для X») — это **capability**: workflow-часть живёт в body, knowledge-часть выносится в `references/`. См. секцию 4 «Hybrid skills».

---

## 2. Topology: SKILL.md ↔ references/

Структура одного skill:

```
.agents/skills/{skill-name}/
├── SKILL.md                    # entry-point, ≤ 500 строк (§ 9)
└── references/                 # supporting files, lazy-loaded
    ├── theory.md
    ├── wcag.md
    └── examples.md
```

**Разделение по роли** (D-02):

- **SKILL.md body** — «что всегда делать»: правила, decision tables, алгоритмы, lookup-таблицы выбора. Большинство задач решаются без чтения `references/`.
- **`references/*.md`** — «ПОЧЕМУ именно так»: теория, WCAG-цитаты, академические ссылки, edge cases, расширенные таблицы, deep dives.

**Source of truth.** Каждый skill — самодостаточный entry-point по своей теме. SKILL.md + `references/` — единственное место, где живёт Carnica knowledge content. Дублирующих docs нет (legacy `rules/` директория удалена в v1.0 post-close cleanup — см. § 18).

**Пример из Carnica:** `carnica-anti-slop` (Phase 2) — body содержит триггер-лист P0/P1/P2 запретов на ~150 строк, а `references/examples-p0.md`, `references/examples-p1.md` хранят подробные кейсы с до/после. Агент читает body всегда, refs — только если просят «приведи пример P1-нарушения».

---

## 3. YAML frontmatter

Каждый SKILL.md начинается YAML-блоком:

```yaml
---
name: carnica-typography
description: Правила типографики Beeline для UI и текста. Используй когда работаешь с типографикой, шрифтами BeelineSans, line-height, font-weight, выбором размера или иерархией текста. Триггеры: «типографика», «шрифт», «line-height», «font-weight», «иерархия текста», а также любое обсуждение типографики в связке с Carnica/Beeline.
type: reference
---
```

**Обязательные поля:**

- `name` — идентификатор skill, совпадает с именем директории. Naming: `carnica-{topic}` (§ 8).
- `description` — естественно-языковой trigger-блок. Carnica-style — см. § 5.
- `type` — `reference` или `capability`. **Carnica-specific поле**: Anthropic skill-creator его не требует. Используется для аудита («сколько у нас reference vs capability»), будущего тулинга (валидатор `## @references` секции в capability) и читаемости графа зависимостей.

Claude Code и Codex CLI runtimes игнорируют незнакомые frontmatter-поля — `type` ничего не ломает.

**Не дублируй контент `description` в body** (Anthropic recommendation): все «когда применять» — в description, не в H2 «Когда применять» внутри тела. Body — про *как делать*, не про *когда*.

---

## 4. Hybrid skills

Hybrid skill — «в основном reference, но с workflow выбора». Пример из Carnica — **`carnica-color-token-selection`**: отвечает на «какой цветовой токен взять для тёмного блока на светлой странице» — workflow выбора (capability) + полная спецификация visual foundations в `carnica-design-system`.

Правило: **hybrid → capability**. `type: capability`, workflow в body, тяжёлый справочник — в отдельном reference skill/file, например `carnica-design-system/references/visual-foundations-reference.md`.

Анти-паттерн: смешивать workflow и полные lookup-таблицы прямо в body. SKILL.md растёт за 500 строк, lazy-load ломается, idle-токены съедены.

---

## 5. Description style

D-11 формат, **middle-pushy** (между Anthropic «soft» и «hard MUST»):

```
[Что делает одной фразой]. Используй когда [конкретный контекст].
Триггеры: «фраза 1», «фраза 2», «фраза 3»,
а также любое обсуждение [темы] в связке с Carnica/Beeline.
[Опционально: явное исключение «НЕ используй когда X»].
```

**Карта примеров:**

| Хорошо                                                                                                                                              | Плохо                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| «Правила типографики Beeline для UI и текста. Используй когда работаешь с шрифтом, line-height. Триггеры: «типографика», «шрифт», «иерархия текста».» | «Carnica typography rules.» (нет триггеров, overreach в любой проект) |
| «6-мерное ревью Carnica-дизайна. Используй после финальной генерации экрана. Триггеры: «оцени дизайн», «critique», «ревью», «можно сдавать».»        | «Helpful design review skill.» (generic, не привязан к Carnica)      |

**Анти-паттерны:**

- Generic слова без брендинга («дизайн», «цвет», «typography») — skill сработает на любой проект, токены утекут.
- Overreach в Anthropic-стиле — «Use this skill for ANY design task» — модель будет триггерить на не-Carnica задачи.
- Триггеры только на английском — Carnica-пользователи пишут по-русски. Дай RU- и EN-варианты.
- Описание реализации вместо интента — «Использует таблицы spacing» вместо «Помогает выбрать spacing-token».

---

## 6. `@references` секция в capability

D-07: capability skills в body содержат **явную секцию** со списком reference skills, которые этот capability подтягивает. Формирует читаемый граф зависимостей.

Формат:

```markdown
## @references

- `carnica-typography` — для правил типографики и иерархии
- `carnica-design-system` — для color tokens и spacing
- `carnica-anti-slop` — для P0/P1/P2 запретов перед финальной сдачей
- `carnica-components` — для decision rules «какой компонент когда»
```

**Lazy auto-load.** Модель сама решает, когда читать reference skill в процессе workflow — секция перечисляет *доступные* skills, не *обязательные к чтению на старте*. Это сохраняет idle-токены: capability подтягивает только тот ref, который нужен на конкретном шаге.

**Минимум один пункт.** Capability без `## @references` — сигнал, что либо контент дублируется (надо вынести в reference и сослаться), либо это не capability а reference с workflow-окраской — проверь § 1 критерий.

---

## 7. Reference dependencies

D-08: reference skills — **листья графа**. Зависимость `reference → reference` запрещена.

Причина: ref-граф с циклами / транзитивными зависимостями ломает lazy-load — подгрузка одного ref триггерит цепочку, idle-сессия раздувается. Reference должен быть самодостаточным entry-point по своей теме.

**При пересечении контента между ref skills** (color tokens нужны и `carnica-typography` для контраста, и `carnica-design-system` как owner):

- **Owner** один — `carnica-design-system`.
- Остальные ref skills либо ссылаются «см. полную таблицу в `carnica-design-system`», либо копируют **минимум inline** (1-3 значения, не всю таблицу).
- Связь через capability layer — `carnica-figma-design` (capability) в `## @references` указывает оба, и в нужном workflow-шаге решает, какой подтянуть.

Анти-паттерн: `carnica-typography` импортирует `carnica-design-system` для получения цветовых токенов. Вместо этого `carnica-typography` упоминает «WCAG-контраст — см. полную таблицу токенов в `carnica-design-system`» и копирует 3 ключевых значения inline.

---

## 8. Naming

Все skills в Carnica template префиксуются `carnica-`:

- `carnica-typography` (reference)
- `carnica-critique` (capability)
- `carnica-color-token-selection` (capability, hybrid; workflow выбора color token)
- `carnica-figma-design` (capability)

**Зачем префикс:** изоляция от других проектов, использующих этот template. Без префикса `typography` в global skill scope конфликтует с любым другим `typography` skill в системе пользователя.

Reference и capability skills **одинаково префиксуются** — отличие только в YAML поле `type`. Не пытайся кодировать тип в имени (`carnica-ref-typography` — лишний шум; runtime ничего с этим не делает).

---

## 9. Длина SKILL.md

**Hard limit: ≤ 500 строк** (ARCH-02). Считаются все строки: frontmatter, заголовки, пустые строки. `wc -l SKILL.md` < 500.

Soft target: 200-300 строк. Этот документ сам — пример: цель ~400, hard cap 500.

**Что выносить в `references/`:**

- Полные таблицы (>15 строк) — справочник цветовых токенов, полный component catalog
- Академические обоснования — WCAG-цитаты, ссылки на Bringhurst/Butterick
- Edge cases с детальными примерами «до/после»
- Историческая теория («почему iOS 7 убрала Bold» — нужно только при глубоком рисёрче)

**Что оставлять в body:**

- Quick reference (3-7 строк) — самая часто используемая lookup-таблица
- Decision rules — `IF X THEN Y` логика
- Алгоритм работы — упорядоченный список шагов для capability
- Триггер-листы — P0/P1/P2 запреты, имена компонентов

**Если приближаешься к 500:** не сжимай содержание агрессивно. Добавь ещё один уровень иерархии в `references/` с явными указателями из SKILL.md: «Подробности по WCAG — `references/wcag.md`».

---

## 10. Структура supporting files

D-04: путь — **`{skill}/references/{topic}.md`** (Anthropic standard).

```
.agents/skills/carnica-typography/
├── SKILL.md
└── references/
    ├── theory.md
    ├── wcag.md
    ├── examples.md
    └── tables-full.md
```

**Не использовать в v1:**

- `refs/` — нестандарт, ломает Anthropic-инструментарий и будущий валидатор
- `scripts/` — Carnica skills сейчас чисто текстовые, скрипты не нужны
- `assets/` — нет шрифтов/иконок внутри skill (они в корне репо `assets/`)

**Granularity** (один `references/X.md` vs тематическая разбивка `theory.md + wcag.md + examples.md`) калибруется в Phase 2 на `carnica-typography` (13 секций — pilot). До Phase 2 — не предполагай.

**Большие refs (>300 строк)** — добавь TOC в начале файла (Anthropic recommendation). Модель видит TOC и решает, какую секцию читать.

---

## 11. Imperative form

D-12 + Anthropic recommendation: пиши **повелительно** и объясняй ПОЧЕМУ.

| Хорошо                                                                                              | Плохо                                                              |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| «Прочитай `references/wcag.md` перед оценкой контраста — там полная таблица токенов с числами.»    | «Следует прочитать references/wcag.md.»                            |
| «Перекрась chevron в `content/secondary` — default `content/primary` слишком тёмный для navigation.» | «Возможно, имеет смысл перекрасить chevron.»                       |
| «Не используй `brand/primary` как цвет текста на светлом фоне — контраст 1.7:1, текст нечитаем.»    | «Brand/primary как цвет текста MUST NOT BE USED.»                  |

Объясняй причину короткой связкой («— потому что Y»). Голые MUST'ы Anthropic не рекомендует: модель лучше следует правилу, когда понимает зачем.

Запрещённые слова в imperative-секциях: «следует», «может быть», «возможно». Описательные секции (это — что такое skill, история решений) их допускают.

---

## 12. Parity strategy

D-13, D-14: **canonical путь — `.agents/skills/`**. Claude Code runtime читает из `.claude/skills/`, поэтому нужен mirror.

**Решение — parent-level symlink:** `.claude/skills/` → `../.agents/skills/`. Любой новый skill в canonical автоматически виден из обоих runtimes. Drift impossible.

**Команда миграции** (выполняется в Phase 4):

```bash
cd .claude && rm -rf skills && ln -s ../.agents/skills skills
```

**Проверка после команды:**

```bash
git ls-files --stage .claude/skills | awk '{print $1}'
# → 120000 (symlink mode, не 100644 regular file)

[ -L .claude/skills ] && [ "$(readlink .claude/skills)" = "../.agents/skills" ]
# → exit 0
```

Если `git ls-files --stage` показывает `100644` — git добавил содержимое директории, а не symlink. Откатить (`git reset HEAD~`), убедиться что `.gitignore` не блокирует `.claude/` (см. § 13 platform note), повторить.

До Phase 4 текущие 4 per-skill compatibility wrappers (`.claude/skills/{carnica-*}/SKILL.md`) продолжают работать — они уже корректно ссылаются на canonical. Phase 4 удаляет wrapper-папки и создаёт единый parent-symlink.

**Git и symlinks:** symlink коммитится как текстовый target-path. `.gitignore` не нуждается в специальной настройке — стандартное поведение `git add` сохраняет symlink, не следует за ним. Проверь после миграции: `git diff` показывает `120000` mode у `.claude/skills`.

**Source of truth — `.agents/skills/`**. Любая правка skill идёт только туда. `.claude/skills/` после миграции — не редактируемый mirror.

---

## 13. Platform note

D-15: Carnica template поддерживает **macOS и Linux**. Windows без admin прав символьные ссылки не создаёт стабильно (требует Developer Mode или admin shell).

Если в будущем понадобится Windows — fallback build-script для копирования `.agents/skills/` → `.claude/skills/` (backlog v2.0). Не в скоупе v1.

Документируй ограничение в README репозитория (Phase 4): «Для работы шаблона нужен macOS или Linux. Windows-поддержка — v2».

---

## 14. Discovery

Phase 4 проверяет discoverability на golden test set из 5+ реалистичных запросов. Каждый запрос — реальный пользовательский текст на русском/английском, который должен авто-активировать правильный skill **без** явного `Skill X`.

**Что определяет discovery:**

- **Description triggers** — главный механизм (§ 5). Без явных русских триггер-фраз discovery не работает для Carnica-пользователей.
- **`@references` граф** — после автоактивации capability модель видит, какие refs доступны, и подтягивает по контексту workflow-шага.
- **CLAUDE.md / AGENTS.md skills map** — короткий entry-point (5-10 строк) в адаптере с примерами триггеров (`DISCOVERY-03`, Phase 4).

Не пиши «как улучшить discovery» в каждом SKILL.md — это вотчина description (§ 5) и Phase 4 calibration. Skill body описывает workflow, не свою маркетинговую страницу.

---

## 15. Lifecycle и source of truth

- Canonical для всех skills — **`.agents/skills/{skill-name}/`**.
- `.claude/skills/` после Phase 4 — symlink, не редактируется напрямую.
- Любая правка skill (body, добавление reference, обновление description) — коммит в `.agents/skills/`.
- Legacy `rules/` директория удалена в v1.0 post-close cleanup (см. § 18). Skill content полностью живёт в SKILL.md + `references/`.

**Когда обновлять этот файл (`.agents/README.md`):**

- Меняется решение D-XX из `.planning/milestones/v1.0-phases/01-foundation/01-CONTEXT.md` (или текущей milestone phase context) — синхронизируй документ.
- Добавляется новое carnica-specific поле в frontmatter — обнови § 3.
- Изменилась granularity refs/ — обнови § 10.

---

## 16. Anti-patterns

Чего **не делает** skill в Carnica:

1. **Не пишет skill-creator UI** (Anthropic `eval-viewer/`, `agents/grader.md` и пр.). Carnica использует Anthropic skill-creator как guide при ручном создании, не как генератор.
2. **Не пытается быть универсальным.** v1 покрывает Claude Code + Codex CLI. Gemini/OpenCode/Cursor — backlog v2.0.
3. **Не клонирует контент между ref skills.** Один owner — § 7.
4. **Не использует hex напрямую** (анти-паттерн уровня кода, но всплывает в примерах внутри SKILL.md): `solid('#FFC800')` вместо `brand/primary`. Все цвета — через дизайн-токены (см. `carnica-color-token-selection` skill).
5. **Не растёт сверх 500 строк через накопление примеров** — выноси в `references/examples.md` (§ 9).
6. **Не использует `## Когда применять` в body**, если это уже в `description` — дублирование, удаляй (§ 3).

---

## 17. Discovery & References

Раздел собирает full picture: как skill discovery работает end-to-end в Carnica template. § 5 (description style), § 6 (`## @references`), § 12 (parity), § 14 (что определяет discovery) — детали; здесь — workflow и golden test convention.

### 17.1. End-to-end discovery flow

1. Пользователь пишет естественно-языковой запрос на русском (например, «собери экран wallet по принципам»).
2. Runtime (Claude Code / Codex) сканирует все доступные SKILL.md → читает только YAML frontmatter (без body, без `references/`) — экономия токенов.
3. По полю `description` каждого skill runtime матчит trigger-фразы с user query. Используется semantic matching + явные ключевые слова в кавычках.
4. Лучший match → runtime автозагружает SKILL.md body (но **НЕ** содержимое `references/`).
5. Capability skill в body показывает `## @references` секцию → агент знает, какие reference skills доступны.
6. Когда workflow-шаг конкретно требует knowledge — агент явно читает соответствующий `references/X.md` или активирует reference skill через trigger.

### 17.2. Symlink topology

Phase 4 миграция (D-13/D-14):

- Canonical: `.agents/skills/` — все edits идут только сюда.
- Mirror: `.claude/skills/` → parent-symlink `../.agents/skills/`. Claude Code runtime читает через symlink, видит canonical.
- До Phase 4 существовали 4 per-skill compatibility wrappers — заменены атомарным коммитом в Phase 4.

Проверка топологии в новом репозитории — см. § 12 (verify-block).

### 17.3. `@references` граф

D-07 + D-08: capability в body имеет `## @references` секцию со списком reference skills. Это формирует **direct-acyclic graph (DAG)**:

- **Корни графа** — capability skills (6 в Carnica v1): figma-design, ui-kit-app, ui-kit-web, color-token-selection, critique, final-qa.
- **Листья графа** — reference skills (10 в Carnica v1): typography, components, visual-patterns, anti-slop, motion, copy-tone, ux-principles, design-system, gotchas, design-references.
- **Ребро** capability → reference означает «капабилити может подтянуть этот ref в свой workflow». Lazy auto-load — не обязательность.

Reference → reference ребра запрещены (§ 7). При пересечении контента — OWNER pattern: один reference хранит истину (например, `carnica-design-system` OWNER color tokens), остальные ссылаются.

### 17.4. Golden test convention (Phase 4 calibration)

Каждый template-проект в Carnica должен иметь набор golden test queries для проверки discoverability. Конвенция Phase 4:

1. **Coverage:** каждый capability skill покрыт ≥ 2 queries — full trigger phrase (close to description) + easy разговорный (далеко от description).
2. **PASS criterion:** в свежей Claude Code сессии `/clear` → ввести query → `/context` показывает подгруженный нужный SKILL.md. Для Codex fallback — skill упоминается в первых 2 tool calls.
3. **Storage:** golden test results — phase artifact `04-DISCOVERY-TESTS.md`. После milestone archive переезжает с фазой — каждый проект пишет свой набор под свои кейсы.
4. **FAIL iteration policy:** cap **3 description edits** per skill при FAIL. Каждая правка — отдельный коммит «iter X/3» с обоснованием. После 3-х — known issue в SUMMARY, эскалация пользователю либо обогащение Skills map в `CLAUDE.md`/`AGENTS.md`.

Конкретный набор Phase 4 — `.planning/milestones/v1.0-phases/04-integration-discovery/04-DISCOVERY-TESTS.md` (12 queries, archived в milestone v1.0). Phase 5 VERIFY-02 провёл runtime regression на этом наборе — 11/12 PASS.

### 17.5. Что НЕ делает discovery

- Не магически догадывается о intent без явных trigger-фраз. Description в каждом SKILL.md обязан быть middle-pushy (§ 5).
- Не подтягивает все 16 skills сразу. Lazy-load — только нужный по trigger.
- Не работает без брендинга. Generic слова («дизайн», «цвет») в description ломают discovery — skill сработает на любой проект.

---

## 18. Legacy rules/ cleanup (v1.0 post-close)

Pre-v1.0 репозиторий содержал параллельную `rules/*.md` директорию с human-readable design docs. Phase 5 CLEANUP-02 провела per-file referrer audit и решила 14 keep + 1 delete (`rules/prompt-templates.md` — 0 referrers). Post-v1.0 milestone close (2026-05-13) оставшаяся `rules/` директория удалена полностью.

**Что произошло:**

- `rules/skills-architecture.md` → переименован в `.agents/README.md` (этот файл) как canonical convention документ.
- 12 design content файлов (`anti-ai-slop.md`, `component-decision-rules.md`, `copy-tone.md`, `critique.md`, `design-system.md`, `known-gotchas.md`, `motion.md`, `qa-scorecard.md`, `visual-patterns.md`, `workflow.md`, `component-catalog.md`, `component-properties.md`) — контент живёт 1:1 в `.agents/skills/{name}/SKILL.md` + `references/*.md`.
- `rules/README.md` — удалён (index файлов, которых больше нет).

**Rationale:** dual source of truth (rules/ + skills) создавал drift risk при будущем maintenance. Skills стали единственным canonical source как для human readers, так и для LLM runtime. См. `.planning/RETROSPECTIVE.md` v1.0 retrospective для полного decision context.

**Для human readers:** entry points в design knowledge — SKILL.md файлы в `.agents/skills/`. Каждый начинается с description (триггеры + intent) и через `## @references` показывает связанные reference skills.

---

*Last updated: 2026-05-13 (v1.0 post-close: rules/ collapsed → `.agents/README.md`)*

*Source decisions: `.planning/milestones/v1.0-phases/01-foundation/01-CONTEXT.md` (D-01..D-15), `.planning/milestones/v1.0-phases/04-integration-discovery/04-CONTEXT.md` (D-49..D-57 — DISCOVERY golden test + early CLEANUP-01)*

*Source requirements: `.planning/milestones/v1.0-REQUIREMENTS.md` (ARCH-01..04)*

*Anthropic best practices: `~/.claude/plugins/marketplaces/claude-plugins-official/plugins/skill-creator/skills/skill-creator/SKILL.md` (адаптируется, не дублируется)*
