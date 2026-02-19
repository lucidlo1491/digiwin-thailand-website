/**
 * visual-diff.js — Visual comparison engine (v2)
 *
 * v2 changes over v1:
 * - Element presence verification (catches missing SVGs that pixelmatch misses)
 * - Per-section thresholds from page config (no more global 10% hard ceiling)
 * - Three-tier verdicts: MATCH / REVIEW / FAIL
 * - Advisory role (warns, doesn't block) — property-level checks remain the gate
 * - Puppeteer-based element visibility checks (opacity, dimensions, visibility)
 *
 * Usage (standalone):
 *   node complete_website/divi5/lib/visual-diff.js --page home [--presence-check]
 *
 * Usage (library):
 *   const visualDiff = require('./lib/visual-diff');
 *   const report = visualDiff.compare({ pageName, sections });
 *   const presence = await visualDiff.checkElementPresence({ wpUrl, sections });
 */

const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;

const REF_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'reference');
const WP_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'verify');
const DIFF_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'diffs');

/** Default pixelmatch threshold (0 = exact, 1 = anything matches) */
const DEFAULT_THRESHOLD = 0.1;
/** Default per-section max diff % (used if section config doesn't specify) */
const DEFAULT_MAX_DIFF_PCT = 10;

/** Three-tier verdict thresholds */
const MATCH_CEILING = 3;   // <3% = MATCH
const REVIEW_CEILING = 8;  // 3-8% = REVIEW (needs human look)
// >section.maxDiffPct = FAIL

/**
 * Determine three-tier verdict from diff percentage.
 * @param {number} diffPct
 * @param {number} maxDiffPct — per-section threshold
 * @returns {'MATCH'|'REVIEW'|'FAIL'}
 */
function verdict(diffPct, maxDiffPct) {
  if (diffPct <= MATCH_CEILING) return 'MATCH';
  if (diffPct <= Math.min(REVIEW_CEILING, maxDiffPct)) return 'REVIEW';
  return 'FAIL';
}

/**
 * Load a PNG file and return { data, width, height }
 */
function loadPNG(filePath) {
  const buffer = fs.readFileSync(filePath);
  const png = PNG.sync.read(buffer);
  return { data: png.data, width: png.width, height: png.height };
}

/**
 * Find the most recent WP screenshot matching the pattern: {pageName}-{sectionName}-*.png
 */
function findLatestWPScreenshot(pageName, sectionName) {
  if (!fs.existsSync(WP_DIR)) return null;

  const files = fs.readdirSync(WP_DIR)
    .filter(f => f.startsWith(`${pageName}-${sectionName}-`) && f.endsWith('.png'))
    .sort()
    .reverse();

  if (files.length > 0) return path.join(WP_DIR, files[0]);

  if (sectionName === 'fullpage') {
    const fullFiles = fs.readdirSync(WP_DIR)
      .filter(f => f.startsWith(`${pageName}-`) && f.includes('fullpage') && f.endsWith('.png'))
      .sort()
      .reverse();
    if (fullFiles.length > 0) return path.join(WP_DIR, fullFiles[0]);
  }

  return null;
}

/**
 * Compare a single section's screenshots.
 *
 * @param {string} refPath  — path to reference PNG
 * @param {string} wpPath   — path to WordPress PNG
 * @param {string} diffPath — path to write diff PNG
 * @param {object} [opts]
 * @param {number} [opts.threshold]      — pixelmatch threshold (default 0.1)
 * @param {number} [opts.maxDiffPct]     — per-section max diff threshold
 * @param {boolean} [opts.skipPixelDiff] — skip pixel comparison (for animated sections)
 * @returns {{ diffPercent, diffPixels, totalPixels, verdict, skipped, error? }}
 */
function compareSection(refPath, wpPath, diffPath, opts = {}) {
  const maxDiffPct = opts.maxDiffPct ?? DEFAULT_MAX_DIFF_PCT;

  if (opts.skipPixelDiff) {
    return { diffPercent: 0, diffPixels: 0, totalPixels: 0, verdict: 'MATCH', skipped: true };
  }

  const ref = loadPNG(refPath);
  const wp = loadPNG(wpPath);

  let width = Math.min(ref.width, wp.width);
  let height = Math.min(ref.height, wp.height);

  const heightDiff = Math.abs(ref.height - wp.height) / Math.max(ref.height, wp.height);
  const widthDiff = Math.abs(ref.width - wp.width) / Math.max(ref.width, wp.width);

  if (heightDiff > 0.25 || widthDiff > 0.10) {
    return {
      diffPercent: 100,
      diffPixels: -1,
      totalPixels: -1,
      verdict: 'FAIL',
      skipped: false,
      error: `Size mismatch: ref ${ref.width}x${ref.height} vs wp ${wp.width}x${wp.height} (>${(Math.max(heightDiff, widthDiff) * 100).toFixed(0)}% difference)`,
    };
  }

  const refCropped = cropImageData(ref.data, ref.width, ref.height, width, height);
  const wpCropped = cropImageData(wp.data, wp.width, wp.height, width, height);

  const diff = new PNG({ width, height });
  const threshold = opts.threshold ?? DEFAULT_THRESHOLD;

  const diffPixels = pixelmatch(refCropped, wpCropped, diff.data, width, height, {
    threshold,
    includeAA: false,
  });

  fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPercent = Math.round(((diffPixels / totalPixels) * 100) * 100) / 100;

  return {
    diffPercent,
    diffPixels,
    totalPixels,
    verdict: verdict(diffPercent, maxDiffPct),
    skipped: false,
  };
}

/**
 * Crop raw RGBA data to target dimensions (top-left crop).
 */
function cropImageData(data, srcWidth, srcHeight, targetWidth, targetHeight) {
  const cropped = Buffer.alloc(targetWidth * targetHeight * 4);
  for (let y = 0; y < targetHeight; y++) {
    const srcOffset = y * srcWidth * 4;
    const dstOffset = y * targetWidth * 4;
    data.copy(cropped, dstOffset, srcOffset, srcOffset + targetWidth * 4);
  }
  return cropped;
}

/**
 * Compare all sections for a page (pixel-level).
 *
 * @param {object} opts
 * @param {string} opts.pageName  — e.g. 'home'
 * @param {Array}  opts.sections  — [{ name, skipPixelDiff?, maxDiffPct?, pixelThreshold? }]
 * @returns {{ sections: Array, overallVerdict: string, summary: string }}
 */
function compare({ pageName, sections = [] }) {
  fs.mkdirSync(DIFF_DIR, { recursive: true });

  const results = [];

  // Full-page comparison
  const refFull = path.join(REF_DIR, `${pageName}-fullpage.png`);
  const wpFull = findLatestWPScreenshot(pageName, 'fullpage');
  if (fs.existsSync(refFull) && wpFull) {
    const diffFull = path.join(DIFF_DIR, `${pageName}-fullpage-diff.png`);
    const result = compareSection(refFull, wpFull, diffFull);
    results.push({ section: 'fullpage', refPath: refFull, wpPath: wpFull, diffPath: diffFull, ...result });
  }

  // Per-section comparison
  for (const section of sections) {
    const refPath = path.join(REF_DIR, `${pageName}-${section.name}.png`);
    const wpPath = findLatestWPScreenshot(pageName, section.name);

    if (!fs.existsSync(refPath)) {
      results.push({ section: section.name, verdict: 'FAIL', error: 'Reference screenshot missing', skipped: false });
      continue;
    }
    if (!wpPath) {
      results.push({ section: section.name, verdict: 'FAIL', error: 'WordPress screenshot missing', skipped: false });
      continue;
    }

    const diffPath = path.join(DIFF_DIR, `${pageName}-${section.name}-diff.png`);
    const result = compareSection(refPath, wpPath, diffPath, {
      skipPixelDiff: section.skipPixelDiff,
      maxDiffPct: section.maxDiffPct ?? DEFAULT_MAX_DIFF_PCT,
      threshold: section.pixelThreshold ?? DEFAULT_THRESHOLD,
    });

    results.push({
      section: section.name,
      refPath,
      wpPath,
      diffPath,
      note: section.note,
      ...result,
    });
  }

  // Overall verdict: worst of all sections
  const verdicts = results.map(r => r.verdict);
  let overallVerdict = 'MATCH';
  if (verdicts.includes('FAIL')) overallVerdict = 'FAIL';
  else if (verdicts.includes('REVIEW')) overallVerdict = 'REVIEW';

  const failCount = results.filter(r => r.verdict === 'FAIL').length;
  const reviewCount = results.filter(r => r.verdict === 'REVIEW').length;
  const matchCount = results.filter(r => r.verdict === 'MATCH').length;
  const skipCount = results.filter(r => r.skipped).length;

  const summary = `${matchCount} MATCH, ${reviewCount} REVIEW, ${failCount} FAIL (${skipCount} skipped)`;

  return { sections: results, overallVerdict, summary };
}

/**
 * Check element presence and visibility on the live WordPress page.
 * Uses Puppeteer to verify that required DOM elements exist, are visible,
 * and have non-zero dimensions.
 *
 * @param {object} opts
 * @param {string} opts.wpUrl       — WordPress page URL
 * @param {Array}  opts.sections    — [{ name, wpSelector, requiredElements: [{ selector, label, minOpacity? }] }]
 * @returns {Array<{ section, elements: [{ selector, label, found, visible, opacity, width, height }] }>}
 */
async function checkElementPresence({ wpUrl, sections = [] }) {
  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--ignore-certificate-errors', '--no-sandbox', '--font-render-hinting=none'],
  });

  const results = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(wpUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 3000)); // Let Divi hydrate + JS execute

    for (const section of sections) {
      if (!section.requiredElements || section.requiredElements.length === 0) continue;

      const sectionResults = [];

      for (const req of section.requiredElements) {
        const check = await page.evaluate((sel, minOp) => {
          const els = document.querySelectorAll(sel);
          if (els.length === 0) return { found: false, count: 0 };

          // Check first matching element
          const el = els[0];
          const style = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const opacity = parseFloat(style.opacity);
          const visibility = style.visibility;
          const display = style.display;

          return {
            found: true,
            count: els.length,
            visible: visibility !== 'hidden' && display !== 'none' && opacity >= (minOp || 0.01),
            opacity,
            visibility,
            display,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            hasArea: rect.width > 0 && rect.height > 0,
          };
        }, req.selector, req.minOpacity || 0.01);

        sectionResults.push({
          selector: req.selector,
          label: req.label,
          ...check,
          pass: check.found && check.visible && check.hasArea,
        });
      }

      results.push({
        section: section.name,
        elements: sectionResults,
        allPresent: sectionResults.every(r => r.pass),
        missingCount: sectionResults.filter(r => !r.pass).length,
      });
    }
  } finally {
    await browser.close();
  }

  return results;
}

/**
 * Print a formatted report to console.
 */
function printReport(report) {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║          VISUAL DIFF REPORT (v2 — Advisory)             ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  for (const r of report.sections) {
    const icons = { MATCH: '✓', REVIEW: '◎', FAIL: '✗' };
    const icon = r.skipped ? '⊘' : (icons[r.verdict] || '?');
    const status = r.skipped ? 'SKIP' : r.verdict;
    const detail = r.error || (r.skipped ? 'pixel diff skipped' : `${r.diffPercent}% diff`);
    const note = r.note ? ` (${r.note})` : '';
    console.log(`  ${icon} [${status}] ${r.section}: ${detail}${note}`);
    if (r.diffPath && !r.skipped) {
      console.log(`           diff → ${r.diffPath}`);
    }
  }

  console.log(`\n  Overall: ${report.overallVerdict} — ${report.summary}`);
}

/**
 * Print element presence report.
 */
function printPresenceReport(presenceResults) {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║          ELEMENT PRESENCE REPORT                        ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  for (const section of presenceResults) {
    const sIcon = section.allPresent ? '✓' : '✗';
    console.log(`  ${sIcon} ${section.section}: ${section.missingCount === 0 ? 'all elements present' : `${section.missingCount} MISSING`}`);

    for (const el of section.elements) {
      const eIcon = el.pass ? '  ✓' : '  ✗';
      if (el.pass) {
        console.log(`    ${eIcon} ${el.label} (${el.count} found, ${el.width}x${el.height}, opacity=${el.opacity})`);
      } else if (!el.found) {
        console.log(`    ${eIcon} ${el.label} — NOT FOUND in DOM (selector: ${el.selector})`);
      } else {
        console.log(`    ${eIcon} ${el.label} — found but NOT VISIBLE (opacity=${el.opacity}, visibility=${el.visibility}, display=${el.display}, ${el.width}x${el.height})`);
      }
    }
  }
}

module.exports = {
  compare, compareSection, printReport,
  checkElementPresence, printPresenceReport,
  verdict,
  DIFF_DIR, REF_DIR, WP_DIR,
};

// CLI mode
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
  const hasFlag = (flag) => args.includes(flag);
  const pageName = getArg('--page');

  if (!pageName) {
    console.error('Usage: node visual-diff.js --page <name> [--presence-check]');
    process.exit(1);
  }

  const configPath = path.join(__dirname, '..', 'pages', `${pageName}.js`);
  if (!fs.existsSync(configPath)) {
    console.error(`Page config not found: ${configPath}`);
    process.exit(1);
  }

  const pageConfig = require(configPath);
  const sections = (pageConfig.verify?.sections || []).map(s => ({
    name: s.name,
    skipPixelDiff: s.skipPixelDiff || false,
    maxDiffPct: s.maxDiffPct,
    pixelThreshold: s.pixelThreshold,
    note: s.note,
  }));

  console.log(`▸ Running visual diff for: ${pageName}`);
  const report = compare({ pageName, sections });
  printReport(report);

  // Element presence check (async)
  if (hasFlag('--presence-check')) {
    const wpUrl = pageConfig.verify?.wpUrl;
    const presenceSections = (pageConfig.verify?.sections || []).filter(s => s.requiredElements);

    if (wpUrl && presenceSections.length > 0) {
      console.log('\n▸ Running element presence checks...');
      checkElementPresence({ wpUrl, sections: presenceSections })
        .then(results => {
          printPresenceReport(results);
          const allPresent = results.every(r => r.allPresent);
          if (!allPresent) {
            console.log('\n  ✗ Element presence check FAILED — missing/invisible elements detected');
            process.exit(1);
          }
        })
        .catch(err => {
          console.error(`\n✗ Presence check failed: ${err.message}`);
          process.exit(1);
        });
    }
  } else {
    // Advisory mode — report but don't exit non-zero for REVIEW verdicts
    if (report.overallVerdict === 'FAIL') process.exit(1);
    // REVIEW = exit 0 (advisory only)
  }
}
