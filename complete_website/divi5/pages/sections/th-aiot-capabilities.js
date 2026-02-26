/**
 * th-aiot-capabilities.js — Thai AIoT Capabilities Section (S5) — COPY
 *
 * Same layout/CSS as English aiot-capabilities.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/aiot');

const CARD_SVGS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v6m0 8v6M6 12H2m20 0h-4"/><circle cx="12" cy="12" r="4"/><path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
];

const CHECK_SVG = '<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>';

function blocks() {
  const c = th.capabilities;

  const cardsHTML = c.cards.map((card, i) => {
    const featuresHTML = card.features.map(f => `
                        <div class="capability-feature">
                            ${CHECK_SVG}
                            <span>${f}</span>
                        </div>`).join('');

    return `
                <div class="capability-card">
                    <div class="capability-icon">${CARD_SVGS[i]}</div>
                    <h3>${card.title}</h3>
                    <p>${card.desc}</p>
                    <div class="capability-features">${featuresHTML}
                    </div>
                </div>`;
  }).join('');

  const html = `
    <div class="capabilities-section">
    <div class="capabilities-header" style="position: relative; z-index: 2;">
                <h2>${c.title}</h2>
                <p>${c.subtitle}</p>
            </div>
            <div class="capabilities-grid" style="position: relative; z-index: 2;">${cardsHTML}
            </div>
    </div>
    `;

  return base.wrapInDiviSection(c.adminLabel, html, 'Capabilities: Content');
}

// Reuse English CSS
const { css } = require('./aiot-capabilities');

module.exports = { blocks, css };
