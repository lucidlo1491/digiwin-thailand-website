/**
 * fidelity-check.js — Automated Divi ↔ HTML Fidelity Comparison
 *
 * Four-phase check:
 *   Phase 1 (Manual): F1-F8 findings from hero debugging session
 *     F1: Font-smoothing (Divi antialiased vs HTML auto)
 *     F2: <p> padding injection (Divi adds padding-bottom: 1em)
 *     F3: Font-weight availability (HTML vs WP load different weights)
 *     F4: Line-height inheritance (must be explicit on every text element)
 *     F5: Unicode character mismatches (curly vs straight quotes/apostrophes)
 *     F6: Container display model (block vs flex)
 *     F7: Parent font-size for inline whitespace width
 *     F8: Transition timing mismatch
 *
 *   Phase 2 (Auto-Discovery): Finds ALL visible text-bearing elements in each
 *     section, matches them between HTML and WP, and compares 40+ CSS properties.
 *     Catches issues like max-width, text-align, letter-spacing that manual
 *     styleMap entries might miss.
 *
 *   Phase 3 (Decorative): Checks Super D, grain, wave, particle presence.
 *
 *   Phase 4 (Visual Elements): Discovers non-text elements with visual presence
 *     (gradients, backgrounds, shadows, borders, pseudo-elements). Matches by
 *     class name overlap. Enhanced gradient/shadow comparison with parsed values.
 *     Catches ~80% of issues that Phase 2 misses (cards, icons, sections).
 *
 *   Phase 5 (Sibling Consistency): Finds groups of sibling elements sharing the
 *     same class, compares their dimensions. Catches "4 cards, 1 is bigger" issues
 *     that per-element checks miss. Compares WP siblings against HTML reference —
 *     only flags when HTML siblings ARE consistent but WP siblings differ.
 *
 * Opens HTML (temp server) + WP (live) in Puppeteer, runs getComputedStyle()
 * on matched element pairs from the page config's verify.sections[].styleMap,
 * plus section-level wrapper checks, plus auto-discovered elements.
 *
 * Usage:
 *   node complete_website/divi5/lib/fidelity-check.js --page home [--section hero] [--verbose]
 *     [--no-autodiscover]     # manual checks only (backwards compatible)
 *     [--autodiscover-only]   # skip manual, fast diagnostic sweep
 *
 * Output: Per-section report with PASS/FAIL per finding + auto-discovery results.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const { startServer } = require('./http-server');
const { waitForDiviReady } = require('./wait-for-divi');
const config = require('./screenshot-config');
const csd = require('./computed-style-diff');

// ═══════════════════════════════════════════════════════════
// FIDELITY PROPERTIES — comprehensive list from CSD + additions
// ═══════════════════════════════════════════════════════════

/** Properties checked on EVERY element pair (manual + auto-discovery) */
const ELEMENT_PROPERTIES = [...new Set([
  ...csd.DEFAULT_PROPERTIES,          // 34 props (typography, colors, spacing, borders, layout, flexbox)
  ...csd.LAYOUT_COMPUTED_PROPERTIES,  // max-width, width, min-width, height, etc.
  'font-style', 'text-align',        // P1 additions not in either list
  'transition',                       // was in old list, not in CSD defaults
  '-webkit-font-smoothing',          // keep for F1 check
])];

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

/** Tags to discover in auto-discovery */
const DISCOVER_TAGS = 'h1, h2, h3, h4, h5, h6, p, a, span, div, button, li, blockquote, strong, em, small';

/** Divi noise class patterns to skip */
const DIVI_NOISE_RE = /et_pb_|scene|deco|grain|particle|wave|card-bg|canvas/i;

/** Layout-computed properties excluded from auto-discovery comparison.
 *  width/height are determined by container + content reflow, not authored CSS.
 *  Keep max-width/min-width — those ARE CSS-authored (e.g. subtitle centering bug). */
const LAYOUT_COMPUTED_SKIP = new Set(['width', 'height', 'min-height', 'max-height']);

// ═══════════════════════════════════════════════════════════
// COMPARISON HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Compare two CSS values with fuzzy tolerance.
 * Returns { match: boolean, note: string }
 *
 * This is the LOCAL compare — ±1px dims, ±5 color channels, primary font only.
 * NOT the same as csd.compareValues() which uses ±4px and returns {reason}.
 */
function compareValues(prop, htmlVal, wpVal) {
  if (htmlVal === wpVal) return { match: true };

  // Normalize whitespace
  const h = (htmlVal || '').trim();
  const w = (wpVal || '').trim();
  if (h === w) return { match: true };

  // text-align: left ↔ start are equivalent (browser normalization)
  if (prop === 'text-align') {
    const equiv = { left: 'start', start: 'left', right: 'end', end: 'right' };
    if (equiv[h] === w || equiv[w] === h) return { match: true, note: 'text-align equivalent' };
  }

  // Font-family: compare primary font only
  if (prop === 'font-family') {
    const hPrimary = h.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
    const wPrimary = w.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
    if (hPrimary === wPrimary) return { match: true, note: 'primary font matches' };
    return { match: false, note: `HTML="${hPrimary}" WP="${wPrimary}"` };
  }

  // Font-weight: normalize keywords
  if (prop === 'font-weight') {
    const wMap = { normal: '400', bold: '700', lighter: '300', bolder: '700' };
    const hNorm = wMap[h.toLowerCase()] || h;
    const wNorm = wMap[w.toLowerCase()] || w;
    if (hNorm === wNorm) return { match: true, note: 'weight equivalent' };
  }

  // Transform: normalize identity matrix to 'none'
  if (prop === 'transform') {
    const norm = v => (!v || v === 'none' || /^matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*,\s*0\s*,\s*0\s*\)$/.test(v)) ? 'none' : v;
    if (norm(h) === norm(w)) return { match: true, note: 'transform equivalent' };
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
    const hDur = h.match(/([\d.]+)s/);
    const wDur = w.match(/([\d.]+)s/);
    if (hDur && wDur && hDur[1] !== wDur[1]) {
      return { match: false, note: `duration HTML=${hDur[1]}s WP=${wDur[1]}s` };
    }
    const hBezier = h.match(/cubic-bezier\([^)]+\)/);
    const wBezier = w.match(/cubic-bezier\([^)]+\)/);
    const hEase = hBezier ? hBezier[0] : (h.includes('ease') ? 'ease' : 'linear');
    const wEase = wBezier ? wBezier[0] : (w.includes('ease') ? 'ease' : 'linear');
    if (hEase !== wEase) {
      return { match: false, note: `timing HTML="${hEase}" WP="${wEase}"` };
    }
    return { match: true, note: 'transition equivalent' };
  }

  // Background-image: gradient-aware comparison
  // Parse angle + color stops for gradients; presence-only for data URIs
  if (prop === 'background-image') {
    const hHas = h !== 'none' && h !== '';
    const wHas = w !== 'none' && w !== '';
    if (!hHas && !wHas) return { match: true };
    if (hHas !== wHas) return { match: false, note: hHas ? 'HTML has bg-image, WP missing' : 'WP has bg-image, HTML missing' };
    // In WP context, relative file paths (url('assets/...')) won't resolve
    if (wHas && /url\(["'](?!data:|https?:)/.test(w)) {
      return { match: false, note: 'WP has relative file path in background-image (won\'t resolve). Convert to Base64 via super-d.js' };
    }
    // Gradient comparison: parse angle + color stops
    const hGrad = parseGradient(h);
    const wGrad = parseGradient(w);
    if (hGrad && wGrad) {
      // Compare angle (±5deg)
      if (Math.abs(hGrad.angle - wGrad.angle) > 5) {
        return { match: false, note: `Gradient angle: HTML=${hGrad.angle}deg WP=${wGrad.angle}deg` };
      }
      // Compare color stops
      const maxStops = Math.max(hGrad.stops.length, wGrad.stops.length);
      for (let i = 0; i < maxStops; i++) {
        const hs = hGrad.stops[i];
        const ws = wGrad.stops[i];
        if (!hs || !ws) return { match: false, note: `Gradient stop count differs: HTML=${hGrad.stops.length} WP=${wGrad.stops.length}` };
        const dc = colorDistance(hs.color, ws.color);
        if (dc > 5) return { match: false, note: `Gradient stop ${i}: color diff=${dc} (HTML=${hs.raw} WP=${ws.raw})` };
      }
      return { match: true, note: 'gradient match (parsed)' };
    }
    // One is gradient, other is flat color — FIXABLE
    if (hGrad && !wGrad) return { match: false, note: 'HTML has gradient, WP has flat color or different bg-image' };
    if (!hGrad && wGrad) return { match: false, note: 'WP has gradient, HTML has flat color or different bg-image' };
    return { match: true, note: 'both have background-image' };
  }

  // Opacity: ±0.05 tolerance
  if (prop === 'opacity') {
    if (!isNaN(hNum) && !isNaN(wNum) && Math.abs(hNum - wNum) < 0.05) return { match: true };
  }

  // Box-shadow / text-shadow: parsed comparison (offset ±2px, blur ±2px, color ±5/channel)
  if (prop === 'box-shadow' || prop === 'text-shadow') {
    if (h === 'none' && w === 'none') return { match: true };
    if ((h === 'none' || !h) && (w !== 'none' && w)) return { match: false, note: 'WP has shadow, HTML has none' };
    if ((h !== 'none' && h) && (w === 'none' || !w)) return { match: false, note: 'HTML has shadow, WP has none' };
    const hShadow = parseShadow(h);
    const wShadow = parseShadow(w);
    if (hShadow && wShadow) {
      const dOx = Math.abs(hShadow.ox - wShadow.ox);
      const dOy = Math.abs(hShadow.oy - wShadow.oy);
      const dBlur = Math.abs(hShadow.blur - wShadow.blur);
      const dSpread = Math.abs(hShadow.spread - wShadow.spread);
      const dc = colorDistance(hShadow.color, wShadow.color);
      if (dOx <= 2 && dOy <= 2 && dBlur <= 2 && dSpread <= 2 && dc <= 5) {
        return { match: true, note: 'shadow match (parsed)' };
      }
      return { match: false, note: `Shadow diff: offset ±${Math.max(dOx,dOy)}px blur ±${dBlur}px color-dist=${dc}` };
    }
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

/**
 * Parse a CSS gradient string into angle + color stops.
 * Supports: linear-gradient(135deg, #hex 0%, rgb(...) 50%, ...)
 * @returns {{angle: number, stops: Array<{color: {r,g,b,a}, raw: string, pos: number}>} | null}
 */
function parseGradient(str) {
  if (!str) return null;
  const m = str.match(/linear-gradient\(\s*([\d.]+)deg\s*,\s*(.+)\s*\)/);
  if (!m) return null;
  const angle = parseFloat(m[1]);
  const stopsStr = m[2];
  const stops = [];
  // Split on comma that's not inside parentheses
  const parts = stopsStr.split(/,(?![^(]*\))/);
  for (const part of parts) {
    const trimmed = part.trim();
    const posMatch = trimmed.match(/([\d.]+)%\s*$/);
    const pos = posMatch ? parseFloat(posMatch[1]) : 0;
    const colorStr = posMatch ? trimmed.substring(0, posMatch.index).trim() : trimmed;
    const color = parseColor(colorStr.startsWith('#') ? hexToRgb(colorStr) : colorStr);
    stops.push({ color, raw: colorStr, pos });
  }
  return { angle, stops };
}

/**
 * Convert hex color to rgb() string for parseColor().
 */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Parse a CSS box-shadow string into components.
 * @returns {{ox: number, oy: number, blur: number, spread: number, color: {r,g,b,a}}} | null
 */
function parseShadow(str) {
  if (!str || str === 'none') return null;
  // Extract color first (rgba/rgb at beginning or end)
  const colorMatch = str.match(/rgba?\([^)]+\)/);
  const color = colorMatch ? parseColor(colorMatch[0]) : { r: 0, g: 0, b: 0, a: 1, valid: true };
  // Remove color to isolate numeric parts
  const nums = str.replace(/rgba?\([^)]+\)/, '').trim().split(/\s+/).map(parseFloat).filter(n => !isNaN(n));
  return {
    ox: nums[0] || 0,
    oy: nums[1] || 0,
    blur: nums[2] || 0,
    spread: nums[3] || 0,
    color,
  };
}

/**
 * Compute max channel distance between two parsed colors.
 */
function colorDistance(a, b) {
  if (!a || !a.valid || !b || !b.valid) return 999;
  return Math.max(
    Math.abs(a.r - b.r),
    Math.abs(a.g - b.g),
    Math.abs(a.b - b.b),
  );
}

// ═══════════════════════════════════════════════════════════
// AUTO-DISCOVERY ENGINE
// ═══════════════════════════════════════════════════════════

/**
 * Normalize text for matching: trim, collapse whitespace, normalize quotes.
 */
function normalizeText(str) {
  return (str || '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u2014/g, '--');
}

/**
 * Extract visible text-bearing elements from a section wrapper.
 * Runs inside page.evaluate() — must be self-contained (no closures over Node vars).
 *
 * @param {string} wrapperSelector — CSS selector for the section container
 * @param {string[]} properties — CSS properties to extract
 * @param {string} tagList — comma-separated tag list
 * @param {string} noisePattern — regex source string for Divi noise classes
 * @returns {Array<{tag, ordinal, text, className, selectorPath, styles}>}
 */
const AUTO_DISCOVER_FN = function(wrapperSelector, properties, tagList, noisePattern) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return [];

  const noiseRe = new RegExp(noisePattern, 'i');
  const candidates = wrapper.querySelectorAll(tagList);
  const results = [];
  const tagCounts = {};

  for (const el of candidates) {
    // Skip elements marked as already checked by manual styleMap
    if (el.hasAttribute('data-fidelity-manual')) continue;

    // Filter 1: hidden or zero-size
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none') continue;
    if (el.offsetWidth === 0 && el.offsetHeight === 0) continue;

    // Filter 2: aria-hidden ancestor
    if (el.closest('[aria-hidden="true"]')) continue;

    // Filter 3: inside SVG
    if (el.closest('svg')) continue;

    // Filter 4: Divi noise classes
    if (noiseRe.test(el.className)) continue;

    // Filter 5: span with no class whose text is substring of parent
    const tag = el.tagName.toLowerCase();
    if (tag === 'span' && !el.className) {
      const parentText = el.parentElement ? el.parentElement.textContent.trim() : '';
      const elText = el.textContent.trim();
      if (elText && parentText.includes(elText) && parentText !== elText) continue;
    }

    // Filter 7 (div): require direct text node children
    if (tag === 'div') {
      const hasDirectText = Array.from(el.childNodes).some(
        n => n.nodeType === 3 && n.textContent.trim().length > 0
      );
      if (!hasDirectText) continue;
    }

    // Filter 6: strip animation classes for style extraction
    el.classList.remove('et_animated', 'et_had_animation', 'et_is_animating');

    // Extract direct text content (not aggregated textContent)
    const directText = Array.from(el.childNodes)
      .filter(n => n.nodeType === 3)
      .map(n => n.textContent)
      .join('')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\u201C|\u201D/g, '"')
      .replace(/\u2018|\u2019/g, "'")
      .replace(/\u2014/g, '--')
      .substring(0, 100);

    // For non-div elements, fall back to textContent if no direct text nodes
    const text = (tag !== 'div' && !directText)
      ? el.textContent.trim().replace(/\s+/g, ' ').replace(/\u201C|\u201D/g, '"').replace(/\u2018|\u2019/g, "'").replace(/\u2014/g, '--').substring(0, 100)
      : directText;

    // Skip empty text elements
    if (!text) continue;

    // Track ordinal (nth occurrence of this tag in section)
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    const ordinal = tagCounts[tag];

    // Build scoped selector path
    const className = el.className ? el.className.split(/\s+/).filter(c => c).join('.') : '';
    const selectorPath = className
      ? `${tag}.${className}`
      : `${tag}:nth-of-type(${ordinal})`;

    // Extract computed styles
    const freshCs = window.getComputedStyle(el);
    const styles = {};
    for (const p of properties) {
      styles[p] = freshCs.getPropertyValue(p);
    }

    results.push({ tag, ordinal, text, className: el.className || '', selectorPath, styles });
  }

  return results;
};

// ═══════════════════════════════════════════════════════════
// PHASE 4: VISUAL ELEMENT DISCOVERY
// ═══════════════════════════════════════════════════════════

/**
 * VISUAL_DISCOVER_FN — finds elements with visual presence regardless of text.
 * Discovers: backgrounds, gradients, shadows, borders, pseudo-elements.
 * Runs inside page.evaluate() — must be self-contained.
 *
 * @param {string} wrapperSelector — CSS selector for section
 * @param {string[]} properties — CSS properties to extract
 * @param {string} noisePattern — regex source for Divi noise classes
 * @returns {Array<{tag, className, selectorPath, styles, area, category}>}
 */
const VISUAL_DISCOVER_FN = function(wrapperSelector, properties, noisePattern) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return [];

  const noiseRe = new RegExp(noisePattern, 'i');
  const results = [];
  const MAX_ELEMENTS = 50;

  // Query ALL elements inside the section wrapper
  const allEls = wrapper.querySelectorAll('*');

  for (const el of allEls) {
    // Skip elements already checked by text discovery
    if (el.hasAttribute('data-fidelity-auto')) continue;
    if (el.hasAttribute('data-fidelity-manual')) continue;

    // Skip hidden/zero-size
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none') continue;
    if (el.offsetWidth === 0 && el.offsetHeight === 0) continue;

    // Skip aria-hidden ancestors
    if (el.closest('[aria-hidden="true"]')) continue;

    // Skip inside SVG
    if (el.closest('svg')) continue;

    // Skip Divi structural elements
    if (noiseRe.test(el.className)) continue;

    // Skip elements with opacity:0 (reveal-on-scroll targets)
    if (cs.opacity === '0') continue;

    // Determine visual presence category
    let category = null;

    const bgImage = cs.backgroundImage;
    const bgColor = cs.backgroundColor;
    const boxShadow = cs.boxShadow;
    const borderTopWidth = parseFloat(cs.borderTopWidth) || 0;
    const borderRightWidth = parseFloat(cs.borderRightWidth) || 0;
    const borderBottomWidth = parseFloat(cs.borderBottomWidth) || 0;
    const borderLeftWidth = parseFloat(cs.borderLeftWidth) || 0;
    const hasBorder = (borderTopWidth + borderRightWidth + borderBottomWidth + borderLeftWidth) > 0;

    // Check gradient/image background
    if (bgImage && bgImage !== 'none') {
      category = 'GRADIENT';
    }

    // Check non-transparent, non-white background color
    if (!category && bgColor) {
      const m = bgColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\)/);
      if (m) {
        const r = +m[1], g = +m[2], b = +m[3], a = m[4] !== undefined ? +m[4] : 1;
        // Skip transparent (a=0) and white/near-white (r>250,g>250,b>250)
        if (a > 0.01 && !(r > 250 && g > 250 && b > 250)) {
          category = 'BACKGROUND';
        }
      }
    }

    // Check box-shadow
    if (!category && boxShadow && boxShadow !== 'none') {
      category = 'SHADOW';
    }

    // Check border with non-transparent color
    if (!category && hasBorder) {
      const borderColor = cs.borderTopColor || cs.borderColor;
      if (borderColor) {
        const bm = borderColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\)/);
        if (bm) {
          const ba = bm[4] !== undefined ? +bm[4] : 1;
          if (ba > 0.01) category = 'BORDER';
        }
      }
    }

    // Check ::before and ::after pseudo-elements
    if (!category) {
      for (const pseudo of ['::before', '::after']) {
        const pcs = window.getComputedStyle(el, pseudo);
        const pContent = pcs.content;
        if (pContent && pContent !== 'none' && pContent !== 'normal' && pContent !== '""') {
          const pBg = pcs.backgroundImage;
          const pBgColor = pcs.backgroundColor;
          if ((pBg && pBg !== 'none') || (pBgColor && pBgColor !== 'rgba(0, 0, 0, 0)')) {
            category = 'PSEUDO';
            break;
          }
        }
      }
    }

    if (!category) continue;

    // Build selector path
    const tag = el.tagName.toLowerCase();
    const className = el.className && typeof el.className === 'string'
      ? el.className.split(/\s+/).filter(c => c && !noiseRe.test(c)).join('.')
      : '';
    const selectorPath = className ? `${tag}.${className}` : tag;

    // Calculate bounding rect area for sorting
    const rect = el.getBoundingClientRect();
    const area = rect.width * rect.height;

    // Extract computed styles
    const styles = {};
    for (const p of properties) {
      styles[p] = cs.getPropertyValue(p);
    }

    // Also extract pseudo-element styles if relevant
    const pseudoStyles = {};
    if (category === 'PSEUDO' || category === 'GRADIENT') {
      for (const pseudo of ['::before', '::after']) {
        const pcs = window.getComputedStyle(el, pseudo);
        if (pcs.content && pcs.content !== 'none' && pcs.content !== 'normal') {
          pseudoStyles[pseudo] = {};
          for (const p of ['background-image', 'background-color', 'opacity', 'width', 'height']) {
            pseudoStyles[pseudo][p] = pcs.getPropertyValue(p);
          }
        }
      }
    }

    results.push({ tag, className: el.className || '', selectorPath, styles, area, category, pseudoStyles });
  }

  // Sort by area (largest first = highest visual impact) and cap
  results.sort((a, b) => b.area - a.area);
  return results.slice(0, MAX_ELEMENTS);
};

/**
 * Match visual elements between HTML and WP sides.
 * Tier 1: Exact class name match.
 * Tier 2: >50% class token overlap (Jaccard) + same tag.
 * Unmatched: reported as STRUCTURAL (not auto-FAIL).
 */
function matchVisualElements(htmlEls, wpEls) {
  const matched = [];
  const usedHtml = new Set();
  const usedWp = new Set();
  const warnings = [];

  // Tier 1: Exact class name match
  for (let wi = 0; wi < wpEls.length; wi++) {
    if (usedWp.has(wi)) continue;
    const wp = wpEls[wi];
    if (!wp.className) continue;

    for (let hi = 0; hi < htmlEls.length; hi++) {
      if (usedHtml.has(hi)) continue;
      const html = htmlEls[hi];
      if (html.className === wp.className && html.tag === wp.tag) {
        matched.push({ html, wp });
        usedHtml.add(hi);
        usedWp.add(wi);
        break;
      }
    }
  }

  // Tier 2: Jaccard class overlap > 50% + same tag
  for (let wi = 0; wi < wpEls.length; wi++) {
    if (usedWp.has(wi)) continue;
    const wp = wpEls[wi];
    const wpTokens = new Set((wp.className || '').split(/\s+/).filter(Boolean));
    if (wpTokens.size === 0) continue;

    let bestIdx = -1;
    let bestScore = 0;

    for (let hi = 0; hi < htmlEls.length; hi++) {
      if (usedHtml.has(hi)) continue;
      const html = htmlEls[hi];
      if (html.tag !== wp.tag) continue;
      const htmlTokens = new Set((html.className || '').split(/\s+/).filter(Boolean));
      if (htmlTokens.size === 0) continue;

      const intersection = [...wpTokens].filter(t => htmlTokens.has(t)).length;
      const union = new Set([...wpTokens, ...htmlTokens]).size;
      const jaccard = intersection / union;

      if (jaccard > 0.5 && jaccard > bestScore) {
        bestScore = jaccard;
        bestIdx = hi;
      }
    }

    if (bestIdx >= 0) {
      matched.push({ html: htmlEls[bestIdx], wp });
      usedHtml.add(bestIdx);
      usedWp.add(wi);
    }
  }

  const unmatchedHtml = htmlEls.filter((_, i) => !usedHtml.has(i));
  const unmatchedWp = wpEls.filter((_, i) => !usedWp.has(i));

  return { matched, unmatchedHtml, unmatchedWp, warnings };
}

/**
 * Properties specifically important for visual elements (in addition to ELEMENT_PROPERTIES).
 */
const VISUAL_PROPERTIES = [
  'background-image', 'background-color', 'box-shadow',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
  'border-radius', 'opacity', 'backdrop-filter',
];

/** Combined property set for visual element checks */
const VISUAL_CHECK_PROPERTIES = [...new Set([...VISUAL_PROPERTIES, 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'])];

/**
 * Run Phase 4 visual element discovery for a single section.
 *
 * @param {Page} htmlPage
 * @param {Page} wpPage
 * @param {object} section
 * @param {boolean} verbose
 * @returns {{matched: number, fixable: Array, unmatched: {html: number, wp: number}, warnings: string[], totalDiscovered: {html: number, wp: number}}}
 */
async function runVisualElementAudit(htmlPage, wpPage, section, verbose) {
  const result = {
    matched: 0,
    fixable: [],
    unmatched: { html: 0, wp: 0 },
    warnings: [],
    totalDiscovered: { html: 0, wp: 0 },
  };

  const htmlSelector = section.htmlSelector;
  const wpSelector = section.wpSelector;
  if (!htmlSelector || !wpSelector) {
    result.warnings.push('Missing htmlSelector or wpSelector — skipping visual discovery');
    return result;
  }

  const noisePattern = DIVI_NOISE_RE.source;

  const [htmlEls, wpEls] = await Promise.all([
    htmlPage.evaluate(VISUAL_DISCOVER_FN, htmlSelector, VISUAL_CHECK_PROPERTIES, noisePattern),
    wpPage.evaluate(VISUAL_DISCOVER_FN, wpSelector, VISUAL_CHECK_PROPERTIES, noisePattern),
  ]);

  result.totalDiscovered.html = htmlEls.length;
  result.totalDiscovered.wp = wpEls.length;

  if (htmlEls.length === 0 && wpEls.length === 0) {
    return result;
  }

  // Match elements
  const { matched, unmatchedHtml, unmatchedWp, warnings } = matchVisualElements(htmlEls, wpEls);
  result.matched = matched.length;
  result.unmatched.html = unmatchedHtml.length;
  result.unmatched.wp = unmatchedWp.length;
  result.warnings.push(...warnings);

  // Compare visual properties on matched pairs
  for (const pair of matched) {
    for (const prop of VISUAL_CHECK_PROPERTIES) {
      const htmlVal = pair.html.styles[prop] || '';
      const wpVal = pair.wp.styles[prop] || '';
      const cmp = compareValues(prop, htmlVal, wpVal);

      if (cmp.match) continue;

      // Classify via CSD
      const synthLabel = `${pair.wp.selectorPath} [${pair.wp.category}]`;
      const classification = csd.classifyMismatch({
        label: synthLabel,
        property: prop,
        refValue: htmlVal,
        wpValue: wpVal,
      });

      if (classification !== 'FIXABLE') continue;

      // Suppress noise: border-color on 0-width borders
      if (/^border-.*-color$/.test(prop)) {
        const side = prop.replace('border-', '').replace('-color', '');
        const wpBW = pair.wp.styles[`border-${side}-width`] || '0px';
        const htmlBW = pair.html.styles[`border-${side}-width`] || '0px';
        if (parseFloat(wpBW) === 0 && parseFloat(htmlBW) === 0) continue;
      }

      // Suppress: transparent/white bg on light sections
      if (prop === 'background-color') {
        const hc = parseColor(htmlVal);
        const wc = parseColor(wpVal);
        // Both transparent-ish
        if (hc.valid && wc.valid && hc.a < 0.02 && wc.a < 0.02) continue;
        // Both near-white
        if (hc.valid && wc.valid && hc.r > 245 && hc.g > 245 && hc.b > 245 && wc.r > 245 && wc.g > 245 && wc.b > 245) continue;
      }

      const targetClass = pair.wp.className
        ? '.' + (pair.wp.className || '').split(/\s+/).filter(c => c && !DIVI_NOISE_RE.test(c))[0]
        : pair.wp.selectorPath;

      result.fixable.push({
        element: pair.wp.selectorPath,
        className: pair.wp.className,
        category: pair.wp.category,
        property: prop,
        htmlValue: htmlVal,
        wpValue: wpVal,
        note: cmp.note,
        fix: `Set ${prop}:${htmlVal} on ${targetClass || pair.wp.selectorPath} in builder css()`,
      });
    }
  }

  // Report unmatched as structural warnings (not auto-FAIL)
  for (const el of unmatchedHtml) {
    if (verbose) {
      result.warnings.push(`VISUAL_MISSING_IN_WP: <${el.tag}> ${el.selectorPath} [${el.category}]`);
    }
  }
  for (const el of unmatchedWp) {
    if (verbose) {
      result.warnings.push(`VISUAL_EXTRA_IN_WP: <${el.tag}> ${el.selectorPath} [${el.category}]`);
    }
  }

  return result;
}

/**
 * Match discovered elements between HTML and WP sides.
 * Three-tier cascade: text → tag+ordinal → unmatched.
 *
 * @param {Array} htmlEls — elements from HTML side
 * @param {Array} wpEls — elements from WP side
 * @returns {{matched: Array<{html, wp}>, unmatchedHtml: Array, unmatchedWp: Array, warnings: string[]}}
 */
function matchElements(htmlEls, wpEls) {
  const matched = [];
  const warnings = [];
  const usedHtml = new Set();
  const usedWp = new Set();

  // Tier 1: Text content matching
  for (let wi = 0; wi < wpEls.length; wi++) {
    if (usedWp.has(wi)) continue;
    const wp = wpEls[wi];
    const wpText = wp.text;

    if (wpText.length < 3) continue; // skip to Tier 2 for very short strings

    for (let hi = 0; hi < htmlEls.length; hi++) {
      if (usedHtml.has(hi)) continue;
      const html = htmlEls[hi];
      const htmlText = html.text;

      if (htmlText === wpText) {
        // Short strings (3-7 chars): require same tag too
        if (wpText.length <= 7 && html.tag !== wp.tag) continue;

        matched.push({ html, wp });
        usedHtml.add(hi);
        usedWp.add(wi);
        break;
      }
    }
  }

  // Tier 2: Tag + ordinal fallback for unmatched
  // Check ordinal count differences first
  const htmlTagCounts = {};
  const wpTagCounts = {};
  for (const el of htmlEls) htmlTagCounts[el.tag] = (htmlTagCounts[el.tag] || 0) + 1;
  for (const el of wpEls) wpTagCounts[el.tag] = (wpTagCounts[el.tag] || 0) + 1;

  for (const tag of new Set([...Object.keys(htmlTagCounts), ...Object.keys(wpTagCounts)])) {
    const hc = htmlTagCounts[tag] || 0;
    const wc = wpTagCounts[tag] || 0;
    if (hc !== wc) {
      warnings.push(`<${tag}> count differs: HTML=${hc} WP=${wc}`);
    }
  }

  for (let wi = 0; wi < wpEls.length; wi++) {
    if (usedWp.has(wi)) continue;
    const wp = wpEls[wi];

    for (let hi = 0; hi < htmlEls.length; hi++) {
      if (usedHtml.has(hi)) continue;
      const html = htmlEls[hi];

      if (html.tag === wp.tag && html.ordinal === wp.ordinal) {
        matched.push({ html, wp });
        usedHtml.add(hi);
        usedWp.add(wi);
        break;
      }
    }
  }

  // Tier 3: Unmatched
  const unmatchedHtml = htmlEls.filter((_, i) => !usedHtml.has(i));
  const unmatchedWp = wpEls.filter((_, i) => !usedWp.has(i));

  return { matched, unmatchedHtml, unmatchedWp, warnings };
}

/**
 * Run auto-discovery for a single section.
 * Uses existing browser pages — no new navigation.
 *
 * @param {Page} htmlPage
 * @param {Page} wpPage
 * @param {object} section — verify config section
 * @param {boolean} verbose
 * @returns {{matched: number, fixable: Array, unmatched: {html: number, wp: number}, warnings: string[], totalDiscovered: {html: number, wp: number}}}
 */
async function runAutoDiscovery(htmlPage, wpPage, section, verbose) {
  const result = {
    matched: 0,
    fixable: [],
    unmatched: { html: 0, wp: 0 },
    warnings: [],
    totalDiscovered: { html: 0, wp: 0 },
  };

  const htmlSelector = section.htmlSelector;
  const wpSelector = section.wpSelector;
  if (!htmlSelector || !wpSelector) {
    result.warnings.push('Missing htmlSelector or wpSelector — skipping auto-discovery');
    return result;
  }

  // Mark styleMap elements to avoid double-counting
  if (section.styleMap && section.styleMap.length > 0) {
    await Promise.all([
      htmlPage.evaluate((mappings) => {
        for (const m of mappings) {
          const el = document.querySelector(m.htmlSel);
          if (el) el.setAttribute('data-fidelity-manual', '1');
        }
      }, section.styleMap),
      wpPage.evaluate((mappings) => {
        for (const m of mappings) {
          const el = document.querySelector(m.wpSel);
          if (el) el.setAttribute('data-fidelity-manual', '1');
        }
      }, section.styleMap),
    ]);
  }

  // Discover elements on both sides
  const propNames = ELEMENT_PROPERTIES;
  const tagList = DISCOVER_TAGS;
  const noisePattern = DIVI_NOISE_RE.source;

  const [htmlEls, wpEls] = await Promise.all([
    htmlPage.evaluate(AUTO_DISCOVER_FN, htmlSelector, propNames, tagList, noisePattern),
    wpPage.evaluate(AUTO_DISCOVER_FN, wpSelector, propNames, tagList, noisePattern),
  ]);

  result.totalDiscovered.html = htmlEls.length;
  result.totalDiscovered.wp = wpEls.length;

  // Low element count warning
  if (htmlEls.length < 3) {
    result.warnings.push(`Auto-discovery found only ${htmlEls.length} HTML elements — coverage may be low`);
  }
  if (wpEls.length < 3) {
    result.warnings.push(`Auto-discovery found only ${wpEls.length} WP elements — coverage may be low`);
  }

  if (htmlEls.length === 0 || wpEls.length === 0) {
    result.warnings.push('Skipping auto-discovery comparison — 0 elements on one side');
    return result;
  }

  // Match elements
  const { matched, unmatchedHtml, unmatchedWp, warnings } = matchElements(htmlEls, wpEls);
  result.matched = matched.length;
  result.unmatched.html = unmatchedHtml.length;
  result.unmatched.wp = unmatchedWp.length;
  result.warnings.push(...warnings);

  // Compare styles on matched pairs
  for (const pair of matched) {
    for (const prop of ELEMENT_PROPERTIES) {
      // Skip layout-computed properties in auto-discovery (content reflow, not CSS bugs)
      if (LAYOUT_COMPUTED_SKIP.has(prop)) continue;

      const htmlVal = pair.html.styles[prop] || '';
      const wpVal = pair.wp.styles[prop] || '';
      const cmp = compareValues(prop, htmlVal, wpVal);

      if (cmp.match) continue;

      // Classify via CSD's classifyMismatch with synthesized label
      const synthLabel = `${pair.wp.tag}[${pair.wp.ordinal}] .${pair.wp.className}`;
      const classification = csd.classifyMismatch({
        label: synthLabel,
        property: prop,
        refValue: htmlVal,
        wpValue: wpVal,
      });

      // Only report FIXABLE
      if (classification !== 'FIXABLE') continue;

      // Additional auto-discovery noise suppression
      // z-index: auto ↔ 0/1 — stacking context cosmetic, rarely visual
      if (prop === 'z-index') continue;
      // gap: normal ↔ 0px — equivalent when no gap is intended
      if (prop === 'gap' && ((htmlVal === 'normal' && wpVal === '0px') || (htmlVal === '0px' && wpVal === 'normal'))) continue;
      // border-*-color on elements with no visible border (border-width: 0)
      if (/^border-.*-color$/.test(prop)) {
        const side = prop.replace('border-', '').replace('-color', '');
        const wpBorderWidth = pair.wp.styles[`border-${side}-width`] || '0px';
        const htmlBorderWidth = pair.html.styles[`border-${side}-width`] || '0px';
        if (parseFloat(wpBorderWidth) === 0 && parseFloat(htmlBorderWidth) === 0) continue;
      }
      // backdrop-filter / -webkit-backdrop-filter: none ↔ empty — equivalent
      if (/backdrop-filter/.test(prop) && (htmlVal === 'none' || !htmlVal) && (wpVal === 'none' || !wpVal)) continue;
      // filter: none ↔ empty
      if (prop === 'filter' && (htmlVal === 'none' || !htmlVal) && (wpVal === 'none' || !wpVal)) continue;
      // overflow variants: visible ↔ auto — both show content
      if (/^overflow/.test(prop)) {
        const equivOverflow = (a, b) => (a === 'visible' && b === 'auto') || (a === 'auto' && b === 'visible');
        if (equivOverflow(htmlVal, wpVal)) continue;
      }

      // Generate fix suggestion
      const targetClass = pair.wp.className
        ? '.' + pair.wp.className.split(/\s+/).filter(c => c && !DIVI_NOISE_RE.test(c))[0]
        : pair.wp.selectorPath;
      const fixSuggestion = `Set ${prop}:${htmlVal} on ${targetClass || pair.wp.selectorPath} in builder css()`;

      result.fixable.push({
        element: `${pair.wp.tag}[${pair.wp.ordinal}]`,
        className: pair.wp.className,
        text: pair.wp.text.substring(0, 50),
        property: prop,
        htmlValue: htmlVal,
        wpValue: wpVal,
        note: cmp.note,
        fix: fixSuggestion,
      });
    }
  }

  // Report unmatched elements as warnings
  for (const el of unmatchedHtml) {
    if (verbose) {
      result.warnings.push(`MISSING_IN_WP: <${el.tag}> "${el.text.substring(0, 40)}" (${el.selectorPath})`);
    }
  }
  for (const el of unmatchedWp) {
    if (verbose) {
      result.warnings.push(`MISSING_IN_HTML: <${el.tag}> "${el.text.substring(0, 40)}" (${el.selectorPath})`);
    }
  }

  // Clean up data-fidelity-manual markers
  if (section.styleMap && section.styleMap.length > 0) {
    await Promise.all([
      htmlPage.evaluate((mappings) => {
        for (const m of mappings) {
          const el = document.querySelector(m.htmlSel);
          if (el) el.removeAttribute('data-fidelity-manual');
        }
      }, section.styleMap),
      wpPage.evaluate((mappings) => {
        for (const m of mappings) {
          const el = document.querySelector(m.wpSel);
          if (el) el.removeAttribute('data-fidelity-manual');
        }
      }, section.styleMap),
    ]);
  }

  return result;
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
 * @param {boolean} [opts.noAutodiscover] — skip auto-discovery phase
 * @param {boolean} [opts.autodiscoverOnly] — skip manual checks
 * @returns {Promise<object>} — full report
 */
async function run(opts) {
  const { pageName, sectionFilter, verbose, noAutodiscover, autodiscoverOnly } = opts;

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

  const report = {
    page: pageName,
    sections: [],
    summary: { pass: 0, fail: 0, warn: 0 },
    autoDiscovery: [],
  };

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
      // PHASE 1: MANUAL CHECKS (F1-F8)
      // ─────────────────────────────────────────────────────

      if (!autodiscoverOnly) {
        // F1: FONT SMOOTHING
        const f1 = await checkFontSmoothing(htmlPage, wpPage, section);
        sectionReport.findings.push(f1);
        logFinding(f1);

        // F2: <p> PADDING INJECTION
        const f2 = await checkParagraphPadding(wpPage, section);
        sectionReport.findings.push(f2);
        logFinding(f2);

        // F3-F4, F6-F8: ELEMENT-LEVEL STYLE COMPARISON
        if (section.styleMap && section.styleMap.length > 0) {
          for (const mapping of section.styleMap) {
            const elementResult = await checkElementStyles(
              htmlPage, wpPage, mapping, section, verbose
            );
            sectionReport.elementChecks.push(elementResult);

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

        // F5: UNICODE CHARACTER CHECK
        const f5 = await checkUnicodeCharacters(htmlPage, wpPage, section);
        sectionReport.unicodeChecks = f5;
        for (const uc of f5) {
          logFinding(uc);
        }

        // F7: CONTAINER FONT-SIZE
        const f7 = await checkContainerFontSize(htmlPage, wpPage, section);
        if (f7.length > 0) {
          for (const check of f7) {
            sectionReport.findings.push(check);
            logFinding(check);
          }
        }
      }

      // ─────────────────────────────────────────────────────
      // PHASE 2: AUTO-DISCOVERY
      // ─────────────────────────────────────────────────────

      let adResult = null;
      if (!noAutodiscover) {
        console.log(`\n  ── Auto-Discovery: ${section.name} ──`);
        adResult = await runAutoDiscovery(htmlPage, wpPage, section, verbose);

        console.log(`  Discovered: HTML=${adResult.totalDiscovered.html} WP=${adResult.totalDiscovered.wp} | Matched=${adResult.matched} | Fixable=${adResult.fixable.length} | Unmatched: HTML=${adResult.unmatched.html} WP=${adResult.unmatched.wp}`);

        for (const w of adResult.warnings) {
          console.log(`  ⚠ ${w}`);
        }

        if (adResult.fixable.length > 0) {
          for (const f of adResult.fixable) {
            console.log(`  ✗ ${f.element} "${f.text}" → ${f.property}: expected "${f.htmlValue}", got "${f.wpValue}"`);
            if (verbose) console.log(`    → ${f.fix}`);
          }
        }

        report.autoDiscovery.push({
          section: section.name,
          ...adResult,
        });
      }

      // ─────────────────────────────────────────────────────
      // PHASE 3: DECORATIVE ELEMENT PRESENCE
      // ─────────────────────────────────────────────────────

      let decoResult = null;
      if (!noAutodiscover) {
        console.log(`\n  ── Decorative Audit: ${section.name} ──`);
        decoResult = await runDecoPresenceAudit(htmlPage, wpPage, section, pageConfig, verbose);

        if (decoResult.fixable.length > 0) {
          for (const f of decoResult.fixable) {
            console.log(`  ✗ [${f.category}] ${f.element}: ${f.note}`);
            if (verbose) console.log(`    → ${f.fix}`);
          }
        } else {
          console.log(`  ✓ No decoration issues found`);
        }

        for (const f of decoResult.findings) {
          logFinding(f);
        }

        if (!report.decorativeAudit) report.decorativeAudit = [];
        report.decorativeAudit.push({
          section: section.name,
          ...decoResult,
        });
      }

      // ─────────────────────────────────────────────────────
      // PHASE 4: VISUAL ELEMENT DISCOVERY
      // ─────────────────────────────────────────────────────

      let visualResult = null;
      if (!noAutodiscover) {
        console.log(`\n  ── Visual Elements: ${section.name} ──`);
        visualResult = await runVisualElementAudit(htmlPage, wpPage, section, verbose);

        console.log(`  Visual: HTML=${visualResult.totalDiscovered.html} WP=${visualResult.totalDiscovered.wp} | Matched=${visualResult.matched} | Fixable=${visualResult.fixable.length}`);

        for (const w of visualResult.warnings) {
          console.log(`  ⚠ ${w}`);
        }

        if (visualResult.fixable.length > 0) {
          for (const f of visualResult.fixable) {
            console.log(`  ✗ [${f.category}] ${f.element} → ${f.property}: expected "${f.htmlValue}", got "${f.wpValue}"`);
            if (verbose) console.log(`    → ${f.fix}`);
          }
        }

        if (!report.visualElements) report.visualElements = [];
        report.visualElements.push({
          section: section.name,
          ...visualResult,
        });
      }

      // ─────────────────────────────────────────────────────
      // PHASE 5: SIBLING CONSISTENCY CHECK
      // ─────────────────────────────────────────────────────

      let siblingResult = null;
      if (!noAutodiscover && section.htmlSelector) {
        console.log(`\n  ── Sibling Consistency: ${section.name} ──`);
        siblingResult = await runSiblingConsistencyCheck(wpPage, htmlPage, section, verbose);

        console.log(`  Siblings: ${siblingResult.groupsChecked} groups | Fixable=${siblingResult.fixable.length} | Warnings=${siblingResult.warnings.length}`);

        for (const w of siblingResult.warnings) {
          console.log(`  ⚠ ${w}`);
        }

        for (const f of siblingResult.fixable) {
          console.log(`  ✗ [SIBLING] ${f.element} → ${f.property}: ${f.wpValue}`);
          console.log(`    Expected: ${f.htmlValue}`);
          if (f.outliers) {
            for (const o of f.outliers) {
              console.log(`    Outlier: ${o}`);
            }
          }
        }

        if (!report.siblingConsistency) report.siblingConsistency = [];
        report.siblingConsistency.push({
          section: section.name,
          ...siblingResult,
        });
      }

      // Count pass/fail/warn for manual checks
      const allFindings = [
        ...sectionReport.findings,
        ...sectionReport.unicodeChecks,
      ];
      for (const ec of sectionReport.elementChecks) {
        for (const m of ec.mismatches) {
          allFindings.push({ status: m.severity });
        }
        sectionReport.passCount += ec.matchCount;
      }
      for (const f of allFindings) {
        if (f.status === 'PASS') sectionReport.passCount++;
        else if (f.status === 'FAIL') sectionReport.failCount++;
        else if (f.status === 'WARN') sectionReport.warnCount++;
      }

      // Count auto-discovery fixable as FAIL
      if (adResult) {
        sectionReport.failCount += adResult.fixable.length;
        sectionReport.warnCount += adResult.unmatched.html + adResult.unmatched.wp;
        sectionReport.warnCount += adResult.warnings.length;
      }

      // Count decorative audit fixable as FAIL
      if (decoResult) {
        sectionReport.failCount += decoResult.fixable.length;
        sectionReport.warnCount += decoResult.findings.filter(f => f.status === 'WARN').length;
      }

      // Count visual element fixable as FAIL
      if (visualResult) {
        sectionReport.failCount += visualResult.fixable.length;
        sectionReport.warnCount += visualResult.unmatched.html + visualResult.unmatched.wp;
      }

      // Count sibling consistency fixable as FAIL
      if (siblingResult) {
        sectionReport.failCount += siblingResult.fixable.length;
        sectionReport.warnCount += siblingResult.warnings.length;
      }

      report.summary.pass += sectionReport.passCount;
      report.summary.fail += sectionReport.failCount;
      report.summary.warn += sectionReport.warnCount;

      report.sections.push(sectionReport);
    }

    // ═══════════════════════════════════════════════════════
    // F9: INTER-SECTION GAP CHECK (runs once, across all sections)
    // ═══════════════════════════════════════════════════════

    if (!autodiscoverOnly && sections.length >= 2) {
      console.log(`\n${'═'.repeat(60)}`);
      console.log('  F9: Inter-Section Gap Check');
      console.log('═'.repeat(60));

      const gapResults = await checkSectionGaps(htmlPage, wpPage, sections, verbose);
      report.sectionGaps = gapResults;

      for (const g of gapResults) {
        logFinding(g);
        if (g.status === 'FAIL') report.summary.fail++;
        else if (g.status === 'PASS') report.summary.pass++;
        else if (g.status === 'WARN') report.summary.warn++;
      }
    }

  } finally {
    await browser.close();
    await htmlServer.close();
  }

  // ═══════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════
  const hasAutoDiscovery = report.autoDiscovery.length > 0;

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  FIDELITY CHECK SUMMARY — ${pageName}${hasAutoDiscovery ? ' (auto-discovery ON)' : ''}`);
  console.log('═'.repeat(60));

  if (hasAutoDiscovery) {
    // Table header
    const pad = (s, n) => String(s).padEnd(n);
    console.log(`  ${pad('Section', 20)} | ${pad('Manual', 10)} | ${pad('Text', 10)} | ${pad('Visual', 10)} | ${pad('Fixable', 9)}`);
    console.log(`  ${'-'.repeat(20)}-+-${'-'.repeat(10)}-+-${'-'.repeat(10)}-+-${'-'.repeat(10)}-+-${'-'.repeat(9)}`);

    for (const s of report.sections) {
      const ad = report.autoDiscovery.find(a => a.section === s.name);
      const ve = (report.visualElements || []).find(v => v.section === s.name);
      const totalFixable = (ad ? ad.fixable.length : 0) + (ve ? ve.fixable.length : 0);
      const manualIcon = (s.failCount - totalFixable) <= 0 ? '✓' : '✗';
      const manualStr = s.elementChecks.length > 0
        ? `${s.elementChecks.reduce((a, e) => a + e.matchCount, 0)}/${s.elementChecks.reduce((a, e) => a + e.matchCount + e.mismatches.length, 0)} ${manualIcon}`
        : 'n/a';
      const adStr = ad ? `${ad.matched}m ${ad.fixable.length}f` : 'OFF';
      const veStr = ve ? `${ve.matched}m ${ve.fixable.length}f` : 'OFF';
      const fixStr = totalFixable > 0 ? `${totalFixable} ←` : '0';

      console.log(`  ${pad(s.name, 20)} | ${pad(manualStr, 10)} | ${pad(adStr, 10)} | ${pad(veStr, 10)} | ${pad(fixStr, 9)}`);
    }
  } else {
    for (const s of report.sections) {
      const icon = s.failCount === 0 ? '✓' : '✗';
      console.log(`  ${icon} ${s.name}: ${s.passCount} pass, ${s.failCount} fail, ${s.warnCount} warn`);
    }
  }

  console.log(`\n  Total: ${report.summary.pass} pass, ${report.summary.fail} fail, ${report.summary.warn} warn`);

  // Show all fixable issues in detail
  const allFixable = [];
  if (hasAutoDiscovery) {
    for (const ad of report.autoDiscovery) {
      for (const f of ad.fixable) {
        allFixable.push({ section: ad.section, ...f });
      }
    }
  }

  if (allFixable.length > 0) {
    console.log('\n  FIXABLE issues (CSS fixes needed):');
    for (const f of allFixable) {
      console.log(`    [${f.section}] ${f.element} "${f.text}" → ${f.property}: expected "${f.htmlValue}", got "${f.wpValue}"`);
      console.log(`      → ${f.fix}`);
    }
  }

  // Decorative element issues (Phase 3)
  const allDecoFixable = [];
  if (report.decorativeAudit) {
    for (const da of report.decorativeAudit) {
      for (const f of da.fixable) {
        allDecoFixable.push({ section: da.section, ...f });
      }
    }
  }
  if (allDecoFixable.length > 0) {
    console.log('\n  DECORATIVE issues (Super D / grain / wave fixes needed):');
    for (const f of allDecoFixable) {
      console.log(`    [${f.section}] [${f.category}] ${f.element}: ${f.note}`);
      console.log(`      → ${f.fix}`);
    }
  }

  // Visual element issues (Phase 4)
  const allVisualFixable = [];
  if (report.visualElements) {
    for (const ve of report.visualElements) {
      for (const f of ve.fixable) {
        allVisualFixable.push({ section: ve.section, ...f });
      }
    }
  }
  if (allVisualFixable.length > 0) {
    console.log('\n  VISUAL ELEMENT issues (gradients, shadows, borders, backgrounds):');
    for (const f of allVisualFixable) {
      console.log(`    [${f.section}] [${f.category}] ${f.element} → ${f.property}: expected "${f.htmlValue}", got "${f.wpValue}"`);
      console.log(`      → ${f.fix}`);
    }
  }

  // Sibling consistency issues (Phase 5)
  const allSiblingFixable = [];
  if (report.siblingConsistency) {
    for (const sc of report.siblingConsistency) {
      for (const f of sc.fixable) {
        allSiblingFixable.push({ section: sc.section, ...f });
      }
    }
  }
  if (allSiblingFixable.length > 0) {
    console.log('\n  SIBLING CONSISTENCY issues (elements that should match but differ):');
    for (const f of allSiblingFixable) {
      console.log(`    [${f.section}] ${f.element} → ${f.property}: ${f.wpValue}`);
      console.log(`      Expected: ${f.htmlValue}`);
    }
  }

  // Section gap issues (F9)
  const gapFailures = (report.sectionGaps || []).filter(g => g.status === 'FAIL');
  if (gapFailures.length > 0) {
    console.log('\n  SECTION GAP issues:');
    for (const g of gapFailures) {
      console.log(`    → ${g.label}: ${g.note}`);
    }
  }

  // Manual action items (from F1-F8)
  const manualFails = report.summary.fail - allFixable.length - allDecoFixable.length - gapFailures.length;
  if (manualFails > 0) {
    console.log('\n  Manual check action items:');
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

  const wpSmoothing = await wpPage.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    if (cs.webkitFontSmoothing === 'auto') return 'auto';
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

  // Section Wrapper elements: skip layout-computed properties (width, height, line-height,
  // position, overflow, display) — these differ due to container width and body inheritance.
  // Only padding/margin on wrappers are real CSS bugs worth flagging.
  const isWrapper = /Section Wrapper/i.test(mapping.label);
  const WRAPPER_SKIP_PROPS = new Set([
    'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
    'line-height', 'position', 'overflow', 'overflow-x', 'overflow-y',
    'display', 'flex-direction', 'align-items', 'justify-content', 'gap',
  ]);

  // Compare each property
  for (const prop of ELEMENT_PROPERTIES) {
    // Skip layout-computed properties on Section Wrapper elements
    if (isWrapper && WRAPPER_SKIP_PROPS.has(prop)) {
      result.matchCount++;
      continue;
    }

    const htmlVal = htmlStyles[prop] || '';
    const wpVal = wpStyles[prop] || '';
    const cmp = compareValues(prop, htmlVal, wpVal);

    if (cmp.match) {
      result.matchCount++;
      continue;
    }

    // Classify which finding this belongs to
    let findingId = 8;
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
      findingId = 0;
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
 */
async function checkUnicodeCharacters(htmlPage, wpPage, section) {
  const results = [];
  const wpSelector = section.wpSelector;
  const htmlSelector = section.htmlSelector;

  if (!wpSelector || !htmlSelector) return results;

  const [htmlTexts, wpTexts] = await Promise.all([
    htmlPage.evaluate((sel) => {
      const wrapper = document.querySelector(sel);
      if (!wrapper) return [];
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

  for (const wpText of wpTexts) {
    for (const check of UNICODE_CHECKS) {
      if (wpText.text.includes(check.char)) {
        const prefix = wpText.text.substring(0, 20).replace(check.char, check.straight);
        const htmlMatch = htmlTexts.find(h => h.text.substring(0, 20) === prefix);

        if (htmlMatch && !htmlMatch.text.includes(check.char)) {
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

// ═══════════════════════════════════════════════════════════
// PHASE 5: SIBLING CONSISTENCY CHECK
// ═══════════════════════════════════════════════════════════

/**
 * Phase 5: Check that sibling elements sharing the same class have consistent dimensions.
 * Catches the "4 cards, 1 is bigger" problem that per-element fidelity checks miss.
 *
 * Finds groups of 2+ elements sharing a class under the WP section wrapper,
 * then compares their widths, heights, paddings. If any differ by >TOLERANCE,
 * reports as fixable with the expected (most common) value.
 */
const SIBLING_TOLERANCE = 4; // px — siblings within ±4px are acceptable
const SIBLING_PROPERTIES = [
  'width', 'height',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
];

async function runSiblingConsistencyCheck(wpPage, htmlPage, section, verbose) {
  const wpSel = section.wpSelector;
  const htmlSel = section.htmlSelector;

  // Discover sibling groups on WP side
  const wpGroups = await wpPage.evaluate((containerSel, props) => {
    const container = document.querySelector(containerSel);
    if (!container) return [];

    // Collect all elements with classes, group by class
    const classMap = new Map(); // className -> elements[]
    const allEls = container.querySelectorAll('*');

    for (const el of allEls) {
      // Skip invisible elements
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

      for (const cls of el.classList) {
        // Skip noise classes
        if (/^et_pb_|^_module|^divi-|^wp-block/i.test(cls)) continue;
        if (!classMap.has(cls)) classMap.set(cls, []);
        classMap.get(cls).push(el);
      }
    }

    // Only keep groups with 2+ siblings that share a parent
    const results = [];
    for (const [cls, els] of classMap) {
      if (els.length < 2) continue;

      // Group by parent
      const byParent = new Map();
      for (const el of els) {
        const parentId = el.parentElement ? (el.parentElement.className || 'root') : 'root';
        if (!byParent.has(parentId)) byParent.set(parentId, []);
        byParent.get(parentId).push(el);
      }

      for (const [, siblings] of byParent) {
        if (siblings.length < 2) continue;

        const measurements = siblings.map(el => {
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const vals = {};
          for (const p of props) {
            vals[p] = p === 'width' ? rect.width : p === 'height' ? rect.height : parseFloat(cs.getPropertyValue(p)) || 0;
          }
          vals._text = (el.textContent || '').trim().substring(0, 30);
          vals._classes = el.className;
          return vals;
        });

        results.push({ className: cls, count: siblings.length, measurements });
      }
    }

    return results;
  }, wpSel, SIBLING_PROPERTIES);

  // Also get HTML side for comparison
  const htmlGroups = await htmlPage.evaluate((containerSel, props) => {
    const container = document.querySelector(containerSel);
    if (!container) return [];

    const classMap = new Map();
    const allEls = container.querySelectorAll('*');

    for (const el of allEls) {
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

      for (const cls of el.classList) {
        if (!classMap.has(cls)) classMap.set(cls, []);
        classMap.get(cls).push(el);
      }
    }

    const results = [];
    for (const [cls, els] of classMap) {
      if (els.length < 2) continue;

      const byParent = new Map();
      for (const el of els) {
        const parentId = el.parentElement ? (el.parentElement.className || 'root') : 'root';
        if (!byParent.has(parentId)) byParent.set(parentId, []);
        byParent.get(parentId).push(el);
      }

      for (const [, siblings] of byParent) {
        if (siblings.length < 2) continue;

        const measurements = siblings.map(el => {
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const vals = {};
          for (const p of props) {
            vals[p] = p === 'width' ? rect.width : p === 'height' ? rect.height : parseFloat(cs.getPropertyValue(p)) || 0;
          }
          vals._text = (el.textContent || '').trim().substring(0, 30);
          return vals;
        });

        results.push({ className: cls, count: siblings.length, measurements });
      }
    }
    return results;
  }, htmlSel, SIBLING_PROPERTIES);

  // Analyze WP sibling groups for inconsistencies
  const fixable = [];
  const warnings = [];

  for (const group of wpGroups) {
    const { className, measurements } = group;
    if (measurements.length < 2) continue;

    // Check if the HTML reference also has this group — and if HTML siblings are consistent
    const htmlGroup = htmlGroups.find(g => g.className === className);
    const htmlConsistent = htmlGroup ? checkGroupConsistency(htmlGroup.measurements) : null;

    for (const prop of SIBLING_PROPERTIES) {
      const values = measurements.map(m => m[prop]);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const diff = max - min;

      if (diff <= SIBLING_TOLERANCE) continue;

      // Check if HTML side is consistent for this property
      if (htmlGroup && htmlConsistent && htmlConsistent[prop] && htmlConsistent[prop].consistent) {
        // HTML siblings ARE consistent, WP siblings are NOT → fixable
        const expectedValue = htmlConsistent[prop].mode;
        const outliers = measurements
          .filter(m => Math.abs(m[prop] - expectedValue) > SIBLING_TOLERANCE)
          .map(m => `"${m._text}" (${m[prop].toFixed(1)}px, classes: ${m._classes})`);

        if (outliers.length > 0) {
          fixable.push({
            element: `.${className}`,
            className,
            property: prop,
            htmlValue: `${expectedValue.toFixed(1)}px (consistent across ${htmlGroup.measurements.length} siblings)`,
            wpValue: `varies: ${min.toFixed(1)}px–${max.toFixed(1)}px`,
            fix: `SIBLING_CONSISTENCY: Set .${className} { ${prop}: ${expectedValue.toFixed(0)}px } — ${outliers.length} of ${measurements.length} siblings differ`,
            category: 'SIBLING',
            section: section.name,
            outliers,
          });
        }
      } else {
        // HTML also has variation or doesn't have this group — just warn
        warnings.push(`${className}: ${prop} varies ${min.toFixed(1)}–${max.toFixed(1)}px across ${measurements.length} siblings`);
      }
    }
  }

  return { fixable, warnings, groupsChecked: wpGroups.length };
}

/**
 * Check consistency across a group of sibling measurements.
 * Returns per-property: { consistent: bool, mode: number }
 */
function checkGroupConsistency(measurements) {
  const result = {};
  for (const prop of SIBLING_PROPERTIES) {
    const values = measurements.map(m => m[prop]);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const consistent = (max - min) <= SIBLING_TOLERANCE;
    // Mode = most common value (round to nearest px)
    const rounded = values.map(v => Math.round(v));
    const freq = {};
    for (const v of rounded) freq[v] = (freq[v] || 0) + 1;
    const mode = Number(Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0]);
    result[prop] = { consistent, mode, min, max };
  }
  return result;
}

/**
 * F9: Check inter-section gaps.
 * Measures the pixel gap between consecutive section wrappers on both HTML and WP.
 * A gap difference > threshold indicates missing/extra spacing between sections.
 */
async function checkSectionGaps(htmlPage, wpPage, allSections, verbose) {
  const results = [];
  const GAP_TOLERANCE = 10; // px — gaps within ±10px are acceptable

  // Build ordered list of section wrapper selectors
  const htmlSelectors = allSections.map(s => s.htmlSelector).filter(Boolean);
  const wpSelectors = allSections.map(s => s.wpSelector).filter(Boolean);

  // Measure bounding rects on both sides
  const [htmlRects, wpRects] = await Promise.all([
    htmlPage.evaluate((selectors) => {
      return selectors.map(sel => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, height: r.height, selector: sel };
      });
    }, htmlSelectors),
    wpPage.evaluate((selectors) => {
      return selectors.map(sel => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, height: r.height, selector: sel };
      });
    }, wpSelectors),
  ]);

  // Check for dw-wave-fade elements between sections in HTML (decorative transitions not in WP)
  const waveFadePairs = await htmlPage.evaluate((selectors) => {
    const pairs = new Set();
    const waveFades = document.querySelectorAll('.dw-wave-fade');
    for (const wf of waveFades) {
      // Find the previous and next section siblings
      let prev = wf.previousElementSibling;
      let next = wf.nextElementSibling;
      // Walk past non-section siblings
      while (prev && prev.tagName !== 'SECTION') prev = prev.previousElementSibling;
      while (next && next.tagName !== 'SECTION') next = next.nextElementSibling;
      if (prev && next) {
        // Find which selector indices match these sections
        for (let a = 0; a < selectors.length; a++) {
          if (prev.matches(selectors[a]) || prev.querySelector(selectors[a])) {
            for (let b = 0; b < selectors.length; b++) {
              if (next.matches(selectors[b]) || next.querySelector(selectors[b])) {
                pairs.add(`${a}-${b}`);
              }
            }
          }
        }
      }
    }
    return [...pairs];
  }, htmlSelectors);
  const waveFadeSet = new Set(waveFadePairs);

  // Compare consecutive pairs
  for (let i = 0; i < allSections.length - 1; i++) {
    const htmlCurrent = htmlRects[i];
    const htmlNext = htmlRects[i + 1];
    const wpCurrent = wpRects[i];
    const wpNext = wpRects[i + 1];

    if (!htmlCurrent || !htmlNext || !wpCurrent || !wpNext) continue;

    const htmlGap = htmlNext.top - htmlCurrent.bottom;
    const wpGap = wpNext.top - wpCurrent.bottom;
    const diff = Math.abs(htmlGap - wpGap);

    const sectionPair = `${allSections[i].name} → ${allSections[i + 1].name}`;
    const hasWaveFade = waveFadeSet.has(`${i}-${i + 1}`);

    // Wave-fade gaps: HTML has decorative transition that WP intentionally omits
    if (hasWaveFade && htmlGap > wpGap) {
      if (verbose) {
        results.push({
          id: 'F9',
          label: `Section gap: ${sectionPair}`,
          status: 'WARN',
          htmlValue: `${Math.round(htmlGap)}px`,
          wpValue: `${Math.round(wpGap)}px`,
          note: `Wave-fade transition in HTML adds ${Math.round(htmlGap - wpGap)}px — expected difference (decorative element not in WP).`,
        });
      }
    } else if (diff > GAP_TOLERANCE) {
      results.push({
        id: 'F9',
        label: `Section gap: ${sectionPair}`,
        status: 'FAIL',
        htmlValue: `${Math.round(htmlGap)}px`,
        wpValue: `${Math.round(wpGap)}px`,
        note: `Gap differs by ${Math.round(diff)}px (HTML=${Math.round(htmlGap)}px, WP=${Math.round(wpGap)}px). Check margin/padding on section wrappers.`,
      });
    } else if (verbose) {
      results.push({
        id: 'F9',
        label: `Section gap: ${sectionPair}`,
        status: 'PASS',
        note: `HTML=${Math.round(htmlGap)}px, WP=${Math.round(wpGap)}px (diff: ${Math.round(diff)}px)`,
      });
    }
  }

  return results;
}

/**
 * F7: Check font-size on containers that hold inline children.
 */
async function checkContainerFontSize(htmlPage, wpPage, section) {
  const results = [];
  const wpSelector = section.wpSelector;
  const htmlSelector = section.htmlSelector;

  if (!wpSelector || !htmlSelector) return results;

  const [htmlContainers, wpContainers] = await Promise.all([
    htmlPage.evaluate((sel) => {
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

  for (const wpC of wpContainers) {
    const wpSize = parseFloat(wpC.fontSize);
    if (wpSize < 16) {
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
// PHASE 3: DECORATIVE ELEMENT PRESENCE AUDIT
// ═══════════════════════════════════════════════════════════

/** Selector pattern for decoration containers */
const DECO_SELECTOR = '[class*="dw-d-bg"], [class*="grain"], [class*="particle"], [class*="wave"], [class*="scene"], [class*="deco"]';

/**
 * Browser-side function to scan for decorative elements within a section.
 * Returns array of { selector, className, bgImage, opacity, display, width, height, hasContent }.
 */
const DECO_DISCOVER_FN = function(wrapperSelector, decoSelector) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return [];
  const els = wrapper.querySelectorAll(decoSelector);
  const results = [];
  for (const el of els) {
    const cs = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const beforeCs = window.getComputedStyle(el, '::before');
    const afterCs = window.getComputedStyle(el, '::after');
    results.push({
      className: el.className || '',
      bgImage: cs.backgroundImage,
      opacity: cs.opacity,
      display: cs.display,
      width: rect.width,
      height: rect.height,
      beforeContent: beforeCs.content,
      afterContent: afterCs.content,
      beforeBgImage: beforeCs.backgroundImage,
      afterBgImage: afterCs.backgroundImage,
    });
  }
  return results;
};

/**
 * Run Phase 3: Decorative element presence audit for a single section.
 * Compares decoration containers between HTML and WP.
 *
 * @param {Page} htmlPage
 * @param {Page} wpPage
 * @param {object} section — verify config section
 * @param {object} pageConfig — full page config (for decorationSelectors)
 * @param {boolean} verbose
 * @returns {{findings: Array, fixable: Array}}
 */
async function runDecoPresenceAudit(htmlPage, wpPage, section, pageConfig, verbose) {
  const result = { findings: [], fixable: [] };
  const htmlSelector = section.htmlSelector;
  const wpSelector = section.wpSelector;
  if (!htmlSelector || !wpSelector) return result;

  const [htmlDecos, wpDecos] = await Promise.all([
    htmlPage.evaluate(DECO_DISCOVER_FN, htmlSelector, DECO_SELECTOR),
    wpPage.evaluate(DECO_DISCOVER_FN, wpSelector, DECO_SELECTOR),
  ]);

  // Match decoration elements by className similarity, then by structural role
  const usedWp = new Set();
  const matchedPairs = [];
  const unmatchedHtmlDecos = [];

  for (const hd of htmlDecos) {
    const hClasses = new Set(hd.className.split(/\s+/).filter(Boolean));
    let bestIdx = -1;
    let bestScore = 0;
    for (let i = 0; i < wpDecos.length; i++) {
      if (usedWp.has(i)) continue;
      const wClasses = new Set(wpDecos[i].className.split(/\s+/).filter(Boolean));
      let overlap = 0;
      for (const c of hClasses) if (wClasses.has(c)) overlap++;
      if (overlap > bestScore) { bestScore = overlap; bestIdx = i; }
    }
    if (bestIdx >= 0 && bestScore > 0) {
      matchedPairs.push({ html: hd, wp: wpDecos[bestIdx] });
      usedWp.add(bestIdx);
    } else {
      unmatchedHtmlDecos.push(hd);
    }
  }

  // Fallback: pair unmatched HTML decos with unmatched WP decos by structural role
  // (both are decoration elements with similar bg-image/opacity patterns — e.g. dw-d-bg ↔ int-deco)
  const unmatchedWpIdxs = [];
  for (let i = 0; i < wpDecos.length; i++) {
    if (!usedWp.has(i)) unmatchedWpIdxs.push(i);
  }
  const stillUnmatchedHtml = [];
  const usedWpFallback = new Set();
  for (const hd of unmatchedHtmlDecos) {
    const hHasBg = hd.bgImage !== 'none' && hd.bgImage !== '';
    let paired = false;
    for (const wi of unmatchedWpIdxs) {
      if (usedWpFallback.has(wi)) continue;
      const wd = wpDecos[wi];
      const wHasBg = wd.bgImage !== 'none' && wd.bgImage !== '';
      // Both have background-image → likely same decoration with different class names
      if (hHasBg && wHasBg) {
        matchedPairs.push({ html: hd, wp: wd });
        usedWp.add(wi);
        usedWpFallback.add(wi);
        paired = true;
        break;
      }
    }
    if (!paired) stillUnmatchedHtml.push(hd);
  }

  for (const hd of stillUnmatchedHtml) {
    // Skip intentionally hidden elements (display:none, wave-flow with 0 height)
    if (hd.display === 'none' || (hd.width === 0 && hd.height === 0)) continue;
    result.fixable.push({
      category: 'DECORATION_MISSING',
      element: hd.className,
      note: `HTML has decoration .${hd.className.split(/\s+/)[0]} but WP section has no match`,
      fix: `Add decoration element to builder blocks() — use superD.html() for Super D, or add wave/grain markup`,
    });
  }

  // WP has decoration but HTML doesn't
  for (let i = 0; i < wpDecos.length; i++) {
    if (usedWp.has(i)) continue;
    const wd = wpDecos[i];
    if (wd.display === 'none' || (wd.width === 0 && wd.height === 0)) continue;
    result.findings.push({
      id: 'P3', label: `Extra WP decoration: ${wd.className}`, status: 'WARN',
      note: `WP has .${wd.className.split(/\s+/)[0]} but HTML section doesn't — may be intentional`,
    });
  }

  // Check matched pairs
  for (const pair of matchedPairs) {
    const { html: hd, wp: wd } = pair;
    const label = hd.className.split(/\s+/)[0] || 'decoration';

    // Check 1: background-image resolvability
    const hHasBg = hd.bgImage !== 'none' && hd.bgImage !== '';
    const wHasBg = wd.bgImage !== 'none' && wd.bgImage !== '';
    if (hHasBg && !wHasBg) {
      result.fixable.push({
        category: 'DECORATION_BG_MISSING',
        element: label,
        note: `HTML .${label} has background-image but WP version shows none`,
        fix: `Convert to Base64: run \`node divi5/lib/retrofit-sections.js --scope super-d --live\` or use superD.css('${label}', {...})`,
      });
    } else if (wHasBg && /url\(["'](?!data:|https?:)/.test(wd.bgImage)) {
      result.fixable.push({
        category: 'DECORATION_BG_UNRESOLVABLE',
        element: label,
        note: `WP .${label} has relative file path in background-image (won't resolve on WordPress)`,
        fix: `Convert to Base64: run \`node divi5/lib/retrofit-sections.js --scope super-d --live\` — relative url('assets/...') paths don't work in WP Code Modules`,
      });
    }

    // Check 2: visibility (opacity > 0, display !== none, non-zero area)
    if (parseFloat(wd.opacity) === 0 && parseFloat(hd.opacity) > 0) {
      result.fixable.push({
        category: 'DECORATION_INVISIBLE',
        element: label,
        note: `WP .${label} has opacity:0 but HTML version has opacity:${hd.opacity}`,
        fix: `Set opacity:${hd.opacity} on .${label} in builder css()`,
      });
    }
    if (wd.display === 'none' && hd.display !== 'none') {
      result.fixable.push({
        category: 'DECORATION_HIDDEN',
        element: label,
        note: `WP .${label} has display:none but HTML version is visible`,
        fix: `Remove display:none from .${label} in builder css()`,
      });
    }
    if (wd.width === 0 && wd.height === 0 && (hd.width > 0 || hd.height > 0)) {
      result.fixable.push({
        category: 'DECORATION_ZERO_SIZE',
        element: label,
        note: `WP .${label} has zero dimensions (${wd.width}x${wd.height}) but HTML is ${hd.width}x${hd.height}`,
        fix: `Check width/min-height on .${label} — may need explicit sizing`,
      });
    }

    // Check 4: SVG variant comparison — decode Base64 and compare content
    if (hHasBg && wHasBg) {
      const extractB64Content = (bgStr) => {
        const m = bgStr.match(/data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/);
        if (!m) return null;
        try { return Buffer.from(m[1], 'base64').toString('utf8').substring(0, 200); }
        catch (_) { return null; }
      };
      const htmlSvg = extractB64Content(hd.bgImage);
      const wpSvg = extractB64Content(wd.bgImage);
      if (htmlSvg && wpSvg && htmlSvg !== wpSvg) {
        // Identify variants by distinctive SVG content
        const identifyVariant = (svgSnippet) => {
          if (svgSnippet.includes('gradient')) return 'gradient';
          if (svgSnippet.includes('particle') || svgSnippet.includes('circle')) return 'particle';
          return 'outline';
        };
        const htmlVariant = identifyVariant(htmlSvg);
        const wpVariant = identifyVariant(wpSvg);
        result.fixable.push({
          category: 'DECORATION_SVG_VARIANT_MISMATCH',
          element: label,
          note: `SVG content differs: HTML uses '${htmlVariant}' variant, WP uses '${wpVariant}'`,
          fix: `Change variant in superD.css() call from '${wpVariant}' to '${htmlVariant}'`,
          property: 'background-image',
          htmlValue: `Super D ${htmlVariant}`,
          wpValue: `Super D ${wpVariant}`,
        });
      }
    }
  }

  // Phase 3b: Pseudo-element auto-discovery on section wrapper
  // Only checks the wrapper element itself (not all children — red team constraint)
  const PSEUDO_DISCOVER_FN = function(wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return null;
    const results = {};
    for (const pseudo of ['::before', '::after']) {
      const cs = window.getComputedStyle(wrapper, pseudo);
      results[pseudo] = {
        content: cs.content,
        bgImage: cs.backgroundImage,
        height: cs.height,
        bgSize: cs.backgroundSize,
        display: cs.display,
        opacity: cs.opacity,
      };
    }
    return results;
  };

  try {
    const [htmlPseudos, wpPseudos] = await Promise.all([
      htmlPage.evaluate(PSEUDO_DISCOVER_FN, htmlSelector),
      wpPage.evaluate(PSEUDO_DISCOVER_FN, wpSelector),
    ]);

    if (htmlPseudos && wpPseudos) {
      for (const pseudo of ['::before', '::after']) {
        const hp = htmlPseudos[pseudo];
        const wp = wpPseudos[pseudo];
        if (!hp || !wp) continue;

        const htmlHasContent = hp.content && hp.content !== 'none' && hp.content !== 'normal' && hp.content !== '""';
        const wpHasContent = wp.content && wp.content !== 'none' && wp.content !== 'normal' && wp.content !== '""';
        const htmlHasBg = hp.bgImage && hp.bgImage !== 'none';

        // HTML has a visible pseudo-element but WP doesn't
        if ((htmlHasContent || htmlHasBg) && !wpHasContent && !wp.bgImage?.includes('url(')) {
          result.fixable.push({
            category: 'PSEUDO_ELEMENT_MISSING',
            element: `${section.name} wrapper${pseudo}`,
            note: `HTML wrapper has ${pseudo} (content: ${hp.content}, bg: ${htmlHasBg ? 'yes' : 'no'}) but WP wrapper does not`,
            fix: `Add ${pseudo} CSS for section wrapper — check for grain overlay, gradient stripe, or decorative bar`,
          });
        }
        // Both have pseudo-elements — compare background-image if present
        else if (htmlHasBg && wp.bgImage && wp.bgImage !== 'none') {
          if (hp.bgImage !== wp.bgImage && hp.height !== wp.height) {
            result.findings.push({
              id: 'P3b', label: `Pseudo ${pseudo} style mismatch`, status: 'WARN',
              note: `Wrapper ${pseudo} differs: HTML height=${hp.height}, WP height=${wp.height}`,
            });
          }
        }
      }
    }
  } catch (_) { /* Puppeteer evaluation can fail on some pages — non-fatal */ }

  // Check page-level decorationSelectors (explicit pseudo-element spot checks)
  const decoSelectors = (pageConfig.verify && pageConfig.verify.decorationSelectors) || [];
  for (const ds of decoSelectors) {
    // Check if this selector's section matches current section
    // Only run if the selector is within the current section's scope
    const [htmlExists, wpExists] = await Promise.all([
      htmlPage.evaluate((wrapSel, sel) => {
        const wrapper = document.querySelector(wrapSel);
        if (!wrapper) return false;
        return !!wrapper.querySelector(sel);
      }, htmlSelector, ds.selector),
      wpPage.evaluate((wrapSel, sel) => {
        const wrapper = document.querySelector(wrapSel);
        if (!wrapper) return false;
        return !!wrapper.querySelector(sel);
      }, wpSelector, ds.selector),
    ]);

    if (htmlExists && !wpExists) {
      result.fixable.push({
        category: 'DECORATION_MISSING',
        element: ds.label || ds.selector,
        note: `${ds.label || ds.selector} exists in HTML but missing in WP`,
        fix: `Add ${ds.selector} element to builder blocks() with proper Super D Base64 injection`,
      });
    } else if (htmlExists && wpExists && ds.minOpacity !== undefined) {
      // Check opacity meets minimum
      const wpOpacity = await wpPage.evaluate((wrapSel, sel) => {
        const wrapper = document.querySelector(wrapSel);
        if (!wrapper) return null;
        const el = wrapper.querySelector(sel);
        if (!el) return null;
        return window.getComputedStyle(el).opacity;
      }, wpSelector, ds.selector);
      if (wpOpacity !== null && parseFloat(wpOpacity) < ds.minOpacity) {
        result.fixable.push({
          category: 'DECORATION_LOW_OPACITY',
          element: ds.label || ds.selector,
          note: `${ds.label} opacity ${wpOpacity} is below minimum ${ds.minOpacity}`,
          fix: `Set opacity >= ${ds.minOpacity} on ${ds.selector}`,
        });
      }
    }
  }

  return result;
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
  const noAutodiscover = args.includes('--no-autodiscover');
  const autodiscoverOnly = args.includes('--autodiscover-only');

  const mode = noAutodiscover ? 'manual only' : autodiscoverOnly ? 'auto-discovery only' : 'manual + auto-discovery';

  console.log(`\n╔${'═'.repeat(58)}╗`);
  console.log(`║  FIDELITY CHECK — ${pageName}${sectionFilter ? ` (section: ${sectionFilter})` : ''}`.padEnd(59) + '║');
  console.log(`╚${'═'.repeat(58)}╝`);
  console.log(`  Mode: ${mode} | Properties: ${ELEMENT_PROPERTIES.length}`);
  if (!noAutodiscover) {
    console.log(`  Phase 2: Auto-discovery ON — finds ALL visible text elements per section`);
    console.log(`  Phase 3: Decorative audit ON — checks Super D, grain, wave, particle presence`);
    console.log(`  Phase 4: Visual elements ON — checks gradients, shadows, borders, backgrounds`);
  }

  const autoFix = args.includes('--auto-fix');

  run({ pageName, sectionFilter, verbose, noAutodiscover, autodiscoverOnly })
    .then(async (report) => {
      if (autoFix && report.summary.fail > 0) {
        console.log('\n  ── Auto-fix triggered (--auto-fix flag) ──');
        const { execSync } = require('child_process');
        const fixArgs = ['--page', pageName];
        if (sectionFilter) fixArgs.push('--section', sectionFilter);
        fixArgs.push('--max-iterations', '2');
        try {
          execSync(`node ${path.join(__dirname, 'auto-fix.js')} ${fixArgs.join(' ')}`, { stdio: 'inherit', timeout: 600000 });
        } catch (e) {
          // auto-fix handles its own exit codes
        }
      }
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

module.exports = { run, matchElements, normalizeText, ELEMENT_PROPERTIES };
