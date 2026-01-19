---
id: spec-011
title: Optimize page title and meta description for target keywords
priority: 2
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/pages/index.astro
  - /workspace/src/data/site-data.ts
wcag_criteria: []
estimated_complexity: low
---

## Problem

The keyword audit identified opportunities to improve keyword placement in the page title and meta description. While the current implementation is functional, optimization can improve search visibility for key terms like "AI consultant", "agentic engineer", and "fractional CTO".

## Current State

File: `/workspace/src/pages/index.astro`

Current title (estimated - need to verify):
```
Adam Slaker | Principal Agentic Engineer
```
- 43 characters (optimal: 50-60)
- Contains "Agentic Engineer" keyword

Current meta description (from audit):
```
Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.
```
- Lacks specific service keywords

## Desired State

### Optimized Title Options

**Option A (Service-focused):**
```
Adam Slaker | AI Consultant & Agentic Engineer
```
- 47 characters
- Contains "AI Consultant" and "Agentic Engineer"
- Brand name first for recognition

**Option B (Role-focused):**
```
Adam Slaker - AI Consultant, Fractional CTO | Agentic Engineer
```
- 62 characters (slightly long)
- Contains multiple target keywords

**Recommended:** Option A for balance of keywords and length.

### Optimized Meta Description

```
AI consultant helping startups build intelligent systems. Strategic consulting, fractional CTO services, and agentic AI development. Let's build something together.
```
- 163 characters (within 160 target with slight overflow acceptable)
- Contains: "AI consultant", "fractional CTO", "agentic AI"
- Includes call-to-action

## Implementation Steps

### Step 1: Update index.astro title

Update `/workspace/src/pages/index.astro`:

```astro
---
const title = "Adam Slaker | AI Consultant & Agentic Engineer";
const description = "AI consultant helping startups build intelligent systems. Strategic consulting, fractional CTO services, and agentic AI development. Let's build something together.";
---
```

### Step 2: Update Open Graph and Twitter meta tags

Ensure OG and Twitter meta use the same optimized content:

```astro
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```

### Step 3: Consider hero data alignment (optional)

In `/workspace/src/data/site-data.ts`, ensure the hero tagline complements the meta description:

```typescript
export const hero: Hero = {
  name: "Adam Slaker",
  title: "Principal Agentic Engineer",
  tagline: "Building intelligent AI systems that think, adapt, and ship.",
  // Adding "AI" to tagline for keyword consistency
};
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/pages/index.astro` | Update title and description constants |
| `/workspace/src/data/site-data.ts` | Optional: add "AI" to hero tagline |

## Code Examples

### Before (index.astro)
```astro
---
const title = "Adam Slaker | Principal Agentic Engineer";
const description = "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.";
---
```

### After (index.astro)
```astro
---
const title = "Adam Slaker | AI Consultant & Agentic Engineer";
const description = "AI consultant helping startups build intelligent systems. Strategic consulting, fractional CTO services, and agentic AI development. Let's build something together.";
---
```

## Testing Criteria

- [ ] Page title is 50-60 characters
- [ ] Title contains "AI Consultant" and/or "Agentic Engineer"
- [ ] Meta description is 150-160 characters
- [ ] Description contains service keywords
- [ ] Description ends with CTA
- [ ] OG and Twitter meta match page title/description
- [ ] Verify with Google Rich Results Test
- [ ] Check appearance in search preview tools

## Target Keywords (by priority)

1. **Primary:** AI consultant, agentic engineer
2. **Secondary:** fractional CTO, AI consulting services
3. **Long-tail:** Claude AI developer, autonomous agents

## Related Specs

- spec-004: JSON-LD schema (uses similar content)
- spec-005: OG images (should align with keywords)

## References

- [Google: Title Tags](https://developers.google.com/search/docs/appearance/title-link)
- [Moz: Title Tag Guide](https://moz.com/learn/seo/title-tag)
- [Google: Meta Descriptions](https://developers.google.com/search/docs/appearance/snippet)
