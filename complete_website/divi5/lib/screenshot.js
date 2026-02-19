/**
 * screenshot.js — Puppeteer screenshot helper for Divi 5 builds
 *
 * Captures full-page and per-section screenshots of the live WordPress page.
 * Used by build-page.js as a mandatory (un-skippable) verification step.
 *
 * v7: All constants imported from screenshot-config.js (shared config).
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const config = require('./screenshot-config');

const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'verify');

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
async function capture({ pageName, wpUrl, sections = [], warmUp = true, freeze = true }) {
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
    protocolTimeout: config.PROTOCOL_TIMEOUT,
    args: config.PUPPETEER_ARGS,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(config.VIEWPORT);

    // Warm-up load — first load after cache flush regenerates Divi CSS
    if (warmUp) {
      console.log('  Warm-up load (Divi CSS regeneration)...');
      await page.goto(wpUrl, { waitUntil: config.WARM_UP_WAIT_UNTIL, timeout: 60000 });
      await new Promise(r => setTimeout(r, 5000));
    }

    // Main load
    console.log('  Main page load...');
    await page.goto(wpUrl, { waitUntil: config.WAIT_UNTIL, timeout: 60000 });

    // Wait for fonts (consistent weights: 400+700)
    await config.loadFonts(page);

    // Wait for Divi hydration
    await page.waitForFunction(
      () => typeof window.et_animation_data !== 'undefined' || document.querySelector('.et_pb_section'),
      { timeout: 10000 }
    ).catch(() => { /* Divi hydration var may not exist on all pages */ });

    // Deterministic readiness: wait for all stylesheets + Divi page CSS
    await page.waitForFunction(() => {
      const sheets = document.querySelectorAll('link[rel="stylesheet"]');
      return Array.from(sheets).every(s => s.sheet !== null);
    }, { timeout: 10000 }).catch(() => {
      console.warn('  ⚠ Some stylesheets did not finish loading within 10s');
    });

    await page.waitForFunction(() => {
      const styles = document.querySelectorAll('style');
      return Array.from(styles).some(s => s.textContent && s.textContent.length > 100);
    }, { timeout: 10000 }).catch(() => {
      console.warn('  ⚠ Divi page-level CSS not detected within 10s — styles may be incomplete');
    });

    await new Promise(r => setTimeout(r, config.STABILIZATION_MS));

    // Force scroll-animated elements visible
    await config.forceScrollElementsVisible(page);

    // Freeze animations for deterministic screenshots
    if (freeze) {
      await config.applyFreeze(page);
    }

    // Hide WP admin bar
    await config.hideAdminBar(page);

    // 2. Full-page screenshot
    const fullPath = path.join(SCREENSHOTS_DIR, `${normalized}-${timestamp}-fullpage.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    savedPaths.push(fullPath);

    // Hide fixed header before per-section screenshots
    await config.hideHeaderWP(page);

    // 3. Per-section screenshots
    for (const section of sections) {
      try {
        // Clip to viewport width to prevent overflow capture (V8)
        await config.clipToViewport(page, section.wpSelector);

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
