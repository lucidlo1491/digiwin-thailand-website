/**
 * th-ind-challenges.js — Thai Industries Hub Challenges Section (S4)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: industries-challenges.js + i18n/th/industries.js challenges
 *
 * NOTE: SVG scene and card icons kept identical to English.
 */

const base = require('../../lib/templates/_base');
const en = require('./industries-challenges');
const th = require('../../i18n/th/industries');

const P = 'cha'; // Same CSS prefix as English
const D = th.challenges;

// Card icon SVGs (same as English)
const CARD_ICONS = [
  // Full Traceability
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  // BOI Compliance
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 14l2 2 4-4"/></svg>',
  // Dual-Unit Conversion
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M3 16v5h5"/><path d="M16 21h5v-5"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>',
  // Production Visibility
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>',
];

function blocks() {
  const cards = D.cards.map((card, i) => `
                    <div class="challenge-card">
                        <div class="challenge-icon">${CARD_ICONS[i]}</div>
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                    </div>`).join('');

  const html = `
    <div class="challenges-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <line x1="0" y1="200" x2="450" y2="200" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <line x1="550" y1="200" x2="900" y2="200" stroke="#000864" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.1"/>
                    <line x1="1000" y1="200" x2="1400" y2="200" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <line x1="0" y1="500" x2="400" y2="500" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <line x1="500" y1="500" x2="800" y2="500" stroke="#000864" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.1"/>
                    <line x1="900" y1="500" x2="1400" y2="500" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <line x1="350" y1="0" x2="350" y2="300" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <line x1="350" y1="380" x2="350" y2="600" stroke="#000864" stroke-width="1" stroke-dasharray="6 4" opacity="0.06"/>
                    <line x1="1050" y1="100" x2="1050" y2="400" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <line x1="1050" y1="500" x2="1050" y2="900" stroke="#000864" stroke-width="1" stroke-dasharray="6 4" opacity="0.06"/>
                    <g opacity="0.5"><line x1="485" y1="190" x2="505" y2="210" stroke="#00AFF0" stroke-width="2"/><line x1="505" y1="190" x2="485" y2="210" stroke="#00AFF0" stroke-width="2"/></g>
                    <g opacity="0.4"><line x1="435" y1="490" x2="455" y2="510" stroke="#00AFF0" stroke-width="2"/><line x1="455" y1="490" x2="435" y2="510" stroke="#00AFF0" stroke-width="2"/></g>
                    <rect x="150" y="300" width="80" height="60" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
                    <rect x="800" y="600" width="80" height="60" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
                    <text x="600" y="400" font-family="'Noto Sans',sans-serif" font-size="32" font-weight="800" fill="#000864" opacity="0.05">?</text>
                    <circle cx="250" cy="700" r="3" fill="#000864" opacity="0.08"/>
                    <circle cx="700" cy="300" r="4" fill="#00AFF0" opacity="0.08"/>
                    <circle cx="1200" cy="700" r="3" fill="#000864" opacity="0.06"/>
                </svg>
            </div>
            <div class="challenges-inner" style="position: relative; z-index: 2;">
                <div class="challenges-header">
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>
                <div class="challenges-grid">
                    ${cards}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Challenges', html, 'Challenges: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
