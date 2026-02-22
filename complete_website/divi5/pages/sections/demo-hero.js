/**
 * demo-hero.js — Hero Section (S1) — Contact page
 *
 * Navy gradient background with trust stats.
 * Super D decoration via Base64 (replaces dw-d-bg CSS class).
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="demo-hero">
    ${superD.html('demo-super-d')}
    <div class="demo-hero-inner">
      <h1>Let's Talk About <span>Your Factory</span></h1>
      <p class="demo-hero-subtitle">Whether you're a factory owner seeking solutions or a distributor exploring partnership—we'll listen first, then show you what's relevant.</p>
      <div class="demo-trust">
        <div class="demo-trust-item">
          <span class="demo-trust-value dw-years">44</span>
          <span class="demo-trust-label">Years Experience</span>
        </div>
        <div class="demo-trust-item">
          <span class="demo-trust-value">50K+</span>
          <span class="demo-trust-label">Factories</span>
        </div>
        <div class="demo-trust-item">
          <span class="demo-trust-value">100+</span>
          <span class="demo-trust-label">Thai Customers</span>
        </div>
        <div class="demo-trust-item">
          <span class="demo-trust-value">300378</span>
          <span class="demo-trust-label">Stock Listed</span>
        </div>
      </div>
    </div>    </div>`;

  return base.wrapInDiviSection('Hero', html, 'Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === HERO (S1) === */
.demo-hero{background:linear-gradient(135deg,#000432 0%,#000864 50%,#001080 100%);padding:140px 24px 80px;position:relative;overflow:hidden;${base.fontSmoothingReset()}font-size:16px}
.demo-hero::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none}
${superD.css('demo-super-d', { variant: 'outline', position: 'left', opacity: 0.08 })}
.demo-hero-inner{max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:1}
.demo-hero h1{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,5vw,48px);font-weight:700;color:#fff;margin-bottom:20px;line-height:1.3}
.demo-hero h1 span{color:#00AFF0}
.demo-hero-subtitle{font-size:18px;color:rgba(255,255,255,0.85);line-height:1.7;margin-bottom:40px}
.demo-trust{display:flex;justify-content:center;gap:32px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1)}
.demo-trust-item{text-align:center}
.demo-trust-value{font-family:'Noto Sans',sans-serif;font-size:24px;font-weight:700;color:#00AFF0;display:block}
.demo-trust-label{font-size:12px;color:rgba(255,255,255,0.75)}
@media(max-width:1024px){.demo-trust{flex-wrap:wrap;gap:24px}}
@media(max-width:640px){.demo-hero{padding:120px 20px 60px}}
${base.reducedMotion(`.demo-super-d,.demo-hero::before{animation:none !important;transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
