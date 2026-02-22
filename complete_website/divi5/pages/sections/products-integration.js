/**
 * products-integration.js — Integration Section (S3)
 *
 * Central hub diagram with 4 orbit nodes (ERP, MES, WMS, AIoT),
 * animated data flow SVG lines, message card with gradient bar,
 * and CTA button. Super D outline decoration corner-br.
 *
 * Source: products.html line 976
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

const P = 'prod-int'; // CSS prefix

// Super D decoration
const SUPER_D_CLASS = `${P}-super-d`;

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${SUPER_D_CLASS}" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">One Integrated Ecosystem</h2>
          <p class="${P}-subtitle">All products share a common data platform—no integration nightmares, no data silos, no reconciliation headaches.</p>
        </div>

        <div class="${P}-diagram">

          <svg aria-hidden="true" class="${P}-flow-svg" viewBox="0 0 380 380">
            <line class="${P}-flow-line ${P}-flow-line--erp" x1="190" y1="190" x2="190" y2="20"/>
            <line class="${P}-flow-line ${P}-flow-line--mes" x1="190" y1="190" x2="360" y2="190"/>
            <line class="${P}-flow-line ${P}-flow-line--wms" x1="190" y1="190" x2="190" y2="360"/>
            <line class="${P}-flow-line ${P}-flow-line--aiot" x1="190" y1="190" x2="20" y2="190"/>

            <circle class="${P}-flow-dot ${P}-flow-dot--erp" cx="190" cy="105" r="5"/>
            <circle class="${P}-flow-dot ${P}-flow-dot--mes" cx="275" cy="190" r="5"/>
            <circle class="${P}-flow-dot ${P}-flow-dot--wms" cx="190" cy="275" r="5"/>
            <circle class="${P}-flow-dot ${P}-flow-dot--aiot" cx="105" cy="190" r="5"/>
          </svg>

          <div class="${P}-hub">
            <svg aria-hidden="true" class="${P}-hub-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor"/>
            </svg>
            <span class="${P}-hub-label">Data Hub</span>
          </div>

          <div class="${P}-orbit">
            <div class="${P}-node ${P}-node--erp">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <span class="${P}-node-name">ERP</span>
            </div>

            <div class="${P}-node ${P}-node--mes">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M6 8v8M10 8v8M14 8v8M18 8v8"/>
                </svg>
              </div>
              <span class="${P}-node-name">MES</span>
            </div>

            <div class="${P}-node ${P}-node--wms">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                </svg>
              </div>
              <span class="${P}-node-name">WMS</span>
            </div>

            <div class="${P}-node ${P}-node--aiot">
              <div class="${P}-node-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
                  <circle cx="12" cy="12" r="8" fill="none"/>
                </svg>
              </div>
              <span class="${P}-node-name">AIoT</span>
            </div>
          </div>

          <!-- data-flow-labels hidden (display:none in prototype) -->
          <div class="${P}-flow-labels" aria-hidden="true">
            <span class="${P}-flow-label ${P}-flow-label--top">FINANCE</span>
            <span class="${P}-flow-label ${P}-flow-label--right">PRODUCTION</span>
            <span class="${P}-flow-label ${P}-flow-label--bottom">INVENTORY</span>
            <span class="${P}-flow-label ${P}-flow-label--left">MACHINES</span>
          </div>
        </div>

        <div class="${P}-message">
          <span class="${P}-message-quote">\u201C</span>
          <p>Unlike point solutions that create data silos, every DigiWin product is built on the same foundation. Your ERP talks to your MES. Your WMS knows what\u2019s on the floor. Your AIoT feeds insights back to planning. <strong>One database. One truth. Zero integration tax.</strong></p>
        </div>

        <div class="${P}-cta-wrapper">
          <a href="/contact/" class="${P}-cta">Let\u2019s Talk About Your Factory</a>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Integration', html, 'Integration: Content', {
    superDClass: SUPER_D_CLASS,
  });
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === INTEGRATION (S3) === */
.${P}-section{padding:140px 0;background:linear-gradient(180deg,#F5F7FA 0%,#fff 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}

/* Grid pattern overlay */
.${P}-section::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(rgba(0,175,240,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,175,240,0.03) 1px,transparent 1px);background-size:50px 50px;pointer-events:none;z-index:1}

/* Super D decoration */
${superD.css(SUPER_D_CLASS, { variant: 'outline', position: 'corner-br', opacity: 0.06 })}

.${P}-inner{max-width:1100px;margin:0 auto;padding:0 24px;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:44px;font-weight:700;color:#000864;line-height:1.6;letter-spacing:-0.02em;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}

/* === DIAGRAM === */
.${P}-diagram{position:relative;padding:80px 0;min-height:550px;display:flex;align-items:center;justify-content:center}

/* Central hub */
.${P}-hub{width:140px;height:140px;background:linear-gradient(135deg,#000864 0%,#001080 100%);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto;position:relative;z-index:2;box-shadow:0 20px 60px rgba(37,59,80,0.35),inset 0 1px 0 rgba(255,255,255,0.05)}
.${P}-hub::before,.${P}-hub::after{content:'';position:absolute;border-radius:50%;border:1px solid rgba(0,175,240,0.3);animation:${P}-pulse-ring 3s ease-out infinite}
.${P}-hub::before{inset:-15px;animation-delay:0s}
.${P}-hub::after{inset:-30px;animation-delay:1s}
.${P}-hub-icon{width:44px;height:44px;stroke:#00AFF0;fill:none;stroke-width:1.5;margin-bottom:8px}
.${P}-hub-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,0.9);text-transform:uppercase;letter-spacing:0.1em}

/* Orbit ring */
.${P}-orbit{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:380px;height:380px;border:2px dashed rgba(0,175,240,0.15);border-radius:50%}
.${P}-orbit::before{content:'';position:absolute;inset:30px;border:1px dashed rgba(0,175,240,0.1);border-radius:50%}

/* Nodes */
.${P}-node{position:absolute;width:100px;height:100px;background:#ffffff;border:2px solid #e8eef3;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all 0.4s ease;box-shadow:0 8px 32px rgba(0,0,0,0.08);cursor:default}
.${P}-node-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;transition:transform 0.3s ease}
.${P}-node-icon svg{width:26px;height:26px;stroke:#ffffff;fill:none;stroke-width:1.5}
.${P}-node-name{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:600;color:#000864}

/* Node positions */
.${P}-node--erp{top:-30px;left:50%;transform:translateX(-50%)}
.${P}-node--erp .${P}-node-icon{background:linear-gradient(135deg,#00AFF0 0%,#003CC8 100%)}
.${P}-node--mes{top:50%;right:-30px;transform:translateY(-50%)}
.${P}-node--mes .${P}-node-icon{background:linear-gradient(135deg,#10b981 0%,#02D28C 100%)}
.${P}-node--wms{bottom:-30px;left:50%;transform:translateX(-50%)}
.${P}-node--wms .${P}-node-icon{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%)}
.${P}-node--aiot{top:50%;left:-30px;transform:translateY(-50%)}
.${P}-node--aiot .${P}-node-icon{background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%)}

/* Node hover */
.${P}-node:hover{box-shadow:0 16px 48px rgba(0,175,240,0.2)}
.${P}-node:hover .${P}-node-icon{transform:none}
.${P}-node--erp:hover{border-color:#00AFF0}
.${P}-node--mes:hover{border-color:#10b981}
.${P}-node--wms:hover{border-color:#f59e0b}
.${P}-node--aiot:hover{border-color:#8b5cf6}

/* === DATA FLOW SVG === */
.${P}-flow-svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:380px;height:380px;pointer-events:none;z-index:1}
.${P}-flow-line{stroke-width:2;fill:none;stroke-dasharray:10 6;animation:${P}-data-flow 1.5s linear infinite}
.${P}-flow-line--erp{stroke:#00AFF0;opacity:0.6}
.${P}-flow-line--mes{stroke:#10b981;opacity:0.6;animation-delay:0.3s}
.${P}-flow-line--wms{stroke:#f59e0b;opacity:0.6;animation-delay:0.6s}
.${P}-flow-line--aiot{stroke:#8b5cf6;opacity:0.6;animation-delay:0.9s}
.${P}-flow-dot{animation:${P}-pulse-node 1.5s ease-in-out infinite}
.${P}-flow-dot--erp{fill:#00AFF0}
.${P}-flow-dot--mes{fill:#10b981;animation-delay:0.3s}
.${P}-flow-dot--wms{fill:#f59e0b;animation-delay:0.6s}
.${P}-flow-dot--aiot{fill:#8b5cf6;animation-delay:0.9s}

/* Data flow labels — hidden (matches prototype) */
.${P}-flow-labels{display:none}

/* === MESSAGE CARD === */
.${P}-message{max-width:800px;margin:80px auto 0;background:#ffffff;border-radius:24px;padding:48px 64px;box-shadow:0 12px 48px rgba(0,0,0,0.08);border:1px solid #e8eef3;position:relative;overflow:hidden}
.${P}-message::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#00AFF0,#10b981,#f59e0b,#8b5cf6);z-index:1}
.${P}-message-quote{position:absolute;top:24px;left:36px;font-family:'Noto Sans',sans-serif;font-size:100px;color:#00AFF0;opacity:0.08;line-height:1}
.${P}-message p{font-family:'Noto Sans',sans-serif;font-size:18px;color:#000864;line-height:1.85;margin:0;position:relative}
.${P}-message strong{color:#0369a1;font-weight:600}

/* === CTA BUTTON === */
${base.buttonCSS(P)}
.${P}-cta-wrapper{margin-top:48px}

/* === KEYFRAMES === */
@keyframes ${P}-pulse-ring{0%{transform:scale(1);opacity:1}100%{transform:scale(1.3);opacity:0}}
@keyframes ${P}-data-flow{0%{stroke-dashoffset:16}100%{stroke-dashoffset:0}}
@keyframes ${P}-pulse-node{0%,100%{opacity:0.6;r:5}50%{opacity:1;r:7}}

/* === RESPONSIVE === */
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-orbit{width:300px;height:300px}
  .${P}-flow-svg{width:300px;height:300px}
  .${P}-hub{width:110px;height:110px}
  .${P}-node{width:80px;height:80px}
  .${P}-node-icon{width:32px;height:32px}
  .${P}-node-name{font-size:11px}
  .${P}-node--erp,.${P}-node--wms{left:50%;transform:translateX(-50%)}
  .${P}-node--erp{top:-25px}
  .${P}-node--wms{bottom:-25px}
  .${P}-node--mes{right:-25px}
  .${P}-node--aiot{left:-25px}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-title{font-size:32px}
  .${P}-orbit{width:280px;height:280px}
  .${P}-flow-svg{width:280px;height:280px}
  .${P}-hub{width:100px;height:100px}
  .${P}-hub-icon{width:36px;height:36px}
  .${P}-node{width:75px;height:75px;border-radius:16px}
  .${P}-node-icon{width:36px;height:36px;margin-bottom:6px}
  .${P}-node-name{font-size:11px}
  .${P}-node--erp{top:-25px}
  .${P}-node--wms{bottom:-25px}
  .${P}-node--mes{right:-25px}
  .${P}-node--aiot{left:-25px}
  .${P}-diagram{min-height:400px;padding:60px 0}
  .${P}-message{padding:32px 24px}
}
${base.reducedMotion(`
.${P}-hub::before,.${P}-hub::after,.${P}-flow-line,.${P}-flow-dot,.${P}-node,.${P}-node-icon{animation:none !important;transition:none !important}
`)}`.trim();
}

module.exports = { blocks, css };
