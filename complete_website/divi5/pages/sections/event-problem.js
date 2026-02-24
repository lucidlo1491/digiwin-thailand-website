/**
 * event-problem.js — BOI Compliance Workshop Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem');

const DATA = {
  sectionPrefix: 'evt-prob',
  color: '#15803d',
  label: 'The Challenge',
  title: 'Your Finance Team Spends Weeks Preparing for Every BOI Audit',
  bodyHTML: `
    <p>If your factory holds a BOI certificate — and if you're a manufacturer in Thailand, you almost certainly do — your compliance team is fighting a battle every audit cycle. They're manually reconciling import declarations against production records, building spreadsheets outside your ERP, and hoping the numbers align.</p>

    <p>The root cause is architectural: most ERP systems calculate material consumption from theoretical BOMs. But the <strong>BOI board doesn't audit your BOM</strong> — they audit your actual production consumption, order by order, material by material. When your system can't show that level of detail, the gap between theory and reality becomes supplementary tax.</p>

    <p>One factory was paying over <strong>10 million baht per year</strong> in that gap. This workshop shows you exactly how they eliminated it.</p>`,
  dataCard: { from: '10M+ THB/year', to: 'Zero', label: 'Annual supplementary tax — Jin Hai Factory' },
  caseLink: { text: 'Read the full Jin Hai case study', href: '/blog/boi-compliance-jin-hai/' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
