/**
 * th-news-upcoming.js — Thai News Upcoming Events Section (S3)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: news-upcoming.js + i18n/th/news.js upcoming
 */

const base = require('../../lib/templates/_base');
const en = require('./news-upcoming');
const th = require('../../i18n/th/news');

const P = 'upc'; // Same CSS prefix as English
const D = th.upcoming;

function blocks() {
  // Cards are populated here when real events are confirmed.
  const html = `
    <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header fade-in-section">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                </div>
                <div class="${P}-empty">
                    <p>กำลังวางแผนกิจกรรมใหม่ ติดตามเราเพื่อรับข่าวสารล่าสุด</p>
                    <a href="/th/demo/" class="event-link">พูดคุยกับเรา <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
                </div>
            </div>`;

  return base.wrapInDiviSection('Upcoming', html, 'Upcoming: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
