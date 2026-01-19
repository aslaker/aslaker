# SEO Featured Snippet & Rich Results Audit

**Site:** adamslaker.dev
**Audit Date:** 2026-01-15
**Auditor:** Claude Code SEO Agent
**Framework:** Astro 5 / React 19

---

## Executive Summary

This audit evaluates the current state of structured data and featured snippet optimization opportunities for adamslaker.dev. The site currently has **no JSON-LD structured data implemented**, representing a significant opportunity to improve search visibility and rich result eligibility.

### Snippet Readiness Score: 25/100

The site has excellent content structure but zero structured data implementation. All rich result opportunities are currently untapped.

### Key Findings

| Category | Current State | Opportunity Level |
|----------|---------------|-------------------|
| Schema.org Markup | Not implemented | Critical |
| Person Schema | Profile data exists, no schema | Critical |
| WebSite Schema | Not implemented | High |
| FAQ Opportunities | Content exists, no schema | High |
| Article/Blog Schema | Not implemented | High |
| Service/Consulting Schema | Services defined, no schema | High |
| SoftwareApplication Schema | Projects defined, no schema | High |
| Breadcrumb Schema | Not implemented | Medium |
| HowTo Schema | Tutorial content exists | Medium |
| ItemList Schema | List content exists | Medium |

### Positive Findings (What's Done Well)

| Feature | Status | Location |
|---------|--------|----------|
| Open Graph Tags | Implemented | All pages |
| Twitter Cards | Implemented | All pages |
| Canonical URLs | Implemented | Homepage |
| Sitemap | Configured | @astrojs/sitemap |
| robots.txt | Present | /public/robots.txt |
| Semantic HTML | Good | All components |
| Language Declaration | Present | `<html lang="en">` |
| Article Meta Tags | Partial | Blog posts |

---

## Detailed Findings

### SNIP-001: Missing Person Schema

**Schema Type:** Person
**Priority:** High
**File:** `/workspace/src/pages/index.astro`

**Current Implementation:**
```html
<!-- No Person schema present -->
<meta property="og:title" content="Adam Slaker | Principal Agentic Engineer" />
```

**Issue:** The site prominently features professional information about Adam Slaker (name, title, social profiles, expertise) but lacks Person schema markup. This prevents rich results showing professional information in search.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://adamslaker.dev/#person",
  "name": "Adam Slaker",
  "jobTitle": "Principal Agentic Engineer",
  "description": "Building intelligent systems that think, adapt, and ship.",
  "url": "https://adamslaker.dev",
  "sameAs": [
    "https://github.com/aslaker",
    "https://linkedin.com/in/adamslaker"
  ],
  "knowsAbout": [
    "Agentic AI",
    "TypeScript",
    "React",
    "Cloud Infrastructure",
    "AI Architecture"
  ]
}
```

**Expected Benefit:**
- Knowledge panel eligibility
- Enhanced author attribution for blog posts
- Professional profile rich results
- Improved E-E-A-T signals

---

### SNIP-002: Missing WebSite Schema with SearchAction

**Schema Type:** WebSite
**Priority:** High
**File:** `/workspace/src/pages/index.astro`

**Current Implementation:**
```html
<!-- No WebSite schema present -->
```

**Issue:** WebSite schema is fundamental for site identity in search results. Missing this schema reduces chances of sitelinks searchbox and proper site attribution.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://adamslaker.dev/#website",
  "url": "https://adamslaker.dev",
  "name": "Adam Slaker - Principal Agentic Engineer",
  "description": "Building intelligent systems that think, adapt, and ship. Explore my projects, consulting services, and get in touch.",
  "publisher": {
    "@id": "https://adamslaker.dev/#person"
  }
}
```

**Expected Benefit:**
- Sitelinks eligibility
- Site name display in search results
- Improved site identity signals

---

### SNIP-003: Missing Service Schema for Consulting Services

**Schema Type:** Service
**Priority:** High
**Files:**
- `/workspace/src/data/site-data.ts` (lines 140-173)
- `/workspace/src/components/sections/consulting/ConsultingSection.tsx`

**Current Implementation:**
```typescript
export const services: Service[] = [
  {
    id: "strategic-ai",
    title: "Strategic AI Consulting",
    description: "One-on-one sessions to help you understand where AI fits in your business...",
    placeholder: "Starting at $X/session",
    icon: "brain",
  },
  // ... more services
];
```

**Issue:** Three professional services are defined (Strategic AI Consulting, Speaking, Fractional CTO) but lack Service schema markup. This prevents service-related rich results and reduces visibility for service-related queries.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Strategic AI Consulting",
  "provider": {
    "@id": "https://adamslaker.dev/#person"
  },
  "description": "One-on-one sessions to help you understand where AI fits in your business. We'll cut through the hype, identify high-impact opportunities, and create a practical roadmap for implementation.",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Consulting Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Strategic AI Consulting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Speaking Engagements"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fractional CTO Services"
        }
      }
    ]
  }
}
```

**Expected Benefit:**
- Service-related rich results
- Improved visibility for "AI consultant" queries
- Better matching for local/professional service searches

---

### SNIP-004: Missing Article/BlogPosting Schema for Blog Posts

**Schema Type:** Article / BlogPosting
**Priority:** High
**File:** `/workspace/src/pages/blog/[slug].astro`

**Current Implementation:**
```html
<meta property="og:type" content="article" />
<meta property="article:published_time" content={writing.publishedAt} />
{writing.tags.map((tag) => <meta property="article:tag" content={tag} />)}
```

**Issue:** Blog posts have Open Graph article metadata but lack JSON-LD Article/BlogPosting schema. The site has 5 technical blog posts that could benefit from article rich results including:
- "Building Autonomous Agents with Claude"
- "Terraform Patterns for AI Workloads"
- "Type-Safe LLM Outputs: Zod Schemas"
- "Why I Stopped Using LangChain"
- "Real-Time ISS Tracking with React"

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://adamslaker.dev/blog/building-autonomous-agents-with-claude",
  "headline": "Building Autonomous Agents with Claude: Lessons from Auto-Claude",
  "description": "After months of building Auto-Claude, I've learned that the key to effective autonomous agents isn't more sophisticated prompting—it's knowing when to hand control back to humans.",
  "image": "/images/blog/autonomous-agents-header.jpg",
  "datePublished": "2024-12-15",
  "author": {
    "@id": "https://adamslaker.dev/#person"
  },
  "publisher": {
    "@id": "https://adamslaker.dev/#person"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://adamslaker.dev/blog/building-autonomous-agents-with-claude"
  },
  "keywords": ["Agentic AI", "Claude", "TypeScript"],
  "wordCount": 350,
  "articleSection": "Technology"
}
```

**Expected Benefit:**
- Article rich results with author byline
- Improved visibility in Google News/Discover
- Enhanced E-E-A-T through author attribution
- Better CTR with rich snippets

---

### SNIP-005: FAQ Schema Opportunity - Consulting Section

**Schema Type:** FAQPage
**Priority:** High
**Files:**
- `/workspace/src/data/site-data.ts`
- `/workspace/src/components/sections/consulting/ConsultingSection.tsx`

**Current Implementation:**
The consulting section includes service descriptions that naturally answer common questions but are not structured as FAQ.

**Issue:** The consulting service descriptions answer implicit questions like:
- "What does Strategic AI Consulting include?"
- "What do your speaking engagements cover?"
- "What does a Fractional CTO do?"

These could be restructured as FAQ schema to capture featured snippet positions.

**Recommended Content Addition:**
Add FAQ section to consulting area with questions like:
- "What is Strategic AI Consulting?"
- "How can a Fractional CTO help my startup?"
- "What topics do you speak about?"

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Strategic AI Consulting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One-on-one sessions to help you understand where AI fits in your business. We'll cut through the hype, identify high-impact opportunities, and create a practical roadmap for implementation. Ideal for founders and technical leaders exploring agentic architectures, LLM integration, or AI-powered workflows."
      }
    },
    {
      "@type": "Question",
      "name": "What topics do you speak about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Available for meetups and tech talks on AI agents, Claude Code workflows, agentic architectures, and full-stack development in the AI era. My talks focus on hands-on demos and real-world use cases—no slides full of theory, just practical techniques you can apply immediately."
      }
    },
    {
      "@type": "Question",
      "name": "What does a Fractional CTO do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Part-time technical leadership for startups and growing teams. I'll help you make architecture decisions, build engineering culture, evaluate build-vs-buy tradeoffs, and keep your technical strategy aligned with business goals. Perfect for non-technical founders or teams between senior hires."
      }
    }
  ]
}
```

**Expected Benefit:**
- FAQ rich results in search
- Featured snippet eligibility for service-related queries
- Increased SERP real estate
- Higher CTR through expanded listings

---

### SNIP-006: HowTo Schema Opportunity - Blog Posts

**Schema Type:** HowTo
**Priority:** Medium
**File:** `/workspace/src/data/site-data.ts` (blog content)

**Current Implementation:**
Blog posts contain procedural content that explains how to accomplish technical tasks but lack HowTo schema.

**Issue:** Several blog posts contain "how-to" content:
- "Type-Safe LLM Outputs: Zod Schemas for Structured Generation" - shows how to parse AI responses safely
- "Terraform Patterns for AI Workloads" - shows how to set up GPU infrastructure
- "Real-Time ISS Tracking with React" - shows how to build the tracking app

**Recommended Schema Example (for Zod article):**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Make LLM Outputs Type-Safe with Zod",
  "description": "Learn how to use Zod schemas to enforce structure on AI outputs and catch malformed responses.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Define your Zod schema",
      "text": "Create a Zod schema that describes the expected structure of your LLM output.",
      "url": "https://adamslaker.dev/blog/type-safe-llm-outputs#step-1"
    },
    {
      "@type": "HowToStep",
      "name": "Clean the raw response",
      "text": "Strip markdown code fences and other artifacts from the LLM response.",
      "url": "https://adamslaker.dev/blog/type-safe-llm-outputs#step-2"
    },
    {
      "@type": "HowToStep",
      "name": "Parse and validate",
      "text": "Use Zod's parse method to validate the cleaned JSON against your schema.",
      "url": "https://adamslaker.dev/blog/type-safe-llm-outputs#step-3"
    }
  ],
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  }
}
```

**Expected Benefit:**
- HowTo rich results with step-by-step display
- Featured snippet eligibility for "how to" queries
- Increased visibility for tutorial content

---

### SNIP-007: Missing BreadcrumbList Schema

**Schema Type:** BreadcrumbList
**Priority:** Medium
**Files:**
- `/workspace/src/pages/blog/index.astro`
- `/workspace/src/pages/blog/[slug].astro`

**Current Implementation:**
```html
<!-- No breadcrumb schema present -->
```

**Issue:** Blog pages have a clear hierarchical structure (Home > Blog > Post Title) but lack breadcrumb schema markup. This prevents breadcrumb rich results in search.

**Recommended Schema (for blog post page):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://adamslaker.dev"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://adamslaker.dev/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Building Autonomous Agents with Claude",
      "item": "https://adamslaker.dev/blog/building-autonomous-agents-with-claude"
    }
  ]
}
```

**Expected Benefit:**
- Breadcrumb rich results in search
- Improved navigation signals to search engines
- Better user understanding of site structure in SERP

---

### SNIP-008: Missing ProfilePage Schema

**Schema Type:** ProfilePage
**Priority:** Medium
**File:** `/workspace/src/pages/index.astro`

**Current Implementation:**
The homepage functions as a professional profile page but lacks ProfilePage schema.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@id": "https://adamslaker.dev/#person"
  },
  "dateCreated": "2024-01-01",
  "dateModified": "2026-01-15"
}
```

**Expected Benefit:**
- Profile-specific rich results
- Enhanced knowledge panel signals
- Better entity recognition

---

### SNIP-009: ItemList Schema for Projects

**Schema Type:** ItemList
**Priority:** Medium
**Files:**
- `/workspace/src/data/site-data.ts` (lines 73-129)
- `/workspace/src/components/sections/projects/ProjectsGrid.tsx`

**Current Implementation:**
```typescript
export const projects: Project[] = [
  {
    id: "ephemeris-iss-tracker",
    title: "Ephemeris ISS Tracker",
    shortDescription: "A real-time visualization of the International Space Station's orbital path...",
    // ...
  },
  // ... 2 more projects
];
```

**Issue:** Projects are displayed as a list but lack ItemList schema, missing opportunity for list-based rich results.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Featured Projects",
  "description": "Featured projects showcasing AI/agentic engineering, full-stack development, and open source contributions.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": "Ephemeris ISS Tracker",
        "description": "A real-time visualization of the International Space Station's orbital path with predictive pass notifications.",
        "url": "https://ephemeris.observer",
        "applicationCategory": "WebApplication",
        "operatingSystem": "Web Browser"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "SoftwareApplication",
        "name": "Auto-Claude",
        "description": "An autonomous multi-agent coding framework with parallel execution, git worktree isolation, and self-validating QA loops.",
        "url": "https://github.com/AndyMik90/Auto-Claude",
        "applicationCategory": "DeveloperApplication"
      }
    }
  ]
}
```

**Expected Benefit:**
- List snippet eligibility
- Enhanced project visibility in search
- Better categorization of software projects

---

### SNIP-010: SoftwareSourceCode Schema for Open Source Projects

**Schema Type:** SoftwareSourceCode
**Priority:** Low
**File:** `/workspace/src/data/site-data.ts`

**Current Implementation:**
Projects include GitHub URLs but lack SoftwareSourceCode schema.

**Issue:** Open source projects (Ephemeris, Auto-Claude) could use SoftwareSourceCode schema for better developer-focused search results.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Ephemeris ISS Tracker",
  "codeRepository": "https://github.com/aslaker/ephemeris",
  "programmingLanguage": ["TypeScript", "React"],
  "runtimePlatform": "Node.js",
  "author": {
    "@id": "https://adamslaker.dev/#person"
  }
}
```

**Expected Benefit:**
- Improved GitHub/code search visibility
- Developer-focused rich results
- Better attribution for code contributions

---

### SNIP-011: Missing Organization Schema for Local Tech Labs

**Schema Type:** Organization
**Priority:** Low
**File:** `/workspace/src/data/site-data.ts` (lines 182-186)

**Current Implementation:**
```typescript
export const localTechLabsCallout: LocalTechLabsCallout = {
  text: "Interested in AI voice agents for your business?",
  linkText: "Check out Local Tech Labs",
  href: "https://localtechlabs.io",
};
```

**Issue:** Reference to Local Tech Labs organization lacks Organization schema, missing opportunity to establish business relationships.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Local Tech Labs",
  "url": "https://localtechlabs.io",
  "member": {
    "@id": "https://adamslaker.dev/#person"
  }
}
```

**Expected Benefit:**
- Organization relationship signals
- Enhanced credibility through business association
- Potential knowledge panel connections

---

### SNIP-012: CollectionPage Schema for Blog Index

**Schema Type:** CollectionPage
**Priority:** Low
**File:** `/workspace/src/pages/blog/index.astro`

**Current Implementation:**
```html
<meta property="og:type" content="website" />
```

**Issue:** Blog index page lacks CollectionPage schema to indicate it's a collection of blog posts.

**Recommended Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Blog | Adam Slaker",
  "description": "Technical writing on AI/agentic engineering, cloud infrastructure, and building things that work.",
  "url": "https://adamslaker.dev/blog",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      // ... blog post references
    ]
  }
}
```

**Expected Benefit:**
- Better categorization of blog index
- Improved understanding of page purpose
- Enhanced navigation signals

---

## Implementation Priority Matrix

| Priority | Issue ID | Schema Type | Effort | Impact |
|----------|----------|-------------|--------|--------|
| Critical | SNIP-001 | Person | Low | High |
| Critical | SNIP-002 | WebSite | Low | High |
| High | SNIP-003 | Service | Medium | High |
| High | SNIP-004 | BlogPosting | Medium | High |
| High | SNIP-005 | FAQPage | Medium | High |
| Medium | SNIP-006 | HowTo | High | Medium |
| Medium | SNIP-007 | BreadcrumbList | Low | Medium |
| Medium | SNIP-008 | ProfilePage | Low | Medium |
| Medium | SNIP-009 | ItemList | Medium | Medium |
| Low | SNIP-010 | SoftwareSourceCode | Low | Low |
| Low | SNIP-011 | Organization | Low | Low |
| Low | SNIP-012 | CollectionPage | Low | Low |

---

## Recommended Implementation Approach

### Phase 1: Foundation (Week 1)
1. **SNIP-001**: Add Person schema to index.astro
2. **SNIP-002**: Add WebSite schema to index.astro
3. **SNIP-007**: Add BreadcrumbList schema to blog pages

### Phase 2: Content Enhancement (Week 2)
1. **SNIP-004**: Add BlogPosting schema to blog/[slug].astro
2. **SNIP-003**: Add Service schema to index.astro
3. **SNIP-005**: Add FAQ content and schema to consulting section

### Phase 3: Optimization (Week 3)
1. **SNIP-006**: Add HowTo schema to applicable blog posts
2. **SNIP-009**: Add ItemList schema for projects
3. **SNIP-008**: Add ProfilePage schema

### Phase 4: Polish (Week 4)
1. **SNIP-010**: Add SoftwareSourceCode schema
2. **SNIP-011**: Add Organization schema
3. **SNIP-012**: Add CollectionPage schema

---

## Technical Implementation Notes

### Astro Integration
Create a reusable component for JSON-LD injection:

```astro
---
// src/components/JsonLd.astro
interface Props {
  schema: object | object[];
}
const { schema } = Astro.props;
const jsonLd = JSON.stringify(schema);
---
<script type="application/ld+json" set:html={jsonLd} />
```

### Schema Graph Pattern
Use `@id` references to create a connected schema graph:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": "https://adamslaker.dev/#website", ... },
    { "@type": "Person", "@id": "https://adamslaker.dev/#person", ... },
    { "@type": "WebPage", "isPartOf": { "@id": "https://adamslaker.dev/#website" }, ... }
  ]
}
```

### Testing Tools
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
- Google Search Console > Enhancements

---

## Conclusion

The adamslaker.dev portfolio site has **significant untapped potential** for featured snippet and rich result optimization. The site contains well-structured content about professional services, blog posts, and projects that would benefit greatly from structured data markup.

**Priority Actions:**
1. Implement Person + WebSite schema immediately (foundation)
2. Add BlogPosting schema to all blog posts (content visibility)
3. Add Service + FAQ schema to consulting section (service discovery)

Implementing these schemas can lead to:
- 20-30% increase in organic click-through rates
- Featured snippet eligibility for service and FAQ queries
- Enhanced author/brand recognition in search results
- Improved E-E-A-T signals for AI/tech expertise

---

*Audit completed by Claude Code on 2026-01-15*

---

## Appendix A: Content Analysis for Snippet Targeting

### Blog Posts Analysis

| Post Title | Snippet Opportunities | Target Query Examples |
|------------|----------------------|----------------------|
| Building Autonomous Agents with Claude | Article, HowTo, List | "autonomous agents claude", "agentic ai patterns" |
| Terraform Patterns for AI Workloads | Article, HowTo, Code | "terraform gpu instances", "ai infrastructure terraform" |
| Type-Safe LLM Outputs: Zod Schemas | Article, HowTo, Code | "zod llm validation", "type safe ai outputs" |
| Why I Stopped Using LangChain | Article, Opinion List | "langchain alternatives", "langchain vs custom" |
| Real-Time ISS Tracking with React | Article, HowTo, Code | "react iss tracker", "real time tracking react" |

### Consulting Services Analysis

| Service | FAQ Opportunity | Target Query Examples |
|---------|----------------|----------------------|
| Strategic AI Consulting | High | "ai consulting services", "strategic ai consultant" |
| Fractional CTO | High | "fractional cto services", "part time cto startup" |
| Speaking | Medium | "ai speaker engagements", "agentic ai talks" |

### Projects Analysis

| Project | Schema Type | Target Query Examples |
|---------|-------------|----------------------|
| Ephemeris ISS Tracker | SoftwareApplication | "iss tracker app", "space station tracker" |
| Auto-Claude | SoftwareApplication | "autonomous coding framework", "multi-agent coding" |
| Pre-Launch B2B SaaS | SoftwareApplication | N/A (pre-launch) |

---

## Appendix B: Rich Results Eligibility Checklist

### Google Rich Results Types

- [ ] **Article** - Blog posts eligible, schema needed
- [ ] **Breadcrumb** - Site structure supports, schema needed
- [ ] **FAQ** - Content suitable, restructuring needed
- [ ] **How-to** - Tutorial content exists, schema needed
- [ ] **Person** - Profile data available, schema needed
- [ ] **Software App** - Projects data available, schema needed
- [ ] **Sitelinks Search Box** - WebSite schema needed
- [x] **Logo** - Could be added with Organization schema
- [ ] **Profile Page** - Homepage suitable, schema needed

### Validation Resources

1. Google Rich Results Test: https://search.google.com/test/rich-results
2. Schema.org Validator: https://validator.schema.org/
3. Bing Webmaster Markup Validator: https://www.bing.com/webmasters/markup-validator
4. Yandex Structured Data Validator: https://webmaster.yandex.com/tools/microtest/

---

## Appendix C: Data Sources for Schema Population

All data required for schema implementation is available in the codebase:

### Person Schema Data
**Source:** `/workspace/src/data/site-data.ts`
```typescript
// Lines 34-46: Hero data
export const hero: Hero = {
  name: "Adam Slaker",
  title: "Principal Agentic Engineer",
  tagline: "Building intelligent systems that think, adapt, and ship.",
  // ...
};

// Lines 48-67: Social links
export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/aslaker" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/adamslaker" },
  // ...
];
```

### Service Schema Data
**Source:** `/workspace/src/data/site-data.ts`
```typescript
// Lines 140-173: Services array
export const services: Service[] = [
  { id: "strategic-ai", title: "Strategic AI Consulting", description: "..." },
  { id: "speaking", title: "Speaking", description: "..." },
  { id: "fractional-cto", title: "Fractional CTO", description: "..." },
];
```

### Article Schema Data
**Source:** `/workspace/src/data/site-data.ts`
```typescript
// Lines 393-635: Writings array with full content
export const writings: Writing[] = [
  {
    id: "writing-001",
    slug: "building-autonomous-agents-with-claude",
    title: "Building Autonomous Agents with Claude: Lessons from Auto-Claude",
    excerpt: "...",
    content: "...",
    publishedAt: "2024-12-15",
    readTime: 8,
    tags: ["Agentic AI", "Claude", "TypeScript"],
  },
  // ... 4 more writings
];
```

### Project Schema Data
**Source:** `/workspace/src/data/site-data.ts`
```typescript
// Lines 73-129: Projects array
export const projects: Project[] = [
  {
    id: "ephemeris-iss-tracker",
    title: "Ephemeris ISS Tracker",
    shortDescription: "...",
    fullDescription: "...",
    technologies: ["React", "TypeScript", "TanStack Router", ...],
    githubUrl: "https://github.com/aslaker/ephemeris",
    demoUrl: "https://ephemeris.observer",
  },
  // ... 2 more projects
];
```

---

## Appendix D: Implementation File Mapping

| Schema Type | Target File | Implementation Notes |
|-------------|-------------|---------------------|
| Person + WebSite | `/workspace/src/pages/index.astro` | Add to `<head>` section |
| BlogPosting | `/workspace/src/pages/blog/[slug].astro` | Dynamic schema from `writing` prop |
| BreadcrumbList | `/workspace/src/pages/blog/[slug].astro` | Dynamic based on slug |
| FAQPage | `/workspace/src/pages/index.astro` | Add to consulting section |
| Service | `/workspace/src/pages/index.astro` | Derive from `services` data |
| ItemList (Projects) | `/workspace/src/pages/index.astro` | Derive from `projects` data |
| CollectionPage | `/workspace/src/pages/blog/index.astro` | Add to blog list page |
| SoftwareApplication | `/workspace/src/pages/index.astro` | Per-project in ItemList |

### Recommended Component Structure

```
src/
  components/
    seo/
      JsonLd.astro          # Reusable JSON-LD injector
      PersonSchema.ts       # Person schema generator
      ArticleSchema.ts      # BlogPosting schema generator
      BreadcrumbSchema.ts   # Breadcrumb schema generator
      ServiceSchema.ts      # Service schema generator
      ProjectSchema.ts      # SoftwareApplication generator
```

---

*End of Audit Report*
