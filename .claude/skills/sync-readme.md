---
name: sync-readme
description: Sync README.md with current projects and writings from site-data.ts
---

# README Sync

Automatically update the GitHub profile README to reflect current projects and recent writings.

## Process

1. **Read site-data.ts** - Get current projects and writings from `src/data/site-data.ts`
2. **Group projects by phase** - Organize into "Building Now" and "Strategic Projects"
3. **Get recent writings** - Sort by date and take the most recent 3-5
4. **Update README sections** - Replace content between marker comments
5. **Commit if changed** - Only commit if there are actual changes

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

</td>
<td width="50%" valign="top">

### Strategic Projects
- **[Project Title](url)** - Short description *(phase)*

</td>
</tr>
</table>
```

### Thinking About Section

Create a terminal-styled section for recent writings:

```markdown
## `> tail -f ./thinking_about.log`

Recent research and explorations:

| Topic | Tags | Read Time |
|-------|------|-----------|
| **[Article Title](link)** - Brief excerpt | `Tag1`, `Tag2` | X min |
```

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
- Link to demo URL if available, otherwise GitHub URL
- For writings, link to the site (https://adamslaker.dev/writings/[slug])

## Example Output

### Active Quests
```markdown
### Building Now
- **[Tasterra](https://tasterra.io)** - AI-powered sensory QA platform *(building)*
- **[Ephemeris](https://github.com/aslaker/ephemeris)** - AI-enabled ISS tracker *(iterating)*
- **[Auto-Claude](https://github.com/AndyMik90/Auto-Claude)** - Autonomous multi-agent coding framework *(iterating)*

### Strategic Projects
- **Maintainer HQ** - Open source project health dashboard *(architecture)*
- **CrewAI Idea Pipeline** - Multi-agent workflow for idea organization *(architecture)*
```

### Thinking About
```markdown
| Topic | Tags | Read Time |
|-------|------|-----------|
| **[Building Autonomous Agents with Claude](https://adamslaker.dev/writings/building-autonomous-agents-claude)** - Lessons from Auto-Claude | `AI`, `Agents`, `Claude` | 8 min |
| **[Terraform Patterns for AI Workloads](https://adamslaker.dev/writings/terraform-patterns-ai-workloads)** - Infrastructure patterns | `DevOps`, `AI`, `Terraform` | 6 min |
```

## Error Handling

- If site-data.ts cannot be read, log error and exit without changes
- If README.md doesn't have markers, log warning and add them
- If no projects match the criteria, leave section with "Coming soon..." message
- If no writings exist, omit the Thinking About section entirely
