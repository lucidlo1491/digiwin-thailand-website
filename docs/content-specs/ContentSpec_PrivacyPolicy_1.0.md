# Content Spec: Privacy Policy

**PRD Reference:** N/A (Legal / Utility page)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** All visitors
**Objective:** Legal compliance — inform visitors how personal data is collected, used, shared, and protected
**URL:** digiwin.co.th/privacy-policy

---

## Content Sections

### Section 1: Page Header

**Heading:** Privacy Policy
**Subtext:** Last updated: February 2026

---

### Section 2: Information We Collect

**Heading:** 1. Information We Collect

DigiWin Thailand ("we," "our," or "us") collects information you provide directly to us, such as when you request a demo, contact us, or apply to become a partner. This may include:

- Name and contact information
- Company name and job title
- Email address and phone number
- Information about your manufacturing operations

---

### Section 3: How We Use Your Information

**Heading:** 2. How We Use Your Information

We use the information we collect to:

- Respond to your inquiries and requests
- Provide information about our products and services
- Process partner applications
- Improve our website and services
- Send marketing communications (with your consent)

---

### Section 4: Information Sharing

**Heading:** 3. Information Sharing

We do not sell, trade, or rent your personal information to third parties. We may share your information with:

- DigiWin group companies for business purposes
- Service providers who assist our operations
- Legal authorities when required by law

---

### Section 5: Data Security

**Heading:** 4. Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

---

### Section 6: Your Rights

**Heading:** 5. Your Rights

Under Thailand's Personal Data Protection Act (PDPA), you have the right to:

- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Withdraw consent
- Lodge a complaint with authorities

---

### Section 7: Contact Us

**Heading:** 6. Contact Us

For questions about this Privacy Policy or to exercise your rights, contact us at:

**DigiWin Thailand**
Email: info@digiwin.co.th

---

## Page Structure

| Element | Specification |
|---------|---------------|
| **Layout** | Single-column, centered content block, max-width 800px |
| **Background** | White (`#FFFFFF` default body) |
| **Top Padding** | 120px (to clear fixed header) |
| **Heading (H1)** | Noto Sans, 36px, color `#000864` |
| **Subheading date** | Default font, color `#64748b`, margin-bottom 48px |
| **Section Headings (H2)** | Noto Sans, 24px, margin 32px top / 16px bottom |
| **Body Text** | Noto Sans, 16px, line-height 1.8, color `#000864` |
| **Lists** | Standard `<ul>`, padding-left 24px, margin 16px top/bottom |
| **Link Color** | `#00AFF0` (on email link) |
| **Header** | Shared site header via `{{header}}` partial |
| **Footer** | Shared site footer via `{{footer}}` partial |
| **Inline CSS** | All styles are inline on elements (not yet extracted to `styles.css`) |

---

## Flags & Notes

### Issues Found

1. **"Request a demo" language in Section 1:** The text says "such as when you request a demo" — this contradicts the business constraint that DigiWin Thailand does NOT offer product demos. Should be changed to "such as when you contact us, request a consultation, or apply to become a partner" or similar.

2. **Missing physical address in Contact section:** The contact section only lists email. The official Thailand address should be included: No. 2/117-118, Bangna Complex Office Tower, 22F, Theparat Rd, Bangna, Bangkok 10260.

3. **Company legal name not specified:** The page refers to "DigiWin Thailand" informally. For a legal document, the registered entity name should be used (e.g., "DigiWin Technology (Thailand) Co., Ltd." or whatever the correct registered name is). This needs verification.

4. **PDPA compliance gaps:** While the page mentions PDPA and lists data subject rights, a fully compliant privacy policy under Thailand's PDPA (effective June 2022) typically also requires:
   - Name and contact details of the Data Protection Officer (DPO) or responsible person
   - Legal basis for processing (consent, legitimate interest, contractual necessity, etc.)
   - Data retention periods or criteria for determining retention
   - Details on cross-border data transfers (relevant since DigiWin HQ is in Taiwan)
   - Cookie policy / tracking technology disclosure
   - Right to data portability (PDPA Section 31)
   - Right to object to processing (PDPA Section 32)
   - How to submit a data subject access request (DSAR) — the current text only says "contact us" without a clear process

5. **No phone number in Contact section:** For a legal compliance page, providing a phone number in addition to email is best practice.

6. **Inline CSS not extracted:** All styling is inline. When this page is next touched, CSS should be extracted to `styles.css` per the project's CSS extraction guardrail.

7. **No cookie/tracking disclosure:** If the site uses Google Analytics, Meta Pixel, or any tracking cookies, this must be disclosed in the privacy policy or a separate cookie policy linked from here.
