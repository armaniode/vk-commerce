import {
  useId,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';

import { radius } from '../../../tokens/spacing';
import { createDynamicColors, useCarnicaTheme } from '../../../shared';

export const APP_SPINNER_FIGMA_VERSION = 'spinner 2.1' as const;
export const APP_SPINNER_FIGMA_NODE_ID = '14447:9258' as const;
export const APP_SPINNER_FIGMA_KEY = '8e1b37482fddc4a28e1a87577cb3286d32c20197' as const;

export const appSpinnerTheme = ['light', 'dark'] as const;
export type AppSpinnerTheme = (typeof appSpinnerTheme)[number];

export const appSpinnerColor = [
  'constant dark/light',
  'constant dark/brand',
  'constant light/brand',
  'brand',
  'brand/invert',
] as const;
export type AppSpinnerColor = (typeof appSpinnerColor)[number];

type NativeSpinnerProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'>;

export interface SpinnerProps extends NativeSpinnerProps {
  color?: AppSpinnerColor;
  theme?: AppSpinnerTheme;
  size?: number;
  style?: CSSProperties;
}

const spinnerAnimationCss = `
@keyframes carnica-app-spinner-out {
  0% { opacity: 1; transform: scaleX(0); }
  16.666% { opacity: 1; transform: scaleX(1); }
  25% { opacity: 1; transform: scaleX(1); }
  41.666% { opacity: 1; transform: scaleX(0); }
  49.999% { opacity: 0; transform: scaleX(0); }
  100% { opacity: 0; transform: scaleX(0); }
}

@keyframes carnica-app-spinner-in {
  0% { opacity: 0; transform: scaleX(0); }
  49.999% { opacity: 0; transform: scaleX(0); }
  50% { opacity: 1; transform: scaleX(0); }
  66.666% { opacity: 1; transform: scaleX(1); }
  75% { opacity: 1; transform: scaleX(1); }
  91.666% { opacity: 1; transform: scaleX(0); }
  100% { opacity: 0; transform: scaleX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .carnica-app-spinner-layer {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;

// Динамический Proxy — читает текущую data-theme. Компонент подписывается
// через useCarnicaTheme() для re-render при переключении темы.
const colors = createDynamicColors();
type ColorName = keyof typeof colors;

interface SpinnerColorPair {
  first: ColorName;
  second: ColorName;
}

const fixedSpinnerColorPairs: Record<
  Exclude<AppSpinnerColor, 'brand' | 'brand/invert'>,
  SpinnerColorPair
> = {
  'constant dark/light': colorPair('constant/dark', 'constant/light'),
  'constant dark/brand': colorPair('constant/dark', 'brand/primary'),
  'constant light/brand': colorPair('constant/light', 'brand/primary'),
};

function colorPair(first: ColorName, second: ColorName): SpinnerColorPair {
  return { first, second };
}

function getSpinnerColorPair(
  color: AppSpinnerColor,
  theme: AppSpinnerTheme,
): SpinnerColorPair {
  if (color === 'brand') {
    return theme === 'dark'
      ? colorPair('constant/light', 'brand/primary')
      : colorPair('constant/dark', 'brand/primary');
  }

  if (color === 'brand/invert') {
    return theme === 'dark'
      ? colorPair('constant/dark', 'brand/primary')
      : colorPair('constant/light', 'brand/primary');
  }

  return fixedSpinnerColorPairs[color];
}

export function Spinner({
  'aria-label': ariaLabel,
  className,
  color = 'constant dark/light',
  size = 20,
  style,
  theme = 'light',
  ...props
}: SpinnerProps) {
  // Подписка на смену data-theme — re-render при переключении темы.
  useCarnicaTheme();
  const reactId = useId().replace(/:/g, '');
  const clipPathId = `carnica-app-spinner-${reactId}`;
  const colorNames = getSpinnerColorPair(color, theme);

  return (
    <span
      {...props}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      className={className || undefined}
      role={ariaLabel ? 'status' : undefined}
      style={{
        display: 'inline-flex',
        flex: '0 0 auto',
        height: size,
        overflow: 'hidden',
        verticalAlign: 'middle',
        width: size,
        ...style,
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        height={size}
        viewBox="0 0 32 32"
        width={size}
        style={{
          borderRadius: radius['radius/infinite'],
          display: 'block',
          flex: '0 0 auto',
          height: size,
          width: size,
        }}
      >
        <style>{spinnerAnimationCss}</style>
        <defs>
          <clipPath id={clipPathId}>
            <circle cx="16" cy="16" r="16" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipPathId})`}>
          <circle
            className="carnica-app-spinner-layer"
            cx="16"
            cy="16"
            fill={colors[colorNames.first]}
            r="16"
            style={{
              animation: 'carnica-app-spinner-out 2000ms cubic-bezier(0.2, 0, 0, 1) infinite',
              transformBox: 'view-box',
              transformOrigin: '0px 16px',
            }}
          />
          <circle
            className="carnica-app-spinner-layer"
            cx="16"
            cy="16"
            fill={colors[colorNames.second]}
            r="16"
            style={{
              animation: 'carnica-app-spinner-in 2000ms cubic-bezier(0.2, 0, 0, 1) infinite',
              transformBox: 'view-box',
              transformOrigin: '0px 16px',
            }}
          />
        </g>
      </svg>
    </span>
  );
}
