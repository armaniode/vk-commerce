/**
 * Carnica Color Tokens
 * Source: Figma 01_Carnica colors 2.0, collection semantic 2.0.
 * Initial extraction: 2026-04-07 via get_variable_defs.
 * Reconciled with Figma library search: 2026-05-21.
 *
 * Primary API: flat Figma token paths in colorTokens.light/dark.
 * Compatibility API: existing object exports such as content.primary,
 * backgroundFakeInvert.secondary, contentInvert.primary.
 */

// Content (text/icon colors)

export const content = {
  primary: '#28303F',
  secondary: '#77849D',
  tertiary: '#8E99AF',
  disabled: '#A5AEC0',
} as const;

export const contentDark = {
  primary: '#FFFFFF',
  secondary: '#A5AEC0',
  tertiary: '#77849D',
  disabled: '#58657E',
} as const;

export const contentFakeInvert = {
  primary: '#FFFFFF',
  secondary: '#A5AEC0',
  tertiary: '#77849D',
  disabled: '#58657E',
} as const;

export const content100Invert = {
  primary: '#FFFFFF',
  secondary: '#A5AEC0',
  tertiary: '#77849D',
  disabled: '#58657E',
} as const;

export const content100InvertDark = {
  primary: '#28303F',
  secondary: '#77849D',
  tertiary: '#8E99AF',
  disabled: '#A5AEC0',
} as const;

// Compatibility: old name lost the "100%" modifier.
export const contentInvert = content100Invert;

// Background (page/section fills)

export const background = {
  primary: '#F0F3F5',
  secondary: '#FFFFFF',
  tertiary: '#F0F3F5',
  additional01: '#FFFFFF',
  additional02: '#77849D1F',
} as const;

export const backgroundDark = {
  primary: '#181C23',
  secondary: '#202632',
  tertiary: '#28303F',
  additional01: '#77849D1F',
  additional02: '#77849D1F',
} as const;

export const backgroundFakeInvert = {
  primary: '#181C23',
  secondary: '#202632',
  tertiary: '#28303F',
  additional: '#77849D1F',
} as const;

// Elements (interactive surfaces: buttons, cards, inputs)

export const elements = {
  primary: '#FFFFFF',
  secondary: '#F0F3F5',
  tertiary: '#E2E6ED',
  disabled: '#E2E6ED',
  additional01: '#FFFFFF',
  additional02: '#77849D1F',
  active: '#202632',
} as const;

export const elementsDark = {
  primary: '#202632',
  secondary: '#28303F',
  tertiary: '#28303F',
  disabled: '#323C4E',
  additional01: '#77849D1F',
  additional02: '#77849D1F',
  active: '#FFFFFF',
} as const;

export const elementsFakeInvert = {
  primary: '#202632',
  secondary: '#28303F',
  tertiary: '#28303F',
  disabled: '#323C4E',
  additional01: '#77849D1F',
  additional02: '#77849D1F',
  active: '#FFFFFF',
} as const;

// Border

export const border = {
  primary: '#C3C9D5',
  secondary: '#E2E6ED',
} as const;

export const borderDark = {
  primary: '#58657E',
  secondary: '#3C475D',
} as const;

export const borderFakeInvert = {
  primary: '#58657E',
  secondary: '#3C475D',
} as const;

export const border100Invert = {
  primary: '#58657E',
  secondary: '#3C475D',
} as const;

export const border100InvertDark = {
  primary: '#C3C9D5',
  secondary: '#E2E6ED',
} as const;

// Compatibility: old name lost the "100%" modifier.
export const borderInvert = border100Invert;

// ── Overlay (transparent layers) ────────────────────────────

export const overlay = {
  xl: '#181C23E5',
  l: '#28303F33',
  m: '#F0F3F5CC',
  s: '#F0F3F54D',
  xs: '#FFFFFF1A',
} as const;

export const overlayDark = {
  xl: '#000000CC',
  l: '#28303F33',
  m: '#181C23CC',
  s: '#181C234D',
  xs: '#FFFFFF1A',
} as const;

// Glass (blur/frosted effects)

export const glass = {
  primary: '#F0F3F580',
  secondary: '#FFFFFF80',
  disabled: '#E2E6ED99',
  invert: '#202632CC',
  brand: '#FFC800CC',
  error: '#F84A00CC',
} as const;

export const glassDark = {
  primary: '#28303FB3',
  secondary: '#77849D1F',
  disabled: '#323C4ECC',
  invert: '#FFFFFFB3',
  brand: '#FFC800CC',
  error: '#F84A00CC',
} as const;

// Static tokens (do not change by theme)

export const constant = {
  dark: '#28303F',
  light: '#FFFFFF',
} as const;

export const brand = {
  primary: '#FFC800',
  secondary: '#FFD546',
  tertiary: '#F4B807',
} as const;

export const error = {
  primary: '#F84A00',
  secondary: '#FF6524',
  tertiary: '#B83700',
} as const;

export const success = {
  primary: '#00A55E',
  secondary: '#00C06D',
  tertiary: '#008F51',
} as const;

export const link = {
  primary: '#1086F9',
  secondary: '#2E94FA',
  tertiary: '#0670DB',
} as const;

export const surface = {
  green: '#CBF6E3',
  teal: '#BFF8F1',
  blue: '#D7EBFE',
  violet: '#E7DFFB',
  magenta: '#FBDBEC',
  red: '#FDD8D8',
  orange: '#FFD8C7',
  yellow: '#FFE999',
} as const;

export const surfaceByToken = {
  'surface/01-green': surface.green,
  'surface/02-teal': surface.teal,
  'surface/03-blue': surface.blue,
  'surface/04-violet': surface.violet,
  'surface/05-magenta': surface.magenta,
  'surface/06-red': surface.red,
  'surface/07-orange': surface.orange,
  'surface/08-yellow': surface.yellow,
} as const;

// Accent secondary alpha 0x70 is 44%, tertiary alpha 0x3D is 24%.
export const accent = {
  green: { primary: '#00A55E', secondary: '#00A55E70', tertiary: '#00A55E3D' },
  teal: { primary: '#00A894', secondary: '#00A89470', tertiary: '#00A8943D' },
  blue: { primary: '#1086F9', secondary: '#1086F970', tertiary: '#1086F93D' },
  violet: { primary: '#7E56EB', secondary: '#7E56EB70', tertiary: '#7E56EB3D' },
  magenta: { primary: '#E52E90', secondary: '#E52E9070', tertiary: '#E52E903D' },
  red: { primary: '#F43434', secondary: '#F4343470', tertiary: '#F434343D' },
  orange: { primary: '#F84A00', secondary: '#F84A0070', tertiary: '#F84A003D' },
  yellow: { primary: '#FFC800', secondary: '#FFC80070', tertiary: '#FFC8003D' },
} as const;

export const accentByToken = {
  'accent/01-green-primary': accent.green.primary,
  'accent/01-green-secondary': accent.green.secondary,
  'accent/01-green-tertiary': accent.green.tertiary,
  'accent/02-teal-primary': accent.teal.primary,
  'accent/02-teal-secondary': accent.teal.secondary,
  'accent/02-teal-tertiary': accent.teal.tertiary,
  'accent/03-blue-primary': accent.blue.primary,
  'accent/03-blue-secondary': accent.blue.secondary,
  'accent/03-blue-tertiary': accent.blue.tertiary,
  'accent/04-violet-primary': accent.violet.primary,
  'accent/04-violet-secondary': accent.violet.secondary,
  'accent/04-violet-tertiary': accent.violet.tertiary,
  'accent/05-magenta-primary': accent.magenta.primary,
  'accent/05-magenta-secondary': accent.magenta.secondary,
  'accent/05-magenta-tertiary': accent.magenta.tertiary,
  'accent/06-red-primary': accent.red.primary,
  'accent/06-red-secondary': accent.red.secondary,
  'accent/06-red-tertiary': accent.red.tertiary,
  'accent/07-orange-primary': accent.orange.primary,
  'accent/07-orange-secondary': accent.orange.secondary,
  'accent/07-orange-tertiary': accent.orange.tertiary,
  'accent/08-yellow-primary': accent.yellow.primary,
  'accent/08-yellow-secondary': accent.yellow.secondary,
  'accent/08-yellow-tertiary': accent.yellow.tertiary,
} as const;

const staticColorTokens = {
  'constant/dark': constant.dark,
  'constant/light': constant.light,
  'brand/primary': brand.primary,
  'brand/secondary': brand.secondary,
  'brand/tertiary': brand.tertiary,
  'error/primary': error.primary,
  'error/secondary': error.secondary,
  'error/tertiary': error.tertiary,
  'success/primary': success.primary,
  'success/secondary': success.secondary,
  'success/tertiary': success.tertiary,
  'link/primary': link.primary,
  'link/secondary': link.secondary,
  'link/tertiary': link.tertiary,
  ...surfaceByToken,
  ...accentByToken,
} as const;

export const colorTokens = {
  light: {
    'content/primary': content.primary,
    'content/secondary': content.secondary,
    'content/tertiary': content.tertiary,
    'content/disabled': content.disabled,
    'content/primary fake-invert': contentFakeInvert.primary,
    'content/secondary fake-invert': contentFakeInvert.secondary,
    'content/tertiary fake-invert': contentFakeInvert.tertiary,
    'content/disabled fake-invert': contentFakeInvert.disabled,
    'content/primary 100%-invert': content100Invert.primary,
    'content/secondary 100%-invert': content100Invert.secondary,
    'content/tertiary 100%-invert': content100Invert.tertiary,
    'content/disabled 100%-invert': content100Invert.disabled,

    'background/primary': background.primary,
    'background/secondary': background.secondary,
    'background/tertiary': background.tertiary,
    'background/additional01': background.additional01,
    'background/additional02': background.additional02,
    'background/primary fake-invert': backgroundFakeInvert.primary,
    'background/secondary fake-invert': backgroundFakeInvert.secondary,
    'background/tertiary fake-invert': backgroundFakeInvert.tertiary,
    'background/additional fake-invert': backgroundFakeInvert.additional,

    'elements/primary': elements.primary,
    'elements/secondary': elements.secondary,
    'elements/tertiary': elements.tertiary,
    'elements/disabled': elements.disabled,
    'elements/additional01': elements.additional01,
    'elements/additional02': elements.additional02,
    'elements/active': elements.active,
    'elements/primary fake-invert': elementsFakeInvert.primary,
    'elements/secondary fake-invert': elementsFakeInvert.secondary,
    'elements/tertiary fake-invert': elementsFakeInvert.tertiary,
    'elements/disabled fake-invert': elementsFakeInvert.disabled,
    'elements/additional01 fake-invert': elementsFakeInvert.additional01,
    'elements/additional02 fake-invert': elementsFakeInvert.additional02,
    'elements/active fake-invert': elementsFakeInvert.active,

    'border/primary': border.primary,
    'border/secondary': border.secondary,
    'border/primary fake-invert': borderFakeInvert.primary,
    'border/secondary fake-invert': borderFakeInvert.secondary,
    'border/primary 100%-invert': border100Invert.primary,
    'border/secondary 100%-invert': border100Invert.secondary,

    'overlay/XL': overlay.xl,
    'overlay/L': overlay.l,
    'overlay/M': overlay.m,
    'overlay/S': overlay.s,
    'overlay/XS': overlay.xs,

    'glass/primary': glass.primary,
    'glass/secondary': glass.secondary,
    'glass/disabled': glass.disabled,
    'glass/invert': glass.invert,
    'glass/brand': glass.brand,
    'glass/error': glass.error,

    ...staticColorTokens,
  },
  dark: {
    'content/primary': contentDark.primary,
    'content/secondary': contentDark.secondary,
    'content/tertiary': contentDark.tertiary,
    'content/disabled': contentDark.disabled,
    'content/primary fake-invert': contentDark.primary,
    'content/secondary fake-invert': contentDark.secondary,
    'content/tertiary fake-invert': contentDark.tertiary,
    'content/disabled fake-invert': contentDark.disabled,
    'content/primary 100%-invert': content100InvertDark.primary,
    'content/secondary 100%-invert': content100InvertDark.secondary,
    'content/tertiary 100%-invert': content100InvertDark.tertiary,
    'content/disabled 100%-invert': content100InvertDark.disabled,

    'background/primary': backgroundDark.primary,
    'background/secondary': backgroundDark.secondary,
    'background/tertiary': backgroundDark.tertiary,
    'background/additional01': backgroundDark.additional01,
    'background/additional02': backgroundDark.additional02,
    'background/primary fake-invert': backgroundDark.primary,
    'background/secondary fake-invert': backgroundDark.secondary,
    'background/tertiary fake-invert': backgroundDark.tertiary,
    'background/additional fake-invert': backgroundDark.additional02,

    'elements/primary': elementsDark.primary,
    'elements/secondary': elementsDark.secondary,
    'elements/tertiary': elementsDark.tertiary,
    'elements/disabled': elementsDark.disabled,
    'elements/additional01': elementsDark.additional01,
    'elements/additional02': elementsDark.additional02,
    'elements/active': elementsDark.active,
    'elements/primary fake-invert': elementsDark.primary,
    'elements/secondary fake-invert': elementsDark.secondary,
    'elements/tertiary fake-invert': elementsDark.tertiary,
    'elements/disabled fake-invert': elementsDark.disabled,
    'elements/additional01 fake-invert': elementsDark.additional01,
    'elements/additional02 fake-invert': elementsDark.additional02,
    'elements/active fake-invert': elementsDark.active,

    'border/primary': borderDark.primary,
    'border/secondary': borderDark.secondary,
    'border/primary fake-invert': borderDark.primary,
    'border/secondary fake-invert': borderDark.secondary,
    'border/primary 100%-invert': border100InvertDark.primary,
    'border/secondary 100%-invert': border100InvertDark.secondary,

    'overlay/XL': overlayDark.xl,
    'overlay/L': overlayDark.l,
    'overlay/M': overlayDark.m,
    'overlay/S': overlayDark.s,
    'overlay/XS': overlayDark.xs,

    'glass/primary': glassDark.primary,
    'glass/secondary': glassDark.secondary,
    'glass/disabled': glassDark.disabled,
    'glass/invert': glassDark.invert,
    'glass/brand': glassDark.brand,
    'glass/error': glassDark.error,

    ...staticColorTokens,
  },
} as const;

export const figmaColorTokens = colorTokens;
