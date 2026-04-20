#!/usr/bin/env node
/**
 * export-global-sql.js — Generate SQL for global layout push (no MySQL needed)
 *
 * Produces a .sql file that can be pushed to production via da-push.js.
 * Replicates what build-global.js does, but outputs SQL instead of executing it.
 *
 * Usage:
 *   node export-global-sql.js --only body-single   # body layout only
 *   node export-global-sql.js --only header         # header only
 *   node export-global-sql.js                       # all layouts
 */

const fs = require('fs');
const path = require('path');
const { placeholderWrap } = require('./lib/modules');
const cssAssembler = require('./lib/css-assembler');

const args = process.argv.slice(2);
const ONLY = (() => {
  const i = args.indexOf('--only');
  return i !== -1 ? args[i + 1] : null;
})();

const EXPORT_DIR = path.join(__dirname, 'phpmyadmin-export');

// Same escape as mysql.js
function escape(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\0/g, '\\0')
    .replace(/\x1a/g, '\\Z');
}

const LAYOUTS = [
  {
    name: 'header',
    postId: 100437,
    title: 'DigiWin Global Header',
    builder: require('./global/header'),
  },
  {
    name: 'footer',
    postId: 100438,
    title: 'DigiWin Global Footer',
    builder: require('./global/footer'),
  },
  {
    name: 'body-single',
    postId: 100440,
    title: 'DigiWin Blog Single Template',
    builder: require('./global/blog-single'),
  },
];

const layouts = ONLY
  ? LAYOUTS.filter(l => l.name === ONLY)
  : LAYOUTS;

if (layouts.length === 0) {
  console.error(`Unknown layout: ${ONLY}. Available: header, footer, body-single`);
  process.exit(1);
}

const sqlParts = [`-- Global layout SQL export (generated ${new Date().toISOString()})\n`];

for (const layout of layouts) {
  const blocks = layout.builder.blocks();
  const sectionCSS = typeof layout.builder.css === 'function' ? layout.builder.css() : '';
  const content = placeholderWrap(blocks);
  const pageLevelCSS = cssAssembler.assemble([sectionCSS]);

  sqlParts.push(`-- ══════════════════════════════════════════════════════════════`);
  sqlParts.push(`-- ${layout.name.toUpperCase()} (post ${layout.postId})`);
  sqlParts.push(`-- ══════════════════════════════════════════════════════════════`);

  // Update post content
  sqlParts.push(`UPDATE wp_posts SET
  post_title = '${escape(layout.title)}',
  post_content = '${escape(content)}',
  post_modified = NOW(),
  post_modified_gmt = UTC_TIMESTAMP()
WHERE ID = ${layout.postId};`);

  // Upsert meta values (DELETE + INSERT pattern)
  const metaEntries = [
    ['_et_pb_custom_css', pageLevelCSS],
    ['_et_pb_use_builder', 'on'],
    ['_et_pb_use_divi_5', 'on'],
    ['_et_pb_page_layout', 'et_full_width_page'],
    ['_wp_page_template', 'default'],
  ];

  for (const [key, value] of metaEntries) {
    sqlParts.push(`DELETE FROM wp_postmeta WHERE post_id = ${layout.postId} AND meta_key = '${escape(key)}';`);
    sqlParts.push(`INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (${layout.postId}, '${escape(key)}', '${escape(value)}');`);
  }

  sqlParts.push('');
  console.log(`  ${layout.name}: content=${content.length} chars, css=${pageLevelCSS.length} chars`);
}

const outputFile = ONLY
  ? path.join(EXPORT_DIR, `global-${ONLY}-push.sql`)
  : path.join(EXPORT_DIR, 'global-all-push.sql');

fs.writeFileSync(outputFile, sqlParts.join('\n'), 'utf8');
console.log(`\n✓ Written: ${path.basename(outputFile)} (${(fs.statSync(outputFile).size / 1024).toFixed(1)} KB)`);
console.log(`\nTo push to production:`);
console.log(`  node da-push.js --rewrite-prefix --file ${path.basename(outputFile)}`);
