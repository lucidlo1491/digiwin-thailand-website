/**
 * econ-journey.js — 3-Year Partner Journey Section (S3)
 *
 * 3-col year cards: gradient headers (gray/blue/green) with badge + h3 + status,
 * reality block, activity block, math rows, total, outcome.
 * Navy summary box with CSS bar chart (3 bars).
 * Imports shared SVG from econ-revenue.js.
 *
 * Bar chart uses hardcoded height percentages (not CSS custom properties)
 * to avoid potential Divi sanitization of inline --var.
 *
 * Source: economics.html lines 1019-1177
 */

const base = require('../../lib/templates/_base');
const { getGrowthSVG } = require('./econ-revenue');

const P = 'jny'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// DATA — Year phases
// ════════════════════════════════════════════════════════════════
const PHASES = [
  {
    year: 1,
    headerClass: 'year-1',
    badge: 'Year 1',
    title: 'Investment & Ramp',
    status: 'Silver Partner (Co-Delivery)',
    featured: false,
    reality: '<strong>Reality:</strong> Don\u2019t expect profit in Q1-Q2. Your focus is training your core team and closing first \u201CPilot\u201D deals with DigiWin\u2019s heavy assistance.',
    activity: { label: 'Milestones:', value: 'Certify 2 consultants, close 2 Workflow iGP pilots' },
    math: [
      { label: 'License Revenue', value: 'Strong margin', cls: '' },
      { label: 'Service Revenue', value: '100% yours', cls: '' },
      { label: 'Recurring (MA)', value: '\u0E3F0 (warranty period)', cls: 'dim' },
    ],
    total: { label: 'Year 1 Focus', value: 'Build foundation' },
    outcome: '<strong>Outcome:</strong> Break even or small loss, but 2 reference sites and certified team. You survived the \u201CValley of Death.\u201D',
  },
  {
    year: 2,
    headerClass: 'year-2',
    badge: 'Year 2',
    title: 'Cash Flow Phase',
    status: 'Transition to Gold Partner',
    featured: false,
    reality: '<strong>Reality:</strong> Team can now deploy iGP without hand-holding. Stop bleeding hours on learning. Introduce \u201CReverse Cut\u201D strategy with MES.',
    activity: { label: 'New Sales:', value: '3 iGP projects + 1 MES standalone' },
    math: [
      { label: 'License Revenue', value: 'Grows with volume', cls: '' },
      { label: 'Service Revenue', value: '100% yours', cls: '' },
      { label: 'Recurring (MA)', value: 'Annuity begins', cls: '' },
    ],
    total: { label: 'Year 2 Focus', value: 'Profitable practice' },
    outcome: '<strong>Outcome:</strong> <strong class="highlight">Profitable practice.</strong> Service revenue funds operations; license revenue is pure profit. MA covers office rent.',
  },
  {
    year: 3,
    headerClass: 'year-3',
    badge: 'Year 3',
    title: 'Asset Building Phase',
    status: 'Gold Partner (Specialized)',
    featured: true,
    reality: '<strong>Reality:</strong> No longer just \u201Chunting.\u201D The farming engine kicks in. MA covers a junior consultant\u2019s salary. First T100 or AIoT upsell attempts.',
    activity: { label: 'New Sales:', value: '4 iGP + 1 T100 Enterprise or 2 MES add-ons' },
    math: [
      { label: 'License Revenue', value: 'Enterprise deals', cls: '' },
      { label: 'Service Revenue', value: '100% yours', cls: '' },
      { label: 'Recurring (MA)', value: 'Compounding', cls: 'highlight' },
    ],
    total: { label: 'Year 3 Focus', value: 'Asset, not just a job' },
    outcome: '<strong>Outcome:</strong> Business valuation shifts. <strong class="highlight">You have a recurring revenue stream and sticky client base.</strong> You built an asset, not just a job.',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const sceneId = `${P}-scene`;
  const svgInject = `<script>(function(){var c=document.querySelector('.${sceneId}');if(c){c.innerHTML='${getGrowthSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const phasesHTML = PHASES.map(p => {
    const mathRowsHTML = p.math.map(m =>
      `<div class="${P}-math-row">
                      <span>${m.label}</span>
                      <span class="${P}-math-value${m.cls ? ' ' + m.cls : ''}">${m.value}</span>
                    </div>`
    ).join('');

    return `
            <div class="${P}-phase${p.featured ? ' featured' : ''}">
              <div class="${P}-phase-header ${p.headerClass}">
                <div class="${P}-badge">${p.badge}</div>
                <h3>${p.title}</h3>
                <span class="${P}-status">${p.status}</span>
              </div>
              <div class="${P}-phase-body">
                <p class="${P}-reality">${p.reality}</p>
                <div class="${P}-activity">
                  <span class="${P}-activity-label">${p.activity.label}</span>
                  <span class="${P}-activity-value">${p.activity.value}</span>
                </div>
                <div class="${P}-math">${mathRowsHTML}
                  <div class="${P}-math-total">
                    <span>${p.total.label}</span>
                    <span class="${P}-math-total-value">${p.total.value}</span>
                  </div>
                </div>
                <p class="${P}-outcome">${p.outcome}</p>
              </div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${sceneId} ${P}-scene-wrap" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">REALISTIC YEAR 1-2-3 SCENARIOS</span>
          <h2 class="${P}-title">The 3-Year Partner Journey</h2>
          <p class="${P}-subtitle">Conservative estimates. No hype. Here\u2019s what typical progression looks like for a partner starting with SME products.</p>
        </div>
        <div class="${P}-grid">${phasesHTML}
        </div>
        <div class="${P}-summary">
          <h4 class="${P}-summary-title">3-Year Revenue Trajectory</h4>
          <div class="${P}-bars">
            <div class="${P}-bar ${P}-bar--y1">
              <span class="${P}-bar-value">Ramp</span>
              <span class="${P}-bar-label">Y1: Surviving</span>
            </div>
            <div class="${P}-bar ${P}-bar--y2">
              <span class="${P}-bar-value">2-3x</span>
              <span class="${P}-bar-label">Y2: Profitable</span>
            </div>
            <div class="${P}-bar ${P}-bar--y3 featured">
              <span class="${P}-bar-value">4x+</span>
              <span class="${P}-bar-label">Y3: Asset</span>
            </div>
          </div>
        </div>
      </div>
    </div>${svgInject}`;

  return base.wrapInDiviSection('Journey: 3-Year Projection', html, 'Journey: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === 3-YEAR JOURNEY SECTION (S3) === */
.${P}-section{padding:100px 24px;background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-scene-wrap{position:absolute;inset:0;pointer-events:none;z-index:0}
.${P}-scene-wrap svg{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0.20}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-phase-header{text-align:center;margin-bottom:60px}
.${P}-activity-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.2em;color:#0369a1;display:block;margin-bottom:16px}
.${P}-summary-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,44px);font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}

/* Year Cards Grid */
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
.${P}-phase{background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;transition:all 0.3s ease;display:flex;flex-direction:column}
.${P}-phase:hover{box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.${P}-phase.featured{border-color:#4ade80;box-shadow:0 0 0 3px rgba(74,222,128,0.2)}

/* Phase Headers */
.${P}-phase-header{padding:24px;position:relative}
.${P}-phase-header.year-1{background:linear-gradient(135deg,#94a3b8,#5b6b80)}
.${P}-phase-header.year-2{background:linear-gradient(135deg,#00AFF0,#003CC8)}
.${P}-phase-header.year-3{background:linear-gradient(135deg,#4ade80,#22c55e)}
.${P}-badge{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:rgba(255,255,255,0.8);background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:50px;margin-bottom:12px;display:inline-block}
.${P}-phase-header h3{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:700;color:#fff;line-height:1.6;margin:0 0 8px;padding:0}
.${P}-status{font-family:'Noto Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.8)}

/* Phase Body */
.${P}-phase-body{padding:24px;flex:1;display:flex;flex-direction:column}
.${P}-reality{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;line-height:1.6;margin:0 0 20px;padding:16px;background:#f8fafc;border-radius:12px}
.${P}-activity{margin-bottom:20px;padding:12px 16px;background:#eff6ff;border-radius:12px;min-height:72px}
.${P}-activity-label{font-family:'Noto Sans',sans-serif;font-size:12px;color:#5b6b80;display:block;margin-bottom:4px}
.${P}-activity-value{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:600;color:#000864}

/* Math Block */
.${P}-math{background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:16px;margin-top:auto}
.${P}-math-row{display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;border-bottom:1px solid #e2e8f0;gap:12px}
.${P}-math-row:last-child{border-bottom:none}
.${P}-math-row>span:first-child{flex-shrink:0;white-space:nowrap}
.${P}-math-value{font-weight:600;color:#000864;text-align:right}
.${P}-math-value.dim{color:#5b6b80}
.${P}-math-value.highlight{color:#15803d}
.${P}-math-total{display:flex;justify-content:space-between;align-items:baseline;padding-top:12px;margin-top:8px;border-top:2px solid #e2e8f0;gap:12px}
.${P}-math-total>span:first-child{font-family:'Noto Sans',sans-serif;font-weight:600;color:#000864;flex-shrink:0;white-space:nowrap}
.${P}-math-total-value{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:700;color:#15803d;text-align:right}
.${P}-outcome{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;line-height:1.6;margin:0;padding:0}
.${P}-outcome .highlight{color:#15803d}

/* Summary Box with Bar Chart */
.${P}-summary{background:linear-gradient(135deg,#000864 0%,#000432 100%);border-radius:20px;padding:48px 48px 80px;text-align:center}
.${P}-summary-title{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#fff;line-height:1.6;margin:0 0 32px;padding:0}
.${P}-bars{display:flex;align-items:flex-end;justify-content:center;gap:32px;height:200px}
.${P}-bar{width:100px;border-radius:8px 8px 0 0;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;padding-top:16px;position:relative;background:linear-gradient(180deg,#00AFF0,#003CC8)}
.${P}-bar.featured{background:linear-gradient(180deg,#4ade80,#22c55e)}
.${P}-bar--y1{height:27%}
.${P}-bar--y2{height:63%}
.${P}-bar--y3{height:100%}
.${P}-bar-value{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:700;color:#fff}
.${P}-bar-label{position:absolute;bottom:-32px;font-family:'Noto Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.75);white-space:nowrap}

/* Responsive */
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:1fr}
  .${P}-bars{gap:16px}
  .${P}-bar{width:80px}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-summary{padding:32px 24px 64px}
  .${P}-bars{height:150px}
}
${base.reducedMotion(`.${P}-phase{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
