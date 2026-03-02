/**
 * verify-runner.js — Orchestrates Gates 1-3 verification per page
 *
 * Gate 1: Content parity (prototype text vs Divi 5)
 * Gate 2: Design system compliance (verify-divi5.js with golden ref)
 * Gate 3: VB editability (block types, admin labels, cache state)
 *
 * Exits non-zero on any P0 failure.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const mysql = require('./mysql');

/**
 * Gate 3: VB Editability check via raw post_content
 * Checks block types and admin labels against rules
 */
function checkEditability(pageId, rules = {}, opts = {}) {
  const results = [];
  const pass = (msg) => results.push({ gate: 3, status: 'PASS', msg });
  const fail = (msg) => results.push({ gate: 3, status: 'FAIL', msg });

  // Get raw post_content from MySQL
  const rawResult = mysql.query(
    `SELECT post_content FROM wp_posts WHERE ID = ${pageId};`,
    opts
  );
  const content = rawResult.split('\n').slice(1).join('\n'); // skip header

  // Count block types
  const htmlBlocks = (content.match(/<!-- wp:html -->/g) || []).length;
  const codeBlocks = (content.match(/<!-- wp:divi\/code /g) || []).length;
  const textBlocks = (content.match(/<!-- wp:divi\/text /g) || []).length;
  const buttonBlocks = (content.match(/<!-- wp:divi\/button /g) || []).length;
  const groupBlocks = (content.match(/<!-- wp:divi\/group /g) || []).length;

  // Check banned blocks
  const bannedBlocks = rules.bannedBlocks || ['wp:divi/button', 'wp:divi/group'];
  if (buttonBlocks > 0 && bannedBlocks.includes('wp:divi/button')) {
    fail(`Found ${buttonBlocks} wp:divi/button blocks (banned — renders empty)`);
  }
  if (groupBlocks > 0 && bannedBlocks.includes('wp:divi/group')) {
    fail(`Found ${groupBlocks} wp:divi/group blocks (banned — renders empty)`);
  }

  // Check max HTML blocks (should be max 1 — the JS script block)
  const maxHtml = rules.maxHtmlBlocks || 1;
  if (htmlBlocks > maxHtml) {
    fail(`Found ${htmlBlocks} wp:html blocks (max ${maxHtml}). Convert extras to wp:divi/code.`);
  } else {
    pass(`wp:html blocks: ${htmlBlocks} (max ${maxHtml})`);
  }

  // Check code module count
  if (rules.minCodeModules && codeBlocks < rules.minCodeModules) {
    fail(`Only ${codeBlocks} wp:divi/code blocks (expected >= ${rules.minCodeModules})`);
  } else {
    pass(`wp:divi/code blocks: ${codeBlocks}`);
  }

  // Check text module count
  if (rules.minTextModules && textBlocks < rules.minTextModules) {
    fail(`Only ${textBlocks} wp:divi/text blocks (expected >= ${rules.minTextModules})`);
  } else {
    pass(`wp:divi/text blocks: ${textBlocks}`);
  }

  // Check admin labels on code modules
  // Find each wp:divi/code block and check for adminLabel within it
  // MySQL CLI double-escapes JSON, so use regex instead of JSON.parse
  let unlabeledCount = 0;
  let searchPos = 0;
  while (true) {
    const blockStart = content.indexOf('<!-- wp:divi/code {', searchPos);
    if (blockStart === -1) break;
    const blockEnd = content.indexOf('/-->', blockStart);
    if (blockEnd === -1) break;
    const blockStr = content.substring(blockStart, blockEnd + 4);
    const labelMatch = blockStr.match(/"adminLabel":\{"desktop":\{"value":"([^"]+)"\}\}/);
    if (!labelMatch || labelMatch[1] === 'Code Module') unlabeledCount++;
    searchPos = blockEnd + 4;
  }

  if (unlabeledCount > 0) {
    fail(`${unlabeledCount} Code Module(s) without admin labels`);
  } else {
    pass(`All ${codeBlocks} Code Modules have admin labels`);
  }

  // Check page status
  const statusResult = mysql.query(
    `SELECT post_status FROM wp_posts WHERE ID = ${pageId};`,
    opts
  );
  const status = statusResult.split('\n').slice(1).join('').trim();
  if (status === 'publish') {
    pass(`Page status: publish`);
  } else {
    // Not a failure for draft pages during build
    results.push({ gate: 3, status: 'WARN', msg: `Page status: ${status} (not published)` });
  }

  // Check Divi cache state
  const cacheDir = path.join(
    '/Users/peterlo/Local Sites/digiwin-thailand/app/public/wp-content/et-cache',
    String(pageId)
  );
  if (fs.existsSync(cacheDir)) {
    results.push({ gate: 3, status: 'WARN', msg: 'Divi CSS cache exists — may be stale. Run cache flush.' });
  } else {
    pass('Divi CSS cache flushed');
  }

  return {
    pass: results.every(r => r.status !== 'FAIL'),
    results,
    counts: { html: htmlBlocks, code: codeBlocks, text: textBlocks, button: buttonBlocks, group: groupBlocks },
  };
}

/**
 * Run Gates 1-3 for a page
 * @param {object} pageConfig - { pageId, prototypePath, goldenRef, siteUrl, editabilityRules }
 * @returns {{ pass: boolean, gates: object }}
 */
function runAll(pageConfig, opts = {}) {
  const gates = { 1: null, 2: null, 3: null };
  let allPass = true;

  // Gate 1: Content parity (only if prototype exists)
  if (pageConfig.prototypePath && fs.existsSync(pageConfig.prototypePath)) {
    try {
      const contentParity = require('./content-parity');
      const protoHtml = fs.readFileSync(pageConfig.prototypePath, 'utf8');

      // Fetch rendered Divi 5 page (follow redirects — WP 301s page_id to slug)
      const renderedHtml = execSync(
        `curl -skL "${pageConfig.siteUrl}/?page_id=${pageConfig.pageId}" 2>/dev/null`,
        { encoding: 'utf8', timeout: 15000, maxBuffer: 10 * 1024 * 1024 }
      );

      gates[1] = contentParity.compare(protoHtml, renderedHtml);
      if (!gates[1].pass) allPass = false;
    } catch (e) {
      gates[1] = { pass: false, results: [{ check: 'Gate 1', status: 'ERROR', detail: e.message }] };
      allPass = false;
    }
  } else {
    gates[1] = { pass: true, results: [{ check: 'Gate 1', status: 'SKIP', detail: 'No prototype file' }] };
  }

  // Gate 2: Design system compliance (run verify-divi5.js)
  if (pageConfig.goldenRef) {
    try {
      const verifyScript = path.join(__dirname, '..', '..', 'verify-divi5.js');
      const goldenPath = path.join(__dirname, '..', '..', 'golden-refs', `${pageConfig.goldenRef}.json`);

      if (fs.existsSync(verifyScript) && fs.existsSync(goldenPath)) {
        execSync(
          `node "${verifyScript}" --section ${pageConfig.goldenRef} --url "${pageConfig.siteUrl}/?page_id=${pageConfig.pageId}" --logged-out --json 2>&1`,
          { encoding: 'utf8', timeout: 60000 }
        );
        // verify-divi5.js writes JSON to file, not stdout
        const jsonPath = path.join(__dirname, '..', '..', 'screenshots', `verify-${pageConfig.goldenRef}.json`);
        if (fs.existsSync(jsonPath)) {
          const parsed = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          // verify-divi5.js uses 'verdict' (string), not 'pass' (boolean)
          const passed = parsed.verdict === 'PASS';
          gates[2] = { pass: passed, results: parsed.results || [] };
        } else {
          gates[2] = { pass: false, results: [{ check: 'Gate 2', status: 'FAIL', detail: 'verify-divi5.js did not produce JSON output' }] };
        }
      } else {
        gates[2] = { pass: true, results: [{ check: 'Gate 2', status: 'SKIP', detail: 'No golden ref or verify script' }] };
      }
    } catch (e) {
      // execSync throws on non-zero exit — check if JSON was still written
      const jsonPath = path.join(__dirname, '..', '..', 'screenshots', `verify-${pageConfig.goldenRef}.json`);
      if (fs.existsSync(jsonPath)) {
        try {
          const parsed = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          const passed = parsed.verdict === 'PASS';
          gates[2] = { pass: passed, results: parsed.results || [] };
        } catch (parseErr) {
          gates[2] = { pass: false, results: [{ check: 'Gate 2', status: 'FAIL', detail: `verify-divi5.js failed: ${e.message.substring(0, 200)}` }] };
        }
      } else {
        gates[2] = { pass: false, results: [{ check: 'Gate 2', status: 'FAIL', detail: `verify-divi5.js failed: ${e.message.substring(0, 200)}` }] };
      }
      if (!gates[2].pass) allPass = false;
    }
  } else {
    gates[2] = { pass: true, results: [{ check: 'Gate 2', status: 'SKIP', detail: 'No golden ref specified' }] };
  }

  // Gate 3: VB Editability
  gates[3] = checkEditability(pageConfig.pageId, pageConfig.editabilityRules || {}, opts);
  if (!gates[3].pass) allPass = false;

  return { pass: allPass, gates };
}

/**
 * Print verification results to console
 */
function printReport(results) {
  for (const [gateNum, gate] of Object.entries(results.gates)) {
    if (!gate) continue;
    console.log(`\n  Gate ${gateNum}: ${gate.pass ? '✓ PASS' : '✗ FAIL'}`);
    for (const r of gate.results || []) {
      const icon = r.status === 'PASS' ? '✓' : r.status === 'FAIL' ? '✗' : r.status === 'WARN' ? '⚠' : '○';
      console.log(`    ${icon} ${r.check || r.msg || ''} ${r.detail || ''}`);
    }
  }
  console.log(`\n  Overall: ${results.pass ? '✓ ALL GATES PASS' : '✗ VERIFICATION FAILED'}`);
}

module.exports = { checkEditability, runAll, printReport };
