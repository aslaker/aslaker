# LinkedIn Post Draft

**PR:** #16 - fix: add missing FocusTrap import to ContactModal
**Generated:** 2026-01-27
**Draft ID:** 2026-01-27-missing-import-bug

---

You know that moment when your code works perfectly in development, then explodes in production?

I just fixed a ReferenceError in my contact modal. The component was using `<FocusTrap>` everywhere. JSX was happy. TypeScript was happy. The build passed.

Then someone tried to actually open the modal. Instant crash.

The problem? I never imported the component. Just... forgot it. One line: `import FocusTrap from 'focus-trap-react'`

Here's what's wild: this is exactly the kind of bug that makes junior devs feel like frauds. "How did I miss something so obvious?" But it's not obvious. Your IDE autocompletes component usage. TypeScript validates the JSX. The linter stays quiet. Everything signals that you're good.

Until runtime.

The fix took 30 seconds. Finding it probably took longer. But the real lesson? Your tooling can't catch everything. Component imports are runtime dependencies. If you never execute that code path in dev, you won't know until someone clicks the button.

Quick checklist when adding new dependencies:
- Did I actually import it?
- Does my test coverage hit this code path?
- Have I clicked through the happy path in dev?

The obvious bugs aren't always obvious until they are.

What's the smallest bug that's taken you the longest to find?

---

**Suggested hashtags:** #WebDevelopment #JavaScript #React #Debugging #SoftwareEngineering
**Suggested posting time:** Morning (9-10am ET)

---

## Capture Your Final

After you edit and publish, capture your final version to help improve future drafts:

```
/capture-linkedin-final 2026-01-27-missing-import-bug
```
