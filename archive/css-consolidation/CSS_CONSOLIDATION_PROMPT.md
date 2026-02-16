# CSS Consolidation Task

## Context
- Build system: `node build.js` in `/Users/peterlo/digiwin_webpage_2026/complete_website/`
- Source pages: `src/pages/**/*.html` (30 templates)
- Shared stylesheet: `styles.css`
- Each page has a massive inline `<style>` block (500-1500 lines) with heavily repeated patterns

## Task Per Iteration

1. Read `styles.css` to see what shared classes already exist
2. Pick ONE pattern category duplicated across 2+ pages. Work in this order:
   - Hero section styles (dark gradients, overlays, hero content layout)
   - Badge/label styles (JetBrains Mono, uppercase, letter-spacing)
   - Section label + title + subtitle patterns
   - Card hover lift effects (translateY + box-shadow variants)
   - CTA section/banner styles (gradient backgrounds, centered content)
   - Responsive media queries that are identical across pages
3. Search `src/pages/**/*.html` for that pattern
4. Add shared classes to `styles.css` using `.dw-` namespace
5. Remove duplicated CSS from each page's inline style, add shared class to HTML where needed
6. Run `node build.js` — verify 0 errors
7. Append what you did to `CSS_CONSOLIDATION_LOG.md`

## Rules
- NEVER change visual appearance — extraction only
- Keep truly page-specific CSS inline
- Use `.dw-` prefix for new shared classes
- For minor variations use CSS custom properties or modifier classes
- Always rebuild after changes
- ONE pattern category per iteration

## Completion
When all six categories are done, output the completion promise.
