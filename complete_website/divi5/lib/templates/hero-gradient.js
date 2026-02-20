/**
 * hero-gradient.js — Hero section template with gradient backgrounds
 *
 * Supports:
 * - Single panel (most pages) or dual-panel split (homepage)
 * - Gradient backgrounds per panel
 * - SVG illustration injection via Base64 (wp_kses bypass)
 * - Content slots: label, title, subtitle, buttons, stats
 * - Grain texture overlay
 * - Light leak effect (optional)
 * - Responsive breakpoints
 * - Reduced motion support
 *
 * Template: hero-gradient
 */

const { codeModule, htmlBlock, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../modules');

const schema = {
  name: 'hero-gradient',
  description: 'Gradient hero with SVG illustrations and optional dual-panel split',
  variants: ['single-panel', 'dual-panel'],
};

// ────────────────────────────────────────────────────────────────
// HTML GENERATORS
// ────────────────────────────────────────────────────────────────

function panelHTML(panel, prefix, i) {
  const p = `${prefix}-panel--${panel.id}`;
  const svgContainerId = `${prefix}-svg-${panel.id}`;

  const statsHTML = panel.stats ? `
      <div class="${prefix}-stats">
        ${panel.stats.map(s => `
        <div class="${prefix}-stat">
          <div class="${prefix}-stat-number${s.white ? ` ${prefix}-stat-number--white` : ''}"${s.dynamic ? ' data-dw-years' : ''}>${s.value}</div>
          <div class="${prefix}-stat-label">${s.label}</div>
        </div>`).join('')}
      </div>` : '';

  const buttonsHTML = panel.buttons ? `
      <div class="${prefix}-btn-row">
        ${panel.buttons.map(b => `<a href="${b.href}" class="${prefix}-btn ${prefix}-btn--${b.style || 'primary'}">${b.text}</a>`).join('')}
      </div>` : '';

  return `
  <div class="${prefix}-panel ${p}">
    <div id="${svgContainerId}" class="${prefix}-svg-illustration ${prefix}-svg-illustration--${panel.id}"></div>
    <div class="${prefix}-grain${panel.grainVariant ? ` ${prefix}-grain--${panel.grainVariant}` : ''}"></div>
    ${panel.lightLeak ? `<div class="${prefix}-light-leak"></div>` : ''}
    <div class="${prefix}-content">
      <p class="${prefix}-label ${prefix}-label--${panel.id}">${panel.label}</p>
      <${panel.headingTag || (i === 0 ? 'h1' : 'h2')} class="${prefix}-title">${panel.title}</${panel.headingTag || (i === 0 ? 'h1' : 'h2')}>
      <p class="${prefix}-subtitle">${panel.subtitle}</p>
      ${buttonsHTML}
      ${statsHTML}
    </div>
  </div>`;
}

function heroHTML(data) {
  const p = data.sectionPrefix;
  const panelsMarkup = data.panels.map((panel, i) => panelHTML(panel, p, i)).join('\n');
  return `<div class="${p}-split">${panelsMarkup}</div>`;
}

// ────────────────────────────────────────────────────────────────
// SCRIPT GENERATOR (SVG injection + reduced-motion + dynamic year)
// ────────────────────────────────────────────────────────────────

function heroJS(data) {
  const p = data.sectionPrefix;
  const svgInjections = data.panels
    .filter(panel => panel.svgRaw)
    .map(panel => {
      const b64 = Buffer.from(typeof panel.svgRaw === 'function' ? panel.svgRaw() : panel.svgRaw).toString('base64');
      return `{id:'${p}-svg-${panel.id}',b64:'${b64}'${panel.freezeTrigger ? ',freeze:1' : ''}}`;
    });

  if (svgInjections.length === 0 && !data.dynamicYear) return '';

  return `<script>
(function(){
${svgInjections.length ? `function u8(b){return decodeURIComponent(Array.from(atob(b),function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
var svgs=[${svgInjections.join(',')}];
svgs.forEach(function(s){var el=document.getElementById(s.id);if(el){el.innerHTML=u8(s.b64);if(s.freeze)el.setAttribute('data-freeze-trigger','');}});` : ''}
var rm=window.matchMedia('(prefers-reduced-motion:reduce)');
function handleMotion(){
if(rm.matches){
document.querySelectorAll('.${p}-svg-illustration animate,.${p}-svg-illustration animateTransform,.${p}-svg-illustration animateMotion')
.forEach(function(el){el.remove()});
}}
handleMotion();
rm.addEventListener('change',handleMotion);
${data.dynamicYear ? `var yrs=new Date().getFullYear()-1982;
document.querySelectorAll('[data-dw-years]').forEach(function(el){el.textContent=yrs});` : ''}
${data.freezeTrigger !== false ? `if(!rm.matches){if('IntersectionObserver' in window){
document.querySelectorAll('[data-freeze-trigger]').forEach(function(wrapper){
var obs=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
wrapper.querySelectorAll('[data-freeze]').forEach(function(anim){
try{anim.beginElement()}catch(e){}
});
}
});
},{threshold:0.3});
obs.observe(wrapper);
});
}}` : ''}
})();
</script>`;
}

// ────────────────────────────────────────────────────────────────
// BLOCKS
// ────────────────────────────────────────────────────────────────

function blocks(data) {
  const js = heroJS(data);
  const result = [
    sectionOpen({
      adminLabel: data.adminLabel,
      css: `selector{background:${data.sectionBg || '#000432'} !important;padding:0 !important;margin:0 !important;}`,
    }),
    rowOpen({
      adminLabel: `${data.adminLabel}: Row`,
      columns: 1,
      css: 'selector{max-width:100% !important;width:100% !important;margin:0 !important;padding:0 !important;}',
    }),
    columnOpen({ css: 'selector{width:100% !important;padding:0 !important;}' }),
    codeModule(heroHTML(data), `${data.adminLabel}: Content`),
  ];

  if (js) result.push(htmlBlock(js));

  result.push(columnClose());
  result.push(rowClose());
  result.push(sectionClose());
  return result;
}

// ────────────────────────────────────────────────────────────────
// CSS
// ────────────────────────────────────────────────────────────────

function css(data) {
  const p = data.sectionPrefix;
  const isDual = data.panels.length > 1;
  const hasLightLeak = data.panels.some(panel => panel.lightLeak);
  const hasGrainVariant = data.panels.some(panel => panel.grainVariant);
  const sectionBg = data.sectionBg || '#000432';

  // Panel gradient CSS
  const panelGradients = data.panels.map(panel =>
    `.${p}-panel--${panel.id}{background:${panel.gradient}}`
  ).join('\n');

  // Panel-specific label colors
  const labelColors = data.panels.map(panel =>
    panel.labelColor
      ? `.${p}-label--${panel.id}{color:${panel.labelColor}}\n.${p}-label--${panel.id}::before{background:linear-gradient(90deg,transparent,${panel.labelColor})}`
      : ''
  ).filter(Boolean).join('\n');

  // Highlight spans (e.g. .hl-blue, .hl-gold)
  const highlights = (data.highlights || []).map(h =>
    `.${p}-title .${h.class}{color:${h.color}}`
  ).join('\n');

  // Button ghost margin for dual panel
  const ghostMargin = isDual ? `.${p}-btn-row .${p}-btn--ghost{margin-left:12px}` : '';

  // Stats number variants
  const whiteStats = data.panels.some(panel => panel.stats && panel.stats.some(s => s.white));

  return `
/* === THEME BUILDER FULL-BLEED OVERRIDES === */
.et_pb_section_0_tb_body{background:${sectionBg} !important;padding:0 !important;margin:0 !important;width:100% !important}
.et_pb_row_0_tb_body{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important}
.et_pb_column_0_tb_body{padding:0 !important;width:100% !important}
.et_pb_post_content_0_tb_body{width:100% !important;max-width:100% !important}
.et_pb_row_1_tb_body{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important}
.et_pb_column_1_tb_body{width:100% !important;padding:0 !important}

/* === PAGE-LEVEL DIVI WRAPPER RESETS === */
.et_pb_section_0{background:${sectionBg} !important;padding:0 !important;margin:0 !important}
.et_pb_section_0 .et_pb_row{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important}
.et_pb_section_0 .et_pb_column{width:100% !important;padding:0 !important}
.et_pb_section_0 .et_pb_code,.et_pb_section_0 .et_pb_code_inner{position:static !important;overflow:visible !important}

/* === SPLIT SCREEN GRID === */
.${p}-split{
  display:grid;
  grid-template-columns:${isDual ? '1fr 1fr' : '1fr'};
  min-height:calc(100vh - 80px);
  margin-top:80px;
  position:relative;
  overflow:hidden;
  background-color:${sectionBg};
  -webkit-font-smoothing:auto;
  -moz-osx-font-smoothing:auto;
  width:100vw;
  margin-left:calc(-50vw + 50%);
}

/* === PANELS === */
.${p}-panel{
  position:relative;
  overflow:hidden;
  padding:${data.panelPadding || '80px 60px'};
  display:flex;
  flex-direction:column;
  justify-content:center;
}
${panelGradients}

/* === SVG ILLUSTRATIONS === */
.${p}-svg-illustration{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1;opacity:${data.svgOpacity || '0.45'}}
.${p}-svg-illustration svg{width:100%;height:100%;display:block}

/* === CONTENT === */
.${p}-content{position:relative;z-index:2;max-width:${data.contentMaxWidth || '520px'}}

/* === LABELS === */
.${p}-label{font-family:'JetBrains Mono',monospace !important;font-size:14px !important;font-weight:600 !important;text-transform:uppercase;letter-spacing:0.15em;line-height:1.6;color:#00AFF0;margin:0 0 24px;padding:0;display:flex;align-items:center;gap:12px}
.${p}-label::before{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,#00AFF0);flex-shrink:0}
${labelColors}

/* === TITLES === */
.${p}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,52px);font-weight:700;color:#fff;margin:0 0 24px;line-height:1.1;letter-spacing:-0.03em}
${highlights}

/* === SUBTITLES === */
.${p}-subtitle{font-family:'Noto Sans',sans-serif !important;font-size:18px !important;font-weight:400 !important;color:rgba(255,255,255,0.75);margin:0 0 36px;line-height:1.75;max-width:500px}

/* === BUTTONS === */
.${p}-btn{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;line-height:1.6;padding:16px 32px;border-radius:8px;cursor:pointer;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);text-decoration:none;display:inline-flex !important;align-items:center;position:relative;overflow:hidden;border:2px solid transparent;box-sizing:border-box}
.${p}-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left 0.5s}
.${p}-btn:hover::before{left:100%}
.${p}-btn--primary{background:#006dac;color:#fff;box-shadow:0 4px 14px rgba(0,175,240,0.35);gap:8px}
.${p}-btn--primary:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45)}
.${p}-btn--ghost{background:rgba(255,255,255,0.15);color:#fff;border-color:rgba(255,255,255,0.9);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);gap:8px}
.${p}-btn--ghost:hover{background:#fff;color:#0369a1;border-color:#fff}
.${p}-btn-row{display:flex;align-items:center;gap:12px;max-width:520px;font-size:16px;flex-wrap:wrap}
${ghostMargin}

/* === STATS === */
.${p}-stats{display:flex;gap:40px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1);max-width:520px}
.${p}-stat-number{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:800;color:#00AFF0;line-height:1;margin-bottom:8px;letter-spacing:-0.02em}
${whiteStats ? `.${p}-stat-number--white{color:#fff}` : ''}
.${p}-stat-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:400;color:rgba(255,255,255,0.75);text-transform:uppercase;letter-spacing:0.1em;line-height:1.6}

/* === GRAIN TEXTURE OVERLAY === */
.${p}-grain{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1}
.${p}-grain::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1;animation:${p}-grain 8s steps(10) infinite}
${hasGrainVariant ? `.${p}-grain--partner::before{opacity:0.04;animation:none}` : ''}

${hasLightLeak ? `/* === LIGHT LEAK === */
.${p}-light-leak{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1}
.${p}-light-leak::after{content:'';position:absolute;top:-50%;right:-30%;width:80%;height:150%;background:radial-gradient(ellipse at center,rgba(255,255,255,0.15) 0%,transparent 60%);pointer-events:none;z-index:1}` : ''}

/* === RESPONSIVE === */
@media(max-width:1024px){
  .${p}-split{grid-template-columns:1fr;min-height:auto}
  .${p}-panel{min-height:${isDual ? '70vh' : '60vh'};padding:60px 40px}
  .${p}-stats{gap:24px;flex-wrap:wrap}
  .${p}-title{font-size:32px}
  .${p}-subtitle{font-size:16px}
}
@media(max-width:640px){
  .${p}-panel{padding:48px 24px;min-height:${isDual ? '80vh' : '70vh'}}
  .${p}-stats{flex-direction:column;gap:24px}
  .${p}-btn-row{flex-direction:column}
  .${p}-btn{text-align:center}
}

/* === ADMIN BAR COMPENSATION === */
body.admin-bar .${p}-split{margin-top:48px;min-height:calc(100vh - 80px)}

/* === REDUCED MOTION === */
@media(prefers-reduced-motion:reduce){
  .${p}-grain::before{animation:none}
  .${p}-btn::before{transition:none}
  .${p}-svg-illustration{opacity:0.25}
}

/* === GRAIN ANIMATION KEYFRAME === */
@keyframes ${p}-grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%,0%)}70%{transform:translate(0%,15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}}`;
}

module.exports = { blocks, css, schema };
