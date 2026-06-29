# Golden Sample 1: Главный экран (редизайн)

## Метаданные

- **Figma node эталона:** `217-39898`
- **Figma node результата:** `325-6229`
- **Дата:** 2026-04-15
- **Итерации:** 3 из 3
- **Статус:** needs-iteration (верх ~85-90%, низ ~60%, итого ~75%)

## Финальная оценка

| Критерий | Вес | Оценка (0-100) | Комментарий |
|----------|-----|----------------|-------------|
| Структура (auto-layout, иерархия) | 30% | 75 | Full scroll 2667px. Карточки на сером фоне без белого wrapper. Лента — единый белый блок с 5 секциями. Верхняя часть близка к идеалу |
| Компоненты (правильные Carnica) | 25% | 75 | navbar 3.0 glass, cell grid 2.1 (иконки four-square/settings/basket, текст обновлён), button 2.3 primary/secondary, avatar group S count=4, bundle button = settings icon |
| Визуальное сходство | 20% | 65 | Верх 85-90% (оценка пользователя). Лента: правильная структура (5 секций), но нет изображений, обложек. Placeholder-ы вместо реального контента |
| Spacing | 15% | 80 | 72px gap, 32px radius, 20px padding, 4px gap, asymmetric cards. Правильные отступы |
| Типографика | 10% | 80 | Числа Regular 400. Account body/accent/small CENTER. Заголовок ленты body/accent/small secondary |
| **Итого** | **100%** | **75%** | |

## Инсайты, зафиксированные в rules

### design-system.md
Добавлены 8 variable keys:
- `background/secondary` (#FFF): `9173866ad1bf4a57a0f66d09d014f15127b6fef5`
- `brand/primary` (#FFC800): `90e4493a54d99ec93767bd9ce5517a01ec51aec7`
- `elements/primary` (#FFF): `c8f24d970f4f52f6b3582c65592ac701da0fa99d`
- `elements/secondary`: `2740932dce0080a59576d535127f2abf3ce6f003`
- `elements/tertiary` (#E2E6ED): `c410b0e6e71a6788e935fd4ad0cbefd0f973966d`
- `elements/active`: `847ed99901837f3c79b71c72d382d7911656a26c`
- `elements/disabled`: `371a73280dc029ebf493ffe0b3b28c827307c281`
- `background/secondary fake-invert`: `6b83be967943908737b317c15dbd717c7f56acf4`

### component-properties.md
- **navbar 3.0**: полный discovery settings (`style=glass/default`, `background`, 2nd button через `2 button#27230:17`)
- **navbar buttons**: L/R/2R button settings — style, priority, badge, icon swap
- **navbar icon recolor**: рецепт recolorVectors для VECTOR-нод
- **avatar group 3.0**: variant properties `size` (S/M/L/XL), `count` (1-11), `disabled`

### figma-workflow.md
9 новых layout-правил:
1. Числовые значения — Regular 400, не Medium 500
2. textAutoResize: WIDTH_AND_HEIGHT для HUG-контейнеров
3. Полный скролл — primaryAxisSizingMode = AUTO
4. Скругление 32px для внешних блоков
5. Padding 20px для карточек
6. Белый wrapper не всегда нужен
7. Асимметричная сетка карточек (43/57%)
8. Заголовок-label body/accent/small над контентным блоком

### ux-principles.md
2 новых принципа:
- **#13 Продуктовая лента (feed)**: структура ленты с секциями, визуальный якорь + заголовок + CTA
- **#14 Асимметричная сетка карточек**: паттерн чередования ширин

### design-references.md
- **#8 Главный экран (редизайн)**: navbar glass, account section, контент без wrapper, продуктовая лента

### component-decision-rules.md
- **Паттерн label-заголовок**: body/accent/small как альтернатива title 2.1

## Компоненты

| Компонент | Ожидался | Использован | Корректно? |
|-----------|----------|-------------|------------|
| navbar 3.0 | glass, 2 right btns, badge=dot | glass, 2 right btns, badge=dot | ✅ |
| cell grid 2.1 ×3 | конкретные иконки/текст | four-square/settings/basket, услуги/лучшее/магазин | ✅ |
| button 2.3 (balance) | primary, icon | primary, icon | ✅ |
| button 2.3 (bundle) | secondary, settings icon | secondary, settings | ✅ |
| button 2.3 (CTA) | secondary, text | secondary, text | ✅ |
| avatar group 3.0 | size=S, count=4 | size=S, count=4 | ✅ |
| title 2.1 | — (label pattern) | body/accent/small text | ✅ |
| tabbar beeline 3.0 | bottom | single component | ✅ |
| dot progress ×3 | LTR, body/small 400 | 300 dots, correct | ✅ |

## Discovery: cell grid 2.1

- **TEXT** `⇧ title#6748:0`: setProperties **не работает** — менять через Method A на text node `label`
- **Иконка**: avatar → `❖ icon` → swapComponent с outline variant из 04_Carnica icons
- **Verified icons**: four square (`8197c7ea96dfc1ad0dbb369d71bf28089fb1194e`), settings (`5604ae221e2c126ae4b5558ffc9c148c95fe4c8b`), basket (`6933b65a239206ed4d9ca1864148bbf892991d1e`)

## Что осталось для улучшения (будущие итерации)
- Stories: реальный компонент story cover вместо placeholder circles
- Лента: изображения/обложки вместо серых placeholder
- Navbar: конкретные иконки (аватар слева, bell справа, 2я кнопка)
- Bundle card: иконка settings вместо four-square

## История итераций

### Итерация 1 (node: 311-826, удалена)
- Оценка пользователя: ~40%
- 12 критических замечаний: тёмный phone pill, белый wrapper, 16px radius, 16px padding, 812px fixed, нет navbar, неправильный account name

### Итерация 2 (node: 325-6229)
- Полная перестройка с учётом 10 из 12 замечаний
- Верхняя часть значительно улучшена

### Итерация 3 (node: 325-6229, in-place fixes)
- Navbar glass + 2nd button + badge=dot + icon recolor
- Числа Regular 400, avatar group count=4, asymmetric cards
- Лента "Другие продукты" перестроена: один белый блок с 5 секциями
- Верхняя часть: ~85-90% (оценка пользователя)
- Итого: ~72%
