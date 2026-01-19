---
id: spec-002
title: Fix empty heading in Hero component
priority: 4
domain: accessibility
source_tools: [axe]
wcag_criteria: ["1.3.1", "2.4.6"]
depends_on: []
blocks: []
parallel_safe: true
files:
  - src/components/sections/hero/Hero.tsx
---

## Problem

The h1 element in the Hero component is reported as empty because its content is rendered via a TypingText animation component. Screen readers may not detect the text content immediately.

Reported by:
- axe: empty-heading (minor)
  - "Element does not have text that is visible to screen readers"
  - "aria-label attribute does not exist or is empty"

## Affected Elements

- Selector: `.text-5xl` (the h1 element)
- HTML: `<h1 class="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-100 mb-4 tracking-tight">`

The h1 contains a span with TypingText component that animates the hero.name value.

## Solution

Add an aria-label to the h1 element with the full name value so screen readers can announce it immediately without waiting for the typing animation.

In `src/components/sections/hero/Hero.tsx`, update the h1:

```tsx
<h1
  className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-100 mb-4 tracking-tight"
  aria-label={hero.name}
>
```

This provides immediate accessible name while the visual typing animation plays.

## Verification

- Re-run axe-core audit
- Verify no empty-heading violations
- Test with screen reader: h1 should announce the name immediately
- Visual check: typing animation should still work as expected
