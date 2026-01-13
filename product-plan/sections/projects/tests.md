# Test Instructions: Projects

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

The Projects section displays a grid of project cards with modal details. Test the card grid, modal interactions, and external link handling.

---

## User Flow Tests

### Flow 1: Browse Projects Grid

**Scenario:** User views all available projects

**Setup:**
- Provide array of 3 project objects with sample data
- Render ProjectsGrid component

**Steps:**
1. User navigates to Projects section
2. User sees project cards in grid layout

**Expected Results:**
- [ ] All 3 project cards are visible
- [ ] Each card shows project title
- [ ] Each card shows short description
- [ ] Each card shows tags as bracketed items (e.g., "[AI/ML]")
- [ ] Each card shows technology chips
- [ ] Cards have staggered fade-in animation on mount

### Flow 2: Open Project Modal

**Scenario:** User clicks a project card to see details

**Setup:**
- Render ProjectsGrid with sample projects

**Steps:**
1. User clicks on "Auto-Claude" project card
2. Modal opens with project details

**Expected Results:**
- [ ] Modal is visible (role="dialog")
- [ ] Modal shows project title "Auto-Claude"
- [ ] Modal shows full description text
- [ ] Modal shows terminal-style header with colored dots
- [ ] Modal shows tech stack section with technology chips
- [ ] Modal shows screenshots section (if screenshots exist)
- [ ] Focus is trapped within modal

### Flow 3: Close Modal via X Button

**Scenario:** User closes modal using close button

**Steps:**
1. User opens a project modal
2. User clicks the red dot / X button in terminal header

**Expected Results:**
- [ ] Modal closes
- [ ] Project grid is visible again
- [ ] `onCloseModal` callback is called

### Flow 4: Close Modal via Escape Key

**Scenario:** User closes modal using keyboard

**Steps:**
1. User opens a project modal
2. User presses Escape key

**Expected Results:**
- [ ] Modal closes
- [ ] Project grid is visible again

### Flow 5: Close Modal via Backdrop Click

**Scenario:** User clicks outside modal to close

**Steps:**
1. User opens a project modal
2. User clicks on backdrop (outside modal content)

**Expected Results:**
- [ ] Modal closes
- [ ] Project grid is visible again

### Flow 6: Visit GitHub Repository

**Scenario:** User clicks GitHub link

**Setup:**
- Project has `githubUrl: "https://github.com/adamslaker/auto-claude"`

**Steps:**
1. User opens project modal
2. User clicks "git clone" button

**Expected Results:**
- [ ] `onGitHubClick` callback is called with the URL
- [ ] Button shows GitHub icon and "git clone" text

### Flow 7: Visit Live Demo

**Scenario:** User clicks demo link

**Setup:**
- Project has `demoUrl: "https://ephemeris.dev"`

**Steps:**
1. User opens Ephemeris project modal
2. User clicks "Live Demo" button

**Expected Results:**
- [ ] `onDemoClick` callback is called with the URL
- [ ] Button shows external link icon and "Live Demo" text

### Flow 8: Handle Missing Links

**Scenario:** Project in stealth mode has no links

**Setup:**
- Project has `githubUrl: null` and `demoUrl: null`

**Steps:**
1. User opens "Stealth B2B SaaS" project modal

**Expected Results:**
- [ ] No GitHub button is shown
- [ ] No Demo button is shown
- [ ] Message shows "Links unavailable - project in stealth mode"

---

## Empty State Tests

### Primary Empty State

**Scenario:** No projects exist

**Setup:**
- `projects` array is empty (`[]`)

**Expected Results:**
- [ ] Empty state message is visible
- [ ] Shows helpful text like "No projects to display"
- [ ] No broken layout or errors

---

## Component Interaction Tests

### ProjectCard

**Renders correctly:**
- [ ] Shows project title text
- [ ] Shows truncated short description
- [ ] Displays all tags with brackets
- [ ] Shows technology chips
- [ ] Has terminal-style header with path

**User interactions:**
- [ ] Clicking card calls `onSelectProject` with project id
- [ ] Hover state shows visual feedback (border glow)

### ProjectModal

**Renders correctly:**
- [ ] Shows terminal header with colored dots
- [ ] Shows project title with "$ " prefix
- [ ] Shows full description in README.md section
- [ ] Shows tech stack chips

**User interactions:**
- [ ] Clicking red dot closes modal
- [ ] Clicking backdrop closes modal
- [ ] Pressing Escape closes modal
- [ ] Clicking inside modal content does NOT close modal

---

## Edge Cases

- [ ] Very long project title truncates appropriately
- [ ] Very long description scrolls in modal
- [ ] Project with no screenshots doesn't show screenshots section
- [ ] Project with no tags displays without tag section
- [ ] Single project renders correctly (no grid oddities)
- [ ] Many projects (10+) render without performance issues

---

## Accessibility Checks

- [ ] Project cards are keyboard accessible (Tab to focus, Enter to select)
- [ ] Modal has role="dialog" and aria-modal="true"
- [ ] Modal has accessible name (aria-labelledby)
- [ ] Close button has accessible label
- [ ] Focus is managed when modal opens/closes

---

## Sample Test Data

```typescript
const mockProjects = [
  {
    id: "auto-claude",
    title: "Auto-Claude",
    shortDescription: "An autonomous AI agent framework...",
    fullDescription: "Auto-Claude is an open-source framework...",
    logoUrl: "/projects/auto-claude/logo.svg",
    tags: ["AI/ML", "Open Source", "Agentic"],
    technologies: ["TypeScript", "Claude API", "Node.js"],
    screenshots: ["/screenshot-1.png"],
    githubUrl: "https://github.com/adamslaker/auto-claude",
    demoUrl: null
  },
  // ... more projects
]

const mockEmptyProjects = []
```
