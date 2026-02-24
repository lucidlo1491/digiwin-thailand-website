/**
 * event-hero.js — Event Hero Template
 *
 * Dark gradient hero with event type badge, quick facts bar, CTA, and back link.
 *
 * Data shape:
 * {
 *   sectionPrefix: string,         // CSS prefix (e.g. 'evt-hero')
 *   color: string,                 // accent hex (e.g. '#15803d')
 *   badge: string,                 // e.g. 'Workshop', 'Seminar'
 *   title: string,                 // H1 text
 *   subtitle: string,              // paragraph below H1
 *   backLink: { text, href },      // e.g. { text: 'Back to News & Events', href: '/news/' }
 *   facts: [{ icon, value, label }], // 4 items — icon is SVG inner markup
 *   cta: { text, href },
 *   superD?: { variant, position, opacity }, // default: particle, corner-br, 0.15
 * }
 */

const base = require('./_base');
const superD = require('../super-d');

const schema = {
  description: 'Dark gradient event hero with badge, facts bar, and CTA',
  category: 'event',
};

function blocks(data) {
  const P = data.sectionPrefix;
  const sdClass = `${P}-superd`;

  const factsHTML = data.facts.map(f => `
      <div class="${P}-fact">
        <div class="${P}-fact-icon">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">${f.icon}</svg>
        </div>
        <div class="${P}-fact-value">${f.value}</div>
        <div class="${P}-fact-label">${f.label}</div>
      </div>`).join('\n');

  const html = `
<div class="${P}-section">
  ${superD.html(sdClass)}
  <a href="${data.backLink.href}" class="${P}-back">
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    ${data.backLink.text}
  </a>
  <span class="${P}-badge">${data.badge}</span>
  <h1>${data.title}</h1>
  <p class="${P}-subtitle">${data.subtitle}</p>

  <div class="${P}-facts">
    ${factsHTML}
  </div>

  <a href="${data.cta.href}" class="${P}-cta">
    ${data.cta.text}
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  </a>
</div>
  `;

  return base.wrapInDiviSection(data.adminLabel || 'Event Hero', html, 'Event Hero: Content');
}

function css(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);
  const sd = data.superD || { variant: 'particle', position: 'corner-br', opacity: 0.15 };

  return `
/* === EVENT HERO === */
.${P}-section{background:linear-gradient(165deg,#0f1419 0%,#1a2632 40%,#000864 100%);padding:140px 24px 80px;text-align:center;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1}
.${P}-section>*{position:relative;z-index:2}
.${P}-back{display:inline-flex;align-items:center;gap:6px;font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:500;color:rgba(255,255,255,0.85);text-decoration:none;margin-bottom:24px;transition:color 0.3s ease}
.${P}-back:hover{color:rgba(255,255,255,0.9)}
.${P}-badge{display:inline-flex;align-items:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:1.5px;color:${c.hex};background:${c.bg15};padding:6px 18px;border:1px solid ${c.bg30};border-radius:50px;margin-bottom:20px}
.${P}-section h1{font-family:'Noto Sans',sans-serif;font-size:clamp(28px,4.5vw,44px);font-weight:700;color:#fff;line-height:1.2;max-width:800px;margin:0 auto 20px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:rgba(255,255,255,0.85);line-height:1.7;max-width:700px;margin:0 auto 40px;padding:0}
.${P}-facts{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:700px;margin:0 auto 40px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px}
.${P}-fact{text-align:center}
.${P}-fact-icon{margin-bottom:8px}
.${P}-fact-icon svg{stroke:${c.hex}}
.${P}-fact-value{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#fff}
.${P}-fact-label{font-family:'Noto Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.85)}
.${P}-cta{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#fff;background:${c.hex};padding:16px 40px;border-radius:12px;text-decoration:none;transition:all 0.3s ease;box-shadow:0 4px 20px ${c.shadow40}}
.${P}-cta:hover{background:${c.hover};transform:translateY(-2px);box-shadow:0 8px 24px ${c.shadow30}}

.et_pb_section .${P}-section h1{-webkit-font-smoothing:auto !important;line-height:1.2 !important;max-width:800px !important;margin:0 auto 20px !important;padding:0 !important}
.et_pb_section .${P}-subtitle{-webkit-font-smoothing:auto !important}
.et_pb_section .${P}-fact-value{-webkit-font-smoothing:auto !important;line-height:25.6px !important;margin-bottom:4px !important}
.et_pb_section .${P}-fact-label{-webkit-font-smoothing:auto !important;line-height:20.8px !important}
.et_pb_section .${P}-badge{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-cta{-webkit-font-smoothing:auto !important;line-height:25.6px !important}
.et_pb_section .${P}-back{-webkit-font-smoothing:auto !important}
${superD.css(`${P}-superd`, { variant: sd.variant, position: sd.position, opacity: sd.opacity })}

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

module.exports = { blocks, css, schema };
