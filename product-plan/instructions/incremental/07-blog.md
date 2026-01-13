# Milestone 7: Blog

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

Implement the Blog section — a searchable, filterable list of technical posts with rich detail pages and related post recommendations.

## Overview

The blog section showcases technical writing:
- Blog list with card layout showing title, excerpt, tags, date, and read time
- Search input for text search across posts
- Tag-based filtering (clickable tags)
- Detail page with full content, rich text, and code blocks
- Related posts section at bottom of articles

**Key Functionality:**
- Browse all blog posts in card layout
- Filter by clicking on tags
- Search by title or content
- Click a post to read the full article
- View related posts and navigate to them
- Back navigation to list

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/blog/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/blog/components/`:

- `BlogList.tsx` — List view with search, filters, and post cards
- `BlogPostCard.tsx` — Individual post card for list view
- `BlogDetail.tsx` — Full article view with markdown rendering
- `RelatedPostCard.tsx` — Smaller card for related posts section

### Data Layer

The components expect these data shapes:

```typescript
interface Writing {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string  // Markdown content
  thumbnailImage: string | null
  headerImage: string | null
  publishedAt: string
  readTime: number
  tags: string[]
}

type Tag = string
```

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onTagFilter` | Filter posts by tag |
| `onSearch` | Search posts by query |
| `onPostClick` | Navigate to post detail page |
| `onTagClick` | Filter by tag (in detail view) |
| `onRelatedPostClick` | Navigate to related post |
| `onBack` | Navigate back to list |

### Empty States

Implement empty state UI for when no posts match:

- **No posts at all:** Show "No posts yet" with helpful message
- **No search results:** Show "No posts found" with clear filters option
- **No tag matches:** Show message and option to clear filter

### Content Rendering

The blog uses markdown content. You'll need:
- Markdown to HTML rendering
- Syntax highlighting for code blocks
- Support for headings, lists, links, bold, inline code

Consider using libraries like:
- `react-markdown` with `rehype-highlight`
- `marked` with a syntax highlighter
- `mdx` for advanced features

## Files to Reference

- `product-plan/sections/blog/README.md` — Feature overview and design intent
- `product-plan/sections/blog/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/blog/components/` — React components
- `product-plan/sections/blog/types.ts` — TypeScript interfaces
- `product-plan/sections/blog/sample-data.json` — Test data with 5 posts

## Expected User Flows

### Flow 1: Browse Blog Posts

1. User navigates to Blog section
2. User sees list of post cards with titles, excerpts, and metadata
3. User scans posts to find interesting topics
4. **Outcome:** User discovers available content

### Flow 2: Filter by Tag

1. User clicks a tag (e.g., "Agentic AI")
2. List filters to show only posts with that tag
3. Active filter is highlighted
4. **Outcome:** User sees relevant posts only

### Flow 3: Search Posts

1. User types in search box
2. Posts filter as user types
3. Matches show in title, excerpt, or tags
4. **Outcome:** User finds specific content

### Flow 4: Read Full Article

1. User clicks on a post card
2. Detail page loads with full content
3. User reads article with proper formatting and code blocks
4. **Outcome:** User consumes full article

### Flow 5: Navigate to Related Post

1. User finishes reading article
2. User sees related posts section at bottom
3. User clicks a related post card
4. **Outcome:** User navigates to related article

### Flow 6: Return to List

1. User is reading article detail
2. User clicks back button ("cd ..")
3. **Outcome:** User returns to blog list

### Flow 7: Clear Filters

1. User has active tag filter or search query
2. User clicks "Clear filters" or "all" button
3. **Outcome:** All posts display again

## Done When

- [ ] Blog list renders with all posts
- [ ] Post cards show title, excerpt, date, read time, and tags
- [ ] Search filters posts as user types
- [ ] Tag filter works correctly
- [ ] "all" button clears filters
- [ ] Empty state shows when no matches
- [ ] Detail page renders with full content
- [ ] Markdown renders correctly (headings, code blocks, lists)
- [ ] Related posts display at bottom
- [ ] Back navigation works
- [ ] Responsive on mobile
