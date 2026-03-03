#!/usr/bin/env node
/**
 * verify-library-template.js — Visual verification for Layout Library templates
 *
 * Pushes a template to a test page, captures a screenshot, and compares
 * against a saved baseline using pixelmatch.
 *
 * Usage:
 *   node verify-library-template.js --template event-hero-vb
 *   node verify-library-template.js --template event-hero-vb --save-baseline
 *   node verify-library-template.js --list
 *
 * Baselines stored in: complete_website/divi5/library-baselines/
 */

const fs = require('fs');
const path = require('path');
const { templates } = require('./templates/index');
const { EXAMPLE_DATA, pushTemplate } = require('./library-push');
const { checkValidity, checkFreeFormValidity } = require('./lint-css');
const cacheFlush = require('./cache-flush');

const BASELINES_DIR = path.join(__dirname, '..', 'library-baselines');
const TEST_PAGE_CONFIG = path.join(__dirname, '..', 'library-test-page.json');

// Verdicts: same thresholds as visual-diff.js
const THRESHOLDS = { MATCH: 0.02, REVIEW: 0.05 };

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getTestPageId() {
  if (!fs.existsSync(TEST_PAGE_CONFIG)) {
    console.error('No test page configured. Create library-test-page.json with { "pageId": <WP_POST_ID> }');
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(TEST_PAGE_CONFIG, 'utf8'));
  return config.pageId;
}

async function captureScreenshot(pageId) {
  const screenshot = require('./screenshot');
  const results = await screenshot.capture({
    pageId,
    outputDir: path.join(BASELINES_DIR, 'captures'),
    sections: false,
  });
  return results.fullPage;
}

function compareImages(actualPath, baselinePath) {
  let pixelmatch, PNG;
  try {
    pixelmatch = require('pixelmatch');
    PNG = require('pngjs').PNG;
  } catch {
    console.warn('  pixelmatch/pngjs not available — skipping visual comparison');
    return { verdict: 'SKIP', diffPercent: 0 };
  }

  if (!fs.existsSync(baselinePath)) {
    return { verdict: 'NO_BASELINE', diffPercent: 100 };
  }

  const img1 = PNG.sync.read(fs.readFileSync(actualPath));
  const img2 = PNG.sync.read(fs.readFileSync(baselinePath));

  if (img1.width !== img2.width || img1.height !== img2.height) {
    return { verdict: 'SIZE_MISMATCH', diffPercent: 100 };
  }

  const diff = new PNG({ width: img1.width, height: img1.height });
  const numDiff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });
  const totalPixels = img1.width * img1.height;
  const diffPercent = numDiff / totalPixels;

  let verdict;
  if (diffPercent <= THRESHOLDS.MATCH) verdict = 'MATCH';
  else if (diffPercent <= THRESHOLDS.REVIEW) verdict = 'REVIEW';
  else verdict = 'FAIL';

  // Save diff image
  const diffPath = actualPath.replace('.png', '-diff.png');
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return { verdict, diffPercent: (diffPercent * 100).toFixed(2), diffPath };
}

async function verify(templateName, saveBaseline = false) {
  const tmpl = templates[templateName];
  if (!tmpl) {
    console.error(`Template not found: ${templateName}`);
    process.exit(1);
  }

  const data = EXAMPLE_DATA[templateName];
  if (!data) {
    console.error(`No example data for template: ${templateName}`);
    process.exit(1);
  }

  console.log(`\n▸ Verify Library Template: ${templateName}`);
  console.log('─'.repeat(50));

  // Step 1: Lint CSS
  console.log('\n  Step 1: Lint freeForm CSS');
  if (typeof tmpl.lintableCSS === 'function') {
    const cssResult = checkFreeFormValidity(tmpl.lintableCSS(data));
    if (cssResult.errors.length > 0) {
      console.error('  ✗ CSS lint failed:');
      cssResult.errors.forEach(e => console.error(`    ${e.rule}: ${e.message}`));
      process.exit(1);
    }
    if (cssResult.warnings.length > 0) {
      cssResult.warnings.forEach(w => console.warn(`  ⚠ ${w.rule}: ${w.message}`));
    }
    console.log('  ✓ CSS lint passed');
  } else {
    console.log('  ⚠ No lintableCSS export — skipping');
  }

  // Step 2: Verify blocks generate without error
  console.log('\n  Step 2: Generate blocks');
  try {
    const blocksArr = tmpl.blocks(data);
    const content = Array.isArray(blocksArr) ? blocksArr.join('\n') : blocksArr;
    console.log(`  ✓ ${content.length} chars generated`);
  } catch (err) {
    console.error(`  ✗ Block generation failed: ${err.message}`);
    process.exit(1);
  }

  // Step 3: Push to test page + screenshot (requires LocalWP)
  let testPageId;
  try {
    testPageId = getTestPageId();
  } catch {
    console.log('\n  Step 3: Screenshot comparison — SKIPPED (no test page)');
    console.log('\n  To enable visual verification:');
    console.log('  1. Create a test page in WP admin');
    console.log('  2. Save its ID: echo \'{"pageId": 12345}\' > library-test-page.json');
    return;
  }

  console.log(`\n  Step 3: Push to test page #${testPageId}`);
  pushTemplate(templateName, tmpl, false);
  cacheFlush.flushPage(testPageId);

  console.log('\n  Step 4: Capture screenshot');
  const screenshotPath = await captureScreenshot(testPageId);

  ensureDir(BASELINES_DIR);
  const baselinePath = path.join(BASELINES_DIR, `${templateName}-baseline.png`);

  if (saveBaseline) {
    fs.copyFileSync(screenshotPath, baselinePath);
    console.log(`  ✓ Baseline saved: ${baselinePath}`);
    return;
  }

  console.log('\n  Step 5: Compare against baseline');
  const result = compareImages(screenshotPath, baselinePath);

  if (result.verdict === 'NO_BASELINE') {
    console.log('  ⚠ No baseline found. Run with --save-baseline first.');
    return;
  }

  const icon = result.verdict === 'MATCH' ? '✓' : result.verdict === 'REVIEW' ? '⚠' : '✗';
  console.log(`  ${icon} ${result.verdict} (${result.diffPercent}% different)`);
  if (result.diffPath) console.log(`    Diff image: ${result.diffPath}`);

  if (result.verdict === 'FAIL') process.exit(1);
}

// ── CLI ──
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--list')) {
    console.log('\nTemplates with lintableCSS (verifiable):');
    Object.entries(templates).forEach(([name, tmpl]) => {
      const lint = typeof tmpl.lintableCSS === 'function' ? '✓' : '·';
      console.log(`  ${lint} ${name}`);
    });
    return;
  }

  const tmplIdx = args.indexOf('--template');
  const templateName = tmplIdx !== -1 ? args[tmplIdx + 1] : null;
  const saveBaseline = args.includes('--save-baseline');

  if (!templateName) {
    console.log('Usage:');
    console.log('  node verify-library-template.js --template <name> [--save-baseline]');
    console.log('  node verify-library-template.js --list');
    process.exit(0);
  }

  verify(templateName, saveBaseline).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { verify };
