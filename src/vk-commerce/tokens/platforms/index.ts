import { androidTokens } from './android';
import { desktopTokens } from './desktop';
import { iosTokens } from './ios';
import { vkcomTokens } from './vkcom';

export type PlatformMode = 'ios' | 'android' | 'desktop' | 'vkcom';

export const platformTokens = {
  ios: iosTokens,
  android: androidTokens,
  desktop: desktopTokens,
  vkcom: vkcomTokens,
} as const;

export function getPlatformTokens(platform: PlatformMode) {
  return platformTokens[platform];
}

export { androidTokens, desktopTokens, iosTokens, vkcomTokens };
