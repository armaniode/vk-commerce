---
name: carnica-design-references
description: Каталог референсных макетов Beeline 2026 (20 экранов — mobile + web) с Figma file ID и node-IDs для get_design_context, общие layout-паттерны и concrete reference screens. Используй когда генерируешь экран по эталонному макету Beeline, ищешь Figma node-ID конкретного референса (главный, wallet, корзина, чекаут, товар, магазин), сверяешь свой результат с эталоном или выбираешь layout-паттерн (2-col desktop, expanded card, hero+grid). Триггеры: «референс», «эталон», «образец», «макет», «20 экранов», «главный экран», «wallet», «корзина», «чекаут», «hero», «как должен выглядеть», «node-id», «Figma node», «get_design_context», «design references», «reference screen», «mockup», «catalog», а также любой поиск Figma-референса Beeline 2026 при генерации экрана.
type: reference
---

# Carnica Design References

Этот skill — каталог 20 эталонных макетов Beeline 2026 (11 mobile + 9 web) с Figma file ID и node-IDs для `get_design_context`, общие layout-паттерны из реальных экранов, наблюдения по типографике/цвету/spacing и concrete reference screens (главный экран + wallet redesign). REF-10 — это **примеры применения** правил, а не сами правила: owner типографики — `carnica-typography`, owner цветовых токенов — `carnica-design-system`, owner абстрактных layout-паттернов — `carnica-visual-patterns`.

## Когда обращаться

- Генерируешь новый экран по эталонному макету Beeline — нужен Figma file ID и node-ID для `get_design_context`
- Сверяешь свой результат с reference screen (структура / spacing / композиция / отступы)
- Ищешь конкретный макет: главный экран / wallet / корзина / чекаут / товар / магазин / детализация
- Выбираешь layout-паттерн под задачу: 2-col desktop, expanded card, hero+grid, stacked list, card grid
- Сверяешь spacing значения: mobile (px=16), web desktop (px=40 header / max-width 1200), web mobile-adaptive (px=4 full-bleed)
- Реализуешь responsive (desktop → mobile): adaptation 2-col → single column, sidebar → floating bar
- Делаешь wallet card-holder стопку или главный экран — нужен concrete spec из reference

## Quick reference

### Мобильное приложение — каталог 11 макетов

| # | Экран | Тип layout | File ID | Node ID |
|---|---|---|---|---|
| 1 | Главный (stage 1) | Stacked cards + carousel + tab bar | `ZWWjZuTkZhBw7pPoKETgzL` | `1752-50246` |
| 2 | Wallet | List с yellow selected | `ZWWjZuTkZhBw7pPoKETgzL` | `1252-15079` |
| 3 | Wallet selected | Expanded card + collapsed | `ZWWjZuTkZhBw7pPoKETgzL` | `1254-22933` |
| 4 | Все действия | Single-card list | `ZWWjZuTkZhBw7pPoKETgzL` | `1256-16857` |
| 5 | Профиль | Avatar header + flat menu | `ZWWjZuTkZhBw7pPoKETgzL` | `1238-19537` |
| 6 | Безопасность | 2-col tile grid | `ZWWjZuTkZhBw7pPoKETgzL` | `1493-15210` |
| 7 | Безопасность (концепт) | Hero status + checklist | `ZWWjZuTkZhBw7pPoKETgzL` | `1-220285` |
| 8 | Неавторизованная зона | Fork + card grid | `Fl2JVIqj9JjGETRxTI61re` | `24214-28863` |
| 9 | Интернет-магазин | Promo + catalog list | `Fl2JVIqj9JjGETRxTI61re` | `24196-26373` |
| 10 | Детализация расходов | Chart + transaction list | `92rgddCR8pAQSGNjyAch9p` | `18377-31880` |
| 11 | Операция | Centered hero + key-value | `92rgddCR8pAQSGNjyAch9p` | `20070-292866` |

### Веб (десктоп + мобильный) — каталог 9 макетов

| # | Экран | Layout | File ID | Node (desktop) | Node (mobile) |
|---|---|---|---|---|---|
| 12 | Корзина | 2-col (cart+summary) dark | `kG7qvRYSfEmzTn8oGYLvwZ` | `22685-60983` | — |
| 13/17 | Чекаут | Card accordion | `B5yqasyol1TtSJg1TnoxB0` | `1392-39921` | `1453-19859` |
| 14/18 | Главная сайта | Hero + tabs + product grid | `80Jf83UupXMC96o8xjX0b2` | `2082-24997` | `2082-29184` |
| 15/19 | Товар | 2-col product detail | `mQdTRMmLxUMJsi5r5S8mQG` | `5614-60454` | `4428-118505` |
| 16/20 | Магазин главная | Hero + mixed card grid | `mQdTRMmLxUMJsi5r5S8mQG` | `4737-55557` | `4737-55330` |

### Reference screens (concrete redesign specs)

| Экран | File ID | Node ID | Spec |
|---|---|---|---|
| Главный экран redesign (GS-1) | `GJXKeWvj14GIQ8EOw9Arac` | `217-39898` | `references/screens-detailed.md` §10 |
| Wallet redesign (GS-3) | `GJXKeWvj14GIQ8EOw9Arac` | `220-5796` | `references/screens-detailed.md` §11 |

Использование с Figma MCP: `mcp__figma__get_design_context({fileKey: "<file ID>", nodeId: "<node ID>"})` — возвращает код-референс + screenshot + design context.

### Общие принципы (наблюдения из реальных макетов)

- **Минимализм** — много «воздуха», никаких декоративных излишеств. «Воздух» — фича, не баг.
- **Карточный подход** — белые карточки на сером фоне (`background/primary` #F0F3F5). Owner токенов — `carnica-design-system`.
- **Скруглённые углы** — pill (10000px) для кнопок, 16-32px для карточек (mobile 16-20 / web 24-32).
- **Без разделителей** — spacing вместо линий. Hairline 1px #E2E6ED только в плотных списках.
- **Все строчные** — lowercase UI (исключения: имена, бренды кроме «билайн», аббревиатуры eSIM/SMS/QR). Owner правила — `carnica-copy-tone`.
- **Два веса шрифта** — Regular 400 (основа) + Medium 500 (только внутри готовых компонентов). Owner правил — `carnica-typography`.
- **Жёлтый = действие** — `brand/primary` #FFC800 только для CTA, акцентов, активных состояний. Никогда как цвет текста на светлом фоне (1.7:1 fail). Никогда как фон карточек, кроме Wallet selected (#FFD335).
- **Минимальная палитра** — 90% интерфейса использует только #28303F, #77849D, #F0F3F5, #FFFFFF и #FFC800.

### Spacing — короткая сводка (полная — в `references/screens-detailed.md` §1-3)

| Контекст | Page padding | Между секциями | Card radius |
|---|---|---|---|
| Mobile APP (375px) | 16 | 12-24 | 16-20 |
| Web desktop (1440px, max-width 1200) | 40 (header) | 60-80 | 24-32 |
| Web mobile-adaptive (375px) | 4 (full-bleed) / 20 внутри карт | 8-24 | 32 |

### Типографика — короткая сводка (полная карта 15 ситуаций — `carnica-typography`)

| Контекст mobile/web | Стиль Carnica | Пример |
|---|---|---|
| Mobile: баланс / крупное число | `display/small 32/400` | «1 400 ₽» |
| Mobile: данные тарифа | `body/large 24/400` | «7,3 гб», «12 мин» |
| Mobile: тело текста | `body/small 16/400` | описания, подписи |
| Web: заголовок страницы | `display/medium 40/400` | «ваш заказ» |
| Web: hero H1 | `display/small 32/400` | промо-текст |
| Web: секция | `headline/small 24/400` | «способ получения» |
| Web: локация в хедере | component-specific 18/400/22; не foundation typography token | «Москва» |
| Web: цена крупная | `display/small 32/400` | «1 199 ₽» |

### Layout-паттерны (10 паттернов из реальных экранов)

| Паттерн | Где применяется | Полное описание |
|---|---|---|
| Стековый список | #4, #5, #6, #10 — единая белая карточка с строками | `carnica-visual-patterns` |
| Карточная сетка | #6, #8, #9 — 2-col grid, gap 8px, ~150-170px карточки | `carnica-visual-patterns` |
| Expanded/Collapsed | #2, #3 — выбранная карточка разворачивается; жёлтый = selected | `carnica-visual-patterns` (wallet) |
| Hero + детали | #11 — крупная иконка + сумма + key-value | `references/screens-detailed.md` |
| Финансы/детализация | #10 — stacked bar chart + транзакции по датам | `references/screens-detailed.md` |
| 2-column desktop | #12, #15 — content left + summary right; gap 30-32 | `references/screens-detailed.md` |
| Hero + контент | #14, #16 — 520-542px hero + pill-tab + product grid | `carnica-visual-patterns` |
| Checkout accordion | #13, #17 — z-index card stacking; активный шаг перекрывает | `references/screens-detailed.md` |
| Desktop → Mobile responsive | #14→#18, #15→#19, #16→#20 — 2-col → single; sidebar → floating bar | `references/screens-detailed.md` |
| Wallet card-holder | #3 — selected expanded + 3 collapsed под ней | `carnica-visual-patterns` (wallet) + `references/screens-detailed.md` §11 |

## Decision rules

1. **Используй Figma MCP `get_design_context` для каждого reference** — `mcp__figma__get_design_context({fileKey, nodeId})` даёт код-референс + screenshot + design context. Не угадывай размеры с глазу — запроси MCP перед сборкой экрана. Каталог fileKey/nodeId — выше в Quick reference.

2. **Pick layout по контенту, не по «красоте»** — настройки / профиль / детализация → стековый список (#4/#5/#10). Quick actions / security → карточная сетка 2-col (#6/#8). Wallet с многими SIM → expanded/collapsed (#3). Чекаут с шагами → card accordion (#13/#17). Лендинг магазина → hero + product grid (#14/#16/#20). Корзина web → 2-col desktop (#12).

3. **Минимализм по умолчанию — не добавляй декор** — «воздух» — фича Carnica. Если макет выглядит «пусто» — это правильно. Не заполняй пустоту иллюстрациями, шумом, дополнительными элементами. Между крупными секциями mobile 40-80px, web 60-80px.

4. **Карточный подход — белые карточки на сером фоне** — `bg=background/secondary` #FFFFFF на `bg=background/primary` #F0F3F5. cornerRadius 16-32 (mobile 16-20 / web 24-32). Padding: mobile 16h / 14-20v; web 24-32. Без теней или очень лёгкие. Дальнейшие токены — `carnica-design-system`.

5. **Жёлтый только для действий** — `brand/primary` #FFC800 на CTA, selected state, promo. НЕ как декор и НЕ как цвет текста на светлом фоне (контраст 1.7:1, нечитаемо). Полная таблица контраста — `carnica-typography` / `carnica-design-system`.

6. **Responsive: desktop сначала, mobile адаптация** — большинство Beeline web макетов desktop-first, mobile — адаптация. Главные правила перехода: 2-col → single column; sidebar → floating bottom bar 72h с ценой и CTA; hero 520→466; product cards M(460)+S(218) → M(327)+S(160); horizontal scroll вместо grid overflow; chip tabs сохраняются, контент стекается вертикально.

7. **Главный экран redesign reference — node `217-39898`** — file `GJXKeWvj14GIQ8EOw9Arac` (GS-1) = canonical reference нового стиля. Navbar `style=glass` + account section («основная сим» CENTER + номер в pill + «все номера» pill) + карточки прямо на сером фоне без белого wrapper + продуктовая лента единый белый блок с секциями. Полная декомпозиция — `references/screens-detailed.md` §10.

8. **Wallet redesign reference — node `220-5796`** — file `GJXKeWvj14GIQ8EOw9Arac` (GS-3) = canonical wallet нового стиля. Navbar без заголовка (`title` скрыт), selected wallet-card жёлтая (paddingL/R=4 от края), fast-actions white card с 3× cell 3.1 + button inline text 3.0 «все функции», card-holder стопка 3× collapsed cards через `layoutPositioning='ABSOLUTE'` с постепенным w=297.27/330.3/367. Полные размеры — `references/screens-detailed.md` §11.

9. **При спорах — открой эталон через get_design_context** — если генерация отличается от ожидания дизайнера, не дожимай руками. Открой reference через MCP, сверь structure / spacing / typography, проверь свой workflow. Каталог Figma node-IDs выше — единая точка истины.

## See also

- `carnica-visual-patterns` — abstract layout patterns (wallet card-holder, dots LTR, asymmetric grid, hero composition); REF-10 = examples их применения на concrete screens
- `carnica-typography` — owner правил выбора стилей; здесь — наблюдения как они применяются в реальных макетах
- `carnica-design-system` — owner color tokens (полная таблица контраста, dark theme); здесь — наблюдения использования
- `carnica-components` — owner decision rules «какой Carnica-компонент в каком экране»
- `carnica-copy-tone` — owner правил lowercase UI и единиц измерения
- `references/screens-detailed.md` — детальные mobile/web spec + spacing-таблицы + 7 групп component patterns + главный экран redesign + wallet redesign с card-holder

---

## Acceptance checklist (copy-paste для PR review)

- [x] YAML frontmatter содержит `name`, `description`, `type: reference` — все три поля заполнены.
- [x] `name` следует convention `carnica-<topic>` (префикс обязателен — § 8 architecture).
- [x] `description` следует middle-pushy формату: явные триггеры в кавычках (≥5 RU + ≥3 EN) + связка с Carnica/Beeline (§ 5 architecture).
- [x] `description` не дублируется H2-секцией «Когда применять» в body — body использует `## Когда обращаться` (D-09).
- [x] Файл ≤ 500 строк (`wc -l SKILL.md` — hard limit ARCH-02 пройден).
- [x] Тяжёлый материал (полные mobile/web spacing tables, component patterns, главный экран decompose, wallet card-holder dimensions) вынесен в `references/screens-detailed.md` (§ 9 architecture).
- [x] **НЕТ секции `## @references`** — это запрещено для reference skill (D-08, leaves графа). Использован `## See also`.
- [x] Контент пересекается с `carnica-typography` / `carnica-design-system` / `carnica-visual-patterns` — owner pattern: REF-10 = observations, остальные skills = правила (D-27 ownership).
- [x] Все `<...>` placeholders заполнены.
- [x] Все `<!-- TEMPLATE: ... -->` комментарии удалены.
- [x] Imperative form в body: «Используй», «Pick», «Не добавляй» (§ 11 architecture). Слова «следует», «возможно», «может быть» — отсутствуют.
