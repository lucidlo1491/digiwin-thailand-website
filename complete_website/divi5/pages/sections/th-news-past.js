/**
 * th-news-past.js — Thai News Past Events Section (S5)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: news-past.js + i18n/th/news.js past
 */

const base = require('../../lib/templates/_base');
const en = require('./news-past');
const th = require('../../i18n/th/news');

const P = 'past'; // Same CSS prefix as English
const D = th.past;

function blocks() {
  const cardsHtml = D.cards.map(card => `
                    <div class="${P}-card fade-in-section" data-type="${card.type}">
                        <span class="event-type-badge ${card.type}">${card.typeLabel}</span>
                        <h3>${card.title}</h3>
                        <span class="event-date">${card.date}</span>
                        <a href="#" class="event-link">${card.linkText} <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
                    </div>`).join('\n');

  const html = `
    <div class="dw-d-bg dw-d-bg--corner-br" style="opacity: 0.06;"></div>
            <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header fade-in-section">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                </div>
                <div class="filter-bar fade-in-section">
                    <button class="filter-tab active" data-filter="all">${D.filters.all}</button>
                    <button class="filter-tab" data-filter="seminar">${D.filters.seminar}</button>
                    <button class="filter-tab" data-filter="workshop">${D.filters.workshop}</button>
                    <button class="filter-tab" data-filter="factory-visit">${D.filters.factoryVisit}</button>
                    <button class="filter-tab" data-filter="trade-show">${D.filters.tradeShow}</button>
                </div>
                <div class="${P}-grid" id="${P}-events-grid">
                    ${cardsHtml}
                </div>
            </div>`;

  return base.wrapInDiviSection('Past', html, 'Past: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
