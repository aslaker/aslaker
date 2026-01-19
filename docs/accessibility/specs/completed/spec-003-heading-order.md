---
id: spec-003
title: Fix heading order in CharacterSheetCard
priority: 3
domain: accessibility
source_tools: [axe]
wcag_criteria: ["1.3.1", "2.4.6"]
depends_on: []
blocks: []
parallel_safe: true
files:
  - src/components/sections/about/CharacterSheetCard.tsx
  - src/components/sections/about/ScorecardCard.tsx
  - src/components/sections/about/TrailMapCard.tsx
---

## Problem

The CharacterSheetCard (and similar about section cards) uses h3 headings, but the parent section (AboutGrid) doesn't have an h2, causing heading order to skip from h1 to h3.

Reported by:
- axe: heading-order (moderate)
  - "Heading order invalid"
  - Selector: `.p-5.focus\:ring-offset-2.sm\:p-6:nth-child(1) > .sm\:text-lg.tracking-tight`

## Affected Elements

- CharacterSheetCard.tsx line 89: `<h3 className="font-mono text-base font-bold...">`
- TrailMapCard.tsx line 160: `<h3 className="font-mono text-base font-bold...">`
- ScorecardCard.tsx: Similar h3 usage

## Solution

Two approaches:

### Option A: Add section h2 (Recommended)
Add an h2 heading to the AboutGrid section before the cards. This is semantically correct as the cards are sub-sections.

In AboutGrid.tsx, add a visually hidden or visible h2:

```tsx
<h2 className="sr-only">My Interests</h2>
// or make it visible as part of the design
```

### Option B: Change card headings to h2
If each card is meant to be a top-level section, change h3 to h2 in the cards. However, this may not be semantically correct if they're subsections.

**Recommended: Option A** - Add an h2 to AboutGrid as a section title.

## Verification

- Re-run axe-core audit
- Verify heading-order passes
- Check document outline shows logical h1 > h2 > h3 structure
- Visual check: ensure design is preserved (sr-only class hides visually)
