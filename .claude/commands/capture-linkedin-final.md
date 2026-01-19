---
name: capture-linkedin-final
description: Capture your final published LinkedIn post and analyze changes from draft
---

# Capture LinkedIn Final

Capture the final published version of a LinkedIn post and analyze what changed from the draft.

## Arguments

DRAFT_ID = $ARGUMENTS (e.g., "2026-01-18-four-days-shipping")

## Process

1. **Validate draft exists** - Check that `.claude/skills/writing-style/feedback/{DRAFT_ID}/draft.md` exists. If not, check `linkedin-drafts/{DRAFT_ID}.md` and copy it to the feedback folder.

2. **Get final content** - Ask user: "Please paste your final published LinkedIn post content, or confirm you've saved it to `.claude/skills/writing-style/feedback/{DRAFT_ID}/final.md`"

3. **Save final** - Write the final content to `.claude/skills/writing-style/feedback/{DRAFT_ID}/final.md`

4. **Read both versions** - Load the draft and final for comparison

5. **Analyze diff** - Compare draft vs final and categorize changes into:
   - **Structural**: Length changes, paragraph reordering, section additions/removals
   - **Tone**: Hedging language added/removed, directness, formality level
   - **Word choice**: Specific replacements, simplifications, jargon changes
   - **Content**: Added/removed information, examples, personal anecdotes
   - **Format**: Hashtags, emojis, bullet points, line breaks

6. **Extract preferences** - From the changes, infer what the user prefers. Be specific and actionable.

7. **Save analysis** - Write to `.claude/skills/writing-style/feedback/{DRAFT_ID}/analysis.md`

8. **Report** - Show the user a summary of what changed and what preferences were extracted

## Analysis Output Format

Save to `.claude/skills/writing-style/feedback/{DRAFT_ID}/analysis.md`:

```markdown
# Analysis: {DRAFT_ID}

**Analyzed:** {current date}
**Draft words:** X → **Final words:** Y ({Z}% change)

## Structural Changes
- [list specific changes, e.g., "Shortened opening from 3 sentences to 1"]

## Tone Adjustments
- [list specific changes, e.g., "Removed hedging phrase 'I think'"]

## Word Choice Patterns
- [list specific replacements, e.g., "'utilize' → 'use'"]

## Content Modifications
- [list additions/removals, e.g., "Added reference to ISS tracker project"]

## Format Changes
- [list format changes, e.g., "Reduced hashtags from 6 to 3"]

---

## Extracted Preferences

Based on this edit session, the user appears to prefer:

- [bulleted list of inferred preferences, e.g., "Direct openers without preamble"]
- [e.g., "Fewer than 4 hashtags"]
- [e.g., "Personal project examples as concrete evidence"]
```

## If Draft Not Found

If the draft ID doesn't exist in either location:

1. List available draft IDs from `linkedin-drafts/` directory
2. Ask user to provide the correct draft ID
3. Or offer to create a new feedback entry if they have both draft and final content

## Example Interaction

```
User: /capture-linkedin-final 2026-01-18-four-days-shipping

Claude: I found the draft for "2026-01-18-four-days-shipping".

Please paste your final published LinkedIn post content below:

[User pastes content]

Claude: Got it! Let me analyze what changed...

## Summary

**Length:** 260 words → 215 words (-17%)

### Key Changes:
- Shortened opening hook
- Removed 2 hedging phrases ("I think", "maybe")
- Changed "utilize" → "use"
- Added ISS tracker reference
- Reduced hashtags from 5 to 3

### Extracted Preferences:
- Prefer posts under 220 words
- Remove hedging language
- Use simpler word choices
- Include specific project references
- Limit hashtags to 3-4

Analysis saved to feedback/2026-01-18-four-days-shipping/analysis.md

Run /synthesize-linkedin-feedback after capturing a few more finals to update your learned preferences.
```
