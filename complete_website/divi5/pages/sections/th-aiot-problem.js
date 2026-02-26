/**
 * th-aiot-problem.js — Thai AIoT Problem Section (S3) — COPY
 *
 * Same layout/CSS as English aiot-problem.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/aiot');

const CARD_SVGS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
];

function blocks() {
  const p = th.problem;

  const cardsHTML = p.cards.map((c, i) => `
                <div class="problem-card">
                    <div class="problem-icon">${CARD_SVGS[i]}</div>
                    <h3>${c.title}</h3>
                    <p>${c.desc}</p>
                </div>`).join('');

  const html = `
    <div class="problem-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <rect x="100" y="300" width="100" height="80" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <circle cx="150" cy="340" r="15" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <path d="M200 340 L300 340" stroke="#000864" stroke-width="1.5" opacity="0.1" stroke-dasharray="6 4"/>
                    <g opacity="0.4"><line x1="290" y1="330" x2="310" y2="350" stroke="#00AFF0" stroke-width="2"/><line x1="310" y1="330" x2="290" y2="350" stroke="#00AFF0" stroke-width="2"/></g>
                    <rect x="400" y="300" width="100" height="80" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <circle cx="450" cy="340" r="15" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <path d="M500 340 L600 340" stroke="#000864" stroke-width="1.5" opacity="0.1" stroke-dasharray="6 4"/>
                    <g opacity="0.35"><line x1="590" y1="330" x2="610" y2="350" stroke="#00AFF0" stroke-width="2"/><line x1="610" y1="330" x2="590" y2="350" stroke="#00AFF0" stroke-width="2"/></g>
                    <rect x="700" y="300" width="100" height="80" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <circle cx="750" cy="340" r="15" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <path d="M800 340 L900 340" stroke="#000864" stroke-width="1.5" opacity="0.1" stroke-dasharray="6 4"/>
                    <g opacity="0.3"><line x1="890" y1="330" x2="910" y2="350" stroke="#00AFF0" stroke-width="2"/><line x1="910" y1="330" x2="890" y2="350" stroke="#00AFF0" stroke-width="2"/></g>
                    <path d="M150 250 Q150 230 160 230" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.15"/>
                    <path d="M150 245 Q150 220 165 220" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.12"/>
                    <path d="M150 240 Q150 210 170 210" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.1"/>
                    <path d="M450 250 Q450 230 460 230" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.15"/>
                    <path d="M450 245 Q450 220 465 220" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.12"/>
                    <path d="M750 250 Q750 230 760 230" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.15"/>
                    <path d="M750 245 Q750 220 765 220" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.12"/>
                    <rect x="1050" y="200" width="200" height="120" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.1"/>
                    <line x1="1070" y1="250" x2="1130" y2="250" stroke="#000864" stroke-width="0.5" opacity="0.1"/>
                    <line x1="1070" y1="265" x2="1200" y2="265" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <line x1="1070" y1="280" x2="1180" y2="280" stroke="#000864" stroke-width="0.5" opacity="0.08"/>
                    <text x="1090" y="230" font-family="'Noto Sans',sans-serif" font-size="9" font-weight="700" fill="#000864" opacity="0.08">NO DATA</text>
                    <circle cx="300" cy="600" r="3" fill="#000864" opacity="0.1"/>
                    <circle cx="600" cy="550" r="4" fill="#000864" opacity="0.08"/>
                    <circle cx="900" cy="600" r="3" fill="#00AFF0" opacity="0.1"/>
                    <circle cx="1200" cy="500" r="3" fill="#000864" opacity="0.08"/>
                    <text x="500" y="700" font-family="'Noto Sans',sans-serif" font-size="28" font-weight="800" fill="#000864" opacity="0.05">?</text>
                </svg>
            </div>
            <div class="problem-header" style="position: relative; z-index: 2;">
                <h2>${p.title}</h2>
                <p>${p.subtitle}</p>
            </div>
            <div class="problem-grid" style="position: relative; z-index: 2;">${cardsHTML}
            </div>
    </div>
    `;

  return base.wrapInDiviSection(p.adminLabel, html, 'Problem: Content');
}

// Reuse English CSS
const { css } = require('./aiot-problem');

module.exports = { blocks, css };
