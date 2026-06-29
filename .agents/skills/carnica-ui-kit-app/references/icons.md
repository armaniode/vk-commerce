# Carnica UI-kit APP — Иконки и file input

Источник паспортов иконок (04_Carnica icons) и компонента file input. Здесь же сводные таблицы deprecated/новых компонентов. См. `../SKILL.md` для Quick Start, decision tree и top gotchas.

## file input

**Library Key**: (pending — новый компонент) | **12 variants**

| Variant | Values |
|---------|--------|
| `background` | `default on bg_primary`, `default on bg_secondary` |
| `hover` | `false`, `true` |
| `error` | `false`, `true` |
| `disabled` | `false`, `true` |
| `skeleton` | `false`, `true` |

| Key | Type | Default |
|-----|------|---------|
| `label#19360:0` | BOOLEAN | `true` |
| `caption#19360:9` | BOOLEAN | `true` |
| `file 1#19390:0` | BOOLEAN | `false` |
| `file 2#19390:9` | BOOLEAN | `false` |
| `file 3#19390:18` | BOOLEAN | `false` |
| `file 4#19390:27` | BOOLEAN | `false` |
| `file 5#19390:36` | BOOLEAN | `false` |

---

## Иконки (04_Carnica icons)

| Иконка | Component Set Key | Variant |
|--------|------------------|---------|
| four square | `8197c7ea96dfc1ad0dbb369d71bf28089fb1194e` | `style=outline` |
| settings | `5604ae221e2c126ae4b5558ffc9c148c95fe4c8b` | `style=outline` |
| basket | `6933b65a239206ed4d9ca1864148bbf892991d1e` | `style=outline` |
| plus round | `106fd52e52f30b8762f0f66ec2418a2f6b2e7e68` | **`style=stroke`** (исключение!) |
| swap | `7ec08fd4acab44ae895b2b05896acc607ce78336` | `style=outline` |
| refresh | `df7fd86f440f56fcb50fa7f2b7e714931e4865e2` | `style=outline` |
| lock | `b346e381c1f648b3bf20627a942634139c8f75ce` | `style=outline` |
| globe | `12dde6dfc8d8dad26dfe3a152cf05e878fc39f10` | `style=outline` |
| pin | `1cd225f8284fa7e2ef19316b67d865d64c5a9419` | `style=outline` |
| chevron | `c3d71609271cbaf0c05bd13c0aa00e1496efca65` | `direction=right/left/up/down` |

**Правила**:
- Все иконки: `style=outline` (default)
- `plus round` — единственное **исключение**: `style=stroke` (тонкий «+» без круга)
- Chevron — не `style`, а `direction=right/left/up/down`
- Chevron в навигационных паттернах — ВСЕГДА перекрашивать в `content/secondary`

---

## Обновлённые / deprecated компоненты

| Компонент | Published version | Library Key | Новая версия (в source) |
|-----------|-------------------|-------------|------------------------|
| pagination | **2.2** | `d824a6e04e351ee778935ea6d0efb4c98b2d0102` | 3.0 (не опубликована) |
| status screen | **4.0** (new!) | `19993623c40044f34001e88acc81f6cbd45802f7` | — |
| status screen | 2.1 (deprecated) | `06b418cfc6395e243ffff3f45fce8318e0d3765a` | replaced by 4.0 |
| cell grid | **2.1** | `ba2d5c74e859c45a172f612a536811dbdb73bad9` | 2.2 (не опубликована) |
| title | **2.1** | `a30889ae37e403eb027eff1308408b0f0ca4f138` | .title 3.0 (dot-prefix) |
| tabbar beeline | **3.0** | `7cdac0804e514fcb3899e09bccd77849e0b458e7` | .tabbar 4.0 (dot-prefix) |

> **Правило**: для import всегда использовать **published version** (жирным). Dot-prefix версии не доступны через `import*ByKeyAsync()`.

---

## Новые компоненты

| Компонент | Library Key | Variants | Статус |
|-----------|-------------|----------|--------|
| **sheet 2.2** | `a4da9d3a1d5e353b99b8d17e66e3edbe468d5a5c` | 3 | **Опубликован** |
| file input | — | 12 | Не опубликован |
| skeleton text 1.0 | — | 4 | Не опубликован |
| iOS_AlphabeticKeyboard | — | 12 | Не опубликован |
