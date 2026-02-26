/**
 * i18n/th/electronics.js — Thai content for Electronics industry page (10 sections)
 *
 * Translation principles:
 * - Cultural adaptation, not literal translation
 * - Thai manufacturing idiom: อิเล็กทรอนิกส์, เซมิคอนดักเตอร์, PCB, SMT, รีล, บอร์ด
 * - Product/brand names stay English: DigiWin, MES, WMS, ERP, AIoT, sFLS, BOI
 * - Equipment brands stay English: Fuji, Panasonic, Yamaha, Juki, ASM, Koh Young, etc.
 * - Technical terms stay English: SMT, AOI, ICT, MSD, OEE, SPC, BOM, RFID
 * - Stats/numbers identical to English source
 * - CTAs: "พูดคุยกับเรา" / "ติดต่อเรา" — never "จองการสาธิต"
 *
 * Usage:
 *   const thElec = require('../../i18n/th/electronics');
 *   // Section content: thElec.hero, thElec.context, etc.
 */

const shared = require('./_shared');

// ══════════════════════════════════════════════════════════════
// S1: HERO
// ══════════════════════════════════════════════════════════════

const hero = {
  adminLabel: 'Hero: Electronics (Thai)',
  badge: 'Electronics Assembly',
  title: 'ความแม่นยำสำหรับการผลิต <span>High-Mix</span>',
  subtitle: 'ชิ้นส่วนนับพันต่อบอร์ด วงจรผลิตภัณฑ์ที่เปลี่ยนเร็ว Traceability ครบทุกจุด ออกแบบมาเฉพาะสำหรับความซับซ้อนของอิเล็กทรอนิกส์',
  stats: [
    { value: '1000+', label: 'ประเภทชิ้นส่วนที่ติดตาม' },
    { value: '99.9%', label: 'ความแม่นยำในการหยิบ' },
    { value: '-45%', label: 'ลดของเสียจาก MSD' },
  ],
};

// ══════════════════════════════════════════════════════════════
// S2: CONTEXT
// ══════════════════════════════════════════════════════════════

const context = {
  adminLabel: 'Context: ระบบนิเวศอิเล็กทรอนิกส์ไทย (Thai)',
  title: 'ระบบนิเวศอิเล็กทรอนิกส์ของประเทศไทย',
  paragraph: 'ประเทศไทยส่งออก<strong>อิเล็กทรอนิกส์มูลค่ากว่า 40,000 ล้านดอลลาร์สหรัฐต่อปี</strong> ตั้งแต่ฮาร์ดดิสก์ไดรฟ์ไปจนถึงอิเล็กทรอนิกส์ยานยนต์และอุปกรณ์อิเล็กทรอนิกส์สำหรับผู้บริโภค ผู้ผลิตอิเล็กทรอนิกส์เผชิญกับความซับซ้อนเฉพาะตัว: <strong>ชิ้นส่วนหลายร้อยรายการต่อผลิตภัณฑ์</strong> การเปลี่ยนงานบ่อยครั้งสำหรับการผลิตแบบ High-Mix และชิ้นส่วนที่ไวต่อความชื้นซึ่งต้องการการจัดการอย่างแม่นยำ DigiWin MES ถูกสร้างมาเฉพาะสำหรับความท้าทายนี้',
};

// ══════════════════════════════════════════════════════════════
// S3: CHALLENGES
// ══════════════════════════════════════════════════════════════

const challenges = {
  adminLabel: 'Challenges: ความท้าทายในการผลิตอิเล็กทรอนิกส์ (Thai)',
  title: 'ความท้าทายในการผลิตอิเล็กทรอนิกส์',
  subtitle: 'ความซับซ้อนที่ระบบทั่วไปจัดการไม่ได้',
  cards: [
    {
      title: 'ชิ้นส่วนวุ่นวาย',
      desc: 'ชิ้นส่วนหลายร้อยรายการต่อผลิตภัณฑ์ รีลนับพันในคลังสินค้า วางชิ้นส่วนผิดเพียงตัวเดียว = ทิ้งทั้งล็อต',
    },
    {
      title: 'เปลี่ยนงานบ่อย',
      desc: 'การผลิตแบบ High-Mix, Low-Volume หมายถึงการเปลี่ยนงานตลอดเวลา ทุกนาทีของเวลาตั้งเครื่องคือกำลังการผลิตที่สูญเสียไป',
    },
    {
      title: 'ชิ้นส่วนไวต่อความชื้น',
      desc: 'ชิ้นส่วน MSD ที่หมดอายุหลังสัมผัสอากาศ ติดตามหรือทิ้ง การติดตามด้วยมือไม่ทันกับจังหวะการผลิต',
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S4: SOLUTIONS
// ══════════════════════════════════════════════════════════════

const solutions = {
  adminLabel: 'Solutions: DigiWin แก้ปัญหาอย่างไร (Thai)',
  title: 'DigiWin แก้ปัญหาอย่างไร',
  subtitle: 'ความสามารถที่ออกแบบมาเฉพาะสำหรับการประกอบอิเล็กทรอนิกส์',
  cards: [
    {
      title: 'เชื่อมต่อเครื่อง SMT',
      desc: 'เชื่อมต่อโดยตรงกับเครื่อง Pick-and-Place ตรวจสอบรีลก่อนติดตั้ง ป้องกันข้อผิดพลาดจากชิ้นส่วนผิดตั้งแต่ต้นทาง',
      features: ['ตรวจสอบรีลที่ Feeder', 'ป้องกันชิ้นส่วนผิด', 'ดาวน์โหลดโปรแกรมอัตโนมัติ'],
    },
    {
      title: 'Traceability ระดับชิ้นส่วน',
      desc: 'ติดตามทุกรีลไปยังทุกตำแหน่งบนบอร์ด รู้แน่ชัดว่าชิ้นส่วนไหนอยู่ในผลิตภัณฑ์ไหน',
      features: ['เชื่อมโยงรีลกับซีเรียลนัมเบอร์', 'ตรวจสอบย้อนกลับได้ครบทั้งสองทาง', 'ลดขอบเขตการ Recall'],
    },
    {
      title: 'จัดการ MSD',
      desc: 'ติดตาม Floor Life อัตโนมัติสำหรับชิ้นส่วนที่ไวต่อความชื้น ระบบแจ้งเตือนก่อนหมดอายุเพื่อลดของเสีย',
      features: ['นับถอยหลัง Floor Life อัตโนมัติ', 'ติดตามรอบ Bake-Out', 'แจ้งเตือนและบล็อกเมื่อหมดอายุ'],
    },
    {
      title: 'เชื่อมต่อ AOI/ICT',
      desc: 'เชื่อมผลการตรวจสอบเข้ากับ MES ติดตามแนวโน้มข้อบกพร่องตามชิ้นส่วน เครื่องจักร พนักงาน และเวลา',
      features: ['จับข้อบกพร่องอัตโนมัติ', 'วิเคราะห์ Pareto', 'แนวโน้ม SPC'],
    },
    {
      title: 'BOI Compliance',
      desc: 'กระทบยอดวัตถุดิบระดับใบสั่งผลิตสำหรับการตรวจสอบ BOI ติดตามการใช้ชิ้นส่วนจริงต่อใบสั่งประกอบ — สำคัญสำหรับชิ้นส่วนอิเล็กทรอนิกส์ที่อยู่ในบัญชี Bonded',
      features: ['รายงานพร้อมตรวจ BOI', 'ติดตามชิ้นส่วน Bonded', 'พิสูจน์แล้ว: ประหยัด 10M+ บาท/ปี'],
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S5: EQUIPMENT
// ══════════════════════════════════════════════════════════════

const equipment = {
  adminLabel: 'Equipment: เชื่อมต่อเครื่องจักรโดยตรง (Thai)',
  title: 'เชื่อมต่อเครื่องจักรโดยตรง',
  subtitle: 'DigiWin MES เชื่อมต่อโดยตรงกับสาย SMT, สถานีตรวจสอบ, เตา Reflow และอุปกรณ์ทดสอบ — เก็บข้อมูลการผลิตแบบเรียลไทม์โดยไม่ต้องป้อนข้อมูลเอง',
  categories: [
    { label: 'SMT Pick-and-Place', brands: ['Fuji', 'Panasonic', 'Yamaha', 'Juki', 'ASM'] },
    { label: 'AOI & Inspection', brands: ['Koh Young', 'Saki', 'Omron'] },
    { label: 'Reflow Ovens & Test', brands: ['Heller', 'BTU', 'Keysight'] },
  ],
};

// ══════════════════════════════════════════════════════════════
// S6: FADE-IN (Case Study Callout)
// ══════════════════════════════════════════════════════════════

const fadeIn = {
  adminLabel: 'Case Study: Hoo Chin Electronics (Thai)',
  label: 'DigiWin ในอุตสาหกรรมอิเล็กทรอนิกส์ไทย',
  title: 'Hoo Chin Electronics (Thailand)',
  paragraph1: 'Hoo Chin Electronics ผู้ผลิตอิเล็กทรอนิกส์ไทยและหนึ่งในลูกค้าของ DigiWin ในประเทศไทย เลือก DigiWin ERP เพื่อจัดการความซับซ้อนของการผลิตแบบ High-Mix, BOI Compliance และการติดตามชิ้นส่วนหลายวัสดุ — ความท้าทายเดียวกับที่โรงงานของคุณเผชิญทุกวัน',
  paragraph2: 'นี่ไม่ใช่แค่ตัวอย่างจากเอเชีย Hoo Chin ดำเนินงานในประเทศไทย ปฏิบัติตามกฎระเบียบไทย และทำงานกับซัพพลายเชนไทย — หลักฐานว่า DigiWin ส่งมอบผลลัพธ์ในตลาดของคุณ',
};

// ══════════════════════════════════════════════════════════════
// S7: PRODUCTS
// ══════════════════════════════════════════════════════════════

const products = {
  adminLabel: 'Products: แนะนำสำหรับอิเล็กทรอนิกส์ (Thai)',
  title: 'ผลิตภัณฑ์แนะนำสำหรับอิเล็กทรอนิกส์',
  cards: [
    {
      title: 'MES',
      desc: 'Traceability ระดับชิ้นส่วน, เชื่อมต่อ SMT, จัดการ MSD และติดตามคุณภาพแบบเรียลไทม์สำหรับอิเล็กทรอนิกส์',
      href: '../products/mes.html',
      linkText: shared.cta.learnMore,
    },
    {
      title: 'sFLS WMS',
      desc: 'จัดการรีล, ดูแลชิ้นส่วนไวต่อความชื้น และ Kitting Support สำหรับคลังสินค้าอิเล็กทรอนิกส์',
      href: '../products/wms.html',
      linkText: shared.cta.learnMore,
    },
    {
      title: 'AIoT',
      desc: 'เชื่อมต่อเครื่องจักรสำหรับสาย SMT, เตา Reflow และอุปกรณ์ทดสอบ OEE แบบเรียลไทม์และติดตามกระบวนการ',
      href: '../products/aiot.html',
      linkText: shared.cta.learnMore,
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S8: FAQ (template: faq-accordion)
// ══════════════════════════════════════════════════════════════

const faq = {
  adminLabel: 'FAQ: อิเล็กทรอนิกส์ (Thai)',
  sectionPrefix: 'elec-faq',
  items: [
    {
      question: 'ระบบ MES ไหนเหมาะสำหรับการประกอบอิเล็กทรอนิกส์ในประเทศไทย?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin MES ออกแบบมาเฉพาะสำหรับความซับซ้อนของการประกอบอิเล็กทรอนิกส์ ด้วยการเชื่อมต่อเครื่อง SMT โดยตรงที่ MES ทั่วไปไม่สามารถเทียบได้ ระบบรองรับการผลิตแบบ High-Mix, Low-Volume ด้วยชิ้นส่วนนับพันประเภท ติดตามทุกรีลไปยังทุกตำแหน่งบนบอร์ด ถูกใช้งานทั่วระบบนิเวศอิเล็กทรอนิกส์ไทยที่ส่งออกมูลค่ากว่า 40,000 ล้านดอลลาร์สหรัฐต่อปี ตั้งแต่ฮาร์ดดิสก์ไดรฟ์ไปจนถึงอิเล็กทรอนิกส์ยานยนต์</p>',
    },
    {
      question: 'DigiWin MES เชื่อมต่อกับเครื่อง SMT ของ Fuji และ Panasonic ได้หรือไม่?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">ได้ DigiWin เชื่อมต่อโดยตรงกับเครื่อง SMT ชั้นนำทุกแบรนด์ ได้แก่ Fuji, Panasonic, Yamaha, Juki และ ASM Pick-and-Place รวมถึงระบบตรวจสอบ AOI และ ICT จาก Koh Young, Omron และ Keysight การเชื่อมต่อนี้ช่วยให้ตรวจสอบรีลที่ Feeder ป้องกันชิ้นส่วนผิด และดาวน์โหลดโปรแกรมอัตโนมัติ ขจัดการป้อนข้อมูลด้วยมือที่เป็นสาเหตุของการวางชิ้นส่วนผิด</p>',
    },
    {
      question: 'DigiWin จัดการกับการติดตามชิ้นส่วนไวต่อความชื้น (MSD) อย่างไร?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin จัดการ Floor Life อัตโนมัติทั้งกระบวนการ ระบบเริ่มนับถอยหลังอัตโนมัติทันทีที่เปิดซองบรรจุ MSD ติดตามรอบ Bake-Out สำหรับชิ้นส่วนที่ต้อง Recondition และส่งแจ้งเตือนหมดอายุพร้อมบล็อกไม่ให้ใช้ชิ้นส่วนหมดอายุบนสายการผลิต วิธีอัตโนมัตินี้ช่วยลดของเสียจาก MSD ได้ 45% เทียบกับการติดตามด้วยมือ</p>',
    },
    {
      question: 'DigiWin รองรับ BOI Compliance สำหรับโรงงานอิเล็กทรอนิกส์หรือไม่?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">ได้ DigiWin กระทบยอดวัตถุดิบระดับใบสั่งผลิตที่ออกแบบมาเฉพาะสำหรับการตรวจสอบ BOI ในอุตสาหกรรมอิเล็กทรอนิกส์ ระบบติดตามการใช้ชิ้นส่วนจริงต่อใบสั่งประกอบ ซึ่งสำคัญสำหรับชิ้นส่วนอิเล็กทรอนิกส์ในบัญชี Bonded ที่ต้องกระทบยอดอากรนำเข้าอย่างแม่นยำ โรงงานอิเล็กทรอนิกส์ที่ใช้ DigiWin สำหรับ BOI Compliance รายงานว่าประหยัดได้กว่า 10 ล้านบาทต่อปีจากการเบิกคืนอากรที่แม่นยำและรายงานพร้อมตรวจ BOI</p>',
    },
    {
      question: 'DigiWin WMS ให้ความแม่นยำในการหยิบได้เท่าไหร่?',
      answer: '<p style="font-family: \'Noto Sans Thai\', \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin sFLS WMS ให้ความแม่นยำในการหยิบ 99.9% สำหรับคลังสินค้าอิเล็กทรอนิกส์ ระบบจัดการสินค้าคงคลังระดับรีลพร้อมดูแลชิ้นส่วน MSD อย่างแม่นยำ Kitting Support สำหรับใบสั่งผลิต และตรวจสอบด้วย Barcode ทุกขั้นตอน สำหรับโรงงานอิเล็กทรอนิกส์ที่จัดการชิ้นส่วนหลายร้อยรายการต่อผลิตภัณฑ์และรีลนับพันในคลัง ความแม่นยำระดับนี้ป้องกันข้อผิดพลาดที่มีราคาแพง เพราะวางชิ้นส่วนผิดเพียงตัวเดียวอาจทำให้ต้องทิ้งทั้งล็อต</p>',
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// S9: CTA (template: cta-gradient)
// ══════════════════════════════════════════════════════════════

const cta = {
  adminLabel: 'CTA: จัดการความซับซ้อนของอิเล็กทรอนิกส์ (Thai)',
  title: 'จัดการความซับซ้อนของอิเล็กทรอนิกส์',
  subtitle: 'ดูว่า DigiWin รองรับการผลิตแบบ High-Mix อย่างไร',
  buttons: [
    { text: shared.cta.getInTouch, href: '/demo.html', style: 'primary' },
    { text: 'ดูอุตสาหกรรมอื่นๆ', href: '/industries.html', style: 'ghost' },
  ],
};

// ══════════════════════════════════════════════════════════════
// S10: RELATED SOLUTIONS (template: related-solutions)
// ══════════════════════════════════════════════════════════════

const relatedSolutions = {
  sectionPrefix: 'elec-related',
  cards: [
    { title: 'Automotive', href: '/industries/automotive/', desc: 'ระบบ ERP และ MES ที่ออกแบบเฉพาะสำหรับผู้ผลิตชิ้นส่วนยานยนต์และ OEM Supplier' },
    { title: 'Metal &amp; Plastics', href: '/industries/metal-plastics/', desc: 'โซลูชันครบวงจรสำหรับ Die Casting, ฉีดพลาสติก และโรงงานขึ้นรูปโลหะ' },
    { title: 'ERP', href: '/products/erp/', desc: 'ระบบ ERP สำหรับโรงงานผลิตครบวงจร — ตั้งแต่ BOM ถึงบัญชีการเงินถึง BOI' },
    { title: 'MES', href: '/products/mes/', desc: 'ระบบบริหารการผลิตแบบเรียลไทม์ — ติดตาม OEE, SPC และใบสั่งผลิตแบบไร้กระดาษ' },
    { title: 'WMS', href: '/products/wms/', desc: 'ระบบบริหารคลังสินค้าอัจฉริยะ Barcode/RFID — ตั้งแต่รับเข้าถึงจัดส่ง พร้อม Traceability เต็มรูปแบบ' },
    { title: 'AIoT', href: '/products/aiot/', desc: 'เชื่อมต่อเครื่องจักรเข้ากับ ERP ด้วยเซ็นเซอร์ IoT, Edge Computing และ AI Analytics' },
  ],
};

module.exports = {
  hero,
  context,
  challenges,
  solutions,
  equipment,
  fadeIn,
  products,
  faq,
  cta,
  relatedSolutions,
};
