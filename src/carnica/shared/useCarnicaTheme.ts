import { useEffect, useState } from 'react';

export type CarnicaTheme = 'light' | 'dark';

/**
 * Хук читает текущую Carnica-тему из data-theme атрибута на <html>.
 * Подписан на MutationObserver — если переключатель темы в шапке
 * меняет data-theme, компонент сам перерисуется с новой темой.
 *
 * Использовать в любом DS-компоненте который читает цвета из
 * colorTokens напрямую (inline styles). Для Tailwind-классов
 * (bg-bee-*, text-bee-*) хук НЕ нужен — там CSS-переменные
 * переключаются автоматически.
 *
 * Пример:
 *   const theme = useCarnicaTheme();
 *   const colors = colorTokens[theme];
 *   return <div style={{ background: colors['background/primary'] }} />;
 *
 * На сервере (SSR) или вне браузера возвращает 'light'.
 */
export function useCarnicaTheme(): CarnicaTheme {
  const [theme, setTheme] = useState<CarnicaTheme>(() => readTheme());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(readTheme());
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

function readTheme(): CarnicaTheme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}
