import {
  type CSSProperties,
  type HTMLAttributes,
} from 'react';

import { radius } from '../../../tokens/spacing';
import { createDynamicColors, useCarnicaTheme } from '../../../shared';

export const APP_STORIES_BADGE_FIGMA_VERSION = 'stories badge' as const;
export const APP_STORIES_BADGE_FIGMA_NODE_ID = '5038:46214' as const;
export const APP_STORIES_BADGE_FIGMA_KEY = 'a7827ed7ef8c9cc46656f1697c180436d98dc73d' as const;

type NativeStoriesBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'>;

export interface StoriesBadgeProps extends NativeStoriesBadgeProps {
  activated?: boolean;
  style?: CSSProperties;
}

// Динамический Proxy — читает текущую data-theme.
const colors = createDynamicColors();

export function StoriesBadge({
  activated = true,
  style,
  ...props
}: StoriesBadgeProps) {
  // Подписка на смену data-theme — re-render при переключении темы.
  useCarnicaTheme();
  return (
    <span
      {...props}
      style={{
        background: activated ? colors['brand/primary'] : 'transparent',
        border: activated ? 0 : `1px solid ${colors['elements/additional02']}`,
        borderRadius: radius['radius/infinite'],
        boxSizing: 'border-box',
        display: 'inline-block',
        flex: '0 0 auto',
        height: 8,
        overflow: 'hidden',
        verticalAlign: 'middle',
        width: 8,
        ...style,
      }}
    />
  );
}
