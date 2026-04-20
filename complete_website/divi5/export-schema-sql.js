#!/usr/bin/env node
/**
 * export-schema-sql.js — Export schema postmeta as SQL for phpMyAdmin
 *
 * Generates a single .sql file that can be pasted into phpMyAdmin.
 * Uses production table prefix (wp_ by default).
 *
 * Usage:
 *   node complete_website/divi5/export-schema-sql.js
 *   node complete_website/divi5/export-schema-sql.js --prefix dgwthl_
 */

const fs = require('fs');
const path = require('path');
const schemaLib = require('./lib/schema');
const { escape } = require('./lib/mysql');

const args = process.argv.slice(2);
const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
const prefix = getArg('--prefix') || 'wp_';

const pagesDir = path.join(__dirname, 'pages');
const pageFiles = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.js') && !fs.statSync(path.join(pagesDir, f)).isDirectory());

const lines = [];
lines.push('-- DigiWin Schema Push — Generated ' + new Date().toISOString());
lines.push('-- 135 JSON-LD schema blocks across 65 pages');
lines.push('-- Paste this entire file into phpMyAdmin → SQL tab → Go');
lines.push('');

let count = 0;

for (const file of pageFiles) {
  const slug = file.replace('.js', '');
  const configPath = path.join(pagesDir, file);
  delete require.cache[require.resolve(configPath)];

  try {
    const config = require(configPath);
    if (typeof config.schema !== 'function') continue;

    const schemas = config.schema();
    if (!Array.isArray(schemas) || schemas.length === 0) continue;

    const json = schemaLib.serialize(schemas);
    const types = schemas.map(s => s['@type']).join(', ');

    lines.push(`-- ${slug} (ID: ${config.pageId}) — ${schemas.length} blocks: ${types}`);
    lines.push(`DELETE FROM ${prefix}postmeta WHERE post_id = ${config.pageId} AND meta_key = '_digiwin_schema';`);
    lines.push(`INSERT INTO ${prefix}postmeta (post_id, meta_key, meta_value) VALUES (${config.pageId}, '_digiwin_schema', '${escape(json)}');`);
    lines.push('');
    count++;
  } catch (err) {
    lines.push(`-- SKIPPED ${slug}: ${err.message}`);
    lines.push('');
  }
}

lines.push(`-- Done: ${count} pages updated`);

const outFile = path.join(__dirname, 'phpmyadmin-export', 'schema-push.sql');
fs.writeFileSync(outFile, lines.join('\n'), 'utf8');
console.log(`✓ Generated ${outFile}`);
console.log(`  ${count} pages, ${lines.length} SQL statements`);
console.log(`  Table prefix: ${prefix}`);
console.log(`\n  Next: Open phpMyAdmin → select your database → SQL tab → paste contents → Go`);
