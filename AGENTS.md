# AGENTS.md

Адаптер Codex для проекта VK Social Commerce / Соц-коммерция.

## Общение и workflow

- Отвечай коротко, по делу и на русском языке.
- Тексты для PR, changelog, release notes, task review и других описаний проделанной работы пиши на русском языке; технические идентификаторы, команды и пути оставляй как есть.
- Для нетривиальных задач сначала веди план в `tasks/todo.md` (пример — `.examples/tasks-todo-example.md`).
- Если пользователь исправил ошибку, добавь правило в `tasks/lessons.md`.
- Не объявляй работу готовой без проверки и свежих команд или свидетельств.
- Если что-то пошло не по плану, остановись, обнови план и продолжай.

## Контекст проекта

- Проект называется VK Social Commerce / Соц-коммерция.
- Цель продукта описана в `docs/product-scope.md`.
- Этапы развития описаны в `docs/implementation-roadmap.md`.
- Текущее состояние описано в `docs/project-status.md`.
- Технический префикс будущих skills: `vk-commerce-`.

## Подтверждённые источники

- Подтверждёнными источниками являются только материалы VK, явно добавленные и отмеченные в репозитории.
- При отсутствии VK-токенов, компонентов или паттернов сообщи, каких данных не хватает.
- Не придумывай официальные токены, компоненты, паттерны, Figma keys или брендовые правила.
- Существующие неподтверждённые материалы нельзя считать дизайн-системой VK.
- Не утверждай, что интерфейс соответствует дизайн-системе VK, без доступного source of truth.

## Целевой workflow

`brief → prototype → critique → final QA`

Это целевой workflow проекта. Соответствующие `vk-commerce-*` capability skills ещё не созданы и не должны восприниматься как доступные или работающие.

## Правила для дизайн-задач VK Social Commerce

1. Прочитать `docs/product-scope.md`, `docs/implementation-roadmap.md` и `docs/project-status.md`.
2. Определить, какие подтверждённые VK-источники доступны.
3. При нехватке токенов, компонентов или паттернов запросить данные либо явно обозначить допущения.
4. Использовать только подтверждённые источники и не выдавать неподтверждённые материалы за официальные.
5. Проверить результат и перечислить использованные источники и допущения.
6. Если точная пара Lego Icon `name + size` уже существует в `src/vk-commerce/icons`, переиспользовать production `<Icon />`; не создавать и не хранить локальный SVG-дубликат внутри компонента.

## Vibe-coded prototype viewport rules

Для всех prototype screens в `apps/showcase/**`, включая новые маршруты `#/vk-prototypes/*`, по умолчанию действуют следующие правила:

1. Рендерить только UI самого приложения.
2. Не воспроизводить из Figma:
   - iOS Status Bar;
   - time / cellular / Wi-Fi / battery indicators;
   - Home Indicator;
   - device bezel/frame;
   - outer iPhone rounded corners;
   - device shadow;
   - Safari/browser chrome.
3. Даже если эти элементы присутствуют внутри выбранного Figma frame, считать их reference-only system chrome и исключать из реализации, если пользователь явно не попросил показать device mockup.
4. Prototype root должен иметь:
   - no outer border-radius;
   - no fake device frame;
   - no outer device shadow;
   - content starts from the viewport edge.
5. Для корректного layout приложения на реальном устройстве разрешено использовать `env(safe-area-inset-top)` и `env(safe-area-inset-bottom)`, но нельзя рисовать системный Status Bar или Home Indicator вручную.
6. App-owned navigation bars и tab bars сохранять:
   - VK Top Bar / Navigation Bar — часть приложения, оставляем;
   - VK Tab Bar — часть приложения, оставляем;
   - iOS system Status Bar / Home Indicator — системный chrome, убираем.
7. Применять эти правила автоматически ко всем новым `#/vk-prototypes/*` без необходимости повторять их в каждом prompt.

## Skills

Конвенция описана в `.agents/README.md`. Канонический путь — `.agents/skills/`. Codex читает `.agents/skills/` напрямую.

Не маршрутизируй продуктовые задачи в skills, для которых нет подтверждённых VK-источников и явно зафиксированной области ответственности.
