/**
 * event-register.js — BOI Compliance Workshop Registration CTA (S8)
 *
 * Thin data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register');

const DATA = {
  sectionPrefix: 'evt-reg',
  color: '#15803d',
  title: 'Secure Your Spot',
  meta: 'Saturday, March 15, 2026 &middot; Bangkok &middot; Limited to 30 participants',
  cta: { text: 'Register Now', href: '/contact/' },
  secondary: { text: "Can't make this date?", linkText: 'Register your interest', href: '/contact/' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
