# Building a 61-Page Bilingual Website with AI
## What I Learned Using Claude Code to Ship a Production WordPress Site in 7 Weeks

**Peter Lo — DigiWin Thailand**
March 2026

---

## Slide 1: The Starting Point

### "I needed a website. I had no web developer."

DigiWin is a 44-year-old manufacturing software company (Shenzhen Stock Exchange: 300378). We have 50,000+ clients across Asia. In Thailand, we sell ERP, MES, WMS, and AIoT to factories.

Our existing website wasn't converting. Our 2026 Thailand revenue target was **NTD 130 million** (+37% growth). I needed a site that could speak to two completely different audiences:

- **Factory operators** frustrated with Excel chaos and failed ERP attempts
- **Potential distributors** looking for a better business model

I had a PRD. I had brand guidelines. I had content. What I didn't have was a development team or 6 months to wait.

> **What I tried first:** I explored traditional agencies, freelancers, and no-code tools. The agencies quoted 3-6 months. The freelancers couldn't handle bilingual WordPress + Divi at scale. The no-code tools couldn't deliver the design fidelity I needed.

---

## Slide 2: Discovering Claude Code

### "An AI that can read files, write code, and push to production."

I came across Claude Code — Anthropic's CLI tool that gives Claude direct access to your codebase. It can:

- Read and write files on your machine
- Run terminal commands (build scripts, git, npm)
- Search your entire codebase for patterns
- Take screenshots and analyze them
- Work with databases, APIs, and deployment tools

**The critical difference from ChatGPT/Copilot:** Claude Code doesn't just suggest code in a chat window. It operates inside your project. It reads your files, understands your architecture, remembers your decisions, and builds on what exists.

I didn't use it as a code generator. I used it as a **senior technical partner**.

---

## Slide 3: The First Decision That Changed Everything

### "We wrote the strategy before writing a single line of code."

Before touching any code, we created three layers of documentation:

| Layer | What | Why |
|-------|------|-----|
| **PRD** | Site architecture, page map, design system | The "what are we building?" |
| **Playbook** | Voice calibration, emotional arcs, objection scripts | The "how should it feel?" |
| **Content Specs** | Per-page production specs with exact values | The "what goes where, precisely?" |

Every color had a hex code. Every font size had a line number in the spec. Every CTA had approved wording ("Let's Talk" — never "Book a Demo", because we don't offer product demos).

> **Lesson:** AI is incredibly fast at building. But if you don't tell it exactly what to build, it will build the wrong thing incredibly fast. Strategy first. Always.

---

## Slide 4: How I Structured the Working Relationship

### "Claude is the senior architect. I'm the business leader."

I defined Claude's role explicitly in a `CLAUDE.md` file at the root of my project:

> *"Claude operates as a 20-year veteran of B2B/ERP web development. When Peter proposes a direction, Claude evaluates it against professional standards BEFORE executing. If the direction is suboptimal, Claude says so immediately."*

This meant Claude would **push back on me**:

- *"Hey — what we're doing here isn't professional. Here's the industry standard way."*
- *"I'm seeing us repeat the same pattern for the 4th time. Let me consolidate this into one reusable component."*
- *"This is going to create rework later. Let me fix the root cause now."*

> **Lesson:** Don't treat AI as an obedient assistant. Give it permission to disagree. The best work happened when Claude told me I was wrong.

---

## Slide 5: The WordPress + Divi 5 Challenge

### "The page builder couldn't handle what we needed."

We chose WordPress + Divi 5 (still in beta) as our platform. Divi's visual builder is great for simple pages, but we needed:

- Custom SVG animations (particle waves, data flow visualizations)
- 350+ sections across 35 pages with pixel-perfect design fidelity
- Bilingual content (English + Thai) with proper hreflang
- Automated quality checks on every page push

**The problem:** Divi's API (Respira) aggressively strips content:
- SVG `<g transform>` attributes — **deleted**
- Custom `<script>` blocks — **deleted**
- Code modules with self-closing tags — **completely stripped**

We couldn't use the normal API to push content. Everything we built would be destroyed by WordPress's security sanitizer.

---

## Slide 6: The Breakthrough — Direct MySQL Pipeline

### "If the front door strips your content, go through the back."

After 3 days of failed API attempts, Claude discovered that writing directly to the MySQL database bypasses all sanitization. Every SVG attribute, every script block, every animation — **preserved perfectly**.

We built `build-page.js` — a 500-line orchestrator that:

1. Reads section builders (JavaScript files that generate Divi blocks)
2. Assembles all blocks + CSS into a single page payload
3. Writes directly to MySQL (bypassing Respira API)
4. Flushes Divi's CSS cache
5. Takes screenshots via Puppeteer
6. Runs 7 automated verification gates
7. Auto-fixes common CSS issues
8. Re-pushes if fixes were applied

**One command:** `node build-page.js --page home`

From source files to live WordPress page with full verification — in under 60 seconds.

> **Lesson:** When a platform's official API doesn't work for your use case, look for alternative paths. Document what works and what doesn't. The "hack" became our most reliable tool.

---

## Slide 7: The 7 Quality Gates

### "No page ships without passing all 7 checks."

Every single page push runs through automated verification:

| Gate | What It Checks | How |
|------|---------------|-----|
| **1. Content Parity** | Are all headings, CTAs, and stats present? | Text extraction + 70% word match |
| **2. Design System** | Do colors, fonts, spacing match the spec? | Golden reference comparison |
| **3. Editability** | Can the marketing team edit this in Divi? | Block type + admin label audit |
| **4. Element Parity** | Any missing or extra visual elements? | DOM comparison vs HTML prototype |
| **5. Responsive** | Does it work on mobile, tablet, desktop? | 4 viewport checks (overflow, touch targets, fonts) |
| **6. CSS Fidelity** | Do 57+ CSS properties match the spec? | 2,000-line automated comparison engine |
| **7. Visual Regression** | Did this change break anything else? | Pixel-level diff against saved baseline |

**95%+ of issues caught before I ever look at the page.**

> **Lesson:** If you're building more than 5 pages, invest in automated QA. The 30% time investment in building gates saves 50% on the remaining pages.

---

## Slide 8: The CSS War — Our Most Painful Lesson

### "We grew to 6,000 lines of CSS before anyone said stop."

The HTML prototype phase went fast. Too fast. We were creating page-specific CSS classes:

```
.mes-hero { ... }      /* 250 lines */
.erp-hero { ... }      /* 240 lines (90% identical) */
.auto-hero { ... }     /* 245 lines (90% identical) */
.metal-hero { ... }    /* 230 lines (90% identical) */
.wms-hero { ... }      /* 260 lines (90% identical) */
```

**6,000 lines.** Five heroes that were 90% the same code. I had to call it out:

*"This isn't professional. Fix it."*

**The fix:** One `.product-hero` component with CSS custom properties. 11 reusable templates. A shared design token system (23 colors, 9 type scales, 7 spacing levels).

**Result:** Every new page section went from 300 lines of custom CSS to ~100 lines using templates.

> **Lesson:** AI will happily copy-paste patterns forever unless you tell it to stop. Set a rule: if a pattern repeats 3 times, consolidate before continuing.

---

## Slide 9: SVG — The 3-Day Puzzle

### "WordPress kept eating our animations."

Our design used SVG illustrations with `<animate>` elements, gradient definitions, and `<g transform>` groups. WordPress's security layer (`wp_kses`) strips these attributes because they could theoretically contain XSS attacks.

**Attempt 1:** PNG background images. Lost all animation. File sizes exploded.
**Attempt 2:** Inline SVG with CSS transforms. Still stripped by wp_kses.
**Attempt 3:** Raw SVG in Divi Code Modules. Transform groups still deleted.

**Attempt 4 (the solution):** Base64 encode the SVG at build time. Store it as a string. Decode with `atob()` in JavaScript at runtime. Inject via `innerHTML`.

**Why it works:** wp_kses cannot parse Base64 strings. It sees random characters, not HTML. All 58 `<animate>` elements and 15 `<g transform>` groups survived — zero losses.

> **Lesson:** Security layers exist for good reason. Don't disable them. Find a way to work within the constraints that preserves both security and functionality.

---

## Slide 10: Going Bilingual — 26 Thai Pages in 3 Days

### "English was done. Now do it again in Thai."

With 35 English pages live, we needed Thai translations. The original plan was Thai at the root URL — but that would break existing search rankings. So we pivoted:

- **English:** stays at `/` (existing pages untouched)
- **Thai:** new subdirectory at `/th/`
- **No WPML plugin** — just a custom mu-plugin for `hreflang` tags
- **Language toggle:** `EN | ไทย` in the header, linking 27 page pairs

**The translation pattern:** Separate i18n files (`i18n/th/home.js`, `i18n/th/erp.js`) containing only the Thai text. The builder merges English structure + Thai content:

```javascript
// English structure stays the same
// Thai content overrides just the text
const blocks = { ...englishData, ...thaiContent };
```

**3 days:** 26 Thai pages created, translated, styled with Thai typography adjustments (Noto Sans Thai, line-height 1.8), cross-locale sync gate passing 22/26 pairs.

> **Lesson:** Plan bilingual from Day 1, even if you build one language first. Our section builder architecture made Thai expansion trivial. If we had hardcoded English text, it would have taken 3 weeks, not 3 days.

---

## Slide 11: The 11 Divi 5 Gotchas Nobody Tells You

### "Each one cost 2-4 hours to discover. Here's the cheat sheet."

| # | Gotcha | What Happens | Fix |
|---|--------|-------------|-----|
| 1 | Column `gap:30px` default | Unwanted 30px spacing everywhere | `gap:0 !important` in page CSS |
| 2 | `font-family` in Text module JSON | Font name silently ignored | Use CSS class with `!important` |
| 3 | `wp:divi/button` module | Renders empty `<div>` on front-end | Use Code Module with `<a>` tags |
| 4 | `wp:divi/code` via Respira API | Content completely stripped | Direct MySQL write only |
| 5 | Inline `<span>` in Text module | Breaks JSON parsing | Use `wp:html` blocks instead |
| 6 | SVG `style="stop-color:..."` | Stripped by wp_kses | Use SVG attributes directly |
| 7 | CSS `@import` in custom CSS | Violates CSS spec position rule | Use mu-plugin `wp_enqueue_style()` |
| 8 | Divi CSS disk cache | Survives MySQL pushes | Delete `et-cache/{PAGE_ID}/` |
| 9 | Divi cache transients | Stale DB metadata | Flush transients after every push |
| 10 | `background.color` in column JSON | Blocks gradient overlay | Remove from JSON; use CSS only |
| 11 | SVG `preserveAspectRatio` case | Case-insensitive → broken | JS post-render fix |

> **Lesson:** Document every gotcha immediately. What costs you 4 hours today saves 40 hours across 35 pages tomorrow.

---

## Slide 12: Production Deployment

### "Going live was surprisingly calm — because we'd tested everything."

**March 4, 2026:** We deployed to digiwin.co.th.

The deployment stack:
- **Local development:** LocalWP (WordPress 6.9.1 + Divi 5 beta.8)
- **Production push:** DirectAdmin SQL import via `da-push.js`
- **SSH tunnel:** For direct MySQL queries when needed
- **4 mu-plugins** uploaded to production:
  - `digiwin-redirects.php` — 64 explicit + 6 regex 301 redirects
  - `digiwin-hreflang.php` — bilingual page pair linking
  - `digiwin-font-preload.php` — Noto Sans + JetBrains Mono (CLS fix)
  - `digiwin-schema.php` — JSON-LD structured data for SEO

**Performance (Lighthouse mobile):**
- Performance: **100** | Accessibility: **81** | SEO: **92** | Best Practices: **78**
- Core Web Vitals: **All green**

> **Lesson:** If your build pipeline includes automated verification, deployment day is a non-event. All the hard work happened during development. Going live was just `node da-push.js --all-batches`.

---

## Slide 13: What We Actually Built — By the Numbers

### 7 weeks. One person + one AI. Here's the output.

| Category | Count |
|----------|-------|
| English pages | 35 |
| Thai pages | 26 |
| Total sections built | ~400 |
| JavaScript automation tools | 18 |
| Reusable section templates | 11 |
| Automated quality gates | 7 |
| Architecture decisions documented | 88 |
| Divi 5 gotchas discovered & solved | 11 |
| CSS design tokens | 23 colors + 9 type scales |
| Links validated | 2,244 |
| Statistics verified against sources | 448 |
| 301 redirects configured | 70 (all QA'd) |
| Lines of automation code | ~9,000 |
| WordPress mu-plugins | 4 |
| Lighthouse Performance score | 100/100 |

**Total investment in tooling:** ~30% of project time.
**Savings on remaining pages from that tooling:** ~50%.

---

## Slide 14: The Mindset Shift — What AI Changes About Web Development

### "AI doesn't replace the developer. It replaces the bottleneck."

**Before AI:** I need to hire a developer, explain the requirements, wait for delivery, review, request changes, wait again. Timeline: months.

**With AI:** I describe what I need in context. Claude reads the existing code, understands the architecture, proposes an approach, builds it, verifies it, and asks me to review. Timeline: hours.

But this only works if you change your mindset:

| Old Thinking | New Thinking |
|-------------|-------------|
| "Write code for me" | "Be my technical partner" |
| "Do exactly what I say" | "Push back when I'm wrong" |
| "Generate one file" | "Understand the whole system" |
| "Fix this bug" | "Find the root cause and prevent it everywhere" |
| "Build 35 pages" | "Build 1 page perfectly, then build a system that scales to 35" |

The biggest shift: **I stopped thinking about pages and started thinking about systems.** Templates, tokens, gates, pipelines. The AI made systems-thinking accessible to a non-developer.

---

## Slide 15: 8 Rules for Building with AI + WordPress

### "What I wish someone had told me on Day 1."

**1. Strategy before code.** Write your PRD, define your design system, document your content specs. AI amplifies direction — make sure the direction is right.

**2. Give AI a role, not just tasks.** "You are a senior technical mentor with 20 years of B2B web experience" produces fundamentally different output than "build me a website."

**3. Automate by page 3.** If you're doing something manually on the third page, stop and build a tool. The investment pays off by page 5.

**4. Document every decision.** We logged 88 decisions with dates and rationale. When a question came up 3 weeks later, we checked the log instead of re-debating.

**5. Test automatically, review manually.** Let automation catch the 95% of mechanical issues. Save your human attention for design judgment, tone, and business logic.

**6. Plan bilingual from Day 1.** Even if you build one language first, architect your content as data (separate from structure). Adding a language should be merging data, not rebuilding pages.

**7. Respect the platform's constraints.** WordPress sanitizes content for security. Divi has CSS defaults. Don't fight them — learn the cascade, document the gotchas, and work within the system.

**8. The AI's memory is your project's memory.** Claude Code maintains persistent memory files across sessions. Every lesson learned, every decision made, every gotcha discovered — captured and available in the next conversation. Treat it like your project's institutional knowledge.

---

## Slide 16: What I Would Do Differently

### "Hindsight is 20/20. Here's mine."

**1. Accessibility from the template, not retrofitted.** We shipped 35 pages without skip links, landmarks, or reduced-motion support. Then spent 2 days retrofitting. Build it into your base template from Day 1.

**2. Component architecture from Day 1.** We let CSS grow to 6,000 lines before consolidating. Set the rule early: no page-specific CSS classes. One component with custom properties.

**3. Start with the hardest page.** We started with the homepage (smart for validation), but the partner program pages were actually harder (dual-audience messaging). Building the hardest page first surfaces architectural issues early.

**4. Invest in the build pipeline earlier.** Our 7-gate verification system was built incrementally. If I started again, I'd build Gates 1-3 before the first page and Gates 4-7 by page 5.

**5. Source every statistic before writing copy.** We had to go back and verify 448 statistics mid-project. In a distributor meeting, every number gets challenged. Verify first, write second.

---

## Slide 17: Where This Goes Next

### "The website is live. The system is what matters."

What we built isn't just a website. It's a **replicable deployment system**:

- **Next markets:** Indonesia, Vietnam, Malaysia can follow the same playbook
- **Content updates:** Marketing team creates blog posts in WordPress admin; the design system handles the rest
- **SEO infrastructure:** Schema markup, hreflang, structured data — all automated via mu-plugins
- **Quality maintenance:** Any future change runs through the same 7-gate pipeline

The real deliverable isn't 61 pages. It's the confidence that the next 61 pages will be just as good — and take half the time.

### For anyone starting a similar project:

> Start with strategy. Give the AI a role, not just tasks. Build systems, not pages. Automate quality checks early. Document everything. And don't be afraid to let the AI tell you when you're wrong.

> The technology is ready. The question is whether you're willing to work *with* it — not just *use* it.

---

*Built with Claude Code (Anthropic) + WordPress + Divi 5*
*61 pages | 2 languages | 7 weeks | digiwin.co.th*
