# Content Spec: The Business Model Crisis (PRD Section 2.1)

**Batch:** 1
**PRD Reference:** Section 2.1 — The Business Model Crisis
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.3 (Track B Leaf Arc), 7.3 (Business Model Crisis Notes)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Distributor prospects deep in the awareness/consideration stage
**Objective:** Deepen the pain of the man-day business model, then pivot to possibility. Empathy first — "we've seen this pattern" not "you're doing it wrong."
**URL:** digiwin.co.th/partner-program/business-model.html
**Emotional Arc:** Disruption (the cycle is a trap) > Evidence (documented math) > Possibility (three futures) > Economics (the alternative model)
**Title Tag:** `The Business Model Crisis - DigiWin Partner Program`

---

## Section 1: Hero

**Purpose:** Hook with truth — name the problem the distributor feels but hasn't articulated.

| Element | Specification |
|---------|---------------|
| **Layout** | Full-width dark hero, single-column left-aligned, narrower max-width (900px) |
| **Background** | `linear-gradient(135deg, #1a2e40 0%, #253B50 50%, #2d4a5e 100%)` with dot pattern overlay (`opacity: 0.03`) |
| **Padding** | 140px top, 100px bottom, 24px horizontal (mobile: 120px top, 80px bottom, 20px horizontal) |

| Element | Content |
|---------|---------|
| **Breadcrumb** | Partner Program / Business Model Crisis (link to `partner-program.html`) |
| **Headline** | "The Problem Isn't Your Team—It's Your Business Model" |
| **Subtitle** | "You're tired of Monday Morning Escalations and watching senior consultants act as data babysitters. The Man-Day Trap is capping your growth. You deliver Tier-1 capabilities at Tier-3 prices. This page names the problem—so you can escape it." |

---

## Section 2: The Pattern — "You Know This Pattern"

**Purpose:** Visualize the SI consulting cycle as a trap. Maps to PRD "The 3 Profit Killers (Expanded)" section intent.

| Element | Specification |
|---------|---------------|
| **Layout** | 4-step cycle with numbered circles and connecting gradient line (red spectrum) |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1000px |

| Element | Content |
|---------|---------|
| **Section Headline** | "You Know This Pattern" |
| **Section Subhead** | "Every SI lives the same cycle. It feels productive. But it's a trap." |

### Cycle Steps (red-themed circles: background `linear-gradient(135deg, #fef2f2, #fee2e2)`, border `#fecaca`)

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Checkmark circle | Win the Project | After weeks of proposals, demos, and negotiations, you finally land a customer. |
| 2 | Document | Deliver Expertise | Your team does great work. You solve hard problems. You make them successful. |
| 3 | Alert circle | Project Ends | Knowledge transferred. Their team can handle it. They don't need you anymore. |
| 4 | Refresh/repeat | Start from Zero | Back to hunting. More proposals. More negotiations. The cycle repeats. |

### Repeat Callout (red box: background `linear-gradient(135deg, #fef2f2, #fff5f5)`, border `#fecaca`)

| Element | Content |
|---------|---------|
| **Text** | "And the cycle repeats... forever" (with cycling arrows SVG icon) |

---

## Section 3: The Industry Evidence

**Purpose:** Document the math of why the model is broken. Not anecdote — evidence.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid with red top accent bars |
| **Background** | `linear-gradient(180deg, #f8fafc 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Headline** | "The Industry Evidence" |
| **Section Subhead** | "This isn't anecdote. Here's the documented math of why the model is broken." |

### Evidence Cards (Row 1 — red-bordered, red accent bar at top)

| Card | Icon | Title | Body | Formula |
|------|------|-------|------|---------|
| 1 | Bar chart | The Profit Squeeze | Project net margins have compressed from **~35% in 2018 to ~18% in 2024**. Clients demand Tier-1 capabilities at Tier-3 prices. A 9-month project that generated ฿500k profit now generates only ~฿150k. | `Same Effort = Half the Return` |
| 2 | Users | The 35-Person Cap | Boutique consultancies cannot scale beyond **35–45 employees** because delivery relies on "hero" seniors. To grow revenue, you must hire more—increasing overhead and risk with no leverage. | `Revenue = Headcount (Linear Only)` |
| 3 | Clock | The ฿200K Replacement Cost | Replacing a senior consultant costs **฿200,000 in recruitment plus 6 months** of lost productivity. One quitting senior can paralyze your ability to take new projects. | `Talent Loss = 200K + 6 Months` |

---

## Section 4: More Industry Evidence

**Purpose:** Continue the evidence section with 3 more data points.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid (same style as Section 3) |
| **Background** | `#fff` |
| **Padding** | 60px top, 100px bottom |

### Evidence Cards (Row 2)

| Card | Icon | Title | Body | Formula |
|------|------|-------|------|---------|
| 1 | Dollar sign | The 65% Overrun Trap | **65% of budget overruns** come from system modifications to improve usability. This becomes "unbillable goodwill work"—fixing rigid software to fit Thai factory processes, directly eating your margin. | `Goodwill Fixes = Profit Evaporates` |
| 2 | Bar chart (ascending) | The 30% Undercut | Open-source competitors (Odoo, local accounting software) offer implementation costs **~30% lower**. Without a differentiated weapon, you're forced to compete on price—the race to the bottom. | `Price War = Margin Death` |
| 3 | Bookmark | The Shrinking Pie | Economic headwinds led to **~100 factory closures/month** in early 2024. The total addressable market is shrinking while competition for healthy clients intensifies. | `Fewer Factories = More Competition` |

---

## Section 5: Three Possible Futures

**Purpose:** Present three paths — only one leads to sustainable growth. This is the pivot from pain to possibility.

| Element | Specification |
|---------|---------------|
| **Layout** | 3 stacked path cards (color-coded: red/yellow/green) followed by a dark insight box |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |
| **Max Width** | 900px |

| Element | Content |
|---------|---------|
| **Section Headline** | "Three Possible Futures" |
| **Section Subhead** | "You have three paths. Only one leads to sustainable growth." |

### Path Cards

| Path | Color Scheme | Icon | Title | Subtitle | Body |
|------|-------------|------|-------|----------|------|
| 1 | Red (bg `#fef2f2 → #fff5f5`, border `#fecaca`) | X icon (red `#dc2626`) | Path 1: "Work Harder" | Why this fails: You cannot outwork structural margin compression. | Senior consultants spend **50% of their time** as "data babysitters" instead of billing high-value architecture. Same effort now yields half the profit. Working harder on the same model = running faster on a treadmill. |
| 2 | Yellow (bg `#fef9c3 → #fefce8`, border `#fde047`) | Alert circle (yellow `#eab308`) | Path 2: "Find a Niche" | Why this is limited: You hit a ceiling on client size and technical capability. | Niche software often lacks native connectivity for **Industry 4.0**. Specializing means building heavy custom code—creating "golden handcuffs" where your best people maintain old code instead of deploying new projects. Past success becomes a prison. |
| 3 | Green (bg `#f0fdf4 → #dcfce7`, border `#86efac`) | Checkmark (green `#22c55e`) | Path 3: "Change the Model" | Why this is logical: It decouples revenue from hours. | Leverage a **PaaS platform** to build reusable industry templates. Convert one-off customization into licensable IP. Enter clients via low-risk **"Reverse Cut"** (MES/AIoT first), then expand. A 35-person firm generates the revenue of a 50-person firm through technology arbitrage. |

### Insight Box (dark: `linear-gradient(135deg, #253B50, #1a2e40)` with diamond pattern)

| Element | Content |
|---------|---------|
| **Quote** | "Shift from selling hours to building assets. From labor arbitrage to technology arbitrage." |
| **Subtext** | "The goal isn't to sell more software—it's to stop relying on unpredictable one-off fees and build a sustainable 'farming' practice based on recurring maintenance and add-on modules." |

---

## Section 6: There's Another Way — Solution Cards

**Purpose:** Pivot to the alternative model. Show what adding a product line changes. Maps to PRD "The Alternative Model" section.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid with green accent bars |
| **Background** | `linear-gradient(180deg, #f8fafc 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Headline** | "There's Another Way" |
| **Section Subhead** | "Add a product line to your services business and change the fundamental economics." |

### Solution Cards (green-bordered, green accent bar at top)

| Card | Icon | Title | Body | Formula |
|------|------|-------|------|---------|
| 1 | Sun/radial | Recurring Revenue | Software licenses and maintenance generate predictable monthly income. Sleep on vacation. Revenue keeps coming in. | `Monthly Revenue = License Base x Rate` |
| 2 | Lock | Sticky Relationships | When customers run their factory on your software, they don't leave. You become critical infrastructure, not a replaceable vendor. | `Churn Rate → Near Zero` |
| 3 | Trending up | Compound Growth | Year 2 = Year 1 customers + new customers. Each deal adds to your base. The math finally works in your favor over time. | `Year N = Year N-1 + New Wins` |

---

## Section 7: Side-by-Side Comparison

**Purpose:** Direct comparison table — Services Only vs. Services + Product model.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column comparison table with header row |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1000px |

| Element | Content |
|---------|---------|
| **Section Headline** | "Side-by-Side Comparison" |

### Comparison Table

| Metric | Services Only (red bg `#fef2f2`) | Services + Product (green bg `#f0fdf4`) |
|--------|--------------------------------|----------------------------------------|
| Revenue Model | Resets to zero each year | Compounds annually |
| Customer Relationship | Project-based, ends | Ongoing, permanent |
| Revenue Predictability | Feast or famine | Predictable base + growth |
| Business Valuation | 1-2x revenue (if any) | 5-10x recurring revenue |
| Owner Dependence | Business = You | Business = Customer base |
| Growth Ceiling | Limited by headcount | Limited by market size |

---

## Section 8: Final CTA

**Purpose:** Bridge to next pages in the journey — Economics or Solutions.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with dual CTAs |
| **Background** | `linear-gradient(135deg, #3798E4 0%, #2d7bc4 50%, #1e5a8a 100%)` with dot pattern |
| **Padding** | 100px top/bottom |
| **Max Width** | 800px |

| Element | Content |
|---------|---------|
| **Headline** | "See How the Economics Actually Work" |
| **Body** | "You've seen the problem. Now see the math of the solution—what you keep, what compounds, and why 100% of service fees stay with you." |
| **Primary CTA** | "See Partner Economics" → `economics.html` (class: `dw-btn dw-btn-white`) |
| **Secondary CTA** | "Evaluate the Weapon First" → `solutions.html` (class: `dw-btn dw-btn-outline-white`) |

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **1024px** | Pattern cycle → 2-col (connecting line hidden); Math/Solution cards → 2-col; Comparison table → single-col (header cells hidden except first) |
| **640px** | Hero padding reduced; H1 → 32px; All grids → 1-col; Insight box padding reduced (40px 24px); Quote text → 24px |

---

## Flags & Notes

1. **CTA Links are Relative:** The final CTA links to `economics.html` and `solutions.html` (relative paths within the `partner-program/` directory). These are correct for the build system but should be verified to resolve properly.

2. **Empathy Tone — Aligned with Playbook 7.3:** The page follows the "we've seen this pattern" approach rather than accusatory "you're doing it wrong" — this is correct per Playbook guidance.

3. **Competitor Naming (Track B):** The page names Odoo in the "30% Undercut" card. This is acceptable per Playbook rules for Track B pages.

4. **"65% of budget overruns" Claim:** This statistic should be verified. It's presented as industry evidence but no source is cited.

5. **"~100 factory closures/month" Claim:** This is attributed to "early 2024." Should be verified and may need updating if conditions have changed.

6. **PRD Deviation — Section Structure:** PRD calls for 4 sections (Hero, 3 Profit Killers, Alternative Model, Bridge CTA). The HTML expands this into 8 sections with significantly more content — the pattern cycle, 6 evidence cards, three futures framework, solution cards, and comparison table. This is richer than PRD spec but aligned with the Playbook's "Empathy First" guidance.

7. **"5-10x recurring revenue" Valuation Claim:** The comparison table claims "5-10x recurring revenue" as business valuation for the product model. This is a directional industry benchmark but should be positioned as aspirational, not guaranteed.

8. **Missing No-Demo Guard:** No CTAs on this page violate the no-demo rule — all bridge CTAs point to other partner pages, not to demo requests. This is correct.

9. **Inline CSS:** This page has ~540 lines of inline CSS. Shared patterns (breadcrumb, section headers, CTA sections, card components) overlap significantly with the Partner Hub page and should be extracted to `styles.css`.
