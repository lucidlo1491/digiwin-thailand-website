/**
 * logo-marquee.js — Logo bar with marquee animation + stats row
 *
 * Supports:
 * - Client logos with Base64 encoding at build time
 * - Seamless marquee loop (real + aria-hidden clones)
 * - Stats row below with divider
 * - Responsive breakpoints
 * - Reduced motion (wraps instead of scrolls)
 *
 * Template: logo-marquee
 */

const fs = require('fs');
const path = require('path');
const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../modules');

const schema = {
  name: 'logo-marquee',
  description: 'Client logo marquee with stats row',
  variants: ['with-stats', 'no-stats'],
};

// ────────────────────────────────────────────────────────────────
// LOGO HELPERS
// ────────────────────────────────────────────────────────────────

function getLogoDataUri(logoDir, filename) {
  const filePath = path.join(logoDir, filename);
  if (!fs.existsSync(filePath)) return null;
  const ext = path.extname(filename).slice(1);
  const mime = ext === 'jpg' ? 'image/jpeg' : 'image/png';
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${b64}`;
}

function logoItemHTML(client, i, prefix, logoDir, ariaHidden) {
  const dataUri = client.logo ? getLogoDataUri(logoDir, client.logo) : null;
  const logoInner = dataUri
    ? `<img src="${dataUri}" alt="${client.name}" loading="lazy" style="max-height:100%;max-width:100%;object-fit:contain;">`
    : `<div class="${prefix}-placeholder" style="background:${client.color}"><span>${client.initials}</span></div>`;
  const ariaAttr = ariaHidden ? ' aria-hidden="true"' : '';
  return `
    <div class="${prefix}-item"${ariaAttr}>
      <div class="${prefix}-logo" data-client="${i + 1}">
        ${logoInner}
      </div>
      <div class="${prefix}-text">
        <div class="${prefix}-name">${client.name}</div>
        <small class="${prefix}-subtitle">${client.subtitle}</small>
      </div>
    </div>`;
}

// ────────────────────────────────────────────────────────────────
// BLOCKS
// ────────────────────────────────────────────────────────────────

function blocks(data) {
  const p = data.sectionPrefix;
  const logoDir = data.logoDir || path.join(__dirname, '..', '..', '..', 'logos');

  const logoItems = data.clients.map((client, i) => logoItemHTML(client, i, p, logoDir, false)).join('');
  const cloneItems = data.clients.map((client, i) => logoItemHTML(client, i, p, logoDir, true)).join('');

  const marqueeHTML = `
<div class="${p}-marquee-wrapper">
  <div class="${p}-marquee">
    ${logoItems}
    ${cloneItems}
  </div>
</div>`;

  const statsHTML = data.stats ? `
<div class="${p}-stats">
  ${data.stats.map(s => `
  <div class="${p}-stat">
    <div class="${p}-stat-value">${s.value}</div>
    <div class="${p}-stat-label">${s.label}</div>
  </div>`).join('')}
</div>` : '';

  const html = `<div class="${p}-section"><p class="${p}-label">${data.label}</p>${marqueeHTML}${statsHTML}</div>`;

  return [
    sectionOpen({
      adminLabel: data.adminLabel,
      css: 'selector{background:transparent !important;padding:0 !important;}',
    }),
    rowOpen({
      adminLabel: `${data.adminLabel}: Row`,
      columns: 'equal-columns_1',
      css: 'selector{max-width:100% !important;margin:0 !important;padding:0 !important;}',
    }),
    columnOpen({
      adminLabel: `${data.adminLabel}: Column`,
      layout: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
      css: 'selector{display:flex !important;flex-direction:column !important;align-items:center !important;gap:0 !important;}',
    }),
    codeModule(html, `${data.adminLabel}: Label + Marquee + Stats`),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

// ────────────────────────────────────────────────────────────────
// CSS
// ────────────────────────────────────────────────────────────────

function css(data) {
  const p = data.sectionPrefix;
  const s = data.spec || {};
  const hasStats = !!data.stats;

  const bg = s.background || 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)';
  const padding = s.padding || '60px 0';
  const logoHeight = s.logoHeight || '108px';
  const logoMaxWidth = s.logoMaxWidth || '126px';
  const filterDefault = s.filterDefault || 'grayscale(100%) opacity(0.45)';
  const filterHover = s.filterHover || 'grayscale(0%) opacity(1)';
  const nameSize = s.nameSize || '30px';
  const nameWeight = s.nameWeight || '600';
  const nameColor = s.nameColor || '#334155';
  const nameOpacity = s.nameOpacity || '0.55';
  const subtitleSize = s.subtitleSize || '16px';
  const labelColor = s.labelColor || '#5b6b80';
  const marqueeSpeed = s.marqueeSpeed || '35s';
  const marqueeGap = s.marqueeGap || '60px';
  const maskImage = s.maskImage || 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)';

  return `
/* ===== LOGO MARQUEE SECTION ===== */
.${p}-section{
  background:${bg};
  padding:${padding};
  -webkit-font-smoothing:auto;
  -moz-osx-font-smoothing:auto;
  font-size:16px;
  overflow:hidden;
  position:relative;
  width:100%;
  max-width:100vw;
}
.${p}-label{
  font-family:'JetBrains Mono',monospace;
  font-size:13px;
  font-weight:500;
  text-transform:uppercase;
  letter-spacing:0.15em;
  color:${labelColor};
  text-align:center;
  line-height:1.6;
  margin:0 0 48px;
  padding:0;
}
.${p}-marquee-wrapper{
  width:100%;
  overflow:hidden;
  position:relative;
  padding:0;
  margin:0 0 48px;
  mask-image:${maskImage};
  -webkit-mask-image:${maskImage};
}
.${p}-marquee{
  display:flex;
  gap:${marqueeGap};
  animation:${p}-scroll ${marqueeSpeed} linear infinite;
  width:max-content;
}
.${p}-marquee:hover{
  animation-play-state:paused;
}
@keyframes ${p}-scroll{
  0%{transform:translateX(0)}
  100%{transform:translateX(-50%)}
}
.${p}-item{
  display:flex;
  align-items:center;
  gap:24px;
  flex-shrink:0;
  transition:all 0.4s ease;
}
.${p}-logo{
  height:${logoHeight};
  max-width:${logoMaxWidth};
  display:flex;
  align-items:center;
  justify-content:center;
  transition:filter 0.4s ease;
  filter:${filterDefault};
}
.${p}-item:hover .${p}-logo{
  filter:${filterHover};
}
.${p}-placeholder{
  width:${logoHeight};
  height:${logoHeight};
  border-radius:12px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-family:'Noto Sans',sans-serif;
  font-size:32px;
  font-weight:700;
  letter-spacing:-0.02em;
}
.${p}-text{
  display:flex;
  flex-direction:column;
  gap:4px;
}
.${p}-name{
  font-family:'Noto Sans',sans-serif;
  font-size:${nameSize};
  font-weight:${nameWeight};
  color:${nameColor};
  opacity:${nameOpacity};
  line-height:1.25;
  transition:opacity 0.4s ease;
}
.${p}-item:hover .${p}-name{
  opacity:1;
}
.${p}-subtitle{
  font-family:'Noto Sans',sans-serif;
  font-size:${subtitleSize};
  font-weight:400;
  color:${labelColor};
  text-transform:uppercase;
  letter-spacing:0.06em;
  line-height:1.25;
  margin-top:4px;
}

${hasStats ? `/* ===== STATS ROW ===== */
.${p}-stats{
  display:flex;
  gap:60px;
  justify-content:center;
  align-items:center;
  padding:32px 40px 0;
  border-top:1px solid #e2e8f0;
  max-width:1200px;
  margin:0 auto;
}
.${p}-stat{
  display:block;
  text-align:center;
}
.${p}-stat-value{
  font-family:'Noto Sans',sans-serif;
  font-size:28px;
  font-weight:700;
  color:#000864;
  line-height:1.2;
  letter-spacing:normal;
}
.${p}-stat-label{
  font-family:'Noto Sans',sans-serif;
  font-size:13px;
  color:${labelColor};
  text-align:center;
  line-height:1.6;
  margin-top:4px;
}` : ''}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .${p}-marquee{gap:48px}
  .${p}-logo{height:80px;max-width:96px}
  .${p}-placeholder{width:80px;height:80px;font-size:24px}
  .${p}-name{font-size:24px}
  .${p}-subtitle{font-size:13px}
  ${hasStats ? `.${p}-stats{gap:40px}` : ''}
}
@media(max-width:768px){
  .${p}-marquee{gap:40px}
  .${p}-logo{height:64px;max-width:76px}
  .${p}-placeholder{width:64px;height:64px;font-size:20px}
  .${p}-name{font-size:20px}
  .${p}-subtitle{font-size:11px}
  ${hasStats ? `.${p}-stats{flex-direction:column;gap:24px;padding-top:24px}
  .${p}-stat-value{font-size:24px}
  .${p}-stat-label{font-size:12px}` : ''}
}
@media(max-width:640px){
  .et_pb_section .et_pb_row{padding:0 24px !important}
  .${p}-marquee-wrapper{padding:40px 0}
  .${p}-marquee{gap:36px}
  .${p}-logo{height:52px;max-width:60px}
  .${p}-placeholder{width:52px;height:52px;font-size:16px;border-radius:8px}
  .${p}-item{gap:16px}
  .${p}-name{font-size:16px}
  .${p}-subtitle{display:none}
  ${hasStats ? `.${p}-stat-value{font-size:20px}
  .${p}-stat-label{font-size:11px}` : ''}
}

/* ===== REDUCED MOTION ===== */
@media(prefers-reduced-motion:reduce){
  .${p}-marquee{
    animation:none;
    flex-wrap:wrap;
    justify-content:center;
    width:100%;
  }
  .${p}-item[aria-hidden="true"]{
    display:none;
  }
  .${p}-marquee-wrapper{
    mask-image:none;
    -webkit-mask-image:none;
  }
}`;
}

module.exports = { blocks, css, schema };
