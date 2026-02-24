/**
 * mex-problem.js — Manufacturing Expo 2026 Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem');

const DATA = {
  sectionPrefix: 'mex-prob',
  color: '#6d28d9',
  label: 'Why Visit Our Booth',
  title: "Three Days to Explore the Full Manufacturing Intelligence Stack",
  bodyHTML: `
    <p>Trade shows let you compare vendors side by side — but most booths show generic slides, recycled marketing decks, and scripted pitches that tell you nothing about how the software actually works on a Thai factory floor.</p>

    <p>At the DigiWin booth, you'll see <strong>live software running with real Thai factory data</strong>. Not screenshots. Not PowerPoints. Actual ERP transactions, MES dashboards updating in real time, warehouse scanning workflows you can try yourself, and sensor data streaming from machines to analytics dashboards.</p>

    <p>Bring your specific questions — our Thai consultants speak your language and understand your industry. Whether you're evaluating ERP for the first time, looking to add MES or WMS to your existing system, or exploring how AIoT can connect your shop floor machines, this is the fastest way to understand what DigiWin can do for your factory.</p>`,
  dataCard: { from: 'Booth A12', to: null, label: 'Hall 1, BITEC Bangkok — look for the blue DigiWin banner' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
