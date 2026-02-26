/**
 * th-erp-capabilities.js — Thai Capabilities Section
 *
 * Reuses English CSS + SVG scene. Replaces text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./erp-capabilities');
const thErp = require('../../i18n/th/erp');

const t = thErp.capabilities;

function blocks() {
  // Reuse the same SVG icons from English (decorative)
  const svgs = [
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8v8M10 8v8M14 8v8M18 8v8"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
  ];

  const cardsHTML = t.cards.map((card, i) => `
                    <div class="capability-card">
                        <div class="capability-icon">${svgs[i]}</div>
                        <h3 class="capability-title">${card.title}</h3>
                        <p class="capability-desc">${card.desc}</p>
                    </div>`).join('');

  const html = `
    <div class="capabilities-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <circle cx="700" cy="450" r="70" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
                    <circle cx="700" cy="450" r="35" stroke="#0369a1" stroke-width="1.5" fill="none" opacity="0.1"/>
                    <text x="700" y="455" font-family="'Noto Sans',sans-serif" font-size="14" font-weight="700" fill="#000864" opacity="0.1" text-anchor="middle">ERP</text>
                    <rect x="100" y="200" width="90" height="60" rx="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <text x="145" y="235" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">FINANCE</text>
                    <line x1="190" y1="230" x2="635" y2="430" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <rect x="100" y="600" width="90" height="60" rx="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <text x="145" y="635" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">INVENTORY</text>
                    <line x1="190" y1="630" x2="635" y2="470" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <rect x="1210" y="200" width="90" height="60" rx="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <text x="1255" y="235" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">SALES</text>
                    <line x1="1210" y1="230" x2="765" y2="430" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <rect x="1210" y="600" width="90" height="60" rx="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <text x="1255" y="635" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">PURCHASE</text>
                    <line x1="1210" y1="630" x2="765" y2="470" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <path d="M450 320 L460 330 L480 310" stroke="#0369a1" stroke-width="2" fill="none" opacity="0.18"/>
                    <path d="M920 320 L930 330 L950 310" stroke="#0369a1" stroke-width="2" fill="none" opacity="0.18"/>
                    <circle cx="350" cy="450" r="3" fill="#000864" opacity="0.1"/>
                    <circle cx="1050" cy="450" r="3" fill="#000864" opacity="0.1"/>
                </svg>
            </div>
            <div class="capabilities-inner" style="position: relative; z-index: 2;">
                <div class="capabilities-header">
                    <p class="capabilities-label">${t.label}</p>
                    <h2 class="capabilities-title">${t.title}</h2>
                </div>

                <div class="capabilities-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Capabilities (Thai)', html, 'Capabilities: Content');
}

module.exports = { blocks, css: () => en.css() };
