import type { CSSProperties, ReactNode } from 'react';

import {
  getPlatformTokens,
  getSemanticColors,
  primitiveColors,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';

import styles from './Avatar.module.css';

export type AvatarSize =
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 56
  | 64
  | 72
  | 80
  | 88
  | 96;

export type AvatarContent = 'picture' | 'text' | 'icon';

export type StoryRingPlacement = 'auto' | 'inside' | 'outside';

export interface AvatarProps {
  size?: AvatarSize;
  content?: AvatarContent;
  src?: string;
  alt?: string;
  label?: string;
  icon?: ReactNode;
  stories?: boolean;
  storyRingPlacement?: StoryRingPlacement;
  overlay?: boolean;
  topLeftSlot?: ReactNode;
  topRightSlot?: ReactNode;
  bottomRightSlot?: ReactNode;
  bottomLeftSlot?: ReactNode;
  theme?: ThemeMode;
  platform?: PlatformMode;
  className?: string;
}

interface AvatarSizeConfig {
  readonly radius: number;
  readonly iconSize: number;
  readonly textSize: number;
  readonly storyPlacement: Exclude<StoryRingPlacement, 'auto'>;
  readonly storySeparatorWidth: number;
}

const AVATAR_SIZE_CONFIG = {
  16: { radius: 5, iconSize: 12, textSize: 5, storyPlacement: 'outside', storySeparatorWidth: 1.2 },
  20: { radius: 6, iconSize: 12, textSize: 8, storyPlacement: 'outside', storySeparatorWidth: 1.2 },
  24: { radius: 7, iconSize: 16, textSize: 8, storyPlacement: 'outside', storySeparatorWidth: 1.2 },
  28: { radius: 8, iconSize: 16, textSize: 10, storyPlacement: 'outside', storySeparatorWidth: 1.2 },
  32: { radius: 9, iconSize: 20, textSize: 10, storyPlacement: 'outside', storySeparatorWidth: 1.2 },
  36: { radius: 11, iconSize: 24, textSize: 13, storyPlacement: 'outside', storySeparatorWidth: 1.2 },
  40: { radius: 12, iconSize: 24, textSize: 14, storyPlacement: 'inside', storySeparatorWidth: 3.6 },
  44: { radius: 13, iconSize: 24, textSize: 14, storyPlacement: 'inside', storySeparatorWidth: 3.6 },
  48: { radius: 15, iconSize: 28, textSize: 17, storyPlacement: 'inside', storySeparatorWidth: 3.6 },
  56: { radius: 17, iconSize: 28, textSize: 18, storyPlacement: 'inside', storySeparatorWidth: 4.4 },
  64: { radius: 19, iconSize: 28, textSize: 21, storyPlacement: 'inside', storySeparatorWidth: 5.2 },
  72: { radius: 21, iconSize: 36, textSize: 26, storyPlacement: 'inside', storySeparatorWidth: 5.2 },
  80: { radius: 21, iconSize: 36, textSize: 30, storyPlacement: 'inside', storySeparatorWidth: 6 },
  88: { radius: 21, iconSize: 36, textSize: 30, storyPlacement: 'inside', storySeparatorWidth: 6.8 },
  96: { radius: 21, iconSize: 36, textSize: 30, storyPlacement: 'inside', storySeparatorWidth: 6.8 },
} as const satisfies Record<AvatarSize, AvatarSizeConfig>;

const STORY_ACCENT_WIDTH = 1.6;

interface AvatarCssProperties extends CSSProperties {
  '--avatar-size': string;
  '--avatar-radius': string;
  '--avatar-icon-size': string;
  '--avatar-text-size': string;
  '--avatar-border-width': string;
  '--avatar-image-border-color': string;
  '--avatar-background-color': string;
  '--avatar-text-color': string;
  '--avatar-icon-color': string;
  '--avatar-font-family': string;
  '--avatar-font-weight': number;
  '--avatar-overlay-color': string;
  '--avatar-story-accent-color': string;
  '--avatar-story-separator-color': string;
  '--avatar-story-separator-width': string;
  '--avatar-story-accent-width': string;
  '--avatar-story-separator-offset': string;
  '--avatar-story-accent-offset': string;
  '--avatar-story-separator-radius': string;
  '--avatar-story-accent-radius': string;
}

export function Avatar({
  size = 40,
  content = 'picture',
  src,
  alt = '',
  label = '',
  icon,
  stories = false,
  storyRingPlacement = 'auto',
  overlay = false,
  topLeftSlot,
  topRightSlot,
  bottomRightSlot,
  bottomLeftSlot,
  theme = 'light',
  platform = 'ios',
  className,
}: AvatarProps) {
  const sizeConfig = AVATAR_SIZE_CONFIG[size];
  const colors = getSemanticColors(theme);
  const platformConfig = getPlatformTokens(platform);
  const avatarFontFamily =
    platform === 'android'
      ? `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`
      : platformConfig.typography.family.base;
  const resolvedStoryPlacement =
    storyRingPlacement === 'auto' ? sizeConfig.storyPlacement : storyRingPlacement;
  const slotsAvailable = size >= 24;

  // Component-local compatibility mapping for the deprecated Figma separator token.
  const storySeparatorColor =
    theme === 'light' ? primitiveColors.white : primitiveColors.black;

  const storyAccentOffset = sizeConfig.storySeparatorWidth + STORY_ACCENT_WIDTH;
  const style: AvatarCssProperties = {
    '--avatar-size': `${size}px`,
    '--avatar-radius': `${sizeConfig.radius}px`,
    '--avatar-icon-size': `${sizeConfig.iconSize}px`,
    '--avatar-text-size': `${sizeConfig.textSize}px`,
    '--avatar-border-width': content === 'text' ? '0.5px' : '0.4px',
    '--avatar-image-border-color': colors.stroke.imageBorderAlpha,
    '--avatar-background-color': colors.background.secondary,
    '--avatar-text-color': colors.text.primary,
    '--avatar-icon-color': colors.icon.primary,
    '--avatar-font-family': avatarFontFamily,
    '--avatar-font-weight': platformConfig.typography.weight.semibold,
    '--avatar-overlay-color': colors.other.overlaySecondary,
    '--avatar-story-accent-color': colors.stroke.accent,
    '--avatar-story-separator-color': storySeparatorColor,
    '--avatar-story-separator-width': `${sizeConfig.storySeparatorWidth}px`,
    '--avatar-story-accent-width': `${STORY_ACCENT_WIDTH}px`,
    '--avatar-story-separator-offset': `-${sizeConfig.storySeparatorWidth}px`,
    '--avatar-story-accent-offset': `-${storyAccentOffset}px`,
    '--avatar-story-separator-radius': `${sizeConfig.radius + sizeConfig.storySeparatorWidth}px`,
    '--avatar-story-accent-radius': `${sizeConfig.radius + storyAccentOffset}px`,
  };

  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <span
      className={rootClassName}
      data-avatar-content={content}
      data-avatar-platform={platform}
      data-avatar-size={size}
      data-avatar-theme={theme}
      style={style}
    >
      <span className={styles.content}>
        {content === 'picture' && src ? (
          <img alt={alt} className={styles.picture} src={src} />
        ) : null}

        {content === 'picture' && !src ? (
          <span
            aria-label={alt || undefined}
            className={styles.pictureFallback}
            role={alt ? 'img' : undefined}
          />
        ) : null}

        {content === 'text' ? <span className={styles.text}>{label}</span> : null}

        {content === 'icon' ? <span className={styles.icon}>{icon}</span> : null}
      </span>

      {overlay ? <span aria-hidden="true" className={styles.overlay} /> : null}

      {stories ? (
        <>
          <span
            aria-hidden="true"
            className={`${styles.storyRing} ${styles.storySeparator}`}
            data-placement={resolvedStoryPlacement}
          />
          <span
            aria-hidden="true"
            className={`${styles.storyRing} ${styles.storyAccent}`}
            data-placement={resolvedStoryPlacement}
          />
        </>
      ) : null}

      {slotsAvailable && topLeftSlot != null ? (
        <span className={`${styles.slot} ${styles.topLeftSlot}`}>{topLeftSlot}</span>
      ) : null}
      {slotsAvailable && topRightSlot != null ? (
        <span className={`${styles.slot} ${styles.topRightSlot}`}>{topRightSlot}</span>
      ) : null}
      {slotsAvailable && bottomRightSlot != null ? (
        <span className={`${styles.slot} ${styles.bottomRightSlot}`}>{bottomRightSlot}</span>
      ) : null}
      {slotsAvailable && bottomLeftSlot != null ? (
        <span className={`${styles.slot} ${styles.bottomLeftSlot}`}>{bottomLeftSlot}</span>
      ) : null}
    </span>
  );
}
