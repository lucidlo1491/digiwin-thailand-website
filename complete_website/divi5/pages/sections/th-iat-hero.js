/**
 * th-iat-hero.js — Thai Intelligent Asia Thailand 2026 Hero (S1)
 *
 * Thin data wrapper using event-hero template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-hero');

const DATA = {
  sectionPrefix: 'iat-hero',
  color: '#0891b2',
  badge: 'งานแสดงสินค้า',
  title: 'Intelligent Asia Thailand 2026',
  subtitle: 'DigiWin Thailand ร่วมกับ Digihua Smart เชิญพบปะทีมงานที่บูธ I132 — ชมระบบ e-Tax Compliance, AI Smart Manufacturing Integration และโซลูชันเชิงลึกสำหรับอุตสาหกรรมอิเล็กทรอนิกส์ พร้อมทีมที่ปรึกษาสองภาษา (ไทย-จีน) ให้คำปรึกษาตลอดงาน',
  backLink: {
    text: 'กลับไปข่าวสารและกิจกรรม',
    href: '/th/news/',
  },
  facts: [
    {
      icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      value: '11–13 มีนาคม 2026',
      label: 'อังคาร–พฤหัสบดี',
    },
    {
      icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      value: '10:00 – 18:00',
      label: 'ทุกวัน',
    },
    {
      icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
      value: 'ไบเทค บางนา, กรุงเทพฯ',
      label: 'EH 98 Hall, บูธ I132',
    },
    {
      icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
      value: 'เข้าชมฟรี',
      label: 'ไม่ต้องลงทะเบียน',
    },
  ],
  cta: {
    text: 'นัดหมายพบปะ',
    href: '/th/demo/',
  },
  superD: {
    variant: 'particle',
    position: 'corner-br',
    opacity: 0.15,
  },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
