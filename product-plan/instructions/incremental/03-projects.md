# Milestone 3: Projects

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

Implement the Projects section — a visual portfolio displaying project cards in a responsive grid with an MS-DOS/Matrix-inspired aesthetic. Clicking a card opens a modal with full project details.

## Overview

The projects section showcases Adam's technical work with:
- Two-column responsive grid of project cards
- Staggered fade-in animation (matrix-style cascade)
- Each card shows logo placeholder, title, tags, and technologies
- Modal overlay for expanded project details
- Links to GitHub repos and live demos

**Key Functionality:**
- View grid of project cards with terminal-style header
- Click a card to open detail modal
- Modal shows full description, tech stack, screenshots, and external links
- Close modal via X button, clicking backdrop, or pressing Escape
- GitHub and Demo buttons open in new tabs

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/projects/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/projects/components/`:

- `ProjectsGrid.tsx` — Main container with grid layout and modal state
- `ProjectCard.tsx` — Individual project card with terminal styling
- `ProjectModal.tsx` — Detail modal with full project information

### Data Layer

The components expect this data shape:

```typescript
interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  logoUrl: string
  tags: string[]
  technologies: string[]
  screenshots: string[]
  githubUrl: string | null
  demoUrl: string | null
}
```

For a personal site, this data can be static/hardcoded, stored in a CMS, or loaded from JSON files.

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onSelectProject` | Track analytics when project is selected |
| `onGitHubClick` | Open GitHub repo in new tab |
| `onDemoClick` | Open live demo in new tab |
| `onCloseModal` | Close the detail modal |

### Empty States

Implement empty state UI for when no projects exist:

- Show a helpful message if no projects are available
- Include a placeholder or "coming soon" message
- For a personal site, this is unlikely but good to handle

## Files to Reference

- `product-plan/sections/projects/README.md` — Feature overview and design intent
- `product-plan/sections/projects/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/projects/components/` — React components
- `product-plan/sections/projects/types.ts` — TypeScript interfaces
- `product-plan/sections/projects/sample-data.json` — Test data with 3 projects

## Expected User Flows

### Flow 1: Browse Projects

1. User navigates to Projects section
2. User sees project cards fade in with staggered animation
3. User scans cards to see title, description, tags, and technologies
4. **Outcome:** User gets overview of all projects

### Flow 2: View Project Details

1. User clicks on a project card
2. Modal opens with full project information
3. User reads the full description, sees tech stack and screenshots
4. **Outcome:** User understands the project in depth

### Flow 3: Visit GitHub Repository

1. User opens project modal
2. User clicks "git clone" / GitHub button
3. **Outcome:** GitHub repo opens in new tab

### Flow 4: View Live Demo

1. User opens project modal
2. User clicks "Live Demo" button
3. **Outcome:** Demo site opens in new tab

### Flow 5: Close Project Modal

1. User is viewing project modal
2. User clicks X button, clicks backdrop, or presses Escape
3. **Outcome:** Modal closes, user sees project grid

## Done When

- [ ] Project grid renders with all projects
- [ ] Cards show terminal-style header with title, tags, technologies
- [ ] Staggered animation on initial load
- [ ] Clicking card opens detail modal
- [ ] Modal shows full description and all project info
- [ ] GitHub and Demo buttons work (or show unavailable message)
- [ ] Modal closes via X, backdrop click, or Escape
- [ ] Empty state handled gracefully
- [ ] Responsive on mobile (cards stack)
