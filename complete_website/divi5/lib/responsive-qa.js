/**
 * responsive-qa.js — Responsive QA engine for Divi 5 pages
 *
 * 5 automated checks at 4 viewports (desktop/tablet/mobile/small).
 * Fresh page.goto() per viewport (Divi 5 React hydration is per-load).
 * Uses networkidle2 + stabilization (same as screenshot pipeline).
 *
 * Checks:
 *   1. Horizontal overflow — scrollWidth > clientWidth (P0)
 *   2. Hidden content clipping — overflow:hidden with wider children (P1)
 *   3. Touch targets — interactive elements < 44x44px (P0, mobile/small only)
 *   4. Font legibility — computed font-size < 14px on visible text (P1, mobile/small)
 *   5. Grid collapse — multi-column not wrapping at narrow widths (P1, mobile/small)
 *
 * Usage:
 *   const responsiveQA = require('./lib/responsive-qa');
 *   const report = await responsiveQA.run({ pageName, pageUrl, viewports });
 */

const puppeteer = require('puppeteer');
const config = require('./screenshot-config');

const DEFAULT_VIEWPORTS = config.RESPONSIVE_VIEWPORTS;

// Interactive element selectors for touch target check
const TOUCH_SELECTORS = 'a, button, input, select, textarea, [role="button"]';

// Min touch target size (px) — WCAG 2.5.8 (AAA: 44px, AA: 24px — we use 44)
const MIN_TOUCH_SIZE = 44;

// Min readable font size at mobile/small
const MIN_FONT_MOBILE = 14;
const MIN_FONT_SMALL = 12;

/**
 * Load a page at a specific viewport with full Divi readiness.
 * Fresh page.goto() per viewport — Divi 5 React hydration is per-load.
 *
 * @param {import('puppeteer').Browser} browser
 * @param {string} url
 * @param {{width: number, height: number}} viewport
 * @returns {import('puppeteer').Page}
 */
async function loadAtViewport(browser, url, viewport) {
  const page = await browser.newPage();
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(url, { waitUntil: config.WAIT_UNTIL, timeout: 60000 });
  await config.loadFonts(page);
  await config.hideAdminBar(page);
  await new Promise(r => setTimeout(r, config.STABILIZATION_MS));
  return page;
}

/**
 * Check 1: Horizontal overflow (P0)
 * Detects pages where body scrollWidth > clientWidth AND no overflow:hidden ancestor clips it.
 */
async function checkHorizontalOverflow(page) {
  return page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollW = Math.max(body.scrollWidth, html.scrollWidth);
    const clientW = html.clientWidth;
    if (scrollW <= clientW) return { pass: true, issues: [] };

    // Find elements that extend beyond viewport
    const issues = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > clientW + 2 && rect.width > 0 && rect.height > 0) {
        // Check if an ancestor has overflow:hidden (clipping it)
        let clipped = false;
        let parent = el.parentElement;
        while (parent) {
          const style = getComputedStyle(parent);
          if (style.overflow === 'hidden' || style.overflowX === 'hidden') {
            clipped = true;
            break;
          }
          parent = parent.parentElement;
        }
        if (!clipped) {
          const tag = el.tagName.toLowerCase();
          const cls = el.className && typeof el.className === 'string'
            ? el.className.split(' ').slice(0, 3).join('.')
            : '';
          issues.push({
            element: `${tag}${cls ? '.' + cls : ''}`,
            overflow: Math.round(rect.right - clientW),
          });
        }
      }
    }
    // Deduplicate — keep parent elements only (limit to 5)
    const unique = issues.slice(0, 5);
    return { pass: unique.length === 0, issues: unique };
  });
}

/**
 * Check 2: Hidden content clipping (P1)
 * Finds overflow:hidden parents with children wider than viewport.
 */
async function checkHiddenClipping(page) {
  return page.evaluate(() => {
    const issues = [];
    const all = document.querySelectorAll('*');
    const viewportW = window.innerWidth;

    for (const el of all) {
      const style = getComputedStyle(el);
      if (style.overflow === 'hidden' || style.overflowX === 'hidden') {
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;

        // Check if any child extends beyond this container
        for (const child of el.children) {
          const childRect = child.getBoundingClientRect();
          if (childRect.width > rect.width + 4 && childRect.width > viewportW * 0.5) {
            const tag = el.tagName.toLowerCase();
            const cls = el.className && typeof el.className === 'string'
              ? el.className.split(' ').slice(0, 2).join('.')
              : '';
            issues.push({
              element: `${tag}${cls ? '.' + cls : ''}`,
              parentWidth: Math.round(rect.width),
              childWidth: Math.round(childRect.width),
            });
            break; // One per parent
          }
        }
      }
    }
    return { pass: issues.length === 0, issues: issues.slice(0, 5) };
  });
}

/**
 * Check 3: Touch targets (P0, mobile/small only)
 * Interactive elements must be at least 44x44px.
 */
async function checkTouchTargets(page, selectors) {
  return page.evaluate((sel, minSize) => {
    const issues = [];
    const elements = document.querySelectorAll(sel);

    for (const el of elements) {
      const style = getComputedStyle(el);
      // Skip hidden elements
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

      const rect = el.getBoundingClientRect();
      // Skip zero-size or off-screen elements
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.bottom < 0 || rect.top > window.innerHeight * 3) continue;

      if (rect.width < minSize || rect.height < minSize) {
        const tag = el.tagName.toLowerCase();
        const text = (el.textContent || '').trim().slice(0, 30);
        const cls = el.className && typeof el.className === 'string'
          ? el.className.split(' ').slice(0, 2).join('.')
          : '';
        issues.push({
          element: `${tag}${cls ? '.' + cls : ''}`,
          text: text || '(no text)',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    }
    return { pass: issues.length === 0, issues: issues.slice(0, 10) };
  }, selectors, MIN_TOUCH_SIZE);
}

/**
 * Check 4: Font legibility (P1, mobile/small only)
 * Visible text elements with font-size < 14px (< 12px on small).
 */
async function checkFontLegibility(page, minFontSize) {
  return page.evaluate((minSize) => {
    const issues = [];
    const textElements = document.querySelectorAll('p, span, li, td, th, label, a, h1, h2, h3, h4, h5, h6, div');

    for (const el of textElements) {
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.bottom < 0 || rect.top > window.innerHeight * 3) continue;

      // Only check elements with direct text content (not just children)
      const hasDirectText = Array.from(el.childNodes).some(
        n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0
      );
      if (!hasDirectText) continue;

      const fontSize = parseFloat(style.fontSize);
      if (fontSize < minSize) {
        const tag = el.tagName.toLowerCase();
        const text = (el.textContent || '').trim().slice(0, 30);
        issues.push({
          element: tag,
          text: text || '(empty)',
          fontSize: Math.round(fontSize * 10) / 10,
        });
      }
    }
    // Deduplicate by element+fontSize, keep first 10
    const seen = new Set();
    const unique = issues.filter(i => {
      const key = `${i.element}:${i.fontSize}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { pass: unique.length === 0, issues: unique.slice(0, 10) };
  }, minFontSize);
}

/**
 * Check 5: Grid collapse (P1, mobile/small only)
 * Multi-column layouts that haven't collapsed to single column.
 */
async function checkGridCollapse(page) {
  return page.evaluate(() => {
    const issues = [];
    const gridContainers = document.querySelectorAll(
      '[style*="grid"], [class*="grid"], [class*="row"], .et_pb_row'
    );

    for (const container of gridContainers) {
      const style = getComputedStyle(container);
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (style.display === 'none') continue;

      // Count visible children on same vertical line (same Y position ±10px)
      const children = Array.from(container.children).filter(c => {
        const cs = getComputedStyle(c);
        const cr = c.getBoundingClientRect();
        return cs.display !== 'none' && cr.width > 0 && cr.height > 0;
      });

      if (children.length < 3) continue;

      // Group children by Y position (±10px tolerance)
      const rows = [];
      for (const child of children) {
        const y = Math.round(child.getBoundingClientRect().top / 10) * 10;
        let found = rows.find(r => Math.abs(r.y - y) < 10);
        if (found) {
          found.count++;
        } else {
          rows.push({ y, count: 1 });
        }
      }

      // If any row has 3+ items and viewport < 768px, flag it
      const wideRow = rows.find(r => r.count >= 3);
      if (wideRow && window.innerWidth <= 768) {
        const tag = container.tagName.toLowerCase();
        const cls = container.className && typeof container.className === 'string'
          ? container.className.split(' ').slice(0, 2).join('.')
          : '';
        issues.push({
          element: `${tag}${cls ? '.' + cls : ''}`,
          itemsInRow: wideRow.count,
          viewportWidth: window.innerWidth,
        });
      }
    }
    return { pass: issues.length === 0, issues: issues.slice(0, 5) };
  });
}

/**
 * Run responsive QA checks for a single page at specified viewports.
 *
 * @param {object} opts
 * @param {string} opts.pageName — page identifier
 * @param {string} opts.pageUrl — full URL to test
 * @param {Array}  [opts.viewports] — viewport configs (default: all 4)
 * @param {import('puppeteer').Browser} [opts.browser] — reuse existing browser
 * @returns {object} Report with per-viewport results and overall verdict
 */
async function run({ pageName, pageUrl, viewports, browser: externalBrowser }) {
  const vps = viewports || DEFAULT_VIEWPORTS;
  const ownBrowser = !externalBrowser;
  const browser = externalBrowser || await puppeteer.launch({
    headless: 'new',
    protocolTimeout: config.PROTOCOL_TIMEOUT,
    args: config.PUPPETEER_ARGS,
  });

  const report = {
    pageName,
    pageUrl,
    viewports: [],
    overallVerdict: 'PASS',
    p0Count: 0,
    p1Count: 0,
  };

  try {
    for (const vp of vps) {
      const vpReport = {
        name: vp.name,
        width: vp.width,
        height: vp.height,
        checks: [],
        verdict: 'PASS',
        p0: 0,
        p1: 0,
      };

      let page;
      try {
        page = await loadAtViewport(browser, pageUrl, vp);

        // Check 1: Horizontal overflow (all viewports) — P0
        const overflow = await checkHorizontalOverflow(page);
        vpReport.checks.push({
          name: 'horizontal-overflow',
          severity: 'P0',
          pass: overflow.pass,
          issues: overflow.issues,
        });
        if (!overflow.pass) vpReport.p0 += overflow.issues.length;

        // Check 2: Hidden content clipping (all viewports) — P1
        const clipping = await checkHiddenClipping(page);
        vpReport.checks.push({
          name: 'hidden-clipping',
          severity: 'P1',
          pass: clipping.pass,
          issues: clipping.issues,
        });
        if (!clipping.pass) vpReport.p1 += clipping.issues.length;

        // Check 3: Touch targets (mobile + small only) — P0
        if (vp.name === 'mobile' || vp.name === 'small') {
          const touch = await checkTouchTargets(page, TOUCH_SELECTORS);
          vpReport.checks.push({
            name: 'touch-targets',
            severity: 'P0',
            pass: touch.pass,
            issues: touch.issues,
          });
          if (!touch.pass) vpReport.p0 += touch.issues.length;
        }

        // Check 4: Font legibility (mobile + small only) — P1
        if (vp.name === 'mobile' || vp.name === 'small') {
          const minFont = vp.name === 'small' ? MIN_FONT_SMALL : MIN_FONT_MOBILE;
          const fonts = await checkFontLegibility(page, minFont);
          vpReport.checks.push({
            name: 'font-legibility',
            severity: 'P1',
            pass: fonts.pass,
            issues: fonts.issues,
          });
          if (!fonts.pass) vpReport.p1 += fonts.issues.length;
        }

        // Check 5: Grid collapse (mobile + small only) — P1
        if (vp.name === 'mobile' || vp.name === 'small') {
          const grid = await checkGridCollapse(page);
          vpReport.checks.push({
            name: 'grid-collapse',
            severity: 'P1',
            pass: grid.pass,
            issues: grid.issues,
          });
          if (!grid.pass) vpReport.p1 += grid.issues.length;
        }

      } catch (err) {
        vpReport.error = err.message;
        vpReport.verdict = 'ERROR';
      } finally {
        if (page) await page.close().catch(() => {});
      }

      // Determine viewport verdict
      if (!vpReport.error) {
        if (vpReport.p0 > 0) {
          vpReport.verdict = 'FAIL';
        } else if (vpReport.p1 > 2) {
          vpReport.verdict = 'WARN';
        } else {
          vpReport.verdict = 'PASS';
        }
      }

      report.viewports.push(vpReport);
      report.p0Count += vpReport.p0;
      report.p1Count += vpReport.p1;
    }

    // Overall verdict
    if (report.p0Count > 0) {
      report.overallVerdict = 'FAIL';
    } else if (report.p1Count > 2) {
      report.overallVerdict = 'WARN';
    } else {
      report.overallVerdict = 'PASS';
    }
  } finally {
    if (ownBrowser) await browser.close();
  }

  return report;
}

/**
 * Print a human-readable report to console.
 * @param {object} report — from run()
 */
function printReport(report) {
  const verdictColor = {
    PASS: '\x1b[32m',
    WARN: '\x1b[33m',
    FAIL: '\x1b[31m',
    ERROR: '\x1b[31m',
  };
  const reset = '\x1b[0m';

  console.log(`\n  Responsive QA: ${report.pageName}`);
  console.log(`  URL: ${report.pageUrl}`);
  console.log('  ' + '─'.repeat(60));

  for (const vp of report.viewports) {
    const color = verdictColor[vp.verdict] || '';
    console.log(`\n  ${vp.name} (${vp.width}×${vp.height}): ${color}${vp.verdict}${reset}`);

    if (vp.error) {
      console.log(`    Error: ${vp.error}`);
      continue;
    }

    for (const check of vp.checks) {
      const icon = check.pass ? '✓' : (check.severity === 'P0' ? '✗' : '⚠');
      const checkColor = check.pass ? '\x1b[32m' : (check.severity === 'P0' ? '\x1b[31m' : '\x1b[33m');
      console.log(`    ${checkColor}${icon}${reset} ${check.name} (${check.severity}) — ${check.issues.length} issue(s)`);

      if (!check.pass) {
        for (const issue of check.issues.slice(0, 3)) {
          const detail = formatIssue(check.name, issue);
          console.log(`      → ${detail}`);
        }
        if (check.issues.length > 3) {
          console.log(`      ... and ${check.issues.length - 3} more`);
        }
      }
    }
  }

  console.log('\n  ' + '─'.repeat(60));
  const overallColor = verdictColor[report.overallVerdict] || '';
  console.log(`  Overall: ${overallColor}${report.overallVerdict}${reset} (P0: ${report.p0Count}, P1: ${report.p1Count})`);
}

/**
 * Format a single issue for display.
 */
function formatIssue(checkName, issue) {
  switch (checkName) {
    case 'horizontal-overflow':
      return `${issue.element} overflows by ${issue.overflow}px`;
    case 'hidden-clipping':
      return `${issue.element} clips child (${issue.parentWidth}px → ${issue.childWidth}px)`;
    case 'touch-targets':
      return `${issue.element} "${issue.text}" (${issue.width}×${issue.height}px)`;
    case 'font-legibility':
      return `${issue.element} "${issue.text}" (${issue.fontSize}px)`;
    case 'grid-collapse':
      return `${issue.element} has ${issue.itemsInRow} items in row at ${issue.viewportWidth}px`;
    default:
      return JSON.stringify(issue);
  }
}

module.exports = {
  run,
  printReport,
  DEFAULT_VIEWPORTS,
  TOUCH_SELECTORS,
  MIN_TOUCH_SIZE,
  MIN_FONT_MOBILE,
  MIN_FONT_SMALL,
};
