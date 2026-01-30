---
name: update-site-data
description: Add or update projects and blog posts in site-data.ts interactively
---

# Update Site Data

Interactive workflow for adding or updating projects and blog posts in `src/data/site-data.ts`.

## Variables

SECTION_ARG = $ARGUMENTS

## Argument Handling

Check if SECTION_ARG matches any of these patterns:
- "project" or "projects" → Go directly to Projects flow
- "blog" or "writing" or "writings" → Go directly to Blog Posts flow
- Empty or unrecognized → Ask which section to update

## Process

### Step 1: Section Selection (if no valid argument)

If SECTION_ARG doesn't match a known section, use AskUserQuestion:

```
Header: "Section"
Question: "Which section of site data do you want to update?"
Options:
  - label: "Projects"
    description: "Add or update portfolio projects"
  - label: "Blog Posts"
    description: "Add or update blog/writings entries"
```

### Step 2: Action Type

Use AskUserQuestion:

```
Header: "Action"
Question: "What would you like to do?"
Options:
  - label: "Add new"
    description: "Create a new entry from scratch"
  - label: "Update existing"
    description: "Modify an existing entry"
```

### Step 3: Section-Specific Flow

#### For PROJECTS:

**If Adding New:**

Use AskUserQuestion:
```
Header: "New Project"
Question: "Describe the new project. Include: name, what it does, tech stack, current phase, and any links (GitHub, demo)."
```

User will provide natural language description via "Other" option.

**If Updating Existing:**

1. Read `src/data/site-data.ts` to get current projects
2. Use AskUserQuestion with dynamic options:
```
Header: "Select Project"
Question: "Which project do you want to update?"
Options: [List each project by title from the projects array]
```

3. After selection, use AskUserQuestion:
```
Header: "Changes"
Question: "What would you like to change about [selected project title]? Describe in natural language."
```

#### For BLOG POSTS:

**If Adding New:**

Use AskUserQuestion:
```
Header: "New Post"
Question: "Describe the blog post. Include: title, what it's about, key points, and any tags."
```

User will provide natural language description via "Other" option.

**If Updating Existing:**

1. Read `src/data/site-data.ts` to get current writings
2. If writings array is empty, inform user there are no existing posts to update
3. Otherwise, use AskUserQuestion with dynamic options:
```
Header: "Select Post"
Question: "Which blog post do you want to update?"
Options: [List each writing by title from the writings array]
```

4. After selection, use AskUserQuestion:
```
Header: "Changes"
Question: "What would you like to change about [selected post title]? Describe in natural language."
```

### Step 4: Parse Natural Language

#### For Projects, extract these fields:

| Field | How to Extract |
|-------|----------------|
| `id` | Generate from title (kebab-case, lowercase) |
| `title` | Direct extraction from description |
| `shortDescription` | First sentence or explicit short description (keep under 150 chars) |
| `fullDescription` | Full description, can include multiple paragraphs separated by `\n\n` |
| `technologies` | Look for tech mentions (React, TypeScript, Python, Node.js, etc.) |
| `tags` | Infer from context: "Open Source", "AI/ML", "B2B SaaS", "Full-Stack", "Developer Tools", "Agentic", "Automation", "Data Viz", "Desktop App", "Offline-First" |
| `phase` | Map phrases: "just started"/"idea" → concept, "designing" → design, "planning architecture" → architecture, "building"/"in progress" → building, "live"/"deployed"/"launched" → deployed, "iterating"/"improving" → iterating |
| `logoUrl` | Default to `/projects/[id]/logo.png` |
| `screenshots` | Default to empty array `[]` |
| `githubUrl` | Extract if URL mentioned, otherwise `null` |
| `demoUrl` | Extract if URL mentioned, otherwise `null` |

**Valid phases (from PROJECT_PHASES):**
- `concept` - Just an idea
- `design` - Working on design/UX
- `architecture` - Planning technical architecture
- `building` - Actively coding
- `deployed` - Live in production
- `iterating` - Deployed and being improved

#### For Blog Posts, extract these fields:

| Field | How to Extract |
|-------|----------------|
| `id` | Format: "writing-XXX" (increment from last ID, or start at "writing-001") |
| `slug` | Generate from title (kebab-case, lowercase, remove special chars) |
| `title` | Direct extraction from description |
| `excerpt` | 1-2 sentence summary of the post |
| `content` | Full markdown content (can be placeholder if user just wants to create the entry) |
| `thumbnailImage` | Default to `null` (can add later) |
| `headerImage` | Default to `null` (can add later) |
| `publishedAt` | Use current date in ISO format "YYYY-MM-DD" unless specified |
| `readTime` | Estimate from content length (~200 words/minute), minimum 3 minutes |
| `tags` | Match against blogTags list: "Agentic AI", "TypeScript", "Claude", "Cloud Ops", "Terraform", "AI Infrastructure", "Zod", "Architecture", "Opinion", "React", "Open Source" |

### Step 5: Edit site-data.ts

Use the Edit tool to add or modify the entry in `src/data/site-data.ts`.

**For new projects:** Add to the `projects` array, maintaining the existing formatting style.

**For new blog posts:** Add to the `writings` array.

**For updates:** Find the existing entry by id and update only the specified fields.

### Step 6: Verification

1. Display the added/updated entry to the user
2. Run `npm run build` to verify TypeScript validity
3. If build fails, fix the issue and re-verify

## Data Structure Reference

### Project Interface

```typescript
interface Project {
  id: string                    // kebab-case unique id
  title: string
  shortDescription: string      // One-liner (~150 chars)
  fullDescription: string       // Multi-paragraph with \n\n
  logoUrl: string               // Path to logo image
  tags: string[]                // ["Open Source", "AI/ML", etc.]
  technologies: string[]        // ["React", "TypeScript", etc.]
  screenshots: string[]         // Image URLs (usually empty)
  githubUrl: string | null
  demoUrl: string | null
  phase: ProjectPhase           // concept|design|architecture|building|deployed|iterating
}
```

### Writing Interface

```typescript
interface Writing {
  id: string                    // "writing-001" format
  slug: string                  // URL slug
  title: string
  excerpt: string               // 1-2 sentence summary
  content: string               // Full markdown content
  thumbnailImage: string | null
  headerImage: string | null
  publishedAt: string           // ISO date "2024-12-15"
  readTime: number              // Minutes (minimum 3)
  tags: string[]                // From blogTags list
}
```

## Example Usage

### Adding a new project

User: `/update-site-data projects`
→ Ask: Add new or Update existing?
→ User: Add new
→ Ask: Describe the new project
→ User: "I'm building a CLI tool called DevDash that shows a unified dashboard for all your dev tools - GitHub, Linear, Slack notifications. Using Go and bubbletea for the TUI. Just started coding it last week."

Generated entry:
```typescript
{
  id: "devdash",
  title: "DevDash",
  shortDescription: "A unified CLI dashboard for GitHub, Linear, and Slack notifications.",
  fullDescription: "DevDash brings all your developer tools into a single terminal interface. See GitHub PRs, Linear issues, and Slack notifications without context-switching between apps.\n\nBuilt with Go and bubbletea for a fast, responsive TUI experience.",
  logoUrl: "/projects/devdash/logo.png",
  tags: ["Developer Tools", "Open Source"],
  technologies: ["Go", "bubbletea"],
  screenshots: [],
  githubUrl: null,
  demoUrl: null,
  phase: "building",
}
```

### Updating an existing project

User: `/update-site-data`
→ Ask: Which section?
→ User: Projects
→ Ask: Add new or Update existing?
→ User: Update existing
→ Ask: Which project? [lists: Ephemeris ISS Tracker, Auto-Claude, Pre-Launch B2B SaaS, Maintainer HQ, CrewAI Idea Pipeline]
→ User: Ephemeris ISS Tracker
→ Ask: What would you like to change?
→ User: "Add Cesium to the technologies list and update the phase to deployed"

Edit the existing entry to add "Cesium" to technologies array and keep phase as "deployed".

## Files Referenced

- `src/data/site-data.ts` - Main data file to modify
- `src/types/index.ts` - Type definitions for validation
