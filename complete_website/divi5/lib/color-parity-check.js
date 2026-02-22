/**
 * color-parity-check.js — Automated background & color comparison
 *
 * Compares computed background-color, background-image (gradients), and
 * key text colors between the HTML reference and the live WordPress page.
 *
 * Catches the class of error where CSS variables resolve to different hex
 * values, or Divi overrides background colors silently.
 *
 * Usage (standalone):
 *   node divi5/lib/color-parity-check.js --page erp [--section hero] [--verbose]
 *
 * Usage (library — called from build-page.js):
 *   const colorParity = require('./lib/color-parity-check');
 *   const result = await colorParity.run({ pageName, pageConfig });
 */

const puppeteer = require('puppeteer');
const path = require('path');
const config = require('./screenshot-config');
const { startServer, COMPLETE_WEBSITE_DIR } = require('./http-server');

// Properties to compare
const BG_PROPERTIES = ['backgroundColor', 'backgroundImage'];
const TEXT_PROPERTIES = ['color'];

// Color distance threshold — allow ±5 per channel (RGB)
const COLOR_TOLERANCE = 5;

/**
 * Parse an rgb/rgba string into [r, g, b, a] array.
 * Handles: rgb(r, g, b), rgba(r, g, b, a), transparent
 */
function parseColor(str) {
  if (!str || str === 'transparent' || str === 'rgba(0, 0, 0, 0)') return [0, 0, 0, 0];
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1];
}

/**
 * Compare two colors within tolerance.
 */
function colorsMatch(a, b) {
  if (!a || !b) return false;
  // If both transparent, match
  if (a[3] === 0 && b[3] === 0) return true;
  for (let i = 0; i < 3; i++) {
    if (Math.abs(a[i] - b[i]) > COLOR_TOLERANCE) return false;
  }
  // Alpha tolerance
  if (Math.abs(a[3] - b[3]) > 0.1) return false;
  return true;
}

/**
 * Extract gradient color stops from a linear-gradient string.
 * Returns array of rgb strings.
 */
function extractGradientStops(gradient) {
  if (!gradient || gradient === 'none') return [];
  const matches = gradient.match(/rgba?\([^)]+\)/g);
  return matches || [];
}

/**
 * Compare two gradient strings.
 * Returns { match, details }
 */
function compareGradients(htmlGrad, wpGrad) {
  if (htmlGrad === wpGrad) return { match: true, details: 'exact match' };
  if (htmlGrad === 'none' && wpGrad === 'none') return { match: true, details: 'both none' };
  if ((htmlGrad === 'none') !== (wpGrad === 'none')) {
    return { match: false, details: `HTML=${htmlGrad.substring(0, 60)} vs WP=${wpGrad.substring(0, 60)}` };
  }

  const htmlStops = extractGradientStops(htmlGrad).map(parseColor);
  const wpStops = extractGradientStops(wpGrad).map(parseColor);

  if (htmlStops.length !== wpStops.length) {
    return { match: false, details: `stop count: HTML=${htmlStops.length} vs WP=${wpStops.length}` };
  }

  for (let i = 0; i < htmlStops.length; i++) {
    if (!colorsMatch(htmlStops[i], wpStops[i])) {
      return {
        match: false,
        details: `stop ${i}: HTML=${extractGradientStops(htmlGrad)[i]} vs WP=${extractGradientStops(wpGrad)[i]}`,
      };
    }
  }
  return { match: true, details: 'stops match within tolerance' };
}

/**
 * Sample computed colors from a page at a given selector.
 */
async function sampleColors(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = window.getComputedStyle(el);

    // Walk down to find the first element with a real background
    // (Divi wraps content in transparent section/row/column divs)
    function findBackground(root, depth = 0) {
      if (depth > 5) return null;
      const s = window.getComputedStyle(root);
      const bg = s.backgroundColor;
      const img = s.backgroundImage;
      const hasColor = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
      const hasImage = img && img !== 'none';
      if (hasColor || hasImage) return { backgroundColor: bg, backgroundImage: img, el: root };
      // Try first child with a class (skip text nodes and anonymous wrappers)
      for (const child of root.children) {
        const found = findBackground(child, depth + 1);
        if (found) return found;
      }
      return null;
    }

    const directBg = { backgroundColor: cs.backgroundColor, backgroundImage: cs.backgroundImage };
    const hasDirect = (directBg.backgroundColor !== 'rgba(0, 0, 0, 0)' && directBg.backgroundColor !== 'transparent')
                      || directBg.backgroundImage !== 'none';

    // Use direct if it has a real background, otherwise walk children
    const bg = hasDirect ? directBg : (findBackground(el) || directBg);

    const result = {
      backgroundColor: bg.backgroundColor,
      backgroundImage: bg.backgroundImage,
      selectorUsed: sel,
    };

    // Also sample first heading and first paragraph color
    const h1 = el.querySelector('h1, h2, h3');
    if (h1) result.headingColor = window.getComputedStyle(h1).color;

    const p = el.querySelector('p');
    if (p) result.textColor = window.getComputedStyle(p).color;

    // Sample a key child element for contrast check
    const firstChild = el.querySelector('[class*="mockup"], [class*="card"], [class*="dashboard"]');
    if (firstChild) {
      result.childBg = window.getComputedStyle(firstChild).backgroundColor;
    }

    return result;
  }, selector);
}

/**
 * Run color parity check for a page.
 *
 * @param {object} opts
 * @param {string} opts.pageName
 * @param {object} opts.pageConfig — the page config (from pages/*.js)
 * @param {string} [opts.sectionFilter] — check only this section
 * @param {boolean} [opts.verbose]
 * @returns {{ pass: boolean, sections: Array<{ name, pass, issues }> }}
 */
async function run({ pageName, pageConfig, sectionFilter, verbose = false }) {
  const sections = (pageConfig.verify?.sections || []).filter(s => s.htmlSelector && s.wpSelector);
  const filtered = sectionFilter
    ? sections.filter(s => s.name === sectionFilter)
    : sections;

  if (filtered.length === 0) {
    console.log('  ⚠ No sections with both htmlSelector and wpSelector');
    return { pass: true, sections: [] };
  }

  const wpUrl = `${pageConfig.site || 'https://digiwin-thailand.local'}/?page_id=${pageConfig.pageId}`;
  const htmlFile = pageConfig.protoFile || 'index.html';

  // Start temp server for HTML reference
  const { port, close } = await startServer();

  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: config.PROTOCOL_TIMEOUT,
    args: config.PUPPETEER_ARGS,
  });

  const results = [];

  try {
    // HTML reference page
    const htmlPage = await browser.newPage();
    await htmlPage.setViewport(config.VIEWPORT);
    await htmlPage.goto(`http://127.0.0.1:${port}/${htmlFile}`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await config.loadFonts(htmlPage);
    await new Promise(r => setTimeout(r, 1000));

    // WP page
    const wpPage = await browser.newPage();
    await wpPage.setViewport(config.VIEWPORT);
    await wpPage.goto(wpUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await config.loadFonts(wpPage);
    await new Promise(r => setTimeout(r, 2000));

    for (const section of filtered) {
      const issues = [];

      const htmlColors = await sampleColors(htmlPage, section.htmlSelector);
      const wpColors = await sampleColors(wpPage, section.wpSelector);

      if (!htmlColors) {
        issues.push(`HTML selector not found: ${section.htmlSelector}`);
      }
      if (!wpColors) {
        issues.push(`WP selector not found: ${section.wpSelector}`);
      }

      if (htmlColors && wpColors) {
        // 1. Background color
        const htmlBg = parseColor(htmlColors.backgroundColor);
        const wpBg = parseColor(wpColors.backgroundColor);
        if (htmlBg && wpBg && !colorsMatch(htmlBg, wpBg)) {
          issues.push(`background-color: HTML=${htmlColors.backgroundColor} vs WP=${wpColors.backgroundColor}`);
        }

        // 2. Background gradient
        const gradResult = compareGradients(htmlColors.backgroundImage, wpColors.backgroundImage);
        if (!gradResult.match) {
          issues.push(`background-image: ${gradResult.details}`);
        }

        // 3. Heading color
        if (htmlColors.headingColor && wpColors.headingColor) {
          const hc1 = parseColor(htmlColors.headingColor);
          const hc2 = parseColor(wpColors.headingColor);
          if (hc1 && hc2 && !colorsMatch(hc1, hc2)) {
            issues.push(`heading color: HTML=${htmlColors.headingColor} vs WP=${wpColors.headingColor}`);
          }
        }

        // 4. Text color
        if (htmlColors.textColor && wpColors.textColor) {
          const tc1 = parseColor(htmlColors.textColor);
          const tc2 = parseColor(wpColors.textColor);
          if (tc1 && tc2 && !colorsMatch(tc1, tc2)) {
            issues.push(`text color: HTML=${htmlColors.textColor} vs WP=${wpColors.textColor}`);
          }
        }

        // 5. Child element background (contrast relationship check)
        if (htmlColors.childBg && wpColors.childBg) {
          const cb1 = parseColor(htmlColors.childBg);
          const cb2 = parseColor(wpColors.childBg);
          if (cb1 && cb2 && !colorsMatch(cb1, cb2)) {
            issues.push(`child bg (contrast): HTML=${htmlColors.childBg} vs WP=${wpColors.childBg}`);
          }
        }

        if (verbose && issues.length === 0) {
          console.log(`  ✓ [${section.name}] bg=${htmlColors.backgroundColor} grad=${htmlColors.backgroundImage.substring(0, 50)}...`);
        }
      }

      const pass = issues.length === 0;
      results.push({ name: section.name, pass, issues });

      if (!pass) {
        console.log(`  ✗ [FAIL] ${section.name}:`);
        issues.forEach(i => console.log(`      ${i}`));
      } else {
        console.log(`  ✓ [PASS] ${section.name}`);
      }
    }
  } finally {
    await browser.close();
    await close();
  }

  const allPass = results.every(r => r.pass);
  const failCount = results.filter(r => !r.pass).length;

  console.log(`\n  Color parity: ${allPass ? '✓ ALL PASS' : `✗ ${failCount} FAIL`} (${results.length} sections checked)`);

  return { pass: allPass, sections: results };
}

module.exports = { run, parseColor, colorsMatch, compareGradients };

// CLI mode
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
  const hasFlag = (flag) => args.includes(flag);

  const pageName = getArg('--page');
  if (!pageName) {
    console.error('Usage: node color-parity-check.js --page <name> [--section <name>] [--verbose]');
    process.exit(1);
  }

  const configPath = path.join(__dirname, '..', 'pages', `${pageName}.js`);
  const pageConfig = require(configPath);

  console.log(`▸ Color parity check: ${pageName}`);
  run({
    pageName,
    pageConfig,
    sectionFilter: getArg('--section'),
    verbose: hasFlag('--verbose'),
  })
    .then(result => process.exit(result.pass ? 0 : 1))
    .catch(err => {
      console.error(`✗ ${err.message}`);
      process.exit(1);
    });
}
