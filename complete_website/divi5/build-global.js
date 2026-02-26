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
const ONLY = getArg('--only'); // 'header', 'footer', or 'body-single'

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
  {
    name: 'body-single',
    postId: 100440,
    postType: 'et_body_layout',
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

// ════════════════════════════════════════════════════════════════
// SMOKE TEST — verify header/footer render on a live page
// ════════════════════════════════════════════════════════════════
if (!DRY_RUN) {
  console.log('\n▸ Smoke test — verifying global layouts render...');

  try {
    const { execSync } = require('child_process');
    const testUrl = 'https://digiwin-thailand.local/'; // homepage (follow redirects)
    const html = execSync(
      `curl -sSk -L --max-time 15 "${testUrl}"`,
      { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }
    );

    const checks = [];

    // Header checks
    if (!ONLY || ONLY === 'header') {
      checks.push({ label: 'Header nav links', found: html.includes('dw-nav-link') || html.includes('dw-header') });
      checks.push({ label: 'Logo present', found: html.includes('dw-logo') });
      checks.push({ label: '"Let\'s Talk" CTA', found: html.includes("Let's Talk") || html.includes('Let&#8217;s Talk') });
    }

    // Footer checks
    if (!ONLY || ONLY === 'footer') {
      checks.push({ label: 'Footer copyright', found: html.includes('2026 DigiWin') || html.includes('All rights reserved') });
      checks.push({ label: 'Footer contact', found: html.includes('digiwin.co.th') || html.includes('Bangkok') });
    }

    const failures = checks.filter(c => !c.found);
    if (failures.length > 0) {
      console.error('  ✗ Smoke test FAILED:');
      failures.forEach(f => console.error(`    - ${f.label}: NOT FOUND in page HTML`));
      console.error('  Global layout may not be rendering. Check wp:divi/code blocks and Divi cache.');
      console.error('  Try: curl -sSk "' + testUrl + '" | grep -c "dw-header"');
      process.exit(1);
    }

    console.log(`  ✓ All checks pass (${checks.length}/${checks.length})`);
    checks.forEach(c => console.log(`    ✓ ${c.label}`));
  } catch (err) {
    console.error(`  ✗ Smoke test error: ${err.message}`);
    console.error('  Is LocalWP running?');
    process.exit(1);
  }

  console.log('\n✓ Global layouts updated!');
  console.log('  Header: https://digiwin-thailand.local/?page_id=100684');
  console.log('  (Check any page — header/footer should appear globally)');
}
