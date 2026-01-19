---
id: spec-002
title: Add prefers-reduced-motion support for all animations
priority: 1
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/styles/global.css
  - /workspace/src/components/sections/hero/Hero.tsx
  - /workspace/src/components/sections/hero/TypingText.tsx
  - /workspace/tailwind.config.mjs
---

## Problem

The site uses numerous animations including:
- Wave background animations in the Hero section
- Typing effect with blinking cursor
- Fade-in and slide transitions on scroll
- Pulse effects on interactive elements
- Transition animations throughout the UI

None of these animations respect the user's `prefers-reduced-motion` system preference. This can cause discomfort or vestibular disorders for users who have enabled reduced motion settings.

**Affected Issues:**
- A11Y-023: No prefers-reduced-motion support (Critical)
- A11Y-024: Blinking cursor may affect users with vestibular disorders (Medium)

This violates WCAG 2.3.3 (Animation from Interactions - Level AAA) and is a best practice for Level AA compliance.

## Solution

Implement comprehensive reduced motion support through:
1. Global CSS media query to disable/reduce animations
2. React hook to detect user preference
3. Conditional animation rendering in React components
4. Modified TypingText component to skip animation when reduced motion is preferred

### Implementation Steps

1. Add global CSS media query to `/workspace/src/styles/global.css`
2. Create a `useReducedMotion` custom hook
3. Update Hero.tsx to conditionally render animations
4. Update TypingText.tsx to skip typing animation and show text immediately
5. Update Tailwind config to use motion-safe/motion-reduce variants

## Files to Modify

### `/workspace/src/styles/global.css`

Add at the end of the file:

```css
/* Reduced motion support */
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

### `/workspace/src/components/sections/hero/TypingText.tsx`

**Current:** Always runs typing animation with blinking cursor.

**Required Changes:**
- Import/create useReducedMotion hook
- When reduced motion is preferred, render text immediately without typing effect
- Disable cursor blink animation

### `/workspace/src/components/sections/hero/Hero.tsx`

**Current** (lines 48-68, 216-228): Wave animations run unconditionally.

**Required Changes:**
- Conditionally render wave animations based on motion preference
- Use static gradient background when reduced motion is preferred

### `/workspace/tailwind.config.mjs`

**Current** (lines 61-74): Animation definitions without motion variants.

**Required Changes:**
- Ensure motion-safe and motion-reduce variants are available

## Code Examples

### New Hook: `/workspace/src/hooks/useReducedMotion.ts`

```typescript
import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

### TypingText.tsx Updated Implementation

```tsx
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function TypingText({ text, className, onComplete }: TypingTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // Existing typing animation logic...
  }, [text, prefersReducedMotion, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {/* Only show blinking cursor if motion is allowed and not complete */}
      {!prefersReducedMotion && !isComplete && (
        <span className="animate-blink">|</span>
      )}
      {/* Static cursor when complete or reduced motion */}
      {(isComplete || prefersReducedMotion) && (
        <span className="opacity-0">|</span>
      )}
    </span>
  );
}
```

### Hero.tsx Wave Animation Conditional

```tsx
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Hero({ hero }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section>
      {/* Wave animations - only render when motion is allowed */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Wave animation elements */}
        </div>
      )}

      {/* Static gradient fallback when reduced motion */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 pointer-events-none" />
      )}

      {/* Rest of hero content */}
    </section>
  );
}
```

### Global CSS Addition

```css
/* Add to /workspace/src/styles/global.css */

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable specific animations */
  .animate-blink,
  .animate-wave,
  .animate-pulse {
    animation: none !important;
  }
}
```

## Testing Criteria

- [ ] Enable `prefers-reduced-motion: reduce` in OS settings or browser dev tools
- [ ] Verify Hero wave animations do not play
- [ ] Verify TypingText shows full text immediately without typing effect
- [ ] Verify cursor does not blink
- [ ] Verify all page transitions complete instantly
- [ ] Verify scroll behavior is instant (not smooth)
- [ ] Verify pulse effects on buttons are static
- [ ] Verify page is fully functional with reduced motion enabled
- [ ] Test with screen reader to ensure content is still announced correctly

## Related Specs

- None (this is independent)

## References

- [WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [web.dev: Reduced Motion](https://web.dev/prefers-reduced-motion/)
- [A11y Project: Reduced Motion](https://www.a11yproject.com/posts/understanding-vestibular-disorders/)
