/**
 * blog-single.js — DigiWin Blog Post Body Layout (Theme Builder)
 *
 * Replaces the generic Divi 5 body layout (post 100440) with a
 * DigiWin-branded blog post template.
 *
 * Structure:
 *   Section 1: Hero — navy gradient bg, back link, dynamic post title + meta
 *   Section 2: Content — post content (dynamic, from WP editor) + styling
 *   Section 3: Related — "Related Articles" heading + 3-post blog grid
 *   Section 4: CTA — gradient call-to-action
 *
 * Uses native Divi modules (post-title, post-content, blog) for dynamic
 * content, plus Code Modules for DigiWin branding elements.
 */

const {
  codeModule,
  sectionOpen, sectionClose,
  rowOpen, rowClose,
  columnOpen, columnClose,
  postTitleModule,
  postContentModule,
  blogModule,
} = require('../lib/modules');

// ── CSS ──────────────────────────────────────────────────────────

function css() {
  return `
/* ═══ DigiWin Blog Single Body Layout ═══ */

/* --- Hero Section --- */
.dw-blog-hero-wrap {
  position: relative;
  padding: 120px 0 60px;
  background: linear-gradient(135deg, #000432 0%, #000864 40%, #001080 100%);
  overflow: hidden;
}
.dw-blog-hero-wrap::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 200%;
  background: radial-gradient(ellipse, rgba(0,175,240,0.08) 0%, transparent 60%);
  pointer-events: none;
}
.dw-blog-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 14px;
  font-family: 'Noto Sans', sans-serif;
  margin-bottom: 24px;
  transition: color 0.3s ease;
}
.dw-blog-back-link:hover { color: #00AFF0; }
.dw-blog-back-link svg { width: 16px; height: 16px; }
.dw-blog-category-badge {
  display: inline-block;
  background: rgba(0,175,240,0.15);
  color: #00AFF0;
  font-size: 12px;
  font-weight: 600;
  font-family: 'JetBrains Mono', 'Noto Sans', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

/* Override Divi post-title module defaults */
.dw-blog-hero-wrap .et_pb_post_title { background: none !important; padding: 0 !important; }
.dw-blog-hero-wrap .et_pb_post_title .entry-title { margin-bottom: 16px !important; }
.dw-blog-hero-wrap .et_pb_post_title .post-meta { color: rgba(255,255,255,0.7) !important; font-size: 14px !important; }
.dw-blog-hero-wrap .et_pb_post_title .post-meta a { color: rgba(255,255,255,0.8) !important; }

/* --- Content Section --- */
.dw-blog-content-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 60px 24px 80px;
}

/* Style the dynamic post content */
.dw-blog-content-wrap .et_pb_post_content h2 {
  color: #000864 !important;
  font-size: 28px !important;
  font-weight: 600 !important;
  margin: 48px 0 16px !important;
  line-height: 1.3 !important;
}
.dw-blog-content-wrap .et_pb_post_content h3 {
  color: #000864 !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  margin: 36px 0 12px !important;
  line-height: 1.35 !important;
}
.dw-blog-content-wrap .et_pb_post_content p {
  font-size: 16px !important;
  line-height: 1.8 !important;
  color: #333 !important;
  margin-bottom: 20px !important;
  padding-bottom: 0 !important;
}
.dw-blog-content-wrap .et_pb_post_content ul,
.dw-blog-content-wrap .et_pb_post_content ol {
  margin: 16px 0 24px 24px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}
.dw-blog-content-wrap .et_pb_post_content blockquote {
  border-left: 4px solid #00AFF0;
  margin: 32px 0;
  padding: 16px 24px;
  background: #f8fafc;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: #555;
}
.dw-blog-content-wrap .et_pb_post_content a {
  color: #00AFF0 !important;
  text-decoration: underline !important;
  text-underline-offset: 2px;
}
.dw-blog-content-wrap .et_pb_post_content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 24px 0;
}

/* --- Related Section --- */
.dw-blog-related-wrap {
  background: #F5F7FA;
  padding: 80px 0;
}
.dw-blog-related-heading {
  font-family: 'Noto Sans', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #000864;
  text-align: center;
  margin-bottom: 48px;
}
.dw-blog-related-wrap .et_pb_blog_grid .et_pb_post {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.dw-blog-related-wrap .et_pb_blog_grid .et_pb_post:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* --- CTA Section --- */
.dw-blog-cta {
  background: linear-gradient(135deg, #000864 0%, #003CC8 50%, #00AFF0 100%);
  padding: 80px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.dw-blog-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px);
  pointer-events: none;
}
.dw-blog-cta h2 {
  font-family: 'Noto Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 16px;
  position: relative;
}
.dw-blog-cta p {
  font-family: 'Noto Sans', sans-serif;
  font-size: 18px;
  color: rgba(255,255,255,0.85);
  margin: 0 0 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.dw-blog-cta-btn {
  display: inline-block;
  background: #fff;
  color: #000864;
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 36px;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}
.dw-blog-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

/* --- Divi global overrides for body layout --- */
.et_pb_section { padding: 0 !important; }
.et_pb_section .et_pb_row { max-width: 1200px !important; width: 100% !important; }

/* --- Responsive: 1024px tablet --- */
@media (max-width: 1024px) {
  .dw-blog-hero-wrap { padding: 100px 0 50px; }
  .dw-blog-hero-wrap .et_pb_post_title .entry-title { font-size: 36px !important; }
  .dw-blog-content-wrap { max-width: 640px; }
  .dw-blog-content-wrap .et_pb_post_content h2 { font-size: 24px !important; }
  .dw-blog-content-wrap .et_pb_post_content h3 { font-size: 20px !important; }
  .dw-blog-related-wrap .et_pb_blog_grid { grid-template-columns: repeat(2, 1fr) !important; }
  .dw-blog-cta h2 { font-size: 32px; }
}

/* --- Responsive: 768px mobile --- */
@media (max-width: 768px) {
  .dw-blog-hero-wrap { padding: 80px 0 40px; }
  .dw-blog-hero-wrap .et_pb_post_title .entry-title { font-size: 28px !important; line-height: 1.3 !important; }
  .dw-blog-content-wrap { max-width: 100%; padding: 40px 16px 60px; }
  .dw-blog-related-wrap { padding: 60px 0; }
  .dw-blog-related-heading { font-size: 24px; margin-bottom: 32px; }
  .dw-blog-related-wrap .et_pb_blog_grid { grid-template-columns: 1fr !important; }
  .dw-blog-cta { padding: 60px 16px; }
  .dw-blog-cta h2 { font-size: 28px; }
  .dw-blog-back-link { min-height: 44px; padding: 8px 0; }
  .dw-blog-cta-btn { min-height: 48px; padding: 16px 40px; }
  /* Touch targets: post meta links (category, comments) */
  .et_pb_title_meta_container a { display: inline-flex !important; align-items: center !important; min-height: 44px !important; min-width: 44px !important; justify-content: center !important; padding: 0 8px !important; }
  /* Touch targets: inline content links */
  .et_pb_post_content a { display: inline-flex !important; align-items: center !important; min-height: 44px !important; }
  /* Touch targets: related posts (category badges, Read More, pagination) */
  .et_pb_posts .entry-categories a,
  .et_pb_posts .more-link,
  .pagination a { display: inline-flex !important; align-items: center !important; min-height: 44px !important; min-width: 44px !important; justify-content: center !important; padding: 0 8px !important; }
}

/* --- Responsive: 480px small --- */
@media (max-width: 480px) {
  .dw-blog-hero-wrap { padding: 72px 0 32px; }
  .dw-blog-hero-wrap .et_pb_post_title .entry-title { font-size: 24px !important; }
  .dw-blog-content-wrap .et_pb_post_content p { font-size: 15px !important; line-height: 1.75 !important; }
  .dw-blog-content-wrap .et_pb_post_content blockquote { padding: 12px 16px; }
  .dw-blog-cta-btn { display: block; width: 100%; text-align: center; }
  .et_pb_section .et_pb_row { padding-left: 16px !important; padding-right: 16px !important; }
}
`.trim();
}

// ── Blocks ───────────────────────────────────────────────────────

function blocks() {
  const heroHTML = `
<div class="dw-blog-hero-wrap">
  <div style="max-width:760px; margin:0 auto; padding:0 24px; position:relative;">
    <a href="/blog/" class="dw-blog-back-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to Blog
    </a>
  </div>
</div>`.trim();

  const ctaHTML = `
<div class="dw-blog-cta">
  <h2>Ready to Transform Your Factory?</h2>
  <p>Talk to our manufacturing ERP specialists about your specific challenges. No demos, no pressure — just expert advice.</p>
  <a href="/contact/" class="dw-blog-cta-btn">Let's Talk</a>
</div>`.trim();

  const relatedHeading = `<h2 class="dw-blog-related-heading">Related Articles</h2>`;

  return [
    // Section 1: Hero (navy gradient + dynamic title)
    sectionOpen({
      adminLabel: 'Blog Hero',
      background: {
        color: '#000432',
      },
      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    rowOpen({ adminLabel: 'Hero Row' }),
    columnOpen({ adminLabel: 'Hero Content' }),
    codeModule(heroHTML, 'Hero Branding'),
    postTitleModule({
      adminLabel: 'Dynamic Post Title',
      family: 'Noto Sans',
      weight: '700',
      size: '42px',
      lineHeight: '1.2em',
      color: '#FFFFFF',
      tabletSize: '32px',
      phoneSize: '24px',
      metaColor: 'rgba(255,255,255,0.7)',
      showDate: 'on',
      showCategories: 'on',
      showAuthor: 'off',
      showComments: 'off',
    }),
    columnClose(),
    rowClose(),
    sectionClose(),

    // Section 2: Content (dynamic post content)
    sectionOpen({
      adminLabel: 'Blog Content',
      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    rowOpen({ adminLabel: 'Content Row' }),
    columnOpen({
      adminLabel: 'Content Column',
    }),
    codeModule('<div class="dw-blog-content-wrap">', 'Content Wrapper Open'),
    postContentModule({
      adminLabel: 'Dynamic Post Content',
      family: 'Noto Sans',
      size: '16px',
      lineHeight: '1.8em',
      color: '#333333',
    }),
    codeModule('</div>', 'Content Wrapper Close'),
    columnClose(),
    rowClose(),
    sectionClose(),

    // Section 3: Related Articles
    sectionOpen({
      adminLabel: 'Related Articles',
      background: { color: '#F5F7FA' },
      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    rowOpen({ adminLabel: 'Related Row' }),
    columnOpen({ adminLabel: 'Related Column' }),
    codeModule(`<div class="dw-blog-related-wrap">${relatedHeading}`, 'Related Header'),
    blogModule({
      adminLabel: 'Related Posts Grid',
      count: 3,
    }),
    codeModule('</div>', 'Related Footer'),
    columnClose(),
    rowClose(),
    sectionClose(),

    // Section 4: CTA
    sectionOpen({
      adminLabel: 'Blog CTA',
      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    rowOpen({ adminLabel: 'CTA Row' }),
    columnOpen({ adminLabel: 'CTA Column' }),
    codeModule(ctaHTML, 'CTA Gradient'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

module.exports = { blocks, css };
