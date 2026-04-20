/**
 * iat-logistics.js — Intelligent Asia Thailand 2026 Logistics (S7)
 *
 * Thin data wrapper using event-logistics template.
 */

const template = require('../../lib/templates/event-logistics');

const DATA = {
  sectionPrefix: 'iat-log',
  color: '#0891b2',
  label: 'Practical Details',
  title: 'Everything You Need to Know',
  items: [
    { icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', label: 'Dates', value: 'March 11–13, 2026 (Tuesday–Thursday)' },
    { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', label: 'Times', value: '10:00 – 18:00 daily' },
    { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', label: 'Location', value: 'BITEC Bangna, Bangkok' },
    { icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', label: 'Hall & Booth', value: 'EH 98, Booth I132' },
    { icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>', label: 'Cost', value: 'Free expo entry' },
    { icon: '<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>', label: 'Original Coverage', value: '<a href="https://www.digiwin.com.tw/news/3600.html" target="_blank" rel="noopener">Read full coverage on digiwin.com.tw</a>' },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
