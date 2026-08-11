import { useState, type ReactNode } from 'react';

import {
  Button,
  type ButtonAppearance,
  type ButtonMode,
  type ButtonSize,
} from '../../../../../../src/vk-commerce/components';
import type {
  PlatformMode,
  ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkButtonPage.module.css';

const SIZES: ReadonlyArray<ButtonSize> = ['small', 'medium', 'large'];
const MODES: ReadonlyArray<ButtonMode> = [
  'primary',
  'secondary',
  'outline',
  'link',
];
const FILLED_MODES = ['primary', 'secondary', 'outline'] as const;
const SIZE_LABELS: Record<ButtonSize, string> = {
  small: 'Small · 28',
  medium: 'Medium · 38',
  large: 'Large · 52',
};
const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

export function VkButtonPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const sharedProps = { theme, platform } as const;

  return (
    <div className={styles.page} data-vk-theme={theme}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components</p>
          <h1 className={styles.title}>Button visual QA</h1>
          <p className={styles.subtitle}>
            Проверка production Button: geometry, surfaces, content и states.
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
          description="Text: 28 / 38 / 52px. Icon-only использует те же квадратные размеры."
        >
          <div className={styles.sizeGroups}>
            <div className={styles.inlineSamples}>
              {SIZES.map((size) => (
                <Sample key={size} label={SIZE_LABELS[size]}>
                  <Button {...sharedProps} size={size}>
                    Button
                  </Button>
                </Sample>
              ))}
            </div>
            <div className={styles.inlineSamples}>
              {SIZES.map((size) => (
                <Sample key={size} label={`Icon · ${SIZE_LABELS[size].split(' · ')[1]}`}>
                  <Button
                    {...sharedProps}
                    aria-label={`${size} icon button`}
                    icon={<DemoIcon />}
                    size={size}
                  />
                </Sample>
              ))}
            </div>
          </div>
        </QaSection>

        <QaSection
          title="Width"
          description="Одинаковое состояние в hugged и filled-контрактах."
        >
          <div className={styles.widthStage}>
            <Sample label="Hugged">
              <Button {...sharedProps} size="medium" width="hugged">
                Button
              </Button>
            </Sample>
            <Sample label="Filled · 100%">
              <div className={styles.filledSlot}>
                <Button {...sharedProps} size="medium" width="filled">
                  Button
                </Button>
              </div>
            </Sample>
          </div>
        </QaSection>

        <AppearanceMatrix
          appearance="neutral"
          platform={platform}
          theme={theme}
        />

        <div className={styles.overlayStage}>
          <AppearanceMatrix
            appearance="overlay"
            platform={platform}
            theme={theme}
          />
        </div>

        <AppearanceMatrix
          appearance="custom"
          platform={platform}
          theme={theme}
        />

        <QaSection
          title="Content"
          description="Medium: 20px icon containers, 6px gap и внутренний Counter."
        >
          <div className={styles.contentGrid}>
            <Sample label="Text only">
              <Button {...sharedProps} size="medium">
                Button
              </Button>
            </Sample>
            <Sample label="Before + text">
              <Button {...sharedProps} before={<DemoIcon />} size="medium">
                Button
              </Button>
            </Sample>
            <Sample label="Text + after">
              <Button {...sharedProps} after={<DemoIcon />} size="medium">
                Button
              </Button>
            </Sample>
            <Sample label="Before + text + after">
              <Button
                {...sharedProps}
                after={<DemoIcon />}
                before={<DemoIcon />}
                size="medium"
              >
                Button
              </Button>
            </Sample>
            <Sample label="Text + counter">
              <Button {...sharedProps} counter={3} size="medium">
                Button
              </Button>
            </Sample>
            <Sample label="Before + text + counter + after">
              <Button
                {...sharedProps}
                after={<DemoIcon />}
                before={<DemoIcon />}
                counter={3}
                size="medium"
              >
                Button
              </Button>
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Icon only"
          description="Indicator отсутствует; внешний ReactNode наследует currentColor."
        >
          <div className={styles.inlineSamples}>
            {SIZES.map((size) => (
              <Sample key={size} label={SIZE_LABELS[size]}>
                <Button
                  {...sharedProps}
                  aria-label={`${size} search`}
                  icon={<DemoIcon />}
                  size={size}
                />
              </Sample>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Disabled"
          description="Native disabled и component-local opacity 0.52."
        >
          <div className={styles.disabledMatrix}>
            {MODES.map((mode) => (
              <div className={styles.statePair} key={mode}>
                <span className={styles.rowLabel}>Neutral {mode}</span>
                <Button {...sharedProps} mode={mode} size="medium">
                  Enabled
                </Button>
                <Button {...sharedProps} disabled mode={mode} size="medium">
                  Disabled
                </Button>
              </div>
            ))}
            <div className={`${styles.statePair} ${styles.darkStatePair}`}>
              <span className={styles.rowLabel}>Overlay primary</span>
              <Button
                {...sharedProps}
                appearance="overlay"
                mode="primary"
                size="medium"
              >
                Enabled
              </Button>
              <Button
                {...sharedProps}
                appearance="overlay"
                disabled
                mode="primary"
                size="medium"
              >
                Disabled
              </Button>
            </div>
            <div className={styles.statePair}>
              <span className={styles.rowLabel}>Custom primary</span>
              <Button
                {...sharedProps}
                appearance="custom"
                mode="primary"
                size="medium"
              >
                Enabled
              </Button>
              <Button
                {...sharedProps}
                appearance="custom"
                disabled
                mode="primary"
                size="medium"
              >
                Disabled
              </Button>
            </div>
          </div>
        </QaSection>

        <QaSection
          title="Filled"
          description="Все подтверждённые Filled variants; Link намеренно отсутствует."
        >
          <div className={styles.filledMatrix}>
            {(['neutral', 'overlay', 'custom'] as const).map((appearance) => (
              <div
                className={
                  appearance === 'overlay'
                    ? `${styles.filledGroup} ${styles.overlayFilledGroup}`
                    : styles.filledGroup
                }
                key={appearance}
              >
                <span className={styles.rowLabel}>{appearance}</span>
                {FILLED_MODES.map((mode) => (
                  <Button
                    {...sharedProps}
                    appearance={appearance}
                    key={mode}
                    mode={mode}
                    size="medium"
                    width="filled"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </QaSection>
      </main>
    </div>
  );
}

function AppearanceMatrix({
  appearance,
  theme,
  platform,
}: {
  appearance: ButtonAppearance;
  theme: ThemeMode;
  platform: PlatformMode;
}) {
  return (
    <QaSection
      title={appearance[0].toUpperCase() + appearance.slice(1)}
      description="Primary / Secondary / Outline / Link × Small / Medium / Large."
    >
      <div className={styles.appearanceMatrix}>
        {MODES.map((mode) => (
          <div className={styles.matrixRow} key={mode}>
            <span className={styles.rowLabel}>{mode}</span>
            <div className={styles.matrixButtons}>
              {SIZES.map((size) => (
                <Button
                  appearance={appearance}
                  key={size}
                  mode={mode}
                  platform={platform}
                  size={size}
                  theme={theme}
                >
                  Button
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </QaSection>
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

function Sample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.sample}>
      <div className={styles.sampleStage}>{children}</div>
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

function DemoIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="2" />
      <path d="m15 15 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
