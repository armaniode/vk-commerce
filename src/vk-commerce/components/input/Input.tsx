import {
  forwardRef,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

import {
  getPlatformTokens,
  getSemanticColors,
  radius,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './Input.module.css';

export type InputStatus = 'default' | 'error' | 'valid';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  status?: InputStatus;
  before?: ReactNode;
  after?: ReactNode;
  theme?: ThemeMode;
  platform?: PlatformMode;
};

interface InputCssProperties extends CSSProperties {
  '--input-height': string;
  '--input-radius': string;
  '--input-padding-horizontal': string;
  '--input-content-gap': string;
  '--input-icon-size': string;
  '--input-font-family': string;
  '--input-font-size': string;
  '--input-font-weight': number;
  '--input-line-height': string;
  '--input-letter-spacing': string;
  '--input-text-color': string;
  '--input-placeholder-color': string;
  '--input-icon-color': string;
  '--input-background-color': string;
  '--input-border-color': string;
  '--input-hover-border-color': string;
  '--input-active-border-color': string;
  '--input-disabled-opacity': number;
}

const INPUT_HEIGHT = 52;
const INPUT_ICON_SIZE = 24;
const INPUT_FONT_SIZE = 16.5;
const INPUT_FONT_WEIGHT = 520;
const INPUT_LINE_HEIGHT = 21;
const INPUT_DISABLED_OPACITY = 0.52;
const IOS_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", sans-serif';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    status = 'default',
    before,
    after,
    theme = 'light',
    platform = 'ios',
    className,
    disabled = false,
    'aria-invalid': ariaInvalid,
    ...inputProps
  },
  ref,
) {
  const colors = getSemanticColors(theme);
  const platformConfig = getPlatformTokens(platform);
  let inputFontFamily: string = platformConfig.typography.family.base;

  if (platform === 'ios') {
    inputFontFamily = IOS_FONT_FAMILY;
  } else if (platform === 'android') {
    inputFontFamily = `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`;
  }
  const backgroundColor =
    status === 'error'
      ? colors.background.negativeTint
      : colors.background.secondary;
  const borderColor =
    status === 'error'
      ? colors.stroke.negative
      : status === 'valid'
        ? colors.stroke.positive
        : colors.stroke.fieldBorderAlpha;

  const style: InputCssProperties = {
    '--input-height': `${INPUT_HEIGHT}px`,
    '--input-radius': `${radius.sizeL}px`,
    '--input-padding-horizontal': `${spacing.size2xl}px`,
    '--input-content-gap': `${spacing.sizeM}px`,
    '--input-icon-size': `${INPUT_ICON_SIZE}px`,
    '--input-font-family': inputFontFamily,
    '--input-font-size': `${INPUT_FONT_SIZE}px`,
    '--input-font-weight': INPUT_FONT_WEIGHT,
    '--input-line-height': `${INPUT_LINE_HEIGHT}px`,
    '--input-letter-spacing': `${platformConfig.typography.letterSpacing.body}px`,
    '--input-text-color': colors.text.primary,
    '--input-placeholder-color': colors.text.secondary,
    '--input-icon-color': colors.icon.secondary,
    '--input-background-color': backgroundColor,
    '--input-border-color': borderColor,
    '--input-hover-border-color': colors.states.hover.fieldBorderAlpha,
    '--input-active-border-color': colors.states.active.fieldBorderAlpha,
    '--input-disabled-opacity': INPUT_DISABLED_OPACITY,
  };
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;
  const resolvedAriaInvalid =
    ariaInvalid ?? (status === 'error' ? true : undefined);

  return (
    <span
      className={rootClassName}
      data-input-disabled={disabled}
      data-input-platform={platform}
      data-input-status={status}
      data-input-theme={theme}
      data-vk-input-root=""
      style={style}
    >
      <span aria-hidden="true" className={styles.surface} data-vk-input-surface="" />

      <span className={styles.content}>
        {before != null ? <span className={styles.iconSlot}>{before}</span> : null}

        <input
          {...inputProps}
          aria-invalid={resolvedAriaInvalid}
          className={styles.input}
          disabled={disabled}
          ref={ref}
        />

        {after != null ? <span className={styles.iconSlot}>{after}</span> : null}
      </span>
    </span>
  );
});
