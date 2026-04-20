/**
 * iat-agenda.js — Intelligent Asia Thailand 2026 Agenda (S4)
 *
 * Thin data wrapper using event-agenda template.
 */

const template = require('../../lib/templates/event-agenda');

const DATA = {
  sectionPrefix: 'iat-agd',
  color: '#0891b2',
  label: 'Daily Schedule',
  title: 'Three Days of Live Demos & Consultations',
  subtitle: 'Same schedule runs March 11–13. Walk up anytime — no appointment needed.',
  items: [
    { time: '10:00 – 11:00', title: 'Open Booth', desc: 'Meet the DigiWin Thailand team. Browse solutions, ask questions, pick up materials.', isBreak: false },
    { time: '11:00 – 11:30', title: 'Live Demo: e-Tax & BOI Compliance with ERP', desc: 'See Thai Revenue Department e-Tax filing, BOI reconciliation reports, and customs/duty management running live.', isBreak: false },
    { time: '11:30 – 12:00', title: 'Live Demo: AI Smart Manufacturing Integration', desc: 'AI-powered production visibility connecting CAD/PLM design data through ERP/APS planning to MES execution.', isBreak: false },
    { time: '12:00 – 13:00', title: 'Lunch Break', desc: '', isBreak: true },
    { time: '13:00 – 13:30', title: 'Live Demo: Electronics Industry MES', desc: 'SMT line tracking, component traceability, SPC quality controls, and real-time OEE for PCB and electronics assembly.', isBreak: false },
    { time: '13:30 – 14:00', title: 'Live Demo: Full-Stack CAD→ERP→MES Integration', desc: 'End-to-end data flow from design through planning to production — every step tracked in one dashboard.', isBreak: false },
    { time: '14:00 – 17:30', title: 'Open Booth — 1-on-1 Consultations', desc: 'Dedicated time with DigiWin consultants. Bring your factory challenges — we\'ll show you relevant solutions.', isBreak: false },
    { time: '17:30 – 18:00', title: 'Daily Wrap-Up', desc: '', isBreak: true },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
