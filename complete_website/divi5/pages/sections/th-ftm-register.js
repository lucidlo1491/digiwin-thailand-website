/**
 * th-ftm-register.js — Thai Factory Tour MES Register CTA (S8)
 *
 * Thin data wrapper using event-register template with Thai content.
 */

const template = require('../../lib/templates/event-register');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-reg',
  color: '#b45309',
  ...thFtm.register,
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
