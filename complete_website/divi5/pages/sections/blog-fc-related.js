/**
 * blog-fc-related.js — Related Articles section (VB-Native)
 *
 * Uses native Divi 5 Blog Module to pull 3 recent posts dynamically.
 * No hardcoded card HTML — content stays fresh as new posts are published.
 *
 * VB-native: heading font props via JSON. CSS only for blog card styling
 * (Divi's rendered post elements need CSS for hover effects, truncation).
 *
 * D46 fix: family uses bare name 'Noto Sans' — Divi adds fallback automatically.
 */

const { textModule, blogModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

function css() {
  return `
/* ═══ Blog FC Related (VB-Native Blog Module) ═══ */

/* Blog module card styling (Layer 3 — Divi renders post HTML, needs CSS) */
.et_pb_section_3 .et_pb_blog_grid .et_pb_post {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.et_pb_section_3 .et_pb_blog_grid .et_pb_post:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* Heading centering */
.et_pb_section_3 .et_pb_text .et_pb_text_inner h2 {
  text-align: center;
  margin: 0 0 48px;
  padding: 0;
}

/* Hide pagination — not appropriate for "Related Articles" */
.et_pb_section_3 .pagination { display: none; }

/* Card excerpt — clean truncation */
.et_pb_section_3 .et_pb_post .post-content p { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* Focus states */
.et_pb_section_3 .et_pb_post .entry-title a:focus-visible,
.et_pb_section_3 .et_pb_post .more-link:focus-visible {
  outline: 2px solid #00AFF0; outline-offset: 2px; border-radius: 2px;
}

/* Responsive */
@media (max-width: 1024px) {
  .et_pb_section_3 .et_pb_text .et_pb_text_inner h2 { font-size: 28px !important; }
}
@media (max-width: 768px) {
  .et_pb_section_3 .et_pb_text .et_pb_text_inner h2 { font-size: 24px !important; margin-bottom: 32px !important; }
  .et_pb_section_3 .et_pb_blog_grid { grid-template-columns: 1fr !important; }
  .et_pb_section_3 .et_pb_post .more-link,
  .et_pb_section_3 .et_pb_post .entry-categories a,
  .et_pb_section_3 .et_pb_post .post-meta a { min-height: 44px; display: inline-flex; align-items: center; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .et_pb_section_3 .et_pb_blog_grid .et_pb_post { transition: none; }
  .et_pb_section_3 .et_pb_blog_grid .et_pb_post:hover { transform: none; }
}
`.trim();
}

function blocks() {
  return [
    sectionOpen({
      adminLabel: 'Blog FC Related',
      background: { color: '#F5F7FA' },
      padding: { top: '80px', bottom: '80px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),

    rowOpen({ adminLabel: 'Related Row', sizing: { width: '100%', maxWidth: '1200px' } }),
    columnOpen({
      adminLabel: 'Related Column',
      spacing: { desktop: { value: { padding: { top: '0px', bottom: '0px', left: '24px', right: '24px' } } } },
    }),

    // 1. Section heading — all native JSON (Layer 1)
    textModule(
      '<h2>Related Articles</h2>',
      { color: '#000864', size: '32px', weight: '600', family: 'Noto Sans', lineHeight: '1.3' },
      { adminLabel: 'Related Heading' }
    ),

    // 2. Native Blog Module — pulls 3 recent posts dynamically (Layer 1)
    blogModule({
      count: 3,
      adminLabel: 'Related Posts Grid',
    }),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

module.exports = { blocks, css };
