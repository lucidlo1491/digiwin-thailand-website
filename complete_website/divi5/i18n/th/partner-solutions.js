/**
 * i18n/th/partner-solutions.js — Thai content for Partner Solutions page
 *
 * 6 sections: hero, products, lifecycle, reverse-cut, competitive, cta
 *
 * Target: Track B (ERP implementers)
 * Note: Product names (T100, Workflow iGP, MES, WMS, AIoT) stay in English
 * Technical terms (BOM, OEE, IoT, PaaS) stay in English
 */

module.exports = {
  // ── S1: Hero (COPY) ──────────────────────────────────────────
  hero: {
    adminLabel: 'Hero: ชุดโซลูชันพาร์ทเนอร์',
    breadcrumb: [
      { text: 'โปรแกรมพันธมิตร', href: '/partner-program/' },
      { text: 'ชุดโซลูชัน' },
    ],
    titleLine1: 'หยุดเขียน Custom Code',
    titleHighlight: 'เริ่ม Deploy คลังอาวุธแบบ Modular',
    subtitle: 'คุณไม่ได้แค่ขายซอฟต์แวร์ต่อ คุณกำลัง Deploy กลยุทธ์ Customer Lifecycle Management — เริ่มจากผลิตภัณฑ์หนึ่ง ขยายสู่ Stack เต็ม ล็อครายได้ต่อเนื่องเป็นปีๆ',
    stats: [
      { value: '44', label: 'ปีลงทุน R&D', dynamic: true },
      { value: '50K+', label: 'ลูกค้าด้านการผลิต' },
      { value: '4', label: 'เครื่องยนต์สร้างรายได้' },
    ],
  },

  // ── S2: Products (DEEP-MERGE) ────────────────────────────────
  products: {
    title: 'พอร์ตโฟลิโอผลิตภัณฑ์ในฐานะเครื่องยนต์สร้างรายได้',
    subtitle: 'ผลิตภัณฑ์แต่ละตัวไม่ใช่แค่ซอฟต์แวร์ — แต่เป็นโมเดลธุรกิจที่มีลักษณะรายได้และเส้นทาง Cross-sell เฉพาะตัว',
    cards: [
      {
        badge: '"ทางเลือกระดับ Enterprise"',
        title: 'T100 Enterprise ERP',
        desc: 'ชนะบัญชี "ปลาใหญ่" — ซัพพลายเออร์ยานยนต์และอิเล็กทรอนิกส์หลายไซต์ — ที่ปกติเลือก ERP ระดับ Enterprise เสนอ <strong>ความสามารถ Tier-1 ในราคา Tier-2</strong> เจาะโรงงาน EV Supply Chain ที่ต้องการระบบสองภาษาและ Complex Costing',
        features: [
          'สถาปัตยกรรมหลายไซต์ หลายสกุลเงิน หลายบริษัท',
          'Complex Costing Logic สำหรับยานยนต์และอิเล็กทรอนิกส์',
          'รองรับสามภาษา จีน/ไทย/อังกฤษ ในตัว',
          '<strong>เส้นทาง Cross-sell:</strong> T100 → MES → WMS → AIoT → BPM',
        ],
        metricsTitle: 'โมเดลรายได้ของคุณ: โปรเจกต์มูลค่าสูง',
        metrics: [
          { label: 'ลูกค้าเป้าหมาย', value: '200+ พนักงาน' },
          { label: 'มาร์จินลิขสิทธิ์', value: '30-40%', highlight: true },
          { label: 'ค่า Implementation', value: '100% เป็นของคุณ', highlight: true },
          { label: 'ประเภทรายได้', value: 'สินทรัพย์ Enterprise' },
        ],
      },
      {
        badge: '"เครื่องยนต์ปริมาณ"',
        title: 'Workflow iGP Growth ERP',
        desc: 'อาวุธ "Rapid Deployment" สำหรับ SME ไทย แก้ช่องว่าง Automation ขนาดใหญ่ ที่ซอฟต์แวร์บัญชีท้องถิ่นจัดการตรรกะการผลิตไม่ได้ แต่ ERP ระดับโลกแพงเกินไป <strong>พร้อม Localize สำหรับกรมสรรพากร (ได้รับการรับรอง)</strong>',
        features: [
          'Deploy ใน 3-6 เดือน — พลิกโปรเจกต์เร็ว เรียกเก็บเงินเร็ว',
          'อุปสรรคต่ำ = ปริมาณผู้ผลิตท้องถิ่นสูง',
          'ได้รับการรับรองภาษีไทย — ขายง่ายกับ CFO',
          '<strong>เส้นทาง Cross-sell:</strong> iGP → MES → WMS → AIoT',
        ],
        metricsTitle: 'โมเดลรายได้ของคุณ: เครื่องยนต์กระแสเงินสด',
        metrics: [
          { label: 'ลูกค้าเป้าหมาย', value: '20-200 พนักงาน' },
          { label: 'ระยะเวลา', value: '3-6 เดือน', highlight: true },
          { label: 'หลีกเลี่ยง', value: '"โปรเจกต์ยืดเยื้อ"' },
          { label: 'ประเภทรายได้', value: 'กระแสเงินสด SME' },
        ],
      },
      {
        badge: '"อาวุธเจาะเข้า"',
        title: 'MES',
        desc: '<strong>กลยุทธ์ "Reverse Cut"</strong> ไม่ต้องรื้อถอน ERP เดิม — แม้จะเป็นแบรนด์ระดับโลก ขาย MES ในฐานะ "ผู้คุมพื้นที่การผลิต" ที่แก้ปัญหาความแม่นยำของข้อมูลการผลิต ดึงดูดเจ้าของที่เบื่อ "Shadow Excel" ต้องการ Real-time Visibility',
        features: [
          '"เก็บ ERP เดิมไว้ดูแลการเงิน ใช้ DigiWin สำหรับพื้นที่การผลิต"',
          'เรียกเก็บอัตราพรีเมียมสำหรับ Process Consulting และ Hardware Integration',
          'เมื่อควบคุมข้อมูล Shop Floor ลูกค้าจะย้ายไปไม่ได้',
          '<strong>"ม้าโทรจัน":</strong> MES → WMS → AIoT → T100/iGP',
        ],
        metricsTitle: 'โมเดลรายได้ของคุณ: รายได้ต่อเนื่องที่ยั่งยืน',
        metrics: [
          { label: 'จุดเริ่มต้น', value: '~1M บาท (vs. 5M+ ERP)', highlight: true },
          { label: 'ระยะเวลา', value: '3-6 เดือน (vs. 18 เดือน)', highlight: true },
          { label: 'การรักษาลูกค้า', value: 'อุปสรรคในการย้ายออกสูง' },
          { label: 'ประเภทรายได้', value: 'สินทรัพย์การรักษาลูกค้า' },
        ],
      },
      {
        badge: '"ตัวคูณมูลค่า"',
        title: 'AIoT & WMS: เลเยอร์ล็อคลูกค้า',
        desc: '<strong>WMS — "สต็อกผีเป็นศูนย์":</strong> ขายให้เจ้าของที่กลัวการโจรกรรมหรือ Audit ล้มเหลว ดิจิทัลไลซ์การเคลื่อนย้ายสินค้า <strong>AIoT — "Future Proofing":</strong> แสดงให้เห็นว่าคุณมีความสามารถเชื่อมต่อเครื่องจักร (PLC) โดยตรงกับ ERP สร้างความแตกต่างจากสำนักงานบัญชี',
        features: [
          'โอกาสขายต่อ Hardware/Middleware (เครื่องสแกน, เซ็นเซอร์)',
          'บริการติดตามข้อมูลและ Optimization ต่อเนื่อง',
          'แก้ปัญหา "ระบบบอก 100 ชั้นวางมี 50"',
          '<strong>ล็อคทางกายภาพ:</strong> สแกนเนอร์และเซ็นเซอร์ = ความสัมพันธ์ 10+ ปี',
        ],
        metricsTitle: 'โมเดลรายได้ของคุณ: สร้างความแตกต่าง',
        metrics: [
          { label: 'การผสาน Physical', value: 'ล็อคลูกค้าขั้นสุด', highlight: true },
          { label: 'Hardware Drag', value: 'สแกนเนอร์, เซ็นเซอร์, PLC' },
          { label: 'อายุลูกค้า', value: '10+ ปี', highlight: true },
          { label: 'ประเภทรายได้', value: 'สินทรัพย์สร้างความแตกต่าง' },
        ],
      },
    ],
  },

  // ── S3: Lifecycle (DEEP-MERGE) ───────────────────────────────
  lifecycle: {
    label: 'การจัดการวงจรชีวิตลูกค้า',
    title: 'กลยุทธ์ "Land and Expand"',
    subtitle: 'คุณไม่ได้ขายซอฟต์แวร์ คุณกำลังดำเนินกลยุทธ์ยึดบัญชีลูกค้า 4 เฟส',
    phases: [
      { title: 'เข้า (Land)', products: 'iGP (ปริมาณ) หรือ MES (Reverse Cut)', desc: 'จุดเริ่มต้นที่มีคุณค่าทันที โปรเจกต์เร็ว เงินสดเร็ว', revenue: 'ค่าโปรเจกต์ + ลิขสิทธิ์' },
      { title: 'ทำให้มั่นคง', products: 'WMS', desc: 'ควบคุมความแม่นยำสต็อก แก้ปัญหา "สต็อกผี"', revenue: 'โปรเจกต์ + Hardware' },
      { title: 'ขยาย', products: 'T100 ERP', desc: 'ขยายสู่ Enterprise โปรเจกต์มูลค่าสูง', revenue: 'โปรเจกต์ Enterprise' },
      { title: 'ล็อค', products: 'AIoT', desc: 'การผสาน Physical = การรักษาลูกค้าถาวร', revenue: 'สมัครสมาชิก + ข้อมูล' },
    ],
    proofBar: 'นี่ไม่ใช่แค่ซอฟต์แวร์ — เป็นกลยุทธ์ Customer Lifecycle Management ที่สร้างรายได้ทบต้นเป็นปีๆ',
  },

  // ── S4: Reverse Cut (DEEP-MERGE) ─────────────────────────────
  reverseCut: {
    label: 'กลยุทธ์ REVERSE CUT',
    title: 'วิธีชนะบัญชี Enterprise ERP',
    subtitle: 'อย่าบุกปราสาทที่ประตูหน้า เข้าทางประตูโรงงานด้วย MES ทำให้ตัวเองขาดไม่ได้ แล้วชนะธุรกิจ ERP จากข้างใน',
    phases: [
      {
        tag: 'เฟส 1',
        title: 'อาวุธเจาะ (The Wedge)',
        desc: 'ขาย MES ในฐานะ "ผู้คุมพื้นที่การผลิต" ที่แก้ความแม่นยำของข้อมูลการผลิต <strong>"เก็บ ERP เดิมไว้ดูแลการเงิน ใช้ DigiWin สำหรับพื้นที่การผลิต"</strong>',
        expQuote: '"ในที่สุด ผมก็เห็นว่าเกิดอะไรขึ้นจริงๆ บนสายการผลิต"',
      },
      {
        tag: 'เฟส 2',
        title: 'สร้างความเปรียบเทียบ (The Contrast)',
        desc: 'ลูกค้าตระหนักว่า DigiWin MES ยืดหยุ่นและ "เข้าใจการผลิตโดยธรรมชาติ" ขณะที่ Legacy ERP ของพวกเขาแข็งทื่อ "ภาษีการเชื่อมต่อ" ของการรักษาสองระบบเริ่มน่ารำคาญ',
        expQuote: '"ทำไมอัพเดท Legacy ERP ถึงยุ่งยากขนาดนี้ ในขณะที่ DigiWin ใช้งานง่าย?"',
      },
      {
        tag: 'เฟส 3',
        title: 'การทดแทน (The Replacement)',
        desc: 'เมื่อ Legacy ERP ต้อง Upgrade หรือต่ออายุลิขสิทธิ์ เสนอ T100 <strong>"คุณใช้ DigiWin บริหารโรงงานอยู่แล้ว ทำไมไม่ใช้ดูแลบัญชีด้วย?"</strong>',
        expQuote: '"รวมทุกอย่างไว้บน DigiWin เลยดีกว่า"',
      },
    ],
    comparisonTitle: 'ทำไมถึงได้ผล: เกณฑ์ความเสี่ยงต่ำกว่า',
    tableCaption: 'เปรียบเทียบการเปลี่ยน ERP ทั้งหมด กับ การเข้าทาง MES Reverse Cut',
    tableHeaders: ['ตัวชี้วัด', 'เปลี่ยน ERP ทั้งหมด', 'เข้าทาง MES (Reverse Cut)'],
    tableRows: [
      { metric: 'งบประมาณ', old: '5M+ บาท', new: '~1M บาท' },
      { metric: 'ระยะเวลา', old: '9-18 เดือน', new: '3-6 เดือน' },
      { metric: 'การหยุดชะงัก', old: 'สูง (รื้อถอนทั้งหมด)', new: 'ต่ำ (วางทับ)' },
      { metric: 'ความเสี่ยงลูกค้า', old: 'สูง', new: 'ต่ำ' },
    ],
  },

  // ── S5: Competitive Positioning (DEEP-MERGE) ─────────────────
  competitive: {
    label: 'การวางตำแหน่งเชิงแข่งขัน',
    title: 'ประเด็นสำคัญสำหรับการสนทนาขาย',
    subtitle: 'วิธีวางตำแหน่ง DigiWin เทียบกับคู่แข่งในทุกการสนทนาขาย',
    cards: [
      {
        tag: 'vs. ERP ระดับ Mid-Market',
        title: '"พวกเขาหยุดอยู่แค่ประตูออฟฟิศ"',
        points: [
          { strong: 'ช่องว่างด้านการผลิต:', text: 'ERP Mid-Market มองการผลิตเป็นแค่การประกอบ พวกเขาจัดการความเป็นจริงของการผลิตไทยไม่ได้ — การจัดการแม่พิมพ์, Regrind (นำเศษกลับมาใช้), Sub-contracting Loop ที่ซับซ้อน เราจัดการได้โดยธรรมชาติ' },
          { strong: 'ปัญหา Phantom:', text: 'ERP ทั่วไปบังคับให้คุณสร้างรายการเคลื่อนไหวสต็อก "จำลอง" หลายพันรายการสำหรับ Phantom BOM DigiWin จัดการโดยอัตโนมัติ ทำให้ข้อมูลคลังสะอาด' },
          { strong: 'ค่า "ดีพอ":', text: 'การทำให้ ERP ทั่วไปจัดการการผลิตเชิงลึกต้องใช้ Add-on บุคคลที่สาม เพิ่ม TCO และเสี่ยง "Version Lock" MES/WMS ของ DigiWin เป็น Native' },
        ],
        useWhen: 'ลูกค้ามี ERP Mid-Market แต่บ่นเรื่อง Production Visibility',
      },
      {
        tag: 'vs. ERP ระดับ Enterprise',
        title: '"ความสามารถ Tier-1 ไม่ต้องมี German Logic"',
        points: [
          { strong: 'ความคล่องตัว vs ความแข็งทื่อ:', text: 'ERP Enterprise มักบังคับกระบวนการแบบเส้นตรงที่พังเมื่อมี Rush Order หรือเครื่องเสีย DigiWin T100 จัดการ Urgent Order Splitting และเปลี่ยนแปลงกลางการผลิตได้โดยไม่ต้อง Rollback Schedule' },
          { strong: 'ข้อได้เปรียบด้านต้นทุนรวม:', text: 'เราส่งมอบ 90% ของความสามารถ Tier-1 ในราคา ~70% Implementation สั้นกว่า (6-9 เดือน vs. 12-18 เดือน) ด้วย Template ยานยนต์/อิเล็กทรอนิกส์สำเร็จรูป' },
          { strong: 'ราคาโปร่งใส:', text: 'ไม่มีความเสี่ยง Audit ไม่มีค่า "Named User" ที่พุ่งขึ้นเรื่อยๆ DigiWin เสนอราคาโปร่งใสสำหรับ Shop Floor User จำนวนมาก' },
        ],
        useWhen: 'ลูกค้ากำลังประเมิน ERP Enterprise แต่กังวลเรื่องงบประมาณหรือต้องการความยืดหยุ่น',
      },
      {
        tag: 'vs. ผู้ค้าท้องถิ่นและ Open-Source',
        title: '"ขยายได้โดยไม่ติดทางตัน"',
        points: [
          { strong: 'ผู้ค้าที่หายไป:', text: 'ERP ท้องถิ่นถูกกว่า 30% แต่ขาดงบ R&D ที่จะอยู่รอดเทคโนโลยีรุ่นถัดไป (AI, IoT) DigiWin จดทะเบียนในตลาดหลักทรัพย์ (300378) มีประวัติ 44 ปี และได้รับการสนับสนุนจาก Foxconn' },
          { strong: 'เพดานฟีเจอร์:', text: 'ERP Open-Source ติดกำแพงความซับซ้อนเมื่อต้องการ Real-time Machine Integration (IoT) หรือ Traceability สำหรับ ISO/IATF Audit DigiWin มีในตัว' },
          { strong: 'ความน่าเชื่อถือทางการเงิน:', text: 'ธนาคารและผู้ตรวจสอบของคุณรู้จัก DigiWin การใช้ T100 หรือ iGP ช่วยเรื่องการเตรียมตัว IPO และอนุมัติสินเชื่อ ในแบบที่ซอฟต์แวร์ท้องถิ่นสร้างเองทำไม่ได้' },
        ],
        useWhen: 'ลูกค้าสนใจตัวเลือกท้องถิ่นราคาถูกหรือ Open-Source',
      },
    ],
    aceLabel: 'ไพ่เด็ด',
    aceQuote: '"ERP Enterprise จัดการ General Ledger ของคุณ ซอฟต์แวร์ท้องถิ่นจัดการ Invoice ของคุณ <strong>DigiWin จัดการพื้นที่การผลิตของคุณ</strong> เราเป็นเจ้าเดียวที่เข้าใจว่าความเป็นจริงทางกายภาพของสายการผลิตไทยไม่ได้ตรงกับกฎบัญชีเสมอไป"',
  },

  // ── S6: CTA (MERGE) ──────────────────────────────────────────
  cta: {
    adminLabel: 'CTA: ดูเศรษฐศาสตร์',
    title: 'ตอนนี้มาดูเศรษฐศาสตร์จริง',
    subtitle: 'คุณเห็นคลังอาวุธแล้ว ตอนนี้มาดูตัวเลข — มาร์จิน รายได้ต่อเนื่อง และการประมาณการหลายปีสำหรับธุรกิจของคุณ',
    buttons: [
      { text: 'ดูเศรษฐศาสตร์พาร์ทเนอร์ →', href: '/partner-program/economics/', style: 'primary' },
      { text: 'พูดคุยกับเรา', href: '/contact/', style: 'ghost' },
    ],
  },
};
