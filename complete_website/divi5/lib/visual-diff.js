/**
 * visual-diff.js — Visual comparison engine (v7 — trustworthy comparison)
 *
 * v7 changes over v3:
 * - Shared config from screenshot-config.js (fixes V1-V12)
 * - Side-by-side composite images (ref | WP with diff overlay)
 * - Height mismatch warning with yellow bar indicator
 * - Viewport-width clipping for overflow prevention (V8)
 * - Review HTML generation (toggle/slider for every section)
 * - Tighter thresholds: MATCH <2%, REVIEW 2-5%, FAIL >5%
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
const config = require('./screenshot-config');

const REF_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'reference');
const WP_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'verify');
const DIFF_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'diffs');
const REVIEW_DIR = path.join(__dirname, '..', '..', '..', 'screenshots');

/** Default pixelmatch threshold (0 = exact, 1 = anything matches) */
const DEFAULT_THRESHOLD = 0.1;

/** Three-tier verdict thresholds */
const MATCH_CEILING = 2;   // <2% = MATCH
const REVIEW_CEILING = 5;  // 2-5% = REVIEW (needs human look)
// >5% = FAIL

/**
 * Determine three-tier verdict from diff percentage.
 * @param {number} diffPct
 * @returns {'MATCH'|'REVIEW'|'FAIL'}
 */
function verdict(diffPct) {
  if (diffPct <= MATCH_CEILING) return 'MATCH';
  if (diffPct <= REVIEW_CEILING) return 'REVIEW';
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
 * Create a side-by-side composite image: REF | WP with diff overlay.
 * Left half = reference, right half = WP with semi-transparent red diff overlay.
 *
 * @param {object} ref - { data, width, height }
 * @param {object} wp - { data, width, height }
 * @param {Buffer} diffData - pixelmatch diff output (same dimensions as cropped)
 * @param {number} cropWidth - width used for comparison
 * @param {number} cropHeight - height used for comparison
 * @param {string} compositePath - output file path
 * @param {object} [sizeInfo] - { refHeight, wpHeight } for mismatch warning
 */
function createComposite(ref, wp, diffData, cropWidth, cropHeight, compositePath, sizeInfo) {
  const gap = 4; // gap between panels
  const labelHeight = 30; // space for labels
  const totalWidth = cropWidth * 2 + gap;
  const totalHeight = cropHeight + labelHeight;

  const composite = new PNG({ width: totalWidth, height: totalHeight });

  // Fill background gray
  for (let y = 0; y < totalHeight; y++) {
    for (let x = 0; x < totalWidth; x++) {
      const idx = (y * totalWidth + x) * 4;
      composite.data[idx] = 40;      // R
      composite.data[idx + 1] = 40;  // G
      composite.data[idx + 2] = 40;  // B
      composite.data[idx + 3] = 255; // A
    }
  }

  // Draw label area (top)
  // "REFERENCE" label area — light blue tint
  for (let y = 0; y < labelHeight; y++) {
    for (let x = 0; x < cropWidth; x++) {
      const idx = (y * totalWidth + x) * 4;
      composite.data[idx] = 0;       // R
      composite.data[idx + 1] = 80;  // G
      composite.data[idx + 2] = 120; // B
      composite.data[idx + 3] = 255; // A
    }
  }
  // "WORDPRESS" label area — dark orange tint
  for (let y = 0; y < labelHeight; y++) {
    for (let x = cropWidth + gap; x < totalWidth; x++) {
      const idx = (y * totalWidth + x) * 4;
      composite.data[idx] = 120;     // R
      composite.data[idx + 1] = 60;  // G
      composite.data[idx + 2] = 0;   // B
      composite.data[idx + 3] = 255; // A
    }
  }

  // Copy reference image (left side)
  const refCropped = cropImageData(ref.data, ref.width, ref.height, cropWidth, cropHeight);
  for (let y = 0; y < cropHeight; y++) {
    for (let x = 0; x < cropWidth; x++) {
      const srcIdx = (y * cropWidth + x) * 4;
      const dstIdx = ((y + labelHeight) * totalWidth + x) * 4;
      composite.data[dstIdx] = refCropped[srcIdx];
      composite.data[dstIdx + 1] = refCropped[srcIdx + 1];
      composite.data[dstIdx + 2] = refCropped[srcIdx + 2];
      composite.data[dstIdx + 3] = refCropped[srcIdx + 3];
    }
  }

  // Copy WP image (right side) with diff overlay
  const wpCropped = cropImageData(wp.data, wp.width, wp.height, cropWidth, cropHeight);
  for (let y = 0; y < cropHeight; y++) {
    for (let x = 0; x < cropWidth; x++) {
      const srcIdx = (y * cropWidth + x) * 4;
      const dstX = x + cropWidth + gap;
      const dstIdx = ((y + labelHeight) * totalWidth + dstX) * 4;

      // Check if this pixel differs (diffData has red channel > 0 for diff pixels)
      const diffIdx = (y * cropWidth + x) * 4;
      const isDiff = diffData[diffIdx] > 200 && diffData[diffIdx + 1] < 50;

      if (isDiff) {
        // Blend WP pixel with semi-transparent red
        composite.data[dstIdx] = Math.min(255, wpCropped[srcIdx] * 0.5 + 200 * 0.5);
        composite.data[dstIdx + 1] = wpCropped[srcIdx + 1] * 0.5;
        composite.data[dstIdx + 2] = wpCropped[srcIdx + 2] * 0.5;
        composite.data[dstIdx + 3] = 255;
      } else {
        composite.data[dstIdx] = wpCropped[srcIdx];
        composite.data[dstIdx + 1] = wpCropped[srcIdx + 1];
        composite.data[dstIdx + 2] = wpCropped[srcIdx + 2];
        composite.data[dstIdx + 3] = wpCropped[srcIdx + 3];
      }
    }
  }

  // Height mismatch warning: yellow bar at bottom of shorter side
  if (sizeInfo && Math.abs(sizeInfo.refHeight - sizeInfo.wpHeight) > 10) {
    const barY = cropHeight + labelHeight - 4;
    for (let y = barY; y < barY + 4 && y < totalHeight; y++) {
      for (let x = 0; x < totalWidth; x++) {
        const idx = (y * totalWidth + x) * 4;
        composite.data[idx] = 255;     // R
        composite.data[idx + 1] = 220; // G
        composite.data[idx + 2] = 0;   // B
        composite.data[idx + 3] = 255; // A
      }
    }
  }

  fs.mkdirSync(path.dirname(compositePath), { recursive: true });
  fs.writeFileSync(compositePath, PNG.sync.write(composite));
}

/**
 * Compare a single section's screenshots.
 *
 * @param {string} refPath  — path to reference PNG
 * @param {string} wpPath   — path to WordPress PNG
 * @param {string} diffPath — path to write diff PNG
 * @param {object} [opts]
 * @param {number} [opts.threshold]      — pixelmatch threshold (default 0.1)
 * @param {boolean} [opts.skipPixelDiff] — skip pixel comparison (for animated sections)
 * @param {string} [opts.compositePath]  — path for side-by-side composite
 * @returns {{ diffPercent, diffPixels, totalPixels, verdict, skipped, heightMismatch?, error? }}
 */
function compareSection(refPath, wpPath, diffPath, opts = {}) {
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

  // V7: Height mismatch warning
  let heightMismatch = null;
  if (Math.abs(ref.height - wp.height) > 10) {
    heightMismatch = {
      refHeight: ref.height,
      wpHeight: wp.height,
      uncomparedPx: Math.abs(ref.height - wp.height),
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

  // V7: Generate side-by-side composite
  if (opts.compositePath) {
    createComposite(ref, wp, diff.data, width, height, opts.compositePath, heightMismatch ? { refHeight: ref.height, wpHeight: wp.height } : null);
  }

  const totalPixels = width * height;
  const diffPercent = Math.round(((diffPixels / totalPixels) * 100) * 100) / 100;

  return {
    diffPercent,
    diffPixels,
    totalPixels,
    verdict: verdict(diffPercent),
    skipped: false,
    heightMismatch,
  };
}

/**
 * Compare all sections for a page (pixel-level).
 *
 * @param {object} opts
 * @param {string} opts.pageName  — e.g. 'home'
 * @param {Array}  opts.sections  — [{ name, skipPixelDiff?, pixelThreshold? }]
 * @returns {{ sections: Array, overallVerdict: string, summary: string, reviewHtmlPath?: string }}
 */
function compare({ pageName, sections = [] }) {
  fs.mkdirSync(DIFF_DIR, { recursive: true });

  const compositeDir = path.join(DIFF_DIR, 'composites');
  fs.mkdirSync(compositeDir, { recursive: true });

  const results = [];

  // Full-page comparison
  const refFull = path.join(REF_DIR, `${pageName}-fullpage.png`);
  const wpFull = findLatestWPScreenshot(pageName, 'fullpage');
  if (fs.existsSync(refFull) && wpFull) {
    const diffFull = path.join(DIFF_DIR, `${pageName}-fullpage-diff.png`);
    const compositeFull = path.join(compositeDir, `${pageName}-fullpage-composite.png`);
    const result = compareSection(refFull, wpFull, diffFull, { compositePath: compositeFull });
    results.push({ section: 'fullpage', refPath: refFull, wpPath: wpFull, diffPath: diffFull, compositePath: compositeFull, ...result });
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
    const compositePath = path.join(compositeDir, `${pageName}-${section.name}-composite.png`);
    const result = compareSection(refPath, wpPath, diffPath, {
      skipPixelDiff: section.skipPixelDiff,
      threshold: section.pixelThreshold ?? DEFAULT_THRESHOLD,
      compositePath,
    });

    results.push({
      section: section.name,
      refPath,
      wpPath,
      diffPath,
      compositePath,
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

  // Build sectionDiffs map for easy per-section lookup by autopilot
  const sectionDiffs = {};
  for (const r of results) {
    sectionDiffs[r.section] = {
      diffPercent: r.diffPercent ?? (r.error ? 100 : 0),
      verdict: r.verdict,
      skipped: r.skipped || false,
    };
  }

  // V7: Generate review HTML
  const reviewHtmlPath = generateReviewHTML(pageName, results);

  return { sections: results, sectionDiffs, overallVerdict, summary, reviewHtmlPath };
}

/**
 * Generate an interactive review HTML page with side-by-side toggles.
 *
 * @param {string} pageName
 * @param {Array} results - section comparison results
 * @returns {string} path to generated HTML file
 */
function generateReviewHTML(pageName, results) {
  const htmlPath = path.join(REVIEW_DIR, `review-${pageName}.html`);

  const sectionsWithImages = results.filter(r => r.refPath && r.wpPath && !r.skipped);

  const sectionCards = sectionsWithImages.map(r => {
    const refRel = path.relative(REVIEW_DIR, r.refPath);
    const wpRel = path.relative(REVIEW_DIR, r.wpPath);
    const diffRel = r.diffPath ? path.relative(REVIEW_DIR, r.diffPath) : '';
    const compositeRel = r.compositePath ? path.relative(REVIEW_DIR, r.compositePath) : '';
    const icon = r.verdict === 'MATCH' ? '✓' : r.verdict === 'REVIEW' ? '◎' : '✗';
    const color = r.verdict === 'MATCH' ? '#22c55e' : r.verdict === 'REVIEW' ? '#f59e0b' : '#ef4444';
    const heightWarning = r.heightMismatch
      ? `<div class="height-warn">⚠ Height: REF ${r.heightMismatch.refHeight}px vs WP ${r.heightMismatch.wpHeight}px — ${r.heightMismatch.unccomparedPx || r.heightMismatch.unccomparedPx || Math.abs(r.heightMismatch.refHeight - r.heightMismatch.wpHeight)}px uncompared</div>`
      : '';

    return `
      <div class="section-card">
        <div class="section-header">
          <span class="verdict" style="color:${color}">${icon} ${r.verdict}</span>
          <span class="section-name">${r.section}</span>
          <span class="diff-pct">${r.diffPercent !== undefined ? r.diffPercent + '%' : r.error || ''}</span>
        </div>
        ${heightWarning}
        <div class="view-controls">
          <button class="view-btn active" data-view="composite">Composite</button>
          <button class="view-btn" data-view="ref">Reference</button>
          <button class="view-btn" data-view="wp">WordPress</button>
          <button class="view-btn" data-view="diff">Diff</button>
          <button class="view-btn" data-view="slider">Slider</button>
        </div>
        <div class="image-container">
          <div class="view-panel active" data-view="composite">
            ${compositeRel ? `<img src="${compositeRel}" alt="Composite">` : '<p>No composite</p>'}
          </div>
          <div class="view-panel" data-view="ref">
            <img src="${refRel}" alt="Reference">
          </div>
          <div class="view-panel" data-view="wp">
            <img src="${wpRel}" alt="WordPress">
          </div>
          <div class="view-panel" data-view="diff">
            ${diffRel ? `<img src="${diffRel}" alt="Diff">` : '<p>No diff</p>'}
          </div>
          <div class="view-panel" data-view="slider">
            <div class="slider-container">
              <img src="${refRel}" class="slider-img slider-ref" alt="Reference">
              <img src="${wpRel}" class="slider-img slider-wp" alt="WordPress">
              <input type="range" class="slider-range" min="0" max="100" value="50">
            </div>
          </div>
        </div>
      </div>`;
  }).join('\n');

  const overallVerdicts = results.filter(r => !r.skipped);
  const matchCount = overallVerdicts.filter(r => r.verdict === 'MATCH').length;
  const reviewCount = overallVerdicts.filter(r => r.verdict === 'REVIEW').length;
  const failCount = overallVerdicts.filter(r => r.verdict === 'FAIL').length;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Visual Review: ${pageName}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #111; color: #eee; padding: 24px; }
  h1 { font-size: 24px; margin-bottom: 8px; }
  .summary { color: #999; margin-bottom: 24px; font-size: 14px; }
  .summary span { font-weight: 600; }
  .summary .match { color: #22c55e; }
  .summary .review { color: #f59e0b; }
  .summary .fail { color: #ef4444; }
  .section-card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; margin-bottom: 24px; overflow: hidden; }
  .section-header { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-bottom: 1px solid #333; }
  .verdict { font-weight: 700; font-size: 14px; min-width: 80px; }
  .section-name { font-weight: 600; font-size: 16px; flex: 1; }
  .diff-pct { color: #999; font-size: 14px; font-family: monospace; }
  .height-warn { background: rgba(245, 158, 11, 0.15); color: #f59e0b; padding: 8px 20px; font-size: 13px; border-bottom: 1px solid #333; }
  .view-controls { display: flex; gap: 4px; padding: 12px 20px; border-bottom: 1px solid #333; }
  .view-btn { background: #333; border: none; color: #999; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; }
  .view-btn:hover { background: #444; color: #eee; }
  .view-btn.active { background: #00AFF0; color: #fff; }
  .image-container { padding: 16px; }
  .view-panel { display: none; }
  .view-panel.active { display: block; }
  .view-panel img { max-width: 100%; height: auto; border-radius: 4px; }
  .slider-container { position: relative; overflow: hidden; }
  .slider-img { display: block; max-width: 100%; }
  .slider-wp { position: absolute; top: 0; left: 0; clip-path: inset(0 50% 0 0); }
  .slider-range { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); width: 80%; z-index: 10; }
  .timestamp { color: #666; font-size: 12px; text-align: center; margin-top: 24px; }
</style>
</head>
<body>
  <h1>Visual Review: ${pageName}</h1>
  <div class="summary">
    <span class="match">${matchCount} MATCH</span> ·
    <span class="review">${reviewCount} REVIEW</span> ·
    <span class="fail">${failCount} FAIL</span> ·
    Generated ${new Date().toISOString().slice(0, 19).replace('T', ' ')}
  </div>
  ${sectionCards}
  <div class="timestamp">Autopilot v7 — Visual Diff Review</div>
<script>
  // View toggle
  document.querySelectorAll('.section-card').forEach(card => {
    card.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        card.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        card.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        card.querySelector('.view-panel[data-view="' + view + '"]').classList.add('active');
      });
    });
    // Slider
    const range = card.querySelector('.slider-range');
    const wpImg = card.querySelector('.slider-wp');
    if (range && wpImg) {
      range.addEventListener('input', () => {
        wpImg.style.clipPath = 'inset(0 ' + (100 - range.value) + '% 0 0)';
      });
    }
  });
</script>
</body>
</html>`;

  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, html);
  return htmlPath;
}

/**
 * Check element presence and visibility on the live WordPress page.
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
    protocolTimeout: config.PROTOCOL_TIMEOUT,
    args: config.PUPPETEER_ARGS,
  });

  const results = [];

  try {
    const page = await browser.newPage();
    await page.setViewport(config.VIEWPORT);
    await page.goto(wpUrl, { waitUntil: config.WAIT_UNTIL, timeout: 30000 });
    await config.loadFonts(page);
    await new Promise(r => setTimeout(r, config.PRESENCE_CHECK_STABILIZATION_MS));

    for (const section of sections) {
      if (!section.requiredElements || section.requiredElements.length === 0) continue;

      const sectionResults = [];

      for (const req of section.requiredElements) {
        const check = await page.evaluate((sel, minOp) => {
          const els = document.querySelectorAll(sel);
          if (els.length === 0) return { found: false, count: 0 };

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
  console.log('║       VISUAL DIFF REPORT (v7 — Trustworthy Compare)    ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  for (const r of report.sections) {
    const icons = { MATCH: '✓', REVIEW: '◎', FAIL: '✗' };
    const icon = r.skipped ? '⊘' : (icons[r.verdict] || '?');
    const status = r.skipped ? 'SKIP' : r.verdict;
    const detail = r.error || (r.skipped ? 'pixel diff skipped' : `${r.diffPercent}% diff`);
    const note = r.note ? ` (${r.note})` : '';
    console.log(`  ${icon} [${status}] ${r.section}: ${detail}${note}`);
    if (r.heightMismatch) {
      console.log(`           ⚠ Height mismatch: REF ${r.heightMismatch.refHeight}px vs WP ${r.heightMismatch.wpHeight}px — bottom ${r.heightMismatch.unccomparedPx || Math.abs(r.heightMismatch.refHeight - r.heightMismatch.wpHeight)}px not compared`);
    }
    if (r.compositePath && !r.skipped) {
      console.log(`           composite → ${r.compositePath}`);
    }
  }

  console.log(`\n  Overall: ${report.overallVerdict} — ${report.summary}`);
  if (report.reviewHtmlPath) {
    console.log(`  Review page: ${report.reviewHtmlPath}`);
  }
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
  generateReviewHTML,
  verdict,
  MATCH_CEILING, REVIEW_CEILING,
  DIFF_DIR, REF_DIR, WP_DIR, REVIEW_DIR,
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
    if (report.overallVerdict === 'FAIL') process.exit(1);
  }
}
