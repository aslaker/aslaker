---
name: audit
description: Run accessibility and SEO audit in an isolated e2b sandbox
---

# /audit Command

Run a comprehensive accessibility and SEO audit of your project in an isolated e2b cloud sandbox.

## What This Does

1. Creates an isolated e2b sandbox
2. Uploads your project codebase
3. Installs dependencies and starts your dev server
4. Runs audit tools (Lighthouse, axe-core, pa11y)
5. Downloads results to your local `docs/audits/` directory
6. Destroys the sandbox

## Prerequisites

- `E2B_API_KEY` environment variable set
- Project with `npm run dev` script (or configure in e2b-tools.config.ts)

## Usage

When the user runs `/audit`, invoke the audit skill to execute the workflow.

## Workflow

<workflow>
1. Check for E2B_API_KEY
2. Load project configuration (e2b-tools.config.ts if present)
3. Run: `npx e2b-audit run --verbose`
4. Report results summary to user
5. If issues found, offer to generate remediation specs
</workflow>
