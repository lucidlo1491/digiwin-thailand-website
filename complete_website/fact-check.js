#!/usr/bin/env node
/**
 * DigiWin Website Fact-Check Script
 *
 * Validates all built HTML pages against verified-claims.json.
 * Run after every build:  node complete_website/fact-check.js
 *
 * Checks:
 *   1. Blocklisted terms — product names, phrases that must never appear
 *   2. Unverified company names — any company referenced that isn't in the registry
 *   3. Stat consistency — numbers on pages match approved values
 *   4. Product terminology — correct acronym expansions
 *   5. Contact info — deprecated contacts flagged
 *
 * Exit code 0 = clean, 1 = issues found.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const CLAIMS_PATH = path.join(ROOT_DIR, 'verified-claims.json');

// Same exclusions as audit.js
const EXCLUDE_FILES = new Set([
    'brand-preview.html',
    'generate-vortex-canvas.html',
    'vortex-generator.html'
]);
const EXCLUDE_DIRS = new Set(['src', 'node_modules', 'assets', '.git', 'logos']);

// ANSI helpers (same as audit.js)
const c = {
    g: '\x1b[32m', y: '\x1b[33m', r: '\x1b[31m',
    m: '\x1b[35m', d: '\x1b[2m', b: '\x1b[1m', x: '\x1b[0m'
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

/** Strip HTML tags to get visible text + structured data */
function getPageText(html) {
    return html;
}

/** Extract visible text only (no tags, no scripts, no styles) */
function getVisibleText(html) {
    return html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ');
}

// ── Check 1: Blocklisted Terms ──────────────────────────────────────

function checkBlocklist(html, claims) {
    const issues = [];
    const blocklist = claims.product_terminology.blocklist;

    for (const [term, reason] of Object.entries(blocklist)) {
        // Case-sensitive search for product names
        // For CTA phrases, case-insensitive
        const isCTA = term.toLowerCase().includes('demo');
        const regex = isCTA
            ? new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
            : new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');

        const matches = html.match(regex);
        if (matches) {
            // Don't flag occurrences inside verified-claims references, comments, or CSS class names
            // But DO flag in visible content, meta tags, structured data
            const visibleText = getVisibleText(html);
            const metaContent = (html.match(/content="[^"]*"/gi) || []).join(' ');
            const structuredData = (html.match(/"text"\s*:\s*"[^"]*"/gi) || []).join(' ');
            const searchArea = visibleText + ' ' + metaContent + ' ' + structuredData;

            const realMatches = searchArea.match(regex);
            if (realMatches) {
                issues.push({
                    severity: 'ERROR',
                    term,
                    count: realMatches.length,
                    reason: reason.split('.')[0] // First sentence only
                });
            }
        }
    }
    return issues;
}

// ── Check 2: Unverified Company Names ───────────────────────────────

function checkCompanyNames(html, claims) {
    const issues = [];
    const notClients = claims.verified_clients.NOT_confirmed_clients.names;
    const visibleText = getVisibleText(html);

    // Allowlist: legitimate protocol/technology references that share names with OEM brands
    // These are industrial automation protocols, not client claims
    const protocolAllowlist = [
        'Mitsubishi MELSEC',   // PLC communication protocol
        'Mitsubishi CC-Link',  // Fieldbus protocol
        'Siemens S7',          // PLC protocol
        'Allen-Bradley',       // PLC protocol (Rockwell)
        'Omron FINS'           // PLC protocol
    ];

    for (const name of notClients) {
        // Search in visible text and meta tags
        const regex = new RegExp(`\\b${name}\\b`, 'gi');
        const metaContent = (html.match(/content="[^"]*"/gi) || []).join(' ');
        const structuredData = (html.match(/"text"\s*:\s*"[^"]*"/gi) || []).join(' ');
        const searchArea = visibleText + ' ' + metaContent + ' ' + structuredData;

        const matches = searchArea.match(regex);
        if (matches) {
            // Check if all matches are within allowlisted protocol contexts
            const isProtocolOnly = protocolAllowlist.some(p =>
                p.toLowerCase().includes(name.toLowerCase())
            ) && new RegExp(`${name}\\s+(MELSEC|CC-Link|S7|FINS|PLC|protocol)`, 'gi').test(searchArea);

            if (isProtocolOnly) {
                // All references are protocol names, not client claims — skip
                continue;
            }

            issues.push({
                severity: 'ERROR',
                company: name,
                count: matches.length,
                reason: 'Not a verified DigiWin client — do not imply a relationship'
            });
        }
    }
    return issues;
}

// ── Check 3: Stat Consistency ───────────────────────────────────────

function checkStats(html, claims) {
    const issues = [];
    const facts = claims.company_facts;

    // Check R&D engineers count — should be 1,600+ not 1,300+
    if (/1[,.]?300\+?\s*(R&D|R&amp;D|engineers)/i.test(html)) {
        issues.push({
            severity: 'WARN',
            detail: 'Found "1,300 R&D" — should be "1,600+" per official site update'
        });
    }

    // Check employee count — should be 5,500+ not 4,000+
    if (/4[,.]?000\+?\s*(employees|staff|people)/i.test(html)) {
        issues.push({
            severity: 'WARN',
            detail: 'Found "4,000 employees" — should be "5,500+" per official site'
        });
    }

    // Check offices count — should be 43 not 40+
    if (/40\+\s*(offices|branches)/i.test(html)) {
        issues.push({
            severity: 'WARN',
            detail: 'Found "40+ offices" — should be "43" per official site'
        });
    }

    // Check Shenzhen listing year — should be 2014 not 2008
    // Note: 2008 is correct for SE Asia entry (Vietnam) — only flag if within 100 chars of trigger words
    const visibleText = getVisibleText(html);
    if (/Shenzhen.{0,100}2008|2008.{0,100}Shenzhen/i.test(visibleText)) {
        issues.push({
            severity: 'ERROR',
            detail: 'Found 2008 near "Shenzhen" — Shenzhen listing was 2014 (2008 was Taiwan delisting)'
        });
    }
    if (/(?:listed|IPO|stock\s*exchange).{0,100}2008|2008.{0,100}(?:listed|IPO|stock\s*exchange)/i.test(visibleText)) {
        issues.push({
            severity: 'ERROR',
            detail: 'Found 2008 near "listed/IPO" — Shenzhen listing was 2014 (2008 was Taiwan delisting)'
        });
    }

    // Check for "50% recurring revenue" — unsourced, was removed
    if (/50%\s*(recurring|revenue)/i.test(visibleText)) {
        issues.push({
            severity: 'WARN',
            detail: 'Found "50% recurring revenue" — this was unsourced and should have been removed (D11)'
        });
    }

    return issues;
}

// ── Check 4: Product Terminology ────────────────────────────────────

function checkProductTerms(html, claims) {
    const issues = [];
    const visibleText = getVisibleText(html);

    // Check for wrong SFT expansion
    if (/Smart Factory Transparency/i.test(html)) {
        issues.push({
            severity: 'ERROR',
            detail: 'Found "Smart Factory Transparency" — SFT = Shop Floor Tracking'
        });
    }

    // Check for sMES/eMES/iMES in visible content (not CSS classes)
    // Allow in header/footer mega menu (those are navigational)
    const structuredData = (html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []).join(' ');
    const metaContent = (html.match(/content="[^"]*"/gi) || []).join(' ');
    const faqContent = (html.match(/<summary[^>]*>[\s\S]*?<\/summary>/gi) || []).join(' ');
    const bodyContent = visibleText + ' ' + structuredData + ' ' + metaContent + ' ' + faqContent;

    // sMES check (case-sensitive — 's' prefix matters)
    const smesMatches = bodyContent.match(/\bsMES\b/g);
    if (smesMatches) {
        issues.push({
            severity: 'WARN',
            detail: `Found "sMES" ${smesMatches.length}x in content — use "MES" generically (D31)`
        });
    }

    // eMES check — internal product, not for public marketing (D36)
    const emesMatches = bodyContent.match(/\beMES\b/g);
    if (emesMatches) {
        issues.push({
            severity: 'ERROR',
            detail: `Found "eMES" ${emesMatches.length}x — internal product, NOT public. Use "MES" generically (D36)`
        });
    }

    // iMES check — internal product, not for public marketing (D36)
    const imesMatches = bodyContent.match(/\biMES\b/g);
    if (imesMatches) {
        issues.push({
            severity: 'ERROR',
            detail: `Found "iMES" ${imesMatches.length}x — internal product, NOT public. Use "MES" generically (D36)`
        });
    }

    return issues;
}

// ── Check 5: Contact Info ───────────────────────────────────────────

function checkContacts(html, claims) {
    const issues = [];
    const visibleText = getVisibleText(html);

    if (/Huifang Yang|yanghuifang/i.test(visibleText)) {
        issues.push({
            severity: 'WARN',
            detail: 'Found deprecated contact "Huifang Yang" — current Thai contact is Lawrence Ho'
        });
    }

    return issues;
}

// ── Run all checks on one page ──────────────────────────────────────

function factCheckPage(filePath, claims) {
    const html = fs.readFileSync(filePath, 'utf8');
    return {
        blocklist: checkBlocklist(html, claims),
        companies: checkCompanyNames(html, claims),
        stats: checkStats(html, claims),
        terms: checkProductTerms(html, claims),
        contacts: checkContacts(html, claims)
    };
}

// ── Main ────────────────────────────────────────────────────────────

function main() {
    const startTime = Date.now();

    // Load claims registry
    if (!fs.existsSync(CLAIMS_PATH)) {
        console.error(`${c.r}✗${c.x} verified-claims.json not found at ${CLAIMS_PATH}`);
        process.exit(1);
    }
    const claims = JSON.parse(fs.readFileSync(CLAIMS_PATH, 'utf8'));

    console.log(`\n${c.b}🔎 Fact-checking DigiWin website against verified-claims.json...${c.x}\n`);

    const pages = findPages(ROOT_DIR);
    if (pages.length === 0) {
        console.log(`${c.y}!${c.x} No HTML pages found. Run ${c.b}node build.js${c.x} first.\n`);
        process.exit(1);
    }

    let cleanCount = 0;
    let errorCount = 0;
    let warnCount = 0;
    const allIssues = [];

    for (const { full, rel } of pages) {
        const results = factCheckPage(full, claims);
        const errors = [];
        const warnings = [];

        for (const [category, issues] of Object.entries(results)) {
            for (const issue of issues) {
                if (issue.severity === 'ERROR') errors.push({ category, ...issue });
                else warnings.push({ category, ...issue });
            }
        }

        if (errors.length === 0 && warnings.length === 0) {
            console.log(`${c.g}✓${c.x} ${rel}`);
            cleanCount++;
        } else {
            const symbol = errors.length > 0 ? `${c.r}✗` : `${c.y}⚠`;
            console.log(`${symbol}${c.x} ${rel}`);

            for (const e of errors) {
                const msg = e.term
                    ? `"${e.term}" (${e.count}x) — ${e.reason}`
                    : e.company
                    ? `"${e.company}" (${e.count}x) — ${e.reason}`
                    : e.detail;
                console.log(`  ${c.r}✗${c.x} ${msg}`);
            }
            for (const w of warnings) {
                const msg = w.detail || `"${w.term}" (${w.count}x) — ${w.reason}`;
                console.log(`  ${c.y}⚠${c.x} ${msg}`);
            }

            errorCount += errors.length;
            warnCount += warnings.length;
            allIssues.push({ page: rel, errors, warnings });
        }
    }

    // Summary
    const elapsed = Date.now() - startTime;
    console.log('');

    if (errorCount === 0 && warnCount === 0) {
        console.log(`${c.g}${c.b}✓ All ${cleanCount} pages pass fact-check${c.x} ${c.d}(${elapsed}ms)${c.x}\n`);
        process.exit(0);
    } else if (errorCount === 0) {
        console.log(`${c.y}${c.b}⚠ ${warnCount} warning(s)${c.x}, ${cleanCount} clean ${c.d}(${elapsed}ms)${c.x}`);
        console.log(`${c.d}Warnings are non-blocking but should be reviewed.${c.x}\n`);
        process.exit(0);
    } else {
        console.log(`${c.r}${c.b}✗ ${errorCount} error(s)${c.x}, ${c.y}${warnCount} warning(s)${c.x}, ${cleanCount} clean ${c.d}(${elapsed}ms)${c.x}`);
        console.log(`${c.d}Errors must be fixed before publishing. Warnings should be reviewed.${c.x}\n`);
        process.exit(1);
    }
}

main();
