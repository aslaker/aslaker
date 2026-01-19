---
id: spec-001
title: Add prefers-reduced-motion support
priority: 1
domain: accessibility
depends_on: []
blocks: [spec-002]
parallel_safe: true
files:
  - /workspace/src/styles/global.css
  - /workspace/src/components/sections/hero/TypingText.tsx
  - /workspace/src/components/sections/hero/Hero.tsx
  - /workspace/tailwind.config.mjs
wcag_criteria:
  - "2.3.3 Animation from Interactions (AAA)"
  - "2.2.2 Pause, Stop, Hide (A)"
estimated_complexity: medium
---

## Problem

The site uses numerous animations (typing effects, wave backgrounds, fade-ins, pulse effects, blinking cursors) but does not respect the user's `prefers-reduced-motion` system preference. Users with vestibular disorders or motion sensitivity may experience discomfort or difficulty using the site.

**WCAG Criteria:**
- 2.3.3 Animation from Interactions (Level AAA, but best practice for AA)
- 2.2.2 Pause, Stop, Hide (Level A) - blinking cursors continue indefinitely

**Affected users:**
- Users with vestibular disorders
- Users with motion sensitivity
- Users who prefer reduced motion for focus

## Current State

### Global CSS (`/workspace/src/styles/global.css`)
Contains animation keyframes but no reduced motion media query:
```css
@theme {
  --animate-wave: wave 8s ease-in-out infinite;
  --animate-blink: blink 1s step-end infinite;
  --animate-pulse-glow: pulse-glow 2s ease-in-out infinite;

  @keyframes wave { ... }
  @keyframes blink { ... }
  @keyframes pulse-glow { ... }
}
```

### TypingText Component (`/workspace/src/components/sections/hero/TypingText.tsx`)
Uses character-by-character typing animation with no reduced motion check.

### Hero Component (`/workspace/src/components/sections/hero/Hero.tsx`)
Contains wave animations (lines 48-68) and keyframe animations (lines 216-228).

### Throughout Site
Multiple components use Tailwind animation classes (`animate-pulse`, transitions) that continue regardless of user preference.

## Desired State

1. All animations should be disabled or reduced when `prefers-reduced-motion: reduce` is set
2. TypingText component should immediately display full text when reduced motion is preferred
3. Blinking cursors should become static
4. Wave and pulse effects should be disabled
5. Transitions should be instant or removed

## Implementation Steps

### Step 1: Add reduced motion CSS to global.css

Add at the end of `/workspace/src/styles/global.css`:

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Step 2: Update TypingText component

In `/workspace/src/components/sections/hero/TypingText.tsx`, add a hook to detect reduced motion and skip animation:

```tsx
import { useState, useEffect } from 'react'

interface TypingTextProps {
  text: string
  // ... other props
}

export function TypingText({ text, ...props }: TypingTextProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [displayedText, setDisplayedText] = useState('')

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    // If reduced motion is preferred, show full text immediately
    if (prefersReducedMotion) {
      setDisplayedText(text)
      return
    }

    // Otherwise, run typing animation as before
    // ... existing animation logic
  }, [text, prefersReducedMotion])

  // ... rest of component
}
```

### Step 3: Add static cursor variant

For blinking cursors throughout the site, add a CSS class that respects reduced motion:

```css
/* In global.css */
.cursor-blink {
  animation: blink 1s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-blink {
    animation: none;
    opacity: 1;
  }
}
```

### Step 4: Create useReducedMotion hook (optional but recommended)

Create a reusable hook at `/workspace/src/hooks/useReducedMotion.ts`:

```typescript
import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/styles/global.css` | Add `@media (prefers-reduced-motion: reduce)` block |
| `/workspace/src/components/sections/hero/TypingText.tsx` | Add reduced motion detection, skip animation when preferred |
| `/workspace/src/hooks/useReducedMotion.ts` | Create new file with reusable hook |

## Code Examples

### Before (global.css - end of file)
```css
.sr-only {
  /* ... existing styles */
}
```

### After (global.css - end of file)
```css
.sr-only {
  /* ... existing styles */
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .cursor-blink,
  .animate-pulse,
  .animate-wave {
    animation: none !important;
  }
}
```

## Testing Criteria

- [ ] Enable "Reduce motion" in OS accessibility settings (macOS: System Preferences > Accessibility > Display > Reduce motion)
- [ ] Verify typing animation shows text immediately without character-by-character effect
- [ ] Verify blinking cursors become static
- [ ] Verify wave background animations are disabled
- [ ] Verify pulse effects are disabled
- [ ] Verify transitions happen instantly
- [ ] Test with VoiceOver/NVDA to ensure no motion-related accessibility barriers

## Related Specs

- spec-002: Blinking cursor controls (depends on this spec for reduced motion foundation)

## References

- [WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html)
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [A11y Project: Reduced Motion](https://www.a11yproject.com/posts/reduced-motion/)
