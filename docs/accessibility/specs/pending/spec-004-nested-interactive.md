---
id: spec-004
title: Fix nested interactive controls in interest cards
priority: 2
domain: accessibility
source_tools: [axe]
wcag_criteria: ["4.1.2"]
depends_on: []
blocks: []
parallel_safe: true
files:
  - src/components/sections/about/CharacterSheetCard.tsx
  - src/components/sections/about/ScorecardCard.tsx
  - src/components/sections/about/TrailMapCard.tsx
---

## Problem

The interest cards have nested interactive controls - a clickable card div that contains focusable button-like elements inside. This creates accessibility issues because:
1. Screen readers may announce multiple interactive elements confusingly
2. Focus management becomes unclear
3. Click/keyboard handlers may conflict

Reported by:
- axe: nested-interactive (serious)
  - Selector: `#interest-mountain-biking > .cursor-pointer.focus\:ring-2[role="button"]`
  - "Element has focusable descendants"

## Affected Elements

Looking at AboutGrid.tsx:
- The `InterestCard` wrapper div has `id="interest-${interest.id}"` and passes onClick to child cards
- CharacterSheetCard.tsx: The root div has `onClick={onClick}` making the whole card clickable
- Inside cards, there may be interactive elements (buttons, links) that are descendants

The audit specifically calls out elements with `role="button"` nested inside other interactive containers.

## Solution

Restructure the cards to avoid nested interactive elements:

### Option A: Make cards non-interactive containers
Remove onClick from card wrappers and only use internal buttons for actions.

### Option B: Use proper button for card interaction
Instead of a div with onClick, use a button or link as the primary interactive element and ensure internal elements are not focusable.

### Option C: Remove role="button" from nested elements
If the card itself is the primary interactive element, internal elements that look like buttons should:
- Remove `role="button"`
- Remove `tabindex="0"`
- Use `aria-hidden="true"` if purely decorative

**Recommended approach:**
1. Find elements with `role="button"` inside the cards
2. If they're just visual styling, remove the role and tabindex
3. If they need to be separately interactive, restructure so they're not nested

Looking at the code, the cards themselves handle onClick, so internal pseudo-buttons should not also be interactive.

## Verification

- Re-run axe-core audit
- Verify no nested-interactive violations
- Test keyboard navigation: Tab should move logically between cards
- Test screen reader: each card should be announced once as interactive
