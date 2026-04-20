/**
 * cache-flush.js — Divi 5 CSS cache management
 *
 * Flushes per-page CSS cache from disk + DB transients.
 * Required after every MySQL push (see D47).
 * Supports local (disk + DB) and production (DB-only) modes.
 */

const fs = require('fs');
const path = require('path');
const mysql = require('./mysql');
const { tbl } = require('./mysql-config');

/**
 * Flush Divi CSS cache for a specific page
 * - Local: Deletes disk cache + DB transients
 * - Production: DB-only flush (no filesystem access)
 */
function flushPage(pageId, opts = {}) {
  const results = { disk: false, db: false };

  // 1. Disk cache (local only — production Divi regenerates on next page load)
  const wpContent = opts.wpContent;
  if (wpContent) {
    const cacheDir = path.join(wpContent, 'et-cache', String(pageId));
    try {
      if (fs.existsSync(cacheDir)) {
        fs.rmSync(cacheDir, { recursive: true });
        results.disk = true;
      }
    } catch (err) {
      console.warn(`\u26a0 Could not flush disk cache for page ${pageId}: ${err.message}`);
    }
  }

  // 2. DB dynamic asset meta (always flush — stale entries prevent code module rendering)
  try {
    mysql.query(
      `DELETE FROM ${tbl('postmeta', opts)} WHERE post_id = ${pageId} AND meta_key LIKE '_divi_dynamic_assets%';
DELETE FROM ${tbl('postmeta', opts)} WHERE post_id = ${pageId} AND meta_key LIKE '_divi_%canvas%';`,
      opts
    );
    results.db = true;
  } catch (err) {
    console.warn(`\u26a0 Could not flush DB cache for page ${pageId}: ${err.message}`);
  }

  return results;
}

/**
 * Full cache nuke — all pages
 * Use after batch builds or Divi updates
 */
function flushAll(opts = {}) {
  const wpContent = opts.wpContent;
  if (wpContent) {
    const cacheRoot = path.join(wpContent, 'et-cache');
    try {
      if (fs.existsSync(cacheRoot)) {
        fs.rmSync(cacheRoot, { recursive: true });
        fs.mkdirSync(cacheRoot, { recursive: true });
      }
    } catch (err) {
      console.warn(`\u26a0 Could not flush all disk cache: ${err.message}`);
    }
  }

  // Always flush DB dynamic asset meta (stale entries prevent code module rendering)
  try {
    mysql.query(
      `DELETE FROM ${tbl('postmeta', opts)} WHERE meta_key LIKE '_divi_dynamic_assets%';
DELETE FROM ${tbl('postmeta', opts)} WHERE meta_key LIKE '_divi_%canvas%';
DELETE FROM ${tbl('options', opts)} WHERE option_name LIKE '%_et_dynamic_cached_%' OR option_name LIKE '_transient_et_%';`,
      opts
    );
  } catch (err) {
    console.warn(`\u26a0 Could not flush all DB cache: ${err.message}`);
  }
}

module.exports = { flushPage, flushAll };
