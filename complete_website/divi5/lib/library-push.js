/**
 * library-push.js — Push templates to WordPress Layout Library via MySQL
 *
 * One-way sync: code templates → WordPress et_pb_layout posts.
 * Re-runnable: updates existing posts, creates new ones.
 *
 * Usage:
 *   node complete_website/divi5/lib/library-push.js --all          # Push all templates
 *   node complete_website/divi5/lib/library-push.js --template card-grid-dark  # Push one
 *   node complete_website/divi5/lib/library-push.js --list         # List available templates
 *   node complete_website/divi5/lib/library-push.js --dry-run --all  # Preview SQL
 */

const mysql = require('./mysql');
const { tbl } = require('./mysql-config');
const { codeModule } = require('./modules');
const { templates, list } = require('./templates/index');
const { checkValidity } = require('./lint-css');
const { flushAll } = require('./cache-flush');

// ────────────────────────────────────────────────────────────────
// EXAMPLE DATA — placeholder content for Layout Library preview
// ────────────────────────────────────────────────────────────────
const EXAMPLE_DATA = {
  'card-grid-dark': {
    adminLabel: 'DigiWin — Dark Card Grid',
    sectionPrefix: 'tpl-dark-grid',
    background: 'linear-gradient(165deg, #0f1419 0%, #1a2632 50%, #000864 100%)',
    header: {
      label: 'Section Label',
      title: 'Section Title Goes Here',
      subtitle: 'A brief description of what this section covers and why it matters to the reader.',
    },
    cards: [
      { number: '01', title: 'First Point', quote: '"A compelling quote that resonates with the reader."', description: 'Supporting details that expand on the point above.' },
      { number: '02', title: 'Second Point', quote: '"Another insight that builds the narrative."', description: 'More context and detail for the reader.' },
      { number: '03', title: 'Third Point', quote: '"The final piece of the argument."', description: 'Concluding details that tie everything together.' },
    ],
    cta: { text: 'Take Action', href: '#' },
  },
  'card-grid-light': {
    adminLabel: 'DigiWin — Light Card Grid',
    sectionPrefix: 'tpl-light-grid',
    background: '#F5F7FA',
    header: {
      label: 'Product Category',
      title: 'Products Overview',
      subtitle: 'Brief description of the product line.',
    },
    cards: [
      { title: 'Product A', tagline: 'Short value proposition', features: ['<strong>Feature 1</strong> — description', '<strong>Feature 2</strong> — description'], benefit: 'Key benefit statement.' },
      { title: 'Product B', tagline: 'Short value proposition', features: ['<strong>Feature 1</strong> — description', '<strong>Feature 2</strong> — description'], benefit: 'Key benefit statement.' },
      { title: 'Product C', tagline: 'Short value proposition', features: ['<strong>Feature 1</strong> — description', '<strong>Feature 2</strong> — description'], benefit: 'Key benefit statement.' },
      { title: 'Product D', tagline: 'Short value proposition', features: ['<strong>Feature 1</strong> — description', '<strong>Feature 2</strong> — description'], benefit: 'Key benefit statement.' },
    ],
  },
  'stats-banner': {
    adminLabel: 'DigiWin — Stats Banner',
    sectionPrefix: 'tpl-stats',
    background: 'linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)',
    stats: [
      { number: '100+', label: 'Metric One' },
      { number: '50,000+', label: 'Metric Two' },
      { number: '99%', label: 'Metric Three' },
    ],
    source: 'Source: Reference, Year',
    particles: 'bold',
  },
  'cta-gradient': {
    adminLabel: 'DigiWin — CTA Gradient',
    sectionPrefix: 'tpl-cta',
    background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #003CC8 100%)',
    title: 'Call to Action Title',
    subtitle: 'A compelling subtitle that encourages the reader to take the next step.',
    buttons: [
      { text: 'Primary Action', href: '#', style: 'primary' },
      { text: 'Secondary Action', href: '#', style: 'ghost' },
    ],
  },
  'hero-gradient': {
    adminLabel: 'DigiWin — Hero Gradient',
    sectionPrefix: 'tpl-hero',
    sectionBg: '#000432',
    panels: [{
      id: 'main',
      label: 'Section Label',
      title: 'Hero Title Goes Here',
      subtitle: 'A compelling subtitle that draws the reader in and sets the context for the page.',
      gradient: 'linear-gradient(165deg, #0f1419 0%, #1a2632 50%, #000864 100%)',
      headingTag: 'h1',
      buttons: [
        { text: 'Primary Action', href: '#', style: 'primary' },
        { text: 'Learn More', href: '#', style: 'ghost' },
      ],
    }],
  },
  'logo-marquee': {
    adminLabel: 'DigiWin — Logo Marquee',
    sectionPrefix: 'tpl-logos',
    label: 'Trusted By Industry Leaders',
    clients: [
      { name: 'Company A', color: '#00AFF0', initials: 'CA', subtitle: 'Manufacturing' },
      { name: 'Company B', color: '#003CC8', initials: 'CB', subtitle: 'Automotive' },
      { name: 'Company C', color: '#000864', initials: 'CC', subtitle: 'Electronics' },
    ],
    stats: [
      { value: '100+', label: 'Clients' },
      { value: '50,000+', label: 'Users' },
    ],
  },
  'footer-ocean': {
    adminLabel: 'DigiWin — Footer Ocean',
    sectionPrefix: 'tpl-footer',
    logo: { src: '#', alt: 'DigiWin', width: 160, height: 40 },
    tagline: 'Manufacturing intelligence since 1982.',
    stockInfo: { label: 'Shenzhen Stock Exchange', code: '300378' },
    columns: [
      { heading: 'Solutions', links: [{ text: 'ERP', href: '#' }, { text: 'MES', href: '#' }, { text: 'WMS', href: '#' }] },
      { heading: 'Company', links: [{ text: 'About', href: '#' }, { text: 'Contact', href: '#' }] },
    ],
    contact: {
      heading: 'Contact',
      company: 'DigiWin Software (Thailand)',
      address: ['123 Example Road', 'Bangkok 10110, Thailand'],
      email: 'info@example.com',
    },
    social: [
      { label: 'LinkedIn', icon: 'in', href: '#' },
      { label: 'LINE', icon: 'L', href: '#' },
    ],
    legal: {
      copyright: '\u00A9 2026 DigiWin. All rights reserved.',
      links: [{ text: 'Privacy Policy', href: '#' }, { text: 'Terms', href: '#' }],
    },
  },
  'result-cards': {
    adminLabel: 'DigiWin — Result Cards',
    sectionPrefix: 'tpl-results',
    background: '#F5F7FA',
    header: {
      label: 'Proven Results',
      title: 'Real Outcomes from Our Clients',
      subtitle: 'Verified results from actual implementations.',
    },
    cards: [
      { company: 'Client Alpha', metric: 'Key metric improvement', detail: 'Details about how this was achieved.' },
      { company: 'Client Beta', metric: 'Another key improvement', detail: 'Details about the second achievement.' },
    ],
    cta: { text: 'See all case studies \u2192', href: '#' },
  },
  'tab-content': {
    adminLabel: 'DigiWin — Tabbed Content',
    sectionPrefix: 'tpl-tabs',
    background: '#ffffff',
    header: {
      label: 'Industry Expertise',
      title: 'Built for Your Industry',
      subtitle: 'Specialized solutions for different manufacturing verticals.',
    },
    tabs: [
      {
        id: 'tab-a',
        label: 'Industry A',
        title: 'Industry A Solutions',
        description: 'Description of how the solution fits this industry.',
        features: ['Feature one', 'Feature two', 'Feature three'],
        cta: { text: 'Explore Solutions', href: '#' },
      },
      {
        id: 'tab-b',
        label: 'Industry B',
        title: 'Industry B Solutions',
        description: 'Description of how the solution fits this industry.',
        features: ['Feature one', 'Feature two', 'Feature three'],
        cta: { text: 'Explore Solutions', href: '#' },
      },
    ],
  },
  'event-hero-vb': {
    adminLabel: 'DigiWin — Event Hero (VB)',
    sectionPrefix: 'tpl-evt-hero',
    color: '#15803d',
    badge: 'Workshop',
    title: 'Smart Manufacturing Workshop: From Shop Floor to Dashboard',
    subtitle: 'Join us for a hands-on workshop exploring how Thai manufacturers are transforming their operations with real-time data visibility.',
    backLink: { text: 'Back to News & Events', href: '/news/' },
    facts: [
      { icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', value: 'March 15, 2026', label: 'Date' },
      { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', value: '13:00 – 17:00', label: 'Time' },
      { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', value: 'Bangkok', label: 'Location' },
      { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>', value: '40 Seats', label: 'Capacity' },
    ],
    cta: { text: 'Register Now', href: '#register' },
    superD: { variant: 'particle', position: 'corner-br', opacity: 0.15 },
  },
};

// ────────────────────────────────────────────────────────────────
// TAXONOMY TERM LOOKUP
// ────────────────────────────────────────────────────────────────

/**
 * Find or create taxonomy terms needed for Layout Library.
 * Divi uses: layout_type='section', scope='not_global', layout_category (custom)
 */
function getTermTaxonomyId(taxonomy, slug, name) {
  // Check if term exists
  const checkSql = `SELECT tt.term_taxonomy_id FROM ${tbl('terms')} t
    JOIN ${tbl('term_taxonomy')} tt ON t.term_id = tt.term_id
    WHERE tt.taxonomy = '${mysql.escape(taxonomy)}' AND t.slug = '${mysql.escape(slug)}'
    LIMIT 1;`;

  const result = mysql.query(checkSql).trim();
  if (result) {
    const lines = result.split('\n');
    if (lines.length > 1) return parseInt(lines[1], 10);
  }

  // Create term if it doesn't exist (combine INSERT + SELECT in single query)
  console.log(`  Creating taxonomy term: ${taxonomy}/${slug}`);
  const createSql = `INSERT INTO ${tbl('terms')} (name, slug, term_group) VALUES ('${mysql.escape(name)}', '${mysql.escape(slug)}', 0);
SELECT LAST_INSERT_ID() AS id;`;
  const termResult = mysql.query(createSql).trim();
  const termId = parseInt(termResult.split('\n').pop().trim(), 10);

  const createTTSql = `INSERT INTO ${tbl('term_taxonomy')} (term_id, taxonomy, description, parent, count) VALUES (${termId}, '${mysql.escape(taxonomy)}', '', 0, 0);
SELECT LAST_INSERT_ID() AS id;`;
  const ttResult = mysql.query(createTTSql).trim();
  const ttId = parseInt(ttResult.split('\n').pop().trim(), 10);
  return ttId;
}

// ────────────────────────────────────────────────────────────────
// PUSH TEMPLATE
// ────────────────────────────────────────────────────────────────

function pushTemplate(name, tmpl, dryRun = false) {
  const data = EXAMPLE_DATA[name];
  if (!data) {
    console.log(`  [SKIP] No example data for template "${name}"`);
    return null;
  }

  // Lint freeForm CSS before push (RT-4 fix: no lint bypass)
  if (typeof tmpl.lintableCSS === 'function') {
    const freeFormCSS = tmpl.lintableCSS(data);
    const lintErrors = checkValidity(freeFormCSS);
    if (lintErrors.length > 0) {
      console.error(`  [LINT FAIL] Template "${name}" has CSS errors:`);
      lintErrors.forEach(e => console.error(`    ${e.rule}: ${e.message}`));
      return null;
    }
    console.log(`  ✓ CSS lint passed`);
  }

  // Generate blocks and CSS
  const blocksArr = tmpl.blocks(data);
  const content = Array.isArray(blocksArr) ? blocksArr.join('\n') : blocksArr;
  const cssContent = tmpl.css(data);

  // Combine: blocks + CSS (if any) in a codeModule
  // NOTE: For Library portability, CSS should be in sectionOpen({ css }) freeForm instead.
  // codeModule <style> is a fallback for templates that haven't migrated yet.
  const fullContent = cssContent.trim()
    ? `${content}\n${codeModule('<style>' + cssContent + '</style>', 'Template Styles')}`
    : content;

  const title = data.adminLabel || `DigiWin — ${name}`;
  const escapedTitle = mysql.escape(title);
  const escapedContent = mysql.escape(fullContent);
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Check if layout already exists
  const checkSql = `SELECT ID FROM ${tbl('posts')} WHERE post_type='et_pb_layout' AND post_title='${escapedTitle}' LIMIT 1;`;

  if (dryRun) {
    console.log(`  [DRY RUN] Would push: ${title}`);
    console.log(`  Content length: ${fullContent.length} chars`);
    return null;
  }

  const existing = mysql.query(checkSql).trim();
  let postId;

  if (existing && existing.split('\n').length > 1) {
    // Update existing
    postId = parseInt(existing.split('\n')[1], 10);
    console.log(`  Updating existing layout #${postId}: ${title}`);
    const updateSql = `UPDATE ${tbl('posts')} SET
      post_content = '${escapedContent}',
      post_modified = '${now}',
      post_modified_gmt = '${now}'
      WHERE ID = ${postId};`;
    mysql.query(updateSql);
  } else {
    // Insert new
    console.log(`  Creating new layout: ${title}`);
    const insertSql = `INSERT INTO ${tbl('posts')} SET
      post_author = 1,
      post_date = '${now}',
      post_date_gmt = '${now}',
      post_content = '${escapedContent}',
      post_title = '${escapedTitle}',
      post_excerpt = '',
      post_status = 'publish',
      post_name = '${mysql.escape(name)}',
      post_type = 'et_pb_layout',
      post_modified = '${now}',
      post_modified_gmt = '${now}',
      comment_status = 'closed',
      ping_status = 'closed',
      post_content_filtered = '',
      to_ping = '',
      pinged = '',
      post_mime_type = '';
SELECT LAST_INSERT_ID() AS id;`;
    const insertResult = mysql.query(insertSql).trim();
    postId = parseInt(insertResult.split('\n').pop().trim(), 10);
  }

  // Set required meta fields
  const metaKeys = [
    ['_et_pb_use_divi_5', 'on'],
    ['_et_pb_use_builder', 'on'],
    ['_et_pb_built_for_post_type', 'page'],
  ];

  for (const [key, value] of metaKeys) {
    // Upsert meta
    const checkMeta = `SELECT meta_id FROM ${tbl('postmeta')} WHERE post_id=${postId} AND meta_key='${key}' LIMIT 1;`;
    const metaResult = mysql.query(checkMeta).trim();
    if (metaResult && metaResult.split('\n').length > 1) {
      mysql.query(`UPDATE ${tbl('postmeta')} SET meta_value='${value}' WHERE post_id=${postId} AND meta_key='${key}';`);
    } else {
      mysql.query(`INSERT INTO ${tbl('postmeta')} (post_id, meta_key, meta_value) VALUES (${postId}, '${key}', '${value}');`);
    }
  }

  // Assign taxonomy terms
  // layout_type must be 'layout' (not 'section') for VB "Your Saved Layouts" tab
  // Divi 5 Library.php line 530: filters by layout_type matching the API 'type' param
  const sectionTermId = getTermTaxonomyId('layout_type', 'layout', 'Layout');
  const notGlobalTermId = getTermTaxonomyId('scope', 'not_global', 'Not Global');
  const categoryTermId = getTermTaxonomyId('layout_category', 'digiwin-templates', 'DigiWin Templates');
  // D83: module_width = regular required for VB Library display (found by layout-library agent)
  const moduleWidthTermId = getTermTaxonomyId('module_width', 'regular', 'Regular');

  for (const ttId of [sectionTermId, notGlobalTermId, categoryTermId, moduleWidthTermId]) {
    const checkRel = `SELECT object_id FROM ${tbl('term_relationships')} WHERE object_id=${postId} AND term_taxonomy_id=${ttId} LIMIT 1;`;
    const relResult = mysql.query(checkRel).trim();
    if (!relResult || relResult.split('\n').length <= 1) {
      mysql.query(`INSERT INTO ${tbl('term_relationships')} (object_id, term_taxonomy_id, term_order) VALUES (${postId}, ${ttId}, 0);`);
      mysql.query(`UPDATE ${tbl('term_taxonomy')} SET count = count + 1 WHERE term_taxonomy_id = ${ttId};`);
    }
  }

  console.log(`  ✓ Layout #${postId} published: ${title}`);
  return postId;
}

// ────────────────────────────────────────────────────────────────
// CLI
// ────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const listOnly = args.includes('--list');
  const pushAll = args.includes('--all');
  const templateFlag = args.indexOf('--template');
  const templateName = templateFlag !== -1 ? args[templateFlag + 1] : null;

  if (listOnly) {
    console.log('\nAvailable templates:');
    list().forEach(t => console.log(`  ${t.name} — ${t.description}`));
    console.log('');
    return;
  }

  if (!pushAll && !templateName) {
    console.log('Usage:');
    console.log('  node library-push.js --all [--dry-run]');
    console.log('  node library-push.js --template <name> [--dry-run]');
    console.log('  node library-push.js --list');
    return;
  }

  console.log(`\n📚 Divi 5 Layout Library Push${dryRun ? ' (DRY RUN)' : ''}`);
  console.log('─'.repeat(50));

  const toPush = templateName
    ? { [templateName]: templates[templateName] }
    : templates;

  let pushed = 0;
  for (const [name, tmpl] of Object.entries(toPush)) {
    if (!tmpl) {
      console.log(`  [ERROR] Template not found: ${name}`);
      continue;
    }
    console.log(`\n  Processing: ${name}`);
    pushTemplate(name, tmpl, dryRun);
    pushed++;
  }

  // Flush Divi CSS cache so VB serves updated templates immediately
  if (!dryRun && pushed > 0) {
    console.log('\n  Flushing Divi CSS cache...');
    flushAll({ quiet: true });
    console.log('  ✓ Cache flushed');
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Done. ${pushed} template(s) ${dryRun ? 'previewed' : 'pushed'}.`);
}

if (require.main === module) {
  main();
}

module.exports = { pushTemplate, EXAMPLE_DATA };
