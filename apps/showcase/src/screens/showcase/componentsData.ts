// Каталог + история карникских компонентов проекта.
// Изменения сохраняются в localStorage браузера (ключ STORAGE_KEY).
// Чтобы поделиться состоянием с коллегой — нужно подключить общее хранилище
// (Vercel KV / Edge Config / etc.), пока что — только локально.

export type ComponentStatus = 'added' | 'in-progress' | 'needs-fixes' | 'not-added';
export type Author = 'Дима Нищев' | 'Вита Сидляр';

export const STATUS_LABEL: Record<ComponentStatus, string> = {
  'added':        'добавлен',
  'in-progress':  'в процессе',
  'needs-fixes':  'нужны правки',
  'not-added':    'не добавлен',
};

export const STATUS_ORDER: ComponentStatus[] = [
  'added',
  'in-progress',
  'needs-fixes',
  'not-added',
];

export const AUTHORS: Author[] = ['Дима Нищев', 'Вита Сидляр'];

export interface ComponentRecord {
  id: string;
  name: string;
  /** id секции showcase для перехода (если есть) */
  sectionId?: string;
  status: ComponentStatus;
  /** YYYY-MM-DD когда добавили */
  addedDate?: string;
  /** YYYY-MM-DD последнего изменения */
  lastChange?: string;
  author?: Author;
  note?: string;
  /** причина «нужны правки», вводится в модалке при выборе статуса */
  fixReason?: string;
}

// seed-данные — отражают то, что реально лежит в src/carnica/components/
export const SEED_COMPONENTS: ComponentRecord[] = [
  // — заготовки под следующие компоненты, статусы по умолчанию «не добавлен» —
  // Актуальные «добавленные» компоненты приходят из Supabase в runtime,
  // SEED тут — fallback на случай offline и backlog.
  { id: 'cell',         name: 'Cell',         status: 'not-added', note: 'строка-ячейка с иконкой, заголовком, описанием, chevron' },
  { id: 'card',         name: 'Card',         status: 'not-added', note: 'карточка с заголовком, телом, действиями' },
  { id: 'input',        name: 'Input',        status: 'not-added', note: 'текстовое поле с label, hint, error' },
  { id: 'textarea',     name: 'Textarea',     status: 'not-added' },
  { id: 'checkbox',     name: 'Checkbox',     status: 'not-added' },
  { id: 'radio',        name: 'Radio',        status: 'not-added' },
  { id: 'switch',       name: 'Switch',       status: 'not-added' },
  { id: 'slider',       name: 'Slider',       status: 'not-added' },
  { id: 'tag',          name: 'Tag',          status: 'not-added', note: 'статус-метка · 8 surface цветов · из tag 2.3' },
  { id: 'badge',        name: 'Badge',        status: 'not-added' },
  { id: 'navbar',       name: 'Navbar',       status: 'not-added', note: 'верхняя панель экрана (APP / WEB)' },
  { id: 'tabbar',       name: 'Tabbar',       status: 'not-added', note: 'нижняя панель APP' },
  { id: 'breadcrumbs',  name: 'Breadcrumbs',  status: 'not-added', note: 'WEB only' },
  { id: 'dialog',       name: 'Dialog',       status: 'not-added' },
  { id: 'modal-page',   name: 'ModalPage',    status: 'not-added' },
  { id: 'action-sheet', name: 'ActionSheet',  status: 'not-added' },
  { id: 'toast',        name: 'Toast',        status: 'not-added' },
  { id: 'skeleton',     name: 'Skeleton',     status: 'not-added' },
];

const STORAGE_KEY = 'carnica-components-v1';

export function loadComponents(): ComponentRecord[] {
  if (typeof window === 'undefined') return SEED_COMPONENTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_COMPONENTS;
    const parsed = JSON.parse(raw) as ComponentRecord[];
    if (!Array.isArray(parsed)) return SEED_COMPONENTS;
    // мерджим: новые seed-записи добавляем в конец, существующие — берём из стораджа
    const byId = new Map(parsed.map((r) => [r.id, r]));
    return SEED_COMPONENTS.map((seed) => byId.get(seed.id) ?? seed)
      .concat(parsed.filter((r) => !SEED_COMPONENTS.some((s) => s.id === r.id)));
  } catch {
    return SEED_COMPONENTS;
  }
}

export function saveComponents(records: ComponentRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* localStorage недоступен или переполнен */
  }
}

export function resetComponents(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
