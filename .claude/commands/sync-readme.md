---
name: sync-readme
description: Sync README.md with current projects and writings from site-data.ts
---

# README Sync

Automatically update the GitHub profile README to reflect current projects and recent writings.

## Process

1. **Read site-data.ts** - Get current projects and writings from `src/data/site-data.ts`
2. **Only use exported (uncommented) arrays** - Ignore any commented-out code blocks
3. **Use exact `title` field** - ALWAYS use the project's `title` field exactly as written, never derive names from IDs or URLs
4. **Group projects by phase** - Organize into "Building Now" and "Strategic Projects"
5. **Get recent writings** - Sort by date and take the most recent 3-5 (if any exist in exported array)
6. **Update README sections** - Replace content between marker comments
7. **Commit if changed** - Only commit if there are actual changes

## Critical Rules

### Use Project Titles Exactly

**ALWAYS use the `title` field from the project object.** Never derive the project name from:
- The project `id` (e.g., "tasterra" should NOT become "Tasterra")
- The `demoUrl` domain (e.g., "tasterra.io" should NOT become "Tasterra")
- The `githubUrl` repo name

Example: If site-data.ts has:
```typescript
{
  id: "demo-app",
  title: "Pre-Launch B2B SaaS",  // <-- USE THIS
  demoUrl: "https://tasterra.io",
  ...
}
```

The README should show: `**Pre-Launch B2B SaaS** - description *(building)*`

NOT: `**[Demo App](https://demo-app.io)** - description *(building)*`

### Only Use Uncommented Code

Only read data from **exported arrays** that are actively in the code. Commented-out sections (prefixed with `//`) should be completely ignored.

If `writings` is exported as an empty array `[]`, do not include any writings in the README.

## Section Markers

The README uses HTML comments to define updatable regions:

```markdown
<!-- BEGIN ACTIVE_QUESTS -->
[Auto-generated project list]
<!-- END ACTIVE_QUESTS -->

<!-- BEGIN THINKING_ABOUT -->
[Auto-generated from recent writings]
<!-- END THINKING_ABOUT -->
```

## Project Grouping

Group projects by their phase:

| Group | Phases | Description |
|-------|--------|-------------|
| **Building Now** | `building`, `iterating` | Active development work |
| **Strategic Projects** | `architecture`, `design` | Planning and design phase |
| **Ideas** | `concept` | Early stage ideas |

Only include projects with `building`, `iterating`, `architecture`, or `design` phases in the README.

## Output Format

### Active Quests Section

Maintain the existing two-column table format with terminal aesthetic:

```markdown
<table>
<tr>
<td width="50%" valign="top">

### Building Now
- **[Project Title](url)** - Short description *(phase)*
- **Project Title** - Short description *(phase)*  <!-- No link if no public URL -->

</td>
<td width="50%" valign="top">

### Strategic Projects
- **Project Title** - Short description *(phase)*  <!-- Usually no link for strategic projects -->

</td>
</tr>
</table>
```

### Thinking About Section

Create a terminal-styled section for recent writings. **Only include if writings array is non-empty:**

```markdown
## `> tail -f ./thinking_about.log`

Recent research and explorations:

| Topic | Tags | Read Time |
|-------|------|-----------|
| **[Article Title](link)** - Brief excerpt | `Tag1`, `Tag2` | X min |
```

If the writings array is empty (`[]`), **omit this entire section** from the README.

## Data Sources

Read from `src/data/site-data.ts`:

### Projects Array
```typescript
{
  id: string
  title: string
  shortDescription: string
  githubUrl: string | null
  demoUrl: string | null
  phase: 'concept' | 'design' | 'architecture' | 'building' | 'deployed' | 'iterating'
}
```

### Writings Array
```typescript
{
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAt: string  // YYYY-MM-DD
  readTime: number
  tags: string[]
}
```

## Style Guidelines

- Maintain terminal aesthetic (backticks for commands, monospace feel)
- Use emoji sparingly (only where already present in README)
- Keep descriptions concise (one line each)
- Include phase in parentheses for projects
- **ALWAYS use the exact `title` field** - never derive names from IDs, URLs, or repo names
- Link logic for projects:
  - If `demoUrl` exists → `**[Title](demoUrl)**`
  - Else if `githubUrl` exists → `**[Title](githubUrl)**`
  - Else (no public URL) → `**Title**` (no link, just bold)
- For writings, link to the site (https://adamslaker.dev/writings/[slug])

## Example Output

### Active Quests
```markdown
### Building Now
- **Pre-Launch B2B SaaS** - AI-powered sensory QA platform for food & beverage *(building)*
- **[Ephemeris ISS Tracker](https://ephemeris.observer)** - Real-time ISS visualization with predictive pass notifications *(iterating)*
- **[Auto-Claude](https://github.com/AndyMik90/Auto-Claude)** - Autonomous multi-agent coding framework *(iterating)*

### Strategic Projects
- **Maintainer HQ** - Command center for open source maintainers *(architecture)*
- **CrewAI Idea Pipeline** - Multi-agent workflow for idea organization *(architecture)*
```

Note: The first project has NO link because it has no public URL yet (demoUrl is null, and it's pre-launch). Use the exact `title` field ("Pre-Launch B2B SaaS"), not "Tasterra".

### Thinking About (when writings exist)
```markdown
| Topic | Tags | Read Time |
|-------|------|-----------|
| **[Building Autonomous Agents with Claude](https://adamslaker.dev/writings/building-autonomous-agents-claude)** - Lessons from Auto-Claude | `AI`, `Agents`, `Claude` | 8 min |
| **[Terraform Patterns for AI Workloads](https://adamslaker.dev/writings/terraform-patterns-ai-workloads)** - Infrastructure patterns | `DevOps`, `AI`, `Terraform` | 6 min |
```

### Thinking About (when writings array is empty)
When the `writings` array is empty, omit the entire "Thinking About" section from the README.

## Error Handling

- If site-data.ts cannot be read, log error and exit without changes
- If README.md doesn't have markers, log warning and add them
- If no projects match the criteria, leave section with "Coming soon..." message
- If no writings exist, omit the Thinking About section entirely
