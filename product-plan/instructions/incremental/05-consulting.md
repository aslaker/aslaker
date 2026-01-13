# Milestone 5: Consulting

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Consulting section — presenting three service offerings with a booking CTA and a subtle callout for Local Tech Labs.

## Overview

The consulting section showcases Adam's service offerings:
- Brief intro paragraph about consulting philosophy
- Three service cards: Strategic AI Consulting, Website Development, Fractional CTO
- Each card shows title, description, and pricing placeholder
- Prominent "Book a Consult" CTA button
- Subtle Local Tech Labs callout with external link

**Key Functionality:**
- Read intro and understand consulting approach
- Browse service cards to understand offerings
- Click "Book a Consult" to open contact modal
- Click Local Tech Labs link to visit external site

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/consulting/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/consulting/components/`:

- `ConsultingSection.tsx` — Main container with intro, cards, and CTAs
- `ServiceCard.tsx` — Individual service offering card

### Data Layer

The components expect these data shapes:

```typescript
interface Service {
  id: string
  title: string
  description: string
  placeholder: string  // Pricing placeholder text
  icon: 'brain' | 'globe' | 'users'
}

interface Intro {
  headline: string
  body: string
}

interface CTA {
  text: string
  subtext: string
  href: string
  attribution: string
}

interface LocalTechLabsCallout {
  text: string
  linkText: string
  href: string
}
```

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onBookConsult` | Open contact modal for booking |
| `onLocalTechLabsClick` | Navigate to localtechlabs.io (external) |

### Empty States

For a personal site, services should always be populated. If no services exist:
- Show a placeholder indicating services coming soon
- Keep the booking CTA available

## Files to Reference

- `product-plan/sections/consulting/README.md` — Feature overview and design intent
- `product-plan/sections/consulting/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/consulting/components/` — React components
- `product-plan/sections/consulting/types.ts` — TypeScript interfaces
- `product-plan/sections/consulting/sample-data.json` — Test data with 3 services

## Expected User Flows

### Flow 1: Browse Services

1. User navigates to Consulting section
2. User reads intro headline and body text
3. User sees three service cards with icons, titles, and descriptions
4. **Outcome:** User understands what consulting services are offered

### Flow 2: Book a Consultation

1. User clicks "Book a Consult" button
2. Contact modal opens (handled by Contact section)
3. **Outcome:** User enters booking flow

### Flow 3: Learn About Local Tech Labs

1. User sees Local Tech Labs callout at bottom
2. User clicks "Check out Local Tech Labs" link
3. **Outcome:** localtechlabs.io opens in new tab

## Done When

- [ ] Intro section renders with headline and body
- [ ] Three service cards display with icons
- [ ] Each card shows title, description, and pricing placeholder
- [ ] "Book a Consult" button triggers contact modal
- [ ] Local Tech Labs callout displays and links correctly
- [ ] Cards have hover animations
- [ ] Responsive on mobile (cards stack)
- [ ] Attribution text shows "via Local Tech Labs"
