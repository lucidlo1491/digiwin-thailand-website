/**
 * th-elec-products.js — Thai Electronics Products (S7) — COPY
 *
 * Same layout/CSS as English electronics-products.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/electronics');

// SVG icons — same as English
const CARD_SVGS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>',
];

function blocks() {
  const p = th.products;

  const cardsHTML = p.cards.map((card, i) => `
                    <a href="${card.href}" class="product-card">
                        <div class="product-card-icon">${CARD_SVGS[i]}</div>
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                        <span class="product-card-link">${card.linkText} <span>\u2192</span></span>
                    </a>`).join('');

  const html = `
    <div class="products-section">
    <div class="products-inner">
                <div class="products-header">
                    <h2>${p.title}</h2>
                </div>
                <div class="products-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(p.adminLabel, html, 'Products: Content');
}

// Reuse English CSS
const { css } = require('./electronics-products');

module.exports = { blocks, css };
