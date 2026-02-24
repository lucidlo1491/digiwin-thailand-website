/**
 * pts-personas.js — Production Transparency Seminar Personas (S5)
 *
 * Thin data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas');

const DATA = {
  sectionPrefix: 'pts-per',
  color: '#0369a1',
  label: 'Who This Is For',
  title: 'Is This Seminar Right for You?',
  personas: [
    { role: 'Factory Owner / Plant Manager', size: 'Any Size Manufacturing', desc: "You're responsible for overall factory performance but rely on end-of-day reports to understand what happened on the floor. You want visibility without having to walk over and ask.", quote: '"I need to know what\'s happening on my floor without walking over and asking."' },
    { role: 'Production / Operations Manager', size: '50-500 Employees', desc: "You manage daily production schedules and troubleshoot problems as they arise — but you can only fix what you can see. Paper forms give you yesterday's picture, not today's reality.", quote: '"I need data I can trust, not numbers from yesterday\'s paper forms."' },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
