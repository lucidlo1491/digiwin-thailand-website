/**
 * home-final-cta.js — Final CTA Banner Section Builder
 *
 * ContentSpec §3.10 — "Let's Start a Conversation"
 * Bright gradient background, cross pattern, two CTAs.
 * Decorative overlays: Super D gradient on left + wave-flow at bottom.
 *
 * REFACTORED: Uses cta-gradient template (53 → ~25 lines)
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: "Final CTA: Let's Start a Conversation",
  sectionPrefix: 'cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  title: "Let\u2019s Start a Conversation",
  subtitle: "We\u2019re eager to understand your challenges and explore how we can help. No pressure, no sales pitch\u2014just a genuine conversation about your manufacturing operations.",
  buttons: [
    { text: "Let\u2019s Talk", href: '/demo.html', style: 'primary' },
    { text: 'Explore Partnership', href: '/partner-program.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'left', opacity: 0.16 },
  waveFlow: { height: '220px', opacity: 0.45 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
