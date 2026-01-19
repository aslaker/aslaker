---
id: spec-013
title: Add lazy loading to images
priority: 3
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/projects/ProjectCard.tsx
  - /workspace/src/components/sections/projects/ProjectModal.tsx
  - /workspace/src/components/sections/blog/BlogPostCard.tsx
  - /workspace/src/components/sections/blog/RelatedPostCard.tsx
  - /workspace/src/components/sections/blog/BlogDetail.tsx
wcag_criteria: []
estimated_complexity: low
---

## Problem

Project logo images and blog post images are rendered without `loading="lazy"` or explicit dimensions. While the current image count is small, lazy loading is a best practice that:
- Improves initial page load performance
- Reduces bandwidth usage
- Improves Core Web Vitals (especially LCP if images aren't in viewport)

**Structure Audit Issue 4.2:** No Lazy Loading for Images (Medium severity)

## Current State

### ProjectCard.tsx (lines 39-43)
```tsx
<img
  src={project.logoUrl}
  alt={`${project.title} logo`}
  className="h-10 w-10 object-contain sm:h-12 sm:w-12"
/>
```

### BlogPostCard.tsx (lines 25-29)
```tsx
<img
  src={post.headerImage}
  alt=""
  className="h-full w-full object-cover"
/>
```

**Issues:**
- No `loading="lazy"` attribute
- No explicit `width` and `height` attributes (causes layout shift)

## Desired State

All images should have:
1. `loading="lazy"` for below-the-fold images
2. Explicit `width` and `height` attributes to prevent layout shift
3. Proper `alt` text (addressed in accessibility spec)

## Implementation Steps

### Step 1: Update ProjectCard.tsx

```tsx
<img
  src={project.logoUrl}
  alt={`${project.title} logo`}
  className="h-10 w-10 object-contain sm:h-12 sm:w-12"
  loading="lazy"
  width={48}
  height={48}
  decoding="async"
/>
```

### Step 2: Update ProjectModal.tsx

```tsx
<img
  src={project.logoUrl}
  alt={`${project.title} logo`}
  className="h-12 w-12 object-contain"
  loading="lazy"
  width={48}
  height={48}
  decoding="async"
/>
```

### Step 3: Update BlogPostCard.tsx

```tsx
<img
  src={post.headerImage}
  alt={post.title ? `Header image for ${post.title}` : ""}
  className="h-full w-full object-cover"
  loading="lazy"
  width={400}
  height={225}
  decoding="async"
/>
```

### Step 4: Update RelatedPostCard.tsx

```tsx
<img
  src={post.headerImage}
  alt={post.title ? `Header image for ${post.title}` : ""}
  className="h-full w-full object-cover"
  loading="lazy"
  width={300}
  height={169}
  decoding="async"
/>
```

### Step 5: Update BlogDetail.tsx (header image)

```tsx
<img
  src={writing.headerImage}
  alt={`Header image for ${writing.title}`}
  className="w-full rounded-lg"
  loading="eager"  // Hero image should load eagerly
  width={800}
  height={450}
  decoding="async"
/>
```

**Note:** The main blog post header image should use `loading="eager"` since it's likely above the fold and important for LCP.

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/sections/projects/ProjectCard.tsx` | Add lazy loading, dimensions |
| `/workspace/src/components/sections/projects/ProjectModal.tsx` | Add lazy loading, dimensions |
| `/workspace/src/components/sections/blog/BlogPostCard.tsx` | Add lazy loading, dimensions, alt text |
| `/workspace/src/components/sections/blog/RelatedPostCard.tsx` | Add lazy loading, dimensions, alt text |
| `/workspace/src/components/sections/blog/BlogDetail.tsx` | Add dimensions, keep eager loading for header |

## Code Examples

### Complete Image Component Pattern

```tsx
<img
  src={imageSrc}
  alt={descriptiveAltText}
  className={tailwindClasses}
  loading="lazy"        // or "eager" for above-fold images
  width={intrinsicWidth}
  height={intrinsicHeight}
  decoding="async"
/>
```

### Why `decoding="async"`?

Adding `decoding="async"` allows the browser to decode the image off the main thread, preventing blocking of rendering.

## Testing Criteria

- [ ] View page source - verify `loading="lazy"` on below-fold images
- [ ] Chrome DevTools > Network - verify images load on scroll
- [ ] Lighthouse - check for "Properly size images" and "Defer offscreen images"
- [ ] Verify no layout shift when images load (CLS score)
- [ ] First project logo should still load promptly (may need `loading="eager"` for first visible)

## Performance Impact

Expected improvements:
- **Initial load:** Reduced by not loading offscreen images
- **Data transfer:** Only load images users actually see
- **CLS score:** Improved with explicit dimensions

## Related Specs

- spec-010: Font loading optimization (related performance)
- spec-012: Resource hints (related performance)
- A11Y spec-019: Blog image alt text (accessibility)

## References

- [web.dev: Browser-level image lazy loading](https://web.dev/browser-level-image-lazy-loading/)
- [MDN: loading attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
- [web.dev: Optimize CLS](https://web.dev/optimize-cls/)
