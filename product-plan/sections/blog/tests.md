# Test Instructions: Blog

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Blog section displays a searchable, filterable list of posts with detail views. Test filtering, search, navigation, and markdown rendering.

---

## User Flow Tests

### Flow 1: Browse All Posts

**Scenario:** User views blog list

**Setup:**
- Provide array of 5 writing objects

**Steps:**
1. User navigates to Blog section
2. User sees list of blog posts

**Expected Results:**
- [ ] All 5 posts are visible as cards
- [ ] Each card shows title, excerpt, date, read time
- [ ] Each card shows tags
- [ ] Cards have thumbnail images (or placeholder)

### Flow 2: Filter by Tag

**Scenario:** User clicks a tag to filter

**Steps:**
1. User sees all posts
2. User clicks "Agentic AI" tag

**Expected Results:**
- [ ] Only posts with "Agentic AI" tag are shown
- [ ] "Agentic AI" tag is highlighted as active
- [ ] Other posts are hidden
- [ ] `onTagFilter` callback called with "Agentic AI"

### Flow 3: Clear Tag Filter

**Scenario:** User clears active filter

**Steps:**
1. User has "Agentic AI" filter active
2. User clicks "all" button or clears filter

**Expected Results:**
- [ ] All posts are visible again
- [ ] No tag is highlighted as active

### Flow 4: Search Posts

**Scenario:** User searches by text

**Steps:**
1. User types "autonomous" in search input
2. Posts filter as user types

**Expected Results:**
- [ ] Only posts matching "autonomous" in title/excerpt are shown
- [ ] Search is case-insensitive
- [ ] Results update immediately (debounced okay)

### Flow 5: Read Full Article

**Scenario:** User clicks to read a post

**Steps:**
1. User clicks on "Building Autonomous Agents with Claude" card
2. Detail page loads

**Expected Results:**
- [ ] `onPostClick` called with post slug
- [ ] Detail view shows full title
- [ ] Shows header image (if present)
- [ ] Shows published date and read time
- [ ] Shows full markdown content rendered as HTML
- [ ] Code blocks have syntax highlighting

### Flow 6: Navigate to Related Post

**Scenario:** User clicks related post

**Steps:**
1. User is reading an article
2. User scrolls to related posts section
3. User clicks a related post card

**Expected Results:**
- [ ] `onRelatedPostClick` called with post slug
- [ ] Navigation to that post occurs

### Flow 7: Return to List

**Scenario:** User goes back to blog list

**Steps:**
1. User is reading article detail
2. User clicks back link ("cd ..")

**Expected Results:**
- [ ] `onBack` callback called
- [ ] User returns to blog list

---

## Empty State Tests

### No Posts

**Scenario:** Blog has no posts

**Setup:**
- `writings` array is empty

**Expected Results:**
- [ ] Shows "No posts yet" message
- [ ] No broken layout

### No Search Results

**Scenario:** Search returns no matches

**Setup:**
- Posts exist but search doesn't match

**Steps:**
1. User types "xyznotfound" in search

**Expected Results:**
- [ ] Shows "No posts found" message
- [ ] Option to clear search

### No Tag Matches

**Scenario:** Selected tag has no posts

**Setup:**
- Very unlikely in practice, but handle gracefully

**Expected Results:**
- [ ] Shows empty message
- [ ] Option to clear filter

---

## Component Tests

### BlogPostCard

**Renders correctly:**
- [ ] Shows post title
- [ ] Shows excerpt (truncated if long)
- [ ] Shows formatted date (e.g., "Dec 15")
- [ ] Shows read time (e.g., "8 min")
- [ ] Shows tag chips
- [ ] Shows thumbnail image or placeholder

### BlogDetail

**Renders correctly:**
- [ ] Shows full title
- [ ] Shows header image
- [ ] Shows date and read time
- [ ] Renders markdown content
- [ ] Code blocks are styled and highlighted
- [ ] Shows related posts section

### RelatedPostCard

**Renders correctly:**
- [ ] Shows thumbnail or placeholder
- [ ] Shows title (truncated if needed)
- [ ] Shows date and read time

---

## Edge Cases

- [ ] Very long titles truncate appropriately
- [ ] Posts without images show placeholder
- [ ] Posts without tags display without tag section
- [ ] Search handles special characters
- [ ] Many posts (20+) render efficiently
- [ ] Combined search + tag filter works

---

## Accessibility Checks

- [ ] Search input has label
- [ ] Tag filter buttons are keyboard accessible
- [ ] Post cards are clickable via keyboard
- [ ] Article content has proper heading hierarchy
- [ ] Images have alt text

---

## Sample Test Data

```typescript
const mockWritings = [
  {
    id: "writing-001",
    slug: "building-autonomous-agents-with-claude",
    title: "Building Autonomous Agents with Claude",
    excerpt: "After months of building Auto-Claude...",
    content: "# Full markdown content...",
    thumbnailImage: "/images/blog/thumb.jpg",
    headerImage: "/images/blog/header.jpg",
    publishedAt: "2024-12-15",
    readTime: 8,
    tags: ["Agentic AI", "Claude", "TypeScript"]
  },
  // ... more posts
]

const mockEmptyWritings = []
```
