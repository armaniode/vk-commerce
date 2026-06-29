# Icon Selection Decision Tree

> **Когда читать.** На шаге 2.5 алгоритма `carnica-figma-design` — для каждого UI-элемента со значком (button с icon, cell с right view=icon, badge, tab, status indicator) определи семантику и выбери конкретную иконку из этой таблицы.

В `src/carnica/icons/` лежит **350 готовых TSX-компонентов в 23 категориях** (bit-exact экспорт из Figma 04_Carnica-icons). Гайд ниже покрывает ~60–80 наиболее частых use case'ов. Для остального — алфавитный каталог в `src/carnica/passports/icons.md`.

**Запрещено**: рисовать иконку вручную через path/vector, использовать эмодзи (`✨🚀⚡🎉🔥`), брать «похожую» наугад. Выбор иконки = семантическое решение, не эстетика.

---

## 1. Actions & control — действия и управление

Категория `actions/` (38 иконок). Базовые жесты и команды интерфейса.

| Need | Icon | Path | Контекст |
|---|---|---|---|
| Поиск / найти | `IconSearch` | `actions/IconSearch` | search field, кнопка поиска |
| Удалить / выбросить | `IconTrash` | `actions/IconTrash` | destructive action, удаление записи |
| Обновить / перезагрузить | `IconRefresh` | `actions/IconRefresh` | reload data, retry |
| Загрузка / ожидание | `IconLoading` | `actions/IconLoading` | loading state, спиннер |
| Меню гамбургер | `IconBurgerMenu` | `actions/IconBurgerMenu` | navbar, drawer trigger |
| Настройки | `IconSettings` / `IconSettings1` | `actions/IconSettings*` | settings screen, опции |
| Поделиться | `IconShare` | `actions/IconShare` | share button |
| Скопировать | `IconCopy` | `actions/IconCopy` | copy to clipboard |
| Редактировать | `IconEditPencil` | `actions/IconEditPencil` | edit button, изменение |
| Войти / выйти | `IconLogin` / `IconLogout` | `actions/IconLog*` | auth buttons |
| Питание / вкл-выкл | `IconPower` | `actions/IconPower` | power toggle, выключение |
| Инфо | `IconInfo` | `actions/IconInfo` | information tooltip |
| Вопрос / справка | `IconQuestion` | `actions/IconQuestion` | help, FAQ |
| QR-сканнер | `IconScannerQr` | `actions/IconScannerQr` | scan QR |
| Скрепка / прикрепить | `IconPaperclip` | `actions/IconPaperclip` | attach file |
| Слои | `IconLayers` | `actions/IconLayers` | layers, stack |
| Инструмент | `IconTool` | `actions/IconTool` | tools, утилиты |
| Звук / mute | `IconVolumeUp` / `IconVolumeOff` | `actions/IconVolume*` | sound toggle |
| Чекмарк | `IconCheck` | `actions/IconCheck` | подтверждение в чек-боксе |
| Лок / блокировка | `IconLock` / `IconLockOpen` / `IconLockClose` / `IconLockCheck` | `actions/IconLock*` | privacy, lock state |
| Ключ | `IconKeySquare` | `actions/IconKeySquare` | password, ключ |

**Round controls** (plus/minus/close/dots/ban в круге): **обязательно `style=stroke`** — outline-вариант рисует лишний круг внутри. См. `carnica-gotchas` #8 anti-pattern.
- `IconPlusRound`, `IconMinusRound`, `IconCloseRound`, `IconDotsRound`, `IconBanRound` (+ filled-варианты)

**Square controls** (plus/minus/close/check/key в квадрате):
- `IconPlusSquare`, `IconMinusSquare`, `IconCloseSquare`, `IconCheckSquare`, `IconKeySquare`

---

## 2. Status & feedback — статусы и обратная связь

Категории `alert/` (3) + `check/` (3) + `security/` (7).

| Need | Icon | Path | Контекст |
|---|---|---|---|
| Уведомление / колокольчик | `IconBell` | `alert/IconBell` | notification (outline = on, filled = mute) |
| Опасность / предупреждение | `IconDanger` | `alert/IconDanger` | error, warning |
| Огонь / горящее | `IconFire` | `alert/IconFire` | trending, urgent |
| Галочка (отдельная) | `IconCheckMark` | `check/IconCheckMark` | success, done |
| Двойная галочка | `IconDoubleCheckMark` | `check/IconDoubleCheckMark` | read receipt (messengers) |
| Чекмарк в кружке | `IconCheckRound` | `check/IconCheckRound` | confirmation |
| Щит (безопасность) | `IconShield` | `security/IconShield` | protected, защита |
| Щит с галочкой | `IconCheckShield` | `security/IconCheckShield` | verified, OK |
| Щит с крестом | `IconCloseShield` | `security/IconCloseShield` | unprotected, угроза |
| Глаз (видимость) | `IconEyeOpen` / `IconEyeClose` | `security/IconEye*` | show/hide password |
| Лицо / Face ID | `IconFaceId` | `security/IconFaceId` | biometric auth |
| Отпечаток / Touch ID | `IconFingerprint` | `security/IconFingerprint` | biometric auth |

---

## 3. Finance & commerce — деньги и покупки

Категории `finance/` (7) + `shop/` (6).

| Need | Icon | Path | Контекст |
|---|---|---|---|
| Кошелёк | `IconWallet` | `finance/IconWallet` | payment screen, баланс |
| Карта (банковская) | `IconCard` | `finance/IconCard` | card details, payment method |
| Наличные | `IconCash` | `finance/IconCash` | cash payment |
| Монеты | `IconCoins` | `finance/IconCoins` | balance, currency |
| Калькулятор | `IconCalculator` | `finance/IconCalculator` | calculate, счёт |
| Банк | `IconBank` | `finance/IconBank` | bank transfers |
| Кейс / чемодан | `IconCase` | `finance/IconCase` | business, портфолио |
| Сумка | `IconBag` | `shop/IconBag` | покупки, cart |
| Корзина | `IconBasket` | `shop/IconBasket` | cart (e-commerce) |
| Shopping bag | `IconShoppingBag` | `shop/IconShoppingBag` | покупки альт. |
| Купон / распродажа | `IconSaleCoupon` | `shop/IconSaleCoupon` | sale, скидка |
| Процент | `IconPercent` | `shop/IconPercent` | discount, скидка |
| Дом | `IconHome` | `shop/IconHome` | home screen, домой |
| X5 баллы | `IconX5Points` / `IconX5PointsReceived` | `shop/IconX5Points*` | type=spent/received |

**Дополнительно в `game/`:** `IconGift` (подарок), `IconCoupon` (купон обычный — не sale).

---

## 4. Media & devices — медиа, устройства, связь

Категории `media/` (12) + `device/` (6) + `mobile/` (6).

### Медиа

| Need | Icon | Path | Контекст |
|---|---|---|---|
| Камера | `IconCamera` | `media/IconCamera` | take photo |
| Микрофон | `IconMic` / `IconMicAlt` | `media/IconMic*` | recording (см. variant) |
| Микрофон выключен | `IconMicCrossed` | `media/IconMicCrossed` | muted state |
| Видео | `IconVideo` | `media/IconVideo` | video content |
| Видео-файл | `IconVideoFile` | `media/IconVideoFile` | video attachment |
| Play | `IconPlay` | `media/IconPlay` | проигрывание |
| Stop | `IconStop` | `media/IconStop` | остановка |
| Stop & Play | `IconStopAndPlay` | `media/IconStopAndPlay` | combined control |
| Звук | `IconSound` | `media/IconSound` | speaker, audio |
| Наушники | `IconHeadphones` | `media/IconHeadphones` | audio device |
| Картинка | `IconImageBox` | `media/IconImageBox` | image placeholder |

### Устройства

| Need | Icon | Path | Контекст |
|---|---|---|---|
| Роутер | `IconRouter` | `device/IconRouter` | домашний интернет |
| ТВ | `IconTv` | `device/IconTv` | TV-приставка |
| Планшет | `IconTablet` | `device/IconTablet` | tablet device |
| Клавиатура | `IconKeyboard` | `device/IconKeyboard` | input device |
| Часы | `IconWatch` | `device/IconWatch` | smartwatch |
| Ноутбук | `IconNotebook` | `device/IconNotebook` | laptop |

### Mobile & связь

| Need | Icon | Path | Контекст |
|---|---|---|---|
| Wi-Fi | `IconWifi` / `IconWifiAlt` | `mobile/IconWifi*` | internet (outline=есть, filled=нет) |
| SIM | `IconSim` | `mobile/IconSim` | sim card |
| eSIM | `IconEsim` | `mobile/IconEsim` | embedded SIM |
| iPhone / смартфон | `IconIPhone` | `mobile/IconIPhone` | mobile device |
| Бесконечность / безлим | `IconInfinite` | `mobile/IconInfinite` | unlimited / безлимит |
| Молния / скорость | `IconLightning` | `weather/IconLightning` | speed, fast |

---

## 5. Communication — связь и сообщения

Категория `message/` (19 иконок).

| Need | Icon | Path | Контекст |
|---|---|---|---|
| Телефон | `IconPhone` | `message/IconPhone` | call |
| Входящий звонок | `IconPhoneCallIn` | `message/IconPhoneCallIn` | incoming |
| Исходящий звонок | `IconPhoneCallOut` | `message/IconPhoneCallOut` | outgoing |
| Переадресация | `IconPhoneCallTransfer` | `message/IconPhoneCallTransfer` | call transfer |
| Беззвучный звонок | `IconCallSilent` | `message/IconCallSilent` | mute call |
| Звонок идёт | `IconCallingOn` / `IconCallingOnCrossed` | `message/IconCalling*` | active/declined |
| Звонок отменён | `IconCallingOff` | `message/IconCallingOff` | missed/declined |
| Чат / сообщение | `IconChatMessage` | `message/IconChatMessage` | chat bubble |
| Новый чат / `+` | `IconChatPlusMessage` / `IconChatAddMessage` | `message/IconChat*` | new conversation |
| Многоточие в чате | `IconDotsMessage` / `IconDotsMessage1` | `message/IconDotsMessage*` | typing indicator |
| Вопрос в чате | `IconQuestionMessage` / `IconQuestionMessage1` | `message/IconQuestionMessage*` | help in chat |
| Письмо новое | `IconMailNew` | `message/IconMailNew` | unread email |
| Письмо открытое | `IconMailOpen` | `message/IconMailOpen` | read email |
| Отправить | `IconSend` / `IconSendFilled` | `message/IconSend*` | submit, paper plane |

---

## 6. Navigation & arrows — стрелки и направления

Категория `navigation/` (16 иконок).

| Direction | Chevron (тонкая) | Arrow (заметная) | Use case |
|---|---|---|---|
| Влево | `IconChevronLeft` | `IconArrowLeft` | back button, prev |
| Вправо | `IconChevronRight` | `IconArrowRight` | next, forward, cell affordance |
| Вверх | `IconChevronUp` | `IconArrowUp` | collapse, scroll top |
| Вниз | `IconChevronDown` | `IconArrowDown` | expand, scroll down |
| ↗ | — | `IconArrowUpRight` | внешняя ссылка, exit |
| ↖ | — | `IconArrowUpLeft` | редко |
| ↘ | — | `IconArrowDownRight` | download |
| ↙ | — | `IconArrowDownLeft` | редко |

| Special | Icon | Use case |
|---|---|---|
| Двойная стрелка | `IconDoubleRightArrow` | «больше», «продолжить» |
| Развернуть | `IconExpand` | fullscreen |
| Свернуть | `IconCollapse` | minimize |
| Обмен / swap | `IconSwap` | переключение, exchange |
| Импорт / экспорт | `IconImport` / `IconExport` | upload / download (в `download/`) |

**Правило выбора chevron vs arrow:** chevron для **navigation affordance** в cell/list (тонкая, не привлекает внимание), arrow — для **явного направленного действия** (back button, send to, переход на внешний ресурс).

---

## 7. Content, docs & people — контент, документы, люди

Категории `bookmark/` (8), `document/` (7), `files/` (7), `chart/` (3), `datetime/` (3), `user/` (3), `transport/`, `map/`, `weather/`, `game/`, `other/`.

### Реакции и закладки (`bookmark/`)

| Need | Icon | Контекст |
|---|---|---|
| Сердце / лайк | `IconHeart` | favourite, like (outline=not-set, filled=set) |
| Звезда | `IconStar` | rating (поддерживает `style=half filled`) |
| Закладка | `IconBookmark` | save for later |
| Флаг | `IconFlag` | mark, report |
| Пин / приколоть | `IconPin` | pinned item |
| Лейбл / тэг | `IconLabel` | tag, label |
| Разбитое сердце | `IconBrokenHeart` | dislike, broken |
| Книга | `IconBook` | reading, гайд |
| Палец вверх / вниз | `IconThumbsUp` / `IconThumbsDown` | rating like/dislike |

### Документы и файлы

| Need | Icon | Категория |
|---|---|---|
| Документ обычный | `IconDocFill` / `IconFileFill` / `IconFileEmpty` | `document/` |
| Стол / десктоп | `IconDesk` / `IconDeskCrossed` | `document/` |
| Архив | `IconArchive` | `document/` |
| Паспорт | `IconPassport` | `document/` |
| Файлы по форматам | `IconFilePdf` / `IconFileDoc` / `IconFileDocx` / `IconFileImg` / `IconFileJpeg` / `IconFileJpg` / `IconFilePng` | `files/` |

### Графики и время

| Need | Icon | Категория |
|---|---|---|
| Столбчатый график | `IconChart` / `IconChartAlt` | `chart/` |
| Круговая диаграмма | `IconPieChart` | `chart/` |
| Календарь | `IconCalendar` | `datetime/` |
| Часы / время | `IconTime` | `datetime/` |
| Скорость / спидометр | `IconSpeed` | `datetime/` |

### Люди

| Need | Icon | Категория |
|---|---|---|
| Пользователь / профиль | `IconUser` | `user/` |
| Добавить пользователя | `IconUserAdd` | `user/` |
| Группа пользователей | `IconUsersGroup` | `user/` |

### Транспорт / карта / погода / игры / прочее

- **Transport** (`transport/`): `IconCar`, `IconBus`, `IconTrain`, `IconPlane`, `IconPump` (заправка).
- **Map** (`map/`): `IconGlobe` (глобус, мир), `IconCompas` (компас — опечатка as-is), `IconMark` (метка).
- **Weather** (`weather/`): `IconSun`, `IconMoon`, `IconCloud`, `IconRain`, `IconLightning`, `IconLightningCrossed`.
- **Game** (`game/`): `IconGamepad`, `IconGift`, `IconCoupon`, `IconRobot` / `IconRobotCrossed`.
- **Other** (`other/`): `IconHotel`, `IconStudy`, `IconHoneyComb` / `IconHoneycombs`, `IconOrange`.

---

## Variant semantics — outline vs filled vs stroke

Cross-link на owner: [`carnica-components/references/decision-rules-extended.md §12`](../../carnica-components/references/decision-rules-extended.md). Краткая выжимка:

| Pattern | Outline (default) | Filled | Когда применять |
|---|---|---|---|
| State on/off | состояние **активно** | состояние **выключено / mute** | wifi, mic, camera, bell, eye, volume |
| Selected / favourite | not selected | selected | heart, star, bookmark, flag, pin |
| Half state | — | — | star дополнительно `style=half filled` для rating UI |
| Round controls (plus/minus/close/ban) | **не использовать** — рисует лишний круг | — | использовать `style=stroke` (см. `carnica-gotchas` #8) |

**Правило (из decision-rules-extended §12):** «На лендинге, где продаём услугу — `outline`. `filled` (с зачёркиванием) — только когда явно показываем отсутствие». Тариф «интернет 10 ₽ за гб» → `IconWifi` outline, **не** filled.

---

## Conventions — как использовать в коде

```tsx
// Импорт из категории
import { IconWallet } from '../carnica/icons/finance';
import { IconChevronRight } from '../carnica/icons/navigation';

// Все иконки 24×24, наследуют text color через currentColor
<IconWallet />                              // 24×24, текущий цвет
<IconWallet className="text-error-primary" />   // через text color; legacy text-bee-error
<IconWallet width={32} height={32} />       // size override

// В составных компонентах
<Button priority="primary" view="icon" icon={<IconSearch />} aria-label="Поиск" />
<ButtonInlineText iconLeft={<IconChevronLeft />}>Назад</ButtonInlineText>
<Cell iconLeft={<IconWallet />} title="Кошелёк" rightView="chevron" />
```

В **Figma Plugin API** (для capability carnica-figma-design): иконки — это INSTANCE_SWAP property у компонентов (`button 2.5`, `cell 3.1`, etc.). Импортировать через `importComponentSetByKeyAsync` соответствующего icon set из Figma library, дальше через `setProperties({ 'icon-left': iconInstance })`. Конкретные library keys для 10 наиболее частых иконок — в `.agents/skills/carnica-ui-kit-app/references/icons.md`.

---

## Fallback — иконки нет в гайде

1. Поискать по имени в **`src/carnica/passports/icons.md`** (полный алфавитный список + категории).
2. Если в каталоге всё ещё нет — поискать **семантически близкую** из ближайшей категории (например, нужна «оплата по QR» → используй `IconScannerQr` или `IconCard`).
3. Если совсем нечего — **запросить добавление новой иконки в Figma** (через `scripts/icons-export/` workflow), **не рисовать вручную**.

**Никогда:** эмодзи (`✨🚀⚡🎉🔥💰📞`), inline SVG c самописными path'ами, иконки из стороннего набора (Material Icons, Phosphor, Lucide).
