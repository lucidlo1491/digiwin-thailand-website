#!/usr/bin/env node
/**
 * redirect-qa.js — 301 Redirect Verification
 *
 * Tests all 64 explicit redirects + regex catch-all patterns against
 * the live WordPress site (LocalWP).
 *
 * Usage:
 *   node complete_website/divi5/redirect-qa.js          # test all
 *   node complete_website/divi5/redirect-qa.js --verbose # show each test
 *
 * Exit: 0 = all pass, 1 = failures found
 */

const { execSync } = require('child_process');

const VERBOSE = process.argv.includes('--verbose');
const BASE = 'http://digiwin-thailand.local';

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', b: '\x1b[1m', d: '\x1b[2m', x: '\x1b[0m' };

// ── Explicit redirects (64) ──────────────────────────────────
const EXPLICIT = [
  // Product Pages (6)
  ['/erp/', '/products/erp/'],
  ['/workflowerp-igp/', '/products/erp/'],
  ['/smes/', '/products/mes/'],
  ['/shop-floor-tracking-system/', '/products/mes/'],
  ['/sfls/', '/products/wms/'],
  ['/it-outsourcing/', '/products/'],

  // Industry Pages (5)
  ['/industry/', '/industries/'],
  ['/industry/automotive-parts/', '/industries/automotive/'],
  ['/industry/metal/', '/industries/metal-plastics/'],
  ['/industry/plastic/', '/industries/metal-plastics/'],
  ['/industry/furniture/', '/industries/'],

  // Hub & Category Pages (10)
  ['/resources/', '/blog/'],
  ['/resource/', '/blog/'],
  ['/resources/cate/articles/', '/blog/'],
  ['/resources/cate/case-studies/', '/case-studies/'],
  ['/resources/cate/events/', '/news/events/'],
  ['/news/cate/news/', '/news/'],
  ['/news/cate/career/', '/about-us/'],
  ['/resource/page/2/', '/blog/'],
  ['/resource/page/3/', '/blog/'],
  ['/resource/page/4/', '/blog/'],

  // English Articles → Blog or Product Pages (3)
  ['/resource/benefits-of-erp-system-for-business/', '/blog/'],
  ['/resource/wms-barcode/', '/products/wms/'],
  ['/resource/digiwin-erp-digiwin-erp/', '/products/erp/'],

  // English Case Studies → Case Studies (12)
  ['/resource/case-study-mufu-technologies-co-ltd/', '/case-studies/'],
  ['/resource/mufu-workflow-erp-success/', '/case-studies/'],
  ['/resource/casestudy-thai-hosheng-erp/', '/case-studies/'],
  ['/resource/thai-hosheng-erp-success-story/', '/case-studies/'],
  ['/resource/thaialpha-wferp-case-study/', '/case-studies/'],
  ['/resource/thaialpha-wferp-case-study-cn/', '/case-studies/'],
  ['/resource/case-study-mr-ken/', '/case-studies/'],
  ['/resource/case-study-de-poen-pneumatic-taiwan/', '/case-studies/'],
  ['/resource/case-study-ginfong-precision-industry/', '/case-studies/'],
  ['/resource/case-study-hoo-chin-electronics-co-ltd/', '/case-studies/'],
  ['/resource/case-study-srang-sern-co-ltd/', '/case-studies/'],
  ['/resource/taiyo-fastener-thailand-co-ltd/', '/case-studies/'],

  // Thai Articles → Blog (9)
  ['/resource/erp-%e0%b8%84%e0%b8%b7%e0%b8%ad%e0%b8%ad%e0%b8%b0%e0%b9%84%e0%b8%a3/', '/blog/'],
  ['/resource/%e0%b8%97%e0%b8%b3%e0%b9%84%e0%b8%a1%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b9%8c%e0%b8%81%e0%b8%a3%e0%b8%84%e0%b8%a7%e0%b8%a3%e0%b9%83%e0%b8%8a%e0%b9%89%e0%b8%a3%e0%b8%b0%e0%b8%9a%e0%b8%9a-erp/', '/blog/'],
  ['/resource/%e0%b8%ad%e0%b8%a2%e0%b8%b2%e0%b8%81%e0%b9%83%e0%b8%8a%e0%b9%89%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%a3%e0%b8%b0%e0%b8%9a%e0%b8%9a-erp-%e0%b8%84%e0%b8%a7%e0%b8%a3%e0%b9%80%e0%b8%a3%e0%b8%b4%e0%b9%88/', '/blog/'],
  ['/resource/%e0%b9%80%e0%b8%a5%e0%b8%b7%e0%b8%ad%e0%b8%81-erp-%e0%b8%ad%e0%b8%a2%e0%b9%88%e0%b8%b2%e0%b8%87%e0%b9%84%e0%b8%a3%e0%b9%83%e0%b8%ab%e0%b9%89%e0%b9%80%e0%b8%ab%e0%b8%a1%e0%b8%b2%e0%b8%b0%e0%b8%aa/', '/blog/'],
  ['/resource/%e0%b9%83%e0%b8%8a%e0%b9%89%e0%b8%9b%e0%b8%a3%e0%b8%b0%e0%b9%82%e0%b8%a2%e0%b8%8a%e0%b8%99%e0%b9%8c%e0%b8%88%e0%b8%b2%e0%b8%81%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%88%e0%b8%b1%e0%b8%94%e0%b8%81%e0%b8%b2/', '/blog/'],
  ['/resource/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b9%81%e0%b8%95%e0%b8%81%e0%b8%95%e0%b9%88%e0%b8%b2%e0%b8%87%e0%b8%a3%e0%b8%b0%e0%b8%ab%e0%b8%a7%e0%b9%88%e0%b8%b2%e0%b8%87%e0%b8%95%e0%b9%89%e0%b8%99%e0%b8%97%e0%b8%b8/', '/blog/'],
  ['/resource/%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%95%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b8%aa%e0%b8%ad%e0%b8%9a%e0%b8%a3%e0%b8%b2%e0%b8%a2%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%97%e0%b8%b2%e0%b8%87%e0%b8%95%e0%b9%89%e0%b8%99/', '/blog/'],
  ['/resource/%e0%b8%84%e0%b8%b3%e0%b8%88%e0%b8%b3%e0%b8%81%e0%b8%b1%e0%b8%94%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%95%e0%b9%89%e0%b8%99%e0%b8%97%e0%b8%b8%e0%b8%99/', '/blog/'],
  ['/resource/%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%9c%e0%b8%aa%e0%b8%b2%e0%b8%99%e0%b8%a3%e0%b8%a7%e0%b8%a1%e0%b8%82%e0%b8%ad%e0%b8%87-it-%e0%b9%81%e0%b8%a5%e0%b8%b0-ot-%e0%b8%aa%e0%b8%b2%e0%b8%a1%e0%b8%b2%e0%b8%a3/', '/blog/'],

  // Thai Case Studies (2)
  ['/resource/digiwin-erp-%e0%b8%8a%e0%b9%88%e0%b8%a7%e0%b8%a2%e0%b9%83%e0%b8%ab%e0%b9%89%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%a9%e0%b8%b1%e0%b8%97dimet-siam%e0%b8%9e%e0%b8%b1%e0%b8%92%e0%b8%99%e0%b8%b2%e0%b8%84/', '/case-studies/'],
  ['/resource/workflow-erp%e0%b8%8a%e0%b9%88%e0%b8%a7%e0%b8%a2%e0%b9%83%e0%b8%ab%e0%b9%89%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%a9%e0%b8%b1%e0%b8%97lotus-pack-%e0%b8%9e%e0%b8%b1%e0%b8%92%e0%b8%99%e0%b8%b2%e0%b8%84/', '/case-studies/'],

  // Chinese Content (5)
  ['/resource/%e3%80%8a%e6%b3%b0%e5%9b%bd%e7%94%b5%e5%ad%90%e5%8f%91%e7%a5%a8%e6%8c%87%e5%8d%97%e3%80%8b%e7%ba%bf%e4%b8%8a%e7%a0%94%e8%ae%a8%e4%bc%9a/', '/news/events/'],
  ['/resource/%e6%b3%b0%e5%9b%bd%e5%88%b6%e9%80%a0%e4%bc%81%e4%b8%9a%e7%9a%84boi%e5%90%88%e8%a7%84%e4%b8%8e%e6%95%b0%e4%bd%8d%e8%bd%ac%e5%9e%8b%e5%85%b3%e9%94%ae%e8%a7%a3%e6%9e%90%ef%bd%9c%e7%ba%bf%e4%b8%8a/', '/news/events/'],
  ['/resource/%e7%be%8e%e5%9b%bd%e5%85%b3%e7%a8%8e%e6%96%b0%e5%b1%80%e4%b8%8b%e5%9c%a8%e6%b3%b0%e5%88%b6%e9%80%a0%e4%b8%9a%e7%9a%84%e6%9c%ba%e9%81%87%e4%b8%8e%e5%9b%a0%e5%ba%94%e3%80%90%e4%ba%a7%e8%af%81%e7%af%87/', '/news/events/'],
  ['/resource/6-19%e6%b3%b0%e5%9b%bd%e9%bc%8e%e6%8d%b7%e3%80%90%e6%b3%b0%e5%9b%bd%e6%96%b0%e5%8e%82%e5%9f%ba%e5%bb%ba%e7%9a%84%e6%9c%80%e5%90%8e%e4%b8%80%e5%93%a9%e8%b7%af%e3%80%91/', '/news/events/'],
  ['/resource/erp%e8%88%87mes%e7%9a%84%e6%ad%a3%e7%a2%ba%e7%94%a8%e6%b3%95-%e6%a7%8b%e5%bb%ba%e5%b7%a5%e5%bb%a0%e6%95%b8%e4%bd%8d%e7%a9%bf%e9%80%8f%e5%bc%8f%e7%ae%a1%e7%90%86/', '/products/erp/'],

  // Events → News/Events (3)
  ['/resource/thailand-boi-2026-0128-webinar/', '/news/events/boi-compliance-workshop/'],
  ['/resource/digiwin-software-at-thailand-china-cooperation-expo-2025/', '/news/events/manufacturing-expo-2026/'],
  ['/resource/virtual-walk-through-in-5g-aiot-experience-experiment-basedigiwin-software-at-thailand-china-cooperation-expo-2025/', '/news/events/'],

  // News Posts (2)
  ['/news/digiwin-software-thailand-%e0%b8%a3%e0%b9%88%e0%b8%a7%e0%b8%a1%e0%b8%a1%e0%b8%b7%e0%b8%ad%e0%b8%81%e0%b8%b1%e0%b8%9a%e0%b8%aa%e0%b8%a1%e0%b8%b2%e0%b8%84%e0%b8%a1%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%84/', '/news/'],
  ['/news/system-cosulatant/', '/news/'],

  // Landing Pages (7)
  ['/thailand-boi-ebook-download/', '/blog/boi-compliance-jin-hai/'],
  ['/digiwin-software-smes-cpl/', '/products/mes/'],
  ['/thailand-erp-cpl/', '/products/erp/'],
  ['/e-tax-ebook-download/', '/blog/'],
  ['/factory-visit-luxin-technology-thailand/', '/news/events/factory-tour-mes/'],
  ['/odw20250710_boi/', '/news/events/boi-compliance-workshop/'],
  ['/%e9%9b%bb%e5%ad%90%e7%99%bc%e7%a5%a8/', '/blog/'],
];

// ── Regex catch-all tests ────────────────────────────────────
const REGEX_TESTS = [
  // Case study patterns
  ['/resource/case-study-unknown-company/', '/case-studies/', 'case-study- prefix catch-all'],
  ['/resource/casestudy-new-factory/', '/case-studies/', 'casestudy- prefix catch-all'],
  ['/resource/some-company-case-study/', '/case-studies/', '*-case-study suffix catch-all'],
  ['/resource/acme-erp-success/', '/case-studies/', '*-success catch-all'],
  ['/resource/factory-erp-success-story/', '/case-studies/', '*-success-story catch-all'],

  // /resource/ catch-all → /blog/
  ['/resource/random-article-about-erp/', '/blog/', '/resource/* catch-all'],
  ['/resource/some-new-post-2026/', '/blog/', '/resource/* catch-all (new)'],

  // /news/ catch-all (not /news/events/ or /news/cate/)
  ['/news/some-old-news-post/', '/news/', '/news/* catch-all'],
  ['/news/another-old-announcement/', '/news/', '/news/* catch-all (2)'],

  // /industry/ catch-all
  ['/industry/food-processing/', '/industries/', '/industry/* catch-all'],
  ['/industry/textiles/', '/industries/', '/industry/* catch-all (2)'],

  // Paginated resource pages
  ['/resource/page/5/', '/blog/', '/resource/page/N catch-all'],
  ['/resource/page/99/', '/blog/', '/resource/page/N catch-all (high)'],
];

// ── Runner ───────────────────────────────────────────────────

function testRedirect(from, expectedTo, label) {
  try {
    const result = execSync(
      `curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "${BASE}${from}"`,
      { encoding: 'utf8', timeout: 10000 }
    ).trim();

    const [code, redirectUrl] = result.split(' ', 2);
    const actualTo = redirectUrl ? redirectUrl.replace(BASE, '') : '';

    // Normalize trailing slashes
    const normalize = (p) => p.replace(/\/$/, '') + '/';
    const pass = code === '301' && normalize(actualTo) === normalize(expectedTo);

    return { from, expectedTo, actualTo, code, pass, label };
  } catch (e) {
    return { from, expectedTo, actualTo: '', code: 'ERR', pass: false, label, error: e.message };
  }
}

function run() {
  console.log(`\n${c.b}━━━ 301 Redirect QA ━━━${c.x}\n`);

  let pass = 0;
  let fail = 0;

  // Test explicit redirects
  console.log(`${c.b}▸ Explicit Redirects (${EXPLICIT.length})${c.x}`);
  for (const [from, to] of EXPLICIT) {
    const r = testRedirect(from, to);
    if (r.pass) {
      pass++;
      if (VERBOSE) console.log(`  ${c.g}✓${c.x} ${from} → ${to}`);
    } else {
      fail++;
      console.log(`  ${c.r}✗${c.x} ${from}`);
      console.log(`    Expected: 301 → ${to}`);
      console.log(`    Got:      ${r.code} → ${r.actualTo || '(none)'}`);
    }
  }
  console.log(`  ${pass}/${EXPLICIT.length} explicit redirects pass\n`);

  // Test regex catch-alls
  const regexPass0 = pass;
  console.log(`${c.b}▸ Regex Catch-All Patterns (${REGEX_TESTS.length})${c.x}`);
  for (const [from, to, label] of REGEX_TESTS) {
    const r = testRedirect(from, to, label);
    if (r.pass) {
      pass++;
      if (VERBOSE) console.log(`  ${c.g}✓${c.x} ${label}: ${from} → ${to}`);
    } else {
      fail++;
      console.log(`  ${c.r}✗${c.x} ${label}: ${from}`);
      console.log(`    Expected: 301 → ${to}`);
      console.log(`    Got:      ${r.code} → ${r.actualTo || '(none)'}`);
    }
  }
  const regexPassed = pass - regexPass0;
  console.log(`  ${regexPassed}/${REGEX_TESTS.length} regex catch-alls pass\n`);

  // Test no-redirect (pages that should NOT redirect)
  console.log(`${c.b}▸ No-Redirect Sanity Check${c.x}`);
  const noRedirect = [
    '/products/erp/',
    '/industries/',
    '/blog/',
    '/case-studies/',
    '/news/',
    '/news/events/',
    '/th/',
  ];
  let sanityPass = 0;
  for (const path of noRedirect) {
    try {
      const result = execSync(
        `curl -s -o /dev/null -w "%{http_code}" "${BASE}${path}"`,
        { encoding: 'utf8', timeout: 10000 }
      ).trim();
      if (result === '200') {
        sanityPass++;
        if (VERBOSE) console.log(`  ${c.g}✓${c.x} ${path} → 200 (no redirect)`);
      } else {
        console.log(`  ${c.y}⚠${c.x} ${path} → ${result} (expected 200)`);
      }
    } catch (e) {
      console.log(`  ${c.r}✗${c.x} ${path} → error`);
    }
  }
  console.log(`  ${sanityPass}/${noRedirect.length} destination pages return 200\n`);

  // Summary
  const total = EXPLICIT.length + REGEX_TESTS.length;
  console.log(`${c.b}━━━ Summary ━━━${c.x}`);
  console.log(`  ${c.g}${pass} PASS${c.x}  ${c.r}${fail} FAIL${c.x}  (${total} redirect tests + ${noRedirect.length} sanity checks)\n`);

  if (fail > 0) {
    console.log(`${c.r}✗ Redirect QA FAILED${c.x}\n`);
    process.exit(1);
  } else {
    console.log(`${c.g}✓ Redirect QA PASSED${c.x}\n`);
  }
}

run();
