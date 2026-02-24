/**
 * ftm-agenda.js — Factory Tour MES Agenda (S4)
 *
 * Thin data wrapper using event-agenda template.
 */

const template = require('../../lib/templates/event-agenda');

const DATA = {
  "sectionPrefix": "ftm-agen",
  "color": "#b45309",
  "label": "Tour Agenda",
  "title": "A Structured Visit — Not a Sales Tour",
  "subtitle": "Every stop is designed around what you need to evaluate — not what we want to showcase.",
  "items": [
    {
      "time": "10:00 – 10:30",
      "title": "Arrival & Safety Briefing",
      "desc": "Welcome, introductions, safety equipment distribution, and an overview of the factory's MES implementation journey."
    },
    {
      "time": "10:30 – 11:30",
      "title": "Factory Floor Tour — Production Lines with Live MES",
      "desc": "Walk the production lines and see DigiWin MES running on actual workstations. Watch operators report production, observe machine data collection, and see how exceptions are handled in real time."
    },
    {
      "time": "11:30 – 12:00",
      "title": "Management Dashboard Room — Real-Time Data in Action",
      "desc": "See how the data you just watched being collected on the shop floor appears on management dashboards — OEE, production progress, quality metrics, all updating live."
    },
    {
      "time": "12:00 – 13:00",
      "title": "Networking Lunch with Factory Management",
      "isBreak": true
    },
    {
      "time": "13:00 – 14:00",
      "title": "Q&A with Plant Manager & IT Team",
      "desc": "Open session to ask anything — implementation timeline, challenges they faced, operator adoption, integration with existing systems, and the real costs involved."
    },
    {
      "time": "14:00 – 14:45",
      "title": "Implementation Lessons Learned — What They'd Do Differently",
      "desc": "The factory team shares their honest retrospective — what went well, what surprised them, and the advice they'd give to someone starting the same journey."
    },
    {
      "time": "14:45 – 15:00",
      "title": "Wrap-Up & Next Steps",
      "desc": "Summary of key takeaways, individual questions, and guidance on your next steps toward evaluating MES for your factory."
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
