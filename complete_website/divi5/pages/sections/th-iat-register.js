/**
 * th-iat-register.js — Thai Intelligent Asia Thailand 2026 Registration CTA (S8)
 *
 * Thin data wrapper using event-register template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-register');

const DATA = {
  sectionPrefix: 'iat-reg',
  color: '#0891b2',
  title: 'เยี่ยมชมบูธ I132',
  meta: '11–13 มีนาคม 2026 &middot; ไบเทค บางนา &middot; EH 98 Hall, บูธ I132',
  cta: { text: 'นัดหมายพบปะ', href: '/th/demo/' },
  secondary: { text: 'ไม่ต้องจอง —', linkText: 'เดินเข้ามาที่บูธ I132 ได้ทุกเวลา', href: '/th/news/' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
