/**
 * wait-for-divi.js — Shared Divi readiness sequence
 *
 * Unified readiness logic for ALL tools that load WP pages via Puppeteer.
 * Eliminates inconsistent readiness checks across screenshot.js,
 * visual-diff.js, and computed-style-diff.js.
 *
 * Sequence:
 * 1. Wait for document.fonts.ready
 * 2. Explicit font loading (Noto Sans, JetBrains Mono)
 * 3. Wait for all <link rel="stylesheet"> to have .sheet !== null
 * 4. Wait for Divi page-level CSS (<style> containing custom classes)
 * 5. Force scroll-animated elements visible
 * 6. 2-second stabilization wait
 */

/**
 * Scroll-animated element selectors to force visible.
 * These elements start at opacity:0 / translateY:20px via DigiWinUI.initScrollAnimation.
 */
const SCROLL_ANIMATED_SELECTORS = '.dw-trust-card, .dw-check-card, .dw-result-card, .dw-value-prop';

/**
 * Wait for the Divi WordPress page to be fully ready for extraction/screenshot.
 *
 * @param {import('puppeteer').Page} page — Puppeteer page instance (already navigated)
 * @param {object} [opts]
 * @param {boolean} [opts.verbose=false] — log warnings to console
 * @param {number}  [opts.stabilizationMs=2000] — final stabilization wait
 */
async function waitForDiviReady(page, opts = {}) {
  const verbose = opts.verbose ?? false;
  const stabilizationMs = opts.stabilizationMs ?? 2000;

  // 1. Wait for document.fonts.ready
  await page.evaluate(() => document.fonts.ready);

  // 2. Explicit font loading for key families
  await page.evaluate(async () => {
    const families = ['Noto Sans', 'JetBrains Mono'];
    for (const family of families) {
      try { await document.fonts.load(`400 16px "${family}"`); } catch {}
      try { await document.fonts.load(`700 16px "${family}"`); } catch {}
    }
  });

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

  // 6. Force scroll-animated elements visible
  await page.evaluate((selectors) => {
    document.querySelectorAll(selectors).forEach(el => {
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('transform', 'none', 'important');
    });
  }, SCROLL_ANIMATED_SELECTORS);

  // 7. Stabilization wait
  await new Promise(r => setTimeout(r, stabilizationMs));
}

module.exports = { waitForDiviReady, SCROLL_ANIMATED_SELECTORS };
