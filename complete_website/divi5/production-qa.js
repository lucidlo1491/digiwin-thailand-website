#!/usr/bin/env node
/**
 * production-qa.js — Quick post-push QA for production (digiwin.co.th)
 *
 * Runs 3 fast checks per page using Playwright at mobile viewport (390px):
 *   1. Horizontal overflow detection
 *   2. Literal "\n" in body text (broken Divi rendering)
 *   3. Missing sections (< 3 sections = warning)
 *
 * Usage:
 *   node production-qa.js --page news
 *   node production-qa.js --page th-home
 *   node production-qa.js --all
 *   node production-qa.js --all --desktop    # 1440px instead of 390px
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITE = 'https://digiwin.co.th';
const MOBILE_WIDTH = 390;
const DESKTOP_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;
const TIMEOUT = 30000;

// ── URL map: page config name → production URL path ──
// Built from breadcrumb `url:` in each page config
const URL_MAP = {
  home:                           '/',
  erp:                            '/products/erp/',
  mes:                            '/products/mes/',
  wms:                            '/products/wms/',
  aiot:                           '/products/aiot/',
  products:                       '/products/',
  automotive:                     '/industries/automotive/',
  electronics:                    '/industries/electronics/',
  'metal-plastics':               '/industries/metal-plastics/',
  industries:                     '/industries/',
  'partner-program':              '/partner-program/',
  'partner-economics':            '/partner-program/economics/',
  'partner-business-model':       '/partner-program/business-model/',
  'partner-solutions':            '/partner-program/solutions/',
  about:                          '/about/',
  'case-studies':                  '/case-studies/',
  news:                           '/news/',
  'events-listing':               '/news/events/',
  blog:                           '/blog/',
  demo:                           '/demo/',
  'privacy-policy':               '/privacy-policy/',
  terms:                          '/terms/',
  'boi-compliance-workshop':      '/boi-compliance-workshop/',
  'manufacturing-expo-2026':      '/manufacturing-expo-2026/',
  'factory-tour-mes':             '/factory-tour-mes/',
  'production-transparency-seminar': '/production-transparency-seminar/',
  'shop-floor-data-workshop':     '/shop-floor-data-workshop/',
  'intelligent-asia-2026':        '/intelligent-asia-2026/',
};

// Thai pages mirror English with /th/ prefix
const TH_PAGES = [
  'home', 'erp', 'mes', 'wms', 'aiot', 'products',
  'automotive', 'electronics', 'metal-plastics', 'industries',
  'partner-program', 'partner-economics', 'partner-business-model', 'partner-solutions',
  'about', 'case-studies', 'news', 'events-listing', 'blog',
  'privacy-policy', 'terms',
  'boi-compliance-workshop', 'manufacturing-expo-2026', 'factory-tour-mes',
  'production-transparency-seminar', 'shop-floor-data-workshop',
  'intelligent-asia-2026',
];

for (const p of TH_PAGES) {
  if (URL_MAP[p]) {
    const thPath = URL_MAP[p] === '/' ? '/th/' : `/th${URL_MAP[p]}`;
    URL_MAP[`th-${p}`] = thPath;
  }
}

// ── CLI ──
const args = process.argv.slice(2);
const pageArg = args.includes('--page') ? args[args.indexOf('--page') + 1] : null;
const allPages = args.includes('--all');
const desktop = args.includes('--desktop');
const verbose = args.includes('--verbose');

if (!pageArg && !allPages) {
  console.log('Usage: node production-qa.js --page <name> | --all [--desktop] [--verbose]');
  console.log('Pages:', Object.keys(URL_MAP).sort().join(', '));
  process.exit(0);
}

const pagesToCheck = allPages
  ? Object.keys(URL_MAP)
  : pageArg.split(',').map(p => p.trim());

// Validate page names
for (const p of pagesToCheck) {
  if (!URL_MAP[p]) {
    console.error(`Unknown page: "${p}". Available: ${Object.keys(URL_MAP).sort().join(', ')}`);
    process.exit(1);
  }
}

// ── Checks ──
async function checkPage(page, name, urlPath) {
  const url = `${SITE}${urlPath}`;
  const results = { name, url, pass: true, checks: [] };

  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    const status = res?.status() || 0;
    if (status >= 400) {
      results.checks.push({ check: 'HTTP status', pass: false, detail: `${status}` });
      results.pass = false;
      return results;
    }

    // Wait for Divi sections to render
    await page.waitForTimeout(2000);

    // 1. Horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    results.checks.push({
      check: 'Horizontal overflow',
      pass: !overflow,
      detail: overflow ? `scrollWidth ${await page.evaluate(() => document.documentElement.scrollWidth)}px > clientWidth ${await page.evaluate(() => document.documentElement.clientWidth)}px` : 'OK',
    });
    if (overflow) results.pass = false;

    // 2. Literal \n in body text
    const brokenNewlines = await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const found = [];
      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent;
        if (text.includes('\\n') && !node.parentElement?.closest('script, style, code, pre')) {
          const snippet = text.trim().substring(0, 80);
          if (snippet) found.push(snippet);
        }
      }
      return found.slice(0, 5);
    });
    results.checks.push({
      check: 'Visible \\n text',
      pass: brokenNewlines.length === 0,
      detail: brokenNewlines.length ? `${brokenNewlines.length} found: "${brokenNewlines[0]}"` : 'OK',
    });
    if (brokenNewlines.length) results.pass = false;

    // 3. Section count
    const sectionCount = await page.evaluate(() => {
      return document.querySelectorAll('section, .et_pb_section').length;
    });
    const tooFew = sectionCount < 3;
    results.checks.push({
      check: 'Section count',
      pass: !tooFew,
      detail: `${sectionCount} sections${tooFew ? ' (expected >= 3)' : ''}`,
    });
    if (tooFew) results.pass = false;

  } catch (err) {
    results.checks.push({ check: 'Navigation', pass: false, detail: err.message.substring(0, 100) });
    results.pass = false;
  }

  return results;
}

// ── Main ──
(async () => {
  const width = desktop ? DESKTOP_WIDTH : MOBILE_WIDTH;
  console.log(`\nProduction QA — ${SITE} @ ${width}px`);
  console.log('─'.repeat(50));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width, height: VIEWPORT_HEIGHT } });
  const page = await context.newPage();

  let failCount = 0;
  const allResults = [];

  for (const name of pagesToCheck) {
    const r = await checkPage(page, name, URL_MAP[name]);
    allResults.push(r);
    if (!r.pass) failCount++;

    const icon = r.pass ? 'PASS' : 'FAIL';
    const details = r.checks
      .filter(c => !c.pass || verbose)
      .map(c => `${c.pass ? '  ok' : '  FAIL'} ${c.check}: ${c.detail}`)
      .join('\n');
    console.log(`\n${icon}  ${name}  ${r.url}`);
    if (details) console.log(details);
  }

  await browser.close();

  // Summary
  console.log('\n' + '─'.repeat(50));
  console.log(`${allResults.length} pages checked: ${allResults.length - failCount} PASS, ${failCount} FAIL`);

  process.exit(failCount > 0 ? 1 : 0);
})();
