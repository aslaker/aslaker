---
id: spec-005
title: Add skip link for keyboard navigation
priority: 2
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/shell/AppShell.tsx
wcag_criteria:
  - "2.4.1 Bypass Blocks (A)"
estimated_complexity: low
---

## Problem

No skip link is provided to allow keyboard users to bypass the header navigation and jump directly to main content. Users who navigate via keyboard must tab through all navigation items on every page load.

**WCAG Criterion:** 2.4.1 Bypass Blocks (Level A)

**Impact:** Keyboard users and screen reader users must navigate through the header (logo, 4+ nav links, social links, font selector) before reaching main content on every page visit.

## Current State

File: `/workspace/src/components/shell/AppShell.tsx`

```tsx
export function AppShell({
  children,
  navigationItems,
  socialLinks = [],
  siteName = 'adamslaker.dev',
  onNavigate,
}: AppShellProps) {
  // ... handler code

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header - no skip link before this */}
      <header className="fixed top-0 left-0 right-0 z-30 ...">
        {/* ... navigation content */}
      </header>

      {/* Main Content - no id for skip link target */}
      <main>{children}</main>
    </div>
  )
}
```

**Issues:**
- No skip link at the beginning of the page
- `<main>` element has no `id` attribute for skip link target
- No `aria-label` on main element

## Desired State

1. A visually hidden skip link appears at the very top of the page
2. The skip link becomes visible when focused (keyboard users will see it)
3. Clicking the skip link moves focus to the main content area
4. The main element has an id and aria-label for proper targeting

## Implementation Steps

### Step 1: Update AppShell component

Add skip link and update main element:

```tsx
import type { NavigationItem, SocialLink } from '../../types'
import { FontSelector } from './FontSelector'
import { MainNav } from './MainNav'
import { MobileMenu } from './MobileMenu'
import { SocialLinks } from './SocialLinks'

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  socialLinks?: SocialLink[]
  siteName?: string
  onNavigate?: (href: string) => void
}

export function AppShell({
  children,
  navigationItems,
  socialLinks = [],
  siteName = 'adamslaker.dev',
  onNavigate,
}: AppShellProps) {
  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = href
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Skip Link - visually hidden until focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-lime-500 focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 border-b border-zinc-800/50 bg-zinc-950 md:bg-zinc-950/90 backdrop-blur-sm md:backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Site Name */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('/')
              }}
              className="group flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-zinc-100 transition-colors hover:text-lime-400"
            >
              <span className="text-lime-400" aria-hidden="true">{'>'}</span>
              <span>{siteName}</span>
              <span className="animate-pulse text-lime-400" aria-hidden="true">_</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex">
              <MainNav items={navigationItems} onNavigate={handleNavigate} />
              {socialLinks.length > 0 && (
                <>
                  <div className="h-5 w-px bg-zinc-800" aria-hidden="true" />
                  <SocialLinks links={socialLinks} />
                </>
              )}
              <div className="h-5 w-px bg-zinc-800" aria-hidden="true" />
              <FontSelector variant="compact" />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu
                items={navigationItems}
                socialLinks={socialLinks}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" aria-label="Main content" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
```

### Step 2: Ensure sr-only and focus:not-sr-only classes work

The existing `global.css` has `.sr-only` but we need to ensure Tailwind's `focus:not-sr-only` variant is available.

In Tailwind v4 with the current setup, the `sr-only` and `not-sr-only` utilities should be available. If not, add to `global.css`:

```css
/* Ensure focus:not-sr-only works */
.focus\:not-sr-only:focus {
  position: static !important;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  clip-path: none;
  white-space: normal;
}
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/shell/AppShell.tsx` | Add skip link before header, add id and aria-label to main |

## Code Examples

### Before (AppShell.tsx lines 35-83)
```tsx
return (
  <div className="min-h-screen bg-zinc-950 text-zinc-100">
    {/* Header */}
    <header className="fixed top-0 left-0 right-0 z-30 ...">
      {/* ... */}
    </header>

    {/* Main Content */}
    <main>{children}</main>
  </div>
)
```

### After (AppShell.tsx)
```tsx
return (
  <div className="min-h-screen bg-zinc-950 text-zinc-100">
    {/* Skip Link */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-lime-500 focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      Skip to main content
    </a>

    {/* Header */}
    <header className="fixed top-0 left-0 right-0 z-30 ...">
      {/* ... */}
    </header>

    {/* Main Content */}
    <main id="main-content" aria-label="Main content" tabIndex={-1}>
      {children}
    </main>
  </div>
)
```

## Testing Criteria

- [ ] Load page and press Tab key - skip link should be the first focusable element
- [ ] When focused, skip link should become visible (lime green button in top-left)
- [ ] Press Enter on skip link - focus should move to main content area
- [ ] Screen reader should announce "Skip to main content" when link is focused
- [ ] After using skip link, next Tab should focus first interactive element in main content
- [ ] Verify skip link is not visible during normal browsing (only on focus)

## Related Specs

- spec-006: Add aria-label to navigation (complementary accessibility improvement)

## References

- [WCAG 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
- [WebAIM Skip Navigation Links](https://webaim.org/techniques/skipnav/)
- [Tailwind CSS Screen Reader Utilities](https://tailwindcss.com/docs/screen-readers)
