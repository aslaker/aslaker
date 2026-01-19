---
id: spec-006
title: Fix robots.txt validation
priority: 2
domain: seo
source_tools: [lighthouse]
depends_on: []
blocks: []
parallel_safe: true
files:
  - public/robots.txt
---

## Problem

Lighthouse reports that robots.txt is not valid. Crawlers may not be able to understand how to crawl/index the site.

Reported by:
- Lighthouse: robots-txt (score 0%)
  - "robots.txt is not valid"

## Current Content

```
# robots.txt for adamslaker.dev
# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://adamslaker.dev/sitemap-index.xml
```

## Analysis

The current robots.txt looks syntactically correct. Possible issues:

1. **Sitemap URL may not exist**: The sitemap at `https://adamslaker.dev/sitemap-index.xml` may not be served correctly
2. **Allow directive**: While valid, `Allow: /` is implicit and redundant
3. **Sitemap directive**: Should be on its own line without preceding comment on same logical block

## Solution

1. **Verify sitemap exists**: Check if `https://adamslaker.dev/sitemap-index.xml` returns a valid sitemap
2. **Simplify robots.txt**:

```
User-agent: *
Allow: /

Sitemap: https://adamslaker.dev/sitemap-index.xml
```

3. **If no sitemap exists**, either:
   - Remove the Sitemap directive
   - Or generate a sitemap (Astro can do this with @astrojs/sitemap)

4. **Ensure proper MIME type**: robots.txt should be served as `text/plain`

## Verification

- Test robots.txt at https://www.google.com/webmasters/tools/robots-testing-tool
- Re-run Lighthouse audit
- Verify robots-txt audit passes
- Check sitemap URL returns valid XML
