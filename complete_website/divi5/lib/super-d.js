/**
 * super-d.js — Super D brand decoration helper for Divi 5 builders
 *
 * Reads SVG files from assets/ and provides Base64-encoded data URIs
 * for use as CSS background-image in Code Module wrapper divs.
 *
 * MODIFIER SYSTEM (mirrors styles.css .dw-d-bg-* classes):
 * - Variants: gradient (0.15), particle (0.20), outline (0.12)
 * - Intensity: subtle (0.06), medium (0.14), bold (0.22)
 * - Animation: glow (pulsing drop-shadow), parallax (will-change)
 *
 * Usage:
 *   const superD = require('../../lib/super-d');
 *   // Simple:
 *   superD.css('my-deco', { variant: 'gradient', position: 'right' })
 *   // With modifiers (matches HTML: dw-d-bg--gradient dw-d-bg--bold dw-d-glow):
 *   superD.css('my-deco', { variant: 'gradient', position: 'right', modifiers: ['bold', 'glow'] })
 *
 * RULE: Never apply ::before/::after to .et_pb_* selectors (Divi owns those).
 * Always use wrapper <div> inside Code Module for decorative elements.
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
 * Default opacities per variant — matches styles.css .dw-d-bg--{variant}
 * These are the BASE opacities before any intensity modifier.
 */
const VARIANT_OPACITY = {
  gradient: 0.15,
  particle: 0.20,
  outline:  0.12,
};

/**
 * Intensity modifiers — override the variant's base opacity.
 * Matches styles.css .dw-d-bg--{modifier}
 */
const INTENSITY = {
  subtle: 0.06,
  medium: 0.14,
  bold:   0.22,
};

/**
 * Position presets for Super D backgrounds.
 * Maps to CSS positioning rules matching the HTML site's .dw-d-bg-* classes.
 */
const positions = {
  'corner-br': {
    right: '-5%', bottom: '-5%', top: 'auto', left: 'auto',
    width: '35%', minHeight: '40vh',
    backgroundPosition: 'center right',
    transform: 'none',
  },
  'corner-tl': {
    left: '-5%', top: '-5%', right: 'auto', bottom: 'auto',
    width: '30%', minHeight: '30vh',
    backgroundPosition: 'center left',
    transform: 'none',
  },
  'corner-tr': {
    right: '-5%', top: '-5%', bottom: 'auto', left: 'auto',
    width: '30%', minHeight: '30vh',
    backgroundPosition: 'center right',
    transform: 'none',
  },
  'left': {
    left: '-15%', right: 'auto', top: '50%',
    width: '60%', minHeight: '60vh',
    backgroundPosition: 'center left',
    transform: 'translateY(-50%)',
  },
  'center': {
    left: '50%', right: 'auto', top: '50%',
    width: '80%', minHeight: '80vh',
    backgroundPosition: 'center center',
    transform: 'translate(-50%, -50%)',
  },
  'right': {
    right: '-10%', left: 'auto', top: '50%',
    width: '60%', minHeight: '60vh',
    backgroundPosition: 'center right',
    transform: 'translateY(-50%)',
  },
  'bottom': {
    right: '-10%', left: 'auto', top: 'auto', bottom: '-20%',
    width: '60%', minHeight: '60vh',
    backgroundPosition: 'center bottom',
    transform: 'none',
  },
  'top': {
    right: '-10%', left: 'auto', top: '-20%', bottom: 'auto',
    width: '60%', minHeight: '60vh',
    backgroundPosition: 'center top',
    transform: 'none',
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
 * Resolve final opacity from variant + modifiers + explicit override.
 * Priority: explicit opts.opacity > intensity modifier > variant default
 */
function resolveOpacity(variant, modifiers, explicitOpacity) {
  if (explicitOpacity !== undefined && explicitOpacity !== null) return explicitOpacity;
  // Check modifiers for intensity override
  if (modifiers) {
    for (const mod of modifiers) {
      if (INTENSITY[mod] !== undefined) return INTENSITY[mod];
    }
  }
  return VARIANT_OPACITY[variant] || 0.08;
}

/**
 * Generate CSS for a Super D decoration.
 * @param {string} className — matches the html() className
 * @param {object} opts
 * @param {'gradient'|'particle'|'outline'} opts.variant — SVG variant
 * @param {string} opts.position — position preset key
 * @param {number} [opts.opacity] — explicit opacity override (skips modifier/variant defaults)
 * @param {string[]} [opts.modifiers] — ['bold','glow','parallax','medium','subtle']
 * @param {string} [opts.width] — override width
 * @param {string} [opts.minHeight] — override minHeight
 * @returns {string} CSS string (may include @keyframes for glow)
 */
function css(className, opts = {}) {
  const variant = opts.variant || 'gradient';
  const modifiers = opts.modifiers || [];
  const pos = positions[opts.position || 'corner-br'];
  const opacity = resolveOpacity(variant, modifiers, opts.opacity);
  const b64 = getSvgBase64(variant);
  const width = opts.width || pos.width;
  const minHeight = opts.minHeight || pos.minHeight;

  const hasGlow = modifiers.includes('glow');

  let result = `.${className}{` +
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
    `${hasGlow ? `;animation:superDGlow 3s ease-in-out infinite` : ''}` +
    `}`;

  // Add glow keyframes if needed (idempotent — same keyframes name)
  if (hasGlow) {
    result += `\n@keyframes superDGlow{0%,100%{filter:drop-shadow(0 0 20px rgba(0,175,240,0.1))}50%{filter:drop-shadow(0 0 40px rgba(0,175,240,0.25))}}`;
  }

  return result;
}

module.exports = { html, css, getSvgBase64, positions, VARIANT_OPACITY, INTENSITY };
