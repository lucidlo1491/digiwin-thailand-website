Run a GEO + CORE-EEAT audit on a DigiWin Thailand page.

Usage: /geo-audit <page-slug>
       /geo-audit --all

Examples:
  /geo-audit home
  /geo-audit erp
  /geo-audit th-home
  /geo-audit --all

This runs the geo-auditor agent which:
1. Reads the page content (HTML prototype + live WP if available)
2. Scores against 80-item CORE-EEAT framework (8 dimensions × 10 items)
3. Saves structured report to docs/geo-audits/{slug}-audit.md
4. Flags items needing Peter's input as [NEEDS PETER]

$ARGUMENTS is either a page slug or --all for full site audit.

If $ARGUMENTS is "--all", run the audit sequentially on all page configs found in complete_website/divi5/pages/*.js (skip files starting with "sections/"). Save individual reports and a summary baseline JSON.

If $ARGUMENTS is a single slug, run the geo-auditor agent on that page only.

Anti-hallucination: Never fabricate sources, statistics, or product names. Verify against codebase. Use memory/data-crosscheck-findings.md for stat verification.
