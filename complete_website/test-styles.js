#!/usr/bin/env node
/**
 * DigiWin styles.css — Brand Kit Compliance & Integrity Tests
 *
 * Validates:
 *   1. Brand Kit CSS variables (correct hex values)
 *   2. No deprecated colors/fonts from pre-migration era
 *   3. All @keyframes defined
 *   4. All SVG assets referenced in CSS exist on disk
 *   5. Key class selectors present
 *   6. Balanced braces (basic syntax check)
 *   7. Font-family compliance (Noto Sans + JetBrains Mono only)
 *   8. Accessibility: prefers-reduced-motion rule exists
 *   9. No duplicate @keyframes names
 *  10. CSS variable naming convention (--dw-* prefix)
 *
 * Usage:
 *   node test-styles.js
 */

const fs = require('fs');
const path = require('path');

const STYLES_PATH = path.join(__dirname, 'styles.css');
const ASSETS_DIR = path.join(__dirname, 'assets');

let css;
try {
    css = fs.readFileSync(STYLES_PATH, 'utf8');
} catch (err) {
    console.error(`\x1b[31m✗ Cannot read styles.css: ${err.message}\x1b[0m`);
    process.exit(1);
}

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, label) {
    if (condition) {
        passed++;
    } else {
        failed++;
        failures.push(label);
        console.log(`  \x1b[31m✗ ${label}\x1b[0m`);
    }
}

// ─────────────────────────────────────────────
// 1. Brand Kit CSS Variables
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ Brand Kit CSS Variables\x1b[0m');

const expectedVars = {
    '--dw-blue':       '#00AFF0',
    '--dw-navy':       '#000864',
    '--dw-navy-deep':  '#000432',
    '--dw-navy-mid':   '#001080',
    '--dw-royal':      '#003CC8',
    '--dw-cyan':       '#00E6FF',
    '--dw-gray-light': '#F5F7FA',
    '--dw-text':       '#333333',
    '--dw-text-light': '#666666',
    '--dw-purple':     '#644CE6',
    '--dw-green':      '#02D28C',
    '--dw-coral':      '#FF6E82',
    '--dw-yellow':     '#FFD700',
    '--dw-red':        '#DC2626',
};

for (const [varName, expected] of Object.entries(expectedVars)) {
    // Match "  --dw-blue: #00AFF0;" pattern
    const re = new RegExp(`${varName.replace(/[-]/g, '[-]')}:\\s*(#[0-9A-Fa-f]{3,8})`);
    const match = css.match(re);
    const actual = match ? match[1].toUpperCase() : null;
    assert(actual === expected.toUpperCase(), `${varName} = ${expected} (got ${actual || 'NOT FOUND'})`);
}

// RGB equivalents
const expectedRgb = {
    '--dw-blue-rgb':  '0, 175, 240',
    '--dw-navy-rgb':  '0, 8, 100',
    '--dw-cyan-rgb':  '0, 230, 255',
};
for (const [varName, expected] of Object.entries(expectedRgb)) {
    const re = new RegExp(`${varName.replace(/[-]/g, '[-]')}:\\s*([^;]+);`);
    const match = css.match(re);
    const actual = match ? match[1].trim() : null;
    assert(actual === expected, `${varName} = "${expected}" (got "${actual || 'NOT FOUND'}")`);
}

// ─────────────────────────────────────────────
// 2. No Deprecated Values
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ No Deprecated Values\x1b[0m');

const deprecated = [
    { pattern: /#3798E4/gi,      label: 'Old blue #3798E4' },
    { pattern: /#253B50/gi,      label: 'Old navy #253B50' },
    { pattern: /Lexend/gi,       label: 'Old font Lexend' },
    { pattern: /Source Sans/gi,  label: 'Old font Source Sans' },
    { pattern: /#1B2D3F/gi,      label: 'Old dark #1B2D3F' },
    { pattern: /#4AA3DF/gi,      label: 'Old accent #4AA3DF' },
];

for (const { pattern, label } of deprecated) {
    const matches = css.match(pattern);
    assert(!matches, `No ${label} in styles.css (found ${matches ? matches.length : 0} occurrences)`);
}

// ─────────────────────────────────────────────
// 3. All @keyframes Defined
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ @keyframes Defined\x1b[0m');

const requiredKeyframes = [
    'grain', 'slideUp', 'fadeIn', 'slide-up', 'pulse-dot', 'float',
    'dw-wave-drift', 'dw-wave-breathe', 'dw-d-glow', 'dw-d-draw',
];

for (const name of requiredKeyframes) {
    const re = new RegExp(`@keyframes\\s+${name.replace(/[-]/g, '[-]')}\\s*\\{`);
    assert(re.test(css), `@keyframes ${name} exists`);
}

// ─────────────────────────────────────────────
// 4. No Duplicate @keyframes
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ No Duplicate @keyframes\x1b[0m');

const keyframeNames = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(m => m[1]);
const seen = new Set();
const duplicates = [];
for (const name of keyframeNames) {
    if (seen.has(name)) duplicates.push(name);
    seen.add(name);
}
assert(duplicates.length === 0, `No duplicate @keyframes (found: ${duplicates.join(', ') || 'none'})`);

// ─────────────────────────────────────────────
// 5. SVG Asset References Resolve
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ SVG Asset References\x1b[0m');

const svgRefs = [...css.matchAll(/url\(['"]?(assets\/[^'")\s]+)['"]?\)/g)].map(m => m[1]);
const uniqueSvgs = [...new Set(svgRefs)];

for (const ref of uniqueSvgs) {
    const fullPath = path.join(__dirname, ref);
    const exists = fs.existsSync(fullPath);
    assert(exists, `Asset exists: ${ref}`);
}
assert(uniqueSvgs.length > 0, 'At least 1 SVG asset referenced');

// ─────────────────────────────────────────────
// 6. Key Class Selectors Present
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ Key Class Selectors\x1b[0m');

const requiredClasses = [
    // Layout
    'dw-header', 'dw-footer',
    // Brand graphics
    'dw-d-bg', 'dw-d-bg--gradient', 'dw-d-bg--particle',
    'dw-d-bg--left', 'dw-d-bg--bottom', 'dw-d-bg--top', 'dw-d-bg--center',
    'dw-d-bg--corner-tl', 'dw-d-bg--corner-br',
    'dw-d-bg--bold', 'dw-d-bg--medium', 'dw-d-bg--subtle',
    'dw-d-glow', 'dw-d-draw', 'dw-d-parallax',
    'dw-wave-flow', 'dw-wave-fade', 'dw-wave-circles',
    'dw-wave-section', 'dw-wave-vertical',
    'dw-wave-vertical--left', 'dw-wave-vertical--right',
    'dw-wave-reveal', 'dw-wave-flow--top',
    'dw-grain-overlay',
    // Components
    'dw-btn-primary',
];

for (const cls of requiredClasses) {
    const re = new RegExp(`\\.${cls.replace(/[-]/g, '[-]')}[\\s{,:\\[]`);
    assert(re.test(css), `.${cls} selector exists`);
}

// ─────────────────────────────────────────────
// 7. Balanced Braces
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ Balanced Braces\x1b[0m');

// Strip comments and strings before counting
const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '');
const opens = (stripped.match(/\{/g) || []).length;
const closes = (stripped.match(/\}/g) || []).length;
assert(opens === closes, `Balanced braces: ${opens} open, ${closes} close`);

// ─────────────────────────────────────────────
// 8. Font-Family Compliance
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ Font-Family Compliance\x1b[0m');

const fontDeclarations = [...stripped.matchAll(/font-family:\s*([^;]+);/g)].map(m => m[1].trim());
const allowedFonts = ['Noto Sans', 'Noto Sans SC', 'JetBrains Mono', 'sans-serif', 'monospace',
    '-apple-system', 'BlinkMacSystemFont', 'system-ui'];

const badFonts = fontDeclarations.filter(decl => {
    const fonts = decl.split(',').map(f => f.trim().replace(/^['"]|['"]$/g, ''));
    return fonts.some(f => f === '' ? false : !allowedFonts.includes(f) && !f.startsWith('-'));
});
assert(badFonts.length === 0, `Only approved fonts used (violations: ${badFonts.length > 0 ? badFonts.slice(0, 3).join(' | ') : 'none'})`);

// Noto Sans is the primary body font
assert(css.includes("font-family: 'Noto Sans'"), 'Noto Sans is declared as body font');

// JetBrains Mono used for labels/code
assert(css.includes("font-family: 'JetBrains Mono'"), 'JetBrains Mono is used for labels/code');

// ─────────────────────────────────────────────
// 9. Accessibility
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ Accessibility\x1b[0m');

assert(css.includes('prefers-reduced-motion'), 'prefers-reduced-motion media query exists');
assert(css.includes('prefers-reduced-motion: reduce'), 'prefers-reduced-motion: reduce is specified');

// Animations inside reduced-motion should be disabled
const reducedMotionBlock = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?\})\s*\}/);
if (reducedMotionBlock) {
    assert(reducedMotionBlock[1].includes('animation: none'), 'Animations are disabled in reduced-motion');
}

// ─────────────────────────────────────────────
// 10. CSS Variable Naming Convention
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ CSS Variable Naming Convention\x1b[0m');

// All custom properties in :root should use --dw- prefix
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/);
if (rootBlock) {
    const customProps = [...rootBlock[1].matchAll(/(--[\w-]+):/g)].map(m => m[1]);
    const nonDw = customProps.filter(p => !p.startsWith('--dw-'));
    assert(nonDw.length === 0, `All :root vars use --dw- prefix (violations: ${nonDw.join(', ') || 'none'})`);
    assert(customProps.length >= 14, `At least 14 CSS variables defined (found ${customProps.length})`);
}

// ─────────────────────────────────────────────
// 11. Major Sections Present
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ Major Sections Present\x1b[0m');

const requiredSections = [
    'HEADER', 'FOOTER', 'HERO SECTIONS', 'BUTTONS', 'CARDS',
    'CTA SECTION', 'BLOG', 'INDUSTRY', 'MOBILE MENU', 'ACCESSIBILITY',
];

for (const section of requiredSections) {
    assert(css.includes(section), `Section "${section}" exists`);
}

// ─────────────────────────────────────────────
// 12. Google Fonts Import
// ─────────────────────────────────────────────
console.log('\n\x1b[36m▸ Google Fonts Import\x1b[0m');

assert(css.includes('@import url'), 'Google Fonts @import present');
assert(css.includes('Noto+Sans'), 'Noto Sans in Google Fonts import');
assert(css.includes('Noto+Sans+SC'), 'Noto Sans SC (Chinese) in Google Fonts import');

// ─────────────────────────────────────────────
// Results
// ─────────────────────────────────────────────
console.log('\n' + '─'.repeat(48));

if (failed === 0) {
    console.log(`\x1b[32m✓ All ${passed} tests passed\x1b[0m\n`);
    process.exit(0);
} else {
    console.log(`\x1b[31m✗ ${failed} failed\x1b[0m, \x1b[32m${passed} passed\x1b[0m (${passed + failed} total)\n`);
    console.log('\x1b[31mFailures:\x1b[0m');
    for (const f of failures) {
        console.log(`  - ${f}`);
    }
    console.log('');
    process.exit(1);
}
