/**
 * products-hero.js — Products Hub Hero Section (S1)
 *
 * Dark gradient hero with SVG ecosystem illustration, badge, H1 with
 * blue highlight, subtitle with dynamic dw-years, 4-stat row, animated
 * stack visual (4 floating product layers + data particles), and
 * "Let's Talk" CTA button.
 *
 * Super D: gradient variant, left position, 0.10 opacity.
 * Grain overlay via grainCSS helper.
 *
 * Source: products.html line 360
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'prod-hero'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-grain" aria-hidden="true"></div>

      <div class="${P}-ecosystem">
        <svg aria-hidden="true" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="${P}-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,175,240,0.06)" stroke-width="0.5"/>
            </pattern>
            <filter id="${P}-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="url(#${P}-grid)"/>

          <g opacity="0.15">
            <path d="M100 600 L100 400 L180 400 L180 350 L260 350 L260 300 L340 300 L340 350 L420 350 L420 400 L500 400 L500 600" fill="none" stroke="#00AFF0" stroke-width="1.5"/>
            <rect x="130" y="450" width="60" height="100" fill="none" stroke="#00AFF0" stroke-width="1" rx="4"/>
            <rect x="230" y="420" width="80" height="130" fill="none" stroke="#00AFF0" stroke-width="1" rx="4"/>
            <rect x="350" y="460" width="50" height="90" fill="none" stroke="#00AFF0" stroke-width="1" rx="4"/>
          </g>

          <g class="${P}-data-streams">
            <path d="M0 300 Q200 250 400 300 T800 280 T1200 310 T1400 290" fill="none" stroke="rgba(0,175,240,0.15)" stroke-width="1.5" stroke-dasharray="8 4">
              <animate attributeName="stroke-dashoffset" values="0;-24" dur="2s" repeatCount="indefinite"/>
            </path>
            <path d="M0 450 Q300 400 600 450 T1000 420 T1400 440" fill="none" stroke="rgba(0,175,240,0.1)" stroke-width="1" stroke-dasharray="6 3">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 550 Q400 500 800 550 T1400 530" fill="none" stroke="rgba(139,92,246,0.08)" stroke-width="1" stroke-dasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="0;-16" dur="2.5s" repeatCount="indefinite"/>
            </path>
          </g>

          <g filter="url(#${P}-glow)">
            <circle cx="150" cy="200" r="4" fill="#00AFF0" opacity="0.6">
              <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="350" cy="350" r="5" fill="#10b981" opacity="0.5">
              <animate attributeName="cy" values="350;330;350" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="250" cy="500" r="3" fill="#f59e0b" opacity="0.4">
              <animate attributeName="cy" values="500;480;500" dur="3.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1250" cy="180" r="4" fill="#00AFF0" opacity="0.5">
              <animate attributeName="cy" values="180;160;180" dur="4.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1150" cy="400" r="6" fill="#8b5cf6" opacity="0.4">
              <animate attributeName="cy" values="400;380;400" dur="5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1300" cy="550" r="3" fill="#10b981" opacity="0.5">
              <animate attributeName="cy" values="550;530;550" dur="3s" repeatCount="indefinite"/>
            </circle>
          </g>

          <g transform="translate(1050, 120)" opacity="0.12">
            <rect x="0" y="0" width="200" height="150" fill="none" stroke="#00AFF0" stroke-width="1" rx="8"/>
            <line x1="20" y1="30" x2="180" y2="30" stroke="#00AFF0" stroke-width="1"/>
            <line x1="20" y1="60" x2="140" y2="60" stroke="#00AFF0" stroke-width="1"/>
            <line x1="20" y1="90" x2="180" y2="90" stroke="#00AFF0" stroke-width="1"/>
            <line x1="20" y1="120" x2="160" y2="120" stroke="#00AFF0" stroke-width="1"/>
            <circle cx="50" cy="30" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="100" cy="60" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="150" cy="90" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
            </circle>
            <circle cx="80" cy="120" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.5s"/>
            </circle>
          </g>

          <g transform="translate(50, 620)" opacity="0.1">
            <line x1="0" y1="0" x2="400" y2="0" stroke="#00AFF0" stroke-width="2"/>
            <rect x="50" y="-30" width="40" height="25" fill="#00AFF0" rx="3"/>
            <rect x="130" y="-35" width="45" height="30" fill="#00AFF0" rx="3"/>
            <rect x="220" y="-28" width="35" height="23" fill="#00AFF0" rx="3"/>
            <rect x="310" y="-32" width="50" height="27" fill="#00AFF0" rx="3"/>
          </g>
        </svg>
      </div>

      <div class="${P}-inner">
        <div class="${P}-content">
          <div class="${P}-badge">Complete Manufacturing Intelligence Stack</div>
          <h1 class="${P}-title">Manufacturing Software by <span class="${P}-hl">Manufacturing Experts</span></h1>
          <p class="${P}-subtitle">From ERP to shop floor, one integrated ecosystem designed by manufacturers, for manufacturers. <span class="dw-years">44</span> years of focus on one industry means we understand your factory.</p>

          <div class="${P}-btn-wrap">
            <a href="/contact/" class="${P}-cta">Let\u2019s Talk</a>
          </div>

          <div class="${P}-stats">
            <div class="${P}-stat">
              <div class="${P}-stat-number dw-years">44</div>
              <div class="${P}-stat-label">Years Focus</div>
            </div>
            <div class="${P}-stat">
              <div class="${P}-stat-number">50K+</div>
              <div class="${P}-stat-label">Factories</div>
            </div>
            <div class="${P}-stat">
              <div class="${P}-stat-number">100+</div>
              <div class="${P}-stat-label">Thai Implementations</div>
            </div>
            <div class="${P}-stat">
              <div class="${P}-stat-number">4</div>
              <div class="${P}-stat-label">Core Products</div>
            </div>
          </div>
        </div>

        <div class="${P}-stack-visual">
          <div class="${P}-stack-container">
            <div class="${P}-particles">
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
            </div>

            <div class="${P}-layer ${P}-layer--aiot">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </span>
              AIoT Platform
            </div>

            <div class="${P}-layer ${P}-layer--mes">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M6 8v8M10 8v8M14 8v8M18 8v8"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
              </span>
              MES Shop Floor
            </div>

            <div class="${P}-layer ${P}-layer--wms">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </span>
              WMS Warehouse
            </div>

            <div class="${P}-layer ${P}-layer--erp">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
                  <rect x="11" y="12" width="8" height="3" rx="1"/>
                  <rect x="11" y="17" width="5" height="2" rx="0.5"/>
                </svg>
              </span>
              ERP Foundation
            </div>
          </div>
        </div>
      </div>

      <script>(function(){var y=new Date().getFullYear();document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y-1982})})();</script>
    </div>`;

  return base.wrapInDiviSection('Hero', html, 'Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PRODUCTS HERO (S1) === */
.${P}-section{padding:160px 0 120px;background:linear-gradient(165deg,#000432 0%,#001080 40%,#000864 100%);position:relative;overflow:hidden;min-height:85vh;display:flex;align-items:center;${base.fontSmoothingReset(P)}font-size:16px}

/* Super D background decoration */
${superD.css(`${P}-d-bg`, { variant: 'gradient', position: 'left', opacity: 0.10 })}

/* Grain overlay */
${base.grainCSS(`.${P}-grain`)}
.${P}-grain{position:absolute;inset:0;z-index:1;opacity:0.16;pointer-events:none}

/* Light-leak radial */
.${P}-section::after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 80% 20%,rgba(0,175,240,0.15) 0%,transparent 50%),radial-gradient(ellipse at 20% 80%,rgba(139,92,246,0.1) 0%,transparent 40%);pointer-events:none;z-index:1}

/* SVG ecosystem illustration */
.${P}-ecosystem{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;pointer-events:none;z-index:0}
.${P}-ecosystem svg{position:absolute;width:100%;height:100%}

/* Inner grid layout */
.${P}-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:2}

/* Content column */
.${P}-content{animation:${P}-slide-up 0.8s ease-out}

/* Badge */
.${P}-badge{display:inline-flex;align-items:center;gap:10px;background:rgba(0,175,240,0.1);border:1px solid rgba(0,175,240,0.3);padding:10px 20px;border-radius:50px;color:#00AFF0;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:28px}
.${P}-badge::before{content:'';width:8px;height:8px;background:#00AFF0;border-radius:50%;animation:${P}-pulse 2s ease-in-out infinite}

/* Title */
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(40px,5vw,56px);font-weight:700;color:#ffffff;margin:0 0 24px;line-height:1.1;letter-spacing:-0.03em;padding:0}
.${P}-hl{color:#00AFF0}

/* Subtitle */
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:19px;color:rgba(255,255,255,0.85);max-width:520px;margin:0 0 40px;line-height:1.7;padding:0}

/* Button */
.${P}-btn-wrap{margin-top:32px;margin-bottom:16px}
${base.buttonCSS(P)}

/* Stats row */
.${P}-stats{display:flex;gap:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1)}
.${P}-stat{text-align:left}
.${P}-stat-number{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:800;color:#00AFF0;letter-spacing:-0.02em}
.${P}-stat-label{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,0.85);text-transform:uppercase;letter-spacing:0.1em;margin-top:6px}

/* ── Stack visual (right column) ── */
.${P}-stack-visual{position:relative;height:500px;perspective:1200px;animation:${P}-slide-up 1s ease-out 0.2s both}
.${P}-stack-container{position:relative;width:100%;height:100%;transform-style:preserve-3d}

/* Stack layers */
.${P}-layer{position:absolute;right:0;width:220px;padding:16px 20px;border-radius:12px;display:flex;align-items:center;gap:14px;font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:600;color:#ffffff;box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.15);transition:all 0.3s ease;cursor:default;overflow:hidden}
.${P}-layer:hover{transform:translateX(-8px);box-shadow:0 12px 40px rgba(0,0,0,0.4)}
.${P}-layer::before{content:'';position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);animation:${P}-wave-flow 3s ease-in-out infinite}

.${P}-layer-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.2);border-radius:10px;flex-shrink:0}
.${P}-layer-icon svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2}

/* Layer variants */
.${P}-layer--aiot{top:40px;background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);animation:${P}-float 4s ease-in-out infinite}
.${P}-layer--mes{top:120px;right:40px;background:linear-gradient(135deg,#10b981 0%,#02D28C 100%);animation:${P}-float 4s ease-in-out infinite 0.3s}
.${P}-layer--wms{top:200px;right:20px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);animation:${P}-float 4s ease-in-out infinite 0.6s}
.${P}-layer--erp{top:280px;right:60px;background:linear-gradient(135deg,#00AFF0 0%,#003CC8 100%);animation:${P}-float 4s ease-in-out infinite 0.9s}

/* Data particles */
.${P}-particles{position:absolute;width:100%;height:100%;pointer-events:none}
.${P}-particle{position:absolute;width:6px;height:6px;background:#00AFF0;border-radius:50%;box-shadow:0 0 10px rgba(0,175,240,0.4);animation:${P}-data-rise 2s ease-in-out infinite}
.${P}-particle:nth-child(1){left:35%;animation-delay:0s}
.${P}-particle:nth-child(2){left:50%;animation-delay:0.5s}
.${P}-particle:nth-child(3){left:65%;animation-delay:1s}
.${P}-particle:nth-child(4){left:42%;animation-delay:1.5s}
.${P}-particle:nth-child(5){left:58%;animation-delay:2s}

/* ── Keyframes ── */
@keyframes ${P}-slide-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes ${P}-pulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
@keyframes ${P}-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes ${P}-wave-flow{0%{left:-100%}100%{left:200%}}
@keyframes ${P}-data-rise{0%{bottom:20%;opacity:0}50%{opacity:0.8}100%{bottom:80%;opacity:0}}

/* ── Responsive ── */
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-inner{grid-template-columns:1fr;text-align:center;gap:40px}
  .${P}-subtitle{margin-left:auto;margin-right:auto}
  .${P}-stats{justify-content:center}
  .${P}-stack-visual{display:none}
}
@media(max-width:640px){
  .${P}-section{padding:120px 0 60px;min-height:auto}
  .${P}-title{font-size:28px}
  .${P}-stats{flex-direction:column;gap:20px;align-items:center}
  .${P}-stat{text-align:center}
}

/* ── Reduced motion ── */
${base.reducedMotion(`
  .${P}-content,.${P}-stack-visual,.${P}-badge::before,.${P}-layer,.${P}-layer::before,.${P}-particle,.${P}-section::after,.${P}-d-bg{animation:none !important;transition:none !important}
  .${P}-content{opacity:1;transform:none}
  .${P}-stack-visual{opacity:1;transform:none}
`)}`.trim();
}

module.exports = { blocks, css };
