# Top Bar

`TopBar` — composition-компонент верхней части интерфейса. Он отвечает за progressive background, порядок regions и подтверждённую geometry, но оставляет содержимое действий и дополнительных областей потребителю.

```tsx
<TopBar
  before={<BackAction />}
  title="Каталог"
  actions={[<SearchAction key="search" />]}
/>
```

## Public API

- `appearance?: 'default' | 'overlay' | 'no-blur-overlay'` — визуальный контекст, по умолчанию `default`;
- `title?: ReactNode` — стандартный однострочный title;
- `titleAfter?: ReactNode` — optional content после title;
- `middle?: ReactNode` — полностью заменяет стандартную композицию `title + titleAfter`;
- `before?: ReactNode` — optional leading content;
- `actions?: TopBarActions` — от одного до четырёх trailing actions;
- `bottomSlot?: ReactNode` — generic content под Header Layout;
- `tabs?: ReactNode` — consumer-owned tabs region;
- `statusBar?: ReactNode` — явно переданный system-chrome reference или интеграционный slot;
- `gradient?: boolean` — включает progressive background, по умолчанию `true`;
- `theme?: 'light' | 'dark'`;
- `platform?: 'ios' | 'android' | 'desktop' | 'vkcom'`;
- `className?: string`.

`TopBarActions` ограничивает source-supported количество: 1–4 элемента. `TopBar` не hardcode-ит иконки или семантику action controls.

## Region order

Progressive background располагается позади foreground content. Затем идут:

1. explicit `statusBar`, если передан;
2. Header Layout;
3. `bottomSlot`, если передан;
4. spacing 2px и `tabs`, если передан.

Без `statusBar` базовый Header Layout имеет высоту 48px: top padding 4px и minimum content height 44px.

## Header geometry

- Header padding: top 4px, left 10px, right 6px;
- основной horizontal gap: 4px;
- Middle padding: left 6px, right 8px;
- Before получает дополнительный left padding 6px;
- actions: box 28×28px, gap 16px, left padding 2px, right padding 10px;
- production width: `100%`, reference width не является runtime contract.

## Title typography

Title использует platform `Title 1`: 31px / 31px, Bold, letter spacing −0.5px на iOS. Accent family получает безопасный system sans-serif fallback; компонент не зависит от одного установленного по имени шрифта. Title остаётся в одну строку и сокращается через ellipsis.

## Appearances и gradient

- `default` использует semantic primary foreground и светлый/тёмный semantic page background в подтверждённом Top progressive gradient;
- `overlay` использует contrast foreground, Overlay progressive gradient и Elevation 3 на foreground content;
- `no-blur-overlay` сохраняет Overlay foreground/geometry, отключает background-blur treatment и применяет подтверждённую общую opacity `0.4` к Overlay gradient.

Gradient выступает вниз относительно content: на 53px для `default` и на 114px для Overlay appearances. Он responsive, не принимает pointer events и не реализован через box shadow. Exact gradient stops, source-resolved 0px progressive blur и Elevation 3 хранятся локально в компоненте: соответствующих публичных foundation tokens сейчас нет.

`gradient={false}` скрывает только background layer и не меняет geometry foreground regions.

## Bottom Slot и Tabs

`bottomSlot` получает horizontal padding 16px, top padding 8px и bottom padding 4px; его высота определяется consumer content.

`tabs` располагается после 2px spacing. Production `Tabs` в рамках этого компонента не создаётся: consumer отвечает за содержимое, interaction и semantics.

## Status Bar и prototype policy

`TopBar` никогда не рисует iOS Status Bar автоматически. Время, cellular/Wi‑Fi/battery indicators, device frame и другой system chrome не входят в production component. `statusBar` отображается только когда consumer передал его явно.

Обычные `#/vk-prototypes/*` должны начинаться с app-owned Top Bar и не воспроизводить system chrome, если отдельная задача прямо этого не требует. Visual QA может явно использовать showcase-local Status Bar reference.

## Accessibility

`TopBar` является layout container и не назначает `toolbar`, `navigation` или tabs semantics произвольным slots. Consumer-provided controls сохраняют собственную native/ARIA семантику. Если для конкретного экрана нужен heading, его можно передать через `title` как подходящий heading element.

## Ограничения

- production `StatusBar` не создаётся;
- production `Tabs` не создаётся;
- application-specific back, search и другие actions не встроены;
- component не создаёт fake device chrome.
