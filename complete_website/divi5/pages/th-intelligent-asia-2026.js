/**
 * th-intelligent-asia-2026.js — Thai Intelligent Asia Thailand 2026 event page config
 *
 * WordPress page: Thai Intelligent Asia Thailand 2026 (slug: th/intelligent-asia-2026)
 * Sections: 9 (same structure as English, all Thai content)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-intelligent-asia-2026 [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

const thHeroBuilder = require('./sections/th-iat-hero');
const thBannerBuilder = require('./sections/th-iat-banner');
const thProblemBuilder = require('./sections/th-iat-problem');
const thOutcomesBuilder = require('./sections/th-iat-outcomes');
const thPersonasBuilder = require('./sections/th-iat-personas');
const thProofBuilder = require('./sections/th-iat-proof');
const thLogisticsBuilder = require('./sections/th-iat-logistics');
const thRegisterBuilder = require('./sections/th-iat-register');
const thRelatedBuilder = require('./sections/th-iat-related');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100825,
  title: 'Intelligent Asia Thailand 2026 — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: null,
  protoFile: null,

  sections: [
    { name: 'iat-hero', builder: thHeroBuilder },
    { name: 'iat-banner', builder: thBannerBuilder },
    { name: 'iat-problem', builder: thProblemBuilder },
    { name: 'iat-outcomes', builder: thOutcomesBuilder },
    { name: 'iat-personas', builder: thPersonasBuilder },
    { name: 'iat-proof', builder: thProofBuilder },
    { name: 'iat-logistics', builder: thLogisticsBuilder },
    { name: 'iat-register', builder: thRegisterBuilder },
    { name: 'iat-related', builder: thRelatedBuilder },
  ],

  extraCSS: () => thaiTypographyCSS(),

  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01', url: '/th/' },
        { name: '\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21', url: '/th/news/' },
        { name: 'Intelligent Asia Thailand 2026', url: '/th/intelligent-asia-2026/' },
      ])),
      schema.thaiVariant(schema.event({
        name: 'Intelligent Asia Thailand 2026 - DigiWin Booth I132',
        description: 'เยี่ยมชม DigiWin ที่บูธ I132, EH 98 Hall, Intelligent Asia Thailand 2026 ที่ไบเทค บางนา กรุงเทพฯ',
        startDate: '2026-03-11T10:00:00+07:00',
        endDate: '2026-03-13T18:00:00+07:00',
        locationName: 'BITEC Bangna',
        city: 'Bangkok',
        country: 'TH',
        isAccessibleForFree: true,
      })),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: null,
    sections: [],
  },
};
