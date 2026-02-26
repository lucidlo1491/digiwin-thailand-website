/**
 * events-listing.js — Thai content for the Events Listing page
 *
 * Translation principles (from _style-guide.md):
 * - Cultural adaptation, not literal translation
 * - Event names, dates, locations stay in English (proper nouns)
 * - Badge types translated to Thai
 * - CTAs: "ดูรายละเอียด" — never "จองการสาธิต"
 * - Product names stay English: ERP, MES, WMS, AIoT, BOI
 *
 * Usage:
 *   const thEvents = require('../../i18n/th/events-listing');
 *   // thEvents.hero.title, thEvents.hero.subtitle, etc.
 *   // thEvents.badges — Thai translations for event type badges
 *   // thEvents.ui — UI labels (back link, view details arrow)
 */

const hero = {
  adminLabel: 'Events Listing (Thai)',
  backLink: '&larr; กลับไปข่าวสารและกิจกรรม',
  backHref: '/th/news/',
  title: 'กิจกรรมที่กำลังจะมาถึง',
  subtitle: 'เวิร์กช็อป สัมมนา ทัวร์โรงงาน และงานแสดงสินค้าสำหรับผู้ผลิตไทย',
};

const badges = {
  'Workshop': 'เวิร์กช็อป',
  'Factory Visit': 'เยี่ยมชมโรงงาน',
  'Trade Show': 'งานแสดงสินค้า',
  'Seminar': 'สัมมนา',
};

const ui = {
  viewDetails: 'ดูรายละเอียด &rarr;',
};

module.exports = {
  hero,
  badges,
  ui,
};
