/**
 * ps-lifecycle.js — Land and Expand Lifecycle Section (S3)
 *
 * Built from scratch. 4 phase cards with per-phase colors,
 * SVG arrow connectors between cards, dark proof bar.
 * Wave-flow decoration 0.06 opacity.
 * Arrows: transform:rotate(90deg) on tablet (not display:none).
 *
 * Source: solutions.html lines 1269-1321
 */

const base = require('../../lib/templates/_base');

const P = 'ps-lc'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const PHASES = [
  {
    num: 1, cls: 'phase-1', color: '#00AFF0',
    title: 'Land', products: 'iGP (Volume) or MES (Reverse Cut)',
    desc: 'Entry point with immediate value. Fast project, quick cash.',
    revenue: 'Project fees + License',
  },
  {
    num: 2, cls: 'phase-2', color: '#10b981',
    title: 'Stabilize', products: 'WMS',
    desc: 'Control inventory accuracy. Solve \u201CGhost Inventory\u201D pain.',
    revenue: 'Project + Hardware',
  },
  {
    num: 3, cls: 'phase-3', color: '#f59e0b',
    title: 'Expand', products: 'T100 ERP',
    desc: 'Scale to enterprise. High-value project revenue.',
    revenue: 'Enterprise project',
  },
  {
    num: 4, cls: 'phase-4', color: '#8b5cf6',
    title: 'Lock', products: 'AIoT',
    desc: 'Physical integration = permanent retention.',
    revenue: 'Subscription + Data',
  },
];

const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const phasesHTML = PHASES.map((ph, i) => {
    const arrow = i < PHASES.length - 1
      ? `<div class="${P}-arrow">${ARROW_SVG}</div>`
      : '';
    return `
                <div class="${P}-phase ${P}-${ph.cls}">
                  <div class="${P}-num" style="background:${ph.color}">${ph.num}</div>
                  <h3>${ph.title}</h3>
                  <div class="${P}-products">${ph.products}</div>
                  <p>${ph.desc}</p>
                  <div class="${P}-revenue">${ph.revenue}</div>
                </div>${arrow}`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-wave" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">CUSTOMER LIFECYCLE MANAGEMENT</span>
          <h2 class="${P}-title">The \u201CLand and Expand\u201D Strategy</h2>
          <p class="${P}-subtitle">You\u2019re not selling software. You\u2019re executing a 4-phase account takeover strategy.</p>
        </div>
        <div class="${P}-phases">${phasesHTML}
        </div>
        <div class="${P}-proof">
          <p><strong>This isn\u2019t just software\u2014it\u2019s a Customer Lifecycle Management strategy that compounds revenue over years.</strong></p>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Lifecycle: Land & Expand', html, 'Lifecycle: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === LIFECYCLE SECTION (S3) === */
.${P}-section{padding:100px 24px;background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-wave{position:absolute;bottom:0;left:0;right:0;height:100px;opacity:0.06;background:linear-gradient(180deg,transparent 0%,rgba(0,175,240,0.15) 100%);pointer-events:none;z-index:0}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:#0369a1;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;display:block}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0 auto;padding:0}
.${P}-phases{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap}
.${P}-phase{background:#fff;border:2px solid #e2e8f0;border-radius:20px;padding:32px 24px;text-align:center;flex:1;min-width:200px;max-width:240px;transition:all 0.3s ease}
.${P}-phase:hover{box-shadow:0 12px 40px rgba(0,175,240,0.15)}
.${P}-phase-1{border-color:#00AFF0}
.${P}-phase-2{border-color:#10b981}
.${P}-phase-3{border-color:#f59e0b}
.${P}-phase-4{border-color:#8b5cf6}
.${P}-num{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0 auto 16px}
.${P}-phase h3{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 8px;padding:0}
.${P}-products{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:#5b6b80;background:#f1f5f9;padding:6px 12px;border-radius:50px;margin-bottom:12px;display:inline-block}
.${P}-phase p{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;line-height:1.5;margin:0 0 12px;padding:0}
.${P}-revenue{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#047857;text-transform:uppercase;letter-spacing:0.5px}
.${P}-arrow{flex-shrink:0}
.${P}-arrow svg{width:32px;height:32px;color:#cbd5e1}
.${P}-proof{text-align:center;margin-top:48px;padding:24px;background:linear-gradient(135deg,#000864 0%,#000432 100%);border-radius:16px}
.${P}-proof p{color:rgba(255,255,255,0.9);font-size:16px;margin:0;line-height:1.6}
.${P}-proof strong{color:#fff}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-phases{flex-direction:column}
  .${P}-arrow{transform:rotate(90deg)}
  .${P}-phase{max-width:none}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-title{font-size:32px}
}
${base.reducedMotion(`.${P}-phase{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
