/**
 * bm-cta.js — Final CTA Section (S8)
 *
 * Blue gradient CTA bridging to Economics and Solutions pages.
 * Super D left-anchor (outline variant, left:-15%, 60% width).
 * NOTE: CTAs link to other Partner pages, NOT to contact form (per ContentSpec).
 * NOTE: Wave-flow is display:none in HTML ref — omitted here.
 *
 * Source: business-model.html lines 1068-1081
 * CSS ref: styles.css lines 6254-6294
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'bm-cta'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
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
.${P}-section{background:linear-gradient(135deg,#00AFF0 0%,#003CC8 50%,#001080 100%);padding:100px 24px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-d-bg{position:absolute;left:-15%;right:auto;top:50%;width:60%;min-height:60vh;background:url("data:image/svg+xml;base64,${superD.getSvgBase64('outline')}") no-repeat center left;background-size:contain;transform:translateY(-50%);opacity:0.10;pointer-events:none;z-index:0}
.${P}-dot-overlay{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none;z-index:1}
.${P}-inner{max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:3}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#fff;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:rgba(255,255,255,0.9);line-height:1.6;max-width:600px;margin:0 auto 40px;padding:0}
${base.buttonLightCSS(P)}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-btn-row{flex-direction:column;align-items:center}
}
${base.reducedMotion(`.${P}-btn{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
