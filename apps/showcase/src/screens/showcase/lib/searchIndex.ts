// Плоский индекс всех страниц + иконок для глобального поиска в шапке.

import { createElement, type ReactNode, type SVGProps } from 'react';
import { SEED_COMPONENTS } from '../componentsData';
import { FOUNDATIONS } from '../layout/Sidebar';

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactNode;

export interface SearchEntry {
  title: string;
  section: string;
  /** href для навигации (для страниц) — взаимоисключающий с iconNode */
  href?: string;
  /** для иконок — компонент для отображения в Zoom-модалке */
  iconNode?: ReactNode;
  /** для иконок — полное имя файла (IconSearch...) */
  iconFullName?: string;
  keywords?: string[];
}

const STATIC: SearchEntry[] = [
  {
    title:    'документация carnica',
    section:  'главная',
    href:     '#/',
    keywords: ['home', 'старт', 'обзор'],
  },
  {
    title:    'каталог компонентов',
    section:  'каталог',
    href:     '#/changelog',
    keywords: ['changelog', 'timeline', 'таймлайн', 'таблица', 'статус', 'история'],
  },
  {
    title:    'редполитика',
    section:  'правила',
    href:     '#/rules',
    keywords: ['tone of voice', 'tov', 'копирайт', 'микрокопия', 'lowercase', 'tone'],
  },
];

// SEED-компоненты с собственной страницей. Сейчас пусто — все стартовые
// заглушки удалены, актуальные APP-компоненты добавляются ниже вручную.
const COMPONENT_IDS_WITH_PAGE = new Set<string>([]);

const COMPONENT_HREF: Record<string, string> = {};

const COMPONENT_RU_ALIASES: Record<string, string[]> = {};

const COMPONENTS: SearchEntry[] = SEED_COMPONENTS
  .filter((c) => COMPONENT_IDS_WITH_PAGE.has(c.id))
  .map((c) => {
    const isSegment = c.id === 'segment' || c.id === 'segment-control';
    return {
      title:    isSegment ? 'SegmentControl' : c.name,
      section:  'компоненты',
      href:     COMPONENT_HREF[c.id] ?? '#/components/' + c.id,
      keywords: [
        c.name,
        ...(isSegment ? ['сегмент-контрол', 'сегмент контрол'] : []),
        ...(COMPONENT_RU_ALIASES[c.id] ?? []),
        ...(c.note ? [c.note] : []),
      ],
    };
  })
  .filter((e, i, arr) => arr.findIndex((x) => x.href === e.href) === i);

// APP-компоненты Димы
COMPONENTS.push({
  title:   'button 2.5',
  section: 'компоненты',
  href:    '#/components/app-button-23',
  keywords: ['app button', 'mobile button', 'кнопка app', 'mobile кнопка', 'pressed', 'glass', 'дима', 'button 2.5'],
});
COMPONENTS.push({
  title:   'spinner 2.1',
  section: 'компоненты',
  href:    '#/components/app-spinner-21',
  keywords: ['spinner', 'loader', 'спиннер', 'загрузка', 'крутилка', 'дима', 'spinner 2.1'],
});
COMPONENTS.push({
  title:   'badge 3.0',
  section: 'компоненты',
  href:    '#/components/app-badge-22',
  keywords: ['badge', 'бейдж', 'метка', 'уведомление', 'дима', 'badge 3.0', 'dot'],
});

const FOUND: SearchEntry[] = FOUNDATIONS.map((f) => ({
  title:    f.label,
  section:  'основы',
  href:     `#/foundations/${f.id}`,
}));

// ─────────────────────────────────────────────────────────────
// иконки — все 350 шт. Поиск по имени без префикса Icon (Search, ChevronRight)
// + по полному имени (IconSearch) + по категории (включая русский синоним).
// Клик в результатах открывает Zoom-модалку с иконкой ×6.

const CATEGORY_RU_ALIASES: Record<string, string[]> = {
  actions:    ['действия', 'действие'],
  alert:      ['уведомление', 'оповещение', 'предупреждение'],
  bookmark:   ['закладка', 'избранное', 'лайк', 'сердце', 'звезда'],
  chart:      ['график', 'диаграмма', 'статистика'],
  check:      ['галочка', 'чек', 'отметка'],
  datetime:   ['время', 'дата', 'календарь', 'часы'],
  device:     ['устройство', 'гаджет', 'клавиатура', 'тв', 'роутер'],
  document:   ['документ', 'файл', 'бумага'],
  download:   ['скачать', 'загрузка', 'выгрузка'],
  files:      ['файлы', 'папка', 'архив'],
  finance:    ['финансы', 'деньги', 'оплата', 'карта', 'банк', 'кошелёк'],
  game:       ['игра', 'развлечение', 'геймпад'],
  map:        ['карта', 'локация', 'геопозиция', 'компас'],
  media:      ['медиа', 'фото', 'видео', 'звук', 'камера', 'наушники'],
  message:    ['сообщение', 'чат', 'звонок', 'почта', 'месседж'],
  mobile:     ['телефон', 'мобильный', 'сим', 'esim'],
  navigation: ['навигация', 'стрелка', 'шеврон', 'arrow', 'chevron'],
  other:      ['разное', 'прочее'],
  security:   ['безопасность', 'замок', 'пароль', 'ключ', 'глаз'],
  shop:       ['магазин', 'корзина', 'покупки', 'тележка'],
  transport:  ['транспорт', 'доставка', 'машина'],
  user:       ['пользователь', 'юзер', 'аккаунт', 'профиль', 'аватар'],
  weather:    ['погода', 'солнце', 'луна', 'sun', 'moon'],
};

const iconModules = import.meta.glob<Record<string, IconComponent>>(
  '../../../../../../src/carnica/icons/*/Icon*.tsx',
  { eager: true }
);

const ICONS: SearchEntry[] = [];
for (const [path, mod] of Object.entries(iconModules)) {
  const m = path.match(/icons\/([^/]+)\/(Icon[A-Za-z0-9]+)\.tsx$/);
  if (!m) continue;
  const [, category, fullName] = m;
  const Icon = mod[fullName];
  if (typeof Icon !== 'function') continue;
  const shortName = fullName.replace(/^Icon/, '');
  ICONS.push({
    title:        shortName,
    section:      `иконка · ${category}`,
    iconNode:     createElement(Icon),
    iconFullName: fullName,
    keywords:     [
      fullName,
      category,
      ...(CATEGORY_RU_ALIASES[category] ?? []),
    ],
  });
}

export const SEARCH_INDEX: SearchEntry[] = [...STATIC, ...COMPONENTS, ...FOUND, ...ICONS];
