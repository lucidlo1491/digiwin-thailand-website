#!/usr/bin/env node
/**
 * DigiWin Website — Broken Link & Image Checker
 *
 * Scans all built HTML pages for:
 *   1. Internal href links that don't resolve to a file
 *   2. Internal img src that don't resolve to a file
 *   3. Anchor links (#id) that don't match an id in the target page
 *
 * Usage:  node check-links.js
 * Exit:   0 = clean, 1 = broken links found
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const EXCLUDE_DIRS = new Set(['src', 'node_modules', 'assets', '.git', 'logos']);
const EXCLUDE_FILES = new Set(['brand-preview.html', 'generate-vortex-canvas.html', 'vortex-generator.html']);

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', d: '\x1b[2m', b: '\x1b[1m', x: '\x1b[0m' };

function findPages(dir, base = dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (EXCLUDE_DIRS.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...findPages(full, base));
        else if (entry.name.endsWith('.html') && !EXCLUDE_FILES.has(entry.name))
            out.push({ full, rel: path.relative(base, full) });
    }
    return out;
}

function extractLinks(html) {
    const hrefs = [];
    const re = /href\s*=\s*["']([^"']+)["']/gi;
    let m;
    while ((m = re.exec(html)) !== null) hrefs.push(m[1]);
    return hrefs;
}

function extractImages(html) {
    const srcs = [];
    const re = /(?:src|srcset)\s*=\s*["']([^"'\s,]+)/gi;
    let m;
    while ((m = re.exec(html)) !== null) srcs.push(m[1]);
    return srcs;
}

function extractIds(html) {
    const ids = new Set();
    const re = /id\s*=\s*["']([^"']+)["']/gi;
    let m;
    while ((m = re.exec(html)) !== null) ids.add(m[1]);
    return ids;
}

function isExternal(url) {
    return /^(https?:|mailto:|tel:|javascript:|#$|data:)/.test(url);
}

function main() {
    console.log(`\n${c.b}🔗 Checking links & images...${c.x}\n`);

    const pages = findPages(ROOT);
    let brokenCount = 0;
    let checkedCount = 0;
    const allIds = {};

    // Pre-index all page IDs for anchor checking
    for (const { full, rel } of pages) {
        const html = fs.readFileSync(full, 'utf8');
        allIds[rel] = extractIds(html);
    }

    for (const { full, rel } of pages) {
        const html = fs.readFileSync(full, 'utf8');
        const dir = path.dirname(full);
        const issues = [];

        // Check hrefs
        for (const href of extractLinks(html)) {
            if (isExternal(href)) continue;
            checkedCount++;

            // Pure anchor link
            if (href.startsWith('#')) {
                const id = href.slice(1);
                if (id && !allIds[rel]?.has(id)) {
                    issues.push(`href="${href}" — anchor #${id} not found in this page`);
                    brokenCount++;
                }
                continue;
            }

            // Split path and anchor
            const [filePart, anchor] = href.split('#');
            const resolved = path.resolve(dir, filePart);
            const resolvedRel = path.relative(ROOT, resolved);

            if (!fs.existsSync(resolved)) {
                issues.push(`href="${href}" — file not found`);
                brokenCount++;
            } else if (anchor && allIds[resolvedRel] && !allIds[resolvedRel].has(anchor)) {
                issues.push(`href="${href}" — file exists but #${anchor} not found`);
                brokenCount++;
            }
        }

        // Check images
        for (const src of extractImages(html)) {
            if (isExternal(src)) continue;
            checkedCount++;
            const resolved = path.resolve(dir, src);
            if (!fs.existsSync(resolved)) {
                issues.push(`src="${src}" — image not found`);
                brokenCount++;
            }
        }

        if (issues.length === 0) {
            console.log(`${c.g}✓${c.x} ${rel}`);
        } else {
            console.log(`${c.r}✗${c.x} ${rel}`);
            for (const issue of issues) {
                console.log(`  ${c.r}↳${c.x} ${issue}`);
            }
        }
    }

    console.log('');
    if (brokenCount === 0) {
        console.log(`${c.g}${c.b}✓ All ${checkedCount} links & images valid across ${pages.length} pages${c.x}\n`);
        process.exit(0);
    } else {
        console.log(`${c.r}${c.b}✗ ${brokenCount} broken${c.x} out of ${checkedCount} checked ${c.d}(${pages.length} pages)${c.x}\n`);
        process.exit(1);
    }
}

main();
