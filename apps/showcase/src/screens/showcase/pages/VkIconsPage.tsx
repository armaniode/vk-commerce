import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';

import {
  Icon,
  availableIconSources,
  getPlatformTokens,
  getSemanticColors,
  iconSizes,
  type AvailableIconSource,
  type IconNameForSize,
  type IconSize,
  type PlatformMode,
  type ThemeMode,
} from '../../../../../../src/vk-commerce';

import styles from './VkIconsPage.module.css';

const PLATFORM_OPTIONS: ReadonlyArray<{
  value: PlatformMode;
  label: string;
}> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'vkcom', label: 'vkCom' },
];

const SIZE_SAMPLES: readonly AvailableIconSource[] = [
  { name: 'heart_outline', size: 12 },
  { name: 'plus_outline', size: 16 },
  { name: 'search_outline', size: 20 },
  { name: 'heart_outline', size: 24 },
  { name: 'heart_outline', size: 28 },
  { name: 'heart_outline', size: 32 },
  { name: 'gear_outline', size: 36 },
  { name: 'check_circle_outline', size: 48 },
];

const ICON_PAIRS: ReadonlyArray<{
  fill: IconNameForSize<28>;
  outline: IconNameForSize<28>;
}> = [
  { fill: 'heart', outline: 'heart_outline' },
  { fill: 'bookmark', outline: 'bookmark_outline' },
  { fill: 'user', outline: 'user_outline' },
  { fill: 'user_circle', outline: 'user_circle_outline' },
  { fill: 'users_2', outline: 'users_2_outline' },
  { fill: 'users_3', outline: 'users_3_outline' },
  { fill: 'plus', outline: 'plus_outline' },
  { fill: 'gear', outline: 'gear_outline' },
  { fill: 'phone', outline: 'phone_outline' },
  { fill: 'copy', outline: 'copy_outline' },
  { fill: 'music', outline: 'music_outline' },
  { fill: 'bell', outline: 'bell_outline' },
];

interface PageCssProperties extends CSSProperties {
  '--icons-background': string;
  '--icons-surface': string;
  '--icons-surface-secondary': string;
  '--icons-text-primary': string;
  '--icons-text-secondary': string;
  '--icons-icon-primary': string;
  '--icons-icon-secondary': string;
  '--icons-accent': string;
  '--icons-positive': string;
  '--icons-negative': string;
  '--icons-separator': string;
  '--icons-font-family': string;
}

const IOS_FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';

type IconStyleFilter = 'all' | 'outline' | 'fill';
type IconSizeFilter = 'all' | IconSize;

export function VkIconsPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const [search, setSearch] = useState('');
  const [sizeFilter, setSizeFilter] = useState<IconSizeFilter>('all');
  const [styleFilter, setStyleFilter] = useState<IconStyleFilter>('all');
  const colors = getSemanticColors(theme);
  const platformConfig = getPlatformTokens(platform);
  const fontFamily =
    platform === 'ios'
      ? IOS_FONT_FAMILY
      : platform === 'android'
        ? `"${platformConfig.typography.family.base}", Roboto, Arial, sans-serif`
        : platformConfig.typography.family.base;
  const style: PageCssProperties = {
    '--icons-background': colors.background.tertiary,
    '--icons-surface': colors.background.contrastThemed,
    '--icons-surface-secondary': colors.background.secondary,
    '--icons-text-primary': colors.text.primary,
    '--icons-text-secondary': colors.text.secondary,
    '--icons-icon-primary': colors.icon.primary,
    '--icons-icon-secondary': colors.icon.secondary,
    '--icons-accent': colors.icon.accent,
    '--icons-positive': colors.icon.positive,
    '--icons-negative': colors.icon.negative,
    '--icons-separator': colors.separator.primary,
    '--icons-font-family': fontFamily,
  };
  const filteredIconSources = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();

    return availableIconSources.filter((source) => {
      const isOutline = source.name.includes('_outline');
      const matchesSearch =
        normalizedSearch.length === 0 ||
        source.name.toLocaleLowerCase().includes(normalizedSearch);
      const matchesSize = sizeFilter === 'all' || source.size === sizeFilter;
      const matchesStyle =
        styleFilter === 'all' ||
        (styleFilter === 'outline' ? isOutline : !isOutline);

      return matchesSearch && matchesSize && matchesStyle;
    });
  }, [search, sizeFilter, styleFilter]);

  return (
    <div className={styles.page} data-theme={theme} style={style}>
      <header className={styles.header}>
        <div>
          <a className={styles.backLink} href="#/">
            Foundations
          </a>
          <h1>Icons visual QA</h1>
          <p>
            Exact source assets, source-specific sizes, outline/fill and inline
            typography alignment.
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
          description="Every tile is a registered production name + exact source size."
          title={`Imported gallery · ${filteredIconSources.length} / ${availableIconSources.length}`}
        >
          <div className={styles.catalogueTools}>
            <label className={styles.searchField}>
              <span>Search</span>
              <input
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Icon name"
                type="search"
                value={search}
              />
            </label>

            <ControlGroup label="Source size">
              <ControlButton
                active={sizeFilter === 'all'}
                label="All"
                onClick={() => setSizeFilter('all')}
              />
              {iconSizes.map((size) => (
                <ControlButton
                  active={sizeFilter === size}
                  key={size}
                  label={`${size}`}
                  onClick={() => setSizeFilter(size)}
                />
              ))}
            </ControlGroup>

            <ControlGroup label="Style">
              {(['all', 'outline', 'fill'] as const).map((option) => (
                <ControlButton
                  active={styleFilter === option}
                  key={option}
                  label={option === 'all' ? 'All' : option === 'outline' ? 'Outline' : 'Fill'}
                  onClick={() => setStyleFilter(option)}
                />
              ))}
            </ControlGroup>
          </div>

          <div className={styles.gallery}>
            {filteredIconSources.map((source) => (
              <div
                className={styles.galleryItem}
                key={`${source.size}-${source.name}`}
              >
                <Icon {...source} />
                <code>{source.name}</code>
                <span className={styles.sourceSize}>
                  {source.size}px source
                </span>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          description="Only real source files are shown; no size is synthesized."
          title="Size QA"
        >
          <div className={styles.sizeScale}>
            {SIZE_SAMPLES.map((sample) => (
              <div className={styles.sizeItem} key={sample.size}>
                <div className={styles.sizeCanvas}>
                  <Icon {...sample} />
                </div>
                <strong>{sample.size}px</strong>
                <code>{sample.name}</code>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          description="Published 28px pairs shown side by side."
          title="Outline vs fill"
        >
          <div className={styles.pairGrid}>
            {ICON_PAIRS.map((pair) => (
              <div className={styles.pair} key={pair.fill}>
                <div>
                  <Icon name={pair.outline} size={28} />
                  <code>{pair.outline}</code>
                </div>
                <div>
                  <Icon name={pair.fill} size={28} />
                  <code>{pair.fill}</code>
                </div>
              </div>
            ))}
          </div>
        </QaSection>

        <QaSection
          description={`Text uses the selected ${platform} platform font; glyph geometry stays unchanged.`}
          title="Typography alignment"
        >
          <div className={styles.typographySamples}>
            <p className={styles.textSmall}>
              <Icon name="plus_outline" size={16} /> Add item
            </p>
            <p className={styles.textBody}>
              <Icon name="search_outline" size={20} /> Search communities
            </p>
            <p className={styles.textTitle}>
              <Icon name="heart_outline" size={24} /> Saved stories
            </p>
          </div>
        </QaSection>

        <QaSection
          description="The same unchanged SVG mask inherits semantic parent color."
          title="currentColor"
        >
          <div className={styles.colorSamples}>
            <ColorSample className={styles.primary} label="Primary" />
            <ColorSample className={styles.secondary} label="Secondary" />
            <ColorSample className={styles.accent} label="Accent" />
            <ColorSample className={styles.positive} label="Positive" />
            <ColorSample className={styles.negative} label="Negative" />
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
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function ControlGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className={styles.controlGroup}>
      <legend>{label}</legend>
      <div className={styles.controlButtons}>{children}</div>
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

function ColorSample({ className, label }: { className: string; label: string }) {
  return (
    <div className={`${styles.colorSample} ${className}`}>
      <Icon name="heart_outline" size={28} />
      <span>{label}</span>
    </div>
  );
}
