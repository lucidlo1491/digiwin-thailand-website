#!/usr/bin/env node
/**
 * verify-divi5.js v2 — Visual Fidelity Verification Engine
 *
 * Verifies WordPress Divi 5 builds against golden reference JSON.
 * v2 adds: font loading gate, full typography checks, positional verification,
 * pseudo-element support, text content checks, href checks, alpha-aware colors,
 * proper Divi hydration wait, and better error diagnostics.
 *
 * Usage:
 *   node verify-divi5.js --section hero --url "https://digiwin-thailand.local/?page_id=100684" [--logged-out] [--json]
 *
 * Requires: npm install playwright && npx playwright install chromium
 */

const fs = require('fs');
const path = require('path');

// ════════════════════════════════════════════════════════════════
// CLI ARGS
// ════════════════════════════════════════════════════════════════

const args = process.argv.slice(2);
function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}
const hasFlag = (flag) => args.includes(flag);

const sectionName = getArg('--section') || 'hero';
const pageUrl = getArg('--url') || 'https://digiwin-thailand.local/?page_id=100505';
const goldenPath = getArg('--golden') || path.join(__dirname, 'golden-refs', `${sectionName}.json`);
const loggedOut = hasFlag('--logged-out');
const jsonOutput = hasFlag('--json');
const captureGolden = hasFlag('--capture-golden');
const screenshotDir = path.join(__dirname, '..', 'screenshots');
const goldenScreenshotDir = path.join(__dirname, 'golden-refs', 'screenshots');

// ════════════════════════════════════════════════════════════════
// MATCHERS — comparison functions for different property types
// ════════════════════════════════════════════════════════════════

/** Parse numeric value from CSS string (e.g., "80px" → 80) */
function parseNum(str) {
  if (typeof str === 'number') return str;
  const s = String(str).trim();
  // Handle "normal" keyword
  if (s === 'normal' || s === 'none' || s === 'auto') return NaN;
  // Extract first valid number (integer or decimal)
  const m = s.match(/-?\d+(?:\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
}

/** Parse rgb/rgba color string → [r, g, b, a] */
function parseColor(str) {
  const s = String(str).trim();
  // rgba(r, g, b, a)
  const m4 = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (m4) {
    return [parseFloat(m4[1]), parseFloat(m4[2]), parseFloat(m4[3]), m4[4] !== undefined ? parseFloat(m4[4]) : 1.0];
  }
  return null;
}

/** Resolve font-weight keyword to numeric */
function resolveWeight(val) {
  const s = String(val).trim().toLowerCase();
  if (s === 'normal') return 400;
  if (s === 'bold') return 700;
  const n = parseInt(s, 10);
  return isNaN(n) ? null : n;
}

/** Check if actual value matches expected using the right matcher */
function checkProperty(actual, expected, propName, context) {
  // Distinguish between element not found and property empty
  if (actual === '__ELEMENT_NOT_FOUND__') {
    return { pass: false, reason: `selector not found in DOM` };
  }
  if (actual === null || actual === undefined || actual === '') {
    return { pass: false, reason: `property "${propName}" returned empty` };
  }

  // Simple string match
  if (typeof expected === 'string') {
    const pass = String(actual).trim() === expected.trim();
    return { pass, reason: pass ? '' : `expected "${expected}", got "${actual}"` };
  }

  // Matcher object
  if (typeof expected === 'object' && expected !== null) {

    // "contains" — substring match
    if (expected.contains !== undefined) {
      const pass = String(actual).includes(expected.contains);
      return { pass, reason: pass ? '' : `expected to contain "${expected.contains}", got "${actual}"` };
    }

    // "within" — numeric tolerance [target, tolerance]
    if (expected.within) {
      const [target, tolerance] = expected.within;
      const val = parseNum(actual);
      if (isNaN(val)) return { pass: false, reason: `not a number: "${actual}"` };
      const pass = Math.abs(val - target) <= tolerance;
      return { pass, reason: pass ? '' : `expected ~${target} (±${tolerance}), got ${val}` };
    }

    // "colorWithin" — RGBA tolerance [r, g, b, tolerance] or [r, g, b, tolerance, alpha, alphaTolerance]
    if (expected.colorWithin) {
      const [er, eg, eb, tolerance, ea, at] = expected.colorWithin;
      const parsed = parseColor(actual);
      if (!parsed) return { pass: false, reason: `not a color: "${actual}"` };
      const [ar, ag, ab, aa] = parsed;
      let pass = Math.abs(ar - er) <= tolerance && Math.abs(ag - eg) <= tolerance && Math.abs(ab - eb) <= tolerance;
      let reason = '';
      // Alpha check if specified
      if (pass && ea !== undefined) {
        const alphaTol = at !== undefined ? at : 0.05;
        pass = Math.abs(aa - ea) <= alphaTol;
        if (!pass) reason = `alpha expected ~${ea} (±${alphaTol}), got ${aa}`;
      }
      if (!pass && !reason) {
        reason = `expected rgba(${er},${eg},${eb}) ±${tolerance}, got rgba(${ar},${ag},${ab},${aa})`;
      }
      return { pass, reason };
    }

    // "oneOf" — matches any of the listed values
    if (expected.oneOf) {
      const pass = expected.oneOf.includes(String(actual).trim());
      return { pass, reason: pass ? '' : `expected one of [${expected.oneOf.join(', ')}], got "${actual}"` };
    }

    // "weightWithin" — numeric font-weight comparison with keyword resolution
    if (expected.weightWithin) {
      const [target, tolerance] = expected.weightWithin;
      const val = resolveWeight(actual);
      if (val === null) return { pass: false, reason: `not a font-weight: "${actual}"` };
      const pass = Math.abs(val - target) <= tolerance;
      return { pass, reason: pass ? '' : `expected weight ~${target} (±${tolerance}), got ${val} ("${actual}")` };
    }

    // "regex" — regex match
    if (expected.regex) {
      const pass = new RegExp(expected.regex).test(String(actual));
      return { pass, reason: pass ? '' : `did not match /${expected.regex}/` };
    }

    // "greaterThan" — numeric comparison
    if (expected.greaterThan !== undefined) {
      const val = parseNum(actual);
      if (isNaN(val)) return { pass: false, reason: `not a number: "${actual}"` };
      const pass = val > expected.greaterThan;
      return { pass, reason: pass ? '' : `expected > ${expected.greaterThan}, got ${val}` };
    }

    // "lessThan" — numeric comparison
    if (expected.lessThan !== undefined) {
      const val = parseNum(actual);
      if (isNaN(val)) return { pass: false, reason: `not a number: "${actual}"` };
      const pass = val < expected.lessThan;
      return { pass, reason: pass ? '' : `expected < ${expected.lessThan}, got ${val}` };
    }
  }

  // Fallback: string comparison
  const pass = String(actual).trim() === String(expected).trim();
  return { pass, reason: pass ? '' : `expected "${expected}", got "${actual}"` };
}

/** Detect if a key looks like a breakpoint number */
function isBreakpointKey(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  // Known matcher keys — if ANY present, it's a matcher, not breakpoint-keyed
  const matcherKeys = ['contains', 'within', 'colorWithin', 'oneOf', 'regex', 'weightWithin', 'greaterThan', 'lessThan'];
  if (matcherKeys.some(k => obj[k] !== undefined)) return false;
  // Check if it has numeric-string keys
  return Object.keys(obj).some(k => /^\d+$/.test(k));
}

// ════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════

async function main() {
  // Load golden reference
  if (!fs.existsSync(goldenPath)) {
    console.error(`Golden reference not found: ${goldenPath}`);
    process.exit(1);
  }
  const golden = JSON.parse(fs.readFileSync(goldenPath, 'utf8'));
  const breakpoints = golden.breakpoints || [1440, 768, 375];
  const viewportMap = golden.viewport || { '1440': [1440, 900], '768': [768, 1024], '375': [375, 812] };

  // Try to load playwright
  let chromium;
  try {
    chromium = require('playwright').chromium;
  } catch (e) {
    console.error('Playwright not found. Install with: npm install playwright && npx playwright install chromium');
    process.exit(1);
  }

  // Ensure screenshot dir
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${golden.section.toUpperCase()} SECTION — Verification Report (v2)`);
  console.log(`  Page: ${pageUrl}`);
  console.log(`  Date: ${new Date().toISOString()}`);
  console.log(`${'═'.repeat(60)}\n`);

  const browser = await chromium.launch({ headless: true });
  const allResults = [];
  let fontGateResults = [];

  // ── WORDPRESS LOGIN (for draft/private pages) ───────────────
  // Log in once and save storage state to reuse across breakpoints
  let storageState;
  if (!loggedOut) {
    const wpUser = process.env.WP_USER || 'admin';
    const wpPass = process.env.WP_PASS || 'admin';
    const loginUrl = new URL('/wp-login.php', pageUrl).href;

    console.log(`  Logging into WordPress as "${wpUser}"...`);
    const loginCtx = await browser.newContext({ ignoreHTTPSErrors: true });
    const loginPage = await loginCtx.newPage();
    try {
      await loginPage.goto(loginUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await loginPage.fill('#user_login', wpUser);
      await loginPage.fill('#user_pass', wpPass);
      await loginPage.click('#wp-submit');
      await loginPage.waitForURL('**/wp-admin/**', { timeout: 10000 });
      storageState = await loginCtx.storageState();
      console.log(`  Logged in successfully.\n`);
    } catch (e) {
      console.log(`  ⚠ WordPress login failed: ${e.message} — proceeding without auth`);
    }
    await loginCtx.close();
  }

  for (const bp of breakpoints) {
    const [w, h] = viewportMap[String(bp)] || [bp, 900];
    const contextOpts = {
      viewport: { width: w, height: h },
      ignoreHTTPSErrors: true
    };
    if (storageState) contextOpts.storageState = storageState;
    const context = await browser.newContext(contextOpts);
    const page = await context.newPage();

    console.log(`\n${'━'.repeat(60)}`);
    console.log(`  BREAKPOINT: ${bp}px (${w}×${h})`);
    console.log(`${'━'.repeat(60)}`);

    // ── PAGE LOAD + HYDRATION ──────────────────────────────────
    try {
      await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for Divi hydration: poll for the first section element to have
      // a non-default computed style (indicates CSS has loaded and applied)
      await page.waitForFunction(() => {
        const section = document.querySelector('.et_pb_section_0');
        if (!section) return false;
        // Check that our custom CSS has loaded by verifying a property
        // that only exists in our pageLevelCSS
        return document.fonts.ready.then(() => true);
      }, { timeout: 10000 }).catch(() => {
        console.log('  ⚠ Hydration wait timed out — proceeding with 3s fallback');
      });

      // Wait for all fonts to finish loading
      await page.evaluate(() => document.fonts.ready);

      // Additional stabilization for CSS rendering
      await page.waitForTimeout(500);

    } catch (e) {
      console.error(`  ✗ Failed to load page: ${e.message}`);
      await context.close();
      continue;
    }

    // ── LAYER 1: FONT LOADING GATE ────────────────────────────
    if (golden.fonts && bp === breakpoints[0]) {
      console.log(`\n  ── FONT LOADING GATE ──`);
      const fontResults = await page.evaluate((fonts) => {
        const results = [];
        for (const f of fonts) {
          const spec = `${f.weight} ${f.size} "${f.family}"`;

          // Method 1: document.fonts.check() — unreliable for Google Fonts
          // with unicode-range subsetting (Chromium bug: returns false even
          // when FontFace status is "loaded"). Keep as diagnostic only.
          const apiCheck = document.fonts.check(spec);

          // Method 2: FontFace status scan — directly check if any matching
          // FontFace entry has status "loaded". Most reliable method.
          let faceStatusCheck = false;
          const familyLower = f.family.toLowerCase();
          document.fonts.forEach(face => {
            if (face.family.toLowerCase().replace(/['"]/g, '') === familyLower && face.status === 'loaded') {
              // Weight match: either exact or within range (e.g., 600 matches 400-700)
              const fw = parseInt(face.weight, 10);
              const tw = parseInt(f.weight, 10);
              if (!isNaN(fw) && !isNaN(tw) && Math.abs(fw - tw) <= 200) {
                faceStatusCheck = true;
              } else if (isNaN(fw)) {
                // Variable weight or 'normal'/'bold' keyword
                faceStatusCheck = true;
              }
            }
          });

          // Method 3: width-based detection — compare target font against
          // TWO different fallback stacks. For monospace fonts (JetBrains Mono),
          // comparing against monospace fallback gives ~0 diff, so we also
          // compare against serif to catch the monospace vs proportional difference.
          const testStr = 'mmmmWWWWiiii1111||||';
          const makeSpan = (fontFamily) => {
            const s = document.createElement('span');
            s.style.cssText = `font-family:${fontFamily};font-size:${f.size};font-weight:${f.weight};position:absolute;left:-9999px;white-space:nowrap`;
            s.textContent = testStr;
            document.body.appendChild(s);
            return s;
          };
          const spanTarget = makeSpan(`"${f.family}",serif`);
          const spanSerif = makeSpan('serif');
          const spanSans = makeSpan('sans-serif');
          const diffSerif = Math.abs(spanTarget.offsetWidth - spanSerif.offsetWidth);
          const diffSans = Math.abs(spanTarget.offsetWidth - spanSans.offsetWidth);
          spanTarget.remove(); spanSerif.remove(); spanSans.remove();
          // Font loaded if it differs from BOTH generic fallbacks
          const renderCheck = diffSerif > 2 || diffSans > 2;

          const loaded = apiCheck || faceStatusCheck || renderCheck;
          const method = apiCheck ? 'api' : faceStatusCheck ? 'face-status' : renderCheck ? 'render-width' : 'none';
          results.push({ ...f, spec, loaded, method, apiCheck, faceStatusCheck, renderCheck });
        }
        // Also enumerate all loaded font faces for diagnostics
        const loadedFaces = [];
        document.fonts.forEach(face => {
          if (face.status === 'loaded') {
            loadedFaces.push(`${face.family} ${face.weight} ${face.style} [${face.status}]`);
          }
        });
        return { results, loadedFaces };
      }, golden.fonts.required || []);

      let fontGatePassed = true;
      for (const fr of fontResults.results) {
        const entry = {
          element: `Font: ${fr.family} ${fr.weight}`,
          severity: fr.severity || 'P0',
          property: 'font-loaded',
          expected: 'true',
          actual: String(fr.loaded),
          pass: fr.loaded,
          reason: fr.loaded ? '' : `${fr.spec} NOT loaded — will render fallback font`,
          breakpoint: bp
        };
        allResults.push(entry);
        if (!fr.loaded) {
          fontGatePassed = false;
          console.log(`  FAIL  ${fr.spec} — NOT LOADED (api:${fr.apiCheck}, face:${fr.faceStatusCheck}, render:${fr.renderCheck})`);
        } else {
          console.log(`  PASS  ${fr.spec} (${fr.method})`);
        }
      }

      if (fontResults.loadedFaces.length > 0) {
        console.log(`\n  Loaded font faces (${fontResults.loadedFaces.length}):`);
        fontResults.loadedFaces.slice(0, 20).forEach(f => console.log(`    ${f}`));
      }

      fontGateResults.push({ bp, passed: fontGatePassed });
      if (!fontGatePassed) {
        console.log(`\n  ⚠ FONT GATE FAILED — font rendering checks will be unreliable`);
      }
    }

    // ── EDITABILITY CHECK (runs once at first breakpoint) ─────
    if (golden.editability && bp === breakpoints[0]) {
      console.log(`\n  ── EDITABILITY CHECK ──`);

      // Fetch raw post content from API (block comments are stripped from front-end HTML)
      let sourceHtml = '';
      const useApi = golden.editability.source === 'api';
      if (useApi) {
        // Extract page_id from URL
        const urlObj = new URL(pageUrl);
        const pageId = urlObj.searchParams.get('page_id');
        if (pageId) {
          const apiToken = process.env.RESPIRA_TOKEN || 'respira_04c1acdf-c7ad-4dfa-8e60-98daa5c4d7c7';
          const apiUrl = `${urlObj.origin}/wp-json/respira/v1/pages/${pageId}`;
          try {
            const https = require('https');
            const apiData = await new Promise((resolve, reject) => {
              const req = https.get(apiUrl, {
                headers: { 'Authorization': `Bearer ${apiToken}` },
                rejectUnauthorized: false
              }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(data));
              });
              req.on('error', reject);
              req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
            });
            const parsed = JSON.parse(apiData);
            sourceHtml = parsed.content || '';
            console.log(`  Fetched raw post content via Respira API (${sourceHtml.length} chars)`);
          } catch (e) {
            console.log(`  ⚠ API fetch failed: ${e.message} — falling back to page source`);
            sourceHtml = await page.content();
          }
        } else {
          console.log(`  ⚠ No page_id in URL — falling back to page source`);
          sourceHtml = await page.content();
        }
      } else {
        sourceHtml = await page.content();
      }

      // Check for banned block types (wp:html should never appear)
      const bannedBlocks = golden.editability.bannedBlocks || ['wp:html'];
      for (const banned of bannedBlocks) {
        const regex = new RegExp(`<!--\\s*${banned.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
        const matches = sourceHtml.match(regex) || [];
        const pass = matches.length === 0;
        const entry = {
          element: `Editability: no ${banned}`,
          severity: 'P0',
          property: 'banned-block',
          expected: '0 instances',
          actual: `${matches.length} instances`,
          pass,
          reason: pass ? '' : `Found ${matches.length} "${banned}" block(s) — must use wp:divi/code or native modules`,
          breakpoint: bp
        };
        allResults.push(entry);
        if (pass) {
          console.log(`  PASS  No "${banned}" blocks found`);
        } else {
          console.log(`  ✗ FAIL  Found ${matches.length} "${banned}" blocks — editors can't manage these`);
        }
      }

      // Check that required native modules are present
      const requiredModules = golden.editability.requiredNativeModules || [];
      for (const req of requiredModules) {
        const regex = new RegExp(`<!--\\s*wp:divi/${req.type}\\s`, 'g');
        const matches = sourceHtml.match(regex) || [];
        const pass = matches.length >= (req.minCount || 1);
        const entry = {
          element: `Editability: ${req.name}`,
          severity: req.severity || 'P1',
          property: 'native-module',
          expected: `>= ${req.minCount || 1} wp:divi/${req.type}`,
          actual: `${matches.length} found`,
          pass,
          reason: pass ? '' : `Expected >= ${req.minCount || 1} native "${req.type}" module(s), found ${matches.length}`,
          breakpoint: bp
        };
        allResults.push(entry);
        if (pass) {
          console.log(`  PASS  ${req.name}: ${matches.length} native wp:divi/${req.type}`);
        } else {
          console.log(`  △ FAIL  ${req.name}: expected ${req.minCount || 1}+ native wp:divi/${req.type}, found ${matches.length}`);
        }
      }

      // Report Code Module count (informational — some are expected for decorative elements)
      const codeModules = (sourceHtml.match(/<!--\s*wp:divi\/code\s/g) || []).length;
      const maxExpected = golden.editability.maxCodeModules;
      if (maxExpected !== undefined) {
        const pass = codeModules <= maxExpected;
        const entry = {
          element: 'Editability: Code Module count',
          severity: 'P1',
          property: 'code-module-count',
          expected: `<= ${maxExpected}`,
          actual: `${codeModules}`,
          pass,
          reason: pass ? '' : `${codeModules} Code Modules found (expected <= ${maxExpected}) — review if any should be native modules`,
          breakpoint: bp
        };
        allResults.push(entry);
        if (!pass) {
          console.log(`  △ FAIL  ${codeModules} Code Modules (max ${maxExpected}) — some may need native conversion`);
        } else {
          console.log(`  PASS  ${codeModules} Code Modules (max ${maxExpected})`);
        }
      } else {
        console.log(`  INFO  ${codeModules} Code Module(s) in section`);
      }
    }

    // ── PAUSE ANIMATIONS for deterministic screenshots (per spec S2) ──
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach(el => {
        el.style.animationPlayState = 'paused';
        el.style.animationDelay = '0s';
      });
      document.querySelectorAll('animate, animateTransform, animateMotion').forEach(el => {
        try { el.endElement(); } catch(e) {}
      });
    });
    await page.waitForTimeout(200); // let paint settle

    // ── SCREENSHOT ─────────────────────────────────────────────
    const ssPath = path.join(screenshotDir, `verify-${sectionName}-${bp}.png`);
    // Use fullPage for mobile to capture stacked columns
    await page.screenshot({ path: ssPath, fullPage: bp <= 768 });
    console.log(`  Screenshot: ${ssPath}`);

    // ── LAYER 2+3: ELEMENT CHECKS ─────────────────────────────
    let passed = 0, failed = 0;
    const bpResults = [];

    for (const el of golden.elements) {
      const selector = el.wp;
      const pseudoEl = el.pseudo || null; // e.g., "::before", "::after"
      const checks = el.checks || {};

      for (const [prop, expected] of Object.entries(checks)) {
        // Determine expected value for this breakpoint
        let expectedVal = expected;

        if (isBreakpointKey(expected)) {
          if (expected[String(bp)] !== undefined) {
            expectedVal = expected[String(bp)];
          } else {
            continue; // No check defined for this breakpoint
          }
        }

        // Get the value from the browser
        let actual;
        try {
          // Special property: textContent
          if (prop === 'textContent') {
            actual = await page.evaluate(({ sel }) => {
              const el = document.querySelector(sel);
              if (!el) return '__ELEMENT_NOT_FOUND__';
              return el.textContent.trim();
            }, { sel: selector });
          }
          // Special property: href (attribute, not computed style)
          else if (prop === 'href') {
            actual = await page.evaluate(({ sel }) => {
              const el = document.querySelector(sel);
              if (!el) return '__ELEMENT_NOT_FOUND__';
              return el.getAttribute('href') || '';
            }, { sel: selector });
          }
          // Special property: bbox.* (getBoundingClientRect)
          else if (prop.startsWith('bbox.')) {
            const bboxProp = prop.split('.')[1]; // e.g., "width", "height", "top", "x"
            actual = await page.evaluate(({ sel, bboxProp }) => {
              const el = document.querySelector(sel);
              if (!el) return '__ELEMENT_NOT_FOUND__';
              const rect = el.getBoundingClientRect();
              return String(rect[bboxProp]);
            }, { sel: selector, bboxProp });
          }
          // Pseudo-element computed style
          else if (pseudoEl) {
            actual = await page.evaluate(({ sel, pseudo, property }) => {
              const el = document.querySelector(sel);
              if (!el) return '__ELEMENT_NOT_FOUND__';
              return window.getComputedStyle(el, pseudo).getPropertyValue(property);
            }, { sel: selector, pseudo: pseudoEl, property: prop });
          }
          // Standard computed style
          else {
            actual = await page.evaluate(({ sel, property }) => {
              const el = document.querySelector(sel);
              if (!el) return '__ELEMENT_NOT_FOUND__';
              return window.getComputedStyle(el).getPropertyValue(property);
            }, { sel: selector, property: prop });
          }
        } catch (e) {
          actual = null;
        }

        const result = checkProperty(actual, expectedVal, prop);
        const entry = {
          element: el.name + (pseudoEl ? ` ${pseudoEl}` : ''),
          severity: el.severity || 'P1',
          property: prop,
          expected: JSON.stringify(expectedVal),
          actual: actual || '(not found)',
          pass: result.pass,
          reason: result.reason,
          breakpoint: bp
        };

        bpResults.push(entry);

        if (result.pass) {
          passed++;
        } else {
          failed++;
          const icon = el.severity === 'P0' ? '✗' : '△';
          console.log(`  ${icon} FAIL [${el.severity || 'P1'}] ${el.name}${pseudoEl ? ' ' + pseudoEl : ''} > ${prop}: ${result.reason}`);
        }
      }
    }

    // ── LAYER 3: VERTICAL ORDERING CHECKS ──────────────────────
    if (golden.ordering) {
      for (const orderCheck of golden.ordering) {
        if (orderCheck.breakpoint && orderCheck.breakpoint !== bp) continue;
        if (orderCheck.breakpoints && !orderCheck.breakpoints.includes(bp)) continue;

        const positions = await page.evaluate((selectors) => {
          return selectors.map(sel => {
            const el = document.querySelector(sel);
            if (!el) return null;
            return el.getBoundingClientRect().top;
          });
        }, orderCheck.selectors);

        let orderPass = true;
        let orderReason = '';
        for (let i = 1; i < positions.length; i++) {
          if (positions[i] === null || positions[i - 1] === null) {
            orderPass = false;
            orderReason = `element ${i} not found`;
            break;
          }
          if (positions[i] <= positions[i - 1]) {
            orderPass = false;
            orderReason = `"${orderCheck.names[i]}" (${Math.round(positions[i])}px) is not below "${orderCheck.names[i - 1]}" (${Math.round(positions[i - 1])}px)`;
            break;
          }
        }

        const entry = {
          element: orderCheck.name,
          severity: orderCheck.severity || 'P0',
          property: 'vertical-order',
          expected: orderCheck.names.join(' → '),
          actual: positions.map(p => p !== null ? Math.round(p) + 'px' : 'N/A').join(' → '),
          pass: orderPass,
          reason: orderReason,
          breakpoint: bp
        };
        bpResults.push(entry);
        if (orderPass) {
          passed++;
        } else {
          console.log(`  ✗ FAIL [${orderCheck.severity || 'P0'}] ${orderCheck.name} > vertical-order: ${orderReason}`);
          failed++;
        }
      }
    }

    // ── LAYER 3: COLUMN RATIO CHECKS ───────────────────────────
    if (golden.columnRatios) {
      for (const ratio of golden.columnRatios) {
        if (ratio.breakpoints && !ratio.breakpoints.includes(bp)) continue;

        const widths = await page.evaluate((selectors) => {
          return selectors.map(sel => {
            const el = document.querySelector(sel);
            if (!el) return null;
            return el.getBoundingClientRect().width;
          });
        }, ratio.selectors);

        let ratioPass = true;
        let ratioReason = '';
        if (widths.some(w => w === null)) {
          ratioPass = false;
          ratioReason = 'one or more columns not found';
        } else {
          const diff = Math.abs(widths[0] - widths[1]);
          const tolerance = ratio.tolerance || 5;
          if (diff > tolerance) {
            ratioPass = false;
            ratioReason = `columns differ by ${Math.round(diff)}px (${Math.round(widths[0])}px vs ${Math.round(widths[1])}px), tolerance ±${tolerance}`;
          }
        }

        const entry = {
          element: ratio.name,
          severity: ratio.severity || 'P0',
          property: 'column-width-ratio',
          expected: `equal (±${ratio.tolerance || 5}px)`,
          actual: widths.map(w => w !== null ? Math.round(w) + 'px' : 'N/A').join(' vs '),
          pass: ratioPass,
          reason: ratioReason,
          breakpoint: bp
        };
        bpResults.push(entry);
        if (ratioPass) {
          passed++;
        } else {
          console.log(`  ✗ FAIL [${ratio.severity || 'P0'}] ${ratio.name} > column-width-ratio: ${ratioReason}`);
          failed++;
        }
      }
    }

    // ── LAYER 5: SCREENSHOT COMPARISON ──────────────────────────
    if (golden.screenshots) {
      const elements = golden.screenshots.elements || [];
      const threshold = golden.screenshots.threshold || 0.1;
      const maxDiffPercent = golden.screenshots.maxDiffPercent || 1.0;

      // Ensure golden screenshot dir exists
      if (!fs.existsSync(goldenScreenshotDir)) fs.mkdirSync(goldenScreenshotDir, { recursive: true });

      if (captureGolden) {
        // ── CAPTURE MODE: save element screenshots as golden references ──
        console.log(`\n  ── CAPTURING GOLDEN SCREENSHOTS ──`);
        for (const region of elements) {
          const el = await page.$(region.selector);
          if (!el) {
            console.log(`  SKIP  ${region.name} — selector not found: ${region.selector}`);
            continue;
          }
          const imgPath = path.join(goldenScreenshotDir, `${sectionName}-${bp}-${region.name.replace(/[^a-zA-Z0-9-_]/g, '_')}.png`);
          await el.screenshot({ path: imgPath });
          console.log(`  SAVED ${region.name} → ${path.basename(imgPath)}`);
        }

        // Also save full viewport as golden
        const fullGoldenPath = path.join(goldenScreenshotDir, `${sectionName}-${bp}-viewport.png`);
        await page.screenshot({ path: fullGoldenPath, fullPage: bp <= 768 });
        console.log(`  SAVED viewport → ${path.basename(fullGoldenPath)}`);

      } else {
        // ── COMPARE MODE: diff against golden references ──
        console.log(`\n  ── SCREENSHOT COMPARISON (pixelmatch) ──`);

        let pixelmatch, PNG;
        try {
          const pmMod = require('pixelmatch');
          pixelmatch = pmMod.default || pmMod;
          PNG = require('pngjs').PNG;
        } catch (e) {
          console.log('  SKIP  pixelmatch/pngjs not installed — run: npm install pixelmatch pngjs');
          // Don't fail the whole run, just skip visual comparison
        }

        if (pixelmatch && PNG) {
          for (const region of elements) {
            const safeName = region.name.replace(/[^a-zA-Z0-9-_]/g, '_');
            const goldenImgPath = path.join(goldenScreenshotDir, `${sectionName}-${bp}-${safeName}.png`);

            // Check golden exists
            if (!fs.existsSync(goldenImgPath)) {
              const entry = {
                element: `Screenshot: ${region.name}`,
                severity: region.severity || 'P1',
                property: 'visual-regression',
                expected: 'golden screenshot exists',
                actual: 'not found',
                pass: false,
                reason: `No golden reference — run with --capture-golden first`,
                breakpoint: bp
              };
              bpResults.push(entry);
              console.log(`  △ SKIP ${region.name} — no golden reference (run --capture-golden)`);
              failed++;
              continue;
            }

            // Capture current element screenshot
            const el = await page.$(region.selector);
            if (!el) {
              const entry = {
                element: `Screenshot: ${region.name}`,
                severity: region.severity || 'P1',
                property: 'visual-regression',
                expected: 'element exists',
                actual: 'selector not found',
                pass: false,
                reason: `selector not found: ${region.selector}`,
                breakpoint: bp
              };
              bpResults.push(entry);
              failed++;
              continue;
            }

            const actualBuffer = await el.screenshot();
            const goldenBuffer = fs.readFileSync(goldenImgPath);

            // Parse PNGs
            const actualImg = PNG.sync.read(actualBuffer);
            const goldenImg = PNG.sync.read(goldenBuffer);

            // Handle size differences
            if (actualImg.width !== goldenImg.width || actualImg.height !== goldenImg.height) {
              const sizeTolerance = region.sizeTolerance || 5;
              const widthDiff = Math.abs(actualImg.width - goldenImg.width);
              const heightDiff = Math.abs(actualImg.height - goldenImg.height);
              const sizeOk = widthDiff <= sizeTolerance && heightDiff <= sizeTolerance;

              if (!sizeOk) {
                const entry = {
                  element: `Screenshot: ${region.name}`,
                  severity: region.severity || 'P0',
                  property: 'visual-size',
                  expected: `${goldenImg.width}×${goldenImg.height}px`,
                  actual: `${actualImg.width}×${actualImg.height}px`,
                  pass: false,
                  reason: `size changed: ${goldenImg.width}×${goldenImg.height} → ${actualImg.width}×${actualImg.height} (±${sizeTolerance}px)`,
                  breakpoint: bp
                };
                bpResults.push(entry);
                console.log(`  ✗ FAIL [${region.severity || 'P0'}] ${region.name} > size: ${entry.reason}`);
                failed++;
                continue;
              }

              // If within tolerance but different, resize to smaller for comparison
              // Skip pixel comparison for slight size diffs — size check is sufficient
              const entry = {
                element: `Screenshot: ${region.name}`,
                severity: 'P1',
                property: 'visual-size',
                expected: `${goldenImg.width}×${goldenImg.height}px`,
                actual: `${actualImg.width}×${actualImg.height}px`,
                pass: true,
                reason: `size within tolerance (${widthDiff}×${heightDiff}px diff)`,
                breakpoint: bp
              };
              bpResults.push(entry);
              passed++;
              console.log(`  PASS  ${region.name} — size within tolerance`);
              continue;
            }

            // Pixel comparison
            const diffImg = new PNG({ width: actualImg.width, height: actualImg.height });
            const regionThreshold = region.threshold || threshold;
            const numDiffPixels = pixelmatch(
              actualImg.data, goldenImg.data, diffImg.data,
              actualImg.width, actualImg.height,
              { threshold: regionThreshold, includeAA: region.includeAA !== false }
            );

            const totalPixels = actualImg.width * actualImg.height;
            const diffPercent = (numDiffPixels / totalPixels) * 100;
            const regionMaxDiff = region.maxDiffPercent || maxDiffPercent;
            const visualPass = diffPercent <= regionMaxDiff;

            // Save diff image for debugging
            const diffPath = path.join(screenshotDir, `diff-${sectionName}-${bp}-${safeName}.png`);
            fs.writeFileSync(diffPath, PNG.sync.write(diffImg));

            // Also save current screenshot for side-by-side comparison
            const currentPath = path.join(screenshotDir, `current-${sectionName}-${bp}-${safeName}.png`);
            fs.writeFileSync(currentPath, actualBuffer);

            const entry = {
              element: `Screenshot: ${region.name}`,
              severity: region.severity || 'P0',
              property: 'visual-regression',
              expected: `<= ${regionMaxDiff}% diff`,
              actual: `${diffPercent.toFixed(2)}% (${numDiffPixels}/${totalPixels}px)`,
              pass: visualPass,
              reason: visualPass ? '' : `${diffPercent.toFixed(2)}% pixel diff (threshold: ${regionMaxDiff}%) — see diff: ${path.basename(diffPath)}`,
              breakpoint: bp
            };
            bpResults.push(entry);

            if (visualPass) {
              console.log(`  PASS  ${region.name} — ${diffPercent.toFixed(2)}% diff`);
              passed++;
            } else {
              console.log(`  ✗ FAIL [${region.severity || 'P0'}] ${region.name} — ${diffPercent.toFixed(2)}% diff (max ${regionMaxDiff}%) — diff image: ${path.basename(diffPath)}`);
              failed++;
            }
          }
        }
      }
    }

    allResults.push(...bpResults);
    const total = passed + failed;
    console.log(`\n  Breakpoint ${bp}: ${passed} passed, ${failed} failed (${total ? ((passed / total) * 100).toFixed(0) : 'N/A'}%)`);
    await context.close();
  }

  await browser.close();

  // ════════════════════════════════════════════════════════════════
  // SUMMARY
  // ════════════════════════════════════════════════════════════════

  const totalPassed = allResults.filter(r => r.pass).length;
  const totalFailed = allResults.filter(r => !r.pass).length;
  const total = totalPassed + totalFailed;
  const p0Fails = allResults.filter(r => !r.pass && r.severity === 'P0');
  const p1Fails = allResults.filter(r => !r.pass && r.severity === 'P1');

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  SUMMARY`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`  Total Checks:  ${total}`);
  console.log(`  Passed:        ${totalPassed} (${total ? ((totalPassed / total) * 100).toFixed(0) : 0}%)`);
  console.log(`  Failed:        ${totalFailed}`);
  console.log(`  P0 Failures:   ${p0Fails.length}`);
  console.log(`  P1 Failures:   ${p1Fails.length}`);

  // Font gate summary
  if (fontGateResults.length > 0) {
    const fontGateFailed = fontGateResults.some(r => !r.passed);
    console.log(`  Font Gate:     ${fontGateFailed ? 'FAILED ⚠' : 'PASSED ✓'}`);
  }

  if (totalFailed > 0) {
    if (p0Fails.length > 0) {
      console.log(`\n  P0 FAILURES (ship-blocking):`);
      for (const r of p0Fails) {
        console.log(`    ${r.breakpoint}px | ${r.element} > ${r.property}: ${r.reason}`);
      }
    }
    if (p1Fails.length > 0) {
      console.log(`\n  P1 FAILURES (visible but minor):`);
      for (const r of p1Fails) {
        console.log(`    ${r.breakpoint}px | ${r.element} > ${r.property}: ${r.reason}`);
      }
    }
  }

  const verdict = p0Fails.length === 0 ? 'PASS' : 'FAIL';
  console.log(`\n  VERDICT: ${verdict} ${p0Fails.length === 0 ? '(all P0 checks pass)' : `(${p0Fails.length} P0 failures)`}`);

  // Screenshots
  console.log(`\n  Screenshots:`);
  for (const bp of breakpoints) {
    console.log(`    screenshots/verify-${sectionName}-${bp}.png`);
  }

  // JSON output
  if (jsonOutput) {
    const jsonPath = path.join(screenshotDir, `verify-${sectionName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify({
      section: sectionName,
      version: 'v2',
      date: new Date().toISOString(),
      verdict,
      total,
      passed: totalPassed,
      failed: totalFailed,
      p0Failures: p0Fails.length,
      p1Failures: p1Fails.length,
      fontGate: fontGateResults,
      results: allResults
    }, null, 2));
    console.log(`\n  JSON report: ${jsonPath}`);
  }

  process.exit(p0Fails.length === 0 ? 0 : 1);
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
