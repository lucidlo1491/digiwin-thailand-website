/**
 * automotive-auto-hero.js — Auto Hero Section (S1)
 *
 * Source: automotive.html line 409
 * styles.css: 26 base, 0 hover, 1 pseudo, 0 hidden
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'auth';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="auto-hero">
    <div class="dw-d-bg dw-d-bg--left dw-d-bg--gradient" style="opacity: 0.14;"></div>
            <div class="auto-hero-inner" style="position: relative; z-index: 2;">
                <div class="auto-hero-badge">
                    <span>Automotive Parts Manufacturing</span>
                </div>
                <h1>Built for What <span>OEMs Demand</span></h1>
                <p class="auto-hero-subtitle">JIT delivery. Complete traceability. EDI integration. Thailand is ASEAN's automotive hub—we help tier 1-3 suppliers stay competitive.</p>
                <div class="auto-hero-stats">
                    <div class="auto-hero-stat">
                        <div class="auto-hero-stat-value">500+</div>
                        <div class="auto-hero-stat-label">Auto suppliers served</div>
                    </div>
                    <div class="auto-hero-stat">
                        <div class="auto-hero-stat-value">100%</div>
                        <div class="auto-hero-stat-label">Traceability coverage</div>
                    </div>
                    <div class="auto-hero-stat">
                        <div class="auto-hero-stat-value">99.5%</div>
                        <div class="auto-hero-stat-label">On-time delivery</div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Auto Hero', html, 'Auto Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === AUTO HERO (S1) === */
.auto-hero::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233798E4' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");opacity:0.5}
.auto-hero{background:linear-gradient(135deg, #000432 0%, #000864 50%, #001080 100%);padding:140px 0 100px;position:relative;overflow:hidden}
.auto-hero-inner{max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:1;text-align:center}
.auto-hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0, 175, 240, 0.2);border:1px solid rgba(0, 175, 240, 0.3);padding:8px 20px;border-radius:50px;color:#7EC8F2;font-size:14px;font-weight:500;margin-bottom:24px}
.auto-hero h1{font-family:'Noto Sans', sans-serif;font-size:52px;font-weight:700;color:#fff;margin-bottom:20px;line-height:1.15}
.auto-hero h1 span{color:#00AFF0}
.auto-hero-subtitle{font-family:'Noto Sans', sans-serif;font-size:20px;color:rgba(255,255,255,0.85);max-width:700px;margin:0 auto 50px;line-height:1.6}
.auto-hero-stats{display:flex;justify-content:center;gap:60px}
.auto-hero-stat{text-align:center}
.auto-hero-stat-value{font-family:'Noto Sans', sans-serif;font-size:42px;font-weight:700;color:#00AFF0}
.auto-hero-stat-label{font-size:14px;color:rgba(255,255,255,0.85);margin-top:4px}
/* Divi overrides */
.et_pb_section .auto-hero h1{font-weight:700 !important;line-height:1.15 !important;font-size:52px !important}
.et_pb_section .auto-hero h1 span{color:#00AFF0 !important}
.et_pb_section .auto-hero-badge span{font-size:14px !important;font-weight:500 !important;color:#7EC8F2 !important}
.et_pb_section .auto-hero-subtitle{font-weight:400 !important;font-size:20px !important;line-height:1.6 !important;color:rgba(255,255,255,0.85) !important;padding-bottom:0 !important;max-width:700px !important;margin-bottom:50px !important}
.et_pb_section .auto-hero-stat-value{font-weight:700 !important;font-size:42px !important;line-height:1 !important;color:#00AFF0 !important}
.et_pb_section .auto-hero-stat-label{font-size:14px !important;color:rgba(255,255,255,0.85) !important;margin-top:4px !important;padding-bottom:0 !important}
.et_pb_section .auto-hero-inner p{padding-bottom:0 !important}
@media (max-width:1024px){.auto-hero h1{font-size:40px}.auto-hero-stats{gap:40px}}
@media (max-width:640px){.auto-hero{padding:120px 0 80px}.auto-hero h1{font-size:32px}.auto-hero-subtitle{font-size:17px}.auto-hero-stats{flex-direction:column;gap:24px}.auto-hero-stat-value{font-size:36px}}
/* Defensive SVG sizing */
svg:not([width]):not([class]){max-width:48px;max-height:48px}
${base.reducedMotion('')}
/* Super D decoration */
${superD.css('dw-d-bg', { variant: 'gradient', position: 'left' })}
`.trim();
}

module.exports = { blocks, css };
