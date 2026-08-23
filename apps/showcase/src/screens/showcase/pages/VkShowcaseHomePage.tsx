import type { CSSProperties } from 'react';

import {
  getSemanticColors,
  spacing,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkShowcaseHomePage.module.css';

const NAVIGATION_GROUPS = [
  {
    title: 'VK Components',
    links: [
      { label: 'Avatar', href: '#/vk-components/avatar' },
      { label: 'Button', href: '#/vk-components/button' },
      {
        label: 'Segmented Control',
        href: '#/vk-components/segmented-control',
      },
      { label: 'Users Stack', href: '#/vk-components/users-stack' },
    ],
  },
  {
    title: 'Form Fields',
    links: [
      { label: 'Input', href: '#/vk-components/input' },
      { label: 'Select', href: '#/vk-components/select' },
      { label: 'Textarea', href: '#/vk-components/textarea' },
      { label: 'Date Picker', href: '#/vk-components/date-picker' },
    ],
  },
  {
    title: 'Prototypes',
    links: [
      { label: 'Profile Edit · iOS', href: '#/vk-prototypes/profile-edit' },
    ],
  },
] as const;

interface HomeCssProperties extends CSSProperties {
  '--vk-home-background': string;
  '--vk-home-surface': string;
  '--vk-home-surface-secondary': string;
  '--vk-home-text-primary': string;
  '--vk-home-text-secondary': string;
  '--vk-home-accent': string;
  '--vk-home-separator': string;
  '--vk-home-spacing-m': string;
  '--vk-home-spacing-xl': string;
  '--vk-home-spacing-4xl': string;
}

export function VkShowcaseHomePage() {
  const colors = getSemanticColors('light');
  const style: HomeCssProperties = {
    '--vk-home-background': colors.background.tertiary,
    '--vk-home-surface': colors.background.contrast,
    '--vk-home-surface-secondary': colors.background.secondary,
    '--vk-home-text-primary': colors.text.primary,
    '--vk-home-text-secondary': colors.text.secondary,
    '--vk-home-accent': colors.text.accent,
    '--vk-home-separator': colors.separator.primary,
    '--vk-home-spacing-m': `${spacing.sizeM}px`,
    '--vk-home-spacing-xl': `${spacing.sizeXl}px`,
    '--vk-home-spacing-4xl': `${spacing.size4xl}px`,
  };

  return (
    <div className={styles.page} style={style}>
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="#/">
          <span>VK Social Commerce</span>
          <strong>Showcase</strong>
        </a>

        <nav aria-label="VK showcase navigation" className={styles.navigation}>
          {NAVIGATION_GROUPS.map((group) => (
            <section className={styles.navigationGroup} key={group.title}>
              <h2>{group.title}</h2>
              <div className={styles.navigationLinks}>
                {group.links.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </aside>

      <main className={styles.content}>
        <p className={styles.eyebrow}>VK Social Commerce</p>
        <h1>Prototyping Environment</h1>
        <p className={styles.lead}>
          Foundations, production components and mobile prototypes available in
          the current VK layer.
        </p>

        <section className={styles.overview}>
          <span className={styles.status}>Current VK showcase</span>
          <h2>Выберите компонент или прототип в навигации</h2>
          <p>
            Корневой экран показывает актуальный VK-контент без authentication
            gate и без автоматического перехода в конкретный prototype.
          </p>
        </section>
      </main>
    </div>
  );
}
