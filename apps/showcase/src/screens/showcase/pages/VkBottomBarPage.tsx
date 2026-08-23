import { useState, type CSSProperties, type ReactNode } from 'react';

import {
  BottomBar,
  Button,
  type BottomBarAppearance,
} from '../../../../../../src/vk-commerce/components';
import { Icon, type IconNameForSize } from '../../../../../../src/vk-commerce/icons';
import {
  getSemanticColors,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkBottomBarPage.module.css';

const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

const TAB_ITEMS: ReadonlyArray<{
  label: string;
  icon: IconNameForSize<28>;
}> = [
  { label: 'Home', icon: 'home' },
  { label: 'Search', icon: 'search_filled' },
  { label: 'Messages', icon: 'bubble_text' },
  { label: 'Music', icon: 'music' },
  { label: 'Menu', icon: 'menu' },
];

const PLATFORM_CASES: ReadonlyArray<{
  label: string;
  platform: PlatformMode;
  theme: ThemeMode;
  appearance: BottomBarAppearance;
}> = [
  {
    label: 'iOS Light · Default',
    platform: 'ios',
    theme: 'light',
    appearance: 'default',
  },
  {
    label: 'iOS Dark · Default',
    platform: 'ios',
    theme: 'dark',
    appearance: 'default',
  },
  {
    label: 'iOS Light · Overlay',
    platform: 'ios',
    theme: 'light',
    appearance: 'overlay',
  },
  {
    label: 'Android Light · Default',
    platform: 'android',
    theme: 'light',
    appearance: 'default',
  },
];

interface PageCssProperties extends CSSProperties {
  '--bottom-bar-qa-page-background': string;
  '--bottom-bar-qa-surface': string;
  '--bottom-bar-qa-surface-secondary': string;
  '--bottom-bar-qa-text-primary': string;
  '--bottom-bar-qa-text-secondary': string;
  '--bottom-bar-qa-separator': string;
  '--bottom-bar-qa-overlay-secondary': string;
  '--bottom-bar-qa-contrast-text': string;
  '--bottom-bar-qa-spacing-4xl': string;
}

interface TabBarCssProperties extends CSSProperties {
  '--qa-tab-active-color': string;
  '--qa-tab-inactive-color': string;
  '--qa-tab-focus-color': string;
}

interface StageCssProperties extends CSSProperties {
  '--qa-stage-text-primary': string;
  '--qa-stage-surface-secondary': string;
  '--qa-stage-separator': string;
  '--qa-stage-contrast-text': string;
  '--qa-stage-overlay-primary': string;
  '--qa-stage-accent-blue': string;
  '--qa-stage-accent-purple': string;
}

export function VkBottomBarPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const colors = getSemanticColors(theme);
  const style: PageCssProperties = {
    '--bottom-bar-qa-page-background': colors.background.tertiary,
    '--bottom-bar-qa-surface': colors.background.modal,
    '--bottom-bar-qa-surface-secondary': colors.background.secondary,
    '--bottom-bar-qa-text-primary': colors.text.primary,
    '--bottom-bar-qa-text-secondary': colors.text.secondary,
    '--bottom-bar-qa-separator': colors.separator.primaryAlpha,
    '--bottom-bar-qa-overlay-secondary': colors.other.overlaySecondary,
    '--bottom-bar-qa-contrast-text': colors.text.contrast,
    '--bottom-bar-qa-spacing-4xl': `${spacing.size4xl}px`,
  };

  return (
    <div className={styles.page} data-vk-theme={theme} style={style}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>VK Components</p>
          <h1 className={styles.title}>Bottom Bar visual QA</h1>
          <p className={styles.subtitle}>
            Composition shell: progressive background, regions и keyboard layout.
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
          description="Exact Default и Overlay progressive surfaces с production Button и showcase-local Tab Bar."
          title="Appearance"
        >
          <div className={styles.twoColumnGrid}>
            <Sample label="Default">
              <BarStage
                actions
                homeIndicator
                platform={platform}
                tabBar
                theme={theme}
              />
            </Sample>
            <Sample label="Overlay">
              <BarStage
                actions
                appearance="overlay"
                homeIndicator
                platform={platform}
                tabBar
                theme={theme}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          description="BottomBar управляет только region wrappers; содержимое остаётся consumer-owned."
          title="Composition"
        >
          <div className={styles.twoColumnGrid}>
            <Sample label="Actions only">
              <BarStage actions platform={platform} theme={theme} />
            </Sample>
            <Sample label="Tab Bar only">
              <BarStage platform={platform} tabBar theme={theme} />
            </Sample>
            <Sample label="Actions + Tab Bar">
              <BarStage actions platform={platform} tabBar theme={theme} />
            </Sample>
            <Sample label="Actions + Bottom Slot + Tab Bar">
              <BarStage
                actions
                bottomSlot
                platform={platform}
                tabBar
                theme={theme}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          description="Snackbar — local placeholder; Home Indicator включён только явно для source QA."
          title="Optional regions"
        >
          <div className={styles.twoColumnGrid}>
            <Sample label="Snackbar wrapper">
              <BarStage
                actions
                platform={platform}
                snackbar
                theme={theme}
              />
            </Sample>
            <Sample label="Home Indicator · explicit iOS only">
              <BarStage
                actions
                homeIndicator
                platform="ios"
                tabBar
                theme={theme}
              />
            </Sample>
            <Sample label="Progressive layer · on">
              <BarStage actions platform={platform} theme={theme} />
            </Sample>
            <Sample label="Progressive layer · off">
              <BarStage actions blur={false} platform={platform} theme={theme} />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          description="Keyboard mode скрывает Snackbar, Tab Bar и Home Indicator; OS keyboard остаётся вне production component."
          title="Keyboard state"
        >
          <div className={styles.twoColumnGrid}>
            <Sample label="Keyboard hidden">
              <BarStage
                actions
                homeIndicator
                platform="ios"
                snackbar
                tabBar
                theme={theme}
              />
            </Sample>
            <Sample label="Keyboard visible shell">
              <BarStage
                actions
                bottomSlot
                keyboardBoundary
                keyboardVisible
                platform="ios"
                snackbar
                tabBar
                theme={theme}
              />
            </Sample>
          </div>
        </QaSection>

        <QaSection
          description="Production width = 100%; 393px остаётся только reference QA case."
          title="Responsive width"
        >
          <div className={styles.widthStack}>
            <SizedSample label="Narrow · 320px" widthClassName={styles.width320}>
              <BarStage actions platform={platform} tabBar theme={theme} />
            </SizedSample>
            <SizedSample label="Reference · 393px" widthClassName={styles.width393}>
              <BarStage actions platform={platform} tabBar theme={theme} />
            </SizedSample>
            <SizedSample label="Fluid · 100%" widthClassName={styles.widthFluid}>
              <BarStage actions platform={platform} tabBar theme={theme} />
            </SizedSample>
          </div>
        </QaSection>

        <QaSection
          description="Проверка требуемых theme/platform combinations без platform-specific geometry."
          title="Theme and platform"
        >
          <div className={styles.twoColumnGrid}>
            {PLATFORM_CASES.map((platformCase) => (
              <Sample key={platformCase.label} label={platformCase.label}>
                <BarStage
                  actions
                  appearance={platformCase.appearance}
                  homeIndicator
                  platform={platformCase.platform}
                  tabBar
                  theme={platformCase.theme}
                />
              </Sample>
            ))}
          </div>
        </QaSection>
      </main>
    </div>
  );
}

interface BarStageProps {
  appearance?: BottomBarAppearance;
  actions?: boolean;
  bottomSlot?: boolean;
  tabBar?: boolean;
  snackbar?: boolean;
  keyboardVisible?: boolean;
  keyboardBoundary?: boolean;
  blur?: boolean;
  homeIndicator?: boolean;
  platform: PlatformMode;
  theme: ThemeMode;
}

function BarStage({
  appearance = 'default',
  actions = false,
  bottomSlot = false,
  tabBar = false,
  snackbar = false,
  keyboardVisible = false,
  keyboardBoundary = false,
  blur = true,
  homeIndicator = false,
  platform,
  theme,
}: BarStageProps) {
  const colors = getSemanticColors(theme);
  const stageStyle: StageCssProperties = {
    '--qa-stage-text-primary': colors.text.primary,
    '--qa-stage-surface-secondary': colors.background.secondary,
    '--qa-stage-separator': colors.separator.primaryAlpha,
    '--qa-stage-contrast-text': colors.text.contrast,
    '--qa-stage-overlay-primary': colors.other.overlayPrimary,
    '--qa-stage-accent-blue': colors.palette.accentBlue,
    '--qa-stage-accent-purple': colors.palette.accentPurple,
  };
  const stage = (
    <div
      className={styles.stage}
      data-stage-appearance={appearance}
      data-stage-theme={theme}
      style={stageStyle}
    >
      <BackdropContent />
      <div className={styles.barAnchor}>
        <BottomBar
          actions={
            actions ? (
              <Button
                appearance="neutral"
                mode="primary"
                platform={platform}
                size="large"
                theme={theme}
                width="filled"
              >
                Button
              </Button>
            ) : undefined
          }
          appearance={appearance}
          blur={blur}
          bottomSlot={bottomSlot ? <DemoBottomSlot /> : undefined}
          homeIndicator={homeIndicator}
          keyboardVisible={keyboardVisible}
          platform={platform}
          snackbar={snackbar ? <DemoSnackbar /> : undefined}
          tabBar={
            tabBar ? (
              <QaTabBar appearance={appearance} theme={theme} />
            ) : undefined
          }
          theme={theme}
        />
      </div>
    </div>
  );

  if (!keyboardBoundary) {
    return stage;
  }

  return (
    <div className={styles.keyboardComposition}>
      {stage}
      <div className={styles.keyboardBoundary}>
        System keyboard boundary · showcase only
      </div>
    </div>
  );
}

function BackdropContent() {
  return (
    <div aria-hidden="true" className={styles.backdropContent}>
      <span className={styles.backdropHeadline} />
      <span className={styles.backdropLine} />
      <span className={styles.backdropLineShort} />
      <span className={styles.backdropCard} />
    </div>
  );
}

function DemoBottomSlot() {
  return <div className={styles.bottomSlotDemo}>Bottom slot · 48px</div>;
}

function DemoSnackbar() {
  return (
    <div className={styles.snackbarDemo}>
      <strong>Snackbar slot</strong>
      <span>Showcase-local placeholder</span>
    </div>
  );
}

function QaTabBar({
  appearance,
  theme,
}: {
  appearance: BottomBarAppearance;
  theme: ThemeMode;
}) {
  const [activeItem, setActiveItem] = useState('Home');
  const colors = getSemanticColors(theme);
  const style: TabBarCssProperties = {
    '--qa-tab-active-color':
      appearance === 'overlay' ? colors.icon.contrast : colors.icon.primary,
    '--qa-tab-inactive-color':
      appearance === 'overlay'
        ? colors.icon.contrastSecondaryAlpha
        : colors.icon.tertiaryAlpha,
    '--qa-tab-focus-color': colors.stroke.accent,
  };

  return (
    <div aria-label="Showcase Tab Bar" className={styles.tabBar} style={style}>
      {TAB_ITEMS.map((item) => {
        const active = activeItem === item.label;

        return (
          <button
            aria-label={item.label}
            aria-pressed={active}
            className={styles.tabItem}
            data-active={active}
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            type="button"
          >
            <Icon name={item.icon} size={28} />
          </button>
        );
      })}
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

function Sample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.sample}>
      <span className={styles.sampleLabel}>{label}</span>
      {children}
    </div>
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
    <div className={styles.sizedSample}>
      <span className={styles.sampleLabel}>{label}</span>
      <div className={widthClassName}>{children}</div>
    </div>
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
      className={styles.controlButton}
      data-active={active}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
