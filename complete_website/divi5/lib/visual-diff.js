/**
 * visual-diff.js — Pixel-level visual comparison engine
 *
 * Compares reference (HTML) screenshots against WordPress screenshots section by section.
 * Uses pixelmatch with configurable threshold. Generates diff PNGs with red highlights.
 *
 * Usage (standalone):
 *   node complete_website/divi5/lib/visual-diff.js --page home
 *
 * Usage (library):
 *   const visualDiff = require('./lib/visual-diff');
 *   const report = await visualDiff.compare({ pageName, sections });
 */

const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const _pixelmatch = require('pixelmatch');
const pixelmatch = _pixelmatch.default || _pixelmatch;

const REF_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'reference');
const WP_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'verify');
const DIFF_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'diffs');

/** Hard ceiling — anything above this is structural, not tolerance */
const HARD_CEILING_PCT = 10;
/** Default pixelmatch threshold (0 = exact, 1 = anything matches) */
const DEFAULT_THRESHOLD = 0.1;

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
 * Falls back to exact match without timestamp.
 */
function findLatestWPScreenshot(pageName, sectionName) {
  if (!fs.existsSync(WP_DIR)) return null;

  const files = fs.readdirSync(WP_DIR)
    .filter(f => f.startsWith(`${pageName}-${sectionName}-`) && f.endsWith('.png'))
    .sort()
    .reverse();

  if (files.length > 0) return path.join(WP_DIR, files[0]);

  // Also check for fullpage
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
 * Compare a single section.
 *
 * @param {string} refPath  — path to reference PNG
 * @param {string} wpPath   — path to WordPress PNG
 * @param {string} diffPath — path to write diff PNG
 * @param {object} [opts]
 * @param {number} [opts.threshold]      — pixelmatch threshold (default 0.1)
 * @param {boolean} [opts.skipPixelDiff] — skip pixel comparison (for animated sections)
 * @returns {{ diffPercent: number, diffPixels: number, totalPixels: number, pass: boolean, skipped: boolean }}
 */
function compareSection(refPath, wpPath, diffPath, opts = {}) {
  if (opts.skipPixelDiff) {
    return { diffPercent: 0, diffPixels: 0, totalPixels: 0, pass: true, skipped: true };
  }

  const ref = loadPNG(refPath);
  const wp = loadPNG(wpPath);

  // Handle size mismatch
  let width = Math.min(ref.width, wp.width);
  let height = Math.min(ref.height, wp.height);

  const heightDiff = Math.abs(ref.height - wp.height) / Math.max(ref.height, wp.height);
  const widthDiff = Math.abs(ref.width - wp.width) / Math.max(ref.width, wp.width);

  if (heightDiff > 0.25 || widthDiff > 0.10) {
    // >25% height or >10% width difference — structural mismatch (height threshold relaxed for Divi framework overhead)
    return {
      diffPercent: 100,
      diffPixels: -1,
      totalPixels: -1,
      pass: false,
      skipped: false,
      error: `Size mismatch: ref ${ref.width}x${ref.height} vs wp ${wp.width}x${wp.height} (>${(Math.max(heightDiff, widthDiff) * 100).toFixed(0)}% difference)`,
    };
  }

  // Crop both to common dimensions
  const refCropped = cropImageData(ref.data, ref.width, ref.height, width, height);
  const wpCropped = cropImageData(wp.data, wp.width, wp.height, width, height);

  const diff = new PNG({ width, height });
  const threshold = opts.threshold ?? DEFAULT_THRESHOLD;

  const diffPixels = pixelmatch(refCropped, wpCropped, diff.data, width, height, {
    threshold,
    includeAA: false,
  });

  // Write diff image
  fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPercent = (diffPixels / totalPixels) * 100;

  return {
    diffPercent: Math.round(diffPercent * 100) / 100,
    diffPixels,
    totalPixels,
    pass: diffPercent <= HARD_CEILING_PCT,
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
 * Compare all sections for a page.
 *
 * @param {object} opts
 * @param {string} opts.pageName  — e.g. 'home'
 * @param {Array}  opts.sections  — [{ name, skipPixelDiff? }]
 * @returns {{ sections: Array, overallPass: boolean, summary: string }}
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
      results.push({ section: section.name, pass: false, error: 'Reference screenshot missing', skipped: false });
      continue;
    }
    if (!wpPath) {
      results.push({ section: section.name, pass: false, error: 'WordPress screenshot missing', skipped: false });
      continue;
    }

    const diffPath = path.join(DIFF_DIR, `${pageName}-${section.name}-diff.png`);
    const result = compareSection(refPath, wpPath, diffPath, {
      skipPixelDiff: section.skipPixelDiff,
    });

    results.push({
      section: section.name,
      refPath,
      wpPath,
      diffPath,
      ...result,
    });
  }

  const overallPass = results.every(r => r.pass);
  const failCount = results.filter(r => !r.pass).length;
  const skipCount = results.filter(r => r.skipped).length;
  const summary = overallPass
    ? `All ${results.length} sections pass (${skipCount} skipped pixel diff)`
    : `${failCount}/${results.length} sections FAIL visual comparison`;

  return { sections: results, overallPass, summary };
}

/**
 * Print a formatted report to console.
 */
function printReport(report) {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║          VISUAL DIFF REPORT                      ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  for (const r of report.sections) {
    const icon = r.pass ? '✓' : '✗';
    const status = r.skipped ? 'SKIP' : r.pass ? 'PASS' : 'FAIL';
    const detail = r.error || (r.skipped ? 'pixel diff skipped' : `${r.diffPercent}% different`);
    console.log(`  ${icon} [${status}] ${r.section}: ${detail}`);
    if (r.diffPath && !r.skipped) {
      console.log(`           diff → ${r.diffPath}`);
    }
  }

  console.log(`\n  ${report.overallPass ? '✓' : '✗'} ${report.summary}`);
}

module.exports = { compare, compareSection, printReport, DIFF_DIR, REF_DIR, WP_DIR };

// CLI mode
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
  const pageName = getArg('--page');

  if (!pageName) {
    console.error('Usage: node visual-diff.js --page <name>');
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
  }));

  console.log(`▸ Running visual diff for: ${pageName}`);
  const report = compare({ pageName, sections });
  printReport(report);

  if (!report.overallPass) process.exit(1);
}
