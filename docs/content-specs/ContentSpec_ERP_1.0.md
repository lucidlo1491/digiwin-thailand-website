# Content Spec: ERP Core — T100 & iGP (PRD Section 3.1)

**Batch:** Batch 2
**PRD Reference:** Section 3.1 — ERP Core: T100 & iGP
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

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

| # | Title | Code | Description | Competitor Comparison |
|---|-------|------|-------------|----------------------|
| 1 | Advanced Material Requirements Planning | AMRP | Capacity planning built directly into the ERP. Schedule production based on actual machine capacity, material availability, and labor constraints — all calculated in one system. | Oracle and SAP require a separate APS purchase for this capability. |
| 2 | Co-Product Accounting | Multi-Output Work Orders | One work order produces multiple outputs with accurate cost allocation per product. Essential for plastics injection, food processing, and chemical manufacturing. | SAP, Kingdee, and Yonyou cannot handle native co-product work orders. |
| 3 | Lot Requirements Planning | LRP | Calculate material requirements for a specific production order in under one minute. No waiting hours for a full MRP run to answer "can we accept this order?" | Traditional MRP systems take hours. LRP gives answers in minutes. |
| 4 | Dual Unit Tracking | Simultaneous UOM Display | Display and track both weight (kg) and quantity (pieces) simultaneously across all transactions. No conversions, no rounding errors, no confusion. | SAP Business One can only display one unit of measure at a time. |
| 5 | Shop Floor Mini-Scheduling | Real-Time Floor Adjustments | Floor supervisors adjust production schedules in real-time, and changes are immediately visible to planning. Bridge the gap between the plan and reality. | No competitor offers this level of bidirectional floor-to-planning visibility. |
| 6 | Feature Codes | Multi-Dimension Variants | Manage product variants across up to 3 dimensions (color, size, grade) under a single item code. Turn 27 SKUs into 1 manageable product with full traceability. | Reduces item master complexity by 90%+ for variant-heavy manufacturers. |
| 7 | BOI Reconciliation | Production-Order-Level Tracking | Track actual material consumption at the production order level — not theoretical BOM calculations. Generate BOI-ready reports that match what the Board of Investment audits. | No competitor offers production-order-level BOI material reconciliation. |

### BOI Callout Box

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid, dark navy gradient background (#000864 → #1e3a5f), 48px padding, 20px radius |
| **Label** | `Proven Results` |
| **Title** | `From 10M THB/Year to Zero in Supplementary Taxes` |
| **Body** | When the BOI board audited one of our clients, DigiWin's production-order-level reconciliation showed exact material consumption — no gaps, no guesswork. The result: supplementary taxes dropped from over 10 million baht annually to zero. |
| **CTA** | `Read the Full Story →` → `{{basePath}}blog/boi-compliance-jin-hai.html` |
| **Right column** | Large stat display: `10M+` THB/year saved → `Zero` supplementary taxes in 2025 |

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
3. **COMPETITOR NAMING**: Section 5 names competitors directly: "Oracle", "SAP", "SAP Business One", "Kingdee", "Yonyou". The PRD/CLAUDE.md says "Never name competitors directly." This is a **violation** that should be reviewed. Consider replacing with "other ERP vendors" or "generic ERP systems."
4. **BOI CASE STUDY**: The BOI callout links to `blog/boi-compliance-jin-hai.html` — verify this page exists. The "10M THB/year to Zero" claim matches cross-checked data.
5. **STATS VERIFICATION**: "44 years" (dynamic), "50K+", "100+" — all consistent with verified data.
6. **CTA COMPLIANCE**: All CTAs say "Let's Talk" or "Get in Touch" — compliant with PRD rules. No "Book a Demo" anywhere.
7. **INLINE CSS**: ~998 lines of inline CSS. Section 5 (Technical Advantages) uses heavy inline styles instead of CSS classes — extraction opportunity.
8. **INLINE STYLES in Section 5**: The entire "7 Technical Advantages" section uses inline `style=` attributes on every element rather than CSS classes. This should be refactored to use proper CSS classes on next touch.
