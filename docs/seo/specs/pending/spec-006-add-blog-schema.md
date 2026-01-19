---
id: spec-006
title: Add BlogPosting schema to blog posts
priority: 2
domain: seo
depends_on: [spec-004]
blocks: []
parallel_safe: false
files:
  - /workspace/src/pages/blog/[slug].astro
  - /workspace/src/data/schema.ts
wcag_criteria: []
estimated_complexity: medium
---

## Problem

Blog posts have Open Graph article metadata but lack JSON-LD BlogPosting schema. This prevents article rich results including author bylines, publish dates, and enhanced visibility in Google News/Discover.

**SEO Impact:**
- No article rich results in search
- Missing author attribution in search results
- Reduced visibility in Google News/Discover
- Lower click-through rates for blog content

## Current State

File: `/workspace/src/pages/blog/[slug].astro`

```astro
<!-- Has Open Graph article tags -->
<meta property="og:type" content="article" />
<meta property="article:published_time" content={writing.publishedAt} />
{writing.tags.map((tag) => <meta property="article:tag" content={tag} />)}

<!-- NO JSON-LD BlogPosting schema -->
```

## Desired State

Each blog post includes JSON-LD BlogPosting schema with:
- Headline (title)
- Description (excerpt)
- Author (linking to Person schema)
- Date published
- Date modified (if applicable)
- Image
- Keywords/tags
- Word count estimate

## Implementation Steps

### Step 1: Add blog schema generator to schema.ts

Update `/workspace/src/data/schema.ts`:

```typescript
// ... existing schemas ...

export interface BlogPostSchemaData {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  modifiedAt?: string;
  headerImage?: string;
  tags: string[];
  wordCount?: number;
}

export function getBlogPostSchema(post: BlogPostSchemaData) {
  const siteUrl = "https://adamslaker.dev";
  const postUrl = `${siteUrl}/blog/${post.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.headerImage
      ? `${siteUrl}${post.headerImage}`
      : `${siteUrl}/og-image.png`,
    "datePublished": post.publishedAt,
    "dateModified": post.modifiedAt || post.publishedAt,
    "author": {
      "@id": `${siteUrl}/#person`
    },
    "publisher": {
      "@id": `${siteUrl}/#person`
    },
    "keywords": post.tags.join(", "),
    "wordCount": post.wordCount || 500,
    "articleSection": "Technology",
    "inLanguage": "en-US"
  };
}

// Breadcrumb schema for blog posts
export function getBlogBreadcrumbSchema(postTitle: string, postSlug: string) {
  const siteUrl = "https://adamslaker.dev";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": postTitle,
        "item": `${siteUrl}/blog/${postSlug}/`
      }
    ]
  };
}

// Combined schema for blog post pages
export function getBlogPageSchema(post: BlogPostSchemaData) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getBlogPostSchema(post),
      getBlogBreadcrumbSchema(post.title, post.slug)
    ]
  };
}
```

### Step 2: Update blog post page template

Update `/workspace/src/pages/blog/[slug].astro`:

```astro
---
import "../../styles/global.css";
import { BlogDetailPage } from "../../components/BlogDetailPage";
import { writings } from "../../data/site-data";
import JsonLd from "../../components/JsonLd.astro";
import { getBlogPageSchema } from "../../data/schema";

export function getStaticPaths() {
  return writings.map((writing) => ({
    params: { slug: writing.slug },
    props: { writing },
  }));
}

const { slug } = Astro.params;
const { writing } = Astro.props;

const siteUrl = "https://adamslaker.dev";
const canonicalUrl = `${siteUrl}/blog/${slug}/`;
const ogImage = writing.headerImage
  ? `${siteUrl}${writing.headerImage}`
  : `${siteUrl}/og-image.png`;

// Generate schema for this post
const schema = getBlogPageSchema({
  slug: writing.slug,
  title: writing.title,
  excerpt: writing.excerpt,
  publishedAt: writing.publishedAt,
  headerImage: writing.headerImage,
  tags: writing.tags,
  wordCount: 500 // Estimate or calculate from content
});
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{writing.title} | Adam Slaker</title>
    <meta name="description" content={writing.excerpt} />
    <meta name="author" content="Adam Slaker" />
    <meta name="generator" content={Astro.generator} />

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

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Structured Data -->
    <JsonLd schema={schema} />
  </head>
  <body class="bg-zinc-950 text-zinc-100 font-sans antialiased">
    <BlogDetailPage slug={slug} client:load />
  </body>
</html>
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/data/schema.ts` | Add getBlogPostSchema, getBlogBreadcrumbSchema functions |
| `/workspace/src/pages/blog/[slug].astro` | Import and use blog schema, add JsonLd component |

## Code Examples

### Expected JSON-LD output for a blog post

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://adamslaker.dev/blog/building-autonomous-agents-with-claude/",
      "headline": "Building Autonomous Agents with Claude: Lessons from Auto-Claude",
      "description": "After months of building Auto-Claude, I've learned that the key to effective autonomous agents isn't more sophisticated prompting...",
      "image": "https://adamslaker.dev/images/blog/autonomous-agents-header.jpg",
      "datePublished": "2024-12-15",
      "author": {
        "@id": "https://adamslaker.dev/#person"
      },
      "publisher": {
        "@id": "https://adamslaker.dev/#person"
      },
      "keywords": "Agentic AI, Claude, TypeScript",
      "wordCount": 500
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adamslaker.dev" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://adamslaker.dev/blog/" },
        { "@type": "ListItem", "position": 3, "name": "Building Autonomous Agents with Claude", "item": "https://adamslaker.dev/blog/building-autonomous-agents-with-claude/" }
      ]
    }
  ]
}
</script>
```

## Testing Criteria

- [ ] Each blog post has JSON-LD BlogPosting schema in page source
- [ ] Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate with [Schema Markup Validator](https://validator.schema.org/)
- [ ] Author @id links correctly to Person schema on homepage
- [ ] Breadcrumb schema shows correct hierarchy
- [ ] No validation errors or warnings

## Related Specs

- spec-004: Add JSON-LD structured data (foundation)
- spec-007: Add Service schema (similar pattern)

## References

- [Schema.org BlogPosting](https://schema.org/BlogPosting)
- [Google Article Structured Data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)
