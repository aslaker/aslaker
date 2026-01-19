---
id: spec-003
title: Fix heading hierarchy (multiple H1 tags)
priority: 1
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/contact/ContactSection.tsx
wcag_criteria:
  - "1.3.1 Info and Relationships (A)"
estimated_complexity: low
---

## Problem

The homepage has multiple H1 tags, which confuses search engines about the primary topic of the page. Best practice is to have exactly one H1 per page representing the main topic.

**Current H1 elements:**
1. Hero section: `<h1>` for "Adam Slaker" (correct - primary page heading)
2. Contact section: `<h1>` for "Let's Build Something" (incorrect - should be H2)

**SEO Impact:**
- Dilutes the SEO value of the primary H1
- Confuses search engine crawlers about page topic
- Reduces keyword relevance for main heading

**Accessibility Impact (WCAG 1.3.1):**
- Screen reader users expect one H1 as the main page title
- Multiple H1s create confusing document outline

## Current State

File: `/workspace/src/components/sections/contact/ContactSection.tsx`

Lines 58-61:
```tsx
<h1 className="mb-4 text-3xl font-medium text-zinc-100 sm:text-4xl">
  <span className="text-lime-500"># </span>
  Let&apos;s Build Something
</h1>
```

## Desired State

The contact section heading should be an H2, maintaining proper heading hierarchy:
- H1: Adam Slaker (Hero section)
- H2: Projects, About, Consulting, Contact (section headings)
- H3+: Subsection headings as needed

## Implementation Steps

### Step 1: Change H1 to H2 in ContactSection

Update `/workspace/src/components/sections/contact/ContactSection.tsx`:

```tsx
<h2 className="mb-4 text-3xl font-medium text-zinc-100 sm:text-4xl">
  <span className="text-lime-500" aria-hidden="true"># </span>
  Let&apos;s Build Something
</h2>
```

Note: Also added `aria-hidden="true"` to the decorative "#" character.

## Files to Modify

| File | Line | Change |
|------|------|--------|
| `/workspace/src/components/sections/contact/ContactSection.tsx` | 58 | Change `<h1>` to `<h2>` |

## Code Examples

### Before
```tsx
<h1 className="mb-4 text-3xl font-medium text-zinc-100 sm:text-4xl">
  <span className="text-lime-500"># </span>
  Let&apos;s Build Something
</h1>
```

### After
```tsx
<h2 className="mb-4 text-3xl font-medium text-zinc-100 sm:text-4xl">
  <span className="text-lime-500" aria-hidden="true"># </span>
  Let&apos;s Build Something
</h2>
```

## Testing Criteria

- [ ] View page source - verify only one `<h1>` element exists on homepage
- [ ] Use browser DevTools to inspect heading hierarchy
- [ ] Use WAVE or similar accessibility tool to verify heading structure
- [ ] Screen reader announces proper heading hierarchy (H1 -> H2)
- [ ] Visual appearance remains unchanged (H2 uses same styling as before)

## Related Specs

- spec-008: Add semantic H2 headings to sections (related heading improvements)

## References

- [Google SEO: Heading Best Practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#use-headings)
- [WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [MDN Heading Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
