---
id: spec-009
title: Uncomment blog navigation link
priority: 2
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/data/site-data.ts
wcag_criteria: []
estimated_complexity: low
---

## Problem

The blog navigation link is commented out in the site data, reducing crawlable link paths to blog content. Search engines rely on internal links to discover and index content.

**SEO Impact:**
- Blog pages are harder for crawlers to discover
- Reduced internal link equity to blog content
- Users cannot easily find blog from main navigation

## Current State

File: `/workspace/src/data/site-data.ts`

```typescript
export const navigationItems: NavigationItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Consulting", href: "#consulting" },
  { label: "Contact", href: "#contact" },
  // { label: "Blog", href: "/blog" }, // <-- Commented out
];
```

## Desired State

Blog navigation link is enabled, providing direct access to blog content from the main navigation.

## Implementation Steps

### Step 1: Uncomment blog navigation item

Update `/workspace/src/data/site-data.ts`:

```typescript
export const navigationItems: NavigationItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Consulting", href: "#consulting" },
  { label: "Blog", href: "/blog" }, // Uncommented
  { label: "Contact", href: "#contact" },
];
```

**Note:** Moved Blog before Contact for better UX flow.

## Files to Modify

| File | Line | Change |
|------|------|--------|
| `/workspace/src/data/site-data.ts` | ~20 | Uncomment Blog navigation item |

## Testing Criteria

- [ ] Blog link appears in desktop navigation
- [ ] Blog link appears in mobile navigation
- [ ] Clicking Blog navigates to /blog page
- [ ] Blog page loads correctly with all posts

## Related Specs

- spec-006: Add BlogPosting schema (blog improvements)

## References

- [Google: How search engines crawl](https://developers.google.com/search/docs/fundamentals/how-search-works)
