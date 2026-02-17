#!/usr/bin/env node
/**
 * build-page.js — Divi 5 Page Orchestrator
 *
 * Single entry point for building any page in the Divi 5 WordPress site.
 * Pipeline: spec gate → backup → post-lock check → assemble → MySQL push → cache flush → verify
 *
 * Usage:
 *   node complete_website/divi5/build-page.js --page home [--section hero] [--dry-run] [--force] [--no-verify]
 *   node complete_website/divi5/build-page.js --page home --restore backups/page-100684-*.sql
 *
 * Available pages: home (more coming)
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./lib/mysql');
const cacheFlush = require('./lib/cache-flush');
const verifyRunner = require('./lib/verify-runner');
const { placeholderWrap } = require('./lib/modules');
const cssAssembler = require('./lib/css-assembler');

// ════════════════════════════════════════════════════════════════
// CLI ARGS
// ════════════════════════════════════════════════════════════════
const args = process.argv.slice(2);
function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}
const hasFlag = (flag) => args.includes(flag);

const pageName = getArg('--page');
const sectionFilter = getArg('--section');
const DRY_RUN = hasFlag('--dry-run');
const FORCE = hasFlag('--force');
const NO_VERIFY = hasFlag('--no-verify');
const restoreFile = getArg('--restore');

if (!pageName) {
  console.error('Usage: node build-page.js --page <name> [--section <name>] [--dry-run] [--force] [--no-verify]');
  console.error('       node build-page.js --page <name> --restore <backup-file>');
  console.error('\nAvailable pages: home');
  process.exit(1);
}

// ════════════════════════════════════════════════════════════════
// LOAD PAGE CONFIG
// ════════════════════════════════════════════════════════════════
const configPath = path.join(__dirname, 'pages', `${pageName}.js`);
if (!fs.existsSync(configPath)) {
  console.error(`Page config not found: ${configPath}`);
  console.error('Available pages:', fs.readdirSync(path.join(__dirname, 'pages'))
    .filter(f => f.endsWith('.js') && !f.startsWith('sections'))
    .map(f => f.replace('.js', ''))
    .join(', '));
  process.exit(1);
}

const pageConfig = require(configPath);
const SITE_URL = pageConfig.siteUrl || 'https://digiwin-thailand.local';

console.log(`\n▸ Building: ${pageConfig.title || pageName}`);
console.log(`  Page ID: ${pageConfig.pageId}`);
console.log(`  Site: ${SITE_URL}`);

// ════════════════════════════════════════════════════════════════
// RESTORE MODE
// ════════════════════════════════════════════════════════════════
if (restoreFile) {
  console.log(`\n▸ Restoring from: ${restoreFile}`);
  mysql.restore(pageConfig.pageId, restoreFile);
  process.exit(0);
}

// ════════════════════════════════════════════════════════════════
// STEP 1: POST-LOCK CHECK
// ════════════════════════════════════════════════════════════════
if (!DRY_RUN) {
  const lock = mysql.checkPostLock(pageConfig.pageId);
  if (lock.locked && !FORCE) {
    console.error(`\n✗ Page ${pageConfig.pageId} is locked by user ${lock.user} (${lock.lockAge}s ago).`);
    console.error('  Someone has this page open in Visual Builder.');
    console.error('  Use --force to override (risk: VB save will overwrite your changes).');
    process.exit(1);
  }
  if (lock.locked && FORCE) {
    console.warn(`⚠ Page is locked (${lock.lockAge}s ago) — proceeding with --force`);
  }

  // Check recent modification
  const mod = mysql.checkRecentModification(pageConfig.pageId);
  if (mod.recent && !FORCE) {
    console.warn(`⚠ Page was modified ${mod.secondsAgo}s ago. Someone may be editing.`);
    console.warn('  Use --force to proceed anyway.');
  }
}

// ════════════════════════════════════════════════════════════════
// STEP 2: BACKUP
// ════════════════════════════════════════════════════════════════
if (!DRY_RUN) {
  console.log('\n▸ Backing up current content...');
  const backupFile = mysql.backup(pageConfig.pageId);
  console.log(`  ✓ Backup saved: ${backupFile}`);
}

// ════════════════════════════════════════════════════════════════
// STEP 3: ASSEMBLE SECTIONS
// ════════════════════════════════════════════════════════════════
console.log('\n▸ Assembling page content...');

const sections = pageConfig.sections || [];
const filteredSections = sectionFilter
  ? sections.filter(s => s.name === sectionFilter)
  : sections;

if (filteredSections.length === 0) {
  console.error(`No sections matched filter: ${sectionFilter || '(none)'}`);
  console.error('Available sections:', sections.map(s => s.name).join(', '));
  process.exit(1);
}

// Build each section
const allBlocks = [];
const allCSS = [];

for (const section of filteredSections) {
  console.log(`  Building section: ${section.name}`);
  const builder = section.builder;

  if (typeof builder.blocks !== 'function') {
    console.error(`  ✗ Section "${section.name}" builder missing blocks() function`);
    process.exit(1);
  }

  const sectionBlocks = builder.blocks();
  const sectionCSS = typeof builder.css === 'function' ? builder.css() : '';

  allBlocks.push(...(Array.isArray(sectionBlocks) ? sectionBlocks : [sectionBlocks]));
  if (sectionCSS) allCSS.push(sectionCSS);
}

// If building a subset of sections, we need to include ALL sections for the full page
// (MySQL replaces the entire post_content). For partial builds, just build the specified section.
let blockContent;
if (sectionFilter && sections.length > filteredSections.length) {
  // Partial build — only the filtered sections
  blockContent = placeholderWrap(allBlocks);
  console.warn(`  ⚠ Partial build (${filteredSections.length}/${sections.length} sections). Full page requires --section omitted.`);
} else {
  // Full page build
  blockContent = placeholderWrap(allBlocks);
}

const pageLevelCSS = cssAssembler.assemble(allCSS);

// If page config has a pageJS function (for JS script blocks), include it
const pageJS = typeof pageConfig.pageJS === 'function' ? pageConfig.pageJS() : '';

console.log(`  Content: ${blockContent.length} chars`);
console.log(`  CSS: ${pageLevelCSS.length} chars`);
if (pageJS) console.log(`  JS: ${pageJS.length} chars`);

// ════════════════════════════════════════════════════════════════
// STEP 4: DRY RUN OUTPUT
// ════════════════════════════════════════════════════════════════
if (DRY_RUN) {
  console.log('\n=== DRY RUN — No changes will be made ===');

  console.log('\n=== BLOCK STRUCTURE ===');
  const blocks = blockContent.match(/<!-- wp:\S+ /g) || [];
  blocks.forEach(b => console.log('  ' + b.trim()));

  console.log('\n=== BLOCK COUNTS ===');
  const htmlBlocks = (blockContent.match(/<!-- wp:html -->/g) || []).length;
  const codeBlocks = (blockContent.match(/<!-- wp:divi\/code /g) || []).length;
  const textBlocks = (blockContent.match(/<!-- wp:divi\/text /g) || []).length;
  console.log(`  wp:html: ${htmlBlocks}`);
  console.log(`  wp:divi/code: ${codeBlocks}`);
  console.log(`  wp:divi/text: ${textBlocks}`);

  console.log('\n=== CSS CLASSES ===');
  const classes = pageLevelCSS.match(/\.[a-z][\w-]*/g) || [];
  [...new Set(classes)].sort().forEach(c => console.log('  ' + c));

  process.exit(0);
}

// ════════════════════════════════════════════════════════════════
// STEP 5: MYSQL PUSH
// ════════════════════════════════════════════════════════════════
console.log('\n▸ Pushing to WordPress via MySQL...');

const title = pageConfig.title || `${pageName} — Divi 5 Build`;

try {
  mysql.pushPage(pageConfig.pageId, {
    title,
    content: blockContent,
    css: pageLevelCSS,
  });
  console.log('  ✓ Post content updated');
  console.log('  ✓ Post meta updated');

  const verify = mysql.verifyPush(pageConfig.pageId);
  console.log('  ✓ Verification:', verify);
} catch (err) {
  console.error(`  ✗ MySQL error: ${err.message}`);
  process.exit(1);
}

// ════════════════════════════════════════════════════════════════
// STEP 6: CACHE FLUSH
// ════════════════════════════════════════════════════════════════
console.log('\n▸ Flushing Divi CSS cache...');
const cacheResult = cacheFlush.flushPage(pageConfig.pageId, { includeDb: true });
if (cacheResult.disk) console.log('  ✓ Disk cache flushed');
if (cacheResult.db) console.log('  ✓ DB cache flushed');

console.log(`\n✓ Build complete! View at: ${SITE_URL}/?page_id=${pageConfig.pageId}`);
console.log(`  VB: ${SITE_URL}/?page_id=${pageConfig.pageId}&et_fb=1`);

// ════════════════════════════════════════════════════════════════
// STEP 7: VERIFICATION (Gates 1-3)
// ════════════════════════════════════════════════════════════════
if (!NO_VERIFY) {
  console.log('\n▸ Running verification gates...');

  const verifyConfig = {
    pageId: pageConfig.pageId,
    siteUrl: SITE_URL,
    prototypePath: pageConfig.prototypePath,
    goldenRef: pageConfig.goldenRef,
    editabilityRules: pageConfig.editabilityRules || {
      bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
      maxHtmlBlocks: 1,
    },
  };

  const results = verifyRunner.runAll(verifyConfig);
  verifyRunner.printReport(results);

  if (!results.pass) {
    console.error('\n✗ Verification failed. Fix issues and re-run.');
    process.exit(1);
  }
}
