/**
 * th-about-awards.js — Thai About Us Awards Section (S10)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-awards.js + i18n/th/about.js awards
 */

const base = require('../../lib/templates/_base');
const en = require('./about-awards');
const th = require('../../i18n/th/about');

const D = th.awards;

// SVG icons reused from English (identical)
const AWARD_ICONS = [
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>', gold: true },
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' },
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>' },
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', gold: true },
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>' },
  { svg: '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>' },
];

function blocks() {
  const cardsHTML = D.cards.map((card, i) => {
    const icon = AWARD_ICONS[i];
    const goldClass = icon.gold ? ' gold' : '';
    return `
                    <div class="award-card">
                        <div class="award-icon${goldClass}">
                            ${icon.svg}
                        </div>
                        <div class="award-year">${card.year}</div>
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                    </div>`;
  }).join('\n');

  const certsHTML = D.certs.map(c => `
                    <div class="cert-item">
                        <div class="cert-badge">${c.badge}</div>
                        <div class="cert-label">${c.label}</div>
                    </div>`).join('');

  // Reuse the same SVG scene from English (decorative, no translatable text besides years)
  const html = `
    <div class="awards-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <circle cx="300" cy="300" r="55" stroke="#000864" stroke-width="2" fill="none" opacity="0.1"/>
                    <circle cx="300" cy="300" r="42" stroke="#000864" stroke-width="1" fill="none" opacity="0.07"/>
                    <path d="M280 300 L295 315 L330 280" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.15"/>
                    <circle cx="800" cy="250" r="50" stroke="#000864" stroke-width="2" fill="none" opacity="0.1"/>
                    <circle cx="800" cy="250" r="38" stroke="#000864" stroke-width="1" fill="none" opacity="0.07"/>
                    <text x="800" y="255" font-family="'Noto Sans',sans-serif" font-size="10" font-weight="700" fill="#000864" opacity="0.08" text-anchor="middle">ISO</text>
                    <circle cx="1150" cy="350" r="45" stroke="#000864" stroke-width="2" fill="none" opacity="0.1"/>
                    <circle cx="1150" cy="350" r="33" stroke="#000864" stroke-width="1" fill="none" opacity="0.07"/>
                    <path d="M1138 320 L1150 305 L1162 320" stroke="#00AFF0" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <line x1="100" y1="650" x2="1300" y2="650" stroke="#000864" stroke-width="1.5" opacity="0.08"/>
                    <line x1="100" y1="640" x2="100" y2="660" stroke="#000864" stroke-width="1.5" opacity="0.08"/>
                    <line x1="400" y1="640" x2="400" y2="660" stroke="#000864" stroke-width="1.5" opacity="0.08"/>
                    <line x1="700" y1="640" x2="700" y2="660" stroke="#000864" stroke-width="1.5" opacity="0.08"/>
                    <line x1="1000" y1="640" x2="1000" y2="660" stroke="#000864" stroke-width="1.5" opacity="0.08"/>
                    <line x1="1300" y1="640" x2="1300" y2="660" stroke="#000864" stroke-width="1.5" opacity="0.08"/>
                    <text x="100" y="680" font-family="'Noto Sans',sans-serif" font-size="10" fill="#000864" opacity="0.06" text-anchor="middle">1996</text>
                    <text x="700" y="680" font-family="'Noto Sans',sans-serif" font-size="10" fill="#000864" opacity="0.06" text-anchor="middle">2010</text>
                    <text x="1300" y="680" font-family="'Noto Sans',sans-serif" font-size="10" fill="#000864" opacity="0.06" text-anchor="middle">2025</text>
                    <path d="M500 500 L500 480 L520 480" stroke="#000864" stroke-width="1" fill="none" opacity="0.08"/>
                    <path d="M900 550 L920 550 L920 530" stroke="#000864" stroke-width="1" fill="none" opacity="0.08"/>
                    <circle cx="600" cy="400" r="3" fill="#000864" opacity="0.06"/>
                    <circle cx="1050" cy="550" r="4" fill="#00AFF0" opacity="0.06"/>
                    <circle cx="200" cy="550" r="3" fill="#000864" opacity="0.05"/>
                </svg>
            </div>
            <div class="awards-inner">
                <div class="awards-header">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>

                <div class="awards-grid">
${cardsHTML}
                </div>

                <div class="certifications-bar">
${certsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('รางวัล', html, 'Awards: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
