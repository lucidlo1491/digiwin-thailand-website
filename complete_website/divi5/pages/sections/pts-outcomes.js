/**
 * pts-outcomes.js — Production Transparency Seminar Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 */

const template = require('../../lib/templates/event-outcomes');

const DATA = {
  sectionPrefix: 'pts-out',
  color: '#0369a1',
  label: 'Seminar Outcomes',
  title: "What You'll Walk Away With",
  outcomes: [
    { icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>', title: 'Understand the cost of delayed production visibility', desc: 'Quantify what late data actually costs your factory — in scrap, rework, missed deliveries, and overtime.' },
    { icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', title: 'See a live MES dashboard in action with real factory data', desc: 'Not slides or mockups — a working MES dashboard populated with real production data from a Thai factory.' },
    { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', title: 'Identify which production metrics matter most for your industry', desc: 'OEE, yield rate, cycle time, first-pass quality — learn which KPIs to track first based on your manufacturing type.' },
    { icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>', title: 'Build a business case for real-time shop floor digitization', desc: 'Leave with a framework to present the ROI of MES to your management team — grounded in real numbers, not vendor promises.' },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
