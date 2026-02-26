/**
 * th-products-integration.js — Thai Integration Section (S3)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: products-integration.js + i18n/th/products.js integration
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./products-integration');
const th = require('../../i18n/th/products');

const P = 'prod-int'; // Same CSS prefix as English
const D = th.integration;
const SUPER_D_CLASS = `${P}-super-d`;

function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${SUPER_D_CLASS}" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${D.title}</h2>
          <p class="${P}-subtitle">${D.subtitle}</p>
        </div>

        <div class="${P}-diagram">

          <svg aria-hidden="true" class="${P}-flow-svg" viewBox="0 0 380 380">
            <line class="${P}-flow-line ${P}-flow-line--erp" x1="190" y1="190" x2="190" y2="20"/>
            <line class="${P}-flow-line ${P}-flow-line--mes" x1="190" y1="190" x2="360" y2="190"/>
            <line class="${P}-flow-line ${P}-flow-line--wms" x1="190" y1="190" x2="190" y2="360"/>
            <line class="${P}-flow-line ${P}-flow-line--aiot" x1="190" y1="190" x2="20" y2="190"/>

            <circle class="${P}-flow-dot ${P}-flow-dot--erp" cx="190" cy="105" r="5"/>
            <circle class="${P}-flow-dot ${P}-flow-dot--mes" cx="275" cy="190" r="5"/>
            <circle class="${P}-flow-dot ${P}-flow-dot--wms" cx="190" cy="275" r="5"/>
            <circle class="${P}-flow-dot ${P}-flow-dot--aiot" cx="105" cy="190" r="5"/>
          </svg>

          <div class="${P}-hub">
            <svg aria-hidden="true" class="${P}-hub-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor"/>
            </svg>
            <span class="${P}-hub-label">${D.hubLabel}</span>
          </div>

          <div class="${P}-orbit">
            <div class="${P}-node ${P}-node--erp">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <span class="${P}-node-name">ERP</span>
            </div>

            <div class="${P}-node ${P}-node--mes">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M6 8v8M10 8v8M14 8v8M18 8v8"/>
                </svg>
              </div>
              <span class="${P}-node-name">MES</span>
            </div>

            <div class="${P}-node ${P}-node--wms">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                </svg>
              </div>
              <span class="${P}-node-name">WMS</span>
            </div>

            <div class="${P}-node ${P}-node--aiot">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
                  <circle cx="12" cy="12" r="8" fill="none"/>
                </svg>
              </div>
              <span class="${P}-node-name">AIoT</span>
            </div>
          </div>

          <!-- data-flow-labels hidden (display:none in prototype) -->
          <div class="${P}-flow-labels" aria-hidden="true">
            <span class="${P}-flow-label ${P}-flow-label--top">FINANCE</span>
            <span class="${P}-flow-label ${P}-flow-label--right">PRODUCTION</span>
            <span class="${P}-flow-label ${P}-flow-label--bottom">INVENTORY</span>
            <span class="${P}-flow-label ${P}-flow-label--left">MACHINES</span>
          </div>
        </div>

        <div class="${P}-message">
          <span class="${P}-message-quote">\u201C</span>
          <p>${D.message}</p>
        </div>

        <div class="${P}-cta-wrapper">
          <a href="/contact/" class="${P}-cta">${D.cta}</a>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Integration', html, 'Integration: Content', {
    superDClass: SUPER_D_CLASS,
  });
}

// Reuse English CSS identically (same prefix, same structure)
function css() {
  return en.css();
}

module.exports = { blocks, css };
