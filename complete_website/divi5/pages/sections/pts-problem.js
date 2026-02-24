/**
 * pts-problem.js — Production Transparency Seminar Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem');

const DATA = {
  sectionPrefix: 'pts-prob',
  color: '#0369a1',
  label: 'The Challenge',
  title: 'Your Shop Floor Data Is Always a Day Behind',
  bodyHTML: `
    <p>Most Thai factories still rely on paper reports filled out at shift-end. Operators jot down production counts, note quality issues in handwriting, and pass clipboards to supervisors who key the numbers into spreadsheets the following morning. By the time management sees the data, it's already yesterday's news.</p>

    <p>The real cost isn't just the delay — it's the decisions made without current information. Managers allocate resources based on numbers that no longer reflect reality. Quality issues that could have been caught in minutes go unnoticed for hours, turning a small defect into an entire batch of scrap. A machine running below capacity doesn't get attention until tomorrow's report lands on someone's desk.</p>

    <p>The difference between catching a problem in real-time and discovering it a day later can be <strong>10x in cost</strong>. MES (Manufacturing Execution System) dashboards change this equation entirely — giving you live production visibility so you can act on what's happening now, not what happened yesterday.</p>`,
  dataCard: { from: 'Paper Reports', to: 'Real-Time Dashboards', label: 'Catch issues in minutes, not days' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
