/**
 * super-d.js — Super D brand decoration helper for Divi 5 builders
 *
 * Reads SVG files from assets/ and provides Base64-encoded data URIs
 * for use as CSS background-image in Code Module wrapper divs.
 *
 * RULE: Never apply ::before/::after to .et_pb_* selectors (Divi owns those).
 * Always use wrapper <div> inside Code Module for decorative elements.
 *
 * Usage:
 *   const superD = require('../../lib/super-d');
 *   // In blocks():  codeModule(superD.html('section-deco'), 'Decoration: Super D')
 *   // In css():     superD.css('section-deco', { variant: 'gradient', position: 'corner-br', opacity: 0.08 })
 */

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', '..', 'assets');

// Read SVGs once at require time
const svgFiles = {
  gradient: 'digiwin-d-gradient.svg',
  particle: 'digiwin-d-particle.svg',
  outline: 'digiwin-d-outline.svg',
};

const svgCache = {};

function getSvgBase64(variant) {
  if (svgCache[variant]) return svgCache[variant];
  const filePath = path.join(ASSETS_DIR, svgFiles[variant]);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Super D SVG not found: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  svgCache[variant] = Buffer.from(raw).toString('base64');
  return svgCache[variant];
}

/**
 * Position presets for Super D backgrounds.
 * Maps to CSS positioning rules matching the HTML site's .dw-d-bg-* classes.
 */
const positions = {
  'corner-br': {
    right: '0', bottom: '0', top: 'auto', left: 'auto',
    width: '35%', minHeight: '40vh',
    backgroundPosition: 'bottom right',
    transform: 'none',
  },
  'corner-tr': {
    right: '0', top: '0', bottom: 'auto', left: 'auto',
    width: '25%', minHeight: '25vh',
    backgroundPosition: 'top right',
    transform: 'none',
  },
  'left': {
    left: '-15%', right: 'auto', top: '50%',
    width: '50%', minHeight: '80vh',
    backgroundPosition: 'center left',
    transform: 'translateY(-50%)',
  },
  'center': {
    left: '50%', right: 'auto', top: '50%',
    width: '90%', minHeight: '90vh',
    backgroundPosition: 'center center',
    transform: 'translate(-50%, -50%)',
  },
  'right': {
    right: '-10%', left: 'auto', top: '50%',
    width: '60%', minHeight: '80vh',
    backgroundPosition: 'center right',
    transform: 'translateY(-50%)',
  },
};

/**
 * Generate the HTML for a Super D decoration wrapper div.
 * @param {string} className — unique class name for this decoration
 * @returns {string} HTML string
 */
function html(className) {
  return `<div class="${className}" aria-hidden="true"></div>`;
}

/**
 * Generate CSS for a Super D decoration.
 * @param {string} className — matches the html() className
 * @param {object} opts
 * @param {'gradient'|'particle'|'outline'} opts.variant — SVG variant
 * @param {string} opts.position — position preset key (corner-br, left, center, etc.)
 * @param {number} opts.opacity — decoration opacity (0.05-0.18 typical)
 * @param {string} [opts.width] — override width
 * @param {string} [opts.minHeight] — override minHeight
 * @returns {string} CSS string
 */
function css(className, opts = {}) {
  const variant = opts.variant || 'gradient';
  const pos = positions[opts.position || 'corner-br'];
  const opacity = opts.opacity ?? 0.08;
  const b64 = getSvgBase64(variant);
  const width = opts.width || pos.width;
  const minHeight = opts.minHeight || pos.minHeight;

  return `.${className}{` +
    `position:absolute;` +
    `${pos.top !== undefined ? `top:${pos.top};` : ''}` +
    `${pos.right !== undefined ? `right:${pos.right};` : ''}` +
    `${pos.bottom !== undefined ? `bottom:${pos.bottom};` : ''}` +
    `${pos.left !== undefined ? `left:${pos.left};` : ''}` +
    `width:${width};min-height:${minHeight};` +
    `background:url("data:image/svg+xml;base64,${b64}") no-repeat ${pos.backgroundPosition};` +
    `background-size:contain;` +
    `${pos.transform !== 'none' ? `transform:${pos.transform};` : ''}` +
    `opacity:${opacity};pointer-events:none;z-index:0` +
    `}`;
}

module.exports = { html, css, getSvgBase64, positions };
