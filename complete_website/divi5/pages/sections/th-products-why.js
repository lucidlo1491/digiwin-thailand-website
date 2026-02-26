/**
 * th-products-why.js — Thai Why DigiWin Products Section (S4)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: products-why.js + i18n/th/products.js why
 */

const base = require('../../lib/templates/_base');
const en = require('./products-why');
const th = require('../../i18n/th/products');

const P = 'prod-why'; // Same CSS prefix as English
const D = th.why;

function blocks() {
  const cardsHTML = D.cards.map(card => `
          <div class="${P}-card">
            <div class="${P}-card-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                ${card === D.cards[0]
                  ? '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
                  : card === D.cards[1]
                    ? '<path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>'
                    : '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
                }
              </svg>
            </div>
            <h3 class="${P}-card-title">${card.title}</h3>
            <p class="${P}-card-desc">${card.desc}</p>
          </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <p class="${P}-label">${D.label}</p>
          <h2 class="${P}-title">${D.title}</h2>
        </div>
        <div class="${P}-grid">
          ${cardsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Why', html, 'Why: Content');
}

// Reuse English CSS identically (same prefix, same structure)
function css() {
  return en.css();
}

module.exports = { blocks, css };
