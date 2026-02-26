/**
 * th-ftm-outcomes.js — Thai Factory Tour MES Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template with Thai content.
 */

const template = require('../../lib/templates/event-outcomes');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-out',
  color: '#b45309',
  ...thFtm.outcomes,
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
