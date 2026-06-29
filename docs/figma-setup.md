# Figma Setup

Этот документ нужен только если ты собираешься **генерировать макеты в Figma** через LLM-агента + Figma MCP. Для работы с кодом (HTML/React) Figma не обязательна — все токены, иконки и шрифты уже в репо.

---

## Что понадобится

1. **Figma account** — любой (free/pro).
2. **Figma desktop app** — для запуска плагина Fix BeelineSans (web-версия плагин не запускает).
3. **Figma MCP server** — официальный плагин от Anthropic / Figma. Установка:
   - Claude Code: настройка в `~/.claude/mcp.json` или в IDE-расширении.
   - Cursor: через настройки MCP integrations.
   - Codex/Gemini: см. доки своего runtime.
4. **Доступ к Carnica-библиотекам Figma** — для production использования. Без них генерация работает в режиме «по правилам, но без библиотеки» (генерируются ручные фреймы, не инстансы).

---

## Плагин Fix BeelineSans

В этом репозитории есть Figma-плагин в `figma-plugins/fix-beeline-sans/`. Он фиксит рендер шрифта BeelineSans после генерации макетов через MCP.

**Установка (Figma Desktop):**
1. Открой Figma Desktop.
2. Меню → **Plugins → Development → Import plugin from manifest…**
3. Выбери файл `figma-plugins/fix-beeline-sans/manifest.json` из своего клона репозитория.
4. Плагин появится в списке Development.

**Использование:**
- После каждой генерации макетов через LLM-агента: `Cmd+Shift+P` → `Fix BeelineSans` → плагин пройдётся по всем текстам и выставит правильный шрифт + вес.
- Это автоматизация одной строки правила из `rules/known-gotchas.md`.

---

## Figma file keys для тестов

В `golden-samples/brief.md` и `.claude/rules/design-references.md` встречается `GJXKeWvj14GIQ8EOw9Arac` — это **тестовый Figma-файл** автора, использовавшийся при создании golden samples.

Если у тебя есть доступ — можешь использовать его как референс. Если нет:
- Создай свой Figma-файл с подключёнными библиотеками Carnica.
- Замени file key в локальной копии brief.md.
- Адаптируй под свой workflow.

---

## MCP-доступ к библиотекам Carnica

Если у тебя есть team access к Carnica-библиотекам в Figma:

1. Открой `.claude/skills/carnica-ui-kit-app/SKILL.md` или `carnica-ui-kit-web/SKILL.md`.
2. Там указаны canonical **library keys** для импорта компонент-сетов через `importComponentSetByKeyAsync()`.
3. Эти ключи — публичные идентификаторы Carnica-библиотек. Без team access они вернут ошибку — это нормально.

Если team access нет — агент сгенерирует ручные фреймы по правилам (`rules/component-decision-rules.md`), что даёт визуально похожий результат, но не настоящие инстансы.

---

## Минимальный сценарий без Figma

Если Figma вообще не нужна:

```bash
# 1. Склонируй
git clone <url> && cd carnica-rules-template

# 2. Открой в Claude Code / Cursor / Codex
# 3. Промпт:
#    «Сделай React + Tailwind кнопку primary по правилам Carnica»
# 4. Получишь работающий код, использующий правильные токены.
```

Этот сценарий — основной для разработчиков лендингов. См. `landings/` для примеров готовых работ.

---

## Troubleshooting

| Симптом | Причина | Решение |
|---|---|---|
| Агент игнорирует rules при работе с Figma | MCP не подключен / не видит `rules/` | Перезапусти агента в корне репо; проверь, что `CLAUDE.md`/`AGENTS.md` действительно загружается |
| `importComponentSetByKeyAsync` → "Not found" | Нет team access к Carnica-библиотеке | Используй ручные фреймы по `rules/component-decision-rules.md` |
| Шрифт после генерации выглядит «не так» | BeelineSans требует Fix-плагина | `Cmd+Shift+P` → `Fix BeelineSans` |
| Текст в `display/medium` обрезается на mobile | Слишком длинный заголовок | См. `.claude/rules/typography-principles.md` §3 — display-длины |
