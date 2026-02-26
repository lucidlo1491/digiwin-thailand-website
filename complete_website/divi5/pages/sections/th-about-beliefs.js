/**
 * th-about-beliefs.js — Thai About Us Beliefs Section (S6)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-beliefs.js + i18n/th/about.js beliefs
 */

const base = require('../../lib/templates/_base');
const en = require('./about-beliefs');
const th = require('../../i18n/th/about');

const D = th.beliefs;

function blocks() {
  const cardsHTML = D.cards.map(c => `
                    <div class="belief-card">
                        <div class="belief-number">${c.number}</div>
                        <h3>${c.title}</h3>
                        <p>${c.desc}</p>
                    </div>`).join('');

  // Reuse the same SVG scene from English (decorative, no translatable text)
  const html = `
    <div class="beliefs-section">
    <div class="dw-section-scene">
                <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <path d="M250 200 L250 420 Q250 520 350 570 Q450 520 450 420 L450 200 L350 160Z" stroke="#000864" stroke-width="2" fill="none" opacity="0.1"/>
                    <path d="M320 330 L345 355 L400 300" stroke="#00AFF0" stroke-width="2.5" fill="none" opacity="0.15"/>
                    <circle cx="800" cy="200" r="60" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.08"/>
                    <ellipse cx="800" cy="200" rx="30" ry="60" stroke="#000864" stroke-width="1" fill="none" opacity="0.06"/>
                    <line x1="740" y1="200" x2="860" y2="200" stroke="#000864" stroke-width="1" opacity="0.06"/>
                    <circle cx="780" cy="185" r="3" fill="#00AFF0" opacity="0.15"/>
                    <circle cx="820" cy="210" r="3" fill="#00AFF0" opacity="0.12"/>
                    <circle cx="795" cy="225" r="2.5" fill="#00AFF0" opacity="0.1"/>
                    <line x1="100" y1="700" x2="600" y2="700" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <line x1="100" y1="690" x2="100" y2="710" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <line x1="350" y1="690" x2="350" y2="710" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <line x1="600" y1="690" x2="600" y2="710" stroke="#000864" stroke-width="1" opacity="0.08"/>
                    <text x="100" y="730" font-family="'Noto Sans',sans-serif" font-size="10" fill="#000864" opacity="0.06" text-anchor="middle">1982</text>
                    <text x="350" y="730" font-family="'Noto Sans',sans-serif" font-size="10" fill="#000864" opacity="0.06" text-anchor="middle">2006</text>
                    <text x="600" y="730" font-family="'Noto Sans',sans-serif" font-size="10" fill="#000864" opacity="0.06" text-anchor="middle">2026</text>
                    <rect x="1050" y="400" width="200" height="120" rx="8" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.08"/>
                    <line x1="1070" y1="440" x2="1230" y2="440" stroke="#000864" stroke-width="0.5" opacity="0.06"/>
                    <line x1="1070" y1="460" x2="1200" y2="460" stroke="#000864" stroke-width="0.5" opacity="0.06"/>
                    <line x1="1070" y1="480" x2="1210" y2="480" stroke="#000864" stroke-width="0.5" opacity="0.06"/>
                    <text x="1150" y="420" font-family="'Noto Sans',sans-serif" font-size="9" font-weight="700" fill="#000864" opacity="0.06" text-anchor="middle">VALUES</text>
                    <circle cx="650" cy="450" r="3" fill="#000864" opacity="0.06"/>
                    <circle cx="1300" cy="300" r="4" fill="#000864" opacity="0.05"/>
                    <circle cx="150" cy="500" r="3" fill="#00AFF0" opacity="0.08"/>
                </svg>
            </div>
            <div class="beliefs-inner">
                <div class="beliefs-header">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                </div>
                <div class="beliefs-grid">
${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('ปรัชญา', html, 'Beliefs: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
