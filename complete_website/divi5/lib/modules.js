/**
 * modules.js — Divi 5 block generators
 *
 * Extracted from build-hero-divi5.js v30. Generates wp:divi/* block markup.
 * Single source of truth for builderVersion and block format.
 */

// Update this ONE constant when Divi 5 goes stable (expected Feb 26, 2026)
// All pages inherit this value. See D48 for Divi launch risk mitigation.
const BUILDER_VERSION = '5.0.0-public-beta.8';

/**
 * Generate a wp:divi/text block (self-closing)
 * Use for: plain body text, subtitles, paragraphs — inline VB editing
 *
 * @param {string} content - Plain text or simple HTML (no spans with styles)
 * @param {object} fontOpts - { color, size, weight, family, lineHeight, letterSpacing, textTransform }
 * @param {object} moduleOpts - { adminLabel, marginBottom, marginTop }
 * @param {string} cssOpts - freeForm CSS string (uses 'selector' keyword)
 */
function textModule(content, fontOpts = {}, moduleOpts = {}, cssOpts = '') {
  const fontValue = {};
  if (fontOpts.color) fontValue.color = fontOpts.color;
  if (fontOpts.size) fontValue.size = fontOpts.size;
  if (fontOpts.weight) fontValue.weight = fontOpts.weight;
  if (fontOpts.family) fontValue.family = fontOpts.family;
  if (fontOpts.lineHeight) fontValue.lineHeight = fontOpts.lineHeight;
  if (fontOpts.letterSpacing) fontValue.letterSpacing = fontOpts.letterSpacing;
  if (fontOpts.textTransform) fontValue.textTransform = fontOpts.textTransform;

  const json = {
    content: {
      innerContent: { desktop: { value: content } },
      decoration: {
        bodyFont: { body: { font: {
          desktop: { value: fontValue },
          tablet: { value: fontValue },
          phone: { value: fontValue },
        } } },
      },
    },
  };

  if (moduleOpts.adminLabel || moduleOpts.marginBottom || moduleOpts.marginTop) {
    json.module = {};
    if (moduleOpts.adminLabel) {
      json.module.meta = { adminLabel: { desktop: { value: moduleOpts.adminLabel } } };
    }
    if (moduleOpts.marginBottom || moduleOpts.marginTop) {
      json.module.decoration = { spacing: { desktop: { value: { margin: {} } } } };
      if (moduleOpts.marginBottom) json.module.decoration.spacing.desktop.value.margin.bottom = moduleOpts.marginBottom;
      if (moduleOpts.marginTop) json.module.decoration.spacing.desktop.value.margin.top = moduleOpts.marginTop;
    }
  }

  if (cssOpts) {
    json.css = {
      desktop: { value: { freeForm: cssOpts } },
      tablet: { value: { freeForm: cssOpts } },
      phone: { value: { freeForm: cssOpts } },
    };
  }

  return `<!-- wp:divi/text ${JSON.stringify(json)} /-->`;
}

/**
 * Generate a wp:divi/code block (self-closing, content in JSON)
 * Use for: titles with spans, buttons, stats, labels, decorative HTML, SVG containers
 * MUST be written via direct MySQL (Respira strips these)
 *
 * @param {string} content - HTML content
 * @param {string} adminLabel - Label shown in VB Layers panel
 */
function codeModule(content, adminLabel) {
  const json = {
    content: {
      innerContent: { desktop: { value: content } },
    },
    module: {
      meta: { adminLabel: { desktop: { value: adminLabel || 'Code Module' } } },
    },
  };
  return `<!-- wp:divi/code ${JSON.stringify(json)} /-->`;
}

/**
 * Generate a wp:html block (WordPress core block)
 * Use ONLY for: <script> blocks (scripts don't execute inside wp:divi/code)
 * Shows as "Unknown Module" in VB — maximum 1 per page
 *
 * @param {string} content - HTML/script content
 */
function htmlBlock(content) {
  return `<!-- wp:html -->${content}<!-- /wp:html -->`;
}

/**
 * Generate a wp:divi/section block (opening tag)
 * @param {object} opts - { adminLabel, css, width, padding, background, extraJson }
 */
function sectionOpen(opts = {}) {
  const json = {
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Section' } } },
      decoration: {
        sizing: { desktop: { value: { width: '100%', maxWidth: 'none' } } },
        spacing: {
          desktop: { value: { padding: opts.padding || { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' } } },
        },
      },
    },
    builderVersion: BUILDER_VERSION,
  };

  if (opts.background) {
    json.module.decoration.background = { desktop: { value: opts.background } };
  }

  if (opts.css) {
    json.css = { desktop: { value: { freeForm: opts.css } } };
  }

  // Merge any extra JSON properties
  if (opts.extraJson) {
    Object.assign(json, opts.extraJson);
  }

  return `<!-- wp:divi/section ${JSON.stringify(json)} -->`;
}

function sectionClose() {
  return '<!-- /wp:divi/section -->';
}

/**
 * Generate a wp:divi/row block (opening tag)
 * @param {object} opts - { adminLabel, columns, css, layout, sizing, extraJson }
 */
function rowOpen(opts = {}) {
  const json = {
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Row' } } },
      advanced: opts.columns
        ? { flexColumnStructure: { desktop: { value: opts.columns } } }
        : undefined,
      decoration: {
        layout: {
          desktop: { value: opts.layout || { flexWrap: 'nowrap', display: 'flex', flexDirection: 'row', rowGap: '0px', columnGap: '0px' } },
        },
        sizing: {
          desktop: { value: opts.sizing || { width: '100%', maxWidth: 'none' } },
        },
        spacing: {
          desktop: { value: { padding: { top: '0px', bottom: '0px', left: '0px', right: '0px' } } },
        },
      },
    },
    builderVersion: BUILDER_VERSION,
  };

  if (opts.css) {
    json.css = { desktop: { value: { freeForm: opts.css } } };
    if (opts.tabletCss) {
      json.css.tablet = { value: { freeForm: opts.tabletCss } };
    }
  }

  if (opts.extraJson) {
    Object.assign(json, opts.extraJson);
  }

  return `<!-- wp:divi/row ${JSON.stringify(json)} -->`;
}

function rowClose() {
  return '<!-- /wp:divi/row -->';
}

/**
 * Generate a wp:divi/column block (opening tag)
 * @param {object} opts - { adminLabel, css, background, spacing, sizing, layout, extraJson }
 */
function columnOpen(opts = {}) {
  const json = {
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Column' } } },
      decoration: {},
    },
  };

  if (opts.background) {
    json.module.decoration.background = { desktop: { value: opts.background } };
  }
  if (opts.spacing) {
    json.module.decoration.spacing = opts.spacing;
  }
  if (opts.sizing) {
    json.module.decoration.sizing = { desktop: { value: opts.sizing } };
  }
  if (opts.layout) {
    json.module.decoration.layout = { desktop: { value: opts.layout } };
  }

  if (opts.css) {
    json.css = { desktop: { value: { freeForm: opts.css } } };
  }

  return `<!-- wp:divi/column ${JSON.stringify(json)} -->`;
}

function columnClose() {
  return '<!-- /wp:divi/column -->';
}

/**
 * Wrap all page content in wp:divi/placeholder
 */
function placeholderWrap(blocks) {
  return [
    '<!-- wp:divi/placeholder -->',
    ...blocks,
    '<!-- /wp:divi/placeholder -->',
  ].join('\n');
}

module.exports = {
  BUILDER_VERSION,
  textModule,
  codeModule,
  htmlBlock,
  sectionOpen,
  sectionClose,
  rowOpen,
  rowClose,
  columnOpen,
  columnClose,
  placeholderWrap,
};
