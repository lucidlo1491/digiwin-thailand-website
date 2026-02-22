/**
 * products-why.js — Why DigiWin Products Section (S4)
 *
 * 3 advantage cards: Manufacturing Focus, Grows With You, Local Support.
 * White background, 3-col grid, hover effects with ::before accent bar.
 *
 * Source: products.html line 1080
 */

const base = require('../../lib/templates/_base');

const P = 'prod-why'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <p class="${P}-label">The DigiWin Advantage</p>
          <h2 class="${P}-title">Why Choose DigiWin Products?</h2>
        </div>
        <div class="${P}-grid">

          <div class="${P}-card">
            <div class="${P}-card-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 class="${P}-card-title">Manufacturing-Only Focus</h3>
            <p class="${P}-card-desc">We don\u2019t sell to banks, retailers, or hospitals. <span class="dw-years">44</span> years of exclusive manufacturing focus means features built for the factory floor, not adapted from other industries.</p>
          </div>

          <div class="${P}-card">
            <div class="${P}-card-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
              </svg>
            </div>
            <h3 class="${P}-card-title">Grows With You</h3>
            <p class="${P}-card-desc">Start with what you need today. Add capabilities as you grow. From 20-person workshop to multi-site enterprise\u2014same ecosystem, same partner, no starting over.</p>
          </div>

          <div class="${P}-card">
            <div class="${P}-card-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="${P}-card-title">Local Support Team</h3>
            <p class="${P}-card-desc">50+ team members in Thailand. Bilingual support. Local implementation expertise backed by <span class="dw-years">44</span> years of global manufacturing knowledge.</p>
          </div>

        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Why', html, 'Why: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === WHY DIGIWIN (S4) === */
.${P}-section{padding:120px 0;background:#ffffff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1200px;margin:0 auto;padding:0 24px}
.${P}-header{text-align:center;margin-bottom:72px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#0369a1;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:44px;font-weight:700;color:#000864;margin:0;line-height:1.6;letter-spacing:-0.02em;padding:0}

/* Card grid */
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:36px}

/* Cards */
.${P}-card{text-align:center;padding:56px 36px;background:#F5F7FA;border-radius:28px;transition:all 0.5s cubic-bezier(0.4,0,0.2,1);position:relative;overflow:hidden;border:1px solid transparent}
.${P}-card:hover{background:#ffffff;box-shadow:0 24px 64px rgba(0,175,240,0.12);border-color:rgba(0,175,240,0.1)}
.${P}-card::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:80px;height:4px;background:linear-gradient(90deg,#00AFF0,#003CC8);border-radius:0 0 4px 4px;opacity:0;transition:opacity 0.4s ease}
.${P}-card:hover::before{opacity:1}

/* Card icon */
.${P}-card-icon{width:88px;height:88px;background:#ffffff;border-radius:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;box-shadow:0 8px 32px rgba(0,0,0,0.06);transition:all 0.4s ease;position:relative}
.${P}-card-icon svg{width:40px;height:40px;stroke:#00AFF0;fill:none;stroke-width:1.5}
.${P}-card:hover .${P}-card-icon{transform:scale(1.1) rotate(-5deg);box-shadow:0 16px 48px rgba(0,175,240,0.15)}

/* Card text */
.${P}-card-title{font-family:'Noto Sans',sans-serif;font-size:24px;font-weight:700;color:#000864;margin:0 0 16px 0;line-height:1.6}
.${P}-card-desc{font-family:'Noto Sans',sans-serif;font-size:16px;color:#5b6b80;line-height:1.7;margin:0}

/* === RESPONSIVE === */
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:1fr;max-width:480px;margin:0 auto}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-title{font-size:32px}
}
${base.reducedMotion(`
.${P}-card,.${P}-card-icon,.${P}-card::before{animation:none !important;transition:none !important}
`)}`.trim();
}

module.exports = { blocks, css };
