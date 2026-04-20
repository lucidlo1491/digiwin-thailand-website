#!/usr/bin/env node
/**
 * create-event-page.js — Automate new event page creation (EN + TH)
 *
 * Performs 5 steps that are otherwise manual:
 *   1. Add event to events registry (lib/events-registry.js)
 *   2. Scaffold 16 section builder files (8 EN + 8 TH)
 *   3. Create page config files (EN + TH) with WordPress page creation via MySQL
 *   4. Add language toggle pair to header.js langMap
 *   5. Log hreflang mapping for mu-plugin
 *
 * Usage:
 *   node complete_website/divi5/create-event-page.js \
 *     --slug manufacturing-summit-2026 \
 *     --prefix ms \
 *     --title "Manufacturing Summit 2026" \
 *     --date "June 5-7, 2026" \
 *     --location "IMPACT Arena, Bangkok" \
 *     --booth "Hall 3, Booth A42" \
 *     --color "#6d28d9" \
 *     --badge "Trade Show" \
 *     --source-url "https://example.com/article" \
 *     [--dry-run]
 *
 * Re-runnable: checks if files exist before overwriting.
 */

const fs = require('fs')
const path = require('path')

// ── Parse CLI args ──────────────────────────────────────────────
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')

function getArg(name) {
  const idx = args.indexOf(`--${name}`)
  if (idx === -1 || idx + 1 >= args.length) return null
  return args[idx + 1]
}

const slug = getArg('slug')
const prefix = getArg('prefix')
const title = getArg('title')
const date = getArg('date')
const location = getArg('location')
const booth = getArg('booth') || ''
const color = getArg('color') || '#0891b2'
const badge = getArg('badge') || 'Trade Show'
const sourceUrl = getArg('source-url') || ''

// ── Validate required args ──────────────────────────────────────
const missing = []
if (!slug) missing.push('--slug')
if (!prefix) missing.push('--prefix')
if (!title) missing.push('--title')
if (!date) missing.push('--date')
if (!location) missing.push('--location')

if (missing.length) {
  console.error(`\nMissing required arguments: ${missing.join(', ')}`)
  console.error(`
Usage:
  node create-event-page.js \\
    --slug manufacturing-summit-2026 \\
    --prefix ms \\
    --title "Manufacturing Summit 2026" \\
    --date "June 5-7, 2026" \\
    --location "IMPACT Arena, Bangkok" \\
    --booth "Hall 3, Booth A42" \\
    --color "#6d28d9" \\
    --badge "Trade Show" \\
    --source-url "https://example.com/article" \\
    [--dry-run]
`)
  process.exit(1)
}

// ── Paths ───────────────────────────────────────────────────────
const DIVI5_DIR = __dirname
const SECTIONS_DIR = path.join(DIVI5_DIR, 'pages', 'sections')
const PAGES_DIR = path.join(DIVI5_DIR, 'pages')
const REGISTRY_FILE = path.join(DIVI5_DIR, 'lib', 'events-registry.js')
const HEADER_FILE = path.join(DIVI5_DIR, 'global', 'header.js')

const EN_EVENTS_PARENT_ID = 100752
const TH_EVENTS_PARENT_ID = 100789

// ── Logging ─────────────────────────────────────────────────────
const log = (msg) => console.log(`  ${msg}`)
const logStep = (n, msg) => console.log(`\n[Step ${n}] ${msg}`)
const logFile = (action, filePath) => {
  const rel = path.relative(path.join(DIVI5_DIR, '..', '..'), filePath)
  log(`${action}: ${rel}`)
}

// ── Safe file write (no overwrite) ──────────────────────────────
function safeWrite(filePath, content) {
  if (fs.existsSync(filePath)) {
    logFile('SKIP (exists)', filePath)
    return false
  }
  if (DRY_RUN) {
    logFile('WOULD CREATE', filePath)
    return true
  }
  fs.writeFileSync(filePath, content, 'utf8')
  logFile('CREATED', filePath)
  return true
}

// ── Section template generators ─────────────────────────────────
// Each returns the file content string for a section builder .js file.

const SECTION_DEFS = [
  {
    suffix: 'hero',
    sectionPrefixSuffix: 'hero',
    template: 'event-hero',
    sNum: 'S1',
    enContent: () => `/**
 * ${prefix}-hero.js — ${title} Hero (S1)
 *
 * Thin data wrapper using event-hero template.
 */

const template = require('../../lib/templates/event-hero')

const DATA = {
  sectionPrefix: '${prefix}-hero',
  color: '${color}',
  badge: '${badge}',
  title: '${title}',
  subtitle: '[EDIT] Brief description of the event and what DigiWin will showcase.',
  backLink: { text: 'Back to News &amp; Events', href: '/news/' },
  facts: [
    { icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', value: '${date}', label: '[EDIT] Day range' },
    { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', value: '[EDIT] 10:00 – 18:00', label: 'Daily' },
    { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', value: '${location}', label: '${booth || '[EDIT] Hall & Booth'}' },
    { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>', value: '[EDIT] Entry type', label: '[EDIT] Registration info' },
  ],
  cta: { text: 'Book a Meeting', href: '/demo/' },
  superD: { variant: 'gradient', position: 'center', opacity: 0.12 },
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-hero.js — Thai ${title} Hero (S1)
 *
 * Thin data wrapper using event-hero template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-hero')

const DATA = {
  sectionPrefix: '${prefix}-hero',
  color: '${color}',
  badge: '[EDIT] Thai badge text',
  title: '${title}',
  subtitle: '[EDIT] Thai subtitle describing the event.',
  backLink: {
    text: '\\u0E01\\u0E25\\u0E31\\u0E1A\\u0E44\\u0E1B\\u0E02\\u0E48\\u0E32\\u0E27\\u0E2A\\u0E32\\u0E23\\u0E41\\u0E25\\u0E30\\u0E01\\u0E34\\u0E08\\u0E01\\u0E23\\u0E23\\u0E21',
    href: '/th/news/',
  },
  facts: [
    {
      icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      value: '[EDIT] Thai date',
      label: '[EDIT] Thai day range',
    },
    {
      icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      value: '[EDIT] 10:00 – 18:00',
      label: '[EDIT] \\u0E17\\u0E38\\u0E01\\u0E27\\u0E31\\u0E19',
    },
    {
      icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
      value: '[EDIT] Thai location',
      label: '[EDIT] Thai booth info',
    },
    {
      icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
      value: '[EDIT] Thai entry type',
      label: '[EDIT] Thai registration info',
    },
  ],
  cta: {
    text: '[EDIT] \\u0E19\\u0E31\\u0E14\\u0E2B\\u0E21\\u0E32\\u0E22\\u0E1E\\u0E1A\\u0E1B\\u0E30',
    href: '/th/demo/',
  },
  superD: {
    variant: 'particle',
    position: 'corner-br',
    opacity: 0.15,
  },
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
  {
    suffix: 'problem',
    sectionPrefixSuffix: 'prob',
    template: 'event-problem',
    sNum: 'S2',
    enContent: () => `/**
 * ${prefix}-problem.js — ${title} Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem')

const DATA = {
  sectionPrefix: '${prefix}-prob',
  color: '${color}',
  label: 'Why Visit',
  title: '[EDIT] Problem statement headline — what challenge does the audience face?',
  bodyHTML: \`
    <p>[EDIT] First paragraph: describe the industry challenge or pain point that makes this event relevant. Be specific to the Thai manufacturing context.</p>

    <p>[EDIT] Second paragraph: explain why existing solutions fall short. Connect to DigiWin's unique capabilities.</p>

    <p>[EDIT] Third paragraph: what visitors will see at the booth — real solutions, not slides. Include specifics like "100+ Thai factories" if applicable.</p>\`,
  dataCard: { from: '${booth || '[EDIT] Booth number'}', to: null, label: '${location}' },
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-problem.js — Thai ${title} Problem Section (S2)
 *
 * Thin data wrapper using event-problem template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-problem')

const DATA = {
  sectionPrefix: '${prefix}-prob',
  color: '${color}',
  label: '[EDIT] Thai "Why Visit" label',
  title: '[EDIT] Thai problem statement headline',
  bodyHTML: \`
    <p>[EDIT] Thai first paragraph: industry challenge description.</p>

    <p>[EDIT] Thai second paragraph: why existing solutions fall short.</p>

    <p>[EDIT] Thai third paragraph: what visitors will see at the booth.</p>\`,
  dataCard: { from: '[EDIT] Thai booth', to: null, label: '[EDIT] Thai location' },
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
  {
    suffix: 'outcomes',
    sectionPrefixSuffix: 'out',
    template: 'event-outcomes',
    sNum: 'S3',
    enContent: () => `/**
 * ${prefix}-outcomes.js — ${title} Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 */

const template = require('../../lib/templates/event-outcomes')

const DATA = {
  sectionPrefix: '${prefix}-out',
  color: '${color}',
  label: 'What You\\'ll See',
  title: '[EDIT] Outcomes headline — what solutions are on display?',
  outcomes: [
    { icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>', title: '[EDIT] Outcome 1 Title', desc: '[EDIT] Description of first solution or outcome visitors will experience.' },
    { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', title: '[EDIT] Outcome 2 Title', desc: '[EDIT] Description of second solution or outcome.' },
    { icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>', title: '[EDIT] Outcome 3 Title', desc: '[EDIT] Description of third solution or outcome.' },
    { icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', title: '[EDIT] Outcome 4 Title', desc: '[EDIT] Description of fourth solution or outcome.' },
  ],
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-outcomes.js — Thai ${title} Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-outcomes')

const DATA = {
  sectionPrefix: '${prefix}-out',
  color: '${color}',
  label: '[EDIT] Thai "What You\\'ll See" label',
  title: '[EDIT] Thai outcomes headline',
  outcomes: [
    {
      icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',
      title: '[EDIT] Thai outcome 1 title',
      desc: '[EDIT] Thai outcome 1 description.',
    },
    {
      icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
      title: '[EDIT] Thai outcome 2 title',
      desc: '[EDIT] Thai outcome 2 description.',
    },
    {
      icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>',
      title: '[EDIT] Thai outcome 3 title',
      desc: '[EDIT] Thai outcome 3 description.',
    },
    {
      icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      title: '[EDIT] Thai outcome 4 title',
      desc: '[EDIT] Thai outcome 4 description.',
    },
  ],
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
  {
    suffix: 'personas',
    sectionPrefixSuffix: 'per',
    template: 'event-personas',
    sNum: 'S4',
    enContent: () => `/**
 * ${prefix}-personas.js — ${title} Personas (S4)
 *
 * Thin data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas')

const DATA = {
  sectionPrefix: '${prefix}-per',
  color: '${color}',
  label: 'Who Should Visit',
  title: '[EDIT] Persona headline — is this event right for you?',
  personas: [
    { role: '[EDIT] Persona 1 Role / Job Title', size: '[EDIT] Company type or context', desc: '[EDIT] Description of why this persona should attend and what they will gain.', quote: '"[EDIT] Quote from this persona\'s perspective."' },
    { role: '[EDIT] Persona 2 Role / Job Title', size: '[EDIT] Company type or context', desc: '[EDIT] Description of why this persona should attend.', quote: '"[EDIT] Quote from this persona\'s perspective."' },
  ],
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-personas.js — Thai ${title} Personas (S4)
 *
 * Thin data wrapper using event-personas template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-personas')

const DATA = {
  sectionPrefix: '${prefix}-per',
  color: '${color}',
  label: '[EDIT] Thai "Who Should Visit" label',
  title: '[EDIT] Thai persona headline',
  personas: [
    {
      role: '[EDIT] Thai persona 1 role',
      size: '[EDIT] Thai company type',
      desc: '[EDIT] Thai persona 1 description.',
      quote: '"[EDIT] Thai persona 1 quote"',
    },
    {
      role: '[EDIT] Thai persona 2 role',
      size: '[EDIT] Thai company type',
      desc: '[EDIT] Thai persona 2 description.',
      quote: '"[EDIT] Thai persona 2 quote"',
    },
  ],
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
  {
    suffix: 'proof',
    sectionPrefixSuffix: 'prf',
    template: 'event-proof',
    sNum: 'S5',
    enContent: () => `/**
 * ${prefix}-proof.js — ${title} Proof (S5)
 *
 * Thin data wrapper using event-proof template.
 */

const template = require('../../lib/templates/event-proof')

const DATA = {
  sectionPrefix: '${prefix}-prf',
  color: '${color}',
  label: 'Why DigiWin Thailand',
  title: '[EDIT] Proof headline — the team behind the booth',
  stats: [
    { value: '100+', label: 'Thai Implementations' },
    { value: '44', label: 'Years Manufacturing ERP' },
    { value: '7', label: 'Years Serving Thailand' },
    { value: '95%', label: 'Contract Renewal Rate' },
  ],
  text: '[EDIT] Supporting text about DigiWin Thailand\\'s track record, bilingual team, and industry expertise.',
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-proof.js — Thai ${title} Proof (S5)
 *
 * Thin data wrapper using event-proof template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-proof')

const DATA = {
  sectionPrefix: '${prefix}-prf',
  color: '${color}',
  label: '[EDIT] Thai "Why DigiWin" label',
  title: '[EDIT] Thai proof headline',
  stats: [
    { value: '100+', label: '[EDIT] Thai label' },
    { value: '44', label: '[EDIT] Thai label' },
    { value: '7', label: '[EDIT] Thai label' },
    { value: '95%', label: '[EDIT] Thai label' },
  ],
  text: '[EDIT] Thai supporting text about DigiWin Thailand.',
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
  {
    suffix: 'logistics',
    sectionPrefixSuffix: 'log',
    template: 'event-logistics',
    sNum: 'S6',
    enContent: () => `/**
 * ${prefix}-logistics.js — ${title} Logistics (S6)
 *
 * Thin data wrapper using event-logistics template.
 */

const template = require('../../lib/templates/event-logistics')

const DATA = {
  sectionPrefix: '${prefix}-log',
  color: '${color}',
  label: 'Practical Details',
  title: 'Everything You Need to Know',
  items: [
    { icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', label: 'Dates', value: '${date}' },
    { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', label: 'Times', value: '[EDIT] 10:00 – 18:00 daily' },
    { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', label: 'Location', value: '${location}' },
    { icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', label: 'Hall & Booth', value: '${booth || '[EDIT] Hall & Booth info'}' },
    { icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>', label: 'Cost', value: '[EDIT] Free / Ticketed' },${sourceUrl ? `
    { icon: '<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>', label: 'Original Coverage', value: '<a href="${sourceUrl}" target="_blank" rel="noopener">Read full coverage</a>' },` : `
    // [EDIT] Add source URL item if applicable`}
  ],
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-logistics.js — Thai ${title} Logistics (S6)
 *
 * Thin data wrapper using event-logistics template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-logistics')

const DATA = {
  sectionPrefix: '${prefix}-log',
  color: '${color}',
  label: '[EDIT] Thai "Practical Details" label',
  title: '[EDIT] Thai logistics headline',
  items: [
    {
      icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      label: '[EDIT] Thai date label',
      value: '[EDIT] Thai date value',
    },
    {
      icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      label: '[EDIT] Thai time label',
      value: '[EDIT] Thai time value',
    },
    {
      icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
      label: '[EDIT] Thai location label',
      value: '[EDIT] Thai location value',
    },
    {
      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
      label: '[EDIT] Thai booth label',
      value: '[EDIT] Thai booth value',
    },
    {
      icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
      label: '[EDIT] Thai cost label',
      value: '[EDIT] Thai cost value',
    },
  ],
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
  {
    suffix: 'register',
    sectionPrefixSuffix: 'reg',
    template: 'event-register',
    sNum: 'S7',
    enContent: () => `/**
 * ${prefix}-register.js — ${title} Registration CTA (S7)
 *
 * Thin data wrapper using event-register template.
 */

const template = require('../../lib/templates/event-register')

const DATA = {
  sectionPrefix: '${prefix}-reg',
  color: '${color}',
  title: '[EDIT] CTA headline — e.g. "Visit Us at Booth X"',
  meta: '${date} &middot; ${location}${booth ? ' &middot; ' + booth : ''}',
  cta: { text: 'Book a Meeting', href: '/demo/' },
  secondary: { text: '[EDIT] Secondary text', linkText: '[EDIT] Secondary link text', href: '/news/' },
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-register.js — Thai ${title} Registration CTA (S7)
 *
 * Thin data wrapper using event-register template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-register')

const DATA = {
  sectionPrefix: '${prefix}-reg',
  color: '${color}',
  title: '[EDIT] Thai CTA headline',
  meta: '[EDIT] Thai date &middot; Thai location',
  cta: { text: '[EDIT] Thai CTA button text', href: '/th/demo/' },
  secondary: { text: '[EDIT] Thai secondary text', linkText: '[EDIT] Thai secondary link', href: '/th/news/' },
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
  {
    suffix: 'related',
    sectionPrefixSuffix: 'rel',
    template: 'event-related',
    sNum: 'S8',
    enContent: () => `/**
 * ${prefix}-related.js — ${title} Related Events (S8)
 *
 * Thin data wrapper using event-related template.
 * Pulls related events from the shared registry.
 */

const template = require('../../lib/templates/event-related')
const { pickRelated } = require('../../lib/events-registry')

const related = pickRelated('${slug}', 3)

const DATA = {
  sectionPrefix: '${prefix}-rel',
  color: '${color}',
  label: 'More Upcoming Events',
  title: 'Continue Your Learning Journey',
  events: related.map(e => ({
    typeBadge: e.typeBadge,
    title: e.title,
    date: e.date,
    location: e.location,
    href: e.href,
    color: e.color,
  })),
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
    thContent: () => `/**
 * th-${prefix}-related.js — Thai ${title} Related Events (S8)
 *
 * Thin data wrapper using event-related template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-related')
const { pickRelated } = require('../../lib/events-registry')

const related = pickRelated('${slug}', 3)

const DATA = {
  sectionPrefix: '${prefix}-rel',
  color: '${color}',
  label: '\\u0E01\\u0E34\\u0E08\\u0E01\\u0E23\\u0E23\\u0E21\\u0E17\\u0E35\\u0E48\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E08\\u0E30\\u0E21\\u0E32\\u0E16\\u0E36\\u0E07',
  title: '[EDIT] Thai related events headline',
  events: related.map(e => ({
    typeBadge: e.typeBadge,
    title: e.title,
    date: e.date,
    location: e.location,
    href: e.href,
    color: e.color,
  })),
}

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
}
`,
  },
]

// ── Page config generators ──────────────────────────────────────

function generateEnPageConfig(enPageId) {
  const sectionImports = SECTION_DEFS.map(s =>
    `const ${s.suffix}Builder = require('./sections/${prefix}-${s.suffix}')`
  ).join('\n')

  const sectionEntries = SECTION_DEFS.map(s =>
    `    { name: '${prefix}-${s.suffix}', builder: ${s.suffix}Builder },`
  ).join('\n')

  return `/**
 * ${slug}.js — ${title} event page config
 *
 * WordPress page: ${title} (slug: ${slug})
 * Sections: ${SECTION_DEFS.length} (event template structure)
 *
 * Usage: node complete_website/divi5/build-page.js --page ${slug} [--dry-run]
 */

const path = require('path')

${sectionImports}
const schema = require('../lib/schema')

module.exports = {
  pageId: ${enPageId},
  title: '${title.replace(/'/g, "\\'")} — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: null,
  protoFile: null,

  sections: [
${sectionEntries}
  ],

  schema() {
    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'News & Events', url: '/news/' },
        { name: '${title.replace(/'/g, "\\'")}', url: '/${slug}/' },
      ]),
      schema.event({
        name: '${title.replace(/'/g, "\\'")}',
        description: '[EDIT] Schema description of the event.',
        startDate: '[EDIT] 2026-01-01T10:00:00+07:00',
        endDate: '[EDIT] 2026-01-01T18:00:00+07:00',
        locationName: '${location.replace(/'/g, "\\'")}',
        city: 'Bangkok',
        country: 'TH',
        isAccessibleForFree: true,
      }),
    ]
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: null,
    sections: [],
  },
}
`
}

function generateThPageConfig(thPageId, enPageId) {
  const sectionImports = SECTION_DEFS.map(s =>
    `const th${s.suffix.charAt(0).toUpperCase() + s.suffix.slice(1)}Builder = require('./sections/th-${prefix}-${s.suffix}')`
  ).join('\n')

  const sectionEntries = SECTION_DEFS.map(s => {
    const varName = `th${s.suffix.charAt(0).toUpperCase() + s.suffix.slice(1)}Builder`
    return `    { name: '${prefix}-${s.suffix}', builder: ${varName} },`
  }).join('\n')

  return `/**
 * th-${slug}.js — Thai ${title} event page config
 *
 * WordPress page: Thai ${title} (slug: th/${slug})
 * Sections: ${SECTION_DEFS.length} (same structure as English, all Thai content)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-${slug} [--dry-run]
 */

const path = require('path')
const { thaiTypographyCSS } = require('../lib/css-assembler')

${sectionImports}
const schema = require('../lib/schema')

module.exports = {
  pageId: ${thPageId},
  title: '${title.replace(/'/g, "\\'")} — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: null,
  protoFile: null,

  sections: [
${sectionEntries}
  ],

  extraCSS: () => thaiTypographyCSS(),

  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\\u0E2B\\u0E19\\u0E49\\u0E32\\u0E41\\u0E23\\u0E01', url: '/th/' },
        { name: '\\u0E02\\u0E48\\u0E32\\u0E27\\u0E2A\\u0E32\\u0E23\\u0E41\\u0E25\\u0E30\\u0E01\\u0E34\\u0E08\\u0E01\\u0E23\\u0E23\\u0E21', url: '/th/news/' },
        { name: '${title.replace(/'/g, "\\'")}', url: '/th/${slug}/' },
      ])),
      schema.thaiVariant(schema.event({
        name: '${title.replace(/'/g, "\\'")}',
        description: '[EDIT] Thai schema description of the event.',
        startDate: '[EDIT] 2026-01-01T10:00:00+07:00',
        endDate: '[EDIT] 2026-01-01T18:00:00+07:00',
        locationName: '${location.replace(/'/g, "\\'")}',
        city: 'Bangkok',
        country: 'TH',
        isAccessibleForFree: true,
      })),
    ]
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: null,
    sections: [],
  },
}
`
}

// ── Main execution ──────────────────────────────────────────────

console.log(`\n${'='.repeat(60)}`)
console.log(`  CREATE EVENT PAGE: ${title}`)
console.log(`  slug: ${slug} | prefix: ${prefix} | color: ${color}`)
console.log(`  badge: ${badge} | date: ${date}`)
console.log(`  location: ${location}${booth ? ' | booth: ' + booth : ''}`)
if (DRY_RUN) console.log(`  MODE: DRY RUN (no files written, no DB changes)`)
console.log(`${'='.repeat(60)}`)

// ────────────────────────────────────────────────────────────────
// Step 1: Add event to events registry
// ────────────────────────────────────────────────────────────────
logStep(1, 'Add event to events-registry.js')

const registryContent = fs.readFileSync(REGISTRY_FILE, 'utf8')

if (registryContent.includes(`'${slug}'`)) {
  log(`SKIP — event '${slug}' already in registry`)
} else {
  // Build the new entry
  const newEntry = `  '${slug}': {
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    shortTitle: '${title.replace(/'/g, "\\'")}',
    typeBadge: '${badge}',
    date: '${date}',
    location: '${location.replace(/'/g, "\\'")}',
    href: '/news/events/${slug}/',
    color: '${color}',
  },`

  // Insert before the closing `};` of ALL_EVENTS
  // Find the last event entry's closing `},` followed by `};`
  const insertPoint = registryContent.lastIndexOf('};')
  if (insertPoint === -1) {
    console.error('ERROR: Could not find closing }; in events-registry.js')
    process.exit(1)
  }

  const updatedRegistry = registryContent.slice(0, insertPoint) + newEntry + '\n' + registryContent.slice(insertPoint)

  if (DRY_RUN) {
    log(`WOULD ADD entry for '${slug}' to events-registry.js`)
  } else {
    fs.writeFileSync(REGISTRY_FILE, updatedRegistry, 'utf8')
    log(`ADDED entry for '${slug}' to events-registry.js`)
  }
}

// ────────────────────────────────────────────────────────────────
// Step 2: Scaffold 16 section builder files (8 EN + 8 TH)
// ────────────────────────────────────────────────────────────────
logStep(2, 'Scaffold section builder files')

let enCreated = 0
let thCreated = 0

for (const def of SECTION_DEFS) {
  // EN section
  const enFile = path.join(SECTIONS_DIR, `${prefix}-${def.suffix}.js`)
  if (safeWrite(enFile, def.enContent())) enCreated++

  // TH section
  const thFile = path.join(SECTIONS_DIR, `th-${prefix}-${def.suffix}.js`)
  if (safeWrite(thFile, def.thContent())) thCreated++
}

log(`EN sections: ${enCreated}/${SECTION_DEFS.length} created`)
log(`TH sections: ${thCreated}/${SECTION_DEFS.length} created`)

// ────────────────────────────────────────────────────────────────
// Step 3: Create WordPress pages + page config files
// ────────────────────────────────────────────────────────────────
logStep(3, 'Create WordPress pages + page config files')

let enPageId = null
let thPageId = null

// Check if page configs already exist (they contain the pageId)
const enConfigPath = path.join(PAGES_DIR, `${slug}.js`)
const thConfigPath = path.join(PAGES_DIR, `th-${slug}.js`)

if (fs.existsSync(enConfigPath)) {
  log(`SKIP — EN config already exists: pages/${slug}.js`)
  // Try to extract pageId from existing config
  const existing = fs.readFileSync(enConfigPath, 'utf8')
  const match = existing.match(/pageId:\s*(\d+)/)
  if (match) enPageId = parseInt(match[1], 10)
} else {
  // Create WordPress page via MySQL
  if (DRY_RUN) {
    log('WOULD CREATE WordPress page (EN) under events-listing')
    enPageId = 'XXXXX'
  } else {
    const mysql = require('./lib/mysql')
    try {
      enPageId = mysql.createPage({
        title: title,
        slug: slug,
        parentId: EN_EVENTS_PARENT_ID,
        status: 'publish',
      })
      log(`CREATED WordPress page (EN): ID ${enPageId}, parent ${EN_EVENTS_PARENT_ID}`)
    } catch (err) {
      console.error(`ERROR creating EN WordPress page: ${err.message}`)
      console.error('You can create the page manually and set pageId in the config file.')
      enPageId = '[EDIT_PAGE_ID]'
    }
  }
}

if (fs.existsSync(thConfigPath)) {
  log(`SKIP — TH config already exists: pages/th-${slug}.js`)
  const existing = fs.readFileSync(thConfigPath, 'utf8')
  const match = existing.match(/pageId:\s*(\d+)/)
  if (match) thPageId = parseInt(match[1], 10)
} else {
  if (DRY_RUN) {
    log('WOULD CREATE WordPress page (TH) under th-events-listing')
    thPageId = 'YYYYY'
  } else {
    const mysql = require('./lib/mysql')
    try {
      thPageId = mysql.createPage({
        title: title,
        slug: slug,
        parentId: TH_EVENTS_PARENT_ID,
        status: 'publish',
      })
      log(`CREATED WordPress page (TH): ID ${thPageId}, parent ${TH_EVENTS_PARENT_ID}`)
    } catch (err) {
      console.error(`ERROR creating TH WordPress page: ${err.message}`)
      console.error('You can create the page manually and set pageId in the config file.')
      thPageId = '[EDIT_PAGE_ID]'
    }
  }
}

// Write page config files
safeWrite(enConfigPath, generateEnPageConfig(enPageId))
safeWrite(thConfigPath, generateThPageConfig(thPageId, enPageId))

// ────────────────────────────────────────────────────────────────
// Step 4: Add language toggle pair to header.js langMap
// ────────────────────────────────────────────────────────────────
logStep(4, 'Add language toggle pair to header.js langMap')

const headerContent = fs.readFileSync(HEADER_FILE, 'utf8')
const enPath = `/news/events/${slug}/`
const thPath = `/th/news/events/${slug}/`
const langMapEntry = `'${enPath}':'${thPath}'`

if (headerContent.includes(enPath)) {
  log(`SKIP — langMap already contains ${enPath}`)
} else {
  // Find the langMap closing `};` — the langMap is a single-line var assignment
  // Pattern: var langMap={...};
  const langMapMatch = headerContent.match(/var langMap=\{([^}]+)\}/)
  if (!langMapMatch) {
    console.error('ERROR: Could not find langMap in header.js')
    log(`MANUAL ACTION: Add this to langMap: ${langMapEntry}`)
  } else {
    const existingEntries = langMapMatch[1]
    const newEntries = existingEntries + ',' + langMapEntry
    const updatedHeader = headerContent.replace(
      `var langMap={${existingEntries}}`,
      `var langMap={${newEntries}}`
    )

    if (DRY_RUN) {
      log(`WOULD ADD to langMap: ${enPath} <-> ${thPath}`)
    } else {
      fs.writeFileSync(HEADER_FILE, updatedHeader, 'utf8')
      log(`ADDED to langMap: ${enPath} <-> ${thPath}`)
    }
  }
}

// ────────────────────────────────────────────────────────────────
// Step 5: Log hreflang mapping
// ────────────────────────────────────────────────────────────────
logStep(5, 'Hreflang mapping (for mu-plugin)')

log(`Add to digiwin-hreflang.php page pairs array:`)
log(`  EN: /news/events/${slug}/`)
log(`  TH: /th/news/events/${slug}/`)
if (enPageId && thPageId) {
  log(`  EN page ID: ${enPageId}`)
  log(`  TH page ID: ${thPageId}`)
}

// ────────────────────────────────────────────────────────────────
// Summary
// ────────────────────────────────────────────────────────────────
console.log(`\n${'='.repeat(60)}`)
console.log(`  SUMMARY`)
console.log(`${'='.repeat(60)}`)
console.log(`
  Event: ${title}
  Slug:  ${slug}
  Prefix: ${prefix}

  EN page ID: ${enPageId || 'N/A'}
  TH page ID: ${thPageId || 'N/A'}

  Files created/checked:
    - lib/events-registry.js (registry entry)
    - pages/${slug}.js (EN page config)
    - pages/th-${slug}.js (TH page config)
    - pages/sections/${prefix}-*.js (${SECTION_DEFS.length} EN section builders)
    - pages/sections/th-${prefix}-*.js (${SECTION_DEFS.length} TH section builders)
    - global/header.js (langMap entry)

  Next steps:
    1. Fill in [EDIT] placeholders in all section builders
    2. Update schema startDate/endDate in page configs
    3. Add hreflang pair to digiwin-hreflang.php mu-plugin
    4. Build: node complete_website/divi5/build-page.js --page ${slug}
    5. Build: node complete_website/divi5/build-page.js --page th-${slug}
    6. Rebuild header: node complete_website/divi5/build-global.js --only header
`)

if (DRY_RUN) {
  console.log('  *** DRY RUN — no files were written, no DB changes made ***\n')
}
