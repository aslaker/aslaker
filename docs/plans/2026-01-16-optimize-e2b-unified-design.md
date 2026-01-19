# Unified /optimize-e2b Command Design

**Date:** 2026-01-16
**Status:** Approved

## Overview

Combines the e2b sandbox audit pipeline with local spec generation and implementation into a single slash command.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  /optimize-e2b                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Check for recent reports (< 1 hour old)             │
│     ├── Found & not --force → Skip to step 3            │
│     └── Missing or --force → Continue to step 2         │
│                                                         │
│  2. Run sandbox audits                                  │
│     └── Bash: npm run optimize:e2b                      │
│         ├── Success → Continue                          │
│         └── Failure → Stop, report error                │
│                                                         │
│  3. Parse JSON reports from docs/audits/raw/            │
│     ├── axe-results.json                                │
│     ├── pa11y-results.json                              │
│     └── lighthouse-results.json                         │
│                                                         │
│  4. Deduplicate & prioritize issues                     │
│                                                         │
│  5. Generate remediation specs → docs/*/specs/pending/  │
│                                                         │
│  6. Implement in waves (parallel where safe)            │
│                                                         │
│  7. Verify: npm run build && npm run test:run           │
│                                                         │
│  8. Report summary                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Design Decisions

### 1. Trigger Sandbox via npm Script

**Decision:** Shell out to `npm run optimize:e2b` rather than inline TypeScript logic.

**Rationale:**
- Keeps e2b TypeScript code reusable and testable
- Clear separation: sandbox execution (external tool) vs implementation (Claude's domain)
- Simpler to maintain

### 2. Fail-Fast on Sandbox Errors

**Decision:** If `npm run optimize:e2b` exits non-zero, stop immediately.

**Rationale:**
- Partial results could lead to incomplete fixes
- Better to fix the pipeline issue than proceed with bad data

### 3. Replace Existing Command

**Decision:** Update `/optimize-e2b` to do the full flow (replaces the "process reports only" version).

**Rationale:**
- Single command is simpler for users
- Previous behavior available via `--skip-audit` pattern (reports exist and are fresh)

### 4. Skip Recent Reports

**Decision:** If reports exist and are < 1 hour old, skip audit phase unless `--force` flag used.

**Rationale:**
- Efficiency: no point waiting for sandboxes if just ran them
- User control: `--force` allows override when needed

### 5. Local Implementation Only

**Decision:** Run implementation locally, not in sandbox.

**Rationale:**
- No ANTHROPIC_API_KEY required (uses Claude Code Pro plan)
- Avoids sync complexity
- Can explore full sandbox implementation later if needed

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

## Future Considerations

- **Full sandbox implementation:** Would require ANTHROPIC_API_KEY and file sync back to local
- **Parallel sandbox pools:** Could run multiple sandboxes for different audit types
- **Caching:** Could cache audit results longer with content-hash invalidation
