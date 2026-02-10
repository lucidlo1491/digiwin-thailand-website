# Product Knowledge for Distributor Website (from Google Drive)

> **Sources:** T100 Presale (transcript), T100 Presale 2 (transcript), ADDENDUM A: eMES Product Terms, ADDENDUM B: T100 Product Terms, ADDENDUM C: WorkFlow ERP Product Terms, WordPress Architecture & Key Concepts for Digiwin Distributor Website
>
> **Last Updated:** 2026-02-09

---

## T100 ERP -- Overview & Modules

### What T100 Is
T100 is DigiWin's flagship **enterprise-grade ERP system** designed specifically for **multi-company, multi-site manufacturing groups**. It targets mid-to-large enterprises with complex organizational structures, especially those operating across borders.

### Core Architecture
- **Single Database Architecture:** All sites/subsidiaries share one unified database, enabling fast cross-company data exchange, consolidated reporting, and real-time transactions.
- **Multi-Language:** Supports Traditional Chinese, Simplified Chinese, English, Thai, and Vietnamese with on-the-fly UI switching.
- **Multi-Site:** Supports diverse site types -- headquarters, subsidiaries, factories, retail stores, warehouses -- each with configurable parameters (whether it handles accounting, budgets, logistics, etc.).
- **Multi-Tax:** Built-in support for different national tax regimes (Thai, Vietnamese, Taiwanese, IFRS, etc.) with automatic conversion between accounting standards.
- **Open Source Code:** T100 is an open-source-code ERP -- table schemas can be exported, enabling integration with external systems (Oracle, SAP, third-party tools) via APIs.

### Organization & Site Management
- Each site is configured with organizational attributes: Legal Entity, Operating Organization, Budget Organization, Logistics Organization, Settlement Center, Capital Center, Distribution Center.
- Factories can be cost centers only (no direct accounting), with financials rolling up to a parent company site.
- **Reference Table Types:** Shared master data (chart of accounts, tax codes, exchange rates, document types) can be defined once at the group level and assigned to any site, eliminating redundant setup when expanding to new locations.

### Key Functional Modules

**1. Financial Management (3-Layer Architecture)**
- **Business Layer:** Daily transactions -- purchasing, sales, production, manufacturing, payments.
- **Accounting Layer:** Automatic generation of accounting entries (double-entry draft vouchers) from business transactions. Accountants review drafts, then confirm to post official vouchers to the General Ledger.
- **Group Layer:** Automatic conversion between local accounting standards (TFRS for Thailand, VAS for Vietnam) and group standards (IFRS) for consolidated reporting.
- **Parallel Accounts:** Maintain multiple sets of books simultaneously (e.g., local TFRS + group IFRS) with full audit trail between them. Supports different exchange rate methods (average rate vs. period-end rate).
- **Credit Control (Dual-Direction):**
  - Control credit limits for a single customer across your entire group of companies (group-to-customer).
  - Control credit limits for a single customer's group of affiliated companies (customer-group-to-you).
  - Configurable release percentages at each stage: order, shipment, AR invoice, payment receipt.
  - Three enforcement modes: warning only, hard block, or silent logging for reporting.

**2. Manufacturing / Production**
- **BOM (Bill of Materials):** Full multi-level BOM with Engineering BOM (EBOM) to Manufacturing BOM (MBOM) management. Group-level EBOM can be split and assigned to different factory sites with controlled modification permissions.
- **Routing / Process Planning:** Visual drag-and-drop routing designer supporting linear, parallel, network, alternative, and unsequenced process flows.
- **Work Orders (WO):** Complete production workflow -- order-driven or plan-driven work orders, material issuance, labor/overhead reporting, completion, QC inspection, inventory receipt.
- **Rework & Return Processing:** Full support for in-process rework (return to prior workstation with cost tracking) and post-completion rework (issue finished goods, rework, re-receive with proper cost allocation to avoid infinite loops).
- **Backflush (Reverse Material Deduction):** Automatic material deduction from inventory based on standard BOM upon completion, suitable for standardized/high-volume production (e.g., SMT, injection molding). Requires periodic inventory reconciliation.
- **ECR/ECN (Engineering Change):** Formal engineering change request and notice workflow for product improvements and BOM version management.

**3. AMRP (Advanced MRP)**
- **Key differentiator vs. standard MRP:** AMRP includes capacity planning (CP) in addition to material planning (MP). Standard MRP assumes infinite capacity; AMRP considers at least the key bottleneck workstation's capacity constraint.
- **Key Material Calculation:** Backward scheduling from delivery date to determine if materials can arrive in time. If not feasible, forward scheduling from today to calculate the earliest possible delivery date.
- **Capacity Scheduling:** Same backward-then-forward logic applied to production line capacity, accounting for already-committed capacity (blocked time slots).
- **Assembly Coordination (Just-In-Time):** Optimizes material arrival timing to minimize inventory holding -- materials should arrive just before production needs them, not earlier (reducing warehousing cost, capital tied up, and inventory risk).
- **Resource Priority Setting:** Configure production resources (internal lines, OEM outsourcing partners) with priority rankings and capacity limits. System allocates work based on configured priorities.
- **Rush Order Handling (Margin Recalculate):** When rush orders arrive, system recalculates remaining capacity, reassigns priorities across existing queued orders, and reschedules. Claimed to execute in seconds/minutes vs. hours for traditional MRP.
- **Performance:** Significantly faster than legacy MRP -- can be run multiple times per day for dynamic rescheduling without impacting system performance for other users.
- **Compared to Oracle/SAP:** Oracle and SAP still use standard MRP and require a separate (expensive) APS system for capacity planning. T100's AMRP is built-in at no extra cost.

**4. Product Feature Codes (Characteristic Management)**
- **Product Features:** Reduce SKU explosion by defining attributes (size, color, version, brand, thickness, etc.) as feature dimensions on a single item code instead of creating separate item codes for each variant.
  - Example: Instead of 27 SKUs for a shirt (3 sizes x 3 colors x 3 collar sizes), use 1 item code with 3 feature dimensions.
  - Cost can be shared or differentiated across features depending on business need.
- **Inventory Features:** Manage warehouse-level distinctions (original vs. second-source supplier, customer-dedicated stock) without multiplying storage locations. Prevents picking errors and enables accurate tracking.
- **Industry-specific applications:** Electronics (brand/version), apparel (size/color), solar (electrical properties), machinery (dimensions).

**5. Multi-Entity Trading (Multi-Angle Transactions)**
- **Forward Flow (Sales-driven):** HQ accepts customer order --> system auto-generates PO to factory --> factory auto-receives SO --> factory produces & ships --> HQ auto-receives --> HQ auto-ships to customer --> AR/AP auto-generated. Only 3 manual transactions needed (order entry, factory shipment, AR confirmation); all gray/intermediate steps are automated.
- **Reverse Flow (Procurement-driven):** Centralized purchasing for multiple factories to consolidate bargaining power. Factory submits material request --> HQ procures from suppliers --> distributes to factories.
- **Outsourcing Flow:** Extends multi-angle trading to contract manufacturers, supporting both materials-provided and materials-included outsourcing models.
- **Transfer Pricing:** Automatic inter-company pricing with configurable percentage margins at each entity level.
- **OBU (Offshore Business Unit) Support:** Full support for offshore/paper companies in tax-optimized structures, with automated pass-through transactions.

**6. Price Management**
- **Purchase Pricing Mechanisms:** Latest purchase price, latest vendor-specific price, latest inquiry price, lowest purchase price within period, market/average price, standard cost +/- elasticity.
- **Vendor Qualification Flow:** Inquiry --> comparison --> negotiation --> requisition --> purchase order (5-stage procurement process with full audit trail).
- **Blanket PO / Purchase Contracts:** Annual volume-based pricing with tiered price breaks (cumulative quantity thresholds). Supports both upfront discounted pricing and retrospective year-end rebates.
- **Sales Pricing:** Corresponding mechanisms for sales-side pricing.
- **BPM Integration:** Price approval workflows integrated with electronic forms (BPM) for multi-level management sign-off.

**7. Reporting & Analytics**
- **Pivot Table (built-in):** Real-time pivot analysis directly within ERP (no need to export to Excel). Drag-and-drop field selection with live data.
- **Tree Reports:** Hierarchical data analysis for any data with parent-child relationships (chart of accounts, product categories, organizational structure).
- **Cross-tabulation reports, personal reports, batch reports.**
- **Column customization:** Hide/show columns, sort, subtotal, rearrange -- all without IT involvement or re-coding.

**8. WMS & Mobile (APP)**
- Built-in mobile application integrated with ERP data (documents, delivery info, quantities, item codes).
- Mobile dashboard and operational tools -- no separate purchase or integration needed.

**9. Open API / Integration Platform**
- **Middleware platform ("Interconnection Middle Platform"):** Secure data exchange layer between T100 and external systems. External systems push/pull data through the API platform rather than directly accessing the ERP database, providing a buffer zone for security.

**10. Customization & Development Framework**
- **SA/SD Development Process:** Customer requirements documented as SA (System Analysis, human-readable wireframes) then converted to SD (System Design, table schemas and technical specs) before coding.
- **Form Types:** Basic data, Transaction, Batch processing, Parameters, Reports, Guided/wizard forms.

### T100 vs. WorkFlow ERP (Key Distinction)
- **T100:** All-in-one package. Every module included regardless of whether the customer uses it. Focused on manufacturing. Higher complexity, more flexibility, more configuration options. Designed for consultants to tailor to each client's specific processes.
- **WorkFlow ERP:** Modular purchase. Customers buy only the modules they need. More structured/rigid workflows (follow the eLearning, do it this way). Lower cost for simpler operations. Suitable for companies that don't need T100's manufacturing depth.

---

## eMES -- Manufacturing Execution System

### Product Scope (from ADDENDUM A)
eMES = "Essential Manufacturing Execution System" -- a shop-floor system that collects real-time data from machines and production processes.

### What eMES Does (from presale transcript)
- **Machine Data Collection:** Collects actual operational data from each machine (cycle counts, tool life, operating parameters).
- **Predictive Maintenance:** Example: If a tool is rated for 1M cycles but consistently fails at 900K, system can set warning at 800K to prevent unplanned downtime.
- **Labor Reporting (Work Reporting):** Track actual labor time against work orders.
- **Equipment Monitoring:** Real-time status of production equipment.
- **NOT the same as APS:** eMES focuses on actual shop-floor data collection and monitoring; APS focuses on capacity planning. They serve different purposes though there is some overlap.

### Distributor Licensing for eMES
- Distributors receive 1 set of **full-module eMES** with **5 concurrent users** at no charge for demo/testing/training (time-limited to 1 year, renewable annually).
- Distributor is responsible for hardware, network, OS, and database licenses.

---

## WorkFlow ERP -- Overview

### Product Scope (from ADDENDUM C)
WorkFlow ERP is DigiWin's **modular, process-driven ERP** system. Compared to T100:
- **Modular pricing:** Customers buy only the modules they need (no all-in-one package).
- **Structured workflows:** More prescriptive -- follows established process flows with less configurability than T100.
- **eLearning-based:** Users can follow recorded training videos and replicate the process.
- **Target audience:** Simpler operations, trading companies, smaller manufacturers who don't need T100's manufacturing depth.

### Distributor Licensing for WorkFlow ERP
- Distributors receive 1 set of **full-module WorkFlow ERP** with **10 concurrent users** at no charge for demo/testing/training (time-limited to 1 year, renewable annually).
- Distributor is responsible for hardware, network, OS, and database licenses.

---

## Module List (What Distributors Resell)

### Three Authorized Products

| Product | Target Customer | Licensing Model | Demo License for Distributors |
|---------|----------------|-----------------|-------------------------------|
| **T100 ERP** | Mid-to-large multi-site manufacturing groups | All-in-one (full module set) | Full-module, 10 concurrent users |
| **eMES** | Factories needing shop-floor execution & machine monitoring | Full module set | Full-module, 5 concurrent users |
| **WorkFlow ERP** | SMBs, trading companies, simpler manufacturers | Modular (buy what you need) | Full-module, 10 concurrent users |

### T100 Functional Areas (based on presale content)
1. **Financial Management** -- GL, AP, AR, multi-currency, multi-standard (IFRS/TFRS/VAS), parallel accounts, group consolidation
2. **Purchasing** -- PR, PO, vendor qualification (inquiry/comparison/negotiation), blanket PO, purchase contracts, price management
3. **Sales & Distribution** -- SO, shipment, delivery, RMA (return merchandise authorization), credit control
4. **Production / Manufacturing** -- Work orders, BOM, routing, material issuance, completion, QC, backflush
5. **AMRP (Advanced MRP)** -- Material planning + capacity planning + assembly coordination
6. **Inventory / Warehouse** -- Stock management, feature codes, transfers, cycle counting
7. **Product Data Management** -- Item profiles, product lifecycle, feature codes, substitution management
8. **Multi-Entity Trading** -- Inter-company transactions, transfer pricing, OBU support
9. **BPM (Business Process Management)** -- Electronic form workflows, approval chains
10. **Reporting & Analytics** -- Pivot tables, tree reports, customizable report layouts
11. **Mobile / WMS App** -- Integrated mobile operations
12. **Open API** -- Integration middleware platform

---

## Manufacturing-Specific Features

These are the features that make DigiWin products compelling for factory operators (relevant for website Track A messaging):

### BOM (Bill of Materials)
- Multi-level BOM with unlimited depth
- Engineering BOM (EBOM) to Manufacturing BOM (MBOM) with controlled modification permissions
- BOM assignment across group companies (design once, manufacture at multiple sites)
- Visual BOM structure editor

### MRP / AMRP
- **Material Requirements Planning** with key-material-first backward/forward scheduling
- **Capacity Planning** built into ERP (no separate APS purchase needed)
- **Assembly Coordination** for Just-In-Time material arrival
- **Rush order recalculation** with full reschedule in minutes
- Resource priority configuration (internal production vs. multiple OEM partners)

### Routing / Process Planning
- Visual drag-and-drop routing designer
- Five routing types: Linear, Parallel, Network, Alternative, Unsequenced
- Workstation-level capacity definition
- Quick duplication and modification of routings

### OEE-Related Capabilities
- eMES collects machine-level operational data
- Tool life tracking with predictive replacement warnings
- Production reporting (actual vs. planned)

### MES Integration
- eMES is a standalone product but designed for tight integration with T100
- Real-time shop floor data feeds back into ERP for accurate costing and scheduling

### WMS Features
- Built-in mobile warehouse operations
- Feature code-based inventory management (track by supplier brand, customer dedication, lot, etc.)
- Inter-line material transfers with proper documentation
- Backflush support for high-volume/standard production

### Quality Management
- IQC (Incoming Quality Control) at receiving
- FQC (Final Quality Control) before warehouse receipt
- RMA (Return Merchandise Authorization) with root cause tracking and rework routing

### Cost Management
- Standard costing with stage-by-stage cost rollup
- Rework cost tracking (both in-process and post-completion rework)
- Feature-code-aware costing (shared or differentiated cost by product variant)
- Transfer pricing for inter-company transactions

### Substitution / Replacement Management
- Single-item substitution (replace one material with another)
- Component-set substitution (replace an entire sub-assembly)
- Specification substitution (version/revision changes without rebuilding BOM)
- Priority-ranked substitution lists
- Customer-specific substitution rules
- Unit-of-measure conversion substitution

---

## Thai Tax & Compliance Features

### Tax System Support
- **Multi-tax architecture:** Each site can be configured for its local tax regime
- **Thai tax (TFRS):** Specifically supported as a built-in accounting standard
- **BOI (Board of Investment):** System can pre-configure document types with BOI-related reference data for BOI incentive reporting
- **Automatic tax standard conversion:** Transactions entered under TFRS can be automatically converted to IFRS for group consolidation
- **Thai Revenue Department compliance:** While not explicitly detailed in the presale transcripts, the multi-tax and reference-table architecture is designed to accommodate Thai RD requirements

### Localization
- **Thai language UI:** Full Thai language interface available
- **Thai Baht as functional currency** with multi-currency support and exchange rate management
- **Local document types:** Configurable document numbering and classification aligned with Thai business practices

---

## Key Selling Points for Website Copy

### For Factory Operators (Track A)

1. **"Built for Manufacturing, Not Bolted On"**
   - AMRP with capacity planning is built into the ERP -- no expensive APS add-on needed (unlike Oracle/SAP which require separate purchases).
   - Feature codes reduce SKU complexity by 90%+ (27 SKUs become 1 item code with 3 dimensions).
   - Complete production flow: work orders, BOM, routing, material issuance, QC, rework, backflush -- all integrated.

2. **"Your ERP Should Handle the Messy Reality"**
   - Rush order recalculation in minutes, not hours.
   - Rework cost tracking that actually works (avoids the infinite loop problem other ERPs have with issue-A-receive-A scenarios).
   - Substitution management for when materials aren't available (single item, component set, specification-level).
   - Transfer between production lines when materials run short.

3. **"Multi-Site Without Multi-Headache"**
   - Single database = instant cross-company data exchange.
   - Reference tables: set up once, assign to any new site (chart of accounts, tax codes, document types).
   - Multi-angle trading automation: 3 manual steps instead of 9 for inter-company transactions.

4. **"Thai Compliance Built In"**
   - TFRS accounting standard support.
   - BOI reference data capability.
   - Thai language interface.
   - Automatic TFRS-to-IFRS conversion for group reporting.

5. **"See Everything, Control Everything"**
   - Dual-direction credit control (your group vs. customer's group).
   - Full transaction traceability from sales order back to purchase order.
   - Real-time pivot reporting without Excel export.

### For Distributors (Track B)

1. **Three Products, Full Market Coverage**
   - T100 for mid-to-large manufacturers (high-value deals).
   - WorkFlow ERP for SMBs and trading companies (volume plays).
   - eMES for shop-floor execution (upsell to existing ERP customers).

2. **Revenue Streams**
   - Software license fees (primary revenue).
   - Implementation services (Phase IV delivery).
   - Annual maintenance (12% of list price recurring revenue starting Year 2).
   - Volume rebate at 6M THB cumulative (T100/eMES) or 3M THB (WorkFlow ERP).

3. **Distributor Pricing Tiers**
   - **Golden Distributor:** Best pricing. Requires 2 certified employees (pre-sales + implementation). Handles full sales cycle + implementation.
   - **Silver Distributor (implied):** Standard pricing. Handles pre-sales and closing.
   - **Referral Partner (Level C):** 5-10% of net license fee. Minimal involvement (just introductions or contract promotion support).

4. **Payment Terms (Distributor to DigiWin)**
   - 50% deposit within 7 working days of signed PO.
   - 50% balance within 30 working days of license key delivery.
   - License key/serial delivered within 5 working days of deposit receipt.

5. **Maintenance Service Model**
   - Distributor handles Tier 1 support (phone, Digiwin platform, daily coaching, troubleshooting).
   - DigiWin handles Tier 2 support (technical escalation).
   - Annual MA fee: 12% of list price (distributor-managed) or 20% (DigiWin-managed).
   - 1-year standard warranty from delivery date.

6. **Free Demo Environment**
   - T100: Full module, 10 concurrent users.
   - eMES: Full module, 5 concurrent users.
   - WorkFlow ERP: Full module, 10 concurrent users.
   - All time-limited (1 year, renewable). Distributor provides infrastructure.

### Competitive Differentiators (T100 vs. Oracle/SAP)

| Feature | T100 | Oracle/SAP |
|---------|------|------------|
| Capacity planning in ERP | Built-in (AMRP) | Requires separate APS purchase |
| Multi-accounting-standard conversion | Automatic (TFRS/VAS/IFRS) | Limited; often requires customization |
| Feature codes for SKU reduction | Built-in product + inventory features | Limited or requires add-ons |
| Multi-angle trading automation | 3 manual steps, rest automated | Available but less streamlined |
| Substitution management depth | 6+ substitution types | Basic substitution only |
| Thai tax localization | Built-in by original vendor | Requires regional partner customization |
| Visual routing designer | Drag-and-drop with 5 routing types | Varies; often less visual |
| Open source code | Yes -- exportable table schemas | Closed / restricted |
| Rework cost tracking | Full support (in-process + post-completion) | Often incomplete |
| Group credit control | Dual-direction (your group + customer group) | Typically single-direction |

---

## WordPress Architecture Notes (for Distributor Website Build)

> From document: "WordPress Architecture & Key Concepts for Digiwin Distributor Website"

### Recommended Stack
- **CMS:** WordPress.org (self-hosted)
- **Theme:** Astra or OceanWP (lightweight, B2B-friendly, Thai language support)
- **E-commerce:** WooCommerce for product catalog
- **B2B Features:** B2B for WooCommerce or Wholesale plugin for customer-specific pricing
- **SEO:** Yoast SEO or Rank Math
- **Forms:** Contact Form 7 for lead capture
- **Page Builder:** Elementor for custom pages
- **Caching:** WP Fastest Cache for performance

### Content Structure Recommendation
- **Custom Post Types:** Products, Case Studies, Partner Profiles
- **Custom Taxonomies:** Industries (Automotive, Pharma, Electronics), Solution Types (Cloud, On-Premise)
- **Pages:** About, Contact, Pricing, Partner Program, Terms

### Key Technical Points
- WordPress's modular architecture (plugins, hooks, themes) enables progressive feature addition.
- REST API available for CRM/billing/ERP data sync integrations.
- Mobile-responsive themes important for Thai mobile-first buyers.
- Not a transactional system -- integrations needed for CRM, billing, ERP data sync.

---

*This document consolidates product knowledge from 6 Google Drive source documents for use in DigiWin Thailand distributor website content creation.*
