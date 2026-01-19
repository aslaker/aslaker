---
id: spec-007
title: Make font selector keyboard accessible
priority: 2
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/shell/FontSelector.tsx
wcag_criteria:
  - "2.1.1 Keyboard (A)"
estimated_complexity: medium
---

## Problem

The font selector dropdown can be opened but does not support arrow key navigation through options. Only Tab/Shift+Tab work, which requires tabbing through all options. This creates a poor experience for keyboard users.

**WCAG Criterion:** 2.1.1 Keyboard (Level A)

**Current issues:**
1. No arrow key (Up/Down) navigation through font options
2. No Home/End key support for jumping to first/last option
3. No type-ahead/search functionality
4. Does not follow the ARIA listbox pattern

## Current State

File: `/workspace/src/components/shell/FontSelector.tsx`

```tsx
export function FontSelector({ variant = 'full' }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { currentFont, setFont, fontOptions } = useFont()

  // ... component renders a dropdown but without proper keyboard handling
}
```

**Issues:**
- Line 38-145: No `onKeyDown` handler for arrow key navigation
- No `role="listbox"` on options container
- No `role="option"` on individual options
- No `aria-selected` state on options
- No `aria-activedescendant` for tracking focus

## Desired State

1. Arrow Down/Up keys navigate through font options
2. Enter/Space selects the focused option
3. Escape closes the dropdown
4. Home/End keys jump to first/last option
5. Type-ahead: typing letters jumps to matching font names
6. Follows ARIA listbox pattern with proper roles

## Implementation Steps

### Step 1: Implement keyboard navigation

```tsx
import { useState, useRef, useCallback, useEffect } from 'react'
import { useFont } from '../../context/FontContext'

interface FontSelectorProps {
  variant?: 'full' | 'compact'
}

export function FontSelector({ variant = 'full' }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const { currentFont, setFont, fontOptions } = useFont()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Find current font index for initial focus
  const currentFontIndex = fontOptions.findIndex(f => f.id === currentFont)

  // Reset focused index when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(currentFontIndex >= 0 ? currentFontIndex : 0)
    } else {
      setFocusedIndex(-1)
    }
  }, [isOpen, currentFontIndex])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isOpen) {
      // Open dropdown on arrow down or enter/space
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setIsOpen(true)
        return
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev =>
          prev < fontOptions.length - 1 ? prev + 1 : prev
        )
        break

      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev))
        break

      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        break

      case 'End':
        event.preventDefault()
        setFocusedIndex(fontOptions.length - 1)
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedIndex >= 0) {
          setFont(fontOptions[focusedIndex].id)
          setIsOpen(false)
          buttonRef.current?.focus()
        }
        break

      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        buttonRef.current?.focus()
        break

      case 'Tab':
        // Allow tab to close dropdown and move focus
        setIsOpen(false)
        break

      default:
        // Type-ahead: find font starting with typed letter
        if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
          const char = event.key.toLowerCase()
          const startIndex = focusedIndex + 1
          const searchOptions = [
            ...fontOptions.slice(startIndex),
            ...fontOptions.slice(0, startIndex),
          ]
          const match = searchOptions.findIndex(f =>
            f.name.toLowerCase().startsWith(char)
          )
          if (match >= 0) {
            const actualIndex = (startIndex + match) % fontOptions.length
            setFocusedIndex(actualIndex)
          }
        }
    }
  }, [isOpen, focusedIndex, fontOptions, setFont])

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const option = listRef.current.children[focusedIndex] as HTMLElement
      option?.scrollIntoView({ block: 'nearest' })
    }
  }, [isOpen, focusedIndex])

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const currentFontData = fontOptions.find(f => f.id === currentFont)
  const focusedOptionId = `font-option-${fontOptions[focusedIndex]?.id}`

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="font-selector-label"
        aria-activedescendant={isOpen && focusedIndex >= 0 ? focusedOptionId : undefined}
        className="flex items-center gap-2 rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 transition-colors hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
      >
        <span id="font-selector-label" className="sr-only">
          Select font
        </span>
        <span style={{ fontFamily: currentFontData?.fontFamily }}>
          {currentFontData?.name || 'Select Font'}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Available fonts"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="absolute right-0 top-full z-50 mt-1 max-h-60 w-56 overflow-auto rounded border border-zinc-700 bg-zinc-800 py-1 shadow-lg"
        >
          {fontOptions.map((font, index) => (
            <li
              key={font.id}
              id={`font-option-${font.id}`}
              role="option"
              aria-selected={font.id === currentFont}
              onClick={() => {
                setFont(font.id)
                setIsOpen(false)
                buttonRef.current?.focus()
              }}
              className={`cursor-pointer px-3 py-2 ${
                index === focusedIndex
                  ? 'bg-lime-500/20 text-lime-400'
                  : font.id === currentFont
                  ? 'bg-zinc-700/50 text-zinc-100'
                  : 'text-zinc-300 hover:bg-zinc-700/30'
              }`}
            >
              <span
                className="block text-sm"
                style={{ fontFamily: font.fontFamily }}
              >
                {font.name}
              </span>
              <span className="block text-xs text-zinc-400">
                {font.description}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Success feedback */}
      {/* ... existing feedback UI */}
    </div>
  )
}
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/shell/FontSelector.tsx` | Add keyboard navigation, ARIA roles, focused state management |

## Testing Criteria

- [ ] Tab to font selector button and press Enter - dropdown opens
- [ ] Press Arrow Down - focus moves to next option
- [ ] Press Arrow Up - focus moves to previous option
- [ ] Press Home - focus moves to first option
- [ ] Press End - focus moves to last option
- [ ] Press Enter on focused option - selects font, closes dropdown
- [ ] Press Escape - closes dropdown without selection
- [ ] Press Tab while open - closes dropdown, moves focus to next element
- [ ] Type a letter (e.g., "O") - jumps to "Outfit" font
- [ ] Screen reader announces:
  - [ ] Button as "Select font, listbox, collapsed" (or "expanded")
  - [ ] Options with names and selected state
- [ ] Visual focus indicator is visible on focused option

## Related Specs

- None (standalone component fix)

## References

- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WAI-ARIA Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [MDN ARIA: listbox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role)
