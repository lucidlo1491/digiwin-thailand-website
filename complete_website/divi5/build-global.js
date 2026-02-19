#!/usr/bin/env node
/**
 * build-global.js — Push global header/footer to Divi 5 Theme Builder layouts
 *
 * These are et_header_layout / et_footer_layout posts that Divi 5
 * automatically injects on every page via the Theme Builder.
 *
 * Usage:
 *   node complete_website/divi5/build-global.js [--dry-run] [--force] [--only header|footer]
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./lib/mysql');
const cacheFlush = require('./lib/cache-flush');
const { placeholderWrap } = require('./lib/modules');
const cssAssembler = require('./lib/css-assembler');

// ════════════════════════════════════════════════════════════════
// CLI ARGS
// ════════════════════════════════════════════════════════════════
const args = process.argv.slice(2);
const hasFlag = (flag) => args.includes(flag);
function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}

const DRY_RUN = hasFlag('--dry-run');
const FORCE = hasFlag('--force');
const ONLY = getArg('--only'); // 'header' or 'footer'

// ════════════════════════════════════════════════════════════════
// GLOBAL LAYOUT CONFIG
// ════════════════════════════════════════════════════════════════
const LAYOUTS = [
  {
    name: 'header',
    postId: 100437,
    postType: 'et_header_layout',
    title: 'DigiWin Global Header',
    builder: require('./global/header'),
  },
  {
    name: 'footer',
    postId: 100438,
    postType: 'et_footer_layout',
    title: 'DigiWin Global Footer',
    builder: require('./global/footer'),
  },
];

const layouts = ONLY
  ? LAYOUTS.filter(l => l.name === ONLY)
  : LAYOUTS;

if (layouts.length === 0) {
  console.error(`Unknown layout: ${ONLY}. Available: header, footer`);
  process.exit(1);
}

console.log(`\n▸ Building global layouts: ${layouts.map(l => l.name).join(', ')}`);

// ════════════════════════════════════════════════════════════════
// BUILD + PUSH EACH LAYOUT
// ════════════════════════════════════════════════════════════════
for (const layout of layouts) {
  console.log(`\n── ${layout.name.toUpperCase()} (post ${layout.postId}) ──`);

  // Assemble blocks + CSS
  const blocks = layout.builder.blocks();
  const sectionCSS = typeof layout.builder.css === 'function' ? layout.builder.css() : '';
  const content = placeholderWrap(blocks);
  const pageLevelCSS = cssAssembler.assemble([sectionCSS]);

  console.log(`  Content: ${content.length} chars`);
  console.log(`  CSS: ${pageLevelCSS.length} chars`);

  if (DRY_RUN) {
    console.log('\n  === DRY RUN ===');
    const blockMatches = content.match(/<!-- wp:\S+ /g) || [];
    blockMatches.forEach(b => console.log('    ' + b.trim()));
    continue;
  }

  // Post-lock check
  const lock = mysql.checkPostLock(layout.postId);
  if (lock.locked && !FORCE) {
    console.error(`  ✗ Post ${layout.postId} is locked. Use --force to override.`);
    continue;
  }

  // Backup
  console.log('  Backing up...');
  const backupFile = mysql.backup(layout.postId);
  console.log(`  ✓ Backup: ${path.basename(backupFile)}`);

  // Push — same as pushPage but we keep the existing post_type
  try {
    mysql.pushPage(layout.postId, {
      title: layout.title,
      content,
      css: pageLevelCSS,
    });
    console.log('  ✓ Content updated');

    const verify = mysql.verifyPush(layout.postId);
    console.log('  ✓ Verified:', verify);
  } catch (err) {
    console.error(`  ✗ MySQL error: ${err.message}`);
    continue;
  }

  // Cache flush — flush ALL pages since global layouts affect every page
  console.log('  Flushing cache...');
  cacheFlush.flushAll({ includeDb: true });
  console.log('  ✓ Cache flushed (all pages)');
}

if (!DRY_RUN) {
  console.log('\n✓ Global layouts updated!');
  console.log('  Header: https://digiwin-thailand.local/?page_id=100684');
  console.log('  (Check any page — header/footer should appear globally)');
}
