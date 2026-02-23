/**
 * electronics-section.js — FAQ Section (S8)
 *
 * Source: electronics.html line 709
 */

const template = require('../../lib/templates/faq-accordion');

const data = {
  adminLabel: 'Section',
  sectionPrefix: 'elec-faq',
  items: [
    { question: 'What MES system works best for electronics assembly in Thailand?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin MES is purpose-built for the complexity of electronics assembly, with native SMT machine integration that generic MES platforms cannot match. The system handles high-mix, low-volume production with thousands of unique component types, tracking every reel to every board position. It is deployed across Thailand\'s electronics ecosystem, which exports over $40 billion in electronics annually, from hard disk drives to automotive electronics.</p>' },
    { question: 'Can DigiWin MES integrate with Fuji and Panasonic SMT machines?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin provides direct machine connectivity with all major SMT equipment brands including Fuji, Panasonic, Yamaha, Juki, and ASM pick-and-place machines, as well as AOI and ICT inspection systems from Koh Young, Omron, and Keysight. This integration enables reel verification at the feeder, wrong-part prevention, and automated program downloads, eliminating the manual data entry that causes costly component placement errors.</p>' },
    { question: 'How does DigiWin handle moisture-sensitive component (MSD) tracking?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin automates the entire floor-life management process for moisture-sensitive devices. The system starts an automatic countdown the moment an MSD package is opened and exposed to floor conditions, tracks bake-out cycles for components that need reconditioning, and sends expiry alerts that block expired components from being used on the line. This automated approach has achieved a 45% reduction in MSD-related scrap compared to manual tracking methods.</p>' },
    { question: 'Does DigiWin support BOI compliance for electronics factories?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin provides production-order-level material reconciliation specifically designed for BOI audits in electronics manufacturing. The system tracks actual component consumption per assembly order, which is critical for bonded electronic components that require precise import duty reconciliation. Electronics factories using DigiWin for BOI compliance have reported savings of over 10 million THB per year through accurate duty drawback claims and BOI-ready audit reports.</p>' },
    { question: 'What pick accuracy can I achieve with DigiWin WMS?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin sFLS WMS delivers 99.9% pick accuracy for electronics warehouse operations. The system manages reel-level inventory with precise moisture-sensitive component handling, automated kitting support for production orders, and barcode-driven verification at every step. For electronics factories managing hundreds of unique parts per product and thousands of reels in inventory, this level of accuracy prevents the costly errors where one wrong component placed can result in an entire batch being scrapped.</p>' },
  ],
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
