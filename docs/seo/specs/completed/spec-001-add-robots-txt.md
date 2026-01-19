---
id: spec-001
title: Create robots.txt file
priority: 1
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/public/robots.txt
wcag_criteria: []
estimated_complexity: low
---

## Problem

No `robots.txt` file exists in the public directory. Search engines use robots.txt to understand which pages should be crawled and indexed. Without this file, crawlers have no guidance on site structure or crawl priorities.

**SEO Impact:**
- Search engines have no crawl guidance
- Cannot reference sitemap location
- No ability to prevent indexing of development/test pages if needed

## Current State

File `/workspace/public/robots.txt` does not exist.

Directory listing of `/workspace/public/`:
```
/workspace/public/
  fonts/
    atkinson-bold.woff
    atkinson-regular.woff
  projects/
    ephemeris/logo.png
    auto-claude/logo.png
    tasterra/logo.png
  favicon.svg
  .assetsignore
```

## Desired State

A properly configured `robots.txt` file that:
1. Allows all search engines to crawl the site
2. References the sitemap location
3. Follows best practices for portfolio sites

## Implementation Steps

### Step 1: Create robots.txt file

Create `/workspace/public/robots.txt` with the following content:

```text
# robots.txt for adamslaker.dev
# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://adamslaker.dev/sitemap-index.xml
```

### Step 2: Verify sitemap integration

The Astro sitemap integration is already configured in `astro.config.mjs`:
```javascript
integrations: [sitemap(), react(), tailwindcss()]
```

After build, verify the sitemap is generated at `dist/sitemap-index.xml`.

## Files to Modify

| File | Action |
|------|--------|
| `/workspace/public/robots.txt` | Create new file |

## Code Examples

### robots.txt content

```text
# robots.txt for adamslaker.dev
# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://adamslaker.dev/sitemap-index.xml
```

## Testing Criteria

- [ ] File exists at `/workspace/public/robots.txt`
- [ ] Run `npm run build` and verify file is copied to `dist/`
- [ ] Access https://adamslaker.dev/robots.txt in browser after deployment
- [ ] Validate with Google's robots.txt Tester in Search Console
- [ ] Verify sitemap URL is accessible at https://adamslaker.dev/sitemap-index.xml

## Related Specs

- spec-002: Add canonical URLs (works together for SEO foundation)
- spec-004: Add JSON-LD structured data (SEO foundation)

## References

- [Google robots.txt Introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [robotstxt.org](https://www.robotstxt.org/)
- [Astro Sitemap Integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
