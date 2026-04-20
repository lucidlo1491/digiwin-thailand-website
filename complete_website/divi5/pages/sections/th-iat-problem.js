/**
 * th-iat-problem.js — Thai Intelligent Asia Thailand 2026 Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-problem');

const DATA = {
  sectionPrefix: 'iat-prob',
  color: '#0891b2',
  label: 'ทำไมต้องมาเยี่ยมชมบูธเรา',
  title: 'ประเทศไทยคือฐานการผลิตอิเล็กทรอนิกส์ที่สำคัญ — แต่ความท้าทายด้านภาษีและ BOI ยังคงเป็นอุปสรรค',
  bodyHTML: `
    <p>โรงงานอิเล็กทรอนิกส์ในไทยกำลังเผชิญแรงกดดันจากหลายด้าน — ข้อกำหนด e-Tax ใหม่จากกรมสรรพากร, การตรวจสอบ BOI ที่เข้มงวดขึ้น และความต้องการระบบ Traceability แบบครบวงจรจากลูกค้าต่างชาติ</p>

    <p>ที่บูธ DigiWin คุณจะได้เห็น<strong>ระบบจริงที่ทำงานอยู่ในโรงงานไทย</strong> — ไม่ใช่สไลด์หรือ PowerPoint แต่เป็นระบบ e-Tax ที่เชื่อมกรมสรรพากรได้ทันที, MES ที่ติดตามการผลิตแบบ Real-time และการเชื่อมต่อ CAD/PLM → ERP/APS → MES แบบ Full-Stack</p>

    <p>DigiWin Thailand ให้บริการในไทยมากว่า 7 ปี ด้วยทีมที่ปรึกษาสองภาษา (ไทย-จีน) ที่เข้าใจอุตสาหกรรมอิเล็กทรอนิกส์และข้อกำหนดเฉพาะของประเทศไทย ไม่ว่าคุณกำลังมองหาระบบ ERP ใหม่ หรือต้องการเพิ่ม MES เข้ากับระบบที่มีอยู่ นี่คือโอกาสที่ดีที่สุดในการทำความเข้าใจสิ่งที่ DigiWin ทำได้สำหรับโรงงานของคุณ</p>`,
  dataCard: { from: 'บูธ I132', to: null, label: 'EH 98 Hall, ไบเทค บางนา' },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
