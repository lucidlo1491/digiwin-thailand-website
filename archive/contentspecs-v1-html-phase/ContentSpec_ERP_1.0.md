# Content Spec: ERP Core — T100 & iGP (PRD Section 3.1)

**Batch:** Batch 2
**PRD Reference:** Section 3.1 — ERP Core: T100 & iGP
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v1.2 — Intelligence integrated, competitor naming resolved, BOI enforcement added
**Last Updated:** February 13, 2026

---

## Page Overview

**Audience:** Factory operators evaluating ERP options — CFOs, finance managers, plant managers
**Objective:** Show the right ERP for their size (T100 = enterprise, iGP = growth). Lead with financial pain, not features.
**URL:** digiwin.co.th/products/erp.html
**Emotional Arc:** Leaf Page Arc Track A (Playbook 3.2) — Pain Validation → Relief/Solution → Proof → Gentle Nudge

---

## Section 1: Hero

**Purpose:** Financial control + visibility. Pain-first headline.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid (1fr 1fr), 60px gap. Left = content, Right = dashboard mockup (hidden on tablet/mobile) |
| **Background** | Dark gradient: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)` with grain overlay |
| **Padding** | 160px top, 100px bottom |
| **Background illustration** | SVG: ERP dashboard/chart visual, right-aligned, 55% width, 0.12 opacity |

| Element | Content |
|---------|---------|
| **Badge** | `Core System • ERP` (with pulsing blue dot) |
| **Headline** | `Your Finance Team Deserves Better Than` `Month-End Surprises` (highlight) |
| **Subtitle** | `Real-time cost visibility. Accurate BOMs. Inventory that matches reality. ERP designed for how manufacturing actually works—not how accountants imagine it does.` |
| **Primary CTA** | `Let's Talk` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `Compare T100 vs iGP` → `#products` (outline white, anchor link) |

### Hero Stats

| # | Value | Label |
|---|-------|-------|
| 1 | `44` (dw-years dynamic) | Years in Mfg |
| 2 | `50K+` | Factories |
| 3 | `100+` | Thai Sites |

### Hero Dashboard Mockup (right column)

Browser-chrome styled mockup with:
- 3 traffic light dots (red/yellow/green)
- Navigation tabs: Dashboard (active), Production, Inventory, Finance
- 3 metric cards: Today's Output `1,247` (green), Pending Orders `38`, Margin `24.3%` (blue)
- Bar chart with 7 bars at varying heights

---

## Section 2: Pain Points (Problem → Solution)

**Purpose:** Validate factory ERP pain points and show DigiWin solutions

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid, 28px gap |
| **Background** | White (#ffffff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section label** | `Sound Familiar?` (red label: #dc2626) |
| **Section title** | `Manufacturing Challenges, Solved` |
| **Section subtitle** | `Generic ERP wasn't built for factories. These problems disappear when your system understands manufacturing.` |

### Pain Cards (Problem → Solution format)

Each card has: red icon (transitions to blue gradient on hover), problem section (dashed border bottom), solution section.

| # | Problem | Problem Description | Solution Title | Solution Description |
|---|---------|-------------------|----------------|---------------------|
| 1 | "We don't know our true costs until month-end" | Standard cost variance buried in accounting entries. Material waste discovered weeks after production. No visibility into real-time margin. | Real-Time Cost Visibility | Actual cost calculated at each production stage. Margin visibility before you ship, not after you invoice. |
| 2 | "MRP gives us garbage because our BOMs are outdated" | Engineering changes happen on the floor, not in the system. BOM versions scattered across spreadsheets. | Engineering Change Control | ECN workflow ensures changes are captured before production. MRP always runs against current, approved BOMs. |
| 3 | "Inventory count never matches the system" | Ghost inventory haunts every audit. Production consumes materials that don't exist. Purchasing reorders what you already have. | Transaction-Level Accuracy | Every material movement captured at source. Barcode scanning enforced at key points. Cycle counting built in. |
| 4 | "We can't trace quality issues back to their source" | Customer complaints trigger panic investigations. Lot numbers exist somewhere, maybe. Root cause analysis takes weeks. | Complete Traceability | Lot tracking from receiving to shipping. One click shows full genealogy. Quality data linked to batches, machines, operators. |

---

## Section 3: Two Products Comparison

**Purpose:** Clear segmentation between T100 (enterprise) and iGP (growth)

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid, 32px gap |
| **Background** | Light gray (#F5F7FA) |
| **Padding** | 100px top/bottom |
| **ID** | `#products` (anchor target for hero CTA) |

| Element | Content |
|---------|---------|
| **Section label** | `Choose Your Scale` |
| **Section title** | `Two ERPs, One Philosophy` |
| **Section subtitle** | `Manufacturing-first design that grows with your business. Start where you are, scale when ready.` |

### Product Cards

| Element | T100 | iGP |
|---------|------|-----|
| **Badge** | `Enterprise Scale` | `Growth Stage` |
| **Name** | `T100` | `iGP` |
| **Tagline** | Full ERP for complex operations | Right-sized for growing factories |
| **Description** | Multi-site, multi-currency, multi-company—built for enterprises that need complete control across complex, distributed operations. | All the manufacturing-specific features you need without the enterprise complexity you don't. Fast to implement, easy to master. |
| **Features** | Multi-company consolidation, Advanced financial reporting, Complex BOM with ECN, Enterprise workflow engine, Advanced MRP/APS, BI suite included | Complete financials & inventory, Production planning & MRP, Quality management, Procurement & sales, Standard dashboards, Rapid implementation |
| **Best For** | 200+ employees, multi-site, complex supply chains, group companies needing consolidation | 50-200 employees, single site, straightforward operations, moving beyond spreadsheets |

### iGP ERPII Ecosystem (Expandable Section Below iGP Card)

**Purpose:** Show iGP is not "just an ERP" — it's a complete ERPII platform. Addresses the "will we outgrow it?" objection.

| Element | Specification |
|---------|---------------|
| **Layout** | Expandable accordion below iGP card. Collapsed by default with teaser text. |
| **Teaser** | `iGP is more than ERP →` (clickable, blue text) |
| **Expanded title** | `Start with ERP. Expand into Everything.` |
| **Expanded subtitle** | `iGP is a complete ERPII platform. Start with financials and production, then add modules as you grow — no system change required.` |

**ERPII Modules Grid (3-column, 16px gap):**

| Module | Label | One-liner |
|--------|-------|-----------|
| BI / KPI | Business Intelligence | Executive dashboards and balanced scorecard |
| SCM | Supply Chain | End-to-end visibility from supplier to customer |
| PLM | Product Lifecycle | BOM, process, and drawings integration |
| APS | Advanced Planning | Finite capacity scheduling and optimization |
| MES / SFT | Shop Floor | Real-time production tracking and execution |
| CRM | Customer Management | Quotation to order to relationship |

**Style:** Small icon cards, light gray bg, 12px radius. Each module card: icon + label + one-liner.

### iGP "Proven In" Tag (Below iGP Card Description)

Add after iGP tagline: `Proven across auto parts, food, electronics, machinery, fasteners, and 12 more manufacturing verticals.` (small text, #666, italic)

### T100 Trust Callout (Below T100 Card)

**Purpose:** Neutralize Objection 3 (vendor lock-in) from Playbook 4.1.

| Element | Specification |
|---------|---------------|
| **Layout** | Callout box with lock-open icon, inside T100 card area |
| **Background** | Light blue-tinted (#f0f9ff), 1px border #00AFF0, 12px radius |
| **Icon** | Open padlock (SVG, #00AFF0) |
| **Title** | `Your Data Belongs to You` |
| **Body** | `Full source code transfer included. Your system, your data, your independence — no vendor lock-in, ever. Plus: 3-month go-live target and 24/7 e-Service & e-Learning support.` |

### Use-Case ERP Navigation (New — from CPL Landing Page Intelligence)

**Purpose:** The official CPL landing page segments ERP by *use case* (not company size), which is more intuitive for Thai factory operators who think about their problems, not product tiers.

| Element | Specification |
|---------|---------------|
| **Layout** | 5 small pill buttons above the T100/iGP comparison, acting as quick-filters or interest signals |
| **Background** | Transparent, within the Section 3 area |
| **Style** | Pill buttons: #F5F7FA bg, 8px radius, 13px text. Active: #00AFF0 bg, white text |

**5 Use-Case Pills:**

| Pill | Maps To | Description |
|------|---------|-------------|
| Warehouse ERP | iGP + WMS | Inventory & logistics focused |
| Smart Factory ERP | T100/iGP + MES | MES + shop floor integration |
| Cloud ERP | iGP Cloud | Subscription model |
| Financial ERP | iGP/T100 | Accounting & compliance focused |
| Custom ERP | T100 | Tailored to specific industry needs |

**Behavior:** Clicking a pill highlights the relevant product card and scrolls to its features. This is a navigation aid, not a separate product line.

---

## Section 4: Core Capabilities

**Purpose:** Technical capability overview (8 modules in grid)

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid, 24px gap |
| **Background** | White (#ffffff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section label** | `What's Inside` |
| **Section title** | `Core ERP Capabilities` |

### Capability Cards

| # | Title | Description |
|---|-------|-------------|
| 1 | Financial Control | Multi-currency, multi-company. Real-time cost visibility. Automated consolidation. |
| 2 | Inventory Management | Lot tracking. Multiple locations. Cycle counting. Min/max automation. |
| 3 | Production Planning | MRP/APS engine. Capacity planning. Work order dispatch. Schedule optimization. |
| 4 | Quality Management | IQC/OQC/IPQC. NCR tracking. CAPA management. SPC integration ready. |
| 5 | Procurement | Supplier management. RFQ/PO workflow. Blanket orders. Receiving inspection. |
| 6 | Sales & CRM | Quotation to order. ATP checking. Customer credit control. Delivery scheduling. |
| 7 | Reporting & BI | Pre-built manufacturing reports. Custom dashboards. Excel export. Mobile access. |
| 8 | Integration | Native MES/WMS/AIoT connection. API for third-party. EDI for customers. |

---

## Section 5: Technical Advantages (Competitive Weapons)

**Purpose:** 7 differentiators that no competitor can match — the sales team's technical arsenal

| Element | Specification |
|---------|---------------|
| **Layout** | Auto-fit grid (min 340px columns), 24px gap. Uses inline styles (not extracted to CSS). |
| **Background** | Light gray (#F5F7FA) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section label** | `What Sets DigiWin Apart` |
| **Section title** | `7 Technical Advantages No Competitor Can Match` |
| **Section subtitle** | `These aren't minor features — they're fundamental architectural capabilities that address real Thai manufacturing challenges.` |

### Weapon Cards

| # | Title | Code | Description | Why It Matters |
|---|-------|------|-------------|----------------|
| 1 | Advanced Material Requirements Planning | AMRP | Capacity planning built directly into the ERP. Schedule production based on actual machine capacity, material availability, and labor constraints — all calculated in one system. | Most ERP vendors require a separate APS purchase for this capability. DigiWin builds it in. |
| 2 | Co-Product Accounting | Multi-Output Work Orders | One work order produces multiple outputs with accurate cost allocation per product. Essential for plastics injection, food processing, and chemical manufacturing. | Most traditional ERP systems cannot handle native co-product work orders — they force workarounds that break cost accuracy. |
| 3 | Lot Requirements Planning | LRP | Calculate material requirements for a specific production order in under one minute. No waiting hours for a full MRP run to answer "can we accept this order?" | Traditional MRP systems take hours. LRP gives answers in minutes — critical for responsive quoting. |
| 4 | Dual Unit Tracking | Simultaneous UOM Display | Display and track both weight (kg) and quantity (pieces) simultaneously across all transactions. No conversions, no rounding errors, no confusion. | Many mid-market ERP systems can only display one unit of measure at a time — a daily frustration for manufacturers dealing in both weight and quantity. |
| 5 | Shop Floor Mini-Scheduling | Real-Time Floor Adjustments | Floor supervisors adjust production schedules in real-time, and changes are immediately visible to planning. Bridge the gap between the plan and reality. | This level of bidirectional floor-to-planning visibility is unique to DigiWin's manufacturing heritage. |
| 6 | Feature Codes | Multi-Dimension Variants | Manage product variants across up to 3 dimensions (color, size, grade) under a single item code. Turn 27 SKUs into 1 manageable product with full traceability. | Reduces item master complexity by 90%+ for variant-heavy manufacturers. |
| 7 | BOI Reconciliation | Production-Order-Level Tracking | Track actual material consumption at the production order level — not theoretical BOM calculations. Generate BOI-ready reports that match what the Board of Investment audits. | No other ERP vendor in Thailand offers production-order-level BOI material reconciliation. |

### BOI Callout Box

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid, dark navy gradient background (#000864 → #1e3a5f), 48px padding, 20px radius |
| **Label** | `Proven Results` |
| **Title** | `From 10M THB/Year to Zero in Supplementary Taxes` |
| **Body** | When the BOI board audited one of our clients, DigiWin's production-order-level reconciliation showed exact material consumption — no gaps, no guesswork. The result: supplementary taxes dropped from over 10 million baht annually to zero. |
| **CTA** | `Read the Full Story →` → `{{basePath}}blog/boi-compliance-jin-hai.html` |
| **Right column** | Large stat display: `10M+` THB/year saved → `Zero` supplementary taxes in 2025 |

### BOI 2026 Enforcement Alert (New — from Webinar Intelligence)

**Purpose:** Urgency driver. The BOI is actively tightening enforcement in 2026. This section connects current regulatory pressure to DigiWin's capability.

| Element | Specification |
|---------|---------------|
| **Layout** | Alert-style box below the BOI callout, amber-tinted border (#FFD700 left border, 4px) |
| **Background** | `#FFFBEB` (very light amber) |
| **Icon** | Warning triangle (amber) |
| **Title** | `2026 BOI Enforcement Is Tightening` |
| **Body** | The Board of Investment is cracking down on four areas that directly affect your factory: |

**4 Enforcement Focus Areas (bullet list):**

| # | Risk Area | What BOI Is Checking | How DigiWin Solves It |
|---|-----------|---------------------|----------------------|
| 1 | Double bookkeeping (两套账) | Separate books for BOI vs actual operations | Single integrated system — one database, one truth |
| 2 | Inventory book-physical mismatch | System inventory doesn't match physical count | WMS barcode scanning + cycle counting = 95%+ accuracy |
| 3 | BOI / non-BOI filing confusion | Mixed materials in BOI and non-BOI production | Production-order-level tracking separates BOI from non-BOI automatically |
| 4 | Tariff recovery & qualification revocation | Ultimate consequence of non-compliance | Full audit trail from receiving to shipping — BOI-ready reports on demand |

**Source:** DigiWin Thailand BOI 2026 webinar (January 28, 2026) — speakers: 许智豪, 林海波, 林建逸
**CTA:** `Worried about BOI compliance? Let's Talk →` → `{{basePath}}demo.html`

---

## Section 6: Integration

**Purpose:** Show ERP connects to the entire DigiWin ecosystem

| Element | Specification |
|---------|---------------|
| **Layout** | Horizontal flow: ERP (active) ↔ MES ↔ WMS ↔ AIoT |
| **Background** | `linear-gradient(180deg, #F5F7FA 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section label** | `Beyond the Office Door` |
| **Section title** | `ERP That Reaches the Floor` |
| **Section subtitle** | `Unlike generic ERP, DigiWin connects directly to your shop floor operations.` |
| **Integration message** | `One click in ERP releases a work order to the floor. One scan on the floor updates ERP inventory. No batch uploads. No manual reconciliation.` **`One database. One truth.`** |

### Integration Links

| Link | Target |
|------|--------|
| Explore MES | `mes.html` |
| Explore WMS | `wms.html` |
| Explore AIoT | `aiot.html` |

---

## Section 7: CTA

**Purpose:** Convert visitors to contact

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with button row |
| **Background** | Blue gradient: `linear-gradient(135deg, #00AFF0 0%, #2d7bc4 50%, #1e5a8a 100%)` with grain texture |
| **Padding** | 120px top/bottom |

| Element | Content |
|---------|---------|
| **Title** | `Ready to See What's Possible?` |
| **Subtitle** | `Fill out the form and our team will reach out to discuss your specific manufacturing challenges.` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `View by Industry` → `{{basePath}}industries.html` (outline white button) |

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **<= 1024px** | Hero: single column, centered. Dashboard mockup: hidden. Pain grid & product comparison: 1-column (max 600px). Capabilities: 2-column. Integration: vertical flow. BOI callout: 1-column centered. |
| **<= 640px** | Hero: padding 120px/80px. Stats: vertical column layout. |

---

## Flags & Notes

1. **PRD ALIGNMENT — GOOD**: Hero headline matches PRD spirit ("Financial control + visibility"). Pain→Solution format matches PRD Section 3.1. T100 vs iGP comparison is clear.
2. **PRD ALIGNMENT — EXCEEDS**: The page has 7 sections vs PRD's 3. Sections 4 (Capabilities), 5 (Technical Advantages), and 6 (Integration) are additions. These are valuable and align with the Playbook's proof escalation pattern.
3. **COMPETITOR NAMING — RESOLVED v1.2**: Previously named Oracle, SAP, Kingdee, Yonyou directly. Now uses "most ERP vendors", "traditional ERP systems", "many mid-market ERP systems" — compliant with PRD rule.
4. **BOI CASE STUDY**: The BOI callout links to `blog/boi-compliance-jin-hai.html` — verify this page exists. The "10M THB/year to Zero" claim matches cross-checked data.
5. **STATS VERIFICATION**: "44 years" (dynamic), "50K+", "100+" — all consistent with verified data.
6. **CTA COMPLIANCE**: All CTAs say "Let's Talk" or "Get in Touch" — compliant with PRD rules. No "Book a Demo" anywhere.
7. **INLINE CSS**: ~998 lines of inline CSS. Section 5 (Technical Advantages) uses heavy inline styles instead of CSS classes — extraction opportunity.
8. **INLINE STYLES in Section 5**: The entire "7 Technical Advantages" section uses inline `style=` attributes on every element rather than CSS classes. This should be refactored to use proper CSS classes on next touch.
9. **ERPII ECOSYSTEM — INTEGRATED v1.2**: Expandable accordion section spec added below iGP card. Shows 6 ERPII modules (BI, SCM, PLM, APS, MES/SFT, CRM).
10. **16 INDUSTRY VERTICALS — INTEGRATED v1.2**: "Proven In" tag line added to iGP card with Thai-relevant verticals.
11. **SOURCE CODE TRANSFER — INTEGRATED v1.2**: Trust callout box spec added below T100 card. Directly neutralizes Playbook Objection 3 (vendor lock-in).
12. **T100 e-COMMERCE PLATFORM**: The official site shows T100 has a full B2B/B2C e-commerce layer. NOT relevant for Thai market now — flagged for future reference only.
13. **APS FINITE CAPACITY**: Covered by Weapon #1 (AMRP). No additional spec change needed.
14. **[NEW v1.2] BOI 2026 ENFORCEMENT**: Alert-style section added after BOI callout with 4 enforcement focus areas from Jan 2026 webinar. Urgency driver for factories currently non-compliant.
15. **[NEW v1.2] USE-CASE NAVIGATION**: 5 ERP use-case pills added above T100/iGP comparison (from CPL landing page intelligence). Visitors self-select by problem, not company size.
16. **[NEW v1.2] COMPETITOR NAMING RESOLVED**: All competitor names removed from Section 5. Uses generic references per PRD rule.
