---
id: spec-001
title: Implement focus trapping for modals and slide-out panels
priority: 1
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/shell/MobileMenu.tsx
  - /workspace/src/components/sections/projects/ProjectModal.tsx
  - /workspace/src/components/sections/contact/ContactModal.tsx
---

## Problem

The site has three modal/panel components that lack proper focus trapping:

1. **MobileMenu** (A11Y-005): When the mobile menu slide-out panel is open, keyboard focus can escape to elements behind the backdrop. There is no mechanism to cycle focus within the menu.

2. **ProjectModal** (A11Y-006): When viewing project details, users can tab out of the modal to content behind it, breaking the expected modal interaction pattern.

3. **ContactModal** (A11Y-007): While this modal has `role="dialog"` and `aria-modal="true"`, it does not trap focus or return focus to the triggering button when closed.

This violates WCAG 2.1.2 (No Keyboard Trap - Level A) and 2.4.3 (Focus Order - Level A).

## Solution

Install and implement `focus-trap-react` library to manage focus within all modal components. Additionally, implement focus restoration to return focus to the triggering element when modals close.

### Implementation Steps

1. Install the focus-trap-react package:
   ```bash
   npm install focus-trap-react
   ```

2. Update MobileMenu.tsx:
   - Wrap the menu content with `<FocusTrap>` component
   - Store reference to the hamburger button
   - Return focus to hamburger button on close

3. Update ProjectModal.tsx:
   - Wrap modal content with `<FocusTrap>`
   - Accept a `triggerRef` prop for focus restoration
   - Focus first focusable element on open

4. Update ContactModal.tsx:
   - Wrap modal content with `<FocusTrap>`
   - Store reference to the "Get in Touch" button
   - Return focus on close

## Files to Modify

### `/workspace/src/components/shell/MobileMenu.tsx`

**Current** (lines 33-118): Menu renders without focus management.

**Required Changes:**
- Import FocusTrap from 'focus-trap-react'
- Wrap the slide-out panel content with FocusTrap when `isOpen` is true
- Add `returnFocusOnDeactivate: false` and manually handle focus restoration

### `/workspace/src/components/sections/projects/ProjectModal.tsx`

**Current** (lines 18-228): Modal lacks focus trapping.

**Required Changes:**
- Import FocusTrap from 'focus-trap-react'
- Wrap AnimatePresence content with FocusTrap when modal is visible
- Accept optional `triggerRef` prop for focus restoration
- Focus the close button initially

### `/workspace/src/components/sections/contact/ContactModal.tsx`

**Current** (lines 106-413): Modal has ARIA attributes but no focus trap.

**Required Changes:**
- Import FocusTrap from 'focus-trap-react'
- Wrap dialog content with FocusTrap
- Store and restore focus to triggering element

## Code Examples

### MobileMenu.tsx Focus Trap Implementation

```tsx
import FocusTrap from 'focus-trap-react';

// Inside component:
const menuButtonRef = useRef<HTMLButtonElement>(null);

// Wrap the menu panel:
{isOpen && (
  <FocusTrap
    focusTrapOptions={{
      allowOutsideClick: true,
      returnFocusOnDeactivate: true,
      initialFocus: false,
    }}
  >
    <motion.div
      // ... existing panel props
    >
      {/* Menu content */}
    </motion.div>
  </FocusTrap>
)}
```

### ProjectModal.tsx Focus Trap Implementation

```tsx
import FocusTrap from 'focus-trap-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

// Inside the component:
<AnimatePresence>
  {project && (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: false,
        returnFocusOnDeactivate: true,
        escapeDeactivates: true,
        onDeactivate: onClose,
      }}
    >
      <motion.div>
        {/* Modal content */}
      </motion.div>
    </FocusTrap>
  )}
</AnimatePresence>
```

### ContactModal.tsx Focus Trap Implementation

```tsx
import FocusTrap from 'focus-trap-react';

// Inside the component, wrap the dialog div:
<FocusTrap
  active={isOpen}
  focusTrapOptions={{
    allowOutsideClick: true,
    returnFocusOnDeactivate: true,
    initialFocus: '#contact-name-input',
  }}
>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-modal-title"
    // ... rest of props
  >
    {/* Modal content */}
  </div>
</FocusTrap>
```

## Testing Criteria

- [ ] MobileMenu: Tab key cycles through menu items without escaping to page content
- [ ] MobileMenu: Shift+Tab cycles backwards through menu items
- [ ] MobileMenu: Focus returns to hamburger button when menu closes
- [ ] ProjectModal: Tab key stays within modal bounds
- [ ] ProjectModal: Focus moves to close button when modal opens
- [ ] ProjectModal: Focus returns to project card when modal closes
- [ ] ContactModal: Tab key stays within form fields and buttons
- [ ] ContactModal: Focus returns to "Get in Touch" button when closed
- [ ] All modals: Escape key closes modal and returns focus correctly
- [ ] Screen reader announces modal opening/closing appropriately

## Related Specs

- spec-002 (Font selector keyboard navigation - may share patterns)

## References

- [WCAG 2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html)
- [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [focus-trap-react Documentation](https://github.com/focus-trap/focus-trap-react)
- [MDN: ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
