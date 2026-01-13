# adamslaker.dev — Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

## Product Overview

A personal site and digital home for Adam Slaker - Principal Agentic Engineer, open source maintainer, and builder of intelligent systems. The site showcases his expertise in AI-powered development and full-stack engineering, his active projects, and the human behind the code.

**Sections:**
1. **Hero** — Terminal-inspired landing with typing animation
2. **Projects** — Project showcase with card grid and detail modals
3. **About** — Themed hobby cards (character sheet, scorecard, trail map)
4. **Consulting** — Service cards with booking CTA
5. **Contact** — Two-step contact modal (form + calendar)
6. **Blog** — Searchable, filterable blog with rich content

**Design System:**
- Colors: lime (primary), emerald (secondary), zinc (neutral)
- Typography: Space Grotesk (heading), Inter (body), JetBrains Mono (mono)
- Aesthetic: Dark theme, Matrix/terminal inspired, lime green accents

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system:
- **Primary:** `lime` — Matrix-inspired green for buttons, links, key accents
- **Secondary:** `emerald` — Subtle highlights, secondary hover states
- **Neutral:** `zinc` — Dark backgrounds (zinc-950/900), text colors, borders
- **Heading font:** Space Grotesk
- **Body font:** Inter
- **Mono font:** JetBrains Mono

See `product-plan/design-system/` for detailed token files.

### 2. Data Model Types

Create TypeScript interfaces for core entities:
- `Project`, `Tag`, `Service`, `Interest`, `Writing`, `SocialLink`

See `product-plan/data-model/types.ts` for definitions.

### 3. Routing Structure

| Route | Section |
|-------|---------|
| `/` | Hero (landing) |
| `/projects` or `#projects` | Projects showcase |
| `/about` or `#about` | About / interests |
| `/consulting` or `#consulting` | Consulting services |
| `/contact` or `#contact` | Contact section |
| `/blog` | Blog list |
| `/blog/:slug` | Blog detail |

### 4. Application Shell

Copy shell components from `product-plan/shell/components/`:
- `AppShell.tsx` — Main layout wrapper with header
- `MainNav.tsx` — Desktop navigation
- `MobileMenu.tsx` — Mobile slide-out menu
- `SocialLinks.tsx` — Social media icons

Wire up navigation to routes and social links to external profiles.

## Done When

- [ ] Design tokens are configured
- [ ] Data model types are defined
- [ ] Routes exist for all sections
- [ ] Shell renders with navigation
- [ ] Social links work
- [ ] Responsive on mobile

---

# Milestone 2: Hero

## Goal

Implement the Hero section — terminal-inspired landing with typing animation and dual CTAs.

## What to Implement

### Components
- `Hero.tsx` — Main hero with animated background
- `TypingText.tsx` — Typing animation component

### Key Features
- Typing animation for name and title
- Animated gradient background with wave effects
- Two CTAs: "View Projects" and "Get in Touch"
- Social links display

### Callbacks
- `onPrimaryCtaClick` — Navigate to Projects
- `onSecondaryCtaClick` — Open Contact modal
- `onSocialLinkClick` — Open social profile

## Done When

- [ ] Typing animation works
- [ ] CTAs navigate correctly
- [ ] Social links work
- [ ] Responsive on mobile

---

# Milestone 3: Projects

## Goal

Implement the Projects section — visual portfolio with card grid and detail modals.

## What to Implement

### Components
- `ProjectsGrid.tsx` — Grid container with modal state
- `ProjectCard.tsx` — Individual project card
- `ProjectModal.tsx` — Detail modal

### Key Features
- Two-column responsive grid
- Staggered fade-in animation
- Modal with full description, tech stack, screenshots
- GitHub and Demo buttons

### Callbacks
- `onSelectProject` — Open modal
- `onGitHubClick` — Open GitHub in new tab
- `onDemoClick` — Open demo in new tab
- `onCloseModal` — Close modal

## Done When

- [ ] Project grid renders
- [ ] Cards show all info
- [ ] Modal opens/closes correctly
- [ ] External links work
- [ ] Responsive on mobile

---

# Milestone 4: About

## Goal

Implement the About section — themed hobby cards revealing personality.

## What to Implement

### Components
- `AboutGrid.tsx` — Layout with jump links
- `CharacterSheetCard.tsx` — TTRPG stats card
- `ScorecardCard.tsx` — Board games card
- `TrailMapCard.tsx` — Mountain biking card

### Key Features
- Three themed interest cards
- Jump links for quick navigation
- D&D-style stat bars, game tables, trail listings
- Coaching credentials badge

### Callbacks
- `onCardHover` — Track engagement
- `onCardClick` — Optional expansion

## Done When

- [ ] All three cards render correctly
- [ ] Jump links work
- [ ] Theme-specific content displays
- [ ] Responsive on mobile

---

# Milestone 5: Consulting

## Goal

Implement the Consulting section — service offerings with booking CTA.

## What to Implement

### Components
- `ConsultingSection.tsx` — Main container
- `ServiceCard.tsx` — Individual service card

### Key Features
- Intro paragraph
- Three service cards with icons
- "Book a Consult" CTA
- Local Tech Labs callout

### Callbacks
- `onBookConsult` — Open contact modal
- `onLocalTechLabsClick` — Open external site

## Done When

- [ ] Services display correctly
- [ ] Booking CTA works
- [ ] Local Tech Labs link works
- [ ] Responsive on mobile

---

# Milestone 6: Contact

## Goal

Implement the Contact section — two-step contact modal for lead capture and booking.

## What to Implement

### Components
- `ContactSection.tsx` — Landing section with CTA
- `ContactModal.tsx` — Two-step modal (form → calendar → success)

### Key Features
- Form with name, email, company, topic, message
- Form submission to backend (HubSpot)
- Calendar widget embed for scheduling
- Success confirmation
- Alternative contact methods

### Callbacks
- `onContactClick` — Open modal
- `onClose` — Close modal
- `onFormSubmit` — Submit to backend
- `onBookingComplete` — After booking

## Done When

- [ ] Modal opens/closes
- [ ] Form validates and submits
- [ ] Calendar step shows
- [ ] Success step shows
- [ ] Responsive on mobile

---

# Milestone 7: Blog

## Goal

Implement the Blog section — searchable, filterable blog with rich content.

## What to Implement

### Components
- `BlogList.tsx` — List with search and filters
- `BlogPostCard.tsx` — Post card for list
- `BlogDetail.tsx` — Full article view
- `RelatedPostCard.tsx` — Related posts cards

### Key Features
- Search input
- Tag-based filtering
- Rich markdown rendering
- Code syntax highlighting
- Related posts section

### Callbacks
- `onTagFilter` — Filter by tag
- `onSearch` — Search posts
- `onPostClick` — Navigate to detail
- `onRelatedPostClick` — Navigate to related
- `onBack` — Return to list

### Empty States
- No posts at all
- No search results
- No tag matches

## Done When

- [ ] Blog list renders
- [ ] Search works
- [ ] Tag filter works
- [ ] Detail page renders markdown
- [ ] Related posts display
- [ ] Empty states work
- [ ] Responsive on mobile

---

## Summary

This personal site has 7 milestones:

1. **Foundation** — Design tokens, types, routes, shell
2. **Hero** — Terminal landing with typing animation
3. **Projects** — Card grid with detail modals
4. **About** — Themed hobby cards
5. **Consulting** — Service offerings with booking
6. **Contact** — Two-step contact modal
7. **Blog** — Searchable blog with rich content

All UI components are provided and styled. Focus on wiring up routing, data fetching, and backend integration.
