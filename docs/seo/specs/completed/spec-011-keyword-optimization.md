---
id: spec-011
title: Optimize page title and meta description with keywords
priority: 2
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/pages/index.astro
wcag_criteria: []
estimated_complexity: low
---

## Problem

The page title and meta description lack important service keywords that potential clients might search for. The current title "Adam Slaker | Principal Agentic Engineer" uses niche terminology that has low search volume.

**Current state:**
- Title: "Adam Slaker | Principal Agentic Engineer" (42 characters)
- Description: "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch." (118 characters)

**Issues:**
- "Principal Agentic Engineer" is not a commonly searched term
- No mention of "AI consultant" or "fractional CTO" (high commercial intent keywords)
- Meta description lacks specific service keywords
- No location indicator

## Current State

File: `/workspace/src/pages/index.astro`

```astro
---
const title = "Adam Slaker | Principal Agentic Engineer";
const description =
  "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.";
---
```

## Desired State

Title and description optimized with relevant keywords while maintaining brand identity and staying within character limits:
- Title: ~50-60 characters
- Description: ~150-160 characters

## Implementation Steps

### Step 1: Update page title

Recommended options (in order of preference):

**Option A (Recommended):**
```typescript
const title = "Adam Slaker | AI Consultant & Agentic Engineer";
// 47 characters - includes "AI Consultant" keyword
```

**Option B:**
```typescript
const title = "Adam Slaker | AI Consultant & Fractional CTO";
// 45 characters - two high-intent service keywords
```

**Option C:**
```typescript
const title = "Adam Slaker - AI Consultant, Agentic Engineer & Fractional CTO";
// 63 characters - slightly over optimal but comprehensive
```

### Step 2: Update meta description

Recommended description:

```typescript
const description =
  "AI consultant and agentic engineer helping startups build intelligent systems. Services include strategic AI consulting, fractional CTO, and Claude/LLM integration. Let's build something.";
// 188 characters - slightly over but contains key phrases
```

Or shorter version:

```typescript
const description =
  "AI consultant helping startups build intelligent systems. Strategic consulting, fractional CTO services, and agentic AI development. Let's build something together.";
// 163 characters - within limits
```

### Step 3: Update full file

```astro
---
import "../styles/global.css";
import { PortfolioApp } from "../components/PortfolioApp";

const title = "Adam Slaker | AI Consultant & Agentic Engineer";
const description =
  "AI consultant helping startups build intelligent systems. Strategic consulting, fractional CTO services, and agentic AI development. Let's build something together.";
const siteUrl = "https://adamslaker.dev";
const canonicalUrl = `${siteUrl}/`;
---
```

## Files to Modify

| File | Lines | Changes |
|------|-------|---------|
| `/workspace/src/pages/index.astro` | 5-7 | Update title and description constants |

## Code Examples

### Before
```astro
const title = "Adam Slaker | Principal Agentic Engineer";
const description =
  "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.";
```

### After
```astro
const title = "Adam Slaker | AI Consultant & Agentic Engineer";
const description =
  "AI consultant helping startups build intelligent systems. Strategic consulting, fractional CTO services, and agentic AI development. Let's build something together.";
```

## Testing Criteria

- [ ] Title length is 50-60 characters
- [ ] Description length is 150-160 characters
- [ ] Title includes "AI consultant" or similar keyword
- [ ] Description includes service keywords
- [ ] Verify in search preview tools (Google SERP simulator)
- [ ] Check that OG and Twitter meta inherit from these values

## Related Specs

- spec-002: Add canonical URLs (same file updates)
- spec-005: Add OG images (same file updates)

## References

- [Google: Title Links Best Practices](https://developers.google.com/search/docs/appearance/title-link)
- [Moz: Title Tag](https://moz.com/learn/seo/title-tag)
- [Google: Meta Description](https://developers.google.com/search/docs/appearance/snippet)
