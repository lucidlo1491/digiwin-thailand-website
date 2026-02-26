#!/usr/bin/env node
/**
 * responsive-audit.js — Full-site responsive QA audit
 *
 * Runs responsive-qa.js checks across all 63 pages (27 EN + 26 TH + 10 blog).
 * Sequential execution with browser recycling every 15 pages to prevent
 * Chrome memory leaks.
 *
 * Usage:
 *   node complete_website/divi5/responsive-audit.js                             # all pages (~50 min)
 *   node complete_website/divi5/responsive-audit.js --pages home,erp,th-home    # specific pages
 *   node complete_website/divi5/responsive-audit.js --viewport mobile,small     # specific viewports
 *   node complete_website/divi5/responsive-audit.js --save-baseline             # save after fixes
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const responsiveQA = require('./lib/responsive-qa');
const config = require('./lib/screenshot-config');

// ════════════════════════════════════════════════════════════════
// CLI ARGS
// ════════════════════════════════════════════════════════════════
const args = process.argv.slice(2);
function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}
const hasFlag = (flag) => args.includes(flag);

const pagesArg = getArg('--pages');
const viewportArg = getArg('--viewport');
const SAVE_BASELINE = hasFlag('--save-baseline');
const VERBOSE = hasFlag('--verbose');

const SITE_URL = 'https://digiwin-thailand.local';
const BROWSER_RECYCLE_INTERVAL = 15;
const BASELINE_DIR = path.join(__dirname, '.convergence', 'responsive');

// ════════════════════════════════════════════════════════════════
// BUILD PAGE REGISTRY — all 63 configs
// ════════════════════════════════════════════════════════════════
function buildPageRegistry() {
  const pages = [];
  const pagesDir = path.join(__dirname, 'pages');

  // EN + TH pages (from page config files)
  const pageFiles = fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.js') && !f.startsWith('sections'));

  for (const file of pageFiles) {
    try {
      const configPath = path.join(pagesDir, file);
      const src = fs.readFileSync(configPath, 'utf8');
      const idMatch = src.match(/pageId:\s*(\d+)/);
      if (!idMatch) continue;

      const name = file.replace('.js', '');
      const pageId = parseInt(idMatch[1]);
      pages.push({
        name,
        type: name.startsWith('th-') ? 'th' : (name.startsWith('blog-') ? 'blog-config' : 'en'),
        url: `${SITE_URL}/?page_id=${pageId}`,
        pageId,
      });
    } catch (_) { /* skip */ }
  }

  // Blog posts (from migration map — use slug-based URLs)
  const migrationMapPath = path.join(__dirname, 'blog-migration-map.json');
  if (fs.existsSync(migrationMapPath)) {
    const blogPosts = JSON.parse(fs.readFileSync(migrationMapPath, 'utf8'));
    for (const post of blogPosts) {
      // Skip blog configs (they're already added as page configs)
      const existingConfig = pages.find(p => p.name === `blog-${post.slug}`);
      if (existingConfig) {
        // Update URL to slug-based for blog posts
        existingConfig.url = `${SITE_URL}/${post.slug}/`;
        existingConfig.type = 'blog';
        continue;
      }
      pages.push({
        name: `blog-${post.slug}`,
        type: 'blog',
        url: `${SITE_URL}/${post.slug}/`,
        pageId: post.newId,
      });
    }
  }

  return pages;
}

// ════════════════════════════════════════════════════════════════
// FILTER VIEWPORTS
// ════════════════════════════════════════════════════════════════
function getViewports() {
  if (!viewportArg) return config.RESPONSIVE_VIEWPORTS;
  const names = viewportArg.split(',').map(v => v.trim());
  return config.RESPONSIVE_VIEWPORTS.filter(v => names.includes(v.name));
}

// ════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════
async function main() {
  const allPages = buildPageRegistry();
  const viewports = getViewports();

  // Filter pages if specified
  let pages;
  if (pagesArg) {
    const names = pagesArg.split(',').map(p => p.trim());
    pages = allPages.filter(p => names.includes(p.name));
    if (pages.length === 0) {
      console.error(`No pages matched: ${pagesArg}`);
      console.error('Available:', allPages.map(p => p.name).join(', '));
      process.exit(1);
    }
  } else {
    pages = allPages;
  }

  console.log(`\n▸ Responsive Audit — ${pages.length} page(s) × ${viewports.length} viewport(s)`);
  console.log(`  Viewports: ${viewports.map(v => `${v.name} (${v.width}×${v.height})`).join(', ')}`);
  console.log(`  Browser recycle: every ${BROWSER_RECYCLE_INTERVAL} pages`);
  console.log(`  Estimated time: ~${Math.round(pages.length * viewports.length * 10 / 60)} min\n`);

  const results = [];
  let browser = null;
  let pagesSinceLaunch = 0;

  const startTime = Date.now();

  for (let i = 0; i < pages.length; i++) {
    const pg = pages[i];

    // Browser recycling
    if (!browser || pagesSinceLaunch >= BROWSER_RECYCLE_INTERVAL) {
      if (browser) {
        await browser.close().catch(() => {});
        console.log(`  ↻ Browser recycled (after ${pagesSinceLaunch} pages)`);
      }
      browser = await puppeteer.launch({
        headless: 'new',
        protocolTimeout: config.PROTOCOL_TIMEOUT,
        args: config.PUPPETEER_ARGS,
      });
      pagesSinceLaunch = 0;
    }

    const progress = `[${i + 1}/${pages.length}]`;
    process.stdout.write(`  ${progress} ${pg.name} ... `);

    try {
      const report = await responsiveQA.run({
        pageName: pg.name,
        pageUrl: pg.url,
        viewports,
        browser,
      });

      results.push(report);
      pagesSinceLaunch++;

      // Color-coded verdict
      const color = report.overallVerdict === 'PASS' ? '\x1b[32m' :
                    report.overallVerdict === 'WARN' ? '\x1b[33m' : '\x1b[31m';
      console.log(`${color}${report.overallVerdict}\x1b[0m (P0: ${report.p0Count}, P1: ${report.p1Count})`);

      if (VERBOSE && report.overallVerdict !== 'PASS') {
        responsiveQA.printReport(report);
      }
    } catch (err) {
      console.log(`\x1b[31mERROR\x1b[0m: ${err.message.slice(0, 80)}`);
      results.push({
        pageName: pg.name,
        pageUrl: pg.url,
        overallVerdict: 'ERROR',
        error: err.message,
        viewports: [],
        p0Count: 0,
        p1Count: 0,
      });
    }
  }

  if (browser) await browser.close().catch(() => {});

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  // ── Summary ──
  printSummary(results, viewports, elapsed);

  // ── Save baseline ──
  if (SAVE_BASELINE) {
    saveBaseline(results);
  }

  // Exit code
  const hasP0 = results.some(r => r.p0Count > 0);
  process.exit(hasP0 ? 1 : 0);
}

// ════════════════════════════════════════════════════════════════
// SUMMARY TABLE
// ════════════════════════════════════════════════════════════════
function printSummary(results, viewports, elapsed) {
  const reset = '\x1b[0m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const red = '\x1b[31m';

  console.log('\n' + '═'.repeat(70));
  console.log('  RESPONSIVE AUDIT SUMMARY');
  console.log('═'.repeat(70));

  // Header row
  const vpNames = viewports.map(v => v.name.padEnd(8));
  console.log(`  ${'Page'.padEnd(30)} ${vpNames.join(' ')} Overall`);
  console.log('  ' + '─'.repeat(66));

  let passCount = 0, warnCount = 0, failCount = 0, errorCount = 0;

  for (const r of results) {
    if (r.overallVerdict === 'PASS') passCount++;
    else if (r.overallVerdict === 'WARN') warnCount++;
    else if (r.overallVerdict === 'FAIL') failCount++;
    else errorCount++;

    const name = r.pageName.slice(0, 28).padEnd(30);
    const vpCells = viewports.map(vp => {
      const vpResult = (r.viewports || []).find(v => v.name === vp.name);
      if (!vpResult) return '  -   '.padEnd(8);
      const color = vpResult.verdict === 'PASS' ? green :
                    vpResult.verdict === 'WARN' ? yellow : red;
      return `${color}${vpResult.verdict.padEnd(6)}${reset}  `;
    });

    const overallColor = r.overallVerdict === 'PASS' ? green :
                         r.overallVerdict === 'WARN' ? yellow : red;
    console.log(`  ${name} ${vpCells.join('')}${overallColor}${r.overallVerdict}${reset}`);
  }

  console.log('  ' + '─'.repeat(66));
  console.log(`  Total: ${results.length} pages | ${green}PASS: ${passCount}${reset} | ${yellow}WARN: ${warnCount}${reset} | ${red}FAIL: ${failCount}${reset} | ERROR: ${errorCount}`);
  console.log(`  Time: ${elapsed} min`);

  // Top P0 issues
  const p0Pages = results.filter(r => r.p0Count > 0);
  if (p0Pages.length > 0) {
    console.log(`\n  ${red}P0 ISSUES (must fix):${reset}`);
    for (const r of p0Pages.slice(0, 10)) {
      for (const vp of r.viewports) {
        for (const check of vp.checks) {
          if (check.severity === 'P0' && !check.pass) {
            console.log(`    ${r.pageName} @ ${vp.name}: ${check.name} (${check.issues.length} issues)`);
          }
        }
      }
    }
  }

  console.log('═'.repeat(70));
}

// ════════════════════════════════════════════════════════════════
// BASELINE SAVE
// ════════════════════════════════════════════════════════════════
function saveBaseline(results) {
  fs.mkdirSync(BASELINE_DIR, { recursive: true });

  const baseline = {
    timestamp: new Date().toISOString(),
    pageCount: results.length,
    pages: results.map(r => ({
      name: r.pageName,
      verdict: r.overallVerdict,
      p0: r.p0Count,
      p1: r.p1Count,
      viewports: (r.viewports || []).map(v => ({
        name: v.name,
        verdict: v.verdict,
        p0: v.p0,
        p1: v.p1,
      })),
    })),
  };

  const baselinePath = path.join(BASELINE_DIR, 'baseline.json');
  fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
  console.log(`\n  ✓ Baseline saved → ${path.relative(process.cwd(), baselinePath)}`);
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
