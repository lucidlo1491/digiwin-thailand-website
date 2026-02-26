/**
 * th-wms-mobile-functions.js — Thai WMS Mobile Functions (S5) — COPY
 *
 * Same layout/CSS as English wms-mobile-functions.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/wms');

function blocks() {
  const mf = th.mobileFunctions;

  // SVG icons — identical to English, one per module
  const svgs = [
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>',
  ];

  const colors = ['blue', 'green', 'amber', 'coral'];

  const modulesHTML = mf.modules.map((mod, i) => {
    const itemsHTML = mod.items.map(item =>
      `                            <li>${item}</li>`
    ).join('\n');

    return `
                    <div class="mobile-module mobile-module--${colors[i]}">
                        <div class="mobile-module-header">
                            <div class="mobile-module-icon mobile-module-icon--${colors[i]}">${svgs[i]}</div>
                            <div>
                                <div class="mobile-module-name">${mod.name}</div>
                                <div class="mobile-module-count">${mod.count}</div>
                            </div>
                        </div>
                        <ul class="mobile-function-list">
${itemsHTML}
                        </ul>
                    </div>`;
  }).join('\n');

  const html = `
    <div class="mobile-functions-section">
    <div class="dw-d-bg dw-d-bg--corner-br dw-d-bg--subtle"></div>
            <div class="mobile-functions-inner" style="position: relative; z-index: 2;">
                <div class="section-header">
                    <h2 class="section-title">${mf.title}</h2>
                    <p class="section-subtitle">${mf.subtitle}</p>
                </div>
    
                <div class="mobile-modules-grid">${modulesHTML}
                </div>
    
                <p class="mobile-functions-footer">${mf.footer}</p>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Mobile Functions: WMS (Thai)', html, 'Mobile Functions: Content');
}

// Reuse English CSS
const { css } = require('./wms-mobile-functions');

module.exports = { blocks, css };
