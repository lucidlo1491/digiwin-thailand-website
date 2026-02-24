/**
 * events-listing.js — Events listing page config
 *
 * WordPress page: Events (ID 100752, slug: events, parent: 100571 news)
 * URL: /news/events/
 *
 * Simple listing page showing all upcoming events from events-registry.
 * Uses a single Code Module with styled event cards.
 */

const path = require('path');
const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../lib/modules');
const { ALL_EVENTS } = require('./events-registry');

const P = 'evt-list';

function heroBlocks() {
  const events = Object.values(ALL_EVENTS);
  const eventCards = events.map(evt => `
    <a href="${evt.href}" class="${P}-card">
      <span class="${P}-badge" style="background:${evt.color}20;color:${evt.color}">${evt.typeBadge}</span>
      <h3 class="${P}-card-title">${evt.shortTitle}</h3>
      <div class="${P}-card-meta">
        <span class="${P}-date">${evt.date}</span>
        <span class="${P}-loc">${evt.location}</span>
      </div>
      <span class="${P}-arrow">View Details &rarr;</span>
    </a>`).join('\n');

  const html = `<style>${heroCSS()}</style>
<section class="${P}-hero">
  <div class="${P}-inner">
    <a href="/news/" class="${P}-back">&larr; Back to News &amp; Events</a>
    <h1 class="${P}-title">Upcoming Events</h1>
    <p class="${P}-subtitle">Workshops, seminars, factory tours, and trade shows for Thai manufacturers.</p>
    <div class="${P}-grid">
      ${eventCards}
    </div>
  </div>
</section>`;

  return [
    sectionOpen({ adminLabel: 'Events Listing', css: `selector{padding:0!important;margin:0!important;background:#000864!important;width:100%!important;max-width:100%!important;}` }),
    rowOpen({ adminLabel: 'Events Row', css: 'selector{max-width:100%!important;width:100%!important;padding:0!important;margin:0!important;}' }),
    columnOpen({ adminLabel: 'Events Column', css: 'selector{padding:0!important;}' }),
    codeModule(html, 'Events Listing: All upcoming events'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function heroCSS() {
  return `
.${P}-hero{background:linear-gradient(165deg,#0f1419 0%,#1a2632 40%,#000864 100%);padding:140px 24px 100px;position:relative;min-height:60vh}
.${P}-inner{max-width:1200px;margin:0 auto}
.${P}-back{color:rgba(255,255,255,0.6);text-decoration:none;font-size:14px;display:inline-flex;align-items:center;gap:8px;margin-bottom:32px;transition:color 0.2s;font-family:'Noto Sans',sans-serif}
.${P}-back:hover{color:#00AFF0}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:48px;font-weight:700;color:#fff;margin:0 0 16px;line-height:1.2}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;color:rgba(255,255,255,0.7);margin:0 0 48px;max-width:600px;line-height:1.6}
.${P}-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px}
.${P}-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;text-decoration:none;display:flex;flex-direction:column;gap:12px;transition:all 0.3s ease}
.${P}-card:hover{background:rgba(255,255,255,0.1);border-color:rgba(0,175,240,0.3);transform:translateY(-2px)}
.${P}-badge{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;padding:4px 12px;border-radius:6px;display:inline-block;width:fit-content}
.${P}-card-title{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#fff;margin:0;line-height:1.3}
.${P}-card-meta{display:flex;flex-direction:column;gap:4px;margin-top:4px}
.${P}-date,.${P}-loc{font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.5)}
.${P}-arrow{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:500;color:#00AFF0;margin-top:auto;padding-top:8px}
@media(max-width:640px){
  .${P}-hero{padding:120px 20px 60px}
  .${P}-title{font-size:32px}
  .${P}-grid{grid-template-columns:1fr}
}
@media(prefers-reduced-motion:reduce){
  .${P}-card{transition:none}
  .${P}-back{transition:none}
}`;
}

module.exports = {
  pageId: 100752,
  title: 'Events',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: null,
  protoFile: null,

  sections: [
    { name: 'hero', builder: { blocks: heroBlocks, css: () => '' } },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button'],
    maxHtmlBlocks: 2,
  },

  verify: {
    wpUrl: 'http://digiwin-thailand.local/news/events/',
    sections: [
      {
        name: 'hero', wpSelector: `.${P}-inner`, htmlSelector: `.${P}-inner`,
        pixelThreshold: 0.1,
        styleMap: [],
      },
    ],
  },
};
