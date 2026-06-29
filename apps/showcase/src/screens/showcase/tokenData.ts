// Полный реестр цветовых токенов Carnica — источник: src/carnica/tokens/colors.ts
// Используется в showcase для рендера всех swatch без сокращений.
//
// Если у токена указан cssVar, страница «цвета» читает живое значение
// этой CSS-переменной из document.documentElement → свотч автоматически
// меняется при переключении data-theme. Если cssVar нет — токен константа,
// и hex показывается как есть.
//
// Порядок групп (важен для восприятия): background → elements → content →
// border → overlay → glass → constant → brand → error/success/link →
// surface → accent. Сначала «фоны и поверхности», потом «текст», потом
// «специальные слои», потом «константы и акценты».

export interface ColorToken {
  name: string;
  /** Fallback hex (показывается если cssVar не задан, либо при SSR/недоступности). */
  hex: string;
  /** Имя CSS-переменной в apps/showcase/src/index.css (например `--bee-content-primary`).
   *  Если задано — свотч читает живое значение и меняется по теме. */
  cssVar?: string;
  /** На каком фоне показывать токен, чтобы alpha-цвета были видны */
  preview?: 'light' | 'dark' | 'both';
}

export interface ColorGroup {
  title: string;
  hint?: string;
  tokens: ColorToken[];
  /** Подсветить, что эти токены — на тёмном фоне */
  background?: 'light' | 'dark';
}

export const colorGroups: ColorGroup[] = [
  // ── background ────────────────────────────────────────────
  {
    title: 'background',
    tokens: [
      { name: 'background/primary',      hex: '#F0F3F5', cssVar: '--bee-bg-primary' },
      { name: 'background/secondary',    hex: '#FFFFFF', cssVar: '--bee-bg-secondary' },
      { name: 'background/tertiary',     hex: '#F0F3F5', cssVar: '--bee-bg-tertiary' },
      { name: 'background/additional01', hex: '#FFFFFF', cssVar: '--bee-bg-additional01' },
      { name: 'background/additional02', hex: '#77849D1F', cssVar: '--bee-bg-additional02' },
      { name: 'background/overlay',      hex: '#191C22B2', cssVar: '--bee-bg-overlay' },
    ],
  },
  {
    title: 'background/fake-invert',
    background: 'dark',
    tokens: [
      { name: 'background/fake-invert/primary',    hex: '#181C23', cssVar: '--bee-bg-primary-fake-invert' },
      { name: 'background/fake-invert/secondary',  hex: '#202632', cssVar: '--bee-bg-secondary-fake-invert' },
      { name: 'background/fake-invert/tertiary',   hex: '#28303F', cssVar: '--bee-bg-tertiary-fake-invert' },
      { name: 'background/fake-invert/additional', hex: '#77849D1F', cssVar: '--bee-bg-additional-fake-invert' },
    ],
  },

  // ── elements ──────────────────────────────────────────────
  {
    title: 'elements',
    tokens: [
      { name: 'elements/primary',      hex: '#FFFFFF', cssVar: '--bee-el-primary' },
      { name: 'elements/secondary',    hex: '#F0F3F5', cssVar: '--bee-el-secondary' },
      { name: 'elements/tertiary',     hex: '#E2E6ED', cssVar: '--bee-el-tertiary' },
      { name: 'elements/disabled',     hex: '#E2E6ED', cssVar: '--bee-el-disabled' },
      { name: 'elements/additional01', hex: '#FFFFFF', cssVar: '--bee-el-additional01' },
      { name: 'elements/additional02', hex: '#77849D1F', cssVar: '--bee-el-additional02' },
      { name: 'elements/active',       hex: '#202632', cssVar: '--bee-el-active' },
    ],
  },
  {
    title: 'elements/fake-invert',
    background: 'dark',
    tokens: [
      { name: 'elements/fake-invert/primary',      hex: '#202632', cssVar: '--bee-el-primary-fake-invert' },
      { name: 'elements/fake-invert/secondary',    hex: '#28303F', cssVar: '--bee-el-secondary-fake-invert' },
      { name: 'elements/fake-invert/tertiary',     hex: '#28303F', cssVar: '--bee-el-tertiary-fake-invert' },
      { name: 'elements/fake-invert/disabled',     hex: '#323C4E', cssVar: '--bee-el-disabled-fake-invert' },
      { name: 'elements/fake-invert/additional01', hex: '#202632', cssVar: '--bee-el-additional01-fake-invert' },
      { name: 'elements/fake-invert/additional02', hex: '#77849D1F', cssVar: '--bee-el-additional02-fake-invert' },
      { name: 'elements/fake-invert/active',       hex: '#FFFFFF', cssVar: '--bee-el-active-fake-invert' },
    ],
  },

  // ── content ───────────────────────────────────────────────
  {
    title: 'content',
    tokens: [
      { name: 'content/primary',   hex: '#28303F', cssVar: '--bee-content-primary' },
      { name: 'content/secondary', hex: '#77849D', cssVar: '--bee-content-secondary' },
      { name: 'content/tertiary',  hex: '#8E99AF', cssVar: '--bee-content-tertiary' },
      { name: 'content/disabled',  hex: '#A5AEC0', cssVar: '--bee-content-disabled' },
    ],
  },
  {
    title: 'content/fake-invert',
    background: 'dark',
    tokens: [
      { name: 'content/fake-invert/primary',   hex: '#FFFFFF', cssVar: '--bee-content-primary-fake-invert' },
      { name: 'content/fake-invert/secondary', hex: '#A5AEC0', cssVar: '--bee-content-secondary-fake-invert' },
      { name: 'content/fake-invert/tertiary',  hex: '#77849D', cssVar: '--bee-content-tertiary-fake-invert' },
      { name: 'content/fake-invert/disabled',  hex: '#58657E', cssVar: '--bee-content-disabled-fake-invert' },
    ],
  },
  {
    title: 'content/invert',
    background: 'dark',
    tokens: [
      { name: 'content/invert/primary',   hex: '#FFFFFF', cssVar: '--bee-content-invert' },
      { name: 'content/invert/secondary', hex: '#A5AEC0', cssVar: '--bee-content-secondary-invert' },
      { name: 'content/invert/tertiary',  hex: '#77849D', cssVar: '--bee-content-tertiary-invert' },
      { name: 'content/invert/disabled',  hex: '#58657E', cssVar: '--bee-content-disabled-invert' },
    ],
  },

  // ── border ────────────────────────────────────────────────
  {
    title: 'border',
    tokens: [
      { name: 'border/primary',   hex: '#C3C9D5', cssVar: '--bee-border-primary' },
      { name: 'border/secondary', hex: '#E2E6ED', cssVar: '--bee-border-secondary' },
    ],
  },
  {
    title: 'border/fake-invert',
    background: 'dark',
    tokens: [
      { name: 'border/fake-invert/primary',   hex: '#58657E', cssVar: '--bee-border-primary-fake-invert' },
      { name: 'border/fake-invert/secondary', hex: '#3C475D', cssVar: '--bee-border-secondary-fake-invert' },
    ],
  },
  {
    title: 'border/invert',
    background: 'dark',
    tokens: [
      { name: 'border/invert/primary',   hex: '#58657E', cssVar: '--bee-border-primary-invert' },
      { name: 'border/invert/secondary', hex: '#3C475D', cssVar: '--bee-border-secondary-invert' },
    ],
  },

  // ── overlay / glass ───────────────────────────────────────
  {
    title: 'overlay',
    tokens: [
      { name: 'overlay/xl ~90%', hex: '#181C23E5', cssVar: '--bee-overlay-xl' },
      { name: 'overlay/l ~20%',  hex: '#28303F33', cssVar: '--bee-overlay-l' },
      { name: 'overlay/m ~80%',  hex: '#F0F3F5CC', cssVar: '--bee-overlay-m' },
      { name: 'overlay/s ~30%',  hex: '#F0F3F54D', cssVar: '--bee-overlay-s' },
      { name: 'overlay/xs ~10%', hex: '#FFFFFF1A', cssVar: '--bee-overlay-xs' },
    ],
  },
  {
    title: 'glass',
    tokens: [
      { name: 'glass/primary',   hex: '#F0F3F580', cssVar: '--bee-glass-primary' },
      { name: 'glass/secondary', hex: '#FFFFFF80', cssVar: '--bee-glass-secondary' },
      { name: 'glass/disabled',  hex: '#E2E6ED99', cssVar: '--bee-glass-disabled' },
      { name: 'glass/invert',    hex: '#202632CC', cssVar: '--bee-glass-invert' },
      { name: 'glass/brand',     hex: '#FFC800CC', cssVar: '--bee-glass-brand' },
      { name: 'glass/error',     hex: '#F84A00CC', cssVar: '--bee-glass-error' },
    ],
  },

  // ── constant ──────────────────────────────────────────────
  {
    title: 'constant',
    tokens: [
      { name: 'constant/dark',  hex: '#28303F' },
      { name: 'constant/light', hex: '#FFFFFF' },
    ],
  },

  // ── brand ─────────────────────────────────────────────────
  {
    title: 'brand',
    tokens: [
      { name: 'brand/primary',   hex: '#FFC800' },
      { name: 'brand/secondary', hex: '#FFD546' },
      { name: 'brand/tertiary',  hex: '#F4B807' },
    ],
  },

  // ── error / success / link ────────────────────────────────
  {
    title: 'error',
    tokens: [
      { name: 'error/primary',   hex: '#F84A00' },
      { name: 'error/secondary', hex: '#FF6524' },
      { name: 'error/tertiary',  hex: '#B83700' },
    ],
  },
  {
    title: 'success',
    tokens: [
      { name: 'success/primary',   hex: '#00A55E' },
      { name: 'success/secondary', hex: '#00C06D' },
      { name: 'success/tertiary',  hex: '#008F51' },
    ],
  },
  {
    title: 'link',
    tokens: [
      { name: 'link/primary',   hex: '#1086F9' },
      { name: 'link/secondary', hex: '#2E94FA' },
      { name: 'link/tertiary',  hex: '#0670DB' },
    ],
  },

  // ── surface ───────────────────────────────────────────────
  {
    title: 'surface',
    tokens: [
      { name: 'surface/green',   hex: '#CBF6E3' },
      { name: 'surface/teal',    hex: '#BFF8F1' },
      { name: 'surface/blue',    hex: '#D7EBFE' },
      { name: 'surface/violet',  hex: '#E7DFFB' },
      { name: 'surface/magenta', hex: '#FBDBEC' },
      { name: 'surface/red',     hex: '#FDD8D8' },
      { name: 'surface/orange',  hex: '#FFD8C7' },
      { name: 'surface/yellow',  hex: '#FFE999' },
    ],
  },

  // ── accent ────────────────────────────────────────────────
  {
    title: 'accent',
    tokens: [
      { name: 'accent/green/primary',    hex: '#00A55E' },
      { name: 'accent/green/secondary',  hex: '#00A55E70' },
      { name: 'accent/green/tertiary',   hex: '#00A55E3D' },
      { name: 'accent/teal/primary',     hex: '#00A894' },
      { name: 'accent/teal/secondary',   hex: '#00A89470' },
      { name: 'accent/teal/tertiary',    hex: '#00A8943D' },
      { name: 'accent/blue/primary',     hex: '#1086F9' },
      { name: 'accent/blue/secondary',   hex: '#1086F970' },
      { name: 'accent/blue/tertiary',    hex: '#1086F93D' },
      { name: 'accent/violet/primary',   hex: '#7E56EB' },
      { name: 'accent/violet/secondary', hex: '#7E56EB70' },
      { name: 'accent/violet/tertiary',  hex: '#7E56EB3D' },
      { name: 'accent/magenta/primary',  hex: '#E52E90' },
      { name: 'accent/magenta/secondary',hex: '#E52E9070' },
      { name: 'accent/magenta/tertiary', hex: '#E52E903D' },
      { name: 'accent/red/primary',      hex: '#F43434' },
      { name: 'accent/red/secondary',    hex: '#F4343470' },
      { name: 'accent/red/tertiary',     hex: '#F434343D' },
      { name: 'accent/orange/primary',   hex: '#F84A00' },
      { name: 'accent/orange/secondary', hex: '#F84A0070' },
      { name: 'accent/orange/tertiary',  hex: '#F84A003D' },
      { name: 'accent/yellow/primary',   hex: '#FFC800' },
      { name: 'accent/yellow/secondary', hex: '#FFC80070' },
      { name: 'accent/yellow/tertiary',  hex: '#FFC8003D' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// spacing + radii — из src/carnica/tokens/spacing.ts

export const spacingTokens = [
  { name: 'xs',  value: '4px'  },
  { name: 'sm',  value: '8px'  },
  { name: 'md',  value: '12px' },
  { name: 'lg',  value: '16px' },
  { name: 'xl',  value: '24px' },
  { name: 'xxl', value: '32px' },
] as const;

export const radiiTokens = [
  { name: 'sm',    value: '8px'   },
  { name: 'md',    value: '12px'  },
  { name: 'lg',    value: '16px'  },
  { name: 'xl',    value: '24px'  },
  { name: 'pill',  value: '100px' },
  { name: 'round', value: '50%'   },
] as const;

// ─────────────────────────────────────────────────────────────
// типографика — все 17 стилей шкалы Carnica

export interface TypoStyle {
  name: string;
  className: string;
  size: string;
  lineHeight: string;
  weight: 400 | 500;
  hint?: string;
  sample?: string;
}

export const typoStyles: TypoStyle[] = [
  // display
  { name: 'display/large',      className: 'text-display-lg', size: '56px', lineHeight: '66px', weight: 400, hint: 'web only · самый большой' },
  { name: 'display/medium',     className: 'text-display-md', size: '40px', lineHeight: '48px', weight: 400, hint: 'web + app · главный H1' },
  { name: 'display/small',      className: 'text-display-sm', size: '32px', lineHeight: '36px', weight: 400, hint: 'mobile web + app' },
  { name: 'display/extrasmall', className: 'text-display-xs', size: '16px', lineHeight: '22px', weight: 400, hint: 'mobile web + app' },
  // headline
  { name: 'headline/medium', className: 'text-headline-md', size: '40px', lineHeight: '40px', weight: 400, hint: 'тесный line-height' },
  { name: 'headline/small',  className: 'text-headline-sm', size: '24px', lineHeight: '24px', weight: 400, hint: 'универсальный' },
  // body
  { name: 'body/large',  className: 'text-body-lg', size: '24px', lineHeight: '28px', weight: 400, hint: 'универсальный · до 3 строк' },
  { name: 'body/medium', className: 'text-body-md', size: '20px', lineHeight: '26px', weight: 400, hint: 'web + mobile web · до 3 строк' },
  { name: 'body/small',  className: 'text-body-sm', size: '16px', lineHeight: '20px', weight: 400, hint: 'универсальный · до 3 строк' },
  // body accent
  { name: 'body/accent/large',  className: 'text-body-accent-lg', size: '24px', lineHeight: '28px', weight: 500, hint: 'кнопки и лейблы' },
  { name: 'body/accent/medium', className: 'text-body-accent-md', size: '20px', lineHeight: '26px', weight: 500, hint: 'web + mobile web' },
  { name: 'body/accent/small',  className: 'text-body-accent-sm', size: '16px', lineHeight: '20px', weight: 500, hint: 'универсальный · кнопки' },
  // body paragraph
  { name: 'body/paragraph/large',  className: 'text-body-paragraph-lg', size: '24px', lineHeight: '36px', weight: 400, hint: '4+ строк · крупный long-form', sample: 'для длинных текстов с большим line-height. лучше читается на длинной дистанции, чем body/large' },
  { name: 'body/paragraph/medium', className: 'text-body-paragraph-md', size: '20px', lineHeight: '30px', weight: 400, hint: '4+ строк · средний long-form', sample: 'для длинных текстов с большим line-height. лучше читается на длинной дистанции, чем body/medium' },
  { name: 'body/paragraph/small',  className: 'text-body-paragraph-sm', size: '16px', lineHeight: '24px', weight: 400, hint: '4+ строк · мелкий long-form', sample: 'для длинных текстов с большим line-height. лучше читается на длинной дистанции, чем body/small' },
  // caption
  { name: 'caption/medium',        className: 'text-caption-md',        size: '13px', lineHeight: '16px', weight: 400, hint: 'подписи, ошибки, единицы' },
  { name: 'caption/accent/medium', className: 'text-caption-accent-md', size: '13px', lineHeight: '16px', weight: 500, hint: 'акцент в подписях' },
];
