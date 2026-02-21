/**
 * partner-pain.js — Revenue Model Pain (S2) + Operational Pain (S3)
 *
 * Shared builder: both sections use identical .reality-* card structure.
 * S2: white bg, SVG factory scene, 3 cards
 * S3: #f8fafc bg, SVG operational scene, 3 cards + CTA
 *
 * Source: partner-program.html lines 1078-1198
 */

const base = require('../../lib/templates/_base');

const P = 'reality'; // CSS prefix shared by both sections

// ════════════════════════════════════════════════════════════════
// SVG SCENES — injected via Base64 JS (wp_kses strips <text> elements)
// ════════════════════════════════════════════════════════════════
function getRevenueSVG() {
  return '<svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<rect x="150" y="550" width="50" height="250" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.25"/>'
    + '<rect x="240" y="450" width="50" height="350" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.3"/>'
    + '<rect x="330" y="370" width="50" height="430" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.3"/>'
    + '<rect x="420" y="320" width="50" height="480" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.35"/>'
    + '<rect x="510" y="300" width="50" height="500" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.35"/>'
    + '<rect x="600" y="290" width="50" height="510" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.3"/>'
    + '<rect x="690" y="285" width="50" height="515" rx="3" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.25"/>'
    + '<line x1="100" y1="270" x2="800" y2="270" stroke="#00AFF0" stroke-width="2.5" stroke-dasharray="12 8" opacity="0.3"/>'
    + '<circle cx="1050" cy="350" r="90" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>'
    + '<line x1="1050" y1="350" x2="1050" y2="280" stroke="#000864" stroke-width="2.5" opacity="0.18" stroke-linecap="round"/>'
    + '<line x1="1050" y1="350" x2="1100" y2="370" stroke="#000864" stroke-width="2" opacity="0.15" stroke-linecap="round"/>'
    + '<circle cx="1050" cy="350" r="4" fill="#000864" opacity="0.25"/>'
    + '<circle cx="180" cy="300" r="3" fill="#000864" opacity="0.15"/>'
    + '<circle cx="750" cy="400" r="3" fill="#00AFF0" opacity="0.15"/>'
    + '</svg>';
}

function getOperationalSVG() {
  return '<svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<path d="M100 700 Q300 680 500 650 Q700 600 900 580 Q1100 560 1300 550" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>'
    + '<path d="M100 750 Q300 740 500 720 Q700 700 900 690 Q1100 680 1300 675" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>'
    + '<rect x="200" y="200" width="120" height="80" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>'
    + '<line x1="220" y1="230" x2="300" y2="230" stroke="#000864" stroke-width="0.5" opacity="0.12"/>'
    + '<line x1="220" y1="245" x2="280" y2="245" stroke="#000864" stroke-width="0.5" opacity="0.12"/>'
    + '<line x1="220" y1="260" x2="290" y2="260" stroke="#000864" stroke-width="0.5" opacity="0.12"/>'
    + '<path d="M320 240 L400 240" stroke="#000864" stroke-width="1.5" opacity="0.15"/>'
    + '<polygon points="395,235 410,240 395,245" fill="#000864" opacity="0.15"/>'
    + '<rect x="410" y="200" width="120" height="80" rx="6" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>'
    + '<path d="M530 240 L610 240" stroke="#000864" stroke-width="1.5" opacity="0.12"/>'
    + '<polygon points="605,235 620,240 605,245" fill="#000864" opacity="0.12"/>'
    + '<path d="M620 240 Q700 240 700 280 Q700 320 620 320 L530 320" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12" stroke-dasharray="6 4"/>'
    + '<circle cx="1100" cy="300" r="70" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.12"/>'
    + '<line x1="1100" y1="300" x2="1100" y2="245" stroke="#000864" stroke-width="2" opacity="0.15" stroke-linecap="round"/>'
    + '<line x1="1100" y1="300" x2="1140" y2="315" stroke="#000864" stroke-width="1.5" opacity="0.12" stroke-linecap="round"/>'
    + '<circle cx="300" cy="500" r="3" fill="#000864" opacity="0.12"/>'
    + '<circle cx="800" cy="450" r="4" fill="#00AFF0" opacity="0.1"/>'
    + '<circle cx="1250" cy="550" r="3" fill="#000864" opacity="0.1"/>'
    + '</svg>';
}

// ════════════════════════════════════════════════════════════════
// ICON SVGs (inline, safe from wp_kses)
// ════════════════════════════════════════════════════════════════
const ICONS = {
  chart: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  lock: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  burnout: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  users: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
};

// ════════════════════════════════════════════════════════════════
// SECTION BUILDERS
// ════════════════════════════════════════════════════════════════

/**
 * Build a reality-check section (shared between S2 and S3)
 */
function buildSection(config) {
  const { id, bg, sceneSVG, header, cards, cta } = config;

  const sceneId = `${P}-scene-${id}`;
  const svgInject = `<script>(function(){var c=document.querySelector('.${sceneId}');if(c){c.innerHTML='${sceneSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const cardsHTML = cards.map(card => `
        <div class="${P}-card">
          <div class="${P}-icon">${card.icon}</div>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </div>`).join('');

  const ctaHTML = cta
    ? `<div class="${P}-cta-wrap"><a href="${cta.href}" class="${P}-cta-btn">${cta.text}</a></div>`
    : '';

  // Add wave-fade spacer at top of revenue section (matches HTML prototype line 1105)
  const waveFadeHTML = id === 'revenue'
    ? `<div class="${P}-wave-fade" aria-hidden="true"></div>`
    : '';

  const html = `
    <div class="${P}-section ${P}-section--${id}" style="background:${bg}">
      ${waveFadeHTML}
      <div class="${sceneId} ${P}-scene" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${header.title}</h2>
          <p class="${P}-subtitle">${header.subtitle}</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
        ${ctaHTML}
      </div>
    </div>${svgInject}`;

  return base.wrapInDiviSection(config.adminLabel, html, `${config.adminLabel}: Content`);
}

// ── S2: Revenue Model Pain ──────────────────────────────────────
const REVENUE_CONFIG = {
  id: 'revenue',
  adminLabel: 'Pain: Revenue Model',
  bg: '#fff',
  sceneSVG: getRevenueSVG,
  header: {
    title: 'The Revenue Model Pain',
    subtitle: 'You know these patterns. We\u2019ve heard them from every systems integrator we\u2019ve talked to. The profit squeeze is structural, not circumstantial.',
  },
  cards: [
    {
      icon: ICONS.chart,
      title: 'The \u201CMargin Erosion\u201D Crisis',
      body: 'Your project margins have silently compressed from <strong>35% to 18%</strong> over the last few years. Clients demand Tier-1 capabilities (IoT, real-time costing) but refuse to pay more than Tier-3 prices.',
    },
    {
      icon: ICONS.dollar,
      title: 'The \u201CUnbillable Overrun\u201D',
      body: 'You spend weeks fixing data errors or creating workarounds for rigid software (phantom BOMs, regrind logic) that you <strong>cannot bill for</strong>, turning profitable projects into break-even disasters.',
    },
    {
      icon: ICONS.lock,
      title: 'The \u201CGhost IT\u201D Burden',
      body: 'You aren\u2019t just their ERP consultant \u2014 you\u2019ve become their unpaid IT department. <strong>Many Thai SMEs</strong> lack a dedicated IT manager, so your senior staff wastes billable hours on Wi-Fi troubleshooting and password resets.',
    },
  ],
};

// ── S3: Operational Pain ────────────────────────────────────────
const OPERATIONAL_CONFIG = {
  id: 'operational',
  adminLabel: 'Pain: Operational',
  bg: '#f8fafc',
  sceneSVG: getOperationalSVG,
  header: {
    title: 'The Operational Pain',
    subtitle: 'Your best people are burning out. Not from hard work\u2014from the wrong work.',
  },
  cards: [
    {
      icon: ICONS.burnout,
      title: 'Consultant Burnout',
      body: 'Your senior consultants are quitting\u2014not for salary, but because they\u2019re tired of being <strong>\u201Cdata babysitters.\u201D</strong> They spend 50% of their time watching warehouse staff type numbers instead of doing solution architecture.',
    },
    {
      icon: ICONS.clock,
      title: 'The \u201CKnowledge Ceiling\u201D',
      body: 'You cannot scale beyond ~35 people because delivery relies on a few \u201Chero\u201D seniors. If one quits, it costs you <strong>\u0E3F200,000 in recruitment plus 6 months</strong> of lost productivity.',
    },
    {
      icon: ICONS.users,
      title: 'The \u201CSales vs. Delivery\u201D War',
      body: 'Sales promises \u201Ccustomized flexibility\u201D to win deals. Delivery tries to force a rigid ERP to bend. This <strong>perpetual conflict</strong> drains morale and profit on every single project.',
    },
  ],
  cta: {
    text: 'Read the Full Diagnosis \u2192',
    href: '/partner-program/business-model.html',
  },
};

// ════════════════════════════════════════════════════════════════
// SHARED CSS
// ════════════════════════════════════════════════════════════════
function sharedCSS() {
  return `
/* === REALITY CHECK SECTIONS (S2+S3) === */
.${P}-wave-fade{position:relative;width:100%;height:120px;pointer-events:none;opacity:0.06;margin:-1px 0}
.${P}-section{padding:100px 24px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section--operational{padding-top:60px}
${base.svgSceneCSS(P)}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;max-width:800px;margin:0 auto 60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.${P}-card{background:linear-gradient(135deg,#fef2f2 0%,#fff5f5 100%);border:1px solid #fecaca;border-radius:16px;padding:32px;position:relative}
.${P}-icon{width:56px;height:56px;background:linear-gradient(135deg,#dc2626,#b91c1c);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.${P}-icon svg{width:28px;height:28px;stroke:#fff;fill:none}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#7f1d1d;line-height:1.6;margin:0 0 12px;padding:0}
.${P}-card p{font-family:'Noto Sans',sans-serif;font-size:15px;color:#991b1b;line-height:1.6;margin:0;padding:0}
.${P}-cta-wrap{text-align:center;margin-top:48px}
.${P}-cta-btn{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:600;color:#0369a1;background:rgba(0,175,240,0.08);border:1px solid rgba(0,175,240,0.2);padding:12px 28px;border-radius:8px;text-decoration:none;transition:all 0.3s ease;display:inline-block}
.${P}-cta-btn:hover{background:rgba(0,175,240,0.15);border-color:#00AFF0;transform:translateY(-1px)}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-section--operational{padding-top:40px}
  .${P}-grid{grid-template-columns:1fr}
  .${P}-header{margin-bottom:40px}
}
${base.reducedMotion(`.${P}-cta-btn{transition:none !important}`)}`.trim();
}

// ════════════════════════════════════════════════════════════════
// EXPORTS — two sub-builders sharing CSS
// ════════════════════════════════════════════════════════════════
module.exports = {
  painRevenue: {
    blocks: () => buildSection(REVENUE_CONFIG),
    css: () => sharedCSS(), // CSS emitted once with first section
  },
  painOperational: {
    blocks: () => buildSection(OPERATIONAL_CONFIG),
    css: () => '', // CSS already emitted by painRevenue
  },
};
