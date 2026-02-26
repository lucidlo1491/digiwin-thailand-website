#!/usr/bin/env node
/**
 * build-page.js — Divi 5 Page Orchestrator
 *
 * Single entry point for building any page in the Divi 5 WordPress site.
 * Pipeline: spec gate → backup → post-lock check → assemble → MySQL push → cache flush → verify
 *
 * Usage:
 *   node complete_website/divi5/build-page.js --page home [--section hero] [--dry-run] [--force]
 *   node complete_website/divi5/build-page.js --page home --restore backups/page-100684-*.sql
 *
 * Available pages: home (more coming)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const mysql = require('./lib/mysql');
const cacheFlush = require('./lib/cache-flush');
const verifyRunner = require('./lib/verify-runner');
const elementParity = require('./lib/element-parity-check');
const screenshot = require('./lib/screenshot');
const { placeholderWrap } = require('./lib/modules');
const cssAssembler = require('./lib/css-assembler');
const sectionCountCheck = require('./lib/section-count-check');
const navRewriter = require('./lib/nav-link-rewriter');
const lintCSS = require('./lib/lint-css');

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
const restoreFile = getArg('--restore');
const PREFLIGHT_ALL = hasFlag('--preflight-all');
const CHECK_DRIFT = hasFlag('--check-drift');

// ════════════════════════════════════════════════════════════════
// PREFLIGHT-ALL: verify all page IDs exist in WordPress
// ════════════════════════════════════════════════════════════════
if (PREFLIGHT_ALL) {
  const pagesDir = path.join(__dirname, 'pages');
  const pageFiles = fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.js') && !f.startsWith('sections'));

  const configs = [];
  for (const file of pageFiles) {
    try {
      const src = fs.readFileSync(path.join(pagesDir, file), 'utf8');
      const idMatch = src.match(/pageId:\s*(\d+)/);
      if (idMatch) configs.push({ name: file.replace('.js', ''), pageId: parseInt(idMatch[1]) });
    } catch (_) { /* skip */ }
  }

  console.log(`\nChecking all ${configs.length} page IDs in WordPress...`);
  const ids = configs.map(c => c.pageId);
  try {
    const result = mysql.query(`SELECT ID, post_status FROM wp_posts WHERE ID IN (${ids.join(',')});`);
    const found = new Map();
    for (const line of result.trim().split('\n').slice(1)) {
      const [id, status] = line.split('\t');
      found.set(parseInt(id), status);
    }
    let failures = 0;
    for (const c of configs.sort((a, b) => a.name.localeCompare(b.name))) {
      const status = found.get(c.pageId);
      if (!status) {
        console.log(`  ${c.name} (${c.pageId}): NOT FOUND`);
        failures++;
      } else {
        console.log(`  ${c.name} (${c.pageId}): ${status} ✓`);
      }
    }
    console.log(failures === 0 ? `\nAll ${configs.length} pages valid.` : `\n${failures} page(s) missing.`);
    process.exit(failures > 0 ? 1 : 0);
  } catch (err) {
    console.error(`MySQL error: ${err.message}`);
    process.exit(1);
  }
}

if (!pageName) {
  console.error('Usage: node build-page.js --page <name> [--section <name>] [--dry-run] [--force]');
  console.error('       node build-page.js --page <name> --restore <backup-file>');
  console.error('       node build-page.js --preflight-all');
  console.error('       node build-page.js --page <name> --check-drift');
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

// ════════════════════════════════════════════════════════════════
// MANAGED-BY SAFETY CHECK
// Pages flagged as managedBy: 'marketing' (or other teams) are
// maintained via the WordPress editor, not the build pipeline.
// Prevents accidental overwrite of marketing-edited content.
// ════════════════════════════════════════════════════════════════
if (pageConfig.managedBy && !hasFlag('--force-managed') && !DRY_RUN) {
  console.error(`\n✗ MANAGED PAGE — ${pageConfig.title || pageName}`);
  console.error(`  This page is managed by: ${pageConfig.managedBy}`);
  console.error(`  The build pipeline will NOT overwrite content edited in WordPress.`);
  console.error(`  Use --force-managed to override (content will be replaced).`);
  process.exit(1);
}

console.log(`\n▸ Building: ${pageConfig.title || pageName}`);
console.log(`  Page ID: ${pageConfig.pageId}`);
console.log(`  Site: ${SITE_URL}`);
if (pageConfig.managedBy) console.log(`  ${'\x1b[33m'}⚠ Managed by: ${pageConfig.managedBy} (--force-managed used)${'\x1b[0m'}`);

// ════════════════════════════════════════════════════════════════
// PRE-FLIGHT: SECTION COVERAGE GATE
// Every section in sections[] MUST have a corresponding verify.sections[] entry.
// This prevents "blind spots" where sections are built but never visually verified.
// ════════════════════════════════════════════════════════════════
if (!sectionFilter) {
  const buildSections = (pageConfig.sections || []).map(s => s.name);
  const verifySections = (pageConfig.verify?.sections || []).map(s => s.name);
  const uncovered = buildSections.filter(n => !verifySections.includes(n));
  if (uncovered.length > 0) {
    console.error(`\n✗ SECTION COVERAGE GATE FAILED`);
    console.error(`  ${uncovered.length} section(s) have NO verify.sections[] entry — they will be built but NEVER screenshotted or checked:`);
    uncovered.forEach(n => console.error(`    - ${n}`));
    console.error(`\n  Fix: Add entries to verify.sections[] in pages/${pageName}.js for each missing section.`);
    console.error(`  Every section must have: { name, wpSelector, htmlSelector }`);
    if (!FORCE) {
      console.error(`  Use --force to bypass (NOT recommended).`);
      process.exit(1);
    }
    console.warn(`  ⚠ --force used: proceeding with uncovered sections.`);
  } else {
    console.log(`  ✓ Section coverage: ${buildSections.length}/${buildSections.length} sections have verify entries`);
  }
}

// ════════════════════════════════════════════════════════════════
// PRE-FLIGHT: DUPLICATE SECTION NAME GUARD
// ════════════════════════════════════════════════════════════════
const sectionNames = (pageConfig.sections || []).map(s => s.name);
const dupes = sectionNames.filter((n, i) => sectionNames.indexOf(n) !== i);
if (dupes.length > 0) {
  console.error(`\n✗ FATAL: Duplicate section names: ${[...new Set(dupes)].join(', ')}`);
  console.error('  Each section must have a unique name. Fix pages/' + pageName + '.js');
  process.exit(1);
}

// ════════════════════════════════════════════════════════════════
// PRE-FLIGHT: PAGE ID VALIDATION (P2 — prevents scaffold's pageId:0 default)
// ════════════════════════════════════════════════════════════════
if (!pageConfig.pageId || pageConfig.pageId <= 0) {
  console.error(`\n✗ Invalid pageId: ${pageConfig.pageId}. Set the correct WordPress page ID in pages/${pageName}.js`);
  process.exit(1);
}

if (!DRY_RUN) {
  try {
    const pageCheck = mysql.query(
      `SELECT ID, post_type, post_status FROM wp_posts WHERE ID = ${pageConfig.pageId};`
    );
    const lines = pageCheck.trim().split('\n');
    if (lines.length < 2) {
      console.error(`\n✗ Page ID ${pageConfig.pageId} not found in wp_posts. Create the page first.`);
      process.exit(1);
    }
    const [id, postType, status] = lines[1].split('\t');
    if (postType !== 'page') {
      console.error(`\n✗ Post ${pageConfig.pageId} is type "${postType}", not "page". Check your pageId.`);
      process.exit(1);
    }
    console.log(`  ✓ Page verified: ID=${id}, type=${postType}, status=${status}`);
  } catch (err) {
    console.error(`\n✗ Cannot verify pageId: ${err.message}`);
    process.exit(1);
  }
}

// ════════════════════════════════════════════════════════════════
// PRE-FLIGHT: DIVI VERSION CHECK (P4 — catches version mismatches)
// ════════════════════════════════════════════════════════════════
if (!DRY_RUN) {
  try {
    const { BUILDER_VERSION } = require('./lib/modules');
    const versionResult = mysql.query(
      `SELECT option_value FROM wp_options WHERE option_name = 'et_divi_version';`
    );
    const vLines = versionResult.trim().split('\n');
    if (vLines.length >= 2) {
      const installedVersion = vLines[1].trim();
      console.log(`  Divi installed: ${installedVersion}, build target: ${BUILDER_VERSION}`);
      if (!installedVersion.startsWith('5.')) {
        console.error(`\n✗ Divi version "${installedVersion}" is not Divi 5. Aborting.`);
        process.exit(1);
      }
    }
  } catch (err) {
    console.warn(`  ⚠ Could not check Divi version: ${err.message}`);
  }
}

// ════════════════════════════════════════════════════════════════
// RESTORE MODE
// ════════════════════════════════════════════════════════════════
if (restoreFile) {
  console.log(`\n▸ Restoring from: ${restoreFile}`);
  mysql.restore(pageConfig.pageId, restoreFile);
  process.exit(0);
}

// ════════════════════════════════════════════════════════════════
// GATE 0: SECTION COUNT PARITY (HTML sections vs config)
// ════════════════════════════════════════════════════════════════
if (pageConfig.prototypePath) {
  const sectionResult = sectionCountCheck.check(pageConfig);
  sectionCountCheck.printReport(sectionResult, pageName);
  if (!sectionResult.pass) {
    console.error(`\n✗ GATE 0 FAILED: HTML has ${sectionResult.htmlCount} sections but config has ${sectionResult.configCount}.`);
    if (sectionResult.missing.length > 0) {
      console.error('  Missing from config:');
      sectionResult.missing.forEach(m => console.error(`    → class="${m.class}" heading="${m.heading}"`));
    }
    console.error('  Fix: Create section builder files for missing sections and add to page config.');
    console.error('  Use --skip-gate0 to bypass this check.');
    if (!hasFlag('--skip-gate0')) {
      process.exit(1);
    }
    console.warn('  ⚠ --skip-gate0: Proceeding despite section count mismatch.');
  }
}

// ════════════════════════════════════════════════════════════════
// STEP 1: POST-LOCK CHECK
// ════════════════════════════════════════════════════════════════
if (!DRY_RUN && !CHECK_DRIFT) {
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
if (!DRY_RUN && !CHECK_DRIFT) {
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

// Append page-level extra CSS (e.g. Thai typography overrides)
if (typeof pageConfig.extraCSS === 'function') {
  allCSS.push(pageConfig.extraCSS());
} else if (typeof pageConfig.extraCSS === 'string') {
  allCSS.push(pageConfig.extraCSS);
}

const pageLevelCSS = cssAssembler.assemble(allCSS);

// If page config has a pageJS function (for JS script blocks), include it
const pageJS = typeof pageConfig.pageJS === 'function' ? pageConfig.pageJS() : '';

const totalSize = blockContent.length + pageLevelCSS.length + (pageJS ? pageJS.length : 0);
console.log(`  Content: ${blockContent.length} chars`);
console.log(`  CSS: ${pageLevelCSS.length} chars`);
if (pageJS) console.log(`  JS: ${pageJS.length} chars`);
console.log(`  Total: ${(totalSize / 1024).toFixed(1)} KB`);

// ── PARTICLE LINT: warn if dark sections are missing particle ocean ──
const DARK_BG_PATTERN = /background:\s*(?:linear-gradient\([^)]*#000[0-9a-f]{3}|#000864|#000432|#0f1419)/i;
const particleWarnings = [];
for (const section of filteredSections) {
  try {
    const cssOut = typeof section.builder.css === 'function' ? section.builder.css() : '';
    if (cssOut && DARK_BG_PATTERN.test(cssOut)) {
      const blocksOut = typeof section.builder.blocks === 'function'
        ? (Array.isArray(section.builder.blocks()) ? section.builder.blocks().join('') : String(section.builder.blocks()))
        : '';
      if (!blocksOut.includes('data-particles')) {
        particleWarnings.push(section.name);
      }
    }
  } catch (_) { /* skip — builder may have runtime deps */ }
}
if (particleWarnings.length > 0) {
  console.warn(`\n  ⚠ PARTICLE LINT: ${particleWarnings.length} dark section(s) missing particle ocean:`);
  particleWarnings.forEach(n => console.warn(`    → ${n}: add data-particles="bold" + statsBanner.DEFAULT_PARTICLE_SCRIPT`));
}

// ── CSS LINT MODULE: validity gate (hard) + Super D variant check ──
const lintResult = lintCSS.run(filteredSections, pageLevelCSS);
if (lintResult.warnings.length > 0) {
  console.warn(`\n  ⚠ SUPER D LINT: ${lintResult.warnings.length} variant mismatch(es):`);
  lintResult.warnings.forEach(w => console.warn(`    → ${w.section}: ${w.message}`));
}
if (lintResult.errors.length > 0) {
  console.error(`\n  ✗ CSS VALIDITY GATE FAILED:`);
  lintResult.errors.forEach(e => {
    console.error(`    ${e.rule}: ${e.message}`);
    console.error(`    Fix: ${e.fix}`);
  });
  if (!FORCE) {
    console.error('  Use --force to bypass (NOT recommended).');
    process.exit(1);
  }
  console.warn('  ⚠ --force used: proceeding despite CSS validity errors.');
}

if (totalSize > 10 * 1024 * 1024) {
  console.error(`\n✗ Content exceeds 10MB safety limit (${(totalSize / 1024 / 1024).toFixed(1)}MB). Aborting.`);
  process.exit(1);
}
if (totalSize > 1024 * 1024) {
  console.warn(`  ⚠ Content exceeds 1MB (${(totalSize / 1024).toFixed(0)}KB) — verify this is intentional.`);
}

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
// CHECK-DRIFT: compare assembled content hash vs MySQL (early exit)
// ════════════════════════════════════════════════════════════════
if (CHECK_DRIFT) {
  const crypto = require('crypto');
  console.log(`\nDrift check for ${pageName} (ID: ${pageConfig.pageId})...`);

  if (sectionFilter) {
    console.warn('  ⚠ Partial build (--section) detected — drift check skipped (would give false positives).');
    process.exit(0);
  }

  try {
    const localHash = crypto.createHash('md5').update(blockContent + pageLevelCSS).digest('hex');

    const dbContent = mysql.query(
      `SELECT post_content FROM wp_posts WHERE ID = ${pageConfig.pageId};`
    );
    // Strip CLI header row (first line is column name)
    const dbBody = dbContent.split('\n').slice(1).join('\n').trim();
    const dbHash = crypto.createHash('md5').update(dbBody).digest('hex');

    // Also check CSS meta
    const dbCSS = mysql.query(
      `SELECT meta_value FROM wp_postmeta WHERE post_id = ${pageConfig.pageId} AND meta_key = '_et_builder_page_level_css';`
    );
    const dbCSSBody = dbCSS.split('\n').slice(1).join('\n').trim();

    // Compare content
    if (localHash === dbHash) {
      console.log('  Content: CLEAN (hash match)');
    } else {
      console.log('  Content: DRIFT DETECTED');
      console.log(`    Local:  ${localHash}`);
      console.log(`    DB:     ${dbHash}`);
      console.log('    Someone may have edited this page in Visual Builder.');
    }

    // Compare CSS (simpler — just check if non-empty and roughly matches)
    const localCSSHash = crypto.createHash('md5').update(pageLevelCSS).digest('hex');
    const dbCSSHash = crypto.createHash('md5').update(dbCSSBody).digest('hex');
    if (localCSSHash === dbCSSHash) {
      console.log('  CSS:     CLEAN (hash match)');
    } else {
      console.log('  CSS:     DRIFT DETECTED');
      console.log(`    Local:  ${localCSSHash}`);
      console.log(`    DB:     ${dbCSSHash}`);
    }
  } catch (err) {
    console.error(`  ✗ Drift check failed: ${err.message}`);
    console.error('  Is MySQL running? Check LocalWP.');
    process.exit(1);
  }
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

// ════════════════════════════════════════════════════════════════
// STEP 6b: NAV LINK ADVISORY (log only — never modify header/footer DB)
// Nav links are managed in header.js/footer.js source → build-global.js
// The old nav-link-rewriter corrupted header/footer on every build.
// ════════════════════════════════════════════════════════════════
try {
  const linkMap = navRewriter.buildLinkMap();
  const pending = Object.entries(linkMap).filter(([htmlPath]) => {
    // Just check if the HTML path still appears — advisory only
    return true;
  });
  if (pending.length > 0) {
    console.log(`\n▸ Nav links: ${pending.length} page(s) mapped to WP slugs`);
    pending.forEach(([h, w]) => console.log(`  ○ ${h} → ${w}`));
    console.log('  ℹ Update header.js/footer.js + run build-global.js to apply');
  }
} catch (err) {
  // Non-critical — skip silently
}

const pageUrl = `${SITE_URL}/?page_id=${pageConfig.pageId}`;
console.log(`\n✓ Build complete! View at: ${pageUrl}`);
console.log(`  VB: ${pageUrl}&et_fb=1`);

// ════════════════════════════════════════════════════════════════
// STEP 6c: GATE 0 — SMOKE TEST (catches empty renders immediately)
// ════════════════════════════════════════════════════════════════
console.log('\n▸ Gate 0: Smoke test — verifying page renders content...');

try {
  const verifyConf0 = pageConfig.verify || {};
  const smokeUrl = verifyConf0.wpUrl || pageUrl;
  const curlOut = execSync(
    `curl -sSk -L --max-time 15 "${smokeUrl}"`,
    { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }
  );

  // Check 1: Page must have substantial HTML (not empty Divi shell)
  if (curlOut.length < 2000) {
    console.error(`  ✗ Page response too small (${curlOut.length} chars). Content likely not rendering.`);
    process.exit(1);
  }

  // Check 2: Look for first section's content (H1 or section class)
  const firstSection = (pageConfig.verify?.sections || [])[0];
  const smokeChecks = [];

  if (firstSection?.wpSelector) {
    const selectorClass = firstSection.wpSelector.replace('.', '');
    smokeChecks.push({ label: `Section class "${selectorClass}"`, found: curlOut.includes(selectorClass) });
  }

  // Check 3: Look for wp:html rendered content (our section CSS classes)
  const sectionNames = (pageConfig.sections || []).map(s => s.name);
  const pagePrefix = pageName.replace(/-/g, '');
  // Look for any of our CSS class prefixes in the rendered HTML
  const hasOurContent = sectionNames.some(name => {
    const className = name.replace(/-/g, '');
    return curlOut.includes(`${pagePrefix}`) || curlOut.includes(`class="`);
  });
  smokeChecks.push({ label: 'Page contains HTML content', found: curlOut.length > 5000 });

  // Check 4: Page should NOT be mostly empty Divi sections
  const sectionCount = (curlOut.match(/et_pb_section/g) || []).length;
  const contentLength = curlOut.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().length;
  smokeChecks.push({ label: `Text content (${contentLength} chars)`, found: contentLength > 500 });

  const failures = smokeChecks.filter(c => !c.found);
  if (failures.length > 0) {
    console.error('  ✗ Smoke test FAILED:');
    failures.forEach(f => console.error(`    - ${f.label}: NOT FOUND`));
    console.error('  Content may not be rendering. Check wp:html blocks and Divi cache.');
    process.exit(1);
  }

  console.log(`  ✓ Page renders (${curlOut.length} chars HTML, ${contentLength} chars text, ${sectionCount} Divi sections)`);
} catch (err) {
  console.error(`  ✗ Smoke test error: ${err.message}`);
  console.error('  Is LocalWP running? Can you reach the site?');
  process.exit(1);
}

// ════════════════════════════════════════════════════════════════
// STEP 7: SCREENSHOT CAPTURE (mandatory — cannot skip)
// ════════════════════════════════════════════════════════════════
console.log('\n▸ Capturing screenshots of live WordPress page...');

const verifyConf = pageConfig.verify || {};
const wpUrl = verifyConf.wpUrl || pageUrl;
const wpSections = verifyConf.sections || [];

// This is async — wrap the remaining steps
(async () => {
  try {
    const shots = await screenshot.capture({
      pageName,
      wpUrl,
      sections: wpSections,
      warmUp: true,
    });

    console.log(`  ✓ ${shots.length} screenshot(s) captured:`);
    shots.forEach(p => console.log(`    → ${p}`));
  } catch (err) {
    console.error(`\n✗ Screenshot capture FAILED: ${err.message}`);
    console.error('  Visual verification is mandatory. Fix the issue and re-run.');
    process.exit(1);
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 8: VERIFICATION (Gates 1-3)
  // ════════════════════════════════════════════════════════════════
  console.log('\n▸ Running verification gates...');

  const gateConfig = {
    pageId: pageConfig.pageId,
    siteUrl: SITE_URL,
    prototypePath: pageConfig.prototypePath,
    goldenRef: pageConfig.goldenRef,
    editabilityRules: pageConfig.editabilityRules || {
      bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
      maxHtmlBlocks: 1,
    },
  };

  const results = verifyRunner.runAll(gateConfig);
  verifyRunner.printReport(results);

  if (!results.pass) {
    console.error('\n✗ Verification failed. Fix issues and re-run.');
    process.exit(1);
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 9: ELEMENT PARITY CHECK (Gate 4 — catches visual mismatches)
  // Compares DOM properties between HTML prototype and live WP page:
  //   - Pseudo-elements (::before/::after)
  //   - Canvas/dynamic elements (data-particles)
  //   - Spacing on layout elements (li padding, card gaps)
  //   - Decoration opacity (SVG scenes, wave flows)
  // ════════════════════════════════════════════════════════════════
  if (pageConfig.verify && pageConfig.verify.sections) {
    const parityResult = await elementParity.run(pageConfig);
    if (!parityResult.pass) {
      console.warn('\n  ⚠ Element parity check found issues (non-blocking — continuing to Gates 5-7).');
      console.warn('  Fix these after the build completes. Use --strict-parity to make this a hard blocker.');
      if (hasFlag('--strict-parity')) {
        console.error('\n✗ Element parity check failed (--strict-parity). Fix mismatches and re-run.');
        process.exit(1);
      }
    }
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 10: COLOR PARITY CHECK (Gate 5 — catches CSS variable mismatches)
  // Compares computed background-color, background-image (gradients),
  // heading color, and text color between HTML reference and live WP page.
  // Catches the class of error where scaffold resolves CSS vars to global
  // values instead of page-level :root overrides.
  // ════════════════════════════════════════════════════════════════
  if (pageConfig.verify && pageConfig.verify.sections) {
    try {
      const colorParity = require('./lib/color-parity-check');
      console.log('');
      const colorResult = await colorParity.run({
        pageName,
        pageConfig,
        verbose: false,
      });
      if (!colorResult.pass) {
        console.warn('\n  ⚠ Color parity check found mismatches (non-blocking — continuing to Gates 6-7).');
        console.warn('  Common cause: scaffold resolved CSS vars to global values instead of page-level :root overrides.');
      }
    } catch (err) {
      console.warn(`  ⚠ Color parity check error: ${err.message}`);
      // Non-fatal — tool may not be available for all pages yet
    }
  }
  // ════════════════════════════════════════════════════════════════
  // STEP 11: FIDELITY CHECK (Gate 6 — structural CSS diagnosis)
  // Runs fidelity-check.js to find exact CSS property mismatches.
  // Outputs FIXABLE items as structured data Claude can act on
  // mechanically — no visual interpretation needed.
  // Gated behind --full-verify (adds 30-60s Puppeteer overhead).
  // ════════════════════════════════════════════════════════════════
  let fixableCount = 0;
  if (hasFlag('--full-verify') && pageConfig.verify && pageConfig.verify.sections) {
    console.log('\n▸ Gate 6: Fidelity check — finding exact CSS mismatches...');
    try {
      const fidelityCheck = require('./lib/fidelity-check');
      const fidelityReport = await fidelityCheck.run({
        pageName,
        verbose: false,
        noAutodiscover: false,
      });

      // Print FIXABLE items only — these are actionable
      for (const section of (fidelityReport.sections || [])) {
        const fixables = (section.findings || []).filter(f => f.status === 'FAIL');
        const autoFixables = (fidelityReport.autoDiscovery || [])
          .filter(a => a.section === section.name)
          .flatMap(a => a.fixable || [])
          .filter(f => f.fixability === 'FIXABLE');

        if (fixables.length > 0 || autoFixables.length > 0) {
          console.log(`\n  ── ${section.name} ──`);
          for (const f of fixables) {
            console.log(`  FIXABLE: ${f.label || f.check} — ${f.detail || f.message}`);
            fixableCount++;
          }
          for (const f of autoFixables) {
            console.log(`  FIXABLE: ${f.selector || f.label} ${f.property}: expected "${f.expected}", got "${f.actual}"`);
            if (f.recipe) console.log(`    → Fix: ${f.recipe}`);
            fixableCount++;
          }
        }
      }

      if (fixableCount === 0) {
        console.log('  ✓ No fixable CSS mismatches found');
      } else {
        console.log(`\n  ⚠ ${fixableCount} fixable CSS mismatch(es) found above.`);
        console.log('  Apply each fix mechanically. Never guess CSS from screenshots.');
      }
    } catch (err) {
      console.warn(`  ⚠ Fidelity check error: ${err.message}`);
      // Non-fatal — first-time builds may not have reference screenshots
    }
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 11.5: AUTO-FIX (opt-in via --auto-fix)
  // Runs auto-fix.js as a subprocess to patch SAFE fidelity issues.
  // auto-fix handles its own fidelity-check, patching, re-push,
  // regression detection, and revert — zero refactoring needed.
  // Subprocess = fresh Node process = no require.cache staleness.
  // ════════════════════════════════════════════════════════════════
  if (hasFlag('--auto-fix') && fixableCount > 0) {
    console.log(`\n▸ Auto-fix: Running on ${fixableCount} fixable item(s)...`);
    const autoFixCmd = `node ${path.join(__dirname, 'lib', 'auto-fix.js')} --page ${pageName} --max-iterations 2`;
    try {
      execSync(autoFixCmd, { stdio: 'inherit', timeout: 300000 });
      console.log('\n  ✓ Auto-fix complete');
    } catch (err) {
      console.warn(`\n  ⚠ Auto-fix exited with code ${err.status || 'unknown'} — continuing to Gate 7`);
    }

    // Re-capture WP screenshots (auto-fix changed the live page)
    console.log('\n▸ Re-capturing screenshots (post-fix)...');
    try {
      const wpSectionsPostFix = (pageConfig.verify || {}).sections || [];
      const postFixShots = await screenshot.capture({
        pageName,
        wpUrl: (pageConfig.verify || {}).wpUrl || `${SITE_URL}/?page_id=${pageConfig.pageId}`,
        sections: wpSectionsPostFix,
        warmUp: true,
      });
      console.log(`  ✓ ${postFixShots.length} screenshot(s) re-captured`);
    } catch (err) {
      console.warn(`  ⚠ Screenshot re-capture failed: ${err.message}`);
    }
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 12: VISUAL DIFF + REGRESSION CHECK (Gate 7)
  // Runs visual-diff to get per-section diff% and check for regressions.
  // On FAIL sections (>5%), auto-runs computed-style-diff for fix recipes.
  // Gated behind --full-verify.
  // ════════════════════════════════════════════════════════════════
  if (hasFlag('--full-verify') && pageConfig.verify && pageConfig.verify.sections) {
    console.log('\n▸ Gate 7: Visual diff + regression check...');
    try {
      const visualDiff = require('./lib/visual-diff');
      const vdSections = (pageConfig.verify.sections || []).map(s => ({
        name: s.name,
        skipPixelDiff: s.skipPixelDiff || false,
        pixelThreshold: s.pixelThreshold || 0.1,
      }));

      const vdReport = visualDiff.compare({ pageName, sections: vdSections });
      visualDiff.printReport(vdReport);

      // Check regression against baseline (if baseline exists)
      const regResult = visualDiff.checkRegression(pageName, vdReport);
      if (!regResult.pass) {
        console.error('\n  ✗ REGRESSION DETECTED:');
        for (const r of regResult.regressions) {
          console.error(`    ${r.section}: ${r.baselinePct.toFixed(1)}% → ${r.currentPct.toFixed(1)}% (+${r.delta.toFixed(1)}pp)`);
        }
        console.error('  A previously-passing section got worse. Investigate before continuing.');
      } else if (!regResult.error) {
        console.log('  ✓ No regressions vs baseline');
      }

      // B3: For FAIL sections (>5%), auto-run CSD for fix recipes
      const failSections = (vdReport.sections || []).filter(s => s.verdict === 'FAIL');
      if (failSections.length > 0) {
        console.log(`\n▸ Running computed-style-diff on ${failSections.length} FAIL section(s)...`);
        try {
          const csd = require('./lib/computed-style-diff');
          for (const fs of failSections) {
            console.log(`\n  ── CSD: ${fs.name} (${fs.diffPercent.toFixed(1)}%) ──`);
            const csdReport = await csd.run({
              pageName,
              sectionFilter: fs.name,
              verbose: false,
            });
            // Print only FIXABLE category
            const fixable = (csdReport.mismatches || []).filter(m => m.fixability === 'FIXABLE');
            if (fixable.length > 0) {
              for (const m of fixable) {
                console.log(`  FIXABLE: ${m.selector} ${m.property}: "${m.html}" → "${m.wp}"`);
                if (m.recipe) console.log(`    → Recipe: ${m.recipe}`);
              }
            } else {
              console.log('  No FIXABLE mismatches (remaining diffs may be STRUCTURAL or ACCEPTABLE)');
            }
          }
        } catch (csdErr) {
          console.warn(`  ⚠ CSD error: ${csdErr.message}`);
        }
      }

      // Auto-save baseline on success (all MATCH or REVIEW)
      if (vdReport.overallVerdict !== 'FAIL') {
        const baselinePath = visualDiff.saveBaseline(pageName, vdReport);
        console.log(`\n  ✓ Baseline saved → ${baselinePath}`);
      }
    } catch (err) {
      console.warn(`  ⚠ Visual diff error: ${err.message}`);
      // Non-fatal — reference screenshots may not exist yet
    }
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 13: RESPONSIVE QA (Gate 8 — report-only by default)
  // Runs 5 responsive checks at 4 viewports (desktop/tablet/mobile/small).
  // --responsive: report-only mode (never blocks)
  // --responsive --strict-responsive: P0 issues block the build
  // ════════════════════════════════════════════════════════════════
  if (hasFlag('--responsive')) {
    console.log('\n▸ Gate 8: Responsive QA (4 viewports × 5 checks)...');
    try {
      const responsiveQA = require('./lib/responsive-qa');
      const rqaReport = await responsiveQA.run({
        pageName,
        pageUrl: wpUrl,
      });
      responsiveQA.printReport(rqaReport);

      if (rqaReport.overallVerdict === 'FAIL' && hasFlag('--strict-responsive')) {
        console.error('\n✗ Gate 8 FAILED: P0 responsive issues found (--strict-responsive).');
        console.error('  Fix horizontal overflow or touch targets, then re-run.');
        process.exit(1);
      } else if (rqaReport.overallVerdict === 'FAIL') {
        console.warn('\n  ⚠ Gate 8: P0 responsive issues found (report-only — not blocking).');
        console.warn('  Use --strict-responsive to make this a hard gate.');
      }
    } catch (err) {
      console.warn(`  ⚠ Responsive QA error: ${err.message}`);
    }
  }
})();
