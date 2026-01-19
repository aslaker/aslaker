---
id: spec-005
title: Add Open Graph and Twitter images
priority: 1
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/public/og-image.png
  - /workspace/src/pages/index.astro
  - /workspace/src/pages/blog/index.astro
  - /workspace/src/pages/blog/[slug].astro
wcag_criteria: []
estimated_complexity: medium
---

## Problem

The homepage and blog index are missing `og:image` and `twitter:image` meta tags. When shared on social media (Facebook, LinkedIn, Twitter/X), no preview image appears, significantly reducing engagement and click-through rates.

Additionally, blog posts use relative URLs for images which don't work with social platforms.

**Issues identified:**
1. Homepage: Missing og:image and twitter:image
2. Blog index: Missing og:image and twitter:image
3. Blog posts: Using relative image URLs instead of absolute URLs

**SEO/Social Impact:**
- No visual preview when site is shared on social media
- Reduced click-through rates from social platforms
- Reduced engagement and shareability
- Professional image suffers

## Current State

### Homepage (`/workspace/src/pages/index.astro`)

```astro
<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://adamslaker.dev" />
<!-- NO og:image -->

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<!-- NO twitter:image -->
```

### Blog posts (`/workspace/src/pages/blog/[slug].astro`)

```astro
{writing.headerImage && (
  <meta property="og:image" content={writing.headerImage} />
  <!-- Uses relative URL like /images/blog/header.jpg -->
  <!-- Should be absolute: https://adamslaker.dev/images/blog/header.jpg -->
)}
```

## Desired State

1. OG image (1200x630px) created and added to `/public/`
2. All pages have absolute URL og:image and twitter:image meta tags
3. Blog posts use absolute URLs for all images

## Implementation Steps

### Step 1: Create placeholder for OG image

**Note:** The actual image needs to be designed/created. This spec provides the technical implementation.

Create `/workspace/public/og-image.png` placeholder information:

Recommended specifications:
- Dimensions: 1200x630 pixels
- Format: PNG or JPG
- Content suggestion:
  - Dark background (#09090b - zinc-950)
  - Name: "Adam Slaker"
  - Title: "Principal Agentic Engineer"
  - Tagline or key services
  - Accent colors: lime-500 (#84cc16), emerald (#10b981)

For now, create a simple SVG placeholder that can be replaced later:

```svg
<!-- /workspace/public/og-image.svg (temporary until PNG is created) -->
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#09090b"/>
  <text x="600" y="280" text-anchor="middle" fill="#84cc16" font-family="sans-serif" font-size="72" font-weight="bold">Adam Slaker</text>
  <text x="600" y="370" text-anchor="middle" fill="#a1a1aa" font-family="sans-serif" font-size="36">Principal Agentic Engineer</text>
</svg>
```

### Step 2: Update homepage meta tags

Update `/workspace/src/pages/index.astro`:

```astro
---
import "../styles/global.css";
import { PortfolioApp } from "../components/PortfolioApp";

const title = "Adam Slaker | Principal Agentic Engineer";
const description =
  "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.";
const siteUrl = "https://adamslaker.dev";
const canonicalUrl = `${siteUrl}/`;
const ogImage = `${siteUrl}/og-image.png`;
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
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Adam Slaker - Principal Agentic Engineer" />
    <meta property="og:site_name" content="Adam Slaker" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content="Adam Slaker - Principal Agentic Engineer" />

    <title>{title}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="bg-zinc-950 text-zinc-100 font-sans antialiased">
    <PortfolioApp client:load />
  </body>
</html>
```

### Step 3: Update blog index meta tags

Update `/workspace/src/pages/blog/index.astro`:

```astro
---
// ... existing imports ...
const siteUrl = "https://adamslaker.dev";
const canonicalUrl = `${siteUrl}/blog/`;
const ogImage = `${siteUrl}/og-image.png`; // Or create blog-specific og image
---

<html lang="en">
  <head>
    <!-- ... existing meta tags ... -->

    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalUrl} />

    <!-- Open Graph -->
    <meta property="og:title" content="Blog | Adam Slaker" />
    <meta property="og:description" content="Technical writing on AI/agentic engineering, cloud infrastructure, and building things that work." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Adam Slaker" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Blog | Adam Slaker" />
    <meta name="twitter:description" content="Technical writing on AI/agentic engineering, cloud infrastructure, and building things that work." />
    <meta name="twitter:image" content={ogImage} />

    <!-- ... rest of head ... -->
  </head>
</html>
```

### Step 4: Fix blog post image URLs

Update `/workspace/src/pages/blog/[slug].astro`:

```astro
---
// ... existing code ...
const siteUrl = "https://adamslaker.dev";
const canonicalUrl = `${siteUrl}/blog/${slug}/`;

// Convert relative image to absolute URL
const ogImage = writing.headerImage
  ? `${siteUrl}${writing.headerImage}`
  : `${siteUrl}/og-image.png`;
---

<html lang="en">
  <head>
    <!-- ... existing meta tags ... -->

    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalUrl} />

    <!-- Open Graph -->
    <meta property="og:title" content={`${writing.title} | Adam Slaker`} />
    <meta property="og:description" content={writing.excerpt} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Adam Slaker" />
    <meta property="article:published_time" content={writing.publishedAt} />
    <meta property="article:author" content="Adam Slaker" />
    {writing.tags.map((tag) => <meta property="article:tag" content={tag} />)}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${writing.title} | Adam Slaker`} />
    <meta name="twitter:description" content={writing.excerpt} />
    <meta name="twitter:image" content={ogImage} />

    <!-- ... rest of head ... -->
  </head>
</html>
```

## Files to Modify

| File | Action |
|------|--------|
| `/workspace/public/og-image.png` | Create new image (1200x630px) |
| `/workspace/src/pages/index.astro` | Add og:image, twitter:image meta tags |
| `/workspace/src/pages/blog/index.astro` | Add og:image, twitter:image meta tags |
| `/workspace/src/pages/blog/[slug].astro` | Fix relative URLs to absolute |

## Testing Criteria

- [ ] OG image file exists at `/public/og-image.png` (1200x630px)
- [ ] Test homepage with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test homepage with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test blog post URLs show correct preview images
- [ ] All og:image URLs are absolute (start with https://)
- [ ] Image dimensions are correct (1200x630)
- [ ] Alt text is present for accessibility

## Related Specs

- spec-006: Add favicon.ico and apple-touch-icon (related assets)

## References

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/best-practices)
