---
id: spec-003
title: Verify heading hierarchy (H1/H2 structure)
priority: 1
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/contact/ContactSection.tsx
  - /workspace/src/components/sections/hero/Hero.tsx
wcag_criteria:
  - "1.3.1 Info and Relationships (A)"
estimated_complexity: low
status: completed
---

## Problem

The audit originally identified multiple H1 tags on the homepage (Hero section and Contact section both using H1), which confuses search engines about the primary topic.

## Current State

### Hero Component (`/workspace/src/components/sections/hero/Hero.tsx`)
```tsx
<h1 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-100 mb-4 tracking-tight">
  {/* Name displayed via TypingText */}
</h1>
```
**Status:** Correct - H1 contains the primary page identifier.

### Contact Section (`/workspace/src/components/sections/contact/ContactSection.tsx`)
```tsx
<h2 className="mb-4 text-3xl font-medium text-zinc-100 sm:text-4xl">
  <span className="text-lime-500" aria-hidden="true"># </span>
  Let&apos;s Build Something
</h2>
```
**Status:** Correct - Uses H2, not H1.

## Status: COMPLETED

The heading hierarchy has been verified as correct:
- Single H1 on homepage (Hero section with name)
- H2 elements for all other major sections
- Blog pages have their own H1 for the post title

## Verification Criteria

- [x] Only one H1 on homepage (Hero section)
- [x] Contact section uses H2
- [x] Blog list page has its own H1
- [x] Blog post pages have H1 for article title
- [x] Heading levels are sequential (no skipping from H2 to H4)

## Related Specs

- spec-014 (Accessibility heading hierarchy) - addresses same issue from A11Y perspective

## References

- [WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [SEO Heading Best Practices](https://developers.google.com/search/docs/appearance/page-experience)
