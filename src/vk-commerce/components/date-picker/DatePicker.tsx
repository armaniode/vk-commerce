import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type MouseEventHandler,
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

import styles from './DatePicker.module.css';

export type DatePickerType = 'date' | 'date-time' | 'date-range';
export type DatePickerStatus = 'default' | 'error' | 'valid';

type DatePickerTriggerAttributes = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'disabled' | 'onClick' | 'type'
>;

type DatePickerCommonProps = DatePickerTriggerAttributes & {
  status?: DatePickerStatus;
  disabled?: boolean;
  open?: boolean;
  onTriggerClick?: MouseEventHandler<HTMLButtonElement>;
  onClear?: () => void;
  theme?: ThemeMode;
  platform?: PlatformMode;
  className?: string;
};

type DatePickerDateProps = DatePickerCommonProps & {
  type?: 'date';
  date?: string;
  time?: never;
  startDate?: never;
  endDate?: never;
};

type DatePickerDateTimeProps = DatePickerCommonProps & {
  type: 'date-time';
  date?: string;
  time?: string;
  startDate?: never;
  endDate?: never;
};

type DatePickerDateRangeProps = DatePickerCommonProps & {
  type: 'date-range';
  date?: never;
  time?: never;
  startDate?: string;
  endDate?: string;
};

export type DatePickerProps =
  | DatePickerDateProps
  | DatePickerDateTimeProps
  | DatePickerDateRangeProps;

interface DatePickerCssProperties extends CSSProperties {
  '--date-picker-height': string;
  '--date-picker-radius': string;
  '--date-picker-padding-horizontal': string;
  '--date-picker-padding-vertical': string;
  '--date-picker-content-gap': string;
  '--date-picker-date-time-gap': string;
  '--date-picker-dash-width': string;
  '--date-picker-calendar-size': string;
  '--date-picker-clear-action-size': string;
  '--date-picker-clear-glyph-size': string;
  '--date-picker-font-family': string;
  '--date-picker-font-size': string;
  '--date-picker-font-weight': number;
  '--date-picker-line-height': string;
  '--date-picker-letter-spacing': string;
  '--date-picker-text-color': string;
  '--date-picker-placeholder-color': string;
  '--date-picker-icon-color': string;
  '--date-picker-background-color': string;
  '--date-picker-border-color': string;
  '--date-picker-hover-border-color': string;
  '--date-picker-active-border-color': string;
  '--date-picker-disabled-opacity': number;
}

const DATE_MASK = '__.__.____';
const TIME_MASK = '__:__';
const DATE_PICKER_HEIGHT = 52;
const DATE_PICKER_LINE_HEIGHT = 18.5;
const DATE_PICKER_DATE_TIME_GAP = 12;
const DATE_PICKER_DASH_WIDTH = 27;
const DATE_PICKER_CALENDAR_SIZE = 24;
const DATE_PICKER_CLEAR_ACTION_SIZE = 24;
const DATE_PICKER_CLEAR_GLYPH_SIZE = 16;
const DATE_PICKER_DISABLED_OPACITY = 0.52;
const SYSTEM_SF_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", sans-serif';

function hasText(value: string | undefined): boolean {
  return Boolean(value);
}

function getClearLabel(type: DatePickerType): string {
  if (type === 'date-time') return 'Clear date and time';
  if (type === 'date-range') return 'Clear date range';
  return 'Clear date';
}

function Segment({ value, fallback }: { value?: string; fallback: string }) {
  const filled = hasText(value);

  return (
    <span className={styles.segment} data-segment-filled={filled}>
      {filled ? value : fallback}
    </span>
  );
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(props, ref) {
    const {
      status = 'default',
      disabled = false,
      open = false,
      onTriggerClick,
      onClear,
      theme = 'light',
      platform = 'ios',
      className,
      type: requestedType = 'date',
      date,
      time,
      startDate,
      endDate,
      'aria-invalid': ariaInvalid,
      ...triggerProps
    } = props;
    const pickerType: DatePickerType = requestedType;
    const filled =
      pickerType === 'date-range'
        ? hasText(startDate) || hasText(endDate)
        : pickerType === 'date-time'
          ? hasText(date) || hasText(time)
          : hasText(date);
    const colors = getSemanticColors(theme);
    const platformConfig = getPlatformTokens(platform);
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
    const style: DatePickerCssProperties = {
      '--date-picker-height': `${DATE_PICKER_HEIGHT}px`,
      '--date-picker-radius': `${radius.sizeL}px`,
      '--date-picker-padding-horizontal': `${spacing.size2xl}px`,
      '--date-picker-padding-vertical': `${spacing.sizeXl + spacing.size2xs}px`,
      '--date-picker-content-gap': `${spacing.sizeM}px`,
      '--date-picker-date-time-gap': `${DATE_PICKER_DATE_TIME_GAP}px`,
      '--date-picker-dash-width': `${DATE_PICKER_DASH_WIDTH}px`,
      '--date-picker-calendar-size': `${DATE_PICKER_CALENDAR_SIZE}px`,
      '--date-picker-clear-action-size': `${DATE_PICKER_CLEAR_ACTION_SIZE}px`,
      '--date-picker-clear-glyph-size': `${DATE_PICKER_CLEAR_GLYPH_SIZE}px`,
      '--date-picker-font-family': fontFamily,
      '--date-picker-font-size': `${platformConfig.typography.fontSize.text}px`,
      '--date-picker-font-weight': platformConfig.typography.weight.semibold,
      '--date-picker-line-height': `${DATE_PICKER_LINE_HEIGHT}px`,
      '--date-picker-letter-spacing': `${platformConfig.typography.letterSpacing.text}px`,
      '--date-picker-text-color': colors.text.primary,
      '--date-picker-placeholder-color': colors.text.secondary,
      '--date-picker-icon-color': colors.icon.secondary,
      '--date-picker-background-color': backgroundColor,
      '--date-picker-border-color': borderColor,
      '--date-picker-hover-border-color': colors.states.hover.fieldBorderAlpha,
      '--date-picker-active-border-color': colors.states.active.fieldBorderAlpha,
      '--date-picker-disabled-opacity': DATE_PICKER_DISABLED_OPACITY,
    };
    const rootClassName = className ? `${styles.root} ${className}` : styles.root;
    const resolvedAriaInvalid =
      ariaInvalid ?? (status === 'error' ? true : undefined);

    const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation();
      onClear?.();
    };

    return (
      <div
        className={rootClassName}
        data-date-picker-disabled={disabled}
        data-date-picker-filled={filled}
        data-date-picker-open={open}
        data-date-picker-platform={platform}
        data-date-picker-status={status}
        data-date-picker-theme={theme}
        data-date-picker-type={pickerType}
        data-vk-date-picker-root=""
        style={style}
      >
        <span aria-hidden="true" className={styles.surface} />

        <button
          {...triggerProps}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-invalid={resolvedAriaInvalid}
          className={styles.trigger}
          disabled={disabled}
          onClick={onTriggerClick}
          ref={ref}
          type="button"
        >
          <span className={styles.field}>
            {pickerType === 'date' ? (
              <Segment fallback={DATE_MASK} value={date} />
            ) : null}

            {pickerType === 'date-time' ? (
              <span className={styles.dateTime}>
                <Segment fallback={DATE_MASK} value={date} />
                <Segment fallback={TIME_MASK} value={time} />
              </span>
            ) : null}

            {pickerType === 'date-range' ? (
              <span className={styles.dateRange}>
                <Segment fallback={DATE_MASK} value={startDate} />
                <span aria-hidden="true" className={styles.dash}>
                  —
                </span>
                <Segment fallback={DATE_MASK} value={endDate} />
              </span>
            ) : null}
          </span>

          {!filled ? (
            <span aria-hidden="true" className={styles.calendarIcon}>
              <Icon name="calendar_outline" size={24} />
            </span>
          ) : null}
        </button>

        {filled && onClear != null ? (
          <button
            aria-label={getClearLabel(pickerType)}
            className={styles.clearAction}
            disabled={disabled}
            onClick={handleClear}
            type="button"
          >
            <span aria-hidden="true" className={styles.clearGlyph} />
          </button>
        ) : null}

        {filled && onClear == null ? (
          <span aria-hidden="true" className={styles.clearAction}>
            <span className={styles.clearGlyph} />
          </span>
        ) : null}
      </div>
    );
  },
);
