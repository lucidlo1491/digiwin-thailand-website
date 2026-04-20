/**
 * th-iat-outcomes.js — Thai Intelligent Asia Thailand 2026 Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-outcomes');

const DATA = {
  sectionPrefix: 'iat-out',
  color: '#0891b2',
  label: 'สิ่งที่คุณจะได้พบ',
  title: 'สามจุดเด่นหลักที่บูธ I132',
  outcomes: [
    {
      icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',
      title: 'ระบบ e-Tax และ BOI ครบวงจร',
      desc: 'ระบบที่ผ่านการรับรองจากกรมสรรพากรไทย รองรับ e-Tax, รายงาน BOI ในรูปแบบอิเล็กทรอนิกส์ และระบบภาษีศุลกากร — ระบบเดียวกันที่โรงงานไทยกว่า 100 แห่งใช้งานจริง',
    },
    {
      icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
      title: 'การเชื่อมต่อเชิงลึกสำหรับอุตสาหกรรมอิเล็กทรอนิกส์',
      desc: 'DigiWin ร่วมมือกับ Digihua Smart นำเสนอระบบ ERP + MES แบบบูรณาการ ออกแบบเฉพาะสำหรับอุตสาหกรรม SMT และอิเล็กทรอนิกส์ในไทย — ทำลายปัญหาข้อมูลไม่โปร่งใสในโรงงาน',
    },
    {
      icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      title: 'AI Smart Manufacturing — ระบบบูรณาการครบวงจร',
      desc: 'ไฮไลท์หลัก: ระบบ AI เชื่อมต่อการออกแบบ (CAD/PLM) การวางแผน (ERP/APS) และการผลิต (MES) ผ่านแพลตฟอร์มข้อมูลกลาง วิเคราะห์ด้วย AI เพื่อติดตามความคืบหน้าการผลิตและสถานะเครื่องจักรแบบ Real-time',
    },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
