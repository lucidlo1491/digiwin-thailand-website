#!/usr/bin/env node
/**
 * create-th-pages.js — Create Thai (/th/) WordPress pages
 *
 * Creates a /th/ parent page and all Thai child pages with correct hierarchy.
 * Records IDs to th-page-ids.json for use by build-page.js configs.
 *
 * Usage:
 *   node complete_website/divi5/create-th-pages.js [--dry-run]
 *   node complete_website/divi5/create-th-pages.js --page home   # create single page
 *
 * Re-runnable: skips pages that already exist (checks by slug).
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./lib/mysql');

const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE = process.argv.find((a, i) => process.argv[i - 1] === '--page');

const IDS_FILE = path.join(__dirname, 'th-page-ids.json');

// ── Thai page definitions ─────────────────────────────────────
// slug → { title, parent (slug of parent, or null for /th/ root) }
const PAGES = {
  'th': {
    title: 'ภาษาไทย',
    parent: null,
    note: 'Parent container for all Thai pages',
  },
  'th-home': {
    title: 'DigiWin Thailand \u2014 ซอฟต์แวร์อัจฉริยะสำหรับโรงงานผลิตไทย',
    parent: 'th',
    existingId: 100771, // POC page already exists
  },
  // ── Batch 1: Partner Program (4 pages) ──────────────────────
  'partner-program': {
    title: 'โปรแกรมพันธมิตร DigiWin — สร้างรายได้ต่อเนื่อง',
    parent: 'th',
    configName: 'th-partner-program',
  },
  'business-model': {
    title: 'วิกฤตโมเดลธุรกิจ — DigiWin Thailand',
    parent: 'partner-program',
    configName: 'th-partner-business-model',
  },
  'solutions': {
    title: 'ชุดโซลูชันพาร์ทเนอร์ — DigiWin Thailand',
    parent: 'partner-program',
    configName: 'th-partner-solutions',
  },
  'economics': {
    title: 'เศรษฐศาสตร์พาร์ทเนอร์ — DigiWin Thailand',
    parent: 'partner-program',
    configName: 'th-partner-economics',
  },
  // ── Batch 2: Product Pages (5 pages) ──────────────────────
  'products': {
    title: 'โซลูชันซอฟต์แวร์ — DigiWin Thailand',
    parent: 'th',
    configName: 'th-products',
  },
  'erp': {
    title: 'ERP (ระบบบริหารทรัพยากรองค์กร) — DigiWin Thailand',
    parent: 'products',
    configName: 'th-erp',
  },
  'mes': {
    title: 'MES (ระบบบริหารการผลิต) — DigiWin Thailand',
    parent: 'products',
    configName: 'th-mes',
  },
  'wms': {
    title: 'WMS (ระบบจัดการคลังสินค้า) — DigiWin Thailand',
    parent: 'products',
    configName: 'th-wms',
  },
  'aiot': {
    title: 'AIoT & Smart Factory — DigiWin Thailand',
    parent: 'products',
    configName: 'th-aiot',
  },
  // Future pages — uncomment as batches are built:
  // 'about':           { title: 'เกี่ยวกับเรา — DigiWin Thailand', parent: 'th' },
  // 'contact':         { title: 'ติดต่อเรา — DigiWin Thailand', parent: 'th' },
  // 'case-studies':    { title: 'กรณีศึกษา — DigiWin Thailand', parent: 'th' },
};

// ── Load existing IDs ──────────────────────────────────────────
let ids = {};
if (fs.existsSync(IDS_FILE)) {
  ids = JSON.parse(fs.readFileSync(IDS_FILE, 'utf8'));
}

// ── Check if page already exists by slug ───────────────────────
function pageExistsBySlug(slug, parentId) {
  try {
    const parentClause = parentId ? ` AND post_parent = ${parentId}` : '';
    const result = mysql.query(
      `SELECT ID FROM wp_posts WHERE post_name = '${mysql.escape(slug)}' AND post_type = 'page' AND post_status != 'trash'${parentClause};`
    );
    const lines = result.trim().split('\n');
    if (lines.length >= 2) {
      return parseInt(lines[1].trim(), 10);
    }
    return null;
  } catch (e) {
    return null;
  }
}

// ── Main ───────────────────────────────────────────────────────
function run() {
  console.log(DRY_RUN ? '=== DRY RUN ===' : '=== Creating Thai pages ===');
  console.log('');

  const slugsToCreate = SINGLE
    ? [SINGLE]
    : Object.keys(PAGES);

  for (const slug of slugsToCreate) {
    const def = PAGES[slug];
    if (!def) {
      console.log(`  ⚠ Unknown page: ${slug}`);
      continue;
    }

    // Check if already exists
    if (def.existingId) {
      ids[slug] = def.existingId;
      if (def.configName) ids[def.configName] = def.existingId;
      console.log(`  ✓ ${slug} — already exists (ID: ${def.existingId})`);
      continue;
    }

    // Resolve parent ID first (needed for slug uniqueness check)
    let parentId = 0;
    if (def.parent) {
      parentId = ids[def.parent];
      if (!parentId) {
        console.log(`  ✗ ${slug} — parent '${def.parent}' not yet created, skipping`);
        continue;
      }
    }

    const existingId = pageExistsBySlug(slug, parentId || undefined);
    if (existingId) {
      ids[slug] = existingId;
      if (def.configName) ids[def.configName] = existingId;
      console.log(`  ✓ ${slug} — already exists in WP (ID: ${existingId})`);
      continue;
    }

    if (DRY_RUN) {
      console.log(`  → Would create: ${slug} (parent: ${parentId || 'none'}) — "${def.title}"`);
      continue;
    }

    // Create the page
    try {
      const newId = mysql.createPage({
        title: def.title,
        slug: slug,
        parentId: parentId,
        status: 'publish',
      });
      ids[slug] = newId;
      if (def.configName) ids[def.configName] = newId;
      console.log(`  ✓ Created: ${slug} → ID ${newId} (parent: ${parentId || 'none'})`);
    } catch (e) {
      console.error(`  ✗ Failed to create ${slug}: ${e.message}`);
    }
  }

  // Save IDs
  if (!DRY_RUN) {
    fs.writeFileSync(IDS_FILE, JSON.stringify(ids, null, 2), 'utf8');
    console.log(`\n  Saved IDs to ${path.basename(IDS_FILE)}`);
  }

  console.log('\n=== Done ===');
  console.log('IDs:', JSON.stringify(ids, null, 2));
}

run();
