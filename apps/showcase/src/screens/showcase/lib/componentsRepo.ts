// Источник данных для таблицы компонентов и changelog.
// Если в env заданы Supabase-credentials — используем БД.
// Иначе — localStorage (как и было).

import { supabase, supabaseEnabled } from './supabase';
import {
  SEED_COMPONENTS,
  loadComponents as loadLocal,
  saveComponents as saveLocal,
  resetComponents as resetLocal,
  type ComponentRecord,
} from '../componentsData';

const TABLE = 'components';

// маппинг snake_case ↔ camelCase
type DbRow = {
  id: string;
  name: string;
  section_id: string | null;
  status: ComponentRecord['status'];
  added_date: string | null;
  last_change: string | null;
  author: string | null;
  note: string | null;
  fix_reason: string | null;
};

function fromDb(r: DbRow): ComponentRecord {
  return {
    id:         r.id,
    name:       r.name,
    sectionId:  r.section_id ?? undefined,
    status:     r.status,
    addedDate:  r.added_date ?? undefined,
    lastChange: r.last_change ?? undefined,
    author:     (r.author as ComponentRecord['author']) ?? undefined,
    note:       r.note ?? undefined,
    fixReason:  r.fix_reason ?? undefined,
  };
}

function toDb(r: ComponentRecord): DbRow {
  return {
    id:          r.id,
    name:        r.name,
    section_id:  r.sectionId  ?? null,
    status:      r.status,
    added_date:  r.addedDate  ?? null,
    last_change: r.lastChange ?? null,
    author:      r.author     ?? null,
    note:        r.note       ?? null,
    fix_reason:  r.fixReason  ?? null,
  };
}

const STATUS_ORDER: Record<string, number> = {
  'added': 0,
  'in-progress': 1,
  'needs-fixes': 2,
  'not-added': 3,
};

export async function fetchComponents(): Promise<ComponentRecord[]> {
  if (!supabaseEnabled || !supabase) return loadLocal();
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error || !data || data.length === 0) {
    // первая загрузка: засеем дефолтом и вернём его
    await seedIfEmpty();
    return SEED_COMPONENTS;
  }
  // Supabase = source of truth. SEED больше не мержится поверх,
  // чтобы удалённые в БД записи не возвращались из локальной заглушки.
  return data
    .map(fromDb)
    .sort((a, b) => {
      const s = (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
      return s !== 0 ? s : a.name.localeCompare(b.name);
    });
}

export async function updateComponent(record: ComponentRecord): Promise<void> {
  if (!supabaseEnabled || !supabase) {
    const current = loadLocal();
    saveLocal(current.map((r) => (r.id === record.id ? record : r)));
    return;
  }
  const { error } = await supabase.from(TABLE).upsert(toDb(record), { onConflict: 'id' });
  if (error) console.warn('supabase upsert failed:', error.message);
}

export async function resetComponents(): Promise<void> {
  if (!supabaseEnabled || !supabase) {
    resetLocal();
    return;
  }
  await supabase.from(TABLE).delete().neq('id', '___nope___');
  await seedIfEmpty();
}

async function seedIfEmpty(): Promise<void> {
  if (!supabase) return;
  const { count } = await supabase.from(TABLE).select('id', { count: 'exact', head: true });
  if ((count ?? 0) > 0) return;
  await supabase.from(TABLE).insert(SEED_COMPONENTS.map(toDb));
}
