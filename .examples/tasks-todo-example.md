# План работ: WEB-модалка документов для инклюзивных категорий

## Цель

Сгенерировать в указанном Figma-файле читаемую WEB-модалку для лендинга: сохранить весь пользовательский текст про 5 категорий, но разложить его так, чтобы человек быстро понял, какие документы нужны и какие совпадения ФИО проверить.

## Checklist

- [x] Прочитать canonical rules: `rules/*`, `DESIGN.md`, `tasks/lessons.md`.
- [x] Определить платформу: WEB.
- [x] Прочитать WEB component passport `carnica-ui-kit-web`.
- [x] Инспектировать целевой Figma node `461:3181`: страницу, окружение, переменные, стили, компоненты.
- [x] Сделать component shopping list для модалки.
- [x] Сгенерировать модальное окно в Figma рядом с целевым контекстом.
  - Блокер: первая попытка остановлена атомарно из-за недоступного `Beeline Sans Medium`; нужно проверить точные font names/styles в Figma и повторить без частичной записи.
  - Решение: Beeline Sans отсутствует в runtime; безопасный порядок для standalone text — временно задать символы на Inter, затем применить Carnica text style. Финальный style id остаётся Carnica/Beeline, после генерации нужен `Fix BeelineSans`.
  - Уточнение: `textAutoResize` и выравнивание тоже нужно ставить до применения Carnica text style; после style Figma снова требует недоступный Beeline font.
  - Repair: системный `modal page 2.1` успешно импортируется, но для высокого custom content обрезает верх; для финального макета нужен custom shell с Carnica tokens/components внутри.
- [x] Проверить screenshot результата и исправить визуальные проблемы.
- [x] Провести финальную QA по `rules/qa-scorecard.md`.
- [x] Записать review с node id, проверками, UX-решениями и напоминанием `Cmd+Shift+P` -> `Fix BeelineSans`.

## UX-решение

- Модалка для WEB: desktop modal wide `L`-логика, без нового кода; `M` тесен для полного текста и проверок ФИО.
- Внутри: заголовок, короткое объяснение, поиск/быстрая навигация по 5 категориям, карточки категорий, отдельные блоки “документы” и “что проверить”.
- Весь исходный текст сохраняется: формулировки документов, условия подключения, проверки ФИО и виды документов об опекунстве.
- Для ускорения поиска: категории пронумерованы, документы вынесены первыми, проверки ФИО отделены от документов, длинная категория с опекунством получает отдельную вложенную структуру.
- Тон: практичный справочник, без маркетингового шума.

## Component shopping list

- `modal page 2.1` WEB key `269a0e0514794428803b95948ec177f77893ac6f`, если импорт и swap content подходят; fallback — custom modal wrapper по правилам layout.
- `button 2.1` WEB key `535b6bbdde21f97602bf9c6260b2a0d195528215`: кнопка “понятно”.
- `button inline icon 2.1` WEB key `8a561f76b23983f71d38f94bc34b477b681703ca`: close action, если компонент корректно импортируется.
- `search field 2.1` WEB key `0ee6a86d66c97839de8e02771c69a4512b6d055f`: визуальный поиск по категории.
- `chips text collection 2.2` WEB key `cbd0f0231ee410d509306c8db111e4f5b41d9db1`: быстрый фильтр по категориям, если property discovery даст безопасные text overrides; fallback — custom pill wrappers.
- Standalone text: Carnica typography styles, Approach E.
- Цвета: только bound variables из Carnica, fallback RGB соответствует токенам.

## Review

Сгенерировано в Figma:

- Page: `modal` (`461:3181`).
- Generated node: `488:2844` — `Generated / inclusive docs modal`.
- Формат: WEB desktop modal, custom token-bound shell `1440x900`, sheet `960x820`, clipped scroll viewport `960x598`.

UX-решения:

- Весь исходный текст разложен по 5 категориям.
- Документы вынесены первыми, проверки ФИО отделены в колонку `что проверить`.
- Добавлен быстрый поиск и compact pills: `пенсионеры`, `инвалидность`, `дети до 14`, `опекуны`, `ВОГ`.
- Добавлен блок `как быстрее найти нужные документы`: сначала категория, затем владелец номера, затем сверка ФИО.
- Для длинного опекунства вынесен отдельный вложенный блок с видами документов.

Использованные Carnica assets:

- `search field 2.1` WEB.
- `button inline icon 2.1` WEB + `close round`.
- `overlay/L` из `01_Carnica colors 2.0`.
- Carnica text styles: `headline/small`, `body/small`, `body/accent/small`, `caption/accent/medium`.
- Local Carnica variables: `bg/*`, `elements/*`, `brand/primary`, `content/*`, `surface/yellow`, `border/secondary`.

Repairs:

- `modal page 2.1` был проверен, но для высокого custom content обрезал верх в screenshot. Итоговый shell собран вручную как layout-layer с Carnica tokens/components внутри.
- `chips text collection 2.2` оставлял дефолтный label `финансы` в screenshot, поэтому quick pills сделаны custom token-bound fallback.
- `button 2.1` держал label `понятно` в node data, но screenshot рендерил `кнопка`; footer CTA заменён на custom token-bound button.
- Beeline Sans отсутствует в runtime; standalone text создан через временный Inter, затем применены Carnica text styles. После генерации нужен `Cmd+Shift+P` -> `Fix BeelineSans`.

Проверка:

- `get_screenshot(488:2844)`: верх модалки виден, pills корректные, CTA показывает `понятно`, scroll viewport показывает начало списка.
- Text verification: `missing=[]` по ключевым фразам исходного текста, включая документы, проверки ФИО и виды опекунских документов.
- Paint verification: `directFinalPaintNodes=[]`; final fills bound к variables.
- Text style verification: `nonCarnicaText=[]`; standalone text имеет Carnica style id.
- Layout verification: `framesWithoutAutoLayout=[]`; containers на auto-layout.
- Scorecard draft: Structure 26/30, Components 18/25, Visual 18/20, Spacing 14/15, Typography 9/10 = 85/100 pass.
