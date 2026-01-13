# Blog Section

## Overview

A searchable, filterable list of technical posts with rich detail pages and related post recommendations. Features terminal-inspired styling throughout.

## User Flows

1. **Browse Posts** — View all posts in card layout
2. **Filter by Tag** — Click tag to filter posts
3. **Search Posts** — Type to search titles and content
4. **Read Article** — Click post to see full content
5. **View Related** — See and navigate to related posts
6. **Navigate Back** — Return to list from detail view

## Design Decisions

- Card layout with thumbnail images
- Terminal header with "cat blog.md" prompt
- Tag chips for filtering
- Search input with instant filtering
- Detail page renders markdown with code highlighting
- Related posts section at bottom of articles

## Components Provided

| Component | Description |
|-----------|-------------|
| `BlogList` | List view with search and tag filters |
| `BlogPostCard` | Individual post card for list |
| `BlogDetail` | Full article view with markdown |
| `RelatedPostCard` | Smaller card for related posts |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onTagFilter` | Filter posts by clicked tag |
| `onSearch` | Search posts by query |
| `onPostClick` | Navigate to post detail |
| `onRelatedPostClick` | Navigate to related post |
| `onBack` | Return to list view |
