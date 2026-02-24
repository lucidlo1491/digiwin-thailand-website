/**
 * event-personas.js — BOI Compliance Workshop Personas (S5)
 *
 * Thin data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas');

const DATA = {
  sectionPrefix: 'evt-per',
  color: '#15803d',
  label: 'Who This Is For',
  title: 'Is This Workshop Right for You?',
  personas: [
    { role: 'Factory CFO / Finance Director', size: '50-500 Employees, BOI-Certified', desc: "You sign off on BOI compliance filings and worry about audit results every cycle. You need to understand your factory's compliance exposure.", quote: '"I need to know our compliance exposure — and whether our ERP is hiding gaps."' },
    { role: 'Production Manager / Plant Manager', size: 'Any Size, BOI-Certified', desc: "You run the shop floor and your data feeds the compliance reports. Production accuracy directly impacts your factory's BOI standing.", quote: '"I need my production data to match what finance reports — but right now it doesn\'t."' },
    { role: 'ERP / IT Manager', size: 'Evaluating or Upgrading ERP', desc: "You manage the system that's supposed to produce BOI reports. You need to know what production-order-level tracking actually requires.", quote: '"I need to know what production-order-level tracking actually requires from a system."' },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
