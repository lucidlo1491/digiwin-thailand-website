#!/usr/bin/env node
/**
 * DigiWin Website — Stat & Number Extractor
 *
 * Extracts every statistic, percentage, and numerical claim from all pages.
 * Outputs a table for cross-referencing against verified data.
 *
 * Usage:  node extract-stats.js
 *
 * This supports the "every number needs a source" guardrail.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const EXCLUDE_DIRS = new Set(['src', 'node_modules', '.git']);
const EXCLUDE_FILES = new Set(['brand-preview.html', 'generate-vortex-canvas.html', 'vortex-generator.html']);

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

function stripHtml(html) {
    // Remove script/style blocks, then tags, then decode entities
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#\d+;/g, '')
        .replace(/\s+/g, ' ');
}

function extractStats(text) {
    const stats = [];
    const patterns = [
        // Percentages: 95%, +200%, 30-40%
        /[\+\-]?\d[\d,]*(?:\.\d+)?[\-–]?\d*%/g,
        // Numbers with units: 50,000+ clients, 44 years, 15 days, 130M, NTD 325M
        /(?:NTD\s*)?\d[\d,]*(?:\.\d+)?(?:\s*\+)?\s*(?:years?|days?|clients?|factories|implementations?|countries|modules?|users?|hours?|months?|THB|M\b|K\b|pp\b)/gi,
        // Arrow metrics: 60→15, 90→15
        /\d+\s*[→→]\s*\d+/g,
        // Currency: $2,000, ฿10M, 10M THB
        /[\$฿]\s*\d[\d,]*(?:\.\d+)?(?:\s*[MKB])?/g,
        /\d[\d,]*(?:\.\d+)?\s*(?:THB|USD|NTD)\b/g,
        // Stock numbers
        /(?:TWSE|SSE|Shenzhen)[:\s]*\d+/gi,
        // Year references
        /(?:since|founded|established|in)\s+\d{4}/gi,
        // Ratios and multipliers
        /\d+[xX]\s+\w+/g,
    ];

    for (const pattern of patterns) {
        let m;
        const re = new RegExp(pattern.source, pattern.flags);
        while ((m = re.exec(text)) !== null) {
            const match = m[0].trim();
            // Get surrounding context (30 chars each side)
            const start = Math.max(0, m.index - 40);
            const end = Math.min(text.length, m.index + m[0].length + 40);
            const context = text.substring(start, end).trim();
            stats.push({ match, context });
        }
    }

    // Deduplicate by match value
    const seen = new Set();
    return stats.filter(s => {
        if (seen.has(s.match)) return false;
        seen.add(s.match);
        return true;
    });
}

function main() {
    console.log('\n📊 Extracting statistics from all pages...\n');

    const pages = findPages(ROOT);
    let totalStats = 0;

    for (const { full, rel } of pages) {
        const html = fs.readFileSync(full, 'utf8');
        const text = stripHtml(html);
        const stats = extractStats(text);

        if (stats.length === 0) continue;

        totalStats += stats.length;
        console.log(`\x1b[36m${rel}\x1b[0m (${stats.length} stats)`);
        for (const { match, context } of stats) {
            const highlighted = context.replace(match, `\x1b[33m${match}\x1b[0m`);
            console.log(`  ${highlighted}`);
        }
        console.log('');
    }

    console.log(`\x1b[1m${totalStats} statistics found across ${pages.length} pages\x1b[0m`);
    console.log(`Cross-reference against: memory/data-crosscheck-findings.md\n`);
}

main();
