/**
 * i18n/th/aiot.js — Thai content for AIoT page (11 sections)
 *
 * Translation principles:
 * - Cultural adaptation, not literal translation
 * - Thai manufacturing idiom (โรงงาน, สายการผลิต, เครื่องจักร, เซ็นเซอร์)
 * - Product names stay English: AIoT, T100, iGP, sFLS, MES, WMS, ERP
 * - Stats/numbers identical to English source
 * - CTAs: "พูดคุยกับเรา" / "ติดต่อเรา" — never "จองการสาธิต"
 * - Spell out abbreviations on first use: AIoT (ปัญญาประดิษฐ์แห่งสรรพสิ่ง)
 * - Protocol names (OPC-UA, Modbus, MQTT, etc.) stay English
 *
 * Usage:
 *   const thAiot = require('../../i18n/th/aiot');
 *   // Section content: thAiot.hero, thAiot.section, etc.
 */

const shared = require('./_shared');

// ══════════════════════════════════════════════════════════════
// S1: HERO
// ══════════════════════════════════════════════════════════════

const hero = {
  adminLabel: 'Hero: AIoT (Thai)',
  badge: 'Industrial Intelligence Platform',
  title: 'เครื่องจักรของคุณ <span>รู้ทุกอย่าง</span><br>แต่คุณได้ยินมันหรือเปล่า?',
  subtitle: 'เครื่องจักรทุกเครื่องสร้างข้อมูลนับพันจุดทุกวัน DigiWin AIoT (ปัญญาประดิษฐ์แห่งสรรพสิ่ง) เก็บ วิเคราะห์ และแปลงข้อมูลเหล่านี้ให้เป็นความได้เปรียบทางการแข่งขัน',
  stats: [
    { value: '50+', label: 'โปรโตคอลที่รองรับ' },
    { value: '1M+', label: 'จุดข้อมูล/วัน' },
    { value: '< 1s', label: 'ตอบสนองแบบเรียลไทม์' },
  ],
  dashboard: {
    title: 'Live Sensor Data',
    liveBadge: 'Live',
    sensors: [
      { value: '78.4°C', label: 'อุณหภูมิ' },
      { value: '2.4 mm/s', label: 'การสั่นสะเทือน' },
      { value: '47.2 kW', label: 'กำลังไฟ' },
      { value: '1,847', label: 'RPM' },
    ],
    machines: [
      { name: 'CNC-M01', status: 'running', statusText: 'กำลังทำงาน' },
      { name: 'CNC-M02', status: 'idle', statusText: 'รอคิว' },
      { name: 'CNC-M03', status: 'running', statusText: 'กำลังทำงาน' },
    ],
  },
};

// ══════════════════════════════════════════════════════════════
// S2: SECTION (What is AIoT?)
// ══════════════════════════════════════════════════════════════

const section = {
  adminLabel: 'Section: AIoT คืออะไร? (Thai)',
  title: 'AIoT (Artificial Intelligence + Internet of Things) คืออะไร?',
  paragraph1: 'AIoT คือเทคโนโลยีที่เชื่อมต่อเครื่องจักรและเซ็นเซอร์ในโรงงาน เพื่อเก็บข้อมูลการผลิตแบบเรียลไทม์ จากนั้นใช้ AI วิเคราะห์เพื่อคาดการณ์ความต้องการซ่อมบำรุงและเพิ่มประสิทธิภาพ เปลี่ยนสัญญาณเครื่องจักรดิบให้เป็นข้อมูลที่ใช้ตัดสินใจได้ — ให้คุณป้องกันปัญหาก่อนเกิด แทนที่จะแก้ไขหลังเกิด',
  paragraph2: '<strong>DigiWin AIoT</strong> เป็นแพลตฟอร์ม Industrial IoT ที่เชื่อมต่อเครื่องจักรทุกยี่ห้อ ทุกโปรโตคอล เข้าสู่ชั้นข้อมูลเดียวกัน รองรับกว่า 50+ โปรโตคอลอุตสาหกรรม — รวมถึง OPC-UA, Modbus, MQTT, Fanuc, Siemens และ Mitsubishi — เก็บข้อมูลกว่า 1 ล้านจุดต่อวัน จากเครื่อง CNC, PLC, เซ็นเซอร์ และมิเตอร์ไฟฟ้า แพลตฟอร์มช่วยให้ติดตาม OEE แบบเรียลไทม์, ซ่อมบำรุงเชิงคาดการณ์, บริหารพลังงาน และติดตามสิ่งแวดล้อม โดยโรงงานไทยได้ OEE เพิ่มขึ้นเฉลี่ย 15% และลด Unplanned Downtime ลง 40%',
};

// ══════════════════════════════════════════════════════════════
// S3: PROBLEM
// ══════════════════════════════════════════════════════════════

const problem = {
  adminLabel: 'Problem: โรงงานส่วนใหญ่บินตาบอด (Thai)',
  title: 'โรงงานส่วนใหญ่บริหารแบบตาบอด',
  subtitle: 'เครื่องจักรของคุณพูดอยู่ แต่ถ้าไม่มีหูที่ใช่ คุณกำลังพลาดข้อมูลสำคัญ',
  cards: [
    {
      title: 'เครื่องจักรเงียบ',
      desc: 'เครื่องจักรทำงานโดยไม่รายงาน ปัญหาถูกพบหลังจากเครื่องเสียแล้วเท่านั้น',
    },
    {
      title: 'ซ่อมแบบตั้งรับ',
      desc: 'เสียแล้วค่อยซ่อม Downtime ที่ไม่ได้วางแผนมีต้นทุนมากกว่าการซ่อมบำรุงตามกำหนด 10 เท่า',
    },
    {
      title: 'OEE แบบแมนนวล',
      desc: 'พนักงานจดบันทึกการผลิตบนกระดาษ ข้อมูลมาช้า ไม่แม่นยำ หรือไม่ได้เก็บเลย',
    },
    {
      title: 'พลังงานสูญเปล่าที่มองไม่เห็น',
      desc: 'ไม่รู้ว่าเครื่องไหนกินไฟเท่าไหร่ ค่าไฟพุ่งโดยไม่มีคำอธิบาย',
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S4: DATAFLOW
// ══════════════════════════════════════════════════════════════

const dataflow = {
  adminLabel: 'Dataflow: วิธีการทำงาน (Thai)',
  title: 'DigiWin AIoT ทำงานอย่างไร',
  subtitle: 'จากสัญญาณเครื่องจักรสู่ข้อมูลเชิงลึกที่นำไปใช้ได้ทันที — แบบเรียลไทม์',
  stages: [
    {
      number: '1',
      title: 'เชื่อมต่อ',
      desc: 'Edge device เก็บข้อมูลจากเครื่องจักรทุกยี่ห้อ ทุกรุ่น ทุกอายุ',
      items: ['PLCs', 'CNCs', 'เซ็นเซอร์', 'มิเตอร์'],
    },
    {
      number: '2',
      title: 'แปลภาษา',
      desc: 'รองรับโปรโตคอลสากล เปลี่ยนสัญญาณให้เป็นข้อมูลมาตรฐาน',
      items: ['OPC-UA', 'Modbus', 'MQTT', 'MT Connect'],
    },
    {
      number: '3',
      title: 'วิเคราะห์',
      desc: 'โมเดล AI ตรวจจับรูปแบบ คาดการณ์ความเสียหาย ปรับประสิทธิภาพ',
      items: ['OEE', 'ความผิดปกติ', 'แนวโน้ม', 'การแจ้งเตือน'],
    },
    {
      number: '4',
      title: 'ลงมือทำ',
      desc: 'แดชบอร์ด การแจ้งเตือน และการเชื่อมต่อระบบ ขับเคลื่อนการตัดสินใจทันที',
      items: ['ERP', 'MES', 'มือถือ', 'Andon'],
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S5: CAPABILITIES
// ══════════════════════════════════════════════════════════════

const capabilities = {
  adminLabel: 'Capabilities: ความสามารถ Smart Factory (Thai)',
  title: 'ความสามารถ Smart Factory',
  subtitle: 'เห็นภาพครบตั้งแต่สัญญาณเครื่องจักรจนถึงข้อมูลเชิงธุรกิจ',
  cards: [
    {
      title: 'เชื่อมต่อเครื่องจักรสากล',
      desc: 'เชื่อมต่อเครื่องจักรทุกยี่ห้อ ทุกโปรโตคอล ทุกอายุ Edge device ของเราพูดได้ทุกภาษาที่โรงงานคุณใช้',
      features: ['เชื่อมต่อ PLC', 'เครื่อง CNC/SMT', 'เครือข่ายเซ็นเซอร์', 'อุปกรณ์เก่า'],
    },
    {
      title: 'OEE แบบเรียลไทม์',
      desc: 'คำนวณ OEE อัตโนมัติจากสัญญาณเครื่องจักร ดู Availability, Performance และ Quality โดยไม่ต้องป้อนข้อมูลเอง',
      features: ['ติดตาม Downtime อัตโนมัติ', 'วิเคราะห์ Cycle Time', 'ความสัมพันธ์คุณภาพ', 'เปรียบเทียบกะ'],
    },
    {
      title: 'ซ่อมบำรุงเชิงคาดการณ์',
      desc: 'โมเดล AI เรียนรู้พฤติกรรมเครื่องจักรของคุณ คาดการณ์ความเสียหายก่อนเกิด ซ่อมก่อนพัง',
      features: ['วิเคราะห์การสั่นสะเทือน', 'แนวโน้มอุณหภูมิ', 'ตรวจจับความผิดปกติ', 'ใบสั่งซ่อมอัตโนมัติ'],
    },
    {
      title: 'บริหารพลังงาน',
      desc: 'ติดตามการใช้พลังงานตามเครื่อง สายการผลิต และผลิตภัณฑ์ ค้นหาจุดสูญเปล่า ลดต้นทุน บรรลุเป้าหมายความยั่งยืน',
      features: ['ติดตามแบบเรียลไทม์', 'ต้นทุนต่อหน่วย', 'แจ้งเตือน Peak Demand', 'Carbon Footprint'],
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S6: METRICS
// ══════════════════════════════════════════════════════════════

const metrics = {
  adminLabel: 'Metrics: ผลลัพธ์ที่วัดได้ (Thai)',
  title: 'ผลลัพธ์ที่วัดได้จริง',
  subtitle: 'สิ่งที่ลูกค้าของเราทำได้หลังติดตั้ง AIoT',
  cards: [
    { value: '+15%', label: 'OEE เพิ่มขึ้น' },
    { value: '-40%', label: 'Unplanned Downtime ลดลง' },
    { value: '-12%', label: 'ค่าพลังงานลดลง' },
    { value: '100%', label: 'ความแม่นยำของข้อมูล' },
  ],
};

// ══════════════════════════════════════════════════════════════
// S7: PROTOCOL
// ══════════════════════════════════════════════════════════════

const protocol = {
  adminLabel: 'Protocol: โปรโตคอลที่รองรับ (Thai)',
  title: 'โปรโตคอลและอุปกรณ์ที่รองรับ',
  // Protocol names stay English — they are technical standards
  tags: [
    'OPC-UA', 'Modbus TCP/RTU', 'MQTT', 'MT Connect',
    'PROFINET', 'EtherNet/IP', 'Siemens S7', 'Mitsubishi MELSEC',
    'FANUC FOCAS', 'Allen-Bradley', 'Omron FINS', 'BACnet',
  ],
};

// ══════════════════════════════════════════════════════════════
// S8: INTEGRATION
// ══════════════════════════════════════════════════════════════

const integration = {
  adminLabel: 'Integration: ชั้นข้อมูลอัจฉริยะ (Thai)',
  title: 'ชั้นข้อมูลอัจฉริยะ',
  subtitle: 'AIoT เชื่อมต่อเครื่องจักรของคุณกับระบบธุรกิจ',
  nodes: [
    { title: 'ERP', subtitle: 'T100 / iGP', href: 'erp.html' },
    { title: 'MES', subtitle: 'MES / SFT', href: 'mes.html' },
    { title: 'AIoT', subtitle: 'ชั้นเครื่องจักร', active: true },
    { title: 'WMS', subtitle: 'sFLS', href: 'wms.html' },
  ],
  message: 'ข้อมูลเครื่องจักรไหลจากเซ็นเซอร์สู่แดชบอร์ดแบบเรียลไทม์ AIoT ส่ง OEE ไป MES, สั่งซ่อมบำรุงใน ERP และตรวจสอบสินค้าคงคลังใน WMS <strong>หนึ่งโรงงานที่เชื่อมต่อ ไม่มีจุดบอด</strong>',
  links: [
    { text: 'สำรวจ ERP', href: 'erp.html' },
    { text: 'สำรวจ MES', href: 'mes.html' },
    { text: 'สำรวจ WMS', href: 'wms.html' },
  ],
};

// ══════════════════════════════════════════════════════════════
// S9: FAQ (template: faq-accordion)
// ══════════════════════════════════════════════════════════════

const faq = {
  adminLabel: 'FAQ: AIoT (Thai)',
  sectionPrefix: 'aiot-faq',
  items: [
    {
      question: 'Industrial AIoT คืออะไร?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Industrial AIoT (Artificial Intelligence of Things — ปัญญาประดิษฐ์แห่งสรรพสิ่ง) ผสมผสานการเชื่อมต่อเซ็นเซอร์ IoT เข้ากับการวิเคราะห์ด้วย AI สำหรับการผลิต เชื่อมต่อเครื่องจักร PLC และเซ็นเซอร์ในโรงงานเข้าสู่แพลตฟอร์มข้อมูลเดียว ที่ติดตามสุขภาพอุปกรณ์ คำนวณ OEE อัตโนมัติ คาดการณ์ความเสียหายก่อนเกิด และปรับการใช้พลังงานให้เหมาะสม — เปลี่ยนข้อมูลดิบจากเครื่องจักรให้เป็นข้อมูลที่ใช้ตัดสินใจได้</p>',
    },
    {
      question: 'DigiWin AIoT รองรับเครื่องจักรและโปรโตคอลอะไรบ้าง?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin AIoT รองรับกว่า 50+ โปรโตคอลอุตสาหกรรม รวมถึง OPC-UA, Modbus TCP/RTU, MQTT, MT Connect, PROFINET, EtherNet/IP, Siemens S7, Mitsubishi MELSEC, FANUC FOCAS, Allen-Bradley, Omron FINS และ BACnet เชื่อมต่อได้ทั้งเครื่อง CNC, เครื่องฉีดพลาสติก, PLC, หุ่นยนต์, มิเตอร์ไฟฟ้า และเซ็นเซอร์สิ่งแวดล้อม จากทุกยี่ห้อและทุกอายุ</p>',
    },
    {
      question: 'ต้องเปลี่ยนเครื่องจักรเดิมหรือไม่ถึงจะใช้ AIoT ได้?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">ไม่ต้อง DigiWin AIoT ติดตั้งเพิ่มบนอุปกรณ์เดิมได้โดยไม่ต้องเปลี่ยนเครื่อง ไม่ว่าจะอายุหรือยี่ห้อใด Edge device เชื่อมต่อกับ PLC, CNC หรือเพิ่มเซ็นเซอร์ภายนอก (การสั่นสะเทือน, อุณหภูมิ, กำลังไฟ) กับเครื่องที่ไม่มี Digital Output แม้แต่เครื่องอายุ 20 ปีก็เชื่อมต่อได้โดยไม่ต้องดัดแปลงเครื่องจักร</p>',
    },
    {
      question: 'AIoT เชื่อมต่อกับ ERP และ MES อย่างไร?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin AIoT สร้างบนแพลตฟอร์มเดียวกับ DigiWin ERP และ MES ใช้ฐานข้อมูลร่วมกัน ข้อมูลเครื่องจักรไหลอัตโนมัติจากเซ็นเซอร์ผ่าน AIoT เข้า MES สำหรับคำนวณ OEE และเข้า ERP สำหรับใบสั่งซ่อมและต้นทุนการผลิต ไม่ต้องใช้ Middleware ไม่ต้องป้อนข้อมูลเอง ไม่ต้องมีโปรเจกต์ Integration แยก</p>',
    },
    {
      question: 'ROI ที่คาดหวังจาก Factory AIoT เป็นอย่างไร?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">ลูกค้า DigiWin AIoT โดยทั่วไปได้ OEE เพิ่มขึ้น 15%, Unplanned Downtime ลดลง 40% และค่าพลังงานลดลง 12% โรงงานส่วนใหญ่คืนทุนภายใน 6-12 เดือน ผลลัพธ์ที่เห็นทันทีมาจากการลดการเก็บข้อมูลด้วยมือ และทำให้สถานะเครื่องจักรมองเห็นได้แบบเรียลไทม์</p>',
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S10: CTA (template: cta-gradient)
// ══════════════════════════════════════════════════════════════

const cta = {
  adminLabel: 'CTA: เริ่มฟังเครื่องจักรของคุณ (Thai)',
  title: 'เริ่มฟังเครื่องจักรของคุณ',
  subtitle: 'ดูว่าสายการผลิตของคุณเป็นอย่างไรจริงๆ',
  buttons: [
    { text: shared.cta.getInTouch, href: '/demo.html', style: 'primary' },
    { text: shared.cta.exploreSolutions, href: '/products.html', style: 'ghost' },
  ],
};

// ══════════════════════════════════════════════════════════════
// S11: RELATED SOLUTIONS (template: related-solutions)
// ══════════════════════════════════════════════════════════════

const relatedSolutions = {
  sectionPrefix: 'aiot-related',
  cards: [
    { title: 'ERP', href: '/products/erp/', desc: 'ระบบ ERP สำหรับโรงงานผลิตครบวงจร — ตั้งแต่ BOM ถึงบัญชีการเงินถึง BOI' },
    { title: 'MES', href: '/products/mes/', desc: 'ระบบบริหารการผลิตแบบเรียลไทม์ — ติดตาม OEE, SPC และใบสั่งผลิตแบบไร้กระดาษ' },
    { title: 'WMS', href: '/products/wms/', desc: 'ระบบบริหารคลังสินค้าอัจฉริยะ Barcode/RFID — ตั้งแต่รับเข้าถึงจัดส่ง พร้อม Traceability เต็มรูปแบบ' },
    { title: 'Automotive', href: '/industries/automotive/', desc: 'ระบบ ERP และ MES ที่ออกแบบเฉพาะสำหรับผู้ผลิตชิ้นส่วนยานยนต์และ OEM Supplier' },
    { title: 'Electronics', href: '/industries/electronics/', desc: 'ซอฟต์แวร์การผลิตสำหรับงานประกอบอิเล็กทรอนิกส์ สาย SMT และ Component Traceability' },
    { title: 'Metal &amp; Plastics', href: '/industries/metal-plastics/', desc: 'โซลูชันครบวงจรสำหรับ Die Casting, ฉีดพลาสติก และโรงงานขึ้นรูปโลหะ' },
  ],
};

module.exports = {
  hero,
  section,
  problem,
  dataflow,
  capabilities,
  metrics,
  protocol,
  integration,
  faq,
  cta,
  relatedSolutions,
};
