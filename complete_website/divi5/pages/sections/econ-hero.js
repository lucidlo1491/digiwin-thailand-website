/**
 * econ-hero.js — Partner Economics Hero Section (S1)
 *
 * Adapted from partner-hero.js: breadcrumb + h1 + subtitle + 4-stat proof grid.
 * No CTA buttons (page starts with proof, not action).
 * Green accent (#15803d values, #4ade80 featured border).
 * Super D: particle variant, bottom position, parallax, 0.16 opacity.
 *
 * Source: economics.html lines 848-880
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'econ-hero'; // CSS prefix

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
          <span>Partner Economics</span>
        </div>
        <h1 class="${P}-title">See the Actual Economics\u2014<span class="${P}-hl">Not a Sales Pitch</span></h1>
        <p class="${P}-subtitle">Realistic numbers in Thai Baht. Conservative scenarios. No hype. Here\u2019s exactly how the partner model works financially\u2014from Year 1 survival to Year 3 asset building.</p>
        <div class="${P}-proof">
          <div class="${P}-proof-item">
            <span class="${P}-proof-value">30-40%</span>
            <span class="${P}-proof-label">License Margin</span>
          </div>
          <div class="${P}-proof-item">
            <span class="${P}-proof-value">100%</span>
            <span class="${P}-proof-label">Service Revenue</span>
          </div>
          <div class="${P}-proof-item">
            <span class="${P}-proof-value">Fixed</span>
            <span class="${P}-proof-label">Predictable MA Cost</span>
          </div>
          <div class="${P}-proof-item">
            <span class="${P}-proof-value">6mo</span>
            <span class="${P}-proof-label">Lead Lock Protection</span>
          </div>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Hero: Partner Economics', html, 'Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PARTNER ECONOMICS HERO === */
.${P}-section{background:linear-gradient(135deg,#000432 0%,#000864 50%,#001080 100%);padding:140px 24px 100px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.03) 1.5px,transparent 1.5px);background-size:60px 60px;pointer-events:none;z-index:0}
${base.grainCSS(`.${P}-grain`)}
.${P}-grain{position:absolute;inset:0;z-index:1;opacity:0.16}
${superD.css(`${P}-d-bg`, { variant: 'particle', position: 'bottom', opacity: 0.16 })}
.${P}-dot-overlay{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.03) 1.5px,transparent 1.5px);background-size:60px 60px;pointer-events:none;z-index:1}
.${P}-inner{max-width:900px;margin:0 auto;position:relative;z-index:3}
.${P}-breadcrumb{font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin-bottom:24px}
.${P}-breadcrumb a{color:rgba(255,255,255,0.85);text-decoration:none;transition:color 0.2s}
.${P}-breadcrumb a:hover{color:#00AFF0}
.${P}-breadcrumb span{margin:0 8px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:700;color:#fff;line-height:1.15;margin:0 0 24px;padding:0}
.${P}-hl{color:#4ade80}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:400;color:rgba(255,255,255,0.85);line-height:1.7;max-width:700px;margin:0 0 48px;padding:0}
.${P}-proof{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.1)}
.${P}-proof-item{text-align:center}
.${P}-proof-value{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:700;color:#15803d;display:block;margin-bottom:8px}
.${P}-proof-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.5px}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-section{padding:120px 24px 80px}
  .${P}-proof{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:100px 20px 60px}
  .${P}-proof{grid-template-columns:1fr 1fr;gap:16px}
  .${P}-proof-value{font-size:24px}
}
${base.reducedMotion(`.${P}-breadcrumb a{transition:none !important}`)}
.et_pb_section .econ-hero-proof-label {
            line-height: 19.2px !important;
        }

.et_pb_section .econ-hero-proof-value {
            line-height: 51.2px !important;
        }
`.trim();
}

module.exports = { blocks, css };
