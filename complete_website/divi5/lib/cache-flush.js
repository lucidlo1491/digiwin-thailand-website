/**
 * cache-flush.js — Divi 5 CSS cache management
 *
 * Flushes per-page CSS cache from disk + DB transients.
 * Required after every MySQL push (see D47).
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./mysql');

// LocalWP site root for et-cache
const WP_CONTENT = '/Users/peterlo/Local Sites/digiwin-thailand/app/public/wp-content';

/**
 * Flush Divi CSS cache for a specific page
 * - Deletes disk cache: wp-content/et-cache/{PAGE_ID}/
 * - Optionally deletes DB transients (for full flush)
 */
function flushPage(pageId, opts = {}) {
  const results = { disk: false, db: false };

  // 1. Disk cache
  const cacheDir = path.join(WP_CONTENT, 'et-cache', String(pageId));
  try {
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true });
      results.disk = true;
    }
  } catch (err) {
    console.warn(`⚠ Could not flush disk cache for page ${pageId}: ${err.message}`);
  }

  // 2. DB dynamic asset meta (always flush — stale entries prevent code module rendering)
  try {
    mysql.query(
      `DELETE FROM wp_postmeta WHERE post_id = ${pageId} AND meta_key LIKE '_divi_dynamic_assets%';
DELETE FROM wp_postmeta WHERE post_id = ${pageId} AND meta_key LIKE '_divi_%canvas%';`,
      opts
    );
    results.db = true;
  } catch (err) {
    console.warn(`⚠ Could not flush DB cache for page ${pageId}: ${err.message}`);
  }

  return results;
}

/**
 * Full cache nuke — all pages
 * Use after batch builds or Divi updates
 */
function flushAll(opts = {}) {
  const cacheRoot = path.join(WP_CONTENT, 'et-cache');
  try {
    if (fs.existsSync(cacheRoot)) {
      fs.rmSync(cacheRoot, { recursive: true });
      fs.mkdirSync(cacheRoot, { recursive: true });
    }
  } catch (err) {
    console.warn(`⚠ Could not flush all disk cache: ${err.message}`);
  }

  // Always flush DB dynamic asset meta (stale entries prevent code module rendering)
  try {
    mysql.query(
      `DELETE FROM wp_postmeta WHERE meta_key LIKE '_divi_dynamic_assets%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '_divi_%canvas%';
DELETE FROM wp_options WHERE option_name LIKE '%_et_dynamic_cached_%' OR option_name LIKE '_transient_et_%';`,
      opts
    );
  } catch (err) {
    console.warn(`⚠ Could not flush all DB cache: ${err.message}`);
  }
}

module.exports = { flushPage, flushAll };
