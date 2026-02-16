# SVG Animation Acceptance Spec v1.0

**Created:** 2026-02-12
**Red-teamed by:** 3 agents (Visual Fidelity, Technical Edge Cases, Animation Quality)
**Attacks survived:** 54 across all agents → distilled to 22 hardened criteria

---

## How to Use This Spec

Reference these criteria in any "Walk Away Build" prompt that involves SVG animations:

```
Acceptance criteria: All 22 checks from docs/build/SVG_Animation_Acceptance_Spec.md must pass.
```

Each criterion has a **verify method** — the specific action to confirm it passes.

---

## Rendering (5 checks)

### R1. All SVG narrative groups visible at 1440px
Each SVG illustration must render all narrative groups — verified by name, not just count.

**Factory panel (5 narratives):**
- Ghost Inventory (translate ~420, 80) — pulsing ghost boxes on shelf
- Shadow Excel (translate ~450, 320) — fragmenting spreadsheet
- Broken Data Streams (translate ~30, 100) — sine-wave path with broken segment
- Hidden Cost Reveal (translate ~50, 350) — rising cost bubbles
- Factory Outline (translate ~580, 450) — faint factory silhouette

**Partner panel (5 narratives):**
- The Cage / Man-Day Trap (translate ~50, 150) — bending bar + escaping particles
- Revenue Ceiling Breakthrough (translate ~380, 80) — line drawing through ceiling
- Compounding Revenue Streams (translate ~450, 380) — merging tributary streams
- Clock Transformation (translate ~180, 380) — rotating hands, fading face
- Freedom Burst (translate ~600, 480) — radiant pulse lines

**Verify:** Screenshot at 1440px. At minimum 40% of each narrative group must be within the visible area.

### R2. Particle wave renders at hero bottom
The particle wave must be explicitly enabled — the source CSS hides it with `display:none`.

**Required state:**
- `display: block` (override source CSS)
- `height: 250px`
- `opacity: 0.5`
- `z-index: 2`
- Background: `digiwin-wave-flow.svg`
- Animation: `dw-wave-drift` 30s infinite linear

**Verify:** Inspect computed styles — `display` ≠ `none`, rendered dimensions > 0, wave dots visible at hero bottom edge.

### R3. Super D particle overlay contained within hero
- Opacity: 0.15–0.22 (recommended 0.18)
- Position: `right: -10%`, `width: 65%`, `min-height: 80vh`
- Parent section MUST have `overflow: hidden`
- No particle dots visible outside hero section boundaries

**Verify:** Scroll slowly past hero/next-section boundary. Zero dots should appear outside hero. Inspect computed opacity — must be in 0.15–0.22 range.

### R3a. Section background must NOT be white or light
Divi 5 defaults section `background-color` to `rgb(255,255,255)`. When column gradients use semi-transparent rgba values (0.88–0.92 alpha), white bleeds through at 8–12%, washing out the entire hero.

**Required:** Section `background-color` must be `#000432` (navy-deep) or darker.

**Verify:** `getComputedStyle(section).backgroundColor` must NOT contain `rgb(255, 255, 255)` or any value with R/G/B > 50. This is an automated check in verify-divi5.js.

### R4. Z-index stacking order correct
Back-to-front layering (verified by temporarily setting all layers to opacity 1.0):

1. Panel background gradient
2. Grain texture pseudo-element
3. SVG illustration (opacity ~0.45)
4. Super D particle (opacity ~0.18)
5. Particle wave (z-index 2)
6. Hero content text/buttons (z-index 2+)

**Verify:** No layer occludes the one above it. Text always readable above all decorative layers.

### R5. SVG `<defs>` IDs namespaced
All gradient, filter, and clipPath IDs must be prefixed to prevent DOM-wide collisions:
- Factory panel: `dw-factory-*` (e.g., `dw-factory-ghost-fade`, `dw-factory-ghost-blur`)
- Partner panel: `dw-partner-*` (e.g., `dw-partner-freedom-gradient`, `dw-partner-glow-warm`)

**Verify:** Search full page DOM for duplicate `id` attributes. Zero collisions with Divi framework SVGs, plugin SVGs, or icon libraries.

---

## Animation Quality (6 checks)

### A1. Multi-checkpoint animation verification
Capture at t=0, t=3s, t=5s, t=8s. Expected states:

| Checkpoint | Expected |
|-----------|----------|
| t=0 | All elements at start state. `fill="freeze"` elements not yet triggered (if scroll-triggered). |
| t=3s | Ghost boxes at visibly different opacities. First cost bubble near peak. Revenue line drawn (if triggered). |
| t=5s | Excel fragments past halfway through cycle. Second cost bubble at peak. Freedom particles mid-escape. |
| t=8s | Clock minute hand completed one full rotation. Cost bubbles completed one full cycle. All looping animations visibly cycling. |

**Verify:** Screenshot comparison at each checkpoint. Elements must have moved/changed between checkpoints.

### A2. Animation directionality correct
Each narrative animation must move in the direction that supports its story:

| Element | Required Direction | Narrative Reason |
|---------|-------------------|-----------------|
| Excel fragments | Fly outward from spreadsheet | Data disintegrating |
| Freedom particles | Move right + upward from cage | Escaping the trap |
| Cost bubbles | Rise (cy decreasing) | Hidden costs surfacing |
| Revenue line | Draw bottom-left → top-right | Revenue breaking through ceiling |
| Clock hands | Rotate clockwise | Time passing oppressively |
| Cage bar | Bend outward | Breaking free |
| Data particles | Follow sine-wave path | Data flowing/breaking |
| Compounding streams | Flow toward merge point | Revenue compounding |

**Verify:** Capture frames at t=0.5s, t=1.5s, t=2.5s for each directional animation. Element position must progress in the specified direction.

### A3. `fill="freeze"` animations scroll-triggered
Animations with `fill="freeze"` (cage bar bend, revenue line draw) must:
- NOT fire on page load
- Trigger via IntersectionObserver when section enters viewport
- Replay when user scrolls away and returns (call `beginElement()`)

**Verify:** (a) Scroll to below hero, then back up — animation should replay. (b) Capture frame at t=0.5s after scroll-into-view — element should be mid-animation, not at end state.

### A4. Ghost box desynchronized rhythm
- Minimum 4 distinct animation durations across 6 boxes (range: 2.5s–3.5s)
- Minimum 3 distinct opacity ranges
- No two adjacent boxes share the same duration
- At any single captured frame, boxes should be at visibly different opacity levels

**Verify:** Freeze frame capture — at least 2 boxes must be at clearly different opacities (>0.15 difference).

### A5. Excel fragment rotation preserved during translation
All `<animateTransform type="translate">` elements on rotated fragments must include `additive="sum"`.

**Verify:** At t=2s, fragments must be both translated AND rotated (not just translated). Inspect SVG source for `additive="sum"` on every `animateTransform` that coexists with a static `transform` attribute.

### A6. Looping animations seamless at boundaries
For elements that cycle (ghost boxes, cost bubbles, data particles, clock, freedom burst):
- Element must be fully transparent (opacity ≤ 0.05) OR at a natural rest state before position resets
- No visible snap, teleport, or jump at loop boundary

**Verify:** Record 10-second video, slow-play at 0.25x through the loop boundary. No visible discontinuity.

---

## Colors & Brand (2 checks)

### C1. Color palette verified
**Structural colors (must match brand kit):**
- Smart Blue: #00AFF0 (primary lines, data points, borders)
- Cyan Accent: #00E6FF (highlights, secondary elements)
- Dark Navy: #000864 (backgrounds, subtle elements)

**Narrative accent colors (exempt from brand-only restriction):**
- Warm orange `rgba(255,150,100,*)` — cost/danger indicators
- Warm gold `#fef3c7` — freedom/aspiration particles
- Soft red `rgba(255,100,100,*)` — error states, broken segments
- Ghost blue `#0369a1` — phantom inventory gradients
- macOS dots: green/yellow/red (window chrome metaphor)

**Rule:** Narrative accents must not exceed ~15% of total SVG color area. No off-palette colors (no purples, bright greens, pinks).

**Verify:** Extract unique color values from each SVG. Cross-reference against this table. Provide color map.

### C2. Color temperature contrast between panels
- Factory panel (left): exclusively cool-spectrum colors (blues, cyans, blue-grays)
- Partner panel (right): warm-spectrum accents (golds, ambers, warm whites) alongside structural blues
- Partner panel must contain ≥3 distinct warm-spectrum color values

**Verify:** Extract color lists per panel. Factory = zero warm colors. Partner = ≥3 warm values.

---

## Accessibility (2 checks)

### X1. `prefers-reduced-motion` stops ALL animations
Must stop:
- CSS animations (`animation: none !important`)
- CSS transitions (`transition: none !important`)
- SMIL `<animate>` elements
- SMIL `<animateTransform>` elements
- SMIL `<animateMotion>` elements
- JavaScript parallax scroll handlers

**Implementation:** JS snippet checks `prefers-reduced-motion`, removes or pauses all SMIL elements:
```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('animate, animateTransform, animateMotion')
    .forEach(el => el.remove());
}
```

**Verify:** Enable reduced motion in OS → zero moving elements anywhere in hero section including inside SVGs.

### X2. No horizontal overflow at any breakpoint
Test at: 1440px, 1024px, 768px, 375px

**Additional checks:**
- Simulate Windows Chrome 15px scrollbar (add 15px to body, re-verify)
- Use `width: 100%` not `width: 100vw` (100vw includes scrollbar)
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth` must be `true`

**Verify:** Automated check at all 4 breakpoints + scrollbar simulation.

---

## Responsive (2 checks)

### M1. Tablet (768px) — panels stack, narratives survive
- Panels stack vertically (single column)
- SVGs scale proportionally
- At least 3 of 5 narratives remain partially visible per panel after `slice` cropping
- No overflow

**Verify:** Screenshot at 768px. Label visible narratives. If <3 visible, consider switching to `xMidYMid meet` or repositioning SVG elements at this breakpoint.

### M2. Mobile (375px) — readable, no scroll
- Single column layout
- Primary narrative from each story remains visible (or document acceptable omissions with design approval)
- Text readable without horizontal scrolling

**Verify:** Screenshot at 375px. Annotate which narratives are visible. Confirm text legibility.

---

## Editability (3 checks)

### E1. Raw HTML uses `wp:html` blocks (Decision D37)
Divi 5 Code Modules (`wp:divi/code`), Button, and Group modules do NOT render content on the front-end. All raw HTML must use `wp:html` blocks. These appear as "Unknown Module" in Visual Builder — this is accepted (rendering correctness > VB label aesthetics).

**Verify:** Front-end renders all HTML content. No empty `<div>` shells from Code/Button/Group modules.

### E2. Editable modules clickable in VB
- All 4 headlines (Text Modules) editable inline
- All 4 CTAs (Button Modules) editable inline
- Grain/overlay Code Modules with `position:absolute` must NOT block clicks on editable modules underneath
- Fix: `pointer-events: none` on overlay Code Module `<div>` elements

**Verify:** In Visual Builder, click each Text and Button module. VB sidebar must open the correct module's settings panel.

### E3. Admin labels unique and descriptive
Convention: `[Section] - [Panel] - [Purpose]`

Examples:
- `Hero - Factory - SVG Illustration`
- `Hero - Partner - SVG Illustration`
- `Hero - Super D Background`
- `Hero - Particle Wave`
- `Hero - Factory - Grain Overlay`
- `Hero - Factory - Stats Bar`

**Verify:** List all admin labels. Non-developer must be able to locate any element by label alone. All labels unique within the page.

---

## Stability (2 checks)

### S1. Survives Visual Builder re-save
Content must survive a wp_kses round-trip without degradation.

**Test procedure:**
1. Push content via API
2. Open page in Visual Builder
3. Save without making changes
4. Re-verify ALL checks above

Any regression = build is not ship-ready.

**Verify:** Diff content before and after VB save. Zero attribute stripping, zero entity encoding changes.

### S2. Visual regression screenshots deterministic
Before every screenshot capture, pause all animations:
```javascript
document.querySelectorAll('*').forEach(el => {
  el.style.animationPlayState = 'paused';
  el.style.animationDelay = '0s';
});
document.querySelectorAll('animate, animateTransform, animateMotion')
  .forEach(el => { try { el.endElement(); } catch(e) {} });
```

This eliminates frame-timing flakiness in CI.

**Verify:** Run screenshot capture 3 times. All 3 must produce identical output (0% pixel diff).

---

## Layout Fidelity (5 checks)

These catch the "Divi is adding invisible white boxes around my content" problem. Every full-bleed section must pass all 5.

### L1. Hero section left edge = 0px (full-bleed left)
The hero section's `getBoundingClientRect().left` must equal `0`.

**Root cause when failing:** Theme Builder body row has `max-width: 1080px`, centering content with white gutters on both sides.

**Fix pattern:** Override `_tb_body` row: `max-width: 100% !important; width: 100% !important;`

**Verify:** `document.querySelector('.et_pb_section_0').getBoundingClientRect().left === 0`

### L2. Hero section right edge = viewport width (full-bleed right)
`getBoundingClientRect().right` must equal `window.innerWidth`.

**Root cause when failing:** Same as L1 — TB row max-width constraint.

**Verify:** `Math.abs(rect.right - window.innerWidth) < 2` (allow 1px rounding)

### L3. Zero white pixels visible above hero
No `background: white` or `background: rgb(255,255,255)` ancestor visible between the header/admin-bar and the hero section top edge.

**Root cause when failing:** Two distinct bugs:
1. Section uses `margin-top` instead of `padding-top` — margin creates a gap OUTSIDE the background, exposing the white parent behind it
2. TB body section has `background: white` — any gap in our content shows white

**Fix pattern:**
- TB section: `background: transparent !important`
- Hero section: use `padding-top` (keeps background) not `margin-top` (exposes parent)

**Verify:** Capture a 1px-tall horizontal strip at the hero section's top edge minus 5px. Zero pixels should be `rgb(255,255,255)`. Automated:
```javascript
const heroTop = document.querySelector('.et_pb_section_0').getBoundingClientRect().top;
// Sample the pixel row just above the hero — it should NOT be white
```

### L4. Zero white gap between panels
The factory panel right edge must touch the partner panel left edge with zero gap. No white line or transparent strip between them.

**Root cause when failing:** Divi Row applies `column-gap` or Column has `margin` between flex children.

**Fix pattern:** Row CSS: `column-gap: 0px; gap: 0;` — Column CSS: `margin: 0 !important;`

**Verify:** Factory column `getBoundingClientRect().right` equals Partner column `getBoundingClientRect().left` (tolerance: 1px).

### L5. Zero white pixels below hero bottom
No white gap between hero section bottom edge and the next section (or page end).

**Root cause when failing:** Section `margin-bottom`, TB body section padding, or next section margin-top.

**Fix pattern:** Section: `margin-bottom: 0 !important;` — TB body: `padding-bottom: 0 !important;`

**Verify:** Sample the pixel row at hero bottom + 5px. Should not be `rgb(255,255,255)` unless intentionally white.

---

## Content Sanitization (4 checks)

These catch WordPress stripping content during save. The Base64 bypass was discovered after v27/v28 testing.

### K1. Base64 strings survive storage round-trip
All `u8('...')` or `atob('...')` calls in stored content must decode to valid SVG.

**Verify:** Fetch page via API → extract all Base64 strings → `Buffer.from(b64, 'base64')` → decoded string starts with `<svg`.

### K1a. No UTF-8 mojibake in decoded SVG content
The browser's `atob()` decodes Base64 to Latin-1, not UTF-8. Multi-byte Unicode characters (triangles `▲`, arrows `→`, em-dashes `—`) become garbled: `▲` (3 bytes: 0xE2 0x96 0xB2) renders as `â–²` or similar Latin-1 gibberish.

**Required:** The Base64 decode function must be UTF-8-safe. Use the `u8()` wrapper:
```javascript
function u8(b){return decodeURIComponent(Array.from(atob(b),function(c){
  return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
```

**Mojibake detection patterns** (any of these in decoded SVG = FAIL):
- `Ã` followed by another high byte (broken UTF-8 lead byte)
- `â` followed by non-ASCII (e.g., `â–²` instead of `▲`)
- `Â` followed by a control-range byte
- Consecutive bytes in the 0x80-0xBF range without a valid UTF-8 lead byte

**Verify (automated in verify-svg.js):** Decode each Base64 string → scan for regex `/[\xC0-\xFF][\x80-\xBF]/` which catches Latin-1 interpretations of multi-byte UTF-8. Zero matches = PASS.

**Root cause (for future reference):** `atob()` treats each Base64-decoded byte as one Latin-1 character. A 3-byte UTF-8 sequence like `▲` becomes three separate Latin-1 characters. The `u8()` function converts each byte to `%XX` URL encoding, then `decodeURIComponent()` reassembles multi-byte UTF-8 correctly.

### K2. No `&amp;` encoding inside `<script>` tags
WordPress HTML-encodes `&` to `&amp;` even inside `<script>` blocks, breaking JavaScript.

**Fix pattern:** Never use `&&` in injected JS. Use nested `if` statements instead.

**Verify:** Fetch stored content → extract `<script>` block → zero occurrences of `&amp;` within it.

### K3. Script tag present with skip_security_check
The `<script>` tag must survive storage. Requires `skip_security_check: true` in API payload.

**Verify:** Stored content contains exactly 1 `<script>` tag. If 0, the security check stripped it.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-12 | Initial spec — 22 criteria from 54 red team attacks |
| 1.1 | 2026-02-15 | Added L1-L5 (Layout Fidelity) and K1-K3 (Content Sanitization) — 8 new criteria from white-padding bug |
| 1.2 | 2026-02-16 | Added R3a (section bg), K1a (UTF-8 mojibake), updated E1 (wp:html per D37). 32 criteria total. |
