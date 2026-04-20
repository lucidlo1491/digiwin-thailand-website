/**
 * iat-outcomes.js — Intelligent Asia Thailand 2026 Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 */

const template = require('../../lib/templates/event-outcomes');

const DATA = {
  sectionPrefix: 'iat-out',
  color: '#0891b2',
  label: 'What You\'ll See',
  title: 'Three Core Advantages at Booth I132',
  outcomes: [
    { icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>', title: 'Full Tax & BOI Compliance', desc: 'DigiWin\'s system is certified by the Thai Revenue Department for e-Tax, BOI electronic format reporting, and customs/duty management — the compliance stack 100+ Thai factories rely on.' },
    { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', title: 'Electronics Industry Deep Integration', desc: 'In partnership with Digihua Smart, DigiWin delivers integrated ERP + MES solutions purpose-built for Thailand\'s SMT and electronics assembly sector — breaking through data opacity on the factory floor.' },
    { icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', title: 'AI Smart Manufacturing Integration', desc: 'The core highlight: AI-powered full-stack integration connecting design (CAD/PLM), planning (ERP/APS), and production (MES) via a unified data platform. Real-time production visibility and equipment monitoring through AI analytics.' },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
