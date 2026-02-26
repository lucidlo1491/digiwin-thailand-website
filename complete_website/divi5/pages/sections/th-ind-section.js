/**
 * th-ind-section.js — Thai Industries Hub Industry Cards Section (S3)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: industries-section.js + i18n/th/industries.js section
 *
 * NOTE: SVG icons and scene kept identical to English (no text in SVGs).
 */

const base = require('../../lib/templates/_base');
const en = require('./industries-section');
const th = require('../../i18n/th/industries');

const P = 'sec'; // Same CSS prefix as English
const D = th.section;

// Checkmark SVG reused from English
const CHECK = '<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>';

// Card icon SVGs (same as English)
const CARD_ICONS = [
  // Automotive
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M5 15H3V9l2-4h10l4 4v6h-2"/><path d="M9 15h6"/><path d="M5 9h14"/></svg>',
  // Electronics
  '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  // Metal & Plastics
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
];

function buildCard(card, iconSvg, index) {
  const features = card.features.map(f =>
    `<div class="industry-feature">${CHECK}<span>${f}</span></div>`
  ).join('\n                                ');

  return `
                    <a href="${card.href}" class="industry-card">
                        <div class="industry-card-visual">
                            <div class="industry-card-icon">${iconSvg}</div>
                            <div class="industry-card-stat">
                                <div class="industry-card-stat-value">${card.statValue}</div>
                                <div class="industry-card-stat-label">${card.statLabel}</div>
                            </div>
                        </div>
                        <div class="industry-card-content">
                            <h3 class="industry-card-title">${card.title}</h3>
                            <p class="industry-card-desc">${card.desc}</p>
                            <div class="industry-features">
                                ${features}
                            </div>
                            <span class="industry-card-link">${card.linkText} <span>\u2192</span></span>
                        </div>
                    </a>`;
}

function blocks() {
  const cards = D.cards.map((card, i) => buildCard(card, CARD_ICONS[i], i)).join('\n');

  const html = `
    <div class="industries-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <line x1="0" y1="150" x2="1400" y2="150" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="0" y1="300" x2="1400" y2="300" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="0" y1="450" x2="1400" y2="450" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="0" y1="600" x2="1400" y2="600" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="0" y1="750" x2="1400" y2="750" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="200" y1="0" x2="200" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="500" y1="0" x2="500" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="800" y1="0" x2="800" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="1100" y1="0" x2="1100" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <circle cx="350" cy="300" r="70" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
                    <circle cx="350" cy="300" r="30" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
                    <rect x="340" y="225" width="20" height="15" rx="2" fill="#000864" opacity="0.1"/>
                    <rect x="340" y="360" width="20" height="15" rx="2" fill="#000864" opacity="0.1"/>
                    <rect x="275" y="290" width="15" height="20" rx="2" fill="#000864" opacity="0.1"/>
                    <rect x="410" y="290" width="15" height="20" rx="2" fill="#000864" opacity="0.1"/>
                    <line x1="600" y1="200" x2="900" y2="200" stroke="#000864" stroke-width="1" opacity="0.12"/>
                    <line x1="600" y1="190" x2="600" y2="210" stroke="#000864" stroke-width="1" opacity="0.12"/>
                    <line x1="900" y1="190" x2="900" y2="210" stroke="#000864" stroke-width="1" opacity="0.12"/>
                    <text x="750" y="195" font-family="'Noto Sans',sans-serif" font-size="11" fill="#000864" opacity="0.08" text-anchor="middle">300mm</text>
                    <rect x="1000" y="350" width="200" height="120" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
                    <circle cx="1100" cy="430" r="20" stroke="#000864" stroke-width="1" fill="none" opacity="0.1"/>
                    <path d="M300 650 L500 650" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="495,645 510,650 495,655" fill="#000864" opacity="0.12"/>
                    <path d="M550 650 L750 650" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="745,645 760,650 745,655" fill="#000864" opacity="0.12"/>
                    <circle cx="650" cy="400" r="3" fill="#00AFF0" opacity="0.12"/>
                    <circle cx="1250" cy="600" r="3" fill="#000864" opacity="0.08"/>
                </svg>
            </div>
            <div class="industries-inner" style="position: relative; z-index: 2;">
                <p class="industries-label">${D.label}</p>
                <div class="industries-header">
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>
                <div class="industry-cards">
                    ${cards}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Section', html, 'Section: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
