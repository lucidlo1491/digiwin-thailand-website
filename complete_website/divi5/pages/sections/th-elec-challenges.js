/**
 * th-elec-challenges.js — Thai Electronics Challenges (S3) — COPY
 *
 * Same layout/CSS as English electronics-challenges.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/electronics');

// Reuse same SVG icons as English
const CARD_SVGS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v6l3-3"/><path d="M12 8l-3-3"/><path d="M12 22v-6l3 3"/><path d="M12 16l-3 3"/><path d="M2 12h6l-3 3"/><path d="M8 12l-3-3"/><path d="M22 12h-6l3 3"/><path d="M16 12l3-3"/></svg>',
];

function blocks() {
  const ch = th.challenges;

  const cardsHTML = ch.cards.map((c, i) => `
                    <div class="challenge-card">
                        <div class="challenge-icon">${CARD_SVGS[i]}</div>
                        <h3>${c.title}</h3>
                        <p>${c.desc}</p>
                    </div>`).join('');

  const html = `
    <div class="challenges-section">
    <div class="dw-wave-vertical--right" style="opacity: 0.06;"></div>
            <div class="challenges-inner" style="position: relative; z-index: 2;">
                <div class="challenges-header">
                    <h2>${ch.title}</h2>
                    <p>${ch.subtitle}</p>
                </div>
                <div class="challenges-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(ch.adminLabel, html, 'Challenges: Content');
}

// Reuse English CSS
const { css } = require('./electronics-challenges');

module.exports = { blocks, css };
