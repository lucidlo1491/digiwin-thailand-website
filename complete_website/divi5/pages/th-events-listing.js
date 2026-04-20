/**
 * th-events-listing.js — Thai Events Listing page config for build-page.js
 *
 * WordPress page: Thai Events Listing (ID 100789, slug: th/news/events)
 * URL: /th/news/events/
 * 1 section: hero (event cards grid with Thai UI text)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-events-listing [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builder
const thHero = require('./sections/th-events-hero');
const schema = require('../lib/schema');

const P = 'evt-list';

module.exports = {
  pageId: 100789,
  title: 'กิจกรรมและอีเวนต์ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: null,
  protoFile: null,

  sections: [
    { name: 'hero', builder: thHero },
  ],

  extraCSS: () => thaiTypographyCSS(),


  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01', url: '/th/' },
        { name: '\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21', url: '/th/news/' },
        { name: '\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21', url: '/th/news/events/' },
      ])),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button'],
    maxHtmlBlocks: 2,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/news/events/',
    sections: [
      {
        name: 'hero', wpSelector: `.${P}-inner`, htmlSelector: `.${P}-inner`,
        pixelThreshold: 0.1,
        styleMap: [],
      },
    ],
  },
};
