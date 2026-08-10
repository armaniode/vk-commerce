import { useState, type ReactNode } from 'react';

import {
  UsersStack,
  type UsersStackUsers,
} from '../../../../../../src/vk-commerce/components';
import type {
  PlatformMode,
  ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkUsersStackPage.module.css';

const TWO_USERS: UsersStackUsers = [
  { src: '/vk-users-stack-avatar-a.svg', alt: 'A' },
  { src: '/vk-users-stack-avatar-c.svg', alt: 'C' },
];

const THREE_USERS: UsersStackUsers = [
  { src: '/vk-users-stack-avatar-a.svg', alt: 'A' },
  { src: '/vk-users-stack-avatar-b.svg', alt: 'B' },
  { src: '/vk-users-stack-avatar-c.svg', alt: 'C' },
];

const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

export function VkUsersStackPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const sharedProps = { theme, platform } as const;

  return (
    <div className={styles.page} data-vk-theme={theme}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components</p>
          <h1 className={styles.title}>Users Stack visual QA</h1>
          <p className={styles.subtitle}>
            Проверка двух и трёх Avatar, overlap, mask и description.
          </p>
        </div>

        <div className={styles.controls}>
          <ControlGroup label="Theme">
            <ControlButton
              active={theme === 'light'}
              label="Light"
              onClick={() => setTheme('light')}
            />
            <ControlButton
              active={theme === 'dark'}
              label="Dark"
              onClick={() => setTheme('dark')}
            />
          </ControlGroup>

          <ControlGroup label="Platform">
            {PLATFORM_OPTIONS.map((option) => (
              <ControlButton
                key={option.value}
                active={platform === option.value}
                label={option.label}
                onClick={() => setPlatform(option.value)}
              />
            ))}
          </ControlGroup>
        </div>
      </header>

      <main className={styles.content}>
        <QaSection
          title="Stack"
          description="Avatar остаются 20×20px; подтверждены только 2 и 3 users."
        >
          <div className={styles.samples}>
            <StackSample label="2 users">
              <UsersStack {...sharedProps} users={TWO_USERS} />
            </StackSample>
            <StackSample label="3 users · 44×20">
              <UsersStack {...sharedProps} users={THREE_USERS} />
            </StackSample>
          </div>
        </QaSection>

        <QaSection
          title="Description"
          description="Gap 10px, semantic Text / Secondary и platform typography."
        >
          <div className={styles.samples}>
            <StackSample label="2 users + description">
              <UsersStack
                {...sharedProps}
                description="Description"
                users={TWO_USERS}
              />
            </StackSample>
            <StackSample label="3 users + description">
              <UsersStack
                {...sharedProps}
                description="Description"
                users={THREE_USERS}
              />
            </StackSample>
          </div>
        </QaSection>

        <QaSection
          title="Long description"
          description="Контейнер ограничен по ширине для проверки single-line ellipsis."
        >
          <div className={styles.constrainedSample} data-qa="long-description">
            <UsersStack
              {...sharedProps}
              description="Очень длинное описание группы пользователей для проверки обрезки"
              users={THREE_USERS}
            />
          </div>
        </QaSection>

        <QaSection
          title="Reference geometry"
          description="Контрольный reference instance: 158×20px, без runtime width contract."
        >
          <div className={styles.referenceInstance} data-qa="reference-instance">
            <UsersStack
              {...sharedProps}
              description="Description"
              users={THREE_USERS}
            />
          </div>
        </QaSection>
      </main>
    </div>
  );
}

function QaSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      {children}
    </section>
  );
}

function StackSample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.sample}>
      <div className={styles.stackStage}>{children}</div>
      <span className={styles.sampleLabel}>{label}</span>
    </div>
  );
}

function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className={styles.controlGroup}>
      <legend className={styles.controlLabel}>{label}</legend>
      <div className={styles.segmentedControl}>{children}</div>
    </fieldset>
  );
}

function ControlButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={styles.controlButton}
      data-active={active}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
