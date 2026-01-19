---
id: spec-008
title: Make about section cards keyboard accessible
priority: 2
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/about/CharacterSheetCard.tsx
  - /workspace/src/components/sections/about/ScorecardCard.tsx
  - /workspace/src/components/sections/about/TrailMapCard.tsx
wcag_criteria:
  - "2.1.1 Keyboard (A)"
estimated_complexity: low
---

## Problem

The About section cards (CharacterSheetCard, ScorecardCard, TrailMapCard) use `div` elements with `onClick` handlers but are not keyboard focusable. Users who navigate via keyboard cannot interact with these cards to view expanded content.

**WCAG Criterion:** 2.1.1 Keyboard (Level A)

**Current issues:**
1. Cards use `<div onClick={...}>` instead of semantic interactive elements
2. No `tabIndex` attribute for keyboard focus
3. No `role="button"` for assistive technology
4. No `onKeyDown` handler for Enter/Space activation

## Current State

### CharacterSheetCard (`/workspace/src/components/sections/about/CharacterSheetCard.tsx`)

Lines 52-57:
```tsx
<div
  onClick={() => setIsExpanded(!isExpanded)}
  className="cursor-pointer ..."
>
  {/* Card content */}
</div>
```

### ScorecardCard (`/workspace/src/components/sections/about/ScorecardCard.tsx`)

Lines 68-73:
```tsx
<div
  onClick={() => setIsExpanded(!isExpanded)}
  className="cursor-pointer ..."
>
  {/* Card content */}
</div>
```

### TrailMapCard (`/workspace/src/components/sections/about/TrailMapCard.tsx`)

Lines 104-109:
```tsx
<div
  onClick={() => setIsExpanded(!isExpanded)}
  className="cursor-pointer ..."
>
  {/* Card content */}
</div>
```

## Desired State

1. All interactive cards are keyboard focusable
2. Cards can be activated with Enter or Space keys
3. Cards have `role="button"` for assistive technology
4. Cards have proper `aria-expanded` state
5. Visible focus indicator is present

## Implementation Steps

### Step 1: Update CharacterSheetCard

```tsx
export function CharacterSheetCard({ stats, interests }: CharacterSheetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      aria-label={`Character stats card. ${isExpanded ? 'Click to collapse' : 'Click to expand'}`}
      className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-lime-500/30 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {/* Card content */}
    </div>
  )
}
```

### Step 2: Update ScorecardCard

```tsx
export function ScorecardCard({ items }: ScorecardCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      aria-label={`Collection stats card. ${isExpanded ? 'Click to collapse' : 'Click to expand'}`}
      className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-lime-500/30 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {/* Card content */}
    </div>
  )
}
```

### Step 3: Update TrailMapCard

```tsx
export function TrailMapCard({ trails }: TrailMapCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      aria-label={`Trail guide card. ${isExpanded ? 'Click to collapse' : 'Click to expand'}`}
      className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-lime-500/30 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {/* Card content */}
    </div>
  )
}
```

### Alternative: Use semantic button element

A cleaner approach is to wrap the clickable area in a `<button>` element:

```tsx
export function CharacterSheetCard({ stats, interests }: CharacterSheetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
      aria-label={`Character stats card. ${isExpanded ? 'Collapse' : 'Expand'} details`}
      className="w-full text-left cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-lime-500/30 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {/* Card content - note: nested buttons would need to be refactored */}
    </button>
  )
}
```

**Note:** If using `<button>`, ensure no nested interactive elements exist within the card. If there are nested buttons or links, use the `role="button"` approach instead.

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/sections/about/CharacterSheetCard.tsx` | Add role, tabIndex, onKeyDown, aria-expanded |
| `/workspace/src/components/sections/about/ScorecardCard.tsx` | Add role, tabIndex, onKeyDown, aria-expanded |
| `/workspace/src/components/sections/about/TrailMapCard.tsx` | Add role, tabIndex, onKeyDown, aria-expanded |

## Code Examples

### Before (CharacterSheetCard.tsx)
```tsx
<div
  onClick={() => setIsExpanded(!isExpanded)}
  className="cursor-pointer rounded-lg border border-zinc-800 ..."
>
```

### After (CharacterSheetCard.tsx)
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={() => setIsExpanded(!isExpanded)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }}
  aria-expanded={isExpanded}
  aria-label={`Character stats. ${isExpanded ? 'Collapse' : 'Expand'} details`}
  className="cursor-pointer rounded-lg border border-zinc-800 ... focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
>
```

## Testing Criteria

- [ ] Tab to each card - verify focus indicator is visible
- [ ] Press Enter on focused card - verify card expands/collapses
- [ ] Press Space on focused card - verify card expands/collapses
- [ ] Screen reader announces:
  - [ ] Card as "button"
  - [ ] Expanded/collapsed state
  - [ ] Card label/purpose
- [ ] Focus order follows visual order of cards
- [ ] Verify no keyboard trap - can tab away from card

## Related Specs

- spec-009: Blog card keyboard accessibility (similar pattern)

## References

- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [MDN ARIA: button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
