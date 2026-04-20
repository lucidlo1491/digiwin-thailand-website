#!/usr/bin/env node
/**
 * push-schema.js — Push JSON-LD schema metadata to all WordPress pages
 *
 * Lightweight alternative to rebuilding all pages. Only touches _digiwin_schema
 * postmeta — does NOT modify post_content, CSS, or any other meta.
 *
 * Usage:
 *   node complete_website/divi5/push-schema.js                    # all pages, local
 *   node complete_website/divi5/push-schema.js --page home        # single page
 *   node complete_website/divi5/push-schema.js --dry-run          # preview only
 *   node complete_website/divi5/push-schema.js --target production # push to live site
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./lib/mysql');
const { getProfile, tbl, parseTarget } = require('./lib/mysql-config');
const schemaLib = require('./lib/schema');

const args = process.argv.slice(2);
const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
const hasFlag = (flag) => args.includes(flag);

const DRY_RUN = hasFlag('--dry-run');
const pageFilter = getArg('--page');
const TARGET = parseTarget();
const PROFILE = getProfile(TARGET);

// ── Discover all page configs ──
const pagesDir = path.join(__dirname, 'pages');
const pageFiles = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.js') && !fs.statSync(path.join(pagesDir, f)).isDirectory());

console.log(`\n▸ Schema Push — ${DRY_RUN ? 'DRY RUN' : TARGET}`);
console.log(`  Pages: ${pageFilter || 'all'}\n`);

let pushed = 0, skipped = 0, failed = 0;

for (const file of pageFiles) {
  const slug = file.replace('.js', '');

  if (pageFilter && slug !== pageFilter) continue;

  try {
    // Fresh require (clear cache)
    const configPath = path.join(pagesDir, file);
    delete require.cache[require.resolve(configPath)];
    const config = require(configPath);

    if (typeof config.schema !== 'function') {
      console.log(`  ○ ${slug}: no schema() — skipped`);
      skipped++;
      continue;
    }

    const schemas = config.schema();
    if (!Array.isArray(schemas) || schemas.length === 0) {
      console.log(`  ○ ${slug}: schema() returned empty — skipped`);
      skipped++;
      continue;
    }

    const types = schemas.map(s => s['@type']).join(', ');
    const json = schemaLib.serialize(schemas);

    if (DRY_RUN) {
      console.log(`  ✓ ${slug} (${config.pageId}): ${schemas.length} blocks (${types}) — ${json.length} chars`);
      pushed++;
      continue;
    }

    // Upsert _digiwin_schema postmeta
    const metaKey = '_digiwin_schema';
    const sql = [
      `DELETE FROM ${tbl('postmeta', PROFILE)} WHERE post_id = ${config.pageId} AND meta_key = '${metaKey}';`,
      `INSERT INTO ${tbl('postmeta', PROFILE)} (post_id, meta_key, meta_value) VALUES (${config.pageId}, '${metaKey}', '${mysql.escape(json)}');`,
    ].join('\n');

    mysql.query(sql, PROFILE);
    console.log(`  ✓ ${slug} (${config.pageId}): ${schemas.length} blocks (${types})`);
    pushed++;
  } catch (err) {
    console.error(`  ✗ ${slug}: ${err.message}`);
    failed++;
  }
}

console.log(`\n━━━ Schema Push ${DRY_RUN ? '(DRY RUN) ' : ''}━━━`);
console.log(`  Pushed: ${pushed}`);
console.log(`  Skipped: ${skipped}`);
console.log(`  Failed: ${failed}`);

if (failed > 0) process.exit(1);
if (!DRY_RUN && pushed > 0) {
  console.log(`\n✓ ${pushed} pages now have _digiwin_schema postmeta.`);
  console.log(`  Verify: curl -sk ${PROFILE.siteUrl || 'https://digiwin-thailand.local'}/?page_id=PAGE_ID | grep 'application/ld+json'`);
}
