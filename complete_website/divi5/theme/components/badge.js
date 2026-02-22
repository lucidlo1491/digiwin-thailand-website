/**
 * badge.js — DigiWin Badge/Label Factory
 *
 * Generates CSS for badge and label variants.
 *
 * Usage:
 *   const { badgeCSS } = require('../../theme/components/badge');
 *   css() { return badgeCSS('blue', '.my-label'); }
 */

const T = require('../tokens');

/**
 * Generate CSS for a badge/label.
 * @param {string} color — 'blue' | 'navy' | 'green' | 'coral' | 'purple' | 'white'
 * @param {string} selector — CSS selector
 * @returns {string} CSS rules
 */
function badgeCSS(color, selector) {
  if (!selector) throw new Error('badgeCSS requires a selector');

  const colorMap = {
    blue:   { bg: 'rgba(0,175,240,0.15)', border: 'rgba(0,175,240,0.3)', text: T.color.blue },
    navy:   { bg: 'rgba(0,8,100,0.1)', border: 'rgba(0,8,100,0.2)', text: T.color.navy },
    green:  { bg: 'rgba(2,210,140,0.15)', border: 'rgba(2,210,140,0.3)', text: T.color.green },
    coral:  { bg: 'rgba(255,110,130,0.15)', border: 'rgba(255,110,130,0.3)', text: T.color.coral },
    purple: { bg: 'rgba(100,76,230,0.15)', border: 'rgba(100,76,230,0.3)', text: T.color.purple },
    white:  { bg: 'rgba(255,255,255,0.15)', border: 'rgba(255,255,255,0.3)', text: T.color.white },
  };

  const c = colorMap[color] || colorMap.blue;

  return `${selector}{display:inline-block;background:${c.bg};border:1px solid ${c.border};color:${c.text};font-family:${T.font.mono};font-size:${T.type.label.size};font-weight:${T.type.label.weight};padding:6px 14px;border-radius:${T.radius.full};text-transform:uppercase;letter-spacing:${T.type.label.spacing};line-height:1}`;
}

module.exports = { badgeCSS };
