/**
 * econ-protection.js — Risk Mitigation / Protection Section (S4)
 *
 * 2x2 card grid: blue gradient icon + h3 + protection points (strong labels) + proof quote.
 * data-particles + particle-ocean.js inline injection.
 * Vertical wave right, opacity 0.05.
 *
 * Source: economics.html lines 1181-1273
 */

const fs = require('fs');
const path = require('path');
const base = require('../../lib/templates/_base');

const P = 'prot'; // CSS prefix

// Read particle-ocean.js for inline injection (S7 pattern from bm-compare.js)
const PARTICLE_JS = fs.readFileSync(
  path.join(__dirname, '..', '..', '..', 'particle-ocean.js'), 'utf8'
);

// ════════════════════════════════════════════════════════════════
// ICON SVGs
// ════════════════════════════════════════════════════════════════
const ICONS = {
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>',
  pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
};

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const CARDS = [
  {
    icon: ICONS.shield,
    title: 'Territory & Conflict Protection',
    points: [
      { strong: '6-Month Ironclad Lock:', text: 'Once you register a qualified lead, it\u2019s legally locked to you for 6 months (renewable +3). No one can approach the client.' },
      { strong: 'Structural Segmentation:', text: 'DigiWin\u2019s direct team is restricted to Chinese/Taiwanese inbound accounts. Thai Local Market is exclusively for partners.' },
      { strong: 'Non-Compete Clause:', text: 'Master Agreement explicitly states DigiWin cannot operate leads booked by partners during valid period.' },
    ],
    proof: '\u201CYour leads are locked. Contractual protection, not just promises.\u201D',
  },
  {
    icon: ICONS.users,
    title: 'Co-Implementation Support',
    points: [
      { strong: 'Tiered Support:', text: 'You own Tier 1 (user questions, basic configs). DigiWin handles Tier 2 (core bugs, API failures, R&D).' },
      { strong: '\u201CEntrusted Service\u201D Safety Net:', text: 'If you sell but lack capacity, DigiWin delivers under your brand via formal agreement.' },
      { strong: 'On-Site Pilot Assistance:', text: 'For first projects, we provide on-site guidance for critical phases like Go-Live Simulation.' },
    ],
    proof: '\u201CYou are never alone on Go-Live.\u201D',
  },
  {
    icon: ICONS.book,
    title: 'Training & Certification',
    points: [
      { strong: 'Mandatory Certification:', text: 'Your staff must complete Sales, Pre-sales, and Delivery certification tracks within 3-5 months.' },
      { strong: 'Role-Based Tracks:', text: 'T100 Certified \u2192 Enterprise projects. MES Certified \u2192 Factory floor. Gold Status \u2192 Highest-tier margins.' },
      { strong: 'Sales \u201CWeaponization\u201D:', text: 'Industry whitepapers, ROI calculators, localized demo scripts\u2014go in as manufacturing consultants.' },
    ],
    proof: '\u201CCompetency transfer, not just manuals.\u201D',
  },
  {
    icon: ICONS.pulse,
    title: 'Demand Generation',
    points: [
      { strong: '100% Lead Distribution:', text: 'Leads from Brand Roadshows and digital marketing are distributed 100% to qualified partners who attend.' },
      { strong: 'Gold Priority Allocation:', text: 'High-quality inbound leads are allocated based on performance to Gold Partners first.' },
      { strong: 'Division of Labor:', text: 'We generate demand; you capture and service it. We\u2019re the marketing engine; you\u2019re the closing engine.' },
    ],
    proof: '\u201CWe feed the army.\u201D',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cardsHTML = CARDS.map(card => {
    const pointsHTML = card.points.map(pt =>
      `<div class="${P}-point"><strong>${pt.strong}</strong> ${pt.text}</div>`
    ).join('');

    return `
            <div class="${P}-card">
              <div class="${P}-icon">${card.icon}</div>
              <h3>${card.title}</h3>
              <div class="${P}-points">${pointsHTML}
              </div>
              <div class="${P}-proof">${card.proof}</div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-wave-right" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">RISK MITIGATION</span>
          <h2 class="${P}-title">Your Protection Structure</h2>
          <p class="${P}-subtitle">Partnership isn\u2019t just about revenue\u2014it\u2019s about protecting your investment and reducing risk.</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
      </div>
    </div>
    <script>${PARTICLE_JS}</script>`;

  return base.wrapInDiviSection('Protection: Risk Mitigation', html, 'Protection: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PROTECTION SECTION (S4) === */
.${P}-section{padding:100px 24px;background:#fff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-wave-right{position:absolute;top:0;right:0;bottom:0;width:200px;opacity:0.05;background:linear-gradient(90deg,transparent 0%,rgba(0,175,240,0.15) 100%);pointer-events:none;z-index:0}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.2em;color:#0369a1;display:block;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,44px);font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.${P}-card{background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);border:1px solid #e2e8f0;border-radius:20px;padding:32px;transition:all 0.3s ease}
.${P}-card:hover{box-shadow:0 12px 40px rgba(0,0,0,0.08);border-color:#00AFF0}
.${P}-icon{width:56px;height:56px;background:linear-gradient(135deg,#00AFF0,#003CC8);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.${P}-icon svg{width:28px;height:28px;stroke:#fff}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 20px;padding:0}
.${P}-points{margin-bottom:20px}
.${P}-point{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;line-height:1.6;padding:12px 0;border-bottom:1px solid #f1f5f9}
.${P}-point:last-child{border-bottom:none}
.${P}-point strong{color:#000864;display:block;margin-bottom:4px}
.${P}-proof{font-family:'Noto Sans',sans-serif;font-size:13px;font-style:italic;color:#15803d;background:#f0fdf4;padding:12px 16px;border-radius:12px;text-align:center}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:1fr}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
