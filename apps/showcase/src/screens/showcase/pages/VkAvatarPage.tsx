import { useState, type ReactNode } from 'react';

import {
  Avatar,
  type AvatarSize,
} from '../../../../../../src/vk-commerce/components';
import type {
  PlatformMode,
  ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkAvatarPage.module.css';

const DEMO_IMAGE = '/vk-avatar-demo.svg';

const AVATAR_SIZES = [
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  56,
  64,
  72,
  80,
  88,
  96,
] as const satisfies readonly AvatarSize[];

const CONTENT_SIZES = [24, 40, 72, 96] as const satisfies readonly AvatarSize[];
const STORIES_SIZES = [16, 24, 36, 40, 56, 72, 96] as const satisfies readonly AvatarSize[];
const OVERLAY_SIZES = [40, 72] as const satisfies readonly AvatarSize[];

const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

export function VkAvatarPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');

  const sharedProps = { theme, platform } as const;

  return (
    <div className={styles.page} data-vk-theme={theme}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components</p>
          <h1 className={styles.title}>Avatar visual QA</h1>
          <p className={styles.subtitle}>
            Проверка размеров, content variants, Stories, Overlay и slot anchors.
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
          title="Size scale"
          description="Все 15 подтверждённых размеров, Picture variant."
        >
          <div className={styles.sizeScale}>
            {AVATAR_SIZES.map((size) => (
              <AvatarSample key={size} label={String(size)}>
                <Avatar
                  {...sharedProps}
                  alt=""
                  content="picture"
                  size={size}
                  src={DEMO_IMAGE}
                />
              </AvatarSample>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Content variants"
          description="Picture, Text и переданный demo ReactNode."
        >
          <div className={styles.matrix}>
            {CONTENT_SIZES.map((size) => (
              <div className={styles.matrixRow} key={size}>
                <span className={styles.rowLabel}>{size}</span>
                <AvatarSample label="Picture">
                  <Avatar
                    {...sharedProps}
                    alt=""
                    content="picture"
                    size={size}
                    src={DEMO_IMAGE}
                  />
                </AvatarSample>
                <AvatarSample label="Text">
                  <Avatar {...sharedProps} content="text" label="AK" size={size} />
                </AvatarSample>
                <AvatarSample label="Icon">
                  <Avatar
                    {...sharedProps}
                    content="icon"
                    icon={<span className={styles.demoIcon}>✦</span>}
                    size={size}
                  />
                </AvatarSample>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Stories"
          description="Пары stories=false / true; контрольный переход 36 outside → 40 inside."
        >
          <div className={styles.storyGrid}>
            {STORIES_SIZES.map((size) => (
              <div className={styles.storyPair} key={size}>
                <span className={styles.rowLabel}>{size}</span>
                <AvatarSample label="false">
                  <Avatar
                    {...sharedProps}
                    alt=""
                    size={size}
                    src={DEMO_IMAGE}
                  />
                </AvatarSample>
                <AvatarSample label="true">
                  <Avatar
                    {...sharedProps}
                    alt=""
                    size={size}
                    src={DEMO_IMAGE}
                    stories
                  />
                </AvatarSample>
              </div>
            ))}
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Explicit placement · size 56</h3>
            <div className={styles.inlineSamples}>
              <AvatarSample label="outside">
                <Avatar
                  {...sharedProps}
                  alt=""
                  size={56}
                  src={DEMO_IMAGE}
                  stories
                  storyRingPlacement="outside"
                />
              </AvatarSample>
              <AvatarSample label="inside">
                <Avatar
                  {...sharedProps}
                  alt=""
                  size={56}
                  src={DEMO_IMAGE}
                  stories
                  storyRingPlacement="inside"
                />
              </AvatarSample>
            </div>
          </div>
        </QaSection>

        <QaSection
          title="Overlay"
          description="Picture variant без overlay и с semantic Overlay Secondary."
        >
          <div className={styles.inlineSamples}>
            {OVERLAY_SIZES.map((size) => (
              <div className={styles.overlayPair} key={size}>
                <span className={styles.rowLabel}>{size}</span>
                <AvatarSample label="false">
                  <Avatar
                    {...sharedProps}
                    alt=""
                    size={size}
                    src={DEMO_IMAGE}
                  />
                </AvatarSample>
                <AvatarSample label="true">
                  <Avatar
                    {...sharedProps}
                    alt=""
                    overlay
                    size={size}
                    src={DEMO_IMAGE}
                  />
                </AvatarSample>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Slots"
          description="Четыре anchors одновременно; size 20 получает props, но не рендерит slots."
        >
          <div className={styles.inlineSamples}>
            <SlotAvatar label="size 40" size={40} {...sharedProps} />
            <SlotAvatar label="size 72" size={72} {...sharedProps} />
            <div data-qa="slots-disabled-20">
              <SlotAvatar label="size 20 · slots hidden" size={20} {...sharedProps} />
            </div>
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

function AvatarSample({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.sample}>
      <div className={styles.avatarStage}>{children}</div>
      <span className={styles.sampleLabel}>{label}</span>
    </div>
  );
}

function SlotAvatar({
  label,
  size,
  theme,
  platform,
}: {
  label: string;
  size: AvatarSize;
  theme: ThemeMode;
  platform: PlatformMode;
}) {
  const slot = <span aria-hidden="true" className={styles.slotDot} />;

  return (
    <AvatarSample label={label}>
      <Avatar
        alt=""
        bottomLeftSlot={slot}
        bottomRightSlot={slot}
        platform={platform}
        size={size}
        src={DEMO_IMAGE}
        theme={theme}
        topLeftSlot={slot}
        topRightSlot={slot}
      />
    </AvatarSample>
  );
}

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
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
