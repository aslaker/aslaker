# SEO Remediation Specs

This directory contains remediation specifications for SEO issues identified in the combined SEO audit reports:
- [SEO Combined Report](/workspace/docs/seo/audits/seo_report.md)
- [Structure Audit](/workspace/docs/seo/audits/structure_audit.md)
- [Meta Tag Audit](/workspace/docs/seo/audits/meta_audit.md)
- [Keyword Audit](/workspace/docs/seo/audits/keyword_audit.md)
- [Snippet Audit](/workspace/docs/seo/audits/snippet_audit.md)

## Summary

| Priority | Count | Description |
|----------|-------|-------------|
| Priority 1 (Critical) | 3 | Canonical URLs, JSON-LD, OG images |
| Priority 2 (High) | 7 | Blog schema, service schema, favicons, keywords, resource hints |
| Priority 3 (Medium) | 2 | Font loading optimization, image lazy loading |
| **Total** | **13** | (2 pre-verified as complete) |

## Specs by Priority

### Priority 1 - Critical (Immediate)

| ID | Title | Impact | Effort | Status |
|----|-------|--------|--------|--------|
| [spec-001](./spec-001-robots-txt-verification.md) | Verify robots.txt | Crawlability | Low | **COMPLETE** |
| [spec-002](./spec-002-add-canonical-urls.md) | Add canonical URLs to all pages | Indexation | Low | Pending |
| [spec-003](./spec-003-fix-heading-hierarchy.md) | Verify heading hierarchy | SEO + A11y | Low | **COMPLETE** |
| [spec-004](./spec-004-add-json-ld-schema.md) | Add JSON-LD (Person, WebSite) | Rich Results | Medium | Pending |
| [spec-005](./spec-005-add-og-images.md) | Add OG and Twitter images | Social Sharing | Medium | Pending |

### Priority 2 - High

| ID | Title | Impact | Effort | Status |
|----|-------|--------|--------|--------|
| [spec-006](./spec-006-add-blog-schema.md) | Add BlogPosting schema | Article Rich Results | Medium | Pending |
| [spec-007](./spec-007-add-service-faq-schema.md) | Add Service and FAQ schemas | FAQ Rich Results | Medium | Pending |
| [spec-008](./spec-008-add-favicon-manifest.md) | Add favicon.ico, icons, manifest | PWA/Branding | Medium | Pending |
| [spec-009](./spec-009-blog-navigation-enabled.md) | Verify blog navigation | Internal Links | Low | **COMPLETE** |
| [spec-011](./spec-011-keyword-optimization.md) | Optimize title and meta description | Search Visibility | Low | Pending |
| [spec-012](./spec-012-resource-hints.md) | Add preconnect resource hints | Core Web Vitals | Low | Pending |

### Priority 3 - Medium

| ID | Title | Impact | Effort | Status |
|----|-------|--------|--------|--------|
| [spec-010](./spec-010-optimize-font-loading.md) | Optimize font loading | Core Web Vitals | Medium | Pending |
| [spec-013](./spec-013-image-lazy-loading.md) | Add lazy loading to images | Performance | Low | Pending |

## Dependency Graph

```
spec-001 (robots.txt) - VERIFIED COMPLETE

spec-002 (canonical URLs) - Independent

spec-003 (heading hierarchy) - VERIFIED COMPLETE

spec-004 (JSON-LD foundation)
    |
    +---> spec-006 (BlogPosting schema) - Requires Person schema
    |
    +---> spec-007 (Service/FAQ schema) - Requires Person schema

spec-005 (OG images) - Independent

spec-008 (favicons) - Independent

spec-009 (blog nav) - VERIFIED COMPLETE

spec-010 (font loading) - Independent
spec-011 (keywords) - Independent
spec-012 (resource hints) - Independent
spec-013 (image lazy loading) - Independent
```

## Implementation Order

### Phase 1: SEO Foundation (Week 1)
1. **spec-002**: Add canonical URLs (30 min)
2. **spec-011**: Optimize title/description (30 min)
3. **spec-012**: Add resource hints (15 min)
4. **spec-004**: Add JSON-LD Person + WebSite schema (2 hours)

### Phase 2: Rich Results (Week 1-2)
5. **spec-005**: Create and add OG images (2-3 hours including design)
6. **spec-006**: Add BlogPosting schema (1-2 hours)
7. **spec-007**: Add Service + FAQ schema (1-2 hours)

### Phase 3: Performance & Polish (Week 2)
8. **spec-008**: Add favicon.ico, apple-touch-icon, manifest (2-3 hours including design)
9. **spec-010**: Optimize font loading (2-3 hours)
10. **spec-013**: Add image lazy loading (30 min)

## Effort Estimates

| Effort Level | Hours | Specs |
|--------------|-------|-------|
| Low | 0.5-1 hour | 002, 009, 011, 012, 013 |
| Medium | 2-3 hours | 004, 005, 006, 007, 008, 010 |

**Total estimated effort:** 12-16 hours (not including image/icon design time)

**Already verified complete:** spec-001, spec-003, spec-009 (3 specs)

## Assets to Create

Several specs require new image assets to be designed:

| Asset | Dimensions | Purpose | Spec |
|-------|------------|---------|------|
| og-image.png | 1200x630 | Social sharing | spec-005 |
| twitter-card.png | 1200x600 | Twitter preview | spec-005 |
| favicon.ico | 32x32 | Legacy browsers | spec-008 |
| apple-touch-icon.png | 180x180 | iOS home screen | spec-008 |
| android-chrome-192x192.png | 192x192 | Android icon | spec-008 |
| android-chrome-512x512.png | 512x512 | Android splash | spec-008 |

**Design notes:**
- Dark background: #09090b (zinc-950)
- Accent colors: #84cc16 (lime-500), #10b981 (emerald-500)
- Simple, recognizable mark that works at small sizes

## New Files to Create

| File | Purpose | Spec |
|------|---------|------|
| /public/site.webmanifest | PWA manifest | spec-008 |
| /src/components/JsonLd.astro | Reusable schema component | spec-004 |
| /src/data/schema.ts | Schema definitions | spec-004, 006, 007 |

## Files Most Frequently Modified

| File | Spec Count | Specs |
|------|------------|-------|
| /src/pages/index.astro | 6 | 002, 004, 005, 007, 011, 012 |
| /src/pages/blog/[slug].astro | 4 | 002, 005, 006, 012 |
| /src/data/schema.ts | 3 | 004, 006, 007 |

## Testing Tools

- **Structured Data:** [Google Rich Results Test](https://search.google.com/test/rich-results), [Schema Validator](https://validator.schema.org/)
- **Social Sharing:** [Facebook Debugger](https://developers.facebook.com/tools/debug/), [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Performance:** Lighthouse, WebPageTest
- **Robots/Sitemap:** Google Search Console

## Expected Benefits

After implementing all specs:

- **20-30% increase** in organic click-through rates (rich results, better titles)
- **Featured snippet eligibility** for FAQ and service queries
- **Enhanced social sharing** with preview images
- **Improved E-E-A-T signals** through structured data
- **Better Core Web Vitals** from font optimization and lazy loading
- **Reduced duplicate content risk** with canonical URLs

## Progress Tracking

After implementing a spec:
1. Move the spec file to `/workspace/docs/seo/specs/completed/`
2. Update this README to mark as completed
3. Validate with appropriate testing tools
4. Submit updated sitemap to Search Console

---

*Generated from SEO audits on 2026-01-15*
*Last updated: 2026-01-15*
