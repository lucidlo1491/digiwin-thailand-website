/**
 * blog-single.js — DigiWin Blog/News Post Body Layout (Theme Builder)
 *
 * Single body layout (post 100440) serving BOTH blog articles and news posts.
 * News posts are visually differentiated via WordPress's body.category-industry-news
 * class — conditional CSS provides green badge, wider content, dark related section,
 * and featured-image hero background (injected by digiwin-news-hero.php mu-plugin).
 *
 * Structure:
 *   Section 1: Hero — navy gradient bg, conditional back links, dynamic post title + meta
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
// NOTE: Divi 5 renders each module independently — you CANNOT open a
// <div> in one codeModule and close it in another to wrap a native module.
// All styling must target sections/modules by their own CSS classes,
// using the cssClass property on sectionOpen or direct Divi class selectors.

function css() {
  return `
/* ═══ DigiWin Blog Single Body Layout ═══ */
/* Key insight: each section gets a cssClass (dw-hero-sec, dw-content-sec,
   dw-related-sec, dw-cta-sec) so we can target modules WITHIN each section
   without relying on wrapper-div nesting (which doesn't work in Divi 5). */

/* --- Divi global overrides for body layout --- */
.et-l--body .et_pb_section[class] { padding: 0 !important; }
.et-l--body .et_pb_row { max-width: 100% !important; width: 100% !important; padding: 0 !important; }
.et-l--body .et_pb_column { padding: 0 !important; }

/* ═══ HERO SECTION ═══ */
/* Divi framework resets body layout section backgrounds with specificity 0-4-0:
   .et-l--body .et_pb_section[class*="tb_body"].et_section_regular { background: none !important }
   We need 0-5-0 to beat it (adding .et_section_regular to our selector). */
.et-l--body .et_pb_section.et_pb_section_0_tb_body.et_section_regular[class] {
  background: linear-gradient(135deg, #000432 0%, #000864 40%, #001080 100%) !important;
  position: relative;
  overflow: hidden;
}
.et_pb_section_0_tb_body::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 200%;
  background: radial-gradient(ellipse, rgba(0,175,240,0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}
/* Back links */
.dw-blog-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 14px;
  font-family: 'Noto Sans', sans-serif;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
}
.dw-blog-back-link:hover { color: #00AFF0; }
.dw-blog-back-link svg { width: 16px; height: 16px; }
.dw-blog-nav { padding: 120px 24px 0; max-width: 840px; margin: 0 auto; }

/* Post title inside hero — override Divi defaults */
.et_pb_section_0_tb_body .et_pb_post_title {
  background: none !important;
  padding: 16px 24px 60px !important;
  max-width: 840px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.et_pb_section_0_tb_body .et_pb_post_title .entry-title {
  color: #fff !important;
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 42px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin-bottom: 16px !important;
}
.et_pb_section_0_tb_body .et_pb_post_title .post-meta {
  color: rgba(255,255,255,0.7) !important;
  font-size: 14px !important;
  font-family: 'Noto Sans', sans-serif !important;
}
.et_pb_section_0_tb_body .et_pb_post_title .post-meta a {
  color: rgba(255,255,255,0.8) !important;
}

/* Category badge (rendered by postTitleModule categories) */
.et_pb_section_0_tb_body .et_pb_post_title .entry-categories a {
  display: inline-block;
  background: rgba(0,175,240,0.15);
  color: #00AFF0 !important;
  font-size: 12px;
  font-weight: 600;
  font-family: 'JetBrains Mono', 'Noto Sans', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 4px;
  text-decoration: none;
}

/* ═══ CONTENT SECTION ═══ */
.et-l--body .et_pb_section.et_pb_section_1_tb_body.et_section_regular[class] {
  background: #fff !important;
}
.et_pb_section_1_tb_body .et_pb_post_content {
  max-width: 760px;
  margin: 0 auto;
  padding: 60px 24px 80px;
}
.et_pb_section_1_tb_body .et_pb_post_content h2 {
  color: #000864 !important;
  font-size: 28px !important;
  font-weight: 600 !important;
  margin: 48px 0 16px !important;
  line-height: 1.3 !important;
}
.et_pb_section_1_tb_body .et_pb_post_content h3 {
  color: #000864 !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  margin: 36px 0 12px !important;
  line-height: 1.35 !important;
}
.et_pb_section_1_tb_body .et_pb_post_content p {
  font-size: 16px !important;
  line-height: 1.8 !important;
  color: #333 !important;
  margin-bottom: 20px !important;
  padding-bottom: 0 !important;
}
.et_pb_section_1_tb_body .et_pb_post_content ul,
.et_pb_section_1_tb_body .et_pb_post_content ol {
  margin: 16px 0 24px 24px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}
.et_pb_section_1_tb_body .et_pb_post_content blockquote {
  border-left: 4px solid #00AFF0;
  margin: 32px 0;
  padding: 16px 24px;
  background: #f8fafc;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: #555;
}
.et_pb_section_1_tb_body .et_pb_post_content a {
  color: #00AFF0 !important;
  text-decoration: underline !important;
  text-underline-offset: 2px;
}
.et_pb_section_1_tb_body .et_pb_post_content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 24px 0;
}

/* ═══ RELATED SECTION ═══ */
.et-l--body .et_pb_section.et_pb_section_2_tb_body.et_section_regular[class] {
  background: #F5F7FA !important;
  padding: 80px 24px !important;
}
.dw-blog-related-heading {
  font-family: 'Noto Sans', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #000864;
  text-align: center;
  margin-bottom: 48px;
}
.et_pb_section_2_tb_body .et_pb_blog_grid .et_pb_post {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.et_pb_section_2_tb_body .et_pb_blog_grid .et_pb_post:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* ═══ CTA SECTION (dw-cta-sec) ═══ */
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

/* === NEWS POST OVERRIDES (Industry News category) === */
/* Conditional back links — blog vs news */
.dw-back-news { display: none; }
body.category-industry-news .dw-back-blog { display: none; }
body.category-industry-news .dw-back-news { display: inline-flex; }

/* News hero: taller, background-image set by mu-plugin */
body.category-industry-news .et-l--body .et_pb_section.et_pb_section_0_tb_body.et_section_regular[class] {
  background-size: cover !important;
  background-position: center !important;
}
body.category-industry-news .dw-blog-nav { padding-top: 140px; }
body.category-industry-news .et_pb_section_0_tb_body .et_pb_post_title { padding-bottom: 80px !important; }

/* News category badge: green instead of blue */
body.category-industry-news .et_pb_section_0_tb_body .et_pb_post_title .entry-categories a {
  background: rgba(2,210,140,0.15);
  color: #02D28C !important;
}

/* News content: wider reading area */
body.category-industry-news .et_pb_section_1_tb_body .et_pb_post_content {
  max-width: 840px;
}

/* News related section: dark navy background */
body.category-industry-news .et-l--body .et_pb_section.et_pb_section_2_tb_body.et_section_regular[class] {
  background: linear-gradient(135deg, #000432, #000864) !important;
}
body.category-industry-news .dw-blog-related-heading { color: #fff; }
body.category-industry-news .et_pb_section_2_tb_body .et_pb_blog_grid .et_pb_post {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}
body.category-industry-news .et_pb_section_2_tb_body .et_pb_blog_grid .et_pb_post:hover {
  background: rgba(255,255,255,0.08);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
body.category-industry-news .et_pb_section_2_tb_body .et_pb_blog_grid .entry-title a,
body.category-industry-news .et_pb_section_2_tb_body .et_pb_blog_grid .post-meta {
  color: rgba(255,255,255,0.8) !important;
}
body.category-industry-news .et_pb_section_2_tb_body .et_pb_blog_grid .entry-title a:hover {
  color: #00AFF0 !important;
}

/* --- Responsive: 1024px tablet --- */
@media (max-width: 1024px) {
  .dw-blog-nav { padding-top: 100px; }
  body.category-industry-news .dw-blog-nav { padding-top: 120px; }
  .et_pb_section_0_tb_body .et_pb_post_title .entry-title { font-size: 36px !important; }
  .et_pb_section_1_tb_body .et_pb_post_content { max-width: 640px; }
  body.category-industry-news .et_pb_section_1_tb_body .et_pb_post_content { max-width: 700px; }
  .et_pb_section_1_tb_body .et_pb_post_content h2 { font-size: 24px !important; }
  .et_pb_section_1_tb_body .et_pb_post_content h3 { font-size: 20px !important; }
  .et_pb_section_2_tb_body .et_pb_blog_grid { grid-template-columns: repeat(2, 1fr) !important; }
  .dw-blog-cta h2 { font-size: 32px; }
}

/* --- Responsive: 768px mobile --- */
@media (max-width: 768px) {
  .dw-blog-nav { padding-top: 80px; }
  .et_pb_section_0_tb_body .et_pb_post_title .entry-title { font-size: 28px !important; line-height: 1.3 !important; }
  .et_pb_section_0_tb_body .et_pb_post_title { padding-bottom: 40px !important; }
  .et_pb_section_1_tb_body .et_pb_post_content { max-width: 100%; padding: 40px 16px 60px; }
  .et_pb_section_2_tb_body { padding: 60px 16px !important; }
  .dw-blog-related-heading { font-size: 24px; margin-bottom: 32px; }
  .et_pb_section_2_tb_body .et_pb_blog_grid { grid-template-columns: 1fr !important; }
  .dw-blog-cta { padding: 60px 16px; }
  .dw-blog-cta h2 { font-size: 28px; }
  .dw-blog-back-link { min-height: 44px; padding: 8px 0; }
  .dw-blog-cta-btn { min-height: 48px; padding: 16px 40px; }
  /* Touch targets */
  .et_pb_section_0_tb_body .et_pb_title_meta_container a { display: inline-flex !important; align-items: center !important; min-height: 44px !important; min-width: 44px !important; padding: 0 8px !important; }
  .et_pb_section_1_tb_body .et_pb_post_content a { display: inline-flex !important; align-items: center !important; min-height: 44px !important; }
  .et_pb_section_2_tb_body .entry-categories a,
  .et_pb_section_2_tb_body .more-link,
  .et_pb_section_2_tb_body .pagination a { display: inline-flex !important; align-items: center !important; min-height: 44px !important; min-width: 44px !important; padding: 0 8px !important; }
}

/* --- Responsive: 480px small --- */
@media (max-width: 480px) {
  .dw-blog-nav { padding-top: 72px; }
  .et_pb_section_0_tb_body .et_pb_post_title .entry-title { font-size: 24px !important; }
  .et_pb_section_1_tb_body .et_pb_post_content p { font-size: 15px !important; line-height: 1.75 !important; }
  .et_pb_section_1_tb_body .et_pb_post_content blockquote { padding: 12px 16px; }
  .dw-blog-cta-btn { display: block; width: 100%; text-align: center; }
}
`.trim();
}

// ── Blocks ───────────────────────────────────────────────────────

function blocks() {
  // Back links — separate blog vs news, toggled by CSS conditional
  // Critical section background overrides — MUST be inline <style> because
  // Divi's CSS compiler strips .et_section_regular from selectors in code module CSS,
  // making it impossible to beat Divi's 0-4-0 framework reset via the CSS field.
  // Inline <style> in HTML bypasses Divi's compiler entirely.
  const inlineOverrides = `
<style>
/* Beat Divi framework reset: .et-l--body .et_pb_section[class*="tb_body"].et_section_regular { background: none !important } */
.et-l--body .et_pb_section.et_pb_section_0_tb_body.et_section_regular[class] {
  background: linear-gradient(135deg, #000432 0%, #000864 40%, #001080 100%) !important;
}
.et-l--body .et_pb_section.et_pb_section_1_tb_body.et_section_regular[class] {
  background: #fff !important;
}
.et-l--body .et_pb_section.et_pb_section_2_tb_body.et_section_regular[class] {
  background: #F5F7FA !important;
}
.et-l--body .et_pb_section.et_pb_section_3_tb_body.et_section_regular[class] {
  background: linear-gradient(135deg, #000432 0%, #000864 50%, #003CC8 100%) !important;
}
/* News post overrides (green badge hero, dark related) */
body.category-industry-news .et-l--body .et_pb_section.et_pb_section_0_tb_body.et_section_regular[class] {
  background-size: cover !important;
  background-position: center !important;
}
body.category-industry-news .et-l--body .et_pb_section.et_pb_section_2_tb_body.et_section_regular[class] {
  background: linear-gradient(135deg, #000432 0%, #000864 100%) !important;
}
</style>`;

  const heroNavHTML = `
${inlineOverrides}
<div class="dw-blog-nav">
  <a href="/blog/" class="dw-blog-back-link dw-back-blog">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    Back to Blog
  </a>
  <a href="/news/" class="dw-blog-back-link dw-back-news">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    Back to News &amp; Events
  </a>
</div>`.trim();

  const ctaHTML = `
<div class="dw-blog-cta">
  <h2>Ready to Transform Your Factory?</h2>
  <p>Talk to our manufacturing ERP specialists about your specific challenges. No demos, no pressure — just expert advice.</p>
  <a href="/demo/" class="dw-blog-cta-btn">Let's Talk</a>
</div>`.trim();

  const relatedHeading = `<h2 class="dw-blog-related-heading">Related Articles</h2>`;

  return [
    // Section 1: Hero — cssClass on section so CSS can target modules within
    sectionOpen({
      adminLabel: 'Blog Hero',

      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    rowOpen({ adminLabel: 'Hero Row' }),
    columnOpen({ adminLabel: 'Hero Content' }),
    codeModule(heroNavHTML, 'Hero Nav Links'),
    postTitleModule({
      adminLabel: 'Dynamic Post Title',
      showDate: 'on',
      showCategories: 'on',
      showAuthor: 'off',
      showComments: 'off',
    }),
    columnClose(),
    rowClose(),
    sectionClose(),

    // Section 2: Content — no wrapper divs, CSS targets .et_pb_section_1_tb_body .et_pb_post_content
    sectionOpen({
      adminLabel: 'Blog Content',

      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    rowOpen({ adminLabel: 'Content Row' }),
    columnOpen({ adminLabel: 'Content Column' }),
    postContentModule({
      adminLabel: 'Dynamic Post Content',
    }),
    columnClose(),
    rowClose(),
    sectionClose(),

    // Section 3: Related Articles
    sectionOpen({
      adminLabel: 'Related Articles',

      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),
    rowOpen({ adminLabel: 'Related Row' }),
    columnOpen({ adminLabel: 'Related Column' }),
    codeModule(relatedHeading, 'Related Heading'),
    blogModule({
      adminLabel: 'Related Posts Grid',
      count: 3,
    }),
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
