import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from 'react';

import {
  getPlatformTokens,
  getSemanticColors,
  radius,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './Button.module.css';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonWidth = 'hugged' | 'filled';
export type ButtonAppearance = 'neutral' | 'overlay' | 'custom';
export type ButtonMode = 'primary' | 'secondary' | 'outline' | 'link';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled'
>;

interface ButtonSharedProps extends NativeButtonProps {
  size?: ButtonSize;
  appearance?: ButtonAppearance;
  disabled?: boolean;
  theme?: ThemeMode;
  platform?: PlatformMode;
  className?: string;
}

type ButtonWidthContract =
  | {
      width?: 'hugged';
      mode?: ButtonMode;
    }
  | {
      width: 'filled';
      mode?: Exclude<ButtonMode, 'link'>;
    };

type TextButtonContent = {
  children: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  counter?: ReactNode | number | string;
  icon?: never;
};

type IconButtonContent = {
  icon: ReactNode;
  children?: never;
  before?: never;
  after?: never;
  counter?: never;
  'aria-label': string;
};

export type ButtonProps = ButtonSharedProps &
  ButtonWidthContract &
  (TextButtonContent | IconButtonContent);

interface ButtonSizeConfig {
  readonly height: number;
  readonly radius: number;
  readonly horizontalPadding: number;
  readonly iconSize: number;
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly weight: 'semibold' | 'semiboldish';
  readonly counterFontSize: number;
  readonly counterLineHeight: number;
  readonly counterWeight: 'semibold' | 'bold';
  readonly counterPaddingTop: number;
}

const BUTTON_SIZE_CONFIG = {
  small: {
    height: 28,
    radius: radius.sizeS,
    horizontalPadding: spacing.sizeXl,
    iconSize: 16,
    fontSize: 13.5,
    lineHeight: 15,
    weight: 'semibold',
    counterFontSize: 13.5,
    counterLineHeight: 15,
    counterWeight: 'bold',
    counterPaddingTop: 0,
  },
  medium: {
    height: 38,
    radius: radius.sizeM,
    // The 14px value is a confirmed component dimension without a public primitive.
    horizontalPadding: 14,
    iconSize: 20,
    fontSize: 15,
    lineHeight: 18.5,
    weight: 'semiboldish',
    counterFontSize: 15,
    counterLineHeight: 18.5,
    counterWeight: 'semibold',
    counterPaddingTop: 0,
  },
  large: {
    height: 52,
    radius: radius.sizeL,
    horizontalPadding: spacing.size2xl,
    iconSize: 24,
    fontSize: 18,
    lineHeight: 21,
    weight: 'semibold',
    counterFontSize: 16,
    counterLineHeight: 18.5,
    counterWeight: 'bold',
    counterPaddingTop: 2,
  },
} as const satisfies Record<ButtonSize, ButtonSizeConfig>;

const BUTTON_CONTENT_GAP = spacing.sizeS;
const BUTTON_DISABLED_OPACITY = 0.52;
const IOS_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';
const NEUTRAL_PRIMARY_BACKGROUND = '#212121';
const OVERLAY_PRIMARY_BACKGROUND = 'rgba(255, 255, 255, 0.8)';

interface ButtonSurface {
  readonly background: string;
  readonly backgroundOpacity: number;
  readonly borderColor: string;
  readonly borderWidth: number;
  readonly textColor: string;
  readonly counterColor: string;
  readonly backdropBlur: number;
  readonly boxShadow: string;
  readonly accessoryColor: string;
}

interface ButtonCssProperties extends CSSProperties {
  '--button-height': string;
  '--button-radius': string;
  '--button-horizontal-padding': string;
  '--button-content-gap': string;
  '--button-icon-size': string;
  '--button-font-family': string;
  '--button-font-size': string;
  '--button-font-weight': number;
  '--button-line-height': string;
  '--button-text-color': string;
  '--button-counter-color': string;
  '--button-counter-font-size': string;
  '--button-counter-font-weight': number;
  '--button-counter-line-height': string;
  '--button-counter-padding-top': string;
  '--button-background': string;
  '--button-background-opacity': number;
  '--button-border-color': string;
  '--button-border-width': string;
  '--button-backdrop-blur': string;
  '--button-box-shadow': string;
  '--button-accessory-color': string;
  '--button-disabled-opacity': number;
  '--button-focus-color': string;
}

interface ButtonSurfaceLayersProps {
  readonly clipGlossySurface: boolean;
}

function ButtonSurfaceLayers({
  clipGlossySurface,
}: ButtonSurfaceLayersProps) {
  const layers = (
    <>
      <span aria-hidden="true" className={styles.surface} />
      <span aria-hidden="true" className={styles.surfaceAccessory} />
    </>
  );

  if (clipGlossySurface) {
    return (
      <span aria-hidden="true" className={styles.surfaceClip}>
        {layers}
      </span>
    );
  }

  return layers;
}

function getCounterColorVariant(appearance: ButtonAppearance, mode: ButtonMode) {
  if (
    (appearance === 'overlay' || appearance === 'custom') &&
    mode !== 'primary'
  ) {
    return 'contrast';
  }

  return 'secondary';
}

function getButtonSurface(
  appearance: ButtonAppearance,
  mode: ButtonMode,
  theme: ThemeMode,
): ButtonSurface {
  const colors = getSemanticColors(theme);
  const counterColor =
    getCounterColorVariant(appearance, mode) === 'contrast'
      ? colors.text.contrast
      : colors.text.secondary;

  if (mode === 'link') {
    const textColor =
      appearance === 'neutral'
        ? colors.text.primary
        : appearance === 'overlay'
          ? colors.text.contrast
          : colors.palette.accentPurple;

    return {
      background: 'transparent',
      backgroundOpacity: 1,
      borderColor: 'transparent',
      borderWidth: 0,
      textColor,
      counterColor,
      backdropBlur: 0,
      boxShadow: 'none',
      accessoryColor: 'transparent',
    };
  }

  if (appearance === 'neutral') {
    if (mode === 'primary') {
      const isDark = theme === 'dark';

      return {
        background: isDark
          ? OVERLAY_PRIMARY_BACKGROUND
          : NEUTRAL_PRIMARY_BACKGROUND,
        backgroundOpacity: 1,
        borderColor: isDark
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1,
        textColor: colors.text.contrastThemed,
        counterColor,
        backdropBlur: isDark ? 6 : 0,
        boxShadow: isDark
          ? 'none'
          : 'inset 0 0 4px rgba(255, 255, 255, 0.8), inset 0 -2px 20px rgba(255, 255, 255, 0.6)',
        accessoryColor: isDark ? 'transparent' : 'rgba(82, 82, 82, 0.7)',
      };
    }

    if (mode === 'secondary') {
      return {
        background: colors.background.secondary,
        backgroundOpacity: 1,
        borderColor: colors.stroke.fieldBorderAlpha,
        borderWidth: 1,
        textColor: colors.text.primary,
        counterColor,
        backdropBlur: 0,
        boxShadow: 'none',
        accessoryColor: 'transparent',
      };
    }

    return {
      background: 'transparent',
      backgroundOpacity: 1,
      borderColor: colors.separator.primary,
      borderWidth: 1,
      textColor: colors.text.primary,
      counterColor,
      backdropBlur: 0,
      boxShadow: 'none',
      accessoryColor: 'transparent',
    };
  }

  if (appearance === 'overlay') {
    if (mode === 'primary') {
      return {
        background: OVERLAY_PRIMARY_BACKGROUND,
        backgroundOpacity: 1,
        borderColor: OVERLAY_PRIMARY_BACKGROUND,
        borderWidth: 1,
        textColor: colors.text.primaryInvariably,
        counterColor,
        backdropBlur: 6,
        boxShadow: 'none',
        accessoryColor: 'transparent',
      };
    }

    if (mode === 'secondary') {
      return {
        background: colors.other.overlaySecondary,
        backgroundOpacity: 1,
        borderColor: colors.stroke.contrastSecondaryAlpha,
        borderWidth: 0.8,
        textColor: colors.text.contrast,
        counterColor,
        backdropBlur: 16,
        boxShadow: 'none',
        accessoryColor: 'transparent',
      };
    }

    return {
      background: 'transparent',
      backgroundOpacity: 1,
      borderColor: colors.stroke.contrast,
      borderWidth: 1,
      textColor: colors.text.contrast,
      counterColor,
      backdropBlur: 0,
      boxShadow: 'none',
      accessoryColor: 'transparent',
    };
  }

  if (mode === 'primary') {
    return {
      background: colors.palette.accentPurple,
      backgroundOpacity: 1,
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: colors.text.contrast,
      counterColor,
      backdropBlur: 0,
      boxShadow: 'none',
      accessoryColor: 'transparent',
    };
  }

  if (mode === 'secondary') {
    return {
      background: colors.palette.accentPurple,
      backgroundOpacity: 0.2,
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: colors.palette.accentPurple,
      counterColor,
      backdropBlur: 0,
      boxShadow: 'none',
      accessoryColor: 'transparent',
    };
  }

  return {
    background: 'transparent',
    backgroundOpacity: 1,
    borderColor: colors.palette.accentPurple,
    borderWidth: 1,
    textColor: colors.palette.accentPurple,
    counterColor,
    backdropBlur: 0,
    boxShadow: 'none',
    accessoryColor: 'transparent',
  };
}

export function Button(props: ButtonProps) {
  const {
    size = 'small',
    appearance = 'neutral',
    mode = 'primary',
    width = 'hugged',
    disabled = false,
    theme = 'light',
    platform = 'ios',
    className,
    type = 'button',
    ...contentAndButtonProps
  } = props;
  const sizeConfig = BUTTON_SIZE_CONFIG[size];
  const platformConfig = getPlatformTokens(platform);
  const surface = getButtonSurface(appearance, mode, theme);
  const clipGlossySurface = appearance === 'neutral' && mode === 'primary';
  const isIconOnly =
    'icon' in contentAndButtonProps && contentAndButtonProps.icon != null;
  const buttonFontFamily =
    platform === 'ios'
      ? IOS_FONT_FAMILY
      : platform === 'android'
        ? `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`
        : platformConfig.typography.family.base;
  const style: ButtonCssProperties = {
    '--button-height': `${sizeConfig.height}px`,
    '--button-radius': `${sizeConfig.radius}px`,
    '--button-horizontal-padding': `${sizeConfig.horizontalPadding}px`,
    '--button-content-gap': `${BUTTON_CONTENT_GAP}px`,
    '--button-icon-size': `${sizeConfig.iconSize}px`,
    '--button-font-family': buttonFontFamily,
    '--button-font-size': `${sizeConfig.fontSize}px`,
    '--button-font-weight': platformConfig.typography.weight[sizeConfig.weight],
    '--button-line-height': `${sizeConfig.lineHeight}px`,
    '--button-text-color': surface.textColor,
    '--button-counter-color': surface.counterColor,
    '--button-counter-font-size': `${sizeConfig.counterFontSize}px`,
    '--button-counter-font-weight':
      platformConfig.typography.weight[sizeConfig.counterWeight],
    '--button-counter-line-height': `${sizeConfig.counterLineHeight}px`,
    '--button-counter-padding-top': `${sizeConfig.counterPaddingTop}px`,
    '--button-background': surface.background,
    '--button-background-opacity': surface.backgroundOpacity,
    '--button-border-color': surface.borderColor,
    '--button-border-width': `${surface.borderWidth}px`,
    '--button-backdrop-blur': `${surface.backdropBlur}px`,
    '--button-box-shadow': surface.boxShadow,
    '--button-accessory-color': surface.accessoryColor,
    '--button-disabled-opacity': BUTTON_DISABLED_OPACITY,
    '--button-focus-color': getSemanticColors(theme).stroke.accent,
  };
  const rootClassName = className
    ? `${styles.root} ${className}`
    : styles.root;

  if (isIconOnly) {
    const { icon, ...buttonProps } = contentAndButtonProps as IconButtonContent &
      NativeButtonProps;

    return (
      <button
        {...buttonProps}
        className={rootClassName}
        data-button-appearance={appearance}
        data-button-content="icon"
        data-button-mode={mode}
        data-button-platform={platform}
        data-button-size={size}
        data-button-theme={theme}
        data-button-width={width}
        disabled={disabled}
        style={style}
        type={type}
      >
        <ButtonSurfaceLayers clipGlossySurface={clipGlossySurface} />
        <span aria-hidden="true" className={styles.stroke} />
        <span className={styles.iconSlot}>{icon}</span>
      </button>
    );
  }

  const { children, before, after, counter, ...buttonProps } =
    contentAndButtonProps as TextButtonContent & NativeButtonProps;

  return (
    <button
      {...buttonProps}
      className={rootClassName}
      data-button-appearance={appearance}
      data-button-content="text"
      data-button-mode={mode}
      data-button-platform={platform}
      data-button-size={size}
      data-button-theme={theme}
      data-button-width={width}
      disabled={disabled}
      style={style}
      type={type}
    >
      <ButtonSurfaceLayers clipGlossySurface={clipGlossySurface} />
      <span aria-hidden="true" className={styles.stroke} />
      <span className={styles.content}>
        {before != null ? <span className={styles.iconSlot}>{before}</span> : null}
        <span className={styles.label}>{children}</span>
        {counter != null ? <span className={styles.counter}>{counter}</span> : null}
        {after != null ? <span className={styles.iconSlot}>{after}</span> : null}
      </span>
    </button>
  );
}
