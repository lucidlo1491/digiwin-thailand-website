/**
 * ftm-problem.js — Factory Tour MES Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem');

const DATA = {
  sectionPrefix: 'ftm-prob',
  color: '#b45309',
  label: 'The Challenge',
  title: "Seeing Is Believing — Screenshots Don't Replace Shop Floor Reality",
  bodyHTML: `
    <p>Every software vendor shows polished demo screens. Carefully curated dashboards with perfect data, running on a demo server somewhere, operated by a sales engineer who knows exactly which buttons to click. It looks great in a meeting room. But what matters is how the system works on an actual production floor — with real machines, real operators, and real problems happening in real time.</p>

    <p>The gap between a demo environment and a live factory is where most MES implementations fail. Operators who struggle with the interface. Data that doesn't flow because a sensor was misconfigured. Reports that look different when they're generated from actual production chaos instead of clean sample data. <strong>You can't evaluate these things from a conference room.</strong></p>

    <p>This factory visit gives you unfiltered access. Walk the production lines and see the screens operators actually use — not a curated demo. Ask workers directly about their experience with the system. Watch data flow live from CNC machines to the management dashboard and see how long it actually takes. This is the reality check that separates confident decisions from expensive guesses.</p>`,

};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
