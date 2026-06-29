import { useEffect, useState } from 'react';

// Простой hash-роутер без зависимостей. Возвращает текущий путь после #.
// '#/components/button' → '/components/button'. По умолчанию — '/'.

function read(): string {
  if (typeof window === 'undefined') return '/';
  const h = window.location.hash.replace(/^#/, '') || '/';
  return h.startsWith('/') ? h : '/' + h;
}

export function useHashRoute(): string {
  const [path, setPath] = useState<string>(read);
  useEffect(() => {
    const onChange = () => setPath(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

export function navigate(path: string): void {
  window.location.hash = path;
}
