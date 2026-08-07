import { semanticColorsDark } from './colors.dark';
import { semanticColorsLight } from './colors.light';

export type ThemeMode = 'light' | 'dark';

export const semanticColors = {
  light: semanticColorsLight,
  dark: semanticColorsDark,
} as const;

export function getSemanticColors(theme: ThemeMode) {
  return semanticColors[theme];
}

export { semanticColorsDark, semanticColorsLight };
