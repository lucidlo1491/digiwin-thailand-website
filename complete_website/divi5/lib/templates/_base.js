/**
 * _base.js — Shared template foundation for Divi 5 section templates
 *
 * Every template imports this. Provides:
 * - Divi block wrappers (section + row + column + code module)
 * - Section header HTML/CSS generators (dark/light)
 * - Font-smoothing resets
 * - Responsive breakpoint helpers
 * - Reduced-motion helper
 * - Button CSS generators
 * - Divi list-style quirk resets (diviListReset)
 * - Design token color constants (COLORS)
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../modules');
const superD = require('../super-d');

// ────────────────────────────────────────────────────────────────
// BREAKPOINTS — single source of truth for all templates
// ────────────────────────────────────────────────────────────────
const BREAKPOINTS = { tablet: 1024, mobile: 768, small: 480 };

// ────────────────────────────────────────────────────────────────
// COLORS — design token values (must match CSS custom properties)
// Use these instead of hardcoding hex values in templates.
// Source of truth: design-system.md + styles.css :root block.
// ────────────────────────────────────────────────────────────────
const COLORS = {
  grayLight: '#F5F7FA',  // --dw-gray-light (NOT #f8fafc)
  navy:      '#000864',  // --dw-navy
  navyDeep:  '#000432',  // --dw-navy-deep
  blue:      '#00AFF0',  // --dw-blue (Smart Blue)
  royal:     '#003CC8',  // --dw-royal
  cyan:      '#00E6FF',  // --dw-cyan
};

// ────────────────────────────────────────────────────────────────
// DIVI BLOCK WRAPPERS
// ────────────────────────────────────────────────────────────────

/**
 * Wrap HTML content in a full-width Divi section + row + column + code module.
 * This is the standard pattern for every template section.
 *
 * @param {string} adminLabel — Section label in VB Layers panel
 * @param {string} html — HTML content for the code module
 * @param {string} codeLabel — Code module label in VB
 * @param {object} [opts] — { superDClass, superDVariant, superDPosition, superDOpacity, superDLabel }
 * @returns {string[]} Array of block markup strings
 */
function wrapInDiviSection(adminLabel, html, codeLabel, opts = {}) {
  const blocks = [
    sectionOpen({
      adminLabel,
      css: 'selector{background:transparent !important;padding:0 !important;}',
    }),
    rowOpen({
      adminLabel: `${adminLabel}: Row`,
      css: 'selector{max-width:100% !important;margin:0 !important;padding:0 !important;}',
    }),
    columnOpen({
      adminLabel: `${adminLabel}: Column`,
      css: 'selector{width:100% !important;padding:0 !important;}',
    }),
  ];

  // Optional Super D decoration
  if (opts.superDClass) {
    blocks.push(codeModule(
      superD.html(opts.superDClass),
      opts.superDLabel || `Decoration: Super D`
    ));
  }

  blocks.push(codeModule(html, codeLabel));
  blocks.push(columnClose());
  blocks.push(rowClose());
  blocks.push(sectionClose());

  return blocks;
}

// ────────────────────────────────────────────────────────────────
// SECTION HEADER — HTML generators
// ────────────────────────────────────────────────────────────────

/**
 * Generate centered section header HTML (label + title + subtitle).
 * Uses flanking lines (::before/::after) on the label.
 *
 * @param {string} prefix — CSS class prefix (e.g. 'pchecks')
 * @param {object} header — { label, title, subtitle }
 * @returns {string} HTML string
 */
function sectionHeaderHTML(prefix, header) {
  return `
    <div class="${prefix}-header">
      <div class="${prefix}-header-label">${header.label}</div>
      <h2 class="${prefix}-title">${header.title}</h2>
      ${header.subtitle ? `<p class="${prefix}-subtitle">${header.subtitle}</p>` : ''}
    </div>`;
}

/**
 * Generate section header HTML with span-based flanking lines.
 * Used by dark themes where ::before/::after is styled differently.
 *
 * @param {string} prefix — CSS class prefix
 * @param {object} header — { label, title, subtitle }
 * @returns {string} HTML string
 */
function sectionHeaderSpanHTML(prefix, header) {
  return `
    <div class="${prefix}-header">
      <div class="${prefix}-label">
        <span class="${prefix}-label-line"></span>
        <span class="${prefix}-label-text">${header.label}</span>
        <span class="${prefix}-label-line"></span>
      </div>
      <h2 class="${prefix}-title">${header.title}</h2>
      ${header.subtitle ? `<p class="${prefix}-subtitle">${header.subtitle}</p>` : ''}
    </div>`;
}

// ────────────────────────────────────────────────────────────────
// SECTION HEADER — CSS generators
// ────────────────────────────────────────────────────────────────

/**
 * Generate centered section header CSS with flanking lines via ::before/::after.
 *
 * @param {string} p — CSS class prefix
 * @param {object} opts — { dark, headerMaxWidth, headerMarginBottom }
 * @returns {string} CSS string
 */
function sectionHeaderCSS(p, opts = {}) {
  const dark = opts.dark || false;
  const titleColor = dark ? '#fff' : '#000864';
  const subtitleColor = dark ? 'rgba(255,255,255,0.75)' : '#5b6b80';
  const labelColor = dark ? 'rgba(255,255,255,0.75)' : '#0369a1';
  const lineColor = dark ? 'rgba(255,255,255,0.4)' : '#00AFF0';
  const maxWidth = opts.headerMaxWidth || '700px';
  const marginBottom = opts.headerMarginBottom || '64px';

  return `
.${p}-header{text-align:center;max-width:${maxWidth};margin:0 auto ${marginBottom};position:relative;z-index:2}
.${p}-header-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.2em;color:${labelColor};margin-bottom:16px;line-height:1.6;display:flex;align-items:center;justify-content:center;gap:12px}
.${p}-header-label::before,.${p}-header-label::after{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,${lineColor});flex-shrink:0}
.${p}-header-label::after{transform:scaleX(-1)}
.${p}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,44px);font-weight:700;color:${titleColor};line-height:1.15;letter-spacing:-0.02em;margin:0 0 16px;padding:0}
.${p}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:${subtitleColor};line-height:1.6;max-width:600px;margin:0 auto;padding:0}`;
}

/**
 * Generate section header CSS with span-based flanking lines.
 *
 * @param {string} p — CSS class prefix
 * @param {object} opts — { dark, headerMaxWidth, headerMarginBottom }
 * @returns {string} CSS string
 */
function sectionHeaderSpanCSS(p, opts = {}) {
  const dark = opts.dark || false;
  const titleColor = dark ? '#ffffff' : '#000864';
  const subtitleColor = dark ? 'rgba(255,255,255,0.75)' : '#5b6b80';
  const labelColor = dark ? 'rgba(255,255,255,0.75)' : '#0369a1';
  const lineColor = dark ? 'rgba(255,255,255,0.4)' : '#00AFF0';
  const maxWidth = opts.headerMaxWidth || '900px';
  const marginBottom = opts.headerMarginBottom || '80px';

  return `
.${p}-header{text-align:center;max-width:${maxWidth};margin:0 auto ${marginBottom};position:relative;z-index:2}
.${p}-label{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:24px}
.${p}-label-line{width:40px;height:1px;background:linear-gradient(90deg,transparent,${lineColor});flex-shrink:0}
.${p}-label-line:last-child{transform:scaleX(-1)}
.${p}-label-text{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${labelColor};line-height:1.6}
.${p}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,44px);font-weight:700;line-height:1.15;letter-spacing:-0.02em;color:${titleColor};margin:0 0 16px;padding:0}
.${p}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;line-height:1.6;color:${subtitleColor};margin:0 auto;max-width:600px;padding:0}`;
}

// ────────────────────────────────────────────────────────────────
// CSS HELPERS
// ────────────────────────────────────────────────────────────────

/**
 * Font-smoothing reset — required for every section (Divi defaults to antialiased).
 * @param {string} p — CSS class prefix
 * @returns {string} CSS string
 */
function fontSmoothingReset(p) {
  return `-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;`;
}

/**
 * Responsive grid CSS — collapses columns at breakpoints.
 *
 * @param {string} p — CSS class prefix
 * @param {object} opts — { gridCols, gridSelector, sectionSelector }
 * @returns {string} CSS string
 */
function responsiveCSS(p, opts = {}) {
  const gridCols = opts.gridCols || 3;
  const gridSel = opts.gridSelector || `.${p}-grid`;
  const sectionSel = opts.sectionSelector || `.${p}-section`;
  const tabletCols = gridCols > 2 ? 2 : 1;

  return `
@media(max-width:${BREAKPOINTS.tablet}px){
  ${gridSel}{grid-template-columns:repeat(${tabletCols},1fr)}
  .${p}-title{font-size:40px}
  .${p}-subtitle{font-size:18px}
}
@media(max-width:${BREAKPOINTS.mobile}px){
  ${sectionSel}{padding:80px 24px !important}
  .${p}-header{margin-bottom:60px}
  ${gridSel}{grid-template-columns:1fr;gap:24px}
  .${p}-title{font-size:32px}
  .${p}-subtitle{font-size:16px}
}
@media(max-width:${BREAKPOINTS.small}px){
  ${sectionSel}{padding:60px 20px !important}
  .${p}-header{margin-bottom:48px}
  .${p}-title{font-size:28px}
}`;
}

/**
 * Reduced motion media query wrapper.
 * @param {string} rules — CSS rules to apply when reduced motion is preferred
 * @returns {string} CSS string
 */
function reducedMotion(rules) {
  return `@media(prefers-reduced-motion:reduce){${rules}}`;
}

/**
 * Button CSS for dark backgrounds.
 * @param {string} p — CSS class prefix
 * @returns {string} CSS string
 */
function buttonCSS(p) {
  return `
.${p}-cta-wrapper{text-align:center}
.${p}-cta{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;line-height:1.6;color:#ffffff;background:#006dac;padding:16px 32px;border-radius:8px;text-decoration:none;transition:all 0.3s ease;box-shadow:0 4px 14px rgba(0,175,240,0.35)}
.${p}-cta:hover{background:#0099D6;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,175,240,0.3)}`;
}

/**
 * Button CSS for bright/gradient backgrounds (white buttons).
 * @param {string} p — CSS class prefix
 * @returns {string} CSS string
 */
function buttonLightCSS(p) {
  return `
.${p}-btn{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;padding:16px 32px;border-radius:8px;cursor:pointer;transition:all 0.3s ease;text-decoration:none;display:inline-flex;align-items:center;gap:8px;position:relative;overflow:hidden;border:none;line-height:1.6}
.${p}-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left 0.5s}
.${p}-btn:hover::before{left:100%}
.${p}-btn--primary{background:#fff;color:#003CC8;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.15)}
.${p}-btn--primary:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,0.2)}
.${p}-btn--ghost{background:transparent;color:#fff;border:2px solid rgba(255,255,255,0.6)}
.${p}-btn--ghost:hover{background:rgba(255,255,255,0.15);border-color:#fff}
.${p}-btn-row{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;position:relative;z-index:2}`;
}

/**
 * Super D CSS — generates decoration CSS from options.
 * @param {string} className — decoration class name
 * @param {object} opts — passed to super-d.css()
 * @returns {string} CSS string
 */
function superDCSS(className, opts) {
  return superD.css(className, opts);
}

/**
 * Grain texture CSS for noise overlay.
 * @param {string} selector — CSS selector
 * @returns {string} CSS string
 */
function grainCSS(selector) {
  return `${selector}::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1}`;
}

/**
 * Reset Divi's default list-style overrides.
 *
 * Divi injects global styles that add bullets/numbers and padding to ul/ol/li.
 * This reset strips all of that so templates have a clean slate to style lists
 * however they need.  Apply per-section using the section's CSS prefix.
 *
 * @param {string} prefix — CSS class prefix (e.g. 'pchecks', 'solutions')
 * @returns {string} CSS string
 */
function diviListReset(prefix) {
  return `.${prefix} ul,.${prefix} ol{list-style:none !important;padding:0 !important;margin:0 !important}` +
    `.${prefix} li{list-style:none !important;padding:0 !important}` +
    `.${prefix} li::before{display:none !important}`;
}

module.exports = {
  BREAKPOINTS,
  COLORS,
  wrapInDiviSection,
  sectionHeaderHTML,
  sectionHeaderSpanHTML,
  sectionHeaderCSS,
  sectionHeaderSpanCSS,
  fontSmoothingReset,
  responsiveCSS,
  reducedMotion,
  buttonCSS,
  buttonLightCSS,
  superDCSS,
  grainCSS,
  diviListReset,
};
