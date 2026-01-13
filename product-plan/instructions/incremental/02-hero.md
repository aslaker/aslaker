# Milestone 2: Hero

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

Implement the Hero section — a terminal-inspired landing experience that introduces Adam Slaker as a Principal Agentic Engineer with typing animations and dual CTAs.

## Overview

The hero section is the first thing visitors see. It features:
- Typing animation for name and title with blocky blinking cursor
- Animated gradient background with subtle wave effects
- Two CTAs: "View Projects" and "Get in Touch"
- Optional social links display
- Matrix/MS-DOS inspired aesthetic

**Key Functionality:**
- Typing effect reveals name ("Adam Slaker") then title ("Principal Agentic Engineer")
- Tagline and CTAs fade in after typing completes
- Primary CTA navigates to Projects section
- Secondary CTA opens Contact modal or navigates to Contact section
- Social links open external profiles in new tabs

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/hero/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/hero/components/`:

- `Hero.tsx` — Main hero component with all content
- `TypingText.tsx` — Reusable typing animation component

### Data Layer

The components expect these data shapes:

```typescript
interface Hero {
  name: string
  title: string
  tagline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}
```

For a personal site, this data can be static/hardcoded or loaded from a CMS.

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onPrimaryCtaClick` | Navigate to Projects section |
| `onSecondaryCtaClick` | Open Contact modal or navigate to Contact section |
| `onSocialLinkClick` | Open social profile in new tab |

## Files to Reference

- `product-plan/sections/hero/README.md` — Feature overview and design intent
- `product-plan/sections/hero/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/hero/components/` — React components
- `product-plan/sections/hero/types.ts` — TypeScript interfaces
- `product-plan/sections/hero/sample-data.json` — Test data

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: View Landing Experience

1. User lands on the homepage
2. User sees typing animation reveal name "Adam Slaker"
3. After name completes, title "Principal Agentic Engineer" types out
4. After title completes, tagline and CTAs fade in
5. **Outcome:** User understands who Adam is and what he does

### Flow 2: Navigate to Projects

1. User clicks "View Projects" button
2. **Outcome:** User is scrolled/navigated to Projects section

### Flow 3: Initiate Contact

1. User clicks "Get in Touch" button
2. **Outcome:** Contact modal opens OR user navigates to Contact section

### Flow 4: Visit Social Profile

1. User clicks a social icon (GitHub, LinkedIn, X)
2. **Outcome:** External profile opens in new tab

## Done When

- [ ] Hero renders with correct content
- [ ] Typing animation works for name and title
- [ ] CTAs appear after typing completes
- [ ] Primary CTA navigates to Projects
- [ ] Secondary CTA triggers contact flow
- [ ] Social links work correctly
- [ ] Responsive on mobile
- [ ] Dark theme with Matrix-inspired styling
