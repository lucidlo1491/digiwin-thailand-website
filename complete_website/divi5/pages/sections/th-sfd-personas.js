/**
 * th-sfd-personas.js — Thai Shop Floor Data Workshop Personas (S5)
 *
 * Thai data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas');
const th = require('../../i18n/th/shop-floor-data-workshop');

const DATA = {
  sectionPrefix: 'sfd-per',
  color: '#15803d',
  label: th.personas.label,
  title: th.personas.title,
  personas: th.personas.personas,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
