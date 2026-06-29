// Авторизация через Supabase Auth. Пароли больше НЕ в коде —
// хранятся в Supabase (encrypted), пользователи создаются через Dashboard.
//
// Юзер логинится коротким именем (dima / vita / guest), под капотом мы
// добавляем суффикс @carnica.local и шлём в Supabase email + password.

import { supabase, supabaseEnabled } from './supabase';

export type Role = 'editor' | 'viewer';

export interface User {
  login: string;
  /** имя для отображения и для логов изменений */
  displayName: string;
  role: Role;
  /** email из Supabase Auth — нужен для RLS (owner-matching в notes_tasks) */
  email: string;
}

const EMAIL_SUFFIX = '@carnica.local';

function loginToEmail(login: string): string {
  return login.toLowerCase().trim() + EMAIL_SUFFIX;
}

function emailToLogin(email: string): string {
  return email.replace(EMAIL_SUFFIX, '');
}

function userFromSupabase(authUser: {
  email?: string;
  user_metadata?: { display_name?: string; role?: Role };
} | null | undefined): User | null {
  if (!authUser || !authUser.email) return null;
  const meta = authUser.user_metadata ?? {};
  return {
    login:       emailToLogin(authUser.email),
    displayName: meta.display_name ?? authUser.email,
    role:        (meta.role as Role) ?? 'viewer',
    email:       authUser.email,
  };
}

/**
 * Попытаться войти по логину/паролю. Возвращает User при успехе,
 * null при провале.
 */
export async function tryLogin(login: string, password: string): Promise<{ user: User | null; error?: string }> {
  if (!supabaseEnabled || !supabase) {
    return { user: null, error: 'Supabase не подключён (нет env-vars)' };
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email:    loginToEmail(login),
    password,
  });
  if (error) {
    console.warn('[auth] signInWithPassword failed:', error);
    return { user: null, error: error.message };
  }
  if (!data.user) {
    return { user: null, error: 'нет данных пользователя в ответе' };
  }
  return { user: userFromSupabase(data.user) };
}

/**
 * Текущий пользователь из активной сессии Supabase.
 * Возвращает null если не залогинен.
 */
export async function getCurrentUser(): Promise<User | null> {
  if (!supabaseEnabled || !supabase) return null;
  const { data } = await supabase.auth.getUser();
  return userFromSupabase(data.user);
}

export async function logout(): Promise<void> {
  if (!supabaseEnabled || !supabase) return;
  await supabase.auth.signOut();
}

/**
 * Подписаться на изменения auth-состояния. Колбэк вызывается
 * при login / logout / refresh-token. Возвращает функцию отписки.
 */
export function onAuthChange(cb: (user: User | null) => void): () => void {
  if (!supabaseEnabled || !supabase) {
    cb(null);
    return () => {};
  }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(userFromSupabase(session?.user));
  });
  return () => data.subscription.unsubscribe();
}
