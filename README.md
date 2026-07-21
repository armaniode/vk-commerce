# Carnica Rules Template

> **Статус репозитория.** Репозиторий импортирован из Carnica Rules Template и сейчас адаптируется под VK Social Commerce / Соц-коммерцию. Существующая документация Carnica пока сохраняется без удаления и массового переименования.

Темплейт для проектов с дизайн-системой Carnica (билайн). 16 skills (10 reference + 6 capability) + 2 runtime-адаптера (Claude Code / Codex) + живой showcase-сайт (Vite + React + Tailwind).

## Что это

База знаний дизайн-системы Carnica, упакованная как progressive-disclosure skills, плюс работающий сайт-документация со всеми компонентами, foundations и редполитикой.

- **Skills** — для LLM-агента (Claude Code, Codex): подтягивают только нужное содержимое по trigger-фразам в `description`, idle-сессия ≤ 30k токенов
  - Reference skills (10) — KNOW: типографика, компоненты, цвет, паттерны, motion, copy-tone, gotchas, UX-принципы, design-references
  - Capability skills (6) — DO: генерация UI в Figma, ревью, выбор токена, финальный QA
- **Showcase-сайт** (`src/screens/showcase/`) — UI-документация, открывается в браузере. Список всех Carnica-компонентов, шкала типографики, палитра цветов, отступы, скругления, ~350 иконок, редполитика, каталог компонентов с историей изменений

Входы агента: `CLAUDE.md` (Claude Code), `AGENTS.md` (Codex). Конвенция skills — `.agents/README.md`.

## Запуск showcase локально

```bash
npm install
npm run dev
```

Откроется на http://localhost:5173. Production-build: `npm run build` → `dist/`.

### Структура

- `src/screens/showcase/` — главный shell + страницы (компоненты / основы / каталог / редполитика)
- `src/carnica/` — сам кит: components, icons (~350), tokens (colors, typography, spacing)
- `src/screens/balance/` — старый mobile-экран (доступен по `#balance`)
- `public/fonts/` — BeelineSans Regular/Medium
- `public/logo beeline.svg` — лого
- `middleware.ts` — Vercel Edge Basic Auth для защищённого деплоя
- `SUPABASE_SETUP.md` — инструкция по подключению Supabase для каталога компонентов

## Architecture

16 skills организованы в DAG (см. `.agents/README.md` § 17.3): корни — 6 capability, листья — 10 reference. Ребро capability → reference означает «капабилити может подтянуть этот ref в workflow» (lazy auto-load, не обязательность). Reference → reference запрещено: один OWNER на тему.

### Reference skills (10) — KNOW

| Skill | Хранит |
|---|---|
| `carnica-typography` | принципы текста + WCAG + единицы |
| `carnica-components` | decision trees + каталог + header |
| `carnica-visual-patterns` | 20 паттернов (самый тяжёлый) |
| `carnica-anti-slop` | P0/P1/P2 trigger-list |
| `carnica-motion` | длительности + easing + reduced-motion |
| `carnica-copy-tone` | voice + микрокопия |
| `carnica-ux-principles` | 16 принципов |
| `carnica-design-system` | OWNER color tokens + spacing |
| `carnica-gotchas` | reverse-lookup pitfalls |
| `carnica-design-references` | catalog 20 макетов |

### Capability skills (6) — DO

| Skill | Делает | @references |
|---|---|---|
| `carnica-figma-design` | генерация UI в Figma по принципам | 11 refs |
| `carnica-critique` | 6-мерное in-process ревью 0–10 | 5 refs |
| `carnica-ui-kit-app` | iOS / mobile компоненты | 2 refs + 9 topic-refs |
| `carnica-ui-kit-web` | beeline.ru / desktop компоненты | 2 refs + 9 topic-refs |
| `carnica-color-token-selection` | workflow выбора токена | 2 refs (OWNER → design-system) |
| `carnica-final-qa` | финальный ship-readiness QA | 3 refs |

Adapter routing — `CLAUDE.md` (Claude Code) / `AGENTS.md` (Codex). Skills auto-activate по trigger-фразам из YAML `description`.

## Quick start

1. `git clone <this-repo> my-new-project && cd my-new-project`
2. Открыть в Claude Code или Codex.
3. На non-design промпте (например, «создай ветку git lp-test») idle-токены ≤ 30k — adapter не подтягивает skills.
4. На design-промпте («собери экран wallet», «оцени дизайн») — соответствующий capability skill активируется автоматически.
5. Конвенция расширения skills — `.agents/README.md`.

## Token budget

Core Value (PROJECT.md): idle-сессия ≤ 30k токенов на non-design промпте.

| Stage | Carnica-only idle | Note |
|---|---|---|
| Pre-migration | ~42k structural proxy | `.claude/rules/*` auto-loaded |
| Post-Phase-4 | ~0.6k structural proxy | CLEANUP-01 (D-54) + ADAPTER |
| v1.0 shipped (real /context) | **~3.8k** | CLAUDE.md 0.8k + Skills metadata 3.0k. Margin -26.2k под target. |

Verify в свежей сессии: `/clear` → любой non-design промпт → `/context`. Полная v1.0 регрессия — `.planning/milestones/v1.0-phases/05-cleanup-verify/05-VERIFICATION.md`.

## Golden samples

`golden-samples/` — **evidence, не ground truth.** См. `golden-samples/README.md` для контекста. Capability skills (особенно `carnica-figma-design`) генерируют **по принципам**, не воспроизведением golden-экранов.

## Переносимость

Для нового проекта копировать:

1. `.agents/skills/` (canonical, 16 skills — 10 reference + 6 capability)
2. `.agents/README.md` (canonical convention для skills)
3. `.claude/skills/` (parent-symlink на `../.agents/skills/` — пересоздать командой из `.agents/README.md` § 12)
4. `src/carnica/` (runtime код: tokens, icons, stub-components)
5. `assets/` (BeelineSans fonts, hero images)
6. Нужный adapter в корне: `CLAUDE.md` для Claude Code или `AGENTS.md` для Codex

Команда пересоздания symlink в новом репозитории:

```bash
cd .claude && rm -rf skills && ln -s ../.agents/skills skills
```

Платформа: macOS / Linux. Windows — v2 scope (см. `.agents/README.md` § 13).

После клонирования сразу читай Architecture + Quick start выше — это и есть полный onboarding-путь.

## Документация

- Конвенция skills — `.agents/README.md`
- Legacy `rules/` cleanup history — `.agents/README.md` § 18
- Golden samples disclaimer — `golden-samples/README.md`
- Milestone history — `.planning/MILESTONES.md`
