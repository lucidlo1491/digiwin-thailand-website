/**
 * button.js — DigiWin Button Factory
 *
 * Generates CSS for button variants. Replaces copy-pasted button CSS
 * across section builders with a single source of truth.
 *
 * Usage:
 *   const { buttonCSS } = require('../../theme/components/button');
 *   css() { return buttonCSS('primary', 'md', '.my-btn'); }
 *
 * Variants: primary (blue bg), white (white bg, royal text), ghost (transparent, white text),
 *           outline (border only), cta (blue glow shadow)
 * Sizes: sm, md, lg
 */

const T = require('../tokens');

const SIZE = {
  sm: { padding: '10px 20px', fontSize: '14px' },
  md: { padding: '16px 32px', fontSize: '16px' },
  lg: { padding: '20px 40px', fontSize: '16px' },
};

/**
 * Generate CSS for a button.
 * @param {string} variant — 'primary' | 'white' | 'ghost' | 'outline' | 'cta'
 * @param {string} [size='md'] — 'sm' | 'md' | 'lg'
 * @param {string} selector — CSS selector (e.g. '.btn-white')
 * @returns {string} CSS rules
 */
function buttonCSS(variant, size = 'md', selector) {
  if (!selector) throw new Error('buttonCSS requires a selector');
  const s = SIZE[size] || SIZE.md;

  const base = `${selector}{font-family:${T.font.body};font-size:${s.fontSize};font-weight:600;padding:${s.padding};border-radius:${T.radius.sm};cursor:pointer;transition:all ${T.transition.smooth};text-decoration:none;display:inline-flex;align-items:center;gap:10px;line-height:1.6;border:none}`;

  switch (variant) {
    case 'primary':
      return `${base}
${selector}{background:${T.color.linkBlue};color:${T.color.white};box-shadow:${T.shadow.ctaBlue}}
${selector}:hover{background:${T.color.linkHover};transform:translateY(-2px);box-shadow:${T.shadow.ctaBlueHover}}`;

    case 'white':
      return `${base}
${selector}{background:${T.color.white};color:${T.color.royal};font-weight:600;box-shadow:${T.shadow.button}}
${selector}:hover{transform:translateY(-4px);box-shadow:${T.shadow.buttonHover}}`;

    case 'ghost':
      return `${base}
${selector}{background:transparent;color:${T.color.white};border:2px solid rgba(255,255,255,0.5)}
${selector}:hover{background:rgba(255,255,255,0.15);border-color:${T.color.white}}`;

    case 'outline':
      return `${base}
${selector}{background:transparent;color:${T.color.white};border:2px solid rgba(255,255,255,0.6)}
${selector}:hover{background:rgba(255,255,255,0.15);border-color:${T.color.white}}`;

    case 'cta':
      return `${base}
${selector}{background:${T.color.linkBlue};color:${T.color.white};box-shadow:${T.shadow.ctaBlue}}
${selector}:hover{background:${T.color.linkHover};transform:translateY(-2px);box-shadow:${T.shadow.ctaBlueHover}}`;

    default:
      return base;
  }
}

/**
 * Generate CSS for a button row (flex container for multiple buttons).
 * @param {string} selector — CSS selector (e.g. '.btn-row')
 * @returns {string} CSS rules
 */
function buttonRowCSS(selector) {
  return `${selector}{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;position:relative;z-index:2}`;
}

module.exports = { buttonCSS, buttonRowCSS };
