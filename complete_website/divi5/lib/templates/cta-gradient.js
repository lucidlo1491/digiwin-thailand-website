/**
 * cta-gradient.js — Full-width CTA with gradient background
 *
 * Used by: 10 pages (home, wms, mes, erp, aiot, automotive, electronics, industries, case-studies, partner-program)
 * Bright gradient, cross pattern overlay, two CTAs (primary + ghost).
 * Optional decorative overlays: Super D brand mark + wave-flow element.
 *
 * Data shape:
 * {
 *   adminLabel: string,
 *   sectionPrefix: string,
 *   background: string,            // CSS gradient
 *   padding?: string,
 *   maxWidth?: string,             // default '800px'
 *   title: string,
 *   subtitle: string,
 *   buttons: [{ text, href, style: 'primary'|'ghost' }],
 *   titleFontSize?: string,         // default '40px'
 *   subtitleFontSize?: string,      // default '20px'
 *   subtitleMaxWidth?: string,      // optional max-width on subtitle
 *   superD?: { variant: 'gradient'|'particle'|'outline', position: string, opacity: number, modifiers: string[] },
 *   waveFlow?: { height: string, opacity: number },
 * }
 */

const base = require('./_base');
const superDHelper = require('../super-d');

const schema = {
  name: 'cta-gradient',
  description: 'Full-width CTA banner with gradient background and two buttons',
  category: 'DigiWin Templates',
};

function blocks(data) {
  const p = data.sectionPrefix;

  const buttonsHTML = data.buttons.map(btn =>
    `<a href="${btn.href}" class="${p}-btn ${p}-btn--${btn.style || 'primary'}">${btn.text}</a>`
  ).join('\n        ');

  // Optional decorative overlays injected inside the section wrapper
  const superDHtml = data.superD
    ? superDHelper.html(`${p}-super-d`)
    : '';
  const waveFlowHtml = data.waveFlow
    ? `<div class="${p}-wave-flow" aria-hidden="true"></div>`
    : '';

  const html = `
    <div class="${p}-section">
    ${superDHtml}
    ${waveFlowHtml}
    <div class="${p}-container">
      <h2 class="${p}-title">${data.title}</h2>
      <p class="${p}-subtitle">${data.subtitle}</p>
      <div class="${p}-btn-row">
        ${buttonsHTML}
      </div>
    </div>
    </div>`;

  return base.wrapInDiviSection(data.adminLabel, html, `${data.adminLabel}: Content`);
}

function css(data) {
  const p = data.sectionPrefix;

  // Optional Super D CSS
  const superDCss = data.superD
    ? superDHelper.css(`${p}-super-d`, {
        variant: data.superD.variant || 'gradient',
        position: data.superD.position || 'left',
        opacity: data.superD.opacity ?? 0.16,
        modifiers: data.superD.modifiers || [],
      })
    : '';

  // Optional wave-flow CSS
  const waveFlowCss = data.waveFlow
    ? `.${p}-wave-flow{position:absolute;bottom:0;left:0;right:0;height:${data.waveFlow.height || '220px'};background:linear-gradient(180deg,transparent,rgba(0,60,200,0.15));opacity:${data.waveFlow.opacity ?? 0.45};z-index:1;pointer-events:none}`
    : '';

  return `
/* === ${data.adminLabel.toUpperCase()} === */
.${p}-section{background:${data.background || 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)'};padding:${data.padding || '120px 40px'};position:relative;overflow:hidden;${base.fontSmoothingReset(p)}font-size:16px}
.${p}-section::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='%23fff' stroke-width='0.5' opacity='0.05'/%3E%3C/svg%3E");pointer-events:none;z-index:1}
.${p}-section::after{content:'';position:absolute;bottom:-20%;right:-10%;width:80%;height:80%;background:radial-gradient(ellipse at center,rgba(255,255,255,0.1) 0%,transparent 70%);pointer-events:none;z-index:1}
${superDCss}
${waveFlowCss}
.${p}-container{position:relative;z-index:3;max-width:${data.maxWidth || '700px'};margin:0 auto;text-align:center}
.${p}-title{font-family:'Noto Sans',sans-serif;font-weight:700;font-size:${data.titleFontSize || '40px'};color:#fff;line-height:1.6;margin:0 0 16px}
.${p}-subtitle{font-family:'Noto Sans',sans-serif;font-size:${data.subtitleFontSize || '20px'};color:rgba(255,255,255,0.9);margin:0 0 40px${data.subtitleMaxWidth ? `;max-width:${data.subtitleMaxWidth};margin-left:auto;margin-right:auto` : ''}}
/* Divi overrides — ensure font properties survive Divi cascade */
.et_pb_section .${p}-title{font-weight:700 !important;font-size:${data.titleFontSize || '40px'} !important;line-height:1.6 !important;color:#fff !important}
.et_pb_section .${p}-subtitle{font-weight:400 !important;padding-bottom:0 !important}
.et_pb_section .${p}-container p{padding-bottom:0 !important}
${base.buttonLightCSS(p)}
.${p}-btn{position:static;overflow:visible;display:inline-flex;align-items:center;gap:8px;padding:16px 32px;border-radius:8px;line-height:1.6}
@media(max-width:767px){
  .${p}-title{font-size:28px;margin-bottom:16px}
  .${p}-subtitle{font-size:16px;margin-bottom:32px}
  .${p}-btn-row{flex-direction:column;align-items:stretch;gap:16px}
  .${p}-btn{width:100%;max-width:300px;margin:0 auto;text-align:center}
}
${base.reducedMotion(`.${p}-btn{transition:none !important}.${p}-btn::before{display:none}`)}`.trim();
}

module.exports = { blocks, css, schema };
