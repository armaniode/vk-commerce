import { colorTokens } from '../tokens/colors';

/**
 * Возвращает Proxy который при каждом обращении к свойству
 * (colors['background/primary']) читает текущую тему из data-theme атрибута
 * и возвращает соответствующее значение из colorTokens.
 *
 * Это позволяет module-level helper-функциям (baseButtonStyle, colorSet, …)
 * автоматически получать актуальную тему без рефакторинга — они продолжают
 * читать `colors[name]` как раньше, но под капотом значение становится
 * dynamic.
 *
 * Компонент, который использует такие helper-функции, ДОЛЖЕН подписаться
 * на смену темы через useCarnicaTheme() — иначе React не вызовет re-render
 * при переключении темы, и старые значения останутся на экране.
 *
 * Пример:
 *   // module-level:
 *   const colors = createDynamicColors();
 *   type ColorName = keyof typeof colors;
 *
 *   // helper:
 *   function buttonStyle(name: ColorName) {
 *     return { background: colors[name] };  // читает текущую тему
 *   }
 *
 *   // component:
 *   export function Button() {
 *     useCarnicaTheme();  // подписка — обязательна для re-render
 *     return <button style={buttonStyle('background/primary')} />;
 *   }
 */
export function createDynamicColors(): typeof colorTokens.light {
  return new Proxy({} as typeof colorTokens.light, {
    get(_target, key) {
      if (typeof key !== 'string') return undefined;
      const isDark =
        typeof document !== 'undefined' &&
        document.documentElement.getAttribute('data-theme') === 'dark';
      const pool = (colorTokens as Record<'light' | 'dark', Record<string, string>>)[isDark ? 'dark' : 'light'];
      return pool[key];
    },
    has(_target, key) {
      return key in colorTokens.light;
    },
    ownKeys() {
      return Object.keys(colorTokens.light);
    },
    getOwnPropertyDescriptor(_target, key) {
      if (key in colorTokens.light) {
        return { enumerable: true, configurable: true, writable: false };
      }
      return undefined;
    },
  });
}
