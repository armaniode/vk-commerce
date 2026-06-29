# Skill template — Reference

> Стартер для нового **reference skill**. Reference skill хранит знание (lookup-таблицы, decision rules, правила), но не выполняет workflow с артефактом на выходе. Полная конвенция — `rules/skills-architecture.md` (критерии reference vs capability, naming, YAML frontmatter, parity).
>
> **Usage:**
> 1. `cp .examples/skill-template-reference.md .agents/skills/carnica-<topic>/SKILL.md`
> 2. Заполни все `<...>` placeholders.
> 3. Удали все `<!-- TEMPLATE: ... -->` комментарии перед коммитом.
> 4. Тяжёлый материал (полные таблицы > 15 строк, теория, WCAG-цитаты, edge cases) — вынеси в `.agents/skills/carnica-<topic>/references/<topic>.md`.
> 5. Прогони Acceptance checklist (внизу файла) перед PR.

<!-- TEMPLATE: всё, что ниже горизонтальной линии — это и есть скелет SKILL.md. Скопируй от YAML frontmatter и до Footer. Сам блок-инструкция выше — не переноси. -->

---

```yaml
---
name: carnica-<topic>
description: <Правила/принципы Carnica по теме «<тема>». Используй когда работаешь с <конкретный контекст>. Триггеры: «<фраза 1>», «<фраза 2>», «<фраза 3>», а также любое обсуждение <темы> в связке с Carnica/Beeline.>
type: reference
---
```

# Carnica <Topic>

<!-- TEMPLATE: одно предложение, что хранит этот skill. Не дублируй description (Anthropic-recommendation: «когда применять» — только в description, не в body). -->

<Одно-два предложения: что внутри (lookup-таблицы / decision rules / правила), без повторения триггеров из description.>

## Когда обращаться

<!-- TEMPLATE: 3-6 bullets с конкретными СЦЕНАРИЯМИ (не trigger-фразами). Каждый bullet — «когда пользователь делает X». Триггеры — в description; здесь — сценарии. -->

- <Сценарий 1 — конкретное действие пользователя или контекст задачи>
- <Сценарий 2>
- <Сценарий 3>

## Quick reference

<!-- TEMPLATE: главная ценность reference skill. Lookup-таблицы / правила в табличной форме. Если знание не табличное — оформи как пронумерованный список «если X → то Y». Большую таблицу (> 15 строк) выноси в references/<topic>-full.md и ссылайся отсюда. -->

| <Параметр / контекст> | <Значение по умолчанию> | <Когда менять / комментарий> |
| --------------------- | ----------------------- | ---------------------------- |
| <...>                 | <...>                   | <...>                        |
| <...>                 | <...>                   | <...>                        |

## Decision rules

<!-- TEMPLATE: алгоритмы выбора там, где таблица не помогает. Imperative form (см. rules/skills-architecture.md § 11): «Выбери X, если Y», а не «Можно выбрать X». Объясняй ПОЧЕМУ короткой связкой «— потому что Z». -->

1. **<Решение 1>** — если <условие>, выбери <значение> — потому что <причина>.
2. **<Решение 2>** — если <условие>, выбери <значение>.
3. **<Решение 3>** — анти-паттерн: не используй <X>, потому что <Y>.

## See also

<!-- TEMPLATE: ссылки на смежные skills и собственные references/*.md. ВАЖНО (D-08, rules/skills-architecture.md § 7): reference skill — лист графа. У него НЕТ секции `## @references` (это привилегия capability). Здесь — «See also» для информационной навигации, без формального графа зависимостей. -->

- `carnica-<related-skill>` — для <темы>, которая пересекается, но имеет своего owner-а
- `carnica-<related-skill>/references/<deep-dive>.md` — детальный разбор <topic> (если skill сам ссылается на свои deep dives)
- `<this-skill>/references/<topic>-full.md` — полная таблица / академическая теория / edge cases

---

*Source: rules/<original-file>.md* — если этот skill мигрирован из существующего rules/-файла. Удали строку, если skill — оригинальный.

*Single source for: <topic>* — если skill — оригинальный owner темы (нет миграции). Удали строку, если skill — мигрант.

---

## Acceptance checklist (copy-paste для PR review)

<!-- TEMPLATE: оставь эту секцию в финальном SKILL.md как self-check. Авторы будущих skills копируют её в PR description и проходятся пунктам. ARCH-02/03/04 enforce'ятся именно через этот checklist. -->

- [ ] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [ ] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [ ] `description` следует middle-pushy формату: явные триггеры в кавычках + связка с Carnica/Beeline (§ 5 architecture).
- [ ] `description` не дублируется H2-секцией «Когда применять» в body (§ 3 architecture).
- [ ] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [ ] Тяжёлый материал (полные таблицы > 15 строк, теория, WCAG, edge cases) вынесен в `references/*.md` (§ 9 architecture).
- [ ] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа).
- [ ] Если контент пересекается с другим ref skill — один owner, остальные ссылаются через `See also` (§ 7 architecture).
- [ ] Все `<...>` placeholders заполнены.
- [ ] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [ ] Footer указывает либо `Source: rules/X.md`, либо `Single source for: <topic>` — не оба.
- [ ] Imperative form в body: «Прочитай», «Выбери», «Не используй» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют.
