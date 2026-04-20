/**
 * th-iat-personas.js — Thai Intelligent Asia Thailand 2026 Personas (S5)
 *
 * Thin data wrapper using event-personas template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-personas');

const DATA = {
  sectionPrefix: 'iat-per',
  color: '#0891b2',
  label: 'งานนี้เหมาะกับใคร',
  title: 'บูธนี้ตอบโจทย์คุณหรือไม่?',
  personas: [
    {
      role: 'เจ้าของโรงงานอิเล็กทรอนิกส์ / ผู้จัดการโรงงาน',
      size: 'กำลังมองหาระบบ ERP หรือ MES',
      desc: 'คุณต้องการเห็นระบบจริงที่ทำงานกับข้อมูลโรงงานไทย — ไม่ใช่แค่สไลด์ คุณต้องการเข้าใจว่าระบบไหนถูกสร้างมาเพื่อโรงงานอิเล็กทรอนิกส์โดยเฉพาะ พร้อมรองรับ e-Tax และ BOI ของไทย',
      quote: '"ผมต้องการเห็นระบบจริงที่รองรับ e-Tax และ BOI — ไม่ใช่แค่ PowerPoint"',
    },
    {
      role: 'ผู้ผลิตชาวไต้หวันหรือจีนในประเทศไทย',
      size: 'ต้องการทีมสนับสนุนสองภาษา',
      desc: 'คุณดำเนินการผลิตในไทยแต่สำนักงานใหญ่อยู่ไต้หวันหรือจีน คุณต้องการระบบที่เชื่อมข้อมูลข้ามประเทศได้ พร้อมทีมที่ปรึกษาที่พูดทั้งไทยและจีน เข้าใจทั้งสองวัฒนธรรม',
      quote: '"เราต้องการระบบเดียวที่เชื่อมโรงงานไทยกับสำนักงานใหญ่ที่ไต้หวันได้"',
    },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
