/**
 * sfd-problem.js — Shop Floor Data Workshop Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem');

const DATA = {
  sectionPrefix: 'sfd-prob',
  color: '#15803d',
  label: 'The Challenge',
  title: "Your Machines Are Running — But You Can't See What They're Doing",
  bodyHTML: `
    <p>Most factories have machines running 24/7, but the data those machines generate never makes it into a system anyone can act on. Operators manually log production counts on clipboards. Downtime is recorded on paper — if it's recorded at all. And OEE (Overall Equipment Effectiveness) calculations happen in Excel spreadsheets, days after the fact, based on numbers everyone knows are estimates.</p>

    <p>The gap between what your machines actually produce and what your system records is where profit leaks. Unplanned downtime goes undetected for hours. Quality defects get caught at end-of-line instead of at the source. And when management asks "what's our OEE?", the answer is a guess — not a measurement.</p>

    <p>This workshop teaches you how to close that gap. You'll work with real MES modules and IoT devices to build a <strong>live data pipeline from the shop floor to a dashboard</strong> — and you'll see production data update in real-time as machines run.</p>`,
  dataCard: { from: 'Paper Logs & Excel', to: 'Live OEE Dashboard', label: 'From manual recording to real-time machine data in one day' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
