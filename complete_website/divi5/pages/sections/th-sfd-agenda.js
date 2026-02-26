/**
 * th-sfd-agenda.js — Thai Shop Floor Data Workshop Agenda (S4)
 *
 * Thai data wrapper using event-agenda template.
 * Times stay as-is (English format), text is Thai.
 */

const template = require('../../lib/templates/event-agenda');
const th = require('../../i18n/th/shop-floor-data-workshop');

const DATA = {
  sectionPrefix: 'sfd-agen',
  color: '#15803d',
  label: th.agenda.label,
  title: th.agenda.title,
  subtitle: th.agenda.subtitle,
  items: th.agenda.items,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
