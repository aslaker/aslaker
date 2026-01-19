---
id: spec-012
title: Add preconnect and DNS prefetch resource hints
priority: 2
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

The site loads Google Fonts via `@import` statements but lacks `preconnect` and `dns-prefetch` hints for external resources. This delays font loading and impacts Core Web Vitals (specifically Largest Contentful Paint).

**Structure Audit Issue 4.1:** No Resource Hints (High severity)

## Current State

File: `/workspace/src/styles/global.css`

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700...');
```

The site also submits forms to HubSpot API which could benefit from DNS prefetch.

**No resource hints are present in any page `<head>` section.**

## Desired State

All pages should include resource hints for:
1. Google Fonts (preconnect)
2. HubSpot API (dns-prefetch for contact form)

## Implementation Steps

### Step 1: Add resource hints to index.astro

Update `/workspace/src/pages/index.astro`:

```astro
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Resource Hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://api.hsforms.com" />

  <!-- ... rest of head content ... -->
</head>
```

### Step 2: Add resource hints to blog pages

Update `/workspace/src/pages/blog/index.astro` and `/workspace/src/pages/blog/[slug].astro`:

```astro
<head>
  <!-- Resource Hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- ... rest of head content ... -->
</head>
```

### Step 3: Consider creating a BaseHead component (optional optimization)

For consistency across all pages, create a reusable component:

```astro
---
// /workspace/src/components/BaseHead.astro
interface Props {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
}

const { title, description, canonicalUrl, ogImage } = Astro.props;
const siteUrl = "https://adamslaker.dev";
const defaultOgImage = `${siteUrl}/og-image.png`;
---

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Resource Hints -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://api.hsforms.com" />

<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={ogImage || defaultOgImage} />
<meta property="og:site_name" content="Adam Slaker" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage || defaultOgImage} />

<title>{title}</title>
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/pages/index.astro` | Add preconnect and dns-prefetch links |
| `/workspace/src/pages/blog/index.astro` | Add preconnect links |
| `/workspace/src/pages/blog/[slug].astro` | Add preconnect links |

## Code Examples

### Resource Hints Block

```html
<!-- Place early in <head>, before any CSS imports -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://api.hsforms.com" />
```

**Note:** The `crossorigin` attribute on fonts.gstatic.com is required because fonts are loaded with CORS.

## Testing Criteria

- [ ] View page source - verify preconnect links are in `<head>`
- [ ] Chrome DevTools > Network > Timing - check for "Stalled" reduction
- [ ] Run Lighthouse - check for improved LCP
- [ ] Verify fonts load without CORS errors
- [ ] Test contact form still works with HubSpot

## Performance Impact

Expected improvements:
- **LCP reduction:** 50-200ms (depending on connection)
- **TTFB for fonts:** Reduced by eliminating DNS lookup and connection time
- **Overall:** Better Core Web Vitals score

## Related Specs

- spec-010: Font loading optimization (complementary optimization)

## References

- [web.dev: Preconnect](https://web.dev/preconnect-and-dns-prefetch/)
- [MDN: Link types preconnect](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preconnect)
- [Google Fonts: Best Practices](https://fonts.google.com/knowledge/using_type/using_web_fonts)
