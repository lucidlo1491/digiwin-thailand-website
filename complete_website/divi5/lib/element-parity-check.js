#!/usr/bin/env node
/**
 * element-parity-check.js — Automated DOM parity between HTML prototype and WordPress
 *
 * Catches the 4 categories of visual issues that kept being found manually:
 *   1. Missing pseudo-elements (::before/::after) — e.g., connecting lines
 *   2. Missing dynamic elements (canvas, data-particles) — e.g., particle ocean
 *   3. Spacing mismatches on layout elements — e.g., li padding crushed by helpers
 *   4. Decoration opacity mismatches — e.g., SVG scene 5x too visible
 *
 * Usage:
 *   node complete_website/divi5/lib/element-parity-check.js --page partner-program
 *   node complete_website/divi5/lib/element-parity-check.js --page partner-program --section alternative
 *   node complete_website/divi5/lib/element-parity-check.js --page partner-program --verbose
 *
 * Designed to run AFTER build-page.js pushes to WordPress.
 * Opens both HTML prototype (via temp HTTP server) and live WP page in Puppeteer,
 * then compares DOM properties section by section.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const config = require('./screenshot-config');
const { startServer } = require('./http-server');
const { waitForDiviReady } = require('./wait-for-divi');

// ────────────────────────────────────────────────────────────────
// THRESHOLDS
// ────────────────────────────────────────────────────────────────
const SPACING_TOLERANCE = 4;   // px — differences <= this are OK
const OPACITY_TOLERANCE = 0.05; // opacity differences <= this are OK
const DIMENSION_TOLERANCE = 8;  // px — for width/height comparisons

// ────────────────────────────────────────────────────────────────
// DOM EXTRACTION (runs inside Puppeteer page context)
// ────────────────────────────────────────────────────────────────

/**
 * Extract parity-relevant DOM info from a section.
 * Runs inside page.evaluate() — no Node.js access.
 *
 * @param {string} sectionSelector — CSS selector for the section container
 * @returns {object} Extracted DOM data
 */
function extractSectionDOM(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return { found: false, selector: sectionSelector };

  const rect = section.getBoundingClientRect();
  const result = {
    found: true,
    selector: sectionSelector,
    bounds: { width: rect.width, height: rect.height },
    pseudoElements: [],
    canvasElements: [],
    dataAttributes: [],
    listItems: [],
    decorations: [],
    svgContainers: [],
  };

  // ── 1. PSEUDO-ELEMENTS ──────────────────────────────────
  // Check all direct children + key containers for ::before/::after
  const containers = section.querySelectorAll('*');
  for (const el of containers) {
    for (const pseudo of ['::before', '::after']) {
      const style = getComputedStyle(el, pseudo);
      const content = style.content;
      // Skip if no content or content is 'none' or 'normal'
      if (!content || content === 'none' || content === 'normal') continue;
      // Skip if the pseudo has no visual presence
      const w = parseFloat(style.width);
      const h = parseFloat(style.height);
      if (w === 0 && h === 0 && content === '""') {
        // Check if it has background (gradient lines have bg but 0 explicit dims)
        const bg = style.background || style.backgroundImage;
        if (!bg || bg === 'none') continue;
      }

      // Build a readable path
      const classes = el.className && typeof el.className === 'string'
        ? '.' + el.className.trim().split(/\s+/).join('.')
        : '';
      const tag = el.tagName.toLowerCase();
      const path = `${tag}${classes}${pseudo}`;

      result.pseudoElements.push({
        path,
        content: content.substring(0, 50),
        width: style.width,
        height: style.height,
        background: (style.backgroundImage || '').substring(0, 80),
        position: style.position,
        display: style.display,
        opacity: style.opacity,
      });
    }
  }

  // ── 2. CANVAS / DYNAMIC ELEMENTS ────────────────────────
  const canvases = section.querySelectorAll('canvas');
  for (const c of canvases) {
    const r = c.getBoundingClientRect();
    result.canvasElements.push({
      width: r.width,
      height: r.height,
      display: getComputedStyle(c).display,
    });
  }

  // ── 3. DATA ATTRIBUTES (behavioral markers) ─────────────
  const particleEls = section.querySelectorAll('[data-particles]');
  for (const el of particleEls) {
    result.dataAttributes.push({
      attr: 'data-particles',
      tag: el.tagName.toLowerCase(),
      hasCanvas: el.querySelector('canvas') !== null,
    });
  }

  // ── 4. LIST ITEM SPACING ────────────────────────────────
  const lists = section.querySelectorAll('ul, ol');
  for (const list of lists) {
    const items = list.querySelectorAll('li');
    if (items.length === 0) continue;
    // Sample first item
    const li = items[0];
    const s = getComputedStyle(li);
    const listClasses = list.className ? '.' + list.className.trim().split(/\s+/).join('.') : '';
    result.listItems.push({
      listSelector: `${list.tagName.toLowerCase()}${listClasses}`,
      count: items.length,
      padding: s.padding,
      paddingTop: s.paddingTop,
      paddingBottom: s.paddingBottom,
      margin: s.margin,
      lineHeight: s.lineHeight,
      fontSize: s.fontSize,
      height: li.getBoundingClientRect().height,
    });
  }

  // ── 5. DECORATION CONTAINERS (opacity check) ────────────
  // Look for common decoration patterns
  const decoSelectors = [
    '[class*="scene"]',
    '[class*="wave"]',
    '[class*="grain"]',
    '[class*="particle"]',
    '[class*="decoration"]',
    '[class*="super-d"]',
    '[class*="bg-icon"]',
  ];
  for (const sel of decoSelectors) {
    const els = section.querySelectorAll(sel);
    for (const el of els) {
      const s = getComputedStyle(el);
      // Also check SVG children
      const svg = el.querySelector('svg');
      const svgOpacity = svg ? getComputedStyle(svg).opacity : null;
      const classes = el.className && typeof el.className === 'string'
        ? el.className.trim() : '';
      result.decorations.push({
        className: classes.substring(0, 60),
        opacity: s.opacity,
        display: s.display,
        visibility: s.visibility,
        svgChildOpacity: svgOpacity,
      });
    }
  }

  // ── 6. SVG CONTAINERS (specific opacity check) ──────────
  const svgDirectChildren = section.querySelectorAll('svg');
  for (const svg of svgDirectChildren) {
    // Only check SVGs that are likely decorative (large, positioned)
    const r = svg.getBoundingClientRect();
    if (r.width < 50 || r.height < 50) continue; // skip small icons
    const s = getComputedStyle(svg);
    const parent = svg.parentElement;
    const parentClasses = parent && parent.className && typeof parent.className === 'string'
      ? parent.className.trim() : '';
    result.svgContainers.push({
      parentClass: parentClasses.substring(0, 60),
      width: r.width,
      height: r.height,
      opacity: s.opacity,
      position: s.position,
    });
  }

  return result;
}

// ────────────────────────────────────────────────────────────────
// COMPARISON ENGINE
// ────────────────────────────────────────────────────────────────

function compareSections(htmlData, wpData, sectionName) {
  const issues = [];

  if (!htmlData.found) {
    issues.push({ severity: 'WARN', category: 'structure', msg: `HTML section not found: ${htmlData.selector}` });
    return { section: sectionName, pass: true, issues }; // can't compare
  }
  if (!wpData.found) {
    issues.push({ severity: 'FAIL', category: 'structure', msg: `WP section not found: ${wpData.selector}` });
    return { section: sectionName, pass: false, issues };
  }

  // ── 1. PSEUDO-ELEMENTS ──────────────────────────────────
  // Check if HTML has pseudo-elements that WP doesn't
  for (const htmlPseudo of htmlData.pseudoElements) {
    // Try to find a matching pseudo in WP by similar path pattern
    const wpMatch = wpData.pseudoElements.find(wp => {
      // Match by pseudo type (::before/::after) and similar class pattern
      const htmlPseudoType = htmlPseudo.path.includes('::before') ? '::before' : '::after';
      const wpPseudoType = wp.path.includes('::before') ? '::before' : '::after';
      if (htmlPseudoType !== wpPseudoType) return false;

      // Check if backgrounds are similar (both gradient lines, both empty, etc.)
      const htmlHasBg = htmlPseudo.background && htmlPseudo.background !== 'none';
      const wpHasBg = wp.background && wp.background !== 'none';
      return htmlHasBg === wpHasBg;
    });

    if (!wpMatch) {
      issues.push({
        severity: 'FAIL',
        category: 'pseudo-element',
        msg: `Missing pseudo-element in WP: ${htmlPseudo.path} (background: ${htmlPseudo.background || 'none'})`,
      });
    }
  }

  // ── 2. CANVAS / DYNAMIC ELEMENTS ────────────────────────
  if (htmlData.canvasElements.length > 0 && wpData.canvasElements.length === 0) {
    issues.push({
      severity: 'FAIL',
      category: 'canvas',
      msg: `HTML has ${htmlData.canvasElements.length} canvas element(s) but WP has none. Check data-particles / JS injection.`,
    });
  }

  // Check data-particles attribute
  for (const htmlAttr of htmlData.dataAttributes) {
    const wpMatch = wpData.dataAttributes.find(wp => wp.attr === htmlAttr.attr);
    if (!wpMatch) {
      issues.push({
        severity: 'FAIL',
        category: 'data-attr',
        msg: `HTML has [${htmlAttr.attr}] on <${htmlAttr.tag}> but WP doesn't. Canvas animation will be missing.`,
      });
    } else if (htmlAttr.hasCanvas && !wpMatch.hasCanvas) {
      issues.push({
        severity: 'FAIL',
        category: 'canvas',
        msg: `Both have [${htmlAttr.attr}] but WP has no <canvas> child. Script may not be injected.`,
      });
    }
  }

  // ── 3. LIST ITEM SPACING ────────────────────────────────
  for (let i = 0; i < Math.min(htmlData.listItems.length, wpData.listItems.length); i++) {
    const htmlList = htmlData.listItems[i];
    const wpList = wpData.listItems[i];

    const htmlPadTop = parseFloat(htmlList.paddingTop);
    const wpPadTop = parseFloat(wpList.paddingTop);
    const padDiff = Math.abs(htmlPadTop - wpPadTop);

    if (padDiff > SPACING_TOLERANCE) {
      issues.push({
        severity: 'FAIL',
        category: 'spacing',
        msg: `List item padding mismatch: HTML=${htmlList.padding} (${htmlList.height.toFixed(0)}px tall) vs WP=${wpList.padding} (${wpList.height.toFixed(0)}px tall) on ${wpList.listSelector}`,
      });
    }

    const heightDiff = Math.abs(htmlList.height - wpList.height);
    if (heightDiff > DIMENSION_TOLERANCE) {
      issues.push({
        severity: 'WARN',
        category: 'spacing',
        msg: `List item height mismatch: HTML=${htmlList.height.toFixed(0)}px vs WP=${wpList.height.toFixed(0)}px on ${wpList.listSelector}`,
      });
    }
  }

  // Check for lists that exist in HTML but not WP (or vice versa)
  if (htmlData.listItems.length !== wpData.listItems.length) {
    issues.push({
      severity: 'WARN',
      category: 'structure',
      msg: `List count differs: HTML has ${htmlData.listItems.length} lists, WP has ${wpData.listItems.length}`,
    });
  }

  // ── 4. DECORATION OPACITY ───────────────────────────────
  for (let i = 0; i < Math.min(htmlData.decorations.length, wpData.decorations.length); i++) {
    const htmlDeco = htmlData.decorations[i];
    const wpDeco = wpData.decorations[i];

    // Skip hidden elements — display:none means intentionally hidden, opacity comparison is meaningless
    if (htmlDeco.display === 'none' || wpDeco.display === 'none') continue;

    const htmlOp = parseFloat(htmlDeco.opacity);
    const wpOp = parseFloat(wpDeco.opacity);
    if (Math.abs(htmlOp - wpOp) > OPACITY_TOLERANCE) {
      issues.push({
        severity: 'FAIL',
        category: 'opacity',
        msg: `Decoration opacity mismatch: HTML=${htmlDeco.opacity} vs WP=${wpDeco.opacity} on .${wpDeco.className}`,
      });
    }

    // Check SVG child opacity separately
    if (htmlDeco.svgChildOpacity && wpDeco.svgChildOpacity) {
      const htmlSvgOp = parseFloat(htmlDeco.svgChildOpacity);
      const wpSvgOp = parseFloat(wpDeco.svgChildOpacity);
      if (Math.abs(htmlSvgOp - wpSvgOp) > OPACITY_TOLERANCE) {
        issues.push({
          severity: 'FAIL',
          category: 'opacity',
          msg: `SVG child opacity mismatch: HTML=${htmlDeco.svgChildOpacity} vs WP=${wpDeco.svgChildOpacity} inside .${wpDeco.className}`,
        });
      }
    } else if (htmlDeco.svgChildOpacity && !wpDeco.svgChildOpacity) {
      issues.push({
        severity: 'WARN',
        category: 'opacity',
        msg: `HTML has SVG child (opacity=${htmlDeco.svgChildOpacity}) inside .${htmlDeco.className} but WP doesn't`,
      });
    }
  }

  // ── 5. SVG CONTAINER OPACITY ────────────────────────────
  for (let i = 0; i < Math.min(htmlData.svgContainers.length, wpData.svgContainers.length); i++) {
    const htmlSvg = htmlData.svgContainers[i];
    const wpSvg = wpData.svgContainers[i];

    const htmlOp = parseFloat(htmlSvg.opacity);
    const wpOp = parseFloat(wpSvg.opacity);
    if (Math.abs(htmlOp - wpOp) > OPACITY_TOLERANCE) {
      issues.push({
        severity: 'FAIL',
        category: 'opacity',
        msg: `Large SVG opacity: HTML=${htmlSvg.opacity} vs WP=${wpSvg.opacity} (parent: .${wpSvg.parentClass})`,
      });
    }
  }

  // ── 6. SECTION HEIGHT ───────────────────────────────────
  const heightDiff = Math.abs(htmlData.bounds.height - wpData.bounds.height);
  if (heightDiff > 50) {
    issues.push({
      severity: 'WARN',
      category: 'dimensions',
      msg: `Section height differs by ${heightDiff.toFixed(0)}px: HTML=${htmlData.bounds.height.toFixed(0)}px vs WP=${wpData.bounds.height.toFixed(0)}px`,
    });
  }

  const fails = issues.filter(i => i.severity === 'FAIL');
  return {
    section: sectionName,
    pass: fails.length === 0,
    issues,
    counts: {
      fail: fails.length,
      warn: issues.filter(i => i.severity === 'WARN').length,
    },
  };
}

// ────────────────────────────────────────────────────────────────
// MAIN RUNNER
// ────────────────────────────────────────────────────────────────

async function run(pageConfig, opts = {}) {
  const { sectionFilter, verbose } = opts;

  console.log(`\n▸ Element parity check: ${pageConfig.title || pageConfig.protoFile}`);
  console.log(`  HTML: ${pageConfig.protoFile}`);
  console.log(`  WP:   ${pageConfig.verify.wpUrl}\n`);

  // Start temp HTTP server for HTML prototype
  const { port, close: closeServer } = await startServer();

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: config.PUPPETEER_ARGS,
    protocolTimeout: config.PROTOCOL_TIMEOUT,
  });

  const results = [];

  try {
    // Open HTML page
    const htmlPage = await browser.newPage();
    await htmlPage.setViewport(config.VIEWPORT);
    const htmlUrl = `http://127.0.0.1:${port}/${pageConfig.protoFile}`;
    await htmlPage.goto(htmlUrl, { waitUntil: config.WAIT_UNTIL, timeout: 30000 });
    // Wait for fonts + animations to settle
    await config.loadFonts(htmlPage);
    await config.forceScrollElementsVisible(htmlPage);
    await new Promise(r => setTimeout(r, 1000));

    // Open WP page
    const wpPage = await browser.newPage();
    await wpPage.setViewport(config.VIEWPORT);
    await wpPage.goto(pageConfig.verify.wpUrl, {
      waitUntil: config.WAIT_UNTIL,
      timeout: 60000,
    });
    await waitForDiviReady(wpPage, { verbose: false });
    await config.forceScrollElementsVisible(wpPage);
    await new Promise(r => setTimeout(r, 1000));

    // Compare each section
    const sections = pageConfig.verify.sections.filter(
      s => !sectionFilter || s.name === sectionFilter
    );

    for (const section of sections) {
      // Extract DOM from both pages
      const extractFn = extractSectionDOM.toString();
      const htmlData = await htmlPage.evaluate(
        (fn, sel) => { const f = new Function('return ' + fn)(); return f(sel); },
        extractFn, section.htmlSelector
      );
      const wpData = await wpPage.evaluate(
        (fn, sel) => { const f = new Function('return ' + fn)(); return f(sel); },
        extractFn, section.wpSelector
      );

      const result = compareSections(htmlData, wpData, section.name);
      results.push(result);

      // Print result
      const icon = result.pass ? '✓' : '✗';
      const status = result.pass ? 'PASS' : 'FAIL';
      const issueSummary = result.issues.length > 0
        ? ` (${result.counts.fail} fail, ${result.counts.warn} warn)`
        : '';
      console.log(`  ${icon} [${status}] ${section.name}${issueSummary}`);

      if (verbose || !result.pass) {
        for (const issue of result.issues) {
          const prefix = issue.severity === 'FAIL' ? '    ✗' : '    ⚠';
          console.log(`${prefix} [${issue.category}] ${issue.msg}`);
        }
      }
    }

    await htmlPage.close();
    await wpPage.close();
  } finally {
    await browser.close();
    await closeServer();
  }

  // Summary
  const totalFail = results.filter(r => !r.pass).length;
  const totalPass = results.filter(r => r.pass).length;
  const allIssues = results.flatMap(r => r.issues);
  const failCount = allIssues.filter(i => i.severity === 'FAIL').length;
  const warnCount = allIssues.filter(i => i.severity === 'WARN').length;

  console.log(`\n  ────────────────────────────────`);
  console.log(`  Sections: ${totalPass} pass, ${totalFail} fail`);
  console.log(`  Issues:   ${failCount} fail, ${warnCount} warn`);

  if (totalFail > 0) {
    console.log(`\n  ✗ ELEMENT PARITY CHECK FAILED\n`);
  } else if (warnCount > 0) {
    console.log(`\n  ⚠ ELEMENT PARITY CHECK PASSED WITH WARNINGS\n`);
  } else {
    console.log(`\n  ✓ ELEMENT PARITY CHECK PASSED\n`);
  }

  return {
    pass: totalFail === 0,
    results,
    summary: { pass: totalPass, fail: totalFail, issues: failCount, warnings: warnCount },
  };
}

// ────────────────────────────────────────────────────────────────
// CLI
// ────────────────────────────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2);
  const pageArg = args.find((a, i) => args[i - 1] === '--page') || args[0];
  const sectionArg = args.find((a, i) => args[i - 1] === '--section');
  const verbose = args.includes('--verbose');

  if (!pageArg) {
    console.error('Usage: node element-parity-check.js --page <name> [--section <name>] [--verbose]');
    process.exit(1);
  }

  let pageConfig;
  try {
    pageConfig = require(path.join(__dirname, '..', 'pages', pageArg));
  } catch (e) {
    console.error(`Cannot load page config: pages/${pageArg}.js`);
    console.error(e.message);
    process.exit(1);
  }

  run(pageConfig, { sectionFilter: sectionArg, verbose })
    .then(result => process.exit(result.pass ? 0 : 1))
    .catch(err => { console.error(err); process.exit(1); });
}

module.exports = { run, extractSectionDOM, compareSections };
