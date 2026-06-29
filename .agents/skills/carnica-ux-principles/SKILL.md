---
name: carnica-ux-principles
description: UX-принципы Carnica — 16 правил проектирования экрана Beeline: состояния (loading / empty / error), цвет не единственный индикатор, proximity, progressive disclosure, feedback, иерархия, воздух, vertical split, edge alignment, cell grid для действий, кастомные dots progress LTR, product feed, asymmetric grid, lowercase UI, фоны тэгов. Используй когда проектируешь новый экран, решаешь layout-вопросы, реализуешь loading / empty / error состояния, выбираешь количество уровней иерархии, проверяешь UX на финальном QA, принимаешь решение о feedback или proximity. Триггеры: «UX», «UX-принципы», «принципы дизайна», «layout», «feedback», «empty state», «loading state», «error state», «proximity», «иерархия», «воздух», «proximity», «UX check», «UX review», «design principles», «screen state», «hierarchy», «whitespace», а также любое UX-решение или проектирование экрана в связке с Carnica/Beeline.
type: reference
---

# Carnica UX Principles

Платформо-независимые UX-правила Beeline 2026 — 16 принципов проектирования экрана. Skill хранит index принципов, decision rules для каждого и cross-links на owner skills (компоненты, токены, копирайтинг, визуальные паттерны). Конкретные до/после для top-5 принципов — `references/examples.md`.

## Когда обращаться

- Проектируешь новый экран — нужны базовые UX-правила (proximity, иерархия, воздух, vertical split)
- Реализуешь экран с данными — обязаны быть все три состояния (loading / empty / error)
- Решаешь layout decisions (asymmetric grid, edge alignment 4px vs 20px, cell grid для действий)
- Принимаешь решение о feedback на действие пользователя (snackbar / pressed state / status screen)
- Аудитишь существующий экран на UX-нарушения перед финальной сдачей
- Выбираешь количество уровней иерархии и инструменты контраста (size / color / spacing)
- Решаешь: писать ли текст строчными (§15) и какой tone для тэга (§16)

## Quick reference

Index 16 принципов с одной строкой summary:

| # | Принцип | Summary |
|---|---|---|
| 1 | Loading / empty / error | Каждый экран с данными обязан иметь все три состояния |
| 2 | Цвет не единственный индикатор | Дополняй цвет иконкой / текстом / pattern (~8% мужчин дальтонизм) |
| 3 | Proximity (Gestalt) | spacing между группами ≥ 2× spacing внутри группы |
| 4 | Консистентный spacing | Все строки cell — один itemSpacing; gap карточек одинаковый |
| 5 | Progressive disclosure | Не показывать всё сразу: детали по тапу, accordion, «показать ещё» |
| 6 | Feedback на каждое действие | snackbar / status / dialog / visual state change на каждое нажатие |
| 7 | Иерархия = размер + вес + цвет | Макс 3-4 уровня; контраст через один параметр, не через все сразу |
| 8 | Воздух (white space) | Между крупными секциями 40-80px; премиум-ощущение через пустоту |
| 9 | Vertical split | Верх = инфа/данные; низ = действия (искл.: длинные scroll-экраны) |
| 10 | Edge alignment | 4px от края для card-holder стопок; 20px стандарт |
| 11 | Cell grid для 3-6 действий | Сетка плиток с иконкой; >6 → обычный cell-список |
| 12 | Dots progress LTR | Жёлтые слева (remaining), серые справа (consumed); фирменный приём |
| 13 | Product feed на главном | Единый белый блок с секциями; centered headings; CTA по центру |
| 14 | Asymmetric card grid | 2 ряда → 43/57% + 57/43%; 1 ряд → 50/50 |
| 15 | Lowercase UI | Все строчные кроме исключений (имена, бренды, аббревиатуры, собств. названия в кавычках) |
| 16 | Фоны тэгов | Только default / brand / invert / success / error; `surface-*` запрещены |

## Decision rules

1. **Loading / empty / error — обязательны все три состояния** — реализуй skeleton/spinner на загрузке, иллюстрацию + CTA «добавить первый» на пустом списке, текст ошибки + кнопку «повторить» на ошибке. Skeleton повторяет layout контента, не голый spinner. Без этих трёх — экран не считается готовым. Компоненты Carnica: `skeleton 2.1`, `loading page 2.1`, `error_empty state 3.0`, `status screen 2.1` (детали — `carnica-components`). Детальный пример экрана истории транзакций — `references/examples.md §1`.

2. **Цвет не единственный индикатор** — статус «доставлено» = зелёный **+ иконка чекмарка**. «Ошибка» = красный **+ иконка warning**. Toggle on/off = тёмный/серый **+ форма ползунка**. Тест: применить grayscale-фильтр на макет — статусы должны остаться различимыми. Причина: ~8% мужчин (deuteranopia/protanopia) имеют нарушения цветовосприятия.

3. **Proximity (Gestalt grouping)** — внутри одной группы gap 2-8px, между группами 12-32px. Заголовок секции **ближе** к своему контенту, чем к предыдущей секции. Правило: spacing между группами ≥ 2× spacing внутри группы. Spacing-шкала Carnica — `carnica-design-system` (`spacing/50` ... `spacing/2000`, включая negative tokens).

4. **Консистентный spacing в секции** — внутри одной секции/списка одинаковые отступы между элементами. Все строки cell — один `itemSpacing`. Все карточки в grid — одинаковый gap. Padding карточки — одинаковый со всех сторон (или симметричный horizontal/vertical). Исключение: первый и последний элемент могут иметь другой отступ от края контейнера.

5. **Progressive disclosure — не показывать всё сразу** — основное действие на первом экране, детали по тапу/клику. Длинные формы разбивай на шаги (`progress step bar 2.1`). Расширенные настройки скрывай в `accordion group 2.2`. «Показать ещё» вместо бесконечного списка на первом экране. Уменьшает cognitive load, держит фокус на главном.

6. **Feedback на каждое действие** — нажал кнопку → pressed state (визуальное изменение). Отправил форму → loading → success/error через `status screen 2.1`. Переключил toggle → мгновенное изменение состояния. Добавил в избранное → `snackbar 2.1` «добавлено». Без feedback пользователь не знает, сработало ли действие.

7. **Иерархия = размер + вес + цвет, максимум 3-4 уровня** — контраст между соседними уровнями строится через **один** параметр (размер ИЛИ цвет), не через все сразу. В Carnica вес фиксирован Regular 400 (Medium 500 — только внутри компонентов), поэтому работают size и color. Больше 4 уровней → когнитивная перегрузка, размытая иерархия. Полные правила выбора стиля и контраста — `carnica-typography` Decision rules 1, 2.

8. **Воздух (white space)** — между крупными секциями (верхний блок данных и нижний блок действий) — 40-80px. Контент разносится по экрану, не лепится друг к другу. Пустое пространство создаёт ощущение лёгкости и premium-качества. НЕ заполнять пустоту декоративом. Правило: если на экране <5 элементов — распредели их по вертикали с максимальным spacing.

9. **Vertical split экрана** — верх экрана = информация / статусы / данные (то, что пользователь читает). Низ = действия / кнопки / cell grid (то, с чем пользователь взаимодействует). Эргономика: thumb-zone на mobile — нижняя половина. Исключение: длинные scroll-экраны (каталог, лента) этому правилу не подчиняются.

10. **Edge alignment — 4px vs 20px** — стандартный боковой отступ от края экрана 20px (правило CLAUDE.md). Для card-holder стопок (wallet) и full-bleed баннеров — 4px. Правило: 4px только для визуально тяжёлых блоков, которые должны «дышать» до краёв. Конкретные размеры card-holder (3 collapsed cards × 297.27/330.3/367, x=39/22/4, top=712/722/732) — паттерн см. `carnica-visual-patterns` (cross-owner). Пример wallet — `references/examples.md §10`.

11. **Cell grid для 3-6 действий** — если нужно показать 3-6 быстрых действий, используй `cell grid 2.1` (квадратные плитки 2 cols, gap 8px, иконка 24px outline сверху, подпись `caption/medium`). Не использовать cell grid для >6 элементов — переходить на обычный cell-список (`cell 3.1`). Decision rule компонента — `carnica-components` §2.

12. **Dots progress LTR — фирменный приём Beeline** — прогресс отображается как ряд маленьких кружков (~6px, gap ~3px) под числовым значением. Жёлтые (`brand/primary`) точки = remaining/доступное, серые (`background/secondary`) = consumed/потраченное. **Направление LTR**: цветные ВСЕГДА слева, серые справа. НЕ разделять по рядам (сверху/снизу) — только по колонкам. Threshold = `Math.round(remaining / total * totalColumns)`. Не стандартный Carnica-компонент — собирается из ellipse вручную. Реализация — `carnica-visual-patterns` (cross-owner). Пример: `references/examples.md §12`.

13. **Product feed на главном экране** — лента «другие продукты билайна» = единый белый блок (`cornerRadius: 32`, `clipsContent: true`) с несколькими секциями. Каждая секция: визуальный якорь (обложки/иконки) + заголовок `body/accent/medium` CENTER + описание `body/small` `content/secondary` CENTER + CTA `button 2.5` secondary text-view по центру. Заголовок над всей лентой — `body/accent/small` `content/secondary` CENTER (не `title 2.1`). Секции разделяются `paddingTop: 24`, не divider. Композиция — `carnica-visual-patterns` (cross-owner).

14. **Asymmetric card grid — визуальный ритм** — если идут **два ряда по 2 карточки** друг под другом: первый ряд узкая+широкая (~43%/57%), второй ряд широкая+узкая (~57%/43%). Создаёт визуальный ритм, избегает монотонной сетки. Если ряд **один** (без соседнего ряда карточек) — обе карточки равной ширины. Реализация: одну карточку `layoutSizingHorizontal: FIXED` (144px), другую `FILL`. Пример — `carnica-visual-patterns` (cross-owner).

15. **Lowercase UI — все строчные** — заголовки секций («состав заказа»), лейблы полей («откуда»), кнопки («перейти к заказу»), тэги, чипы, пункты меню, FAQ-вопросы («когда привезут?»). Новые предложения внутри абзаца тоже с маленькой. Точка в конце последнего предложения подписи/кнопки **не ставится** (только как разделитель внутри абзаца). Исключения: имена (Илья, Анна), география (Москва), бренды (МТС, Apple, iPhone — но **билайн** строчной!), аббревиатуры (eSIM, SMS, QR), собств. названия в кавычках («Вверх!»). Запрещено: CAPS LOCK, `text-transform: uppercase`, `letter-spacing` для имитации CAPS, ручная капитализация. UX-обоснование: tone-of-voice «близкий, человеческий, спокойный»; CAPS = визуальный шум и давление; точка в конце короткой строки = канцелярщина. Полные правила копирайтинга и микрокопии — `carnica-copy-tone` (owner per D-27). Единицы измерения (гб, мб, мин) — `carnica-typography` (owner).

16. **Фоны тэгов и chip — только разрешённые tones** — `tag 2.3` имеет 5 разрешённых tone: `default` (#F0F3F5 серый, для нейтральной метки), `brand` (#FFC800 жёлтый, для промо/акции), `invert` (#28303F тёмный, для контраста), `success` (#CBF6E3 зелёный, для позитивного статуса), `error` (rgba(248,74,0,0.12) для негативного). Цветные `surface-*` токены (`surface-yellow #FFE999`, `surface-blue`, `surface-violet`, `surface-magenta`, `surface-teal`, `surface-orange`) **запрещены как фоны тэгов** — они для icon-подложек 64-80px в карточках товаров. Variants `accent` и `custom` `tag 2.3` — не использовать без согласования с дизайнером. UX-обоснование: тэг = акцент внутри контента; если он пастельный, конкурирует за внимание с CTA и статусами. Серый default читается как «метаданные», яркие brand/success/error — как «статус». Компонент `tag 2.3` — `carnica-components` (owner); полная таблица token hex — `carnica-design-system` (owner per D-27).

## See also

- `carnica-copy-tone` — §15 lowercase правила копирайтинга и точка в конце (owner per D-27)
- `carnica-components` — §1 loading/empty/error компоненты, §11 `cell grid 2.1`, §16 `tag 2.3` decision rules (owner)
- `carnica-design-system` — §16 token hex matrix (surface-* vs tag tones), §10 spacing scale, §7 hierarchy tokens
- `carnica-visual-patterns` — §10 card-holder stack realization, §12 dots progress implementation, §13 feed composition, §14 asymmetric grid (cross-owner)
- `carnica-typography` — §7 hierarchy 3-4 levels rule, contrast через один параметр, размер/вес/цвет inventory
- `references/examples.md` — конкретные до/после для top-5 принципов (§1 / §10 / §12 / §15 / §16)

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (16 RU + 8 EN) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться` (D-09).
- [x] Файл ≤ 500 строк (hard limit ARCH-02).
- [x] Тяжёлый материал (до/после конкретные значения) вынесен в `references/examples.md` (§ 9 architecture).
- [x] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа). Использован `## See also`.
- [x] Контент пересекается с другими ref skills — owners указаны (D-27): §15 → `carnica-copy-tone`, §16 token hex → `carnica-design-system`, §16 component → `carnica-components`, §10/§12/§13/§14 visual realization → `carnica-visual-patterns`. Здесь — UX-обоснование, не детали.
- [x] Все placeholders заполнены.
- [x] Все template comments удалены.
- [x] Imperative form в body: «Реализуй», «Не разделяй», «Используй», «Применяй». Слова «следует», «возможно», «может быть» — отсутствуют.
