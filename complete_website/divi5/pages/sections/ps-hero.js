/**
 * ps-hero.js — Partner Solutions Hero Section (S1)
 *
 * Adapted from econ-hero.js: breadcrumb + h1 with blue highlight + subtitle.
 * 3-stat grid (not 4): 44 years, 50K+ clients, 4 revenue engines.
 * Super D: outline variant, center position, parallax, 0.08 opacity.
 * Stat values use #0369a1 (not green like econ-hero).
 *
 * Source: solutions.html lines 1019-1045
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'ps-hero'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-dot-overlay" aria-hidden="true"></div>
      <div class="${P}-grain" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-breadcrumb">
          <a href="/partner-program/">Partner Program</a>
          <span>/</span>
          <span>Solution Stack</span>
        </div>
        <h1 class="${P}-title">Stop Building Custom Code.<br><span class="${P}-hl">Start Deploying a Modular Arsenal.</span></h1>
        <p class="${P}-subtitle">You\u2019re not just reselling software. You\u2019re deploying a complete Customer Lifecycle Management strategy\u2014land with one product, expand to the full stack, lock in recurring revenue for years.</p>
        <div class="${P}-stats">
          <div class="${P}-stat">
            <div class="${P}-stat-value dw-years">44</div>
            <div class="${P}-stat-label">Years of R&D Investment</div>
          </div>
          <div class="${P}-stat">
            <div class="${P}-stat-value">50K+</div>
            <div class="${P}-stat-label">Manufacturing Clients</div>
          </div>
          <div class="${P}-stat">
            <div class="${P}-stat-value">4</div>
            <div class="${P}-stat-label">Revenue Engines</div>
          </div>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Hero: Solution Stack', html, 'Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PARTNER SOLUTIONS HERO === */
.${P}-section{background:linear-gradient(135deg,#000432 0%,#000864 50%,#001080 100%);padding:140px 24px 100px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.03) 1.5px,transparent 1.5px);background-size:60px 60px;pointer-events:none;z-index:0}
${base.grainCSS(`.${P}-grain`)}
.${P}-grain{position:absolute;inset:0;z-index:1;opacity:0.16}
${superD.css(`${P}-d-bg`, { variant: 'outline', position: 'center', opacity: 0.08 })}
.${P}-dot-overlay{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.03) 1.5px,transparent 1.5px);background-size:60px 60px;pointer-events:none;z-index:1}
.${P}-inner{max-width:900px;margin:0 auto;position:relative;z-index:3}
.${P}-breadcrumb{font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin-bottom:24px}
.${P}-breadcrumb a{color:rgba(255,255,255,0.85);text-decoration:none;transition:color 0.2s}
.${P}-breadcrumb a:hover{color:#00AFF0}
.${P}-breadcrumb span{margin:0 8px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:700;color:#fff;line-height:1.15;margin:0 0 24px;padding:0}
.${P}-hl{color:#00AFF0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:400;color:rgba(255,255,255,0.85);line-height:1.7;max-width:700px;margin:0 0 48px;padding:0}
.${P}-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.1)}
.${P}-stat{text-align:center}
.${P}-stat-value{font-family:'Noto Sans',sans-serif;font-size:48px;font-weight:700;color:#0369a1;line-height:1;margin-bottom:8px}
.${P}-stat-label{font-size:14px;color:rgba(255,255,255,0.75);line-height:1.4}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-section{padding:120px 24px 80px}
  .${P}-stats{grid-template-columns:1fr;gap:24px}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:100px 20px 60px}
  .${P}-stat-value{font-size:36px}
}
${base.reducedMotion(`.${P}-breadcrumb a{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
