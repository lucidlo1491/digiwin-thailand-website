/**
 * mysql-config.js — Connection profiles for local and production MySQL
 *
 * This file defines connection profiles. Credentials for production
 * live in mysql-config.local.js (gitignored) or environment variables.
 *
 * Usage:
 *   const { getProfile, tbl } = require('./mysql-config');
 *   const profile = getProfile('production');
 *   mysql.query(`SELECT * FROM ${tbl('posts', profile)}`, profile);
 */

const path = require('path');
const fs = require('fs');

// ────────────────────────────────────────────────────────────────
// PROFILES
// ────────────────────────────────────────────────────────────────

const PROFILES = {
  local: {
    name: 'local',
    mysqlBin: '/Applications/Local.app/Contents/Resources/extraResources/lightning-services/mysql-8.0.35+4/bin/darwin-arm64/bin/mysql',
    mysqlSocket: '/Users/peterlo/Library/Application Support/Local/run/M99oTun0_/mysql/mysqld.sock',
    mysqlDb: 'local',
    mysqlUser: 'root',
    mysqlPass: 'root',
    tablePrefix: 'wp_',
    siteUrl: 'https://digiwin-thailand.local',
    wpContent: '/Users/peterlo/Local Sites/digiwin-thailand/app/public/wp-content',
    timeout: 15000,
    mode: 'socket',
  },
  production: {
    name: 'production',
    mysqlBin: 'mysql',  // system mysql client (via Homebrew or similar)
    mysqlHost: '127.0.0.1',
    mysqlPort: 33306,  // SSH tunnel forwards to this
    mysqlDb: 'digiwin_datasea',
    mysqlUser: '',  // set in mysql-config.local.js or env
    mysqlPass: '',  // set in mysql-config.local.js or env
    tablePrefix: 'wp_',
    siteUrl: 'https://digiwin.co.th',
    wpContent: null,  // no local filesystem access for production
    timeout: 60000,
    mode: 'tcp',
  },
};

// ────────────────────────────────────────────────────────────────
// LOCAL OVERRIDES (credentials, custom paths)
// ────────────────────────────────────────────────────────────────

const localConfigPath = path.join(__dirname, 'mysql-config.local.js');
if (fs.existsSync(localConfigPath)) {
  const overrides = require(localConfigPath);
  for (const [profileName, values] of Object.entries(overrides)) {
    if (PROFILES[profileName]) {
      Object.assign(PROFILES[profileName], values);
    }
  }
}

// Environment variable overrides (highest priority)
if (process.env.PROD_MYSQL_USER) PROFILES.production.mysqlUser = process.env.PROD_MYSQL_USER;
if (process.env.PROD_MYSQL_PASS) PROFILES.production.mysqlPass = process.env.PROD_MYSQL_PASS;
if (process.env.PROD_MYSQL_HOST) PROFILES.production.mysqlHost = process.env.PROD_MYSQL_HOST;
if (process.env.PROD_MYSQL_PORT) PROFILES.production.mysqlPort = parseInt(process.env.PROD_MYSQL_PORT, 10);
if (process.env.PROD_MYSQL_DB) PROFILES.production.mysqlDb = process.env.PROD_MYSQL_DB;

// ────────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────────

/**
 * Get a connection profile by name.
 * @param {string} name — 'local' or 'production'
 * @returns {object} profile
 */
function getProfile(name = 'local') {
  const profile = PROFILES[name];
  if (!profile) throw new Error(`Unknown MySQL profile: "${name}". Available: ${Object.keys(PROFILES).join(', ')}`);
  return { ...profile };  // return copy to prevent mutation
}

/**
 * Get prefixed table name.
 * @param {string} table — bare table name (e.g. 'posts', 'postmeta', 'options')
 * @param {object} [profile] — profile object (defaults to local)
 * @returns {string} prefixed table name (e.g. 'wp_posts' or 'dgwthl_posts')
 */
function tbl(table, profile) {
  const prefix = (profile && profile.tablePrefix) || PROFILES.local.tablePrefix;
  return `${prefix}${table}`;
}

/**
 * Parse --target flag from CLI args.
 * @param {string[]} [args] — process.argv
 * @returns {string} 'local' or 'production'
 */
function parseTarget(args = process.argv) {
  const idx = args.indexOf('--target');
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  // Also support --production shorthand
  if (args.includes('--production')) return 'production';
  return 'local';
}

module.exports = { getProfile, tbl, parseTarget, PROFILES };
