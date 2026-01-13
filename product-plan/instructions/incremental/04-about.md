# Milestone 4: About

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

Implement the About section — a personal section revealing the human behind the code through three themed hobby cards in a matrix layout.

## Overview

The about section showcases Adam's personality beyond engineering:
- Three themed cards displaying different interests
- **TTRPG Card:** D&D-style character sheet with personal trait stats
- **Board Games Card:** Euro-game scorecard with collection stats
- **Mountain Biking Card:** Trail map with riding areas and coaching credentials
- Terminal-style header and consistent visual language

**Key Functionality:**
- View all three interest cards in a single-column layout
- Jump links for quick navigation to each card
- Hover interactions reveal additional visual flourishes
- Cards share unified design language while expressing different themes

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/about/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/about/components/`:

- `AboutGrid.tsx` — Main container with jump links and card layout
- `CharacterSheetCard.tsx` — TTRPG-themed card with stat bars
- `ScorecardCard.tsx` — Board game themed card with game table
- `TrailMapCard.tsx` — Mountain biking card with trail listings

### Data Layer

The components expect these data shapes:

```typescript
// Character Sheet (TTRPG)
interface TTRPGInterest {
  id: string
  title: string
  theme: 'character-sheet'
  traits: { name: string; value: number; description: string }[]
  flavorText?: string
}

// Scorecard (Board Games)
interface BoardGamesInterest {
  id: string
  title: string
  theme: 'scorecard'
  games: { name: string; designer: string; category: string; playCount: number; rating: number }[]
  totalPlays: number
  favoriteDesigner: string
}

// Trail Map (Mountain Biking)
interface MountainBikingInterest {
  id: string
  title: string
  theme: 'trail-map'
  areas: { name: string; trails: { name: string; difficulty: string }[] }[]
  coaching: { certification: string; yearsExperience: number; organization: string }
}
```

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onCardHover` | Track engagement or trigger animations |
| `onCardClick` | Optional: expand card or show more details |

### Empty States

For a personal site, interests should always be populated. If no interests exist:
- Show a placeholder message
- Indicate content is coming soon

## Files to Reference

- `product-plan/sections/about/README.md` — Feature overview and design intent
- `product-plan/sections/about/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/about/components/` — React components
- `product-plan/sections/about/types.ts` — TypeScript interfaces
- `product-plan/sections/about/sample-data.json` — Test data with all three interests

## Expected User Flows

### Flow 1: View About Section

1. User navigates to About section
2. User sees terminal header and intro text
3. User sees three themed interest cards
4. **Outcome:** User learns about Adam's personality and hobbies

### Flow 2: Quick Jump to Interest

1. User clicks a jump link (RPGs, Board Games, MTB)
2. Page scrolls smoothly to that card
3. **Outcome:** User navigates quickly within the section

### Flow 3: Explore Character Stats

1. User hovers over TTRPG card
2. User sees stat bars with values and descriptions
3. User reads flavor text at bottom
4. **Outcome:** User sees fun personality traits as D&D stats

### Flow 4: Browse Game Collection

1. User views Board Games card
2. User sees table of games with ratings and play counts
3. User notes favorite designer and top-rated games
4. **Outcome:** User understands gaming preferences

### Flow 5: Discover Trail Experience

1. User views Mountain Biking card
2. User sees riding areas and trails by difficulty
3. User sees coaching credentials badge
4. **Outcome:** User learns about riding experience and coaching

## Done When

- [ ] All three interest cards render correctly
- [ ] Character sheet shows all traits with stat bars
- [ ] Scorecard shows games table with ratings
- [ ] Trail map shows areas with difficulty indicators
- [ ] Jump links work for smooth scrolling
- [ ] Cards have consistent visual styling
- [ ] Hover states add visual polish
- [ ] Responsive on mobile
