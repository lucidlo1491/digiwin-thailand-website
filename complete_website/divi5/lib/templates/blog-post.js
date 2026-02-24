/**
 * blog-post.js — Blog post template for Divi 5
 *
 * Reads an HTML blog prototype at build time, extracts 3 sections:
 *   1. Hero (back-link, category badge, H1, meta)
 *   2. Body (article content + FAQ + post-specific CSS)
 *   3. Related + CTA (related cards + CTA section)
 *
 * Supports two HTML formats:
 *   Format A: blog-hero / blog-body / blog-related / blog-cta (simple posts)
 *   Format B: article-hero / article-body / related-section / article-cta (rich posts)
 *
 * CSS strategy:
 *   - Format A: blog styling lives in styles.css → extracted at build time
 *   - Format B: post-specific CSS in <head> <style> blocks → extracted directly
 *   - Both: Divi section overrides applied to all 3 sections
 *
 * Usage: Each blog page config calls pageConfig() with slug, prefix, protoFile, pageId.
 */

const fs = require('fs');
const path = require('path');
const base = require('./_base');

// ────────────────────────────────────────────────────────────────
// BLOG CSS EXTRACTION FROM styles.css
// Read once, cache. Extracts blog-hero, blog-body, blog-related,
// blog-cta, blog-data-*, blog-pullquote, blog-highlight, blog-divider,
// article-diagram, fade-in, dw-section (FAQ container) classes.
// ────────────────────────────────────────────────────────────────

let _blogCSS = null;

function getBlogBaseCSS() {
  if (_blogCSS) return _blogCSS;

  const stylesPath = path.join(__dirname, '..', '..', '..', 'styles.css');
  const css = fs.readFileSync(stylesPath, 'utf8');

  // Extract rules matching blog post selectors (not blog-hub-* or blog-hero-illustration/badge/stats)
  const blogPrefixes = [
    '.blog-hero', '.blog-back-link', '.blog-category-badge',
    '.blog-meta', '.blog-body', '.blog-pullquote',
    '.blog-data-', '.blog-highlight', '.blog-divider',
    '.blog-related', '.blog-cta',
    '.article-diagram', '.diagram-caption',
    '.fade-in',
  ];
  // Exclude blog-hub-*, blog-hero-illustration, blog-hero-inner (2nd def at 2226), blog-hero-badge, blog-hero-subtitle, blog-hero-stats
  const excludes = ['blog-hub-', 'blog-hero-illustration', 'blog-hero-badge', 'blog-hero-subtitle', 'blog-hero-stats', 'blog-hero-stat'];

  const lines = css.split('\n');
  const rules = [];
  let inRule = false;
  let braceDepth = 0;
  let currentRule = [];

  for (const line of lines) {
    if (!inRule) {
      // Check if this line starts a rule we want
      const trimmed = line.trim();
      if (trimmed.startsWith('.') || trimmed.startsWith('@media')) {
        const isMatch = blogPrefixes.some(p => trimmed.startsWith(p));
        const isExcluded = excludes.some(e => trimmed.includes(e));
        if (isMatch && !isExcluded) {
          inRule = true;
          currentRule = [line];
          braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
          if (braceDepth <= 0) {
            rules.push(currentRule.join('\n'));
            inRule = false;
            currentRule = [];
          }
          continue;
        }
      }
    } else {
      currentRule.push(line);
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (braceDepth <= 0) {
        rules.push(currentRule.join('\n'));
        inRule = false;
        currentRule = [];
      }
    }
  }

  // Also add the dw-section rules needed for FAQ container
  const dwSectionRules = [];
  inRule = false;
  for (const line of lines) {
    if (!inRule) {
      const trimmed = line.trim();
      if (trimmed.startsWith('.dw-section') && !trimmed.includes('dw-section-scene') && !trimmed.includes('dw-section-header') && !trimmed.includes('dw-section-label') && !trimmed.includes('dw-section-title') && !trimmed.includes('dw-section-subtitle')) {
        inRule = true;
        currentRule = [line];
        braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        if (braceDepth <= 0) {
          dwSectionRules.push(currentRule.join('\n'));
          inRule = false;
          currentRule = [];
        }
        continue;
      }
    } else {
      currentRule.push(line);
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (braceDepth <= 0) {
        dwSectionRules.push(currentRule.join('\n'));
        inRule = false;
        currentRule = [];
      }
    }
  }

  _blogCSS = `/* Blog base CSS (extracted from styles.css) */\n${rules.join('\n')}\n${dwSectionRules.join('\n')}`;
  return _blogCSS;
}

// ────────────────────────────────────────────────────────────────
// DIVI SECTION OVERRIDES — shared across all 3 sections
// ────────────────────────────────────────────────────────────────
const DIVI_OVERRIDES = `
/* Divi section-level overrides — reset padding/margin/width on all sections */
.et_pb_section { padding: 0 !important; min-height: auto !important; margin: 0 !important; text-align: start !important; }
.et_pb_section .et_pb_row { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 auto !important; }
.et_pb_section .et_pb_column { padding: 0 !important; }
/* Font smoothing reset */
.et_pb_section, .et_pb_section * { -webkit-font-smoothing: auto !important; -moz-osx-font-smoothing: auto !important; }
/* Divi p padding reset */
.et_pb_section p { padding-bottom: 0 !important; }
/* Override blog-body h2/h3 line-height from Divi defaults */
.et_pb_section .blog-body h2, .et_pb_section .article-body h2 { line-height: 1.3 !important; }
.et_pb_section .blog-body h3, .et_pb_section .article-body h3 { line-height: 1.35 !important; }
/* Ensure fade-in elements are visible (no JS scroll observer in Divi) */
.fade-in { opacity: 1 !important; transform: none !important; }
/* Resolve CSS vars used in styles.css */
:root { --dw-blue-text: #0369a1; --dw-gray-light: #F5F7FA; --dw-navy: #000864; }
`.trim();

// ────────────────────────────────────────────────────────────────
// HTML EXTRACTION HELPERS
// ────────────────────────────────────────────────────────────────

function detectFormat(html) {
  if (html.includes('class="article-hero"') || html.includes("class='article-hero'")) return 'B';
  return 'A';
}

function extractMain(html) {
  const mainStart = html.match(/<main[^>]*>/);
  if (!mainStart) throw new Error('blog-post: No <main> tag found');
  const startIdx = html.indexOf(mainStart[0]) + mainStart[0].length;
  const endIdx = html.indexOf('</main>');
  if (endIdx === -1) throw new Error('blog-post: No </main> tag found');
  return html.substring(startIdx, endIdx).trim();
}

function extractHeadStyles(html) {
  const headEnd = html.indexOf('</head>');
  if (headEnd === -1) return '';
  const headContent = html.substring(0, headEnd);
  const styles = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let m;
  while ((m = re.exec(headContent)) !== null) {
    styles.push(m[1].trim());
  }
  return styles.join('\n');
}

function extractHero(mainContent, format) {
  const heroClass = format === 'B' ? 'article-hero' : 'blog-hero';
  const re = new RegExp(`<section class="${heroClass}"[\\s\\S]*?<\\/section>`);
  const match = mainContent.match(re);
  if (!match) throw new Error(`blog-post: No ${heroClass} section found`);
  return match[0];
}

function extractBody(mainContent, format) {
  const articleClass = format === 'B' ? 'article-body' : 'blog-body';
  const articleStart = mainContent.indexOf(`class="${articleClass}"`);
  if (articleStart === -1) throw new Error(`blog-post: No ${articleClass} found`);
  const tagStart = mainContent.lastIndexOf('<article', articleStart);

  let bodyEnd;
  if (format === 'B') {
    const relIdx = mainContent.indexOf('class="related-section"');
    const ctaIdx = mainContent.indexOf('class="article-cta"');
    bodyEnd = relIdx !== -1 ? mainContent.lastIndexOf('<section', relIdx) : -1;
    if (bodyEnd === -1 && ctaIdx !== -1) bodyEnd = mainContent.lastIndexOf('<section', ctaIdx);
  } else {
    const relIdx = mainContent.indexOf('class="blog-related"');
    const ctaIdx = mainContent.indexOf('class="blog-cta"');
    bodyEnd = relIdx !== -1 ? mainContent.lastIndexOf('<section', relIdx) : -1;
    if (bodyEnd === -1 && ctaIdx !== -1) bodyEnd = mainContent.lastIndexOf('<section', ctaIdx);
  }

  if (bodyEnd === -1) bodyEnd = mainContent.length;
  return mainContent.substring(tagStart, bodyEnd).trim();
}

function extractRelatedCta(mainContent, format) {
  let startMarker;
  if (format === 'B') {
    const relIdx = mainContent.indexOf('class="related-section"');
    const ctaIdx = mainContent.indexOf('class="article-cta"');
    const idx = relIdx !== -1 ? relIdx : ctaIdx;
    if (idx === -1) return '';
    startMarker = mainContent.lastIndexOf('<section', idx);
  } else {
    const relIdx = mainContent.indexOf('class="blog-related"');
    const ctaIdx = mainContent.indexOf('class="blog-cta"');
    const idx = relIdx !== -1 ? relIdx : ctaIdx;
    if (idx === -1) return '';
    startMarker = mainContent.lastIndexOf('<section', idx);
  }
  return mainContent.substring(startMarker).trim();
}

function rewriteLinks(html) {
  return html
    .replace(/href="\.\.\/(blog\/[^"]+)\.html"/g, (_, p) => `href="/${p}/"`)
    .replace(/href="\.\.\/blog\.html"/g, 'href="/blog/"')
    .replace(/href="\.\.\/demo\.html"/g, 'href="/contact/"')
    .replace(/href="\.\.\/products\/([^"]+)\.html"/g, (_, p) => `href="/products/${p}/"`)
    .replace(/href="\.\.\/([^"]+)\.html"/g, (_, p) => `href="/${p}/"`);
}

// ────────────────────────────────────────────────────────────────
// SECTION BUILDERS
// ────────────────────────────────────────────────────────────────

function makeHeroBuilder(html, data) {
  const mainContent = extractMain(html);
  const format = detectFormat(html);
  let heroHtml = extractHero(mainContent, format);
  heroHtml = rewriteLinks(heroHtml);

  return {
    blocks: () => base.wrapInDiviSection(`${data.title}: Hero`, heroHtml, 'Hero Content'),
    css: () => {
      const headCSS = extractHeadStyles(html);
      const blogBase = format === 'A' ? getBlogBaseCSS() : '';
      return `
/* === BLOG POST: ${data.title.toUpperCase()} === */
${DIVI_OVERRIDES}

${blogBase}

${headCSS}
`.trim();
    },
  };
}

function makeBodyBuilder(html, data) {
  const mainContent = extractMain(html);
  const format = detectFormat(html);
  let bodyHtml = extractBody(mainContent, format);
  bodyHtml = rewriteLinks(bodyHtml);

  return {
    blocks: () => base.wrapInDiviSection(`${data.title}: Body`, bodyHtml, 'Body Content'),
    css: () => '', // All CSS emitted by hero section (page-level CSS is assembled globally)
  };
}

function makeRelatedBuilder(html, data) {
  const mainContent = extractMain(html);
  const format = detectFormat(html);
  let relatedHtml = extractRelatedCta(mainContent, format);
  relatedHtml = rewriteLinks(relatedHtml);

  return {
    blocks: () => base.wrapInDiviSection(`${data.title}: Related`, relatedHtml, 'Related Content'),
    css: () => '', // All CSS emitted by hero section
  };
}

// ────────────────────────────────────────────────────────────────
// PAGE CONFIG FACTORY
// ────────────────────────────────────────────────────────────────

function pageConfig(data, opts) {
  const html = fs.readFileSync(data.protoFile, 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const pageTitle = data.title || (titleMatch ? titleMatch[1].replace(/ - DigiWin Thailand$/, '') : data.slug);
  const format = detectFormat(html);
  const enrichedData = { ...data, title: pageTitle };

  const heroBuilder = makeHeroBuilder(html, enrichedData);
  const bodyBuilder = makeBodyBuilder(html, enrichedData);
  const relatedBuilder = makeRelatedBuilder(html, enrichedData);

  return {
    pageId: opts.pageId,
    title: pageTitle,
    siteUrl: 'https://digiwin-thailand.local',
    // NOTE: prototypePath intentionally omitted — blog template merges 5 HTML sections
    // into 3 Divi sections, so Gate 0 section-count parity would always fail.
    protoFile: `blog/${data.slug}.html`,

    sections: [
      { name: `${data.prefix}-hero`, builder: heroBuilder },
      { name: `${data.prefix}-body`, builder: bodyBuilder },
      { name: `${data.prefix}-rel`, builder: relatedBuilder },
    ],

    editabilityRules: {
      bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
      maxHtmlBlocks: 6,
    },

    verify: {
      wpUrl: `https://digiwin-thailand.local/?page_id=${opts.pageId}`,
      sections: [
        {
          name: `${data.prefix}-hero`,
          wpSelector: '.et_pb_section_0',
          htmlSelector: format === 'B' ? '.article-hero' : '.blog-hero',
          pixelThreshold: 0.1,
          styleMap: [{ label: 'H1', htmlSel: format === 'B' ? '.article-hero h1' : '.blog-hero h1', wpSel: '.et_pb_section_0 h1' }],
        },
        {
          name: `${data.prefix}-body`,
          wpSelector: '.et_pb_section_1',
          htmlSelector: format === 'B' ? '.article-body' : '.blog-body',
          pixelThreshold: 0.1,
          styleMap: [{ label: 'First P', htmlSel: format === 'B' ? '.article-body p:first-of-type' : '.blog-body p:first-of-type', wpSel: '.et_pb_section_1 p:first-of-type' }],
        },
        {
          name: `${data.prefix}-rel`,
          wpSelector: '.et_pb_section_2',
          htmlSelector: format === 'B' ? '.related-section' : '.blog-related',
          pixelThreshold: 0.1,
          styleMap: [{ label: 'H2', htmlSel: format === 'B' ? '.related-section h2' : '.blog-related h2', wpSel: '.et_pb_section_2 h2' }],
        },
      ],
    },
  };
}

const schema = {
  description: 'Blog post template — reads HTML prototype, extracts hero/body/related',
  category: 'blog',
};

module.exports = { pageConfig, schema };
