# Changelog

Все заметные изменения проекта документируются здесь. Формат — [Keep a Changelog](https://keepachangelog.com/), версионирование — [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-05-13

**Первый публичный релиз.** Дизайн-система Carnica оформлена как 16 AI-исполняемых skills с архитектурой progressive disclosure.

### Что внутри

- **10 reference skills** (KNOW — знание): `carnica-typography`, `carnica-components`, `carnica-visual-patterns`, `carnica-anti-slop`, `carnica-motion`, `carnica-copy-tone`, `carnica-ux-principles`, `carnica-design-system`, `carnica-gotchas`, `carnica-design-references`.
- **6 capability skills** (DO — действие): `carnica-figma-design`, `carnica-critique`, `carnica-ui-kit-app`, `carnica-ui-kit-web`, `carnica-design-tokens`, `carnica-final-qa`.
- **Runtime-код** в `src/carnica/`: design tokens (цвета, типографика, spacing) + 204 React-иконки (категории: actions, alert и др., конвенция `currentColor` + viewBox 24×24).
- **Assets**: BeelineSans Regular + Medium (ttf), 5 canonical-иллюстраций (connect-to-beeline, hero-template, gold/silver-coins, packages-no-deadline).
- **Golden samples** 1-5 — эталонные APP-экраны для evidence-based ревью.
- **Пример GSD-workflow** в `.examples/` — реальная задача с планом.

### Архитектура

- **Progressive disclosure**: idle Carnica-overhead ~3.8k токенов (margin -26.2k под целью 30k). Skills подгружаются лениво по trigger-фразам в их `description:`.
- **Canonical path**: `.agents/skills/` — единственное место хранения skills. `.claude/skills/` — symlink на родительскую директорию (`.claude/skills` → `../.agents/skills`).
- **Adapter layer**: `CLAUDE.md` (Claude Code) и `AGENTS.md` (Codex CLI) — компактные router-файлы (≤80 строк), указывающие на skills и общий workflow.
- **Cross-runtime**: одинаковая работа в Claude Code и Codex CLI. Diff между адаптерами ≤6 строк.

### Метрики

- **37/37 v1 requirements PASS** (ARCH + REF + CAP + ADAPTER + PARITY + DISCOVERY + CLEANUP + VERIFY).
- **Skill auto-discovery**: 11/12 запросов на golden test set корректно роутятся в нужную capability (91.7% structural PASS).
- **Principle-driven generation**: mobile wallet и web compose сценарии набрали 8.0 и 7.6/10 на 6-мерной критике без golden samples.

### Подготовка к публикации

- `LICENSE` (MIT), `CONTRIBUTING.md`, `PROMPTS.md` (готовые промпты для типичных задач).
- `docs/figma-setup.md` — подключение Figma MCP и плагина Fix BeelineSans.
- `.gitignore` дополнен runtime-артефактами Claude Code и Codex.
- Личные email/телефон в правилах заменены на плейсхолдеры (`user@example.com`, `+7 999 123 45 67`).

### Известные ограничения

- `.agents/skills/carnica-typography/references/typography-principles.md` — монолит 1295 строк. Splitting запланирован в v1.1.
- Golden samples 6-10 (mood-эталоны) не сделаны — v1.3.
- `src/carnica/components/` пока содержит ограниченный набор stub-компонентов — расширение в v1.5+.
- Дополнительные runtimes (Gemini, OpenCode, Cursor), build automation, CI token-budget regression tests, SKILL validator — v2 scope.

---

## [Unreleased]

Дальнейшие изменения — в [GitHub Releases](https://github.com/dmitrynishchev/carnica-rules-template/releases) по мере выхода версий.

---

## Pre-release iterations

Записи ниже описывают внутренние итерации до миграции на progressive-disclosure архитектуру. Публично не релизились — оставлены для исторической прозрачности.

### [0.9.1] — 2026-05-12 (internal)

**Fix:** README и правила обещали `assets/` и `landings/`, но их не было в release tree (Codex review PR #4).

- **`assets/` добавлены в main**: 2 шрифта BeelineSans (Regular + Medium, ttf) + 5 canonical-иллюстраций.
- **`landings/` остаются в landing-ветках** (`growhack-landing-1/2/3`) как portfolio-репозиторий. By design.
- Ссылки в правилах на `landings/*.html` заменены на полные GitHub-URL вида `github.com/.../blob/growhack-landing-N/landings/...`.

### [0.9.0] — 2026-05-12 (internal)

Структура до migration:

- **14 canonical rules** в `rules/` (позже свёрнуты в `.agents/README.md` post-v1.0 cleanup).
- **6 deep-dive справочников** в `.claude/rules/` (typography-principles, design-references, ux-principles, header-component, code-conventions, component-decision-rules).
- **4 skills** для cross-runtime (carnica-ui-kit-app, carnica-ui-kit-web, carnica-design-tokens, carnica-critique) — позже выросли до 16 skills в v1.0.0.
- 5 golden samples, 204 React-иконки, design tokens, BeelineSans ttf.

Эта итерация показала, что монолитные `rules/` дают высокий idle-token cost. Решение: переезд на progressive disclosure через skills — реализовано в v1.0.0.
