# Content Spec: Partner Program Hub (PRD Section 2.0)

**Batch:** 1
**PRD Reference:** Section 2.0 — Partner Program (Profit Reframing Hub)
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.1 (Hub Page Arc), 3.3 (Track B Leaf Arc), 6.1 (CTA Hierarchy), 7.2 (Partner Hub Notes)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Distributor prospects — ERP implementers, accounting firms, IT consultancies
**Objective:** Reframe their business model problem and position DigiWin as the solution. This is the MOST IMPORTANT PAGE per PRD notes.
**URL:** digiwin.co.th/partner-program.html
**Emotional Arc:** Provocative (hero disrupts complacency) > Strategic (alternative model presented) > Transparent (economics previewed) > Direct (CTA to action)
**Title Tag:** `Partner Program - DigiWin Thailand`

---

## Section 1: Hero

**Purpose:** Disrupt complacency with a provocative headline that challenges the distributor's identity as an hours-based business.

| Element | Specification |
|---------|---------------|
| **Layout** | Full-width dark hero, single-column left-aligned content, stats bar at bottom |
| **Background** | `linear-gradient(135deg, #1a2e40 0%, #253B50 50%, #2d4a5e 100%)` with SVG illustration (stacking rectangles representing compounding value + grid pattern + connection nodes) on right side |
| **Padding** | 140px top, 100px bottom, 24px horizontal (mobile: 120px top, 80px bottom, 20px horizontal) |
| **Max Width** | Inner container 1200px |

| Element | Content |
|---------|---------|
| **Badge** | "For ERP Implementers & IT Consultants" (pill badge with user-plus icon, background `rgba(55, 152, 228, 0.2)`, border `rgba(55, 152, 228, 0.3)`, text `#7EC8F2`) |
| **Headline** | `Tired of Selling Man-Hours? The Problem Isn't Your Team.` — "Man-Hours" wrapped in `<span>` with color `#3798E4` |
| **Subtitle** | "You're fighting customization wars that burn out your best consultants. Your margins have compressed from 35% to 18%. The problem isn't execution—it's your business model. We offer a different architecture." |
| **Primary CTA** | "Schedule Partner Strategy Session" → `demo.html` (class: `dw-btn dw-btn-primary`) |
| **Secondary CTA** | "See the Math First" → `partner-program/economics.html` (class: `dw-btn dw-btn-secondary`) |

### Hero Stats Bar

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid, separated from hero by `1px solid rgba(255,255,255,0.1)` top border, 40px top padding |
| **Responsive** | 2-col at 1024px, 1-col at 640px |

| Stat | Value | Label |
|------|-------|-------|
| 1 | 100% | Service Fees You Keep |
| 2 | 40-50% | License Commission |
| 3 | 9% | Annual Maintenance Share |
| 4 | 6 mo | Lead Lock Protection |

---

## Section 2: Reality Check — Revenue Model Pain

**Purpose:** Name the 3 revenue model problems distributors face. PRD Section 2.0 calls this the "Pain Point Trio."

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid (2-col at 1024px, 1-col at 640px) |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom, 24px horizontal |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Headline** | "The Revenue Model Pain" |
| **Section Subhead** | "You know these patterns. We've heard them from every SI we've talked to. The profit squeeze is structural, not circumstantial." |

### Pain Cards (red-themed: background `linear-gradient(135deg, #fef2f2, #fff5f5)`, border `#fecaca`)

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Bar chart (declining) | The "Margin Erosion" Crisis | Your project margins have silently compressed from **35% to 18%** over the last few years. Clients demand Tier-1 capabilities (IoT, real-time costing) but refuse to pay more than Tier-3 prices. |
| 2 | Dollar sign | The "Unbillable Overrun" | You spend weeks fixing data errors or creating workarounds for rigid software (phantom BOMs, regrind logic) that you **cannot bill for**, turning profitable projects into break-even disasters. |
| 3 | Lock | The "Ghost IT" Burden | You aren't just their ERP consultant—you've become their unpaid IT department. **80% of Thai SMEs** lack an IT manager, so your senior staff wastes billable hours on Wi-Fi and password resets. |

---

## Section 3: Reality Check — Operational Pain

**Purpose:** Name 3 more operational problems. Extends the Pain Point Trio into 6 total pain points.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid (same as Section 2) |
| **Background** | `#f8fafc` |
| **Padding** | 60px top, 100px bottom |

| Element | Content |
|---------|---------|
| **Section Headline** | "The Operational Pain" |
| **Section Subhead** | "Your best people are burning out. Not from hard work—from the wrong work." |

### Pain Cards

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Gauge/speedometer | Consultant Burnout | Your Senior Consultants are quitting—not for salary, but because they're tired of being **"Data Babysitters."** They spend 50% of their time watching warehouse staff type numbers instead of doing Solution Architecture. |
| 2 | Clock | The "Knowledge Ceiling" | You cannot scale beyond ~35 people because delivery relies on a few "hero" seniors. If one quits, it costs you **฿200,000 in recruitment plus 6 months** of lost productivity. |
| 3 | Users/people | The "Sales vs. Delivery" War | Sales promises "customized flexibility" to win deals. Delivery tries to force a rigid ERP to bend. This **perpetual conflict** drains morale and profit on every single project. |

### Section CTA

| Element | Content |
|---------|---------|
| **Link** | "Read the Full Diagnosis →" → `partner-program/business-model.html` (class: `dw-btn dw-btn-secondary`) |

---

## Section 4: The Alternative Model — "You Keep the Meat, We Drink the Soup"

**Purpose:** Present the DigiWin partner model as a structural alternative (PRD Section 2.0, Section 3: The DigiWin Partner Model).

| Element | Specification |
|---------|---------------|
| **Layout** | Before/After comparison (3-col grid: old model | arrow | new model), followed by 3-column benefits grid |
| **Background** | `linear-gradient(180deg, #f8fafc 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section Headline** | "You Keep the Meat, We Drink the Soup" |
| **Section Subhead** | "Unlike global vendors who use partners as low-margin resellers, we operate on a Strategic Concession model." |

### Before/After Comparison

**Old Model Box** (border `2px solid #fecaca`, label background `#fee2e2`):

| Element | Content |
|---------|---------|
| **Label** | "Typical Vendor Model" |
| **Title** | "Vendor Takes the Meat" |
| **List Item 1** | (X) Vendor controls pricing and margin |
| **List Item 2** | (X) Partner is just a reseller channel |
| **List Item 3** | (X) Direct team competes for your deals |
| **List Item 4** | (X) Maintenance revenue goes to HQ |

**New Model Box** (border `2px solid #86efac`, label background `#dcfce7`):

| Element | Content |
|---------|---------|
| **Label** | "DigiWin Strategic Concession" |
| **Title** | "Partner Keeps the Meat" |
| **List Item 1** | (check) **100%** of implementation & service fees |
| **List Item 2** | (check) **40-50%** commission on license sales |
| **List Item 3** | (check) **Zero** channel conflict—Thai market is yours |
| **List Item 4** | (check) **9%** annual maintenance annuity |

### Benefits Grid (3-column)

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Layers | Zero Channel Conflict | We don't have a direct sales team competing for Thai SME business. Our direct team handles Chinese/Taiwanese inbound; the local market is **exclusively yours**. |
| 2 | Lock | Deal Registration Protection | Once you book a lead, it is **locked to you for 6 months**. Our direct team or other partners cannot undercut your groundwork. It's in the Master Agreement. |
| 3 | Trending up | Land & Expand Strategy | Enter clients with lower-risk **eMES or Workflow** projects, then upsell full ERP once trust is established. Each phase generates revenue while building dependency. |

---

## Section 5: What You Get as a DigiWin Partner

**Purpose:** Concrete value exchange — what the partner actually receives (PRD Section 2.0, Section 4: Partner Benefits Grid).

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column offering cards (link to sub-pages), followed by dark benefits box with 4-column checklist |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section Headline** | "What You Get as a DigiWin Partner" |
| **Section Subhead** | "Proven products, transparent economics, and comprehensive support to build your business." |

### Offering Cards (2-column, clickable)

| Card | Icon | Title | Description | Link Text | Link Target |
|------|------|-------|-------------|-----------|-------------|
| 1 | Target/bullseye | The Solution Stack | Proven products to resell: ERP, MES, WMS, AIoT. 44 years of development. 50,000+ installations worldwide. Products that work in real factories. | "View Product Portfolio" | `partner-program/solutions.html` |
| 2 | Dollar sign | Partner Economics | Transparent margins, predictable revenue share, and multi-year projections that show how partnership compounds your business value over time. | "See the Numbers" | `partner-program/economics.html` |

### Benefits Box (dark: `linear-gradient(135deg, #253B50, #1a2e40)` with diamond pattern overlay)

| Element | Content |
|---------|---------|
| **Title** | "Partner Benefits at a Glance" |

**4-column checklist (green check icons, `#4ade80`):**

| Row 1 | Row 2 |
|-------|-------|
| Protected territory rights | Technical certification |
| Sales enablement support | Marketing co-investment |
| Implementation methodology | Ongoing product updates |
| Deal registration protection | Annual partner summit |

---

## Section 6: Continue Your Research

**Purpose:** Self-directed research path for skeptical distributors. Acknowledges they're not ready to talk yet.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column steps with numbered circles and connecting gradient line |
| **Background** | `linear-gradient(180deg, #f8fafc, #fff)` |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section Headline** | "Continue Your Research" |
| **Section Subhead** | "You're skeptical—good. Explore the details before we talk." |

| Step | Number | Title | Description | CTA | Link |
|------|--------|-------|-------------|-----|------|
| 1 | 1 | Deepen the "Why" | Understand why your margin erosion is *structural*, not circumstantial. See if the diagnosis matches your reality. | "The Evolving Business Model →" | `partner-program/business-model.html` |
| 2 | 2 | Evaluate the "Weapon" | See if DigiWin gives you a better weapon to fight the price war against Kingdee, Odoo, or specialized MES providers. | "The Solution Stack →" | `partner-program/solutions.html` |
| 3 | 3 | Verify the "Math" | You're a business owner. You won't sign until you see the spreadsheet. Validate the margins and risk. | "Partner Economics →" | `partner-program/economics.html` |

---

## Section 7: Structured Ascension Path

**Purpose:** Show the 3-tier partner journey — addresses "how do I get from here to there?" (PRD Section 2.3 references 4-stage maturity; HTML implements 3 tiers).

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column steps with letter-coded circles |
| **Background** | `#fff` |
| **Padding** | 60px top, 100px bottom |

| Element | Content |
|---------|---------|
| **Section Headline** | "Structured Ascension Path" |
| **Section Subhead** | "You don't guess how to grow. Clear metrics define progression from entry to autonomy." |

| Tier | Letter | Color | Title | Description |
|------|--------|-------|-------|-------------|
| 1 | R | Gray (`#94a3b8 → #64748b`) | Ready (Entry) | **~40% margin** — Co-delivery required. We work your first projects together. "Earn while you learn" model. |
| 2 | S | Warm Gray (`#a8a29e → #78716c`) | Silver (Collaborative) | **~45% margin** — Supervised delivery. You lead projects; we provide backend support and escalation. |
| 3 | G | Gold (`#fbbf24 → #d97706`) | Gold (Independent) | **~50%+ margin** — Full autonomy. Sell and deliver without our direct supervision. Maximum margins. |

---

## Section 8: Market Timing — "Why Now"

**Purpose:** Create urgency with converging market forces. Not in PRD but adds strategic context.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column cards with large stat numbers |
| **Background** | `#F5F7FA` |
| **Padding** | 80px top/bottom |

| Element | Content |
|---------|---------|
| **Label** | "Why Now" (JetBrains Mono, uppercase, `#3798E4`) |
| **Section Headline** | "The Thai Market Window Is Open" |
| **Section Subhead** | "Three converging forces are creating a rare opportunity for ERP partners in Thailand." |

| Card | Stat | Stat Color | Title | Body |
|------|------|-----------|-------|------|
| 1 | 2027 | `#DC2626` (red) | SAP ECC End-of-Life | SAP ECC reaches end of maintenance in 2027. Thai manufacturers on SAP must migrate — and S/4HANA is prohibitively expensive for SMEs. This creates a migration window for alternative ERP providers. |
| 2 | ~20 | `#F59E0B` (amber) | Competitors Scaling Fast | Kingdee and Yonyou each now have ~20 people in Thailand and growing. The window to establish market position is narrowing. First movers in the partner channel capture territory advantages. |
| 3 | 8,000 | `#22C55E` (green) | Target Factories Identified | From 50,000+ Thai manufacturers, we've filtered to 8,000 genuine targets. Only 113 are properly qualified so far — leaving 7,000+ untouched opportunities for partners to pursue. |

---

## Section 9: Final CTA

**Purpose:** Convert — the primary conversion section (PRD Section 2.0, Section 6).

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with dual CTAs |
| **Background** | `linear-gradient(135deg, #3798E4 0%, #2d7bc4 50%, #1e5a8a 100%)` with dot pattern overlay |
| **Padding** | 100px top/bottom |
| **Max Width** | 800px |

| Element | Content |
|---------|---------|
| **Headline** | "Ready to Discuss Your Territory?" |
| **Body** | "This is not a 'sales call.' It's a business consultation about *your* margins and *your* market. Let's see if the fit is real." |
| **Primary CTA** | "Schedule Partner Strategy Session" → `demo.html` (class: `dw-btn dw-btn-white`) |
| **Secondary CTA** | "See the Math First" → `partner-program/economics.html` (class: `dw-btn dw-btn-outline-white`) |
| **Footer text** | "**Not ready to talk?** Download the Partner Readiness Checklist—a self-assessment tool to privately evaluate if your team is ready." (14px, `rgba(255,255,255,0.7)`) |

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **1024px** | Hero stats → 2-col; Reality/Benefits grids → 2-col; Transform comparison → single-col (arrow rotates 90deg); Benefits checklist → 2-col; Journey steps → 2-col (connecting line hidden) |
| **640px** | Hero padding reduced; H1 → 32px; All grids → 1-col; Benefits checklist → 1-col; Offering cards → flex-column |

---

## Flags & Notes

1. **CTA Wording — "Schedule Partner Strategy Session":** PRD says CTA should be "Schedule a Discovery Call" or "Schedule a 30-Minute Discovery Call." The current wording "Schedule Partner Strategy Session" is acceptable as a Track B variation but deviates from PRD language. Consider aligning.

2. **CTA Link Target — `demo.html`:** Both primary CTAs link to `demo.html`. PRD says no product demos; this is likely a contact/inquiry form page, but the filename "demo" contradicts the no-demo principle. Should be renamed to `contact.html` or `inquiry.html`.

3. **Margin Percentages are Specific:** Hero stats show "40-50% License Commission" and "9% Annual Maintenance Share." PRD Section 2.3 notes say "Pricing: directional ranges only. Exact pricing requires HQ approval." The current figures appear to be directional ranges (40-50%), which is acceptable, but the 9% MA figure is quite specific.

4. **Tier Naming Deviation:** PRD Section 2.3 references a "4-Stage Maturity Path: Filter → Empower → Pilot → Independent." The HTML implements a 3-tier system: Ready/Silver/Gold. This is a significant structural deviation from the PRD. The naming was likely updated during the build process to match actual partner program terminology.

5. **Territory Protection Claims:** The page claims "Protected territory rights" and "6 mo Lead Lock Protection." These are strong contractual claims. Cross-reference with actual partner agreements.

6. **Competitor Naming:** Section 6 ("Continue Your Research") names Kingdee and Odoo directly. Section 8 names Kingdee and Yonyou. This is acceptable per Playbook Section 10 (Track B pages may name competitors for competitive positioning).

7. **"80% of Thai SMEs lack IT manager":** This claim in the Ghost IT card should be verified. It's a strong stat used to validate the pain point.

8. **Missing from PRD:** The PRD specifies a "Social Proof for Partners" section (Section 5) with partner testimonials or "50,000+ clients served through partner network" and stock code 300378. This section does not appear in the current HTML build.

9. **Inline CSS:** This page has ~680 lines of inline CSS. Per project rules, shared patterns (hero badges, card components, section layouts) should be extracted to `styles.css` on next page touch.
