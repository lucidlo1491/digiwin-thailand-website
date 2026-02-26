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
  const cardsHtml = D.cards.map(card => `
                    <div class="${P}-card fade-in-section">
                        <div class="${P}-card-border ${card.type}"></div>
                        <div class="${P}-card-body">
                            <span class="event-type-badge ${card.type}">${card.typeLabel}</span>
                            <h3>${card.title}</h3>
                            <div class="event-meta">
                                <div class="event-meta-item">
                                    <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    ${card.date}
                                </div>
                                <div class="event-meta-item">
                                    <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    ${card.location}
                                </div>
                            </div>
                            <p>${card.desc}</p>
                            <a href="#" class="event-link">${card.linkText} <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
                        </div>
                    </div>`).join('\n');

  const html = `
    <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header fade-in-section">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                </div>
                <div class="${P}-grid">
                    ${cardsHtml}
                </div>
            </div>`;

  return base.wrapInDiviSection('Upcoming', html, 'Upcoming: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
