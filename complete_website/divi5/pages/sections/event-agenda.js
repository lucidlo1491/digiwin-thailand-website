/**
 * event-agenda.js — BOI Compliance Workshop Agenda (S4)
 *
 * Thin data wrapper using event-agenda template.
 */

const template = require('../../lib/templates/event-agenda');

const DATA = {
  sectionPrefix: 'evt-agd',
  color: '#15803d',
  label: 'Full-Day Agenda',
  title: 'A Structured Day — Not a Sales Pitch',
  subtitle: "Every session is designed around what you'll take home — not what we want to sell.",
  items: [
    { time: '09:00 – 09:30', title: 'Registration & Networking', desc: 'Coffee, introductions, and a quick survey of your current BOI compliance process.', isBreak: false },
    { time: '09:30 – 10:30', title: 'Why BOI Audits Fail', desc: "The gap between theoretical BOM consumption and actual production data — and why most ERPs can't bridge it.", isBreak: false },
    { time: '10:30 – 10:45', title: 'Coffee Break', desc: '', isBreak: true },
    { time: '10:45 – 12:00', title: 'The Jin Hai Case Study', desc: 'How one factory went from 10M+ THB/year in supplementary taxes to zero. Data walkthrough, not marketing slides.', isBreak: false },
    { time: '12:00 – 13:00', title: 'Networking Lunch', desc: '', isBreak: true },
    { time: '13:00 – 14:30', title: 'Hands-On: Building a Reconciliation Report', desc: "Working with sample production data, you'll build the exact report format BOI auditors want to see.", isBreak: false },
    { time: '14:30 – 14:45', title: 'Coffee Break', desc: '', isBreak: true },
    { time: '14:45 – 15:30', title: 'Assessing Your Current System', desc: "Framework for evaluating whether your ERP can produce production-order-level tracking — and what to do if it can't.", isBreak: false },
    { time: '15:30 – 16:00', title: 'Q&A + Next Steps', desc: 'Open discussion, individual compliance questions, and your take-home checklist.', isBreak: false },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
