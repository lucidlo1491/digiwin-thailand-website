/**
 * th-auto-solutions.js — Thai Automotive Solutions Section (S4)
 *
 * Reuses English CSS + SVG icons. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./automotive-solutions');
const thAuto = require('../../i18n/th/automotive');

const t = thAuto.solutions;

// Checkmark SVG reused across features
const CHECK = '<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>';

// Card SVG icons (same as English)
const ICONS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.5 12a5.5 5.5 0 1 0 11 0 5.5 5.5 0 1 0-11 0"/><path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0"/><circle cx="12" cy="12" r="2"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
];

function blocks() {
  const cardsHTML = t.cards.map((card, i) => {
    const featuresHTML = card.features.map(f => `
                            <div class="solution-feature">
                                ${CHECK}
                                <span>${f}</span>
                            </div>`).join('');

    return `
                    <div class="solution-card">
                        <div class="solution-icon">
                            ${ICONS[i]}
                        </div>
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                        <div class="solution-features">${featuresHTML}
                        </div>
                    </div>`;
  }).join('');

  const html = `
    <div class="solutions-section">
    <div class="dw-d-bg dw-d-bg--corner-br" style="opacity: 0.08;"></div>
            <div class="solutions-inner" style="position: relative; z-index: 2;">
                <div class="solutions-header">
                    <h2>${t.h2}</h2>
                    <p>${t.subtitle}</p>
                </div>
                <div class="solutions-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Solutions (Thai)', html, 'Solutions: Content');
}

module.exports = { blocks, css: () => en.css() };
