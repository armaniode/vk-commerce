---
name: carnica-critique
description: Промежуточная 6-мерная критика Carnica-дизайна во время работы (in-process). Используй между секциями при сборке экрана, после неудачной итерации, для качественной оценки текущего состояния (НЕ финальной QA-проверки перед сдачей — там carnica-final-qa). Триггеры: «оцени дизайн», «critique», «design review», «ревью», «насколько хорошо», «проверь качество», «6-мерная оценка», «evidence-критика», «balance-check», а также любое in-process качественное ревью в связке с Carnica/Beeline.
type: capability
---

# Carnica Critique

Качественное 6-мерное ревью Carnica-дизайна на стадии сборки. Производит markdown-таблицу 6 измерений с баллами 0-10, evidence-цитаты, списки Keep / Fix / Quick Wins и verdict (продолжать / repair iteration / переработать). Используется между секциями экрана как self-check и orchestrated из `carnica-figma-design` шага 5.

## Когда применять

- При сборке экрана между секциями: 2-3 секции собраны → запускай критику до того, как накопится 5+ ошибок (правило «не продолжай поверх сломанной секции»: если в секции N зафиксированы P0 — сначала repair, потом секция N+1).
- После неудачной итерации, когда «дизайн выглядит безопасно-серым» или «AI-median» — формальный 6-мерный pass поднимает Innovation/Brand Fidelity.
- При сомнении «достаточно ли хорошо до handoff в carnica-final-qa» — promotional critique перед финальным QA.
- Когда `carnica-anti-slop` P0/P1 список пройден, но visual вкус не оценён — критика отвечает на «вкус», а не на «compliance».
- При создании нового эталонного reference material — критика фиксируется вместе с дизайном.

## Когда НЕ применять

- **Финальная QA-проверка готового артефакта** перед сдачей / релизом / handoff дизайнеру — используй `carnica-final-qa` (CAP-06). Final-qa orchestrate critique как sub-step, но добавляет compliance scorecard, token usage check, ship-readiness verdict. Critique сам по себе НЕ выдаёт ship-readiness.
- **Точечная правка одного компонента** (поправить chevron цвет, поменять padding) — достаточно `carnica-anti-slop` checklist + один setProperties call. Полный 6-мерный pass избыточен.
- **Прототипы для внутренних обсуждений** до прикрутки реальных данных — критика на mock-данных даёт ложные сигналы по Brand Fidelity (lowercase test, casing, типографика).
- **Если P0-нарушение уже обнаружено** в anti-slop pass — сначала repair P0, потом critique. Критиковать сломанный дизайн = тратить токены на низкие баллы.

## @references

> Lazy auto-load (D-07, `.agents/README.md` § 6): этот capability перечисляет ДОСТУПНЫЕ reference skills, агент сам решает КОГДА читать каждый по контексту шага. На старте читается только этот SKILL.md.

- `carnica-anti-slop` — P0/P1/P2 запреты, источник для Brand Fidelity и Detail execution оценок. Подтягивается на шаге 2 (Philosophy/Brand checks).
- `carnica-typography` — иерархия ≤ 4 уровней, line-height, font-weight 400/500, squint test. Подтягивается на шаге 2 (Visual hierarchy измерение).
- `carnica-design-system` — **OWNER** color tokens (D-27), spacing scale. Подтягивается на шаге 2 (Detail execution + Brand Fidelity, token usage).
- `carnica-copy-tone` — lowercase UI, запрещённые фразы, units. Подтягивается на шаге 2 (Brand Fidelity — casing/copy check).
- `carnica-visual-patterns` — 20 паттернов экранов, для Innovation измерения («один осознанный приём из библиотеки»). Подтягивается на шаге 2 (Innovation измерение).

## Алгоритм

1. **Шаг 1: Подготовка входов** — получи screenshot или Figma node артефакта (компонент / секция / экран). Если есть reference — получи и его screenshot. Зафиксируй контекст: platform (APP/WEB), тип артефакта, требования из brief'а.

2. **Шаг 2: Пройди 6 измерений по очереди** — оцени каждое независимо от 0 до 10. НЕ компенсируй: низкий балл по одному измерению нельзя «уравновесить» высоким по другому.

   - **Philosophy consistency** — единое направление. Жёлтый только CTA, серый только фон, белый только карточки. Если на экране смесь стилей заголовков — band 0-4. Фокус-вопрос: «закрой половину экрана — вторая выглядит как тот же продукт?». Подтяни `carnica-anti-slop/SKILL.md` для P0 списка.
   - **Visual hierarchy** — squint test. Должны читаться 3-4 уровня. Фокус-вопрос: «куда движется глаз без подсказок?». Подтяни `carnica-typography/SKILL.md` § «Иерархия и стили» для squint test и правила «менять один параметр между уровнями».
   - **Detail execution** — alignment, leading, spacing-консистентность. Все cell в карточке имеют одинаковый itemSpacing. Все divider — paddingLeft=72. Chevron перекрашен в `content/secondary`. Фокус-вопрос: «положить рядом эталон билайн и этот экран — будет ли видна разница в полировке?». Подтяни `carnica-design-system/SKILL.md` для token compliance check.
   - **Functionality** — touch-targets ≥ 44×44, контраст WCAG AA, loading/empty/error предусмотрены. На длинном слове в hero нет обрезки. Фокус-вопрос: «можно ли этим пользоваться на реальном устройстве?».
   - **Innovation** — один осознанный Carnica-приём (wallet card-holder стопка, hero floating-corners, asymmetric grid, dot progress LTR, label-заголовок над feed). Подтяни `carnica-visual-patterns/SKILL.md` для каталога 20 приёмов. Технически правильный экран БЕЗ приёма = band 4-5. Фокус-вопрос: «что украл бы с этого экрана для другого проекта?».
   - **Brand Fidelity** — самое жёсткое измерение. Lowercase UI, два веса 400/500, `brand/primary` только CTA, BeelineSans, радиус 32 для main containers. Подтяни `carnica-copy-tone/SKILL.md` для voice/casing check. Любое нарушение → band 0-4 независимо от остального. Фокус-вопрос: «человек из бренд-команды узнает бренд за 1 секунду?».

3. **Шаг 3: Для каждой оценки — evidence** — без конкретного указания оценка не считается. Шаблон:
   ```
   N баллов: <что не так>; пример: <конкретный элемент / item id / координаты>; правило: <ссылка на canonical>.
   ```
   Если не получается сформулировать evidence — оценка не достоверна, ставь ниже.

4. **Шаг 4: Применяй anti-grade-inflation** — если все 6 оценок ≥ 8, перечитай с конкретными фокус-вопросами (см. шаг 2). Хороший ревью **обычно** даёт 6-8 по большинству измерений и одно-два ниже. Все 8+ — сигнал «недостаточно критики».

5. **Шаг 5: Сформулируй Keep / Fix / Quick Wins** — три actionable списка (см. `## Output format`). Не пересказ оценок, а конкретные действия. «Перекрасить chevron в первом cell в content/secondary» — да; «улучшить иерархию» — нет.

6. **Шаг 6: Verdict по сводным правилам** — рассчитай средний балл и применяй правила судьбы:
   - **Brand Fidelity < 7** → repair iteration независимо от среднего (Carnica-специфичное hard block).
   - **Любое измерение < 5** → repair iteration независимо от среднего.
   - **Среднее ≥ 8 + ни одного < 7** → strong pass.
   - **Среднее ≥ 7 + ни одного < 6** → pass.
   - **Иначе** → repair с приоритетами по самым низким измерениям.

   Зафиксируй verdict + 1-2 приоритетных action для следующей итерации.

## Output format

Skill производит следующий артефакт в чате:

````markdown
## Critique — <название экрана / артефакта>

| Измерение | Балл | Бэнд |
|---|---|---|
| Philosophy consistency | 7 | strong |
| Visual hierarchy | 6 | functional |
| Detail execution | 5 | functional |
| Functionality | 8 | strong |
| Innovation | 4 | broken |
| Brand Fidelity | 8 | strong |

**Среднее:** 6.3 — pass с оговорками. Repair recommended (Innovation < 5 — hard block).

### Evidence

- Philosophy 7: один стиль заголовков на экране, но `body/large 24` смешан с `headline/small 24` в hero без визуального различия; пример: блок «Илья Абрамов / +7 999 123 45 67», item id 217-39912; правило: typography-principles.md «менять один параметр между уровнями».
- Hierarchy 6: 4 уровня иерархии (display/small + body/medium + body/small + caption/medium), но между body/medium и body/small нет color-разрыва; правило: ux-principles.md §7.
- Detail 5: chevron в первом cell 3.1 НЕ перекрашен — остался `content/primary`; пример: cell «настройки», item id 220-15410; правило: `carnica-components/references/decision-rules-extended.md` anti-pattern «cell chevron recolor».
- Functionality 8: touch-targets ≥ 44, контраст AA. Loading/empty state НЕ предусмотрен (out-of-scope для прототипа).
- Innovation 4: технически правильный Carnica-экран, но НИ одного из 20 приёмов visual-patterns не применён; правило: critique §5 «один осознанный приём».
- Brand Fidelity 8: lowercase UI ✓, BeelineSans ✓, brand/primary только CTA ✓, радиус 32 ✓; один пропуск — точка в конце snackbar.

### Keep

- Glass-navbar с absolute-positioned stories — даёт правильную глубину, оставить.
- Editorial label «другие продукты билайна» (`body/accent/small` CENTER) над feed.
- Wallet card-holder стопка с правильным scale (367/330/297).

### Fix

- Перекрасить chevron в первом cell 3.1 secondary settings в `content/secondary`.
- Объединить hero typography в один стиль (`body/large 24 Regular`).
- Добавить один Carnica-приём из `carnica-visual-patterns` (dot progress LTR или asymmetric card grid) — Innovation поднимется до 6+.

### Quick Wins

- Применить `tabular-nums` к колонке цен в детализации (5 минут, +1 балл Detail).
- Убрать точку в конце «оплачен 23 апреля.» в snackbar (1 минута, +0.5 Brand Fidelity).
- `text-wrap: balance` на H1 hero (1 минута, +0.5 Detail).

### Verdict

Repair iteration с приоритетом Innovation (< 5 hard block) → Detail (chevron recolor) → Hierarchy (color-разрыв body/medium ↔ body/small). После repair — повторный critique. Brand Fidelity OK (≥ 7).

**Next step:** repair iteration. После repair (Innovation ≥ 6, Detail ≥ 7) — handoff в `carnica-final-qa` для финальной QA.
````

---

*Produces: markdown 6-мерный critique scorecard + Evidence + Keep/Fix/Quick Wins + Verdict.*

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: capability` — все три поля заполнены.
- [x] `name` соответствует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` соответствует middle-pushy формату с **verb-триггерами** («оцени», «critique», «ревью», «проверь») + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body (§ 3 architecture).
- [x] **Секция `## @references` присутствует и содержит ≥ 1 reference skill** (D-07, обязательно для capability).
- [x] В описании `@references` упомянут принцип lazy auto-load (агент подтягивает по контексту шага, не всё на старте).
- [x] Секция «Когда НЕ применять» содержит ≥ 2 пункта с указанием альтернативных skills (anti-overlap boundary).
- [x] Алгоритм имеет ≥ 3 шага в imperative form (§ 11 architecture).
- [x] Output format — конкретный шаблон с разметкой, не абстрактное описание.
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02).
- [x] Тяжёлая теория / полные справочники вынесены в `references/*.md` ИЛИ доступны через `## @references` lazy-load (§ 9 architecture).
- [x] Все `<...>` placeholders заполнены.
- [x] Все template-комментарии удалены.
- [x] Imperative form в body (§ 11 architecture). Запрещённые слова в имитации сомнения — отсутствуют (grep test: список в `.agents/README.md` § 11).
