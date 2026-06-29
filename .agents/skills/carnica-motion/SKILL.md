---
name: carnica-motion
description: Правила анимации Carnica/Beeline — длительности, easing, hover/press feedback, state-morph, stagger, prefers-reduced-motion, loading-индикаторы. Используй когда добавляешь анимации к UI Beeline, выбираешь duration или easing для transition, делаешь hover-эффект на кнопке, реализуешь in-place feedback (copy/save/like/follow), настраиваешь появление feed-элементов, аудитишь motion перед сдачей или поддерживаешь accessibility motion. Триггеры: «анимация», «motion», «animation», «easing», «cubic-bezier», «duration», «длительность», «hover», «press», «state-morph», «stagger», «prefers-reduced-motion», «transition», «keyframes», «crossfade», «hover scale», «button feedback», «motion sickness», «reduced motion», «вход», «выход», «скелетон», «shimmer», «spinner», «прыжок», а также любое обсуждение движения, анимации или переходов в связке с Carnica/Beeline.
type: reference
---

# Carnica Motion

Этот skill хранит правила движения для Beeline UI: lookup-таблица длительностей и easing, decision rules для hover/press/state-morph/stagger, anti-patterns (bouncy CTA, lift-hover, parallax на mobile), prefers-reduced-motion fallback и чеклист motion перед финальным QA. Carnica-минимализм распространяется на motion: меньше движения, чем кажется нужным; ничего бесцельного; spacing и контраст удерживают внимание лучше анимации.

## Когда обращаться

- Добавляешь hover- или press-эффект к кнопке, pill или другому интерактивному элементу
- Выбираешь duration / easing для transition между состояниями (bottom sheet, dialog, snackbar, tabs)
- Реализуешь in-place feedback на кнопке (copy / save / like / follow / subscribe) — нужен state-morph
- Делаешь stagger-появление feed-элементов / list / карточек главного экрана
- Подключаешь loading-индикатор (skeleton shimmer, spinner, loading page, fullscreen spinner)
- Поддерживаешь prefers-reduced-motion для accessibility (vestibular disorders, motion sickness)
- Проверяешь motion перед финальной сдачей экрана / golden sample

## Quick reference

### Длительности и easing — Carnica-набор

| Тип перехода | Duration | Easing | Свойство |
|---|---|---|---|
| Bottom sheet up / dialog appear | **320ms** | `cubic-bezier(0.32, 0.72, 0, 1)` | translateY + opacity |
| Bottom sheet dismiss | **240ms** | `cubic-bezier(0.4, 0, 1, 1)` | translateY + opacity |
| Snackbar slide+fade in | **240ms** | `cubic-bezier(0.0, 0, 0.2, 1)` | translateY + opacity |
| Snackbar dismiss | **200ms** | `cubic-bezier(0.4, 0, 1, 1)` | translateY + opacity |
| Tab / segment switch | **180ms** | `ease-out` | opacity (cross-fade) |
| Hover (web, кнопки и pill) | **200ms** | `ease-out` | `transform: scale(0.97)` |
| Press state | **100ms** | `ease-out` | `transform: scale(0.95)` |
| State-morph внутри кнопки | **180ms** | `ease-out` (оба направления) | `opacity` + `transform: scale` + `filter: blur(≤4px)` |
| Skeleton shimmer | **1500ms loop** | `linear` | gradient position |
| Page transition (web) | **240ms** | `ease-in-out` | opacity |
| Loading spinner rotate | **1000ms loop** | `linear` | rotate |
| Feed stagger между child | **60-80ms delay** на элемент, max 6 шагов | — | opacity + translateY |

Easing-словарь:

- `cubic-bezier(0.32, 0.72, 0, 1)` — iOS-style spring без bounce. Главный для модалок и листов.
- `cubic-bezier(0.0, 0, 0.2, 1)` — стандартный enter (Material decelerate).
- `cubic-bezier(0.4, 0, 1, 1)` — стандартный exit (Material accelerate).
- `ease-out` — для коротких UI-переходов.

UI-длительности живут в коридоре 200-320ms; >400ms допустимы только для декоративных hero-анимаций. Spinning loaders <800ms выглядят как баг.

### prefers-reduced-motion — обязательный fallback

У 30%+ пользователей включена настройка (vestibular disorders, motion sickness, фокус-проблемы). Если включено — отключи translate/scale/rotate, оставь только opacity. Длительности можно оставить, переходы становятся fade-only.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* opacity-переходы можно оставить вручную там, где нужны */
}
```

P0 для production-кода. На прототипах в Figma не проверяется, но в реальной реализации — обязательно.

### Hover / press / state-morph — разрешено vs запрещено

| Эффект | Допустимо | Запрещено |
|---|---|---|
| Hover на кнопке / pill — `transform: scale(0.97)` 200ms ease-out | ДА | — |
| Press / active — `transform: scale(0.95)` 100ms ease-out | ДА | — |
| State-morph crossfade двух слоёв (180ms, opacity + scale + blur ≤4px) | ДА | — |
| Opacity-fade entrance / exit | ДА | — |
| Simple translate ≤ 8px (snackbar slide, stagger) | ДА | — |
| Hover lift — `translateY(-Npx)` | — | **ЗАПРЕЩЕНО** на кнопках/pill (см. Decision rule #4) |
| Pulse / glow на CTA | — | **ЗАПРЕЩЕНО** (Carnica-бренд) |
| Bouncy spring-out — `cubic-bezier(0.68, -0.55, 0.265, 1.55)` на CTA | — | **ЗАПРЕЩЕНО** на главных кнопках |
| Parallax на mobile 375px | — | **ЗАПРЕЩЕНО** (jank) |
| Animated emoji / lottie в snackbar success | — | **ЗАПРЕЩЕНО** |
| Auto-playing carousel без pause-control | — | **ЗАПРЕЩЕНО** (искл.: hero-промо ≥5s + pause) |
| Подмена `textContent` без crossfade | — | **ЗАПРЕЩЕНО** для in-place feedback |
| Page-load splash >1s для warm start | — | **ЗАПРЕЩЕНО** |

## Decision rules

1. **prefers-reduced-motion — всегда** — добавь `@media (prefers-reduced-motion: reduce)` блок или JS-проверку. Без него финальное QA fail (P1) и motion недоступен для пользователей с vestibular disorders. При `reduce` оставь opacity-переходы, убери translate/scale/rotate. → таблица §Quick reference, P0-правило.

2. **Entrance vs Exit — разная пара easing** — entrance = `cubic-bezier(0.0, 0, 0.2, 1)` или `ease-out` (decelerate, естественное «приземление»); exit = `cubic-bezier(0.4, 0, 1, 1)` (accelerate, «улетает» быстро). Bottom sheet up — 320ms, dismiss — 240ms (exit короче). Snackbar in — 240ms, out — 200ms. Никогда не используй один easing для обоих направлений на крупных элементах.

3. **State-morph button — crossfade двух слоёв, не подмена textContent** — для in-place feedback (copy / save / like / follow / subscribe / mark-as-read) реализуй через два state-слоя в `display: inline-grid` со `grid-area: 1 / 1` на обоих, кнопка фиксируется по `max(width A, width B)`. Анимация: A исходит — `opacity 1→0` + `scale 1→1.06` + `filter: blur 0→4px`; B приходит — `opacity 0→1` + `scale 0.94→1` + `filter: blur 4px→0`. Оба направления — 180ms ease-out. **НЕ меняй textContent одного элемента** — content «дёрнется», focus теряется, screen reader повторяет старое. Возврат A через 1500ms после действия. Визуальный pattern (markup + CSS + JS) — `carnica-visual-patterns` §«State-morph button». A11y: `aria-live="polite"` на кнопке, `aria-hidden="true"` на скрытом слое.

4. **Hover на кнопке = scale(0.97), translateY-lift запрещён** — Carnica hover на `.btn` / `.pill` / любом системном контроле — только `transform: scale(0.97)` 200ms ease-out. Press / active — `scale(0.95)` (меньше hover, движение «hover → press» = непрерывное сжатие). Никаких `translateY(-Npx)`, `box-shadow`-pop'ов, `margin-top: -Npx`-сдвигов. Логика: hover = «я готов к нажатию» → элемент чуть-чуть «приседает», предсказывая press-state. Lift — маркетинговый приём для card-элементов с тенью, не для контролов. См. anti-pattern в memory `feedback_button_hover_scale`; визуальный pattern — `carnica-visual-patterns` §«Hover button».

5. **Stagger для feed — не больше 6 шагов, 60-80ms delay** — для последовательного появления элементов (главный экран при первой загрузке, лента продуктов, список карточек) задержка между элементами 60-80ms; после 6-го все остальные появляются одновременно (anim-delay capped на 300-360ms). Свойства: `opacity 0 → 1` + `translateY(8px) → 0`. Длительность каждого элемента — 240ms `cubic-bezier(0, 0, 0.2, 1)`. При `prefers-reduced-motion: reduce` все `animation-delay: 0`, оставить только opacity.

6. **Loading — Carnica-компоненты, не самописный motion** — используй готовые: `loading page 2.1` (полноэкранная при первом рендере), `spinner 2.1` (внутри контента, rotate 1000ms linear), `fullscreen spinner 2.1` (overlay поверх контента), `skeleton 2.1` (повторяет layout, shimmer = `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`, 1500ms loop). Spinner короче 800ms = баг; shimmer быстрее 1500ms = «нервный». Компоненты Carnica — см. `carnica-components` §6.

7. **Анимируй transform / opacity / filter — не layout-свойства** — height / width / padding / margin изменения дороги для GPU и вызывают reflow. Анимируй `transform` (translate/scale/rotate), `opacity`, `filter` (blur ≤4px). Для размера используй `transform: scale`, не `width`. Для появления используй `opacity` + `translateY`, не `display`/`height: 0`. `will-change` ставь только на короткий момент анимации, снимай после.

8. **Жёлтый CTA не пульсирует, не дрожит** — pulse, glow, breathing-эффекты для привлечения внимания на главных CTA запрещены (Carnica-бренд). Внимание удерживает контраст и spacing. Bouncy easing (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) — только на декоративных лайках/бэйджах, никогда на жёлтой кнопке. См. anti-pattern список §Quick reference.

9. **Один «осознанный» motion-приём на экран** — допустим **не больше одного** не-стандартного motion-эффекта: stagger feed на главном, card-holder collapse/expand на wallet, sticky header glass-fade при scroll>24px, hero parallax (только web desktop, capped 80px), snackbar stack. Если на экране два таких — выбери один. Простой fade-in на всё подряд (dashboard, главный) выглядит «всё одинаковое» — stagger предпочтительнее общего fade.

10. **State-morph frequency tuning** — изредка (раз в сессию: copy промокода, save в избранное, mark-read) — полный state-morph по §3. Частые действия в ленте (лайки, scroll-save) — короче: `scale(0.94→1)` без blur, 120ms. Очень частые (десятки раз в минуту, keyboard shortcuts на dashboard) — отказ от анимации, мгновенная смена content. См. anti-pattern «100+ times/day → don't animate» (skill `web-animation-design`).

11. **Page transition — 240ms ease-in-out максимум** — длиннее воспринимается как лаг. Свойство — `opacity` (cross-fade). Для тяжёлых экранов с медленной загрузкой — `loading page 2.1` после transition, не растягивай саму transition.

12. **Done-state с автоматическим возвратом** — state-morph кнопка не остаётся в подтверждённом виде навсегда. Через 1500ms после действия (или явный reset) возвращай A. Иначе при повторном нажатии нет нового feedback. Snackbar и state-morph одновременно — двойная обратная связь, перебор; выбери одно.

## Чеклист motion перед сдачей

- [ ] `prefers-reduced-motion: reduce` media query добавлен в код (или TODO для прототипа)
- [ ] Все длительности из таблицы §Quick reference (100/180/200/240/320/1000/1500ms) — не произвольные
- [ ] Easing из {ease-out, ease-in, ease-in-out, linear} или Carnica cubic-bezier-словаря — не bouncy / spring на CTA
- [ ] Анимируются `transform` / `opacity` / `filter` (не `height` / `width` / `padding`)
- [ ] Hover на кнопке = `scale(0.97)`, press = `scale(0.95)` — без `translateY`-lift и `box-shadow`-pop
- [ ] CTA-кнопки не имеют bouncy / pulse / glow эффектов
- [ ] State-morph = crossfade двух слоёв в `inline-grid`, не подмена `textContent`
- [ ] Stagger ≤ 6 шагов с 60-80ms задержкой, anim-delay capped на 300-360ms
- [ ] Skeleton shimmer = `linear-gradient` slide 1500ms loop, не быстрее
- [ ] Не больше одного «осознанного» motion-приёма на экран
- [ ] Loading-индикаторы — Carnica-компоненты (`loading page 2.1` / `spinner 2.1` / `skeleton 2.1`), не самописный motion
- [ ] State-morph кнопка возвращается в A через 1500ms — не остаётся в done навсегда
- [ ] Auto-playing carousel имеет pause-control и длительность смены ≥ 5s
- [ ] A11y: `aria-live="polite"` на state-morph кнопке, `aria-hidden="true"` на скрытом слое

## See also

- `carnica-visual-patterns` — визуальные реализации (markup + CSS + JS): state-morph button §«State-morph button», hover button §«Hover button (#18)», final CTA appear §«Hero/Final CTA», stagger feed §«Feed sections». **Cross-owner**: motion timing (durations/easing) — этот skill REF-05; визуальный pattern — `carnica-visual-patterns` REF-03.
- `carnica-anti-slop` — P0/P1/P2 запреты на финальном QA: translateY-lift на hover (P1), bouncy на CTA (P1), pulse/glow (P1), auto-playing carousel без pause (P2)
- `carnica-typography` references/wcag.md — accessibility / motion sickness обоснование (vestibular disorders, prefers-reduced-motion)
- `carnica-components` §6 «Обратная связь: загрузка, ошибки, статусы» — Carnica компоненты loading/skeleton/spinner с правильным motion из коробки
- `carnica-ux-principles` §6 «Feedback на каждое действие» — UX-обоснование, когда требуется visual feedback (press state, snackbar, state-morph)
- Встроенный skill `web-animation-design` — глубокая mechanics анимаций (cubic-bezier, spring physics, GPU performance, will-change). Этот файл — Carnica-overlay поверх него.

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (≥5 RU + ≥3 EN) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться` (D-09).
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02 пройден с запасом).
- [x] **LIGHT skill (D-24)**: source 208 строк < 250 → `references/` не создаётся; весь контент в SKILL.md.
- [x] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа). Использован `## See also`.
- [x] Cross-link на `carnica-visual-patterns` (D-27 cross-owner: motion timing = REF-05, визуальный pattern = REF-03).
- [x] Cross-link на `carnica-anti-slop` (translateY-lift = P1 нарушение).
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Imperative form в body: «Добавь», «Используй», «Не меняй» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют.
