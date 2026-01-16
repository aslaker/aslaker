---
description: Run e2b sandbox audits, generate specs, and implement fixes
---

# Optimize E2B Command

Full optimization pipeline: runs automated audits in cloud sandboxes, generates remediation specs, and implements fixes locally.

## Flags

- `--force` - Re-run audits even if recent reports exist

## Step 1: Check for Recent Reports

Check if audit reports exist and are recent (< 1 hour old):

```
docs/audits/raw/axe-results.json
docs/audits/raw/pa11y-results.json
docs/audits/raw/lighthouse-results.json
```

**Decision logic:**
- If ALL 3 files exist AND all are < 1 hour old AND no `--force` flag → Skip to Step 3
- Otherwise → Continue to Step 2

To check file age, use: `stat -f %m <file>` (macOS) and compare to current timestamp.

## Step 2: Run Sandbox Audits

Execute the e2b audit pipeline:

```bash
npm run optimize:e2b
```

**On failure (non-zero exit):** Stop immediately and report the error. Do not proceed to implementation.

**On success:** Continue to Step 3.

## Step 3: Parse Audit Reports

Read each JSON report and extract issues:

### axe-results.json

```typescript
// Extract violations array
// Each violation has: id, impact, description, nodes (affected elements)
// Priority mapping: critical=1, serious=2, moderate=3, minor=4
```

### pa11y-results.json

```typescript
// Extract issues array
// Each issue has: code, type, message, selector
// Priority mapping: error=2, warning=3, notice=4
```

### lighthouse-results.json

```typescript
// Extract from categories.accessibility.auditRefs and categories.seo.auditRefs
// Look up details in audits object
// Focus on audits with score < 1
// Priority mapping: score 0=1, score <0.5=2, score <0.9=3
```

## Step 4: Deduplicate Issues

Many tools report the same issue. Deduplicate by:

1. Normalize selectors (trim whitespace, lowercase tag names)
2. Group by issue type (color-contrast, missing-alt, etc.)
3. For duplicates, keep the report with most detail
4. Merge affected elements lists

## Step 5: Generate Remediation Specs

For each unique issue, create a spec file.

**Accessibility specs:** `docs/accessibility/specs/pending/spec-NNN-<slug>.md`
**SEO specs:** `docs/seo/specs/pending/spec-NNN-<slug>.md`

Ensure directories exist before writing.

### Spec Format

```yaml
---
id: spec-001
title: Fix [issue description]
priority: 1
domain: accessibility  # or seo
source_tools: [axe, pa11y]
wcag_criteria: ["1.4.3"]    # if accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - src/components/affected/File.tsx
---

## Problem

[Description from tool reports]

## Affected Elements

[List selectors/elements from reports]

## Solution

[Step-by-step fix instructions]

## Verification

- Re-run audit tools to confirm fix
- Check that build passes
```

### Priority Assignment

| Priority | Criteria |
|----------|----------|
| 1 | Critical accessibility (axe critical, WCAG A failures) |
| 2 | Serious accessibility, major SEO (axe serious, pa11y errors) |
| 3 | Moderate issues (axe moderate, pa11y warnings, Lighthouse <0.5) |
| 4 | Minor issues (axe minor, pa11y notices, Lighthouse <0.9) |

### Dependency Analysis

When creating specs, identify dependencies:
- Color system changes block component-specific fixes
- Layout changes may block spacing fixes
- Mark specs that can run in parallel as `parallel_safe: true`

## Step 6: Implement Fixes

Execute specs using wave-based implementation:

### 6.1 Discover Specs

Read all pending specs:
- `docs/accessibility/specs/pending/*.md`
- `docs/seo/specs/pending/*.md`

### 6.2 Build Waves

Group specs into execution waves:

```
Wave 1: specs with depends_on: [] AND parallel_safe: true
Wave 2: specs depending only on Wave 1 completions
Wave 3: specs depending on Wave 2
...
```

### 6.3 Execute Each Wave

For each wave:

1. **Move to in-progress:** Move spec files from `pending/` to `in-progress/`
2. **Implement:**
   - For parallel-safe specs in the same wave, use Task tool to spawn parallel agents
   - Each agent implements one spec
3. **Verify:** Run `npm run build` after each wave
4. **Complete:** Move specs from `in-progress/` to `completed/`

### 6.4 Commit Each Wave

After each wave completes successfully:
```bash
git add -A && git commit -m "fix: implement wave N accessibility/seo fixes"
```

## Step 7: Final Verification

After all waves complete:

```bash
npm run build
npm run test:run
```

If either fails, report which tests/build errors occurred.

## Step 8: Report Summary

Output a summary:

```
========================================
OPTIMIZATION COMPLETE
========================================

Audit Phase:
  - axe-core: X violations found
  - pa11y: X issues found
  - Lighthouse: accessibility X/100, seo X/100

Specs Generated: X
  - Accessibility: X
  - SEO: X

Implementation:
  - Waves executed: X
  - Specs completed: X
  - Files modified: X

Verification:
  - Build: PASS/FAIL
  - Tests: PASS/FAIL

Commits created: X
```

## Directory Structure

```
docs/
├── audits/
│   ├── raw/                    # JSON from e2b pipeline
│   │   ├── axe-results.json
│   │   ├── pa11y-results.json
│   │   └── lighthouse-results.json
│   └── summary.md
├── accessibility/
│   └── specs/
│       ├── pending/
│       ├── in-progress/
│       └── completed/
└── seo/
    └── specs/
        ├── pending/
        ├── in-progress/
        └── completed/
```

## Error Handling

| Error | Action |
|-------|--------|
| `npm run optimize:e2b` fails | Stop, report error, do not proceed |
| JSON parse error | Report which file, skip that report, continue with others |
| No issues found | Report "No issues found", exit successfully |
| Build fails after wave | Stop, report error, leave specs in `in-progress/` |
| Test fails after all waves | Report which tests failed, still mark complete |
