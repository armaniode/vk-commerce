import type { CSSProperties, ReactNode } from 'react';

import {
  getSemanticColors,
  roundedRadius,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './BottomBar.module.css';

export type BottomBarAppearance = 'default' | 'overlay';

export interface BottomBarProps {
  appearance?: BottomBarAppearance;
  actions?: ReactNode;
  bottomSlot?: ReactNode;
  tabBar?: ReactNode;
  snackbar?: ReactNode;
  keyboardVisible?: boolean;
  blur?: boolean;
  homeIndicator?: boolean;
  showIndicator?: boolean;
  platform?: PlatformMode;
  theme?: ThemeMode;
  className?: string;
}

interface BottomBarCssProperties extends CSSProperties {
  '--bottom-bar-gradient-top-offset': string;
  '--bottom-bar-backdrop-blur': string;
  '--bottom-bar-actions-padding-x': string;
  '--bottom-bar-actions-padding-y': string;
  '--bottom-bar-actions-gap': string;
  '--bottom-bar-actions-min-height': string;
  '--bottom-bar-bottom-slot-height': string;
  '--bottom-bar-tab-bar-height': string;
  '--bottom-bar-tab-bar-padding-x': string;
  '--bottom-bar-snackbar-padding-x': string;
  '--bottom-bar-snackbar-padding-y': string;
  '--bottom-bar-snackbar-min-height': string;
  '--bottom-bar-home-indicator-height': string;
  '--bottom-bar-home-indicator-width': string;
  '--bottom-bar-home-indicator-thickness': string;
  '--bottom-bar-home-indicator-padding-bottom': string;
  '--bottom-bar-home-indicator-radius': string;
  '--bottom-bar-home-indicator-color': string;
}

const NORMAL_GRADIENT_TOP_OFFSET = 42;
const KEYBOARD_GRADIENT_TOP_OFFSET = 38;
const CSS_BACKDROP_BLUR = 6;
const ACTIONS_MIN_HEIGHT = 52;
const BOTTOM_SLOT_HEIGHT = 48;
const TAB_BAR_HEIGHT = 48;
const SNACKBAR_MIN_HEIGHT = 56;
const HOME_INDICATOR_HEIGHT = 34;
const HOME_INDICATOR_WIDTH = 144;
const HOME_INDICATOR_THICKNESS = 5;

export function BottomBar({
  appearance = 'default',
  actions,
  bottomSlot,
  tabBar,
  snackbar,
  keyboardVisible = false,
  blur = true,
  homeIndicator = false,
  showIndicator = true,
  platform = 'ios',
  theme = 'light',
  className,
}: BottomBarProps) {
  const colors = getSemanticColors(theme);
  const style: BottomBarCssProperties = {
    '--bottom-bar-gradient-top-offset': `${
      keyboardVisible
        ? KEYBOARD_GRADIENT_TOP_OFFSET
        : NORMAL_GRADIENT_TOP_OFFSET
    }px`,
    '--bottom-bar-backdrop-blur': `${CSS_BACKDROP_BLUR}px`,
    '--bottom-bar-actions-padding-x': `${spacing.size2xl}px`,
    '--bottom-bar-actions-padding-y': `${spacing.sizeXl}px`,
    '--bottom-bar-actions-gap': `${spacing.sizeM}px`,
    '--bottom-bar-actions-min-height': `${ACTIONS_MIN_HEIGHT}px`,
    '--bottom-bar-bottom-slot-height': `${BOTTOM_SLOT_HEIGHT}px`,
    '--bottom-bar-tab-bar-height': `${TAB_BAR_HEIGHT}px`,
    '--bottom-bar-tab-bar-padding-x': `${spacing.sizeL}px`,
    '--bottom-bar-snackbar-padding-x': `${spacing.size2xl}px`,
    '--bottom-bar-snackbar-padding-y': `${spacing.sizeM}px`,
    '--bottom-bar-snackbar-min-height': `${SNACKBAR_MIN_HEIGHT}px`,
    '--bottom-bar-home-indicator-height': `${HOME_INDICATOR_HEIGHT}px`,
    '--bottom-bar-home-indicator-width': `${HOME_INDICATOR_WIDTH}px`,
    '--bottom-bar-home-indicator-thickness': `${HOME_INDICATOR_THICKNESS}px`,
    '--bottom-bar-home-indicator-padding-bottom': `${spacing.sizeM}px`,
    '--bottom-bar-home-indicator-radius': `${roundedRadius}px`,
    '--bottom-bar-home-indicator-color': colors.icon.primary,
  };
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;
  const renderNormalRegions = !keyboardVisible;
  const renderHomeIndicator =
    renderNormalRegions && homeIndicator && platform === 'ios';

  return (
    <div
      className={rootClassName}
      data-bottom-bar-appearance={appearance}
      data-bottom-bar-keyboard-visible={keyboardVisible}
      data-bottom-bar-platform={platform}
      data-bottom-bar-theme={theme}
      style={style}
    >
      {blur ? <span aria-hidden="true" className={styles.gradient} /> : null}

      {renderNormalRegions && snackbar != null ? (
        <div className={styles.snackbarRegion}>
          <div className={styles.snackbarContent}>{snackbar}</div>
        </div>
      ) : null}

      {actions != null ? (
        <div className={styles.actionsRegion}>
          <div className={styles.actionsRow}>{actions}</div>
        </div>
      ) : null}

      {bottomSlot != null ? (
        <div className={styles.bottomSlot}>{bottomSlot}</div>
      ) : null}

      {renderNormalRegions && tabBar != null ? (
        <div className={styles.tabBarRegion}>{tabBar}</div>
      ) : null}

      {renderHomeIndicator ? (
        <div className={styles.homeIndicatorRoot}>
          {showIndicator ? (
            <div className={styles.homeIndicatorRegion}>
              <span aria-hidden="true" className={styles.homeIndicator} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
