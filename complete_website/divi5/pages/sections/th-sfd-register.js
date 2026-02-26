/**
 * th-sfd-register.js — Thai Shop Floor Data Workshop Registration CTA (S8)
 *
 * Thai data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register');
const th = require('../../i18n/th/shop-floor-data-workshop');

const DATA = {
  sectionPrefix: 'sfd-reg',
  color: '#15803d',
  title: th.register.title,
  meta: th.register.meta,
  cta: th.register.cta,
  secondary: th.register.secondary,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
