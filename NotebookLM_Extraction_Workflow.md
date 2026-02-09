# NotebookLM Information Extraction Workflow
*Page-by-page extraction guide for 50-70 source conversations*

---

## How This Works

You have:
- **50-70 sources** uploaded to NotebookLM
- **A PMM persona** that keeps responses manufacturing-grounded
- **Specific pages** to build (Homepage, Partner Program, Products, Industries, About)

This guide gives you **exact prompts** to extract the right information for each page, in the right order.

---

## Before You Start: Source Organization

With 50-70 sources, tell NotebookLM which sources to prioritize:

```
For this conversation, prioritize these source types:
1. DigiWin corporate/product documents
2. Case studies and customer references
3. Market research and industry data
4. Competitor information

When I ask questions, cite which source each answer comes from.
```

---

## Page-by-Page Extraction Workflows

---

### HOMEPAGE (1.0)

**Page objective:** Segment visitors (Factory vs. Distributor) and route them to the right path within 5 seconds.

#### Extraction Sequence

**Step 1: Dual-Audience Hook**
```
I'm writing the homepage hero that splits into two paths:
- Left: Factory owners/operators seeking ERP
- Right: Distributor prospects seeking partnership

From the sources, extract:
1. The single most resonant pain point for factory owners
2. The single most resonant pain point for distributor business owners
3. One credibility statement that applies to BOTH audiences

Keep each to one sentence. Manufacturing language only.
```

**Step 2: Immediate Credibility**
```
What are the 5 strongest credibility signals I should show
immediately below the hero?

Rank by:
- Verifiability (can prospects check this?)
- Relevance to manufacturing buyers
- Differentiation from competitors

Format: [Statistic/Credential] — [Why it matters to the reader]
```

**Step 3: Factory Path Preview**
```
For factory visitors, what 3 things must they understand
before clicking deeper into Products or Industries?

Extract:
1. "DigiWin understands manufacturing because..." (proof)
2. "This is different from generic ERP because..." (differentiation)
3. "Companies like yours have achieved..." (outcome preview)

One sentence each. No feature lists.
```

**Step 4: Distributor Path Preview**
```
For distributor visitors, what 3 things must they understand
before clicking into Partner Program?

Extract:
1. "The problem with your current model is..." (pain validation)
2. "DigiWin partners operate differently by..." (alternative model)
3. "The opportunity is..." (without overpromising)

One sentence each. Business owner language, not vendor pitch.
```

**Step 5: Trust Anchors**
```
What trust anchors should appear on the homepage that
reduce skepticism for BOTH audiences?

Consider:
- Stock listing (what does this signal?)
- Foxconn investment (what does this prove?)
- 43-year history (what does this mean for the buyer?)
- Customer count (how to state without exaggeration?)

For each: One sentence on what to say and WHY it builds trust.
```

---

### PARTNER PROGRAM HUB (2.0)

**Page objective:** Make distributor prospects think "my current model is broken, and these people understand why."

#### Extraction Sequence

**Step 1: Pain Validation**
```
What specific frustrations do ERP implementation firms,
accounting practices, and IT consultancies experience
that DigiWin's partner model addresses?

From the sources, find:
- Revenue model problems (man-day ceiling, no recurring)
- Operational problems (consultant burnout, scaling limits)
- Strategic problems (no exit value, commoditization)

I need to NAME their pain accurately, not generically.
```

**Step 2: The Alternative Model**
```
How does DigiWin's partner model differ from traditional
ERP reseller/implementer relationships?

Extract specifics on:
- Revenue structure (how partners actually make money)
- Support structure (what DigiWin provides vs. partner provides)
- Growth path (how a partner's business evolves over time)

Avoid vendor-speak. Frame as "here's how your business changes."
```

**Step 3: Credibility Without Hype**
```
What proof points make the partner opportunity believable
without sounding like a get-rich-quick pitch?

Find:
- DigiWin's track record that reduces partner risk
- Product portfolio depth that enables recurring revenue
- Support infrastructure that enables partner success

Frame as risk reduction, not income promises.
```

**Step 4: Path Forward**
```
What are the logical next steps a distributor prospect
should take after reading the Partner Program hub?

From the sources, identify:
- What they should learn next (Business Model Crisis? Solution Stack? Economics?)
- What action they should consider (discovery call? download?)
- What questions they likely still have

Structure as a journey, not a hard sell.
```

---

### BUSINESS MODEL CRISIS (2.1)

**Page objective:** Articulate the problem with traditional IT services so clearly that prospects feel understood.

#### Extraction Sequence

**Step 1: Industry-Level Pain**
```
What evidence exists about structural problems in the
IT consulting/ERP implementation industry?

Find:
- Margin compression data
- Utilization ceiling realities
- Talent retention challenges
- Commoditization pressures

I need third-party or industry-level proof, not just DigiWin's opinion.
```

**Step 2: The Three Futures Framework**
```
The page presents three paths forward for implementation firms.
What evidence supports each path?

1. "Work Harder" path — why this fails
2. "Find a Niche" path — limitations
3. "Change the Model" path — what this means

Extract evidence that makes the third path feel logical, not salesy.
```

**Step 3: Emotional Resonance**
```
What language from the sources would resonate emotionally
with a tired business owner running an IT consultancy?

Find phrases or concepts that:
- Validate their exhaustion without condescension
- Name the trap they're in without blame
- Open possibility without false promises

I need authentic, business-owner language.
```

---

### SOLUTION STACK (2.2)

**Page objective:** Show the product portfolio as a business asset partners can build revenue on.

#### Extraction Sequence

**Step 1: Portfolio as Business Model**
```
How should I frame DigiWin's products for a PARTNER audience
(not an end-user audience)?

For each product area (ERP, MES, WMS, AIoT), extract:
- What market need it addresses (partner's selling angle)
- What revenue model it enables (license? subscription? services?)
- How it connects to other products (upsell/cross-sell path)

Frame as "what you can sell" not "what it does."
```

**Step 2: Entry Strategy**
```
What is the "reverse cut" or MES-first entry strategy
that lets partners win without replacing existing ERP?

Extract:
- How this works practically
- Why it reduces sales friction
- What the expansion path looks like after entry

This is critical for partners facing SAP/Oracle incumbents.
```

**Step 3: Competitive Positioning for Partners**
```
When a partner is selling against SAP Business One or
local Thai ERP vendors, what positioning works?

From the sources, extract:
- Manufacturing depth advantages (vs. generic ERP)
- Total cost advantages (vs. SAP/Oracle)
- Capability advantages (vs. local vendors)

Frame as talking points for the partner's sales conversations.
```

---

### PARTNER ECONOMICS (2.3)

**Page objective:** Show concrete revenue scenarios that feel realistic, not optimistic.

#### Extraction Sequence

**Step 1: Revenue Model Mechanics**
```
How do DigiWin partners actually generate revenue?

Extract specifics on:
- License/subscription revenue sharing
- Implementation service revenue
- Ongoing support/maintenance revenue
- Upsell/cross-sell revenue

I need the actual mechanics, not marketing language.
```

**Step 2: Realistic Scenarios**
```
What does Year 1, Year 2, Year 3 look like for a new partner?

Find or construct scenarios that are:
- Conservative (not best-case)
- Based on actual deal sizes in the sources
- Honest about ramp-up time

Frame as "here's what to realistically expect."
```

**Step 3: Risk Mitigation**
```
What protections and support reduce partner risk?

Extract specifics on:
- Territory protection policies
- Channel conflict prevention
- Co-implementation support
- Training and certification
- Demand generation support

Frame as "here's how we protect your investment."
```

---

### PRODUCTS HUB (3.0)

**Page objective:** Help factory buyers understand what DigiWin offers and find the right starting point.

#### Extraction Sequence

**Step 1: Manufacturing-First Framing**
```
How should I introduce DigiWin's products to a factory owner
who is skeptical of ERP vendors?

Extract:
- What makes DigiWin "manufacturing-specific" (not generic)?
- What factory problems does the portfolio address?
- How does this differ from what they've seen before?

No feature lists. Problem-solution framing only.
```

**Step 2: Product Differentiation**
```
For someone who doesn't know the difference between ERP, MES,
WMS, and AIoT — how do I explain each simply?

For each product category:
- One sentence: what factory problem it solves
- One sentence: where it lives (office? shop floor? warehouse?)
- One sentence: who uses it day-to-day

Factory language, not software language.
```

**Step 3: Starting Point Guidance**
```
How does a factory know where to start with DigiWin?

Extract guidance on:
- When to start with ERP (T100 vs. iGP)
- When to start with MES (shop floor first)
- When to start with WMS (warehouse/inventory first)
- How products connect over time

Frame as "here's how to think about it" not "here's what to buy."
```

**Step 4: Fear Neutralization**
```
What fears do factory buyers have about ERP, and how do
the sources address each?

Find evidence addressing:
1. "Implementation will disrupt production"
2. "We tried ERP before and it failed"
3. "We'll be locked into a vendor"
4. "My team can't learn a new system"
5. "It's too expensive for our size"

One proof point per fear.
```

---

### INDUSTRY PAGES (4.x)

**Page objective:** Make visitors in each vertical feel "they understand MY industry."

#### Extraction Sequence (Repeat for Each Industry)

**Step 1: Industry-Specific Pain**
```
For [AUTOMOTIVE PARTS / ELECTRONICS / METAL-PLASTICS] manufacturers,
what are the specific operational challenges?

Extract:
- Production/scheduling challenges unique to this vertical
- Quality/compliance requirements specific to this industry
- Supply chain pressures they face
- What "good looks like" in this industry

I need to NAME their world accurately.
```

**Step 2: Industry-Specific Proof**
```
What evidence exists of DigiWin success in [INDUSTRY]?

Find:
- Named customers (if available)
- Measurable outcomes achieved
- Industry-specific features or capabilities
- Relevant certifications or compliance support

If no direct proof exists, say so explicitly.
```

**Step 3: Competitor Context**
```
In [INDUSTRY], what ERP alternatives are factories typically
considering, and how does DigiWin compare?

Extract:
- Common competitors in this vertical
- DigiWin's advantages for this specific industry
- Gaps or limitations to be honest about

Frame as "here's how we fit" not "here's why we're best."
```

---

### ABOUT US (5.2)

**Page objective:** Build confidence that DigiWin is stable, credible, and committed to the region.

#### Extraction Sequence

**Step 1: Heritage as Credibility**
```
What elements of DigiWin's 43-year history build credibility
with cautious manufacturing buyers?

Extract:
- Key milestones that show stability
- Manufacturing-focus proof points
- Geographic expansion that shows commitment
- Leadership or ownership signals

Frame as "why you can trust us" not "look how great we are."
```

**Step 2: Regional Commitment**
```
What evidence shows DigiWin's commitment to Thailand and ASEAN?

Find:
- Years in Thailand
- Thai team size and composition
- Local implementations completed
- Regional investment signals

Frame as "we're here for the long term."
```

**Step 3: Foxconn Story**
```
How should I explain the Foxconn Industrial Internet investment?

Extract:
- What the investment actually means
- What capabilities it brings
- How it benefits customers or partners
- How to state it without overhyping

Frame as credibility signal, not name-dropping.
```

**Step 4: Leadership Without Arrogance**
```
How do I communicate market leadership (#1 in PLM/MES)
without sounding arrogant or unbelievable?

Extract:
- Specific rankings with sources (IDC, etc.)
- Context that makes the ranking meaningful
- How to state it factually, not boastfully

Frame as "here's what third parties say" not "we're the best."
```

---

## Cross-Page Extraction Prompts

Use these for any page:

### Social Proof Bar
```
For [PAGE NAME], what are the most relevant credibility signals
to show in a social proof bar immediately after the hero?

Consider:
- What does THIS audience care about?
- What reduces THEIR specific skepticism?
- What's verifiable if they check?

Give me 3-5 signals ranked by relevance to this page's audience.
```

### Objection Handling
```
For [PAGE NAME], what objections would a skeptical reader have,
and what evidence in the sources neutralizes each?

For each objection:
1. State the objection as the reader would think it
2. Cite the source that addresses it
3. Give me the one-sentence response

If an objection isn't addressed in sources, tell me explicitly.
```

### CTA Guidance
```
For [PAGE NAME], what is the appropriate next step for the reader?

Consider:
- Where are they in the journey (Orientation → Fit → Confidence → Conversation)?
- What do they need to learn next?
- What action matches their readiness level?

Give me the CTA text and the rationale for why it fits this stage.
```

### Gap Analysis
```
For [PAGE NAME], what information do I need that ISN'T in the sources?

Review what I've extracted and identify:
- Claims I want to make but can't support
- Proof points that are missing
- Questions the page raises but doesn't answer

This helps me know what to find elsewhere.
```

---

## Conversation Management Tips

### When Sources Conflict
```
I'm seeing conflicting information about [TOPIC].
Compare what different sources say and tell me:
1. What each source claims
2. Which source is more authoritative
3. What I should use on the website
```

### When Information is Missing
```
I can't find information about [TOPIC] in the sources.
Confirm whether:
1. It truly doesn't exist in any source
2. It might be stated differently (suggest search terms)
3. This is a gap I need to fill from elsewhere
```

### When You Need Deeper Detail
```
You mentioned [BRIEF POINT] earlier.
Go deeper on this. Find:
- More specific evidence
- Concrete examples or numbers
- Quotes I could use directly
```

### When Synthesis is Needed
```
Based on everything in the sources about [TOPIC],
synthesize a single, coherent narrative I can use.

Structure it as:
- The core message (one sentence)
- Three supporting points
- One proof point for each
```

---

## Quick Reference: Page → Priority Questions

| Page | Start With | Then Extract | Finally Get |
|------|------------|--------------|-------------|
| **Homepage** | Dual-audience hooks | Credibility signals | Path previews |
| **Partner Hub (2.0)** | Pain validation | Alternative model | Path forward |
| **Business Crisis (2.1)** | Industry pain | Three futures | Emotional language |
| **Solution Stack (2.2)** | Portfolio as business | Entry strategy | Competitive positioning |
| **Partner Economics (2.3)** | Revenue mechanics | Realistic scenarios | Risk mitigation |
| **Products Hub (3.0)** | Manufacturing-first frame | Product differentiation | Fear neutralization |
| **Industry Pages (4.x)** | Industry-specific pain | Industry-specific proof | Competitor context |
| **About Us (5.2)** | Heritage credibility | Regional commitment | Leadership proof |

---

## End-of-Session Checklist

Before closing a NotebookLM session, ask:

```
Summarize what I extracted today for [PAGE NAME]:

1. Key messages confirmed
2. Proof points gathered
3. Gaps identified
4. Questions still open

Format as a checklist I can reference next time.
```

---

*Aligned with DigiWin PMM NotebookLM System Prompt*
*For use with 50-70 source document library*
