---
id: spec-004
title: Fix keyboard navigation for interactive elements
priority: 2
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/shell/FontSelector.tsx
  - /workspace/src/components/sections/about/CharacterSheetCard.tsx
  - /workspace/src/components/sections/about/ScorecardCard.tsx
  - /workspace/src/components/sections/about/TrailMapCard.tsx
  - /workspace/src/components/sections/blog/BlogPostCard.tsx
  - /workspace/src/components/sections/blog/RelatedPostCard.tsx
---

## Problem

Several interactive components are not keyboard accessible:

1. **FontSelector Dropdown** (A11Y-008): The dropdown can be opened but doesn't support arrow key navigation through options. Only Tab/Shift+Tab work.

2. **About Section Cards** (A11Y-009): CharacterSheetCard, ScorecardCard, and TrailMapCard use `<div>` with `onClick` but are not keyboard focusable or activatable.

3. **Blog Cards** (A11Y-010): BlogPostCard and RelatedPostCard use `<article>` with `onClick` which is not keyboard accessible.

This violates WCAG 2.1.1 (Keyboard - Level A).

## Solution

### Font Selector
Implement proper listbox keyboard navigation:
- Arrow Up/Down to navigate options
- Enter/Space to select
- Escape to close
- Home/End to jump to first/last option

### About Cards
Convert clickable divs to proper interactive elements:
- Change outer div to `<button>` element, or
- Add `role="button"`, `tabIndex={0}`, and keyboard event handlers

### Blog Cards
Make the card title/link the primary interactive element:
- Wrap card in an anchor tag, or
- Make the title a link that spans the card clickable area

## Files to Modify

### `/workspace/src/components/shell/FontSelector.tsx`

**Current** (line 38-145): Dropdown lacks arrow key navigation.

**Required Changes:**
- Track focused option index with state
- Add onKeyDown handler for arrow navigation
- Implement proper listbox ARIA pattern
- Add `aria-activedescendant` for screen readers

### `/workspace/src/components/sections/about/CharacterSheetCard.tsx`

**Current** (lines 52-57): Uses `<div onClick={...}>`.

**Required Changes:**
- Change to `<button>` element
- Add appropriate styling to maintain appearance
- Remove redundant onClick in favor of button semantics

### `/workspace/src/components/sections/about/ScorecardCard.tsx`

**Current** (lines 68-73): Uses `<div onClick={...}>`.

**Required Changes:** Same as CharacterSheetCard.

### `/workspace/src/components/sections/about/TrailMapCard.tsx`

**Current** (lines 104-109): Uses `<div onClick={...}>`.

**Required Changes:** Same as CharacterSheetCard.

### `/workspace/src/components/sections/blog/BlogPostCard.tsx`

**Current** (lines 10-13): Uses `<article onClick={...}>`.

**Required Changes:**
- Make the title a link that triggers navigation
- Use CSS to expand clickable area
- Add visual focus indicator

### `/workspace/src/components/sections/blog/RelatedPostCard.tsx`

**Current** (lines 9-12): Uses `<article onClick={...}>`.

**Required Changes:** Same as BlogPostCard.

## Code Examples

### FontSelector Keyboard Navigation

```tsx
import { useState, useRef, useCallback } from 'react';

export function FontSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, fontOptions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(fontOptions.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectFont(fontOptions[focusedIndex]);
        setIsOpen(false);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  }, [isOpen, focusedIndex]);

  return (
    <div onKeyDown={handleKeyDown}>
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select font"
      >
        {currentFont.name}
      </button>
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-activedescendant={`font-option-${focusedIndex}`}
        >
          {fontOptions.map((font, index) => (
            <li
              key={font.id}
              id={`font-option-${index}`}
              role="option"
              aria-selected={index === focusedIndex}
              className={index === focusedIndex ? 'bg-zinc-800' : ''}
              onClick={() => selectFont(font)}
            >
              {font.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### About Card Button Conversion

**Before:**
```tsx
<div
  onClick={() => setIsExpanded(!isExpanded)}
  className="cursor-pointer ..."
>
  {/* Card content */}
</div>
```

**After:**
```tsx
<button
  onClick={() => setIsExpanded(!isExpanded)}
  className="w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded-lg ..."
  aria-expanded={isExpanded}
  aria-label={`${cardTitle} - ${isExpanded ? 'collapse' : 'expand'}`}
>
  {/* Card content */}
</button>
```

### Blog Card Link Pattern

**Before:**
```tsx
<article onClick={() => onSelect(post)} className="cursor-pointer ...">
  <h3>{post.title}</h3>
  <p>{post.excerpt}</p>
</article>
```

**After:**
```tsx
<article className="relative group ...">
  <h3>
    <a
      href={`/blog/${post.slug}`}
      onClick={(e) => {
        e.preventDefault();
        onSelect(post);
      }}
      className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
    >
      {post.title}
    </a>
  </h3>
  <p>{post.excerpt}</p>
</article>
```

The `after:absolute after:inset-0` creates a pseudo-element that covers the entire card, making the whole card clickable while keeping the link as the focusable element.

## Testing Criteria

- [ ] FontSelector: Can navigate options with Arrow Up/Down keys
- [ ] FontSelector: Enter/Space selects the focused option
- [ ] FontSelector: Escape closes the dropdown
- [ ] FontSelector: Home/End jumps to first/last option
- [ ] FontSelector: Tab moves to next element outside dropdown
- [ ] About cards: Can focus with Tab key
- [ ] About cards: Can activate with Enter or Space
- [ ] About cards: Have visible focus indicator
- [ ] About cards: Screen reader announces as expandable button
- [ ] Blog cards: Can focus with Tab key
- [ ] Blog cards: Can activate with Enter
- [ ] Blog cards: Have visible focus indicator
- [ ] All interactive elements work without mouse

## Related Specs

- spec-001 (Focus trapping - related patterns)

## References

- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [MDN: ARIA Listbox Pattern](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role)
- [Inclusive Components: Cards](https://inclusive-components.design/cards/)
- [APG: Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
