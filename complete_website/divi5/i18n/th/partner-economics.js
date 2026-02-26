/**
 * i18n/th/partner-economics.js — Thai content for Partner Economics page
 *
 * 5 sections: hero, revenue, journey, protection, cta
 *
 * Target: Track B (ERP implementers)
 * Note: Financial terms (MA, TCO, PaaS) stay in English
 * Currency amounts stay in ฿ (Thai Baht)
 */

module.exports = {
  // ── S1: Hero (COPY) ──────────────────────────────────────────
  hero: {
    adminLabel: 'Hero: เศรษฐศาสตร์พาร์ทเนอร์',
    breadcrumb: [
      { text: 'โปรแกรมพันธมิตร', href: '/partner-program/' },
      { text: 'เศรษฐศาสตร์พาร์ทเนอร์' },
    ],
    titleMain: 'ดูเศรษฐศาสตร์จริง —',
    titleHighlight: 'ไม่ใช่ Sales Pitch',
    subtitle: 'ตัวเลขจริงเป็นเงินบาท สถานการณ์แบบอนุรักษ์นิยม ไม่มีการโฆษณาเกินจริง นี่คือรายละเอียดว่าโมเดลพาร์ทเนอร์ทำงานอย่างไรทางการเงิน — จากปีที่ 1 ที่ต้องอยู่รอด ถึงปีที่ 3 ที่สร้างสินทรัพย์',
    stats: [
      { value: '30-40%', label: 'มาร์จินลิขสิทธิ์' },
      { value: '100%', label: 'รายได้บริการ' },
      { value: 'Fixed', label: 'ค่า MA คาดการณ์ได้' },
      { value: '6 เดือน', label: 'คุ้มครอง Lead Lock' },
    ],
  },

  // ── S2: Revenue Streams (DEEP-MERGE) ─────────────────────────
  revenue: {
    label: '4 ช่องทางรายได้',
    title: 'รายได้พาร์ทเนอร์ทำงานอย่างไรจริงๆ',
    subtitle: 'ต่างจากผู้ค้า SaaS ที่รายได้หยดเข้ามาเป็นปีๆ โมเดลของเราให้มาร์จินเริ่มต้นที่มากพอ บวกรายได้ต่อเนื่อง',
    streams: [
      {
        title: 'รายได้ลิขสิทธิ์',
        tag: 'กระแสเงินสดเริ่มต้น',
        desc: 'คุณซื้อ License Key ในราคา Distributor ขายในราคาแนะนำ (SSP) ส่วนต่างคือ <strong>กำไรขั้นต้นทันที</strong> — มีกำไรตั้งแต่วันแรก',
        margins: [
          { level: 'Silver Partner', value: 'มาร์จินที่แข็งแกร่ง' },
          { level: 'Gold Partner', value: 'มาร์จินชั้นนำในอุตสาหกรรม', highlight: true },
        ],
      },
      {
        title: 'รายได้บริการ',
        tag: 'เก็บ 100%',
        desc: 'DigiWin เป็นผู้ค้าผลิตภัณฑ์ ไม่ใช่คู่แข่งด้านบริการ <strong>คุณเก็บ 100%</strong> ของค่า Implementation, Customization และ Training ทั้งหมด',
        margins: [
          { level: 'โปรเจกต์ Workflow iGP', value: 'แล้วแต่ขอบเขตงาน' },
          { level: 'โปรเจกต์ T100/MES', value: 'เรียกเก็บรายชั่วโมง', highlight: true },
        ],
        note: 'เรา "สละ" รายได้มาร์จินสูงนี้ให้พาร์ทเนอร์ เพื่อแลกกับการขยายตลาด',
      },
      {
        title: 'การสนับสนุนต่อเนื่อง (MA)',
        tag: 'กระแสรายได้ประจำ',
        desc: 'คุณจ่ายให้ DigiWin <strong>ค่าธรรมเนียมประจำปีแบบคงที่</strong> (เริ่มปีที่ 2) สำหรับ Tier 2 Support — แก้ Bug หลัก, Patch และ R&D คุณให้บริการ Tier 1 Support และ <strong>กำหนดราคาเองกับลูกค้า</strong>',
        margins: [
          { level: 'ค่าใช้จ่ายของคุณกับ DigiWin', value: 'ค่าธรรมเนียมประจำปีคงที่' },
          { level: 'คุณเก็บจากลูกค้า', value: 'คุณกำหนดราคาเอง', highlight: true },
        ],
        note: 'ไม่มีการแบ่งกำไร ค่าใช้จ่ายของคุณคงที่และคาดการณ์ได้ คุณกำหนดราคากับลูกค้าเองและเก็บส่วนต่าง เมื่อฐานลูกค้าโต MA กลายเป็นแหล่งรายได้ที่คาดการณ์ได้มากที่สุด',
      },
      {
        title: 'Upsell & Cross-Sell',
        tag: 'ตัวคูณการเติบโต',
        desc: 'รายได้ไม่จบที่ Go-Live สร้าง IP บน <strong>แพลตฟอร์ม Digiwin.cloud PaaS</strong> Custom Module กลายเป็นสินทรัพย์ที่ขายลิขสิทธิ์ได้',
        margins: [
          { level: 'Module เสริม', value: 'มาร์จินตามระดับเดียวกัน' },
          { level: 'ค่าแนะนำ (Referral)', value: '5-10% ของลิขสิทธิ์', highlight: true },
        ],
        note: 'ลูกค้าคนเดียวสามารถสร้างยอดขายลิขสิทธิ์เพิ่มได้ 3-4 รายการใน 5 ปี',
      },
    ],
  },

  // ── S3: 3-Year Journey (DEEP-MERGE) ──────────────────────────
  journey: {
    label: 'สถานการณ์จำลอง ปีที่ 1-2-3',
    title: 'เส้นทาง 3 ปีของพาร์ทเนอร์',
    subtitle: 'ประมาณการแบบอนุรักษ์นิยม ไม่มีการโฆษณาเกินจริง นี่คือสิ่งที่ความก้าวหน้าปกติของพาร์ทเนอร์ที่เริ่มจากผลิตภัณฑ์ SME ดูเป็น',
    phases: [
      {
        badge: 'ปีที่ 1',
        title: 'ลงทุนและเร่งตัว',
        status: 'Silver Partner (Co-Delivery)',
        reality: '<strong>ความเป็นจริง:</strong> อย่าคาดหวังกำไรใน Q1-Q2 เน้นอบรมทีมหลักและปิดดีล "Pilot" แรกๆ โดยมี DigiWin ช่วยเต็มที่',
        activity: { label: 'เป้าหมาย:', value: 'รับรอง 2 ที่ปรึกษา, ปิดดีล Workflow iGP Pilot 2 ราย' },
        math: [
          { label: 'รายได้ลิขสิทธิ์', value: 'มาร์จินที่แข็งแกร่ง' },
          { label: 'รายได้บริการ', value: '100% เป็นของคุณ' },
          { label: 'ต่อเนื่อง (MA)', value: '฿0 (ช่วงรับประกัน)', dim: true },
        ],
        total: { label: 'เป้าหมายปีที่ 1', value: 'สร้างรากฐาน' },
        outcome: '<strong>ผลลัพธ์:</strong> เท่าทุนหรือขาดทุนเล็กน้อย แต่มี 2 Reference Site และทีมที่ได้รับการรับรอง คุณผ่าน "Valley of Death" แล้ว',
      },
      {
        badge: 'ปีที่ 2',
        title: 'เฟสกระแสเงินสด',
        status: 'ก้าวสู่ Gold Partner',
        reality: '<strong>ความเป็นจริง:</strong> ทีมสามารถ Deploy iGP ได้โดยไม่ต้องมีพี่เลี้ยง หยุดเสียเวลาเรียนรู้ เริ่มใช้กลยุทธ์ "Reverse Cut" ด้วย MES',
        activity: { label: 'ยอดขายใหม่:', value: '3 โปรเจกต์ iGP + 1 MES แบบ Standalone' },
        math: [
          { label: 'รายได้ลิขสิทธิ์', value: 'เติบโตตามปริมาณ' },
          { label: 'รายได้บริการ', value: '100% เป็นของคุณ' },
          { label: 'ต่อเนื่อง (MA)', value: 'เริ่มมีรายได้ประจำ' },
        ],
        total: { label: 'เป้าหมายปีที่ 2', value: 'ธุรกิจที่มีกำไร' },
        outcome: '<strong>ผลลัพธ์:</strong> <strong>ธุรกิจที่มีกำไร</strong> รายได้บริการครอบคลุมค่าดำเนินการ รายได้ลิขสิทธิ์เป็นกำไรล้วน MA ครอบคลุมค่าเช่าออฟฟิศ',
      },
      {
        badge: 'ปีที่ 3',
        title: 'เฟสสร้างสินทรัพย์',
        status: 'Gold Partner (เฉพาะทาง)',
        featured: true,
        reality: '<strong>ความเป็นจริง:</strong> ไม่ต้อง "ล่า" อีกต่อไป เครื่องยนต์ "Farming" เริ่มทำงาน MA ครอบคลุมเงินเดือนที่ปรึกษารุ่นน้อง เริ่มพยายาม Upsell T100 หรือ AIoT ครั้งแรก',
        activity: { label: 'ยอดขายใหม่:', value: '4 iGP + 1 T100 Enterprise หรือ 2 MES เสริม' },
        math: [
          { label: 'รายได้ลิขสิทธิ์', value: 'ดีล Enterprise' },
          { label: 'รายได้บริการ', value: '100% เป็นของคุณ' },
          { label: 'ต่อเนื่อง (MA)', value: 'เติบโตแบบทบต้น', highlight: true },
        ],
        total: { label: 'เป้าหมายปีที่ 3', value: 'สินทรัพย์ ไม่ใช่แค่งาน' },
        outcome: '<strong>ผลลัพธ์:</strong> มูลค่าธุรกิจเปลี่ยน <strong>คุณมีกระแสรายได้ต่อเนื่องและฐานลูกค้าที่ยั่งยืน</strong> คุณสร้างสินทรัพย์ ไม่ใช่แค่งาน',
      },
    ],
    summaryTitle: 'แนวโน้มรายได้ 3 ปี',
    bars: [
      { label: 'เร่งตัว', sublabel: 'ปีที่ 1: อยู่รอด' },
      { label: '2-3 เท่า', sublabel: 'ปีที่ 2: มีกำไร' },
      { label: '4 เท่า+', sublabel: 'ปีที่ 3: สินทรัพย์', featured: true },
    ],
  },

  // ── S4: Protection (DEEP-MERGE) ──────────────────────────────
  protection: {
    label: 'การบริหารความเสี่ยง',
    title: 'โครงสร้างการคุ้มครองของคุณ',
    subtitle: 'พาร์ทเนอร์ชิปไม่ใช่แค่เรื่องรายได้ — แต่เกี่ยวกับการปกป้องการลงทุนและลดความเสี่ยงของคุณ',
    cards: [
      {
        title: 'คุ้มครองพื้นที่และป้องกัน Conflict',
        points: [
          { strong: 'Lead Lock 6 เดือนอย่างหนัก:', text: 'เมื่อคุณลงทะเบียน Lead ที่ผ่านเกณฑ์ จะถูกล็อคให้คุณตามกฎหมาย 6 เดือน (ต่ออายุ +3 ได้) ไม่มีใครเข้าถึงลูกค้าได้' },
          { strong: 'การแบ่งส่วนเชิงโครงสร้าง:', text: 'ทีมขายตรง DigiWin ดูแลเฉพาะบัญชีจีน/ไต้หวันที่ติดต่อเข้ามา ตลาดท้องถิ่นไทยเป็นของพาร์ทเนอร์โดยเฉพาะ' },
          { strong: 'ข้อกำหนดไม่แข่งขัน:', text: 'Master Agreement ระบุชัดเจนว่า DigiWin ไม่สามารถดำเนินการกับ Lead ที่พาร์ทเนอร์จองไว้ในช่วงที่มีผลบังคับ' },
        ],
        proof: '"Lead ของคุณถูกล็อค การคุ้มครองตามสัญญา ไม่ใช่แค่คำสัญญา"',
      },
      {
        title: 'สนับสนุน Co-Implementation',
        points: [
          { strong: 'การสนับสนุนแบบแบ่งระดับ:', text: 'คุณดูแล Tier 1 (คำถามผู้ใช้, Config พื้นฐาน) DigiWin ดูแล Tier 2 (Bug หลัก, API Failure, R&D)' },
          { strong: 'Safety Net "บริการมอบอำนาจ":', text: 'ถ้าคุณขายได้แต่ยังไม่มีกำลังส่งมอบ DigiWin ส่งมอบภายใต้แบรนด์ของคุณผ่านข้อตกลงอย่างเป็นทางการ' },
          { strong: 'ช่วยเหลือ On-Site สำหรับ Pilot:', text: 'สำหรับโปรเจกต์แรก เราให้คำแนะนำ On-Site สำหรับเฟสสำคัญ เช่น Go-Live Simulation' },
        ],
        proof: '"คุณไม่เคยอยู่คนเดียวตอน Go-Live"',
      },
      {
        title: 'การอบรมและรับรอง',
        points: [
          { strong: 'การรับรองภาคบังคับ:', text: 'พนักงานของคุณต้องจบหลักสูตรรับรองด้านการขาย Pre-sales และ Delivery ภายใน 3-5 เดือน' },
          { strong: 'หลักสูตรตามบทบาท:', text: 'T100 Certified → โปรเจกต์ Enterprise MES Certified → พื้นที่การผลิต Gold Status → มาร์จินสูงสุด' },
          { strong: '"Weaponization" ด้านการขาย:', text: 'Whitepaper อุตสาหกรรม, เครื่องคำนวณ ROI, Demo Script ที่ Localize แล้ว — เข้าไปในฐานะที่ปรึกษาด้านการผลิต' },
        ],
        proof: '"ถ่ายทอดความสามารถ ไม่ใช่แค่คู่มือ"',
      },
      {
        title: 'สร้าง Demand',
        points: [
          { strong: 'แจก Lead 100%:', text: 'Lead จาก Brand Roadshow และ Digital Marketing ถูกแจกจ่าย 100% ให้พาร์ทเนอร์ที่ผ่านเกณฑ์และเข้าร่วม' },
          { strong: 'Gold ได้สิทธิ์ก่อน:', text: 'Lead คุณภาพสูงจาก Inbound ถูกจัดสรรตามผลงานให้ Gold Partner ก่อน' },
          { strong: 'แบ่งงานกัน:', text: 'เราสร้าง Demand คุณจับและให้บริการ เราเป็นเครื่องยนต์การตลาด คุณเป็นเครื่องยนต์ปิดดีล' },
        ],
        proof: '"เราเลี้ยงกองทัพ"',
      },
    ],
  },

  // ── S5: CTA (MERGE) ──────────────────────────────────────────
  cta: {
    adminLabel: 'CTA: คุยตัวเลขสำหรับบริษัทของคุณ',
    title: 'พร้อมคำนวณตัวเลขสำหรับบริษัทคุณหรือยัง?',
    subtitle: 'มาคุยเรื่องพื้นที่ เป้าหมาย และสร้างประมาณการ 3 ปีเฉพาะสำหรับธุรกิจของคุณ ไม่มีข้อผูกมัด — แค่ความจริงจากสเปรดชีท',
    buttons: [
      { text: 'พูดคุยกับเรา', href: '/contact/', style: 'primary' },
      { text: 'กลับไปภาพรวมพาร์ทเนอร์', href: '/partner-program/', style: 'ghost' },
    ],
  },
};
