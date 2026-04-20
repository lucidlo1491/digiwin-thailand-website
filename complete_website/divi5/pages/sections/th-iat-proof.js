/**
 * th-iat-proof.js — Thai Intelligent Asia Thailand 2026 Proof (S6)
 *
 * Thin data wrapper using event-proof template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-proof');

const DATA = {
  sectionPrefix: 'iat-prf',
  color: '#0891b2',
  label: 'ทำไมต้อง DigiWin',
  title: 'เรียนรู้จากทีมที่ทำสำเร็จมาแล้วกว่า 100 โครงการ',
  stats: [
    {
      value: '100+',
      label: 'โครงการในไทย',
    },
    {
      value: '44',
      label: 'ปีประสบการณ์ ERP การผลิต',
    },
    {
      value: '7',
      label: 'ปีให้บริการในประเทศไทย',
    },
    {
      value: '95%',
      label: 'อัตราต่อสัญญาบริการ',
    },
  ],
  text: 'DigiWin Thailand ให้บริการผู้ผลิตในไทยมากว่า 7 ปี ด้วยโซลูชัน ERP, MES, WMS และ AIoT ที่สร้างมาเพื่อหน้างานโรงงานโดยเฉพาะ ที่บูธของเรา คุณจะได้พบทีมที่ปรึกษาสองภาษาที่ลงมือทำจริง — ไม่ใช่พนักงานขายที่อ่านจากสคริปต์',
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
