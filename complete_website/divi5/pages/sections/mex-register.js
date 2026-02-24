/**
 * mex-register.js — Manufacturing Expo 2026 Registration CTA (S8)
 *
 * Thin data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register');

const DATA = {
  sectionPrefix: 'mex-reg',
  color: '#6d28d9',
  title: "Book a 1-on-1 Meeting",
  meta: 'May 20–22, 2026 &middot; BITEC Bangkok &middot; Booth A12',
  cta: {"text":"Book a 1-on-1 Meeting","href":"/contact/"},
  secondary: {"text":"No booking needed to visit","linkText":"Walk up to Booth A12 anytime","href":"/news/"},
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
