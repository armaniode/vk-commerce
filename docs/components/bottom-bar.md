# Bottom Bar

`BottomBar` — composition shell для нижней части мобильного интерфейса: Tab Bar и дополнительных bottom accessory regions. Компонент управляет порядком, spacing и progressive background, но не реализует содержимое слотов.

## Public API

```tsx
<BottomBar
  appearance="default"
  actions={<Button size="large" width="filled">Продолжить</Button>}
  bottomSlot={<CustomAccessory />}
  tabBar={<ProductTabBar />}
  snackbar={<ProductSnackbar />}
  keyboardVisible={false}
  blur
  homeIndicator={false}
  platform="ios"
  theme="light"
/>
```

Основные props:

- `appearance`: `default | overlay`, по умолчанию `default`;
- `actions`: action row с padding 16×12px, gap 8px и reference minimum content height 52px;
- `bottomSlot`: фиксированная region высотой 48px;
- `tabBar`: slot внутри region высотой 48px и horizontal padding 10px;
- `snackbar`: slot с wrapper padding 16×8px и minimum body height 56px;
- `keyboardVisible`: включает layout для видимой системной клавиатуры;
- `blur`: показывает подтверждённый progressive gradient/background-blur layer, по умолчанию `true`;
- `homeIndicator`: явно включает source-fidelity iOS Home Indicator, по умолчанию `false`;
- `showIndicator`: управляет видимостью indicator внутри включённой iOS region;
- `theme`: `light | dark`, по умолчанию `light`;
- `platform`: `ios | android | desktop | vkcom`, по умолчанию `ios`;
- `className`: дополнительный класс root.

## Region order

При `keyboardVisible={false}` regions идут сверху вниз:

1. `snackbar`;
2. `actions`;
3. `bottomSlot`;
4. `tabBar`;
5. optional iOS Home Indicator.

При `keyboardVisible={true}` остаются только:

1. `actions`;
2. `bottomSlot`.

Системная клавиатура существует за пределами `BottomBar`. Компонент не рисует keyboard keys и не резервирует высоту операционной клавиатуры.

## Appearance и progressive background

`default` использует подтверждённый светлый progressive gradient, `overlay` — тёмный. В normal layout gradient выступает вверх на 42px, в keyboard layout — на 38px.

Gradient stops и browser backdrop blur остаются component-local: в текущем публичном foundation нет точных Bottom Progressive gradient tokens. Spacing, rounded geometry и Home Indicator color берутся из существующих foundations.

`blur={false}` скрывает progressive background layer, как source boolean. Box shadow для имитации blur не используется.

## Home Indicator

Home Indicator — опциональная source-fidelity capability только для iOS:

- region: 34px;
- indicator: 144×5px;
- bottom padding: 8px;
- полностью округлённая форма;
- color: semantic `icon.primary`.

По умолчанию `homeIndicator={false}`. Vibe-coded prototypes не должны рисовать системный chrome без отдельного явного запроса. На Android, Desktop и vkCom indicator не рендерится.

## Accessibility

`BottomBar` не добавляет `navigation`, `tablist` или другие роли: назначение зависит от переданных slots. Семантика кнопок, tabs и snackbar content остаётся ответственностью потребителя.

## Намеренно отложено

Текущая реализация не создаёт отдельные production-компоненты:

- `TabBar`;
- `Snackbar`;
- `Keyboard`.

`Button` и Lego `Icon` используются только потребителями и visual QA; `BottomBar` не hardcode-ит конкретные действия или application icons.
