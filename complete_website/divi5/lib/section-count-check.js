/**
 * section-count-check.js — Gate 0: HTML section count vs page config
 *
 * Counts <section> elements in the HTML prototype and compares against
 * the sections array in the page config. Fails build if counts don't match.
 *
 * Why this exists: The scaffold-builder and manual section creation can
 * silently drop sections. Gate 1 (content-parity) can't catch this because
 * Divi renders Code Modules client-side (curl gets empty modules).
 *
 * Usage:
 *   const { check } = require('./lib/section-count-check');
 *   const result = check(pageConfig);
 *   // result: { pass, htmlCount, configCount, htmlSections, configSections, missing, extra }
 */

const fs = require('fs');
const path = require('path');

/**
 * Extract section info from HTML prototype.
 * Looks for <section> tags and captures class/id/first-heading.
 */
function extractHtmlSections(htmlPath) {
  if (!fs.existsSync(htmlPath)) return [];

  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Extract content between <main> tags if present (skip header/footer)
  // Also include sections outside <main> but before <footer> (like related-solutions)
  const footerIdx = html.indexOf('<footer');
  const headerEndIdx = html.indexOf('</header>');
  const searchArea = footerIdx > 0
    ? html.substring(headerEndIdx > 0 ? headerEndIdx : 0, footerIdx)
    : html;

  const sections = [];
  // Match <section with optional attributes, capture class and id
  const sectionRegex = /<section\b([^>]*)>/gi;
  let match;

  while ((match = sectionRegex.exec(searchArea)) !== null) {
    const attrs = match[1];
    const classMatch = attrs.match(/class="([^"]*)"/);
    const idMatch = attrs.match(/id="([^"]*)"/);
    const className = classMatch ? classMatch[1] : '';
    const id = idMatch ? idMatch[1] : '';

    // Find the first h1/h2/h3 inside this section (up to next </section> or next <section>)
    const afterSection = searchArea.substring(match.index + match[0].length);
    const nextSectionIdx = afterSection.search(/<\/?section/i);
    const sectionContent = nextSectionIdx > 0 ? afterSection.substring(0, nextSectionIdx) : afterSection.substring(0, 2000);
    const headingMatch = sectionContent.match(/<h[1-3][^>]*>([^<]*(?:<[^/][^>]*>[^<]*)*)<\/h[1-3]>/i);
    const heading = headingMatch ? headingMatch[1].replace(/<[^>]+>/g, '').trim().substring(0, 80) : '';

    sections.push({
      class: className,
      id,
      heading,
      identifier: id || className || heading || `section-${sections.length}`,
    });
  }

  return sections;
}

/**
 * Check section count parity.
 * @param {Object} pageConfig - The page config object from pages/<page>.js
 * @returns {Object} { pass, htmlCount, configCount, htmlSections, configSections, missing, extra, warnings }
 */
function check(pageConfig) {
  const htmlPath = pageConfig.prototypePath;
  if (!htmlPath || !fs.existsSync(htmlPath)) {
    return {
      pass: false,
      error: `HTML prototype not found: ${htmlPath}`,
      htmlCount: 0,
      configCount: pageConfig.sections ? pageConfig.sections.length : 0,
    };
  }

  const htmlSections = extractHtmlSections(htmlPath);
  const configSections = (pageConfig.sections || []).map(s => s.name);
  const htmlCount = htmlSections.length;
  const configCount = configSections.length;

  const warnings = [];

  // Try to match HTML sections to config sections by heading/class similarity
  const matched = new Set();
  const missing = []; // In HTML but not in config

  for (const hs of htmlSections) {
    let found = false;
    for (let i = 0; i < configSections.length; i++) {
      if (matched.has(i)) continue;
      const cn = configSections[i].toLowerCase();
      const hc = hs.class.toLowerCase();
      const hh = hs.heading.toLowerCase();
      const hi = hs.id.toLowerCase();
      // Fuzzy match: config name appears in class, id, or heading
      if (hc.includes(cn) || hi.includes(cn) || hh.includes(cn) ||
          cn.includes(hc.split(/[-_ ]/)[0]) || cn.includes(hi.split(/[-_ ]/)[0])) {
        matched.add(i);
        found = true;
        break;
      }
    }
    if (!found) {
      missing.push(hs);
    }
  }

  const extra = configSections.filter((_, i) => !matched.has(i));
  const pass = htmlCount === configCount;

  return {
    pass,
    htmlCount,
    configCount,
    htmlSections: htmlSections.map(s => ({ class: s.class, heading: s.heading })),
    configSections,
    missing, // HTML sections with no config match
    extra,   // Config sections with no HTML match
    warnings,
  };
}

/**
 * Print a formatted report.
 */
function printReport(result, pageName) {
  const status = result.pass ? '✓' : '✗';
  const color = result.pass ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';

  console.log(`\n${color}${status} Gate 0: Section Count Parity${reset} — ${pageName}`);
  console.log(`  HTML sections: ${result.htmlCount} | Config sections: ${result.configCount}`);

  if (result.error) {
    console.log(`  Error: ${result.error}`);
    return;
  }

  if (!result.pass) {
    if (result.missing.length > 0) {
      console.log(`  ⚠ In HTML but NOT in config (${result.missing.length}):`);
      for (const m of result.missing) {
        console.log(`    - class="${m.class}" heading="${m.heading}"`);
      }
    }
    if (result.extra.length > 0) {
      console.log(`  ⚠ In config but NOT in HTML (${result.extra.length}):`);
      for (const e of result.extra) {
        console.log(`    - "${e}"`);
      }
    }
  }

  if (result.pass) {
    console.log(`  All ${result.htmlCount} sections accounted for.`);
  }
}

// CLI mode
if (require.main === module) {
  const args = process.argv.slice(2);
  const pageFlag = args.indexOf('--page');
  const pageName = pageFlag >= 0 ? args[pageFlag + 1] : null;

  if (!pageName) {
    console.error('Usage: node section-count-check.js --page <pageName>');
    process.exit(1);
  }

  const configPath = path.join(__dirname, '..', 'pages', `${pageName}.js`);
  if (!fs.existsSync(configPath)) {
    console.error(`Page config not found: ${configPath}`);
    process.exit(1);
  }

  const pageConfig = require(configPath);
  const result = check(pageConfig);
  printReport(result, pageName);

  if (!result.pass) {
    process.exit(1);
  }
}

module.exports = { check, printReport, extractHtmlSections };
