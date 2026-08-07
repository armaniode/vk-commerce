# Foundations VK Social Commerce

## Sources

Foundation layer собран из нормализованных экспортов Figma Lego Tokens:

- Constants — базовые цвета;
- Appearance Light и Appearance Dark — семантические цвета;
- Tokens iOS, Android, Desktop и vkCom — platform foundations.

Сырые экспорты, служебные идентификаторы и метаданные Figma в репозиторий не переносятся. Названия шрифтов хранятся только как строки; файлы шрифтов не входят в этот слой.

## Результат анализа источников

- Light и Dark содержат одинаковые 177 token paths. Различаются 103 значения; в Light найдено 36 aliases, в Dark — 35.
- В каждом Appearance mode 92 скрытые переменные. В основном это внутренние component effects, gradients, shadows и вспомогательные palette values.
- Constants содержит восемь цветов. В public API перенесены семь подтверждённых primitives; тестовый цвет исключён.
- Каждый platform mode содержит одинаковые 104 token paths. Различия сохраняются в отдельных конфигурациях, а общие шкалы spacing, radius, blur и easing вынесены в primitives.
- Шесть скрытых custom typography variables в каждом platform mode не публикуются: это несортированные внутренние значения, а в Desktop и vkCom часть из них заполнена нулями.

## Architecture

```text
primitives → semantic → platform
```

- `primitives/` содержит подтверждённые базовые цвета и общие числовые шкалы.
- `semantic/` задаёт независимые Light и Dark mappings для Text, Icon, Background, Stroke, Separator, Palette, Other и States.
- `platforms/` хранит размеры, foundations типографики и подтверждённые component values отдельно для iOS, Android, Desktop и vkCom.
- `src/vk-commerce/tokens/index.ts` — единая публичная точка входа.

Пример использования:

```ts
import {
  getPlatformTokens,
  getSemanticColors,
  platformTokens,
  primitiveColors,
  semanticColorsDark,
  spacing,
} from './src/vk-commerce/tokens';

const colors = getSemanticColors('dark');
const iosButtonHeight = platformTokens.ios.size.buttonLargeHeight;
const vkcom = getPlatformTokens('vkcom');
```

## Primitive colors

| Figma token | TypeScript key | Значение |
| --- | --- | --- |
| color-blue | `primitiveColors.blue` | `#2E90FF` |
| color-white | `primitiveColors.white` | `#FFFFFF` |
| color-black | `primitiveColors.black` | `#000000` |
| color-red | `primitiveColors.red` | `#FE3C60` |
| color-green | `primitiveColors.green` | `#34C759` |
| color-dark-grey | `primitiveColors.darkGrey` | `#3B3B3B` |
| color-orange | `primitiveColors.orange` | `#FF6900` |

Подтверждённые aliases сохранены как ссылки на primitives. Например, `Text / Accent` использует `primitiveColors.blue`. Значения без alias в исходном режиме остаются самостоятельными значениями этого режима.

## Themes

Публичные режимы:

- `semanticColorsLight`;
- `semanticColorsDark`;
- `getSemanticColors('light' | 'dark')`.

Основные сохранённые различия:

| Token | Light | Dark |
| --- | --- | --- |
| Text / Primary | `#3B3B3B` | `#FFFFFF` |
| Text / Secondary | `#999999` | `#666666` |
| Text / Accent Themed | `#2E90FF` | `#FFFFFF` |
| Icon / Medium | `#999999` | `#E6E6E6` |
| Background / Secondary | `#F2F2F2` | `#1E1E1C` |
| Background / Tertiary | `#F7F7F7` | `#141414` |
| Background / Positive Tint | `#E8F9E8` | `#273724` |
| Background / Negative Tint | `#FFE9E9` | `#4B2727` |
| Stroke / Accent | `#2E90FF` | `#529EF4` |
| Separator / Primary | `#EBEBEB` | `#303030` |
| Palette / Accent Orange Peach | `#F9B54F` | `#FFC062` |
| Other / Skeleton From | `#F5F5F5` | `#1B1B1B` |

Alpha colors представлены валидными CSS `rgba(...)` strings. Технический шум экспорта с плавающей точкой нормализован без изменения проектного значения, например `0.4000000059604645` → `0.4` и `−0.09000000357627869` → `−0.09`.

## Spacing

| Figma token | TypeScript key | px |
| --- | --- | --- |
| Size2XS | `spacing.size2xs` | 2 |
| SizeXS | `spacing.sizeXs` | 4 |
| SizeS | `spacing.sizeS` | 6 |
| SizeM | `spacing.sizeM` | 8 |
| SizeL | `spacing.sizeL` | 10 |
| SizeXL | `spacing.sizeXl` | 12 |
| Size2XL | `spacing.size2xl` | 16 |
| Size3XL | `spacing.size3xl` | 20 |
| Size4XL | `spacing.size4xl` | 24 |
| Size5XL | `spacing.size5xl` | 32 |
| Size6XL | `spacing.size6xl` | 40 |

## Radius, blur и motion

Primitive radius scale:

| Figma token | TypeScript key | px |
| --- | --- | --- |
| Radius2XS | `radius.size2xs` | 4 |
| RadiusXS | `radius.sizeXs` | 6 |
| RadiusS | `radius.sizeS` | 8 |
| RadiusM | `radius.sizeM` | 12 |
| RadiusL | `radius.sizeL` | 16 |
| RadiusXL | `radius.sizeXl` | 20 |
| Radius2XL | `radius.size2xl` | 24 |
| Radius3XL | `radius.size3xl` | 32 |

`Border Radius Rounded = 999` хранится отдельно как `roundedRadius`. Platform-specific и component-specific radii находятся в `platformTokens.*.componentRadius` и не смешиваются с primitive scale.

Blur scale: `small = 8`, `medium = 16`, `large = 32`, `extraLarge = 64`.

Motion содержит только подтверждённые easing curves: Linear, In Smooth, Out Smooth, In Out Smooth, Out Sharp и In Out Sharp. Durations не добавлены, потому что в источниках они отсутствуют.

## Platforms

Публичные режимы: `ios`, `android`, `desktop`, `vkcom`.

| Foundation | iOS | Android | Desktop | vkCom |
| --- | --- | --- | --- | --- |
| Platform | iOS | Android | Desktop | vkCom |
| Viewport | 393 × 852 | 360 × 800 | 360 × 800 | 360 × 800 |
| Base font | SF Pro | Roboto Flex | SF Pro | SF Pro |
| Accent font | VK Sans Display | VK Sans Display | VK Sans Display | VK Sans Display |
| Cell Height | 52 | 52 | 48 | 48 |
| Field Height | 44 | 44 | 36 | 36 |
| Search Height | 36 | 36 | 32 | 32 |
| Button XS / S / M / L | 28 / 36 / 44 / 52 | 28 / 36 / 44 / 52 | 24 / 32 / 36 / 44 | 24 / 32 / 36 / 44 |
| Panel Header Height | 52 | 56 | 48 | 48 |
| Base Padding Horizontal | 16 | 16 | 16 | 12 |
| Base Padding Vertical | 12 | 12 | 12 | 12 |
| Form Item Padding Vertical | 12 | 12 | 12 | 8 |
| Base component radius | 10 | 10 | 10 | 8 |
| Large Button typography | 17 / 22 / −0.43 | 16 / 20 / 0 | 15 / 20 / 0 | 14 / 18 / 0 |

iOS и Android не объединены: кроме family и viewport, Android использует отрицательный letter spacing для большинства foundation sizes и `bold = 680`, а iOS — преимущественно нулевой letter spacing и `bold = 700`.

Desktop и vkCom также не объединены. У vkCom компактнее horizontal padding, form item padding, base radius и Large Button typography. Mobile и desktop modes сохраняют разные component heights, horizontal cell paddings и snackbar paddings.

Line height для основного typography set в источниках не подтверждён, поэтому из font size, letter spacing, optical size и weight не конструируются вымышленные semantic text styles. Единственный опубликованный line height относится к отдельно подтверждённой Large Button typography.

## Filtering rules

В public token API не входят:

- `⚠️ Experimental/**` — экспериментальная группа;
- скрытые component-specific effects, gradients, shadows и внутренние palette helpers;
- `test-highlight` — тестовый primitive;
- `Background / Background` — помечен как устаревший;
- `Background / Field Background` — источник предписывает использовать `Background / Secondary`;
- `Other / Write Bar Input Border Alpha` — ссылается на тестовый primitive;
- скрытые `Font / Custom / Unsorted/**` — внутренние и неполные typography values;
- `Opacity / Disabled` — пока не публикуется: отдельная модель opacity tokens не входит в текущую архитектуру.

Исключённые значения не заменяются догадками и не получают compatibility aliases.

## Current limitations

- semantic typography будет добавлена отдельно на основе документации Lego Tokens;
- компоненты Lego Kit ещё не перенесены;
- иконки ещё не подключены;
- experimental и private variables не входят в public token API;
- deprecated и test tokens исключены;
- шрифты перечислены только по family name и не поставляются репозиторием.
