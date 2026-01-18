---
description: Implement pending remediation specs (sandbox-specific)
---

# Implement Specs Command

This command discovers all pending specs from accessibility and SEO audits, builds an execution plan based on dependencies, and implements fixes in waves. Designed for execution in an e2b sandbox as part of the parallel optimize pipeline.

## Input Structure

```
docs/
├── accessibility/specs/pending/    # Specs from accessibility audit
│   └── spec-NNN-*.md
└── seo/specs/pending/              # Specs from SEO audit
    └── spec-NNN-*.md
```

## Output Structure

After implementation, specs move through:
```
docs/*/specs/
├── pending/      → in-progress/    → completed/
```

## Steps

### Step 1: Discover Pending Specs

1. Glob for all pending specs: `docs/*/specs/pending/*.md`
2. Parse YAML frontmatter from each spec
3. Extract: id, title, priority, depends_on, blocks, parallel_safe, files

### Step 2: Build Dependency Graph

1. Create a directed graph of spec dependencies
2. Identify cycles (error if found)
3. Calculate execution waves:
   - **Wave 1**: All specs with `depends_on: []` and `parallel_safe: true`
   - **Wave 2**: Specs depending only on Wave 1 specs
   - **Wave N**: Specs depending only on completed waves

### Step 3: Execute Waves

For each wave:

1. **Move to in-progress**: Move all wave specs from `pending/` to `in-progress/`

2. **Implement in parallel**: For each spec in the wave with `parallel_safe: true`:
   - Read the full spec content
   - Follow the "Solution" section exactly
   - Make the code changes specified
   - Run any verification steps in the spec

3. **Implement sequentially**: For specs with `parallel_safe: false`:
   - Process one at a time
   - Ensure no file conflicts

4. **Verify**: After implementing all specs in the wave:
   - Run `npm run build` to check for build errors
   - Run `npm run test:run` if tests exist
   - Fix any errors before proceeding

5. **Complete**: Move all wave specs from `in-progress/` to `completed/`

6. **Commit**: Create a git commit for the wave:
   ```
   fix: implement [wave N] accessibility/SEO improvements

   Completed specs:
   - spec-001: [title]
   - spec-002: [title]
   ```

### Step 4: Handle Failures

If a spec implementation fails:

1. Keep the spec in `in-progress/`
2. Add an error note to the spec file frontmatter:
   ```yaml
   error: "Build failed: [error message]"
   error_date: "2024-01-15"
   ```
3. Continue with other specs in the wave
4. Report failures in summary

### Step 5: Final Summary

After all waves complete, report:

```
========== IMPLEMENTATION COMPLETE ==========

Waves executed: 3
Specs completed: 12
Specs failed: 1

Completed by domain:
  - Accessibility: 7
  - SEO: 5

Failed specs:
  - spec-008: [error reason]

Files modified: 15

Commits created: 3
```

## Execution Guidelines

### Reading Specs

Each spec contains:
- **Problem**: What's wrong
- **Solution**: Step-by-step implementation guide
- **Verification**: How to verify the fix

Follow the Solution section exactly. Don't add extra changes.

### File Conflicts

If multiple specs in a wave modify the same file:
1. Process them sequentially (even if marked `parallel_safe`)
2. Verify after each change
3. If conflicts occur, implement in separate mini-waves

### Build Errors

If `npm run build` fails after a wave:
1. Identify which spec caused the failure
2. Revert that spec's changes
3. Mark spec as failed with error message
4. Continue with remaining specs

### Test Failures

If tests fail:
1. Check if the test is related to the changes
2. If test was broken by the fix, update the test
3. If test reveals a bug in the fix, correct the implementation
4. Don't skip or delete tests

## Completion Checklist

Before reporting complete:
- [ ] All pending specs processed (completed or failed with error)
- [ ] `npm run build` passes
- [ ] `npm run test:run` passes (if tests exist)
- [ ] Git commits created for each wave
- [ ] Summary report generated
