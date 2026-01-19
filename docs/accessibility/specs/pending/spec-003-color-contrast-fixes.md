---
id: spec-003
title: Fix low contrast text throughout the site
priority: 2
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/hero/Hero.tsx
  - /workspace/src/components/sections/projects/ProjectCard.tsx
  - /workspace/src/components/sections/projects/ProjectsGrid.tsx
  - /workspace/src/components/sections/consulting/ServiceCard.tsx
  - /workspace/src/components/sections/contact/ContactSection.tsx
  - /workspace/src/components/sections/about/AboutGrid.tsx
  - /workspace/src/components/sections/about/CharacterSheetCard.tsx
  - /workspace/src/components/sections/about/ScorecardCard.tsx
  - /workspace/src/components/sections/about/TrailMapCard.tsx
  - /workspace/src/components/shell/FontSelector.tsx
  - /workspace/src/components/PortfolioApp.tsx
---

## Problem

Multiple text elements throughout the site fail WCAG 1.4.3 Contrast (Minimum) Level AA requirements. The dark theme uses zinc colors that do not provide sufficient contrast against the dark backgrounds:

| Color Class | Hex | Background | Contrast Ratio | Required |
|-------------|-----|------------|----------------|----------|
| text-zinc-400 | #a1a1aa | zinc-950 (#09090b) | ~4.2:1 | 4.5:1 |
| text-zinc-500 | #71717a | zinc-950 | ~3.2:1 | 4.5:1 |
| text-zinc-600 | #52525b | zinc-950 | ~2.4:1 | 4.5:1 |
| text-zinc-700 | #3f3f46 | zinc-950 | ~1.8:1 | 4.5:1 |

**Affected Issues:**
- A11Y-001: zinc-400 on zinc-950 (High)
- A11Y-002: zinc-500 on dark backgrounds (High)
- A11Y-003: zinc-600/zinc-700 elements (High)
- A11Y-004: Semi-transparent colors (Medium)

## Solution

Replace low-contrast text colors with higher-contrast alternatives:

| Current | Replacement | New Contrast | Notes |
|---------|-------------|--------------|-------|
| text-zinc-400 | text-zinc-300 | ~7.2:1 | Primary body text |
| text-zinc-500 | text-zinc-400 | ~4.2:1 | Secondary/hint text |
| text-zinc-600 | text-zinc-400 | ~4.2:1 | Footer/subtle text |
| text-zinc-700 | text-zinc-500 | ~3.2:1 | Decorative only |

For decorative elements that don't convey essential information, lower contrast is acceptable if marked with `aria-hidden="true"`.

## Files to Modify

### `/workspace/src/components/sections/hero/Hero.tsx`
- Line 150: Change tagline from `text-zinc-400` to `text-zinc-300`

### `/workspace/src/components/sections/projects/ProjectCard.tsx`
- Line 59: Change short description from `text-zinc-400` to `text-zinc-300`

### `/workspace/src/components/sections/projects/ProjectsGrid.tsx`
- Lines 114-116: Change project count from `text-zinc-600` to `text-zinc-400`

### `/workspace/src/components/sections/consulting/ServiceCard.tsx`
- Line 88: Change service description from `text-zinc-400` to `text-zinc-300`

### `/workspace/src/components/sections/contact/ContactSection.tsx`
- Lines 62-65: Change intro paragraph from `text-zinc-400` to `text-zinc-300`
- Lines 102-103: Change response time from `text-zinc-500` to `text-zinc-400`

### `/workspace/src/components/sections/about/AboutGrid.tsx`
- Lines 199-203: Change section description from `text-zinc-400` to `text-zinc-300`
- Lines 77, 226-229: Change hint text from `text-zinc-600` to `text-zinc-400`

### `/workspace/src/components/sections/about/CharacterSheetCard.tsx`
- Lines 93-95: Change "Character Stats" label from `text-zinc-500` to `text-zinc-400`

### `/workspace/src/components/sections/about/ScorecardCard.tsx`
- Lines 104-106: Change "Collection Stats" label from `text-zinc-500` to `text-zinc-400`

### `/workspace/src/components/sections/about/TrailMapCard.tsx`
- Lines 164-166: Change "Trail Guide" label from `text-zinc-500` to `text-zinc-400`

### `/workspace/src/components/shell/FontSelector.tsx`
- Line 79, 131: Change font descriptions from `text-zinc-500` to `text-zinc-400`
- Line 140: Change "Saved to browser" text from `text-zinc-700` to `text-zinc-500`

### `/workspace/src/components/PortfolioApp.tsx`
- Lines 152-158: Change footer text from `text-zinc-600` to `text-zinc-400`

## Code Examples

### Hero.tsx - Tagline Fix

**Before:**
```tsx
<p className="text-zinc-400 text-lg sm:text-xl max-w-xl">
  {hero.tagline}
</p>
```

**After:**
```tsx
<p className="text-zinc-300 text-lg sm:text-xl max-w-xl">
  {hero.tagline}
</p>
```

### Footer Fix in PortfolioApp.tsx

**Before:**
```tsx
<footer className="...">
  <p className="text-zinc-600 text-sm">
    Made with...
  </p>
</footer>
```

**After:**
```tsx
<footer className="...">
  <p className="text-zinc-400 text-sm">
    Made with...
  </p>
</footer>
```

### Semi-transparent Color Fix

For elements using opacity modifiers like `text-lime-500/60`:

**Before:**
```tsx
<span className="text-lime-500/60">&gt;</span>
```

**After:**
```tsx
<span className="text-lime-400" aria-hidden="true">&gt;</span>
```

Note: If the element is purely decorative, add `aria-hidden="true"` and the contrast requirement doesn't apply. Otherwise, use solid colors that meet contrast requirements.

## Testing Criteria

- [ ] Use browser devtools or WebAIM Contrast Checker to verify all text meets 4.5:1 ratio
- [ ] Hero tagline text has sufficient contrast
- [ ] Project card descriptions are readable
- [ ] Service card descriptions are readable
- [ ] Contact section intro text has sufficient contrast
- [ ] Footer text is legible
- [ ] About section descriptions are readable
- [ ] Font selector dropdown text is readable
- [ ] All "hint" text meets minimum contrast
- [ ] Test with color blindness simulation to ensure readability

## Related Specs

- None (independent of other fixes)

## References

- [WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)

## Color Reference Chart

For quick reference, here are the zinc colors and their contrast ratios against zinc-950 (#09090b):

| Class | Hex | Contrast vs zinc-950 | Meets AA? |
|-------|-----|---------------------|-----------|
| zinc-100 | #f4f4f5 | ~17.4:1 | Yes |
| zinc-200 | #e4e4e7 | ~14.7:1 | Yes |
| zinc-300 | #d4d4d8 | ~12.0:1 | Yes |
| zinc-400 | #a1a1aa | ~7.2:1 | Yes |
| zinc-500 | #71717a | ~4.5:1 | Borderline |
| zinc-600 | #52525b | ~2.4:1 | No |
| zinc-700 | #3f3f46 | ~1.8:1 | No |

**Recommendation:** Use zinc-400 as the minimum for any informational text. Use zinc-300 for primary body text for better readability.
