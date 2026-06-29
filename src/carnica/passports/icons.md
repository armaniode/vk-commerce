# Icons

## Мета

- **Пакет**: @carnica/graphics
- **Имя в Figma**: 04_Carnica-icons (Copy)
- **fileKey**: `TZDe0XXSr5W5idW3JndD0e`
- **Дата снятия**: 2026-05-13 (полный переэкспорт)
- **Метод**: Figma Plugin API `node.exportAsync({format:'SVG_STRING'})` через `mcp__claude_ai_Figma__use_figma` — bit-exact, идентично File → Export из Figma UI
- **Всего в generated TSX**: 350 TSX-компонентов в 23 категориях (180 базовых + 170 filled/stroke/half-filled вариантов и новых иконок)
- **Raw SVG**: `src/carnica/icons-raw/` — source of truth для количества, имён и регенерации; текущий локальный count: 354 SVG-файла
- **История**: до 2026-05-13 иконки получались через `get_design_context → WebFetch SVG`, что для сложных иконок (FaceId, EyeClose и т.п.) давало артефакты pathData. Полная замена через прямой `exportAsync` устранила неточности.

## Как выбрать иконку для UI

Decision tree «нужна иконка для X — какую взять» → [`.agents/skills/carnica-figma-design/references/icons-semantic.md`](../../../.agents/skills/carnica-figma-design/references/icons-semantic.md). 7 семантических кластеров (actions / status / finance / media / communication / navigation / content) + variant semantics (outline vs filled vs stroke). Этот паспорт — алфавитный каталог; для семантического поиска используй гайд.

## Как обновить иконки

Если в Figma меняется иконка или добавляется новая — переэкспорт делается через скрипты в [scripts/icons-export/](../../../scripts/icons-export/):

```bash
# 1. Получить актуальный manifest всех COMPONENT_SETs (через mcp__claude_ai_Figma__use_figma)
#    → обновить scripts/icons-export/manifest.json вручную
# 2. Привести mapping в соответствие
node scripts/icons-export/reconcile.mjs
# 3. Разбить на батчи (по 18, или ~9 для split a/b если упирается в лимит use_figma)
node scripts/icons-export/prepare-batches.mjs 18
# 4. Для каждого batchIdx: вызвать use_figma с IDs, сохранить tmp/batch-N.json (или -a/-b), затем:
node scripts/icons-export/save-batch.mjs <batchIdx>
# 5. Сгенерировать TSX и обновить index.ts всех категорий:
node scripts/icons-export/build-tsx.mjs
```

Подробности — в `scripts/icons-export/README.md`.

## Организация

```
src/carnica/icons/
├── index.ts              # Корневой barrel-экспорт всех категорий
├── actions/              # 38 иконок
├── alert/                # 3 иконки
├── bookmark/             # 8 иконок
├── chart/                # 3 иконки
├── check/                # 3 иконки
├── datetime/             # 3 иконки
├── device/               # 6 иконок
├── document/             # 7 иконок
├── download/             # 2 иконки
├── files/                # 7 иконок
├── finance/              # 7 иконок
├── game/                 # 5 иконок
├── map/                  # 3 иконки
├── media/                # 12 иконок
├── message/              # 19 иконок
├── mobile/               # 6 иконок
├── navigation/           # 16 иконок
├── other/                # 5 иконок
├── security/             # 7 иконок
├── shop/                 # 6 иконок
├── transport/            # 5 иконок
├── user/                 # 3 иконок
└── weather/              # 6 иконок
```

## Полный список по категориям

### actions (38)
IconPaperclip, IconRefresh, IconLoading, IconSettings, IconBurgerMenu, IconTool, IconLogout, IconLogin, IconShare, IconEditPencil, IconPower, IconTrash, IconSearch, IconScannerQr, IconCopy, IconLayers, IconScreenMenu1, IconScreenMenu, IconVolumeOff, IconVolumeUp, IconCheck, IconQuestion, IconInfo, IconSettings1, IconLockCheck, IconLockClose, IconLockOpen, IconLock, IconKeySquare, IconCheckSquare, IconCloseSquare, IconMinusSquare, IconPlusSquare, IconDotsRound, IconBanRound, IconCloseRound, IconMinusRound, IconPlusRound

### alert (3)
IconBell, IconDanger, IconFire

### bookmark (8)
IconBook, IconBookmark, IconBrokenHeart, IconFlag, IconHeart, IconLabel, IconPin, IconStar

### chart (3)
IconChart, IconChartAlt, IconPieChart

### check (3)
IconCheckMark, IconCheckRound, IconDoubleCheckMark

### datetime (3)
IconCalendar, IconSpeed, IconTime

### device (6)
IconKeyboard, IconNotebook, IconRouter, IconTablet, IconTv, IconWatch

### document (7)
IconArchive, IconDesk, IconDeskCrossed, IconDocFill, IconFileEmpty, IconFileFill, IconPassport

### download (2)
IconExport, IconImport

### files (7)
IconFileDoc, IconFileDocx, IconFileImg, IconFileJpeg, IconFileJpg, IconFilePdf, IconFilePng

### finance (7)
IconBank, IconCalculator, IconCard, IconCase, IconCash, IconCoins, IconWallet

### game (5)
IconCoupon, IconGamepad, IconGift, IconRobot, IconRobotCrossed

### map (3)
IconCompas, IconGlobe, IconMark

### media (12)
IconCamera, IconHeadphones, IconImageBox, IconMic, IconMicAlt, IconMicCrossed, IconPlay, IconSound, IconStop, IconStopAndPlay, IconVideo, IconVideoFile

### message (19)
IconCallingOff, IconCallingOn, IconCallingOnCrossed, IconCallSilent, IconChatAddMessage, IconChatMessage, IconChatPlusMessage, IconDotsMessage, IconDotsMessage1, IconMailNew, IconMailOpen, IconPhone, IconPhoneCallIn, IconPhoneCallOut, IconPhoneCallTransfer, IconQuestionMessage, IconQuestionMessage1, IconSend, IconSendFilled

### mobile (6)
IconEsim, IconIPhone, IconInfinite, IconSim, IconWifi, IconWifiAlt

### navigation (16)
IconArrowDown, IconArrowDownLeft, IconArrowDownRight, IconArrowLeft, IconArrowRight, IconArrowUp, IconArrowUpLeft, IconArrowUpRight, IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp, IconCollapse, IconDoubleRightArrow, IconExpand, IconSwap

### other (5)
IconHoneyComb, IconHoneycombs, IconHotel, IconOrange, IconStudy

### security (7)
IconCheckShield, IconCloseShield, IconEyeClose, IconEyeOpen, IconFaceId, IconFingerprint, IconShield

### shop (6)
IconBag, IconBasket, IconHome, IconPercent, IconShoppingBag, IconX5Points

### transport (5)
IconBus, IconCar, IconPlane, IconPump, IconTrain

### user (3)
IconUser, IconUserAdd, IconUsersGroup

### weather (6)
IconCloud, IconLightning, IconLightningCrossed, IconMoon, IconRain, IconSun

## API компонента

```tsx
import type { SVGProps } from 'react';

// Все иконки принимают стандартные SVG-пропсы
<IconSearch className="w-5 h-5" />
<IconSearch className="text-error-primary" />  // цвет через currentColor; legacy text-bee-error
```

## Использование с Button

```tsx
import { Button, ButtonInlineText } from '../carnica/components/web';
import { IconSearch } from '../carnica/icons/actions';
import { IconChevronLeft } from '../carnica/icons/navigation';

<Button priority="primary" view="icon" icon={<IconSearch />} aria-label="Поиск" />
<ButtonInlineText priority="primary" iconLeft={<IconChevronLeft />}>Назад</ButtonInlineText>
```

## Правила конвертации SVG → TSX

Автоматизировано в [`scripts/icons-export/build-tsx.mjs`](../../../scripts/icons-export/build-tsx.mjs). Ручная регенерация не требуется — workflow «как обновить иконки» выше делает всё end-to-end. Действующие правила:

1. **viewBox** копируется из Figma-источника (всегда `"0 0 24 24"` для Carnica) — НЕ перезаписывается.
2. **Координаты pathData** — абсолютные внутри 24×24, без обёртки `<g transform="translate(...)">` (правило до 2026-05-13 устарело, см. `carnica-gotchas` #5).
3. **Цвета**: `fill="#XXXXXX"` → `fill="currentColor"`. `fill="none"` сохраняется. Аналогично `stroke`.
4. **JSX-атрибуты camelCase**: `fillRule`, `clipRule`, `strokeWidth`, `strokeLinecap`, `strokeLinejoin`, `strokeMiterlimit`.
5. **Компонент**: `<svg width="24" height="24" viewBox="..." fill="none" xmlns="..." {...props}>`. Тип `SVGProps<SVGSVGElement>`.
6. **Именование**: `Icon{PascalCase}` (e.g., `IconPlusRound`, `IconCheckShield`). Filled-варианты — `IconXxxFilled`, stroke — `IconXxxStroke`, half-filled — `IconXxxHalfFilled`. Direction-варианты `chevron/arrows` → отдельные TSX (`IconChevronRight`, `IconArrowUp`, etc.).
7. **Категория-папка**: соответствует Figma category frame (actions/security/finance/...).
