# VK Figma DS Generator POC

Изолированный эксперимент, который проверяет два шага будущего генератора:

1. извлечение published component keys из выбранных реальных Figma instances;
2. импорт этих компонентов по ключу и создание связанных library instances.

Плагин не содержит AI, не копирует VK-компоненты и не рисует их визуальную часть.

## Структура

- `src/code.ts` — Figma main thread: extraction и создание instances;
- `src/figma-plugin.d.ts` — узкая TypeScript-декларация используемой части Plugin API;
- `ui.html` — два независимых режима UI;
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

## Граница POC

- создаётся максимум три test instances за один запуск;
- component properties экспортируются для анализа, но пока не применяются при создании;
- нет prompt/AI generation;
- нет копии design system;
- нет hardcoded VK component keys;
- нет ручного построения визуалов.
