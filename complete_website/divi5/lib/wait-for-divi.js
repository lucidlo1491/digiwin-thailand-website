/**
 * wait-for-divi.js — Shared Divi readiness sequence
 *
 * Unified readiness logic for ALL tools that load WP pages via Puppeteer.
 *
 * v7: SCROLL_ANIMATED_SELECTORS imported from screenshot-config.js.
 *
 * Sequence:
 * 1. Wait for document.fonts.ready
 * 2. Explicit font loading (Noto Sans 400+700, JetBrains Mono 400+700)
 * 3. Wait for all <link rel="stylesheet"> to have .sheet !== null
 * 4. Wait for Divi page-level CSS (<style> containing custom classes)
 * 5. Wait for Divi section elements
 * 6. Force scroll-animated elements visible
 * 7. Stabilization wait
 */

const config = require('./screenshot-config');

/**
 * Wait for the Divi WordPress page to be fully ready for extraction/screenshot.
 *
 * @param {import('puppeteer').Page} page — Puppeteer page instance (already navigated)
 * @param {object} [opts]
 * @param {boolean} [opts.verbose=false] — log warnings to console
 * @param {number}  [opts.stabilizationMs] — final stabilization wait (default from config)
 */
async function waitForDiviReady(page, opts = {}) {
  const verbose = opts.verbose ?? false;
  const stabilizationMs = opts.stabilizationMs ?? config.STABILIZATION_MS;

  // 1-2. Wait for fonts (consistent weights from shared config)
  await config.loadFonts(page);

  // 3. Verify fonts actually loaded (warn if not)
  const fontStatus = await page.evaluate(() => {
    return {
      notoSans: document.fonts.check('400 16px "Noto Sans"'),
      jetbrainsMono: document.fonts.check('400 16px "JetBrains Mono"'),
    };
  });
  if (verbose) {
    if (!fontStatus.notoSans) console.warn('  ⚠ Noto Sans not loaded — fallback font may affect comparison');
    if (!fontStatus.jetbrainsMono) console.warn('  ⚠ JetBrains Mono not loaded — fallback font may affect comparison');
  }

  // 3. Wait for all <link rel="stylesheet"> to have .sheet !== null
  await page.waitForFunction(() => {
    const sheets = document.querySelectorAll('link[rel="stylesheet"]');
    return Array.from(sheets).every(s => s.sheet !== null);
  }, { timeout: 10000 }).catch(() => {
    if (verbose) console.warn('  ⚠ Some stylesheets did not finish loading within 10s');
  });

  // 4. Wait for Divi page-level CSS (React hydration injects <style> tags)
  await page.waitForFunction(() => {
    const styles = document.querySelectorAll('style');
    return Array.from(styles).some(s => s.textContent && s.textContent.length > 100);
  }, { timeout: 10000 }).catch(() => {
    if (verbose) console.warn('  ⚠ Divi page-level CSS not detected within 10s');
  });

  // 5. Wait for Divi section elements to be present
  await page.waitForFunction(
    () => document.querySelector('[class*="et_pb_section"]'),
    { timeout: 10000 }
  ).catch(() => {
    if (verbose) console.warn('  ⚠ No Divi sections found within 10s');
  });

  // 6. Force scroll-animated elements visible (from shared config)
  await config.forceScrollElementsVisible(page);

  // 7. Stabilization wait
  await new Promise(r => setTimeout(r, stabilizationMs));
}

module.exports = { waitForDiviReady, SCROLL_ANIMATED_SELECTORS: config.SCROLL_ANIMATED_SELECTORS };
