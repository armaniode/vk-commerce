import { supabase, supabaseEnabled } from './supabase';

const TABLE = 'notes_tasks';

export interface Task {
  id: string;
  owner: string;
  text: string;
  done: boolean;
  createdAt: string;
  completedAt: string | null;
}

interface DbRow {
  id: string;
  owner: string;
  text: string;
  done: boolean;
  created_at: string;
  completed_at: string | null;
}

function fromDb(r: DbRow): Task {
  return {
    id:          r.id,
    owner:       r.owner,
    text:        r.text,
    done:        r.done,
    createdAt:   r.created_at,
    completedAt: r.completed_at,
  };
}

export async function fetchTasks(owner: string): Promise<Task[]> {
  if (!supabaseEnabled || !supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('owner', owner)
    .order('done', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(fromDb);
}

export async function createTask(owner: string, text: string): Promise<Task | null> {
  if (!supabaseEnabled || !supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ owner, text })
    .select('*')
    .single();
  if (error || !data) return null;
  return fromDb(data as DbRow);
}

export async function toggleTask(id: string, done: boolean): Promise<void> {
  if (!supabaseEnabled || !supabase) return;
  const { error } = await supabase
    .from(TABLE)
    .update({ done, completed_at: done ? new Date().toISOString() : null })
    .eq('id', id);
  if (error) console.warn('toggleTask failed:', error.message);
}

export async function deleteTask(id: string): Promise<void> {
  if (!supabaseEnabled || !supabase) return;
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) console.warn('deleteTask failed:', error.message);
}
