/**
 * th-iat-agenda.js — Thai Intelligent Asia Thailand 2026 Agenda (S4)
 *
 * Thin data wrapper using event-agenda template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-agenda');

const DATA = {
  sectionPrefix: 'iat-agen',
  color: '#0891b2',
  label: 'ตารางบูธ',
  title: 'ตารางกิจกรรม — ทั้ง 3 วัน',
  subtitle: 'ทุกการสาธิตจัดแสดงทุกวัน 11–13 มีนาคม 2026 นัดหมาย 1-on-1 สำหรับการปรึกษาเฉพาะโรงงานของคุณ',
  items: [
    {
      time: '10:00 – 11:00',
      title: 'บูธเปิด — เดินชมตามสะดวก',
      desc: 'เดินชมสถานีสาธิต รับเอกสารผลิตภัณฑ์ และพูดคุยกับทีมงาน ไม่ต้องนัดหมายล่วงหน้า',
    },
    {
      time: '11:00 – 11:30',
      title: 'สาธิต: ระบบ e-Tax และ BOI Compliance',
      desc: 'ระบบ e-Tax เชื่อมกรมสรรพากร, รายงาน BOI อัตโนมัติ และ Thai Localization ครบวงจร',
    },
    {
      time: '11:30 – 12:00',
      title: 'สาธิต: AI Smart Manufacturing (CAD/PLM → ERP/APS → MES)',
      desc: 'การเชื่อมต่อ Full-Stack ตั้งแต่ออกแบบจนถึงหน้างาน — ข้อมูลไหลต่อเนื่องแบบ Real-time',
    },
    {
      time: '12:00 – 13:00',
      title: 'พักกลางวัน',
      desc: 'บูธยังเปิดให้เดินชม',
      isBreak: true,
    },
    {
      time: '13:00 – 13:30',
      title: 'สาธิต: MES สำหรับอุตสาหกรรมอิเล็กทรอนิกส์',
      desc: 'ระบบ MES เฉพาะสำหรับ PCB/SMT — OEE Monitoring, Traceability และ Quality Alerts แบบ Real-time',
    },
    {
      time: '13:30 – 14:00',
      title: 'สาธิต: Full-Stack Integration Demo',
      desc: 'ชมระบบครบวงจรทำงานจริง — ERP → APS → MES → IoT ข้อมูลไหลตั้งแต่ใบสั่งจนถึงเครื่องจักร',
    },
    {
      time: '14:00 – 17:30',
      title: 'บูธเปิด — นัดหมายปรึกษา 1-on-1',
      desc: 'จองเวลาหรือเดินเข้ามาพูดคุยเกี่ยวกับความต้องการเฉพาะของโรงงานคุณ ทีมสองภาษาพร้อมให้คำปรึกษา',
    },
    {
      time: '17:30 – 18:00',
      title: 'สรุปกิจกรรมประจำวัน',
      isBreak: true,
    },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
