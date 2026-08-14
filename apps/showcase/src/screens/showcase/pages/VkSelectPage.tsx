import { useState, type CSSProperties, type ReactNode } from 'react';

import {
  Select,
  type SelectStatus,
} from '../../../../../../src/vk-commerce/components';
import {
  getSemanticColors,
  primitiveColors,
  type PlatformMode,
  type ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkSelectPage.module.css';

const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

const VALIDATION_STATES: ReadonlyArray<{
  status: SelectStatus;
  label: string;
}> = [
  { status: 'default', label: 'Default' },
  { status: 'error', label: 'Error' },
  { status: 'valid', label: 'Valid' },
];

interface QaCssProperties extends CSSProperties {
  '--qa-chip-background': string;
  '--qa-chip-border': string;
  '--qa-chip-text': string;
  '--qa-chip-icon': string;
  '--qa-form-secondary': string;
}

export function VkSelectPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const colors = getSemanticColors(theme);
  const sharedProps = { theme, platform } as const;
  const qaStyle: QaCssProperties = {
    '--qa-chip-background':
      theme === 'light' ? primitiveColors.white : primitiveColors.black,
    '--qa-chip-border': colors.separator.primary,
    '--qa-chip-text': colors.text.primary,
    '--qa-chip-icon': colors.icon.secondary,
    '--qa-form-secondary': colors.text.secondary,
  };

  return (
    <div className={styles.page} data-vk-theme={theme} style={qaStyle}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components · Form Fields</p>
          <h1 className={styles.title}>Select visual QA</h1>
          <p className={styles.subtitle}>
            Проверка trigger surface, content modes, states и dynamic Chips height.
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
          title="Content"
          description="Empty, Placeholder и Filled определяются переданными данными; chevron всегда остаётся видимым."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Empty">
              <Select {...sharedProps} aria-label="Empty select" />
            </Sample>
            <Sample label="Placeholder">
              <Select {...sharedProps} placeholder="Choose an option" />
            </Sample>
            <Sample label="Filled">
              <Select {...sharedProps} value="Action is eloquence" />
            </Sample>
            <Sample label="Long Filled">
              <Select
                {...sharedProps}
                value="A very long selected value that must truncate before the chevron"
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Interaction states"
          description="Hover и Active зафиксированы только showcase CSS; open=true использует настоящий public API."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Default">
              <Select {...sharedProps} value="Action is eloquence" />
            </Sample>
            <Sample className={styles.forceHover} label="Hover · QA lock">
              <Select {...sharedProps} value="Action is eloquence" />
            </Sample>
            <Sample className={styles.forceActive} label="Active · QA lock">
              <Select {...sharedProps} value="Action is eloquence" />
            </Sample>
            <Sample label="Open · public state">
              <Select {...sharedProps} open value="Action is eloquence" />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Validation"
          description="Default, Error и Valid проверяются с Empty, Placeholder и Filled content."
        >
          <div className={styles.validationMatrix}>
            {VALIDATION_STATES.map(({ status, label }) => (
              <div className={styles.validationRow} key={status}>
                <span className={styles.rowLabel}>{label}</span>
                <Sample label="Empty">
                  <Select
                    {...sharedProps}
                    aria-label={`${label} empty select`}
                    status={status}
                  />
                </Sample>
                <Sample label="Placeholder">
                  <Select
                    {...sharedProps}
                    placeholder="Choose an option"
                    status={status}
                  />
                </Sample>
                <Sample label="Filled">
                  <Select
                    {...sharedProps}
                    status={status}
                    value="Action is eloquence"
                  />
                </Sample>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Disabled"
          description="Каждая исходная surface сохраняется и целиком композитится с alpha 52%."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Empty">
              <Select {...sharedProps} aria-label="Disabled empty select" disabled />
            </Sample>
            <Sample label="Placeholder">
              <Select {...sharedProps} disabled placeholder="Choose an option" />
            </Sample>
            <Sample label="Filled">
              <Select {...sharedProps} disabled value="Action is eloquence" />
            </Sample>
            <Sample label="Error + disabled">
              <Select
                {...sharedProps}
                disabled
                status="error"
                value="Action is eloquence"
              />
            </Sample>
            <Sample label="Valid + disabled">
              <Select
                {...sharedProps}
                disabled
                status="valid"
                value="Action is eloquence"
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Chips"
          description="QA-only chips проверяют min-height, wrap и вертикальное центрирование chevron."
        >
          <div className={styles.chipsGrid}>
            <Sample label="1 chip">
              <Select {...sharedProps} chips={<QaChip label="Music" />} />
            </Sample>
            <Sample label="3 chips">
              <Select
                {...sharedProps}
                chips={
                  <>
                    <QaChip label="Music" />
                    <QaChip label="Video" />
                    <QaChip label="Books" />
                  </>
                }
              />
            </Sample>
            <Sample label="Wrap to second line">
              <Select
                {...sharedProps}
                chips={
                  <>
                    <QaChip label="Music" />
                    <QaChip label="Photography" />
                    <QaChip label="Video" />
                    <QaChip label="Books" />
                  </>
                }
              />
            </Sample>
            <Sample label="Many chips · tall Select">
              <Select
                {...sharedProps}
                chips={[
                  'Music',
                  'Video',
                  'Books',
                  'Photography',
                  'Design',
                  'Cinema',
                  'Travel',
                  'Games',
                  'Food',
                  'Sport',
                  'Science',
                  'Fashion',
                ].map((label) => (
                  <QaChip key={label} label={label} />
                ))}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Width"
          description="Reference container 320px и fluid width внутри доступного пространства."
        >
          <div className={styles.widthGrid}>
            <Sample className={styles.referenceWidth} label="Fixed QA container · 320">
              <Select {...sharedProps} placeholder="Choose an option" />
            </Sample>
            <Sample className={styles.fluidWidth} label="Fluid · 100%">
              <Select {...sharedProps} value="Action is eloquence" />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Form Fields context"
          description="Showcase-only Label / Select / Caption composition; production FormField не создаётся."
        >
          <div className={styles.formContext}>
            <label className={styles.fieldLabel} htmlFor="qa-select-field">
              Label
            </label>
            <Select
              {...sharedProps}
              id="qa-select-field"
              placeholder="Choose an option"
            />
            <span className={styles.caption}>Caption</span>
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

function Sample({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className ? `${styles.sample} ${className}` : styles.sample}>
      <div className={styles.sampleStage}>{children}</div>
      <span className={styles.sampleLabel}>{label}</span>
    </div>
  );
}

function QaChip({ label }: { label: string }) {
  return (
    <span className={styles.qaChip}>
      <span className={styles.qaChipLabel}>{label}</span>
      <span aria-hidden="true" className={styles.qaChipClose}>
        <svg fill="none" viewBox="0 0 16 16">
          <path
            d="M11.6317 3.23424C11.9441 2.92191 12.4502 2.92197 12.7626 3.23424C13.0749 3.54664 13.0749 4.05268 12.7626 4.36509L9.12877 7.99791L12.7626 11.6317C13.0749 11.9441 13.0749 12.4502 12.7626 12.7626C12.4502 13.075 11.9441 13.0749 11.6317 12.7626L7.99792 9.12877L4.3651 12.7626C4.05269 13.0749 3.54665 13.0749 3.23424 12.7626C2.92198 12.4501 2.9219 11.9441 3.23424 11.6317L6.86706 7.99791L3.23424 4.36509C2.92197 4.05266 2.92187 3.54661 3.23424 3.23424C3.54662 2.92188 4.05268 2.92196 4.3651 3.23424L7.99792 6.86705L11.6317 3.23424Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
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
