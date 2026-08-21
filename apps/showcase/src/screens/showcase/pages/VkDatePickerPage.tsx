import { useState, type CSSProperties, type ReactNode } from 'react';

import {
  DatePicker,
  type DatePickerStatus,
} from '../../../../../../src/vk-commerce/components';
import {
  getSemanticColors,
  type PlatformMode,
  type ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkDatePickerPage.module.css';

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
  status: DatePickerStatus;
  label: string;
}> = [
  { status: 'default', label: 'Default' },
  { status: 'error', label: 'Error' },
  { status: 'valid', label: 'Valid' },
];

const DATE = '01.02.1995';
const TIME = '12:00';
const END_DATE = '10.05.2023';

interface QaCssProperties extends CSSProperties {
  '--qa-form-secondary': string;
}

export function VkDatePickerPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const [clearableDate, setClearableDate] = useState<string | undefined>(DATE);
  const colors = getSemanticColors(theme);
  const sharedProps = { theme, platform } as const;
  const qaStyle: QaCssProperties = {
    '--qa-form-secondary': colors.text.secondary,
  };

  return (
    <div className={styles.page} data-vk-theme={theme} style={qaStyle}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components · Form Fields</p>
          <h1 className={styles.title}>Date Picker visual QA</h1>
          <p className={styles.subtitle}>
            Проверка field/trigger, formatted segments, states и clear action.
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
          title="Type"
          description="Date, Date & Time и Date Range используют formatted strings; partial values сохраняют masks пустых сегментов."
        >
          <div className={styles.typeGroups}>
            <TypeGroup title="Date">
              <Sample label="Empty">
                <DatePicker {...sharedProps} aria-label="Choose date" />
              </Sample>
              <Sample label="Filled">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date"
                  date={DATE}
                  onClear={() => undefined}
                />
              </Sample>
            </TypeGroup>

            <TypeGroup title="Date & Time">
              <Sample label="Empty">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date and time"
                  type="date-time"
                />
              </Sample>
              <Sample label="Filled">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date and time"
                  date={DATE}
                  onClear={() => undefined}
                  time={TIME}
                  type="date-time"
                />
              </Sample>
              <Sample label="Partial · date only">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date and time"
                  date={DATE}
                  onClear={() => undefined}
                  type="date-time"
                />
              </Sample>
              <Sample label="Partial · time only">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date and time"
                  onClear={() => undefined}
                  time={TIME}
                  type="date-time"
                />
              </Sample>
            </TypeGroup>

            <TypeGroup title="Date Range">
              <Sample label="Empty">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date range"
                  type="date-range"
                />
              </Sample>
              <Sample label="Filled">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date range"
                  endDate={END_DATE}
                  onClear={() => undefined}
                  startDate={DATE}
                  type="date-range"
                />
              </Sample>
              <Sample label="Partial · start only">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date range"
                  onClear={() => undefined}
                  startDate={DATE}
                  type="date-range"
                />
              </Sample>
              <Sample label="Partial · end only">
                <DatePicker
                  {...sharedProps}
                  aria-label="Choose date range"
                  endDate={END_DATE}
                  onClear={() => undefined}
                  type="date-range"
                />
              </Sample>
            </TypeGroup>
          </div>
        </QaSection>

        <QaSection
          title="Interaction states"
          description="Hover и Active зафиксированы только showcase CSS; open=true использует настоящий public API."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Default">
              <DatePicker {...sharedProps} aria-label="Default date" date={DATE} />
            </Sample>
            <Sample className={styles.forceHover} label="Hover · QA lock">
              <DatePicker {...sharedProps} aria-label="Hover date" date={DATE} />
            </Sample>
            <Sample className={styles.forceActive} label="Active · QA lock">
              <DatePicker {...sharedProps} aria-label="Active date" date={DATE} />
            </Sample>
            <Sample label="Open · public state">
              <DatePicker {...sharedProps} aria-label="Open date" date={DATE} open />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Validation"
          description="Default, Error и Valid проверяются для Empty Date и заполненных Date, Date & Time и Date Range."
        >
          <div className={styles.validationMatrix}>
            {VALIDATION_STATES.map(({ status, label }) => (
              <div className={styles.validationRow} key={status}>
                <span className={styles.rowLabel}>{label}</span>
                <Sample label="Empty Date">
                  <DatePicker
                    {...sharedProps}
                    aria-label={`${label} empty date`}
                    status={status}
                  />
                </Sample>
                <Sample label="Filled Date">
                  <DatePicker
                    {...sharedProps}
                    aria-label={`${label} date`}
                    date={DATE}
                    status={status}
                  />
                </Sample>
                <Sample label="Date & Time">
                  <DatePicker
                    {...sharedProps}
                    aria-label={`${label} date and time`}
                    date={DATE}
                    status={status}
                    time={TIME}
                    type="date-time"
                  />
                </Sample>
                <Sample label="Date Range">
                  <DatePicker
                    {...sharedProps}
                    aria-label={`${label} date range`}
                    endDate={END_DATE}
                    startDate={DATE}
                    status={status}
                    type="date-range"
                  />
                </Sample>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Disabled"
          description="Выбранная surface сохраняется и целиком композитится с alpha 52%; native buttons остаются disabled."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Date · Empty">
              <DatePicker {...sharedProps} aria-label="Disabled empty date" disabled />
            </Sample>
            <Sample label="Date · Filled">
              <DatePicker
                {...sharedProps}
                aria-label="Disabled filled date"
                date={DATE}
                disabled
                onClear={() => undefined}
              />
            </Sample>
            <Sample label="Date & Time · Filled">
              <DatePicker
                {...sharedProps}
                aria-label="Disabled date and time"
                date={DATE}
                disabled
                onClear={() => undefined}
                time={TIME}
                type="date-time"
              />
            </Sample>
            <Sample label="Date Range · Filled">
              <DatePicker
                {...sharedProps}
                aria-label="Disabled date range"
                disabled
                endDate={END_DATE}
                onClear={() => undefined}
                startDate={DATE}
                type="date-range"
              />
            </Sample>
            <Sample label="Error + disabled">
              <DatePicker
                {...sharedProps}
                aria-label="Disabled error date"
                date={DATE}
                disabled
                status="error"
              />
            </Sample>
            <Sample label="Valid + disabled">
              <DatePicker
                {...sharedProps}
                aria-label="Disabled valid date"
                date={DATE}
                disabled
                status="valid"
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Clear action"
          description="Filled glyph становится отдельной sibling button только при наличии onClear; click не открывает trigger."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Interactive clear">
              <DatePicker
                {...sharedProps}
                aria-label="Clearable date"
                date={clearableDate}
                onClear={() => setClearableDate(undefined)}
              />
            </Sample>
            <Sample label="Decorative affordance">
              <DatePicker
                {...sharedProps}
                aria-label="Read only selected date"
                date={DATE}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Width"
          description="Reference 320px и fluid 100%; Date Range остаётся single-line, а clear action не выходит за bounds."
        >
          <div className={styles.widthGrid}>
            <Sample className={styles.referenceWidth} label="Reference · 320">
              <DatePicker
                {...sharedProps}
                aria-label="Reference date range"
                endDate={END_DATE}
                onClear={() => undefined}
                startDate={DATE}
                type="date-range"
              />
            </Sample>
            <Sample className={styles.fluidWidth} label="Fluid · 100%">
              <DatePicker
                {...sharedProps}
                aria-label="Fluid date range"
                endDate={END_DATE}
                onClear={() => undefined}
                startDate={DATE}
                type="date-range"
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Android Typography/Text"
          description="Отдельная проверка platform Text: 16px / 18.5px / Semibold с Android letter spacing без local variable axes."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Android · Empty">
              <DatePicker aria-label="Android empty date" platform="android" theme={theme} />
            </Sample>
            <Sample label="Android · Filled">
              <DatePicker
                aria-label="Android filled date"
                data-qa-android-date-picker=""
                date={DATE}
                platform="android"
                theme={theme}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Form Fields context"
          description="Showcase-only Label / DatePicker / Caption composition; production FormField не создаётся."
        >
          <div className={styles.formContext}>
            <span className={styles.fieldLabel} id="qa-date-picker-label">
              Label
            </span>
            <DatePicker
              {...sharedProps}
              aria-describedby="qa-date-picker-caption"
              aria-labelledby="qa-date-picker-label"
            />
            <span className={styles.caption} id="qa-date-picker-caption">
              Caption
            </span>
          </div>
        </QaSection>
      </main>
    </div>
  );
}

function TypeGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.typeGroup}>
      <h3 className={styles.typeTitle}>{title}</h3>
      <div className={styles.typeGrid}>{children}</div>
    </section>
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
