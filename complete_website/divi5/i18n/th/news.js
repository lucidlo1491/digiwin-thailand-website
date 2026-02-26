/**
 * i18n/th/news.js — Thai content for News & Events page
 *
 * 6 sections: hero, featured, upcoming, series, past, cta
 *
 * Style guide: professional-approachable (ภาษาทางการกึ่งสุภาพ)
 * Target: Track A (Thai factory operators)
 * Emotional arc: Empathetic → Confident → Reassuring → Action-oriented
 *
 * Rules:
 * - Product names stay English: ERP, MES, WMS, AIoT, OEE, BOM, EDI
 * - Stats/numbers identical to English source
 * - CTA: "พูดคุยกับเรา" — never "จองการสาธิต"
 * - Spell out abbreviations on first use
 * - Thai manufacturing terms: สายการผลิต, พื้นที่หน้างาน, แม่พิมพ์
 * - Event names, dates, locations stay in English or transliterate naturally
 */

module.exports = {
  // ── S1: Hero ───────────────────────────────────────────────────
  hero: {
    badge: 'ข่าวสารและกิจกรรม',
    title: 'เมื่อความรู้ด้านการผลิต<span>กลายเป็นการลงมือทำ</span>',
    subtitle: 'เวิร์กช็อปอุตสาหกรรม สัมมนาด้านการปฏิบัติตามกฎระเบียบ เยี่ยมชมโรงงานจริง และงานแสดงสินค้า ออกแบบมาเพื่อผู้ผลิตไทยที่พร้อมยกระดับการดำเนินงาน',
    stats: [
      { value: '4+', label: 'กิจกรรมต่อไตรมาส' },
      { value: '100+', label: 'โรงงานไทยที่ให้บริการ' },
      { value: 'Free', label: 'กิจกรรมส่วนใหญ่' },
    ],
  },

  // ── S2: Featured Event ─────────────────────────────────────────
  featured: {
    label: 'กิจกรรมแนะนำ',
    eventType: 'Workshop',
    title: 'เวิร์กช็อป BOI Compliance: การกระทบยอดระดับใบสั่งผลิตที่ผ่านทุกการตรวจสอบ',
    date: 'March 15, 2026 | 09:00 – 16:00',
    time: '09:00 – 16:00',
    location: 'Bangkok, Thailand',
    urgency: 'จำกัดเพียง 30 ท่าน',
    description: 'เรียนรู้วิธีการติดตามวัตถุดิบระดับใบสั่งผลิตที่ช่วยลดภาษี BOI เพิ่มเติม อ้างอิงกรณีศึกษา Jin Hai: จากภาษีเพิ่มเติม 10 ล้านบาท/ปี เหลือศูนย์',
    ctaText: 'ลงทะเบียนเลย',
  },

  // ── S3: Upcoming Events ────────────────────────────────────────
  upcoming: {
    label: 'กิจกรรมที่กำลังจะมาถึง',
    title: 'กิจกรรมถัดไป',
    cards: [
      {
        type: 'seminar',
        typeLabel: 'Seminar',
        title: 'ความโปร่งใสในการผลิต: จากรายงานกระดาษสู่ Dashboard แบบ Real-Time',
        date: 'April 10, 2026 | 1:00 PM -- 5:00 PM',
        location: 'Bangkok, Thailand',
        desc: 'ค้นพบวิธีที่โรงงานเปลี่ยนจากรายงานกระดาษเป็น Dashboard การผลิตแบบ Real-time ที่แจ้งปัญหาก่อนจะกลายเป็นความล่าช้าที่มีค่าใช้จ่ายสูง',
        linkText: 'เรียนรู้เพิ่มเติม',
      },
      {
        type: 'workshop',
        typeLabel: 'Workshop',
        title: 'ลงมือจริง: ตั้งค่าระบบเก็บข้อมูลหน้างานด้วย MES',
        date: 'April 24, 2026 | 9:00 AM -- 4:00 PM',
        location: 'Bangkok, Thailand',
        desc: 'เวิร์กช็อปลงมือปฏิบัติจริง ตั้งค่าโมดูล MES (ระบบบริหารการผลิต) เชื่อมต่ออุปกรณ์หน้างาน และดูข้อมูล OEE (ประสิทธิผลโดยรวมของเครื่องจักร) ไหลจากเครื่องจักรสู่ Dashboard แบบ Real-time',
        linkText: 'เรียนรู้เพิ่มเติม',
      },
      {
        type: 'factory-visit',
        typeLabel: 'Factory Visit',
        title: 'เยี่ยมชมโรงงานจริง: ดู DigiWin MES ทำงานในสายการผลิต',
        date: 'May 8, 2026 | 10:00 AM -- 3:00 PM',
        location: 'EEC Industrial Zone, Thailand',
        desc: 'เดินชมพื้นที่หน้างานจริงของโรงงานที่ใช้ DigiWin MES ดูข้อมูลการผลิตไหลจากเครื่องจักรสู่ Dashboard ของผู้บริหารแบบ Real-time',
        linkText: 'เรียนรู้เพิ่มเติม',
      },
      {
        type: 'trade-show',
        typeLabel: 'Trade Show',
        title: 'Manufacturing Expo Thailand 2026',
        date: 'May 20-22, 2026',
        location: 'BITEC, Bangkok',
        desc: 'พบเราที่บูธ A12 สาธิตระบบ ERP, MES, WMS และ AIoT พบทีมงานไทยของเรา และชมระบบ Manufacturing Intelligence แบบครบวงจร',
        linkText: 'เรียนรู้เพิ่มเติม',
      },
    ],
  },

  // ── S4: Series (Recurring Campaign) ────────────────────────────
  series: {
    label: 'แคมเปญต่อเนื่อง',
    title: 'ซีรีส์ยกระดับความสามารถในการแข่งขันของโรงงาน',
    subtitle: 'เจาะลึกรายเดือนเกี่ยวกับความท้าทายที่ผู้ผลิตไทยเผชิญ\u2014และเครื่องมือที่ช่วยแก้ปัญหา',
    steps: [
      {
        label: 'Month 1',
        title: 'BOI Compliance',
        desc: 'ลดภาษีเพิ่มเติมด้วยการกระทบยอดวัตถุดิบระดับใบสั่งผลิต',
      },
      {
        label: 'Month 2',
        title: 'ความโปร่งใสในการผลิต',
        desc: 'เปลี่ยนจากรายงานกระดาษเป็นการมองเห็นพื้นที่หน้างานแบบ Real-time',
      },
      {
        label: 'Month 3',
        title: 'การจัดการกระแสเงินสด',
        desc: 'เชื่อมต่อต้นทุนการผลิตกับการวางแผนการเงินแบบ Real-time',
      },
      {
        label: 'Month 4',
        title: 'ทางเลือกการเปลี่ยน ERP',
        desc: 'ทำอย่างไรเมื่อระบบ ERP ปัจจุบันหมดอายุการใช้งาน',
      },
    ],
  },

  // ── S5: Past Events ────────────────────────────────────────────
  past: {
    label: 'กิจกรรมที่ผ่านมา',
    title: 'สิ่งที่เราทำมาแล้ว',
    filters: {
      all: 'ทั้งหมด',
      seminar: 'สัมมนา',
      workshop: 'เวิร์กช็อป',
      factoryVisit: 'เยี่ยมชมโรงงาน',
      tradeShow: 'งานแสดงสินค้า',
    },
    cards: [
      {
        type: 'seminar',
        typeLabel: 'Seminar',
        title: 'ERP สำหรับอุตสาหกรรมการผลิตไทย: สิ่งที่ต้องมองหาในปี 2026',
        date: 'January 18, 2026',
        linkText: 'ดูสรุป',
      },
      {
        type: 'workshop',
        typeLabel: 'Workshop',
        title: 'ประสิทธิภาพคลังสินค้า: พื้นฐาน WMS สำหรับโรงงานผลิต',
        date: 'December 12, 2025',
        linkText: 'ดูสรุป',
      },
      {
        type: 'trade-show',
        typeLabel: 'Trade Show',
        title: 'สรุป Manufacturing Expo Thailand 2025',
        date: 'November 15-17, 2025',
        linkText: 'ดูสรุป',
      },
    ],
  },

  // ── S6: CTA ────────────────────────────────────────────────────
  cta: {
    title: 'อย่าพลาดกิจกรรมถัดไป',
    subtitle: 'เข้าร่วมกับผู้เชี่ยวชาญด้านการผลิตไทยกว่า 500 คน ที่ติดตามเทรนด์อุตสาหกรรม อัปเดตกฎระเบียบ และโอกาสด้านเทคโนโลยี',
    subscribePlaceholder: 'กรอกอีเมลของคุณ',
    subscribeBtn: 'สมัครรับข่าวสาร',
    secondaryLink: 'หรือพูดคุยกับเราโดยตรง',
  },
};
