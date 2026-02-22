/**
 * nav-link-rewriter.js — Auto-update header/footer nav links after page builds
 *
 * After every page push, scans the global header (100437) and footer (100438)
 * for .html file paths that match built Divi 5 pages. Replaces them with
 * WordPress permalink slugs so navigation always points to the live WP pages.
 *
 * The mapping is built dynamically from all page configs in pages/*.js.
 * Order matters: longer paths are replaced first to avoid partial matches
 * (e.g., /partner-program/economics.html before /partner-program.html).
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./mysql');
const cacheFlush = require('./cache-flush');

const HEADER_ID = 100437;
const FOOTER_ID = 100438;

/**
 * Parse TSV output from mysql.query() into array of objects.
 * First line = header, remaining lines = data.
 */
function parseTSV(raw) {
  const lines = raw.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split('\t');
  return lines.slice(1).map(line => {
    const vals = line.split('\t');
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
    return obj;
  });
}

/**
 * Build a map of HTML prototype paths → WP permalink slugs
 * by scanning all page configs in pages/*.js
 */
function buildLinkMap() {
  const pagesDir = path.join(__dirname, '..', 'pages');
  const configs = fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.js') && !f.startsWith('sections'))
    .map(f => {
      try { return require(path.join(pagesDir, f)); }
      catch { return null; }
    })
    .filter(Boolean);

  // Query WP for slug + parent info for all built page IDs
  const pageIds = configs.map(c => c.pageId).filter(Boolean);
  if (pageIds.length === 0) return {};

  const raw = mysql.query(
    `SELECT p.ID, p.post_name, p.post_parent, pp.post_name as parent_slug ` +
    `FROM wp_posts p LEFT JOIN wp_posts pp ON p.post_parent = pp.ID ` +
    `WHERE p.ID IN (${pageIds.join(',')}) AND p.post_status = 'publish';`
  );

  const rows = parseTSV(raw);

  // Build ID → WP permalink map
  const idToSlug = {};
  for (const row of rows) {
    const parentSlug = row.parent_slug && row.parent_slug !== 'NULL' ? row.parent_slug : '';
    const slug = parentSlug
      ? `/${parentSlug}/${row.post_name}/`
      : `/${row.post_name}/`;
    idToSlug[parseInt(row.ID, 10)] = slug;
  }

  // Build HTML path → WP slug map from page configs
  const linkMap = {};
  for (const config of configs) {
    if (!config.pageId || !config.protoFile || !idToSlug[config.pageId]) continue;

    // protoFile is like "partner-program/economics.html" — prepend /
    const htmlPath = `/${config.protoFile}`;
    const wpSlug = idToSlug[config.pageId];

    if (htmlPath !== wpSlug) {
      linkMap[htmlPath] = wpSlug;
    }
  }

  return linkMap;
}

/**
 * Rewrite nav links in header and footer posts.
 * Returns { updated: boolean, changes: string[] }
 */
function rewrite() {
  const linkMap = buildLinkMap();
  const entries = Object.entries(linkMap);

  if (entries.length === 0) {
    return { updated: false, changes: [] };
  }

  // Sort by path length descending — replace longer paths first
  entries.sort((a, b) => b[0].length - a[0].length);

  const changes = [];
  let anyChanged = false;

  for (const postId of [HEADER_ID, FOOTER_ID]) {
    const label = postId === HEADER_ID ? 'Header' : 'Footer';

    // Read current content
    const raw = mysql.query(
      `SELECT post_content FROM wp_posts WHERE ID = ${postId};`
    );
    const rows = parseTSV(raw);
    if (!rows || rows.length === 0) continue;

    let content = rows[0].post_content;
    let changed = false;

    for (const [htmlPath, wpSlug] of entries) {
      if (content.includes(htmlPath)) {
        content = content.split(htmlPath).join(wpSlug);
        changes.push(`${label}: ${htmlPath} → ${wpSlug}`);
        changed = true;
      }
    }

    if (changed) {
      const escaped = mysql.escape(content);
      mysql.query(
        `UPDATE wp_posts SET post_content = '${escaped}' WHERE ID = ${postId};`
      );
      anyChanged = true;
    }
  }

  // Flush cache for header/footer if anything changed
  if (anyChanged) {
    cacheFlush.flushPage(HEADER_ID, { includeDb: false });
    cacheFlush.flushPage(FOOTER_ID, { includeDb: false });
  }

  return { updated: anyChanged, changes };
}

module.exports = { rewrite, buildLinkMap, HEADER_ID, FOOTER_ID };
