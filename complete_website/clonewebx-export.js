#!/usr/bin/env node
/**
 * DigiWin Website — CloneWebX Export Manager
 *
 * Automates the tedious parts of the CloneWebX export workflow:
 *   1. Opens each page in your default browser (Chrome with CloneWebX)
 *   2. Waits for you to scroll + export
 *   3. Detects the downloaded JSON, renames it with proper naming + versioning
 *   4. Moves it to the project exports folder with a manifest
 *
 * Usage:
 *   node clonewebx-export.js                  # Export all pages (interactive)
 *   node clonewebx-export.js --changed         # Export only pages that changed since last export (uses git)
 *   node clonewebx-export.js --page homepage   # Export one specific page (picker if no slug given)
 *   node clonewebx-export.js --batch 0         # Export one batch (picker if no number given)
 *   node clonewebx-export.js --list            # Show all pages + latest versions
 *   node clonewebx-export.js --latest homepage  # Print path to latest export for a page
 *
 * Naming convention:
 *   {slug}_v{N}.json  (e.g., homepage_v1.json, products-erp_v2.json)
 *
 * Exit: 0 = success, 1 = error
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// ─── Configuration ───────────────────────────────────────────────────────────

const GITHUB_PAGES_BASE = 'https://lucidlo1491.github.io/digiwin-thailand-website';
const DOWNLOADS_DIR = path.join(require('os').homedir(), 'Downloads');
const EXPORTS_DIR = path.join(__dirname, 'clonewebx-exports');
const MANIFEST_PATH = path.join(EXPORTS_DIR, 'manifest.json');

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', cy: '\x1b[36m', b: '\x1b[1m', d: '\x1b[2m', x: '\x1b[0m' };

// ─── Page Manifest ───────────────────────────────────────────────────────────
// Every page with its slug, URL path, display name, and batch number.

const PAGES = [
    // Batch 0: Global + Homepage
    { slug: 'homepage',                     path: 'index.html',                                    name: 'Homepage',                       batch: 0 },

    // Batch 1: Partner Program
    { slug: 'partner-hub',                  path: 'partner-program.html',                           name: 'Partner Program Hub',            batch: 1 },
    { slug: 'partner-business-model',       path: 'partner-program/business-model.html',            name: 'Partner Business Model',         batch: 1 },
    { slug: 'partner-economics',            path: 'partner-program/economics.html',                 name: 'Partner Economics',              batch: 1 },
    { slug: 'partner-solutions',            path: 'partner-program/solutions.html',                 name: 'Partner Solutions',              batch: 1 },

    // Batch 2: Products
    { slug: 'products-hub',                 path: 'products.html',                                  name: 'Products Hub',                   batch: 2 },
    { slug: 'products-erp',                 path: 'products/erp.html',                              name: 'ERP',                            batch: 2 },
    { slug: 'products-mes',                 path: 'products/mes.html',                              name: 'MES',                            batch: 2 },
    { slug: 'products-wms',                 path: 'products/wms.html',                              name: 'WMS',                            batch: 2 },
    { slug: 'products-aiot',               path: 'products/aiot.html',                             name: 'AIoT',                           batch: 2 },

    // Batch 3: Industries
    { slug: 'industries-hub',               path: 'industries.html',                                name: 'Industries Hub',                 batch: 3 },
    { slug: 'industries-automotive',        path: 'industries/automotive.html',                     name: 'Automotive',                     batch: 3 },
    { slug: 'industries-electronics',       path: 'industries/electronics.html',                    name: 'Electronics',                    batch: 3 },
    { slug: 'industries-metal-plastics',    path: 'industries/metal-plastics.html',                 name: 'Metal & Plastics',               batch: 3 },

    // Batch 4: About
    { slug: 'about',                        path: 'about.html',                                    name: 'About Us',                       batch: 4 },

    // Batch 5: Contact + Case Studies
    { slug: 'contact',                      path: 'demo.html',                                     name: 'Contact / Get in Touch',         batch: 5 },
    { slug: 'case-studies',                 path: 'case-studies.html',                              name: 'Case Studies',                   batch: 5 },
    { slug: 'partner-one-pager',            path: 'partner-one-pager.html',                         name: 'Partner One-Pager',              batch: 5 },

    // Batch 6: Blog & News Hubs
    { slug: 'blog-hub',                     path: 'blog.html',                                     name: 'Blog Hub',                       batch: 6 },
    { slug: 'news-hub',                     path: 'news.html',                                     name: 'News Hub',                       batch: 6 },

    // Batch 7: Blog Articles
    { slug: 'blog-five-pain-points',        path: 'blog/five-pain-points.html',                    name: 'Blog: Five Pain Points',         batch: 7 },
    { slug: 'blog-boi-compliance',          path: 'blog/boi-compliance-jin-hai.html',              name: 'Blog: BOI Compliance',           batch: 7 },
    { slug: 'blog-sap-end-of-life',         path: 'blog/sap-ecc-end-of-life.html',                name: 'Blog: SAP End of Life',          batch: 7 },
    { slug: 'blog-shop-floor',              path: 'blog/shop-floor-scheduling.html',               name: 'Blog: Shop Floor Scheduling',    batch: 7 },
    { slug: 'blog-production-transparency', path: 'blog/production-transparency.html',             name: 'Blog: Production Transparency',  batch: 7 },
    { slug: 'blog-amrp',                    path: 'blog/amrp-capacity-planning.html',              name: 'Blog: AMRP Capacity Planning',  batch: 7 },
    { slug: 'blog-lrp-vs-mrp',             path: 'blog/lrp-vs-mrp.html',                         name: 'Blog: LRP vs MRP',              batch: 7 },
    { slug: 'blog-co-product',              path: 'blog/co-product-cost-accounting.html',          name: 'Blog: Co-Product Accounting',   batch: 7 },
    { slug: 'blog-dual-units',              path: 'blog/dual-units.html',                          name: 'Blog: Dual Units',              batch: 7 },
    { slug: 'blog-feature-codes',           path: 'blog/feature-codes.html',                       name: 'Blog: Feature Codes',           batch: 7 },

    // Batch 8: Events
    { slug: 'event-boi-workshop',           path: 'events/boi-compliance-workshop.html',           name: 'Event: BOI Workshop',            batch: 8 },
    { slug: 'event-factory-tour',           path: 'events/factory-tour-mes.html',                  name: 'Event: Factory Tour MES',        batch: 8 },
    { slug: 'event-mfg-expo',              path: 'events/manufacturing-expo-2026.html',            name: 'Event: Manufacturing Expo 2026', batch: 8 },
    { slug: 'event-transparency-seminar',   path: 'events/production-transparency-seminar.html',   name: 'Event: Transparency Seminar',    batch: 8 },
    { slug: 'event-shop-floor-workshop',    path: 'events/shop-floor-data-workshop.html',          name: 'Event: Shop Floor Workshop',     batch: 8 },

    // Batch 9: Legal
    { slug: 'privacy-policy',               path: 'privacy-policy.html',                           name: 'Privacy Policy',                 batch: 9 },
    { slug: 'terms',                        path: 'terms.html',                                    name: 'Terms of Service',               batch: 9 },
];

// ─── Manifest Management ─────────────────────────────────────────────────────

function loadManifest() {
    if (fs.existsSync(MANIFEST_PATH)) {
        return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    }
    return {};
}

function saveManifest(manifest) {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
}

function getNextVersion(manifest, slug) {
    const entry = manifest[slug];
    return entry ? entry.latestVersion + 1 : 1;
}

function getLatestFile(manifest, slug) {
    const entry = manifest[slug];
    if (!entry) return null;
    return path.join(EXPORTS_DIR, entry.latestFile);
}

// ─── File Detection ──────────────────────────────────────────────────────────

function findNewestJson(afterTimestamp) {
    // Look in Downloads for .json files created after our timestamp
    const files = fs.readdirSync(DOWNLOADS_DIR)
        .filter(f => f.endsWith('.json'))
        .map(f => {
            const full = path.join(DOWNLOADS_DIR, f);
            const stat = fs.statSync(full);
            return { name: f, full, mtime: stat.mtimeMs };
        })
        .filter(f => f.mtime > afterTimestamp)
        .sort((a, b) => b.mtime - a.mtime);

    return files.length > 0 ? files[0] : null;
}

// Also check the CloneWebX-specific subfolder
function findNewestJsonAnywhere(afterTimestamp) {
    const clonewebxDir = path.join(DOWNLOADS_DIR, 'Digiwin Clonewebx');
    const dirs = [DOWNLOADS_DIR];
    if (fs.existsSync(clonewebxDir)) dirs.push(clonewebxDir);

    let newest = null;
    for (const dir of dirs) {
        const files = fs.readdirSync(dir)
            .filter(f => f.endsWith('.json'))
            .map(f => {
                const full = path.join(dir, f);
                const stat = fs.statSync(full);
                return { name: f, full, mtime: stat.mtimeMs };
            })
            .filter(f => f.mtime > afterTimestamp);

        for (const f of files) {
            if (!newest || f.mtime > newest.mtime) newest = f;
        }
    }
    return newest;
}

// ─── Interactive Prompt ──────────────────────────────────────────────────────

function createReadline() {
    return readline.createInterface({ input: process.stdin, output: process.stdout });
}

function askQuestion(rl, question) {
    return new Promise(resolve => rl.question(question, resolve));
}

// ─── Commands ────────────────────────────────────────────────────────────────

function cmdList() {
    const manifest = loadManifest();
    const batchNames = {
        0: 'Homepage', 1: 'Partner Program', 2: 'Products', 3: 'Industries',
        4: 'About', 5: 'Contact + Misc', 6: 'Blog & News Hubs', 7: 'Blog Articles',
        8: 'Events', 9: 'Legal'
    };

    let currentBatch = -1;
    console.log(`\n${c.b}CloneWebX Export Status${c.x}\n`);

    for (const page of PAGES) {
        if (page.batch !== currentBatch) {
            currentBatch = page.batch;
            console.log(`${c.cy}── Batch ${currentBatch}: ${batchNames[currentBatch]} ──${c.x}`);
        }

        const entry = manifest[page.slug];
        if (entry) {
            const age = Math.round((Date.now() - new Date(entry.exportedAt).getTime()) / (1000 * 60 * 60 * 24));
            console.log(`  ${c.g}✓${c.x} ${page.slug.padEnd(32)} v${entry.latestVersion}  ${c.d}(${age}d ago)${c.x}`);
        } else {
            console.log(`  ${c.r}○${c.x} ${page.slug.padEnd(32)} ${c.d}no export${c.x}`);
        }
    }

    const exported = Object.keys(manifest).length;
    console.log(`\n${c.b}${exported}/${PAGES.length} pages exported${c.x}\n`);
}

function cmdLatest(slug) {
    const manifest = loadManifest();
    const filePath = getLatestFile(manifest, slug);

    if (!filePath) {
        console.error(`${c.r}No export found for "${slug}"${c.x}`);
        console.error(`Run: node clonewebx-export.js --page ${slug}`);
        process.exit(1);
    }

    if (!fs.existsSync(filePath)) {
        console.error(`${c.r}Manifest references ${filePath} but file is missing${c.x}`);
        process.exit(1);
    }

    // Print just the path — useful for piping into other scripts
    console.log(filePath);
}

async function cmdExport(pagesToExport) {
    const manifest = loadManifest();
    const rl = createReadline();
    let exported = 0;

    console.log(`\n${c.b}━━━ CloneWebX Export Session ━━━${c.x}`);
    console.log(`${c.d}Pages to export: ${pagesToExport.length}${c.x}`);
    console.log(`${c.d}Exports folder:  ${EXPORTS_DIR}${c.x}`);
    console.log(`${c.d}Watching:        ${DOWNLOADS_DIR} (and Digiwin Clonewebx subfolder)${c.x}\n`);
    console.log(`${c.y}Workflow per page:${c.x}`);
    console.log(`  1. Browser opens automatically`);
    console.log(`  2. Scroll all the way to the bottom (trigger lazy content)`);
    console.log(`  3. Click CloneWebX extension → Export`);
    console.log(`  4. Press ${c.b}Enter${c.x} here when the download finishes`);
    console.log(`  ${c.d}(Type "skip" to skip a page, "quit" to stop)${c.x}\n`);

    for (let i = 0; i < pagesToExport.length; i++) {
        const page = pagesToExport[i];
        const url = `${GITHUB_PAGES_BASE}/${page.path}`;
        const version = getNextVersion(manifest, page.slug);

        console.log(`${c.b}▸ [${i + 1}/${pagesToExport.length}] ${page.name}${c.x}`);
        console.log(`  ${c.d}URL:  ${url}${c.x}`);
        console.log(`  ${c.d}Will save as: ${page.slug}_v${version}.json${c.x}`);

        // Record timestamp before opening
        const beforeTimestamp = Date.now();

        // Open URL in default browser
        try {
            execSync(`open "${url}"`, { stdio: 'ignore' });
        } catch (e) {
            console.log(`  ${c.y}Could not open browser automatically. Please open manually.${c.x}`);
        }

        // Wait for user
        const answer = await askQuestion(rl, `  ${c.cy}Press Enter when exported (or "skip"/"quit"): ${c.x}`);

        if (answer.trim().toLowerCase() === 'quit') {
            console.log(`\n${c.y}Stopped. ${exported} pages exported this session.${c.x}\n`);
            break;
        }

        if (answer.trim().toLowerCase() === 'skip') {
            console.log(`  ${c.d}Skipped${c.x}\n`);
            continue;
        }

        // Find the downloaded file
        // Give a small buffer (file might still be writing)
        await new Promise(r => setTimeout(r, 500));

        const found = findNewestJsonAnywhere(beforeTimestamp);

        if (!found) {
            console.log(`  ${c.r}⚠ No new .json file detected in Downloads since opening this page.${c.x}`);
            console.log(`  ${c.d}Looked in: ${DOWNLOADS_DIR}${c.x}`);
            const retry = await askQuestion(rl, `  ${c.y}Try again? (Enter to retry, "skip" to skip): ${c.x}`);
            if (retry.trim().toLowerCase() === 'skip') {
                console.log(`  ${c.d}Skipped${c.x}\n`);
                continue;
            }
            // Retry detection
            const retryFound = findNewestJsonAnywhere(beforeTimestamp);
            if (!retryFound) {
                console.log(`  ${c.r}Still no file found. Skipping this page.${c.x}\n`);
                continue;
            }
            // Use the retry result
            processExport(retryFound, page, version, manifest);
            exported++;
            continue;
        }

        processExport(found, page, version, manifest);
        exported++;
    }

    rl.close();
    console.log(`\n${c.b}━━━ Session Complete ━━━${c.x}`);
    console.log(`${c.g}${exported} pages exported and renamed${c.x}`);
    console.log(`${c.d}Manifest updated: ${MANIFEST_PATH}${c.x}\n`);
}

function processExport(found, page, version, manifest) {
    const destFilename = `${page.slug}_v${version}.json`;
    const destPath = path.join(EXPORTS_DIR, destFilename);

    // Move and rename
    fs.copyFileSync(found.full, destPath);
    fs.unlinkSync(found.full); // Remove from Downloads

    const sizeKB = Math.round(fs.statSync(destPath).size / 1024);

    // Update manifest
    manifest[page.slug] = {
        latestVersion: version,
        latestFile: destFilename,
        exportedAt: new Date().toISOString(),
        sourceUrl: `${GITHUB_PAGES_BASE}/${page.path}`,
        pageName: page.name,
        sizeKB: sizeKB
    };
    saveManifest(manifest);

    console.log(`  ${c.g}✓ Saved: ${destFilename}${c.x} ${c.d}(${sizeKB} KB)${c.x}`);
    console.log(`  ${c.d}Original: ${found.name} → renamed + moved${c.x}\n`);
}

// ─── Git-Based Change Detection ──────────────────────────────────────────────

function getGitLastModified(filePath) {
    // Returns the timestamp of the last git commit that touched this file
    try {
        const result = execSync(
            `git log -1 --format=%aI -- "${filePath}"`,
            { cwd: path.resolve(__dirname, '..'), encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
        ).trim();
        return result ? new Date(result).getTime() : 0;
    } catch {
        return 0;
    }
}

function findChangedPages() {
    const manifest = loadManifest();
    const changed = [];

    for (const page of PAGES) {
        const htmlFile = page.path; // e.g., 'index.html', 'products/erp.html'
        const gitModified = getGitLastModified(htmlFile);
        const entry = manifest[page.slug];

        if (!entry) {
            // Never exported — always include
            changed.push({ page, reason: 'never exported' });
        } else {
            const exportedAt = new Date(entry.exportedAt).getTime();
            if (gitModified > exportedAt) {
                const daysAgo = Math.round((Date.now() - exportedAt) / (1000 * 60 * 60 * 24));
                changed.push({ page, reason: `changed since v${entry.latestVersion} (exported ${daysAgo}d ago)` });
            }
        }
    }

    return changed;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
    const args = process.argv.slice(2);

    // Ensure exports directory exists
    if (!fs.existsSync(EXPORTS_DIR)) {
        fs.mkdirSync(EXPORTS_DIR, { recursive: true });
    }

    // --list: show status
    if (args.includes('--list')) {
        cmdList();
        return;
    }

    // --changed: export only pages whose HTML changed since last export
    if (args.includes('--changed')) {
        const changed = findChangedPages();
        if (changed.length === 0) {
            console.log(`\n${c.g}${c.b}✓ All pages are up to date.${c.x} No re-export needed.\n`);
            return;
        }
        console.log(`\n${c.b}${changed.length} page(s) changed since last export:${c.x}\n`);
        for (const { page, reason } of changed) {
            console.log(`  ${c.y}●${c.x} ${page.name.padEnd(32)} ${c.d}${reason}${c.x}`);
        }
        console.log('');
        const rl = createReadline();
        const answer = await askQuestion(rl, `${c.cy}Export these ${changed.length} pages? (Enter = yes, "quit" = cancel): ${c.x}`);
        rl.close();
        if (answer.trim().toLowerCase() === 'quit') {
            console.log(`${c.d}Cancelled.${c.x}\n`);
            return;
        }
        await cmdExport(changed.map(c => c.page));
        return;
    }

    // --latest <slug>: print path to latest export
    const latestIdx = args.indexOf('--latest');
    if (latestIdx !== -1) {
        const slug = args[latestIdx + 1];
        if (!slug) {
            console.error(`Usage: node clonewebx-export.js --latest <slug>`);
            process.exit(1);
        }
        cmdLatest(slug);
        return;
    }

    // --page <slug>: export one page (shows picker if no slug given)
    const pageIdx = args.indexOf('--page');
    if (pageIdx !== -1) {
        let slug = args[pageIdx + 1];
        if (!slug || slug.startsWith('--')) {
            // No slug provided — show picker
            console.log(`\n${c.b}Pick a page to export:${c.x}\n`);
            PAGES.forEach((p, i) => {
                console.log(`  ${c.cy}${String(i + 1).padStart(2)}.${c.x} ${p.slug.padEnd(32)} ${c.d}${p.name}${c.x}`);
            });
            const rl = createReadline();
            const answer = await askQuestion(rl, `\n${c.cy}Enter number (1-${PAGES.length}): ${c.x}`);
            rl.close();
            const num = parseInt(answer.trim(), 10);
            if (num < 1 || num > PAGES.length) {
                console.error(`${c.r}Invalid choice${c.x}`);
                process.exit(1);
            }
            await cmdExport([PAGES[num - 1]]);
            return;
        }
        const page = PAGES.find(p => p.slug === slug);
        if (!page) {
            console.error(`${c.r}Unknown page slug: "${slug}"${c.x}`);
            console.error(`Available slugs:`);
            PAGES.forEach(p => console.error(`  ${p.slug}`));
            process.exit(1);
        }
        await cmdExport([page]);
        return;
    }

    // --batch <N>: export one batch (shows picker if no number given)
    const batchIdx = args.indexOf('--batch');
    if (batchIdx !== -1) {
        const batchNames = {
            0: 'Homepage',           1: 'Partner Program (4 pages)',
            2: 'Products (5 pages)', 3: 'Industries (4 pages)',
            4: 'About Us (1 page)',  5: 'Contact + Misc (3 pages)',
            6: 'Blog & News Hubs (2 pages)', 7: 'Blog Articles (10 pages)',
            8: 'Events (5 pages)',   9: 'Legal (2 pages)'
        };
        let batchNum = parseInt(args[batchIdx + 1], 10);
        if (isNaN(batchNum)) {
            // No number provided — show picker
            console.log(`\n${c.b}Pick a batch to export:${c.x}\n`);
            for (let i = 0; i <= 9; i++) {
                const count = PAGES.filter(p => p.batch === i).length;
                console.log(`  ${c.cy}${i}.${c.x} ${batchNames[i]}`);
            }
            const rl = createReadline();
            const answer = await askQuestion(rl, `\n${c.cy}Enter batch number (0-9): ${c.x}`);
            rl.close();
            batchNum = parseInt(answer.trim(), 10);
        }
        const batchPages = PAGES.filter(p => p.batch === batchNum);
        if (batchPages.length === 0) {
            console.error(`${c.r}No pages in batch ${batchNum}${c.x}`);
            process.exit(1);
        }
        await cmdExport(batchPages);
        return;
    }

    // Default: export all
    await cmdExport(PAGES);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
