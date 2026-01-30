# LinkedIn Post Draft

**PR:** #19 - Optimize 20260115 151818
**Generated:** 2026-01-30
**Draft ID:** 2026-01-30-update-site-data-command

---

I spent 20 minutes building a tool so I'd never waste 5 minutes again.

Every time I wanted to add a project to my portfolio site, I'd open site-data.ts, scroll to the projects array, copy an existing entry, update all the fields, remember to use kebab-case for the ID, check the phase enum values, save, build, hope TypeScript didn't yell at me.

Five minutes of context switching every single time.

So I built `/update-site-data`. Now it's a conversation:

"Which section? Projects or blog posts?"
"What do you want to do? Add new or update existing?"
"Describe the project in plain English."

Done. It parses my description, generates the proper structure, validates against TypeScript interfaces, runs the build, and tells me if something broke.

The interesting part: this isn't about laziness. It's about removing micro-decisions that drain momentum.

When the friction to add a project is higher than the satisfaction of shipping it, you stop updating your portfolio. You rationalize: "I'll add it later when I have more projects to batch."

Then six months pass and your site is stale.

Building tooling for your own workflow is force multiplication. Every repetitive task you automate is one less decision you have to make, freeing up mental bandwidth for work that actually matters.

What repetitive task in your workflow are you still doing manually?

---

**Suggested hashtags:** #DeveloperProductivity #Automation #DevTools #Portfolio

**Suggested posting time:** Morning (9-10 AM) your timezone

---

## Capture Your Final

After you edit and publish, capture your final version to help improve future drafts:

```
/capture-linkedin-final 2026-01-30-update-site-data-command
```
