/**
 * screenshot-reference.js — Captures per-section screenshots of the HTML reference site
 *
 * Starts a temp Node HTTP server serving complete_website/, uses Puppeteer to
 * capture full-page + per-section screenshots with animations frozen.
 *
 * Screenshots are cached — skips recapture if PNGs already exist.
 * Use --force-recapture or pass { force: true } to invalidate cache.
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
const { startServer } = require('./http-server');

const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', '..', 'screenshots', 'reference');

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
  .dw-clients-track { animation: none !important; }
  .dw-particle-wave, [data-particles] canvas { display: none !important; }
`;

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
      args: ['--no-sandbox', '--font-render-hinting=none'],
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const url = `http://127.0.0.1:${port}/${htmlFile}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for fonts
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        // Explicit font check for key families
        const families = ['Noto Sans', 'JetBrains Mono'];
        for (const family of families) {
          try { await document.fonts.load(`400 16px "${family}"`); } catch {}
        }
      });

      // Freeze animations
      await page.addStyleTag({ content: FREEZE_CSS });
      // Remove SVG <animate> elements
      await page.evaluate(() => {
        document.querySelectorAll('animate, animateTransform, animateMotion').forEach(el => el.remove());
      });

      // Force scroll-animated elements visible (they start opacity:0, translateY:20px via JS)
      // Only target the specific classes that DigiWinUI.initScrollAnimation applies to
      await page.evaluate(() => {
        document.querySelectorAll('.dw-trust-card, .dw-check-card, .dw-result-card, .dw-value-prop').forEach(el => {
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('transform', 'none', 'important');
        });
      });

      // Stabilization wait (matched to WP screenshot timing for symmetric captures)
      await new Promise(r => setTimeout(r, 2000));

      // Full-page screenshot
      const fullPath = path.join(SCREENSHOTS_DIR, `${pageName}-fullpage.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      savedPaths.push(fullPath);

      // Per-section screenshots
      for (const section of sections) {
        if (!section.htmlSelector) continue;
        try {
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
