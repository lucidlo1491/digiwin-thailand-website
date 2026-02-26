/**
 * th-wms-problems.js — Thai WMS Problems (S3) — COPY
 *
 * Same layout/CSS as English wms-problems.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/wms');

function blocks() {
  const p = th.problems;

  // SVG icons — identical to English
  const svgs = [
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18.7 14l-5.1-5.2-2.8 2.7L7 7.7"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  ];

  const cardsHTML = p.cards.map((c, i) => `
                    <div class="problem-card">
                        <div class="problem-icon">${svgs[i]}</div>
                        <div class="problem-card-station">${c.station}</div>
                        <h3 class="problem-title">${c.title}</h3>
                        <p class="problem-desc">${c.desc}</p>
                    </div>`).join('\n');

  const html = `
    <div class="problems-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <line x1="200" y1="150" x2="200" y2="750" stroke="#000864" stroke-width="2" opacity="0.12"/>
                    <line x1="400" y1="150" x2="400" y2="750" stroke="#000864" stroke-width="2" opacity="0.12"/>
                    <line x1="150" y1="250" x2="450" y2="250" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <line x1="150" y1="400" x2="450" y2="400" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <line x1="150" y1="550" x2="450" y2="550" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <rect x="220" y="200" width="30" height="45" rx="2" fill="#000864" opacity="0.12"/>
                    <rect x="260" y="210" width="30" height="35" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.15"/>
                    <rect x="220" y="350" width="30" height="45" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.15"/>
                    <rect x="260" y="355" width="30" height="40" rx="2" fill="#000864" opacity="0.12"/>
                    <rect x="310" y="360" width="30" height="35" rx="2" fill="#000864" opacity="0.1"/>
                    <rect x="220" y="500" width="30" height="45" rx="2" fill="#000864" opacity="0.1"/>
                    <text x="280" y="670" font-family="'Noto Sans',sans-serif" font-size="14" font-weight="700" fill="#000864" opacity="0.08">SYS: 100</text>
                    <text x="280" y="700" font-family="'Noto Sans',sans-serif" font-size="14" font-weight="700" fill="#00AFF0" opacity="0.12">REAL: 47</text>
                    <text x="420" y="685" font-family="'Noto Sans',sans-serif" font-size="28" font-weight="800" fill="#000864" opacity="0.08">&ne;</text>
                    <rect x="800" y="250" width="60" height="35" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <line x1="810" y1="260" x2="815" y2="260" stroke="#000864" stroke-width="4" opacity="0.15"/>
                    <line x1="820" y1="260" x2="822" y2="260" stroke="#000864" stroke-width="4" opacity="0.15"/>
                    <line x1="826" y1="260" x2="830" y2="260" stroke="#000864" stroke-width="4" opacity="0.12"/>
                    <line x1="834" y1="260" x2="836" y2="260" stroke="#000864" stroke-width="4" opacity="0.15"/>
                    <line x1="840" y1="260" x2="850" y2="260" stroke="#000864" stroke-width="4" opacity="0.12"/>
                    <text x="1100" y="400" font-family="'Noto Sans',sans-serif" font-size="40" font-weight="800" fill="#000864" opacity="0.06">?</text>
                    <circle cx="700" cy="500" r="3" fill="#000864" opacity="0.1"/>
                    <circle cx="1000" cy="600" r="4" fill="#00AFF0" opacity="0.08"/>
                    <circle cx="1250" cy="300" r="3" fill="#000864" opacity="0.08"/>
                </svg>
            </div>
            <div class="problems-inner" style="position: relative; z-index: 2;">
                <div class="section-header">
                    <h2 class="section-title">${p.title}</h2>
                    <p class="section-subtitle">${p.subtitle}</p>
                </div>
    
                <div class="problems-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Problems: WMS (Thai)', html, 'Problems: Content');
}

// Reuse English CSS
const { css } = require('./wms-problems');

module.exports = { blocks, css };
