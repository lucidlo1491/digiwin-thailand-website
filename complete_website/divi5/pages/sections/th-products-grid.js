/**
 * th-products-grid.js — Thai Products Hub Grid Section (S2)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: products-grid.js + i18n/th/products.js grid
 */

const base = require('../../lib/templates/_base');
const en = require('./products-grid');
const th = require('../../i18n/th/products');

const P = 'prod-grid'; // Same CSS prefix as English
const D = th.grid;

// Reuse English SVG constants and icon SVGs
const CHECK_SVG = '<svg aria-hidden="true" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5"/></svg>';
const ARROW_SVG = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

const ICON_SVGS = {
  erp: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <rect x="4" y="4" width="32" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M4 14h32" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 14v22" stroke="currentColor" stroke-width="1.5"/>
    <rect x="17" y="18" width="8" height="4" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="17" y="25" width="12" height="4" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="17" y="32" width="6" height="2" rx="0.5" fill="currentColor" opacity="0.5"/>
    <circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.6"/>
  </svg>`,
  mes: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <path d="M4 32h32" stroke="currentColor" stroke-width="1.5"/>
    <rect x="6" y="18" width="8" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <rect x="16" y="12" width="8" height="20" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="8" width="8" height="24" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="10" cy="22" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="20" cy="16" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="30" cy="12" r="2" fill="currentColor" opacity="0.6"/>
    <path d="M10 24v4M20 18v10M30 14v14" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  </svg>`,
  wms: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <path d="M20 4L4 12v20l16 8 16-8V12L20 4z" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M4 12l16 8 16-8" stroke="currentColor" stroke-width="1.5"/>
    <path d="M20 20v20" stroke="currentColor" stroke-width="1.5"/>
    <rect x="8" y="22" width="6" height="6" fill="currentColor" opacity="0.3" transform="skewY(-10)"/>
    <rect x="26" y="22" width="6" height="6" fill="currentColor" opacity="0.3" transform="skewY(10)"/>
    <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.6"/>
  </svg>`,
  aiot: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="20" cy="20" r="2" fill="currentColor"/>
    <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4" stroke-dasharray="4 2"/>
    <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2" stroke-dasharray="2 4"/>
    <circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="32" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="8" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="32" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M11 14l5 3M29 14l-5 3M11 26l5-3M29 26l-5-3" stroke="currentColor" stroke-width="1" opacity="0.5"/>
  </svg>`,
};

// English card slugs for CSS class mapping
const SLUGS = ['erp', 'mes', 'wms', 'aiot'];

// English card colors for link hrefs
const CARD_HREFS = {
  erp: '/products/erp/',
  mes: '/products/mes/',
  wms: '/products/wms/',
  aiot: '/products/aiot/',
};

// English card colors (reuse from English builder)
const CARD_COLORS = {
  erp: '#00AFF0',
  mes: '#10b981',
  wms: '#f59e0b',
  aiot: '#8b5cf6',
};

function blocks() {
  const cardsHTML = D.cards.map((card, i) => {
    const slug = SLUGS[i];
    const featuresHTML = card.features.map(f =>
      `<li><span class="prod-card-check prod-card-check--${slug}">${CHECK_SVG}</span>${f}</li>`
    ).join('');

    return `
          <a href="${CARD_HREFS[slug]}" class="prod-card prod-card--${slug}">
            <div class="prod-card-header">
              <div class="prod-card-icon prod-card-icon--${slug}">
                ${ICON_SVGS[slug]}
              </div>
              <div class="prod-card-titles">
                <div class="prod-card-eyebrow prod-card-eyebrow--${slug}">${card.eyebrow}</div>
                <h3 class="prod-card-title">${card.title}</h3>
              </div>
            </div>
            <div class="prod-card-tagline prod-card-tagline--${slug}">${card.tagline}</div>
            <p class="prod-card-desc">${card.desc}</p>
            <ul class="prod-card-features">${featuresHTML}</ul>
            <div class="prod-card-cta prod-card-cta--${slug}">
              ${card.ctaText}
              ${ARROW_SVG}
            </div>
          </a>`;
  }).join('');

  // Reuse English background SVGs (they contain no translatable text — only labels like
  // "FINANCE", "PLANNING", "machine data" etc. which are technical English terms)
  const html = `
    <div class="${P}-section">
      <div class="${P}-dots" aria-hidden="true"></div>

      <div class="${P}-header" style="position:relative;z-index:2">
        <p class="${P}-label">${D.label}</p>
        <h2 class="${P}-title">${D.title}</h2>
        <p class="${P}-subtitle">${D.subtitle}</p>
      </div>

      <div class="${P}-cards" style="position:relative;z-index:2">
        ${cardsHTML}
      </div>
    </div>`;

  return base.wrapInDiviSection('Grid', html, 'Grid: Content');
}

// Reuse English CSS identically (same prefix, same structure)
function css() {
  return en.css();
}

module.exports = { blocks, css };
