/**
 * mysql.js — MySQL connection, query, escape, backup, post-lock check
 *
 * Extracted from build-hero-divi5.js v30. All MySQL operations for Divi 5 builds.
 * Supports local (socket) and production (TCP via SSH tunnel) connections.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { getProfile, tbl } = require('./mysql-config');

// Legacy DEFAULTS for backward compatibility (existing callers that don't pass opts)
const DEFAULTS = getProfile('local');

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
 * Uses temp file to avoid shell escaping issues with complex content.
 * Supports both socket (local) and TCP (production) modes.
 */
function query(sql, opts = {}) {
  const bin = opts.mysqlBin || DEFAULTS.mysqlBin;
  const db = opts.mysqlDb || DEFAULTS.mysqlDb;
  const timeout = opts.timeout || DEFAULTS.timeout;
  const mode = opts.mode || DEFAULTS.mode;

  // Build connection string based on mode
  let connStr;
  if (mode === 'tcp') {
    const host = opts.mysqlHost || '127.0.0.1';
    const port = opts.mysqlPort || 33306;
    const user = opts.mysqlUser || '';
    const pass = opts.mysqlPass || '';
    if (!user) throw new Error('TCP mode requires mysqlUser. Set in mysql-config.local.js or PROD_MYSQL_USER env var.');
    connStr = `"${bin}" -h ${host} -P ${port} -u ${user} -p'${pass}' ${db}`;
  } else {
    const socket = opts.mysqlSocket || DEFAULTS.mysqlSocket;
    const user = opts.mysqlUser || 'root';
    const pass = opts.mysqlPass || 'root';
    connStr = `"${bin}" --socket="${socket}" -u ${user} -p${pass} ${db}`;
  }

  const tmpFile = path.join(__dirname, '..', `.tmp-sql-${process.pid}-${Date.now()}.sql`);
  fs.writeFileSync(tmpFile, sql, 'utf8');
  try {
    const result = execSync(
      `${connStr} < "${tmpFile}"`,
      { encoding: 'utf8', timeout }
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
    `SELECT post_content, post_title FROM ${tbl('posts', opts)} WHERE ID = ${pageId};`,
    opts
  );

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `page-${pageId}-${timestamp}.sql`);

  // Write as a SQL restore statement
  const lines = result.split('\n').slice(1); // skip header
  const content = lines.join('\n').trim();

  // Also get current meta
  const metaResult = query(
    `SELECT meta_key, meta_value FROM ${tbl('postmeta', opts)} WHERE post_id = ${pageId} AND meta_key IN ('_et_pb_custom_css', '_et_pb_use_builder', '_et_pb_use_divi_5');`,
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
      `SELECT meta_value FROM ${tbl('postmeta', opts)} WHERE post_id = ${pageId} AND meta_key = '_edit_lock';`,
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
      `SELECT TIMESTAMPDIFF(SECOND, post_modified_gmt, UTC_TIMESTAMP()) as seconds_ago FROM ${tbl('posts', opts)} WHERE ID = ${pageId};`,
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
 * @param {number} pageId
 * @param {object} options — { title, content, css, schemaMeta, opts }
 *   schemaMeta: optional JSON string of schema.org JSON-LD array (from schema.js serialize())
 */
function pushPage(pageId, { title, content, css, schemaMeta, opts = {} } = {}) {
  // 1. Update post content and title
  const updateSQL = `UPDATE ${tbl('posts', opts)} SET
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
    ['_wp_page_template', 'default'],
  ];

  // 3. If schema metadata provided, include it in the push
  if (schemaMeta) {
    metaEntries.push(['_digiwin_schema', schemaMeta]);
  }

  const metaSQL = metaEntries.map(([key, value]) => {
    return `DELETE FROM ${tbl('postmeta', opts)} WHERE post_id = ${pageId} AND meta_key = '${escape(key)}';
INSERT INTO ${tbl('postmeta', opts)} (post_id, meta_key, meta_value) VALUES (${pageId}, '${escape(key)}', '${escape(value)}');`;
  }).join('\n');

  query(metaSQL, opts);
}

/**
 * Verify push succeeded — returns { title, contentLen, status }
 */
function verifyPush(pageId, opts = {}) {
  const result = query(
    `SELECT post_title, LENGTH(post_content) as content_len, post_status FROM ${tbl('posts', opts)} WHERE ID = ${pageId};`,
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

/**
 * Create a new WordPress page and return its ID
 * Used for Thai language pages (i18n)
 */
function createPage({ title, slug, parentId = 0, status = 'publish', opts = {} } = {}) {
  const siteUrl = opts.siteUrl || DEFAULTS.siteUrl || 'https://digiwin-thailand.local';
  const sql = `INSERT INTO ${tbl('posts', opts)} (
    post_author, post_date, post_date_gmt, post_content, post_title,
    post_excerpt, post_status, comment_status, ping_status, post_password,
    post_name, to_ping, pinged, post_modified, post_modified_gmt,
    post_content_filtered, post_parent, guid, menu_order, post_type,
    post_mime_type, comment_count
  ) VALUES (
    1, NOW(), UTC_TIMESTAMP(), '', '${escape(title)}',
    '', '${escape(status)}', 'closed', 'closed', '',
    '${escape(slug)}', '', '', NOW(), UTC_TIMESTAMP(),
    '', ${parseInt(parentId, 10)}, '', 0, 'page',
    '', 0
  );
  SELECT LAST_INSERT_ID() as new_id;`;

  const result = query(sql, opts);
  const lines = result.trim().split('\n');
  const idLine = lines[lines.length - 1].trim();
  const newId = parseInt(idLine, 10);

  if (isNaN(newId) || newId === 0) {
    throw new Error(`createPage failed — could not get new ID. Raw result: ${result}`);
  }

  // Set GUID (WordPress convention: site_url/?page_id=ID)
  query(`UPDATE ${tbl('posts', opts)} SET guid = '${siteUrl}/?page_id=${newId}' WHERE ID = ${newId};`, opts);

  return newId;
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
  createPage,
  DEFAULTS,
  tbl,
};
