import type { ReactElement } from 'react';

import { useHashRoute } from './lib/useHashRoute';
import { VkAvatarPage } from './pages/VkAvatarPage';
import { VkButtonPage } from './pages/VkButtonPage';
import { VkDatePickerPage } from './pages/VkDatePickerPage';
import { VkInputPage } from './pages/VkInputPage';
import { VkProfileEditPrototypePage } from './pages/VkProfileEditPrototypePage';
import { VkSelectPage } from './pages/VkSelectPage';
import { VkShowcaseHomePage } from './pages/VkShowcaseHomePage';
import { VkTextareaPage } from './pages/VkTextareaPage';
import { VkUsersStackPage } from './pages/VkUsersStackPage';

const VK_ROUTES: Record<string, () => ReactElement> = {
  '/vk-components/avatar': VkAvatarPage,
  '/vk-components/button': VkButtonPage,
  '/vk-components/date-picker': VkDatePickerPage,
  '/vk-components/input': VkInputPage,
  '/vk-components/select': VkSelectPage,
  '/vk-components/textarea': VkTextareaPage,
  '/vk-components/users-stack': VkUsersStackPage,
  '/vk-prototypes/profile-edit': VkProfileEditPrototypePage,
};

export function Showcase() {
  const path = useHashRoute();

  if (path === '/' || path === '') {
    return <VkShowcaseHomePage />;
  }

  const VkPage = VK_ROUTES[path];
  if (VkPage) {
    return <VkPage />;
  }

  return <VkShowcaseHomePage />;
}
