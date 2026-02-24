/**
 * ftm-register.js — Factory Tour MES Registration CTA (S8)
 *
 * Thin data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register');

const DATA = {
  sectionPrefix: 'ftm-reg',
  color: '#b45309',
  title: "Request Your Visit",
  meta: 'Thursday, May 8, 2026 &middot; EEC Industrial Zone &middot; Limited to 20 visitors',
  cta: {"text":"Request Your Visit","href":"/contact/"},
  secondary: {"text":"Can't make this date?","linkText":"Register your interest","href":"/contact/"},
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
