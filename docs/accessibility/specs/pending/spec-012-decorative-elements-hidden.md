---
id: spec-012
title: Hide decorative elements from assistive technology
priority: 4
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/projects/ProjectCard.tsx
  - /workspace/src/components/sections/projects/ProjectModal.tsx
  - /workspace/src/components/sections/about/CharacterSheetCard.tsx
  - /workspace/src/components/shell/MobileMenu.tsx
  - /workspace/src/components/sections/contact/ContactModal.tsx
  - /workspace/src/components/shell/AppShell.tsx
wcag_criteria:
  - "1.3.1 Info and Relationships (A)"
estimated_complexity: low
---

## Problem

Decorative elements (terminal-style dots, prefix characters, cursors) are not hidden from assistive technology. Screen readers may announce these elements, creating noise and confusion for users.

**WCAG Criterion:** 1.3.1 Info and Relationships (Level A)

**Decorative elements identified:**
- Red/yellow/green "traffic light" dots in terminal headers
- Terminal prefix characters (">", "$", "#", "~/")
- Blinking cursor elements
- Decorative divider pipes ("|")

## Current State

### Terminal dots (multiple files)

```tsx
// ProjectCard.tsx lines 26-30
<div className="flex gap-1.5">
  <span className="h-2 w-2 rounded-full bg-red-500/70" />
  <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
  <span className="h-2 w-2 rounded-full bg-lime-500/70" />
</div>
```

No `aria-hidden="true"` present.

### Terminal prefixes

```tsx
// Various components
<span className="text-lime-500">$ </span>
<span className="text-lime-600">></span>
<span className="text-zinc-500">~/path</span>
```

No `aria-hidden="true"` present.

### Blinking cursors

```tsx
// AppShell.tsx line 52
<span className="animate-pulse text-lime-400">_</span>
```

No `aria-hidden="true"` present.

## Desired State

All purely decorative elements have `aria-hidden="true"` to prevent screen reader announcement.

## Implementation Steps

### Step 1: Hide terminal dots

Add `aria-hidden="true"` to dot containers in all files:

**ProjectCard.tsx:**
```tsx
<div className="flex gap-1.5" aria-hidden="true">
  <span className="h-2 w-2 rounded-full bg-red-500/70" />
  <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
  <span className="h-2 w-2 rounded-full bg-lime-500/70" />
</div>
```

**ProjectModal.tsx:**
```tsx
<div className="flex gap-1.5" aria-hidden="true">
  {/* dots */}
</div>
```

**CharacterSheetCard.tsx:**
```tsx
<div className="flex gap-1.5" aria-hidden="true">
  {/* dots */}
</div>
```

**MobileMenu.tsx:**
```tsx
<div className="flex gap-1.5" aria-hidden="true">
  {/* dots */}
</div>
```

**ContactModal.tsx:**
```tsx
<div className="flex gap-1.5" aria-hidden="true">
  {/* dots */}
</div>
```

### Step 2: Hide terminal prefixes

**AppShell.tsx:**
```tsx
<span className="text-lime-400" aria-hidden="true">{'>'}</span>
<span>{siteName}</span>
<span className="animate-pulse text-lime-400" aria-hidden="true">_</span>
```

**Hero.tsx:**
```tsx
<span className="text-lime-600" aria-hidden="true">$ </span>
```

**ContactSection.tsx:**
```tsx
<span className="text-lime-500" aria-hidden="true"># </span>
```

### Step 3: Hide blinking cursors

All cursor elements throughout the site:
```tsx
<span className="animate-pulse text-lime-400" aria-hidden="true">_</span>
```

### Step 4: Hide decorative dividers

```tsx
<div className="h-5 w-px bg-zinc-800" aria-hidden="true" />
```

## Files to Modify

| File | Elements to Hide |
|------|-----------------|
| `/workspace/src/components/sections/projects/ProjectCard.tsx` | Terminal dots (lines 26-30) |
| `/workspace/src/components/sections/projects/ProjectModal.tsx` | Terminal dots (lines 40-48) |
| `/workspace/src/components/sections/about/CharacterSheetCard.tsx` | Terminal dots (lines 63-67) |
| `/workspace/src/components/shell/MobileMenu.tsx` | Terminal dots (lines 61-62) |
| `/workspace/src/components/sections/contact/ContactModal.tsx` | Terminal dots (lines 124-137) |
| `/workspace/src/components/shell/AppShell.tsx` | Prefix characters, cursor, dividers |
| `/workspace/src/components/sections/hero/Hero.tsx` | Terminal prefixes |
| `/workspace/src/components/sections/contact/ContactSection.tsx` | Hash prefix |

## Testing Criteria

- [ ] Screen reader does not announce decorative dots
- [ ] Screen reader does not announce terminal prefixes ($, >, #, ~/)
- [ ] Screen reader does not announce blinking cursors
- [ ] Meaningful content is still announced correctly
- [ ] Visual appearance is unchanged

## Related Specs

- None (standalone cleanup)

## References

- [WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [MDN aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)
