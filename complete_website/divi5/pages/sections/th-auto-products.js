/**
 * th-auto-products.js — Thai Automotive Products Section (S5)
 *
 * Reuses English CSS + SVG icons. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./automotive-products');
const thAuto = require('../../i18n/th/automotive');

const t = thAuto.products;

// Product card SVG icons (same as English)
const ICONS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>',
];

function blocks() {
  const cardsHTML = t.cards.map((card, i) => `
                    <a href="${card.href}" class="product-card">
                        <div class="product-card-icon">
                            ${ICONS[i]}
                        </div>
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                        <span class="product-card-link">${card.linkText} <span>\u2192</span></span>
                    </a>`).join('');

  const html = `
    <div class="products-section">
    <div class="products-inner">
                <div class="products-header">
                    <h2>${t.h2}</h2>
                </div>
                <div class="products-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Products (Thai)', html, 'Products: Content');
}

module.exports = { blocks, css: () => en.css() };
