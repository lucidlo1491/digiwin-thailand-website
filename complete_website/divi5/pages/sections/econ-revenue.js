/**
 * econ-revenue.js — Revenue Model Section (S2)
 *
 * 2x2 card grid: navy gradient header (icon + h3 + tag) + white body (desc + margin-grid + note).
 * SVG scene: shared growth chart (getGrowthSVG) — exported for econ-journey.js.
 * Wave-flow-top at 0.10 opacity.
 *
 * Source: economics.html lines 882-1017
 */

const base = require('../../lib/templates/_base');

const P = 'rev'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// SVG SCENE — shared between revenue + journey sections
// Decorative bar chart silhouette. <text> labels removed (10% opacity,
// decorative only — avoids wp_kses stripping complexity).
// ════════════════════════════════════════════════════════════════
function getGrowthSVG() {
  return '<svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<path d="M100 750 Q300 740 500 700 Q700 640 900 500 Q1050 380 1150 250 Q1250 140 1350 50" stroke="#000864" stroke-width="2.5" fill="none" opacity="0.2"/>'
    + '<rect x="200" y="600" width="120" height="150" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>'
    + '<rect x="200" y="500" width="120" height="100" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>'
    + '<rect x="400" y="450" width="120" height="300" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>'
    + '<rect x="400" y="320" width="120" height="130" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>'
    + '<rect x="600" y="300" width="120" height="450" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>'
    + '<rect x="600" y="180" width="120" height="120" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>'
    + '<path d="M900 600 L900 350" stroke="#00AFF0" stroke-width="2" opacity="0.2"/>'
    + '<path d="M890 360 L900 340 L910 360" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.2"/>'
    + '<path d="M1000 550 L1000 250" stroke="#00AFF0" stroke-width="2" opacity="0.15"/>'
    + '<path d="M990 260 L1000 240 L1010 260" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.15"/>'
    + '<circle cx="1200" cy="500" r="40" stroke="#000864" stroke-width="1" fill="none" opacity="0.1" stroke-dasharray="4 3"/>'
    + '<circle cx="1200" cy="500" r="80" stroke="#000864" stroke-width="1" fill="none" opacity="0.07" stroke-dasharray="4 3"/>'
    + '<circle cx="1200" cy="500" r="120" stroke="#000864" stroke-width="1" fill="none" opacity="0.05" stroke-dasharray="4 3"/>'
    + '<circle cx="1200" cy="500" r="4" fill="#00AFF0" opacity="0.25"/>'
    + '<circle cx="350" cy="400" r="3" fill="#000864" opacity="0.12"/>'
    + '<circle cx="800" cy="250" r="4" fill="#000864" opacity="0.1"/>'
    + '</svg>';
}

// ════════════════════════════════════════════════════════════════
// ICON SVGs
// ════════════════════════════════════════════════════════════════
const ICONS = {
  license: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>',
  service: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>',
  recurring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  upsell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8m-4-4h8"/></svg>',
};

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const STREAMS = [
  {
    icon: ICONS.license,
    title: 'License Revenue',
    tag: 'Front-Loaded Cash Flow',
    desc: 'You purchase license keys at Distributor Price, sell at Suggested Selling Price (SSP). The difference is <strong>immediate gross profit</strong>\u2014profitable from Day 1.',
    margins: [
      { level: 'Silver Partner', value: 'Strong margin', highlight: false },
      { level: 'Gold Partner', value: 'Industry-leading margin', highlight: true },
    ],
    note: null,
  },
  {
    icon: ICONS.service,
    title: 'Service Revenue',
    tag: '100% Retention',
    desc: 'DigiWin is a product vendor, not a service competitor. <strong>You keep 100%</strong> of all Implementation, Customization, and Training fees.',
    margins: [
      { level: 'Workflow iGP Project', value: 'Varies by scope', highlight: false },
      { level: 'T100/MES Project', value: 'Hourly billing', highlight: true },
    ],
    note: 'We \u201Cgive up\u201D this high-margin revenue to partners in exchange for market scale.',
  },
  {
    icon: ICONS.recurring,
    title: 'Recurring Support (MA)',
    tag: 'The Annuity Stream',
    desc: 'You pay DigiWin a <strong>fixed annual fee</strong> (starting Year 2) for Tier 2 support\u2014core bug fixes, patches, and R&D. You provide Tier 1 support and <strong>set your own client rate</strong>.',
    margins: [
      { level: 'Your Cost to DigiWin', value: 'Fixed annual fee', highlight: false },
      { level: 'You Charge the Client', value: 'You set the rate', highlight: true },
    ],
    note: 'No profit-sharing. Your cost is fixed and predictable. You set your own client rate and keep the markup. As install base grows, MA becomes your most predictable revenue stream.',
  },
  {
    icon: ICONS.upsell,
    title: 'Upsell & Cross-Sell',
    tag: 'Growth Multiplier',
    desc: 'Revenue doesn\u2019t end at Go-Live. Build IP on the <strong>Digiwin.cloud PaaS platform</strong>. Custom modules become licensable assets.',
    margins: [
      { level: 'Module Add-ons', value: 'Same tier-based margin', highlight: false },
      { level: 'Referral Fees', value: '5-10% of license', highlight: true },
    ],
    note: 'A single client can generate 3-4 additional license sales over 5 years.',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const sceneId = `${P}-scene`;
  const svgInject = `<script>(function(){var c=document.querySelector('.${sceneId}');if(c){c.innerHTML='${getGrowthSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const cardsHTML = STREAMS.map(s => {
    const marginsHTML = s.margins.map(m =>
      `<div class="${P}-margin-item">
                    <span class="${P}-margin-level">${m.level}</span>
                    <span class="${P}-margin-value${m.highlight ? ' highlight' : ''}">${m.value}</span>
                  </div>`
    ).join('');

    const noteHTML = s.note
      ? `<p class="${P}-stream-note"><em>${s.note}</em></p>`
      : '';

    return `
            <div class="${P}-stream">
              <div class="${P}-stream-header">
                <div class="${P}-stream-icon">${s.icon}</div>
                <h3>${s.title}</h3>
                <span class="${P}-stream-tag">${s.tag}</span>
              </div>
              <div class="${P}-stream-body">
                <p class="${P}-stream-desc">${s.desc}</p>
                <div class="${P}-margin-grid">${marginsHTML}
                </div>
                ${noteHTML}
              </div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${sceneId} ${P}-scene-wrap" aria-hidden="true"></div>
      <div class="${P}-wave-top" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">THE 4 REVENUE STREAMS</span>
          <h2 class="${P}-title">How Partner Revenue Actually Works</h2>
          <p class="${P}-subtitle">Unlike SaaS vendors that trickle revenue over years, our model provides substantial upfront margin plus recurring income.</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
      </div>
    </div>${svgInject}`;

  return base.wrapInDiviSection('Revenue: 4 Streams', html, 'Revenue: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === REVENUE MODEL SECTION (S2) === */
.${P}-section{padding:100px 24px;background:#fff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-scene-wrap{position:absolute;inset:0;pointer-events:none;z-index:0}
.${P}-scene-wrap svg{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0.20}
.${P}-wave-top{position:absolute;top:0;left:0;right:0;height:120px;opacity:0.10;background:linear-gradient(180deg,rgba(0,175,240,0.15) 0%,transparent 100%);pointer-events:none;z-index:1}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.2em;color:#0369a1;display:block;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,44px);font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.${P}-stream{background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;transition:all 0.3s ease}
.${P}-stream:hover{box-shadow:0 12px 40px rgba(0,0,0,0.08);border-color:#cbd5e1}
.${P}-stream-header{background:linear-gradient(135deg,#000864 0%,#000432 100%);padding:24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.${P}-stream-icon{width:48px;height:48px;background:rgba(255,255,255,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center}
.${P}-stream-icon svg{width:24px;height:24px;stroke:#4ade80}
.${P}-stream-header h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#fff;line-height:1.6;flex:1;margin:0;padding:0}
.${P}-stream-tag{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:500;color:#15803d;background:rgba(74,222,128,0.15);padding:4px 10px;border-radius:50px}
.${P}-stream-body{padding:24px}
.${P}-stream-desc{font-family:'Noto Sans',sans-serif;font-size:15px;color:#5b6b80;line-height:1.6;margin:0 0 20px;padding:0}
.${P}-margin-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.${P}-margin-item{background:#f8fafc;border-radius:12px;padding:16px}
.${P}-margin-level{font-family:'Noto Sans',sans-serif;font-size:12px;color:#5b6b80;display:block;margin-bottom:6px}
.${P}-margin-value{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864}
.${P}-margin-value.highlight{color:#15803d}
.${P}-stream-note{font-family:'Noto Sans',sans-serif;font-size:14px;color:#666666;font-style:italic;margin:0;padding:0}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:1fr}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-margin-grid{grid-template-columns:1fr}
}
${base.reducedMotion(`.${P}-stream{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css, getGrowthSVG };
