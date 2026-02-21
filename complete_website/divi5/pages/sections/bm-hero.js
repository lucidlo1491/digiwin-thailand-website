/**
 * bm-hero.js — Business Model Crisis Hero Section (S1)
 *
 * Simple narrative hero: breadcrumb + h1 + subtitle.
 * No stats bar (intentional — narrative page per ContentSpec).
 * Super D: gradient falling from top (dw-d-parallax), opacity 0.14.
 *
 * Source: business-model.html lines 747-759
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'bm-hero'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-dot-overlay" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-breadcrumb">
          <a href="/partner-program.html">Partner Program</a>
          <span>/</span>
          <span>Business Model Crisis</span>
        </div>
        <h1 class="${P}-title">The Problem Isn\u2019t Your Team\u2014It\u2019s Your Business Model</h1>
        <p class="${P}-subtitle">You\u2019re tired of Monday Morning Escalations and watching senior consultants act as data babysitters. The Man-Day Trap is capping your growth. You deliver Tier-1 capabilities at Tier-3 prices. This page names the problem\u2014so you can escape it.</p>
      </div>
    </div>`;

  return base.wrapInDiviSection('Hero: Business Model Crisis', html, 'Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === BUSINESS MODEL HERO (S1) === */
.${P}-section{background:linear-gradient(135deg,#000432 0%,#000864 50%,#001080 100%);padding:140px 24px 100px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-d-bg{position:absolute;right:-10%;top:-20%;width:60%;min-height:60vh;background:url("data:image/svg+xml;base64,${superD.getSvgBase64('gradient')}") no-repeat center top;background-size:contain;opacity:0.14;pointer-events:none;z-index:0}
.${P}-dot-overlay{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.03) 1.5px,transparent 1.5px);background-size:60px 60px;pointer-events:none;z-index:1}
.${P}-inner{max-width:900px;margin:0 auto;position:relative;z-index:2}
.${P}-breadcrumb{font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin-bottom:24px}
.${P}-breadcrumb a{color:rgba(255,255,255,0.85);text-decoration:none;transition:color 0.2s}
.${P}-breadcrumb a:hover{color:#00AFF0}
.${P}-breadcrumb span{margin:0 8px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:700;color:#fff;line-height:1.15;margin:0 0 24px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:400;color:rgba(255,255,255,0.85);line-height:1.7;max-width:700px;margin:0;padding:0}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:120px 20px 80px}
  .${P}-title{font-size:32px}
}`.trim();
}

module.exports = { blocks, css };
