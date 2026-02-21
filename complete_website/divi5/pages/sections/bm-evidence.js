/**
 * bm-evidence.js — Industry Evidence Sections (S3 + S4)
 *
 * Shared builder for two rows of evidence cards (3 cards each).
 * S3: With SVG scatter chart background + wave-fade (opacity 0.05).
 * S4: Plain white background, tighter padding (flows from S3).
 *
 * Source: business-model.html lines 804-908
 */

const base = require('../../lib/templates/_base');

const P = 'math'; // CSS prefix (matches HTML class naming)

// ════════════════════════════════════════════════════════════════
// SVG ICONS
// ════════════════════════════════════════════════════════════════
const ICONS = {
  barChart: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
  users: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  clock: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  barAsc: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
};

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const ROW1_CARDS = [
  {
    icon: ICONS.barChart,
    title: 'The Profit Squeeze',
    body: 'Project net margins have compressed from <strong>~35% in 2018 to ~18% in 2024</strong>. Clients demand Tier-1 capabilities at Tier-3 prices. A 9-month project that generated \u0E3F500k profit now generates only ~\u0E3F150k.',
    formula: 'Same Effort = Half the Return',
  },
  {
    icon: ICONS.users,
    title: 'The 35-Person Cap',
    body: 'Boutique consultancies cannot scale beyond <strong>35\u201345 employees</strong> because delivery relies on \u201Chero\u201D seniors. To grow revenue, you must hire more\u2014increasing overhead and risk with no leverage.',
    formula: 'Revenue = Headcount (Linear Only)',
  },
  {
    icon: ICONS.clock,
    title: 'The \u0E3F200K Replacement Cost',
    body: 'Replacing a senior consultant costs <strong>\u0E3F200,000 in recruitment plus 6 months</strong> of lost productivity. One quitting senior can paralyze your ability to take new projects.',
    formula: 'Talent Loss = 200K + 6 Months',
  },
];

const ROW2_CARDS = [
  {
    icon: ICONS.dollar,
    title: 'The 65% Overrun Trap',
    body: '<strong>65% of budget overruns</strong> come from system modifications to improve usability. This becomes \u201Cunbillable goodwill work\u201D\u2014fixing rigid software to fit Thai factory processes, directly eating your margin.',
    formula: 'Goodwill Fixes = Profit Evaporates',
  },
  {
    icon: ICONS.barAsc,
    title: 'The 30% Undercut',
    body: 'Open-source and local competitors (free ERP platforms, local accounting software) offer implementation costs <strong>~30% lower</strong>. Without a differentiated weapon, you\u2019re forced to compete on price\u2014the race to the bottom.',
    formula: 'Price War = Margin Death',
  },
  {
    icon: ICONS.bookmark,
    title: 'The Shrinking Pie',
    body: 'Economic headwinds led to <strong>~100 factory closures/month</strong> in early 2024. The total addressable market is shrinking while competition for healthy clients intensifies.',
    formula: 'Fewer Factories = More Competition',
  },
];

// ════════════════════════════════════════════════════════════════
// SVG SCATTER CHART (background decoration for S3)
// ════════════════════════════════════════════════════════════════
const SCATTER_SVG = `<svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <path d="M100 750 Q300 740 500 700 Q700 640 900 500 Q1050 380 1150 250 Q1250 140 1350 50" stroke="#000864" stroke-width="2.5" fill="none" opacity="0.2"/>
  <rect x="200" y="600" width="120" height="150" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="200" y="500" width="120" height="100" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
  <rect x="400" y="450" width="120" height="300" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="400" y="320" width="120" height="130" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
  <rect x="600" y="300" width="120" height="450" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="600" y="180" width="120" height="120" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
  <text x="230" y="790" font-family="'Noto Sans',sans-serif" font-size="12" fill="#000864" opacity="0.1" text-anchor="middle">Y1</text>
  <text x="460" y="790" font-family="'Noto Sans',sans-serif" font-size="12" fill="#000864" opacity="0.1" text-anchor="middle">Y2</text>
  <text x="660" y="790" font-family="'Noto Sans',sans-serif" font-size="12" fill="#000864" opacity="0.1" text-anchor="middle">Y3</text>
  <path d="M900 600 L900 350" stroke="#00AFF0" stroke-width="2" opacity="0.2"/>
  <path d="M890 360 L900 340 L910 360" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.2"/>
  <path d="M1000 550 L1000 250" stroke="#00AFF0" stroke-width="2" opacity="0.15"/>
  <path d="M990 260 L1000 240 L1010 260" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.15"/>
  <circle cx="1200" cy="500" r="40" stroke="#000864" stroke-width="1" fill="none" opacity="0.1" stroke-dasharray="4 3"/>
  <circle cx="1200" cy="500" r="80" stroke="#000864" stroke-width="1" fill="none" opacity="0.07" stroke-dasharray="4 3"/>
  <circle cx="1200" cy="500" r="120" stroke="#000864" stroke-width="1" fill="none" opacity="0.05" stroke-dasharray="4 3"/>
  <circle cx="1200" cy="500" r="4" fill="#00AFF0" opacity="0.25"/>
  <circle cx="350" cy="400" r="3" fill="#000864" opacity="0.12"/>
  <circle cx="800" cy="250" r="4" fill="#000864" opacity="0.1"/>
</svg>`;

function buildCardHTML(card) {
  return `
          <div class="${P}-card">
            <div class="${P}-icon">${card.icon}</div>
            <h3>${card.title}</h3>
            <p>${card.body}</p>
            <div class="${P}-formula">
              <code>${card.formula}</code>
            </div>
          </div>`;
}

// ════════════════════════════════════════════════════════════════
// S3: EVIDENCE ROW 1 (with SVG + wave-fade)
// ════════════════════════════════════════════════════════════════
const evidenceRow1 = {
  blocks() {
    const svgBase64 = Buffer.from(SCATTER_SVG).toString('base64');
    const svgInject = `<div id="dw-bm-scene"></div><script>(function(){var s=atob('${svgBase64}');document.getElementById('dw-bm-scene').innerHTML=decodeURIComponent(Array.from(s,function(c){return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''));})()</script>`;

    const cardsHTML = ROW1_CARDS.map(buildCardHTML).join('');

    const html = `
    <div class="${P}-section ${P}-section--row1">
      <div class="${P}-scene">${svgInject}</div>
      <div class="${P}-wave-fade" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">The Industry Evidence</h2>
          <p class="${P}-subtitle">This isn\u2019t anecdote. Here\u2019s the documented math of why the model is broken.</p>
        </div>
        <div class="${P}-cards">${cardsHTML}
        </div>
      </div>
    </div>`;

    return base.wrapInDiviSection('Evidence: Row 1 (The Math)', html, 'Evidence Row 1: Content');
  },
  css() {
    return sharedCSS();
  },
};

// ════════════════════════════════════════════════════════════════
// S4: EVIDENCE ROW 2 (plain background, tighter padding)
// ════════════════════════════════════════════════════════════════
const evidenceRow2 = {
  blocks() {
    const cardsHTML = ROW2_CARDS.map(buildCardHTML).join('');

    const html = `
    <div class="${P}-section ${P}-section--row2">
      <div class="${P}-inner">
        <div class="${P}-cards">${cardsHTML}
        </div>
      </div>
    </div>`;

    return base.wrapInDiviSection('Evidence: Row 2 (More Math)', html, 'Evidence Row 2: Content');
  },
  css() {
    return ''; // Shared CSS emitted by evidenceRow1
  },
};

// ════════════════════════════════════════════════════════════════
// SHARED CSS
// ════════════════════════════════════════════════════════════════
function sharedCSS() {
  return `
/* === EVIDENCE CARDS (S3+S4) === */
.${P}-section{padding:100px 24px;background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section--row1{padding-bottom:0}
.${P}-section--row2{background:#fff;padding-top:24px}
${base.svgSceneCSS(P)}
.${P}-wave-fade{position:relative;width:100%;height:120px;background-image:radial-gradient(circle at 50% 120%,rgba(0,175,240,0.06) 0%,transparent 60%);pointer-events:none;z-index:0;opacity:0.05;margin:-1px 0}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin:0 0 60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.${P}-card{background:#fff;border:1px solid #fecaca;border-radius:20px;padding:40px;position:relative;overflow:hidden}
.${P}-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#dc2626,#f97316)}
.${P}-icon{width:64px;height:64px;background:linear-gradient(135deg,#dc2626,#b91c1c);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:24px}
.${P}-icon svg{width:32px;height:32px;stroke:#fff;fill:none}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:22px;font-weight:600;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-card p{font-family:'Noto Sans',sans-serif;font-size:15px;color:#5b6b80;line-height:1.7;margin:0 0 24px;padding:0}
.${P}-formula{background:#fef2f2;border-radius:12px;padding:20px;text-align:center}
.${P}-formula code{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:600;color:#991b1b}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-cards{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-section--row2{padding-top:20px}
  .${P}-cards{grid-template-columns:1fr}
  .${P}-header{margin-bottom:40px}
}`.trim();
}

module.exports = { evidenceRow1, evidenceRow2 };
