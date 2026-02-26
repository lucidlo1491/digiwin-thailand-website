/**
 * css-assembler.js — Global CSS assembly + Divi infrastructure overrides
 *
 * This module provides:
 * - GLOBAL_THEME_RESET / SHARED_KEYFRAMES (used by every page via assemble())
 * - Divi infrastructure helpers: themeBuilderReset, columnGapReset, textModuleOverride
 * - Per-section component helpers: labelCSS, cardCSS, statsCSS
 *
 * NOTE: Section-level UI helpers (sectionHeaderCSS, buttonCSS, buttonLightCSS,
 * grainCSS, reducedMotion) live in templates/_base.js — that is the canonical
 * source for all template and section builder code. Do NOT duplicate here.
 *
 * Rule: No generic selectors (.label, .card). Always section-scoped (.hero-label, .checks-card).
 * Rule: No !important except where Divi's cascade requires it (section/row/column overrides).
 */

/**
 * Theme Builder full-bleed override (required for every full-width section)
 * Indexed by section position on the page (0-based)
 */
function themeBuilderReset(sectionIndex) {
  return `
/* === THEME BUILDER FULL-BLEED OVERRIDE (section ${sectionIndex}) === */
.et_pb_section_${sectionIndex}_tb_body{background:transparent !important;padding:0 !important;margin:0 !important;}
.et_pb_row_${sectionIndex}_tb_body{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important;}
.et_pb_column_${sectionIndex}_tb_body{padding:0 !important;}`;
}

/**
 * Divi column gap reset (required per section — Divi defaults to 30px gap)
 * @param {string} sectionSelector - e.g. '.et_pb_section_0'
 */
function columnGapReset(sectionSelector) {
  return `${sectionSelector}:not([class*='tb_body']) .et_pb_column{gap:0 !important}`;
}

/**
 * Divi Text Module override — forces font properties via pageLevelCSS
 * Needed because Divi 5 Text Module mangles JSON font values (see D44, D46)
 */
function textModuleOverride(fontFamily = "'Noto Sans',sans-serif", fontSize = '18px', fontWeight = '400', lineHeight = '1.75', color = 'rgba(255,255,255,0.75)') {
  return `.et_pb_text .et_pb_text_inner,.et_pb_text .et_pb_text_inner p{font-family:${fontFamily} !important;font-weight:${fontWeight} !important;font-size:${fontSize} !important;line-height:${lineHeight} !important;color:${color} !important}`;
}

/**
 * Standard label CSS (JetBrains Mono uppercase with gradient line)
 * @param {string} prefix - Section prefix e.g. 'hero', 'checks', 'products'
 * @param {object} opts - { color, lineColor }
 */
function labelCSS(prefix, opts = {}) {
  const color = opts.color || '#00AFF0';
  const lineColor = opts.lineColor || '#00AFF0';
  return `
.${prefix}-label{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:${color};margin-bottom:24px;display:flex;align-items:center;gap:12px;position:relative;z-index:2}
.${prefix}-label::before{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,${lineColor});flex-shrink:0}`;
}

/**
 * Card CSS (white card with hover effects)
 * @param {string} prefix - Section prefix
 * @param {object} opts - { dark, radius, padding }
 */
function cardCSS(prefix, opts = {}) {
  const dark = opts.dark || false;
  const radius = opts.radius || '20px';
  const padding = opts.padding || '40px 32px';

  if (dark) {
    return `
.${prefix}-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:${radius};padding:${padding};position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}
.${prefix}-card:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2)}`;
  }

  return `
.${prefix}-card{background:#fff;border:1px solid #e2e8f0;box-shadow:0 4px 24px rgba(0,0,0,0.04);border-radius:${radius};padding:${padding};position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}
.${prefix}-card:hover{box-shadow:0 20px 60px rgba(0,175,240,0.12);border-color:#00AFF0}`;
}

/**
 * Stats row CSS
 * @param {string} prefix - Section prefix
 * @param {object} opts - { dark, numberColor }
 */
function statsCSS(prefix, opts = {}) {
  const numberColor = opts.numberColor || '#00AFF0';
  const labelColor = opts.labelColor || 'rgba(255,255,255,0.75)';

  return `
.${prefix}-stats{display:flex;gap:40px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1);position:relative;z-index:2}
.${prefix}-stat-number{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:800;color:${numberColor};line-height:1;margin-bottom:8px;letter-spacing:-0.02em}
.${prefix}-stat-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:400;color:${labelColor};text-transform:uppercase;letter-spacing:0.1em}`;
}

/**
 * Global Divi theme default overrides
 * Divi 5 defaults: Open Sans, weight 500, color #666666, heading padding-bottom 10px
 * These bleed through to Code Module content unless explicitly overridden.
 */
const GLOBAL_THEME_RESET = `
/* === GLOBAL DIVI THEME RESET === */
.et_pb_section,.et_pb_row,.et_pb_column,.et_pb_code,.et_pb_code_inner{font-family:'Noto Sans',sans-serif !important;font-weight:400 !important;font-size:16px !important;color:#333 !important}
.et_pb_section h1,.et_pb_section h2,.et_pb_section h3,.et_pb_section h4,.et_pb_section h5,.et_pb_section h6{padding-bottom:0 !important}
.et_pb_section:not([class*='tb_body']){overflow:hidden !important;margin:0 !important}
.et_pb_row:not([class*='tb_body']){max-width:100% !important;width:100% !important;padding:0 !important;margin-top:0 !important;margin-bottom:0 !important;gap:0 !important}
.et_pb_column:not([class*='tb_body']){padding:0 !important;margin:0 !important;gap:0 !important}
.et_pb_section .et_pb_row .et_pb_column .et_pb_text.et_pb_module{margin:0 !important;padding:0 !important}
.section-title{line-height:1.6;-webkit-font-smoothing:auto}
.section-subtitle{margin-left:auto;margin-right:auto;line-height:1.6}
/* fade-in / scroll-fade-in: always visible (no JS scroll observer in Divi) */
.fade-in,.scroll-fade-in{opacity:1 !important;transform:none !important}`;

/**
 * Keyframes shared across sections
 */
const SHARED_KEYFRAMES = `
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slide-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-2%,-2%)}20%{transform:translate(2%,2%)}30%{transform:translate(-1%,1%)}40%{transform:translate(1%,-1%)}50%{transform:translate(-2%,2%)}60%{transform:translate(2%,-2%)}70%{transform:translate(-1%,-1%)}80%{transform:translate(1%,1%)}90%{transform:translate(-2%,2%)}}
@keyframes dw-wave-drift{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes dw-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`;

/**
 * Assemble page-level CSS from section CSS arrays
 * Runs sanitizeSectionCSS on each section to fix known scaffold/auto-fix artifacts
 * before they reach WordPress.
 * @param {string[]} sections - Array of CSS strings, one per section
 */
/**
 * TB body wrapper reset — MUST come AFTER all section CSS to beat :has() rules.
 * The TB body wrapper (.et_pb_section_0_tb_body) is a .et_pb_section that contains
 * ALL page sections. Every :has() selector matches it, causing the LAST section's
 * background/padding to bleed onto the page-level wrapper.
 */
const TB_BODY_RESET = `
/* === TB BODY WRAPPER RESET (must be last — specificity 0,4,0 beats all :has() rules at 0,3,0) === */
.et-l--body .et_pb_section[class*="tb_body"].et_section_regular{background:transparent !important;background-image:none !important;padding:0 !important;margin:0 !important}
.et-l--body .et_pb_row[class*="tb_body"]{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important}
.et-l--body .et_pb_column[class*="tb_body"]{padding:0 !important;margin:0 !important}`;

function assemble(sections) {
  const { sanitizeSectionCSS } = require('./lint-css');
  const cleaned = sections.map(s => sanitizeSectionCSS(s));
  return [GLOBAL_THEME_RESET, SHARED_KEYFRAMES, ...cleaned, TB_BODY_RESET].join('\n').trim();
}

/**
 * Thai typography CSS — Google Fonts import + font stack override
 * Applied at page-level for all Thai (/th/) pages.
 * Includes Noto Sans Thai at weights 400, 500, 600, 700.
 */
const THAI_FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');";

function thaiTypographyCSS() {
  return `
/* === THAI TYPOGRAPHY === */
${THAI_FONT_IMPORT}

/* Thai font stack for all body text */
body, .et_pb_section, .et_pb_code, .et_pb_code_inner {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}

/* Thai-specific line heights (Thai script is taller) */
p, li, .et_pb_text_inner { line-height: 1.8; }
h1, h2, h3, h4, h5, h6 { line-height: 1.4; }

/* Thai label override: JetBrains Mono doesn't have Thai glyphs.
   letter-spacing breaks Thai script (chars within words must stay connected).
   text-transform:uppercase is meaningless for Thai. */
[class*="-label"] {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
  letter-spacing: 0.02em !important;
  text-transform: none !important;
}

/* Also fix any monospace elements that might contain Thai text */
[class*="-source"], [class*="-company"] {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
  letter-spacing: 0.02em !important;
  text-transform: none !important;
}
`;
}

module.exports = {
  themeBuilderReset,
  columnGapReset,
  textModuleOverride,
  labelCSS,
  cardCSS,
  statsCSS,
  assemble,
  thaiTypographyCSS,
  THAI_FONT_IMPORT,
  SHARED_KEYFRAMES,
};
