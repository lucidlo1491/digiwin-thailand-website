/**
 * event-hero.js — Event Hero Section (S1)
 *
 * Dark gradient hero with event type badge, quick facts bar, and CTA.
 * ContentSpec: Section 1 — Instant clarity: what, when, where + urgency
 */

const base = require('../../lib/templates/_base');

const P = 'evt-hero';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
<div class="${P}-section">
  ${base.grainCSS(`.${P}-section`) ? '' : ''}
  <a href="/news/" class="${P}-back">
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    Back to News &amp; Events
  </a>
  <span class="${P}-badge">Workshop</span>
  <h1>BOI Compliance Workshop: Production-Level Reconciliation That Passes Every Audit</h1>
  <p class="${P}-subtitle">A full-day, hands-on workshop where you'll learn exactly how production-order-level material tracking eliminates BOI supplementary taxes — featuring the Jin Hai case study.</p>

  <div class="${P}-facts">
    <div class="${P}-fact">
      <div class="${P}-fact-icon">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>
      <div class="${P}-fact-value">March 15, 2026</div>
      <div class="${P}-fact-label">Saturday</div>
    </div>
    <div class="${P}-fact">
      <div class="${P}-fact-icon">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="${P}-fact-value">09:00 – 16:00</div>
      <div class="${P}-fact-label">Full Day</div>
    </div>
    <div class="${P}-fact">
      <div class="${P}-fact-icon">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <div class="${P}-fact-value">Bangkok</div>
      <div class="${P}-fact-label">Thailand</div>
    </div>
    <div class="${P}-fact">
      <div class="${P}-fact-icon">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
      </div>
      <div class="${P}-fact-value">30 Seats</div>
      <div class="${P}-fact-label">Limited</div>
    </div>
  </div>

  <a href="/contact/" class="${P}-cta">
    Register Now
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  </a>
</div>
  `;

  return base.wrapInDiviSection('Event Hero', html, 'Event Hero: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === EVENT HERO (S1) === */
.${P}-section{background:linear-gradient(165deg,#0f1419 0%,#1a2632 40%,#000864 100%);padding:140px 24px 80px;text-align:center;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1}
.${P}-section>*{position:relative;z-index:2}
.${P}-back{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:500;color:rgba(255,255,255,0.6);text-decoration:none;margin-bottom:32px;transition:color 0.3s ease}
.${P}-back:hover{color:rgba(255,255,255,0.9)}
.${P}-badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:1.5px;color:#22C55E;background:rgba(34,197,94,0.15);padding:8px 20px;border-radius:50px;margin-bottom:24px}
.${P}-section h1{font-family:'Noto Sans',sans-serif;font-size:clamp(28px,4.5vw,44px);font-weight:700;color:#fff;line-height:1.3;max-width:800px;margin:0 auto 20px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:rgba(255,255,255,0.85);line-height:1.7;max-width:700px;margin:0 auto 40px;padding:0}
.${P}-facts{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:700px;margin:0 auto 40px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px}
.${P}-fact{text-align:center}
.${P}-fact-icon{margin-bottom:8px}
.${P}-fact-icon svg{stroke:#22C55E}
.${P}-fact-value{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#fff}
.${P}-fact-label{font-family:'Noto Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.6)}
.${P}-cta{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#fff;background:#22C55E;padding:16px 32px;border-radius:8px;text-decoration:none;transition:all 0.3s ease;box-shadow:0 4px 14px rgba(34,197,94,0.35)}
.${P}-cta:hover{background:#16a34a;transform:translateY(-2px);box-shadow:0 8px 24px rgba(34,197,94,0.3)}

.et_pb_section .${P}-section h1{-webkit-font-smoothing:auto !important;line-height:1.3 !important;margin:0 auto 20px !important;padding:0 !important}
.et_pb_section .${P}-subtitle{-webkit-font-smoothing:auto !important}
.et_pb_section .${P}-fact-value,.et_pb_section .${P}-fact-label{-webkit-font-smoothing:auto !important}

@media(max-width:768px){
  .${P}-section{padding:120px 20px 60px}
  .${P}-facts{grid-template-columns:repeat(2,1fr);gap:20px}
}
@media(max-width:480px){
  .${P}-facts{grid-template-columns:1fr}
  .${P}-cta{width:100%;justify-content:center}
}
${base.reducedMotion(`.${P}-section *{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
