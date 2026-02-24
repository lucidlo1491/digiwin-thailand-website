/**
 * sfd-register.js — Shop Floor Data Workshop Registration CTA (S8)
 *
 * Thin data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register');

const DATA = {
  sectionPrefix: 'sfd-reg',
  color: '#15803d',
  title: "Reserve Your Spot",
  meta: 'Thursday, April 24, 2026 &middot; Bangkok &middot; Limited to 25 participants',
  cta: {"text":"Reserve Your Spot","href":"/contact/"},
  secondary: {"text":"Can't make this date?","linkText":"Register your interest","href":"/contact/"},
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
