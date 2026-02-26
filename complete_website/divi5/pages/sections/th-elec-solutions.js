/**
 * th-elec-solutions.js — Thai Electronics Solutions (S4) — COPY
 *
 * Same layout/CSS as English electronics-solutions.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/electronics');

// SVG icons — same as English
const CARD_SVGS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
];

const CHECK_SVG = '<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>';

function blocks() {
  const s = th.solutions;

  const cardsHTML = s.cards.map((card, i) => {
    const isBoiCard = i === 4;
    const cardStyle = isBoiCard
      ? ' style="border: 2px solid rgba(0,175,240,0.3); background: linear-gradient(135deg, rgba(0,175,240,0.03), rgba(255,255,255,1));"'
      : '';
    const iconStyle = isBoiCard
      ? ' style="background: linear-gradient(135deg, rgba(0,175,240,0.2), rgba(0,175,240,0.1));"'
      : '';

    const featuresHTML = card.features.map(f => `
                            <div class="solution-feature">
                                ${CHECK_SVG}
                                <span>${f}</span>
                            </div>`).join('');

    return `
                    <div class="solution-card"${cardStyle}>
                        <div class="solution-icon"${iconStyle}>${CARD_SVGS[i]}</div>
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                        <div class="solution-features">${featuresHTML}
                        </div>
                    </div>`;
  }).join('');

  const html = `
    <div class="solutions-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <line x1="200" y1="0" x2="200" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="400" y1="0" x2="400" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="600" y1="0" x2="600" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="800" y1="0" x2="800" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="1000" y1="0" x2="1000" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="1200" y1="0" x2="1200" y2="900" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <path d="M200 300 L400 300 L400 500 L600 500" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <path d="M800 200 L1000 200 L1000 400 L1200 400" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <path d="M200 600 L400 600 L400 700 L800 700" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <circle cx="200" cy="300" r="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
                    <circle cx="400" cy="300" r="4" fill="#000864" opacity="0.12"/>
                    <circle cx="400" cy="500" r="4" fill="#000864" opacity="0.12"/>
                    <circle cx="600" cy="500" r="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
                    <circle cx="800" cy="200" r="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
                    <circle cx="1000" cy="200" r="4" fill="#000864" opacity="0.12"/>
                    <circle cx="1000" cy="400" r="4" fill="#000864" opacity="0.12"/>
                    <circle cx="1200" cy="400" r="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
                    <rect x="550" y="250" width="60" height="40" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <rect x="900" y="550" width="60" height="40" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <rect x="300" y="400" width="40" height="25" rx="2" stroke="#000864" stroke-width="1" fill="none" opacity="0.1"/>
                    <rect x="1050" y="300" width="40" height="25" rx="2" stroke="#000864" stroke-width="1" fill="none" opacity="0.1"/>
                    <circle cx="700" cy="350" r="3" fill="#00AFF0" opacity="0.12"/>
                    <circle cx="1100" cy="650" r="4" fill="#000864" opacity="0.06"/>
                </svg>
            </div>
            <div class="solutions-inner" style="position: relative; z-index: 2;">
                <div class="solutions-header">
                    <h2>${s.title}</h2>
                    <p>${s.subtitle}</p>
                </div>
                <div class="solutions-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(s.adminLabel, html, 'Solutions: Content');
}

// Reuse English CSS
const { css } = require('./electronics-solutions');

module.exports = { blocks, css };
