/**
 * th-mex-register.js — Thai Manufacturing Expo 2026 Registration CTA (S8)
 *
 * Same event-register template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 */

const template = require('../../lib/templates/event-register');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

const DATA = {
  sectionPrefix: 'mex-reg',
  color: '#6d28d9',
  title: thMex.register.title,
  meta: thMex.register.meta,
  cta: thMex.register.cta,
  secondary: thMex.register.secondary,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
