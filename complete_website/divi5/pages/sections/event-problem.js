/**
 * event-problem.js — The Problem Section (S2)
 *
 * White background, pain-first messaging with Jin Hai data card.
 * ContentSpec: Section 2 — "This is YOUR challenge right now"
 */

const base = require('../../lib/templates/_base');

const P = 'evt-prob';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
<div class="${P}-section">
  <div class="${P}-inner">
    <span class="${P}-label">The Challenge</span>
    <h2 class="${P}-title">Your Finance Team Spends Weeks Preparing for Every BOI Audit</h2>
  </div>
  <div class="${P}-body">
    <p>If your factory holds a BOI certificate — and if you're a manufacturer in Thailand, you almost certainly do — your compliance team is fighting a battle every audit cycle. They're manually reconciling import declarations against production records, building spreadsheets outside your ERP, and hoping the numbers align.</p>

    <p>The root cause is architectural: most ERP systems calculate material consumption from theoretical BOMs. But the <strong>BOI board doesn't audit your BOM</strong> — they audit your actual production consumption, order by order, material by material. When your system can't show that level of detail, the gap between theory and reality becomes supplementary tax.</p>

    <p>One factory was paying over <strong>10 million baht per year</strong> in that gap. This workshop shows you exactly how they eliminated it.</p>

    <div class="${P}-data-card">
      <div class="${P}-data-content">
        <div class="${P}-data-number">10M+ THB/year</div>
        <div class="${P}-data-arrow">&darr;</div>
        <div class="${P}-data-number ${P}-data-number--success">Zero</div>
        <div class="${P}-data-label">Annual supplementary tax — Jin Hai Factory</div>
      </div>
    </div>

    <p class="${P}-case-link">
      <a href="/blog/boi-compliance-jin-hai/">Read the full Jin Hai case study &rarr;</a>
    </p>
  </div>
</div>
  `;

  return base.wrapInDiviSection('The Problem', html, 'The Problem: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === THE PROBLEM (S2) === */
.${P}-section{background:#fff;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{text-align:center;max-width:800px;margin:0 auto 40px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#15803d;display:block;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;line-height:1.25;margin:0 0 16px;padding:0}
.${P}-body{max-width:800px;margin:0 auto}
.${P}-body p{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#333;line-height:1.8;margin:0 0 24px;padding:0}
.${P}-body strong{font-weight:600;color:#000864}
.${P}-data-card{background:linear-gradient(135deg,#0f1419,#1a2632);border-radius:16px;padding:40px;margin:32px 0;text-align:center;position:relative;overflow:hidden}
.${P}-data-card::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none}
.${P}-data-content{position:relative;z-index:2}
.${P}-data-number{font-family:'JetBrains Mono',monospace;font-size:48px;font-weight:500;color:#00AFF0;line-height:1.2;margin-bottom:8px}
.${P}-data-arrow{font-size:32px;color:rgba(255,255,255,0.85);line-height:1.6;margin:4px 0}
.${P}-data-number--success{color:#15803d}
.${P}-data-label{font-family:'Noto Sans',sans-serif;font-size:16px;color:rgba(255,255,255,0.85);margin-top:12px}
.${P}-case-link{text-align:center;margin-top:32px}
.${P}-case-link a{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#15803d;text-decoration:none;transition:color 0.3s ease}
.${P}-case-link a:hover{color:#16a34a}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-body p{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}
.et_pb_section .${P}-label{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-data-number{-webkit-font-smoothing:auto !important;line-height:57.6px !important}
.et_pb_section .${P}-data-label{-webkit-font-smoothing:auto !important}
.et_pb_section .${P}-case-link{-webkit-font-smoothing:auto !important;margin-top:32px !important;padding-bottom:0 !important}
.et_pb_section .${P}-case-link a{-webkit-font-smoothing:auto !important;line-height:27px !important}

@media(max-width:768px){
  .${P}-title{font-size:28px}
  .${P}-body p{font-size:16px}
  .${P}-data-number{font-size:24px}
}
${base.reducedMotion(`.${P}-section *{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
