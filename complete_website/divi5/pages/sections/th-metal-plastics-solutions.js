/**
 * th-metal-plastics-solutions.js — Thai Solutions Section
 *
 * Reuses English CSS + SVG icons/scene. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./metal-plastics-solutions');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.solutions;
const P = 'solutions';

const checkSvg = '<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>';

function featureList(features) {
  return features.map(f => `
                            <div class="solution-feature">
                                ${checkSvg}
                                <span>${f}</span>
                            </div>`).join('');
}

function blocks() {
  const html = `
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <rect x="150" y="250" width="250" height="180" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
                    <rect x="200" y="290" width="150" height="100" rx="12" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
                    <text x="275" y="345" font-family="'Noto Sans',sans-serif" font-size="10" font-weight="600" fill="#000864" opacity="0.08" text-anchor="middle">MOLD CAVITY</text>
                    <line x1="150" y1="340" x2="100" y2="340" stroke="#000864" stroke-width="1" opacity="0.1"/>
                    <line x1="100" y1="310" x2="100" y2="370" stroke="#000864" stroke-width="1" opacity="0.1"/>
                    <text x="75" y="345" font-family="'Noto Sans',sans-serif" font-size="8" fill="#000864" opacity="0.08" text-anchor="middle">180mm</text>
                    <path d="M400 340 L550 340" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
                    <polygon points="545,335 560,340 545,345" fill="#000864" opacity="0.12"/>
                    <rect x="560" y="280" width="150" height="120" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
                    <path d="M580 310 L690 310 L690 370 L580 370" stroke="#000864" stroke-width="1" fill="none" opacity="0.1" stroke-dasharray="4 3"/>
                    <text x="635" y="345" font-family="'Noto Sans',sans-serif" font-size="9" font-weight="600" fill="#000864" opacity="0.08" text-anchor="middle">PRESS</text>
                    <path d="M635 280 L635 250" stroke="#000864" stroke-width="2" opacity="0.12"/>
                    <path d="M625 260 L635 245 L645 260" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
                    <path d="M710 340 L850 340" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <polygon points="845,335 860,340 845,345" fill="#000864" opacity="0.1"/>
                    <rect x="860" y="300" width="100" height="80" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
                    <text x="910" y="345" font-family="'Noto Sans',sans-serif" font-size="9" font-weight="600" fill="#000864" opacity="0.08" text-anchor="middle">TRIM</text>
                    <circle cx="1100" cy="350" r="60" stroke="#000864" stroke-width="2" fill="none" opacity="0.1"/>
                    <circle cx="1100" cy="350" r="25" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>
                    <rect x="1090" y="322" width="20" height="12" rx="2" fill="#000864" opacity="0.08"/>
                    <rect x="1090" y="362" width="20" height="12" rx="2" fill="#000864" opacity="0.08"/>
                    <rect x="1070" y="340" width="12" height="20" rx="2" fill="#000864" opacity="0.08"/>
                    <rect x="1118" y="340" width="12" height="20" rx="2" fill="#000864" opacity="0.08"/>
                    <path d="M300 600 L500 600" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
                    <path d="M600 600 L800 600" stroke="#000864" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.08"/>
                    <circle cx="450" cy="700" r="3" fill="#000864" opacity="0.08"/>
                    <circle cx="900" cy="600" r="4" fill="#00AFF0" opacity="0.08"/>
                    <circle cx="1250" cy="500" r="3" fill="#000864" opacity="0.06"/>
                </svg>
            </div>
            <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header">
                    <h2>${t.h2}</h2>
                    <p>${t.subtitle}</p>
                </div>
                <div class="${P}-grid">
                    <div class="solution-card">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
                        </div>
                        <h3>${t.cards[0].h3}</h3>
                        <p>${t.cards[0].p}</p>
                        <div class="solution-features">${featureList(t.cards[0].features)}</div>
                    </div>
                    <div class="solution-card">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <h3>${t.cards[1].h3}</h3>
                        <p>${t.cards[1].p}</p>
                        <div class="solution-features">${featureList(t.cards[1].features)}</div>
                    </div>
                    <div class="solution-card">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                        <h3>${t.cards[2].h3}</h3>
                        <p>${t.cards[2].p}</p>
                        <div class="solution-features">${featureList(t.cards[2].features)}</div>
                    </div>
                    <div class="solution-card">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        </div>
                        <h3>${t.cards[3].h3}</h3>
                        <p>${t.cards[3].p}</p>
                        <div class="solution-features">${featureList(t.cards[3].features)}</div>
                    </div>

                    <div class="solution-card" style="border: 2px solid rgba(0,175,240,0.3); background: linear-gradient(135deg, rgba(0,175,240,0.03), rgba(255,255,255,1));">
                        <div class="solution-icon" style="background: linear-gradient(135deg, rgba(0,175,240,0.2), rgba(0,175,240,0.1));">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                        </div>
                        <h3>${t.cards[4].h3}</h3>
                        <p>${t.cards[4].p}</p>
                        <div class="solution-features">${featureList(t.cards[4].features)}</div>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Solutions (Thai)', html, 'Solutions: Content');
}

module.exports = { blocks, css: () => en.css() };
