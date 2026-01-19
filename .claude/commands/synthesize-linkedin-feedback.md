---
name: synthesize-linkedin-feedback
description: Analyze all draft/final pairs and update learned preferences
---

# Synthesize LinkedIn Feedback

Aggregate patterns across all captured feedback pairs and update LEARNED.md with synthesized preferences.

## Process

1. **Gather all feedback** - Read all analysis files from `.claude/skills/writing-style/feedback/*/analysis.md`

2. **Count occurrences** - For each extracted preference across all analyses, count how many times it appears

3. **Classify confidence**:
   - **High-confidence (3+ occurrences)**: These will be auto-applied to future drafts
   - **Emerging (1-2 occurrences)**: These will be shown to the user for approval
   - **Anti-patterns**: Things consistently removed or changed away from

4. **Present emerging patterns** - Show the user emerging patterns and ask which should be promoted to high-confidence

5. **Update LEARNED.md** - Write the aggregated preferences to `.claude/skills/writing-style/LEARNED.md`

## Output Format

### Console Output

```
## Feedback Synthesis Report

**Analyzed:** X feedback pairs
**Date range:** YYYY-MM-DD to YYYY-MM-DD

### High-Confidence Patterns (auto-applied)
These patterns appeared 3+ times and will be automatically applied to future drafts:

1. Remove hedging phrases ("I think", "maybe", "perhaps") - 5 occurrences
2. Keep posts under 250 words - 4 occurrences
3. Use 3-4 specific hashtags, not 7+ generic ones - 3 occurrences

### Emerging Patterns (need approval)
These patterns appeared 1-2 times. Which should be promoted?

1. [ ] Move call-to-action to middle paragraph - 2 occurrences
2. [ ] Add personal project references as examples - 2 occurrences
3. [ ] Avoid questions that start with "What do you think?" - 1 occurrence

### Anti-Patterns Detected
Things you consistently change away from:

1. Long opening preambles before the point
2. More than 5 arrow-bullet items
3. Generic closing questions

---

Which emerging patterns should I promote to high-confidence? (Enter numbers, e.g., "1, 2" or "none")
```

### LEARNED.md Format

Write to `.claude/skills/writing-style/LEARNED.md`:

```markdown
# Learned Preferences

Synthesized from your edit history. High-confidence patterns are auto-applied; emerging patterns are suggestions.

## High-Confidence Patterns (3+ occurrences)

These are automatically applied when generating LinkedIn drafts:

- Remove hedging phrases ("I think", "maybe", "perhaps")
- Keep posts under 250 words
- Use 3-4 specific hashtags, not 7+ generic ones
- Prefer "shipped" over "excited to announce"
- Start with the point, not preamble

## Emerging Patterns (1-2 occurrences)

These are noted but not enforced. Watch for consistency:

- Move call-to-action to middle paragraph
- Add personal project references as concrete examples

## Anti-Patterns (things to avoid)

Patterns you consistently edit away from:

- Long opening preambles before getting to the point
- More than 5 arrow-bullet items in a single list
- Closing with generic "What do you think?" (prefer specific questions)
- Hashtag counts above 5

---

*Last updated: {current date}*
*Based on {X} draft/final pairs*
*Feedback folder: `.claude/skills/writing-style/feedback/`*
```

## Edge Cases

### No Feedback Yet
If no feedback pairs exist:
```
No feedback pairs found yet.

To start building your preference profile:
1. Generate a draft: /linkedin-post
2. Edit and publish it
3. Capture your final: /capture-linkedin-final <draft-id>
4. Repeat 3-5 times
5. Run this command again
```

### Only One Feedback Pair
```
Found 1 feedback pair. For reliable pattern detection, capture at least 3 more finals.

Current observations (treat as preliminary):
- [list observations from the single pair]
```

### Conflicting Patterns
If analyses contain contradictory preferences (e.g., one says "shorten" another says "lengthen"):
```
Conflicting pattern detected:
- "Prefer shorter posts" (2 occurrences)
- "Add more detail/examples" (1 occurrence)

This might indicate context-dependent preferences. Keeping as emerging pattern until more data clarifies.
```

## Incremental Updates

When run multiple times:
- Preserve existing high-confidence patterns
- Add new high-confidence patterns that cross the threshold
- Update occurrence counts
- Move approved emerging patterns to high-confidence
- Remove patterns that haven't appeared in recent feedback (optional decay)
