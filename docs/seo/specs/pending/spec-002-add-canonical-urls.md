---
id: spec-002
title: Add canonical URLs to all pages
priority: 1
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/pages/index.astro
  - /workspace/src/pages/blog/index.astro
  - /workspace/src/pages/blog/[slug].astro
wcag_criteria: []
estimated_complexity: low
---

## Problem

No canonical URL tags (`<link rel="canonical">`) are present on any pages. With multiple domains configured (adamslaker.dev, adamslaker.com, www variants), search engines may index duplicate content under different URLs, diluting page authority and causing ranking issues.

**SEO Impact:**
- Duplicate content issues across domain variants
- Page authority dilution
- Inconsistent indexing
- Potential ranking penalties

## Current State

### Homepage (`/workspace/src/pages/index.astro`)

```astro
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <!-- ... other meta tags ... -->
  <!-- NO CANONICAL URL -->
</head>
```

### Blog Index (`/workspace/src/pages/blog/index.astro`)

```astro
<head>
  <!-- ... meta tags ... -->
  <!-- NO CANONICAL URL -->
</head>
```

### Blog Posts (`/workspace/src/pages/blog/[slug].astro`)

```astro
<head>
  <!-- ... meta tags ... -->
  <!-- NO CANONICAL URL -->
</head>
```

## Desired State

All pages have a canonical URL tag pointing to the preferred domain (https://adamslaker.dev).

## Implementation Steps

### Step 1: Update homepage (`/workspace/src/pages/index.astro`)

Add canonical URL after the viewport meta tag:

```astro
---
import "../styles/global.css";
import { PortfolioApp } from "../components/PortfolioApp";

const title = "Adam Slaker | Principal Agentic Engineer";
const description =
  "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.";
const canonicalUrl = "https://adamslaker.dev/";
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="generator" content={Astro.generator} />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalUrl} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <title>{title}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="bg-zinc-950 text-zinc-100 font-sans antialiased">
    <PortfolioApp client:load />
  </body>
</html>
```

### Step 2: Update blog index (`/workspace/src/pages/blog/index.astro`)

Add canonical URL:

```astro
---
// ... existing imports and data ...
const canonicalUrl = "https://adamslaker.dev/blog/";
---

<html lang="en">
  <head>
    <!-- ... existing meta tags ... -->

    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalUrl} />

    <!-- Update og:url to use canonical -->
    <meta property="og:url" content={canonicalUrl} />

    <!-- ... rest of head ... -->
  </head>
  <!-- ... body ... -->
</html>
```

### Step 3: Update blog posts (`/workspace/src/pages/blog/[slug].astro`)

Add dynamic canonical URL:

```astro
---
import "../../styles/global.css";
import { BlogDetailPage } from "../../components/BlogDetailPage";
import { writings } from "../../data/site-data";

export function getStaticPaths() {
  return writings.map((writing) => ({
    params: { slug: writing.slug },
    props: { writing },
  }));
}

const { slug } = Astro.params;
const { writing } = Astro.props;

// Dynamic canonical URL for this specific post
const canonicalUrl = `https://adamslaker.dev/blog/${slug}/`;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{writing.title} | Adam Slaker</title>
    <meta name="description" content={writing.excerpt} />
    <meta name="generator" content={Astro.generator} />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalUrl} />

    <!-- Open Graph -->
    <meta property="og:title" content={`${writing.title} | Adam Slaker`} />
    <meta property="og:description" content={writing.excerpt} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={canonicalUrl} />
    {writing.headerImage && (
      <meta property="og:image" content={`https://adamslaker.dev${writing.headerImage}`} />
    )}

    <!-- ... rest of meta tags ... -->
  </head>
  <!-- ... body ... -->
</html>
```

### Step 4 (Optional): Create reusable site config

Create `/workspace/src/config/site.ts` for consistent URL handling:

```typescript
export const siteConfig = {
  name: "Adam Slaker",
  url: "https://adamslaker.dev",
  description: "Building intelligent systems that think, adapt, and ship.",
} as const;

export function getCanonicalUrl(path: string = "/"): string {
  const baseUrl = siteConfig.url;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const trailingSlash = normalizedPath.endsWith("/") ? "" : "/";
  return `${baseUrl}${normalizedPath}${trailingSlash}`;
}
```

Then in pages:
```astro
---
import { getCanonicalUrl } from "../config/site";
const canonicalUrl = getCanonicalUrl("/");
---
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/pages/index.astro` | Add `<link rel="canonical">` |
| `/workspace/src/pages/blog/index.astro` | Add `<link rel="canonical">` |
| `/workspace/src/pages/blog/[slug].astro` | Add dynamic `<link rel="canonical">` |
| `/workspace/src/config/site.ts` | Create new file (optional) |

## Testing Criteria

- [ ] View page source on homepage - verify canonical URL present
- [ ] View page source on blog index - verify canonical URL present
- [ ] View page source on blog post - verify canonical URL includes correct slug
- [ ] Canonical URLs use https:// (not http://)
- [ ] Canonical URLs end with trailing slash (consistent with Cloudflare config)
- [ ] og:url matches canonical URL on all pages
- [ ] Validate with Google Rich Results Test or SEO audit tool

## Related Specs

- spec-001: Add robots.txt (SEO foundation)
- spec-003: Fix blog image URLs (related meta tag fix)

## References

- [Google Canonical URLs Documentation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Ahrefs Guide to Canonical Tags](https://ahrefs.com/blog/canonical-tags/)
- [Yoast Canonical URLs](https://yoast.com/rel-canonical/)
