/**
 * th-blog.js — Thai Blog Hub page config for build-page.js
 *
 * 5 sections: hub-hero, hub-featured, articles, library, hub-cta
 * Page ID: 100788 (slug: th/blog)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-blog [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHubHero = require('./sections/th-blog-hub-hero');
const thHubFeatured = require('./sections/th-blog-hub-featured');
const thArticles = require('./sections/th-blog-articles');
const thLibrary = require('./sections/th-blog-library');
const thHubCta = require('./sections/th-blog-hub-cta');

module.exports = {
  pageId: 100788,
  title: 'บทความ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'blog.html'),
  protoFile: 'blog.html',

  sections: [
    { name: 'hub-hero', builder: thHubHero },
    { name: 'hub-featured', builder: thHubFeatured },
    { name: 'articles', builder: thArticles },
    { name: 'library', builder: thLibrary },
    { name: 'hub-cta', builder: thHubCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/blog/',
    sections: [
      {
        name: 'hub-hero', wpSelector: '.hubh-hero-inner', htmlSelector: '.blog-hub-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Stat Number', htmlSel: '.blog-hub-hero [data-target]', wpSel: '.hubh-hero-inner [data-target]' },
        ],
      },
      {
        name: 'hub-featured', wpSelector: '.hubf-featured-inner', htmlSelector: '.blog-hub-featured-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.blog-hub-featured-section h2', wpSel: '.hubf-featured-inner h2' },
        ],
      },
      {
        name: 'articles', wpSelector: '.articles-inner', htmlSelector: '.articles-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.articles-section h2', wpSel: '.articles-inner h2' },
        ],
      },
      {
        name: 'library', wpSelector: '.lib-inner', htmlSelector: '.library-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.library-section h2', wpSel: '.lib-inner h2' },
        ],
      },
      {
        name: 'hub-cta', wpSelector: '.hubc-cta-inner', htmlSelector: '.blog-hub-cta',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.blog-hub-cta h2', wpSel: '.hubc-cta-inner h2' },
        ],
      },
    ],
  },
};
