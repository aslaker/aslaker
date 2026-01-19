---
id: spec-007
title: Add Service and FAQ schemas for consulting section
priority: 2
domain: seo
depends_on: [spec-004]
blocks: []
parallel_safe: false
files:
  - /workspace/src/data/schema.ts
  - /workspace/src/pages/index.astro
wcag_criteria: []
estimated_complexity: medium
---

## Problem

Three professional services are defined (Strategic AI Consulting, Speaking, Fractional CTO) but lack Service schema markup. Additionally, the consulting service descriptions naturally answer common questions but are not structured as FAQ. This prevents service-related rich results and FAQ featured snippets.

**SEO Impact:**
- No service-related rich results
- Missing FAQ featured snippet opportunities
- Reduced visibility for service-related queries like "AI consultant" or "fractional CTO"

## Current State

File: `/workspace/src/data/site-data.ts`

```typescript
export const services: Service[] = [
  {
    id: "strategic-ai",
    title: "Strategic AI Consulting",
    description: "One-on-one sessions to help you understand where AI fits...",
    placeholder: "Starting at $X/session",
    icon: "brain",
  },
  {
    id: "speaking",
    title: "Speaking",
    description: "Available for meetups and tech talks on AI agents...",
    placeholder: "Let's chat",
    icon: "mic",
  },
  {
    id: "fractional-cto",
    title: "Fractional CTO",
    description: "Part-time technical leadership for startups...",
    placeholder: "Monthly retainer",
    icon: "briefcase",
  },
];
```

No JSON-LD Service or FAQ schema is present.

## Desired State

1. Service schema for consulting services
2. FAQ schema with common questions about services
3. Rich results eligibility for service and FAQ queries

## Implementation Steps

### Step 1: Add Service and FAQ schemas to schema.ts

Update `/workspace/src/data/schema.ts`:

```typescript
// ... existing schemas ...

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Professional Consulting Services",
  "provider": {
    "@id": "https://adamslaker.dev/#person"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "description": "AI consulting, technical leadership, and speaking services for startups and growing teams.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Consulting Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Strategic AI Consulting",
          "description": "One-on-one sessions to help you understand where AI fits in your business. We'll cut through the hype, identify high-impact opportunities, and create a practical roadmap for implementation. Ideal for founders and technical leaders exploring agentic architectures, LLM integration, or AI-powered workflows."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Speaking Engagements",
          "description": "Available for meetups and tech talks on AI agents, Claude Code workflows, agentic architectures, and full-stack development in the AI era. My talks focus on hands-on demos and real-world use cases—no slides full of theory, just practical techniques you can apply immediately."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fractional CTO Services",
          "description": "Part-time technical leadership for startups and growing teams. I'll help you make architecture decisions, build engineering culture, evaluate build-vs-buy tradeoffs, and keep your technical strategy aligned with business goals. Perfect for non-technical founders or teams between senior hires."
        }
      }
    ]
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Strategic AI Consulting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategic AI Consulting consists of one-on-one sessions to help you understand where AI fits in your business. We'll cut through the hype, identify high-impact opportunities, and create a practical roadmap for implementation. This is ideal for founders and technical leaders exploring agentic architectures, LLM integration, or AI-powered workflows."
      }
    },
    {
      "@type": "Question",
      "name": "What topics do you speak about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I'm available for meetups and tech talks on AI agents, Claude Code workflows, agentic architectures, and full-stack development in the AI era. My talks focus on hands-on demos and real-world use cases—no slides full of theory, just practical techniques you can apply immediately."
      }
    },
    {
      "@type": "Question",
      "name": "What does a Fractional CTO do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Fractional CTO provides part-time technical leadership for startups and growing teams. I help you make architecture decisions, build engineering culture, evaluate build-vs-buy tradeoffs, and keep your technical strategy aligned with business goals. This is perfect for non-technical founders or teams between senior hires."
      }
    },
    {
      "@type": "Question",
      "name": "How can AI consulting help my startup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI consulting helps startups by providing expert guidance on where and how to implement AI effectively. This includes identifying high-impact use cases, selecting appropriate technologies (like Claude, GPT, or custom models), designing agentic architectures, and creating implementation roadmaps that align with your business goals and technical capabilities."
      }
    },
    {
      "@type": "Question",
      "name": "What is an agentic engineer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An agentic engineer specializes in building autonomous AI systems that can plan, execute, and adapt to achieve goals with minimal human intervention. This includes designing multi-agent architectures, implementing LLM orchestration, creating self-validating workflows, and building systems that combine AI reasoning with practical software engineering."
      }
    }
  ]
};

// Update getHomePageSchema to include Service and FAQ
export function getHomePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      websiteSchema,
      profilePageSchema,
      serviceSchema,
      faqSchema
    ]
  };
}
```

### Step 2: Update homepage (if not already importing schema)

Ensure `/workspace/src/pages/index.astro` imports and uses the updated schema (should already be done from spec-004).

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/data/schema.ts` | Add serviceSchema, faqSchema, update getHomePageSchema |

## Code Examples

### Expected Service schema output

```json
{
  "@type": "Service",
  "serviceType": "Professional Consulting Services",
  "provider": {
    "@id": "https://adamslaker.dev/#person"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Consulting Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Strategic AI Consulting",
          "description": "..."
        }
      }
    ]
  }
}
```

### Expected FAQ schema output

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Strategic AI Consulting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

## Testing Criteria

- [ ] Service schema appears in page source
- [ ] FAQ schema appears in page source
- [ ] Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] FAQ questions match service descriptions
- [ ] No validation errors in schema
- [ ] Service provider links to Person schema via @id

## Related Specs

- spec-004: Add JSON-LD structured data (foundation)
- spec-006: Add BlogPosting schema (similar pattern)

## References

- [Schema.org Service](https://schema.org/Service)
- [Schema.org FAQPage](https://schema.org/FAQPage)
- [Google FAQ Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
