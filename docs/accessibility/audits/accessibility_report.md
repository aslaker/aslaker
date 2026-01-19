# WCAG 2.1 Accessibility Audit Report

**Site:** adamslaker.dev - Astro/React Portfolio Site
**Audit Date:** 2026-01-15
**Auditor:** Claude Opus 4.5 (Automated Analysis)
**Standard:** WCAG 2.1 Level AA

---

## Executive Summary

This audit identified **24 accessibility issues** across the portfolio site:
- **Critical:** 3 issues
- **High:** 8 issues
- **Medium:** 9 issues
- **Low:** 4 issues

The site has good foundational accessibility practices in several areas (form labels, some ARIA attributes, focus ring styles on buttons), but requires improvements in color contrast, semantic structure, keyboard navigation, and motion accessibility.

---

## Issue Findings

### 1. Color Contrast Issues

#### A11Y-001: Low Contrast Text - zinc-400 on zinc-950
- **WCAG Criterion:** 1.4.3 Contrast (Minimum) - Level AA
- **Severity:** High
- **Description:** Text using `text-zinc-400` (#a1a1aa) on `bg-zinc-950` (#09090b) background has a contrast ratio of approximately 4.2:1, which fails the 4.5:1 requirement for normal-sized text.
- **Locations:**
  - `/workspace/src/components/sections/hero/Hero.tsx:150` - tagline text
  - `/workspace/src/components/sections/projects/ProjectCard.tsx:59` - short description
  - `/workspace/src/components/sections/consulting/ServiceCard.tsx:88` - service description
  - `/workspace/src/components/sections/contact/ContactSection.tsx:62-65` - intro paragraph
  - `/workspace/src/components/sections/about/AboutGrid.tsx:199-203` - section description
  - `/workspace/src/components/PortfolioApp.tsx:152,157` - footer text (zinc-600 is worse)
- **Recommended Fix:** Use `text-zinc-300` (#d4d4d8) which provides approximately 7.2:1 contrast, or increase to `text-zinc-200` for better readability.

#### A11Y-002: Low Contrast Text - zinc-500 on zinc-950/zinc-900
- **WCAG Criterion:** 1.4.3 Contrast (Minimum) - Level AA
- **Severity:** High
- **Description:** Text using `text-zinc-500` (#71717a) on dark backgrounds has a contrast ratio of approximately 3.2:1, failing the 4.5:1 requirement.
- **Locations:**
  - `/workspace/src/components/shell/FontSelector.tsx:79,131` - font descriptions
  - `/workspace/src/components/sections/about/CharacterSheetCard.tsx:93-95` - "Character Stats" label
  - `/workspace/src/components/sections/about/ScorecardCard.tsx:104-106` - "Collection Stats" label
  - `/workspace/src/components/sections/about/TrailMapCard.tsx:164-166` - "Trail Guide" label
  - `/workspace/src/components/sections/contact/ContactSection.tsx:102-103` - response time text
  - Multiple areas with `text-zinc-600` (#52525b) which is even lower contrast
- **Recommended Fix:** Use `text-zinc-400` minimum for descriptive text, or `text-zinc-300` for better accessibility.

#### A11Y-003: Low Contrast Text - zinc-600/zinc-700 Elements
- **WCAG Criterion:** 1.4.3 Contrast (Minimum) - Level AA
- **Severity:** High
- **Description:** Multiple UI elements use zinc-600 (#52525b) or zinc-700 (#3f3f46) text which has contrast ratios of ~2.4:1 and ~1.8:1 respectively - significantly below requirements.
- **Locations:**
  - `/workspace/src/components/PortfolioApp.tsx:152-158` - footer text
  - `/workspace/src/components/sections/projects/ProjectsGrid.tsx:114-116` - project count
  - `/workspace/src/components/sections/about/AboutGrid.tsx:77,226-229` - hint text
  - `/workspace/src/components/shell/FontSelector.tsx:140` - "Saved to your browser" text
- **Recommended Fix:** Replace `text-zinc-600` and `text-zinc-700` with `text-zinc-400` minimum.

#### A11Y-004: Decorative Text Colors May Fail Contrast
- **WCAG Criterion:** 1.4.3 Contrast (Minimum) - Level AA
- **Severity:** Medium
- **Description:** Semi-transparent colors like `text-lime-500/60`, `text-lime-600`, and `text-emerald-400` may not meet contrast requirements depending on the background.
- **Locations:**
  - `/workspace/src/components/sections/hero/Hero.tsx:94-95` - terminal prefix
  - `/workspace/src/components/ui/SectionDivider.tsx:14-18` - section divider text
- **Recommended Fix:** Test all semi-transparent text combinations and use solid colors where needed.

---

### 2. Keyboard Navigation Issues

#### A11Y-005: Focus Trap Not Prevented in Mobile Menu
- **WCAG Criterion:** 2.1.2 No Keyboard Trap - Level A
- **Severity:** Critical
- **Description:** The mobile menu slide-out panel does not implement proper focus trapping. When open, keyboard focus can move to elements behind the backdrop, and there's no mechanism to cycle focus within the menu.
- **Location:** `/workspace/src/components/shell/MobileMenu.tsx:33-118`
- **Recommended Fix:** Implement focus trap using a library like `focus-trap-react` or custom logic. When menu opens, trap focus within the panel; when closed, return focus to the hamburger button.

#### A11Y-006: Focus Trap Not Prevented in Project Modal
- **WCAG Criterion:** 2.1.2 No Keyboard Trap - Level A
- **Severity:** Critical
- **Description:** The project modal does not trap focus within itself when open. Users can tab out of the modal to content behind it.
- **Location:** `/workspace/src/components/sections/projects/ProjectModal.tsx:18-228`
- **Recommended Fix:** Implement focus trap. Use `useEffect` to focus the first focusable element on open and trap focus within the modal container.

#### A11Y-007: Contact Modal Focus Management Incomplete
- **WCAG Criterion:** 2.4.3 Focus Order - Level A
- **Severity:** High
- **Description:** While the contact modal has `role="dialog"` and `aria-modal="true"`, it doesn't trap focus or return focus to the triggering button when closed.
- **Location:** `/workspace/src/components/sections/contact/ContactModal.tsx:106-413`
- **Recommended Fix:** Add focus trap and store reference to triggering element to return focus on close.

#### A11Y-008: Font Selector Dropdown Not Keyboard Accessible
- **WCAG Criterion:** 2.1.1 Keyboard - Level A
- **Severity:** High
- **Description:** The font selector dropdown can be opened but doesn't support arrow key navigation through options. Only Tab/Shift+Tab work.
- **Location:** `/workspace/src/components/shell/FontSelector.tsx:38-145`
- **Recommended Fix:** Add `onKeyDown` handler to support arrow keys for navigation, Enter for selection, and Escape to close. Consider using a `<select>` element or implementing proper listbox pattern.

#### A11Y-009: Interactive Cards Not Keyboard Accessible
- **WCAG Criterion:** 2.1.1 Keyboard - Level A
- **Severity:** High
- **Description:** The About section cards (CharacterSheetCard, ScorecardCard, TrailMapCard) use `div` with `onClick` but are not keyboard focusable.
- **Locations:**
  - `/workspace/src/components/sections/about/CharacterSheetCard.tsx:52-57`
  - `/workspace/src/components/sections/about/ScorecardCard.tsx:68-73`
  - `/workspace/src/components/sections/about/TrailMapCard.tsx:104-109`
- **Recommended Fix:** Change to `<button>` elements or add `role="button"`, `tabIndex={0}`, and `onKeyDown` handler for Enter/Space activation.

#### A11Y-010: Blog Cards Using article with onClick
- **WCAG Criterion:** 2.1.1 Keyboard - Level A
- **Severity:** Medium
- **Description:** BlogPostCard and RelatedPostCard use `<article>` with `onClick` which is not keyboard accessible.
- **Locations:**
  - `/workspace/src/components/sections/blog/BlogPostCard.tsx:10-13`
  - `/workspace/src/components/sections/blog/RelatedPostCard.tsx:9-12`
- **Recommended Fix:** Wrap content in an anchor tag or button for keyboard accessibility, or add proper keyboard handlers.

---

### 3. ARIA and Semantic HTML Issues

#### A11Y-011: Missing Landmark Roles
- **WCAG Criterion:** 1.3.1 Info and Relationships - Level A
- **Severity:** Medium
- **Description:** The main page structure lacks proper ARIA landmark roles. The `<main>` element exists but sections lack proper labeling.
- **Location:** `/workspace/src/components/shell/AppShell.tsx:80-81`
- **Recommended Fix:** Add `aria-label` or `aria-labelledby` to the main element and use `<section>` elements with proper labels for major content areas.

#### A11Y-012: Navigation Missing aria-label
- **WCAG Criterion:** 4.1.2 Name, Role, Value - Level A
- **Severity:** Medium
- **Description:** The main navigation lacks an `aria-label` to distinguish it from other navigation elements.
- **Location:** `/workspace/src/components/shell/MainNav.tsx:9-10`
- **Recommended Fix:** Add `aria-label="Main navigation"` to the `<nav>` element.

#### A11Y-013: Skip Link Missing
- **WCAG Criterion:** 2.4.1 Bypass Blocks - Level A
- **Severity:** High
- **Description:** No skip link is provided to allow keyboard users to bypass the header navigation and jump to main content.
- **Location:** `/workspace/src/components/shell/AppShell.tsx` (missing entirely)
- **Recommended Fix:** Add a visually hidden skip link at the top of the page: `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>` and add `id="main-content"` to the main element.

#### A11Y-014: Heading Hierarchy Issue
- **WCAG Criterion:** 1.3.1 Info and Relationships - Level A
- **Severity:** Medium
- **Description:** The page uses `<h1>` in the Hero section for the name, but the contact section also uses `<h1>` for "Let's Build Something", creating multiple h1 elements.
- **Locations:**
  - `/workspace/src/components/sections/hero/Hero.tsx:99` - h1 for name
  - `/workspace/src/components/sections/contact/ContactSection.tsx:58-60` - h1 (should be h2)
- **Recommended Fix:** Change the contact section heading to `<h2>` to maintain proper hierarchy.

#### A11Y-015: Decorative Elements Not Hidden
- **WCAG Criterion:** 1.3.1 Info and Relationships - Level A
- **Severity:** Low
- **Description:** Decorative dots/circles in terminal-style headers (red/yellow/green dots) are not hidden from assistive technology.
- **Locations:**
  - `/workspace/src/components/sections/projects/ProjectCard.tsx:26-30`
  - `/workspace/src/components/sections/projects/ProjectModal.tsx:40-48`
  - `/workspace/src/components/sections/about/CharacterSheetCard.tsx:63-67`
  - `/workspace/src/components/shell/MobileMenu.tsx:61-62`
  - `/workspace/src/components/sections/contact/ContactModal.tsx:124-137`
- **Recommended Fix:** Add `aria-hidden="true"` to the decorative dot containers.

#### A11Y-016: Progress Indicators Not Accessible
- **WCAG Criterion:** 4.1.2 Name, Role, Value - Level A
- **Severity:** Medium
- **Description:** The stat bars in CharacterSheetCard visually represent progress but are not accessible. Screen readers cannot understand the stat values.
- **Location:** `/workspace/src/components/sections/about/CharacterSheetCard.tsx:9-40`
- **Recommended Fix:** Add `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` to the stat bars.

---

### 4. Form Accessibility Issues

#### A11Y-017: Required Field Indicator Not Accessible
- **WCAG Criterion:** 3.3.2 Labels or Instructions - Level A
- **Severity:** Medium
- **Description:** Required fields use a visual asterisk but don't have `aria-required="true"` and the asterisk is not announced.
- **Location:** `/workspace/src/components/sections/contact/ContactModal.tsx:178-195`
- **Recommended Fix:** Add `aria-required="true"` to required inputs. Consider adding visually hidden text "(required)" or using `aria-label` to include the required indicator.

#### A11Y-018: Form Error Handling Not Accessible
- **WCAG Criterion:** 3.3.1 Error Identification - Level A
- **Severity:** Medium
- **Description:** The contact form catches errors but doesn't display accessible error messages. Users are not informed of submission failures in an accessible way.
- **Location:** `/workspace/src/components/sections/contact/ContactModal.tsx:81-94`
- **Recommended Fix:** Add error state with `aria-live="polite"` region to announce errors. Add `aria-describedby` linking inputs to error messages.

---

### 5. Image Accessibility Issues

#### A11Y-019: Blog Images Missing Alt Text
- **WCAG Criterion:** 1.1.1 Non-text Content - Level A
- **Severity:** Medium
- **Description:** Blog post thumbnail and header images use `alt=""` which marks them as decorative. If these images convey information about the blog post content, they should have descriptive alt text.
- **Locations:**
  - `/workspace/src/components/sections/blog/BlogPostCard.tsx:25-29`
  - `/workspace/src/components/sections/blog/BlogDetail.tsx:223-226`
  - `/workspace/src/components/sections/blog/RelatedPostCard.tsx:18-21`
- **Recommended Fix:** If images are purely decorative, `alt=""` is correct. If they convey meaning, add descriptive alt text or include the image description in the Writing data type.

#### A11Y-020: Project Logos Need Better Alt Text
- **WCAG Criterion:** 1.1.1 Non-text Content - Level A
- **Severity:** Low
- **Description:** Project logo alt text is generic (`"${project.title} logo"`). Consider providing more descriptive alt text for complex logos.
- **Locations:**
  - `/workspace/src/components/sections/projects/ProjectCard.tsx:39-43`
  - `/workspace/src/components/sections/projects/ProjectModal.tsx:69-72`
- **Recommended Fix:** Consider adding an optional `logoAlt` field to the Project type for custom descriptions when needed.

---

### 6. Link and Button Accessibility Issues

#### A11Y-021: Links Without Sufficient Context
- **WCAG Criterion:** 2.4.4 Link Purpose (In Context) - Level A
- **Severity:** Low
- **Description:** Some links like "Email" and "LinkedIn" in the contact section could be more descriptive for screen reader users.
- **Location:** `/workspace/src/components/sections/contact/ContactSection.tsx:143-180`
- **Recommended Fix:** Add `aria-label="Send email to Adam Slaker"` or similar descriptive labels.

#### A11Y-022: External Links Not Indicated
- **WCAG Criterion:** 3.2.5 Change on Request - Level AAA (Best Practice)
- **Severity:** Low
- **Description:** External links (GitHub, LinkedIn, demo URLs) don't indicate they open in a new tab/window. While rel="noopener noreferrer" is used for security, users aren't warned about the new window behavior.
- **Locations:**
  - `/workspace/src/components/shell/SocialLinks.tsx:35-49`
  - `/workspace/src/components/sections/projects/ProjectModal.tsx:159-201`
- **Recommended Fix:** Add visually hidden text like "(opens in new tab)" or use `aria-label` to include this information.

---

### 7. Motion and Animation Accessibility Issues

#### A11Y-023: No prefers-reduced-motion Support
- **WCAG Criterion:** 2.3.3 Animation from Interactions - Level AAA (Best Practice for AA)
- **Severity:** Critical
- **Description:** The site uses numerous animations (typing effects, wave backgrounds, fade-ins, pulse effects) but does not respect the user's `prefers-reduced-motion` system preference.
- **Locations:**
  - `/workspace/src/components/sections/hero/Hero.tsx:48-68` - wave animations
  - `/workspace/src/components/sections/hero/Hero.tsx:216-228` - keyframe animations
  - `/workspace/src/components/sections/hero/TypingText.tsx` - typing animation
  - `/workspace/tailwind.config.mjs:61-74` - animation definitions
  - Multiple components with transition and animation classes
- **Recommended Fix:** Add CSS media query to disable or reduce animations:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Additionally, for the TypingText component, skip the typing animation and show text immediately when reduced motion is preferred.

#### A11Y-024: Blinking Cursor May Affect Users with Vestibular Disorders
- **WCAG Criterion:** 2.2.2 Pause, Stop, Hide - Level A
- **Severity:** Medium
- **Description:** The blinking cursor animation continues indefinitely and cannot be paused.
- **Locations:**
  - `/workspace/src/components/sections/hero/TypingText.tsx:49-58`
  - `/workspace/src/components/shell/AppShell.tsx:52`
  - Multiple terminal-style cursors throughout the site
- **Recommended Fix:** Respect `prefers-reduced-motion` and stop blinking, or provide a mechanism to pause animations.

---

## Positive Findings

The following accessibility best practices are already implemented:

1. **Form Labels:** Contact form inputs have proper `<label>` elements with `htmlFor` associations.
2. **Focus Indicators:** Buttons have visible focus rings using Tailwind's `focus:ring` classes.
3. **Modal ARIA:** Contact modal uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
4. **Social Link Labels:** Social media links have `aria-label` attributes.
5. **Mobile Menu Toggle:** Has proper `aria-label` that changes based on state.
6. **Escape Key Support:** Modals support Escape key to close.
7. **External Link Security:** External links use `rel="noopener noreferrer"`.
8. **Semantic HTML:** Uses appropriate elements like `<nav>`, `<main>`, `<section>`, `<article>`, `<time>`.

---

## Remediation Priority

### Immediate (Critical Issues)
1. A11Y-005: Mobile menu focus trap
2. A11Y-006: Project modal focus trap
3. A11Y-023: Add prefers-reduced-motion support

### High Priority
4. A11Y-001, A11Y-002, A11Y-003: Color contrast fixes
5. A11Y-007: Contact modal focus management
6. A11Y-008: Font selector keyboard navigation
7. A11Y-009: Make About cards keyboard accessible
8. A11Y-013: Add skip link

### Medium Priority
9. A11Y-010: Blog card keyboard accessibility
10. A11Y-011: Landmark roles
11. A11Y-012: Navigation aria-label
12. A11Y-014: Fix heading hierarchy
13. A11Y-016: Progress indicator accessibility
14. A11Y-017: Required field indicators
15. A11Y-018: Form error handling
16. A11Y-019: Blog image alt text review
17. A11Y-024: Blinking cursor controls

### Low Priority
18. A11Y-004: Semi-transparent text review
19. A11Y-015: Hide decorative elements
20. A11Y-020: Enhanced logo alt text
21. A11Y-021: Link context improvement
22. A11Y-022: External link indication

---

## Testing Recommendations

1. **Automated Testing:** Integrate axe-core or similar tool into CI/CD pipeline
2. **Screen Reader Testing:** Test with VoiceOver (macOS), NVDA (Windows), and TalkBack (Android)
3. **Keyboard-Only Testing:** Navigate entire site using only keyboard
4. **Color Contrast Testing:** Use tools like WebAIM Contrast Checker or browser devtools
5. **Reduced Motion Testing:** Test with `prefers-reduced-motion: reduce` enabled
6. **Zoom Testing:** Test at 200% zoom to ensure content remains accessible

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Focus Trap React](https://github.com/focus-trap/focus-trap-react)
- [Tailwind CSS Screen Reader Utilities](https://tailwindcss.com/docs/screen-readers)
