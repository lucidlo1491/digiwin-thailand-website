/**
 * home-final-cta.js — Final CTA Banner Section Builder
 *
 * ContentSpec §3.10 — "Let's Start a Conversation"
 * Bright gradient background, cross pattern, two CTAs.
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const cssLib = require('../../lib/css-assembler');

function blocks() {
  const html = `
    <div class="cta-section">
    <div class="cta-container">
      <h2 class="cta-title">Let\u2019s Start a Conversation</h2>
      <p class="cta-subtitle">We\u2019re eager to understand your challenges and explore how we can help. No pressure, no sales pitch\u2014just a genuine conversation about your manufacturing operations.</p>
      <div class="cta-btn-row">
        <a href="/demo.html" class="cta-btn cta-btn--primary">Let\u2019s Talk</a>
        <a href="/partner-program.html" class="cta-btn cta-btn--ghost">Explore Partnership</a>
      </div>
    </div>
    </div>
  `;

  return [
    sectionOpen({ adminLabel: "Final CTA: Let's Start a Conversation", css: 'selector{background:transparent !important;padding:0 !important;}' }),
    rowOpen(),
    columnOpen(),
    codeModule(html, 'Final CTA: Title + 2 Buttons'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css() {
  return `
/* === FINAL CTA BANNER === */
.cta-section{background:linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #003CC8 100%);padding:120px 40px;position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='%23fff' stroke-width='0.5' opacity='0.05'/%3E%3C/svg%3E");pointer-events:none;z-index:1}
.cta-section::after{content:'';position:absolute;bottom:-20%;right:-10%;width:80%;height:80%;background:radial-gradient(ellipse at center,rgba(255,255,255,0.1) 0%,transparent 70%);pointer-events:none;z-index:1}
.cta-container{position:relative;z-index:2;max-width:800px;margin:0 auto;text-align:center}
.cta-title{font-family:'Noto Sans',sans-serif;font-weight:700;font-size:clamp(36px,4.5vw,52px);color:#fff;letter-spacing:-0.02em;line-height:1.15;margin:0 0 24px}
.cta-subtitle{font-family:'Noto Sans',sans-serif;font-size:20px;color:rgba(255,255,255,0.9);line-height:1.65;margin:0 0 48px;max-width:720px;margin-left:auto;margin-right:auto}
${cssLib.buttonLightCSS('cta')}
.cta-btn--ghost{padding:16px 40px;border-radius:14px}
@media(max-width:767px){.cta-title{font-size:clamp(28px,8vw,36px);margin-bottom:20px}.cta-subtitle{font-size:16px;margin-bottom:36px}.cta-btn-row{flex-direction:column;align-items:stretch;gap:16px}.cta-btn{width:100%;max-width:300px;margin:0 auto;text-align:center}}
@media(prefers-reduced-motion:reduce){.cta-btn{transition:none !important}.cta-btn::before{display:none}}`;
}

module.exports = { blocks, css };
