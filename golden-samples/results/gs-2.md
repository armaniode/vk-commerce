# Golden Sample 2: Экран минут

## Метаданные

- **Figma node эталона:** `206-19319`
- **Figma node результата:** `307-2440`
- **Дата:** 2026-04-15
- **Итерации:** 1 из 3
- **Статус:** pass

## Промпт

```
Экран "Минуты" мобильного приложения билайн (APP). 375×812, cornerRadius 32, bg background/primary.

Структура сверху вниз:
1. navbar 3.0 (view=default, без заголовка, без правой кнопки, только back)
2. Spacer 20px
3. Head section (VERTICAL, center):
   - "доступно" (body/accent/small, content/secondary)
   - "178 мин >" (display/medium + chevron icon direction=right, recolor content/secondary)
   - Dots progress wrapper (38px layout height, clipsContent=false, dots overflow)
     - 9 рядов по 29 колонок, ellipse 12px, gap 1px
     - LTR: col 1-25 → brand/primary (жёлтые), col 26-29 → elements/tertiary (серые)
     - Позиции из design context эталона
   - "из 200" (body/small, content/secondary)
4. Info section (VERTICAL, px=20):
   - "подключённые не тратят минуты" (body/small, secondary)
   - Wrap labels: две пилюли (white pill, radius=44, icon 32px + caption/accent/medium text)
5. Vozduh spacer (~207px) — принцип #8 "воздух"
6. Actions (HORIZONTAL, center, gap=20):
   - cell grid 2.1 × 2 (avatar size=L, settings icon + globe icon, текст через Method A)
7. Button 2.3 (secondary on bg_primary, large, "мои расходы", btn.paddingLeft/Right=0, wrapper px=20)
8. Bottom spacer 20px
```

## Оценка (после Fix BeelineSans)

| Критерий | Вес | Оценка (0-100) | Комментарий |
|----------|-----|----------------|-------------|
| Структура (auto-layout, иерархия) | 30% | 88 | Auto-layout везде. Dots wrapper с overflow. Правильная иерархия. counterAxisSizingMode=AUTO на всех HORIZONTAL frames |
| Компоненты (правильные Carnica) | 25% | 80 | navbar 3.0, cell grid 2.1 (avatar size=L), button 2.3, chevron — из библиотеки. Pill labels кастомные. Иконка tune/filter не найдена (использован gear/settings) |
| Визуальное сходство | 20% | 80 | Layout, пропорции, типографика совпадают. Dots LTR корректны. Тексты BeelineSans отображаются. Pill icons — placeholder вместо infinity/flags. Cell grid #1 — gear вместо tune |
| Spacing | 15% | 90 | Actions на y=620 (эталон: 620). Воздух 207px. Кнопка 20px от краёв |
| Типографика | 10% | 92 | Все стили BeelineSans отображаются корректно после Fix. display/medium, body/accent/small, body/small, caption/accent/medium — все на месте |
| **Итого** | **100%** | **85%** | |

## Что сработало

- Dot progress pattern воспроизведён из 78 ellipse по позициям из design context
- Dots направление LTR: threshold col=25 (178/200 = 89%), жёлтые слева, серые справа
- Chevron icon перекрашен в content/secondary через fills на VECTOR нодах
- cell grid 2.1 avatar size=L (по умолчанию M)
- Button padding обнулён (btn.paddingLeft/Right=0), wrapper задаёт 20px
- Навигация через setProperties на nested settings instance
- Принцип #8 "воздух" — 207px spacer, принцип #9 — инфо вверху, действия внизу
- Все тексты читаются корректно после Fix BeelineSans

## Что не сработало / отклонения

- Иконка tune/filter/option не найдена в 04_Carnica icons — использована settings (gear)
- Pill icon areas — placeholder (серые круги) вместо beeline infinity icon + country flag avatars
- Navbar высота 123px вместо ~107px в эталоне
- `setBoundVariableForPaint` с fallback `{r:0,g:0,b:0}` рендерит чёрный в MCP — нужен реальный hex
- `counterAxisSizingMode` не ставится автоматически при `layoutMode = 'HORIZONTAL'`
- `layoutSizingHorizontal = 'FILL'` нельзя ставить ДО `appendChild`
- `layoutSizingVertical = 'FILL'` spacer ненадёжен — лучше фиксированный

## Workaround-ы

- `counterAxisSizingMode = 'AUTO'` — явно на всех HORIZONTAL frames
- `appendChild()` ПЕРЕД `layoutSizingHorizontal/Vertical`
- FILL spacer → фиксированный с вычисленной высотой
- `clipsContent` (не `clipContent`) в Figma Plugin API
- `setBoundVariableForPaint` — передавать реальный hex как fallback color
- `btn.paddingLeft = 0` / `btn.paddingRight = 0` — обнулять встроенный padding

## Компоненты

| Компонент | Ожидался | Использован | Корректно? |
|-----------|----------|-------------|------------|
| navbar 3.0 | view=default, no title, no right | view=default, no title, no right | ✅ |
| cell grid 2.1 × 2 | avatar size=L | avatar size=L | ✅ |
| button 2.3 | secondary on bg_primary, large | secondary on bg_primary, large | ✅ |
| chevron | direction=right, content/secondary | direction=right, content/secondary | ✅ |
| icon #1 | tune/filter | settings (gear) | ⚠️ |
| icon #2 | globe (outline) | globe (outline) | ✅ |
| status bar | встроен в navbar | встроен в navbar | ✅ |
| pill labels | кастомные | кастомные frames | ✅ |
| dot progress | ellipses, brand/primary + tertiary | 78 ellipses, LTR | ✅ |

## Выводы для rules

Все инсайты занесены в `.claude/rules/figma-workflow.md`:
- setBoundVariableForPaint — fallback color
- counterAxisSizingMode = AUTO
- appendChild перед layoutSizing
- clipsContent API name
- button/input padding override
- icon recoloring
- cell grid avatar size
- dot progress LTR direction
- chevron variants

## История итераций

### Итерация 1
- Промпт: полная структура экрана в одном use_figma вызове
- Результат: фрейм создан, потребовались фиксы
- Проблемы: counterAxisSizingMode 100px, FILL spacer, appendChild order
- Фиксы: counterAxisSizingMode AUTO, фиксированный spacer, vozduh 207px

### Пост-фиксы
- Chevron recolor → content/secondary
- Cell grid avatar → size=L
- Dot progress → LTR (threshold col=25)
- Dots fallback color → реальный hex вместо {0,0,0}
- Button padding → 0 (wrapper 20px)
- Fix BeelineSans → все тексты корректны
- Итоговая оценка: 85% — pass
