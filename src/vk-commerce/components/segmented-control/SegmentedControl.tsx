import type { CSSProperties, ReactNode } from 'react';

import {
  getPlatformTokens,
  getSemanticColors,
  primitiveColors,
  radius,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './SegmentedControl.module.css';

type SegmentedControlLabeledItem = {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
};

type SegmentedControlIconItem = {
  value: string;
  icon: ReactNode;
  label?: never;
  ariaLabel: string;
};

export type SegmentedControlItem =
  | SegmentedControlLabeledItem
  | SegmentedControlIconItem;

export type SegmentedControlItems =
  | readonly [SegmentedControlItem, SegmentedControlItem]
  | readonly [
      SegmentedControlItem,
      SegmentedControlItem,
      SegmentedControlItem,
    ]
  | readonly [
      SegmentedControlItem,
      SegmentedControlItem,
      SegmentedControlItem,
      SegmentedControlItem,
    ]
  | readonly [
      SegmentedControlItem,
      SegmentedControlItem,
      SegmentedControlItem,
      SegmentedControlItem,
      SegmentedControlItem,
    ];

export interface SegmentedControlProps {
  items: SegmentedControlItems;
  value: string;
  onChange?: (value: string) => void;
  theme?: ThemeMode;
  platform?: PlatformMode;
  className?: string;
  ariaLabel?: string;
}

interface SegmentedControlCssProperties extends CSSProperties {
  '--segmented-control-padding': string;
  '--segmented-control-radius': string;
  '--segmented-control-background': string;
  '--segmented-control-item-min-height': string;
  '--segmented-control-item-padding': string;
  '--segmented-control-item-radius': string;
  '--segmented-control-content-gap': string;
  '--segmented-control-icon-size': string;
  '--segmented-control-glyph-size': string;
  '--segmented-control-font-family': string;
  '--segmented-control-font-size': string;
  '--segmented-control-font-weight': number;
  '--segmented-control-line-height': string;
  '--segmented-control-letter-spacing': string;
  '--segmented-control-active-background': string;
  '--segmented-control-active-color': string;
  '--segmented-control-inactive-color': string;
  '--segmented-control-focus-color': string;
}

const SEGMENT_MIN_HEIGHT = 40;
const SEGMENT_RADIUS = 10;
const SEGMENT_LINE_HEIGHT = 18.5;
const SEGMENT_ICON_SIZE = 20;
const SEGMENT_GLYPH_SIZE = 16;
const IOS_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';

export function SegmentedControl({
  items,
  value,
  onChange,
  theme = 'light',
  platform = 'ios',
  className,
  ariaLabel,
}: SegmentedControlProps) {
  const colors = getSemanticColors(theme);
  const platformConfig = getPlatformTokens(platform);
  const fontFamily =
    platform === 'ios'
      ? IOS_FONT_FAMILY
      : platform === 'android'
        ? `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`
        : platformConfig.typography.family.base;
  const style: SegmentedControlCssProperties = {
    '--segmented-control-padding': `${spacing.size2xs}px`,
    '--segmented-control-radius': `${radius.sizeM}px`,
    '--segmented-control-background': colors.background.secondary,
    '--segmented-control-item-min-height': `${SEGMENT_MIN_HEIGHT}px`,
    '--segmented-control-item-padding': `${spacing.sizeL}px`,
    '--segmented-control-item-radius': `${SEGMENT_RADIUS}px`,
    '--segmented-control-content-gap': `${spacing.sizeS}px`,
    '--segmented-control-icon-size': `${SEGMENT_ICON_SIZE}px`,
    '--segmented-control-glyph-size': `${SEGMENT_GLYPH_SIZE}px`,
    '--segmented-control-font-family': fontFamily,
    '--segmented-control-font-size': `${platformConfig.typography.fontSize.text}px`,
    '--segmented-control-font-weight': platformConfig.typography.weight.semibold,
    '--segmented-control-line-height': `${SEGMENT_LINE_HEIGHT}px`,
    '--segmented-control-letter-spacing': `${platformConfig.typography.letterSpacing.text}px`,
    // Component-local compatibility mapping for the deprecated source
    // Background / Background token, which is not part of the public API.
    '--segmented-control-active-background':
      theme === 'light' ? primitiveColors.white : primitiveColors.black,
    '--segmented-control-active-color': colors.text.primary,
    '--segmented-control-inactive-color': colors.text.secondary,
    '--segmented-control-focus-color': colors.stroke.accent,
  };
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      aria-label={ariaLabel}
      className={rootClassName}
      data-segmented-control-count={items.length}
      data-segmented-control-platform={platform}
      data-segmented-control-theme={theme}
      role="group"
      style={style}
    >
      {items.map((item) => {
        const selected = item.value === value;

        return (
          <button
            aria-label={item.ariaLabel}
            aria-pressed={selected}
            className={styles.item}
            data-segmented-control-state={selected ? 'active' : 'inactive'}
            key={item.value}
            onClick={() => onChange?.(item.value)}
            type="button"
          >
            {item.icon != null ? (
              <span aria-hidden="true" className={styles.iconSlot}>
                <span className={styles.iconGlyph}>{item.icon}</span>
              </span>
            ) : null}
            {item.label != null ? (
              <span className={styles.label}>{item.label}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
