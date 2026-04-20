/**
 * iat-problem.js — Intelligent Asia Thailand 2026 Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem');

const DATA = {
  sectionPrefix: 'iat-prob',
  color: '#0891b2',
  label: 'Why Visit',
  title: 'Thailand Is the Next Frontier for Electronics Manufacturing — Are You Ready?',
  bodyHTML: `
    <p>Thailand is rapidly becoming a strategic hub for PCB and electronics assembly, driven by BOI incentives and the national semiconductor strategy. Manufacturers setting up or expanding here face a unique set of challenges: Thai tax compliance (e-Tax, VAT, WHT), BOI audit requirements, and managing multilingual workforces across the shop floor.</p>

    <p>Most ERP systems weren't built for this environment. They don't handle Thai e-Tax filing natively. They can't produce BOI reconciliation reports at the production-order level. And they certainly don't connect <strong>design (CAD/PLM) → planning (ERP/APS) → production (MES)</strong> into a single, traceable data flow.</p>

    <p>At Booth I132, DigiWin Thailand is showing <strong>real solutions running with Thai factory data</strong> — not slides. Come see how 100+ Thai factories have solved these exact problems.</p>`,
  dataCard: { from: 'Booth I132', to: null, label: 'EH 98 Hall, BITEC Bangkok' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
