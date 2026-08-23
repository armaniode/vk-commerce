import { getIconAsset } from './iconRegistry';
import type { IconCssProperties, IconProps } from './types';

import styles from './Icon.module.css';

export function Icon({
  name,
  size,
  className,
  label,
  title,
}: IconProps) {
  const assetUrl = getIconAsset(name, size);

  if (!assetUrl) {
    throw new Error(
      `VK Icon source is unavailable for "${name}" at ${size}px.`,
    );
  }

  const accessibleLabel = label ?? title;
  const style: IconCssProperties = {
    '--vk-icon-size': `${size}px`,
    '--vk-icon-source': `url("${assetUrl}")`,
  };

  const classes = className ? `${styles.icon} ${className}` : styles.icon;

  return (
    <span
      aria-hidden={accessibleLabel ? undefined : true}
      aria-label={accessibleLabel}
      className={classes}
      role={accessibleLabel ? 'img' : undefined}
      style={style}
      title={title}
    />
  );
}
