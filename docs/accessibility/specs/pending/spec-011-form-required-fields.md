---
id: spec-011
title: Make required field indicators accessible
priority: 3
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/sections/contact/ContactModal.tsx
wcag_criteria:
  - "3.3.2 Labels or Instructions (A)"
estimated_complexity: low
---

## Problem

Required fields in the contact form use a visual asterisk but do not have `aria-required="true"` and the asterisk is not announced to screen reader users. Users relying on assistive technology may not know which fields are required.

**WCAG Criterion:** 3.3.2 Labels or Instructions (Level A)

## Current State

File: `/workspace/src/components/sections/contact/ContactModal.tsx`

Lines 178-195 (form fields):
```tsx
<label htmlFor="name" className="...">
  Name <span className="text-red-500">*</span>
</label>
<input
  type="text"
  id="name"
  required
  // No aria-required="true"
/>
```

The HTML `required` attribute is present but screen readers may not announce this clearly.

## Desired State

1. All required inputs have `aria-required="true"`
2. Visual asterisks have screen reader text "(required)"
3. Form instructions mention required field indicator

## Implementation Steps

### Step 1: Update form field labels and inputs

```tsx
{/* Name field */}
<div>
  <label htmlFor="contact-name" className="...">
    Name
    <span aria-hidden="true" className="text-red-500 ml-1">*</span>
    <span className="sr-only">(required)</span>
  </label>
  <input
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
    Email
    <span aria-hidden="true" className="text-red-500 ml-1">*</span>
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

{/* Topic field */}
<div>
  <label htmlFor="contact-topic" className="...">
    Topic
    <span aria-hidden="true" className="text-red-500 ml-1">*</span>
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

{/* Message field */}
<div>
  <label htmlFor="contact-message" className="...">
    Message
    <span aria-hidden="true" className="text-red-500 ml-1">*</span>
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
```

### Step 2: Add form instructions

Add at the top of the form:
```tsx
<p className="text-sm text-zinc-400 mb-4">
  <span aria-hidden="true" className="text-red-500">*</span>
  <span className="sr-only">Asterisk</span> indicates required field
</p>
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/sections/contact/ContactModal.tsx` | Add aria-required, sr-only text for asterisks |

## Code Examples

### Before
```tsx
<label htmlFor="name">
  Name <span className="text-red-500">*</span>
</label>
<input type="text" id="name" required />
```

### After
```tsx
<label htmlFor="contact-name">
  Name
  <span aria-hidden="true" className="text-red-500 ml-1">*</span>
  <span className="sr-only">(required)</span>
</label>
<input
  type="text"
  id="contact-name"
  required
  aria-required="true"
/>
```

## Testing Criteria

- [ ] Screen reader announces "Name, required" for each required field
- [ ] Visual asterisks are hidden from screen readers (aria-hidden)
- [ ] Screen reader text "(required)" is announced
- [ ] Form instructions explain required field indicator

## Related Specs

- spec-006: Contact modal focus management (same component)
- spec-012: Form error handling (related)

## References

- [WCAG 3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [MDN aria-required](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required)
