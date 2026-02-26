/**
 * th-ftm-hero.js — Thai Factory Tour MES Hero (S1)
 *
 * Thin data wrapper using event-hero template with Thai content.
 * Reuses English sectionPrefix, color, superD. All text from i18n.
 */

const template = require('../../lib/templates/event-hero');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-hero',
  color: '#b45309',
  ...thFtm.hero,
  superD: {
    variant: 'particle',
    position: 'corner-br',
    opacity: 0.15,
  },
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
