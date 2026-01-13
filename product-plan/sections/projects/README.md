# Projects Section

## Overview

A visual portfolio displaying project cards in a responsive grid with an MS-DOS/Matrix-inspired aesthetic. Clicking a card opens a modal with full project details.

## User Flows

1. **Browse Projects** — View grid of project cards with staggered fade-in animation
2. **View Details** — Click card to open modal with full description, tech stack, screenshots
3. **Visit External Links** — Click GitHub or Demo buttons to open in new tab
4. **Close Modal** — Close via X button, backdrop click, or Escape key

## Design Decisions

- Two-column responsive grid (single column on mobile)
- Terminal-style header with command prompt aesthetic
- Staggered animation creates matrix-style cascade effect
- Cards show logo placeholder, title, tags, and tech stack
- Modal uses same terminal styling with red/yellow/green dots

## Data Used

**Entities:** Project

**From types.ts:**
- id, title, shortDescription, fullDescription
- logoUrl, tags, technologies, screenshots
- githubUrl, demoUrl (nullable)

## Components Provided

| Component | Description |
|-----------|-------------|
| `ProjectsGrid` | Main container with grid layout and modal state |
| `ProjectCard` | Individual project card with terminal styling |
| `ProjectModal` | Detail modal with full project information |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSelectProject` | Called when project card is clicked |
| `onGitHubClick` | Called when GitHub button is clicked |
| `onDemoClick` | Called when Demo button is clicked |
| `onCloseModal` | Called to close the modal |
