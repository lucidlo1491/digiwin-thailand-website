/**
 * _shared.js — Common Thai translations used across all pages
 *
 * Single source of truth for repeated phrases (CTAs, labels, stats).
 * Import into page-specific content files: const shared = require('./_shared');
 */

module.exports = {
  // ── CTA Buttons ──────────────────────────────────────────────
  cta: {
    letsTalk: 'พูดคุยกับเรา',
    getInTouch: 'ติดต่อเรา',
    exploreSolutions: 'ดูโซลูชันทั้งหมด',
    explorePartnership: 'สำรวจโปรแกรมพันธมิตร',
    learnMore: 'เรียนรู้เพิ่มเติม',
    seeResults: 'ดูผลลัพธ์',
    escapeTheTrap: 'หลุดพ้นจากกับดัก',
  },

  // ── Recurring Stats Labels ───────────────────────────────────
  stats: {
    yearsManufacturing: 'ปีเชี่ยวชาญด้านการผลิต',
    factoriesServed: 'โรงงานที่ให้บริการ',
    shenzhenListed: 'จดทะเบียนเสิ่นเจิ้น',
    licenseMargins: 'มาร์จินลิขสิทธิ์',
    maintenanceRevenue: 'รายได้บำรุงรักษา',
    thaiImplementations: 'ติดตั้งในประเทศไทย',
    maRenewalRate: 'อัตราการต่อสัญญาบำรุงรักษา',
    accountingPartners: 'พันธมิตรสำนักงานบัญชี',
  },

  // ── Section Labels ───────────────────────────────────────────
  labels: {
    forFactoryOwners: 'สำหรับเจ้าของโรงงานผลิต',
    forERPImplementers: 'สำหรับผู้ให้บริการ ERP',
    industryExpertise: 'ความเชี่ยวชาญด้านอุตสาหกรรม',
    ourProducts: 'โซลูชันของเรา',
    trustedBy: 'ได้รับความไว้วางใจจาก',
    provenResults: 'ผลลัพธ์ที่พิสูจน์แล้ว',
    whyDigiWin: 'ทำไมต้อง DigiWin',
  },

  // ── Thai typography CSS (append to any Thai section) ─────────
  thaiFontCSS(prefix) {
    return `
/* === THAI FONT OVERRIDE (${prefix}) === */
[lang="th"] .${prefix}-title,
[lang="th"] .${prefix}-subtitle,
[lang="th"] .${prefix}-label,
[lang="th"] .${prefix}-btn--primary,
[lang="th"] .${prefix}-btn--ghost,
[lang="th"] .${prefix}-card-title,
[lang="th"] .${prefix}-card-desc,
[lang="th"] .${prefix}-stat-label {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;
  },
};
