import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { Icon } from '../../icons';
import {
  getPlatformTokens,
  getSemanticColors,
  radius,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './Select.module.css';

export type SelectStatus = 'default' | 'error' | 'valid';

export type SelectProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type' | 'value'
> & {
  value?: ReactNode;
  placeholder?: ReactNode;
  chips?: ReactNode;
  status?: SelectStatus;
  open?: boolean;
  theme?: ThemeMode;
  platform?: PlatformMode;
};

type SelectContentMode = 'empty' | 'placeholder' | 'filled' | 'chips';

interface SelectCssProperties extends CSSProperties {
  '--select-min-height': string;
  '--select-radius': string;
  '--select-padding-horizontal': string;
  '--select-padding-vertical': string;
  '--select-content-gap': string;
  '--select-chevron-size': string;
  '--select-font-family': string;
  '--select-font-size': string;
  '--select-font-weight': number;
  '--select-line-height': string;
  '--select-letter-spacing': string;
  '--select-text-color': string;
  '--select-placeholder-color': string;
  '--select-icon-color': string;
  '--select-background-color': string;
  '--select-border-color': string;
  '--select-hover-border-color': string;
  '--select-active-border-color': string;
  '--select-disabled-opacity': number;
}

const SELECT_MIN_HEIGHT = 52;
const SELECT_CHEVRON_SIZE = 20;
const SELECT_LINE_HEIGHT = 21;
const SELECT_DISABLED_OPACITY = 0.52;
const SYSTEM_SF_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", sans-serif';

function getContentMode(
  chips: ReactNode | undefined,
  value: ReactNode | undefined,
  placeholder: ReactNode | undefined,
): SelectContentMode {
  if (chips !== undefined) return 'chips';
  if (value !== undefined && value !== null) return 'filled';
  if (placeholder !== undefined) return 'placeholder';
  return 'empty';
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    value,
    placeholder,
    chips,
    status = 'default',
    open = false,
    theme = 'light',
    platform = 'ios',
    className,
    disabled = false,
    'aria-invalid': ariaInvalid,
    ...buttonProps
  },
  ref,
) {
  const colors = getSemanticColors(theme);
  const platformConfig = getPlatformTokens(platform);
  const contentMode = getContentMode(chips, value, placeholder);
  const fontSize = platformConfig.typography.fontSize.body;
  const fontWeight = platformConfig.typography.weight.medium;
  const fontFamily =
    platformConfig.typography.family.base === 'SF Pro'
      ? SYSTEM_SF_FONT_FAMILY
      : `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`;
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
  const content =
    contentMode === 'chips'
      ? chips
      : contentMode === 'filled'
        ? value
        : contentMode === 'placeholder'
          ? placeholder
          : null;
  const style: SelectCssProperties = {
    '--select-min-height': `${SELECT_MIN_HEIGHT}px`,
    '--select-radius': `${radius.sizeL}px`,
    '--select-padding-horizontal': `${spacing.size2xl}px`,
    '--select-padding-vertical': `${spacing.sizeXl + spacing.size2xs}px`,
    '--select-content-gap': `${spacing.sizeM}px`,
    '--select-chevron-size': `${SELECT_CHEVRON_SIZE}px`,
    '--select-font-family': fontFamily,
    '--select-font-size': `${fontSize}px`,
    '--select-font-weight': fontWeight,
    '--select-line-height': `${SELECT_LINE_HEIGHT}px`,
    '--select-letter-spacing': `${platformConfig.typography.letterSpacing.body}px`,
    '--select-text-color': colors.text.primary,
    '--select-placeholder-color': colors.text.secondary,
    '--select-icon-color': colors.icon.secondary,
    '--select-background-color': backgroundColor,
    '--select-border-color': borderColor,
    '--select-hover-border-color': colors.states.hover.fieldBorderAlpha,
    '--select-active-border-color': colors.states.active.fieldBorderAlpha,
    '--select-disabled-opacity': SELECT_DISABLED_OPACITY,
  };
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;
  const resolvedAriaInvalid =
    ariaInvalid ?? (status === 'error' ? true : undefined);

  return (
    <button
      {...buttonProps}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-invalid={resolvedAriaInvalid}
      className={rootClassName}
      data-select-content={contentMode}
      data-select-disabled={disabled}
      data-select-open={open}
      data-select-platform={platform}
      data-select-status={status}
      data-select-theme={theme}
      data-vk-select-root=""
      disabled={disabled}
      ref={ref}
      style={style}
      type="button"
    >
      <span
        className={
          contentMode === 'chips' ? styles.chipsContent : styles.content
        }
      >
        {contentMode === 'chips' || content == null ? (
          content
        ) : (
          <span className={styles.textContent}>{content}</span>
        )}
      </span>

      <span aria-hidden="true" className={styles.chevron}>
        <Icon name="chevron_down" size={20} />
      </span>
    </button>
  );
});
