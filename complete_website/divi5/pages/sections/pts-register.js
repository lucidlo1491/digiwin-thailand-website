/**
 * pts-register.js — Production Transparency Seminar Registration CTA (S8)
 *
 * Thin data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register');

const DATA = {
  sectionPrefix: 'pts-reg',
  color: '#0369a1',
  title: 'Reserve Your Seat',
  meta: 'Thursday, April 10, 2026 &middot; Bangkok &middot; Limited to 50 participants',
  cta: { text: 'Reserve Your Seat', href: '/contact/' },
  secondary: { text: "Can't make this date?", linkText: 'Register your interest', href: '/contact/' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
