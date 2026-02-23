/**
 * econ-cta.js — Partner Economics CTA Section (S5)
 *
 * Adapted from bm-cta.js: different text/links.
 * Super D: gradient variant, bold presence + glow, 0.18 opacity.
 * Wave-flow: 160px height, 0.30 opacity.
 * Buttons: "Let's Talk" + "Back to Partner Overview"
 *
 * Source: economics.html lines 1276-1288
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'ec-cta'; // CSS prefix

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
        <h2 class="${P}-title">Ready to Run the Numbers for Your Firm?</h2>
        <p class="${P}-subtitle">Let\u2019s discuss your territory, your targets, and build a 3-year projection specific to your business. No obligation\u2014just spreadsheet reality.</p>
        <div class="${P}-btn-row">
          <a href="/contact/" class="${P}-btn ${P}-btn--primary">Let\u2019s Talk</a>
          <a href="/partner-program/" class="${P}-btn ${P}-btn--ghost">Back to Partner Overview</a>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('CTA: Run the Numbers', html, 'CTA: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === ECONOMICS CTA (S5) === */
.${P}-section{background:linear-gradient(135deg,#00AFF0 0%,#003CC8 50%,#001080 100%);padding:100px 24px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
${superD.css(`${P}-d-bg`, { variant: 'outline', position: 'right', modifiers: ['bold', 'glow'] })}
.${P}-wave{position:absolute;bottom:0;left:0;right:0;height:160px;opacity:0.30;background:linear-gradient(180deg,transparent 0%,rgba(0,8,100,0.3) 100%);pointer-events:none;z-index:1}
.${P}-dot-overlay{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none;z-index:1}
.${P}-inner{max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:3}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#fff;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:rgba(255,255,255,0.9);line-height:1.6;max-width:600px;margin:0 auto 40px;padding:0}
${base.buttonLightCSS(P)}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-title{font-size:32px}
  .${P}-btn-row{flex-direction:column;align-items:center}
}
${base.reducedMotion(`.${P}-btn{transition:none !important}`)}
/* Divi overrides for CTA buttons */
.et_pb_section .${P}-btn--ghost{color:#fff !important}
`.trim();
}

module.exports = { blocks, css };
