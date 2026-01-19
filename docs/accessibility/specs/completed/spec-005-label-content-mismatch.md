---
id: spec-005
title: Fix aria-label mismatches with visible text
priority: 2
domain: accessibility
source_tools: [lighthouse]
wcag_criteria: ["2.5.3"]
depends_on: []
blocks: []
parallel_safe: true
files:
  - src/components/sections/about/ScorecardCard.tsx
  - src/components/sections/about/TrailMapCard.tsx
---

## Problem

Elements have aria-labels that don't match their visible text content. WCAG 2.5.3 "Label in Name" requires that the accessible name contains the visible text.

Reported by:
- Lighthouse: label-content-name-mismatch (score 0%)

### Specific Elements

1. **Interest cards** (TTRPGs, Mountain Biking):
   - `aria-label="View Tabletop RPGs character sheet details"`
   - But visible text may just say "Tabletop RPGs" or similar

2. **Trail area expand buttons**:
   - `aria-label="Expand Quarry Ridge trails"`
   - `aria-label="Expand Blackhawk trails"`
   - `aria-label="Expand Saris Trails trails"` (note: redundant "trails")
   - `aria-label="Expand Seminole trails"`

The aria-labels describe the action ("View", "Expand") but the visible text is just the name.

## Affected Elements

From Lighthouse:
- `div#interest-ttrpg > div.group` - aria-label doesn't match visible "Tabletop RPGs"
- `div#interest-mountain-biking > div.group` - aria-label doesn't match visible text
- Multiple `button.group/area` elements in TrailMapCard

## Solution

Two approaches:

### Option A: Include visible text in aria-label (Recommended)
Ensure aria-label starts with or contains the visible text:
- If button shows "Quarry Ridge", aria-label could be "Quarry Ridge, expand trails"
- This satisfies "Label in Name" requirement

### Option B: Remove aria-label if redundant
If the visible text is sufficiently descriptive, remove the aria-label entirely and let the accessible name come from the content.

For the interest cards, if they're not actually buttons but just hoverable cards, consider:
1. Removing role="button" if click isn't the primary interaction
2. Using aria-labelledby to reference the visible heading instead

### Specific fixes:

1. **Interest cards**: The cards show title like "Tabletop RPGs". If aria-label is needed:
   ```tsx
   aria-label={`${interest.title}, view details`}
   ```

2. **Trail area buttons**: Include the area name:
   ```tsx
   aria-label={`${area.name}, expand trail list`}
   ```

3. **Remove redundant "trails trails"**:
   - "Expand Saris Trails trails" → "Saris Trails, expand trail list"

## Verification

- Re-run Lighthouse audit
- Verify label-content-name-mismatch passes
- Test with screen reader: announced labels should include visible text
- Test voice control: saying visible text should activate the control
