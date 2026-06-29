# Contributing

Спасибо за интерес! Этот репозиторий — открытая база знаний дизайн-системы Carnica для LLM-агентов. Любые улучшения правил, новые golden samples, исправления неточностей в токенах и компонентах — приветствуются.

## Структура изменений

Все изменения сгруппированы по типам:

| Что | Где менять | Как |
|---|---|---|
| Новое правило / уточнение существующего | `rules/<категория>.md` | Добавь раздел или новый файл, обнови `rules/README.md` |
| Новый golden sample | `golden-samples/results/gs-N.md` | Скопируй `_template.md`, заполни; обнови `golden-samples/brief.md` если нужно |
| Новый компонент | `src/carnica/components/<Name>.tsx` + паспорт в `src/carnica/passports/` | Используй существующие компоненты как образец |
| Новая иконка | `src/carnica/icons/<категория>/Icon<Name>.tsx` | Соблюдай SVG-конвенции из `rules/code-conventions.md` (viewBox 24x24, `currentColor`) |
| Новый skill | `.claude/skills/<name>/SKILL.md` + `.agents/skills/<name>/SKILL.md` | Два файла идентичны — для cross-runtime |
| Исправление в существующем правиле | Прямая правка | Не забудь свериться с golden samples — изменение может ломать существующие примеры |

## Workflow

1. **Fork** репозитория или создай feature-ветку.
2. **Сделай изменения**. Если задача нетривиальная — заведи план в `tasks/todo.md` (см. пример в `.examples/`).
3. **Проверь по чек-листу** из `rules/qa-scorecard.md` (для UI-изменений) или `rules/anti-ai-slop.md` (для правил/копи).
4. **Коммит** в формате Conventional Commits:
   ```
   feat(rules): add motion guidelines for accordion animations
   fix(components): correct Button hover state to use scale(0.97)
   docs(readme): clarify quick-start for Codex CLI users
   chore(privacy): remove personal identifiers from examples
   ```
   Префиксы: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`.

5. **Pull Request** в `main` с описанием:
   - Что меняется и зачем
   - Какие правила / golden samples затронуты
   - Скриншоты (если визуальное изменение)

## Что НЕ менять без обсуждения

- **Цветовые токены** (`src/carnica/tokens/colors.ts`) — это копия дизайн-системы Carnica. Изменения только если поменялась исходная система.
- **Типографические токены** — то же.
- **Структура `rules/`** — добавлять новые файлы можно, переименовывать существующие — нет (ломает ссылки в CLAUDE.md, AGENTS.md, GEMINI.md).
- **`.claude/rules/typography-principles.md`** — справочник на 1300 строк. Если хочешь дополнить — заведи issue, обсудим разбиение на части (запланировано в v1.1).

## Стиль документации (rules/)

- **Русский язык**. Технические термины — латиницей в `code`.
- **Заголовки H2/H3** — без точки в конце.
- **Lowercase в примерах UI-текстов** (правило билайн, см. `rules/copy-tone.md`).
- **Примеры кода** — TypeScript + Tailwind, никаких CSS-in-JS.
- **Скриншоты** — только в `golden-samples/` (для базовых rules — не нужны, агенты их не читают).

## Безопасность

- **Не коммитьте `.env`**, локальные API-ключи, Figma токены.
- **Не используйте реальные email/телефоны** в примерах. Плейсхолдеры: `user@example.com`, `+7 999 123 45 67`.
- **Не публикуйте приватные Figma file keys**. Если нужно сослаться на конкретный файл — используй заглушку `<YOUR_FIGMA_FILE_KEY>` и опиши, как пользователю получить свой.

## Вопросы

Если что-то непонятно — открой issue с тегом `question`. Большие изменения сначала обсуди в issue, потом делай PR.
