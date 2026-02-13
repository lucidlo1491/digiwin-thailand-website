#!/usr/bin/env node
/**
 * DigiWin Website Build Script
 *
 * Compiles page templates with shared header/footer partials.
 *
 * Usage:
 *   node build.js           - Build all pages
 *   node build.js --watch   - Watch for changes and rebuild
 *
 * Structure:
 *   /src
 *     /partials
 *       header.html         - Global header (uses {{basePath}} for links)
 *       footer.html         - Global footer (uses {{basePath}} for links)
 *     /pages
 *       index.html          - Page templates with {{header}}, {{footer}}, {{basePath}}
 *       products.html
 *       /products
 *         erp.html
 *         ...
 *
 *   Output goes to root directory (same level as build.js)
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const PARTIALS_DIR = path.join(SRC_DIR, 'partials');
const PAGES_DIR = path.join(SRC_DIR, 'pages');
const OUTPUT_DIR = __dirname;

// ANSI colors for console output
const colors = {
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    reset: '\x1b[0m'
};

function log(color, symbol, message) {
    console.log(`${colors[color]}${symbol}${colors.reset} ${message}`);
}

/**
 * Read a partial file and return its contents
 */
function readPartial(name) {
    const filePath = path.join(PARTIALS_DIR, `${name}.html`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Partial not found: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
}

/**
 * Calculate the base path for a page based on its depth
 * Root pages: ""
 * Subdirectory pages: "../"
 */
function getBasePath(relativePath) {
    const depth = relativePath.split(path.sep).length - 1;
    return depth > 0 ? '../'.repeat(depth) : '';
}

/**
 * Compile a single page template
 */
function compilePage(templatePath, outputPath, basePath) {
    let content = fs.readFileSync(templatePath, 'utf8');

    // Read partials
    const header = readPartial('header');
    const footer = readPartial('footer');

    // Replace placeholders
    content = content.replace(/\{\{header\}\}/g, header);
    content = content.replace(/\{\{footer\}\}/g, footer);
    content = content.replace(/\{\{basePath\}\}/g, basePath);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write compiled file
    fs.writeFileSync(outputPath, content, 'utf8');

    return true;
}

/**
 * Recursively find all HTML files in a directory
 */
function findHtmlFiles(dir, baseDir = dir) {
    const files = [];

    if (!fs.existsSync(dir)) {
        return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...findHtmlFiles(fullPath, baseDir));
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            const relativePath = path.relative(baseDir, fullPath);
            files.push({ fullPath, relativePath });
        }
    }

    return files;
}

/**
 * Generate sitemap.xml from built pages
 */
function generateSitemap(pages) {
    const SITE_URL = 'https://www.digiwin.co.th';
    const EXCLUDE = new Set(['brand-preview.html', 'vortex-generator.html', 'generate-vortex-canvas.html']);

    // Standalone pages not in src/pages/ but still indexable
    const STANDALONE_PAGES = ['partner-one-pager.html'];

    function getPriority(relPath) {
        if (relPath === 'index.html') return '1.0';
        if (relPath.startsWith('products/') || relPath.startsWith('industries/') ||
            relPath === 'products.html' || relPath === 'industries.html') return '0.9';
        if (relPath.startsWith('partner-program') || relPath === 'demo.html' ||
            relPath === 'partner-one-pager.html') return '0.8';
        if (relPath === 'privacy-policy.html' || relPath === 'terms.html') return '0.3';
        return '0.6';
    }

    function getChangefreq(relPath) {
        if (relPath === 'index.html' || relPath === 'blog.html' || relPath === 'news.html') return 'weekly';
        if (relPath === 'privacy-policy.html' || relPath === 'terms.html') return 'yearly';
        return 'monthly';
    }

    // Collect all page paths
    const allPaths = pages
        .map(p => p.relativePath)
        .filter(p => !EXCLUDE.has(p));

    // Add standalone pages that exist on disk
    for (const sp of STANDALONE_PAGES) {
        if (fs.existsSync(path.join(OUTPUT_DIR, sp))) {
            allPaths.push(sp);
        }
    }

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const relPath of allPaths) {
        const loc = relPath === 'index.html'
            ? `${SITE_URL}/`
            : `${SITE_URL}/${relPath}`;
        xml += `  <url><loc>${loc}</loc><changefreq>${getChangefreq(relPath)}</changefreq><priority>${getPriority(relPath)}</priority></url>\n`;
    }

    xml += '</urlset>\n';

    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), xml, 'utf8');
    log('green', '✓', `sitemap.xml (${allPaths.length} URLs)`);
}

/**
 * Build all pages
 */
function build() {
    console.log('\n📦 Building DigiWin website...\n');

    const startTime = Date.now();
    let successCount = 0;
    let errorCount = 0;

    // Check if partials exist
    const headerPath = path.join(PARTIALS_DIR, 'header.html');
    const footerPath = path.join(PARTIALS_DIR, 'footer.html');

    if (!fs.existsSync(headerPath)) {
        log('red', '✗', `Header partial not found: ${headerPath}`);
        log('yellow', '→', 'Run the setup first to create partials');
        process.exit(1);
    }

    if (!fs.existsSync(footerPath)) {
        log('red', '✗', `Footer partial not found: ${footerPath}`);
        log('yellow', '→', 'Run the setup first to create partials');
        process.exit(1);
    }

    // Find and compile all pages
    const pages = findHtmlFiles(PAGES_DIR);

    if (pages.length === 0) {
        log('yellow', '!', 'No pages found in src/pages/');
        log('yellow', '→', 'Add page templates to src/pages/');
        process.exit(1);
    }

    for (const { fullPath, relativePath } of pages) {
        const basePath = getBasePath(relativePath);
        const outputPath = path.join(OUTPUT_DIR, relativePath);

        try {
            compilePage(fullPath, outputPath, basePath);
            log('green', '✓', relativePath);
            successCount++;
        } catch (error) {
            log('red', '✗', `${relativePath}: ${error.message}`);
            errorCount++;
        }
    }

    const elapsed = Date.now() - startTime;
    console.log('');

    // Generate sitemap after successful build
    if (errorCount === 0) {
        generateSitemap(pages);
    }

    if (errorCount === 0) {
        log('green', '✓', `Built ${successCount} pages in ${elapsed}ms`);
    } else {
        log('yellow', '!', `Built ${successCount} pages, ${errorCount} errors in ${elapsed}ms`);
    }

    console.log('');
}

/**
 * Watch for changes and rebuild
 */
function watch() {
    console.log('\n👀 Watching for changes... (Ctrl+C to stop)\n');

    const watchDirs = [PARTIALS_DIR, PAGES_DIR];

    for (const dir of watchDirs) {
        if (fs.existsSync(dir)) {
            fs.watch(dir, { recursive: true }, (eventType, filename) => {
                if (filename && filename.endsWith('.html')) {
                    console.log(`\n📝 Changed: ${filename}`);
                    build();
                }
            });
        }
    }

    // Initial build
    build();
}

// Main entry point
const args = process.argv.slice(2);

if (args.includes('--watch') || args.includes('-w')) {
    watch();
} else {
    build();
}
