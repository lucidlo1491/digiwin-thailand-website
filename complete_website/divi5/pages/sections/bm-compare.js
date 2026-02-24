/**
 * bm-compare.js — Side-by-Side Comparison Table Section (S7)
 *
 * Responsive HTML table with red/green column tinting.
 * data-particles attribute + Super D corner-br decoration.
 * Particle ocean injected via script (same as partner-alternative.js).
 *
 * Source: business-model.html lines 1015-1066
 */

const base = require('../../lib/templates/_base');

const P = 'cmp'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const ROWS = [
  { metric: 'Revenue Model', bad: 'Resets to zero each year', good: 'Compounds annually' },
  { metric: 'Customer Relationship', bad: 'Project-based, ends', good: 'Ongoing, permanent' },
  { metric: 'Revenue Predictability', bad: 'Feast or famine', good: 'Predictable base + growth' },
  { metric: 'Business Valuation', bad: '1-2x revenue (if any)', good: '5-10x recurring revenue' },
  { metric: 'Owner Dependence', bad: 'Business = You', good: 'Business = Customer base' },
  { metric: 'Growth Ceiling', bad: 'Limited by headcount', good: 'Limited by market size' },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const rowsHTML = ROWS.map(r => `
              <tr>
                <td>${r.metric}</td>
                <td class="bad" data-label="Services Only">${r.bad}</td>
                <td class="good" data-label="Services + Product">${r.good}</td>
              </tr>`).join('');

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">Side-by-Side Comparison</h2>
        </div>
        <table class="${P}-table">
          <caption class="sr-only">Comparison of Services Only vs Services + Product business models</caption>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Services Only</th>
              <th scope="col">Services + Product</th>
            </tr>
          </thead>
          <tbody>${rowsHTML}
          </tbody>
        </table>
      </div>
    </div>
    ${base.particleOceanScript()}`;

  return base.wrapInDiviSection('Comparison: Side-by-Side', html, 'Comparison: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === COMPARISON TABLE (S7) === */
.${P}-section{padding:100px 24px;background:#fff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-d-bg{position:absolute;bottom:0;right:0;width:400px;height:400px;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100c55.2 0 100-44.8 100-100V0H100z' fill='%23000864' opacity='0.08'/%3E%3C/svg%3E");background-size:contain;background-repeat:no-repeat;background-position:bottom right;pointer-events:none;z-index:0;opacity:0.08}
.${P}-inner{max-width:1000px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-table{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);width:100%;border-collapse:collapse}
.${P}-table thead{background:#000864}
.${P}-table th{padding:20px 24px;font-family:'Noto Sans',sans-serif;font-weight:600;font-size:16px;color:#fff;text-align:left}
.${P}-table td{padding:20px 24px;font-family:'Noto Sans',sans-serif;font-size:15px;color:#475569;border-bottom:1px solid #e2e8f0}
.${P}-table tbody tr:last-child td{border-bottom:none}
.${P}-table td:first-child{font-weight:600;color:#000864}
.${P}-table td.bad{background:#fef2f2;color:#991b1b}
.${P}-table td.good{background:#f0fdf4;color:#166534}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-table thead{display:none}
  .${P}-table tr{display:block;margin-bottom:16px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden}
  .${P}-table td{display:flex;justify-content:space-between;align-items:center;gap:12px;text-align:right}
  .${P}-table td::before{content:attr(data-label);font-family:'Noto Sans',sans-serif;font-weight:600;color:#000864;text-align:left;flex-shrink:0}
  .${P}-table td:first-child{background:#000864;color:#fff;font-size:16px}
  .${P}-table td:first-child::before{display:none}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
}`.trim();
}

module.exports = { blocks, css };
