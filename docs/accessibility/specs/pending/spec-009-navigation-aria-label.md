---
id: spec-009
title: Add aria-label to navigation elements
priority: 3
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/shell/MainNav.tsx
  - /workspace/src/components/shell/MobileMenu.tsx
wcag_criteria:
  - "4.1.2 Name, Role, Value (A)"
estimated_complexity: low
---

## Problem

The main navigation lacks an `aria-label` to distinguish it from other navigation elements. Screen reader users benefit from labeled navigation regions to understand the purpose of each navigation area.

**WCAG Criterion:** 4.1.2 Name, Role, Value (Level A)

## Current State

File: `/workspace/src/components/shell/MainNav.tsx`

```tsx
// Lines 9-10
<nav className="flex items-center gap-1">
  {/* nav items */}
</nav>
```

No `aria-label` present.

## Desired State

Navigation elements have descriptive aria-labels:
- Main desktop navigation: `aria-label="Main navigation"`
- Mobile menu navigation: `aria-label="Mobile navigation"`

## Implementation Steps

### Step 1: Update MainNav component

File: `/workspace/src/components/shell/MainNav.tsx`

```tsx
<nav aria-label="Main navigation" className="flex items-center gap-1">
  {/* nav items */}
</nav>
```

### Step 2: Update MobileMenu component

File: `/workspace/src/components/shell/MobileMenu.tsx`

The nav element inside should have an aria-label:

```tsx
<nav aria-label="Mobile navigation" className="flex flex-col p-4">
  {items.map((item) => (
    // ... nav items
  ))}
</nav>
```

## Files to Modify

| File | Line | Change |
|------|------|--------|
| `/workspace/src/components/shell/MainNav.tsx` | ~9-10 | Add `aria-label="Main navigation"` |
| `/workspace/src/components/shell/MobileMenu.tsx` | ~73 | Add `aria-label="Mobile navigation"` |

## Testing Criteria

- [ ] Screen reader announces "Main navigation" when entering desktop nav
- [ ] Screen reader announces "Mobile navigation" when entering mobile menu nav
- [ ] Both navigation regions are distinguishable via landmarks

## Related Specs

- spec-005: Add skip link (related navigation accessibility)

## References

- [WCAG 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [MDN Navigation Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)
