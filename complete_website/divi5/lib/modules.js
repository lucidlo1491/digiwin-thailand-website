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
 * FONT FAMILY (D46 fix): Pass bare font name only — e.g. 'Noto Sans', NOT 'Noto Sans, sans-serif'.
 * Divi's Font.php (line 196) wraps the value in quotes and adds its own fallback stack
 * via _get_websafe_font_stack(). Passing a fallback stack creates an invalid font name
 * like 'Noto Sans, sans-serif' (entire string treated as one font name).
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

  if (moduleOpts.adminLabel || moduleOpts.marginBottom || moduleOpts.marginTop || moduleOpts.cssClass || moduleOpts.bgLayout) {
    json.module = {};
    if (moduleOpts.adminLabel) {
      json.module.meta = { adminLabel: { desktop: { value: moduleOpts.adminLabel } } };
    }
    if (moduleOpts.marginBottom || moduleOpts.marginTop) {
      json.module.decoration = { spacing: { desktop: { value: { margin: {} } } } };
      if (moduleOpts.marginBottom) json.module.decoration.spacing.desktop.value.margin.bottom = moduleOpts.marginBottom;
      if (moduleOpts.marginTop) json.module.decoration.spacing.desktop.value.margin.top = moduleOpts.marginTop;
    }
    if (moduleOpts.cssClass || moduleOpts.bgLayout) {
      if (!json.module.advanced) json.module.advanced = {};
      if (moduleOpts.cssClass) {
        json.module.advanced.htmlAttributes = { desktop: { value: { class: moduleOpts.cssClass } } };
      }
      if (moduleOpts.bgLayout) {
        json.module.advanced.text = { text: { desktop: { value: { color: moduleOpts.bgLayout } } } };
      }
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
function codeModule(content, adminLabel, opts = {}) {
  const json = {
    content: {
      innerContent: { desktop: { value: content } },
    },
    module: {
      meta: { adminLabel: { desktop: { value: adminLabel || 'Code Module' } } },
    },
  };
  if (opts.bgLayout) {
    json.module.advanced = json.module.advanced || {};
    json.module.advanced.text = { text: { desktop: { value: { color: opts.bgLayout } } } };
  }
  if (opts.cssClass) {
    json.module.advanced = json.module.advanced || {};
    json.module.advanced.htmlAttributes = { desktop: { value: { class: opts.cssClass } } };
  }
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

  // bgLayout: 'dark' → white text on dark bg (et_pb_bg_layout_dark class)
  // bgLayout: 'light' → dark text on light bg (default, et_pb_bg_layout_light class)
  if (opts.bgLayout) {
    json.module.advanced = json.module.advanced || {};
    json.module.advanced.text = { text: { desktop: { value: { color: opts.bgLayout } } } };
  }

  if (opts.cssClass) {
    json.module.advanced = json.module.advanced || {};
    json.module.advanced.htmlAttributes = { desktop: { value: { class: opts.cssClass } } };
  }

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
 * @param {object} opts - { adminLabel, columns, css, tabletCss, layout, sizing, padding, margin, background, border, extraJson }
 */
function rowOpen(opts = {}) {
  // Build spacing — padding + optional margin
  const spacing = {};
  const pad = opts.padding || { top: '0px', bottom: '0px', left: '0px', right: '0px' };
  spacing.padding = pad;
  if (opts.margin) spacing.margin = opts.margin;

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
          desktop: { value: spacing },
        },
      },
    },
    builderVersion: BUILDER_VERSION,
  };

  // Native background (e.g. { color: 'rgba(...)' })
  if (opts.background) {
    json.module.decoration.background = { desktop: { value: opts.background } };
  }

  // Native border (e.g. { radius: { sync: 'on', topLeft: '16px' }, width: '1px', style: 'solid', color: '...' })
  if (opts.border) {
    json.module.decoration.border = { desktop: { value: opts.border } };
  }

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

// ── Native Divi dynamic modules (for Theme Builder body layouts) ──

/**
 * Generate a wp:divi/post-title block
 * Used in body layouts to render the current post's title dynamically.
 */
function postTitleModule(opts = {}) {
  const json = {
    featuredImage: { advanced: { enabled: { desktop: { value: 'off' } } } },
    title: {
      decoration: {
        font: {
          font: {
            desktop: { value: { family: opts.family || 'Noto Sans', weight: opts.weight || '700', size: opts.size || '42px', lineHeight: opts.lineHeight || '1.2em', color: opts.color || '#FFFFFF' } },
            tablet: { value: { size: opts.tabletSize || '32px' } },
            phone: { value: { size: opts.phoneSize || '24px' } },
          },
        },
      },
    },
    meta: {
      decoration: {
        font: {
          font: {
            desktop: { value: { family: opts.metaFamily || 'Noto Sans', weight: '400', color: opts.metaColor || 'rgba(255,255,255,0.8)', size: '14px' } },
          },
        },
      },
      advanced: {
        showAuthor: { desktop: { value: opts.showAuthor || 'off' } },
        showDate: { desktop: { value: opts.showDate || 'on' } },
        showCategories: { desktop: { value: opts.showCategories || 'on' } },
        showComments: { desktop: { value: opts.showComments || 'off' } },
      },
    },
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Post Title' } } },
      advanced: { text: { text: { desktop: { value: { orientation: opts.align || 'left' } } } } },
    },
    builderVersion: BUILDER_VERSION,
  };
  return `<!-- wp:divi/post-title ${JSON.stringify(json)} --><!-- /wp:divi/post-title -->`;
}

/**
 * Generate a wp:divi/post-content block
 * Used in body layouts to render the current post's content dynamically.
 */
function postContentModule(opts = {}) {
  const json = {
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Post Content' } } },
      decoration: {
        bodyFont: {
          body: {
            font: {
              desktop: { value: { family: opts.family || 'Noto Sans', weight: '400', size: opts.size || '16px', lineHeight: opts.lineHeight || '1.8em', color: opts.color || '#333333' } },
              tablet: { value: { size: '15px' } },
              phone: { value: { size: '14px' } },
            },
          },
        },
        headingFont: {
          h2: { font: { desktop: { value: { family: 'Noto Sans', weight: '600', size: '28px', lineHeight: '1.3em', color: '#000864' } } } },
          h3: { font: { desktop: { value: { family: 'Noto Sans', weight: '600', size: '22px', lineHeight: '1.35em', color: '#000864' } } } },
          h4: { font: { desktop: { value: { family: 'Noto Sans', weight: '600', size: '18px', lineHeight: '1.4em', color: '#000864' } } } },
        },
      },
    },
    builderVersion: BUILDER_VERSION,
  };
  return `<!-- wp:divi/post-content ${JSON.stringify(json)} --><!-- /wp:divi/post-content -->`;
}

/**
 * Generate a wp:divi/blog block
 * Used in body layouts to show related posts dynamically.
 */
function blogModule(opts = {}) {
  const json = {
    fullwidth: { advanced: { enable: { desktop: { value: 'off' } } } },
    readMore: {
      advanced: { enable: { desktop: { value: 'on' } } },
      decoration: { font: { font: { desktop: { value: { family: 'Noto Sans', weight: '600', color: '#00AFF0' } } } } },
    },
    meta: {
      advanced: { showAuthor: { desktop: { value: 'off' } } },
      decoration: { font: { font: { desktop: { value: { color: '#666666', family: 'Noto Sans', weight: '400' } } } } },
    },
    title: {
      decoration: {
        font: {
          font: {
            desktop: { value: { size: '18px', lineHeight: '1.4em', family: 'Noto Sans', weight: '600', color: '#000864' } },
            tablet: { value: { size: '16px' } },
            phone: { value: { size: '15px' } },
          },
        },
      },
    },
    post: {
      decoration: {
        border: { desktop: { value: { radius: { sync: 'on', topLeft: '12px', topRight: '12px', bottomRight: '12px', bottomLeft: '12px' } } } },
      },
      advanced: {
        number: { desktop: { value: String(opts.count || 3) } },
        categories: { desktop: { value: opts.categories || ['all'] } },
        offset: { desktop: { value: '0' } },
      },
    },
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Related Posts' } } },
    },
    builderVersion: BUILDER_VERSION,
  };
  return `<!-- wp:divi/blog ${JSON.stringify(json)} --><!-- /wp:divi/blog -->`;
}

// ── Native Divi 5 modules (non-dynamic) ──

/**
 * Generate a wp:divi/divider block (self-closing)
 * Use for: visual separators between content sections
 *
 * @param {object} opts - { color, style, weight, width, adminLabel, marginTop, marginBottom }
 */
function dividerModule(opts = {}) {
  const json = {
    divider: {
      advanced: {
        line: {
          desktop: {
            value: {
              show: 'on',
              color: opts.color || '#000864',
              style: opts.style || 'solid',
              position: opts.position || 'center',
              weight: opts.weight || '3px',
            },
          },
        },
      },
    },
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Divider' } } },
      decoration: {
        sizing: { desktop: { value: { width: opts.width || '48px' } } },
        spacing: {
          desktop: {
            value: {
              margin: {
                top: opts.marginTop || '40px',
                bottom: opts.marginBottom || '40px',
                syncVertical: 'off',
                syncHorizontal: 'off',
              },
            },
          },
        },
      },
    },
    builderVersion: BUILDER_VERSION,
  };
  return `<!-- wp:divi/divider ${JSON.stringify(json)} /-->`;
}

/**
 * Generate a wp:divi/button block (wrapping, empty inner)
 * Use for: CTA buttons — fully styled natively, click-to-edit in VB
 *
 * @param {string} text - Button label
 * @param {string} url - Link destination
 * @param {object} opts - { bg, color, family, weight, size, letterSpacing, radius, paddingV, paddingH, alignment, adminLabel, hoverBg, hoverColor }
 */
function buttonModule(text, url, opts = {}) {
  const json = {
    button: {
      innerContent: {
        desktop: { value: { text, linkUrl: url || '#' } },
      },
      decoration: {
        background: { desktop: { value: { color: opts.bg || '#00AFF0' } } },
        font: {
          font: {
            desktop: {
              value: {
                family: opts.family || 'Noto Sans',
                weight: opts.weight || '600',
                size: opts.size || '16px',
                color: opts.color || '#FFFFFF',
                letterSpacing: opts.letterSpacing || '0px',
              },
            },
          },
        },
        border: {
          desktop: {
            value: Object.assign(
              // D85: sync: 'on' is BUGGED in beta.8 — only applies topLeft.
              // Must specify all 4 corners explicitly.
              { radius: { topLeft: opts.radius || '8px', topRight: opts.radius || '8px', bottomRight: opts.radius || '8px', bottomLeft: opts.radius || '8px' } },
              opts.borderWidth != null ? { width: opts.borderWidth } : {},
              opts.borderStyle != null ? { style: opts.borderStyle } : {},
              opts.borderColor != null ? { color: opts.borderColor } : {},
            ),
          },
        },
        spacing: {
          desktop: {
            value: {
              padding: {
                top: opts.paddingV || '14px',
                bottom: opts.paddingV || '14px',
                left: opts.paddingH || '36px',
                right: opts.paddingH || '36px',
              },
            },
          },
        },
        boxShadow: {
          desktop: {
            value: {
              style: 'preset3',
              horizontal: '0px',
              vertical: '4px',
              blur: '20px',
              spread: '0px',
              color: 'rgba(0,0,0,0.15)',
            },
          },
        },
        // "Use Custom Styles For Button" toggle — gates ALL custom styling above.
        // Without enable:'on', Divi renders default outlined button regardless of other props.
        button: {
          desktop: {
            value: {
              enable: 'on',
              icon: { enable: 'off', placement: 'right', onHover: 'off' },
            },
          },
        },
      },
    },
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Button' } } },
      advanced: {
        alignment: { desktop: { value: opts.alignment || 'center' } },
      },
    },
    builderVersion: BUILDER_VERSION,
  };

  // Module-level freeForm CSS — 'selector' resolves to this button's own selector
  if (opts.css) {
    json.css = {
      desktop: { value: { freeForm: opts.css } },
      tablet: { value: { freeForm: opts.css } },
      phone: { value: { freeForm: opts.css } },
    };
  }

  return `<!-- wp:divi/button ${JSON.stringify(json)} --><!-- /wp:divi/button -->`;
}

/**
 * Generate a wp:divi/accordion block (wrapping — contains accordion-items)
 * Use for: FAQ sections — each item is individually editable in VB
 *
 * @param {object} opts - { adminLabel, titleFont, bodyFont }
 */
function accordionOpen(opts = {}) {
  const json = {
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Accordion' } } },
    },
    title: {
      decoration: {
        font: {
          font: {
            desktop: {
              value: {
                family: (opts.titleFont && opts.titleFont.family) || 'Noto Sans',
                weight: (opts.titleFont && opts.titleFont.weight) || '600',
                size: (opts.titleFont && opts.titleFont.size) || '17px',
                color: (opts.titleFont && opts.titleFont.color) || '#000864',
              },
            },
          },
        },
      },
    },
    content: {
      decoration: {
        bodyFont: {
          body: {
            font: {
              desktop: {
                value: {
                  family: (opts.bodyFont && opts.bodyFont.family) || 'Noto Sans',
                  weight: (opts.bodyFont && opts.bodyFont.weight) || '400',
                  size: (opts.bodyFont && opts.bodyFont.size) || '15px',
                  lineHeight: (opts.bodyFont && opts.bodyFont.lineHeight) || '1.7em',
                  color: (opts.bodyFont && opts.bodyFont.color) || '#333333',
                },
              },
            },
          },
        },
      },
    },
    builderVersion: BUILDER_VERSION,
  };

  if (opts.css) {
    json.css = { desktop: { value: { freeForm: opts.css } } };
  }

  return `<!-- wp:divi/accordion ${JSON.stringify(json)} -->`;
}

function accordionClose() {
  return '<!-- /wp:divi/accordion -->';
}

/**
 * Generate a wp:divi/accordion-item block (self-closing, inside accordion)
 *
 * @param {string} title - Question text
 * @param {string} content - Answer HTML
 * @param {object} opts - { open, adminLabel }
 */
function accordionItem(title, content, opts = {}) {
  const json = {
    title: {
      innerContent: { desktop: { value: title } },
    },
    content: {
      innerContent: { desktop: { value: content } },
    },
    builderVersion: BUILDER_VERSION,
  };

  if (opts.open) {
    json.module = {
      advanced: { open: { desktop: { value: 'on' } } },
    };
  }

  if (opts.adminLabel) {
    json.module = json.module || {};
    json.module.meta = { adminLabel: { desktop: { value: opts.adminLabel } } };
  }

  return `<!-- wp:divi/accordion-item ${JSON.stringify(json)} /-->`;
}

/**
 * Generate a wp:divi/blurb block (self-closing)
 * Use for: icon + title + body cards — fully VB-editable (icon, text, colors)
 *
 * Icon types: 'divi' (ETmodules), 'fa' (FontAwesome)
 * Common FA unicodes: calendar &#xf073;, clock &#xf017;, map-marker &#xf3c5;, users &#xf0c0;
 *
 * @param {object} opts - { iconUnicode, iconType, iconColor, iconSize, iconPlacement,
 *   title, titleColor, titleFamily, titleWeight, titleSize, titleLineHeight, headingLevel,
 *   body, bodyColor, bodyFamily, bodyWeight, bodySize, bodyLineHeight,
 *   adminLabel, css }
 */
function blurbModule(opts = {}) {
  const json = {
    imageIcon: {
      innerContent: {
        desktop: {
          value: {
            useIcon: 'on',
            icon: {
              unicode: opts.iconUnicode || '&#xe04e;',
              type: opts.iconType || 'divi',
              weight: '400',
            },
          },
        },
      },
      advanced: {
        color: { desktop: { value: opts.iconColor || '#00AFF0' } },
        placement: { desktop: { value: opts.iconPlacement || 'top' } },
        width: { desktop: { value: { icon: opts.iconSize || '48px' } } },
      },
    },
    title: {
      innerContent: { desktop: { value: { text: opts.title || '' } } },
      decoration: {
        font: {
          font: {
            desktop: {
              value: {
                headingLevel: opts.headingLevel || 'h4',
                family: opts.titleFamily || 'Noto Sans',
                weight: opts.titleWeight || '600',
                size: opts.titleSize || '16px',
                color: opts.titleColor || '#000864',
                lineHeight: opts.titleLineHeight || '1.4em',
              },
            },
          },
        },
      },
    },
    content: {
      innerContent: { desktop: { value: opts.body ? `<p>${opts.body}</p>` : '' } },
      decoration: {
        bodyFont: {
          body: {
            font: {
              desktop: {
                value: {
                  family: opts.bodyFamily || 'Noto Sans',
                  weight: opts.bodyWeight || '400',
                  size: opts.bodySize || '13px',
                  color: opts.bodyColor || '#666666',
                  lineHeight: opts.bodyLineHeight || '1.5em',
                },
              },
            },
          },
        },
      },
    },
    module: {
      meta: { adminLabel: { desktop: { value: opts.adminLabel || 'Blurb' } } },
    },
    builderVersion: BUILDER_VERSION,
  };

  // bgLayout: 'dark' → white text on dark bg (et_pb_bg_layout_dark class)
  if (opts.bgLayout) {
    json.module.advanced = json.module.advanced || {};
    json.module.advanced.text = { text: { desktop: { value: { color: opts.bgLayout } } } };
  }

  if (opts.css) {
    json.css = { desktop: { value: { freeForm: opts.css } } };
  }

  return `<!-- wp:divi/blurb ${JSON.stringify(json)} /-->`;
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
  postTitleModule,
  postContentModule,
  blogModule,
  dividerModule,
  buttonModule,
  blurbModule,
  accordionOpen,
  accordionClose,
  accordionItem,
};
