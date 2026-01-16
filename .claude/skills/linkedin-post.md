---
name: linkedin-post
description: Generate a LinkedIn post draft based on recent PR changes
---

# LinkedIn Post Generator

Generate a professional LinkedIn post about recent changes to the portfolio site.

## Process

1. **Gather context** - Read the most recent merged PR or current git diff to understand what changed
2. **Identify the story** - What problem does this solve? What's interesting about the implementation?
3. **Draft the post** - Write a LinkedIn-appropriate post following the guidelines below
4. **Save the draft** - Write to `linkedin-drafts/YYYY-MM-DD-<slug>.md`

## Post Guidelines

### Tone
- Professional but personable
- Authentic voice - write like a real person, not a corporate account
- Confident without being boastful
- Focus on learnings and insights, not just announcements

### Structure (150-300 words)
1. **Hook** (1-2 sentences) - Start with something interesting or a question
2. **Context** (1-2 sentences) - What did you build/change?
3. **The interesting part** (2-4 sentences) - Why does it matter? What did you learn?
4. **Call to action** (1 sentence) - Ask a question or invite engagement

### What to emphasize
- The "why" behind technical decisions
- Interesting challenges and how you solved them
- Learnings that others might find valuable
- Connection to broader industry trends

### What to avoid
- Pure feature announcements without insight
- Overly technical jargon without explanation
- Self-congratulatory language
- Generic statements like "excited to announce"

## Draft File Format

```markdown
# LinkedIn Post Draft

**PR:** #[number] - [title]
**Generated:** [YYYY-MM-DD]

---

[Your draft post content here]

---

**Suggested hashtags:** #[relevant] #[hashtags]
**Suggested posting time:** [morning/afternoon] [timezone]
```

## Example Posts

### Good Example
```
Ever notice how most portfolio sites show projects as either "done" or "not done"?

I just added a 6-phase lifecycle indicator to my portfolio that shows where each project actually is: Concept → Design → Architecture → Building → Deployed → Iterating.

The interesting part: it forced me to be honest about where things really stand. My ISS tracker? Deployed. That AI tool I keep talking about? Still in architecture phase.

Building in public means showing the messy middle, not just the polished end result.

What signals do you look for when evaluating someone's side projects?
```

### Bad Example (don't do this)
```
Excited to announce I've added a new feature to my portfolio! 🎉

I implemented a project phase system using React and TypeScript. It shows different phases like concept, design, building etc.

Check it out at mysite.com!

#WebDevelopment #React #TypeScript #Coding #Developer
```

## After Generating

1. Review the draft for tone and authenticity
2. Adjust any parts that feel forced or generic
3. Add or remove hashtags as appropriate
4. Consider the best time to post for your audience
