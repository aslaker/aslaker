---
description: Run SEO audit and generate remediation specs (sandbox-specific)
---

# SEO Audit Command

This command runs a comprehensive SEO audit using parallel specialized agents and generates remediation specs. Designed for execution in an e2b sandbox as part of the parallel optimize pipeline.

## Output Structure

```
docs/seo/
├── audits/
│   ├── structure_audit.md     # Content structure analysis
│   ├── meta_audit.md          # Meta tags analysis
│   ├── keyword_audit.md       # Keyword optimization analysis
│   ├── snippet_audit.md       # Featured snippet opportunities
│   └── seo_report.md          # Synthesized report
└── specs/
    └── pending/               # Remediation specs ready for implementation
        └── spec-NNN-*.md
```

## Steps

### Step 1: Run Parallel SEO Audits

Launch 4 parallel Task agents. Each agent writes its findings to `docs/seo/audits/`:

| Agent | Output File | Focus |
|-------|-------------|-------|
| `seo-technical-optimization:seo-structure-architect` | `structure_audit.md` | Header hierarchy, schema markup, internal linking |
| `seo-technical-optimization:seo-meta-optimizer` | `meta_audit.md` | Title tags, meta descriptions, URL structure |
| `seo-technical-optimization:seo-keyword-strategist` | `keyword_audit.md` | Keyword density, semantic variations, LSI keywords |
| `seo-technical-optimization:seo-snippet-hunter` | `snippet_audit.md` | Featured snippet opportunities, SERP features |

Each agent should:
1. Analyze the codebase in `src/`
2. Review existing content and structure
3. Document findings with specific file references
4. Provide actionable recommendations

### Step 2: Synthesize Report

After all 4 agents complete:

1. Read all audit files from `docs/seo/audits/`
2. Identify overlapping issues and recommendations
3. Prioritize by impact (traffic potential, implementation effort)
4. Write combined report to `docs/seo/audits/seo_report.md`

**Report structure:**
- Executive summary
- Critical issues (blocking SEO performance)
- High-impact opportunities
- Quick wins (low effort, good return)
- Technical debt items

### Step 3: Generate Remediation Specs

Create individual spec files for each issue:

1. Read the synthesized report from `docs/seo/audits/seo_report.md`
2. For each issue, create a spec file in `docs/seo/specs/pending/`
3. Name specs as `spec-NNN-short-description.md` (e.g., `spec-001-meta-descriptions.md`)

**Spec file format:**

```yaml
---
id: spec-001
title: Add unique meta descriptions to all pages
priority: 1                    # 1=critical, 2=high, 3=medium, 4=low
domain: seo
seo_category: meta             # meta, structure, content, technical
impact: high                   # high, medium, low
effort: low                    # high, medium, low
depends_on: []                 # IDs of specs that must complete first
blocks: []                     # IDs of specs waiting on this one
parallel_safe: true            # Can run alongside other parallel_safe specs
files:
  - src/pages/index.astro
  - src/components/SEO.astro
---

## Problem

[Description of the SEO issue]

## Impact

- **Search visibility**: [How this affects rankings]
- **User experience**: [How this affects users]
- **Estimated improvement**: [Expected benefit]

## Solution

[Step-by-step implementation instructions]

## Verification

[How to verify the fix works - tools, checks, etc.]
```

### Priority Guidelines

- **Priority 1 (Critical)**: Blocking indexation or causing penalties (duplicate content, broken canonical)
- **Priority 2 (High)**: Significant ranking impact (missing meta, poor structure)
- **Priority 3 (Medium)**: Optimization opportunities (keyword targeting, internal links)
- **Priority 4 (Low)**: Nice-to-have improvements (schema enhancements, minor tweaks)

### Dependency Guidelines

- Set `depends_on` when a fix requires another fix to be in place first
- Example: Schema markup (spec-002) depends on proper heading structure (spec-001)
- Set `parallel_safe: false` if the fix modifies shared files that other specs also modify

## Completion

When finished:
1. Ensure all 4 audit files exist in `docs/seo/audits/`
2. Ensure `docs/seo/audits/seo_report.md` contains synthesized findings
3. Ensure all issues have corresponding specs in `docs/seo/specs/pending/`
4. Report summary: number of issues found, number of specs created, priority breakdown
