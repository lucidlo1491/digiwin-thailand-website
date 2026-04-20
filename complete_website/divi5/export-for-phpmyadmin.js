#!/usr/bin/env node
/**
 * export-for-phpmyadmin.js — Generate SQL for phpMyAdmin paste
 *
 * Builds a page locally, then writes SQL files with production prefix (dgwthl_)
 * that can be pasted into phpMyAdmin to push content to production.
 *
 * Usage:
 *   node complete_website/divi5/export-for-phpmyadmin.js --page home
 */

const path = require('path');
const fs = require('fs');
const mysql = require('./lib/mysql');
const cssAssembler = require('./lib/css-assembler');
const { placeholderWrap } = require('./lib/modules');
const { getProfile, tbl } = require('./lib/mysql-config');

const args = process.argv.slice(2);
const pageName = args.find((a, i) => args[i - 1] === '--page') || 'home';
const profile = getProfile('production');

const configPath = path.join(__dirname, 'pages', `${pageName}.js`);
if (!fs.existsSync(configPath)) {
  console.error(`Page config not found: ${configPath}`);
  process.exit(1);
}

const pageConfig = require(configPath);
const sections = pageConfig.sections || [];

// Build all sections
const allBlocks = [];
const allCSS = [];

for (const section of sections) {
  const sectionBlocks = section.builder.blocks();
  const sectionCSS = typeof section.builder.css === 'function' ? section.builder.css() : '';
  allBlocks.push(...(Array.isArray(sectionBlocks) ? sectionBlocks : [sectionBlocks]));
  if (sectionCSS) allCSS.push(sectionCSS);
}

if (typeof pageConfig.extraCSS === 'function') {
  allCSS.push(pageConfig.extraCSS());
} else if (typeof pageConfig.extraCSS === 'string') {
  allCSS.push(pageConfig.extraCSS);
}

const rawBlocks = placeholderWrap(allBlocks);
const pageLevelCSS = cssAssembler.assemble(allCSS, { vbNative: pageConfig.vbNative });

// Inject page-level CSS as inline <style> in post_content to bypass Divi's CSS compiler cache.
// Divi 5 beta.8's CSS compiler unreliably strips CSS from _et_pb_custom_css postmeta.
// Inline <style> in HTML is never compiled — it reaches the browser intact.
// We still write _et_pb_custom_css for VB editor compatibility.
const inlineCSSBlock = `<!-- wp:html --><style>${pageLevelCSS}</style><!-- /wp:html -->`;
const blockContent = rawBlocks.replace(
  '<!-- wp:divi/placeholder -->',
  `<!-- wp:divi/placeholder -->\n${inlineCSSBlock}`
);

console.log(`Page: ${pageName} (ID: ${pageConfig.pageId})`);
console.log(`Content: ${blockContent.length} chars`);
console.log(`CSS: ${pageLevelCSS.length} chars`);

// Write SQL
const outDir = path.join(__dirname, 'phpmyadmin-export');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const prefix = profile.tablePrefix;
const escapedContent = mysql.escape(blockContent);
const escapedCSS = mysql.escape(pageLevelCSS);
const escapedTitle = mysql.escape(pageConfig.title || pageName);
const pid = pageConfig.pageId;

const sql = `-- ${pageName} push for production (generated ${new Date().toISOString()})
-- Paste into phpMyAdmin > SQL tab > database: digiwin_datasea

-- Step 1: Update post content
UPDATE ${prefix}posts SET
  post_title = '${escapedTitle}',
  post_content = '${escapedContent}',
  post_modified = NOW(),
  post_modified_gmt = UTC_TIMESTAMP()
WHERE ID = ${pid};

-- Step 2: Update Divi 5 custom CSS
DELETE FROM ${prefix}postmeta WHERE post_id = ${pid} AND meta_key = '_et_pb_custom_css';
INSERT INTO ${prefix}postmeta (post_id, meta_key, meta_value) VALUES (${pid}, '_et_pb_custom_css', '${escapedCSS}');

-- Step 3: Ensure Divi 5 builder flags
DELETE FROM ${prefix}postmeta WHERE post_id = ${pid} AND meta_key = '_et_pb_use_builder';
INSERT INTO ${prefix}postmeta (post_id, meta_key, meta_value) VALUES (${pid}, '_et_pb_use_builder', 'on');
DELETE FROM ${prefix}postmeta WHERE post_id = ${pid} AND meta_key = '_et_pb_use_divi_5';
INSERT INTO ${prefix}postmeta (post_id, meta_key, meta_value) VALUES (${pid}, '_et_pb_use_divi_5', 'on');
DELETE FROM ${prefix}postmeta WHERE post_id = ${pid} AND meta_key = '_et_pb_page_layout';
INSERT INTO ${prefix}postmeta (post_id, meta_key, meta_value) VALUES (${pid}, '_et_pb_page_layout', 'et_full_width_page');

-- Step 4: Flush Divi cache
DELETE FROM ${prefix}postmeta WHERE post_id = ${pid} AND meta_key LIKE '_divi_dynamic_assets%';
DELETE FROM ${prefix}postmeta WHERE post_id = ${pid} AND meta_key LIKE '_divi_%canvas%';
`;

const outFile = path.join(outDir, `${pageName}-push.sql`);
fs.writeFileSync(outFile, sql, 'utf8');
console.log(`\nSQL written to: ${outFile}`);
console.log(`SQL size: ${(sql.length / 1024).toFixed(1)} KB`);
console.log(`\nNext: Open phpMyAdmin → select "digiwin_datasea" → SQL tab → paste contents of ${outFile}`);
