/**
 * screenshot-reference.js — Captures per-section screenshots of the HTML reference site
 *
 * Starts a temp Node HTTP server serving complete_website/, uses Puppeteer to
 * capture full-page + per-section screenshots with animations frozen.
 *
 * Screenshots are cached — skips recapture if PNGs already exist.
 * Use --force-recapture or pass { force: true } to invalidate cache.
 *
 * v7: All constants imported from screenshot-config.js (shared config).
 *
 * Usage (standalone):
 *   node complete_website/divi5/lib/screenshot-reference.js --page home [--force-recapture]
 *
 * Usage (library):
 *   const refScreenshot = require('./lib/screenshot-reference');
 *   const paths = await refScreenshot.capture({ pageName, htmlFile, sections, force });
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { startServer, COMPLETE_WEBSITE_DIR } = require('./http-server');
const config = require('./screenshot-config');

const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'reference');

/**
 * Capture reference screenshots from the HTML prototype.
 *
 * @param {object} opts
 * @param {string} opts.pageName   — e.g. 'home'
 * @param {string} opts.htmlFile   — relative path within complete_website/, e.g. 'index.html'
 * @param {Array}  opts.sections   — [{ name, htmlSelector }]
 * @param {boolean} [opts.force]   — force recapture even if cached
 * @returns {string[]} Array of saved screenshot file paths
 */
async function capture({ pageName, htmlFile, sections = [], force = false }) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  // Content hash cache invalidation — detect if HTML source changed since last capture
  const htmlFullPath = path.join(COMPLETE_WEBSITE_DIR, htmlFile);
  const hashFile = path.join(SCREENSHOTS_DIR, `${pageName}-content.md5`);
  let sourceChanged = false;
  if (fs.existsSync(htmlFullPath)) {
    const currentHash = crypto.createHash('md5').update(fs.readFileSync(htmlFullPath)).digest('hex');
    if (fs.existsSync(hashFile)) {
      const storedHash = fs.readFileSync(hashFile, 'utf8').trim();
      if (storedHash !== currentHash) {
        console.log(`  ⚠ HTML source changed (hash mismatch). Forcing re-capture.`);
        sourceChanged = true;
      }
    }
  }

  // Check cache — if all expected PNGs exist AND source hasn't changed, skip
  if (!force && !sourceChanged) {
    const expectedFiles = [
      path.join(SCREENSHOTS_DIR, `${pageName}-fullpage.png`),
      ...sections.map(s => path.join(SCREENSHOTS_DIR, `${pageName}-${s.name}.png`)),
    ];
    const allExist = expectedFiles.every(f => fs.existsSync(f));
    if (allExist) {
      console.log(`  ✓ Reference screenshots cached (${expectedFiles.length} files). Use --force-recapture to refresh.`);
      return expectedFiles;
    }
  }

  // Start temp server
  const { server, port, close } = await startServer();
  const savedPaths = [];

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      protocolTimeout: config.PROTOCOL_TIMEOUT,
      args: config.PUPPETEER_ARGS,
    });

    try {
      const page = await browser.newPage();
      await page.setViewport(config.VIEWPORT);

      // Disable JavaScript — HTML reference pages are static; JS (particles,
      // IntersectionObserver, rAF loops) crashes Chrome on tall/complex pages.
      // FREEZE_CSS handles visibility (fade-in, animations) via pure CSS.
      await page.setJavaScriptEnabled(false);

      const url = `http://127.0.0.1:${port}/${htmlFile}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for fonts (consistent weights: 400+700)
      await config.loadFonts(page);

      // Inject freeze CSS (animations + fade-in visibility)
      await page.addStyleTag({ content: config.FREEZE_CSS });

      // Force scroll-animated elements visible via inline styles
      await config.forceScrollElementsVisible(page);

      // Stabilization wait (matched to WP screenshot timing)
      await new Promise(r => setTimeout(r, config.STABILIZATION_MS));

      // Full-page screenshot — cap height to avoid Chrome memory issues
      const fullPath = path.join(SCREENSHOTS_DIR, `${pageName}-fullpage.png`);
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      if (bodyHeight > 8000) {
        console.warn(`  ⚠ Fullpage screenshot skipped (page height ${bodyHeight}px > 8000px cap)`);
      } else {
        await page.screenshot({ path: fullPath, fullPage: true });
        savedPaths.push(fullPath);
      }

      // Hide fixed header before per-section screenshots
      await config.hideHeaderHTML(page);

      // Per-section screenshots
      for (const section of sections) {
        if (!section.htmlSelector) continue;
        try {
          // Clip to viewport width to prevent overflow capture (V8)
          await config.clipToViewport(page, section.htmlSelector);

          const el = await page.$(section.htmlSelector);
          if (el) {
            const sectionPath = path.join(SCREENSHOTS_DIR, `${pageName}-${section.name}.png`);
            await el.screenshot({ path: sectionPath });
            savedPaths.push(sectionPath);
          } else {
            console.warn(`  ⚠ Reference section "${section.name}" selector not found: ${section.htmlSelector}`);
          }
        } catch (err) {
          console.warn(`  ⚠ Reference section "${section.name}" screenshot failed: ${err.message}`);
        }
      }
    } finally {
      await browser.close();
    }
  } finally {
    await close();
  }

  // Store content hash for cache invalidation
  if (fs.existsSync(htmlFullPath)) {
    const hash = crypto.createHash('md5').update(fs.readFileSync(htmlFullPath)).digest('hex');
    fs.writeFileSync(hashFile, hash, 'utf8');
  }

  return savedPaths;
}

module.exports = { capture, SCREENSHOTS_DIR };

// CLI mode
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
  const hasFlag = (flag) => args.includes(flag);

  const pageName = getArg('--page');
  if (!pageName) {
    console.error('Usage: node screenshot-reference.js --page <name> [--force-recapture]');
    process.exit(1);
  }

  const configPath = path.join(__dirname, '..', 'pages', `${pageName}.js`);
  if (!fs.existsSync(configPath)) {
    console.error(`Page config not found: ${configPath}`);
    process.exit(1);
  }

  const pageConfig = require(configPath);
  const htmlFile = pageConfig.protoFile || 'index.html';
  const sections = (pageConfig.verify?.sections || []).filter(s => s.htmlSelector);

  console.log(`▸ Capturing reference screenshots for: ${pageName}`);
  console.log(`  HTML file: ${htmlFile}`);
  console.log(`  Sections: ${sections.length}`);

  capture({ pageName, htmlFile, sections, force: hasFlag('--force-recapture') })
    .then(paths => {
      console.log(`\n✓ ${paths.length} reference screenshot(s) captured:`);
      paths.forEach(p => console.log(`  → ${p}`));
    })
    .catch(err => {
      console.error(`✗ Failed: ${err.message}`);
      process.exit(1);
    });
}
