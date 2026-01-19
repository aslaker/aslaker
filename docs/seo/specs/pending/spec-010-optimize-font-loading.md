---
id: spec-010
title: Optimize font loading for performance
priority: 3
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/styles/global.css
  - /workspace/src/pages/index.astro
wcag_criteria: []
estimated_complexity: medium
---

## Problem

Two large Google Fonts imports block rendering and significantly impact First Contentful Paint (FCP). Loading 7+ font families with multiple weights creates performance issues that affect Core Web Vitals.

**Current imports in `/workspace/src/styles/global.css`:**
```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');
```

**Performance Impact:**
- Render-blocking CSS imports
- Large total font download size
- Delayed First Contentful Paint
- Poor Core Web Vitals scores

## Current State

The site loads 7 font families:
1. JetBrains Mono (code) - Required immediately
2. Space Grotesk (headings) - Required immediately
3. Outfit (user choice) - Can be deferred
4. Sora (user choice) - Can be deferred
5. Manrope (user choice) - Can be deferred
6. Plus Jakarta Sans (user choice) - Can be deferred
7. Bricolage Grotesque (user choice) - Can be deferred

## Desired State

1. Critical fonts (JetBrains Mono, Space Grotesk) preloaded in HTML head
2. User-selectable fonts loaded asynchronously after initial render
3. Font display strategy optimized for performance
4. Reduced font weights to only those used

## Implementation Steps

### Step 1: Preload critical fonts in HTML head

Update `/workspace/src/pages/index.astro`:

```astro
<head>
  <!-- ... existing meta tags ... -->

  <!-- Preload critical fonts -->
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  />

  <!-- Critical fonts - loaded immediately -->
  <link
    rel="preload"
    as="style"
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600&display=swap"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600&display=swap"
  />

  <!-- ... rest of head ... -->
</head>
```

### Step 2: Update global.css to remove render-blocking imports

Update `/workspace/src/styles/global.css`:

```css
@import 'tailwindcss';

/* Critical fonts are now loaded in HTML head */
/* Remove or comment out these render-blocking imports: */
/* @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap'); */

/* User-selectable fonts - loaded asynchronously by FontContext */
/* @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&...'); */

/* ... rest of file ... */
```

### Step 3: Load user-selectable fonts dynamically

Update FontContext to load fonts on-demand:

```typescript
// In FontContext.tsx or a new fontLoader.ts

const fontUrls: Record<string, string> = {
  outfit: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap',
  sora: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap',
  manrope: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap',
  'plus-jakarta-sans': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
  'bricolage-grotesque': 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600&display=swap',
};

function loadFont(fontId: string) {
  const url = fontUrls[fontId];
  if (!url) return;

  // Check if already loaded
  if (document.querySelector(`link[href="${url}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
```

### Step 4: Reduce font weights

Only load weights actually used:
- 400 (regular) - body text
- 500 (medium) - emphasized text
- 600 (semibold) - headings

Remove unused weights (300, 700) from font requests.

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/pages/index.astro` | Add font preloads, preconnect hints |
| `/workspace/src/pages/blog/index.astro` | Add font preloads |
| `/workspace/src/pages/blog/[slug].astro` | Add font preloads |
| `/workspace/src/styles/global.css` | Remove render-blocking @import statements |
| `/workspace/src/context/FontContext.tsx` | Add dynamic font loading |

## Testing Criteria

- [ ] Run Lighthouse audit - FCP should improve
- [ ] Check Network tab - fonts load without blocking render
- [ ] Critical fonts (JetBrains Mono, Space Grotesk) load first
- [ ] User-selectable fonts load when FontSelector is used
- [ ] No FOUT (Flash of Unstyled Text) or FOIT (Flash of Invisible Text)
- [ ] Font switching in FontSelector still works correctly

## Related Specs

- None (standalone performance improvement)

## References

- [Google Fonts Optimization](https://web.dev/optimize-webfont-loading/)
- [Preloading Content](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- [CSS Font Display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
