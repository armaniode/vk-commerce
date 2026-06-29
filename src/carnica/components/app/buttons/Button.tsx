import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { radius } from '../../../tokens/spacing';
import { bodyAccent, caption, fontFamily } from '../../../tokens/typography';
import { createDynamicColors, useCarnicaTheme } from '../../../shared';
import { Badge, type AppBadgeColor } from '../badges';
import { Spinner, type AppSpinnerColor } from '../spinner';

export const APP_BUTTON_FIGMA_VERSION = 'button 2.5' as const;
export const APP_BUTTON_FIGMA_NODE_ID = '1311:3203' as const;
export const APP_BUTTON_FIGMA_KEY = 'e091f3958e87ecfb8a446373fea1ecd020d1462b' as const;

export const appButtonPriority = [
  'primary',
  'secondary on bg_primary',
  'secondary on bg_secondary',
  'secondary on bg_tertiary',
  'secondary on bg_additional',
  'tertiary',
  'destructive',
] as const;
export type AppButtonPriority = (typeof appButtonPriority)[number];

export const appButtonSize = ['large', 'medium', 'small'] as const;
export type AppButtonSize = (typeof appButtonSize)[number];

export type AppButtonAppearance = 'default' | 'glass';
export type ButtonState = 'default' | 'pressed' | 'disabled' | 'loading';
export type ButtonGlassState = Exclude<ButtonState, 'pressed'>;

type ButtonAppearanceProps =
  | {
      appearance?: 'default';
      state?: ButtonState;
    }
  | {
      appearance: 'glass';
      state?: ButtonGlassState;
    };

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-busy' | 'aria-label' | 'children' | 'disabled'
>;

interface ButtonCommonProps extends NativeButtonProps {
  priority?: AppButtonPriority;
  className?: string;
  style?: CSSProperties;
}

type ButtonTextLargeProps = ButtonCommonProps &
  ButtonAppearanceProps & {
    view?: 'text';
    size?: 'large';
    children: ReactNode;
    sale?: ReactNode;
    leftIcon?: never;
    rightIcon?: never;
    icon?: never;
    badge?: never;
    'aria-label'?: never;
  };

type ButtonTextCompactProps = ButtonCommonProps &
  ButtonAppearanceProps & {
    view?: 'text';
    size: 'medium' | 'small';
    children: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    sale?: never;
    icon?: never;
    badge?: never;
    'aria-label'?: never;
  };

type ButtonIconProps = ButtonCommonProps &
  ButtonAppearanceProps & {
    view: 'icon';
    size?: AppButtonSize;
    icon: ReactNode;
    'aria-label': string;
    badge?: boolean;
    children?: never;
    sale?: never;
    leftIcon?: never;
    rightIcon?: never;
  };

export type ButtonProps =
  | ButtonTextLargeProps
  | ButtonTextCompactProps
  | ButtonIconProps;

// Динамический Proxy — при каждом обращении читает текущую data-theme.
// Компонент ниже подписывается через useCarnicaTheme() для re-render
// при переключении темы. Module-level helper-функции (baseButtonStyle,
// colorSet, …) работают без изменений — просто читают актуальные значения.
const colors = createDynamicColors();

type ColorName = keyof typeof colors;

interface ButtonColorTokens {
  background: ColorName;
  foreground: ColorName;
  sale: ColorName;
}

const defaultPriorityColors: Record<
  AppButtonPriority,
  Record<ButtonState, ButtonColorTokens>
> = {
  primary: {
    default: colorSet('brand/primary', 'constant/dark'),
    pressed: colorSet('brand/tertiary', 'constant/dark'),
    disabled: colorSet('elements/disabled', 'content/disabled'),
    loading: colorSet('brand/primary', 'constant/dark'),
  },
  'secondary on bg_primary': {
    default: colorSet('elements/primary', 'content/primary', 'content/disabled'),
    pressed: colorSet('elements/primary', 'content/secondary', 'content/disabled'),
    disabled: colorSet('elements/disabled', 'content/disabled'),
    loading: colorSet('elements/primary', 'content/primary', 'content/disabled'),
  },
  'secondary on bg_secondary': {
    default: colorSet('elements/secondary', 'content/primary', 'content/disabled'),
    pressed: colorSet('elements/secondary', 'content/secondary', 'content/disabled'),
    disabled: colorSet('elements/disabled', 'content/disabled'),
    loading: colorSet('elements/secondary', 'content/primary', 'content/disabled'),
  },
  'secondary on bg_tertiary': {
    default: colorSet('elements/additional01', 'content/primary', 'content/disabled'),
    pressed: colorSet('elements/additional01', 'content/secondary', 'content/disabled'),
    disabled: colorSet('elements/disabled', 'content/disabled'),
    loading: colorSet('elements/additional01', 'content/primary', 'content/disabled'),
  },
  'secondary on bg_additional': {
    default: colorSet('elements/additional02', 'content/primary', 'content/disabled'),
    pressed: colorSet('elements/additional02', 'content/secondary', 'content/disabled'),
    disabled: colorSet('elements/additional02', 'content/disabled'),
    loading: colorSet('elements/additional02', 'content/primary', 'content/disabled'),
  },
  tertiary: {
    default: colorSet(
      'elements/active',
      'content/primary 100%-invert',
      'content/disabled 100%-invert',
    ),
    pressed: colorSet(
      'elements/active',
      'content/secondary 100%-invert',
      'content/disabled 100%-invert',
    ),
    disabled: colorSet('elements/disabled', 'content/disabled'),
    loading: colorSet(
      'elements/active',
      'content/primary 100%-invert',
      'content/disabled 100%-invert',
    ),
  },
  destructive: {
    default: colorSet('error/primary', 'constant/light'),
    pressed: colorSet('error/secondary', 'constant/light'),
    disabled: colorSet('elements/disabled', 'content/disabled'),
    loading: colorSet('error/primary', 'constant/light'),
  },
};

const glassPriorityColors: Record<
  AppButtonPriority,
  Record<ButtonGlassState, ButtonColorTokens>
> = {
  primary: {
    default: colorSet('glass/brand', 'constant/dark'),
    disabled: colorSet('glass/disabled', 'content/disabled'),
    loading: colorSet('glass/brand', 'constant/dark'),
  },
  'secondary on bg_primary': {
    default: colorSet('glass/primary', 'content/primary', 'content/disabled'),
    disabled: colorSet('glass/disabled', 'content/disabled'),
    loading: colorSet('glass/primary', 'content/primary', 'content/disabled'),
  },
  'secondary on bg_secondary': {
    default: colorSet('glass/secondary', 'content/primary', 'content/disabled'),
    disabled: colorSet('glass/disabled', 'content/disabled'),
    loading: colorSet('glass/secondary', 'content/primary', 'content/disabled'),
  },
  'secondary on bg_tertiary': {
    default: colorSet('glass/primary', 'content/primary', 'content/disabled'),
    disabled: colorSet('glass/disabled', 'content/disabled'),
    loading: colorSet('glass/primary', 'content/primary', 'content/disabled'),
  },
  'secondary on bg_additional': {
    default: colorSet('glass/secondary', 'content/primary', 'content/disabled'),
    disabled: colorSet('glass/disabled', 'content/disabled'),
    loading: colorSet('glass/secondary', 'content/primary', 'content/disabled'),
  },
  tertiary: {
    default: colorSet(
      'glass/invert',
      'content/primary 100%-invert',
      'content/disabled 100%-invert',
    ),
    disabled: colorSet('glass/disabled', 'content/disabled'),
    loading: colorSet(
      'glass/invert',
      'content/primary 100%-invert',
      'content/disabled 100%-invert',
    ),
  },
  destructive: {
    default: colorSet('glass/error', 'constant/light'),
    disabled: colorSet('glass/disabled', 'content/disabled'),
    loading: colorSet('glass/error', 'constant/light'),
  },
};

const textSizeStyle: Record<AppButtonSize, CSSProperties> = {
  large: {
    width: '100%',
    height: 56,
    minHeight: 56,
    padding: '18px 20px',
    gap: 8,
    ...textStyle(bodyAccent.small),
  },
  medium: {
    width: 'fit-content',
    height: 44,
    minHeight: 44,
    padding: '12px 16px',
    gap: 4,
    ...textStyle(bodyAccent.small),
  },
  small: {
    width: 'fit-content',
    height: 24,
    minHeight: 24,
    padding: '4px 6px',
    gap: 4,
    ...textStyle(caption.medium),
  },
};

const iconSizeStyle: Record<AppButtonSize, CSSProperties> = {
  large: {
    width: 56,
    height: 56,
    minWidth: 56,
    minHeight: 56,
    padding: 16,
  },
  medium: {
    width: 44,
    height: 44,
    minWidth: 44,
    minHeight: 44,
    padding: 10,
  },
  small: {
    width: 24,
    height: 24,
    minWidth: 24,
    minHeight: 24,
    padding: 4,
  },
};

const sideIconSize: Record<'medium' | 'small', number> = {
  medium: 20,
  small: 16,
};

const spinnerSize: Record<AppButtonSize, number> = {
  large: 24,
  medium: 20,
  small: 14,
};

const badgeOffset: Record<AppButtonSize, number> = {
  large: 0,
  medium: -2,
  small: -6,
};

function colorSet(
  background: ColorName,
  foreground: ColorName,
  sale: ColorName = foreground,
): ButtonColorTokens {
  return {
    background,
    foreground,
    sale,
  };
}

function textStyle(token: {
  readonly fontSize: string;
  readonly fontWeight: number;
  readonly lineHeight: string;
}): CSSProperties {
  return {
    fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: token.lineHeight,
  };
}

function getColorTokens(
  appearance: AppButtonAppearance,
  priority: AppButtonPriority,
  state: ButtonState,
) {
  if (appearance === 'glass') {
    const glassState: ButtonGlassState = state === 'pressed' ? 'default' : state;
    return glassPriorityColors[priority][glassState];
  }

  return defaultPriorityColors[priority][state];
}

function getBadgeColor(priority: AppButtonPriority): AppBadgeColor {
  return priority === 'primary' || priority === 'destructive' ? 'accent' : 'brand';
}

function canRenderBadge(
  appearance: AppButtonAppearance,
  state: ButtonState,
): boolean {
  if (state === 'disabled' || state === 'loading') {
    return false;
  }

  if (appearance === 'glass' && state !== 'default') {
    return false;
  }

  return true;
}

function getSpinnerColor(priority: AppButtonPriority): AppSpinnerColor {
  if (priority === 'primary' || priority === 'destructive') {
    return 'constant dark/light';
  }

  if (priority === 'tertiary') {
    return 'brand/invert';
  }

  return 'brand';
}

function badgePositionStyle(size: AppButtonSize): CSSProperties {
  const offset = badgeOffset[size];

  return {
    position: 'absolute',
    right: offset,
    top: offset,
  };
}

function baseButtonStyle(
  size: AppButtonSize,
  view: 'text' | 'icon',
  appearance: AppButtonAppearance,
  colorNames: ButtonColorTokens,
  state: ButtonState,
): CSSProperties {
  return {
    alignItems: 'center',
    appearance: 'none',
    background: colors[colorNames.background],
    border: 0,
    borderRadius: radius['radius/infinite'],
    boxSizing: 'border-box',
    color: colors[colorNames.foreground],
    cursor: state === 'disabled' || state === 'loading' ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    margin: 0,
    opacity: 1,
    overflow: view === 'icon' ? 'visible' : 'hidden',
    position: 'relative',
    textDecoration: 'none',
    transition: 'background-color 150ms ease, color 150ms ease, transform 150ms ease',
    userSelect: 'none',
    ...(appearance === 'glass' ? { backdropFilter: 'blur(24px)' } : null),
    ...(view === 'text' ? textSizeStyle[size] : iconSizeStyle[size]),
  };
}

function textWrapperStyle(size: AppButtonSize): CSSProperties {
  return {
    alignItems: 'center',
    display: 'inline-flex',
    gap: size === 'large' ? 8 : 0,
    justifyContent: 'center',
    minWidth: 0,
    overflow: 'hidden',
    paddingInline: size === 'medium' ? 4 : size === 'small' ? 2 : 0,
  };
}

function truncationStyle(flexShrink = 1): CSSProperties {
  return {
    flexShrink,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
}

function renderSizedIcon(icon: ReactNode, size: number) {
  return (
    <span
      aria-hidden="true"
      style={{
        alignItems: 'center',
        display: 'inline-flex',
        flex: '0 0 auto',
        height: size,
        justifyContent: 'center',
        width: size,
      }}
    >
      {icon}
    </span>
  );
}

function renderButtonBadge(size: AppButtonSize, priority: AppButtonPriority) {
  return (
    <Badge
      aria-hidden="true"
      color={getBadgeColor(priority)}
      label="2"
      size="S"
      stretch={false}
      style={badgePositionStyle(size)}
      view="text"
    />
  );
}

export function Button(props: ButtonProps) {
  // Подписка на смену темы — без этого helper-функции продолжат
  // возвращать старые цвета даже после переключения data-theme.
  useCarnicaTheme();

  const {
    appearance = 'default',
    className = '',
    priority = 'primary',
    size = 'large',
    state = 'default',
    style,
    type = 'button',
    view = 'text',
    ...nativeProps
  } = props as ButtonProps & {
    appearance?: AppButtonAppearance;
    state?: ButtonState;
    view?: 'text' | 'icon';
  };

  const colorNames = getColorTokens(appearance, priority, state);
  const disabled = state === 'disabled' || state === 'loading';
  const mergedStyle = {
    ...baseButtonStyle(size, view, appearance, colorNames, state),
    ...style,
  };

  if (view === 'icon') {
    const { badge = false, icon, ...buttonProps } = nativeProps as ButtonIconProps;
    const shouldRenderBadge = badge && canRenderBadge(appearance, state);

    return (
      <button
        {...buttonProps}
        aria-busy={state === 'loading' || undefined}
        className={className || undefined}
        disabled={disabled}
        style={mergedStyle}
        type={type}
      >
        {state === 'loading' ? (
          <Spinner color={getSpinnerColor(priority)} size={spinnerSize[size]} />
        ) : (
          renderSizedIcon(icon, size === 'small' ? 16 : 24)
        )}
        {shouldRenderBadge ? renderButtonBadge(size, priority) : null}
      </button>
    );
  }

  const {
    children,
    leftIcon,
    rightIcon,
    sale,
    ...buttonProps
  } = nativeProps as (ButtonTextLargeProps | ButtonTextCompactProps) & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    sale?: ReactNode;
  };
  const compactSize = size === 'large' ? null : size;

  return (
    <button
      {...buttonProps}
      aria-busy={state === 'loading' || undefined}
      className={className || undefined}
      disabled={disabled}
      style={mergedStyle}
      type={type}
    >
      {state === 'loading' ? (
        <Spinner color={getSpinnerColor(priority)} size={spinnerSize[size]} />
      ) : (
        <>
          {compactSize && leftIcon ? renderSizedIcon(leftIcon, sideIconSize[compactSize]) : null}
          <span style={textWrapperStyle(size)}>
            <span style={truncationStyle()}>{children}</span>
            {sale ? (
              <span
                style={{
                  ...truncationStyle(0),
                  color: colors[colorNames.sale],
                  opacity: 0.6,
                  textDecoration: 'line-through',
                }}
              >
                {sale}
              </span>
            ) : null}
          </span>
          {compactSize && rightIcon ? renderSizedIcon(rightIcon, sideIconSize[compactSize]) : null}
        </>
      )}
    </button>
  );
}
