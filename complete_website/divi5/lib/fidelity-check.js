/**
 * fidelity-check.js — Automated Divi ↔ HTML Fidelity Comparison
 *
 * Checks all 8 findings from the hero debugging session:
 *   F1: Font-smoothing (Divi antialiased vs HTML auto)
 *   F2: <p> padding injection (Divi adds padding-bottom: 1em)
 *   F3: Font-weight availability (HTML vs WP load different weights)
 *   F4: Line-height inheritance (must be explicit on every text element)
 *   F5: Unicode character mismatches (curly vs straight quotes/apostrophes)
 *   F6: Container display model (block vs flex)
 *   F7: Parent font-size for inline whitespace width
 *   F8: Transition timing mismatch
 *
 * Opens HTML (temp server) + WP (live) in Puppeteer, runs getComputedStyle()
 * on matched element pairs from the page config's verify.sections[].styleMap,
 * plus section-level wrapper checks.
 *
 * Usage:
 *   node complete_website/divi5/lib/fidelity-check.js --page home [--section hero] [--verbose]
 *
 * Output: Per-section report with PASS/FAIL per finding + exact values.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const { startServer } = require('./http-server');
const { waitForDiviReady } = require('./wait-for-divi');
const config = require('./screenshot-config');

// ═══════════════════════════════════════════════════════════
// FIDELITY PROPERTIES — the 8 findings we check
// ═══════════════════════════════════════════════════════════

/** Properties checked on EVERY element pair */
const ELEMENT_PROPERTIES = [
  'font-size', 'font-weight', 'font-family',
  'line-height', 'color', 'background-color',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'display', 'transition',
  '-webkit-font-smoothing',
];

/** Properties checked on CONTAINER elements (parents of inline children) */
const CONTAINER_PROPERTIES = [
  'font-size', 'display', 'align-items', 'gap',
  '-webkit-font-smoothing',
];

/** Unicode characters that commonly differ between HTML and WP builders */
const UNICODE_CHECKS = [
  { char: '\u2019', name: 'curly apostrophe', straight: "'" },
  { char: '\u201C', name: 'left curly quote', straight: '"' },
  { char: '\u201D', name: 'right curly quote', straight: '"' },
  { char: '\u2018', name: 'left single quote', straight: "'" },
];

// ═══════════════════════════════════════════════════════════
// COMPARISON HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Compare two CSS values with fuzzy tolerance.
 * Returns { match: boolean, note: string }
 */
function compareValues(prop, htmlVal, wpVal) {
  if (htmlVal === wpVal) return { match: true };

  // Normalize whitespace
  const h = (htmlVal || '').trim();
  const w = (wpVal || '').trim();
  if (h === w) return { match: true };

  // Font-family: compare primary font only
  if (prop === 'font-family') {
    const hPrimary = h.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
    const wPrimary = w.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
    if (hPrimary === wPrimary) return { match: true, note: 'primary font matches' };
    return { match: false, note: `HTML="${hPrimary}" WP="${wPrimary}"` };
  }

  // Numeric values: ±1px tolerance
  const hNum = parseFloat(h);
  const wNum = parseFloat(w);
  if (!isNaN(hNum) && !isNaN(wNum)) {
    if (Math.abs(hNum - wNum) <= 1) {
      return { match: true, note: `~${Math.abs(hNum - wNum).toFixed(2)}px diff (within tolerance)` };
    }
    return { match: false, note: `HTML=${h} WP=${w} (diff: ${(wNum - hNum).toFixed(2)}px)` };
  }

  // Transition: compare duration + timing function separately
  if (prop === 'transition') {
    // Extract duration from both
    const hDur = h.match(/([\d.]+)s/);
    const wDur = w.match(/([\d.]+)s/);
    if (hDur && wDur && hDur[1] !== wDur[1]) {
      return { match: false, note: `duration HTML=${hDur[1]}s WP=${wDur[1]}s` };
    }
    // Check if timing function differs
    const hBezier = h.match(/cubic-bezier\([^)]+\)/);
    const wBezier = w.match(/cubic-bezier\([^)]+\)/);
    const hEase = hBezier ? hBezier[0] : (h.includes('ease') ? 'ease' : 'linear');
    const wEase = wBezier ? wBezier[0] : (w.includes('ease') ? 'ease' : 'linear');
    if (hEase !== wEase) {
      return { match: false, note: `timing HTML="${hEase}" WP="${wEase}"` };
    }
    return { match: true, note: 'transition equivalent' };
  }

  // Color values: compare RGB components with ±5 tolerance
  const hColor = parseColor(h);
  const wColor = parseColor(w);
  if (hColor.valid && wColor.valid) {
    const dr = Math.abs(hColor.r - wColor.r);
    const dg = Math.abs(hColor.g - wColor.g);
    const db = Math.abs(hColor.b - wColor.b);
    const da = Math.abs(hColor.a - wColor.a);
    if (dr <= 5 && dg <= 5 && db <= 5 && da <= 0.05) {
      return { match: true, note: 'color within tolerance' };
    }
    return { match: false, note: `HTML=${h} WP=${w}` };
  }

  return { match: false, note: `HTML="${h}" WP="${w}"` };
}

function parseColor(str) {
  if (!str || str === 'none' || str === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0, valid: true };
  }
  const m = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1, valid: true };
  return { valid: false };
}

// ═══════════════════════════════════════════════════════════
// MAIN CHECK RUNNER
// ═══════════════════════════════════════════════════════════

/**
 * Run fidelity checks for a page.
 * @param {object} opts
 * @param {string} opts.pageName — page config name (e.g. 'home')
 * @param {string} [opts.sectionFilter] — check only this section
 * @param {boolean} [opts.verbose] — extra logging
 * @returns {Promise<object>} — full report
 */
async function run(opts) {
  const { pageName, sectionFilter, verbose } = opts;

  // Load page config
  const pageConfig = require(path.join(__dirname, '..', 'pages', `${pageName}.js`));
  const verifySections = (pageConfig.verify && pageConfig.verify.sections) || [];

  // Filter sections if requested
  const sections = sectionFilter
    ? verifySections.filter(s => s.name === sectionFilter)
    : verifySections;

  if (sections.length === 0) {
    console.error(`No sections found${sectionFilter ? ` matching "${sectionFilter}"` : ''}.`);
    process.exit(1);
  }

  // Start HTML server
  const htmlServer = await startServer();
  const htmlUrl = `http://127.0.0.1:${htmlServer.port}/${pageConfig.protoFile || 'index.html'}`;
  const wpUrl = pageConfig.verify.wpUrl;

  if (verbose) {
    console.log(`  HTML: ${htmlUrl}`);
    console.log(`  WP:   ${wpUrl}`);
  }

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: config.PUPPETEER_ARGS,
    protocolTimeout: config.PROTOCOL_TIMEOUT,
  });

  const report = { page: pageName, sections: [], summary: { pass: 0, fail: 0, warn: 0 } };

  try {
    // Open both pages
    const htmlPage = await browser.newPage();
    const wpPage = await browser.newPage();

    await htmlPage.setViewport(config.VIEWPORT);
    await wpPage.setViewport(config.VIEWPORT);

    console.log(`\n  Loading HTML reference...`);
    await htmlPage.goto(htmlUrl, { waitUntil: config.WAIT_UNTIL, timeout: 30000 });
    await config.loadFonts(htmlPage);
    await config.forceScrollElementsVisible(htmlPage);

    console.log(`  Loading WordPress page...`);
    await wpPage.goto(wpUrl, { waitUntil: config.WAIT_UNTIL, timeout: 60000 });
    await waitForDiviReady(wpPage, { verbose });
    await config.hideAdminBar(wpPage);
    await config.forceScrollElementsVisible(wpPage);

    // Wait for stabilization
    await new Promise(r => setTimeout(r, config.STABILIZATION_MS));

    // ═══════════════════════════════════════════════════════
    // RUN CHECKS PER SECTION
    // ═══════════════════════════════════════════════════════

    for (const section of sections) {
      console.log(`\n${'═'.repeat(60)}`);
      console.log(`  Section: ${section.name}`);
      console.log('═'.repeat(60));

      const sectionReport = {
        name: section.name,
        findings: [],
        elementChecks: [],
        unicodeChecks: [],
        passCount: 0,
        failCount: 0,
        warnCount: 0,
      };

      // ─────────────────────────────────────────────────────
      // F1: FONT SMOOTHING on section wrapper
      // ─────────────────────────────────────────────────────
      const f1 = await checkFontSmoothing(htmlPage, wpPage, section);
      sectionReport.findings.push(f1);
      logFinding(f1);

      // ─────────────────────────────────────────────────────
      // F2: <p> PADDING INJECTION
      // ─────────────────────────────────────────────────────
      const f2 = await checkParagraphPadding(wpPage, section);
      sectionReport.findings.push(f2);
      logFinding(f2);

      // ─────────────────────────────────────────────────────
      // F3-F4, F6-F8: ELEMENT-LEVEL STYLE COMPARISON
      // ─────────────────────────────────────────────────────
      if (section.styleMap && section.styleMap.length > 0) {
        for (const mapping of section.styleMap) {
          const elementResult = await checkElementStyles(
            htmlPage, wpPage, mapping, section, verbose
          );
          sectionReport.elementChecks.push(elementResult);

          // Log mismatches
          for (const m of elementResult.mismatches) {
            const finding = {
              id: `F${m.findingId}`,
              label: `${mapping.label}: ${m.property}`,
              status: m.severity,
              htmlValue: m.htmlValue,
              wpValue: m.wpValue,
              note: m.note,
            };
            logFinding(finding);
          }
        }
      }

      // ─────────────────────────────────────────────────────
      // F5: UNICODE CHARACTER CHECK
      // ─────────────────────────────────────────────────────
      const f5 = await checkUnicodeCharacters(htmlPage, wpPage, section);
      sectionReport.unicodeChecks = f5;
      for (const uc of f5) {
        logFinding(uc);
      }

      // ─────────────────────────────────────────────────────
      // F7: CONTAINER FONT-SIZE for inline whitespace
      // ─────────────────────────────────────────────────────
      const f7 = await checkContainerFontSize(htmlPage, wpPage, section);
      if (f7.length > 0) {
        for (const check of f7) {
          sectionReport.findings.push(check);
          logFinding(check);
        }
      }

      // Count pass/fail/warn
      const allFindings = [
        ...sectionReport.findings,
        ...sectionReport.unicodeChecks,
      ];
      // Also count element mismatches
      for (const ec of sectionReport.elementChecks) {
        for (const m of ec.mismatches) {
          allFindings.push({ status: m.severity });
        }
        // Count passes
        sectionReport.passCount += ec.matchCount;
      }
      for (const f of allFindings) {
        if (f.status === 'PASS') sectionReport.passCount++;
        else if (f.status === 'FAIL') sectionReport.failCount++;
        else if (f.status === 'WARN') sectionReport.warnCount++;
      }

      report.summary.pass += sectionReport.passCount;
      report.summary.fail += sectionReport.failCount;
      report.summary.warn += sectionReport.warnCount;

      report.sections.push(sectionReport);
    }

  } finally {
    await browser.close();
    await htmlServer.close();
  }

  // ═══════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  FIDELITY CHECK SUMMARY — ${pageName}`);
  console.log('═'.repeat(60));

  for (const s of report.sections) {
    const icon = s.failCount === 0 ? '✓' : '✗';
    console.log(`  ${icon} ${s.name}: ${s.passCount} pass, ${s.failCount} fail, ${s.warnCount} warn`);
  }

  console.log(`\n  Total: ${report.summary.pass} pass, ${report.summary.fail} fail, ${report.summary.warn} warn`);

  if (report.summary.fail > 0) {
    console.log('\n  Action items:');
    for (const s of report.sections) {
      for (const f of s.findings) {
        if (f.status === 'FAIL') {
          console.log(`    → [${s.name}] ${f.id} ${f.label}: ${f.note}`);
        }
      }
      for (const ec of s.elementChecks) {
        for (const m of ec.mismatches) {
          if (m.severity === 'FAIL') {
            console.log(`    → [${s.name}] F${m.findingId} ${ec.label}: ${m.property} — ${m.note}`);
          }
        }
      }
      for (const uc of s.unicodeChecks) {
        if (uc.status === 'FAIL') {
          console.log(`    → [${s.name}] ${uc.id} ${uc.label}: ${uc.note}`);
        }
      }
    }
  }

  return report;
}

// ═══════════════════════════════════════════════════════════
// INDIVIDUAL CHECK FUNCTIONS
// ═══════════════════════════════════════════════════════════

/**
 * F1: Check font-smoothing on section wrapper.
 * Divi sets antialiased globally; HTML uses auto.
 */
async function checkFontSmoothing(htmlPage, wpPage, section) {
  const wpSelector = section.wpSelector;

  // Check both the Divi wrapper AND the first child (Code Module content).
  // The Code Module wrapper is where we set font-smoothing, not the .et_pb_* wrapper.
  const wpSmoothing = await wpPage.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    if (cs.webkitFontSmoothing === 'auto') return 'auto';
    // Check descendant content wrappers — Code Module content may be nested deep
    const descendants = el.querySelectorAll('div[class], section[class]');
    for (const d of descendants) {
      const dcs = window.getComputedStyle(d);
      if (dcs.webkitFontSmoothing === 'auto') return 'auto';
    }
    return cs.webkitFontSmoothing;
  }, wpSelector);

  if (wpSmoothing === null) {
    return { id: 'F1', label: 'Font-smoothing', status: 'WARN', note: `WP selector "${wpSelector}" not found` };
  }

  if (wpSmoothing === 'auto') {
    return { id: 'F1', label: 'Font-smoothing', status: 'PASS', note: 'WP section wrapper has -webkit-font-smoothing: auto' };
  }

  return {
    id: 'F1', label: 'Font-smoothing', status: 'FAIL',
    wpValue: wpSmoothing, htmlValue: 'auto',
    note: `WP has "${wpSmoothing}" (expected "auto"). Add -webkit-font-smoothing:auto to section wrapper.`,
  };
}

/**
 * F2: Check <p> padding injection.
 * Divi adds p { padding-bottom: 1em } globally.
 */
async function checkParagraphPadding(wpPage, section) {
  const wpSelector = section.wpSelector;

  const pPaddings = await wpPage.evaluate((sel) => {
    const wrapper = document.querySelector(sel);
    if (!wrapper) return null;
    const ps = wrapper.querySelectorAll('p');
    return Array.from(ps).slice(0, 10).map(p => {
      const cs = window.getComputedStyle(p);
      return {
        text: p.textContent.trim().substring(0, 40),
        paddingBottom: cs.paddingBottom,
        className: p.className || '(none)',
      };
    });
  }, wpSelector);

  if (!pPaddings || pPaddings.length === 0) {
    return { id: 'F2', label: '<p> padding injection', status: 'PASS', note: 'No <p> elements in section' };
  }

  const injected = pPaddings.filter(p => parseFloat(p.paddingBottom) > 1);
  if (injected.length === 0) {
    return { id: 'F2', label: '<p> padding injection', status: 'PASS', note: `All ${pPaddings.length} <p> elements have padding-bottom ≤ 1px` };
  }

  const examples = injected.slice(0, 3).map(p =>
    `"${p.text}" (.${p.className}) has padding-bottom: ${p.paddingBottom}`
  ).join('; ');

  return {
    id: 'F2', label: '<p> padding injection', status: 'FAIL',
    note: `${injected.length}/${pPaddings.length} <p> have Divi padding. ${examples}`,
  };
}

/**
 * F3-F4, F6, F8: Check computed styles on a single element pair.
 * Compares all ELEMENT_PROPERTIES between HTML and WP.
 */
async function checkElementStyles(htmlPage, wpPage, mapping, section, verbose) {
  const result = {
    label: mapping.label,
    htmlSelector: mapping.htmlSel,
    wpSelector: mapping.wpSel,
    mismatches: [],
    matchCount: 0,
  };

  // Get computed styles from both sides
  const [htmlStyles, wpStyles] = await Promise.all([
    htmlPage.evaluate((sel, props) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const result = {};
      for (const p of props) result[p] = cs.getPropertyValue(p);
      // Also get parent info for F6/F7
      const parent = el.parentElement;
      if (parent) {
        const pcs = window.getComputedStyle(parent);
        result.__parentDisplay = pcs.display;
        result.__parentFontSize = pcs.fontSize;
        result.__parentClass = parent.className;
      }
      return result;
    }, mapping.htmlSel, ELEMENT_PROPERTIES),

    wpPage.evaluate((sel, props) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const result = {};
      for (const p of props) result[p] = cs.getPropertyValue(p);
      const parent = el.parentElement;
      if (parent) {
        const pcs = window.getComputedStyle(parent);
        result.__parentDisplay = pcs.display;
        result.__parentFontSize = pcs.fontSize;
        result.__parentClass = parent.className;
      }
      return result;
    }, mapping.wpSel, ELEMENT_PROPERTIES),
  ]);

  if (!htmlStyles) {
    result.mismatches.push({
      findingId: 0, property: 'selector', severity: 'WARN',
      note: `HTML selector "${mapping.htmlSel}" not found`,
    });
    return result;
  }
  if (!wpStyles) {
    result.mismatches.push({
      findingId: 0, property: 'selector', severity: 'WARN',
      note: `WP selector "${mapping.wpSel}" not found`,
    });
    return result;
  }

  // Compare each property
  for (const prop of ELEMENT_PROPERTIES) {
    const htmlVal = htmlStyles[prop] || '';
    const wpVal = wpStyles[prop] || '';
    const cmp = compareValues(prop, htmlVal, wpVal);

    if (cmp.match) {
      result.matchCount++;
      continue;
    }

    // Classify which finding this belongs to
    let findingId = 8; // default to F8 (transition)
    let severity = 'FAIL';

    if (prop === '-webkit-font-smoothing') {
      findingId = 1;
    } else if (prop.startsWith('padding')) {
      findingId = 2;
    } else if (prop === 'font-weight') {
      findingId = 3;
    } else if (prop === 'line-height') {
      findingId = 4;
    } else if (prop === 'display') {
      findingId = 6;
    } else if (prop === 'font-size') {
      findingId = 7;
    } else if (prop === 'transition') {
      findingId = 8;
    } else {
      findingId = 0; // general style mismatch
    }

    result.mismatches.push({
      findingId,
      property: prop,
      severity,
      htmlValue: htmlVal,
      wpValue: wpVal,
      note: cmp.note || `HTML="${htmlVal}" WP="${wpVal}"`,
    });
  }

  // F6: Check parent display model
  if (htmlStyles.__parentDisplay !== wpStyles.__parentDisplay) {
    result.mismatches.push({
      findingId: 6,
      property: 'parent display',
      severity: 'FAIL',
      htmlValue: htmlStyles.__parentDisplay,
      wpValue: wpStyles.__parentDisplay,
      note: `Parent container: HTML="${htmlStyles.__parentDisplay}" (${htmlStyles.__parentClass}) vs WP="${wpStyles.__parentDisplay}" (${wpStyles.__parentClass})`,
    });
  } else {
    result.matchCount++;
  }

  // F7: Check parent font-size (matters for inline whitespace)
  if (htmlStyles.__parentFontSize !== wpStyles.__parentFontSize) {
    result.mismatches.push({
      findingId: 7,
      property: 'parent font-size',
      severity: 'WARN',
      htmlValue: htmlStyles.__parentFontSize,
      wpValue: wpStyles.__parentFontSize,
      note: `Parent font-size differs: HTML="${htmlStyles.__parentFontSize}" vs WP="${wpStyles.__parentFontSize}" — affects inline whitespace width`,
    });
  } else {
    result.matchCount++;
  }

  return result;
}

/**
 * F5: Check for Unicode character mismatches in text content.
 * Compares text content character-by-character between HTML and WP.
 */
async function checkUnicodeCharacters(htmlPage, wpPage, section) {
  const results = [];
  const wpSelector = section.wpSelector;
  const htmlSelector = section.htmlSelector;

  if (!wpSelector || !htmlSelector) return results;

  // Get all text content from both sections
  const [htmlTexts, wpTexts] = await Promise.all([
    htmlPage.evaluate((sel) => {
      const wrapper = document.querySelector(sel);
      if (!wrapper) return [];
      // Get text from headings, paragraphs, links, blockquotes
      const textEls = wrapper.querySelectorAll('h1, h2, h3, h4, p, a, blockquote, span');
      return Array.from(textEls).slice(0, 30).map(el => ({
        tag: el.tagName,
        text: el.textContent.trim().substring(0, 200),
        class: el.className || '',
      }));
    }, htmlSelector),

    wpPage.evaluate((sel) => {
      const wrapper = document.querySelector(sel);
      if (!wrapper) return [];
      const textEls = wrapper.querySelectorAll('h1, h2, h3, h4, p, a, blockquote, span');
      return Array.from(textEls).slice(0, 30).map(el => ({
        tag: el.tagName,
        text: el.textContent.trim().substring(0, 200),
        class: el.className || '',
      }));
    }, wpSelector),
  ]);

  // Check WP texts for curly quotes that don't exist in HTML
  for (const wpText of wpTexts) {
    for (const check of UNICODE_CHECKS) {
      if (wpText.text.includes(check.char)) {
        // Find matching HTML text (by first 20 chars)
        const prefix = wpText.text.substring(0, 20).replace(check.char, check.straight);
        const htmlMatch = htmlTexts.find(h => h.text.substring(0, 20) === prefix);

        if (htmlMatch && !htmlMatch.text.includes(check.char)) {
          // HTML uses straight, WP uses curly — mismatch
          const context = wpText.text.substring(
            Math.max(0, wpText.text.indexOf(check.char) - 10),
            wpText.text.indexOf(check.char) + 15
          );
          results.push({
            id: 'F5',
            label: `Unicode: ${check.name}`,
            status: 'FAIL',
            note: `WP has ${check.name} (U+${check.char.charCodeAt(0).toString(16).toUpperCase()}) but HTML uses "${check.straight}" — context: "…${context}…"`,
          });
        }
      }
    }
  }

  if (results.length === 0) {
    results.push({
      id: 'F5', label: 'Unicode characters', status: 'PASS',
      note: 'No curly quote/apostrophe mismatches detected',
    });
  }

  return results;
}

/**
 * F7: Check font-size on containers that hold inline children.
 * Inline whitespace width depends on parent font-size.
 */
async function checkContainerFontSize(htmlPage, wpPage, section) {
  const results = [];
  const wpSelector = section.wpSelector;
  const htmlSelector = section.htmlSelector;

  if (!wpSelector || !htmlSelector) return results;

  // Find containers with inline children on both sides
  const [htmlContainers, wpContainers] = await Promise.all([
    htmlPage.evaluate((sel) => {
      const wrapper = document.querySelector(sel);
      if (!wrapper) return [];
      // Find divs that contain inline-flex or inline-block children
      const containers = [];
      wrapper.querySelectorAll('div').forEach(div => {
        const children = Array.from(div.children);
        const hasInline = children.some(c => {
          const d = window.getComputedStyle(c).display;
          return d === 'inline-flex' || d === 'inline-block' || d === 'inline';
        });
        if (hasInline && children.length >= 2) {
          const cs = window.getComputedStyle(div);
          containers.push({
            class: div.className,
            display: cs.display,
            fontSize: cs.fontSize,
            childCount: children.length,
          });
        }
      });
      return containers;
    }, htmlSelector),

    wpPage.evaluate((sel) => {
      const wrapper = document.querySelector(sel);
      if (!wrapper) return [];
      const containers = [];
      wrapper.querySelectorAll('div').forEach(div => {
        const children = Array.from(div.children);
        const hasInline = children.some(c => {
          const d = window.getComputedStyle(c).display;
          return d === 'inline-flex' || d === 'inline-block' || d === 'inline';
        });
        if (hasInline && children.length >= 2) {
          const cs = window.getComputedStyle(div);
          containers.push({
            class: div.className,
            display: cs.display,
            fontSize: cs.fontSize,
            childCount: children.length,
          });
        }
      });
      return containers;
    }, wpSelector),
  ]);

  // Compare font-sizes where class names suggest a match
  for (const wpC of wpContainers) {
    // Check if font-size differs from 16px (common body default)
    const wpSize = parseFloat(wpC.fontSize);
    if (wpSize < 16) {
      // Find matching HTML container
      const htmlMatch = htmlContainers.find(h => h.childCount === wpC.childCount);
      if (htmlMatch && htmlMatch.fontSize !== wpC.fontSize) {
        results.push({
          id: 'F7',
          label: `Container font-size: .${wpC.class}`,
          status: 'FAIL',
          htmlValue: htmlMatch.fontSize,
          wpValue: wpC.fontSize,
          note: `WP container .${wpC.class} has font-size: ${wpC.fontSize} (HTML: ${htmlMatch.fontSize}). Affects inline whitespace width.`,
        });
      }
    }
  }

  return results;
}

// ═══════════════════════════════════════════════════════════
// OUTPUT HELPERS
// ═══════════════════════════════════════════════════════════

function logFinding(f) {
  const icons = { PASS: '  ✓', FAIL: '  ✗', WARN: '  ⚠' };
  const icon = icons[f.status] || '  ?';
  const values = f.htmlValue && f.wpValue ? ` [HTML=${f.htmlValue} WP=${f.wpValue}]` : '';
  console.log(`${icon} ${f.id || ''} ${f.label}: ${f.note || ''}${values}`);
}

// ═══════════════════════════════════════════════════════════
// CLI ENTRY POINT
// ═══════════════════════════════════════════════════════════

if (require.main === module) {
  const args = process.argv.slice(2);
  const pageName = args.find((a, i) => args[i - 1] === '--page') || 'home';
  const sectionFilter = args.find((a, i) => args[i - 1] === '--section');
  const verbose = args.includes('--verbose');

  console.log(`\n╔${'═'.repeat(58)}╗`);
  console.log(`║  FIDELITY CHECK — ${pageName}${sectionFilter ? ` (section: ${sectionFilter})` : ''}`.padEnd(59) + '║');
  console.log(`╚${'═'.repeat(58)}╝`);
  console.log(`  Checking 8 findings: font-smoothing, <p> padding, font-weight,`);
  console.log(`  line-height, unicode chars, display model, container font-size, transition`);

  run({ pageName, sectionFilter, verbose })
    .then((report) => {
      process.exit(report.summary.fail > 0 ? 1 : 0);
    })
    .catch((err) => {
      console.error('\n  FATAL:', err.message);
      if (err.message.includes('net::ERR')) {
        console.error('  → Is LocalWP running?');
      }
      process.exit(2);
    });
}

module.exports = { run };
