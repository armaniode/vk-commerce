/**
 * Carnica Tailwind preset — каноничные bee-* классы, типографика,
 * keyframes. Источник правды для любого проекта-потребителя.
 *
 * Использование в проекте:
 *   // tailwind.config.js
 *   import carnicaPreset from '../../src/carnica/styles/tailwind-preset.js';
 *   export default {
 *     presets: [carnicaPreset],
 *     content: [ ... ],
 *   };
 *
 * Не забудь подключить CSS-vars: @import '<path>/src/carnica/styles/theme.css';
 * в корневом css-файле и ставить data-theme на <html>.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BeelineSans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        bee: {
          // ── алиасы для удобства ────────────────────────────
          yellow:          'rgb(var(--bee-brand-primary) / <alpha-value>)',
          'yellow-hover':  'rgb(var(--bee-brand-secondary) / <alpha-value>)',
          'yellow-pressed':'rgb(var(--bee-brand-tertiary) / <alpha-value>)',
          dark:            'rgb(var(--bee-constant-dark) / <alpha-value>)',
          light:           'rgb(var(--bee-constant-light) / <alpha-value>)',
          error:           'rgb(var(--bee-error-primary) / <alpha-value>)',
          'error-hover':   'rgb(var(--bee-error-secondary) / <alpha-value>)',
          success:         'rgb(var(--bee-success-primary) / <alpha-value>)',
          link:            'rgb(var(--bee-link-primary) / <alpha-value>)',

          // ── brand / error / success / link (полные имена) ──
          'brand-primary':    'rgb(var(--bee-brand-primary) / <alpha-value>)',
          'brand-secondary':  'rgb(var(--bee-brand-secondary) / <alpha-value>)',
          'brand-tertiary':   'rgb(var(--bee-brand-tertiary) / <alpha-value>)',
          'error-primary':    'rgb(var(--bee-error-primary) / <alpha-value>)',
          'error-secondary':  'rgb(var(--bee-error-secondary) / <alpha-value>)',
          'error-tertiary':   'rgb(var(--bee-error-tertiary) / <alpha-value>)',
          'success-primary':   'rgb(var(--bee-success-primary) / <alpha-value>)',
          'success-secondary': 'rgb(var(--bee-success-secondary) / <alpha-value>)',
          'success-tertiary':  'rgb(var(--bee-success-tertiary) / <alpha-value>)',
          'link-primary':    'rgb(var(--bee-link-primary) / <alpha-value>)',
          'link-secondary':  'rgb(var(--bee-link-secondary) / <alpha-value>)',
          'link-tertiary':   'rgb(var(--bee-link-tertiary) / <alpha-value>)',

          'constant-dark':   'rgb(var(--bee-constant-dark) / <alpha-value>)',
          'constant-light':  'rgb(var(--bee-constant-light) / <alpha-value>)',

          // ── surface (pastel) — константы ────────────────────
          'surface-green':   '#CBF6E3',
          'surface-teal':    '#BFF8F1',
          'surface-blue':    '#D7EBFE',
          'surface-violet':  '#E7DFFB',
          'surface-magenta': '#FBDBEC',
          'surface-red':     '#FDD8D8',
          'surface-orange':  '#FFD8C7',
          'surface-yellow':  '#FFE999',

          // ── theme-switchable: content ───────────────────────
          'content-primary':           'rgb(var(--bee-content-primary) / <alpha-value>)',
          'content-secondary':         'rgb(var(--bee-content-secondary) / <alpha-value>)',
          'content-tertiary':          'rgb(var(--bee-content-tertiary) / <alpha-value>)',
          'content-disabled':          'rgb(var(--bee-content-disabled) / <alpha-value>)',
          'content-invert':            'rgb(var(--bee-content-invert) / <alpha-value>)',
          'content-secondary-invert':  'rgb(var(--bee-content-secondary-invert) / <alpha-value>)',
          'content-tertiary-invert':   'rgb(var(--bee-content-tertiary-invert) / <alpha-value>)',
          'content-disabled-invert':   'rgb(var(--bee-content-disabled-invert) / <alpha-value>)',
          'content-primary-fake-invert':   'rgb(var(--bee-content-primary-fake-invert) / <alpha-value>)',
          'content-secondary-fake-invert': 'rgb(var(--bee-content-secondary-fake-invert) / <alpha-value>)',
          'content-tertiary-fake-invert':  'rgb(var(--bee-content-tertiary-fake-invert) / <alpha-value>)',
          'content-disabled-fake-invert':  'rgb(var(--bee-content-disabled-fake-invert) / <alpha-value>)',

          // ── theme-switchable: background ────────────────────
          'bg-primary':       'rgb(var(--bee-bg-primary) / <alpha-value>)',
          'bg-secondary':     'rgb(var(--bee-bg-secondary) / <alpha-value>)',
          'bg-tertiary':      'rgb(var(--bee-bg-tertiary) / <alpha-value>)',
          'bg-additional01':  'rgb(var(--bee-bg-additional01) / <alpha-value>)',
          'bg-additional02':  'var(--bee-bg-additional02)',
          'bg-overlay':       'var(--bee-bg-overlay)',
          'bg-primary-fake-invert':    'rgb(var(--bee-bg-primary-fake-invert) / <alpha-value>)',
          'bg-secondary-fake-invert':  'rgb(var(--bee-bg-secondary-fake-invert) / <alpha-value>)',
          'bg-tertiary-fake-invert':   'rgb(var(--bee-bg-tertiary-fake-invert) / <alpha-value>)',
          'bg-additional-fake-invert': 'var(--bee-bg-additional-fake-invert)',

          // ── theme-switchable: elements ──────────────────────
          'el-primary':      'rgb(var(--bee-el-primary) / <alpha-value>)',
          'el-secondary':    'rgb(var(--bee-el-secondary) / <alpha-value>)',
          'el-tertiary':     'rgb(var(--bee-el-tertiary) / <alpha-value>)',
          'el-disabled':     'rgb(var(--bee-el-disabled) / <alpha-value>)',
          'el-additional01': 'rgb(var(--bee-el-additional01) / <alpha-value>)',
          'el-additional02': 'var(--bee-el-additional02)',
          'el-active':       'rgb(var(--bee-el-active) / <alpha-value>)',
          'el-primary-fake-invert':      'rgb(var(--bee-el-primary-fake-invert) / <alpha-value>)',
          'el-secondary-fake-invert':    'rgb(var(--bee-el-secondary-fake-invert) / <alpha-value>)',
          'el-tertiary-fake-invert':     'rgb(var(--bee-el-tertiary-fake-invert) / <alpha-value>)',
          'el-disabled-fake-invert':     'rgb(var(--bee-el-disabled-fake-invert) / <alpha-value>)',
          'el-additional01-fake-invert': 'rgb(var(--bee-el-additional01-fake-invert) / <alpha-value>)',
          'el-additional02-fake-invert': 'var(--bee-el-additional02-fake-invert)',
          'el-active-fake-invert':       'rgb(var(--bee-el-active-fake-invert) / <alpha-value>)',

          // ── theme-switchable: borders ───────────────────────
          'border-primary':   'rgb(var(--bee-border-primary) / <alpha-value>)',
          'border-secondary': 'rgb(var(--bee-border-secondary) / <alpha-value>)',
          'border-primary-invert':   'rgb(var(--bee-border-primary-invert) / <alpha-value>)',
          'border-secondary-invert': 'rgb(var(--bee-border-secondary-invert) / <alpha-value>)',
          'border-primary-fake-invert':   'rgb(var(--bee-border-primary-fake-invert) / <alpha-value>)',
          'border-secondary-fake-invert': 'rgb(var(--bee-border-secondary-fake-invert) / <alpha-value>)',

          // ── overlay / glass — hex с альфой ──────────────────
          'overlay-xl': 'var(--bee-overlay-xl)',
          'overlay-l':  'var(--bee-overlay-l)',
          'overlay-m':  'var(--bee-overlay-m)',
          'overlay-s':  'var(--bee-overlay-s)',
          'overlay-xs': 'var(--bee-overlay-xs)',
          'glass-primary':   'var(--bee-glass-primary)',
          'glass-secondary': 'var(--bee-glass-secondary)',
          'glass-disabled':  'var(--bee-glass-disabled)',
          'glass-invert':    'var(--bee-glass-invert)',
          'glass-brand':     'var(--bee-glass-brand)',
          'glass-error':     'var(--bee-glass-error)',
        },
      },
      borderRadius: {
        pill: '100px',
      },
      fontSize: {
        'display-lg': ['56px', { lineHeight: '66px', fontWeight: '400' }],
        'display-md': ['40px', { lineHeight: '48px', fontWeight: '400' }],
        'display-sm': ['32px', { lineHeight: '36px', fontWeight: '400' }],
        'display-xs': ['16px', { lineHeight: '22px', fontWeight: '400' }],
        'headline-md': ['40px', { lineHeight: '40px', fontWeight: '400' }],
        'headline-sm': ['24px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg':  ['24px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md':  ['20px', { lineHeight: '26px', fontWeight: '400' }],
        'body-sm':  ['16px', { lineHeight: '20px', fontWeight: '400' }],
        'body-accent-lg': ['24px', { lineHeight: '28px', fontWeight: '500' }],
        'body-accent-md': ['20px', { lineHeight: '26px', fontWeight: '500' }],
        'body-accent-sm': ['16px', { lineHeight: '20px', fontWeight: '500' }],
        'body-paragraph-lg': ['24px', { lineHeight: '36px', fontWeight: '400' }],
        'body-paragraph-md': ['20px', { lineHeight: '30px', fontWeight: '400' }],
        'body-paragraph-sm': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'caption-md':        ['13px', { lineHeight: '16px', fontWeight: '400' }],
        'caption-accent-md': ['13px', { lineHeight: '16px', fontWeight: '500' }],
      },
      keyframes: {
        'pulse-soft': {
          '0%, 80%, 100%': { opacity: '0.3' },
          '40%':           { opacity: '1' },
        },
        'balance-swap': {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 1.2s ease-in-out infinite',
        'balance-swap': 'balance-swap 240ms cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
