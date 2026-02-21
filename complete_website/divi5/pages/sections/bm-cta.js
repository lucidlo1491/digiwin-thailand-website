/**
 * bm-cta.js — Final CTA Section (S8)
 *
 * Blue gradient CTA bridging to Economics and Solutions pages.
 * Super D left-anchor + wave flow decoration.
 * NOTE: CTAs link to other Partner pages, NOT to contact form (per ContentSpec).
 *
 * Source: business-model.html lines 1068-1081
 */

const base = require('../../lib/templates/_base');

const P = 'bm-cta'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-wave" aria-hidden="true"></div>
      <div class="${P}-dot-overlay" aria-hidden="true"></div>
      <div class="${P}-inner">
        <h2 class="${P}-title">See How the Economics Actually Work</h2>
        <p class="${P}-subtitle">You\u2019ve seen the problem. Now see the math of the solution\u2014what you keep, what compounds, and why 100% of service fees stay with you.</p>
        <div class="${P}-btn-row">
          <a href="/partner-program/economics.html" class="${P}-btn ${P}-btn--primary">See Partner Economics</a>
          <a href="/partner-program/solutions.html" class="${P}-btn ${P}-btn--ghost">Evaluate the Weapon First</a>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('CTA: See the Economics', html, 'CTA: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === FINAL CTA (S8) === */
.${P}-section{background:linear-gradient(135deg,#00AFF0 0%,#2d7bc4 50%,#1e5a8a 100%);padding:100px 24px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-d-bg{position:absolute;top:0;left:0;width:500px;height:100%;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100c55.2 0 100-44.8 100-100V0H100z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E");background-size:contain;background-repeat:no-repeat;background-position:center left;pointer-events:none;z-index:0;opacity:0.10}
.${P}-wave{position:absolute;bottom:0;left:0;right:0;height:160px;background:linear-gradient(180deg,transparent,rgba(255,255,255,0.08));pointer-events:none;z-index:1;opacity:0.3}
.${P}-dot-overlay{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:20px 20px;pointer-events:none;z-index:1}
.${P}-inner{max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:3}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,4vw,44px);font-weight:700;color:#fff;line-height:1.15;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:rgba(255,255,255,0.9);line-height:1.6;max-width:600px;margin:0 auto 40px;padding:0}
${base.buttonLightCSS(P)}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-btn-row{flex-direction:column;align-items:center}
}
${base.reducedMotion(`.${P}-btn{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
