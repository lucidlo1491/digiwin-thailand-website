/**
 * th-auto-stakes.js — Thai Automotive Stakes Section (S3)
 *
 * Reuses English CSS + SVG scene. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./automotive-stakes');
const thAuto = require('../../i18n/th/automotive');

const t = thAuto.stakes;

function blocks() {
  // Reuse the same SVG scene from English version
  const html = `
    <div class="stakes-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <line x1="0" y1="450" x2="1400" y2="450" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <rect x="100" y="400" width="90" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="145" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">STAMP</text>
                    <path d="M190 450 L320 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="315,445 330,450 315,455" fill="#000864" opacity="0.12"/>
                    <rect x="330" y="400" width="90" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="375" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">WELD</text>
                    <path d="M420 450 L550 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="545,445 560,450 545,455" fill="#000864" opacity="0.12"/>
                    <rect x="560" y="400" width="90" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="605" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">PAINT</text>
                    <path d="M650 450 L780 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="775,445 790,450 775,455" fill="#000864" opacity="0.12"/>
                    <rect x="790" y="400" width="90" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="835" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">ASSEM</text>
                    <path d="M880 450 L1010 450" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="1005,445 1020,450 1005,455" fill="#000864" opacity="0.12"/>
                    <rect x="1020" y="400" width="90" height="100" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
                    <text x="1065" y="460" font-family="'Noto Sans',sans-serif" font-size="8" font-weight="600" fill="#000864" opacity="0.1" text-anchor="middle">QC</text>
                    <text x="1200" y="300" font-family="'Noto Sans',sans-serif" font-size="16" font-weight="700" fill="#00AFF0" opacity="0.1">JIT</text>
                    <rect x="1150" y="310" width="120" height="40" rx="4" stroke="#00AFF0" stroke-width="1.5" fill="none" opacity="0.1"/>
                    <text x="1210" y="335" font-family="'Noto Sans',sans-serif" font-size="9" font-weight="600" fill="#00AFF0" opacity="0.08" text-anchor="middle">EDI LINK</text>
                    <circle cx="300" cy="250" r="3" fill="#000864" opacity="0.08"/>
                    <circle cx="700" cy="650" r="4" fill="#00AFF0" opacity="0.08"/>
                    <circle cx="1100" cy="700" r="3" fill="#000864" opacity="0.06"/>
                </svg>
            </div>
            <div class="stakes-inner" style="position: relative; z-index: 2;">
                <div class="stakes-header">
                    <h2>${t.h2}</h2>
                    <p>${t.subtitle}</p>
                </div>
                <div class="stakes-grid">
                    <div class="stake-card">
                        <div class="stake-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <h3>${t.cards[0].title}</h3>
                        <p>${t.cards[0].desc}</p>
                    </div>
                    <div class="stake-card">
                        <div class="stake-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </div>
                        <h3>${t.cards[1].title}</h3>
                        <p>${t.cards[1].desc}</p>
                    </div>
                    <div class="stake-card">
                        <div class="stake-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>
                        </div>
                        <h3>${t.cards[2].title}</h3>
                        <p>${t.cards[2].desc}</p>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Stakes (Thai)', html, 'Stakes: Content');
}

module.exports = { blocks, css: () => en.css() };
