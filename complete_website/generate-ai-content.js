#!/usr/bin/env node
/**
 * DigiWin Website — AI Content Generator
 *
 * Generates two things that help AI systems understand our website:
 *
 *   1. llms.txt    — A structured index of the site for AI crawlers
 *   2. *.html.md   — Clean Markdown versions of every page
 *
 * Usage:
 *   node generate-ai-content.js          # Generate both
 *   node generate-ai-content.js --llms   # Only llms.txt
 *   node generate-ai-content.js --md     # Only .md files
 *   node generate-ai-content.js --stats  # Show token savings estimate
 *
 * Output:
 *   ./llms.txt                           — Site index for AI
 *   ./products/erp.html.md               — Markdown version of ERP page
 *   ./blog/five-pain-points.html.md      — etc.
 *
 * Why: AI agents digest Markdown ~4x more efficiently than HTML.
 *      A page costing 15,000 tokens in HTML costs ~4,000 in Markdown.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const EXCLUDE_DIRS = new Set(['src', 'node_modules', '.git', 'clonewebx-exports']);
const EXCLUDE_FILES = new Set(['brand-preview.html', 'generate-vortex-canvas.html', 'vortex-generator.html']);

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', cy: '\x1b[36m', b: '\x1b[1m', d: '\x1b[2m', x: '\x1b[0m' };

// ─── Page Metadata (for llms.txt descriptions) ──────────────────────────────

const PAGE_META = {
    'index.html':                                   { title: 'Homepage', desc: 'Manufacturing ERP, MES, WMS, and AIoT solutions for Thai factories. 44 years, 50,000+ clients, 100+ Thai implementations.' },
    'products.html':                                { title: 'Products Overview', desc: 'Four integrated manufacturing software products — ERP, MES, WMS, AIoT — one connected ecosystem.' },
    'products/erp.html':                            { title: 'ERP (Enterprise Resource Planning)', desc: 'Manufacturing ERP with BOI compliance, Thai RD certification, real-time production costing, multi-factory consolidation.' },
    'products/mes.html':                            { title: 'MES (Manufacturing Execution System)', desc: 'Real-time shop floor visibility — OEE tracking, production scheduling, quality management, paperless operations.' },
    'products/wms.html':                            { title: 'WMS (Warehouse Management System)', desc: 'Smart warehouse operations — barcode/RFID tracking, pick-pack-ship, inventory accuracy, logistics optimization.' },
    'products/aiot.html':                           { title: 'AIoT (AI + IoT Platform)', desc: 'Machine connectivity and AI analytics — equipment monitoring, predictive maintenance, energy management, protocol support.' },
    'industries.html':                              { title: 'Industries Overview', desc: 'Specialized manufacturing solutions for automotive, electronics, and metal & plastics industries in Thailand.' },
    'industries/automotive.html':                   { title: 'Automotive Manufacturing', desc: 'Solutions for OEM tier suppliers — IATF 16949, JIS/JIT delivery, lot traceability, OEM system integration.' },
    'industries/electronics.html':                  { title: 'Electronics Manufacturing', desc: 'High-mix low-volume production — SMT traceability, moisture control, BOI compliance, rapid changeover support.' },
    'industries/metal-plastics.html':               { title: 'Metal & Plastics Manufacturing', desc: 'Process manufacturing — yield optimization, scrap reduction, die/mold management, co-product costing.' },
    'partner-program.html':                         { title: 'Partner Program', desc: 'ERP consulting firms: transition from man-hours to recurring software revenue. Territory protection, training, demand generation.' },
    'partner-program/business-model.html':          { title: 'Partner Business Model', desc: 'The shift from hourly consulting to product-based recurring revenue. Before/after economics for ERP consultancies.' },
    'partner-program/economics.html':               { title: 'Partner Economics', desc: 'Revenue streams, margin structure, 3-year partner journey, protection guarantees. License, service, and MA revenue breakdown.' },
    'partner-program/solutions.html':               { title: 'Partner Solutions Portfolio', desc: 'Product portfolio for partners — land and expand strategy, competitive positioning against SAP and Oracle.' },
    'about.html':                                   { title: 'About DigiWin', desc: '44 years of manufacturing software. Founded 1982 in Taiwan, publicly listed (TWSE: 300378), 50,000+ clients across 80+ countries.' },
    'demo.html':                                    { title: 'Contact Us', desc: 'Get in touch with DigiWin Thailand. Office: Bangna Complex, 22F, Bangkok. Discuss your manufacturing software needs.' },
    'case-studies.html':                            { title: 'Case Studies', desc: 'Real implementation stories from Thai manufacturers — automotive, electronics, metal & plastics, food processing.' },
    'partner-one-pager.html':                       { title: 'Partner One-Pager', desc: 'Quick reference for prospective partners — program benefits, revenue model, next steps.' },
    'blog.html':                                    { title: 'Blog', desc: 'Manufacturing insights, ERP best practices, industry analysis, and digital transformation guidance for Thai factories.' },
    'news.html':                                    { title: 'News & Events', desc: 'Latest news, press releases, and upcoming events from DigiWin Thailand.' },
    'blog/five-pain-points.html':                   { title: '5 Pain Points Thai Manufacturers Face', desc: 'Common ERP implementation challenges and how to avoid them.' },
    'blog/boi-compliance-jin-hai.html':             { title: 'BOI Compliance Guide', desc: 'How BOI-promoted factories in Thailand maintain compliance with manufacturing software.' },
    'blog/sap-ecc-end-of-life.html':                { title: 'SAP ECC End of Life', desc: 'What Thai manufacturers running SAP ECC need to know about the 2027 deadline and migration options.' },
    'blog/shop-floor-scheduling.html':              { title: 'Shop Floor Scheduling', desc: 'Moving from Excel-based scheduling to real-time production planning on the shop floor.' },
    'blog/production-transparency.html':            { title: 'Production Transparency', desc: 'Why real-time production visibility matters and how MES delivers it.' },
    'blog/amrp-capacity-planning.html':             { title: 'AMRP Capacity Planning', desc: 'Advanced Material Requirements Planning for multi-factory Thai manufacturers.' },
    'blog/lrp-vs-mrp.html':                         { title: 'LRP vs MRP', desc: 'Long Range Planning vs Material Requirements Planning — when to use which approach.' },
    'blog/co-product-cost-accounting.html':         { title: 'Co-Product Cost Accounting', desc: 'Managing co-product and by-product costing in process manufacturing.' },
    'blog/dual-units.html':                         { title: 'Dual Unit Management', desc: 'Handling dual units of measure in manufacturing ERP systems.' },
    'blog/feature-codes.html':                      { title: 'Feature Codes in ERP', desc: 'Using feature codes for configurable products and variant management in manufacturing.' },
    'events/boi-compliance-workshop.html':          { title: 'BOI Compliance Workshop', desc: 'Hands-on workshop for BOI-promoted factories on maintaining compliance.' },
    'events/factory-tour-mes.html':                 { title: 'Factory Tour: MES in Action', desc: 'See MES running on a real Thai factory shop floor.' },
    'events/manufacturing-expo-2026.html':          { title: 'Manufacturing Expo 2026', desc: 'DigiWin at Manufacturing Expo Thailand 2026 — booth info and schedule.' },
    'events/production-transparency-seminar.html':  { title: 'Production Transparency Seminar', desc: 'Seminar on achieving real-time production visibility in Thai factories.' },
    'events/shop-floor-data-workshop.html':         { title: 'Shop Floor Data Workshop', desc: 'Workshop on collecting and using shop floor data for manufacturing improvement.' },
    'privacy-policy.html':                          { title: 'Privacy Policy', desc: 'DigiWin Thailand data privacy policy and PDPA compliance.' },
    'terms.html':                                   { title: 'Terms of Service', desc: 'DigiWin Thailand terms of service and usage conditions.' },
};

// ─── HTML to Markdown Converter ──────────────────────────────────────────────

function htmlToMarkdown(html) {
    let content = html;

    // Remove everything before content (header/nav)
    content = content.replace(/^[\s\S]*?<\/header>/i, '');

    // Remove footer and everything after
    content = content.replace(/<footer[\s\S]*$/i, '');

    // Remove script and style blocks
    content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
    content = content.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');

    // Remove HTML comments
    content = content.replace(/<!--[\s\S]*?-->/g, '');

    // Remove SVG blocks (decorative)
    content = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');

    // Remove image tags but note alt text
    content = content.replace(/<img[^>]*alt\s*=\s*["']([^"']*)["'][^>]*\/?>/gi, '![$1]');
    content = content.replace(/<img[^>]*\/?>/gi, '');

    // Convert headings
    content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, inner) => `\n# ${stripTags(inner).trim()}\n`);
    content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, inner) => `\n## ${stripTags(inner).trim()}\n`);
    content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, inner) => `\n### ${stripTags(inner).trim()}\n`);
    content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, inner) => `\n#### ${stripTags(inner).trim()}\n`);

    // Convert links
    content = content.replace(/<a[^>]*href\s*=\s*["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
        const cleanText = stripTags(text).trim();
        if (!cleanText || href.startsWith('#') || href.startsWith('javascript:')) return cleanText;
        return `[${cleanText}](${href})`;
    });

    // Convert bold and italic
    content = content.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, inner) => `**${stripTags(inner).trim()}**`);
    content = content.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, inner) => `*${stripTags(inner).trim()}*`);

    // Convert blockquotes
    content = content.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
        const text = stripTags(inner).trim();
        return '\n> ' + text.replace(/\n/g, '\n> ') + '\n';
    });

    // Convert list items first, then list wrappers
    content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => `- ${stripTags(inner).trim()}\n`);
    content = content.replace(/<\/?[uo]l[^>]*>/gi, '\n');

    // Convert paragraphs
    content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => {
        const text = inner
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .trim();
        return text ? `\n${text}\n` : '';
    });

    // Convert line breaks
    content = content.replace(/<br\s*\/?>/gi, '\n');

    // Strip remaining HTML tags
    content = content.replace(/<[^>]+>/g, ' ');

    // Decode HTML entities
    content = content
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&#\d+;/g, '')
        .replace(/&[a-z]+;/gi, '');

    // Clean up whitespace
    content = content
        .replace(/[ \t]+/g, ' ')           // Collapse spaces
        .replace(/\n[ \t]+/g, '\n')         // Remove leading whitespace on lines
        .replace(/\n{3,}/g, '\n\n')         // Max 2 consecutive newlines
        .trim();

    // Remove lines that are just whitespace or single characters (artifacts)
    content = content
        .split('\n')
        .filter(line => line.trim().length > 1 || line.trim() === '')
        .join('\n');

    return content;
}

function stripTags(html) {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// Rough token estimate: ~4 chars per token for English
function estimateTokens(text) {
    return Math.round(text.length / 4);
}

// ─── Generators ──────────────────────────────────────────────────────────────

function generateLlmsTxt() {
    const lines = [];

    lines.push('# DigiWin Thailand (digiwin.co.th)');
    lines.push('');
    lines.push('> Manufacturing ERP, MES, WMS, and AIoT solutions for Thai factories.');
    lines.push('> 44 years of manufacturing intelligence. 50,000+ clients across 80+ countries. 100+ Thai implementations.');
    lines.push('> Publicly listed: TWSE 300378 (Taiwan) and SSE (Shenzhen).');
    lines.push('');

    const sections = [
        { label: 'Products', prefix: 'products' },
        { label: 'Industries', prefix: 'industries' },
        { label: 'Partner Program', prefix: 'partner-program' },
        { label: 'Company', keys: ['about.html', 'demo.html', 'case-studies.html'] },
        { label: 'Blog', prefix: 'blog' },
        { label: 'Events', prefix: 'events' },
        { label: 'Legal', keys: ['privacy-policy.html', 'terms.html'] },
    ];

    // Hub pages first
    const hubPages = ['index.html', 'products.html', 'industries.html', 'partner-program.html', 'blog.html', 'news.html'];
    lines.push('## Main Pages');
    lines.push('');
    for (const key of hubPages) {
        const meta = PAGE_META[key];
        if (meta) {
            lines.push(`- [${meta.title}](/${key}): ${meta.desc}`);
        }
    }
    lines.push('');

    for (const section of sections) {
        lines.push(`## ${section.label}`);
        lines.push('');

        const keys = section.keys || Object.keys(PAGE_META).filter(k =>
            k.startsWith(section.prefix + '/') ||
            (section.prefix === 'products' && k === 'products.html') ||
            (section.prefix === 'industries' && k === 'industries.html') ||
            (section.prefix === 'partner-program' && k === 'partner-program.html')
        );

        // For prefix-based sections, get sub-pages (not hubs, they're already listed)
        const pageKeys = section.keys || Object.keys(PAGE_META).filter(k =>
            k.startsWith(section.prefix + '/')
        );

        for (const key of pageKeys) {
            const meta = PAGE_META[key];
            if (meta) {
                const mdPath = key + '.md';
                lines.push(`- [${meta.title}](/${key}): ${meta.desc}`);
            }
        }
        lines.push('');
    }

    lines.push('## Optional');
    lines.push('');
    lines.push('Markdown versions of each page are available by appending .md to any URL:');
    lines.push('- /products/erp.html → /products/erp.html.md');
    lines.push('- /about.html → /about.html.md');

    return lines.join('\n');
}

function generateMarkdownFiles() {
    const results = [];

    for (const [relPath, meta] of Object.entries(PAGE_META)) {
        const htmlPath = path.join(ROOT, relPath);
        if (!fs.existsSync(htmlPath)) continue;

        const html = fs.readFileSync(htmlPath, 'utf8');
        const htmlTokens = estimateTokens(html);

        let md = `# ${meta.title}\n\n`;
        md += `> ${meta.desc}\n\n`;
        md += `---\n\n`;
        md += htmlToMarkdown(html);

        const mdTokens = estimateTokens(md);
        const mdPath = htmlPath + '.md';
        fs.writeFileSync(mdPath, md);

        const savings = Math.round((1 - mdTokens / htmlTokens) * 100);
        results.push({ relPath, htmlTokens, mdTokens, savings });
    }

    return results;
}

// ─── Commands ────────────────────────────────────────────────────────────────

function main() {
    const args = process.argv.slice(2);
    const doLlms = args.includes('--llms') || args.length === 0;
    const doMd = args.includes('--md') || args.length === 0;
    const doStats = args.includes('--stats');

    console.log(`\n${c.b}━━━ AI Content Generator ━━━${c.x}\n`);

    if (doLlms) {
        const llmsTxt = generateLlmsTxt();
        const llmsPath = path.join(ROOT, 'llms.txt');
        fs.writeFileSync(llmsPath, llmsTxt);
        const lines = llmsTxt.split('\n').length;
        console.log(`${c.g}✓${c.x} llms.txt generated (${lines} lines)`);
    }

    if (doMd || doStats) {
        const results = generateMarkdownFiles();

        if (doStats || doMd) {
            let totalHtml = 0, totalMd = 0;
            for (const r of results) {
                totalHtml += r.htmlTokens;
                totalMd += r.mdTokens;
                if (doStats) {
                    console.log(`  ${r.relPath.padEnd(45)} ${c.d}HTML: ${r.htmlTokens.toLocaleString()} → MD: ${r.mdTokens.toLocaleString()} (${c.g}-${r.savings}%${c.x}${c.d})${c.x}`);
                }
            }

            const totalSavings = Math.round((1 - totalMd / totalHtml) * 100);
            console.log(`${c.g}✓${c.x} ${results.length} Markdown files generated`);
            console.log(`  ${c.d}Total HTML tokens: ${totalHtml.toLocaleString()}${c.x}`);
            console.log(`  ${c.d}Total MD tokens:   ${totalMd.toLocaleString()}${c.x}`);
            console.log(`  ${c.g}${c.b}Token reduction: ${totalSavings}%${c.x}`);
        }
    }

    console.log('');
}

main();
