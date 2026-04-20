/**
 * th-iat-logistics.js — Thai Intelligent Asia Thailand 2026 Logistics (S7)
 *
 * Thin data wrapper using event-logistics template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-logistics');

const DATA = {
  sectionPrefix: 'iat-log',
  color: '#0891b2',
  label: 'รายละเอียดสำคัญ',
  title: 'ข้อมูลที่คุณต้องรู้',
  items: [
    {
      icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      label: 'วันที่',
      value: '11–13 มีนาคม 2026 (อังคาร–พฤหัสบดี)',
    },
    {
      icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      label: 'เวลา',
      value: '10:00 – 18:00 ทุกวัน',
    },
    {
      icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
      label: 'สถานที่',
      value: 'ไบเทค บางนา, กรุงเทพฯ',
    },
    {
      icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
      label: 'หมายเลขบูธ',
      value: 'EH 98 Hall, บูธ I132',
    },
    {
      icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
      label: 'ค่าเข้าชม',
      value: 'เข้าชมฟรี',
    },
    {
      icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
      label: 'ข้อมูลเพิ่มเติม',
      value: '<a href="https://www.digiwin.com.tw/news/3600.html" target="_blank" rel="noopener">อ่านบทความต้นฉบับ</a>',
    },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
