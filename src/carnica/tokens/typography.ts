/**
 * Carnica Typography Tokens
 * Source: Figma 02_Carnica typography (node 2091:6861), extracted 2026-04-07
 * Style keys reconciled via Figma library search: 2026-05-21
 *
 * Naming: {category}/{modifier?}/{size}
 * Categories: display, headline, body, caption
 * Modifiers: accent (Medium 500), paragraph (larger line-height for article/longread text)
 * Sizes: large, medium, small, extrasmall
 *
 * Only 2 weights used: Regular (400) and Medium (500)
 * Letter spacing: 0 for all styles
 */

export const fontFamily = "'Beeline Sans', 'BeelineSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// --- Display: high-impact headings and key values ---

export const display = {
  large:      { fontSize: '56px', fontWeight: 400, lineHeight: '66px' },  // web only
  medium:     { fontSize: '40px', fontWeight: 400, lineHeight: '48px' },  // web, app
  small:      { fontSize: '32px', fontWeight: 400, lineHeight: '36px' },  // mobile web, app
  extrasmall: { fontSize: '16px', fontWeight: 400, lineHeight: '22px' },  // mobile web, app
} as const;

// --- Headline: secondary headings ---
// "вспомогательные заголовки, уменьшенный line-height по сравнению с display"

export const headline = {
  medium: { fontSize: '40px', fontWeight: 400, lineHeight: '40px' },  // web, app
  small:  { fontSize: '24px', fontWeight: 400, lineHeight: '24px' },  // universal
} as const;

// --- Body: default UI text, including multi-line interface copy ---

export const body = {
  large:  { fontSize: '24px', fontWeight: 400, lineHeight: '28px' },  // universal
  medium: { fontSize: '20px', fontWeight: 400, lineHeight: '26px' },  // web, mobile web
  small:  { fontSize: '16px', fontWeight: 400, lineHeight: '20px' },  // universal
} as const;

// --- Body/Accent: emphasis for buttons, labels (Medium 500) ---
// "не желательно использовать в многострочном тексте"

export const bodyAccent = {
  large:  { fontSize: '24px', fontWeight: 500, lineHeight: '28px' },  // universal
  medium: { fontSize: '20px', fontWeight: 500, lineHeight: '26px' },  // web, mobile web
  small:  { fontSize: '16px', fontWeight: 500, lineHeight: '20px' },  // universal
} as const;

// --- Body/Paragraph: article/longread text, larger line-height ---

export const bodyParagraph = {
  large:  { fontSize: '24px', fontWeight: 400, lineHeight: '36px' },  // universal
  medium: { fontSize: '20px', fontWeight: 400, lineHeight: '30px' },  // universal
  small:  { fontSize: '16px', fontWeight: 400, lineHeight: '24px' },  // universal
} as const;

// --- Caption: smallest text (hints, labels, errors) ---

export const caption = {
  medium: { fontSize: '13px', fontWeight: 400, lineHeight: '16px' },  // universal
} as const;

// --- Caption/Accent: emphasis variant of caption (Medium 500) ---

export const captionAccent = {
  medium: { fontSize: '13px', fontWeight: 500, lineHeight: '16px' },  // universal
} as const;

// --- Convenience: all tokens flat (for Tailwind/CSS generation) ---

export const typography = {
  fontFamily,

  'display/large':         display.large,
  'display/medium':        display.medium,
  'display/small':         display.small,
  'display/extrasmall':    display.extrasmall,

  'headline/medium':       headline.medium,
  'headline/small':        headline.small,

  'body/large':            body.large,
  'body/medium':           body.medium,
  'body/small':            body.small,

  'body/accent/large':     bodyAccent.large,
  'body/accent/medium':    bodyAccent.medium,
  'body/accent/small':     bodyAccent.small,

  'body/paragraph/large':  bodyParagraph.large,
  'body/paragraph/medium': bodyParagraph.medium,
  'body/paragraph/small':  bodyParagraph.small,

  'caption/medium':        caption.medium,

  'caption/accent/medium': captionAccent.medium,
} as const;

export const typographyStyleKeys = {
  'display/large': 'f57d7dc506ee1cde2b0c7cd804113a1894c76476',
  'display/medium': 'cf93514b7fc39ef64f55e75aeac5effd96efe09e',
  'display/small': 'b1ebc2ed65b8b394555704b0c89c77a359173239',
  'display/extrasmall': 'cdd8ea24fb28e520f08a69ab2f1370a48c4ed594',

  'headline/medium': '17dc8ca0f07a80f5f61fc8f0ab93bd4ca46a9bc3',
  'headline/small': '14efb99dde3fe3d2772946c2bda20b1f11ddf621',

  'body/large': '51c9f570110e5a5cb1ccd8159fcf52cebb28ff06',
  'body/medium': '4584a792046ffdd8c980d564639a572e9dc652b6',
  'body/small': '8428078c7857504949384e0f950058330f79ef9c',

  'body/accent/large': '101b10a10e1e0de3ffb4fe923d9fb8051ac85fa0',
  'body/accent/medium': '0fcbded6bcc6dadabbeec58787c05dd3e0657f8d',
  'body/accent/small': '0aeda8963bdd9967bc3316237695732277b99c03',

  'body/paragraph/large': '79610ac1ec5f227a52d557acc96b397f151d8895',
  'body/paragraph/medium': '9a8aaf65da64ea5ee760376aba3c221b008a58f2',
  'body/paragraph/small': '5c45a4df1d51ddc52974a4b2f21619ee1a461539',

  'caption/medium': '2499f21c8d3edca28086216a366a132e1ba26348',
  'caption/accent/medium': '0b0e959651fa0e65e8fd3a371ab6722cf92ef29a',
} as const;
