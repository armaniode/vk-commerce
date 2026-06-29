import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Клиент Supabase создаётся только если в env-переменных есть URL и ключ.
// Иначе — null, и репозиторий компонентов падает на localStorage-fallback.
//
// Поддерживаем оба имени: PUBLISHABLE_KEY (новое название Supabase) и
// ANON_KEY (старое). Берём первое попавшееся.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export const supabaseEnabled = supabase !== null;
