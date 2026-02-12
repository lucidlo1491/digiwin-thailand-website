#!/usr/bin/env node
/**
 * DigiWin Website Audit Script
 *
 * Automated accessibility and quality checks for all built pages.
 * Run after every build:  node complete_website/audit.js
 *
 * Checks per page:
 *   1. Skip-to-content link present
 *   2. <main> landmark present
 *   3. No low-contrast text — color: rgba(255,255,255,X) where X < 0.75
 *   4. prefers-reduced-motion present if page has inline @keyframes
 *   5. Form inputs have associated <label for="id">
 *
 * Also checks shared styles.css for contrast issues.
 *
 * Exit code 0 = all pass, 1 = failures found.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const STYLES_PATH = path.join(ROOT_DIR, 'styles.css');

// Skip non-page HTML files
const EXCLUDE_FILES = new Set([
    'brand-preview.html',
    'generate-vortex-canvas.html',
    'vortex-generator.html'
]);
const EXCLUDE_DIRS = new Set(['src', 'node_modules', 'assets', '.git']);

// ANSI helpers
const c = {
    g: '\x1b[32m', y: '\x1b[33m', r: '\x1b[31m',
    d: '\x1b[2m', b: '\x1b[1m', x: '\x1b[0m'
};

// ── File discovery ──────────────────────────────────────────────────

function findPages(dir, base = dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (EXCLUDE_DIRS.has(entry.name)) continue;
        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            out.push(...findPages(full, base));
        } else if (entry.name.endsWith('.html') && !EXCLUDE_FILES.has(entry.name)) {
            out.push({ full, rel: path.relative(base, full) });
        }
    }
    return out;
}

// ── Utility ─────────────────────────────────────────────────────────

function extractInlineCSS(html) {
    const parts = [];
    const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = re.exec(html)) !== null) parts.push(m[1]);
    return parts.join('\n');
}

function result(id, label, pass, detail) {
    return { id, label, pass, detail: pass ? null : detail };
}

// ── Check 1: Skip-to-content link ──────────────────────────────────

function checkSkipLink(html) {
    const ok = /class=["'][^"']*dw-skip-link[^"']*["']/.test(html);
    return result('skip-link', 'Skip-to-content link', ok,
        'No <a class="dw-skip-link"> found. Add before {{header}} in the source template.');
}

// ── Check 2: <main> landmark ───────────────────────────────────────

function checkMainLandmark(html) {
    const ok = /<main[\s>]/i.test(html);
    return result('main-landmark', '<main> landmark', ok,
        'No <main> element found. Wrap primary content in <main>.');
}

// ── Check 3: Low-contrast text on dark backgrounds ─────────────────
//    Flags color: rgba(255,255,255, X) where X < 0.75

function findLowContrastText(css) {
    const issues = [];
    const re = /([a-z-]*color)\s*:\s*rgba\(\s*255[\s,]+255[\s,]+255[\s,]+([\d.]+)\s*\)/gi;
    let m;
    while ((m = re.exec(css)) !== null) {
        const prop = m[1].toLowerCase();
        // Only flag text color, not background-color / border-color / etc.
        if (prop !== 'color') continue;
        const alpha = parseFloat(m[2]);
        if (alpha < 0.75) {
            issues.push(`color: rgba(255,255,255,${m[2]})`);
        }
    }
    return issues;
}

function checkContrast(html) {
    const inlineCSS = extractInlineCSS(html);
    // Also check style="" attributes
    const styleAttrs = [];
    const attrRe = /style\s*=\s*["']([^"']+)["']/gi;
    let m;
    while ((m = attrRe.exec(html)) !== null) styleAttrs.push(m[1]);

    const allCSS = inlineCSS + '\n' + styleAttrs.join('\n');
    const issues = findLowContrastText(allCSS);

    return result('contrast', 'Text contrast (≥0.75 opacity)', issues.length === 0,
        issues.join('; '));
}

// ── Check 4: prefers-reduced-motion ────────────────────────────────
//    Required if inline <style> contains @keyframes or animation

function checkReducedMotion(html) {
    const inlineCSS = extractInlineCSS(html);
    if (!inlineCSS) {
        return result('reduced-motion', 'prefers-reduced-motion', true, null);
    }

    const hasKeyframes = /@keyframes\s/i.test(inlineCSS);
    const hasAnimation = /animation\s*:|animation-name\s*:/i.test(inlineCSS);

    if (!hasKeyframes && !hasAnimation) {
        return result('reduced-motion', 'prefers-reduced-motion', true, null);
    }

    const hasQuery = /prefers-reduced-motion/i.test(inlineCSS);
    return result('reduced-motion', 'prefers-reduced-motion', hasQuery,
        'Inline <style> has @keyframes/animation but no prefers-reduced-motion media query.');
}

// ── Check 5: Form label associations ───────────────────────────────

function isWrappedInLabel(html, inputIndex) {
    // Count all <label> opens vs </label> closes from document start to input position.
    // If opens > closes, the input is inside an unclosed <label>.
    const before = html.substring(0, inputIndex);
    const opens = (before.match(/<label[\s>]/gi) || []).length;
    const closes = (before.match(/<\/label>/gi) || []).length;
    return opens > closes;
}

function checkFormLabels(html) {
    const issues = [];
    const inputRe = /<(input|select|textarea)\s([^>]*?)>/gi;
    let m;

    while ((m = inputRe.exec(html)) !== null) {
        const tag = m[1].toLowerCase();
        const attrs = m[2];

        // Skip types that don't need visible labels
        const typeM = attrs.match(/type\s*=\s*["'](\w+)["']/i);
        const type = typeM ? typeM[1].toLowerCase() : (tag === 'input' ? 'text' : '');
        if (['hidden', 'submit', 'button', 'reset', 'image'].includes(type)) continue;

        // Skip if has aria-label or aria-labelledby
        if (/aria-label(ledby)?\s*=/i.test(attrs)) continue;

        // Skip if wrapped in a <label> element (implicit association)
        if (isWrappedInLabel(html, m.index)) continue;

        // Must have an id
        const idM = attrs.match(/id\s*=\s*["']([^"']+)["']/i);
        if (!idM) {
            const nameM = attrs.match(/name\s*=\s*["']([^"']+)["']/i);
            issues.push(`<${tag}> "${nameM ? nameM[1] : '(unnamed)'}" has no id for label association`);
            continue;
        }

        // Must have a matching <label for="...">
        const escaped = idM[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (!new RegExp(`<label[^>]*\\bfor\\s*=\\s*["']${escaped}["']`, 'i').test(html)) {
            issues.push(`<${tag} id="${idM[1]}"> has no matching <label for="${idM[1]}">`);
        }
    }

    return result('form-labels', 'Form label associations', issues.length === 0,
        issues.join('; '));
}

// ── Shared CSS check ───────────────────────────────────────────────

function auditSharedCSS() {
    if (!fs.existsSync(STYLES_PATH)) return [];
    const css = fs.readFileSync(STYLES_PATH, 'utf8');
    return findLowContrastText(css);
}

// ── Run all checks on one page ─────────────────────────────────────

function auditPage(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    return [
        checkSkipLink(html),
        checkMainLandmark(html),
        checkContrast(html),
        checkReducedMotion(html),
        checkFormLabels(html)
    ];
}

// ── Main ────────────────────────────────────────────────────────────

function main() {
    const startTime = Date.now();
    console.log(`\n${c.b}🔍 Auditing DigiWin website...${c.x}\n`);

    const pages = findPages(ROOT_DIR);
    if (pages.length === 0) {
        console.log(`${c.y}!${c.x} No HTML pages found. Run ${c.b}node build.js${c.x} first.\n`);
        process.exit(1);
    }

    let passCount = 0;
    let failCount = 0;
    const allFailures = [];

    for (const { full, rel } of pages) {
        const results = auditPage(full);
        const failed = results.filter(r => !r.pass);

        if (failed.length === 0) {
            console.log(`${c.g}✓${c.x} ${rel} ${c.d}(${results.length}/${results.length})${c.x}`);
            passCount++;
        } else {
            const passed = results.length - failed.length;
            console.log(`${c.r}✗${c.x} ${rel} ${c.d}(${passed}/${results.length})${c.x}`);
            for (const f of failed) {
                console.log(`  ${c.r}↳${c.x} ${f.label}: ${f.detail}`);
            }
            failCount++;
            allFailures.push({ page: rel, issues: failed });
        }
    }

    // Shared CSS contrast check
    const cssIssues = auditSharedCSS();
    console.log('');
    if (cssIssues.length > 0) {
        console.log(`${c.r}✗${c.x} styles.css — low-contrast text: ${cssIssues.join('; ')}`);
        failCount++;
    } else {
        console.log(`${c.g}✓${c.x} styles.css — no low-contrast text`);
    }

    // Summary
    const elapsed = Date.now() - startTime;
    console.log('');

    if (failCount === 0) {
        console.log(`${c.g}${c.b}✓ All ${passCount} pages + shared CSS passed${c.x} ${c.d}(${elapsed}ms)${c.x}\n`);
        process.exit(0);
    } else {
        console.log(`${c.r}${c.b}✗ ${failCount} failure(s)${c.x}, ${passCount} passed ${c.d}(${elapsed}ms)${c.x}`);
        console.log(`${c.d}Fix issues above, rebuild, and re-run: node audit.js${c.x}\n`);
        process.exit(1);
    }
}

main();
