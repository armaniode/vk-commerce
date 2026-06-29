import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import { radius } from '../../../tokens/spacing';
import { bodyAccent, caption, fontFamily } from '../../../tokens/typography';
import { createDynamicColors, useCarnicaTheme } from '../../../shared';

export const APP_BADGE_FIGMA_VERSION = 'badge 3.0' as const;
export const APP_BADGE_FIGMA_NODE_ID = '34792:150143' as const;
export const APP_BADGE_FIGMA_KEY = '6d34787991adf40a9db2b09099cfcad4517606f5' as const;

export const appBadgeView = ['dot', 'text', 'icon'] as const;
export type AppBadgeView = (typeof appBadgeView)[number];

export const appBadgeColor = [
  'default on bg_primary',
  'default on bg_secondary',
  'default on bg_tertiary',
  'brand',
  'invert',
  'accent',
  'error',
  'success',
  'custom',
] as const;
export type AppBadgeColor = (typeof appBadgeColor)[number];

export const appBadgeSize = ['S', 'M'] as const;
export type AppBadgeSize = (typeof appBadgeSize)[number];

type NativeBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'>;

interface BadgeCommonProps extends NativeBadgeProps {
  color?: AppBadgeColor;
  size?: AppBadgeSize;
  style?: CSSProperties;
}

type BadgeDotProps = BadgeCommonProps & {
  view?: 'dot';
  label?: never;
  icon?: never;
  stretch?: never;
};

type BadgeTextProps = BadgeCommonProps & {
  view: 'text';
  label: ReactNode;
  stretch?: boolean;
  icon?: never;
};

type BadgeIconProps = BadgeCommonProps & {
  view: 'icon';
  icon: ReactNode;
  label?: never;
  stretch?: never;
};

export type BadgeProps = BadgeDotProps | BadgeTextProps | BadgeIconProps;

// Динамический Proxy — читает текущую data-theme.
const colors = createDynamicColors();
type ColorName = keyof typeof colors;

interface BadgeColorTokens {
  background: ColorName;
  foreground: ColorName;
}

const badgeColorTokens: Record<AppBadgeColor, BadgeColorTokens> = {
  'default on bg_primary': colorSet('elements/primary', 'content/primary'),
  'default on bg_secondary': colorSet('elements/secondary', 'content/primary'),
  'default on bg_tertiary': colorSet('elements/additional01', 'content/primary'),
  brand: colorSet('brand/primary', 'constant/dark'),
  invert: colorSet('elements/active', 'content/primary 100%-invert'),
  accent: colorSet('link/primary', 'constant/light'),
  error: colorSet('error/primary', 'constant/light'),
  success: colorSet('success/primary', 'constant/light'),
  custom: colorSet('surface/08-yellow', 'constant/dark'),
};

const dotDimensions: Record<AppBadgeSize, number> = {
  S: 8,
  M: 12,
};

const contentDimensions: Record<AppBadgeSize, number> = {
  S: 16,
  M: 24,
};

const iconSize: Record<AppBadgeSize, number> = {
  S: 10,
  M: 14,
};

function colorSet(background: ColorName, foreground: ColorName): BadgeColorTokens {
  return { background, foreground };
}

function textStyle(size: AppBadgeSize): CSSProperties {
  const token = size === 'S' ? caption.medium : bodyAccent.small;

  return {
    fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: token.lineHeight,
  };
}

function baseStyle(
  dimensions: { size: number; paddingInline: number; paddingBlock: number },
  colorNames: BadgeColorTokens,
  style?: CSSProperties,
): CSSProperties {
  return {
    alignItems: 'center',
    background: colors[colorNames.background],
    borderRadius: radius['radius/infinite'],
    boxSizing: 'border-box',
    color: colors[colorNames.foreground],
    display: 'inline-flex',
    flex: '0 0 auto',
    justifyContent: 'center',
    margin: 0,
    minHeight: dimensions.size,
    minWidth: dimensions.size,
    overflow: 'hidden',
    paddingBlock: dimensions.paddingBlock,
    paddingInline: dimensions.paddingInline,
    position: 'relative',
    verticalAlign: 'middle',
    ...style,
  };
}

function DotBadge({
  color,
  size,
  style,
  ...props
}: BadgeDotProps & { color: AppBadgeColor; size: AppBadgeSize }) {
  const dimensions = dotDimensions[size];
  const colorNames = badgeColorTokens[color];

  return (
    <span
      {...props}
      style={{
        background: colors[colorNames.background],
        borderRadius: radius['radius/infinite'],
        display: 'inline-block',
        flex: '0 0 auto',
        height: dimensions,
        overflow: 'hidden',
        verticalAlign: 'middle',
        width: dimensions,
        ...style,
      }}
    />
  );
}

function TextBadge({
  color,
  label,
  size,
  stretch = true,
  style,
  ...props
}: BadgeTextProps & { color: AppBadgeColor; size: AppBadgeSize }) {
  const dimensions = {
    size: contentDimensions[size],
    paddingBlock: size === 'S' ? 0 : 2,
    paddingInline: size === 'S' ? 4 : 6,
  };

  return (
    <span
      {...props}
      style={{
        ...baseStyle(dimensions, badgeColorTokens[color], style),
        height: dimensions.size,
        width: stretch ? undefined : dimensions.size,
        maxWidth: stretch ? undefined : dimensions.size,
        ...textStyle(size),
      }}
    >
      <span
        style={{
          minWidth: 0,
          overflow: 'hidden',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </span>
  );
}

function IconBadge({
  color,
  icon,
  size,
  style,
  ...props
}: BadgeIconProps & { color: AppBadgeColor; size: AppBadgeSize }) {
  const dimensions = {
    size: contentDimensions[size],
    paddingBlock: size === 'S' ? 2 : 4,
    paddingInline: size === 'S' ? 2 : 4,
  };

  return (
    <span
      {...props}
      style={{
        ...baseStyle(dimensions, badgeColorTokens[color], style),
        height: dimensions.size,
        width: dimensions.size,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          alignItems: 'center',
          color: 'currentColor',
          display: 'inline-flex',
          height: iconSize[size],
          justifyContent: 'center',
          width: iconSize[size],
        }}
      >
        {icon}
      </span>
    </span>
  );
}

export function Badge(props: BadgeProps) {
  // Подписка на смену data-theme — re-render при переключении темы.
  useCarnicaTheme();
  const {
    color = 'default on bg_primary',
    size = 'S',
    view = 'dot',
  } = props as BadgeProps & {
    color?: AppBadgeColor;
    size?: AppBadgeSize;
    view?: AppBadgeView;
  };

  if (view === 'text') {
    return <TextBadge {...(props as BadgeTextProps)} color={color} size={size} />;
  }

  if (view === 'icon') {
    return <IconBadge {...(props as BadgeIconProps)} color={color} size={size} />;
  }

  return <DotBadge {...(props as BadgeDotProps)} color={color} size={size} />;
}
