/**
 * event-register.js — Registration CTA Section (S8)
 *
 * Dark gradient with grain, centered registration CTA.
 * ContentSpec: Section 8 — Urgency recap + simple action
 *
 * Note: Registration links to /contact/ (no in-page form in Divi 5 —
 * marketing team can add Contact Form 7 or Divi form module later).
 */

const base = require('../../lib/templates/_base');

const P = 'evt-reg';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
<div class="${P}-section">
  <h2>Secure Your Spot</h2>
  <p class="${P}-meta">Saturday, March 15, 2026 &middot; Bangkok &middot; Limited to 30 participants</p>
  <a href="/contact/" class="${P}-cta">
    Register Now
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  </a>
  <p class="${P}-secondary">Can't make this date? <a href="/contact/">Register your interest</a> and we'll notify you of the next session.</p>
</div>
  `;

  return base.wrapInDiviSection('Registration CTA', html, 'Registration: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === REGISTRATION CTA (S8) === */
.${P}-section{background:linear-gradient(165deg,#0f1419 0%,#1a2632 40%,#000864 100%);padding:80px 24px;text-align:center;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1}
.${P}-section>*{position:relative;z-index:2}
.${P}-section h2{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#fff;margin:0 0 16px;padding:0}
.${P}-meta{font-family:'Noto Sans',sans-serif;font-size:18px;color:rgba(255,255,255,0.85);margin:0 0 32px;padding:0}
.${P}-cta{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#fff;background:#15803d;padding:20px 48px;border-radius:12px;text-decoration:none;transition:all 0.3s ease;box-shadow:0 4px 20px rgba(21,128,61,0.4)}
.${P}-cta:hover{background:#16a34a;transform:translateY(-2px);box-shadow:0 8px 24px rgba(34,197,94,0.3)}
.${P}-secondary{font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.6);margin-top:24px;padding:0}
.${P}-secondary a{color:rgba(255,255,255,0.8);text-decoration:underline;transition:color 0.3s ease}
.${P}-secondary a:hover{color:#fff}

.et_pb_section .${P}-section h2{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-cta{-webkit-font-smoothing:auto !important;line-height:28.8px !important}
.et_pb_section .${P}-meta,.et_pb_section .${P}-secondary{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}

@media(max-width:768px){
  .${P}-section h2{font-size:32px}
  .${P}-cta{width:100%;justify-content:center;padding:16px 32px;font-size:16px}
}
${base.reducedMotion(`.${P}-section *{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
