import { supabase, supabaseEnabled } from './supabase';
import type { ComponentStatus } from '../componentsData';

const TABLE = 'component_changes';

export interface ChangeEntry {
  id: string;
  componentId: string;
  componentName?: string;
  fromStatus: ComponentStatus | null;
  toStatus: ComponentStatus;
  fixReason?: string;
  changedBy: string;
  changedAt: string;
}

interface DbRow {
  id: string;
  component_id: string;
  from_status: ComponentStatus | null;
  to_status: ComponentStatus;
  fix_reason: string | null;
  changed_by: string;
  changed_at: string;
}

function fromDb(r: DbRow): ChangeEntry {
  return {
    id:          r.id,
    componentId: r.component_id,
    fromStatus:  r.from_status,
    toStatus:    r.to_status,
    fixReason:   r.fix_reason ?? undefined,
    changedBy:   r.changed_by,
    changedAt:   r.changed_at,
  };
}

export async function logChange(input: {
  componentId: string;
  fromStatus: ComponentStatus | null;
  toStatus: ComponentStatus;
  fixReason?: string;
  changedBy: string;
}): Promise<void> {
  if (!supabaseEnabled || !supabase) return;
  const { error } = await supabase.from(TABLE).insert({
    component_id: input.componentId,
    from_status:  input.fromStatus,
    to_status:    input.toStatus,
    fix_reason:   input.fixReason ?? null,
    changed_by:   input.changedBy,
  });
  if (error) console.warn('audit log insert failed:', error.message);
}

export async function fetchChanges(): Promise<ChangeEntry[]> {
  if (!supabaseEnabled || !supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('changed_at', { ascending: false })
    .limit(200);
  if (error || !data) return [];
  return data.map(fromDb);
}
