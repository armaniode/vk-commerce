import type { CSSProperties, ReactNode } from 'react';

import {
  getPlatformTokens,
  getSemanticColors,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './TopBar.module.css';

export type TopBarAppearance =
  | 'default'
  | 'overlay'
  | 'no-blur-overlay';

export type TopBarActions =
  | readonly [ReactNode]
  | readonly [ReactNode, ReactNode]
  | readonly [ReactNode, ReactNode, ReactNode]
  | readonly [ReactNode, ReactNode, ReactNode, ReactNode];

export interface TopBarProps {
  appearance?: TopBarAppearance;
  title?: ReactNode;
  titleAfter?: ReactNode;
  before?: ReactNode;
  actions?: TopBarActions;
  middle?: ReactNode;
  bottomSlot?: ReactNode;
  tabs?: ReactNode;
  statusBar?: ReactNode;
  gradient?: boolean;
  platform?: PlatformMode;
  theme?: ThemeMode;
  className?: string;
}

interface TopBarCssProperties extends CSSProperties {
  '--top-bar-default-gradient-color': string;
  '--top-bar-content-color': string;
  '--top-bar-gradient-extension': string;
  '--top-bar-background-blur': string;
  '--top-bar-header-padding-top': string;
  '--top-bar-header-padding-left': string;
  '--top-bar-header-padding-right': string;
  '--top-bar-header-gap': string;
  '--top-bar-middle-padding-left': string;
  '--top-bar-middle-padding-right': string;
  '--top-bar-title-min-height': string;
  '--top-bar-title-padding-top': string;
  '--top-bar-title-gap': string;
  '--top-bar-title-after-padding-bottom': string;
  '--top-bar-title-font-family': string;
  '--top-bar-title-font-size': string;
  '--top-bar-title-font-weight': number;
  '--top-bar-title-line-height': string;
  '--top-bar-title-letter-spacing': string;
  '--top-bar-before-padding-left': string;
  '--top-bar-actions-gap': string;
  '--top-bar-actions-padding-left': string;
  '--top-bar-actions-padding-right': string;
  '--top-bar-action-size': string;
  '--top-bar-bottom-slot-padding-x': string;
  '--top-bar-bottom-slot-padding-top': string;
  '--top-bar-bottom-slot-padding-bottom': string;
  '--top-bar-tabs-spacing': string;
}

const DEFAULT_GRADIENT_EXTENSION = 53;
const OVERLAY_GRADIENT_EXTENSION = 114;
const SOURCE_BACKGROUND_BLUR = 0;
const TITLE_MIN_HEIGHT = 44;
const TITLE_PADDING_TOP = 3;
const TITLE_AFTER_PADDING_BOTTOM = 2;
const TITLE_LINE_HEIGHT = 31;
const ACTION_SIZE = 28;
const IOS_ACCENT_FONT_FAMILY =
  '"VK Sans Display", -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif';

function getAccentFontFamily(platform: PlatformMode, accentFamily: string) {
  if (platform === 'ios') {
    return IOS_ACCENT_FONT_FAMILY;
  }

  if (platform === 'android') {
    return `"${accentFamily}", "Roboto Flex", Roboto, Arial, sans-serif`;
  }

  return `"${accentFamily}", -apple-system, BlinkMacSystemFont, system-ui, sans-serif`;
}

export function TopBar({
  appearance = 'default',
  title,
  titleAfter,
  before,
  actions,
  middle,
  bottomSlot,
  tabs,
  statusBar,
  gradient = true,
  platform = 'ios',
  theme = 'light',
  className,
}: TopBarProps) {
  if (actions && actions.length > 4) {
    throw new RangeError('TopBar supports no more than four actions.');
  }

  const colors = getSemanticColors(theme);
  const platformConfig = getPlatformTokens(platform);
  const overlay = appearance !== 'default';
  const style: TopBarCssProperties = {
    '--top-bar-default-gradient-color': colors.background.modal,
    '--top-bar-content-color': overlay
      ? colors.text.contrast
      : colors.text.primary,
    '--top-bar-gradient-extension': `${
      overlay ? OVERLAY_GRADIENT_EXTENSION : DEFAULT_GRADIENT_EXTENSION
    }px`,
    '--top-bar-background-blur': `${SOURCE_BACKGROUND_BLUR}px`,
    '--top-bar-header-padding-top': `${spacing.sizeXs}px`,
    '--top-bar-header-padding-left': `${spacing.sizeL}px`,
    '--top-bar-header-padding-right': `${spacing.sizeS}px`,
    '--top-bar-header-gap': `${spacing.sizeXs}px`,
    '--top-bar-middle-padding-left': `${spacing.sizeS}px`,
    '--top-bar-middle-padding-right': `${spacing.sizeM}px`,
    '--top-bar-title-min-height': `${TITLE_MIN_HEIGHT}px`,
    '--top-bar-title-padding-top': `${TITLE_PADDING_TOP}px`,
    '--top-bar-title-gap': `${spacing.sizeXs}px`,
    '--top-bar-title-after-padding-bottom': `${TITLE_AFTER_PADDING_BOTTOM}px`,
    '--top-bar-title-font-family': getAccentFontFamily(
      platform,
      platformConfig.typography.family.accent,
    ),
    '--top-bar-title-font-size': `${platformConfig.typography.fontSize.title1}px`,
    '--top-bar-title-font-weight': platformConfig.typography.weight.bold,
    '--top-bar-title-line-height': `${TITLE_LINE_HEIGHT}px`,
    '--top-bar-title-letter-spacing': `${platformConfig.typography.letterSpacing.title1}px`,
    '--top-bar-before-padding-left': `${spacing.sizeS}px`,
    '--top-bar-actions-gap': `${spacing.size2xl}px`,
    '--top-bar-actions-padding-left': `${spacing.size2xs}px`,
    '--top-bar-actions-padding-right': `${spacing.sizeL}px`,
    '--top-bar-action-size': `${ACTION_SIZE}px`,
    '--top-bar-bottom-slot-padding-x': `${spacing.size2xl}px`,
    '--top-bar-bottom-slot-padding-top': `${spacing.sizeM}px`,
    '--top-bar-bottom-slot-padding-bottom': `${spacing.sizeXs}px`,
    '--top-bar-tabs-spacing': `${spacing.size2xs}px`,
  };
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      className={rootClassName}
      data-top-bar-appearance={appearance}
      data-top-bar-platform={platform}
      data-top-bar-theme={theme}
      style={style}
    >
      {gradient ? <span aria-hidden="true" className={styles.gradient} /> : null}

      {statusBar != null ? (
        <div className={styles.statusBarRegion}>{statusBar}</div>
      ) : null}

      <div className={styles.header}>
        {before != null ? <div className={styles.before}>{before}</div> : null}

        <div className={styles.middleOuter}>
          <div className={styles.middle}>
            {middle ?? (
              <div className={styles.titleComposition}>
                <div className={styles.title}>{title}</div>
                {titleAfter != null ? (
                  <span className={styles.titleAfter}>{titleAfter}</span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {actions && actions.length > 0 ? (
          <div className={styles.actions}>
            {actions.map((action, index) => (
              <span className={styles.action} key={index}>
                {action}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {bottomSlot != null ? (
        <div className={styles.bottomSlot}>{bottomSlot}</div>
      ) : null}

      {tabs != null ? <div className={styles.tabsRegion}>{tabs}</div> : null}
    </div>
  );
}
