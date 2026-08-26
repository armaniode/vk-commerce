# VK Figma DS Generator POC

Изолированный эксперимент, который проверяет три шага будущего генератора:

1. извлечение published component keys из выбранных реальных Figma instances;
2. импорт этих компонентов по ключу и создание связанных library instances;
3. сборку editable mobile screen из независимых registry JSON и screen specification JSON.

Плагин не содержит AI, не копирует VK-компоненты и не рисует их визуальную часть.

## Структура

- `src/code.ts` — Figma main thread: extraction, property matching и создание instances/screens;
- `src/figma-plugin.d.ts` — узкая TypeScript-декларация используемой части Plugin API;
- `ui.html` — три режима UI, property inspector и generation report;
- `manifest.json` — local development manifest;
- `dist/code.js` — результат локальной сборки, не хранится в Git.

## Локальная сборка

Требуется Node.js и npm.

```bash
cd experiments/figma-ds-generator
npm install
npm run check
npm run build
```

## Загрузка в Figma

1. Открой Figma Desktop.
2. Выбери `Plugins → Development → Import plugin from manifest…`.
3. Укажи `experiments/figma-ds-generator/manifest.json`.
4. Запускай плагин через `Plugins → Development → VK DS Generator POC`.

Перед тестом включи нужную опубликованную VK-библиотеку в целевом Figma-файле и убедись, что у аккаунта есть к ней доступ.

## Первый ручной тест

### 1. Build registry from selection

1. В consumer-файле создай 2–3 настоящих instances из опубликованной VK-библиотеки.
2. Выдели сами instance layers.
3. Запусти плагин и нажми `Build registry`.
4. Проверь JSON: у каждой записи должны быть `figmaKey`, точное имя main component и доступные component properties.
5. Нажми `Copy JSON` при необходимости.

Ключ относится к конкретному выбранному main component/variant. Если выбраны разные variants одного component set, реестр сохраняет каждую уникальную пару name/key отдельной записью.

### 2. Create test instances

1. Вставь registry JSON в поле плагина.
2. Нажми `Create test instances`.
3. Плагин возьмёт первые три корректные записи, вызовет `figma.importComponentByKeyAsync(figmaKey)` и затем `createInstance()`.
4. На текущей странице появится новый vertical Auto Layout frame `VK DS registry test instances`.
5. В Layers проверь, что его дети имеют тип `INSTANCE` и сохраняют связь с опубликованной библиотекой.

Плагин не создаёт fallback frames или SVG. Если ключ не опубликован, библиотека недоступна либо у пользователя нет доступа, операция завершается явной ошибкой.

### Inspect real properties

Кнопка `Inspect real properties` рядом с registry импортирует каждый component key во временный instance, читает его фактические `componentProperties`, definitions и вложенные text nodes, выводит результат в UI и удаляет только временный instance. Для каждого property видны:

- полное имя, включая Figma-generated suffix при его наличии;
- тип;
- current/default value;
- variant options;
- preferred component values.

Этот report — источник истины для adapter mapping конкретной версии опубликованной библиотеки. Ключи компонентов в generator logic не хардкодятся.

## Тест screen generation

### 3. Create screen from spec

1. Собери registry из реальных instances через первый режим. Registry должен содержать записи, которые используются в `screen.children[].component`.
2. Оставь registry JSON в первом textarea.
3. В третьем режиме вставь или отредактируй screen specification JSON. По умолчанию там находится пример `Edit community` шириной `393px`.
4. Нажми `Create screen`.
5. Проверь новый frame с именем из `screen.name`:
   - width равен `screen.width`;
   - layout — vertical Auto Layout;
   - vertical sizing — Hug contents;
   - device frame, status bar и фиксированная mobile height отсутствуют;
   - каждый успешно созданный ребёнок имеет тип `INSTANCE` и сохраняет связь с published library component.
6. Проверь `Generation report` в UI. Он отдельно показывает:
   - созданные instances;
   - применённые свойства и их точные Figma property names;
   - пропущенные или неоднозначные свойства;
   - отсутствующие registry components;
   - ошибки импорта.

В стандартном spec Button получает `"stretched": true`: adapter сначала пытается включить реальный `Width=Filled` variant, если он опубликован, а затем задаёт instance `layoutSizingHorizontal=FILL` как прямому ребёнку screen Auto Layout.

Успешный ручной результат текущей итерации:

- Top Bar показывает `Редактирование`;
- первые два Form Fields показывают `Название` / `Моя студия` и `Короткое имя` / `mystudio`;
- Button показывает `Сохранить изменения` и занимает доступную ширину;
- непосредственные дети screen frame остаются `INSTANCE`;
- в generation report нет detach/recreation, а для каждого semantic prop указан точный component property либо text-node override fallback.

Ошибка одного child не отменяет экран: этот item пропускается, остальные продолжают создаваться.

## Semantic adapters и property matching

Плагин разделяет generic screen spec и authoring API Lego Kit:

`screen spec → semantic adapter → actual component property / safe text override → real INSTANCE`

Для текущего QA добавлены небольшие adapters:

- `Top Bar.title`;
- `Form Fields.label` и `Form Fields.value`;
- `Button.text` и `Button.stretched`.

Source audit текущих Lego Kit variants показал:

- Top Bar публикует layout/appearance/swap properties, но видимый `Title` остаётся вложенным text node;
- Form Fields публикует `Label` как boolean visibility, `Caption Value` как отдельный text property и content instance swap, но текст label и значение вложенного field не являются корневыми semantic text properties;
- Button публикует `Width` (`Hugged` / `Filled`) и content swap, но строка `Button` остаётся вложенным text node;
- Avatar в текущем screen spec не получает semantic props и сохраняет source defaults/native size.

Полные runtime names (включая `#property-id`) зависят от импортированного main component/variant и всегда показываются property inspector, а не записываются в screen spec.

Adapter читает реальные `instance.componentProperties` после создания instance и передаёт найденное полное имя в `instance.setProperties()`.

- exact property name имеет высший приоритет;
- для `title`, `label`, `value` и `text` разрешены ограниченные очевидные aliases только среди `TEXT` properties;
- boolean применяется только к точно совпавшему `BOOLEAN` property;
- `VARIANT` применяется только при точном совпадении имени;
- `INSTANCE_SWAP`, `SLOT`, сложные values и неоднозначные совпадения не подменяются и попадают в отчёт;
- одно Figma property не используется повторно для двух requested props.

Если semantic text не опубликован как component property, adapter допускает только заранее подтверждённый text-node override внутри instance. Он:

- находит text node по source default text/node name, а не по позиции в layer tree;
- прекращает операцию при неоднозначности;
- загружает все фактические fonts диапазона через `figma.loadFontAsync()`;
- не работает при missing font;
- меняет `characters`, сохраняя родительский library `INSTANCE` и не вызывая detach.

При наличии настоящего exposed `TEXT` property fallback не используется.

Registry остаётся независимым от screen spec: component keys никогда не записываются в generator logic.
Registry lookup нормализует только безопасные различия: case/whitespace, декоративные символы, slash-path segments, version suffix и Figma variant assignments вроде `Error=Off, Group=None`. Совпадение всегда должно быть точным по одному из полученных aliases; приблизительный fuzzy match с посторонним component name не выполняется. Если несколько entries дают один безопасный alias, lookup считается неоднозначным и ничего не выбирает.

Structural/variant properties применяются до nested text overrides. Это важно для Button: переключение `Width` заменяет variant subtree, поэтому сначала устанавливается `Width=Filled`, затем находится фактически видимый `Button` text node, загружается его реальный font и только после этого меняются characters. Generation report показывает полный node path и font использованного text node.

## Граница POC

- создаётся максимум три test instances за один запуск;
- screen generator применяет безопасно сопоставленные string/boolean component properties и ограниченные semantic adapters;
- неподтверждённые nested texts, неизвестные authoring names и instance-swap content остаются default и отражаются в отчёте;
- full-width применяется только к достаточно широким source instances; компактные и примерно квадратные instances сохраняют native size;
- top-level frame использует простой gap `16px`, не пытаясь воспроизвести продуктовый layout вне заданного spec;
- нет prompt/AI generation;
- нет копии design system;
- нет hardcoded VK component keys;
- нет ручного построения визуалов.
