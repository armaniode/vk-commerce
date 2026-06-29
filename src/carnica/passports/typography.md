# Typography

## Мета
- **Пакет**: @carnica/themes
- **Имя в Figma**: 02_Carnica typography
- **Node**: 2091:6861
- **Дата снятия**: 2026-04-07
- **Сверено**: 2026-05-21 через Figma `search_design_system`

## Шрифт

**Font family**: в Figma text styles отображается как `Beeline Sans`; в CSS/runtime поддерживаем оба имени: `'Beeline Sans', 'BeelineSans'`, затем системные фолбэки (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif).

**Используемые начертания**:
- **Regular (400)** — заголовки, основной текст, подписи
- **Medium (500)** — акцентный текст (кнопки, лейблы, выделение)

Bold (700) и Black (900) существуют в шрифте, но не входят в текущую систему токенов.

**Letter spacing**: 0 для всех стилей без исключений.

## Иерархия именования

```
{category} / {modifier?} / {size}
```

| Уровень | Варианты | Описание |
|---------|----------|----------|
| Category | display, headline, body, caption | Основная категория |
| Modifier | accent, paragraph | accent = Medium 500; paragraph = увеличенный line-height для лонгридов/статей |
| Size | large, medium, small, extrasmall | Размер внутри категории |

## Полная таблица стилей

### Display — основные заголовки страниц
Крупные акцентные заголовки и ключевые значения. На странице или в блоке может быть несколько `display`-текстов, если они не ломают визуальную иерархию.

| Токен | Размер | Начертание | Line-height | Платформа |
|-------|--------|-----------|-------------|-----------|
| `display/large` | 56px | Regular 400 | 66px | web |
| `display/medium` | 40px | Regular 400 | 48px | web, app |
| `display/small` | 32px | Regular 400 | 36px | mobile web, app |
| `display/extrasmall` | 16px | Regular 400 | 22px | mobile web, app |

### Headline — вспомогательные заголовки
Заголовки в карточках или длинном тексте. Уменьшенный line-height по сравнению с display.

| Токен | Размер | Начертание | Line-height | Платформа |
|-------|--------|-----------|-------------|-----------|
| `headline/medium` | 40px | Regular 400 | 40px | web, app |
| `headline/small` | 24px | Regular 400 | 24px | universal |

### Body — основной UI-текст
Основной стиль для большинства интерфейсного текста: описания, subtitles, значения, пояснения в карточках и блоках. Не ограничен количеством строк; для обычного интерфейса выбирай `body/*`, даже если текста много.

| Токен | Размер | Начертание | Line-height | Платформа |
|-------|--------|-----------|-------------|-----------|
| `body/large` | 24px | Regular 400 | 28px | universal |
| `body/medium` | 20px | Regular 400 | 26px | web, mobile web |
| `body/small` | 16px | Regular 400 | 20px | universal |

### Body/Accent — акцентный текст (кнопки, лейблы)
Для выделения конкретного элемента. Не для многострочного текста.

| Токен | Размер | Начертание | Line-height | Платформа |
|-------|--------|-----------|-------------|-----------|
| `body/accent/large` | 24px | Medium 500 | 28px | universal |
| `body/accent/medium` | 20px | Medium 500 | 26px | web, mobile web |
| `body/accent/small` | 16px | Medium 500 | 20px | universal |

### Body/Paragraph — лонгриды и статьи
Увеличенный line-height для режима последовательного чтения: лонгриды, тексты статей, юридические или справочные материалы. В интерфейсе в большинстве случаев используй обычный `body/*`, а не `body/paragraph/*`.

| Токен | Размер | Начертание | Line-height | Платформа |
|-------|--------|-----------|-------------|-----------|
| `body/paragraph/large` | 24px | Regular 400 | 36px | universal |
| `body/paragraph/medium` | 20px | Regular 400 | 30px | universal |
| `body/paragraph/small` | 16px | Regular 400 | 24px | universal |

### Caption — самый маленький текст
Подсказки, подписи, пояснения ошибок. Может быть многострочным.

| Токен | Размер | Начертание | Line-height | Платформа |
|-------|--------|-----------|-------------|-----------|
| `caption/medium` | 13px | Regular 400 | 16px | universal |

### Caption/Accent — акцентная подпись
Выделение фрагмента (ссылки, важная информация). Не для многострочного текста.

| Токен | Размер | Начертание | Line-height | Платформа |
|-------|--------|-----------|-------------|-----------|
| `caption/accent/medium` | 13px | Medium 500 | 16px | universal |

## Tailwind-классы

| Tailwind class | Figma-токен | Размер / Line-height / Weight |
|----------------|-------------|-------------------------------|
| `text-display-lg` | display/large | 56/66/400 |
| `text-display-md` | display/medium | 40/48/400 |
| `text-display-sm` | display/small | 32/36/400 |
| `text-display-xs` | display/extrasmall | 16/22/400 |
| `text-headline-md` | headline/medium | 40/40/400 |
| `text-headline-sm` | headline/small | 24/24/400 |
| `text-body-lg` | body/large | 24/28/400 |
| `text-body-md` | body/medium | 20/26/400 |
| `text-body-sm` | body/small | 16/20/400 |
| `text-body-accent-lg` | body/accent/large | 24/28/500 |
| `text-body-accent-md` | body/accent/medium | 20/26/500 |
| `text-body-accent-sm` | body/accent/small | 16/20/500 |
| `text-body-para-lg` | body/paragraph/large | 24/36/400 |
| `text-body-para-md` | body/paragraph/medium | 20/30/400 |
| `text-body-para-sm` | body/paragraph/small | 16/24/400 |
| `text-caption-md` | caption/medium | 13/16/400 |
| `text-caption-accent-md` | caption/accent/medium | 13/16/500 |

## Figma text style keys

| Figma-токен | Style key |
|---|---|
| `display/large` | `f57d7dc506ee1cde2b0c7cd804113a1894c76476` |
| `display/medium` | `cf93514b7fc39ef64f55e75aeac5effd96efe09e` |
| `display/small` | `b1ebc2ed65b8b394555704b0c89c77a359173239` |
| `display/extrasmall` | `cdd8ea24fb28e520f08a69ab2f1370a48c4ed594` |
| `headline/medium` | `17dc8ca0f07a80f5f61fc8f0ab93bd4ca46a9bc3` |
| `headline/small` | `14efb99dde3fe3d2772946c2bda20b1f11ddf621` |
| `body/large` | `51c9f570110e5a5cb1ccd8159fcf52cebb28ff06` |
| `body/medium` | `4584a792046ffdd8c980d564639a572e9dc652b6` |
| `body/small` | `8428078c7857504949384e0f950058330f79ef9c` |
| `body/accent/large` | `101b10a10e1e0de3ffb4fe923d9fb8051ac85fa0` |
| `body/accent/medium` | `0fcbded6bcc6dadabbeec58787c05dd3e0657f8d` |
| `body/accent/small` | `0aeda8963bdd9967bc3316237695732277b99c03` |
| `body/paragraph/large` | `79610ac1ec5f227a52d557acc96b397f151d8895` |
| `body/paragraph/medium` | `9a8aaf65da64ea5ee760376aba3c221b008a58f2` |
| `body/paragraph/small` | `5c45a4df1d51ddc52974a4b2f21619ee1a461539` |
| `caption/medium` | `2499f21c8d3edca28086216a366a132e1ba26348` |
| `caption/accent/medium` | `0b0e959651fa0e65e8fd3a371ab6722cf92ef29a` |

## Ключевые правила

1. **body vs body/accent**: одинаковые размеры, но accent = Medium 500 (для кнопок, лейблов)
2. **body vs body/paragraph**: одинаковые размеры, но paragraph = больший line-height для лонгридов/статей; обычный UI-текст остаётся `body/*`, независимо от числа строк
3. **headline vs display**: на размере 40px: headline имеет line-height 40px (=1), display — 48px (=1.2)
4. **caption всегда 13px** — нет вариантов large/small
5. **display/large (56px) — только для desktop web**, не используется на мобильных
