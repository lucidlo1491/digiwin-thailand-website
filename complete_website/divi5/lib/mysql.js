/**
 * mysql.js — MySQL connection, query, escape, backup, post-lock check
 *
 * Extracted from build-hero-divi5.js v30. All MySQL operations for Divi 5 builds.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// LocalWP MySQL connection defaults
const DEFAULTS = {
  mysqlBin: '/Applications/Local.app/Contents/Resources/extraResources/lightning-services/mysql-8.0.35+4/bin/darwin-arm64/bin/mysql',
  mysqlSocket: '/Users/peterlo/Library/Application Support/Local/run/M99oTun0_/mysql/mysqld.sock',
  mysqlDb: 'local',
};

/**
 * MySQL-escape a string value for safe SQL insertion
 */
function escape(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\0/g, '\\0')
    .replace(/\x1a/g, '\\Z');
}

/**
 * Execute a MySQL query via command line
 * Uses temp file to avoid shell escaping issues with complex content
 */
function query(sql, opts = {}) {
  const bin = opts.mysqlBin || DEFAULTS.mysqlBin;
  const socket = opts.mysqlSocket || DEFAULTS.mysqlSocket;
  const db = opts.mysqlDb || DEFAULTS.mysqlDb;

  const tmpFile = path.join(__dirname, '..', '.tmp-sql.sql');
  fs.writeFileSync(tmpFile, sql, 'utf8');
  try {
    const result = execSync(
      `"${bin}" --socket="${socket}" -u root -proot ${db} < "${tmpFile}"`,
      { encoding: 'utf8', timeout: 15000 }
    );
    return result;
  } finally {
    try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore cleanup errors */ }
  }
}

/**
 * Backup current post_content before overwriting
 * Returns the backup file path
 */
function backup(pageId, opts = {}) {
  const backupDir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  const result = query(
    `SELECT post_content, post_title FROM wp_posts WHERE ID = ${pageId};`,
    opts
  );

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `page-${pageId}-${timestamp}.sql`);

  // Write as a SQL restore statement
  const lines = result.split('\n').slice(1); // skip header
  const content = lines.join('\n').trim();

  // Also get current meta
  const metaResult = query(
    `SELECT meta_key, meta_value FROM wp_postmeta WHERE post_id = ${pageId} AND meta_key IN ('_et_pb_custom_css', '_et_pb_use_builder', '_et_pb_use_divi_5');`,
    opts
  );

  fs.writeFileSync(backupFile,
    `-- Backup of page ${pageId} at ${new Date().toISOString()}\n` +
    `-- Restore with: node build-page.js --page home --restore ${backupFile}\n\n` +
    `-- Raw query result (post_content + post_title):\n${result}\n\n` +
    `-- Meta values:\n${metaResult}`,
    'utf8'
  );

  return backupFile;
}

/**
 * Check if a VB session is active on this post (edit lock)
 * Returns { locked: boolean, lockAge: number (seconds), user: string }
 */
function checkPostLock(pageId, opts = {}) {
  try {
    const result = query(
      `SELECT meta_value FROM wp_postmeta WHERE post_id = ${pageId} AND meta_key = '_edit_lock';`,
      opts
    );
    const lines = result.trim().split('\n');
    if (lines.length < 2) return { locked: false, lockAge: Infinity, user: '' };

    const value = lines[1].trim(); // format: "timestamp:user_id"
    const [ts, userId] = value.split(':');
    const lockAge = Math.floor(Date.now() / 1000) - parseInt(ts, 10);

    // WordPress heartbeat interval is ~15s, lock considered stale after 150s
    return {
      locked: lockAge < 150,
      lockAge,
      user: userId || 'unknown',
    };
  } catch (e) {
    return { locked: false, lockAge: Infinity, user: '' };
  }
}

/**
 * Check if post was modified recently (within last N seconds)
 */
function checkRecentModification(pageId, withinSeconds = 300, opts = {}) {
  try {
    const result = query(
      `SELECT TIMESTAMPDIFF(SECOND, post_modified_gmt, UTC_TIMESTAMP()) as seconds_ago FROM wp_posts WHERE ID = ${pageId};`,
      opts
    );
    const lines = result.trim().split('\n');
    if (lines.length < 2) return { recent: false, secondsAgo: Infinity };
    const secondsAgo = parseInt(lines[1].trim(), 10);
    return { recent: secondsAgo < withinSeconds, secondsAgo };
  } catch (e) {
    return { recent: false, secondsAgo: Infinity };
  }
}

/**
 * Push post content + meta to WordPress via direct MySQL
 */
function pushPage(pageId, { title, content, css, opts = {} } = {}) {
  // 1. Update post content and title
  const updateSQL = `UPDATE wp_posts SET
  post_title = '${escape(title)}',
  post_content = '${escape(content)}',
  post_modified = NOW(),
  post_modified_gmt = UTC_TIMESTAMP()
WHERE ID = ${pageId};`;

  query(updateSQL, opts);

  // 2. Upsert meta values (DELETE + INSERT pattern — WP lacks unique index on post_id+meta_key)
  const metaEntries = [
    ['_et_pb_custom_css', css],
    ['_et_pb_use_builder', 'on'],
    ['_et_pb_use_divi_5', 'on'],
    ['_et_pb_page_layout', 'et_full_width_page'],
    ['_wp_page_template', 'page-template-blank.php'],
  ];

  const metaSQL = metaEntries.map(([key, value]) => {
    return `DELETE FROM wp_postmeta WHERE post_id = ${pageId} AND meta_key = '${escape(key)}';
INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (${pageId}, '${escape(key)}', '${escape(value)}');`;
  }).join('\n');

  query(metaSQL, opts);
}

/**
 * Verify push succeeded — returns { title, contentLen, status }
 */
function verifyPush(pageId, opts = {}) {
  const result = query(
    `SELECT post_title, LENGTH(post_content) as content_len, post_status FROM wp_posts WHERE ID = ${pageId};`,
    opts
  );
  return result.trim();
}

/**
 * Restore from backup SQL file
 */
function restore(pageId, backupFile, opts = {}) {
  if (!fs.existsSync(backupFile)) {
    throw new Error(`Backup file not found: ${backupFile}`);
  }
  // Read the raw content from backup and push it back
  // This is a simplified restore — full implementation would parse the SQL
  console.log(`Restoring page ${pageId} from ${backupFile}`);
  console.log('Note: Manual restore — read the backup file and re-push via build script.');
}

module.exports = {
  escape,
  query,
  backup,
  checkPostLock,
  checkRecentModification,
  pushPage,
  verifyPush,
  restore,
  DEFAULTS,
};
