import type { CSSProperties } from 'react';

import {
  getPlatformTokens,
  getSemanticColors,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../tokens';
import { Avatar } from '../avatar';

import styles from './UsersStack.module.css';

export interface UsersStackUser {
  src: string;
  alt?: string;
}

export type UsersStackUsers =
  | [UsersStackUser, UsersStackUser]
  | [UsersStackUser, UsersStackUser, UsersStackUser];

export interface UsersStackProps {
  users: UsersStackUsers;
  description?: string;
  theme?: ThemeMode;
  platform?: PlatformMode;
  className?: string;
}

interface UsersStackCssProperties extends CSSProperties {
  '--users-stack-gap': string;
  '--users-stack-description-color': string;
  '--users-stack-font-family': string;
  '--users-stack-font-weight': number;
}

export function UsersStack({
  users,
  description,
  theme = 'light',
  platform = 'ios',
  className,
}: UsersStackProps) {
  const colors = getSemanticColors(theme);
  const platformConfig = getPlatformTokens(platform);
  const descriptionFontFamily =
    platform === 'android'
      ? `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`
      : platformConfig.typography.family.base;
  const style: UsersStackCssProperties = {
    '--users-stack-gap': `${spacing.sizeL}px`,
    '--users-stack-description-color': colors.text.secondary,
    '--users-stack-font-family': descriptionFontFamily,
    '--users-stack-font-weight': platformConfig.typography.weight.semiboldish,
  };
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <span
      className={rootClassName}
      data-users-stack-count={users.length}
      data-users-stack-platform={platform}
      data-users-stack-theme={theme}
      style={style}
    >
      <span className={styles.stack}>
        {users.map((user, index) => {
          const isFrontAvatar = index === users.length - 1;

          return (
            <span
              className={isFrontAvatar ? styles.frontAvatar : styles.maskedAvatar}
              key={`${user.src}-${index}`}
            >
              <Avatar
                alt={user.alt}
                content="picture"
                platform={platform}
                size={20}
                src={user.src}
                theme={theme}
              />
            </span>
          );
        })}
      </span>

      {description ? <span className={styles.description}>{description}</span> : null}
    </span>
  );
}
