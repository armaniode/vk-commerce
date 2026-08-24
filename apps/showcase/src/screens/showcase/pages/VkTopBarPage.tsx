import { useState, type CSSProperties, type ReactNode } from 'react';

import {
  TopBar,
  type TopBarActions,
  type TopBarAppearance,
} from '../../../../../../src/vk-commerce/components';
import { Icon } from '../../../../../../src/vk-commerce/icons';
import {
  getPlatformTokens,
  getSemanticColors,
  spacing,
  type PlatformMode,
  type ThemeMode,
} from '../../../../../../src/vk-commerce/tokens';

import styles from './VkTopBarPage.module.css';

const PLATFORM_OPTIONS: ReadonlyArray<{ value: PlatformMode; label: string }> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

interface PageCssProperties extends CSSProperties {
  '--qa-page-background': string;
  '--qa-page-surface': string;
  '--qa-page-text-primary': string;
  '--qa-page-text-secondary': string;
  '--qa-page-separator': string;
  '--qa-page-spacing': string;
}

interface StageCssProperties extends CSSProperties {
  '--qa-stage-background': string;
  '--qa-stage-secondary': string;
  '--qa-stage-text-primary': string;
  '--qa-stage-text-secondary': string;
  '--qa-stage-contrast': string;
  '--qa-stage-separator': string;
  '--qa-stage-accent': string;
  '--qa-stage-purple': string;
  '--qa-stage-font-family': string;
  '--qa-stage-focus': string;
}

export function VkTopBarPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const colors = getSemanticColors(theme);
  const style: PageCssProperties = {
    '--qa-page-background': colors.background.tertiary,
    '--qa-page-surface': colors.background.modal,
    '--qa-page-text-primary': colors.text.primary,
    '--qa-page-text-secondary': colors.text.secondary,
    '--qa-page-separator': colors.separator.primaryAlpha,
    '--qa-page-spacing': `${spacing.size4xl}px`,
  };

  return (
    <div className={styles.page} style={style}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>VK Components</p>
          <h1 className={styles.pageTitle}>Top Bar visual QA</h1>
          <p className={styles.subtitle}>
            Progressive top background и consumer-owned header regions.
          </p>
        </div>
        <div className={styles.controls}>
          <Control label="Theme">
            <ControlButton active={theme === 'light'} onClick={() => setTheme('light')}>Light</ControlButton>
            <ControlButton active={theme === 'dark'} onClick={() => setTheme('dark')}>Dark</ControlButton>
          </Control>
          <Control label="Platform">
            {PLATFORM_OPTIONS.map((option) => (
              <ControlButton
                active={platform === option.value}
                key={option.value}
                onClick={() => setPlatform(option.value)}
              >
                {option.label}
              </ControlButton>
            ))}
          </Control>
        </div>
      </header>

      <main className={styles.content}>
        <Section title="Appearance" description="Default, Overlay и reduced-opacity No Blur Overlay.">
          <div className={styles.grid}>
            <Sample label="Default"><Stage platform={platform} theme={theme} /></Sample>
            <Sample label="Overlay"><Stage appearance="overlay" platform={platform} theme={theme} /></Sample>
            <Sample label="No Blur Overlay"><Stage appearance="no-blur-overlay" platform={platform} theme={theme} /></Sample>
          </div>
        </Section>

        <Section title="Header content" description="Title, Before, 1–4 actions, titleAfter и custom Middle.">
          <div className={styles.grid}>
            <Sample label="Title only"><Stage actionCount={0} platform={platform} theme={theme} /></Sample>
            <Sample label="Before + title"><Stage before actionCount={0} platform={platform} theme={theme} /></Sample>
            <Sample label="1 action"><Stage actionCount={1} platform={platform} theme={theme} /></Sample>
            <Sample label="2 actions"><Stage actionCount={2} platform={platform} theme={theme} /></Sample>
            <Sample label="4 actions"><Stage actionCount={4} platform={platform} theme={theme} /></Sample>
            <Sample label="titleAfter"><Stage actionCount={0} platform={platform} theme={theme} titleAfter /></Sample>
            <Sample label="Custom Middle"><Stage actionCount={0} customMiddle platform={platform} theme={theme} /></Sample>
          </div>
        </Section>

        <Section title="Bottom Slot" description="Source padding, content-driven height.">
          <Sample label="Header + Bottom Slot"><Stage bottomSlot platform={platform} theme={theme} /></Sample>
        </Section>

        <Section title="Tabs slot" description="Showcase-local tabs after the source 2px spacing.">
          <Sample label="Header + Tabs"><Stage platform={platform} tabs theme={theme} /></Sample>
        </Section>

        <Section title="Gradient" description="Disabling the layer does not change Header geometry.">
          <div className={styles.grid}>
            <Sample label="On"><Stage platform={platform} theme={theme} /></Sample>
            <Sample label="Off"><Stage gradient={false} platform={platform} theme={theme} /></Sample>
          </div>
        </Section>

        <Section title="Status Bar" description="Explicit showcase/system-chrome reference only; production default is empty.">
          <Sample label="Explicit slot"><Stage platform="ios" statusBar theme={theme} /></Sample>
        </Section>

        <Section title="Responsive" description="Production width is 100%; 393px is reference-only.">
          <div className={styles.widthStack}>
            <SizedSample label="Narrow · 320px" className={styles.width320}><Stage actionCount={2} platform={platform} theme={theme} /></SizedSample>
            <SizedSample label="Reference · 393px" className={styles.width393}><Stage actionCount={2} platform={platform} theme={theme} /></SizedSample>
            <SizedSample label="Fluid · 100%" className={styles.widthFluid}><Stage actionCount={2} platform={platform} theme={theme} /></SizedSample>
          </div>
        </Section>

        <Section title="Theme and platform" description="Required combinations with shared foundation mechanics.">
          <div className={styles.grid}>
            <Sample label="iOS Light · Default"><Stage before actionCount={2} platform="ios" theme="light" /></Sample>
            <Sample label="iOS Dark · Default"><Stage before actionCount={2} platform="ios" theme="dark" /></Sample>
            <Sample label="iOS Light · Overlay"><Stage appearance="overlay" before actionCount={2} platform="ios" theme="light" /></Sample>
            <Sample label="Android Light · Default"><Stage before actionCount={2} platform="android" theme="light" /></Sample>
          </div>
        </Section>
      </main>
    </div>
  );
}

interface StageProps {
  appearance?: TopBarAppearance;
  before?: boolean;
  actionCount?: 0 | 1 | 2 | 4;
  titleAfter?: boolean;
  customMiddle?: boolean;
  bottomSlot?: boolean;
  tabs?: boolean;
  statusBar?: boolean;
  gradient?: boolean;
  platform: PlatformMode;
  theme: ThemeMode;
}

function Stage({
  appearance = 'default', before = false, actionCount = 1,
  titleAfter = false, customMiddle = false, bottomSlot = false,
  tabs = false, statusBar = false, gradient = true, platform, theme,
}: StageProps) {
  const colors = getSemanticColors(theme);
  const config = getPlatformTokens(platform);
  const fontFamily = platform === 'ios'
    ? '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
    : `"${config.typography.family.base}", Roboto, Arial, sans-serif`;
  const style: StageCssProperties = {
    '--qa-stage-background': colors.background.modal,
    '--qa-stage-secondary': colors.background.secondary,
    '--qa-stage-text-primary': colors.text.primary,
    '--qa-stage-text-secondary': colors.text.secondary,
    '--qa-stage-contrast': colors.text.contrast,
    '--qa-stage-separator': colors.separator.primaryAlpha,
    '--qa-stage-accent': colors.palette.accentBlue,
    '--qa-stage-purple': colors.palette.accentPurple,
    '--qa-stage-font-family': fontFamily,
    '--qa-stage-focus': colors.stroke.accent,
  };

  return (
    <div className={styles.stage} data-appearance={appearance} style={style}>
      <StageContent />
      <div className={styles.anchor}>
        <TopBar
          actions={getActions(actionCount)}
          appearance={appearance}
          before={before ? <IconButton icon="arrow_left" label="Back" /> : undefined}
          bottomSlot={bottomSlot ? <div className={styles.bottomSlot}>Bottom Slot</div> : undefined}
          gradient={gradient}
          middle={customMiddle ? <CustomMiddle /> : undefined}
          platform={platform}
          statusBar={statusBar ? <StatusBarReference /> : undefined}
          tabs={tabs ? <Tabs appearance={appearance} theme={theme} /> : undefined}
          theme={theme}
          title="Title"
          titleAfter={titleAfter ? <Icon name="chevron_down" size={24} /> : undefined}
        />
      </div>
    </div>
  );
}

function getActions(count: 0 | 1 | 2 | 4): TopBarActions | undefined {
  const search = <IconButton icon="search" label="Search" />;
  const bell = <IconButton icon="bell_outline" label="Notifications" />;
  const gear = <IconButton icon="gear_outline" label="Settings" />;
  const more = <IconButton icon="more_horizontal" label="More" />;
  if (count === 1) return [search];
  if (count === 2) return [bell, search];
  if (count === 4) return [more, gear, bell, search];
  return undefined;
}

type ActionIcon = 'arrow_left' | 'search' | 'bell_outline' | 'gear_outline' | 'more_horizontal';

function IconButton({ icon, label }: { icon: ActionIcon; label: string }) {
  return <button aria-label={label} className={styles.iconButton} type="button"><Icon name={icon} size={28} /></button>;
}

function CustomMiddle() {
  return <div className={styles.customMiddle}><span className={styles.avatar}>VK</span><span><strong>Custom middle</strong><small>Consumer-owned</small></span></div>;
}

function Tabs({ appearance, theme }: { appearance: TopBarAppearance; theme: ThemeMode }) {
  const [active, setActive] = useState('Overview');
  const colors = getSemanticColors(theme);
  const contrast = appearance !== 'default';
  const style = {
    '--qa-tabs-active': contrast ? colors.text.contrast : colors.text.primary,
    '--qa-tabs-inactive': contrast ? colors.text.contrastSecondaryAlpha : colors.text.tertiaryAlpha,
    '--qa-tabs-focus': colors.stroke.accent,
  } as CSSProperties;
  return <div className={styles.tabs}>{['Overview', 'Media', 'Products'].map((label) => <button aria-pressed={active === label} data-active={active === label} key={label} onClick={() => setActive(label)} style={style} type="button">{label}</button>)}</div>;
}

function StatusBarReference() {
  return <div className={styles.statusBar}><strong>4:19</strong><span>Cellular · Wi‑Fi · Battery</span></div>;
}

function StageContent() {
  return <div aria-hidden="true" className={styles.stageContent}><span /><span /><span /><i /></div>;
}

function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className={styles.section}><div><h2>{title}</h2><p>{description}</p></div>{children}</section>;
}

function Sample({ label, children }: { label: string; children: ReactNode }) {
  return <div className={styles.sample}><span className={styles.sampleLabel}>{label}</span>{children}</div>;
}

function SizedSample({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  return <div className={styles.sample}><span className={styles.sampleLabel}>{label}</span><div className={className}>{children}</div></div>;
}

function Control({ label, children }: { label: string; children: ReactNode }) {
  return <fieldset className={styles.control}><legend>{label}</legend><div>{children}</div></fieldset>;
}

function ControlButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button data-active={active} onClick={onClick} type="button">{children}</button>;
}
