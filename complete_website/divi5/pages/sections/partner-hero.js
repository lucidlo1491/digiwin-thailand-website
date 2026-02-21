/**
 * partner-hero.js — Partner Program Hero Section (S1)
 *
 * Custom builder: badge + h1 + subtitle + dual CTA + 4-col stats + dual Super D.
 * Does NOT use hero-gradient template (badge slot + 4-col stats diverge too much).
 *
 * Source: partner-program.html lines 991-1075
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'pp-hero'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// HERO BACKGROUND SVG (stacking layers + grid + nodes)
// ════════════════════════════════════════════════════════════════
function getHeroSVG() {
  return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`
    + '<defs><linearGradient id="pp-bar-fade" x1="0%" y1="0%" x2="100%" y2="0%">'
    + '<stop offset="0%" stop-color="#00AFF0" stop-opacity="0.15"/>'
    + '<stop offset="100%" stop-color="#00AFF0" stop-opacity="0"/>'
    + '</linearGradient></defs>'
    // Stacking layers (compounding value)
    + '<g transform="translate(850,200)" opacity="0.12">'
    + '<rect x="0" y="280" width="280" height="40" rx="6" fill="#00AFF0"/>'
    + '<rect x="0" y="230" width="280" height="40" rx="6" fill="#00AFF0"/>'
    + '<rect x="0" y="180" width="280" height="40" rx="6" fill="#00AFF0"/>'
    + '<rect x="0" y="130" width="280" height="40" rx="6" fill="#00AFF0"/>'
    + '<rect x="0" y="80" width="280" height="40" rx="6" fill="#00AFF0"/>'
    + '<path d="M320 300 L320 60" stroke="#00AFF0" stroke-width="3" opacity="0.6"/>'
    + '<path d="M310 80 L320 55 L330 80" fill="none" stroke="#00AFF0" stroke-width="3" opacity="0.6"/>'
    + '</g>'
    // Subtle grid
    + '<g opacity="0.04">'
    + '<line x1="0" y1="150" x2="1200" y2="150" stroke="#fff" stroke-width="1"/>'
    + '<line x1="0" y1="300" x2="1200" y2="300" stroke="#fff" stroke-width="1"/>'
    + '<line x1="0" y1="450" x2="1200" y2="450" stroke="#fff" stroke-width="1"/>'
    + '<line x1="0" y1="600" x2="1200" y2="600" stroke="#fff" stroke-width="1"/>'
    + '<line x1="300" y1="0" x2="300" y2="700" stroke="#fff" stroke-width="1"/>'
    + '<line x1="600" y1="0" x2="600" y2="700" stroke="#fff" stroke-width="1"/>'
    + '<line x1="900" y1="0" x2="900" y2="700" stroke="#fff" stroke-width="1"/>'
    + '</g>'
    // Connection nodes
    + '<g opacity="0.08">'
    + '<circle cx="950" cy="150" r="8" fill="#00AFF0"/>'
    + '<circle cx="1050" cy="200" r="6" fill="#00AFF0"/>'
    + '<circle cx="1000" cy="350" r="10" fill="#00AFF0"/>'
    + '<circle cx="1100" cy="450" r="5" fill="#00AFF0"/>'
    + '<line x1="950" y1="150" x2="1050" y2="200" stroke="#00AFF0" stroke-width="1"/>'
    + '<line x1="1050" y1="200" x2="1000" y2="350" stroke="#00AFF0" stroke-width="1"/>'
    + '<line x1="1000" y1="350" x2="1100" y2="450" stroke="#00AFF0" stroke-width="1"/>'
    + '</g></svg>';
}

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const svgInjectScript = `<script>(function(){var c=document.querySelector('.${P}-bg');if(c){c.innerHTML='${getHeroSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const html = `
    <div class="${P}-section">
      ${superD.html(`${P}-deco-left`)}
      ${superD.html(`${P}-deco-right`)}
      <div class="${P}-bg" aria-hidden="true"></div>
      <div class="${P}-grain" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>
          For ERP Implementers &amp; IT Consultants
        </div>
        <h1 class="${P}-title">Tired of Selling <span class="${P}-hl">Man-Days?</span><br>The Problem Isn\u2019t Your Team.</h1>
        <p class="${P}-subtitle">You\u2019re fighting customization wars that burn out your best consultants and compress your margins every year. The problem isn\u2019t execution \u2014 it\u2019s your business model. We offer a different architecture.</p>
        <div class="${P}-ctas">
          <a href="/demo.html" class="${P}-btn ${P}-btn--primary">Let\u2019s Talk Partnership</a>
          <a href="/partner-program/economics.html" class="${P}-btn ${P}-btn--ghost">See the Math First</a>
        </div>
        <div class="${P}-stats">
          <div class="${P}-stat">
            <div class="${P}-stat-value">100%</div>
            <div class="${P}-stat-label">Service Fees You Keep</div>
          </div>
          <div class="${P}-stat">
            <div class="${P}-stat-value">30\u201340%</div>
            <div class="${P}-stat-label">License Margin</div>
          </div>
          <div class="${P}-stat">
            <div class="${P}-stat-value">Recurring</div>
            <div class="${P}-stat-label">Annual Maintenance Revenue</div>
          </div>
          <div class="${P}-stat">
            <div class="${P}-stat-value">6 mo</div>
            <div class="${P}-stat-label">Lead Lock Protection</div>
          </div>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Hero: Partner Program', html + svgInjectScript, 'Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PARTNER HERO === */
.${P}-section{background:linear-gradient(135deg,#000432 0%,#000864 50%,#001080 100%);padding:140px 24px 100px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none;z-index:0}
${base.grainCSS(`.${P}-grain`)}
.${P}-grain{position:absolute;inset:0;z-index:1}
.${P}-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.${P}-bg svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;max-width:1400px;height:auto;min-height:100%}
${superD.css(`${P}-deco-left`, { variant: 'outline', position: 'left', opacity: 0.14, width: '60%', minHeight: '60vh' })}
${superD.css(`${P}-deco-right`, { variant: 'outline', position: 'right', opacity: 0.10, width: '60%', minHeight: '60vh' })}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:3}
.${P}-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,175,240,0.2);border:1px solid rgba(0,175,240,0.3);padding:8px 16px;border-radius:50px;font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:400;color:#7EC8F2;margin-bottom:24px}
.${P}-badge svg{stroke:#7EC8F2;flex-shrink:0}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(36px,5vw,56px);font-weight:700;color:#fff;line-height:1.15;margin:0 0 24px;max-width:800px;padding:0}
.${P}-hl{color:#00AFF0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:400;color:rgba(255,255,255,0.85);line-height:1.7;max-width:680px;margin:0 0 40px;padding:0}
.${P}-ctas{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:60px;position:relative;z-index:2}
.${P}-btn{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;padding:16px 32px;border-radius:8px;text-decoration:none;transition:all 0.3s ease;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;line-height:1.6}
.${P}-btn--primary{background:#006dac;color:#fff;box-shadow:0 4px 14px rgba(0,175,240,0.35)}
.${P}-btn--primary:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45)}
.${P}-btn--ghost{background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.5);color:#fff;font-size:15px;border-radius:12px}
.${P}-btn--ghost:hover{background:rgba(255,255,255,0.2);border-color:#fff;transform:translateY(-2px)}
.${P}-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.1)}
.${P}-stat{text-align:center}
.${P}-stat-value{font-family:'Noto Sans',sans-serif;font-size:42px;font-weight:700;color:#fff;line-height:1;margin-bottom:8px}
.${P}-stat-label{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:400;color:rgba(255,255,255,0.75);line-height:1.4}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-section{padding:120px 24px 80px}
  .${P}-stats{grid-template-columns:repeat(2,1fr);gap:24px}
  .${P}-bg svg{opacity:0.7;transform:translate(-50%,-50%) scale(1.2)}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:100px 20px 60px}
  .${P}-stats{grid-template-columns:1fr}
  .${P}-ctas{flex-direction:column;align-items:stretch}
  .${P}-btn{text-align:center;justify-content:center}
  .${P}-bg svg{opacity:0.5;transform:translate(-40%,-50%) scale(1.5)}
}
${base.reducedMotion(`.${P}-btn{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
