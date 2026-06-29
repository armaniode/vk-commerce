# Golden Sample 4: Форма с состояниями

## Метаданные

```markdown
Figma node эталона: 220-7968
```

- **Figma node результата:** `258-1383`
- **Дата:** 2026-04-14
- **Итерации:** 3 из 3
- **Статус:** pass (92%)

## Промпт

```
Пошаговый workflow через use_figma:

1. Импорт компонентов: navbar 3.0, input 2.3, checkbox 2.1, button 2.3, iOS_NumericKeyboard
2. Main frame: 375×812, cornerRadius 32, bg background/primary, auto-layout VERTICAL
3. Navbar 3.0 (view=default) → FILL horizontal, скрыть right view (❖ right view settings)
4. Form content frame: auto-layout VERTICAL, padding 20px sides + 24px top, gap 24px, FILL vertical
5. Input 1 (type=text): label "город, улица, дом", value "г Кострома, ул Маршала Тимошенко, д 24", textTruncation DISABLED
6. Input 2 (type=text): label "квартира или офис", value "127"
7. Input row (HORIZONTAL, gap 24px): 2 inputs type=text, label opacity 0, value = "подъезд"/"этаж" в content/tertiary
8. Checkbox 2.1 (activated=true): label right "я соглашаюсь на обработку персональных данных"
9. iOS_NumericKeyboard: button#931:1 = true, button text "сохранить", sale#10904:0 = false
10. Скрыть на всех inputs: right view settings (scanner qr), caption settings
```

## Оценка


| Критерий                          | Вес      | Оценка (0-100) | Комментарий                                                                                                                                                                |
| --------------------------------- | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Структура (auto-layout, иерархия) | 30%      | 92             | Корректная иерархия. Input 2 state=entering с жёлтым курсором. Navbar right view через VARIANT property. Input padding обнулён                                              |
| Компоненты (правильные Carnica)   | 25%      | 95             | Все из библиотеки. Правильные variants: state=filled/entering/default. setProperties на nested instances. Ничего вручную                                                    |
| Визуальное сходство               | 20%      | 90             | Input 1 — 2 строки как в эталоне. Жёлтый курсор на input 2. Checkbox с mixed fills. Navbar title по центру. Все тексты корректны                                           |
| Spacing                           | 15%      | 88             | Form px=20, gap=24. Input paddingLeft/Right=0 (без двойного padding). Достаточно воздуха между checkbox и button                                                           |
| Типографика                       | 10%      | 90             | Все textStyleId привязаны к Carnica typography. BeelineSans корректен. setRangeFills для mixed colors checkbox                                                              |
| **Итого**                         | **100%** | **92%**        | **PASS.** Все 4 замечания исправлены: 2-строчный перенос, entering state, mixed fills, VARIANT right view                                                                  |


## Что сработало

- Импорт всех компонентов из Carnica библиотеки через `importComponentSetByKeyAsync`
- Auto-layout для всех контейнеров (VERTICAL main, HORIZONTAL input row)
- Половинная ширина inputs через HORIZONTAL фрейм с gap 24px
- iOS_NumericKeyboard из Carnica APP с включённой кнопкой (`button#931:1`)
- Цвет background/primary через `importVariableByKeyAsync`
- Method A (Inter fallback) для изменения текстов в инстансах
- Скрытие лишних элементов (navbar right view, input scanner QR, captions)
- Плейсхолдер-состояние через opacity 0 на label + content/tertiary цвет

## Что не сработало / отклонения

- BeelineSans рендеринг в MCP sandbox: тексты показывают Inter-глифы с нулевой шириной → визуально не обновляются
- Checkbox label right: `setProperties({'label right#8763:53': true})` не сработал для BOOLEAN — пришлось менять `.visible` напрямую
- Checkbox текст невидим в скриншоте MCP (BeelineSans 0-width glyph issue)
- Не реализовано: фокусный курсор (жёлтый `.divider vertical S 1.0`) на input 2
- Navbar title не центрирован идеально (titleWrapper имеет paddingRight для скрытого right view)

## Workaround-ы

- **BeelineSans тексты**: данные корректны в node.characters и componentProperties — `Fix BeelineSans` плагин восстанавливает отображение
- **Checkbox BOOLEAN**: прямое `node.visible = true` вместо `setProperties`
- **Input placeholder state**: opacity 0 на label settings + fills с content/tertiary переменной
- **Input scanner icon**: `rightViewSettings.visible = false`

## Компоненты


| Компонент              | Ожидался                                   | Использован                | Корректно?       |
| ---------------------- | ------------------------------------------ | -------------------------- | ---------------- |
| navbar 3.0             | `37960573b758b856e27d9ab2dfe2d0b4669d5ee9` | ✅ (view=default)           | ✅                |
| input 2.3              | `897ac5f2f1344d72e3a2c8c93c3b44d635e5d935` | ✅ ×4 (type=text)           | ✅                |
| checkbox 2.1           | `469a4c4664a7d9e66e638d54fdfa0312a03b820a` | ✅ (activated=true)         | ✅                |
| button 2.3             | `c808290e7fd6d8a2fb91f294ff8c9340bcad08cb` | button 2.1 inside keyboard | ⚠️ другая версия |
| iOS_NumericKeyboard    | `eb1ea39626022a391b9b953b04d921debc078a7d` | ✅                          | ✅                |
| StatusBar              | внутри navbar 3.0                          | ✅ (автоматически)          | ✅                |
| divider horizontal 2.0 | внутри input 2.3                           | ✅ (автоматически)          | ✅                |


## Выводы для rules

- **Добавить в figma-workflow.md**: checkbox `setProperties` для BOOLEAN может не работать — использовать прямое `node.visible` как fallback
- **Добавить в component-properties.md**: паспорт checkbox 2.1 с BOOLEAN/TEXT ключами
- **Добавить в component-properties.md**: паспорт iOS_NumericKeyboard — `button#931:1` (BOOLEAN), `predictive#931:4` (BOOLEAN), `dark mode` (VARIANT)
- **Добавить в figma-workflow.md**: input 2.3 type=text по умолчанию показывает filled state. Для placeholder state нужно: label settings opacity=0 + value fills→content/tertiary + right view settings hidden
- **Добавить в component-decision-rules.md**: iOS_NumericKeyboard содержит button 2.1 внутри — не нужен отдельный button компонент при использовании клавиатуры

## История итераций

### Итерация 1

- Промпт: пошаговый build через use_figma (см. выше)
- Результат: 79.5% — структура корректна, все компоненты из библиотеки
- Проблемы:
  1. BeelineSans не рендерится в MCP sandbox (известное ограничение)
  2. Checkbox setProperties для BOOLEAN не работает
  3. Нет фокусного курсора на input 2
  4. Navbar title centering с hidden right view

### Итерация 2

- Изменения: Fix BeelineSans плагин восстановлен из git-истории и применён. Spacing формы уменьшен (paddingTop 24→12, itemSpacing 24→16) чтобы контент помещался.
- Результат: 84% — **PASS**. Все тексты отображаются корректно в BeelineSans. Checkbox текст виден.
- Оставшиеся отклонения:
  1. Input 1 переносится на 3 строки (эталон — 2) из-за меньшей ширины текстовой области (255px vs ~295px в эталоне)
  2. Нет фокусного курсора (жёлтый divider) на input 2
  3. Checkbox текст одноцветный (эталон — mixed secondary + primary fills)
  4. Мало вертикального воздуха между checkbox и кнопкой

### Итерация 3

- **4 фикса** по ревью пользователя:
  1. **FIX 1 — Input padding**: `input.paddingLeft=0, paddingRight=0` на всех инстансах input 2.3. Убрал двойной padding (20px form + 20px input). Текстовая область: 255px → 295px. Адрес теперь на 2 строки.
  2. **FIX 2 — Input state**: `textInputSettings.setProperties({ 'state': 'entering' })` на input 2. Жёлтый курсор появился.
  3. **FIX 3 — Checkbox mixed fills**: `labelRight.setRangeFills(0, 25, [secondaryPaint])` + `setRangeFills(25, 45, [primaryPaint])`. Двухцветный текст.
  4. **FIX 4 — Navbar VARIANT**: `settings.setProperties({ 'right view': 'false' })`. Title "адрес" по центру без смещения.
- **Discovery findings** (новые ключи для rules):
  - navbar `settings`: `right view` (VARIANT), `left view` (VARIANT), `title#27239:0` (BOOLEAN), `↩︎ title#27230:0` (TEXT)
  - input `text input settings`: `state` (VARIANT: default/entering/filled), `↩︎ text inside#28956:0` (TEXT), `↩︎ placeholder#28890:4` (TEXT), `right view#142:32` (BOOLEAN), `label#122:65` (BOOLEAN), `caption#122:58` (BOOLEAN)
  - input `label settings`: `↩︎ label#28885:1` (TEXT)
- Результат: **92% — PASS**