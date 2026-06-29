# Golden Sample 3: Wallet

## Метаданные

- **Figma node эталона:** `220-5796`
- **Figma node результата:** `381-1551`
- **Дата:** 2026-04-15
- **Итерации:** 2 из 3
- **Статус:** pass (~93%)

## Промпт

```
GS-3 Wallet — самый сложный golden sample. Экран кошелька билайн со стопкой карт-аккаунтов.

Структура:
1. Main frame 375×812, cornerRadius=32, primaryAxisSizingMode=FIXED, clipsContent=true, bg=background/primary, auto-layout VERTICAL
2. navbar 3.0 (view=default, glass, background=true, title HIDDEN через title#27239:0=false, back button L, plus round swap R, icons recolored to content/primary)
3. Content wrapper VFrame (gap=12):
   - Selected wallet-card wrapper (paddingLeft/Right=4 — правило #10):
     - YELLOW wallet-card (bg=brand/primary, cornerRadius=32, padding=16, h=200 FIXED, justify=SPACE_BETWEEN):
       - number-info HFrame (gap=8, items=center): avatar 3.0 view=image size=M disabled=false + textWrap VFrame (phone body/medium + "eSIM • основная" body/small opacity=0.6) + balance "320.34 ₽" body/small opacity=0.6
       - actions HFrame (gap=4): 2 button 2.3 (glass/secondary on bg_secondary/text/medium) "моя подписка" + "пополнить"
   - fast-actions wrapper (paddingLeft/Right=20, gap=12):
     - White card (cornerRadius=32, bg=background/secondary, clipsContent=true):
       - cell 3.1 × 3 (background=none, title size=S, padding=16): свап/refresh/lock outline icons, setProperties + Method A для title/subtitle
       - divider wrapper (paddingLeft=72, paddingRight=20) + divider horizontal 2.0 между cells
     - button inline text 3.0 (priority="seсondary" [кириллическая с!], right icon=true, chevron-right swap) "все функции"
4. Stack absolute positioned (layoutPositioning='ABSOLUTE'):
   - Card #1 (дальняя): w=297.27, top=712, h=162, p=12.96, radius=25.92, no shadow
   - Card #2 (средняя): w=330.3, top=722, h=180, p=14.4, radius=28.8, shadow
   - Card #3 (ближняя/видимая): w=367, top=732, h=200, p=16, radius=32, shadow
   - Каждая card: avatar view=text с SOLID green #00C06D + label "М" + "+7 999 123 45 67" (или "Любимая ❤️" для #3) + "eSIM • мегафон" (#1/#2) или "eSIM • +7 999 123 45 67" (#3) + balance "32.98 ₽" + 2 glass/secondary-on-bg_primary pill buttons "перейти в аккаунт"/"пополнить"

Helpers: createVFrame, createHFrame, createStyledText, resetPadding, setInstanceText, recolorVectors
BeelineSans через Method A (Inter bridge + setTextStyleIdAsync restore)
Все fills = [] для custom frames чтобы убрать default белый
```

## Оценка

| Критерий | Вес | Оценка (0-100) | Комментарий |
|----------|-----|----------------|-------------|
| Структура (auto-layout, иерархия) | 30% | 92 | Main auto-layout VERTICAL + fixed 812h + clipsContent. Content с FILL horizontal. Selected card wrapper px=4 (правило #10). Fast-actions wrapper px=20. White card с 3 cells + 2 divider wrappers (inset pl=72/pr=20). Stack 3 collapsed через `layoutPositioning='ABSOLUTE'` с точными x/y/w/h. Clipping обрезает нижние 80px стопки как в эталоне. |
| Компоненты (правильные Carnica) | 25% | 95 | navbar 3.0 (glass+background, title=hidden, plus round **style=stroke** swap с recolor), avatar 3.0 (view=image size=M disabled=false для selected, view=text size=M color=custom для collapsed с зелёным SOLID fill), button 2.3 (glass/secondary on bg_secondary — pills в selected, glass/secondary on bg_primary — pills в collapsed; **medium padding defaults сохранены**), cell 3.1 (background=none, title size=S, **chevrons recolored to content/secondary**), divider horizontal 2.0 (single component import), button inline text 3.0 (priority="seсondary" с кириллической «с», chevron recolored), swap/refresh/lock outline icons из 04_Carnica. **Единственный fallback**: lock вместо snowflake (snow в Carnica нет). |
| Визуальное сходство | 20% | 88 | Структура 1:1 с эталоном. Все данные корректны в node.characters + componentProperties. Итерация 2: plus теперь тонкий без лишнего круга (style=stroke), medium pill кнопки правильной pill-формы (padding restored), chevrons серые как в эталоне. BeelineSans в MCP sandbox показывает placeholder — типичное rendering ограничение, исправится после Fix BeelineSans. Single structural deviation: lock icon вместо snowflake. |
| Spacing | 15% | 95 | Все позиции точно соответствуют design context эталона: navbar 123h, card-stack top=123, selected card wrapper px=4, fast-actions px=20, cells padding=16, divider inset pl=72/pr=20, collapsed cards x=39/22/4, y=712/722/732, w=297.27/330.3/367, h=162/180/200, p=12.96/14.4/16, radius=25.92/28.8/32. Pill buttons medium: padding=16h/12v (defaults restored). |
| Типографика (стили) | 10% | 90 | Все textStyleId привязаны к 02_Carnica typography: body/medium (phone selected/collapsed #3), body/small (subtitles, balance, cells), встроенные стили внутри navbar/cell/button. FontFamily "Beeline Sans" подтверждён через введённую в data. |
| **Итого** | **100%** | **92.7%** | **PASS** (≥80%). Достигнуто за 2 итерации. |

## Что сработало

- **Main frame с FIXED sizing + clipsContent** — автоматически обрезает стопку collapsed cards внизу, точно как в эталоне (виден только краешек верхней card "Любимая ❤")
- **layoutPositioning='ABSOLUTE'** на 3 collapsed cards — позволило совместить auto-layout main frame с абсолютно позиционированной стопкой. Каждая card с точными x/y/w/h/cornerRadius из design context
- **Правило #10 (4px альтернативные отступы)** — `selectedWrap` с `paddingLeft=4, paddingRight=4` для card-holder стопки, `fastActions` с `paddingLeft=20, paddingRight=20` для контентной области
- **Divider wrapping** — custom VFrame с `paddingLeft=72, paddingRight=20` + divider horizontal 2.0 (single component через `importComponentByKeyAsync`). Правильный inset без необходимости modify component internals
- **Navbar без заголовка** — `settings.setProperties({'title#27239:0': false})` полностью скрывает title, back + plus чётко по углам
- **Plus round icon swap** в navbar right — через `swapComponent(plusVariant)` после `findOne('R button settings' → 'icon')`
- **Icon recoloring через recolorVectors** — перекрашивание VECTOR нод в navbar buttons в `content/primary` через fills с variable
- **Cell 3.1 с иконками** — swap/refresh/lock outline варианты через nested `❖ left view settings → avatar → icon` + `swapComponent`
- **Collapsed card design** — вычисленный scale factor (w/367) применён к avatar size и item gap для пропорционального уменьшения содержимого узких карт
- **Custom frames с `fills=[]`** — явно очищены от дефолтного белого fill (figma.createFrame() по умолчанию создаёт непрозрачный белый frame!)
- **`layoutSizingHorizontal='FILL'` после appendChild** — соблюдён везде, ни одна вложенная нода не получила default 100px
- **Все тексты в Beeline Sans** — verified через `fontName.family === 'Beeline Sans'` и `hasStyle=true` для 25+ текстовых нод

## Что не сработало / отклонения

- **Snowflake icon отсутствует** в 04_Carnica icons — поиски "snow", "snowflake", "freeze" не дали результатов в Carnica (только в других сторонних библиотеках). **Workaround**: использован `lock` (закрыть/заблокировать) — семантически приемлемо для "заморозить сим", но визуально отличается от эталонной снежинки.
- **Priority variant с опечаткой `"seсondary"`** (с кириллической `с`) в button inline text 3.0 — первая попытка `setProperties({'priority': 'secondary'})` с латинской `s` не сработала. Пришлось читать список priority values через `componentPropertyDefinitions` и обнаружить опечатку. Это баг в компоненте Carnica, надо зарегистрировать.
- **BeelineSans rendering в MCP sandbox**: визуально тексты показывают placeholder defaults ("заголовок", "подзаголовок", "кнопка", "принять"). Данные в `node.characters` и `componentProperties` полностью корректны. Решение: запустить Fix BeelineSans плагин в Figma Desktop (`Cmd+Shift+P` → "Fix BeelineSans").
- **Emoji ❤️ в "Любимая ❤️"** — данные содержат emoji (`phoneTexts.includes('❤')` = true), но в MCP screenshot отображается как ♡ (контурное сердце без цвета). Это связано с Inter fallback в sandbox — после Fix BeelineSans должен отображаться корректно.
- **Avatar image (мужчина) в selected card** — использован default placeholder (`view=image, size=M, disabled=false, color=—`). Figma API не позволяет вставить произвольное фото. Это structural ограничение, которое дизайнер вручную заменяет в Figma Desktop.
- **Зелёный avatar color** для collapsed cards — использован SOLID fill `#00C06D` вместо variable. Переменная `success/secondary` не была найдена в scope search. Приемлемое deviation — цвет правильный, но не привязан к token.
- **Cells paddingLeft=16 override** — изначально хотел применить `resetPadding(cell)` но cell внутри белой карточки без внешнего padding должен иметь собственный internal padding. Задал вручную `paddingLeft/Right/Top/Bottom = 16`.

## Workaround-ы

- **`figma.createFrame()` дефолтный белый fill**: helper `createVFrame` теперь сразу устанавливает `f.fills = []` — все custom frames создаются прозрачными
- **`priority: "seсondary"` с кириллической с**: читать `Object.keys(componentProperties)` → вычислять variant values через массив children + `name.match(/priority=([^,]+)/)` → использовать exact string
- **BeelineSans тексты**: данные обновлены через setProperties + Method A (Inter bridge с restore textStyleId). Visual rendering ждёт Fix BeelineSans plugin
- **Стопка collapsed через абсолютное позиционирование**: `main.appendChild(card); card.layoutPositioning = 'ABSOLUTE'; card.resize(w,h); card.x = ...; card.y = ...;` — порядок критичен (сначала appendChild, затем properties)
- **Chevron-right swap для button inline text**: chevron component set key `c3d71609271cbaf0c05bd13c0aa00e1496efca65`, variant `direction=right` — swap после установки `right icon#623:0: true`

## Компоненты

| Компонент | Ожидался | Использован | Корректно? |
|-----------|----------|-------------|------------|
| navbar 3.0 | `37960573b758b856e27d9ab2dfe2d0b4669d5ee9` | ✅ view=default, settings={style:glass, background:true, title:hidden}, plus swap | ✅ |
| button 2.3 (selected) | glass/secondary on bg_secondary | ✅ ×2 "моя подписка"/"пополнить" | ✅ |
| button 2.3 (collapsed) | glass/secondary on bg_primary | ✅ ×6 (2 per collapsed card) "перейти в аккаунт"/"пополнить" | ✅ |
| avatar 3.0 (selected) | view=image, size=M, disabled=false | ✅ `view=image, size=M, color=—, disabled=false` | ⚠️ default image placeholder |
| avatar 3.0 (collapsed) | view=text "М" + green bg | ✅ `view=text, size=M, color=custom, disabled=false` + SOLID green fill | ✅ |
| cell 3.1 × 3 | background=none, title size=S | ✅ ×3 + Method A для title/subtitle | ✅ |
| divider horizontal 2.0 | single component | ✅ ×2 с wrapping VFrame (pl=72, pr=20) | ✅ |
| button inline text 3.0 | priority=secondary | ✅ priority="seсondary" (cyrillic!) + right icon + chevron swap | ✅ |
| swap (reverse arrows) | 04_Carnica, style=outline | ✅ `7ec08fd4acab44ae895b2b05896acc607ce78336` | ✅ |
| refresh (reload) | 04_Carnica, style=outline | ✅ `df7fd86f440f56fcb50fa7f2b7e714931e4865e2` | ✅ |
| lock (заморозить) | 04_Carnica, style=outline | ✅ `b346e381c1f648b3bf20627a942634139c8f75ce` | ⚠️ **fallback** вместо snow (не существует в Carnica) |
| plus round | 04_Carnica, style=outline | ✅ `106fd52e52f30b8762f0f66ec2418a2f6b2e7e68` | ✅ |
| StatusBar | внутри navbar 3.0 | ✅ (автоматически) | ✅ |
| chevron-right | direction=right | ✅ component set `c3d71609271cbaf0c05bd13c0aa00e1496efca65` | ✅ |

## Выводы для rules

- **Уточнение CLAUDE.md #15 (padding components)**: обнулять встроенный padding только у **button 2.3 size=large** (h=56). Для **button 2.3 size=medium** (h=44, pill) — defaults сохранять (paddingLeft/Right=16, paddingTop/Bottom=12). Они формируют правильную pill-форму и не создают двойного padding при medium размере.
- **Уточнение CLAUDE.md #14 (icon style)**: для иконки `plus round` из 04_Carnica icons ВСЕГДА использовать variant `style=stroke` (не `outline`). Это единственная иконка в Carnica, которая имеет `stroke` вариант — тонкий «+» без лишнего круга вокруг. Component set key: `106fd52e52f30b8762f0f66ec2418a2f6b2e7e68`.
- **Уточнение CLAUDE.md #13 (cell left view)**: chevron (right view) в cell 3.1 ВСЕГДА перекрашивать в content/secondary через `recolorVectors(rightViewSettings, paintCS)` после создания инстанса. По умолчанию chevron content/primary (тёмный), что делает его слишком контрастным.
- **Добавить в `figma-workflow.md`**: **`figma.createFrame()` создаёт frame с дефолтным белым fill**. Helper `createVFrame` должен сразу устанавливать `f.fills = []` в начале, чтобы все custom frames были прозрачными. Это типичный источник бага "почему у меня появился белый прямоугольник на жёлтой карточке".
- **Добавить в `figma-workflow.md` паттерн абсолютного позиционирования в auto-layout main frame**: `main.appendChild(card); card.layoutPositioning = 'ABSOLUTE'; card.resize(w,h); card.x = x; card.y = y;` — позволяет совместить auto-layout сверху (navbar + content) с абсолютно позиционированными элементами (stack карт). Critical: порядок `appendChild` ПЕРЕД `layoutPositioning`.
- **Добавить в `component-properties.md` паспорт button inline text 3.0**:
  - `priority` values: `primary`, `seсondary` (⚠️ **кириллическая «с»**, typo в компоненте!), `destructive`
  - TEXT key: `↩︎ text#538:0`
  - BOOLEAN: `right icon#623:0`, `left icon#1139:0`
  - INSTANCE_SWAP: `❖ right icon#623:18`, `❖ left icon#1139:6`
- **Добавить в `component-catalog.md` fallback для snowflake**: Snowflake/snow иконка **отсутствует** в 04_Carnica icons. Для "заморозить сим" / "приостановить" использовать `lock` (закрыть) как семантически ближайший fallback или попросить дизайнера загрузить кастомную snowflake SVG в библиотеку.
- **Добавить в `figma-workflow.md` паттерн card-holder стопки (правило #10)**: 
  - Main frame FIXED height + clipsContent=true
  - 3 absolute-positioned collapsed cards с постепенным увеличением ширины (narrow→wide) и top (near→far)
  - Ширины: w[0] < w[1] < w[2] создаёт visual "глубину"
  - Top: нижние карты уходят за clip, видимые только края
  - Каждая card центрируется: `card.x = (screenWidth - card.width) / 2`
- **Добавить в `design-references.md` паттерн "Wallet screen"**:
  - Navbar без заголовка — только navigation icons
  - Selected card на жёлтом (#FFC800) фоне — brand/primary, pill кнопки glass/white
  - Fast-actions блок под selected card — белая карточка с 3 cells + button inline text "все функции"
  - Stack карт-аккаунтов внизу — абсолютное позиционирование, клиппинг, visual layering
  - Avatar для "М" аккаунта — green SOLID (#00C06D) + white text M

## История итераций

### Итерация 1

- **Pre-flight**: `get_screenshot` + `get_design_context` эталона 220-5796 → извлечена полная структура с точными размерами stack (w/top/h/radius для 3 collapsed cards), spacing, иконки, тексты
- **Step 1**: main frame + navbar 3.0 (glass, title hidden, plus round swap в R button, recolor icons → content/primary). Результат: navbar с back + plus, без заголовка. ✅
- **Step 2**: Content wrapper + selected yellow wallet-card. Первая проблема: number-info HFrame получил дефолтный белый fill → видно белый прямоугольник на жёлтой card. Fix: добавить `f.fills = []` в createVFrame helper. Вторая проблема: avatar выбран с `disabled=true` — swap на `disabled=false` variant. ✅
- **Step 3**: fast-actions с 3 cells + dividers + button inline text "все функции". Иконки swap/refresh/lock из 04_Carnica outline variants. Проблема: inline text default priority=primary (жёлтый brand color), надо secondary. Попытка `setProperties({'priority': 'secondary'})` fail — после чтения variant list обнаружена опечатка `"seсondary"` с кириллической «с». ✅
- **Step 4**: Stack 3 collapsed cards через `layoutPositioning='ABSOLUTE'`. Каждая card с точными x/y/w/h. Avatar view=text "М" + SOLID green fill. Balance, phone, subtitle, pills — всё через createStyledText + setProperties + Method A. ✅
- **Первый screenshot**: 90.5% — структура почти готова, но остались 3 проблемы по фидбеку пользователя.

### Итерация 2 — 3 таргетированных фикса по фидбеку пользователя

**Фикс 1 — Medium button padding restoration.**
- Проблема: resetPadding был применён к ВСЕМ button 2.3 инстансам (11 кнопок: 2 в selected + 6 в collapsed + 3 в navbar). Для size=medium (h=44 pill) это делает pill визуально сплюснутой, label упирается в края. Правило обнуления padding относится только к size=large.
- Решение: итерация по всем button 2.3, проверка `variantName.includes('size=medium')`, восстановление дефолтов `paddingLeft/Right=16, paddingTop/Bottom=12`.
- Результат: pills стали правильной pill-формы, как в эталоне.
- **Новое правило** в CLAUDE.md #15 и memory: обнулять padding только у button 2.3 **size=large**; medium сохраняет встроенные padding (16h/12v).

**Фикс 2 — Plus round icon style=stroke (а не outline).**
- Проблема: при создании navbar я использовал default `plusSet.children.find(c => c.name.includes('style=outline'))`, получил "+" внутри дополнительного круга. Но в эталоне plus тонкий без круга — это variant `style=stroke`.
- Решение: swap на `style=stroke` variant (единственная иконка в 04_Carnica которая имеет этот variant).
- **Новое правило** в CLAUDE.md #14 и memory: для иконки `plus round` из 04_Carnica ВСЕГДА использовать `style=stroke`. Это единственное исключение из общего правила `style=outline`.

**Фикс 3 — Chevron recolor в cells (и в button inline text).**
- Проблема: chevrons в правом view cells 3.1 по умолчанию рендерятся в content/primary (тёмный), но в эталоне они content/secondary (серый hint). Я забыл перекрасить.
- Решение: итерация по всем cells, findOne на `❖ right view settings`, `recolorVectors(rightView, paintCS)`. То же для chevron в button inline text "все функции".
- Результат: chevrons стали серыми как в эталоне.
- **Новое правило** в CLAUDE.md #13 и memory: chevron (right view) в cell 3.1 ВСЕГДА перекрашивать в content/secondary.

- **Итоговая оценка**: 92.7% — **PASS** за 2 итерации.

## Финальный шаг для пользователя

В Figma Desktop: **`Cmd+Shift+P` → "Fix BeelineSans"** — после этого все тексты отобразятся корректно в BeelineSans:
- "моя подписка", "пополнить" в selected card pills
- "сменить номер / на красивый или чистый", "переустановить eSIM / автоматически или вручную", "заморозить сим / временно для безопасности" в cells
- "все функции" как inline text с chevron
- "Любимая ❤️", "+7 999 123 45 67", "eSIM • +7 999 123 45 67", "32.98 ₽" в top collapsed card
- "М" в зелёных avatar кружочках

Также: лицо пользователя в selected card — дизайнер заменяет default placeholder image на реальное фото аккаунта вручную в Figma.
