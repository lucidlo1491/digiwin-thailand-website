/**
 * th-mes-capabilities.js — Thai MES Capabilities (S5)
 *
 * Same layout/CSS as English. Thai strings from i18n/th/mes.js.
 * SVGs identical to English — only card titles + descriptions change.
 */

const base = require('../../lib/templates/_base');
const enBuilder = require('./mes-capabilities');
const th = require('../../i18n/th/mes');

function blocks() {
  const c = th.capabilities;

  // Reuse exact same SVG icons as English
  const svgIcons = [
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  ];

  const cardsHTML = c.cards.map((card, i) => `
                    <div class="capability-card">
                        <div class="capability-icon">${svgIcons[i]}</div>
                        <h3 class="capability-title">${card.title}</h3>
                        <p class="capability-desc">${card.desc}</p>
                    </div>`).join('');

  // Reuse exact same background SVG scene as English
  const html = `
    <div class="capabilities-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <line x1="0" y1="450" x2="1400" y2="450" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <rect x="150" y="400" width="80" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="190" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">WS-01</text>
                    <path d="M230 450 L380 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="375,445 390,450 375,455" fill="#000864" opacity="0.12"/>
                    <rect x="390" y="400" width="80" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="430" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">WS-02</text>
                    <path d="M470 450 L620 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="615,445 630,450 615,455" fill="#000864" opacity="0.12"/>
                    <rect x="630" y="400" width="80" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="670" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">WS-03</text>
                    <path d="M710 450 L860 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="855,445 870,450 855,455" fill="#000864" opacity="0.12"/>
                    <rect x="870" y="400" width="80" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="910" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">QC</text>
                    <path d="M950 450 L1100 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="1095,445 1110,450 1095,455" fill="#000864" opacity="0.12"/>
                    <rect x="1110" y="400" width="80" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="1150" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">PACK</text>
                    <circle cx="190" cy="300" r="20" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.12"/>
                    <text x="190" y="304" font-family="'Noto Sans',sans-serif" font-size="7" fill="#00AFF0" opacity="0.15" text-anchor="middle">SCAN</text>
                    <circle cx="430" cy="300" r="20" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.12"/>
                    <circle cx="670" cy="300" r="20" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.12"/>
                    <circle cx="910" cy="300" r="20" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.12"/>
                    <rect x="500" y="600" width="400" height="40" rx="4" stroke="#000864" stroke-width="1" fill="none" opacity="0.08"/>
                    <text x="700" y="625" font-family="'Noto Sans',sans-serif" font-size="10" font-weight="600" fill="#000864" opacity="0.06" text-anchor="middle">WORK ORDER TRACKING</text>
                    <circle cx="300" cy="700" r="3" fill="#000864" opacity="0.08"/>
                    <circle cx="1200" cy="250" r="4" fill="#000864" opacity="0.08"/>
                </svg>
            </div>
            <div class="products-inner" style="position: relative; z-index: 2;">
                <div class="section-header">
                    <h2 class="section-title">${c.title}</h2>
                    <p class="section-subtitle">${c.subtitle}</p>
                </div>
    
                <div class="capabilities-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Capabilities (Thai)', html, 'Capabilities: Content');
}

module.exports = { blocks, css: enBuilder.css };
