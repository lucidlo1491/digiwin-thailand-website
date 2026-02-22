/**
 * card.js — DigiWin Card Factory
 *
 * Generates CSS for card variants. Replaces 270+ lines of inline card CSS
 * per section builder with a centralized component.
 *
 * Usage:
 *   const { cardCSS } = require('../../theme/components/card');
 *   css() { return cardCSS('product', '.product-card'); }
 *
 * Types: basic (white, shadow), dark (navy bg, glow), product (header gradient + body),
 *        feature (icon top, white bg), trust (callout box)
 */

const T = require('../tokens');

/**
 * Generate CSS for a card.
 * @param {string} type — 'basic' | 'dark' | 'product' | 'feature' | 'trust'
 * @param {string} selector — CSS selector prefix (e.g. '.product-card')
 * @returns {string} CSS rules
 */
function cardCSS(type, selector) {
  if (!selector) throw new Error('cardCSS requires a selector');

  switch (type) {
    case 'basic':
      return basicCard(selector);
    case 'dark':
      return darkCard(selector);
    case 'product':
      return productCard(selector);
    case 'feature':
      return featureCard(selector);
    case 'trust':
      return trustCard(selector);
    default:
      return basicCard(selector);
  }
}

function basicCard(s) {
  return `${s}{background:${T.color.white};border-radius:${T.radius.lg};overflow:hidden;border:2px solid ${T.color.border};padding:32px;transition:all ${T.transition.smooth}}
${s}:hover{border-color:${T.color.linkBlue};box-shadow:${T.shadow.xl}}`;
}

function darkCard(s) {
  return `${s}{background:linear-gradient(135deg,rgba(0,8,100,0.8),rgba(0,4,50,0.9));border-radius:${T.radius.lg};overflow:hidden;border:1px solid rgba(0,175,240,0.15);padding:32px;transition:all ${T.transition.smooth};backdrop-filter:blur(10px)}
${s}:hover{border-color:rgba(0,175,240,0.4);box-shadow:${T.shadow.glow};transform:translateY(-4px)}`;
}

function productCard(s) {
  return `/* Product card — container */
${s}{background:${T.color.white};border-radius:${T.radius.xl};overflow:hidden;border:2px solid ${T.color.border};padding:32px;transition:all ${T.transition.smooth}}
${s}:hover{border-color:${T.color.linkBlue};box-shadow:0 20px 60px rgba(3,105,161,0.15)}
/* Product card — header with gradient */
${s}-header{padding:36px 36px 28px;background:${T.gradient.cardHeaderDark};position:relative}
${s}-header::after{content:'';position:absolute;bottom:0;left:0;right:0;height:4px;background:${T.gradient.cardAccentBar}}
/* Product card — badge */
${s}-badge{display:inline-block;background:rgba(0,175,240,0.2);border:1px solid rgba(0,175,240,0.3);color:#7ec8f2;font-family:${T.font.mono};font-size:10px;font-weight:500;padding:6px 14px;border-radius:${T.radius.full};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:${T.space.md};line-height:1.6}
/* Product card — name */
${s}-name{font-family:${T.font.body};font-size:${T.type.headingMd.size};font-weight:${T.type.headingMd.weight};color:${T.color.navy};margin-bottom:12px;line-height:1.6}
/* Product card — tagline + desc */
${s}-tagline,${s}-desc{font-family:${T.font.body};font-size:${T.type.bodySm.size};color:${T.color.textSlate};line-height:1.6;margin-bottom:${T.space.md}}
/* Product card — body */
${s}-body{padding:0}`;
}

function featureCard(s) {
  return `${s}{background:${T.color.white};border-radius:${T.radius.lg};overflow:hidden;border:1px solid ${T.color.border};padding:${T.space.lg};transition:all ${T.transition.smooth}}
${s}:hover{border-color:${T.color.blue};box-shadow:${T.shadow.md};transform:translateY(-2px)}
${s}-icon{width:48px;height:48px;border-radius:12px;background:${T.gradient.checkIcon};display:flex;align-items:center;justify-content:center;margin-bottom:${T.space.md}}
${s}-icon svg{width:24px;height:24px;stroke:${T.color.white};stroke-width:2;fill:none}`;
}

function trustCard(s) {
  return `${s}{display:flex;gap:${T.space.md};background:${T.color.grayLight};border-radius:12px;padding:20px 24px;margin-top:${T.space.lg}}
${s}-icon{width:44px;height:44px;background:${T.gradient.checkIcon};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
${s}-icon svg{width:22px;height:22px;stroke:${T.color.white};stroke-width:1.5;fill:none}
${s}-title{font-family:${T.font.body};font-size:${T.type.bodySm.size};font-weight:600;color:${T.color.navy};margin-bottom:4px}
${s}-body{font-family:${T.font.body};font-size:${T.type.bodyXs.size};color:${T.color.textLight};line-height:1.5}`;
}

/**
 * Generate CSS for a feature list inside a card (checkmark items).
 * @param {string} selector — CSS selector (e.g. '.product-features')
 * @returns {string} CSS rules
 */
function featureListCSS(selector) {
  return `${selector}{list-style:none;padding:0;margin:0 0 28px 0}
${selector} li{font-family:${T.font.body};font-size:15px;color:${T.color.navy};padding:12px 0;border-bottom:1px solid ${T.color.borderLight};display:flex;align-items:center;gap:14px;line-height:1.6}
${selector} li:last-child{border-bottom:none}
${selector} .check-icon{width:22px;height:22px;background:${T.gradient.checkIcon};border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
${selector} .check-icon svg{width:12px;height:12px;stroke:${T.color.white};stroke-width:3;fill:none}`;
}

/**
 * Generate CSS for a "Best For" box inside a product card.
 * @param {string} selector — CSS selector (e.g. '.product-best-for')
 * @returns {string} CSS rules
 */
function bestForCSS(selector) {
  return `${selector}{background:${T.color.grayLight};border-radius:12px;padding:20px 24px;margin-bottom:${T.space.lg}}
${selector}-label{font-family:${T.font.mono};font-size:${T.type.label.size};font-weight:${T.type.label.weight};color:${T.color.linkBlue};text-transform:uppercase;letter-spacing:${T.type.label.spacing};margin-bottom:${T.space.sm}}
${selector}-text{font-family:${T.font.body};font-size:${T.type.bodySm.size};color:${T.color.textLight};line-height:1.5}`;
}

module.exports = { cardCSS, featureListCSS, bestForCSS };
