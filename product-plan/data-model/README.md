# Data Model

## Overview

adamslaker.dev uses a straightforward data model focused on personal content. Since this is a personal portfolio site, most data can be static or managed through a simple CMS.

## Core Entities

### Project

Featured technical projects showcasing work in AI/agentic engineering, full-stack development, and open source.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Project name |
| shortDescription | string | Brief summary (1-2 sentences) |
| fullDescription | string | Detailed description with paragraphs |
| logoUrl | string | Path to project logo |
| tags | string[] | Category tags (AI/ML, Open Source, etc.) |
| technologies | string[] | Tech stack used |
| screenshots | string[] | Paths to screenshot images |
| githubUrl | string \| null | GitHub repository URL |
| demoUrl | string \| null | Live demo URL |

### Writing (Blog Post)

Technical blog posts and articles.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| slug | string | URL-friendly slug |
| title | string | Post title |
| excerpt | string | Short preview text |
| content | string | Full markdown content |
| thumbnailImage | string \| null | Thumbnail for list view |
| headerImage | string \| null | Hero image for detail view |
| publishedAt | string | ISO date string |
| readTime | number | Estimated reading time in minutes |
| tags | string[] | Topic tags |

### Service

Consulting service offerings.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Service name |
| description | string | What's included |
| placeholder | string | Pricing placeholder text |
| icon | string | Icon identifier (brain, globe, users) |

### Interest

Personal hobbies with themed data.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Interest name |
| theme | string | Card theme type |
| ...data | varies | Theme-specific data |

### SocialLink

External profile links.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| platform | string | Platform name |
| url | string | Profile URL |
| icon | string | Icon identifier |

## Relationships

- Each **Project** has multiple **Tags** for categorization
- Each **Writing** has multiple **Tags** for filtering
- **Services** stand alone as individual offerings
- **Interests** contain theme-specific nested data

## Data Storage Options

For a personal site, consider:

1. **Static JSON/TypeScript files** — Simple, version-controlled, no backend needed
2. **Markdown files** — Great for blog posts with frontmatter
3. **Headless CMS** — Contentful, Sanity, or Strapi for easier editing
4. **Database** — Overkill unless you need dynamic content
