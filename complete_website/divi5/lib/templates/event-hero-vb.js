/**
 * event-hero-vb.js — Hybrid Event Hero Template (v5)
 *
 * Hybrid approach: native modules for most-edited elements (~70% click-to-edit),
 * codeModule for facts bar (exact SVG icons matching original design).
 *
 * NATIVE (click-to-edit in VB):
 * - textModule: badge pill, H1 title, subtitle
 * - buttonModule: CTA button (text + URL)
 *
 * CODE MODULE (edit via Code Module editor):
 * - codeModule: facts bar (date/time/location/capacity — HTML comments guide edits)
 * - codeModule: back link (text + URL — simple, rarely changes)
 * - codeModule: Super D decoration (pure visual, never edited)
 *
 * v5: ALL CSS delivered via embedded <style> in codeModule — NOT freeForm `selector`.
 * Reason: `selector` resolution is unreliable for Layout Library templates loaded
 * into pages with Theme Builder (header/body/footer). Embedded <style> with explicit
 * class selectors (.evhero-wrap, .evhero-facts, etc.) works in any context.
 * This matches the proven pattern from event-hero.js (codeModule version).
 */

const base = require('./_base');
const superD = require('../super-d');
const tokens = require('../../theme/tokens');
const {
  textModule, codeModule, buttonModule,
  sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose,
} = require('../modules');

// ────────────────────────────────────────────────────────────────
// SPEC — Golden reference values (source: event-hero.js lines 73-108)
// Every CSS value traces back to this block.
// ────────────────────────────────────────────────────────────────
const SPEC = {
  // Section layout (event-hero.js:73)
  sectionPadding:       '140px 24px 80px',
  sectionPaddingTablet: '120px 20px 60px',       // event-hero.js:100
  sectionPaddingMobile: '100px 20px 48px',
  sectionGradient:      `linear-gradient(165deg, ${tokens.color.cardHeaderDark} 0%, ${tokens.color.cardHeaderDarkEnd} 40%, ${tokens.color.navy} 100%)`,

  // Spacing — margin-bottom per element (event-hero.js:76-80)
  backLinkMargin:   '24px',
  badgeMargin:      '20px',
  h1Margin:         '20px',
  subtitleMargin:   '40px',
  factsMargin:      '40px',

  // Typography (event-hero.js:79, 85-86)
  h1Size:           'clamp(28px, 4.5vw, 44px)',
  h1SizeStatic:     '44px',                       // fallback for textModule JSON
  subtitleSize:     '18px',
  factValueSize:    '16px',
  factValueLineHeight: '25.6px',                   // event-hero.js:92
  factLabelSize:    '13px',
  factLabelLineHeight: '20.8px',                   // event-hero.js:93
  factValueMarginBottom: '4px',                    // event-hero.js:92
  backLinkSize:     '15px',

  // Facts card (event-hero.js:81)
  factsMaxWidth:    '700px',
  factsBorderRadius: '16px',
  factsPadding:     '24px',
  factsGap:         '16px',
  factsBg:          'rgba(255,255,255,0.05)',
  factsBorder:      'rgba(255,255,255,0.1)',

  // Icon (event-hero.js:35, 84)
  iconSize:         '18px',

  // Noise texture (event-hero.js:74)
  noiseOpacity:     0.03,

  // Content max-width (event-hero.js:79-80)
  contentMaxWidth:  '800px',
  subtitleMaxWidth: '700px',

  // CTA (event-hero.js:87)
  ctaPaddingV:      '16px',
  ctaPaddingH:      '40px',
  ctaRadius:        '12px',
  ctaFontSize:      '16px',
};

const schema = {
  description: 'VB-native event hero — title/subtitle/badge/CTA/facts all click-to-edit',
  category: 'event',
};

// ────────────────────────────────────────────────────────────────
// Embedded CSS — delivered via <style> tag in codeModule.
// All selectors use explicit class names (.${P}-wrap, .${P}-facts, etc.)
// NOT Divi's `selector` keyword. This ensures CSS applies regardless of
// Theme Builder context or Library template loading.
// ────────────────────────────────────────────────────────────────
function buildEmbeddedCSS(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);
  const sd = data.superD || { variant: 'particle', position: 'corner-br', opacity: 0.15 };

  return [
    // Section wrapper — gradient, padding, overflow, zero Divi's default 60px flex gap
    `.${P}-wrap{background:${SPEC.sectionGradient} !important;padding:${SPEC.sectionPadding} !important;overflow:hidden !important;position:relative !important;text-align:center;gap:0 !important}`,

    // Noise texture overlay (pseudo-element)
    `.${P}-wrap::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:${SPEC.noiseOpacity};pointer-events:none;z-index:1}`,

    // z-index layering (all content above noise)
    `.${P}-wrap .et_pb_row{position:relative;z-index:2}`,

    // Zero Divi's default module margins for tight spacing control
    `.${P}-wrap .et_pb_module{margin-bottom:0 !important}`,
    `.${P}-wrap .et_pb_text{padding-bottom:0 !important}`,

    // Row overrides — centered, max-width
    `.${P}-wrap > .et_pb_row:first-child,.${P}-wrap > .et_pb_row:last-child{max-width:${SPEC.contentMaxWidth} !important;margin:0 auto !important}`,
    `.${P}-wrap .et_pb_row{margin:0 auto !important}`,

    // Base text color — defense against GLOBAL_THEME_RESET color:#333 and VB overrides
    `.${P}-wrap .et_pb_text_inner,.${P}-wrap .et_pb_text_inner h1,.${P}-wrap .et_pb_text_inner h2,.${P}-wrap .et_pb_text_inner h3,.${P}-wrap .et_pb_text_inner h4,.${P}-wrap .et_pb_text_inner p{color:${tokens.color.white} !important}`,

    // Center alignment for text modules; code modules get white text only
    `.${P}-wrap .et_pb_text .et_pb_text_inner{text-align:center !important}`,
    `.${P}-wrap .et_pb_code .et_pb_code_inner{color:${tokens.color.white} !important}`,

    // ── Back link (codeModule content styling) ──
    `.${P}-wrap .${P}-back{display:inline-flex;align-items:center;gap:6px;font-family:${tokens.font.body};font-size:${SPEC.backLinkSize};font-weight:500;color:rgba(255,255,255,0.85);text-decoration:none;margin-bottom:${SPEC.backLinkMargin};transition:color ${tokens.transition.normal};-webkit-font-smoothing:auto !important}`,
    `.${P}-wrap .${P}-back:hover{color:rgba(255,255,255,0.9)}`,
    `.${P}-wrap .${P}-back svg{flex-shrink:0}`,

    // ── Badge (textModule — pill shape needs CSS) ──
    `.${P}-wrap .${P}-badge .et_pb_text_inner{margin-bottom:${SPEC.badgeMargin}}`,
    `.${P}-wrap .${P}-badge .et_pb_text_inner p{display:inline-flex;align-items:center;font-family:${tokens.font.mono} !important;font-size:12px !important;font-weight:500 !important;text-transform:uppercase;letter-spacing:1.5px;color:${c.hex} !important;background:${c.bg15};padding:6px 18px;border:1px solid ${c.bg30};border-radius:50px;-webkit-font-smoothing:auto !important;line-height:19.2px}`,

    // ── H1 title (clamp() can't go in JSON — CSS only) ──
    `.${P}-wrap .et_pb_text_inner h1{color:${tokens.color.white} !important;-webkit-font-smoothing:auto !important;font-size:${SPEC.h1Size} !important;font-weight:700 !important;line-height:1.2 !important;max-width:${SPEC.contentMaxWidth} !important;margin:0 auto ${SPEC.h1Margin} !important;padding:0 !important;text-align:center !important}`,

    // ── Subtitle (max-width centering needs CSS) ──
    `.${P}-wrap .${P}-subtitle .et_pb_text_inner{margin-bottom:${SPEC.subtitleMargin}}`,
    `.${P}-wrap .${P}-subtitle .et_pb_text_inner p{color:rgba(255,255,255,0.85) !important;-webkit-font-smoothing:auto !important;font-size:${SPEC.subtitleSize} !important;line-height:1.7 !important;max-width:${SPEC.subtitleMaxWidth} !important;margin:0 auto !important;padding:0 !important;text-align:center !important}`,

    // ── Facts bar (codeModule — SVG icons matching original design) ──
    `.${P}-wrap .${P}-facts{display:grid;grid-template-columns:repeat(4,1fr);gap:${SPEC.factsGap};max-width:${SPEC.factsMaxWidth};margin:0 auto ${SPEC.factsMargin};background:${SPEC.factsBg};border:1px solid ${SPEC.factsBorder};border-radius:${SPEC.factsBorderRadius};padding:${SPEC.factsPadding}}`,
    `.${P}-wrap .${P}-fact{text-align:center}`,
    `.${P}-wrap .${P}-fact-icon{margin-bottom:8px}`,
    `.${P}-wrap .${P}-fact-icon svg{stroke:${c.hex}}`,
    `.${P}-wrap .${P}-facts *{-webkit-font-smoothing:auto !important}`,
    `.${P}-wrap .${P}-fact-value{font-family:${tokens.font.body};font-size:${SPEC.factValueSize};font-weight:600;color:${tokens.color.white} !important;line-height:${SPEC.factValueLineHeight};margin-bottom:${SPEC.factValueMarginBottom}}`,
    `.${P}-wrap .${P}-fact-label{font-family:${tokens.font.body};font-size:${SPEC.factLabelSize};color:rgba(255,255,255,0.85) !important;line-height:${SPEC.factLabelLineHeight}}`,

    // ── CTA hover + arrow (pseudo-element — CSS only) ──
    `.${P}-wrap .et_pb_button{-webkit-font-smoothing:auto !important;box-shadow:0 4px 20px ${c.shadow40} !important;transition:background ${tokens.transition.normal},transform ${tokens.transition.normal},box-shadow ${tokens.transition.normal} !important}`,
    `.${P}-wrap .et_pb_button::after{content:'';display:inline-block;width:16px;height:16px;margin-left:8px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M5 12h14M12 5l7 7-7 7'/%3E%3C/svg%3E") no-repeat center;background-size:contain;vertical-align:middle}`,
    `.${P}-wrap .et_pb_button:hover{background:${c.ctaHover} !important;transform:translateY(-2px);box-shadow:0 8px 24px ${c.shadow30} !important}`,
    // Focus-visible for keyboard nav on dark background (WCAG 2.4.7)
    `.${P}-wrap a:focus-visible{outline:2px solid ${tokens.color.smartBlue};outline-offset:4px}`,
    `.${P}-wrap .et_pb_button:focus-visible{outline:2px solid ${tokens.color.white};outline-offset:4px}`,

    // ── Super D ──
    superD.css(`${P}-superd`, { variant: sd.variant, position: sd.position, opacity: sd.opacity }),

    // ── Responsive ──
    `@media(max-width:${tokens.breakpoint.tablet}px){.${P}-wrap{padding:${SPEC.sectionPaddingTablet} !important} .${P}-wrap .${P}-facts{grid-template-columns:repeat(2,1fr);gap:20px}}`,
    `@media(max-width:${tokens.breakpoint.mobile}px){.${P}-wrap{padding:${SPEC.sectionPaddingMobile} !important}}`,
    `@media(max-width:${tokens.breakpoint.small}px){.${P}-wrap .et_pb_button_module_wrapper .et_pb_button{display:flex !important;width:100% !important;max-width:100% !important;justify-content:center;text-align:center;box-sizing:border-box} .${P}-wrap .${P}-facts{grid-template-columns:1fr}}`,
    `@media(prefers-reduced-motion:reduce){.${P}-wrap,.${P}-wrap *{transition:none !important;animation:none !important}}`,
  ].join(' ');
}

// ────────────────────────────────────────────────────────────────
// BLOCKS — Divi 5 block markup (native JSON properties first)
// ────────────────────────────────────────────────────────────────
function blocks(data) {
  const P = data.sectionPrefix;
  const sdClass = `${P}-superd`;
  const c = base.eventColorSurface(data.color);
  const embeddedCSS = buildEmbeddedCSS(data);
  const adminLabel = data.adminLabel || 'Event Hero (VB)';

  // Validate facts data shape — fail fast, not silent SVG breakage
  if (data.facts) {
    for (const f of data.facts) {
      if (!f.icon) throw new Error(`event-hero-vb: fact "${f.label}" missing 'icon' (SVG markup). Did you pass 'iconUnicode' instead?`);
      if (f.iconUnicode) throw new Error(`event-hero-vb: fact "${f.label}" has 'iconUnicode' — use 'icon' (SVG markup) instead`);
    }
  }

  // Back link HTML — includes embedded <style> for ALL section CSS
  // Placed first so CSS loads before any content renders
  const backLinkHTML = `<style>${embeddedCSS}</style><a href="${data.backLink.href}" class="${P}-back">
<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
${data.backLink.text}</a>`;

  // Facts bar HTML (codeModule — exact SVG icons from original design)
  const factsHTML = `<!-- ═══════════════════════════════════════════ -->
<!-- EDIT BELOW: Change dates, times, venue, capacity text. -->
<!-- DO NOT touch SVG tags or class names.                  -->
<!-- ═══════════════════════════════════════════ -->
<div class="${P}-facts">
${data.facts.map(f => `  <div class="${P}-fact">
    <div class="${P}-fact-icon">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">${f.icon}</svg>
    </div>
    <div class="${P}-fact-value">${f.value}</div>
    <div class="${P}-fact-label">${f.label}</div>
  </div>`).join('\n')}
</div>`;

  return [
    // NO css in sectionOpen — all CSS is in the embedded <style> above
    sectionOpen({ adminLabel, bgLayout: 'dark', cssClass: `${P}-wrap` }),

    // ── Row 1: Main Content ──
    rowOpen({
      adminLabel: `${adminLabel}: Content`,
      sizing: { width: '100%', maxWidth: SPEC.contentMaxWidth },
      margin: { top: '0px', bottom: '0px', left: 'auto', right: 'auto', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    columnOpen({ adminLabel: `${adminLabel}: Column` }),

    // Super D (codeModule — pure visual, never edited)
    codeModule(superD.html(sdClass), 'DO NOT EDIT — Background Decoration'),

    // Back link (codeModule — includes <style> for ALL section CSS)
    codeModule(backLinkHTML, 'Back Link + Styles'),

    // Badge (textModule — click-to-edit in VB)
    textModule(
      `<p>${data.badge}</p>`,
      { color: c.hex, family: 'JetBrains Mono', weight: '500', size: '12px', lineHeight: '19.2px', letterSpacing: '1.5px', textTransform: 'uppercase' },
      { adminLabel: 'Event Badge', cssClass: `${P}-badge`, bgLayout: 'dark' },
    ),

    // H1 title (textModule — click-to-edit; clamp() via embedded CSS)
    textModule(
      `<h1>${data.title}</h1>`,
      { color: tokens.color.white, family: 'Noto Sans', weight: '700', size: SPEC.h1SizeStatic, lineHeight: '1.2em' },
      { adminLabel: 'Event Title', bgLayout: 'dark' },
    ),

    // Subtitle (textModule — click-to-edit in VB)
    textModule(
      `<p>${data.subtitle}</p>`,
      { color: 'rgba(255,255,255,0.85)', family: 'Noto Sans', weight: '400', size: SPEC.subtitleSize, lineHeight: '1.7em' },
      { adminLabel: 'Event Subtitle', cssClass: `${P}-subtitle`, bgLayout: 'dark' },
    ),

    columnClose(),
    rowClose(),

    // ── Row 2: Facts Bar (codeModule — exact SVG icons, self-styled) ──
    rowOpen({ adminLabel: `${adminLabel}: Facts` }),
    columnOpen({ adminLabel: 'Facts Bar' }),
    codeModule(factsHTML, 'Event Facts (Date / Time / Location / Capacity)', { bgLayout: 'dark' }),
    columnClose(),
    rowClose(),

    // ── Row 3: CTA Button — styling via buttonModule JSON ──
    rowOpen({
      adminLabel: `${adminLabel}: CTA`,
      sizing: { width: '100%', maxWidth: SPEC.contentMaxWidth },
      margin: { top: '0px', bottom: '0px', left: 'auto', right: 'auto', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    columnOpen({ adminLabel: `${adminLabel}: CTA Column` }),

    // CTA (buttonModule — click-to-edit text + URL in VB)
    buttonModule(data.cta.text, data.cta.href, {
      bg: c.ctaBg,
      color: tokens.color.white,
      family: 'Noto Sans',
      weight: '600',
      size: SPEC.ctaFontSize,
      radius: SPEC.ctaRadius,
      paddingV: SPEC.ctaPaddingV,
      paddingH: SPEC.ctaPaddingH,
      alignment: 'center',
      adminLabel: 'Register CTA',
    }),

    columnClose(),
    rowClose(),

    sectionClose(),
  ];
}

function css(data) {
  return '';
}

/**
 * Lintable CSS export — allows lint-css.js to validate embedded CSS
 * without requiring a full page build context.
 */
function lintableCSS(data) {
  return buildEmbeddedCSS(data);
}

module.exports = { blocks, css, schema, lintableCSS };
