#!/usr/bin/env node
/**
 * retrofit-sections.js — One-time migration for scaffold-generated section files
 *
 * Fixes 4 known patterns in divi5/pages/sections/*.js files:
 *   1a. Escaped template placeholders: \${P}, \${base.*} → functional ${P}, ${base.*}
 *   1b. Double !important: !important!important → !important
 *   1c. SVG relative URLs → inline Base64 data URIs
 *   1d. Strip REF: BASE RULES comment blocks (dead reference code)
 *
 * Usage:
 *   node complete_website/divi5/lib/retrofit-sections.js [--dry-run] [--scope all|unescape|important|super-d|comments]
 *
 * --dry-run is the DEFAULT. Pass --live to actually write files.
 */

const fs = require('fs');
const path = require('path');

// ════════════════════════════════════════════════════════════════
// CONFIG
// ════════════════════════════════════════════════════════════════

const SECTIONS_DIR = path.join(__dirname, '..', 'pages', 'sections');
const ASSETS_DIR = path.join(__dirname, '..', '..', 'assets');

const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const DRY_RUN = !LIVE;
const SCOPE = (() => {
  const idx = args.indexOf('--scope');
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : 'all';
})();

const VALID_SCOPES = ['all', 'unescape', 'important', 'super-d', 'comments'];
if (!VALID_SCOPES.includes(SCOPE)) {
  console.error(`Invalid scope: ${SCOPE}. Valid: ${VALID_SCOPES.join(', ')}`);
  process.exit(1);
}

// ════════════════════════════════════════════════════════════════
// SVG BASE64 CACHE
// ════════════════════════════════════════════════════════════════

const SVG_MAP = {
  'digiwin-d-outline.svg': null,
  'digiwin-d-gradient.svg': null,
  'digiwin-d-particle.svg': null,
};

function loadSvgBase64() {
  for (const filename of Object.keys(SVG_MAP)) {
    const fp = path.join(ASSETS_DIR, filename);
    if (fs.existsSync(fp)) {
      SVG_MAP[filename] = Buffer.from(fs.readFileSync(fp, 'utf8')).toString('base64');
    } else {
      console.warn(`  ⚠ SVG not found: ${fp}`);
    }
  }
}

// ════════════════════════════════════════════════════════════════
// PASS 1a: UNESCAPE TEMPLATE PLACEHOLDERS
// ════════════════════════════════════════════════════════════════

function passUnescape(content) {
  let changed = 0;

  // Pattern: \${P} → ${P}  (escaped dollar-brace for P variable)
  const before = content;
  content = content.replace(/\\\$\{P\}/g, (match) => {
    changed++;
    return '${P}';
  });

  // Handle multi-line FIRST: \${base.reducedMotion(\`...\n...\`)}
  // Must run before single-line to avoid single-line greedily matching across newlines
  content = content.replace(/\\\$\{base\.([\w]+)\(\\`([\s\S]*?)\\`\)\}/g, (match, fn, inner) => {
    changed++;
    return `\${base.${fn}(\`${inner}\`)}`;
  });

  // Single-line: \${base.reducedMotion('')}, \${base.fontSmoothingReset(P)}, \${base.diviListReset(P)}
  // [^)\n]* prevents crossing newlines (multi-line already handled above)
  content = content.replace(/\\\$\{base\.([\w]+)\(([^)\n]*)\)\}/g, (match, fn, args) => {
    changed++;
    // Fix escaped backticks inside args: \`\` → ''
    const fixedArgs = args.replace(/\\`/g, "'").replace(/''/g, "''");
    return `\${base.${fn}(${fixedArgs})}`;
  });

  return { content, changed };
}

// ════════════════════════════════════════════════════════════════
// PASS 1b: FIX DOUBLE !important
// ════════════════════════════════════════════════════════════════

function passImportant(content) {
  let changed = 0;
  content = content.replace(/!important!important/g, () => {
    changed++;
    return '!important';
  });
  return { content, changed };
}

// ════════════════════════════════════════════════════════════════
// PASS 1c: SVG RELATIVE URLs → BASE64 DATA URIs
// ════════════════════════════════════════════════════════════════

function passSuperD(content) {
  let changed = 0;

  // Match url('assets/digiwin-d-*.svg') or url("assets/digiwin-d-*.svg")
  // Both inside active CSS and inside comments
  content = content.replace(
    /url\(['"]?(assets\/digiwin-d-(outline|gradient|particle)\.svg)['"]?\)/g,
    (match, fullPath, variant) => {
      const filename = `digiwin-d-${variant}.svg`;
      const b64 = SVG_MAP[filename];
      if (!b64) return match; // SVG not found, skip
      changed++;
      return `url("data:image/svg+xml;base64,${b64}")`;
    }
  );

  return { content, changed };
}

// ════════════════════════════════════════════════════════════════
// PASS 1d: STRIP /* REF: BASE RULES */ COMMENT BLOCKS
// ════════════════════════════════════════════════════════════════

function passComments(content) {
  let changed = 0;
  const lines = content.split('\n');
  const out = [];
  let inRefBlock = false;

  for (const line of lines) {
    if (/\/\*\s*REF:/.test(line)) {
      inRefBlock = true;
      changed++;
      continue; // skip this line
    }

    if (inRefBlock) {
      // Continue skipping commented lines and blank lines
      if (/^\s*\/\*/.test(line) || /^\s*$/.test(line)) {
        continue;
      }
      // Non-comment, non-blank = end of REF block
      inRefBlock = false;
    }

    out.push(line);
  }

  return { content: out.join('\n'), changed: changed > 0 ? 1 : 0 };
}

// ════════════════════════════════════════════════════════════════
// VERIFICATION: require() + css() + blocks() before/after
// ════════════════════════════════════════════════════════════════

function verifyFile(filePath) {
  // Clear require cache so we get fresh module
  delete require.cache[require.resolve(filePath)];
  try {
    const mod = require(filePath);
    if (typeof mod.css !== 'function') return { ok: false, error: 'css() not a function' };
    if (typeof mod.blocks !== 'function') return { ok: false, error: 'blocks() not a function' };
    const cssOut = mod.css();
    const blocksOut = mod.blocks();
    if (typeof cssOut !== 'string') return { ok: false, error: 'css() did not return string' };
    // blocks() may return string or array (from wrapInDiviSection)
    if (blocksOut == null) return { ok: false, error: 'blocks() returned null/undefined' };
    return { ok: true, css: cssOut, blocks: blocksOut };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════

function main() {
  console.log(`\n  Retrofit Sections — ${DRY_RUN ? 'DRY RUN' : 'LIVE'} (scope: ${SCOPE})\n`);

  if (SCOPE === 'all' || SCOPE === 'super-d') {
    loadSvgBase64();
  }

  const files = fs.readdirSync(SECTIONS_DIR)
    .filter(f => f.endsWith('.js'))
    .sort();

  const stats = {
    unescape: { files: 0, fixes: 0 },
    important: { files: 0, fixes: 0 },
    superD: { files: 0, fixes: 0 },
    comments: { files: 0, fixes: 0 },
    errors: [],
    skipped: 0,
  };

  let totalFilesModified = 0;

  for (const file of files) {
    const filePath = path.join(SECTIONS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    let fileModified = false;

    // Run applicable passes
    if (SCOPE === 'all' || SCOPE === 'unescape') {
      const r = passUnescape(content);
      if (r.changed > 0) {
        content = r.content;
        stats.unescape.files++;
        stats.unescape.fixes += r.changed;
        fileModified = true;
      }
    }

    if (SCOPE === 'all' || SCOPE === 'important') {
      const r = passImportant(content);
      if (r.changed > 0) {
        content = r.content;
        stats.important.files++;
        stats.important.fixes += r.changed;
        fileModified = true;
      }
    }

    if (SCOPE === 'all' || SCOPE === 'super-d') {
      const r = passSuperD(content);
      if (r.changed > 0) {
        content = r.content;
        stats.superD.files++;
        stats.superD.fixes += r.changed;
        fileModified = true;
      }
    }

    if (SCOPE === 'all' || SCOPE === 'comments') {
      const r = passComments(content);
      if (r.changed > 0) {
        content = r.content;
        stats.comments.files++;
        stats.comments.fixes += r.changed;
        fileModified = true;
      }
    }

    if (!fileModified) {
      stats.skipped++;
      continue;
    }

    totalFilesModified++;

    if (DRY_RUN) {
      console.log(`  ⊙ ${file} — would change`);
      continue;
    }

    // LIVE: write patched content, then verify (revert on failure)
    fs.writeFileSync(filePath, content);

    const afterVerify = verifyFile(filePath);

    if (!afterVerify.ok) {
      // Revert to original
      fs.writeFileSync(filePath, original);
      stats.errors.push({ file, error: `Post-patch verify failed: ${afterVerify.error}` });
      console.log(`  ✗ ${file} — REVERTED (verify failed: ${afterVerify.error})`);
      totalFilesModified--;
      continue;
    }

    console.log(`  ✓ ${file} — patched`);
  }

  // ── Summary ──
  console.log(`\n  ── Summary ──`);
  if (SCOPE === 'all' || SCOPE === 'unescape') {
    console.log(`  Unescape:    ${stats.unescape.files} files, ${stats.unescape.fixes} replacements`);
  }
  if (SCOPE === 'all' || SCOPE === 'important') {
    console.log(`  !important:  ${stats.important.files} files, ${stats.important.fixes} replacements`);
  }
  if (SCOPE === 'all' || SCOPE === 'super-d') {
    console.log(`  Super D SVG: ${stats.superD.files} files, ${stats.superD.fixes} replacements`);
  }
  if (SCOPE === 'all' || SCOPE === 'comments') {
    console.log(`  REF blocks:  ${stats.comments.files} files stripped`);
  }
  console.log(`  Total:       ${totalFilesModified} files modified, ${stats.skipped} unchanged`);

  if (stats.errors.length > 0) {
    console.log(`\n  ⚠ ${stats.errors.length} errors:`);
    for (const e of stats.errors) {
      console.log(`    ${e.file}: ${e.error}`);
    }
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log(`\n  This was a dry run. Use --live to apply changes.\n`);
  } else {
    console.log(`\n  Done. All patched files verified (css() + blocks() pass).\n`);
  }
}

main();
