/**
 * metal-plastics-metal-hero.js — Metal Hero Section (S1)
 *
 * Source: metal-plastics.html line 409
 * Original classes: metal-hero, dw-d-bg, dw-d-bg--bottom, dw-d-bg--particle, metal-hero-inner (+6 more)
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'metal-hero'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="dw-d-bg dw-d-bg--bottom dw-d-bg--particle" style="opacity: 0.15; min-height: 30vh; bottom: -10%;"></div>
            <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-badge">
                    <span>Metal & Plastics Processing</span>
                </div>
                <h1>Optimize Yield. <span>Minimize Scrap.</span></h1>
                <p class="${P}-subtitle">Stamping, injection molding, die casting, CNC machining. Process manufacturing where cycle time and yield drive your margins.</p>
                <div class="${P}-stats">
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">+15%</div>
                        <div class="${P}-stat-label">Average yield improvement</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">-30%</div>
                        <div class="${P}-stat-label">Unplanned downtime</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">100%</div>
                        <div class="${P}-stat-label">Cycle time visibility</div>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Metal Hero', html, 'Metal Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === METAL HERO (S1) === */
/* Divi generates .et_pb_section_0{background:transparent!important;padding:0!important} — must beat it */
.et-l--body .et_pb_section:has(.${P}-inner){background:linear-gradient(135deg,#000432 0%,#000864 50%,#001080 100%) !important;padding:140px 0 100px !important;position:relative;overflow:hidden}
/* Target .metal-hero-inner (the actual element in HTML), NOT .metal-hero (doesn't exist in Divi) */
.${P}-inner{max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:1;text-align:center;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}
.${P}-inner p{padding-bottom:0;line-height:1.6}
.${P}-inner h1{font-family:'Noto Sans', sans-serif !important;font-size:52px !important;font-weight:700 !important;color:#fff !important;margin:0 0 20px 0 !important;padding:0 !important;line-height:1.15 !important}
.${P}-inner h1 span{color:#00AFF0 !important}
.${P}-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0, 175, 240, 0.2);border:1px solid rgba(0, 175, 240, 0.3);padding:8px 20px;border-radius:50px;color:#7EC8F2;font-size:14px;font-weight:500;margin-bottom:24px}
.${P}-subtitle{font-family:'Noto Sans', sans-serif;font-size:20px !important;color:rgba(255,255,255,0.85) !important;max-width:700px;margin:0 auto 50px;line-height:32px !important;-webkit-font-smoothing:auto !important}
.${P}-stats{display:flex;justify-content:center;gap:60px}
.${P}-stat{text-align:center}
.${P}-stat-value{font-family:'Noto Sans', sans-serif;font-size:42px;font-weight:700;color:rgb(0, 175, 240) !important;line-height:67.2px !important;-webkit-font-smoothing:auto !important}
.${P}-stat-label{font-size:14px;color:rgba(255,255,255,0.85);margin-top:4px !important;line-height:22.4px !important;-webkit-font-smoothing:auto !important}
${superD.css('dw-d-bg', { variant: 'particle', position: 'bottom' })}
@media (max-width:1024px){.${P}-inner h1{font-size:40px !important}.${P}-stats{gap:40px}}
@media (max-width:640px){.${P}-inner h1{font-size:32px !important}.${P}-subtitle{font-size:17px !important}.${P}-stats{flex-direction:column;gap:24px}.${P}-stat-value{font-size:36px}}

${base.reducedMotion('*{animation:none !important;transition:none !important}')}
`.trim();
}

module.exports = { blocks, css };
