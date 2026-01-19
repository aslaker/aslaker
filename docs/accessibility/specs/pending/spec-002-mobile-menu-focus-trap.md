---
id: spec-002
title: Implement focus trap in mobile menu
priority: 1
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/shell/MobileMenu.tsx
  - /workspace/package.json
wcag_criteria:
  - "2.1.2 No Keyboard Trap (A)"
  - "2.4.3 Focus Order (A)"
estimated_complexity: medium
---

## Problem

The mobile menu slide-out panel does not implement proper focus trapping. When open, keyboard focus can move to elements behind the backdrop, and there is no mechanism to cycle focus within the menu. This creates a significant accessibility barrier for keyboard users.

**WCAG Criterion:** 2.1.2 No Keyboard Trap (Level A)

**Current issues:**
1. Focus can escape the menu to background content
2. No focus cycling within the menu panel
3. Focus is not moved to the menu when it opens
4. Focus is not returned to the trigger button when the menu closes

## Current State

File: `/workspace/src/components/shell/MobileMenu.tsx`

```tsx
export function MobileMenu({
  items,
  socialLinks = [],
  onNavigate,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ... handler code

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="..."
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {/* ... */}
      </button>

      {/* Backdrop - only closes on click, no keyboard handling */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel - no focus management */}
      <div className={`fixed right-0 top-0 bottom-0 z-50 ...`}>
        {/* Content without focus trap */}
      </div>
    </>
  );
}
```

**Issues identified:**
- Line 33-118: No focus trap implementation
- Line 36-42: Hamburger button opens menu but focus stays on button
- Line 44-50: Backdrop has no keyboard handling (only onClick)
- No `useEffect` to manage focus on open/close
- No refs to track focusable elements

## Desired State

1. When menu opens, focus moves to the first focusable element (close button)
2. Focus is trapped within the menu panel while open
3. Tab cycles through menu items, wrapping from last to first
4. Shift+Tab cycles in reverse
5. Escape key closes the menu
6. When menu closes, focus returns to the hamburger button
7. Background content is inert (not focusable) while menu is open

## Implementation Steps

### Step 1: Install focus-trap-react (recommended) or implement custom solution

**Option A: Using focus-trap-react (recommended)**
```bash
npm install focus-trap-react
```

**Option B: Custom implementation (no dependency)**
Implement manually using refs and keyboard event handlers.

### Step 2: Update MobileMenu component

```tsx
import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import FocusTrap from "focus-trap-react"; // If using Option A
import type { NavigationItem, SocialLink } from "../../types";
import { FontSelector } from "./FontSelector";
import { SocialLinks } from "./SocialLinks";

interface MobileMenuProps {
  items: NavigationItem[];
  socialLinks?: SocialLink[];
  onNavigate?: (href: string) => void;
}

export function MobileMenu({
  items,
  socialLinks = [],
  onNavigate,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Handle Escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Add/remove escape key listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus management on open/close
  useEffect(() => {
    if (isOpen) {
      // Focus the close button when menu opens
      closeButtonRef.current?.focus();
    } else {
      // Return focus to menu button when closed
      menuButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={menuButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Panel with Focus Trap */}
      {isOpen && (
        <FocusTrap
          focusTrapOptions={{
            initialFocus: () => closeButtonRef.current,
            returnFocusOnDeactivate: true,
            escapeDeactivates: true,
            onDeactivate: () => setIsOpen(false),
          }}
        >
          <div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed right-0 top-0 bottom-0 z-50 w-72 transform shadow-2xl"
            style={{ backgroundColor: "#18181b", minHeight: "100vh" }}
          >
            {/* Panel Header */}
            <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
              <span className="font-heading text-sm text-zinc-400">Navigation</span>
              <button
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav aria-label="Mobile navigation" className="flex flex-col p-4">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.href);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors font-heading
                    ${item.isActive
                      ? "bg-lime-400/10 text-lime-400"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                    }`}
                >
                  {item.isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400" aria-hidden="true" />
                  )}
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="border-t border-zinc-800 p-4">
                <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Connect
                </span>
                <SocialLinks links={socialLinks} size="lg" />
              </div>
            )}

            {/* Font Selector */}
            <div className="border-t border-zinc-800 p-4">
              <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                Customize
              </span>
              <FontSelector variant="full" />
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  );
}
```

### Step 3 (Alternative): Custom focus trap without library

If you prefer not to add a dependency, implement a custom focus trap:

```tsx
// Custom focus trap hook
function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, containerRef]);
}
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/shell/MobileMenu.tsx` | Add focus trap, refs, ARIA attributes |
| `/workspace/package.json` | Add `focus-trap-react` dependency (if using Option A) |

## Testing Criteria

- [ ] Open menu with keyboard (Tab to hamburger button, press Enter/Space)
- [ ] Verify focus moves to close button when menu opens
- [ ] Tab through all menu items - verify focus cycles within menu
- [ ] Shift+Tab cycles in reverse order
- [ ] Verify Tab cannot reach elements behind the backdrop
- [ ] Press Escape - verify menu closes
- [ ] After closing, verify focus returns to hamburger button
- [ ] Test with screen reader (VoiceOver/NVDA) - verify menu is announced as dialog
- [ ] Verify `aria-expanded` updates correctly on hamburger button

## Related Specs

- spec-003: Project modal focus trap (similar implementation pattern)
- spec-004: Contact modal focus management (similar implementation pattern)

## References

- [WCAG 2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html)
- [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [focus-trap-react Documentation](https://github.com/focus-trap/focus-trap-react)
- [WAI-ARIA Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
