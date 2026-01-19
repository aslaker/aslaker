---
id: spec-001
title: Fix color contrast issues across site
priority: 2
domain: accessibility
source_tools: [axe, pa11y, lighthouse]
wcag_criteria: ["1.4.3"]
depends_on: []
blocks: []
parallel_safe: false
files:
  - src/components/sections/consulting/ServiceCard.tsx
  - src/components/sections/hero/Hero.tsx
  - src/components/PortfolioApp.tsx
  - src/styles/global.css
---

## Problem

Multiple elements have insufficient color contrast, failing WCAG 2.1 AA requirements (minimum 4.5:1 for normal text).

Reported by:
- axe: color-contrast (serious) - 5 occurrences
- pa11y: WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail - 4 occurrences
- Lighthouse: color-contrast (score 0%)

### Specific Violations

1. **ServiceCard.tsx** - Service card text on dark background:
   - `text-zinc-100` on `bg-zinc-900/50` hover: ratio 1.81:1
   - `text-zinc-300` on `bg-zinc-900`: ratio 1.37:1 (axe says 1.37)
   - `text-zinc-500` in placeholder: ratio 1.2:1

2. **Footer text** (in PortfolioApp.tsx):
   - `text-zinc-600` on `bg-zinc-950`: ratio 2.57:1
   - Affects copyright and site info text

3. **Chevron accent** (var(--theme-primary-darker)):
   - Pa11y reports ratio 2.05:1 and 1.56:1
   - Used in various buttons and accents

## Affected Elements

From axe:
- `.p-6.hover\:bg-zinc-900.h-full:nth-child(1) > .group-hover\:text-zinc-50.text-lg.text-zinc-100`
- `.p-6.hover\:bg-zinc-900.h-full:nth-child(1) > .grow.group-hover\:text-zinc-300.leading-relaxed`
- `.p-6.hover\:bg-zinc-900.h-full:nth-child(1) > .self-start.border-dashed.border-zinc-700`
- `.sm\:flex-row.gap-4.flex-col > p:nth-child(1)` (footer)
- `.sm\:flex-row.gap-4.flex-col > p:nth-child(2)` (footer)

From pa11y:
- `#main-content > section:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > button:nth-child(1) > span > span`
- `#about > div > div:nth-child(5) > button > span`
- `#consulting > div > div:nth-child(4) > button > span > span`
- `#contact > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(3) > button > span > span`

## Solution

1. **Update ServiceCard.tsx text colors:**
   - Change `text-zinc-100` to `text-zinc-50` (or keep zinc-100 and ensure background is darker)
   - Change `text-zinc-300` to `text-zinc-200`
   - Change `text-zinc-500` to `text-zinc-400`

2. **Update footer text in PortfolioApp.tsx:**
   - Change `text-zinc-600` to `text-zinc-400` (achieves ~5.5:1 on zinc-950)

3. **Fix CSS variable `--theme-primary-darker`:**
   - Current value produces ~2:1 contrast
   - Update to a darker lime green: recommend `#4d7c0f` (lime-700) which achieves ~4.9:1

4. **Alternative approach for accents:**
   - If decorative chevrons (">") don't convey meaning, they could be aria-hidden
   - But text content must still meet contrast requirements

## Verification

- Re-run axe-core and pa11y audits
- Verify no color-contrast violations remain
- Visual check: ensure design aesthetic is preserved
- Run `npm run build` to verify no errors
