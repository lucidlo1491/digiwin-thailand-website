/**
 * screenshot.js — Puppeteer screenshot helper for Divi 5 builds
 *
 * Captures full-page and per-section screenshots of the live WordPress page.
 * Used by build-page.js as a mandatory (un-skippable) verification step.
 *
 * Freezes all CSS animations/transitions before capture for deterministic results.
 * Performs a warm-up load after cache flush (Divi regenerates CSS on first load).
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'verify');

/**
 * CSS to freeze all animations and transitions for deterministic screenshots.
 */
const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
`;

/**
 * Normalize a page name for consistent file naming.
 * @param {string} pageName
 * @returns {string}
 */
function normalizePage(pageName) {
  return pageName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
}

/**
 * Capture screenshots of a live WordPress page.
 *
 * @param {object} opts
 * @param {string} opts.pageName    — e.g. 'home'
 * @param {string} opts.wpUrl       — full WordPress URL
 * @param {Array}  opts.sections    — [{name, wpSelector}]
 * @param {boolean} [opts.warmUp]   — perform a warm-up load first (after cache flush)
 * @param {boolean} [opts.freeze]   — freeze animations before capture (default: true)
 * @returns {string[]} Array of screenshot file paths
 */
async function capture({ pageName, wpUrl, sections = [], warmUp = false, freeze = true }) {
  // 1. Confirm WordPress is reachable
  try {
    execSync(`curl -sk --max-time 10 -o /dev/null -w "%{http_code}" "${wpUrl}"`, { encoding: 'utf8' });
  } catch {
    throw new Error(`WordPress unreachable at ${wpUrl}. Is LocalWP running?`);
  }

  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const normalized = normalizePage(pageName);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const savedPaths = [];

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--ignore-certificate-errors', '--no-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Warm-up load — first load after cache flush regenerates Divi CSS
    if (warmUp) {
      console.log('  Warm-up load (Divi CSS regeneration)...');
      await page.goto(wpUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
    }

    // Main load (or second load after warm-up)
    await page.goto(wpUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for fonts + Divi hydration + stabilization
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(
      () => typeof window.et_animation_data !== 'undefined' || document.querySelector('.et_pb_section'),
      { timeout: 10000 }
    ).catch(() => { /* Divi hydration var may not exist on all pages — section presence is enough */ });
    await new Promise(r => setTimeout(r, 2000)); // stabilization

    // Freeze animations for deterministic screenshots
    if (freeze) {
      await page.addStyleTag({ content: FREEZE_CSS });
      await page.evaluate(() => {
        document.querySelectorAll('animate, animateTransform, animateMotion').forEach(el => el.remove());
      });
      await new Promise(r => setTimeout(r, 300));
    }

    // Hide WP admin bar (prevents overlay in screenshots)
    await page.evaluate(() => {
      const bar = document.getElementById('wpadminbar');
      if (bar) bar.style.display = 'none';
      document.documentElement.style.marginTop = '0px';
    });

    // 2. Full-page screenshot
    const fullPath = path.join(SCREENSHOTS_DIR, `${normalized}-${timestamp}-fullpage.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    savedPaths.push(fullPath);

    // 3. Per-section screenshots
    for (const section of sections) {
      try {
        const el = await page.$(section.wpSelector);
        if (el) {
          const sectionPath = path.join(SCREENSHOTS_DIR, `${normalized}-${section.name}-${timestamp}.png`);
          await el.screenshot({ path: sectionPath });
          savedPaths.push(sectionPath);
        } else {
          console.warn(`  ⚠ Section "${section.name}" selector not found: ${section.wpSelector}`);
        }
      } catch (err) {
        console.warn(`  ⚠ Section "${section.name}" screenshot failed: ${err.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  return savedPaths;
}

module.exports = { capture, normalizePage, SCREENSHOTS_DIR };
