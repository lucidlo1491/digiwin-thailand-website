/**
 * intelligent-asia-2026.js — Intelligent Asia Thailand 2026 event page config
 *
 * WordPress page: Intelligent Asia Thailand 2026 (slug: intelligent-asia-2026)
 * Sections: 9 (event template structure)
 *
 * Usage: node complete_website/divi5/build-page.js --page intelligent-asia-2026 [--dry-run]
 */

const path = require('path');

const heroBuilder = require('./sections/iat-hero');
const bannerBuilder = require('./sections/iat-banner');
const problemBuilder = require('./sections/iat-problem');
const outcomesBuilder = require('./sections/iat-outcomes');
const personasBuilder = require('./sections/iat-personas');
const proofBuilder = require('./sections/iat-proof');
const logisticsBuilder = require('./sections/iat-logistics');
const registerBuilder = require('./sections/iat-register');
const relatedBuilder = require('./sections/iat-related');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100824,
  title: 'Intelligent Asia Thailand 2026 — DigiWin Smart Electronics Manufacturing',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: null,
  protoFile: null,

  sections: [
    { name: 'iat-hero', builder: heroBuilder },
    { name: 'iat-banner', builder: bannerBuilder },
    { name: 'iat-problem', builder: problemBuilder },
    { name: 'iat-outcomes', builder: outcomesBuilder },
    { name: 'iat-personas', builder: personasBuilder },
    { name: 'iat-proof', builder: proofBuilder },
    { name: 'iat-logistics', builder: logisticsBuilder },
    { name: 'iat-register', builder: registerBuilder },
    { name: 'iat-related', builder: relatedBuilder },
  ],

  schema() {
    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'News & Events', url: '/news/' },
        { name: 'Intelligent Asia Thailand 2026', url: '/intelligent-asia-2026/' },
      ]),
      schema.event({
        name: 'Intelligent Asia Thailand 2026 - DigiWin Booth I132',
        description: 'Visit DigiWin at Booth I132, EH 98 Hall, Intelligent Asia Thailand 2026 at BITEC Bangkok. e-Tax compliance, AI smart manufacturing, and electronics industry MES solutions.',
        startDate: '2026-03-11T10:00:00+07:00',
        endDate: '2026-03-13T18:00:00+07:00',
        locationName: 'BITEC Bangna',
        city: 'Bangkok',
        country: 'TH',
        isAccessibleForFree: true,
      }),
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
