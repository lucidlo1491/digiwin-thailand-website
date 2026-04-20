/**
 * iat-personas.js — Intelligent Asia Thailand 2026 Personas (S5)
 *
 * Thin data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas');

const DATA = {
  sectionPrefix: 'iat-per',
  color: '#0891b2',
  label: 'Who Should Visit',
  title: 'Is This Booth Right for You?',
  personas: [
    { role: 'Electronics Factory Owner / Plant Manager', size: 'PCB or Assembly Operations', desc: 'You manufacture PCBs, electronic components, or handle assembly operations in Thailand. You need ERP that handles Thai tax compliance and MES that understands electronics production workflows.', quote: '"I need systems built for electronics manufacturing — not generic ERP adapted after the fact."' },
    { role: 'Taiwanese or Chinese Manufacturer in Thailand', size: 'Expanding to Southeast Asia', desc: 'You\'re establishing or growing operations in Thailand. You need a solution provider who speaks your language, understands Thai regulations, and has proven local implementation experience.', quote: '"I need a partner who understands both where I come from and where I\'m operating."' },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
