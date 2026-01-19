---
description: Run comprehensive accessibility and SEO audits, then generate remediation plans
---

# Optimize Command

## Overview

This command runs a full site optimization audit covering accessibility and SEO, then generates actionable remediation plans ready for an implementing agent.

## Folder Structure

All outputs follow this structure for easy agent handoff:

```
docs/
├── accessibility/
│   ├── audits/
│   │   └── accessibility_report.md
│   └── specs/
│       ├── pending/          # new specs land here
│       ├── in-progress/      # being worked on
│       └── completed/        # finished implementations
└── seo/
    ├── audits/
    │   ├── structure_audit.md
    │   ├── meta_audit.md
    │   ├── keyword_audit.md
    │   ├── snippet_audit.md
    │   └── seo_report.md
    └── specs/
        ├── pending/
        ├── in-progress/
        └── completed/
```

## Steps

### Step 1: Accessibility Audit

1. Invoke the `/accessibility-compliance:wcag-audit-patterns` skill
2. Follow the skill's audit process completely
3. Write findings to `docs/accessibility/audits/accessibility_report.md`

### Step 2: SEO Audit

1. Launch 4 parallel Task agents. Each agent writes its findings to `docs/seo/audits/`:

   | Agent | Output File |
   |-------|-------------|
   | `seo-technical-optimization:seo-structure-architect` | `docs/seo/audits/structure_audit.md` |
   | `seo-technical-optimization:seo-meta-optimizer` | `docs/seo/audits/meta_audit.md` |
   | `seo-technical-optimization:seo-keyword-strategist` | `docs/seo/audits/keyword_audit.md` |
   | `seo-technical-optimization:seo-snippet-hunter` | `docs/seo/audits/snippet_audit.md` |

2. Wait for all 4 agents to complete
3. Synthesize their findings into a unified report
4. Write the combined report to `docs/seo/audits/seo_report.md`

### Step 3: Remediation Planning

1. Launch the `audit-remediation-planner` Task agent
2. The agent will:
   - Read audits from `docs/accessibility/audits/` and `docs/seo/audits/`
   - Analyze dependencies between issues
   - Create numbered spec documents with frontmatter metadata
   - Write specs to the appropriate `pending/` folder
3. Specs are written to:
   - `docs/accessibility/specs/pending/` for accessibility issues
   - `docs/seo/specs/pending/` for SEO issues

**Spec format:**

```yaml
---
id: spec-001
title: Fix color contrast on buttons
priority: 1
domain: accessibility
depends_on: []           # IDs of specs that must complete first
blocks: [spec-003]       # IDs of specs waiting on this one
parallel_safe: true      # Can run alongside other parallel_safe specs
files: [src/components/Button.tsx]
---
```

### Step 4: Implementation

1. Launch the `audit-implementation-specialist` Task agent
2. The agent will:
   - Discover all pending specs: `docs/*/specs/pending/*.md`
   - Parse dependency metadata from spec frontmatter
   - Build execution waves based on dependencies
   - For each wave, spawn parallel sub-agents for independent specs
   - Move specs: `pending/` → `in-progress/` → `completed/`
   - Verify each implementation before marking complete
3. Agent reports summary of completed implementations

## Expected Outputs

**Accessibility Audits:**

- `docs/accessibility/audits/accessibility_report.md`

**SEO Audits:**

- `docs/seo/audits/structure_audit.md`
- `docs/seo/audits/meta_audit.md`
- `docs/seo/audits/keyword_audit.md`
- `docs/seo/audits/snippet_audit.md`
- `docs/seo/audits/seo_report.md`

**Remediation Specs:**

- `docs/accessibility/specs/pending/spec-NNN-*.md`
- `docs/seo/specs/pending/spec-NNN-*.md`

**Implementation Results:**

- Specs moved to `docs/*/specs/completed/`
- Code changes implemented and verified
- Implementation summary report

## Agent Handoff

**Remediation Planner → Implementation Specialist:**

1. Planner writes specs to `docs/*/specs/pending/` with dependency metadata
2. Implementation specialist discovers pending specs
3. Specialist builds dependency graph from frontmatter
4. Specialist groups specs into execution waves:
   - Wave 1: `depends_on: []` + `parallel_safe: true`
   - Wave 2: Specs depending on Wave 1
   - etc.
5. For each wave:
   - Move specs to `in-progress/`
   - Spawn parallel sub-agents for independent specs
   - Wait for all sub-agents to complete
   - Verify implementations
   - Move to `completed/`
