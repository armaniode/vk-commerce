import { useState, type ReactNode } from 'react';

import {
  Input,
  type InputStatus,
} from '../../../../../../src/vk-commerce/components';
import {
  getSemanticColors,
  type PlatformMode,
  type ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkInputPage.module.css';

const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

const CONTENT_VARIANTS = [
  { label: 'Empty', props: { 'aria-label': 'Empty input' } },
  { label: 'Placeholder', props: { placeholder: 'Action is eloquence' } },
  { label: 'Filled', props: { defaultValue: 'Action is eloquence' } },
] as const;

const VALIDATION_STATES: ReadonlyArray<{
  status: InputStatus;
  label: string;
}> = [
  { status: 'default', label: 'Default' },
  { status: 'error', label: 'Error' },
  { status: 'valid', label: 'Valid' },
];

export function VkInputPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const [editableValue, setEditableValue] = useState('Editable value');
  const sharedProps = { theme, platform } as const;
  const formFieldTextColor = getSemanticColors(theme).text.secondary;

  return (
    <div className={styles.page} data-vk-theme={theme}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components · Form Fields</p>
          <h1 className={styles.title}>Input visual QA</h1>
          <p className={styles.subtitle}>
            Проверка native semantics, content, interaction и validation states.
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
          description="Empty, Placeholder и Filled представлены нативными input attributes."
        >
          <div className={styles.sampleGrid}>
            {CONTENT_VARIANTS.map((variant) => (
              <Sample key={variant.label} label={variant.label}>
                <Input {...sharedProps} {...variant.props} />
              </Sample>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Interaction states"
          description="Hover и Active зафиксированы только CSS-обёртками showcase; production использует :hover и :focus-within."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Default">
              <Input {...sharedProps} defaultValue="Action is eloquence" />
            </Sample>
            <Sample className={styles.forceHover} label="Hover · QA lock">
              <Input {...sharedProps} defaultValue="Action is eloquence" />
            </Sample>
            <Sample className={styles.forceActive} label="Active / focus · QA lock">
              <Input {...sharedProps} defaultValue="Action is eloquence" />
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
                {CONTENT_VARIANTS.map((variant) => (
                  <Sample key={variant.label} label={variant.label}>
                    <Input
                      {...sharedProps}
                      {...variant.props}
                      status={status}
                    />
                  </Sample>
                ))}
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Icons"
          description="Before и After используют внешние showcase-local glyphs в 24px slots."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Before">
              <Input
                {...sharedProps}
                before={<SearchIcon />}
                placeholder="Search"
              />
            </Sample>
            <Sample label="After">
              <Input
                {...sharedProps}
                after={<InfoIcon />}
                defaultValue="Action is eloquence"
              />
            </Sample>
            <Sample label="Before + After">
              <Input
                {...sharedProps}
                after={<InfoIcon />}
                before={<SearchIcon />}
                defaultValue="Action is eloquence"
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Disabled"
          description="Native disabled и source-equivalent alpha compositing всей surface с opacity 52%."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Empty">
              <Input {...sharedProps} aria-label="Disabled empty input" disabled />
            </Sample>
            <Sample label="Placeholder">
              <Input {...sharedProps} disabled placeholder="Action is eloquence" />
            </Sample>
            <Sample label="Filled">
              <Input {...sharedProps} defaultValue="Action is eloquence" disabled />
            </Sample>
            <Sample label="Error + disabled">
              <Input
                {...sharedProps}
                defaultValue="Action is eloquence"
                disabled
                status="error"
              />
            </Sample>
            <Sample label="Valid + disabled">
              <Input
                {...sharedProps}
                defaultValue="Action is eloquence"
                disabled
                status="valid"
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
              <Input {...sharedProps} placeholder="Action is eloquence" />
            </Sample>
            <Sample className={styles.fluidWidth} label="Fluid · 100%">
              <Input {...sharedProps} placeholder="Action is eloquence" />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Native behaviour"
          description="Editable, placeholder, disabled, readOnly и long value используют настоящий input."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Editable value">
              <Input
                {...sharedProps}
                onChange={(event) => setEditableValue(event.target.value)}
                value={editableValue}
              />
            </Sample>
            <Sample label="Placeholder">
              <Input {...sharedProps} placeholder="Type something" />
            </Sample>
            <Sample label="Disabled">
              <Input {...sharedProps} defaultValue="Disabled" disabled />
            </Sample>
            <Sample label="Read only">
              <Input {...sharedProps} defaultValue="Read only" readOnly />
            </Sample>
            <Sample label="Long value">
              <Input
                {...sharedProps}
                defaultValue="A very long native input value that stays inside the fluid field"
                readOnly
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Form Fields context"
          description="Showcase-only composition; production FormField component не создаётся."
        >
          <div
            className={styles.formContextGrid}
            style={{ color: formFieldTextColor }}
          >
            <div className={styles.fieldComposition}>
              <label className={styles.fieldLabel} htmlFor="qa-input-label">
                Label
              </label>
              <Input
                {...sharedProps}
                id="qa-input-label"
                placeholder="Action is eloquence"
              />
              <span className={styles.caption}>Caption</span>
            </div>

            <div className={styles.pairedInputs}>
              <div className={styles.pairedField}>
                <label className={styles.fieldLabel} htmlFor="qa-input-first">
                  Label
                </label>
                <Input
                  {...sharedProps}
                  id="qa-input-first"
                  placeholder="First"
                />
                <span className={styles.caption}>Caption</span>
              </div>

              <div className={styles.pairedField}>
                <label className={styles.fieldLabel} htmlFor="qa-input-second">
                  Label
                </label>
                <Input
                  {...sharedProps}
                  id="qa-input-second"
                  placeholder="Second"
                />
                <span className={styles.caption}>Caption</span>
              </div>
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

function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="2" />
      <path d="m15 15 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10.5V16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <circle cx="12" cy="7.5" fill="currentColor" r="1" />
    </svg>
  );
}
