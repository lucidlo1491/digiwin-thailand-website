#!/usr/bin/env node
/**
 * Verify all page configs have working schema() functions.
 * Run: node complete_website/divi5/verify-schema-rollout.js
 */
const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.js') && f !== 'sections');

let pass = 0, fail = 0, total = 0;
const failures = [];
const summary = [];

for (const file of files) {
  // Skip directories
  const fullPath = path.join(pagesDir, file);
  if (fs.statSync(fullPath).isDirectory()) continue;

  total++;
  const slug = file.replace('.js', '');
  try {
    delete require.cache[require.resolve('./pages/' + slug)];
    const config = require('./pages/' + slug);
    if (typeof config.schema !== 'function') {
      failures.push(slug + ': no schema() function');
      fail++;
      continue;
    }
    const schemas = config.schema();
    if (!Array.isArray(schemas) || schemas.length === 0) {
      failures.push(slug + ': schema() returned empty');
      fail++;
      continue;
    }
    const types = schemas.map(s => s['@type']).join(', ');
    if (schemas.some(s => !s['@type'])) {
      failures.push(slug + ': schema missing @type');
      fail++;
      continue;
    }
    summary.push({ slug, count: schemas.length, types });
    pass++;
  } catch (err) {
    failures.push(slug + ': ' + err.message.split('\n')[0]);
    fail++;
  }
}

console.log('Schema rollout verification:');
console.log(`  Total: ${total}`);
console.log(`  Pass: ${pass}`);
console.log(`  Fail: ${fail}`);

if (failures.length > 0) {
  console.log('\nFailures:');
  failures.forEach(f => console.log('  ✗', f));
}

// Count schema types
const typeCounts = {};
for (const s of summary) {
  for (const t of s.types.split(', ')) {
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  }
}

console.log('\nSchema type distribution:');
Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).forEach(([t, c]) => {
  console.log(`  ${t}: ${c} pages`);
});

const totalBlocks = summary.reduce((sum, s) => sum + s.count, 0);
console.log(`\nTotal schema blocks: ${totalBlocks} across ${pass} pages`);

if (fail === 0) {
  console.log(`\n✓ All ${total} page configs have working schema() functions`);
} else {
  process.exit(1);
}
