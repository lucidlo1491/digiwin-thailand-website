/**
 * tokens.js — DigiWin Design Tokens (Single Source of Truth)
 *
 * All colors, typography scales, spacing, shadows, transitions, and radii.
 * Section builders import these instead of hardcoding values.
 *
 * Source: design-system.md + styles.css :root + brand-kit-analysis.md
 */

module.exports = {
  color: {
    // Primary palette
    blue: '#00AFF0',       // --dw-blue (Smart Blue)
    navy: '#000864',       // --dw-navy
    navyDeep: '#000432',   // --dw-navy-deep
    navyMid: '#001080',    // --dw-navy-mid
    royal: '#003CC8',      // --dw-royal
    cyan: '#00E6FF',       // --dw-cyan

    // Text
    text: '#333333',
    textLight: '#666666',
    textMuted: '#999999',
    textSlate: '#5b6b80',

    // Neutrals
    white: '#ffffff',
    grayLight: '#F5F7FA',  // --dw-gray-light (NOT #f8fafc)
    border: '#e8eef3',
    borderLight: '#f0f4f8',

    // Accents
    purple: '#644CE6',
    green: '#02D28C',
    coral: '#FF6E82',
    yellow: '#FFD700',
    red: '#DC2626',

    // Functional
    linkBlue: '#0369a1',
    linkHover: '#0099D6',
    cardHeaderDark: '#0f1419',
    cardHeaderDarkEnd: '#1a2632',
  },

  type: {
    headingXl: { size: 'clamp(36px, 4.5vw, 52px)', weight: 700, height: 1.15, spacing: '-0.02em' },
    headingLg: { size: 'clamp(28px, 3.5vw, 44px)', weight: 700, height: 1.2, spacing: '-0.02em' },
    headingMd: { size: '20px', weight: 600, height: 1.3 },
    headingSm: { size: '18px', weight: 600, height: 1.4 },
    bodyLg:    { size: '19px', weight: 400, height: 1.6 },
    bodyMd:    { size: '16px', weight: 400, height: 1.6 },
    bodySm:    { size: '14px', weight: 400, height: 1.5 },
    bodyXs:    { size: '12px', weight: 400, height: 1.5 },
    label:     { size: '11px', weight: 500, height: 1, spacing: '0.15em', transform: 'uppercase', family: "'JetBrains Mono', monospace" },
  },

  font: {
    body: "'Noto Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  space: {
    xs:   '4px',
    sm:   '8px',
    md:   '16px',
    lg:   '24px',
    xl:   '40px',
    '2xl': '64px',
    '3xl': '100px',
  },

  shadow: {
    sm:   '0 2px 8px rgba(0,0,0,0.08)',
    md:   '0 4px 20px rgba(0,0,0,0.12)',
    lg:   '0 8px 40px rgba(0,0,0,0.16)',
    xl:   '0 20px 60px rgba(0,0,0,0.15)',
    glow: '0 0 30px rgba(0,175,240,0.3)',
    button: '0 4px 20px rgba(0,0,0,0.15)',
    buttonHover: '0 12px 40px rgba(0,0,0,0.2)',
    ctaBlue: '0 4px 14px rgba(0,175,240,0.35)',
    ctaBlueHover: '0 8px 24px rgba(0,175,240,0.3)',
  },

  transition: {
    fast:   '0.2s ease',
    normal: '0.3s ease',
    smooth: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    slow:   '0.6s ease',
  },

  radius: {
    sm:   '8px',
    md:   '14px',
    lg:   '20px',
    xl:   '24px',
    full: '9999px',
  },

  breakpoint: {
    tablet: 1024,
    mobile: 768,
    small: 480,
  },

  gradient: {
    cardHeaderDark: 'linear-gradient(135deg, #0f1419 0%, #1a2632 100%)',
    cardAccentBar: 'linear-gradient(90deg, #0369a1, #7ec8f2)',
    checkIcon: 'linear-gradient(135deg, #0369a1, #003CC8)',
    ctaBright: 'linear-gradient(135deg, #0369a1 0%, #003CC8 50%, #001080 100%)',
    navyDeep: 'linear-gradient(180deg, #000432 0%, #000864 100%)',
  },
};
