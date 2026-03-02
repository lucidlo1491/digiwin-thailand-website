/**
 * blog-fc-hero.js — Hero section for Feature Codes VB POC (VB-Native)
 *
 * Modules:
 *   1. codeModule: Back link + badge (flex row, same line)
 *   2. textModule: H1 title — click-to-edit in VB
 *   3. textModule: Meta line — click-to-edit in VB
 *
 * KNOWN ISSUE: Divi 5 beta doesn't reliably render JSON for row.sizing.maxWidth,
 * column.spacing.padding, or textModule.size at large values. These are set in
 * JSON for VB Design panel display, but CSS overrides ensure correct rendering.
 *
 * D46 fix: family uses bare name 'Noto Sans' — Divi adds fallback automatically.
 */

const { textModule, codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const superD = require('../../lib/super-d');

function css() {
  return `
/* ═══ Blog FC Hero (VB-Native) ═══ */

/* Row + column sizing — JSON values not reliably rendered by Divi 5 beta,
   so we enforce via CSS. JSON kept for VB Design panel display. */
/* Original prototype: .blog-hero-inner { max-width: 1200px; padding: 0 24px; } */
.et_pb_section_0 .et_pb_row.et_pb_row { max-width: 1200px !important; margin: 0 auto !important; }
.et_pb_section_0 .et_pb_column.et_pb_column { padding: 0 24px !important; }

/* Kill Divi default module spacing — we control margins precisely */
.et_pb_section_0 .et_pb_module { margin-bottom: 0 !important; padding-bottom: 0 !important; }
.et_pb_section_0 .et_pb_text .et_pb_text_inner p { padding-bottom: 0 !important; margin-bottom: 0 !important; }
.et_pb_section_0 .et_pb_text .et_pb_text_inner h1 { padding-bottom: 0 !important; }
.et_pb_section_0 .et_pb_code .et_pb_code_inner { padding: 0 !important; }

/* Color overrides — Divi theme globals override JSON color on dark sections */
.et_pb_section_0 .et_pb_text .et_pb_text_inner,
.et_pb_section_0 .et_pb_text .et_pb_text_inner p,
.et_pb_section_0 .et_pb_text .et_pb_text_inner h1 { color: #fff !important; }

/* H1 title — original uses clamp(28px, 4.5vw, 42px) */
.et_pb_section_0 .et_pb_text .et_pb_text_inner h1 {
  font-size: clamp(28px, 4.5vw, 42px) !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin-bottom: 20px !important;
}

/* Back link + badge row */
.blog-fc-nav-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.blog-fc-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.85) !important;
  font-family: 'Noto Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}
.blog-fc-back:hover { color: #00AFF0 !important; }
.blog-fc-back svg { width: 16px; height: 16px; stroke: currentColor; }
.blog-fc-badge {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: #00AFF0;
  padding: 5px 12px;
  border-radius: 4px;
}

/* Meta */
.et_pb_section_0 .et_pb_text:last-child .et_pb_text_inner p {
  color: rgba(255,255,255,0.85) !important;
  font-size: 15px !important;
}
.blog-fc-meta-sep { margin: 0 6px; opacity: 0.5; }

/* Dot pattern overlay — matches .blog-hero::before from styles.css */
.et_pb_section_0::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
.et_pb_section_0.et_pb_section { position: relative; overflow: hidden; }

/* Super D decoration */
${superD.css('blog-fc-super-d', { variant: 'outline', position: 'corner-br', opacity: 0.06 })}

/* Responsive — matching original prototype breakpoints */
@media (max-width: 768px) {
  .et_pb_section_0 .et_pb_text .et_pb_text_inner h1 { font-size: 26px !important; }
  .blog-fc-back { min-height: 44px; padding: 8px 0; }
}
@media (max-width: 480px) {
  .blog-fc-nav-row { flex-wrap: wrap; gap: 8px; }
}

/* Focus states */
.et_pb_section_0 a:focus-visible { outline: 2px solid #00AFF0; outline-offset: 2px; border-radius: 2px; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .blog-fc-back { transition: none; }
}
`.trim();
}

function blocks() {
  const navRowHTML = `<div class="blog-fc-nav-row">
  <a href="/blog/" class="blog-fc-back">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    Back to Insights
  </a>
  <span class="blog-fc-badge">PRODUCTION PLANNING</span>
</div>`;

  return [
    sectionOpen({
      adminLabel: 'Blog FC Hero',
      background: {
        color: '#000432',
        gradient: {
          stops: [
            { color: '#0f1419', position: 0 },
            { color: '#000432', position: 40 },
            { color: '#000864', position: 100 },
          ],
          direction: '135deg',
          enabled: true,
        },
      },
      padding: { top: '160px', bottom: '51px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
      css: 'selector{background:linear-gradient(135deg,#0f1419 0%,#000432 40%,#000864 100%) !important}',
    }),

    rowOpen({
      adminLabel: 'Hero Row',
      sizing: { width: '100%', maxWidth: '800px' },
    }),
    columnOpen({
      adminLabel: 'Hero Column',
      spacing: {
        desktop: { value: { padding: { top: '0px', bottom: '0px', left: '24px', right: '24px' } } },
      },
    }),

    // 1. Back link + badge
    codeModule(navRowHTML, 'Nav: Back Link + Badge'),

    // 2. Title — JSON for VB panel, CSS for rendering
    textModule(
      '<h1>Feature Codes: How to Turn 27 SKUs Into 1 Product</h1>',
      { color: '#ffffff', size: '42px', weight: '700', family: 'Noto Sans', lineHeight: '1.2' },
      { adminLabel: 'Blog Title' },
      'selector .et_pb_text_inner h1 { color: #fff !important; font-size: clamp(28px, 4.5vw, 42px) !important; font-weight: 700 !important; line-height: 1.2 !important; }'
    ),

    // 3. Meta
    textModule(
      '<p>7 min read <span class="blog-fc-meta-sep">&middot;</span> February 2026</p>',
      { color: 'rgba(255,255,255,0.85)', size: '15px', weight: '400', family: 'Noto Sans' },
      { adminLabel: 'Meta: Read Time + Date' },
      'selector .et_pb_text_inner p { color: rgba(255,255,255,0.85) !important; font-size: 15px !important; }'
    ),

    // 4. Super D decoration (outline variant, corner-br, 6% opacity)
    codeModule(superD.html('blog-fc-super-d'), 'Deco: Super D'),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

module.exports = { blocks, css };
