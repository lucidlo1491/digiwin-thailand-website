/**
 * th-metal-plastics-products.js — Thai Products Section
 *
 * Reuses English CSS + SVG icons. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./metal-plastics-products');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.products;
const P = 'products';

function blocks() {
  const html = `
    <div class="${P}-inner">
                <div class="${P}-header">
                    <h2>${t.h2}</h2>
                </div>
                <div class="${P}-grid">
                    <a href="../products/aiot.html" class="product-card">
                        <div class="product-card-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                        <h3>${t.cards[0].title}</h3>
                        <p>${t.cards[0].p}</p>
                        <span class="product-card-link">${t.cards[0].link} <span>\u2192</span></span>
                    </a>
                    <a href="../products/mes.html" class="product-card">
                        <div class="product-card-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></svg>
                        </div>
                        <h3>${t.cards[1].title}</h3>
                        <p>${t.cards[1].p}</p>
                        <span class="product-card-link">${t.cards[1].link} <span>\u2192</span></span>
                    </a>
                    <a href="../products/erp.html" class="product-card">
                        <div class="product-card-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                        </div>
                        <h3>${t.cards[2].title}</h3>
                        <p>${t.cards[2].p}</p>
                        <span class="product-card-link">${t.cards[2].link} <span>\u2192</span></span>
                    </a>
                </div>
            </div>`;

  return base.wrapInDiviSection('Products (Thai)', html, 'Products: Content');
}

module.exports = { blocks, css: () => en.css() };
