/**
 * content-parity.js — Gate 1: Compare HTML prototype text against Divi 5 rendered output
 *
 * Checks that every heading, CTA, and stat from the HTML prototype appears in the Divi 5 build.
 * Scopes extraction to <main> content only (excludes global header/footer).
 * Does NOT compare pixel rendering — only text content parity.
 */

const fs = require('fs');

/**
 * Extract the <main> content from HTML, or fall back to full page
 * This excludes global header/footer elements (mega menu CTAs, etc.)
 */
function scopeToMain(html) {
  // Try <main> tag first (used by HTML prototypes)
  const mainMatch = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
  if (mainMatch) return mainMatch[1];

  // For Divi 5 rendered pages: strip <header> and <footer> if present
  let scoped = html;
  scoped = scoped.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
  scoped = scoped.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  return scoped;
}

/**
 * Extract text content from headings, buttons, and stats in HTML
 * @param {string} html - Raw HTML string (scoped to main content)
 * @returns {{ headings: string[], ctas: string[], stats: string[] }}
 */
function extractContent(html) {
  const scoped = scopeToMain(html);
  const headings = [];
  const ctas = [];
  const stats = [];

  // Extract H1-H3 text (strip HTML tags inside)
  const hRegex = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  let match;
  while ((match = hRegex.exec(scoped)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) headings.push(text);
  }

  // Extract button/CTA text (elements with btn/cta class or <a> inside btn containers)
  const btnRegex = /class="[^"]*(?:btn|cta)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
  while ((match = btnRegex.exec(scoped)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) ctas.push(text);
  }

  // Extract stat numbers (elements with stat-number/stats-number class)
  const statRegex = /class="[^"]*stat[s]?-number[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  while ((match = statRegex.exec(scoped)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) stats.push(text);
  }

  return { headings, ctas, stats };
}

/**
 * Normalize text for comparison
 * Strips smart quotes, HTML entities, collapses whitespace, lowercases
 */
function normalize(s) {
  return s
    .replace(/[\u201c\u201d\u201e\u201f\u2018\u2019\u2032\u2033\u00ab\u00bb"']/g, '') // all quotes
    .replace(/&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/gi, '') // HTML entities
    .replace(/<[^>]+>/g, '') // stray HTML tags
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

/**
 * Compare prototype content against rendered Divi 5 page content
 * @param {string} prototypeHtml - Raw HTML of prototype file
 * @param {string} renderedHtml - Raw HTML of Divi 5 rendered page
 * @returns {{ pass: boolean, results: Array<{check: string, status: string, detail: string}> }}
 */
function compare(prototypeHtml, renderedHtml) {
  const proto = extractContent(prototypeHtml);
  const rendered = extractContent(renderedHtml);
  const results = [];

  // Also search full rendered text for fallback matching
  const renderedText = normalize(renderedHtml);

  // Check headings
  for (const h of proto.headings) {
    const normalized = normalize(h);
    if (!normalized) continue; // skip empty headings

    // First: try matching against extracted headings (70% word match)
    let found = rendered.headings.some(rh => {
      const rNorm = normalize(rh);
      const protoWords = normalized.split(' ').filter(w => w.length > 1);
      if (protoWords.length === 0) return true;
      const matchCount = protoWords.filter(w => rNorm.includes(w)).length;
      return matchCount / protoWords.length >= 0.7;
    });

    // Fallback: search the full rendered text for the key words
    if (!found) {
      const protoWords = normalized.split(' ').filter(w => w.length > 2);
      if (protoWords.length > 0) {
        const matchCount = protoWords.filter(w => renderedText.includes(w)).length;
        found = matchCount / protoWords.length >= 0.8;
      }
    }

    results.push({
      check: `Heading: "${h.substring(0, 60)}${h.length > 60 ? '...' : ''}"`,
      status: found ? 'PASS' : 'FAIL',
      detail: found ? 'Found in Divi 5 output' : 'MISSING from Divi 5 output',
    });
  }

  // Check CTAs
  for (const cta of proto.ctas) {
    const normalized = normalize(cta);
    if (!normalized || normalized.length > 50) continue; // skip empty or overly long (likely captured too much)

    // Match by exact normalized text or by key words in the full rendered output
    let found = rendered.ctas.some(rc => normalize(rc) === normalized);
    if (!found) {
      // Fallback: check if the CTA text exists anywhere in the rendered page
      found = renderedText.includes(normalized);
    }

    results.push({
      check: `CTA: "${cta.substring(0, 40)}${cta.length > 40 ? '...' : ''}"`,
      status: found ? 'PASS' : 'FAIL',
      detail: found ? 'Found' : 'MISSING',
    });

    // C3 check: no "demo" in CTA text
    if (/demo/i.test(cta)) {
      results.push({
        check: `C3: CTA "${cta}" contains "demo"`,
        status: 'FAIL',
        detail: 'PRD forbids demo CTAs',
      });
    }
  }

  // Check stats
  for (const stat of proto.stats) {
    const normalized = normalize(stat);
    // Dynamic year: allow current year - 1982
    const currentYear = new Date().getFullYear() - 1982;
    const isYearStat = /^\d{2}$/.test(stat.trim());

    const found = rendered.stats.some(rs => {
      const rNorm = normalize(rs);
      if (isYearStat) {
        return rNorm === String(currentYear) || rNorm === normalized;
      }
      return rNorm === normalized;
    }) || renderedText.includes(normalized); // fallback to full text search

    results.push({
      check: `Stat: "${stat}"`,
      status: found ? 'PASS' : 'FAIL',
      detail: found ? 'Found' : 'MISSING',
    });
  }

  const pass = results.every(r => r.status === 'PASS');
  return { pass, results };
}

module.exports = { extractContent, compare, normalize, scopeToMain };
