/**
 * home-proven-results.js — Proven Results Teaser Section Builder
 *
 * ContentSpec §3.9 — 2 Case Study Cards
 * Uses: result-cards template
 */

const resultCards = require('../../lib/templates/result-cards');

const DATA = {
  adminLabel: 'Proven Results: 2 Case Studies',
  sectionPrefix: 'results',
  background: '#F5F7FA',
  header: {
    label: 'Proven Results',
    title: 'Real Outcomes from Thai Factories',
    subtitle: 'These aren\u2019t projections. These are results our clients achieved after going live.',
  },
  cards: [
    {
      company: 'Thai Alpha Polymer',
      metric: 'Month-end closing: 60 days to 15 days',
      detail: 'Stock accuracy reached 95% with Workflow ERP + WMS integration across their PET plastic roll operations.',
    },
    {
      company: 'Ginfong Precision Metal Stamping',
      metric: 'Revenue growth of 200%, margins from 23% to 34%',
      detail: 'Gross profit improved from 23% to 34% with ERP + SFT (Shop Floor Tracking) \u2014 even during the COVID period when competitors contracted.',
    },
  ],
  cta: { text: 'See all case studies \u2192', href: '/case-studies.html' },
};

module.exports = {
  blocks: () => resultCards.blocks(DATA),
  css: () => resultCards.css(DATA),
};
