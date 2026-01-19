---
description: Run accessibility audit and generate remediation specs (sandbox-specific)
---

# Accessibility Audit Command

This command runs a comprehensive WCAG accessibility audit and generates remediation specs. Designed for execution in an e2b sandbox as part of the parallel optimize pipeline.

## Output Structure

```
docs/accessibility/
├── audits/
│   └── accessibility_report.md    # Full audit findings
└── specs/
    └── pending/                   # Remediation specs ready for implementation
        └── spec-NNN-*.md
```

## Steps

### Step 1: Run WCAG Audit

1. Invoke the `/accessibility-compliance:wcag-audit-patterns` skill
2. Follow the skill's complete audit process
3. Analyze all components in `src/components/`
4. Check color contrast, keyboard navigation, ARIA attributes, focus management
5. Write comprehensive findings to `docs/accessibility/audits/accessibility_report.md`

### Step 2: Generate Remediation Specs

After completing the audit, create individual spec files for each issue:

1. Read the audit report from `docs/accessibility/audits/accessibility_report.md`
2. For each issue found, create a spec file in `docs/accessibility/specs/pending/`
3. Name specs as `spec-NNN-short-description.md` (e.g., `spec-001-button-contrast.md`)

**Spec file format:**

```yaml
---
id: spec-001
title: Fix color contrast on primary buttons
priority: 1                    # 1=critical, 2=high, 3=medium, 4=low
domain: accessibility
wcag_criteria: ["1.4.3"]       # WCAG success criteria
depends_on: []                 # IDs of specs that must complete first
blocks: []                     # IDs of specs waiting on this one
parallel_safe: true            # Can run alongside other parallel_safe specs
files:
  - src/components/ui/Button.tsx
---

## Problem

[Description of the accessibility issue]

## WCAG Reference

- **Success Criterion**: 1.4.3 Contrast (Minimum)
- **Level**: AA
- **Current state**: [What's wrong]
- **Required state**: [What needs to change]

## Solution

[Step-by-step implementation instructions]

## Verification

[How to verify the fix works]
```

### Priority Guidelines

- **Priority 1 (Critical)**: Blocks access entirely (missing alt text on key images, no keyboard access)
- **Priority 2 (High)**: Significant barriers (poor contrast, missing labels)
- **Priority 3 (Medium)**: Usability issues (focus order, redundant links)
- **Priority 4 (Low)**: Minor issues (cosmetic, nice-to-have improvements)

### Dependency Guidelines

- Set `depends_on` when a fix requires another fix to be in place first
- Set `parallel_safe: false` if the fix modifies shared files that other specs also modify
- Group related fixes (e.g., all button-related fixes) to minimize conflicts

## Completion

When finished:
1. Ensure `docs/accessibility/audits/accessibility_report.md` exists with full findings
2. Ensure all issues have corresponding specs in `docs/accessibility/specs/pending/`
3. Report summary: number of issues found, number of specs created, priority breakdown
