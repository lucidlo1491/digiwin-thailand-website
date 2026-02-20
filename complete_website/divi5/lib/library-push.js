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
const { templates, list } = require('./templates/index');

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
  const checkSql = `SELECT tt.term_taxonomy_id FROM wp_terms t
    JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
    WHERE tt.taxonomy = '${mysql.escape(taxonomy)}' AND t.slug = '${mysql.escape(slug)}'
    LIMIT 1;`;

  const result = mysql.query(checkSql).trim();
  if (result) {
    const lines = result.split('\n');
    if (lines.length > 1) return parseInt(lines[1], 10);
  }

  // Create term if it doesn't exist
  console.log(`  Creating taxonomy term: ${taxonomy}/${slug}`);
  const insertTerm = `INSERT INTO wp_terms (name, slug, term_group) VALUES ('${mysql.escape(name)}', '${mysql.escape(slug)}', 0);`;
  mysql.query(insertTerm);
  const termId = mysql.query('SELECT LAST_INSERT_ID() AS id;').split('\n')[1].trim();
  const insertTT = `INSERT INTO wp_term_taxonomy (term_id, taxonomy, description, parent, count) VALUES (${termId}, '${mysql.escape(taxonomy)}', '', 0, 0);`;
  mysql.query(insertTT);
  const ttId = mysql.query('SELECT LAST_INSERT_ID() AS id;').split('\n')[1].trim();
  return parseInt(ttId, 10);
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

  // Generate blocks and CSS
  const blocksArr = tmpl.blocks(data);
  const content = Array.isArray(blocksArr) ? blocksArr.join('\n') : blocksArr;
  const cssContent = tmpl.css(data);

  // Combine: blocks + style tag with CSS
  const fullContent = `${content}\n<!-- wp:html --><style>${cssContent}</style><!-- /wp:html -->`;

  const title = data.adminLabel || `DigiWin — ${name}`;
  const escapedTitle = mysql.escape(title);
  const escapedContent = mysql.escape(fullContent);
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Check if layout already exists
  const checkSql = `SELECT ID FROM wp_posts WHERE post_type='et_pb_layout' AND post_title='${escapedTitle}' LIMIT 1;`;

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
    const updateSql = `UPDATE wp_posts SET
      post_content = '${escapedContent}',
      post_modified = '${now}',
      post_modified_gmt = '${now}'
      WHERE ID = ${postId};`;
    mysql.query(updateSql);
  } else {
    // Insert new
    console.log(`  Creating new layout: ${title}`);
    const insertSql = `INSERT INTO wp_posts SET
      post_author = 1,
      post_date = '${now}',
      post_date_gmt = '${now}',
      post_content = '${escapedContent}',
      post_title = '${escapedTitle}',
      post_status = 'publish',
      post_name = '${mysql.escape(name)}',
      post_type = 'et_pb_layout',
      post_modified = '${now}',
      post_modified_gmt = '${now}',
      comment_status = 'closed',
      ping_status = 'closed',
      post_mime_type = '';`;
    mysql.query(insertSql);
    postId = parseInt(mysql.query('SELECT LAST_INSERT_ID() AS id;').split('\n')[1].trim(), 10);
  }

  // Set required meta fields
  const metaKeys = [
    ['_et_pb_use_divi_5', 'on'],
    ['_et_pb_use_builder', 'on'],
    ['_et_pb_built_for_post_type', 'page'],
  ];

  for (const [key, value] of metaKeys) {
    // Upsert meta
    const checkMeta = `SELECT meta_id FROM wp_postmeta WHERE post_id=${postId} AND meta_key='${key}' LIMIT 1;`;
    const metaResult = mysql.query(checkMeta).trim();
    if (metaResult && metaResult.split('\n').length > 1) {
      mysql.query(`UPDATE wp_postmeta SET meta_value='${value}' WHERE post_id=${postId} AND meta_key='${key}';`);
    } else {
      mysql.query(`INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (${postId}, '${key}', '${value}');`);
    }
  }

  // Assign taxonomy terms
  const sectionTermId = getTermTaxonomyId('layout_type', 'section', 'Section');
  const notGlobalTermId = getTermTaxonomyId('scope', 'not_global', 'Not Global');
  const categoryTermId = getTermTaxonomyId('layout_category', 'digiwin-templates', 'DigiWin Templates');

  for (const ttId of [sectionTermId, notGlobalTermId, categoryTermId]) {
    const checkRel = `SELECT object_id FROM wp_term_relationships WHERE object_id=${postId} AND term_taxonomy_id=${ttId} LIMIT 1;`;
    const relResult = mysql.query(checkRel).trim();
    if (!relResult || relResult.split('\n').length <= 1) {
      mysql.query(`INSERT INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) VALUES (${postId}, ${ttId}, 0);`);
      mysql.query(`UPDATE wp_term_taxonomy SET count = count + 1 WHERE term_taxonomy_id = ${ttId};`);
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

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Done. ${pushed} template(s) ${dryRun ? 'previewed' : 'pushed'}.`);
}

if (require.main === module) {
  main();
}

module.exports = { pushTemplate, EXAMPLE_DATA };
