/**
 * iat-register.js — Intelligent Asia Thailand 2026 Registration CTA (S8)
 *
 * Thin data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register');

const DATA = {
  sectionPrefix: 'iat-reg',
  color: '#0891b2',
  title: 'Visit Us at Booth I132',
  meta: 'March 11–13, 2026 &middot; BITEC Bangkok &middot; EH 98 Hall',
  cta: { text: 'Book a Meeting', href: '/demo/' },
  secondary: { text: 'No booking needed to visit', linkText: 'Walk up to Booth I132 anytime', href: '/news/' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
