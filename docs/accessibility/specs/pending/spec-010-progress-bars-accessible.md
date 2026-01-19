---
id: spec-010
title: Make progress/stat bars accessible
priority: 3
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/about/CharacterSheetCard.tsx
wcag_criteria:
  - "4.1.2 Name, Role, Value (A)"
estimated_complexity: low
---

## Problem

The stat bars in CharacterSheetCard visually represent progress/skill levels but are not accessible to screen readers. Users relying on assistive technology cannot understand the stat values being displayed.

**WCAG Criterion:** 4.1.2 Name, Role, Value (Level A)

## Current State

File: `/workspace/src/components/sections/about/CharacterSheetCard.tsx`

Lines 9-40 (StatBar component):
```tsx
function StatBar({ label, value, color = "lime" }: StatBarProps) {
  return (
    <div className="group">
      <div className="mb-1 flex justify-between">
        <span className="...">{label}</span>
        <span className="...">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full ...`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
```

Visual value is shown but the progress bar itself has no ARIA roles.

## Desired State

Stat bars use proper ARIA progressbar pattern:
- `role="progressbar"`
- `aria-valuenow` for current value
- `aria-valuemin` and `aria-valuemax` for range
- `aria-label` for description

## Implementation Steps

### Step 1: Update StatBar component

```tsx
function StatBar({ label, value, color = "lime" }: StatBarProps) {
  const progressId = `stat-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="group">
      <div className="mb-1 flex justify-between">
        <span id={`${progressId}-label`} className="...">
          {label}
        </span>
        <span className="..." aria-hidden="true">
          {value}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={`${progressId}-label`}
        aria-valuetext={`${label}: ${value} percent`}
        className="h-2 overflow-hidden rounded-full bg-zinc-800"
      >
        <div
          className={`h-full rounded-full ...`}
          style={{ width: `${value}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
```

## Files to Modify

| File | Lines | Changes |
|------|-------|---------|
| `/workspace/src/components/sections/about/CharacterSheetCard.tsx` | 9-40 | Add ARIA progressbar attributes |

## Code Examples

### Before
```tsx
<div className="h-2 overflow-hidden rounded-full bg-zinc-800">
  <div
    className={`h-full rounded-full ...`}
    style={{ width: `${value}%` }}
  />
</div>
```

### After
```tsx
<div
  role="progressbar"
  aria-valuenow={value}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-labelledby={`${progressId}-label`}
  aria-valuetext={`${label}: ${value} percent`}
  className="h-2 overflow-hidden rounded-full bg-zinc-800"
>
  <div
    className={`h-full rounded-full ...`}
    style={{ width: `${value}%` }}
    aria-hidden="true"
  />
</div>
```

## Testing Criteria

- [ ] Screen reader announces stat name and percentage value
- [ ] Each stat bar has proper progressbar role
- [ ] aria-valuetext provides clear description
- [ ] Visual percentage text is hidden from AT (redundant)

## Related Specs

- spec-008: Interactive cards keyboard access (same component)

## References

- [WCAG 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [WAI-ARIA Progressbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)
- [MDN progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role)
