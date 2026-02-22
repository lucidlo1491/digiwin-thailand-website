/**
 * products-cta.js — CTA Section (S5)
 *
 * Blue gradient background, Super D particle bottom-rise,
 * glow, dual buttons (white + outline-white).
 *
 * Source: products.html line 1123
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'prod-cta'; // CSS prefix
const SUPER_D_CLASS = `${P}-super-d`;

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      ${superD.html(SUPER_D_CLASS)}
      <div class="${P}-glow" aria-hidden="true"></div>
      <div class="${P}-cross" aria-hidden="true"></div>
      <div class="${P}-inner">
        <h2 class="${P}-title">Not Sure Where to Start?</h2>
        <p class="${P}-subtitle">Tell us about your factory and we\u2019ll recommend the right solution for your needs. No obligation, no pressure\u2014just clarity.</p>
        <div class="${P}-buttons">
          <a href="/contact/" class="${P}-btn-primary">Let\u2019s Talk</a>
          <a href="/industries/" class="${P}-btn-ghost">View by Industry</a>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('CTA', html, 'CTA: Content', {
    superDClass: SUPER_D_CLASS,
  });
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === CTA (S5) === */
.${P}-section{padding:140px 0;background:linear-gradient(135deg,#00AFF0 0%,#003CC8 50%,#003CC8 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}

/* Cross pattern overlay */
.${P}-cross{position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none;z-index:1}

/* Grain texture */
${base.grainCSS(`.${P}-section`)}

/* Super D decoration */
${superD.css(SUPER_D_CLASS, { variant: 'particle', position: 'corner-br', opacity: 0.18 })}

/* Glow effect */
.${P}-glow{position:absolute;bottom:-50%;right:-20%;width:80%;height:150%;background:radial-gradient(ellipse at center,rgba(255,255,255,0.12) 0%,transparent 60%);pointer-events:none;z-index:1}

/* Content */
.${P}-inner{max-width:800px;margin:0 auto;padding:0 24px;text-align:center;position:relative;z-index:3}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(36px,4.5vw,52px);font-weight:700;color:#ffffff;margin:0 0 20px 0;line-height:1.15;letter-spacing:-0.02em;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:20px;color:rgba(255,255,255,0.9);margin:0 0 48px 0;line-height:1.6;padding:0}

/* Buttons */
.${P}-buttons{display:flex;gap:20px;justify-content:center;flex-wrap:wrap}
.${P}-btn-primary{background:#ffffff;color:#003CC8;padding:20px 40px;border-radius:14px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;text-decoration:none;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);box-shadow:0 4px 20px rgba(0,0,0,0.15);display:inline-flex;align-items:center;gap:10px}
.${P}-btn-primary:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.2)}
.${P}-btn-ghost{background:transparent;color:#ffffff;padding:20px 40px;border-radius:14px;border:2px solid rgba(255,255,255,0.5);font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;text-decoration:none;transition:all 0.3s ease}
.${P}-btn-ghost:hover{background:rgba(255,255,255,0.15);border-color:#ffffff}

/* Focus-visible */
.${P}-btn-primary:focus-visible,.${P}-btn-ghost:focus-visible{outline:3px solid #00AFF0;outline-offset:3px}

/* === RESPONSIVE === */
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:100px 20px}
  .${P}-title{font-size:28px}
  .${P}-buttons{flex-direction:column}
  .${P}-btn-primary,.${P}-btn-ghost{width:100%;text-align:center;justify-content:center}
}
${base.reducedMotion(`
.${P}-glow,.${P}-btn-primary,.${P}-btn-ghost{animation:none !important;transition:none !important}
`)}`.trim();
}

module.exports = { blocks, css };
