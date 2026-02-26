/**
 * th-news.js — Thai News & Events page config for build-page.js
 *
 * 6 sections: hero, featured, upcoming, series, past, cta
 * Page ID: 100787 (slug: th/news)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-news [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-news-hero');
const thFeatured = require('./sections/th-news-featured');
const thUpcoming = require('./sections/th-news-upcoming');
const thSeries = require('./sections/th-news-series');
const thPast = require('./sections/th-news-past');
const thCta = require('./sections/th-news-cta');

module.exports = {
  pageId: 100787,
  title: 'ข่าวสาร — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'news.html'),
  protoFile: 'news.html',

  sections: [
    { name: 'hero', builder: thHero },
    { name: 'featured', builder: thFeatured },
    { name: 'upcoming', builder: thUpcoming },
    { name: 'series', builder: thSeries },
    { name: 'past', builder: thPast },
    { name: 'cta', builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/news/',
    sections: [
      {
        name: 'hero', wpSelector: '.hero-inner', htmlSelector: '.news-hero-inner',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Hero Title', htmlSel: '.news-hero-inner h1', wpSel: '.hero-inner h1' },
          { label: 'Hero Subtitle', htmlSel: '.news-hero-subtitle', wpSel: '.hero-subtitle' },
          { label: 'Hero Badge', htmlSel: '.news-hero-badge', wpSel: '.hero-badge' },
          { label: 'Stat Value', htmlSel: '.news-hero-stat-value', wpSel: '.hero-stat-value' },
        ],
      },
      {
        name: 'featured', wpSelector: '.featured-inner', htmlSelector: '.featured-inner',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Featured Label', htmlSel: '.featured-label', wpSel: '.featured-label' },
          { label: 'Event Title', htmlSel: '.featured-content h2', wpSel: '.featured-content h2' },
          { label: 'Event CTA', htmlSel: '.event-cta', wpSel: '.event-cta' },
        ],
      },
      {
        name: 'upcoming', wpSelector: '.upc-inner', htmlSelector: '.upcoming-inner',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.upcoming-header h2', wpSel: '.upc-header h2' },
          { label: 'Card Title', htmlSel: '.upcoming-card h3', wpSel: '.upc-card h3' },
          { label: 'Section Label', htmlSel: '.upcoming-section .section-label', wpSel: '.upc-inner .section-label' },
        ],
      },
      {
        name: 'series', wpSelector: '.series-inner', htmlSelector: '.series-inner',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.series-header h2', wpSel: '.series-header h2' },
          { label: 'Step Number', htmlSel: '.series-step-number', wpSel: '.series-step-number' },
          { label: 'Step Label', htmlSel: '.series-step-label', wpSel: '.series-step-label' },
        ],
      },
      {
        name: 'past', wpSelector: '.past-inner', htmlSelector: '.past-inner',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.past-header h2', wpSel: '.past-header h2' },
          { label: 'Filter Tab', htmlSel: '.filter-tab', wpSel: '.filter-tab' },
          { label: 'Card Title', htmlSel: '.past-card h4', wpSel: '.past-card h3' },
        ],
      },
      {
        name: 'cta', wpSelector: '.news-cta-inner', htmlSelector: '.news-cta-inner',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'CTA Title', htmlSel: '.news-cta-inner h2', wpSel: '.news-cta-inner h2' },
          { label: 'Subscribe Button', htmlSel: '.cta-btn', wpSel: '.cta-btn' },
          { label: 'Secondary Link', htmlSel: '.cta-secondary-link', wpSel: '.cta-secondary-link' },
        ],
      },
    ],
  },
};
