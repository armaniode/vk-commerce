# Carnica Component Decision Rules — Extended

Полная тематическая дедуп-версия Carnica component decision rules — anti-patterns, decision trees, deep-dives по modal/dialog. Owner: `carnica-components` skill (D-08 leaves rule).

**Правило входа.** Перед каждой секцией экрана составь "список покупок": какие готовые Carnica-компоненты нужны. Если компонент есть — рисовать его вручную **ЗАПРЕЩЕНО**. Ручные фреймы допустимы только для layout-контейнеров (page wrapper, section container, spacer).

**Импорт.** `figma.importComponentSetByKeyAsync(key)` для component sets (есть variants), `figma.importComponentByKeyAsync(key)` для single components (без variants — `navbar modal 1.0`, `Alert`). Property keys всегда с полным `#uid`-суффиксом.

## Table of contents

1. Навигация и структура экрана
2. Заголовки и секции
3. Табы и сегменты
4. Контент: списки
5. Контент: сетки и карточки
6. Действия: кнопки и интерактив
7. Метки и статусы
8. Формы и ввод
9. Обратная связь: загрузка, ошибки, прогресс
10. Оверлеи и модалки
11. Decision trees (быстрые алгоритмы)
12. Icon variant semantics (outline / filled / stroke)
13. Modal page / dialog deep dive
14. Анти-паттерны (полный список)
15. Checklist перед каждой секцией экрана

---

## 1. Навигация и структура экрана

### Каркас экрана

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Верхняя панель навигации (back + title + action) | **navbar 3.0** | `37960573b758b856e27d9ab2dfe2d0b4669d5ee9` | — | Ручной фрейм с текстом и иконками |
| Навбар в модальном окне (close + title) | **navbar modal 1.0** (single component!) | `bef5f93f4a80c3ea80f50bcfcf13403bcee1ff6d` | — | navbar 3.0 внутри модалки |
| Нижний таб-бар приложения | **tabbar beeline 3.0** | `7cdac0804e514fcb3899e09bccd77849e0b458e7` | — | Ручной ряд иконок |
| Панель вкладок (web) | **tabbar 2.1** | — | `d8bf38f5590d58cb3551c26bf7f763f04c204c8f` | Ручной горизонтальный ряд |
| Строка статуса iOS (время, батарея) | **StatusBar** | `e5a0afb64e9cc7ba868b1570e7bc8a7f731172de` | `a115d46d3f00dedc15c33d3364c4e9941fa09656` | Ручной фрейм или пустое пространство |
| Home indicator (полоска внизу экрана) | **home indicator 1.1** | `5f897add939f815c2cc55cc717049b003226625b` | iPhone: `821dc91c538f15ca9f08deb8d94c9377ac2ee920`, iPad: `4909198cdc0e293d64dfae6de9a15d7db6460e85` | Ручной прямоугольник |
| Хлебные крошки (web) | **breadcrumbs 2.2** | — | `50fba4630c11fbd27a75e24b1eb052c4a4f351a7` | Текстовая строка с "/" |
| Адресная строка браузера (мокап) | **address bar 1.0** | — | `c50cf7085e6dc07c3b0a410eabe3810f2501c91c` | Ручной прямоугольник |

> **Navbar modal импорт.** Это single component, не component set: `await figma.importComponentByKeyAsync('bef5f93f...')` и затем `comp.createInstance()`. Использовать в каждом bottom sheet или модалке, нуждающейся в drag-handle/close.

## 2. Заголовки и секции

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Заголовок секции (с опциональной кнопкой/ссылкой справа) | **title 2.1** | `a30889ae37e403eb027eff1308408b0f0ca4f138` | `eeb30c20a4a66a372b6542c388d8d737ab043650` | Ручной текст body/accent/medium + button |
| Горизонтальный разделитель между секциями | **divider horizontal 2.0** | `3f859e41b341bec4b9ff40fb88bb3462124733bf` | `b47c4cb27bbb001084f9c43d8c4e977c0c9eb00f` | Ручной rectangle 1px |
| Вертикальный разделитель | **divider vertical 2.0** | `459d6f9ab119e3681f26cec28bb50abd4a2f6b7f` | `99bc08208de8a0d6600b527ce81a1a01e6fbdcad` | Ручная линия |
| Лёгкий label-заголовок над крупным контентным блоком | standalone `body/accent/small`, `content/secondary`, CENTER (через `createStyledText`) | — | — | title 2.1 (слишком тяжёлый акцент) |

> **Правило title.** Если есть текст «заголовок секции» с кнопкой «смотреть все» справа — это **title 2.1**, не ручная сборка. WEB `title 2.1` имеет размеры XL/L/M/S/XS, все Regular 400 — менять вес и внутренний gap **нельзя** (см. `references/properties.md §WEB title 2.1`).
>
> **Паттерн label-заголовок.** Заголовок НАД крупным контентным блоком (лента продуктов, GS-1) может быть `body/accent/small` (16/500) `content/secondary` CENTER — вместо `title 2.1`. Это лёгкий визуальный акцент.

## 3. Табы и сегменты

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Горизонтальные табы навигации (underline-style) | **tabs 2.1** | `fff13b8c76a72f376727883709c190155d377bdf` | — | Ручной ряд текстов с линией |
| Отдельная вкладка (web) | **tab 2.1** | — | `a4f75accc99eeb7c07e6662ca6263fcbe8800c26` | Ручная кнопка |
| Переключатель 2-4 сегментов (pill-style, iOS) | **segmented control 2.1** | `e65d710fbe00f97be86694fc720163e283f4c796` | `d076561458b98eb603fbf38a6bad8d5e501ae02b` | Ручные pill-кнопки |
| Горизонтальный скролл фильтров/категорий (chips) | **chips text collection 2.1** | `b848915c032aae01a38bb523e4018c4af2c928ba` | `cbd0f0231ee410d509306c8db111e4f5b41d9db1` | Ручной ряд tag-ов или pill-фреймов |

> **chips vs segmented control vs tabs:**
> - **chips** = фильтрация (скроллится, много вариантов): «Все / Развлечения / Безопасность / Финансы»
> - **segmented control** = переключение вида (2-4 варианта, фиксировано): «Список / Карта»
> - **tabs** = навигация между разделами (underline-стиль): «Главная / Тарифы / Услуги»
>
> **chips wrap=true** требует `counterAxisAlignItems='CENTER'` и `primaryAxisAlignItems='CENTER'` для корректного центрирования рядов.

## 4. Контент: списки (вертикальные)

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Строка списка: иконка + заголовок + подзаголовок + chevron/action | **cell 3.1** | `b8778e5453de3f31a334a1179c313fffad89f39c` | `20c658e1fb9e28f70ed07d9e88c8248dbc419eba` | Ручной горизонтальный фрейм |
| Строка списка с чекбоксом (множественный выбор) | **checkbox 2.1** | `469a4c4664a7d9e66e638d54fdfa0312a03b820a` | `450567310da86b896f8ec3964c983b33c5658c58` | cell 3.1 + ручной чекбокс |
| Строка списка с toggle (on/off) | **cell 3.1** + **switch 2.2** в right view | cell + switch | cell + switch | Ручной фрейм с toggle |
| Строка настроек (иконка + название + chevron) | **cell 3.1** | то же | то же | Ручной фрейм |
| Строка профиля/аккаунта (аватар + имя + подпись) | **cell 3.1** с left view = avatar | то же | то же | Ручной фрейм с аватаром |
| Сворачиваемая секция (FAQ, подробности) | **accordion group 2.2 / accordion 2.2** | `4612d43d611a917d54b03d0bf92794b9c9c596d1` | `8061224f40891ea4005b661e02f69b2822d3b976` | Ручной фрейм с chevron |

> **Правило cell.** ЛЮБАЯ строка в вертикальном списке с иконкой/аватаром слева + текст + action справа — это **cell 3.1**. Variants: `background` (none/bg_primary/bg_secondary), `title size` (S/L), `reverse`, `disabled`.
>
> **Cell gotchas:** chevron в `❖ right view settings` ВСЕГДА recolor в `content/secondary` через `recolorVectors()` (default `content/primary` слишком тёмный). В белой карточке `background=none`, не `default on bg_secondary` (даёт ДОП серый фон). Dividers между cells — `divider horizontal 2.0` в VFrame с `paddingLeft=72, paddingRight=20` (inset). Если parent card имеет padding — `resetPadding(cell)` все 4 стороны.

## 5. Контент: сетки и карточки

### Сетки (2+ колонки)

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Квадратная плитка в сетке 2-3 колонки | **cell grid 2.1** | `ba2d5c74e859c45a172f612a536811dbdb73bad9` | `09271f808b4a7ab179fe532e2f28e772dc21c803` | cell 3.1 или ручной фрейм |
| Кнопка-плитка с иконкой и текстом (быстрые действия) | **button box 1.0** | `a3fcb3970b4a83ff943331db5ac90b973fd40163` | — | Ручной круг + подпись |

> **cell grid vs card small:**
> - **cell grid** = информационная плитка (настройки безопасности, услуги), обычно с toggle/icon
> - **card small** = контентная карточка с изображением (промо, товар), скругленные углы и картинка
>
> **Cell grid avatar size=L.** Внутри cell grid 2.1 лежит avatar. По умолчанию `size=M`, но обычно нужен `size=L`. Найди вложенный avatar и установи `view=icon`, `size=L`. Это рабочий паттерн.

### Карточки

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Большая промо-карточка / hero-баннер | **card large 2.1** | `38c872bb91c534ad983b6c66b4b6dcfc6ee24e2c` | — | Ручной фрейм с картинкой |
| Средняя карточка (тариф, услуга, предложение) | **card medium 2.1** | `919248e681735ccd469078a8f89fca0d54270683` | — | Ручной белый фрейм |
| Маленькая карточка в 2-col сетке (товар, категория) | **card small 2.1** | `a8f3c58357660481078274137f03971f043d86c1` | — | Ручной фрейм |
| Информационный/рекламный баннер с action | **banner 2.1** | `490bdcf32834eb05085b2cc2a0169214f4f4853e` | `434f235fad5e144cab49535e208a57b871443cb6` | Ручной фрейм с фоном |
| Баннер-карточка (web) | **banner card 2.1** | — | `c181f8ac5f85df3ea700941c4d14167eefbb11fd` | banner 2.1 |
| Группа баннеров (carousel) | **banner group 2.1** | `88a0e5621a28ec3a64fd9016009aabf84aa8b76d` | `8fc5370d20b50f285a11e3ca89d9aa043da66303` | Ручной ряд баннеров |
| Газетная раскладка (mixed media) | **newspaper view 2.1** | — | `20a077ecd7b8991899a942d75603714a528444a6` | Ручная masonry-сетка |

> **Wallet-card — кастом.** Текущее состояние: собирается вручную с импортированными токенами + avatar + button + cells. Не component, а композиция.

### Контент-элементы

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Фото/инициалы пользователя (круг) | **avatar 3.0 / 4.0** | `37e7d13eef2d569028bbace869a532a626e22279` | `e565e20a138bddb3e1329bb38e088623b5caeea9` | Ручной ellipse + текст |
| Группа аватаров (стопка 2-5 шт) | **avatar group 3.0 / 4.0** | `0356c2c9e3434165104c0f3c91cbceb842b8e150` | `bfdb2122f18a5e4b97b0798f03943de5538ddbe6` | Несколько avatar с offset |
| QR-код | **qr code 2.2** | — | `c493af91ae673bc0bfcd7ed0f3e495696e400a46` | Ручной placeholder |

> **Правило avatar.** ЛЮБОЕ круглое изображение пользователя или инициалы — это **avatar**, не ручной ellipse. Варианты: `view` (image/logo/icon/text/skeleton), `size` (S/M/L/XL), `color` (brand = жёлтый Beeline).

## 6. Действия: кнопки и интерактив

### Кнопки

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Любая кнопка (CTA, вторичная, деструктивная, ghost) | **button 2.5 / 2.1** | `e091f3958e87ecfb8a446373fea1ecd020d1462b` | `535b6bbdde21f97602bf9c6260b2a0d195528215` | Ручной pill-фрейм с текстом |
| Иконка-кнопка (без текста, только иконка) | **button inline icon 2.1** | `f471bb3db31d984114b692482ea1213202e30bdd` | `8a561f76b23983f71d38f94bc34b477b681703ca` | Ручной круг с иконкой |
| Текстовая ссылка-кнопка («подробнее», «все») | **button inline text 3.0 / 2.1** | `8de7a4cdeb7ec59962d656236964b74c7c61f5ed` | `1b0e18e52590c9301ebeabc344293044c4e7036b` | Ручной текст с underline |
| Кнопка с UX-состоянием (like, bookmark, saved) | **button ux 2.0** | `2eadf2e750cbb54b40840039f1f13cb663f12272` | — | button 2.5 с toggle-логикой |
| Кнопка-плитка с иконкой (быстрое действие) | **button box 1.0** | `a3fcb3970b4a83ff943331db5ac90b973fd40163` | — | Ручной circle + label |

> **Правило button.** ЛЮБОЙ интерактивный элемент, на который пользователь нажимает для выполнения действия — это **button**. Варианты: `priority` (primary / secondary on bg_* / tertiary / destructive), `size` (large 56px / medium 44px / small 24px), `view` (text/icon), `state` (default/pressed/disabled/loading). `primary` = жёлтый (#FFC800), `secondary` = серый/прозрачный, `destructive` = красный текст.

> **Button 2.5 layout gotcha.** `size=large` имеет внешний 20px контейнер под fill-layout; редактируй его только когда экран уже владеет side spacing. Medium и small сохраняют internal padding, иначе pill визуально ломается.

> **Button inline text 3.0 (APP) — «все функции >»:** priority пишется `"seсondary"` с **кириллической «с»** (не латинской `s`). Точная строка критична для `setProperties`. TEXT: `↩︎ text#538:0`, BOOLEAN `right icon#623:0`, SWAP `❖ right icon#623:18`, chevron recolor в `content/secondary` через `recolorVectors()`. WEB `button inline text 2.1` использует нормальный латинский `secondary`.

### Клавиатура

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| iOS числовая клавиатура (с CTA-кнопкой) | **iOS_NumericKeyboard** | `eb1ea39626022a391b9b953b04d921debc078a7d` | `f7afbad4a16b862190f65619e5de8278cbd78e45` | Ручная сборка из кнопок |

> **iOS_NumericKeyboard содержит button 2.1 внутри.** При `button#931:1: true` показывается CTA-кнопка над клавиатурой. Не добавляй отдельный button компонент. Доступ к кнопке: `keyboard.findOne(n => n.name === 'button 2.1')`.

### Переключатели и выбор

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| On/off toggle | **switch 2.2 / 2.1** | `a9466b9f64985c6ea052c858aa3dd44339ec100f` | `2663584922a2f1ab74d9dcdc7e35ba5003a5f1f9` | Ручной circle + track |
| +/- счётчик количества | **stepper 2.1 / 2.2** | `0c0acd35e8464b2b726c96d1e9a34efdd50e5898` | `d5ad1d33d9ec8b327a975ac0b74ae34209982820` | Ручные кнопки + число |
| Ползунок (range slider) | **slider 2.1** | `b18ed9bb1117d7ba5d33f6ca82d76e382c3fbe49` | — | Ручной track + thumb |
| Drum-picker (крутилка значений, iOS) | **picker 2.2** | `d00a9fac6ab1873181d59e6beb21f038035c7501` | `a5ddd76ff57dc966a98400a8fcf7e55a1ae09d8f` | Ручной scrollable list |

## 7. Метки и статусы

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Текстовая метка/тег (статус, категория, фильтр) | **tag 2.3** | `24b31d42661e2df39f3b1b66efa04c4d5ce0032a` | `50cca33a43e2f604470f08b6956052f4c058277a` | Ручной pill-фрейм |
| Dot-индикатор / счётчик уведомлений (маленький) | **badge 2.2** | `6debf8f18a60ff6a93cfee132ae56fb4c6487b91` | `171654a914115b525cb010c45276bf3167fd9a78` | Ручной circle |
| Рекламная метка («Реклама», «Промо», «Хит») | **adtag 2.2 / 2.1** | `ad6d0d2c068bf1f844219320f43be9a615e8a3c2` | `7f5c499eaec6b9a19dc2fc68e555eb29a5aad373` | tag 2.3 |
| Всплывающая подсказка при hover/tap | **tooltip** | `2d7039d3b4677db45f2a17b00e9f836dd551e278` | `bd2f79fb452c4fbbfee1e5fd628e42c3b1286f70` | Ручной popover |

> **tag vs badge vs adtag:** `tag 2.3` — текстовая метка с фоном («подключено», «−30%»), размеры XS/S, цвета default/brand/invert/success/error/accent, label Regular 400. `badge 2.2` — маленький индикатор (view=dot/text/icon), накладывается. `adtag` — реклама/промо.
>
> **Tag tone — только разрешённые** (owner `carnica-ux-principles §16`): `default on bg_*` / `brand` / `invert` / `success` / `error` / `accent`. Цветной `surface-*` (yellow/green/blue/violet/magenta/teal/orange/red) как фон тэга — **ЗАПРЕЩЁН** (это фон icon-tile в карточках продуктов). Padding и radius фиксированы размером `XS` (4 8) и `S` (6 10).

## 8. Формы и ввод

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Поле ввода текста (label + input + helper) | **input 2.3** | `897ac5f2f1344d72e3a2c8c93c3b44d635e5d935` | `bd250abb67fb8654de4177224be9aaccbfe20874` | Ручной rectangle + text |
| Поле поиска (с иконкой лупы) | **search field 2.2 / 2.1** | `22e5549f6f19bb5170f5302f7ccfb921a8ad73e0` | `0ee6a86d66c97839de8e02771c69a4512b6d055f` | input 2.3 с иконкой |
| Многострочное поле ввода (textarea) | **text area 2.2** | `79cf9e1d83dc22ef61519cf45c00ed5a80d27f01` | `da9eb541c02a5898d86be7576af40e23fe62878e` | Ручной прямоугольник |
| Выпадающий список (select/dropdown) | **select 2.1 / 2.2** | `653746d94ae03f5fdbf6dca83aba0ce15152ce66` | `5c2ad52187b6831dcf29b8a5ebae05681de08716` | Ручной фрейм с chevron |
| Выбор даты (calendar) | **date picker 2.2** | `7090adca7cf94ab8f96e7729eb76cd9813d9e51a` | `b91ec030743688f7d4ac820b667947cdbf474c01` | Ручной календарь |

> **input types:** text/phone/card/month/date/range/time/password/currency/code — у каждого своя маска и клавиатура. **search field — не input!** Отдельный компонент с иконкой лупы и состояниями default/activated/entering/filled. **input reset padding** внутри form-контейнера, чтобы избежать двойного 20px; placeholder в `content/tertiary`, right view скрыт; focused — nested `state='entering'`.

## 9. Обратная связь: загрузка, ошибки, прогресс

### Загрузка

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Полноэкранная загрузка (при открытии экрана) | **loading page 2.1** | `69e167105a0aaae86e65b08e039c7ffcfe53f252` | — | Ручной spinner по центру |
| Маленький spinner внутри контента | **spinner 2.1 / 2.0** | `8e1b37482fddc4a28e1a87577cb3286d32c20197` | `0e4e20123613b6666e6d9813b6f29cc1b42f3603` | Ручной animated circle |
| Полноэкранный spinner (overlay) | **fullscreen spinner 2.1 / 2.0** | `dfd06b08d5d429be7541ccaf06a951779626f6fa` | `434d7a86095f6dad6c9eb47eb4534307a633cd40` | spinner внутри overlay |
| Skeleton-заглушки при загрузке контента | **skeleton 2.1** | `d5dfeaa17c5e141f86a2f4f06e73868c3e6df2b3` | `478b50b818a16f7dbf7b3c31c94ec39de1789808` | Ручные серые прямоугольники |
| Окно загрузки (web) | **loading window 1.0** | — | `60ee0717106c9951c40e87aa476485b134bab160` | fullscreen spinner |

### Результат и ошибки

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Полноэкранный результат (успех / ошибка / предупреждение) | **status screen 2.1** | `06b418cfc6395e243ffff3f45fce8318e0d3765a` | — | Ручная иконка + текст |
| Блок статуса (результат операции, web) | **status block 3.0** | — | `6f515d395ce5d388fb5bb5712fe2736cbcd8db78` | Ручной фрейм |
| Модальный статус (web) | **status block modal 1.0** | — | `ec3d70295a8c7607c7692deae4f9c2bd96786645` | status block в dialog |
| Пустое состояние / ошибка загрузки | **error_empty state 3.0** | `6b271a07b0aab148bd0ebbf341cfa5e7e8935eab` | `113a573d5ea6a6a405f726d0cfda51b08541c7a0` | Ручная иллюстрация + текст |
| Кратковременное уведомление (toast, snackbar) | **snackbar 2.1** | `21510f68893d428d637e329402bbc3d8594ddd3d` | `cb3b3f3dda1b0065a953409f9c5c3e01206be3fd` | Ручной floating bar |

### Прогресс

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Пошаговый прогресс (шаг 1 из 5) | **progress step bar 2.1** | `0cd7573ecc28ed0e6a4bb07f455cdef1237a3d07` | `9e4d8c4aaa22a83b587da73fae35d6b891c14b12` | Ручные circles + line |
| Линейный прогресс-бар (web) | **progress bar 2.1** | — | `afe9a2a6b5096c37bea9ba809e1edd5847f2990a` | Ручной rectangle |
| Dots-индикатор для карусели (1 / 5) | **pagination 2.2** | `d824a6e04e351ee778935ea6d0efb4c98b2d0102` | `5707b8d3efe6652bfa39f215c8306214886c8156` | Ручные dots |
| Пагинация страниц (1 2 3 ... N, web) | **page pagination 2.1** | — | `f2b6cb4e9473dc55cb628d9a6199a6d223dbfa4d` | Ручные кнопки с числами |

## 10. Оверлеи и модалки

| Тебе нужно | Компонент | APP Key | WEB Key | НЕ используй |
|---|---|---|---|---|
| Модальный диалог (подтверждение, alert) | **dialog 2.1 / 2.2** | `296b1e4a5829cff87a0098b20fd90bf685f92568` | `80728eb1c12eb5bbfc60fce63bf72df3f517b428` | Ручной overlay + card |
| Системное модальное окно (Alert iOS) | **Alert** | `0935334b715d6a21794e49a590e9fd0e96c5fa9f` | — | dialog 2.1 |
| Лист действий снизу (iOS action sheet) | **action sheet 2.1 / 2.2** | `3a9a04819490dcfbc293b37194e0f3a65bd84f44` | `8a5672ad2d973e2a69e04f0dbf13b1f8ac1ed85f` | Ручной bottom sheet |
| Полноэкранная модальная страница | **modal page 2.1** | `6f09570118fb5b7a49702965d5aad50825205ef8` | `269a0e0514794428803b95948ec177f77893ac6f` | Ручной frame на overlay |
| Bottom sheet handle | **navbar modal 1.0** + custom sheet frame | `bef5f93f4a80c3ea80f50bcfcf13403bcee1ff6d` | — | drag-handle вручную |

> **dialog vs Alert vs action sheet:**
> - **dialog** = модалка с заголовком + текстом + 1-2 кнопки (подтверждение действия)
> - **Alert** = системный iOS-алерт
> - **action sheet** = лист снизу с списком действий (поделиться, скопировать, удалить)
>
> Bottom sheet сам = кастомный VFrame с верхними радиусами; drag-handle/navbar — **`navbar modal 1.0`** (single component).

## 11. Decision trees (быстрые алгоритмы)

**Текст на экране:** заголовок секции с кнопкой → `title 2.1`; standalone текст в карточке → `createStyledText` (Approach E); текст внутри instance → `setInstanceText` (Method A).

**Список элементов:** вертикальный с иконкой+текстом+action справа → `cell 3.1`; чекбокс → `checkbox 2.1`; сворачиваемый → `accordion group 2.2`. Горизонтальный: фильтры/категории → `chips text collection 2.1`; карусель → `banner group 2.1`; сетка плиток → `cell grid 2.1` или `card small 2.1`.

**Кнопка:** с label → `button 2.5` (priority primary/secondary/tertiary/destructive); только иконка → `button inline icon 2.1`; текстовая ссылка → `button inline text 3.0`; плитка с иконкой+подпись → `button box 1.0`; toggle (like/bookmark) → `button ux 2.0`.

**Метка/бейдж:** текстовая метка («подключено», «−30%») → `tag 2.3`; dot/число-индикатор → `badge 2.2`; реклама/промо → `adtag 2.2`.

**Цвет:** всегда `importVariableByKeyAsync` + bound variable paint. Hex напрямую — запрещён.

## 12. Icon variant semantics (outline / filled / stroke)

В Carnica у части иконок есть два варианта: `outline` (контур) и `filled` (заливка с диагональной полосой = «выключенное состояние»). Выбор **семантический**, не эстетический.

| Иконка | `outline` | `filled` |
|---|---|---|
| `wifi` | сигнал есть, услуга работает | сигнала нет / wifi отключён |
| `bell` | уведомления включены | звук выключен / mute |
| `eye` | контент виден | скрыт / пароль закрыт |
| `volume` | звук есть | mute |
| `mic` | микрофон работает | выключен |
| `camera` | камера активна | выключена |

> **Правило.** На лендинге, где продаём услугу/состояние — берём `outline`. `filled` (с зачёркиванием) — только когда явно показываем «отсутствие». На карточке тарифа «интернет — 10 ₽ за 1 гб» иконка wifi должна быть `outline`, не зачёркнутая.

### Stroke variant — отдельный случай

`style=stroke` — третий вариант (без круглой обводки вокруг content):

| Icon | Когда `stroke`, не `outline` | Почему |
|---|---|---|
| `plus round` | всегда | `outline` рисует лишний круг вокруг плюса |
| `close round` (×) | когда close-button уже круглая (например `dialog__close` 44×44 white circle) | `outline`-вариант рисует второй круг внутри кнопки — визуальный дубль |

При имплементации в HTML/CSS — `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">` с двумя `<path>` для X.

Cross-link: `carnica-anti-slop` skill → P0 Копирайт и иконки.

## 13. Modal page / dialog deep dive

Когда триггер открывает overlay-окно с заголовком, контентом и/или CTA — это `dialog 2.1` (короткий confirm) или `modal page 2.1` (большой контент).

### Размеры — фиксированные L / M / S

У dialog/modal page три фиксированных ширины. **Произвольная ширина запрещена.**

| Size | Max-width (desktop) | Когда |
|---|---|---|
| `L` | 600 px | info-heavy: длинная форма, multi-step, детальная справка |
| `M` | 480 px | default: confirm с заголовком + описанием + 1-2 действия |
| `S` | 360 px | минимальный confirm, без вложенных карточек |

В CSS — модификаторы класса (`.dialog--l`, `.dialog--m`, `.dialog--s`).

### Mobile (≤768 px) → bottom sheet

Любой dialog/modal page на mobile автоматически становится bottom sheet:

- `position: fixed; bottom: 0; left: 0; right: 0`
- `border-radius: 32 32 0 0` (top corners скруглены, bottom прижат)
- Width: 100% viewport (модификаторы L/M/S перекрываются `!important`)
- `padding-bottom: max(20px, env(safe-area-inset-bottom))` (учёт home-indicator)
- Анимация `slide-up`: `translateY(100% → 0)` 320 ms `cubic-bezier(0.32, 0.72, 0, 1)` (см. `motion.md`)

### Drag-handle — НЕ применяем

Серая полоска сверху по центру (drag-handle) — это iOS-нативный action sheet паттерн. В Carnica WEB bottom-sheet drag-handle **отсутствует** — sheet закрывается через close-кнопку, тап по backdrop или Escape.

### Close-button — обязательна на всех viewport

44 × 44 круглая, `priority=secondary on bg_primary`:
- background `bg/secondary` (#FFFFFF)
- color `content/primary`
- **без border, без box-shadow** — чистый круг
- Hover: фон `elements/tertiary`
- Position: `top: 16px; right: 16px` от края card
- Иконка внутри: stroke X, 24×24, `currentColor`

На mobile-bottom-sheet close-button тоже видна (sheet не закрывается «свайпом вниз» в WEB-реализации).

### Цветовая схема внутри dialog

Pattern «серая обёртка + белые вложенные карточки»:

| Элемент | Background |
|---|---|
| `.dialog__card` (сама модалка) | `bg/primary` (#F0F3F5, серый) |
| вложенные блоки внутри (промокарточка, форма-бокс) | `bg/secondary` (#FFFFFF, белая) |
| Кнопки `priority=secondary` внутри белой карточки | `bg/tertiary` (#F0F3F5) — для контраста |

### Backdrop

`background: rgba(25, 28, 34, 0.72)` + `backdrop-filter: blur(4px)`.

### Body scroll lock

Native `<dialog>` в HTML5 **не блокирует** прокрутку body. Реализовать вручную — см. `carnica-gotchas` skill → Body scroll lock for dialog.

### Anti-pattern

- `<dialog>` с `<span class="drag-handle">` — iOS-action-sheet паттерн, не Carnica WEB.
- `@media (max-width: 768px) { .dialog__close { display: none; } }` — close-button обязательна на всех viewport.
- `.dialog__close { box-shadow: 0 0 0 1px ... }` — close без border/shadow, чистый pill.
- `<svg><path d="круг+крест"/></svg>` — outline-X запрещён, использовать stroke-X (две `<path>`).
- `.dialog { max-width: 520px }` — произвольная ширина запрещена, только L=600/M=480/S=360.

См. `carnica-anti-slop` skill → P1 Компоненты-уровни.

## 14. Анти-паттерны (полный список)

| НИКОГДА не делай | Вместо этого |
|---|---|
| `figma.createFrame()` для кнопки | `importComponentSetByKeyAsync` → button 2.5 |
| `figma.createEllipse()` для аватара | avatar 3.0 (view=text, color=brand) |
| `figma.createRectangle()` для toggle | switch 2.2 |
| `figma.createFrame()` для строки списка | cell 3.1 |
| Ручной pill-фрейм для тега/бейджа | tag 2.3 или badge 2.2 |
| Цветной `surface-*` токен (yellow/green/blue/violet/magenta/teal/orange/red) как фон тэга | `tag 2.3` c color = `default`/`brand`/`invert`/`success`/`error` (см. ux-principles §16) |
| Написание UI-текста CAPS-ом или CSS `uppercase` | Lowercase всегда, исключения — имена/бренды/адреса/аббревиатуры |
| Точка в конце последнего предложения подписи/кнопки | Убрать точку (разделитель внутри абзаца — оставить) |
| Ручной фрейм для карточки | card large/medium/small 2.1 |
| Ручной текст + кнопка для заголовка секции | title 2.1 |
| Ручные dots для пагинации | pagination 2.2 |
| Ручной прямоугольник для разделителя | divider horizontal 2.0 |
| Ручной spinner/loading | spinner 2.1 или loading page 2.1 |
| Hex-цвета напрямую (`solid('#FFC800')`) | `importVariableByKeyAsync` → переменные Carnica |
| `figma.createText()` без стиля | `createStyledText` с ключом из 02_Carnica typography |
| Ручной фрейм для поля ввода | input 2.3 (type=text/phone/card...) |
| Ручные chip-кнопки в ряд | chips text collection 2.1 |
| `figma.createFrame()` без `f.fills = []` | Всегда очищать fills — frames по дефолту белые |
| `resetPadding(btn)` без проверки size | Обнулять padding только у `size=large`; medium сохраняет defaults |
| `plus round` с `style=outline` | `plus round` ТОЛЬКО `style=stroke` (единственное исключение) |
| Chevron в cell/button inline text с default цветом | Перекрасить в `content/secondary` через `recolorVectors()` |
| Absolute positioned дети в auto-layout без `layoutPositioning='ABSOLUTE'` | Явно устанавливать `layoutPositioning='ABSOLUTE'` |
| Drag-handle сверху в WEB bottom-sheet | Убрать — это iOS-паттерн |
| Закрытие dialog только swipe-down на mobile | Close-button обязательна на всех viewport |
| `font` shorthand с `inherit` family для button | Использовать отдельные `font-weight: 500` + `font-family: ...` (Safari ignores shorthand) |

## 15. Checklist перед каждой секцией экрана

Перед написанием кода `use_figma` для каждой секции:

- [ ] Составил список UI-элементов в секции
- [ ] Для каждого элемента проверил — есть ли компонент в таблицах выше
- [ ] Для каждого компонента записал: key, нужный variant, какие свойства менять
- [ ] Все цвета — через `importVariableByKeyAsync`, ни одного hex
- [ ] Все тексты вне компонентов — через `createStyledText` с ключом стиля
- [ ] Все тексты внутри компонентов — через Метод A (Inter Fallback)
- [ ] Ручные фреймы — ТОЛЬКО для layout-контейнеров (wrapper, section, spacer)
- [ ] Все `createFrame()` имеют `f.fills = []` (helper `createVFrame` должен делать это автоматически)
- [ ] Все cell 3.1 с right view — chevron перекрашен в `content/secondary`
- [ ] Plus round иконка использует `style=stroke` (не outline)
- [ ] Button 2.3 medium не получил `resetPadding` (только large обнуляем)
- [ ] Tag tone — только `default`/`brand`/`invert`/`success`/`error` (не surface-*)
- [ ] navbar modal импортирован как single component (`importComponentByKeyAsync`)
- [ ] avatar в cell grid имеет `size=L` (не дефолт M)
- [ ] APP `button inline text 3.0` priority пишется кириллической «с» (`"seсondary"`)

---

*Owner: `carnica-components` skill (D-08 leaves rule).*
