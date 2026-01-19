---
id: spec-004
title: Add JSON-LD structured data (Person and WebSite schemas)
priority: 1
domain: seo
depends_on: []
blocks: [spec-005]
parallel_safe: true
files:
  - /workspace/src/pages/index.astro
  - /workspace/src/components/JsonLd.astro
wcag_criteria: []
estimated_complexity: medium
---

## Problem

No structured data (JSON-LD schema markup) is implemented on any pages. Structured data helps search engines understand page content and can enable rich results in search listings (person cards, sitelinks, knowledge panels).

**SEO Impact:**
- No rich results eligibility
- Reduced search visibility
- Missing knowledge panel opportunities
- Lower click-through rates compared to enhanced listings

## Current State

File: `/workspace/src/pages/index.astro`

```astro
<head>
  <!-- Standard meta tags present -->
  <!-- NO JSON-LD structured data -->
</head>
```

## Desired State

Homepage includes JSON-LD structured data for:
1. **Person schema** - Professional information about Adam Slaker
2. **WebSite schema** - Site identity and searchability

This creates the foundation for rich results and establishes entity connections for search engines.

## Implementation Steps

### Step 1: Create reusable JsonLd component

Create `/workspace/src/components/JsonLd.astro`:

```astro
---
interface Props {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

const { schema } = Astro.props;
const jsonLd = JSON.stringify(schema, null, 2);
---

<script type="application/ld+json" set:html={jsonLd} />
```

### Step 2: Create schema data file

Create `/workspace/src/data/schema.ts`:

```typescript
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://adamslaker.dev/#person",
  "name": "Adam Slaker",
  "jobTitle": "Principal Agentic Engineer",
  "description": "Building intelligent systems that think, adapt, and ship. AI consultant, fractional CTO, and software engineer specializing in agentic AI systems.",
  "url": "https://adamslaker.dev",
  "image": "https://adamslaker.dev/og-image.png",
  "sameAs": [
    "https://github.com/aslaker",
    "https://linkedin.com/in/adamslaker"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "Agentic AI Systems",
    "TypeScript",
    "React",
    "Cloud Infrastructure",
    "AI Architecture",
    "LLM Integration",
    "Claude AI"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Independent Consultant"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://adamslaker.dev/#website",
  "url": "https://adamslaker.dev",
  "name": "Adam Slaker - Principal Agentic Engineer",
  "description": "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.",
  "publisher": {
    "@id": "https://adamslaker.dev/#person"
  },
  "inLanguage": "en-US"
};

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://adamslaker.dev/#profilepage",
  "url": "https://adamslaker.dev",
  "name": "Adam Slaker - Portfolio",
  "mainEntity": {
    "@id": "https://adamslaker.dev/#person"
  },
  "dateCreated": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0]
};

// Combined graph for efficient single script tag
export function getHomePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      websiteSchema,
      profilePageSchema
    ]
  };
}
```

### Step 3: Update homepage to include schema

Update `/workspace/src/pages/index.astro`:

```astro
---
import "../styles/global.css";
import { PortfolioApp } from "../components/PortfolioApp";
import JsonLd from "../components/JsonLd.astro";
import { getHomePageSchema } from "../data/schema";

const title = "Adam Slaker | Principal Agentic Engineer";
const description =
  "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.";
const canonicalUrl = "https://adamslaker.dev/";
const schema = getHomePageSchema();
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

    <!-- Structured Data -->
    <JsonLd schema={schema} />
  </head>
  <body class="bg-zinc-950 text-zinc-100 font-sans antialiased">
    <PortfolioApp client:load />
  </body>
</html>
```

## Files to Modify

| File | Action |
|------|--------|
| `/workspace/src/components/JsonLd.astro` | Create new component |
| `/workspace/src/data/schema.ts` | Create new file with schema definitions |
| `/workspace/src/pages/index.astro` | Import and use JsonLd component |

## Code Examples

### Expected JSON-LD output in HTML

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://adamslaker.dev/#person",
      "name": "Adam Slaker",
      "jobTitle": "Principal Agentic Engineer",
      "description": "Building intelligent systems that think, adapt, and ship...",
      "url": "https://adamslaker.dev",
      "sameAs": [
        "https://github.com/aslaker",
        "https://linkedin.com/in/adamslaker"
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "Agentic AI Systems",
        "TypeScript",
        "React"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://adamslaker.dev/#website",
      "url": "https://adamslaker.dev",
      "name": "Adam Slaker - Principal Agentic Engineer",
      "publisher": {
        "@id": "https://adamslaker.dev/#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://adamslaker.dev/#profilepage",
      "mainEntity": {
        "@id": "https://adamslaker.dev/#person"
      }
    }
  ]
}
</script>
```

## Testing Criteria

- [ ] View page source - verify JSON-LD script tag is present
- [ ] Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate with [Schema Markup Validator](https://validator.schema.org/)
- [ ] No errors or warnings in validation results
- [ ] Person schema shows correct name, job title, and social links
- [ ] WebSite schema shows correct URL and name

## Related Specs

- spec-005: Add BlogPosting schema to blog posts (builds on this foundation)
- spec-006: Add Service schema for consulting (builds on this foundation)

## References

- [Google Structured Data Documentation](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema.org Person](https://schema.org/Person)
- [Schema.org WebSite](https://schema.org/WebSite)
- [Schema Markup Validator](https://validator.schema.org/)
