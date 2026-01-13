# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Color Palette:**
- Primary: `lime` — Matrix-inspired green for buttons, links, key accents
- Secondary: `emerald` — Subtle highlights, secondary hover states
- Neutral: `zinc` — Dark backgrounds (zinc-950/900), text colors, borders

**Typography:**
- Heading: Space Grotesk — Terminal-style, techy headings
- Body: Inter — Clean, readable body text
- Mono: JetBrains Mono — Code blocks, terminal aesthetic

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- `Project` — Featured technical projects with tags, technologies, links
- `Tag` — Labels for categorization
- `Service` — Consulting offerings with descriptions and icons
- `Interest` — Personal hobbies with themed data (TTRPG, board games, MTB)
- `Writing` — Blog posts with content, tags, and metadata
- `SocialLink` — External profiles and contact methods

### 3. Routing Structure

Create routes for each section of the site:

| Route | Section |
|-------|---------|
| `/` | Hero (landing) |
| `/projects` or `#projects` | Projects showcase |
| `/about` or `#about` | About / interests |
| `/consulting` or `#consulting` | Consulting services |
| `/contact` or `#contact` | Contact section |
| `/blog` | Blog list |
| `/blog/:slug` | Blog detail |

This is a personal site, so you may choose:
- **Single-page approach:** All sections on one page with anchor navigation
- **Multi-page approach:** Separate routes for each section

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with header
- `MainNav.tsx` — Desktop navigation component
- `MobileMenu.tsx` — Mobile slide-out menu
- `SocialLinks.tsx` — Social media icon links

**Wire Up Navigation:**

Connect navigation to your routing. Navigation items:
- Hero
- Projects
- About
- Consulting
- Contact
- Blog (optional in nav)

**Social Links:**
- GitHub
- LinkedIn
- X/Twitter

**User Menu:**
For a personal site, user authentication may not be needed. The shell is designed to work without it.

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, fonts)
- [ ] Data model types are defined
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes/anchors
- [ ] Social links display and open correctly
- [ ] Responsive on mobile (hamburger menu works)
- [ ] Dark theme is the default
