# GEMINI.md

Gemini adapter for Carnica Rules Template.

## Общение и workflow

- Отвечай коротко, по делу и на русском языке.
- Для нетривиальных задач сначала веди план в `tasks/todo.md` (пример структуры — `.examples/tasks-todo-example.md`).
- Если пользователь исправил твою ошибку, добавь правило в `tasks/lessons.md`.
- Не объявляй задачу готовой без проверки и свежих команд/свидетельств.
- Если что-то пошло не по плану, остановись, обнови план и только потом продолжай.

## Canonical rules

Перед любой работой с Figma, Carnica-компонентами или golden samples прочитай.

**Compliance-слой (как собирать):**

1. `rules/README.md`
2. `rules/workflow.md`
3. `rules/design-system.md`
4. `rules/component-decision-rules.md`
5. `rules/component-catalog.md`
6. `rules/component-properties.md`
7. `rules/visual-patterns.md`
8. `rules/known-gotchas.md`
9. `rules/qa-scorecard.md`
10. `rules/prompt-templates.md`
11. `DESIGN.md`

**Качественный слой (как сделать хорошо) — читать перед финальной сдачей:**

12. `rules/anti-ai-slop.md` — P0/P1/P2 список запретов.
13. `rules/critique.md` — 6-мерное ревью результата.
14. `rules/motion.md` — длительности, easing, prefers-reduced-motion.
15. `rules/copy-tone.md` — voice, запрещённые фразы, микрокопия, числа и единицы.

`rules/*` — источник правды. Legacy paths не должны переопределять canonical rules.

## Skills

- APP-компоненты: skill `carnica-ui-kit-app`.
- WEB-компоненты: skill `carnica-ui-kit-web`.
- Цветовые токены: skill `carnica-color-token-selection`.
- Финальное ревью качества: skill `carnica-critique`.

Всегда сначала определить платформу: APP или WEB.

## Golden samples

Подробное задание: `golden-samples/brief.md`.

Workflow:

1. Прочитать brief и canonical rules.
2. Сделать screenshot эталона.
3. Сделать design context эталона.
4. Составить component shopping list.
5. Генерировать секциями с screenshot QA после каждой секции.
6. Оценить по `rules/qa-scorecard.md` (compliance) + `rules/anti-ai-slop.md` (запреты) + `rules/critique.md` (вкус, для GS-6..GS-10 обязательно).
7. Сохранить результат в файле формата `golden-samples/results/gs-N.md` (N = 1..10) по `golden-samples/results/_template.md`.
8. Новый инсайт обязательно перенести в `rules/*`.

После генерации напомнить дизайнеру: `Cmd+Shift+P` -> `Fix BeelineSans`.
