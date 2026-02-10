# Content Spec: The Solution Stack (PRD Section 2.2)

**Batch:** 1
**PRD Reference:** Section 2.2 — The Solution Stack (Product Portfolio for Partners)
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.4 (Partner Product Page Arc), 7.2 (Partner Hub Notes)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Distributor prospects evaluating what they'd actually sell — the "weapon evaluation" step
**Objective:** Show the portfolio depth and cross-sell opportunity. Products framed through the lens of "what you can sell" not "what it does" (PRD 2.2 notes).
**URL:** digiwin.co.th/partner-program/solutions.html
**Emotional Arc:** Arsenal overview (you're not alone) > Product depth (each product is a revenue engine) > Land-and-expand lifecycle (strategic account takeover) > Reverse Cut strategy (how to win SAP accounts) > Competitive positioning (talking points for sales)
**Title Tag:** `The Solution Stack - DigiWin Partner Program`

---

## Section 1: Hero

**Purpose:** Portfolio overview — position products not as software features but as a "modular arsenal" for revenue generation.

| Element | Specification |
|---------|---------------|
| **Layout** | Full-width dark hero, single-column left-aligned (900px max), stats bar at bottom |
| **Background** | `linear-gradient(135deg, #1a2e40 0%, #253B50 50%, #2d4a5e 100%)` with dot pattern overlay |
| **Padding** | 140px top, 100px bottom (mobile: 120px top, 80px bottom) |

| Element | Content |
|---------|---------|
| **Breadcrumb** | Partner Program / Solution Stack (link to `partner-program.html`) |
| **Headline** | `Stop Building Custom Code.` (line break) `Start Deploying a Modular Arsenal.` — second line in `#3798E4` |
| **Subtitle** | "You're not just reselling software. You're deploying a complete Customer Lifecycle Management strategy—land with one product, expand to the full stack, lock in recurring revenue for years." |

### Hero Stats Bar (3-column)

| Stat | Value | Label |
|------|-------|-------|
| 1 | 44 (dynamic via `dw-years`) | Years of R&D Investment |
| 2 | 50K+ | Manufacturing Clients |
| 3 | 4 | Revenue Engines |

---

## Section 2: Product Portfolio — Revenue Engines

**Purpose:** Present each product as a business model with specific revenue characteristics and cross-sell paths. Maps to PRD Section 2.2, Section 2 "Product Cards (3 tiers)."

| Element | Specification |
|---------|---------------|
| **Layout** | Alternating 2-column product cards (info | metrics), even cards reversed via RTL |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Headline** | "Your Product Portfolio as Revenue Engines" |
| **Section Subhead** | "Each product isn't just software—it's a business model with specific revenue characteristics and cross-sell paths." |

### Product Card 1: T100 Enterprise ERP — "The Tier-1 Killer"

**Left: Product Info**

| Element | Content |
|---------|---------|
| **Badge** | "The 'Tier-1 Killer'" (blue pill) |
| **Title** | "T100 Enterprise ERP" |
| **Description** | Win the "Big Fish" accounts—multi-site automotive and electronics suppliers—that usually go to SAP or Oracle. Offer **Tier-1 capability at Tier-2 pricing**, targeting EV supply chain factories that need bilingual support and complex costing. |
| **Feature 1** | Multi-site, multi-currency, multi-company architecture |
| **Feature 2** | Complex costing logic for automotive & electronics |
| **Feature 3** | Chinese/Thai/English bilingual out of the box |
| **Feature 4** | **Cross-sell path:** T100 → eMES → WMS → AIoT → BPM |
| **Link** | "Learn more about T100" → `products/erp.html` |

**Right: Revenue Metrics** (gray background `#f8fafc → #f1f5f9`)

| Metric | Value |
|--------|-------|
| Target Customer | 200+ employees |
| License Margin | 40-50% (highlighted blue) |
| Implementation Fees | 100% yours (highlighted blue) |
| Revenue Type | Enterprise Asset |

| **Metrics Title** | "Your Revenue Model: High-Value Project" |

### Product Card 2: Workflow iGP Growth ERP — "The Volume Engine"

**Left: Product Info** (card layout reversed — RTL)

| Element | Content |
|---------|---------|
| **Badge** | "The 'Volume Engine'" (blue pill) |
| **Title** | "Workflow iGP Growth ERP" |
| **Description** | Your "Rapid Deployment" weapon for Thai SMEs. Addresses the massive automation gap where local accounting fails to handle production logic, but global ERPs are too expensive. **Pre-localized for Thai Revenue Department (certified).** |
| **Feature 1** | 3-6 month deployments—turn projects faster, bill sooner |
| **Feature 2** | Lower barrier = higher volume of local manufacturers |
| **Feature 3** | Thai taxation certified—easy sell to Finance Directors |
| **Feature 4** | **Cross-sell path:** iGP → eMES → WMS → AIoT |
| **Link** | "Learn more about iGP" → `products/erp.html` |

**Right: Revenue Metrics**

| Metric | Value |
|--------|-------|
| Target Customer | 20-200 employees |
| Turn Time | 3-6 months (highlighted blue) |
| Avoid | "Long project death" |
| Revenue Type | SME Cash Flow |

| **Metrics Title** | "Your Revenue Model: Cash Flow Engine" |

### Product Card 3: eMES Essential MES — "The Strategic Wedge"

**Left: Product Info**

| Element | Content |
|---------|---------|
| **Badge** | "The 'Strategic Wedge'" (blue pill) |
| **Title** | "eMES Essential MES" |
| **Description** | The **"Reverse Cut" Strategy.** You don't have to rip and replace their existing ERP—even if it's SAP. Sell eMES as the "Shop Floor Enforcer" that fixes inventory accuracy and OEE tracking. Appeals to owners tired of "Shadow Excel" wanting real-time visibility. |
| **Feature 1** | "Keep SAP for Finance. Use Digiwin for the factory floor." |
| **Feature 2** | Premium rates for process consulting & hardware integration |
| **Feature 3** | Once you control shop floor data, client cannot leave |
| **Feature 4** | **"Trojan Horse":** eMES → WMS → AIoT → T100/iGP |
| **Link** | "Learn more about eMES" → `products/mes.html` |

**Right: Revenue Metrics** (card layout reversed — RTL)

| Metric | Value |
|--------|-------|
| Entry Point | ~1M THB (vs. 5M+ ERP) (highlighted blue) |
| Timeline | 3-6 months (vs. 18mo) (highlighted blue) |
| Retention | Higher barrier to exit |
| Revenue Type | Retention Asset |

| **Metrics Title** | "Your Revenue Model: Sticky Recurring" |

### Product Card 4: AIoT & WMS — "The Value Multipliers"

**Left: Product Info** (card layout reversed — RTL)

| Element | Content |
|---------|---------|
| **Badge** | "The 'Value Multipliers'" (blue pill) |
| **Title** | "AIoT & WMS: Lock-In Layers" |
| **Description** | **WMS — "Zero Ghost Inventory":** Sell to owners terrified of theft or audit failure. Digitizes physical movement of goods. **AIoT — "Future Proofing":** Shows you have capability to connect machines (PLCs) directly to ERP. Differentiates you from accounting firms. |
| **Feature 1** | Hardware/middleware resale opportunity (handhelds, sensors) |
| **Feature 2** | Recurring data monitoring & optimization services |
| **Feature 3** | Solves "system says 100, shelf has 50" problem |
| **Feature 4** | **Physical lock-in:** Scanners & sensors = 10+ year relationships |
| **Link** | "Learn more about AIoT & WMS" → `products/aiot.html` |

**Right: Revenue Metrics**

| Metric | Value |
|--------|-------|
| Physical Integration | Ultimate lock-in (highlighted blue) |
| Hardware Drag | Scanners, sensors, PLCs |
| Client Lifetime | 10+ years (highlighted blue) |
| Revenue Type | Differentiation Asset |

| **Metrics Title** | "Your Revenue Model: Differentiation" |

---

## Section 3: The "Land and Expand" Strategy — Customer Lifecycle Management

**Purpose:** Visualize the 4-phase account takeover strategy. Maps to PRD Section 2.2, Section 3 "Cross-Sell Visual."

| Element | Specification |
|---------|---------------|
| **Layout** | Horizontal 4-phase flow with arrow connectors (vertical on mobile) |
| **Background** | `linear-gradient(180deg, #f8fafc 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Label** | "CUSTOMER LIFECYCLE MANAGEMENT" (JetBrains Mono, `#3798E4`) |
| **Section Headline** | "The 'Land and Expand' Strategy" |
| **Section Subhead** | "You're not selling software. You're executing a 4-phase account takeover strategy." |

### Lifecycle Phases

| Phase | Number | Color | Title | Products | Description | Revenue Type |
|-------|--------|-------|-------|----------|-------------|-------------|
| 1 | 1 | Blue `#3798E4` | Land | iGP (Volume) or eMES (Reverse Cut) | Entry point with immediate value. Fast project, quick cash. | Project fees + License |
| 2 | 2 | Green `#10b981` | Stabilize | WMS | Control inventory accuracy. Solve "Ghost Inventory" pain. | Project + Hardware |
| 3 | 3 | Amber `#f59e0b` | Expand | T100 ERP | Scale to enterprise. High-value project revenue. | Enterprise project |
| 4 | 4 | Purple `#8b5cf6` | Lock | AIoT | Physical integration = permanent retention. | Subscription + Data |

### Lifecycle Proof Bar (dark box)

| Element | Content |
|---------|---------|
| **Text** | "**This isn't just software—it's a Customer Lifecycle Management strategy that compounds revenue over years.**" |

---

## Section 4: The Reverse Cut Strategy

**Purpose:** Detail the strategy for winning SAP/Oracle accounts without rip-and-replace. Maps to PRD Section 2.2.3 "reverse cut" concept.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column phase cards, followed by dark comparison table |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1100px |

| Element | Content |
|---------|---------|
| **Section Label** | "THE REVERSE CUT STRATEGY" (JetBrains Mono, `#f59e0b`) |
| **Section Headline** | "How to Win SAP & Oracle Accounts" |
| **Section Subhead** | "Don't fight the castle at the front gate. Enter through the factory door with MES, make yourself indispensable, and win the ERP business from the inside out." |

### Reverse Cut Phase Cards

| Phase | Tag | Title | Description | Client Quote |
|-------|-----|-------|-------------|-------------|
| 1 | "Phase 1" | The Wedge | Sell eMES as the "Shop Floor Enforcer" that fixes production data accuracy. **"Keep SAP for Finance. Use Digiwin for the factory floor."** | "Finally, I can see what's actually happening on the floor." |
| 2 | "Phase 2" | The Contrast | Client realizes Digiwin eMES is flexible and "manufacturing-native" while their legacy ERP is rigid. The "integration tax" of maintaining two systems becomes annoying. | "Why is updating SAP so painful when Digiwin just works?" |
| 3 | "Phase 3" | The Replacement | When legacy ERP needs upgrade or license renewal, propose T100. **"You already run your factory on Digiwin. Why not run your books on it too?"** | "Let's just consolidate everything on Digiwin." |

### Why It Works: Lower Risk Threshold (dark comparison table)

| Element | Specification |
|---------|---------------|
| **Layout** | Dark box (`linear-gradient(135deg, #253B50, #1a2e40)`), 3-column comparison |
| **Title** | "Why It Works: Lower Risk Threshold" |

| Metric | Full ERP Replacement (red, strikethrough) | eMES Entry / Reverse Cut (green) |
|--------|------------------------------------------|----------------------------------|
| Budget | 5M+ THB | ~1M THB |
| Timeline | 9-18 months | 3-6 months |
| Disruption | High (rip-and-replace) | Low (overlay) |
| Client Risk | High | Low |

---

## Section 5: Competitive Positioning — Sales Talking Points

**Purpose:** Arm partners with specific competitive talking points for sales conversations. Not in PRD Section 2.2 spec but serves the "what you need to sell it" intent.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column competitive cards, followed by dark "Ace Card" callout |
| **Background** | `linear-gradient(180deg, #f8fafc 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Label** | "COMPETITIVE POSITIONING" (JetBrains Mono, `#8b5cf6`) |
| **Section Headline** | "Your Talking Points for Sales Conversations" |
| **Section Subhead** | "How to position DigiWin against the competition in any sales conversation." |

### Competitive Card 1: vs. SAP Business One / NetSuite

| Element | Content |
|---------|---------|
| **Tag** | "vs. SAP Business One / NetSuite" (red tag) |
| **Title** | "They Stop at the Office Door" |
| **Point 1** | **The Manufacturing Void:** SAP B1 and NetSuite treat manufacturing as simple kitting. They struggle with Thai production realities—mold management, regrind (scrap reuse), complex sub-contracting loops. We handle these natively. |
| **Point 2** | **The Phantom Problem:** Competitors force you to create thousands of 'dummy' inventory transactions for Phantom BOMs. Digiwin manages this automatically, keeping warehouse data clean. |
| **Point 3** | **The Cost of "Good Enough":** To make NetSuite handle deep manufacturing, you need 3rd party SuiteApps. This increases TCO and creates "version lock" risks. Digiwin's MES/WMS are native. |
| **Use When** | Client has SAP B1/NetSuite but complains about production visibility. |

### Competitive Card 2: vs. SAP S/4HANA / Oracle

| Element | Content |
|---------|---------|
| **Tag** | "vs. SAP S/4HANA / Oracle" (red tag) |
| **Title** | "Tier-1 Capability, No German Logic" |
| **Point 1** | **Agility vs. Rigidity:** SAP forces rigid "German Logic"—linear processes that break when rush orders arrive or machines fail. Digiwin T100 handles urgent order splitting and mid-production changes without rolling back schedules. |
| **Point 2** | **Total Cost Advantage:** We deliver 90% of Tier-1 capability at ~70% of the price. Shorter implementation (6-9 months vs. 12-18 months) using pre-built Automotive/Electronics templates. |
| **Point 3** | **Hidden License Fees:** Unlike Oracle where audit risks and "named user" costs spiral, Digiwin offers transparent pricing for high-volume shop floor users. |
| **Use When** | Client is evaluating SAP/Oracle but has budget concerns or flexibility needs. |

### Competitive Card 3: vs. Thai Vendors / Odoo

| Element | Content |
|---------|---------|
| **Tag** | "vs. Thai Vendors / Odoo" (red tag) |
| **Title** | "Scale Without the Dead End" |
| **Point 1** | **The Vanishing Vendor:** Local ERPs are 30% cheaper but lack R&D budget to survive the next tech shift (AI, IoT). Digiwin is publicly listed (300378) with 44 years of history and Foxconn backing. |
| **Point 2** | **The Feature Ceiling:** Odoo hits a complexity wall when you need real-time machine integration (IoT) or traceability for ISO/IATF audits. Digiwin has these built-in. |
| **Point 3** | **Financial Credibility:** Your bank and auditors know Digiwin. Using T100 or iGP helps with IPO preparation and loan approvals in ways custom-built local software cannot. |
| **Use When** | Client is tempted by low-cost local options or Odoo. |

### The Ace Card (dark callout box)

| Element | Specification |
|---------|---------------|
| **Layout** | Dark box (`linear-gradient(135deg, #253B50, #1a2e40)`) with dot pattern, centered text |

| Element | Content |
|---------|---------|
| **Label** | "THE ACE CARD" (JetBrains Mono, `#f59e0b`, letter-spacing 3px) |
| **Quote** | "SAP manages your General Ledger. Local software manages your Invoices. **Digiwin manages your Factory Floor.** We are the only ones who understand that the physical reality of a Thai production line doesn't always match the accounting rules." |

---

## Section 6: Final CTA

**Purpose:** Bridge to economics page and conversion. PRD Section 2.2 says "Explore Each Product" or "Discuss Your Portfolio."

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with dual CTAs |
| **Background** | `linear-gradient(135deg, #3798E4 0%, #2d7bc4 50%, #1e5a8a 100%)` with dot pattern |
| **Padding** | 100px top/bottom |
| **Max Width** | 800px |

| Element | Content |
|---------|---------|
| **Headline** | "Now See the Actual Economics" |
| **Body** | "You've seen the arsenal. Now see the math—margins, recurring revenue, and 5-year projections for your business." |
| **Primary CTA** | "See Partner Economics →" → `economics.html` (class: `dw-btn dw-btn-white`) |
| **Secondary CTA** | "Schedule Discovery Call" → `demo.html` (class: `dw-btn dw-btn-outline-white`) |

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **1024px** | Product cards → 1-col (RTL direction overridden); Lifecycle phases → vertical column (arrows rotate 90deg); Reverse Cut grid → 1-col; Comparison table → 1-col centered; Competitive grid → 1-col; Hero stats → 1-col |
| **640px** | Hero padding reduced; H1 → 28px; Product card padding reduced; Section headlines → 32px; Ace card padding + quote text reduced; Reverse Cut comparison padding reduced |

---

## Flags & Notes

1. **Competitor Naming — Extensive and Acceptable:** This page names SAP, Oracle, NetSuite, Kingdee, Yonyou, Odoo, and references Foxconn. Per Playbook rules, Track B pages may name competitors for competitive positioning. However, the competitive positioning section is very aggressive — claims like "German Logic" and "The Phantom Problem" should be factually defensible.

2. **"Foxconn Backing" Claim:** The competitive card vs. Thai Vendors mentions "Foxconn backing." This should be verified. DigiWin is publicly listed (300378) but the nature of the Foxconn relationship should be confirmed before using it as a sales point.

3. **"90% of Tier-1 capability at ~70% of the price":** This is a specific claim in the SAP/Oracle competitive card. Should be validated or softened to "comparable capability at a fraction of the price."

4. **CTA Body says "5-year projections":** The body text says "5-year projections" but the Economics page only shows 3-year projections. This is a content inconsistency.

5. **CTA Link — `demo.html`:** Secondary CTA links to `demo.html`. Same no-demo concern as other pages.

6. **CTA Link — Relative Path:** Primary CTA links to `economics.html` (relative). Should resolve correctly within the `partner-program/` directory.

7. **Product Links May Not Exist:** Product cards link to `products/erp.html`, `products/mes.html`, `products/aiot.html`. These pages may not exist yet. Per project rules: "Never link to pages that don't exist. Check actual files before adding navigation."

8. **PRD Deviation — Consolidated Products:** PRD specifies 3 separate sub-pages (2.2.1 T100, 2.2.2 iGP, 2.2.3 AIoT & MES). The current build consolidates all products into a single Solutions page with product cards. This is a reasonable simplification — 4 products on one page vs. 3 separate pages — but means the PRD sub-page specs (2.2.1, 2.2.2, 2.2.3) are implemented as sections rather than pages.

9. **"The Reverse Cut Strategy" Section:** This is one of the strongest strategic sections on the site, directly mapping to the VP's documented "Reverse Cut" sales strategy from internal transcripts. The 3-phase narrative (Wedge → Contrast → Replacement) with client experience quotes is compelling.

10. **Missing from PRD:** The Competitive Positioning section is not specified in PRD Section 2.2. It was added during the build and provides significant sales enablement value. Consider adding it to the PRD as an approved section.

11. **Inline CSS:** This page has ~765 lines of inline CSS — the largest of the partner pages. Product card layouts, lifecycle phases, reverse cut grid, and competitive cards are all page-specific patterns. Some elements (breadcrumb, hero, CTA section) overlap with other partner pages and should be extracted to `styles.css`.

12. **Dynamic Year:** The "44 years" stat uses the `dw-years` class for dynamic calculation via `digiwin-dynamic.js`. This is correctly implemented.
