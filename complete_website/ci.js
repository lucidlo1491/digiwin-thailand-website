#!/usr/bin/env node
/**
 * DigiWin Website — Full CI Pipeline
 *
 * Runs ALL checks in sequence. One command, complete health report.
 *
 * Usage:
 *   node ci.js          # Run everything
 *   node ci.js --quick   # Build + audit only (skip link check + stats)
 *
 * Exit: 0 = all pass, 1 = failures found
 */

const { execSync } = require('child_process');
const path = require('path');

const ROOT = __dirname;
const args = process.argv.slice(2);
const quick = args.includes('--quick');

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', b: '\x1b[1m', d: '\x1b[2m', x: '\x1b[0m' };

const steps = [
    { name: 'Build', cmd: 'node build.js', always: true },
    { name: 'Page Audit (6 checks × all pages)', cmd: 'node audit.js', always: true },
    { name: 'Brand Compliance (92 tests)', cmd: 'node test-styles.js', always: true },
    { name: 'Divi 5 Pipeline (44 tests)', cmd: 'node divi5/test-pipeline.js', always: true },
    { name: 'Divi 5 Site Status', cmd: 'node divi5/status.js', always: true, noFail: true },
    { name: 'Cross-Locale Sync (26 EN/TH pairs)', cmd: 'node divi5/sync-check.js', always: true },
    { name: 'Link & Image Check', cmd: 'node check-links.js', always: false },
    { name: 'Stat Extraction', cmd: 'node extract-stats.js', always: false, noFail: true },
    { name: 'AI Content (llms.txt + Markdown)', cmd: 'node generate-ai-content.js', always: false, noFail: true },
];

console.log(`\n${c.b}━━━ DigiWin CI Pipeline ${quick ? '(quick)' : '(full)'} ━━━${c.x}\n`);

let failures = 0;
const startTime = Date.now();

for (const step of steps) {
    if (!step.always && quick) {
        console.log(`${c.d}○ ${step.name} — skipped (quick mode)${c.x}\n`);
        continue;
    }

    console.log(`${c.b}▸ ${step.name}${c.x}`);
    try {
        const output = execSync(step.cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
        // Show last few meaningful lines
        const lines = output.trim().split('\n');
        const summary = lines.slice(-3).join('\n');
        console.log(summary);
        console.log(`${c.g}✓ ${step.name} passed${c.x}\n`);
    } catch (err) {
        if (step.noFail) {
            // Stats extraction doesn't "fail" — it just reports
            const output = err.stdout || '';
            const lines = output.trim().split('\n');
            console.log(lines.slice(-5).join('\n'));
            console.log(`${c.y}○ ${step.name} complete (informational)${c.x}\n`);
        } else {
            const output = err.stdout || err.stderr || '';
            const lines = output.trim().split('\n');
            console.log(lines.slice(-5).join('\n'));
            console.log(`${c.r}✗ ${step.name} FAILED${c.x}\n`);
            failures++;
        }
    }
}

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
console.log(`${c.b}━━━ Results ━━━${c.x}`);
if (failures === 0) {
    console.log(`${c.g}${c.b}✓ All checks passed${c.x} ${c.d}(${elapsed}s)${c.x}\n`);
    process.exit(0);
} else {
    console.log(`${c.r}${c.b}✗ ${failures} check(s) failed${c.x} ${c.d}(${elapsed}s)${c.x}\n`);
    process.exit(1);
}
