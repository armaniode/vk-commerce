# Golden samples — evidence, не ground truth

**Status:** evidence layer для исторической сверки. **НЕ референс для воспроизведения.**

Содержимое:
- `brief.md` — исторический бриф (5 mobile-экранов), сохранён как контекст ранних итераций.
- `results/` — артефакты предыдущих pre-skill попыток.

## Почему НЕ ground truth

Phase 0 проекта показал, что 5 mobile-эталонов слишком узки для покрытия реальных задач (mobile + web + многовариантность). Решение (PROJECT.md → Key Decisions, 2026-05-12):

> Skills генерируют **по принципам** (`rules/visual-patterns.md`, `rules/design-system.md`, `rules/anti-ai-slop.md`, ...), не по примерам.

Capability skill `carnica-figma-design` явно НЕ ссылается на golden-samples/ (Phase 3 Success Criteria #6 enforced; verified в SKILL.md frontmatter и body).

## Что использовать вместо

- Дизайн-задачи → `carnica-figma-design` (principle-driven, 11 @references entries).
- Ревью → `carnica-critique` (6-мерное in-process) или `carnica-final-qa` (ship-readiness).
- Конвенция skills → `rules/skills-architecture.md`.
