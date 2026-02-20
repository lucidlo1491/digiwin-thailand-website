/**
 * home-proven-results.js — Proven Results Teaser Section Builder
 *
 * ContentSpec §3.9 — 2 Case Study Cards
 * Light gray section with result cards + CTA link.
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

const results = [
  { company: 'Thai Alpha Polymer',
    metric: 'Month-end closing: 60 days to 15 days',
    detail: 'Stock accuracy reached 95% with Workflow ERP + WMS integration across their PET plastic roll operations.' },
  { company: 'Ginfong Precision Metal Stamping',
    metric: 'Revenue growth of 200%, margins from 23% to 34%',
    detail: 'Gross profit improved from 23% to 34% with ERP + SFT (Shop Floor Tracking) \u2014 even during the COVID period when competitors contracted.' },
];

function blocks() {
  const cardsHTML = results.map((r) => `
    <div class="results-card">
      <div class="results-company">${r.company}</div>
      <div class="results-metric">${r.metric}</div>
      <p class="results-detail">${r.detail}</p>
    </div>
  `).join('');

  const html = `
    <div class="results-section">
    <div class="results-container">
      <div class="results-header">
        <div class="results-header-label">Proven Results</div>
        <h2 class="results-title">Real Outcomes from Thai Factories</h2>
        <p class="results-subtitle">These aren't projections. These are results our clients achieved after going live.</p>
      </div>
      <div class="results-grid">
        ${cardsHTML}
      </div>
      <div class="results-cta">
        <a href="/case-studies.html" class="results-link">See all case studies \u2192</a>
      </div>
    </div>
    </div>
  `;

  return [
    sectionOpen({ adminLabel: 'Proven Results: 2 Case Studies', css: 'selector{background:transparent !important;padding:0 !important;}' }),
    rowOpen(),
    columnOpen(),
    codeModule(html, 'Proven Results: 2 Cards'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css() {
  return `
/* === PROVEN RESULTS === */
.results-section{background:#F5F7FA;padding:80px 40px;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;font-size:16px}
.results-container{max-width:1200px;margin:0 auto}
.results-header{text-align:center;max-width:700px;margin:0 auto 48px}
.results-header-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;color:#0369a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;line-height:1.6}
/* Label lines removed — HTML reference doesn't have them */
.results-title{font-family:'Noto Sans',sans-serif;font-weight:700;font-size:clamp(32px,3.5vw,44px);color:#000864;letter-spacing:-0.02em;line-height:1.15;margin:0 0 16px}
.results-subtitle{font-family:'Noto Sans',sans-serif;font-weight:400;font-size:18px;color:#5b6b80;line-height:1.6;margin:0}
.results-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:32px;max-width:900px;margin:48px auto 0}
.results-card{background:#fff;border-radius:16px;padding:36px 32px;border:1px solid #e2e8f0;transition:all 0.2s ease;line-height:1.6}
.results-card:hover{box-shadow:0 8px 32px rgba(0,8,100,0.08);transform:translateY(-2px)}
.results-company{font-family:'JetBrains Mono',monospace;font-size:11px;color:#00AFF0;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px}
.results-metric{font-family:'Noto Sans',sans-serif;font-weight:600;font-size:20px;color:#000864;line-height:1.4;margin-bottom:8px}
.results-detail{font-family:'Noto Sans',sans-serif;font-weight:400;font-size:14px;color:#5b6b80;line-height:1.5;margin:0}
.results-cta{text-align:center;margin-top:40px}
.results-link{font-family:'Noto Sans',sans-serif;font-weight:600;font-size:14px;color:#00AFF0;text-decoration:none;transition:color 0.3s ease;line-height:1.6}
.results-link:hover{color:#003CC8}
@media(max-width:767px){.results-grid{grid-template-columns:1fr;gap:24px;margin-top:36px}.results-card{padding:28px 24px}.results-metric{font-size:18px}}
@media(prefers-reduced-motion:reduce){.results-card{transition:none !important}}`;
}

module.exports = { blocks, css };
