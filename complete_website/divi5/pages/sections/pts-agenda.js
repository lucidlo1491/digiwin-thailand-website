/**
 * pts-agenda.js — Production Transparency Seminar Agenda (S4)
 *
 * Thin data wrapper using event-agenda template.
 */

const template = require('../../lib/templates/event-agenda');

const DATA = {
  sectionPrefix: 'pts-agd',
  color: '#0369a1',
  label: 'Half-Day Agenda',
  title: 'A Structured Afternoon — Not a Sales Pitch',
  subtitle: "Every session is designed around what you'll take home — not what we want to sell.",
  items: [
    { time: '13:00 – 13:15', title: 'Registration & Networking', desc: 'Coffee, introductions, and a quick survey of your current production reporting process.', isBreak: false },
    { time: '13:15 – 14:00', title: 'Why Paper Reports Cost You More Than You Think', desc: 'The hidden costs of delayed production data — in scrap, rework, overtime, and missed delivery windows. Real examples from Thai factories.', isBreak: false },
    { time: '14:00 – 14:45', title: 'Live Demo — MES Dashboard Walk-Through', desc: 'A working MES dashboard with real factory data. See production status, quality alerts, and OEE tracking in real time — not slides.', isBreak: false },
    { time: '14:45 – 15:00', title: 'Coffee Break', desc: '', isBreak: true },
    { time: '15:00 – 15:45', title: 'Choosing the Right KPIs for Your Factory', desc: 'Not every metric matters equally. Learn how to select the production KPIs that drive real improvements for your specific manufacturing type.', isBreak: false },
    { time: '15:45 – 16:30', title: 'Panel: Real Factory Experiences with MES', desc: 'Hear directly from factory operators who made the transition from paper to digital. What worked, what surprised them, and what they\'d do differently.', isBreak: false },
    { time: '16:30 – 17:00', title: 'Q&A + Next Steps', desc: 'Open discussion, individual questions about your factory\'s situation, and guidance on where to start.', isBreak: false },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
