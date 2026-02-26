/**
 * th-wms-capabilities.js — Thai WMS Capabilities (S4) — COPY
 *
 * Same layout/CSS as English wms-capabilities.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/wms');

function blocks() {
  const c = th.capabilities;

  // SVG icons — identical to English
  const svgs = [
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  ];

  const boxesHTML = c.boxes.map((box, i) => {
    const featuresHTML = box.features.map(f =>
      `                            <li><span class="check">&#10003;</span> ${f}</li>`
    ).join('\n');

    return `
                    <div class="capability-box">
                        <div class="capability-box-header">
                            <div class="capability-box-icon">${svgs[i]}</div>
                            <div class="capability-box-titles">
                                <h3 class="capability-box-title">${box.title}</h3>
                                <p class="capability-box-tagline">${box.tagline}</p>
                            </div>
                        </div>
                        <p class="capability-box-desc">${box.desc}</p>
                        <ul class="capability-features">
${featuresHTML}
                        </ul>
                    </div>`;
  }).join('\n');

  const html = `
    <div class="wms-capabilities-section">
    <div class="capabilities-inner" style="position: relative; z-index: 2;">
                <div class="section-header">
                    <h2 class="section-title">${c.title}</h2>
                    <p class="section-subtitle">${c.subtitle}</p>
                </div>
    
                <div class="capabilities-grid">${boxesHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Capabilities: WMS (Thai)', html, 'Capabilities: Content');
}

// Reuse English CSS
const { css } = require('./wms-capabilities');

module.exports = { blocks, css };
