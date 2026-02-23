/**
 * ps-products.js — Solution Stack Products Section (S2)
 *
 * Data-driven: CARDS array → 4 product cards (2-col info + metrics grid).
 * Even cards get RTL layout via direction:rtl with children reset to ltr.
 * SVG scene background (factory hub diagram).
 * Vertical wave on left at 0.08 opacity.
 * diviListReset for product feature <ul> lists.
 *
 * Source: solutions.html lines 1048-1266
 */

const base = require('../../lib/templates/_base');

const P = 'ps-prod'; // CSS prefix

const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

// ════════════════════════════════════════════════════════════════
// DATA — one entry per product card
// ════════════════════════════════════════════════════════════════
const CARDS = [
  {
    badge: 'The \u201CEnterprise Alternative\u201D',
    title: 'T100 Enterprise ERP',
    desc: 'Win the \u201CBig Fish\u201D accounts\u2014multi-site automotive and electronics suppliers\u2014that usually go to enterprise ERP vendors. Offer <strong>Tier-1 capability at Tier-2 pricing</strong>, targeting EV supply chain factories that need bilingual support and complex costing.',
    features: [
      'Multi-site, multi-currency, multi-company architecture',
      'Complex costing logic for automotive & electronics',
      'Chinese/Thai/English bilingual out of the box',
      '<strong>Cross-sell path:</strong> T100 \u2192 MES \u2192 WMS \u2192 AIoT \u2192 BPM',
    ],
    link: { href: '/products/erp.html', text: 'Learn more about T100' },
    metricsTitle: 'Your Revenue Model: High-Value Project',
    metrics: [
      { label: 'Target Customer', value: '200+ employees', highlight: false },
      { label: 'License Margin', value: '30-40%', highlight: true },
      { label: 'Implementation Fees', value: '100% yours', highlight: true },
      { label: 'Revenue Type', value: 'Enterprise Asset', highlight: false },
    ],
  },
  {
    badge: 'The \u201CVolume Engine\u201D',
    title: 'Workflow iGP Growth ERP',
    desc: 'Your \u201CRapid Deployment\u201D weapon for Thai SMEs. Addresses the massive automation gap where local accounting fails to handle production logic, but global ERPs are too expensive. <strong>Pre-localized for Thai Revenue Department (certified).</strong>',
    features: [
      '3-6 month deployments\u2014turn projects faster, bill sooner',
      'Lower barrier = higher volume of local manufacturers',
      'Thai taxation certified\u2014easy sell to Finance Directors',
      '<strong>Cross-sell path:</strong> iGP \u2192 MES \u2192 WMS \u2192 AIoT',
    ],
    link: { href: '/products/erp.html', text: 'Learn more about iGP' },
    metricsTitle: 'Your Revenue Model: Cash Flow Engine',
    metrics: [
      { label: 'Target Customer', value: '20-200 employees', highlight: false },
      { label: 'Turn Time', value: '3-6 months', highlight: true },
      { label: 'Avoid', value: '\u201CLong project death\u201D', highlight: false },
      { label: 'Revenue Type', value: 'SME Cash Flow', highlight: false },
    ],
  },
  {
    badge: 'The \u201CStrategic Wedge\u201D',
    title: 'MES',
    desc: 'The <strong>\u201CReverse Cut\u201D Strategy.</strong> You don\u2019t have to rip and replace their existing ERP\u2014even if it\u2019s a global brand. Sell MES as the \u201CShop Floor Enforcer\u201D that fixes inventory accuracy and OEE tracking. Appeals to owners tired of \u201CShadow Excel\u201D wanting real-time visibility.',
    features: [
      '\u201CKeep your current ERP for Finance. Use Digiwin for the factory floor.\u201D',
      'Premium rates for process consulting & hardware integration',
      'Once you control shop floor data, client cannot leave',
      '<strong>\u201CTrojan Horse\u201D:</strong> MES \u2192 WMS \u2192 AIoT \u2192 T100/iGP',
    ],
    link: { href: '/products/mes.html', text: 'Learn more about MES' },
    metricsTitle: 'Your Revenue Model: Sticky Recurring',
    metrics: [
      { label: 'Entry Point', value: '~1M THB (vs. 5M+ ERP)', highlight: true },
      { label: 'Timeline', value: '3-6 months (vs. 18mo)', highlight: true },
      { label: 'Retention', value: 'Higher barrier to exit', highlight: false },
      { label: 'Revenue Type', value: 'Retention Asset', highlight: false },
    ],
  },
  {
    badge: 'The \u201CValue Multipliers\u201D',
    title: 'AIoT & WMS: Lock-In Layers',
    desc: '<strong>WMS \u2014 \u201CZero Ghost Inventory\u201D:</strong> Sell to owners terrified of theft or audit failure. Digitizes physical movement of goods. <strong>AIoT \u2014 \u201CFuture Proofing\u201D:</strong> Shows you have capability to connect machines (PLCs) directly to ERP. Differentiates you from accounting firms.',
    features: [
      'Hardware/middleware resale opportunity (handhelds, sensors)',
      'Recurring data monitoring & optimization services',
      'Solves \u201Csystem says 100, shelf has 50\u201D problem',
      '<strong>Physical lock-in:</strong> Scanners & sensors = 10+ year relationships',
    ],
    link: { href: '/products/aiot.html', text: 'Learn more about AIoT & WMS' },
    metricsTitle: 'Your Revenue Model: Differentiation',
    metrics: [
      { label: 'Physical Integration', value: 'Ultimate lock-in', highlight: true },
      { label: 'Hardware Drag', value: 'Scanners, sensors, PLCs', highlight: false },
      { label: 'Client Lifetime', value: '10+ years', highlight: true },
      { label: 'Revenue Type', value: 'Differentiation Asset', highlight: false },
    ],
  },
];

// SVG scene: factory hub diagram (from HTML prototype)
const SVG_SCENE = `<svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <circle cx="700" cy="450" r="60" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <circle cx="700" cy="450" r="30" stroke="#00AFF0" stroke-width="1.5" fill="none" opacity="0.12"/>
  <circle cx="700" cy="450" r="6" fill="#000864" opacity="0.2"/>
  <rect x="200" y="150" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="300" y1="185" x2="645" y2="420" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <rect x="1100" y="150" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="1100" y1="185" x2="755" y2="420" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <rect x="200" y="650" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="300" y1="685" x2="645" y2="480" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <rect x="1100" y="650" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="1100" y1="685" x2="755" y2="480" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <path d="M470 300 L480 310 L500 290" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.2"/>
  <path d="M900 300 L910 310 L930 290" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.2"/>
  <path d="M470 580 L480 590 L500 570" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.18"/>
  <path d="M900 580 L910 590 L930 570" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.18"/>
  <circle cx="400" cy="340" r="4" fill="#000864" opacity="0.12"/>
  <circle cx="1000" cy="340" r="4" fill="#000864" opacity="0.12"/>
</svg>`;

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cardsHTML = CARDS.map((card, i) => {
    const featuresHTML = card.features.map(f =>
      `<li>${CHECK_SVG}<span>${f}</span></li>`
    ).join('');

    const metricsHTML = card.metrics.map(m =>
      `<div class="${P}-metric">
        <span class="${P}-metric-label">${m.label}</span>
        <span class="${P}-metric-value${m.highlight ? ` ${P}-metric-hl` : ''}">${m.value}</span>
      </div>`
    ).join('');

    return `
            <div class="${P}-card">
              <div class="${P}-info">
                <span class="${P}-badge">${card.badge}</span>
                <h3>${card.title}</h3>
                <p class="${P}-desc">${card.desc}</p>
                <ul class="${P}-features">${featuresHTML}</ul>
                <a href="${card.link.href}" class="${P}-link">${card.link.text} ${ARROW_SVG}</a>
              </div>
              <div class="${P}-metrics">
                <div class="${P}-metrics-title">${card.metricsTitle}</div>
                ${metricsHTML}
              </div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-scene">${SVG_SCENE}</div>
      <div class="${P}-wave-left" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">Your Product Portfolio as Revenue Engines</h2>
          <p class="${P}-subtitle">Each product isn\u2019t just software\u2014it\u2019s a business model with specific revenue characteristics and cross-sell paths.</p>
        </div>
        ${cardsHTML}
      </div>
    </div>`;

  return base.wrapInDiviSection('Products: Solution Stack', html, 'Products: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PRODUCTS SECTION (S2) === */
.${P}-section{padding:100px 24px;background:#fff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
${base.svgSceneCSS(P)}
.${P}-wave-left{position:absolute;top:0;left:0;bottom:0;width:200px;opacity:0.08;background:linear-gradient(90deg,rgba(0,175,240,0.15) 0%,transparent 100%);pointer-events:none;z-index:0}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0 auto;padding:0}
.${P}-card{display:grid;grid-template-columns:1fr 1fr;gap:48px;background:#fff;border:1px solid #e2e8f0;border-radius:24px;padding:48px;margin-bottom:32px;transition:all 0.3s ease}
.${P}-card:hover{border-color:#00AFF0;box-shadow:0 12px 48px rgba(0,175,240,0.12);transform:none}
.${P}-card:nth-child(even){direction:rtl}
.${P}-card:nth-child(even)>*{direction:ltr}
.${P}-info{display:flex;flex-direction:column}
.${P}-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#00AFF0,#003CC8);color:#fff;padding:8px 16px;border-radius:50px;font-size:13px;font-weight:600;width:fit-content;margin-bottom:20px}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:28px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-desc{font-size:16px;color:#5b6b80;line-height:1.7;margin:0 0 24px;padding:0}
.${P}-desc strong{color:#000864}
${base.diviListReset(P)}
.${P}-features{margin:0 0 24px !important}
.${P}-features li{display:flex !important;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9}
.${P}-features li:last-child{border-bottom:none}
.${P}-features li svg{width:20px;height:20px;stroke:#00AFF0;flex-shrink:0;margin-top:2px}
.${P}-features li span{font-size:15px;color:#475569}
.${P}-features li span strong{color:#000864}
.${P}-link{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#0369a1;text-decoration:none;margin-top:auto}
.${P}-link svg{width:16px;height:16px;stroke:currentColor;transition:transform 0.2s}
.${P}-link:hover svg{transform:translateX(4px)}
.${P}-metrics{background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-radius:16px;padding:32px}
.${P}-metrics-title{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#000864;margin-bottom:24px;text-transform:uppercase;letter-spacing:0.5px}
.${P}-metric{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid #e2e8f0}
.${P}-metric:last-child{border-bottom:none}
.${P}-metric-label{font-size:14px;color:#5b6b80}
.${P}-metric-value{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864}
.${P}-metric-hl{color:#0369a1}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-card{grid-template-columns:1fr;direction:ltr !important}
  .${P}-card>*{direction:ltr !important}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-card{padding:32px 24px}
  .${P}-title{font-size:32px}
}
/* Divi line-height + color overrides */
.et_pb_section .${P}-subtitle{max-width:600px !important}
.et_pb_section .${P}-desc strong{color:#5b6b80 !important}
.et_pb_section .${P}-features li span{line-height:24px !important}
.et_pb_section .${P}-features li span strong{color:#475569 !important;line-height:24px !important}
.et_pb_section .${P}-badge{line-height:20.8px !important}
.et_pb_section .${P}-metrics-title{line-height:25.6px !important}
.et_pb_section .${P}-metric-label{line-height:22.4px !important}
.et_pb_section .${P}-metric-value{line-height:28.8px !important}
${base.reducedMotion(`.${P}-card{transition:none !important}.${P}-link svg{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
