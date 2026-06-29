# Carnica Abstraction Layer

Абстракционный слой для @carnica пакетов Beeline. Когда реальные пакеты станут доступны через VPN — заменить импорты.

## Public API

Внешний код должен импортировать Carnica runtime через стабильные namespace entrypoints:

```tsx
import { components, icons, tokens } from '../carnica';
import { Badge, Spinner, StoriesBadge } from '../carnica/components/app';
import { Button as AppButton } from '../carnica/components/app';
import { Button, Header } from '../carnica/components/web';
import { IconSearch } from '../carnica/icons/actions';

components.app.Badge;
components.app.Button;
components.app.Spinner;
components.app.StoriesBadge;
components.web.Button;
components.web.Header;
icons.IconSearch;
tokens.spacing.spacing['spacing/500'];
```

Компоненты разделены по платформам. Новые APP-компоненты добавлять в `components.app`, WEB-компоненты — в `components.web`. Старые prototype components удалены и не являются backlog source of truth.

Подробная классификация текущих компонентов: `components/README.md`.

## Маппинг компонентов

| Наш компонент | Carnica пакет | Компонент | Статус |
|---|---|---|---|
| `components.app.Badge` | `@carnica/ui-kit` | APP `badge 3.0` | APP-ready |
| `components.app.Button` | `@carnica/ui-kit` | APP `button 2.5` | APP-ready |
| `components.app.Spinner` | `@carnica/ui-kit` | APP `spinner 2.1` | APP-ready |
| `components.app.StoriesBadge` | `@carnica/ui-kit` | APP `stories badge` | APP-only |
| `components.web.Button` | `@carnica/ui-kit` | WEB `button 2.1` | WEB-only |
| `components.web.ButtonInlineText` | `@carnica/ui-kit` | WEB `button inline text 2.1` | WEB-only |
| `components.web.Header` | `@carnica/ui-kit` / WEB product components | WEB `header/main` | WEB-only |

**Статусы**: Passport → APP-ready / WEB-only.

## Иконки (`icons/`)

Source of truth по количеству и именам — `icons-raw/`: сейчас 354 raw SVG из Figma 04_Carnica-icons. `icons/` — производный React-слой: сейчас 350 TSX-компонентов в 23 категориях.

**Категории TSX-слоя**: actions (38), alert (3), bookmark (8), chart (3), check (3), datetime (3), device (6), document (7), download (2), files (7), finance (7), game (5), map (3), media (12), message (19), mobile (6), navigation (16), other (5), security (7), shop (6), transport (5), user (3), weather (6)

Все иконки — 24×24px SVG с `fill="currentColor"`. Подробнее: `passports/icons.md`

```tsx
import { IconSearch } from '../carnica/icons/actions';
import { IconChevronLeft } from '../carnica/icons/navigation';
```

## Токены

| Файл | Описание | Carnica пакет | Статус |
|---|---|---|---|
| `tokens/colors.ts` | Цветовые токены light/dark + Figma-name flat map + legacy aliases | `@carnica/themes` | Из Figma |
| `tokens/typography.ts` | 17 стилей типографики + Figma text style keys | `@carnica/themes` | Из Figma |
| `tokens/spacing.ts` | Figma spacing scale + radius scale, только token-path keys | `@carnica/themes` | Из Figma |

### Паспорта токенов
| Паспорт | Описание |
|---|---|
| `passports/colors.md` | Все цветовые токены из Figma 01_Carnica-colors-2.0 |
| `passports/typography.md` | Все стили типографики из Figma 02_Carnica-typography |

### Соглашение по Tailwind-классам
Preferred Tailwind aliases не используют брендовый `bee-` префикс, но сохраняют property-prefix Tailwind:
- Текст: `text-content-{primary|secondary|tertiary|disabled}`, `text-content-primary-100-invert`; legacy aliases `text-bee-content-*` пока могут встречаться в старом коде.
- Фоны: `bg-background-{primary|secondary|tertiary}`, `bg-elements-{primary|secondary|active|disabled}`; legacy aliases `bg-bee-bg-*`, `bg-bee-el-*`, `bg-bee-background-*`, `bg-bee-elements-*` пока могут встречаться в старом коде.
- Бренд/status: `bg-brand-primary`, `bg-error-primary`, `bg-success-primary`, `text-error-primary`, `text-success-primary`; legacy aliases `bg-bee-yellow`, `bg-bee-error`, `bg-bee-success`, `text-bee-error`, `text-bee-success`.
- Бордеры: `border-border-{primary|secondary}`; legacy aliases `border-bee-border-*`.
- Spacing/radius: `gap-spacing-500`, `p-spacing-500`, `rounded-radius-infinite`.

**Важно**: `bg-background-primary` = #F0F3F5 (серый), `bg-background-secondary` = #FFFFFF (белый)

## Процесс "Паспорт компонента"

Для извлечения компонентов из Storybook используется стандартизированный процесс:

1. Дизайнер заполняет паспорт по шаблону `passports/_template.md`
2. Прикладывает скриншоты из Storybook в `passports/screenshots/`
3. Агент генерирует/обновляет компонент по паспорту
4. Визуальная верификация: скриншот Storybook vs рендер в dev-сервере

**Команда для агента:**
```
Создай компонент {Name} по паспорту src/carnica/passports/{name}.md
```

Подробный дизайн процесса описан в шаблоне `passports/_template.md`

## Маппинг props: наш → @carnica

### Button
| Наш prop | @carnica prop | Примечание |
|---|---|---|
| `view` | `view` | Совпадает: primary, secondary-on-primary, secondary-on-secondary, secondary-on-tertiary, tertiary, destructive |
| `mode` | `mode` | Совпадает: default, inline |
| `size` | `size` | Совпадает: m, l |
| `width` | `width` | Совпадает: default, full |
| `iconLeft` | `iconLeft` | У нас ReactNode, у @carnica — IconComponent |
| `iconRight` | `iconRight` | У нас ReactNode, у @carnica — IconComponent |
| `onlyIcon` | `onlyIcon` | Совпадает |
| `loading` | `loading` | Совпадает |
| `sale` | `sale` | Совпадает |
| `invert` | `invert` | Совпадает |
| — | `tagName` | Не реализован (не нужен для прототипа) |
| — | `motion` | Не реализован (не нужен для прототипа) |

## Как заменить на реальные пакеты

1. Установить `@carnica/ui-kit`, `@carnica/themes`, `@carnica/graphics`, `@carnica/utils`
2. Заменить импорты `from '../carnica/components/web'` / `from '../carnica/components/app'` на `from '@carnica/ui-kit'`
3. Адаптировать props при необходимости (см. Storybook)
4. Заменить токены на `@carnica/themes`
