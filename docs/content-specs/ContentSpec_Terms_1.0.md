# Content Spec: Terms of Service

**PRD Reference:** N/A (Legal / Utility page)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** All visitors
**Objective:** Legal compliance — define terms governing use of the DigiWin Thailand website
**URL:** digiwin.co.th/terms

---

## Content Sections

### Section 1: Page Header

**Heading:** Terms of Service
**Subtext:** Last updated: February 2026

---

### Section 2: Acceptance of Terms

**Heading:** 1. Acceptance of Terms

By accessing and using the DigiWin Thailand website ("Site"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Site.

---

### Section 3: Use of Site

**Heading:** 2. Use of Site

You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the Site. Prohibited activities include:

- Attempting to gain unauthorized access to the Site
- Using the Site to transmit malicious code
- Copying or distributing Site content without permission
- Using the Site for any unlawful purpose

---

### Section 4: Intellectual Property

**Heading:** 3. Intellectual Property

All content on this Site, including text, graphics, logos, images, and software, is the property of DigiWin or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.

---

### Section 5: Product Information

**Heading:** 4. Product Information

While we strive to provide accurate product information, we do not warrant that product descriptions or other Site content is accurate, complete, or current. Product specifications and features may change without notice.

---

### Section 6: Limitation of Liability

**Heading:** 5. Limitation of Liability

DigiWin Thailand shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or any products or services obtained through the Site.

---

### Section 7: Third-Party Links

**Heading:** 6. Third-Party Links

The Site may contain links to third-party websites. We are not responsible for the content or practices of these websites. Your use of third-party sites is at your own risk.

---

### Section 8: Changes to Terms

**Heading:** 7. Changes to Terms

We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Site constitutes acceptance of the modified terms.

---

### Section 9: Governing Law

**Heading:** 8. Governing Law

These Terms of Service are governed by the laws of Thailand. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of Thai courts.

---

### Section 10: Contact

**Heading:** 9. Contact

For questions about these Terms of Service, contact us at:

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

1. **Missing physical address in Contact section:** The contact section only lists email. The official Thailand address should be included: No. 2/117-118, Bangna Complex Office Tower, 22F, Theparat Rd, Bangna, Bangkok 10260.

2. **Company legal name not specified:** The page refers to "DigiWin Thailand" informally and "DigiWin" in the IP section. For a legal document, the registered entity name should be used consistently (e.g., "DigiWin Technology (Thailand) Co., Ltd." or whatever the correct registered name is). This needs verification.

3. **No phone number in Contact section:** For a legal compliance page, providing a phone number in addition to email is best practice.

4. **Limitation of Liability may be too narrow:** The clause only excludes "indirect, incidental, special, or consequential damages." Under Thai law, it may be advisable to also include a cap on direct damages and a disclaimer of warranties (express and implied). Legal counsel should review.

5. **No indemnification clause:** Standard Terms of Service typically include a user indemnification provision. Consider adding one.

6. **No dispute resolution mechanism:** The Governing Law section specifies Thai courts but does not mention any alternative dispute resolution (mediation, arbitration) which is increasingly standard.

7. **No severability clause:** If any provision is found unenforceable, the remainder of the terms should still apply. A severability clause is standard legal boilerplate.

8. **No "entire agreement" clause:** Standard Terms of Service typically include a clause stating that these terms constitute the entire agreement between the parties regarding use of the site.

9. **Inline CSS not extracted:** All styling is inline. When this page is next touched, CSS should be extracted to `styles.css` per the project's CSS extraction guardrail.

10. **Both legal pages share identical layout/structure:** The Privacy Policy and Terms of Service pages use the exact same layout pattern. When CSS is extracted, a shared `.legal-page` class could handle both, reducing duplication to near zero.
