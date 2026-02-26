/**
 * th-home-hero.js — Thai Homepage Hero (Deep Merge Pattern prototype)
 *
 * Strategy B (refined): Deep merge via panel ID lookup.
 * Reuses English layout + SVG functions. Only Thai text is new.
 *
 * Template: hero-gradient (same as English)
 */

const heroGradient = require('../../lib/templates/hero-gradient');
const enHero = require('./home-hero');
const thHome = require('../../i18n/th/home');

// ════════════════════════════════════════════════════════════════
// DEEP MERGE — merge Thai content into English panels by ID
// ════════════════════════════════════════════════════════════════

const DATA = {
  ...enHero.DATA,
  adminLabel: thHome.hero.adminLabel,
  panels: enHero.DATA.panels.map(panel => ({
    ...panel,                           // English layout (gradient, svgRaw, headingTag, etc.)
    ...thHome.hero.panels[panel.id],    // Thai content (label, title, subtitle, buttons, stats)
  })),
};

// Thai font override — applied at page level via css-assembler thaiTypographyCSS
const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE === */
.hero-title, .hero-subtitle, .hero-label--factory, .hero-label--partner,
.hero-stat-label, .hero-btn--primary, .hero-btn--ghost {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  DATA,
  blocks: () => heroGradient.blocks(DATA),
  css: () => heroGradient.css(DATA) + THAI_FONT_CSS,
};
