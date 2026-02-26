#!/usr/bin/env node
/**
 * migrate-blogs-to-posts.js — Migrate 10 blog pages to WordPress posts
 *
 * Reads each blog HTML prototype, extracts the article body content,
 * and creates post_type='post' entries in WordPress. The Theme Builder
 * body layout (ID 100440) automatically renders the hero, related
 * articles, and CTA around the post content.
 *
 * Also drafts the old page versions and sets up redirects.
 *
 * Usage:
 *   node complete_website/divi5/migrate-blogs-to-posts.js --dry-run   # preview
 *   node complete_website/divi5/migrate-blogs-to-posts.js             # execute
 *   node complete_website/divi5/migrate-blogs-to-posts.js --page five-pain-points  # single post
 *
 * Exit: 0 = success, 1 = errors
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./lib/mysql');

const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE = process.argv.find((a, i) => process.argv[i - 1] === '--page');

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', b: '\x1b[1m', d: '\x1b[2m', x: '\x1b[0m' };

// Blog posts: slug → old page ID + title
const BLOG_POSTS = [
  { slug: 'shop-floor-scheduling', pageId: 100757, title: 'Shop Floor Mini-Scheduling: When Plans Meet Reality', category: 'Manufacturing' },
  { slug: 'dual-units', pageId: 100758, title: 'Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces', category: 'ERP' },
  { slug: 'five-pain-points', pageId: 100759, title: 'The 5 Universal Pain Points Every Thai Factory Owner Faces', category: 'Manufacturing' },
  { slug: 'amrp-capacity-planning', pageId: 100760, title: 'AMRP: Why You Don\'t Need a Separate APS System', category: 'ERP' },
  { slug: 'sap-ecc-end-of-life', pageId: 100761, title: 'SAP ECC End-of-Life 2027: What Thai Manufacturers Need to Know', category: 'Industry News' },
  { slug: 'feature-codes', pageId: 100762, title: 'Feature Codes: How to Turn 27 SKUs Into 1 Product', category: 'ERP' },
  { slug: 'production-transparency', pageId: 100763, title: 'From Paper Reports to Production Transparency: A Practical Guide', category: 'MES' },
  { slug: 'boi-compliance-jin-hai', pageId: 100764, title: 'How One Factory Saved 10M THB/Year in BOI Supplementary Taxes', category: 'Case Study' },
  { slug: 'co-product-cost-accounting', pageId: 100765, title: 'Co-Product Cost Accounting: The Problem Most ERPs Cannot Solve', category: 'ERP' },
  { slug: 'lrp-vs-mrp', pageId: 100766, title: 'LRP vs MRP: Why Your Production Planning Takes Hours Instead of Minutes', category: 'ERP' },
];

// ── Content extraction ───────────────────────────────────────────

function extractArticleBody(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');

  // Detect format
  const isFormatB = html.includes('class="article-body"') || html.includes("class='article-body'");
  const bodyClass = isFormatB ? 'article-body' : 'blog-body';

  // Find main content
  const mainStart = html.indexOf('<main');
  const mainEnd = html.indexOf('</main>');
  if (mainStart === -1 || mainEnd === -1) return null;
  const main = html.substring(mainStart, mainEnd);

  // Find article body
  const bodyStart = main.indexOf(`class="${bodyClass}"`);
  if (bodyStart === -1) return null;
  const articleStart = main.lastIndexOf('<article', bodyStart);

  // Find where body ends (before related/CTA sections)
  const relatedClass = isFormatB ? 'related-section' : 'blog-related';
  const ctaClass = isFormatB ? 'article-cta' : 'blog-cta';
  let bodyEnd = main.indexOf(`class="${relatedClass}"`);
  if (bodyEnd !== -1) bodyEnd = main.lastIndexOf('<section', bodyEnd);
  if (bodyEnd === -1) {
    bodyEnd = main.indexOf(`class="${ctaClass}"`);
    if (bodyEnd !== -1) bodyEnd = main.lastIndexOf('<section', bodyEnd);
  }
  if (bodyEnd === -1) bodyEnd = main.length;

  let body = main.substring(articleStart, bodyEnd).trim();

  // Rewrite relative links to WordPress permalinks
  body = body
    .replace(/href="\.\.\/(blog\/[^"]+)\.html"/g, (_, p) => `href="/${p}/"`)
    .replace(/href="\.\.\/blog\.html"/g, 'href="/blog/"')
    .replace(/href="\.\.\/demo\.html"/g, 'href="/contact/"')
    .replace(/href="\.\.\/products\/([^"]+)\.html"/g, (_, p) => `href="/products/${p}/"`)
    .replace(/href="\.\.\/([^"]+)\.html"/g, (_, p) => `href="/${p}/"`);

  return body;
}

function extractExcerpt(html) {
  // Get first paragraph text as excerpt
  const match = html.match(/<p[^>]*>([^<]+)<\/p>/);
  if (!match) return '';
  return match[1].substring(0, 200).trim();
}

// ── Category management ──────────────────────────────────────────

function ensureCategory(name) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  // Check if category exists
  const check = mysql.query(
    `SELECT term_id FROM wp_terms WHERE slug = '${mysql.escape(slug)}';`
  );
  const lines = check.trim().split('\n');
  if (lines.length > 1 && lines[1].trim()) {
    return parseInt(lines[1].trim(), 10);
  }

  // Create category
  mysql.query(`
    INSERT INTO wp_terms (name, slug, term_group) VALUES ('${mysql.escape(name)}', '${mysql.escape(slug)}', 0);
    SET @tid = LAST_INSERT_ID();
    INSERT INTO wp_term_taxonomy (term_id, taxonomy, description, parent, count) VALUES (@tid, 'category', '', 0, 0);
  `);

  const result = mysql.query(`SELECT term_id FROM wp_terms WHERE slug = '${mysql.escape(slug)}';`);
  return parseInt(result.trim().split('\n')[1].trim(), 10);
}

function assignCategory(postId, termId) {
  // Get term_taxonomy_id
  const ttResult = mysql.query(
    `SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE term_id = ${termId} AND taxonomy = 'category';`
  );
  const ttLines = ttResult.trim().split('\n');
  if (ttLines.length < 2) return;
  const ttId = parseInt(ttLines[1].trim(), 10);

  // Assign
  mysql.query(`
    DELETE FROM wp_term_relationships WHERE object_id = ${postId} AND term_taxonomy_id = ${ttId};
    INSERT INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) VALUES (${postId}, ${ttId}, 0);
    UPDATE wp_term_taxonomy SET count = count + 1 WHERE term_taxonomy_id = ${ttId};
  `);
}

// ── Migration ────────────────────────────────────────────────────

function migratePost(post) {
  const protoFile = path.join(__dirname, '..', 'blog', `${post.slug}.html`);
  if (!fs.existsSync(protoFile)) {
    console.log(`  ${c.r}✗${c.x} HTML prototype not found: ${protoFile}`);
    return null;
  }

  // Extract article body
  const body = extractArticleBody(protoFile);
  if (!body) {
    console.log(`  ${c.r}✗${c.x} Could not extract article body from ${post.slug}`);
    return null;
  }

  const excerpt = extractExcerpt(body);

  if (DRY_RUN) {
    console.log(`  ${c.g}✓${c.x} ${post.slug}: ${body.length} chars body, ${excerpt.length} chars excerpt`);
    return { slug: post.slug, bodyLength: body.length };
  }

  // Create post
  const sql = `INSERT INTO wp_posts (
    post_author, post_date, post_date_gmt, post_content, post_title,
    post_excerpt, post_status, comment_status, ping_status, post_password,
    post_name, to_ping, pinged, post_modified, post_modified_gmt,
    post_content_filtered, post_parent, guid, menu_order, post_type,
    post_mime_type, comment_count
  ) VALUES (
    1, NOW(), UTC_TIMESTAMP(), '${mysql.escape(body)}', '${mysql.escape(post.title)}',
    '${mysql.escape(excerpt)}', 'publish', 'open', 'closed', '',
    '${mysql.escape(post.slug)}', '', '', NOW(), UTC_TIMESTAMP(),
    '', 0, '', 0, 'post',
    '', 0
  );
  SELECT LAST_INSERT_ID() as new_id;`;

  const result = mysql.query(sql);
  const lines = result.trim().split('\n');
  const idLine = lines[lines.length - 1].trim();
  const newId = parseInt(idLine, 10);

  if (isNaN(newId) || newId === 0) {
    console.log(`  ${c.r}✗${c.x} Failed to create post for ${post.slug}`);
    return null;
  }

  // Set GUID
  mysql.query(`UPDATE wp_posts SET guid = 'https://digiwin-thailand.local/?p=${newId}' WHERE ID = ${newId};`);

  // Assign category
  const catId = ensureCategory(post.category);
  assignCategory(newId, catId);

  // Draft the old page
  mysql.query(`UPDATE wp_posts SET post_status = 'draft' WHERE ID = ${post.pageId};`);

  console.log(`  ${c.g}✓${c.x} ${post.slug}: post ID ${newId} (page ${post.pageId} → draft)`);
  return { slug: post.slug, newId, oldPageId: post.pageId };
}

// ── Run ──────────────────────────────────────────────────────────

function run() {
  console.log(`\n${c.b}━━━ Blog Migration: page → post ━━━${c.x}`);
  if (DRY_RUN) console.log(`${c.d}(dry run — no changes)${c.x}`);

  const posts = SINGLE
    ? BLOG_POSTS.filter(p => p.slug === SINGLE)
    : BLOG_POSTS;

  if (posts.length === 0) {
    console.error(`Post not found: ${SINGLE}`);
    process.exit(1);
  }

  console.log(`\nMigrating ${posts.length} blog posts...\n`);

  const results = [];
  for (const post of posts) {
    const result = migratePost(post);
    if (result) results.push(result);
  }

  // Summary
  console.log(`\n${c.b}━━━ Summary ━━━${c.x}`);
  console.log(`  ${c.g}${results.length}/${posts.length} migrated${c.x}`);

  if (!DRY_RUN && results.length > 0) {
    // Save mapping for reference
    const mapFile = path.join(__dirname, 'blog-migration-map.json');
    fs.writeFileSync(mapFile, JSON.stringify(results, null, 2), 'utf8');
    console.log(`  Mapping saved: ${mapFile}`);

    console.log(`\n${c.y}Next steps:${c.x}`);
    console.log('  1. Push blog single body layout: node build-global.js --only body-single');
    console.log('  2. Flush cache: all pages');
    console.log('  3. Visit a post URL to verify the body layout renders');
    console.log('  4. Add redirects from old /blog/slug/ page URLs to new post URLs');
  }

  console.log();
}

run();
