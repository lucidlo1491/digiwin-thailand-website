/**
 * th-ftm-proof.js — Thai Factory Tour MES Proof (S6)
 *
 * Thin data wrapper using event-proof template with Thai content.
 */

const template = require('../../lib/templates/event-proof');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-prf',
  color: '#b45309',
  ...thFtm.proof,
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
