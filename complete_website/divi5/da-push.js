#!/usr/bin/env node
/**
 * da-push.js — Push SQL to production via DirectAdmin API
 *
 * Uses the DirectAdmin /api/db-manage/databases/{db}/import endpoint
 * to upload SQL files directly — no phpMyAdmin, no SSH tunnel needed.
 *
 * Setup (one-time):
 *   1. Create da-push.local.js (gitignored) with your credentials:
 *      module.exports = {
 *        daUser: 'your-directadmin-username',
 *        daPass: 'your-directadmin-password',
 *        daHost: 'digiwin.co.th',
 *        daPort: 2222,
 *        database: 'digiwin_datasea',
 *      };
 *
 *   2. Or use environment variables:
 *      DA_USER, DA_PASS, DA_HOST, DA_PORT, DA_DATABASE
 *
 *   Recommended: Create a Login Key in DirectAdmin
 *   (Advanced Features > Login Keys) scoped to database commands only.
 *
 * Usage:
 *   node da-push.js --file phpmyadmin-export/home-push.sql
 *   node da-push.js --file phpmyadmin-export/batch-1-final.sql
 *   node da-push.js --all-batches                 # push batch-1 through batch-7
 *   node da-push.js --page home                   # push single page SQL
 *   node da-push.js --dry-run --file batch-1.sql  # show what would happen
 *   node da-push.js --check                       # test connection only
 *   node da-push.js --rewrite-prefix --file f.sql # rewrite wp_ → dgwthl_ before push
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ────────────────────────────────────────────────────────────────
// CONFIG
// ────────────────────────────────────────────────────────────────

const EXPORT_DIR = path.join(__dirname, 'phpmyadmin-export');

// Default config
let config = {
  daUser: '',
  daPass: '',
  daHost: 'digiwin.co.th',
  daPort: 2222,
  database: 'digiwin_datasea',
};

// Load local config (gitignored)
const localConfigPath = path.join(__dirname, 'da-push.local.js');
if (fs.existsSync(localConfigPath)) {
  Object.assign(config, require(localConfigPath));
}

// Env var overrides (highest priority)
if (process.env.DA_USER) config.daUser = process.env.DA_USER;
if (process.env.DA_PASS) config.daPass = process.env.DA_PASS;
if (process.env.DA_HOST) config.daHost = process.env.DA_HOST;
if (process.env.DA_PORT) config.daPort = parseInt(process.env.DA_PORT, 10);
if (process.env.DA_DATABASE) config.database = process.env.DA_DATABASE;

// ────────────────────────────────────────────────────────────────
// CLI ARGS
// ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const checkOnly = args.includes('--check');
const allBatches = args.includes('--all-batches');
const verbose = args.includes('--verbose');
const rewritePrefix = args.includes('--rewrite-prefix');

// Production table prefix (from mysql-config.js)
const PROD_PREFIX = 'dgwthl_';
const LOCAL_PREFIX = 'wp_';

function getArg(flag) {
  const idx = args.indexOf(flag);
  return (idx !== -1 && args[idx + 1]) ? args[idx + 1] : null;
}

/**
 * Rewrite wp_ table prefix to production prefix (dgwthl_).
 * Matches wp_ only when preceded by a word boundary context
 * (whitespace, backtick, quote, line start, or common SQL keywords).
 */
function rewriteTablePrefix(sql) {
  // Match wp_ in table contexts: after FROM, INTO, UPDATE, JOIN, TABLE,
  // or when preceded by backtick/quote/whitespace/line-start
  const rewritten = sql.replace(/\bwp_/g, PROD_PREFIX);
  const count = (rewritten.match(new RegExp(PROD_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  return { sql: rewritten, count };
}

// ────────────────────────────────────────────────────────────────
// DIRECTADMIN API CLIENT
// ────────────────────────────────────────────────────────────────

/**
 * Make an HTTPS request to DirectAdmin API.
 */
function daRequest(method, apiPath, body, contentType) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${config.daUser}:${config.daPass}`).toString('base64');

    const options = {
      hostname: config.daHost,
      port: config.daPort,
      path: apiPath,
      method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
      },
      // Allow self-signed certs (common on DirectAdmin)
      rejectUnauthorized: false,
      timeout: 300000, // 5 min for large imports
    };

    if (contentType) {
      options.headers['Content-Type'] = contentType;
    }
    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out (5 min)'));
    });

    if (body) req.write(body);
    req.end();
  });
}

/**
 * Upload SQL file via DirectAdmin import API.
 * Uses multipart/form-data with the sqlfile field.
 */
function importSQL(filePath) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${config.daUser}:${config.daPass}`).toString('base64');
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);
    const boundary = '----DaPush' + Date.now().toString(36);

    // Build multipart body
    const parts = [];
    parts.push(`--${boundary}\r\n`);
    parts.push(`Content-Disposition: form-data; name="sqlfile"; filename="${fileName}"\r\n`);
    parts.push('Content-Type: application/sql\r\n\r\n');
    const header = Buffer.from(parts.join(''));
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([header, fileContent, footer]);

    const apiPath = `/api/db-manage/databases/${encodeURIComponent(config.database)}/import?clean=false`;

    const options = {
      hostname: config.daHost,
      port: config.daPort,
      path: apiPath,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
      rejectUnauthorized: false,
      timeout: 300000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Import timed out for ${fileName}`));
    });

    req.write(body);
    req.end();
  });
}

// ────────────────────────────────────────────────────────────────
// COMMANDS
// ────────────────────────────────────────────────────────────────

async function checkConnection() {
  console.log(`\nChecking DirectAdmin API connection...`);
  console.log(`  Host: ${config.daHost}:${config.daPort}`);
  console.log(`  User: ${config.daUser || '(not set)'}`);
  console.log(`  Database: ${config.database}`);

  if (!config.daUser || !config.daPass) {
    console.error('\n  ERROR: Credentials not configured.');
    console.error('  Create da-push.local.js or set DA_USER/DA_PASS env vars.');
    process.exit(1);
  }

  try {
    // Try listing databases
    const res = await daRequest('GET', '/api/db-show/databases');
    if (res.status === 200) {
      const dbs = JSON.parse(res.body);
      console.log(`\n  Connected! Found ${dbs.length} database(s):`);
      for (const db of dbs) {
        const marker = db.database === config.database ? ' <-- TARGET' : '';
        console.log(`    - ${db.database} (${db.tableCount} tables, ${(db.sizeBytes / 1024 / 1024).toFixed(1)}MB)${marker}`);
      }
      const target = dbs.find(d => d.database === config.database);
      if (!target) {
        console.error(`\n  WARNING: Target database "${config.database}" not found!`);
      }
      return true;
    } else if (res.status === 401) {
      console.error('\n  ERROR: Authentication failed (401). Check username/password.');
      if (verbose) console.error('  Response:', res.body);
      return false;
    } else if (res.status === 403) {
      console.error('\n  ERROR: Access denied (403). Login Key may lack database permissions.');
      if (verbose) console.error('  Response:', res.body);
      return false;
    } else {
      console.error(`\n  ERROR: Unexpected status ${res.status}`);
      if (verbose) console.error('  Response:', res.body);
      // Try legacy API
      console.log('\n  Trying legacy API...');
      const legacyRes = await daRequest('GET', '/CMD_API_DATABASES?json=yes');
      if (legacyRes.status === 200) {
        console.log('  Legacy API works! Server may be older DirectAdmin.');
        console.log('  Response:', legacyRes.body.substring(0, 200));
      }
      return false;
    }
  } catch (err) {
    console.error(`\n  ERROR: ${err.message}`);
    if (err.code === 'ECONNREFUSED') {
      console.error(`  DirectAdmin not reachable at ${config.daHost}:${config.daPort}`);
    }
    return false;
  }
}

async function pushFile(filePath) {
  const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(filePath);

  if (!fs.existsSync(absPath)) {
    console.error(`  File not found: ${absPath}`);
    return false;
  }

  const stat = fs.statSync(absPath);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(2);
  const fileName = path.basename(absPath);

  console.log(`\n  Importing: ${fileName} (${sizeMB} MB)`);

  // If --rewrite-prefix, create a temp file with rewritten prefixes
  let importPath = absPath;
  let tmpFile = null;

  if (rewritePrefix) {
    const originalSql = fs.readFileSync(absPath, 'utf8');
    const { sql: rewrittenSql, count } = rewriteTablePrefix(originalSql);
    console.log(`  Rewriting prefix: ${LOCAL_PREFIX} → ${PROD_PREFIX} (${count} occurrences)`);

    if (dryRun) {
      // Show a sample of rewrites for verification
      const lines = rewrittenSql.split('\n').filter(l => l.includes(PROD_PREFIX)).slice(0, 5);
      lines.forEach(l => console.log(`    ${l.trim().substring(0, 100)}`));
    }

    tmpFile = absPath.replace(/\.sql$/, `.prod-${Date.now()}.sql`);
    fs.writeFileSync(tmpFile, rewrittenSql);
    importPath = tmpFile;
  }

  if (dryRun) {
    console.log(`  [DRY RUN] Would POST to /api/db-manage/databases/${config.database}/import`);
    if (tmpFile) fs.unlinkSync(tmpFile);
    return true;
  }

  try {
    const start = Date.now();
    const res = await importSQL(importPath);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);

    if (tmpFile) fs.unlinkSync(tmpFile);

    if (res.status >= 200 && res.status < 300) {
      console.log(`  OK (${elapsed}s)`);
      if (verbose) console.log(`  Response: ${res.body.substring(0, 200)}`);
      return true;
    } else {
      console.error(`  FAILED (HTTP ${res.status}, ${elapsed}s)`);
      console.error(`  Response: ${res.body.substring(0, 500)}`);
      return false;
    }
  } catch (err) {
    if (tmpFile && fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    console.error(`  ERROR: ${err.message}`);
    return false;
  }
}

async function pushBatches() {
  const batchFiles = [];
  for (let i = 1; i <= 7; i++) {
    const f = path.join(EXPORT_DIR, `batch-${i}-final.sql`);
    if (fs.existsSync(f)) batchFiles.push(f);
  }

  if (batchFiles.length === 0) {
    console.error('No batch-*-final.sql files found in phpmyadmin-export/');
    process.exit(1);
  }

  console.log(`\nPushing ${batchFiles.length} batch files to ${config.database}...`);

  let success = 0;
  let failed = 0;

  for (const f of batchFiles) {
    const ok = await pushFile(f);
    if (ok) success++;
    else failed++;
  }

  console.log(`\nDone: ${success} succeeded, ${failed} failed`);
  return failed === 0;
}

// ────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────

async function main() {
  console.log('da-push.js — DirectAdmin SQL Push');
  console.log('─'.repeat(40));

  if (checkOnly) {
    const ok = await checkConnection();
    process.exit(ok ? 0 : 1);
  }

  // Validate credentials
  if (!config.daUser || !config.daPass) {
    console.error('\nCredentials not configured. Run with --check for setup instructions.');
    process.exit(1);
  }

  // Determine what to push
  const fileArg = getArg('--file');
  const pageArg = getArg('--page');

  if (allBatches) {
    const ok = await pushBatches();
    if (ok) {
      console.log('\nAll batches imported. Remember to clear Divi cache:');
      console.log('  WP Admin > Divi > Support Center > Safe Mode > Clear Cache');
    }
    process.exit(ok ? 0 : 1);
  }

  if (fileArg) {
    // Resolve relative to EXPORT_DIR if not absolute and not found at cwd
    let filePath = fileArg;
    if (!path.isAbsolute(filePath) && !fs.existsSync(filePath)) {
      filePath = path.join(EXPORT_DIR, fileArg);
    }
    const ok = await pushFile(filePath);
    process.exit(ok ? 0 : 1);
  }

  if (pageArg) {
    // Try page-push.sql pattern
    const candidates = [
      path.join(EXPORT_DIR, `${pageArg}-push.sql`),
      path.join(EXPORT_DIR, `th-${pageArg}-push.sql`),
    ];
    let pushed = 0;
    for (const f of candidates) {
      if (fs.existsSync(f)) {
        const ok = await pushFile(f);
        if (ok) pushed++;
      }
    }
    if (pushed === 0) {
      console.error(`No SQL file found for page "${pageArg}". Checked:`);
      candidates.forEach(c => console.error(`  ${c}`));
      process.exit(1);
    }
    process.exit(0);
  }

  // No arguments — show help
  console.log(`
Usage:
  node da-push.js --check                    Test API connection
  node da-push.js --file <path>              Push a single SQL file
  node da-push.js --page <name>              Push page SQL (e.g., home, erp)
  node da-push.js --all-batches              Push batch-1 through batch-7
  node da-push.js --dry-run --all-batches    Preview without pushing
  node da-push.js --rewrite-prefix --file f  Rewrite wp_ → dgwthl_ before push

Flags:
  --rewrite-prefix   Rewrite wp_ table prefix to production (dgwthl_)
  --dry-run          Preview without pushing (shows rewrite samples)
  --verbose          Show API response details

Setup:
  Create da-push.local.js with:
    module.exports = {
      daUser: 'your-directadmin-username',
      daPass: 'your-directadmin-password',
    };
  `);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
