---
id: spec-006
title: Fix contact modal focus management
priority: 2
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/contact/ContactModal.tsx
  - /workspace/src/components/sections/contact/ContactSection.tsx
wcag_criteria:
  - "2.4.3 Focus Order (A)"
  - "2.1.2 No Keyboard Trap (A)"
estimated_complexity: medium
---

## Problem

While the contact modal has `role="dialog"` and `aria-modal="true"`, it does not trap focus within itself or return focus to the triggering button when closed. This creates an incomplete accessibility experience for keyboard users.

**WCAG Criteria:**
- 2.4.3 Focus Order (Level A)
- 2.1.2 No Keyboard Trap (Level A)

**Current issues:**
1. Focus is not trapped within the modal
2. Focus does not move to the modal when it opens
3. Focus does not return to the "Get in Touch" button when modal closes

## Current State

File: `/workspace/src/components/sections/contact/ContactModal.tsx`

The modal has basic ARIA attributes but lacks focus management:

```tsx
// Has role="dialog" and aria-modal="true"
// Has aria-labelledby pointing to title
// But no focus trap implementation
// No ref to track triggering element
// No useEffect to manage focus on open/close
```

File: `/workspace/src/components/sections/contact/ContactSection.tsx`

The trigger button has no ref for focus return:

```tsx
<button
  type="button"
  onClick={onContactClick}
  className="..."
>
  Get in Touch
</button>
```

## Desired State

1. When modal opens, focus moves to the first form field (Name input)
2. Focus is trapped within the modal while open
3. Tab cycles through: form fields, submit button, close button
4. Escape key closes the modal
5. When modal closes, focus returns to the "Get in Touch" button

## Implementation Steps

### Step 1: Update ContactModal with focus trap

```tsx
import { useRef, useEffect, useCallback } from 'react'
import FocusTrap from 'focus-trap-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  topicOptions: TopicOption[]
  hubspotPortalId: string
  hubspotFormId: string
  triggerRef?: React.RefObject<HTMLButtonElement>
}

export function ContactModal({
  isOpen,
  onClose,
  topicOptions,
  hubspotPortalId,
  hubspotFormId,
  triggerRef,
}: ContactModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Handle Escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  // Return focus to trigger on close
  useEffect(() => {
    if (!isOpen && triggerRef?.current) {
      triggerRef.current.focus()
    }
  }, [isOpen, triggerRef])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm" aria-hidden="true" />

      {/* Focus Trap */}
      <FocusTrap
        focusTrapOptions={{
          initialFocus: () => firstInputRef.current,
          escapeDeactivates: true,
          onDeactivate: onClose,
          returnFocusOnDeactivate: false, // We handle this manually
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="relative w-full max-w-md ..."
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="...">
            <h2 id="contact-modal-title" className="...">
              Get in Touch
            </h2>
            <button
              onClick={onClose}
              className="..."
              aria-label="Close contact form"
            >
              {/* Close icon */}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="...">
            {/* Name field - first focusable */}
            <div>
              <label htmlFor="contact-name" className="...">
                Name <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                id="contact-name"
                name="name"
                required
                aria-required="true"
                className="..."
              />
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="contact-email" className="...">
                Email <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                aria-required="true"
                className="..."
              />
            </div>

            {/* Topic select */}
            <div>
              <label htmlFor="contact-topic" className="...">
                Topic <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <select
                id="contact-topic"
                name="topic"
                required
                aria-required="true"
                className="..."
              >
                {/* options */}
              </select>
            </div>

            {/* Message textarea */}
            <div>
              <label htmlFor="contact-message" className="...">
                Message <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                aria-required="true"
                className="..."
              />
            </div>

            {/* Error message region */}
            <div
              role="alert"
              aria-live="polite"
              className={`... ${error ? 'block' : 'hidden'}`}
            >
              {error}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="..."
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </FocusTrap>
    </div>
  )
}
```

### Step 2: Update ContactSection to pass trigger ref

```tsx
import { useRef } from 'react'

export function ContactSection({ onContactClick }: ContactSectionProps) {
  const triggerButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <section id="contact" className="...">
      {/* ... */}
      <button
        ref={triggerButtonRef}
        type="button"
        onClick={() => onContactClick?.(triggerButtonRef)}
        className="..."
      >
        Get in Touch
      </button>
      {/* ... */}
    </section>
  )
}
```

### Step 3: Update parent component to pass ref through

In the component that manages the modal state (likely PortfolioApp.tsx), update to pass the trigger ref:

```tsx
const [contactTriggerRef, setContactTriggerRef] = useState<React.RefObject<HTMLButtonElement> | null>(null)

const handleContactClick = (triggerRef: React.RefObject<HTMLButtonElement>) => {
  setContactTriggerRef(triggerRef)
  setIsContactModalOpen(true)
}

// When rendering ContactModal:
<ContactModal
  isOpen={isContactModalOpen}
  onClose={() => setIsContactModalOpen(false)}
  triggerRef={contactTriggerRef}
  // ... other props
/>
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/sections/contact/ContactModal.tsx` | Add focus trap, refs, aria-required, error region |
| `/workspace/src/components/sections/contact/ContactSection.tsx` | Add ref to trigger button |
| `/workspace/src/components/PortfolioApp.tsx` | Pass trigger ref to modal |

## Testing Criteria

- [ ] Click "Get in Touch" button - modal opens and focus moves to Name input
- [ ] Tab through form - focus stays within modal
- [ ] Shift+Tab cycles in reverse within modal
- [ ] Press Escape - modal closes, focus returns to "Get in Touch" button
- [ ] Click outside modal - modal closes, focus returns to trigger button
- [ ] Submit form with errors - error message is announced to screen readers
- [ ] Screen reader announces modal as dialog with title "Get in Touch"
- [ ] Required fields are announced as required

## Related Specs

- spec-002: Mobile menu focus trap (similar pattern)
- spec-003: Project modal focus trap (similar pattern)
- spec-010: Form error handling accessibility (related)

## References

- [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [WAI-ARIA Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [focus-trap-react Documentation](https://github.com/focus-trap/focus-trap-react)
