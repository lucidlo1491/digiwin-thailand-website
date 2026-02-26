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
