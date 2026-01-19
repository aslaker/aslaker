---
id: spec-004
title: Fix color contrast issues across site
priority: 2
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/hero/Hero.tsx
  - /workspace/src/components/sections/projects/ProjectCard.tsx
  - /workspace/src/components/sections/consulting/ServiceCard.tsx
  - /workspace/src/components/sections/contact/ContactSection.tsx
  - /workspace/src/components/sections/about/AboutGrid.tsx
  - /workspace/src/components/sections/about/CharacterSheetCard.tsx
  - /workspace/src/components/sections/about/ScorecardCard.tsx
  - /workspace/src/components/sections/about/TrailMapCard.tsx
  - /workspace/src/components/shell/FontSelector.tsx
  - /workspace/src/components/PortfolioApp.tsx
wcag_criteria:
  - "1.4.3 Contrast (Minimum) (AA)"
estimated_complexity: low
---

## Problem

Multiple text elements across the site fail WCAG 2.1 Level AA color contrast requirements. Text using `text-zinc-400`, `text-zinc-500`, `text-zinc-600`, and `text-zinc-700` on dark backgrounds (`bg-zinc-950`, `bg-zinc-900`) does not meet the 4.5:1 contrast ratio requirement for normal text.

**WCAG Criterion:** 1.4.3 Contrast (Minimum) (Level AA)

**Contrast ratios (current):**
| Color | Hex | On zinc-950 (#09090b) | Requirement |
|-------|-----|----------------------|-------------|
| zinc-400 | #a1a1aa | ~4.2:1 | Fails 4.5:1 |
| zinc-500 | #71717a | ~3.2:1 | Fails 4.5:1 |
| zinc-600 | #52525b | ~2.4:1 | Fails 4.5:1 |
| zinc-700 | #3f3f46 | ~1.8:1 | Fails 4.5:1 |

**Recommended replacements:**
| Current | Replace With | New Contrast |
|---------|-------------|--------------|
| text-zinc-400 | text-zinc-300 | ~7.2:1 |
| text-zinc-500 | text-zinc-400 | ~4.6:1 |
| text-zinc-600 | text-zinc-400 | ~4.6:1 |
| text-zinc-700 | text-zinc-400 | ~4.6:1 |

## Current State

### A11Y-001: zinc-400 text (contrast ~4.2:1)

**Locations requiring `text-zinc-400` -> `text-zinc-300`:**

1. `/workspace/src/components/sections/hero/Hero.tsx:150` - tagline text
2. `/workspace/src/components/sections/projects/ProjectCard.tsx:59` - short description
3. `/workspace/src/components/sections/consulting/ServiceCard.tsx:88` - service description
4. `/workspace/src/components/sections/contact/ContactSection.tsx:62-65` - intro paragraph
5. `/workspace/src/components/sections/about/AboutGrid.tsx:199-203` - section description

### A11Y-002: zinc-500 text (contrast ~3.2:1)

**Locations requiring `text-zinc-500` -> `text-zinc-400`:**

1. `/workspace/src/components/shell/FontSelector.tsx:79,131` - font descriptions
2. `/workspace/src/components/sections/about/CharacterSheetCard.tsx:93-95` - "Character Stats" label
3. `/workspace/src/components/sections/about/ScorecardCard.tsx:104-106` - "Collection Stats" label
4. `/workspace/src/components/sections/about/TrailMapCard.tsx:164-166` - "Trail Guide" label
5. `/workspace/src/components/sections/contact/ContactSection.tsx:102-103` - response time text

### A11Y-003: zinc-600/zinc-700 text (contrast ~2.4:1 / ~1.8:1)

**Locations requiring `text-zinc-600` or `text-zinc-700` -> `text-zinc-400`:**

1. `/workspace/src/components/PortfolioApp.tsx:152-158` - footer text
2. `/workspace/src/components/sections/projects/ProjectsGrid.tsx:114-116` - project count
3. `/workspace/src/components/sections/about/AboutGrid.tsx:77,226-229` - hint text

## Desired State

All text on dark backgrounds meets the 4.5:1 minimum contrast ratio for Level AA compliance. Secondary/muted text should use `text-zinc-300` or `text-zinc-400` instead of lower-contrast options.

## Implementation Steps

### Step 1: Hero component contrast fixes

File: `/workspace/src/components/sections/hero/Hero.tsx`

Find and replace around line 150:
```diff
- <p className="text-lg text-zinc-400 leading-relaxed">
+ <p className="text-lg text-zinc-300 leading-relaxed">
```

### Step 2: ProjectCard contrast fixes

File: `/workspace/src/components/sections/projects/ProjectCard.tsx`

Find and replace around line 59:
```diff
- <p className="font-mono text-sm leading-relaxed text-zinc-400">
+ <p className="font-mono text-sm leading-relaxed text-zinc-300">
```

### Step 3: ServiceCard contrast fixes

File: `/workspace/src/components/sections/consulting/ServiceCard.tsx`

Find and replace around line 88:
```diff
- <p className="text-sm leading-relaxed text-zinc-400">
+ <p className="text-sm leading-relaxed text-zinc-300">
```

### Step 4: ContactSection contrast fixes

File: `/workspace/src/components/sections/contact/ContactSection.tsx`

Lines 62-65 (intro paragraph):
```diff
- <p className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-400">
+ <p className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-300">
```

Lines 102-103 (response time):
```diff
- <p className="text-sm text-zinc-500">
+ <p className="text-sm text-zinc-400">
```

### Step 5: AboutGrid contrast fixes

File: `/workspace/src/components/sections/about/AboutGrid.tsx`

Around lines 199-203 (section description):
```diff
- <p className="text-zinc-400 leading-relaxed">
+ <p className="text-zinc-300 leading-relaxed">
```

Around lines 77, 226-229 (hint text):
```diff
- <span className="text-zinc-600">
+ <span className="text-zinc-400">
```

### Step 6: FontSelector contrast fixes

File: `/workspace/src/components/shell/FontSelector.tsx`

Around lines 79, 131:
```diff
- <span className="text-xs text-zinc-500">
+ <span className="text-xs text-zinc-400">
```

### Step 7: Character/Scorecard/TrailMap card label fixes

**CharacterSheetCard.tsx** around lines 93-95:
```diff
- <span className="text-xs uppercase tracking-wider text-zinc-500">
+ <span className="text-xs uppercase tracking-wider text-zinc-400">
```

**ScorecardCard.tsx** around lines 104-106:
```diff
- <span className="text-xs uppercase tracking-wider text-zinc-500">
+ <span className="text-xs uppercase tracking-wider text-zinc-400">
```

**TrailMapCard.tsx** around lines 164-166:
```diff
- <span className="text-xs uppercase tracking-wider text-zinc-500">
+ <span className="text-xs uppercase tracking-wider text-zinc-400">
```

### Step 8: Footer contrast fixes

File: `/workspace/src/components/PortfolioApp.tsx`

Around lines 152-158:
```diff
- <p className="text-sm text-zinc-600">
+ <p className="text-sm text-zinc-400">

- <span className="text-zinc-700">
+ <span className="text-zinc-500">
```

### Step 9: ProjectsGrid contrast fixes

File: `/workspace/src/components/sections/projects/ProjectsGrid.tsx`

Around lines 114-116:
```diff
- <span className="text-zinc-600">
+ <span className="text-zinc-400">
```

## Files to Modify

| File | Lines | Change |
|------|-------|--------|
| `/workspace/src/components/sections/hero/Hero.tsx` | ~150 | zinc-400 -> zinc-300 |
| `/workspace/src/components/sections/projects/ProjectCard.tsx` | ~59 | zinc-400 -> zinc-300 |
| `/workspace/src/components/sections/consulting/ServiceCard.tsx` | ~88 | zinc-400 -> zinc-300 |
| `/workspace/src/components/sections/contact/ContactSection.tsx` | 62-65, 102-103 | zinc-400 -> zinc-300, zinc-500 -> zinc-400 |
| `/workspace/src/components/sections/about/AboutGrid.tsx` | 77, 199-203, 226-229 | zinc-400 -> zinc-300, zinc-600 -> zinc-400 |
| `/workspace/src/components/shell/FontSelector.tsx` | 79, 131 | zinc-500 -> zinc-400 |
| `/workspace/src/components/sections/about/CharacterSheetCard.tsx` | 93-95 | zinc-500 -> zinc-400 |
| `/workspace/src/components/sections/about/ScorecardCard.tsx` | 104-106 | zinc-500 -> zinc-400 |
| `/workspace/src/components/sections/about/TrailMapCard.tsx` | 164-166 | zinc-500 -> zinc-400 |
| `/workspace/src/components/PortfolioApp.tsx` | 152-158 | zinc-600 -> zinc-400, zinc-700 -> zinc-500 |
| `/workspace/src/components/sections/projects/ProjectsGrid.tsx` | 114-116 | zinc-600 -> zinc-400 |

## Testing Criteria

- [ ] Use browser DevTools to verify contrast ratios meet 4.5:1 for all body text
- [ ] Use WebAIM Contrast Checker or similar tool to validate:
  - [ ] zinc-300 (#d4d4d8) on zinc-950 (#09090b) = 7.2:1
  - [ ] zinc-400 (#a1a1aa) on zinc-950 (#09090b) = 4.6:1
- [ ] Visual inspection: text should still appear as "secondary" but be readable
- [ ] Test with browser zoom at 200% - verify text remains legible
- [ ] Run automated accessibility checker (axe-core) and verify no contrast failures

## Related Specs

- None (this is a standalone fix)

## References

- [WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Accessible Color Palette Generator](https://venngage.com/tools/accessible-color-palette-generator)
