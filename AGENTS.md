# AGENTS.md

Codex adapter for Carnica Rules Template.

## Общение и workflow

- Отвечай коротко, по делу и на русском языке.
- Тексты для PR, changelog, release notes, task review и других описаний проделанной работы пиши на русском языке; технические идентификаторы, команды и пути оставляй как есть.
- Для нетривиальных задач сначала веди план в `tasks/todo.md` (пример — `.examples/tasks-todo-example.md`).
- Если пользователь исправил ошибку, добавь правило в `tasks/lessons.md`.
- Не объявляй задачу готовой без проверки и свежих команд/свидетельств.
- Если что-то пошло не по плану, остановись, обнови план и продолжай.

**High-level workflow Carnica-задач:** brief → `carnica-figma-design` (генерация по принципам) → `carnica-critique` (in-process ревью между секциями) → `carnica-final-qa` (финальный QA перед сдачей). Детали — в SKILL.md bodies каждого capability.

## Skills

> Конвенция: см. `.agents/README.md`. Канонический путь — `.agents/skills/`. Codex читает его напрямую — symlink не нужен.

- `carnica-figma-design` — «собери экран», «создай Carnica», «нарисуй компонент» — генерация UI в Figma по принципам. НЕ для финального QA → `carnica-final-qa`.
- `carnica-ui-kit-app` — «APP-компонент», «mobile Carnica», «cell 3.1» — сборка iOS-компонентов через Figma Plugin API. НЕ для WEB → `carnica-ui-kit-web`.
- `carnica-ui-kit-web` — «WEB-компонент», «beeline.ru», «header main», «hover state» — сборка WEB-компонентов. НЕ для APP/mobile → `carnica-ui-kit-app`.
- `carnica-color-token-selection` — «какой токен», «какой фон», «fake-invert» — workflow выбора цветового токена. НЕ для полного справочника → `carnica-design-system`.
- `carnica-critique` — «оцени дизайн», «design review», «насколько хорошо» — in-process качественное ревью. НЕ для финального QA → `carnica-final-qa`.
- `carnica-final-qa` — «можно ли сдавать», «final review», «оценить готовый» — ship-readiness QA. НЕ для in-process → `carnica-critique`.
