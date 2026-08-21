import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import {
  Input,
  Textarea,
  type TextareaProps,
  type TextareaStatus,
} from '../../../../../../src/vk-commerce/components';
import {
  getSemanticColors,
  type PlatformMode,
  type ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkTextareaPage.module.css';

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
  status: TextareaStatus;
  label: string;
}> = [
  { status: 'default', label: 'Default' },
  { status: 'error', label: 'Error' },
  { status: 'valid', label: 'Valid' },
];

const MULTILINE_TEXT = 'Action is eloquence.\nA second line confirms wrapping.';
const THREE_LINE_TEXT = 'First line\nSecond line\nThird line';
const LONG_TEXT = Array.from(
  { length: 14 },
  (_, index) => `Scrollable line ${index + 1}: action is eloquence.`,
).join('\n');

interface QaCssProperties extends CSSProperties {
  '--qa-form-secondary': string;
}

export function VkTextareaPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const [controlledValue, setControlledValue] = useState(
    'Controlled first line\nControlled second line',
  );
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
          <h1 className={styles.title}>Textarea visual QA</h1>
          <p className={styles.subtitle}>
            Проверка native multiline semantics, auto-grow, states и scrolling.
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
          description="Empty, Placeholder и Filled определяются native textarea attributes. Filled остаётся многострочным."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Empty">
              <Textarea {...sharedProps} aria-label="Empty textarea" />
            </Sample>
            <Sample label="Placeholder">
              <Textarea {...sharedProps} placeholder="Action is eloquence" />
            </Sample>
            <Sample label="Filled · one line">
              <Textarea {...sharedProps} defaultValue="Action is eloquence" />
            </Sample>
            <Sample label="Filled · multiline">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} />
            </Sample>
            <Sample label="Long multiline">
              <Textarea {...sharedProps} defaultValue={LONG_TEXT} />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Height · Hug Text"
          description="Подписи показывают фактическую высоту rendered root: от 52px до 208px."
        >
          <div className={styles.heightGrid}>
            <MeasuredTextarea
              {...sharedProps}
              aria-label="Measured empty textarea"
              label="Empty"
            />
            <MeasuredTextarea
              {...sharedProps}
              defaultValue="Action is eloquence"
              label="1 line"
            />
            <MeasuredTextarea
              {...sharedProps}
              defaultValue={THREE_LINE_TEXT}
              label="3 lines · growth"
            />
            <MeasuredTextarea
              {...sharedProps}
              defaultValue={LONG_TEXT}
              label="Many lines · max + overflow"
            />
          </div>
        </QaSection>

        <QaSection
          title="Height · Fixed"
          description="Каждый example сохраняет 120px; длинный content прокручивается внутри."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Empty · 120px">
              <Textarea {...sharedProps} aria-label="Fixed empty textarea" height="fixed" />
            </Sample>
            <Sample label="Placeholder · 120px">
              <Textarea
                {...sharedProps}
                height="fixed"
                placeholder="Action is eloquence"
              />
            </Sample>
            <Sample label="Filled · 120px">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} height="fixed" />
            </Sample>
            <Sample label="Long overflow · 120px">
              <Textarea {...sharedProps} defaultValue={LONG_TEXT} height="fixed" />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Interaction states"
          description="Hover и Active зафиксированы только showcase CSS; production использует :hover и :focus-within."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Default">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} />
            </Sample>
            <Sample className={styles.forceHover} label="Hover · QA lock">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} />
            </Sample>
            <Sample className={styles.forceActive} label="Active · QA lock">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Validation"
          description="Default, Error и Valid проверяются с Placeholder и Filled multiline content."
        >
          <div className={styles.validationMatrix}>
            {VALIDATION_STATES.map(({ status, label }) => (
              <div className={styles.validationRow} key={status}>
                <span className={styles.rowLabel}>{label}</span>
                <Sample label="Placeholder">
                  <Textarea
                    {...sharedProps}
                    placeholder="Action is eloquence"
                    status={status}
                  />
                </Sample>
                <Sample label="Filled multiline">
                  <Textarea
                    {...sharedProps}
                    defaultValue={MULTILINE_TEXT}
                    status={status}
                  />
                </Sample>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          title="Icons"
          description="Before и After используют showcase-local glyphs в верхних 24px slots."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Before">
              <Textarea
                {...sharedProps}
                before={<SearchIcon />}
                placeholder="Action is eloquence"
              />
            </Sample>
            <Sample label="After">
              <Textarea
                {...sharedProps}
                after={<InfoIcon />}
                defaultValue={MULTILINE_TEXT}
              />
            </Sample>
            <Sample label="Before + After">
              <Textarea
                {...sharedProps}
                after={<InfoIcon />}
                before={<SearchIcon />}
                defaultValue={THREE_LINE_TEXT}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Disabled"
          description="Native disabled сохраняет выбранную surface и композитит весь visual root с alpha 52%."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Empty">
              <Textarea {...sharedProps} aria-label="Disabled empty textarea" disabled />
            </Sample>
            <Sample label="Placeholder">
              <Textarea {...sharedProps} disabled placeholder="Action is eloquence" />
            </Sample>
            <Sample label="Filled">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} disabled />
            </Sample>
            <Sample label="Error + disabled">
              <Textarea
                {...sharedProps}
                defaultValue={MULTILINE_TEXT}
                disabled
                status="error"
              />
            </Sample>
            <Sample label="Valid + disabled">
              <Textarea
                {...sharedProps}
                defaultValue={MULTILINE_TEXT}
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
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} />
            </Sample>
            <Sample className={styles.fluidWidth} label="Fluid · 100%">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Native behaviour"
          description="Editable, controlled, readOnly, maxLength и long scroll используют настоящий textarea."
        >
          <div className={styles.sampleGrid}>
            <Sample label="Editable · uncontrolled">
              <Textarea {...sharedProps} defaultValue="Edit this text" />
            </Sample>
            <Sample label="Controlled value">
              <Textarea
                {...sharedProps}
                onChange={(event) => setControlledValue(event.target.value)}
                value={controlledValue}
              />
            </Sample>
            <Sample label="Read only">
              <Textarea {...sharedProps} defaultValue={MULTILINE_TEXT} readOnly />
            </Sample>
            <Sample label="maxLength · 40">
              <Textarea
                {...sharedProps}
                defaultValue="Maximum forty characters"
                maxLength={40}
              />
            </Sample>
            <Sample label="Long scrollable · fixed">
              <Textarea {...sharedProps} defaultValue={LONG_TEXT} height="fixed" />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Android typography comparison"
          description="Production Input и Textarea используют одну Body typography implementation без Textarea-specific variable axes."
        >
          <div className={styles.androidCompare}>
            <Sample label="Input Android · Filled">
              <Input
                data-qa-android-input=""
                defaultValue="Action is eloquence"
                platform="android"
                theme={theme}
              />
            </Sample>
            <Sample label="Textarea Android · Filled">
              <Textarea
                data-qa-android-textarea=""
                defaultValue="Action is eloquence"
                platform="android"
                theme={theme}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          title="Form Fields context"
          description="Showcase-only Label / Textarea / Caption composition; production FormField не создаётся."
        >
          <div className={styles.formContext}>
            <label className={styles.fieldLabel} htmlFor="qa-textarea-field">
              Label
            </label>
            <Textarea
              {...sharedProps}
              id="qa-textarea-field"
              placeholder="Action is eloquence"
            />
            <span className={styles.caption}>Caption</span>
          </div>
        </QaSection>
      </main>
    </div>
  );
}

function MeasuredTextarea({
  label,
  ...textareaProps
}: TextareaProps & { label: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [renderedHeight, setRenderedHeight] = useState(0);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    const root = textarea?.closest<HTMLElement>('[data-vk-textarea-root]');
    if (root == null) return;

    const updateHeight = () => setRenderedHeight(root.getBoundingClientRect().height);
    updateHeight();

    if (typeof ResizeObserver === 'undefined') return;
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(root);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Sample label={`${label} · ${renderedHeight || '—'}px`}>
      <Textarea {...textareaProps} ref={textareaRef} />
    </Sample>
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
