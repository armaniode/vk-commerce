import { useState, type CSSProperties, type ReactNode } from 'react';

import calendarIconUrl from '../../../../../../src/vk-commerce/components/date-picker/assets/calendar-outline-24.svg';
import clearIconUrl from '../../../../../../src/vk-commerce/components/date-picker/assets/clear-16.svg';
import chevronIconUrl from '../../../../../../src/vk-commerce/components/select/assets/chevron-down-20.svg';
import {
  SegmentedControl,
  type SegmentedControlItems,
} from '../../../../../../src/vk-commerce/components';
import type {
  PlatformMode,
  ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkSegmentedControlPage.module.css';

const TWO_ITEMS = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
] as const satisfies SegmentedControlItems;

const THREE_ITEMS = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
] as const satisfies SegmentedControlItems;

const FOUR_ITEMS = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
  { value: 'fourth', label: 'Fourth' },
] as const satisfies SegmentedControlItems;

const FIVE_ITEMS = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
  { value: 'fourth', label: 'Fourth' },
  { value: 'fifth', label: 'Fifth' },
] as const satisfies SegmentedControlItems;

const ICON_AND_LABEL_ITEMS = [
  {
    value: 'calendar',
    label: 'Calendar',
    icon: <DemoIcon src={calendarIconUrl} />,
  },
  {
    value: 'options',
    label: 'Options',
    icon: <DemoIcon src={chevronIconUrl} />,
  },
] as const satisfies SegmentedControlItems;

const ICON_ONLY_ITEMS = [
  {
    value: 'calendar',
    icon: <DemoIcon src={calendarIconUrl} />,
    ariaLabel: 'Calendar',
  },
  {
    value: 'clear',
    icon: <DemoIcon src={clearIconUrl} />,
    ariaLabel: 'Clear',
  },
] as const satisfies SegmentedControlItems;

const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

const PLATFORM_CASES: ReadonlyArray<{
  label: string;
  platform: PlatformMode;
  theme: ThemeMode;
}> = [
  { label: 'iOS Light', platform: 'ios', theme: 'light' },
  { label: 'iOS Dark', platform: 'ios', theme: 'dark' },
  { label: 'Android Light', platform: 'android', theme: 'light' },
  { label: 'Desktop Light', platform: 'desktop', theme: 'light' },
  { label: 'vkCom Light', platform: 'vkcom', theme: 'light' },
];

export function VkSegmentedControlPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');

  return (
    <div className={styles.page} data-vk-theme={theme}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components</p>
          <h1 className={styles.title}>Segmented Control visual QA</h1>
          <p className={styles.subtitle}>
            Проверка количества items, active position, content и responsive width.
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
                active={platform === option.value}
                key={option.value}
                label={option.label}
                onClick={() => setPlatform(option.value)}
              />
            ))}
          </ControlGroup>
        </div>
      </header>

      <main className={styles.content}>
        <QaSection
          description="Подтверждены только 2–5 равных сегментов. Каждый пример интерактивен."
          title="Count"
        >
          <div className={styles.stack}>
            <InteractiveSample
              items={TWO_ITEMS}
              label="2 tabs"
              platform={platform}
              theme={theme}
            />
            <InteractiveSample
              items={THREE_ITEMS}
              label="3 tabs"
              platform={platform}
              theme={theme}
            />
            <InteractiveSample
              items={FOUR_ITEMS}
              label="4 tabs"
              platform={platform}
              theme={theme}
            />
            <InteractiveSample
              items={FIVE_ITEMS}
              label="5 tabs"
              platform={platform}
              theme={theme}
            />
          </div>
        </QaSection>

        <QaSection
          description="Active state не связан с первым item."
          title="Selected"
        >
          <div className={styles.sampleGrid}>
            <InteractiveSample
              initialValue="first"
              items={THREE_ITEMS}
              label="First active"
              platform={platform}
              theme={theme}
            />
            <InteractiveSample
              initialValue="second"
              items={THREE_ITEMS}
              label="Middle active"
              platform={platform}
              theme={theme}
            />
            <InteractiveSample
              initialValue="third"
              items={THREE_ITEMS}
              label="Last active"
              platform={platform}
              theme={theme}
            />
          </div>
        </QaSection>

        <QaSection
          description="Icon slots используют только существующие локальные assets."
          title="Content"
        >
          <div className={styles.sampleGrid}>
            <InteractiveSample
              items={TWO_ITEMS}
              label="Label only"
              platform={platform}
              theme={theme}
            />
            <InteractiveSample
              items={ICON_AND_LABEL_ITEMS}
              label="Icon + label"
              platform={platform}
              theme={theme}
            />
            <InteractiveSample
              items={ICON_ONLY_ITEMS}
              label="Icon only"
              platform={platform}
              theme={theme}
            />
          </div>
        </QaSection>

        <QaSection
          description="Production width всегда 100% родителя; 375px — только reference case."
          title="Width"
        >
          <div className={styles.widthSamples}>
            <SizedSample label="Narrow · 220px" widthClassName={styles.narrow}>
              <InteractiveControl
                items={THREE_ITEMS}
                platform={platform}
                theme={theme}
              />
            </SizedSample>
            <SizedSample
              label="Reference · 375px"
              widthClassName={styles.reference}
            >
              <InteractiveControl
                items={THREE_ITEMS}
                platform={platform}
                theme={theme}
              />
            </SizedSample>
            <SizedSample label="Full responsive" widthClassName={styles.fluid}>
              <div className={styles.sourceView}>
                <InteractiveControl
                  items={THREE_ITEMS}
                  platform={platform}
                  theme={theme}
                />
              </div>
            </SizedSample>
          </div>
        </QaSection>

        <QaSection
          description="Geometry одинакова; меняются semantic colors и platform typography."
          title="Theme and platform"
        >
          <div className={styles.platformGrid}>
            {PLATFORM_CASES.map((platformCase) => (
              <div
                className={styles.platformSample}
                data-sample-theme={platformCase.theme}
                key={platformCase.label}
              >
                <span className={styles.sampleLabel}>{platformCase.label}</span>
                <InteractiveControl
                  items={THREE_ITEMS}
                  platform={platformCase.platform}
                  theme={platformCase.theme}
                />
              </div>
            ))}
          </div>
        </QaSection>
      </main>
    </div>
  );
}

function InteractiveSample({
  items,
  label,
  initialValue,
  platform,
  theme,
}: {
  items: SegmentedControlItems;
  label: string;
  initialValue?: string;
  platform: PlatformMode;
  theme: ThemeMode;
}) {
  return (
    <div className={styles.sample}>
      <span className={styles.sampleLabel}>{label}</span>
      <InteractiveControl
        initialValue={initialValue}
        items={items}
        platform={platform}
        theme={theme}
      />
    </div>
  );
}

function InteractiveControl({
  items,
  initialValue,
  platform,
  theme,
}: {
  items: SegmentedControlItems;
  initialValue?: string;
  platform: PlatformMode;
  theme: ThemeMode;
}) {
  const [value, setValue] = useState(initialValue ?? items[0].value);

  return (
    <SegmentedControl
      ariaLabel="Visual QA segmented control"
      items={items}
      onChange={setValue}
      platform={platform}
      theme={theme}
      value={value}
    />
  );
}

function SizedSample({
  label,
  widthClassName,
  children,
}: {
  label: string;
  widthClassName: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.sample}>
      <span className={styles.sampleLabel}>{label}</span>
      <div className={widthClassName}>{children}</div>
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

function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className={styles.controlGroup}>
      <legend className={styles.controlLabel}>{label}</legend>
      <div className={styles.qaControl}>{children}</div>
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

interface DemoIconCssProperties extends CSSProperties {
  '--demo-icon-url': string;
}

function DemoIcon({ src }: { src: string }) {
  const style: DemoIconCssProperties = {
    '--demo-icon-url': `url("${src}")`,
  };

  return <span className={styles.demoIcon} style={style} />;
}
