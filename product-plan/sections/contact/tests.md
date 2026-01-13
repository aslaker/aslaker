# Test Instructions: Contact

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Contact section provides a multi-step modal for lead capture and call booking. Test form validation, submission, step transitions, and modal behavior.

---

## User Flow Tests

### Flow 1: Open Contact Modal

**Scenario:** User wants to get in touch

**Steps:**
1. User clicks "Get in Touch" button in contact section
2. Modal opens showing form step

**Expected Results:**
- [ ] Modal is visible with form fields
- [ ] Step indicator shows first dot active (lime color)
- [ ] Form fields are empty
- [ ] Focus moves to modal

### Flow 2: Submit Valid Form

**Scenario:** User fills and submits complete form

**Setup:**
- Mock `onFormSubmit` to resolve successfully

**Steps:**
1. User enters "Ada Lovelace" in name field
2. User enters "ada@example.com" in email field
3. User enters "Acme Corp" in company field (optional)
4. User selects "Strategic AI Consulting" topic
5. User enters "I need help with..." in message field
6. User clicks "Submit & Schedule Call" button

**Expected Results:**
- [ ] `onFormSubmit` is called with form data
- [ ] Loading state shows during submission
- [ ] After success, modal transitions to calendar step
- [ ] Step indicator shows second dot active

### Flow 3: Form Validation - Missing Required Fields

**Scenario:** User tries to submit without required fields

**Steps:**
1. User leaves name field empty
2. User clicks submit button

**Expected Results:**
- [ ] Form is NOT submitted
- [ ] Name field shows validation error
- [ ] Other required fields (email, message) also validate

### Flow 4: Form Validation - Invalid Email

**Scenario:** User enters invalid email

**Steps:**
1. User enters "Ada" in name
2. User enters "not-an-email" in email field
3. User enters message
4. User clicks submit

**Expected Results:**
- [ ] Form is NOT submitted
- [ ] Email field shows validation error

### Flow 5: Calendar Booking Complete

**Scenario:** User books a call after form submission

**Setup:**
- Form already submitted, on calendar step

**Steps:**
1. User sees calendar widget
2. User completes booking (simulated via button click)

**Expected Results:**
- [ ] `onBookingComplete` callback is called
- [ ] Modal transitions to success step
- [ ] Step indicator shows third dot active

### Flow 6: Success Confirmation

**Scenario:** User sees success after booking

**Steps:**
1. Complete form submission and booking

**Expected Results:**
- [ ] Success message is visible
- [ ] Shows checkmark icon
- [ ] Shows "Success!" heading
- [ ] Shows confirmation text
- [ ] Close button is visible

### Flow 7: Close Modal

**Scenario:** User closes modal at any step

**Steps:**
1. User opens modal
2. User clicks close button (red dot or X)

**Expected Results:**
- [ ] Modal closes
- [ ] `onClose` callback is called
- [ ] Form resets when reopened

### Flow 8: Close via Escape Key

**Steps:**
1. User opens modal
2. User presses Escape key

**Expected Results:**
- [ ] Modal closes
- [ ] `onClose` callback is called

### Flow 9: Handle Form Submission Error

**Scenario:** Backend returns error

**Setup:**
- Mock `onFormSubmit` to reject with error

**Steps:**
1. User fills valid form
2. User clicks submit
3. Submission fails

**Expected Results:**
- [ ] Error is logged/handled
- [ ] Form data is preserved
- [ ] User remains on form step
- [ ] User can retry submission

---

## Component Tests

### ContactModal

**Form Step:**
- [ ] Shows all form fields (name, email, company, topic, message)
- [ ] Name and email fields marked as required (asterisk)
- [ ] Topic dropdown has all options
- [ ] Submit button shows correct text

**Calendar Step:**
- [ ] Shows calendar provider name
- [ ] Shows embedded calendar placeholder
- [ ] Shows fallback link

**Success Step:**
- [ ] Shows checkmark icon
- [ ] Shows success message
- [ ] Shows confirmation details
- [ ] Close button works

---

## Edge Cases

- [ ] Very long name/company truncates appropriately
- [ ] Modal scrolls if content is tall on mobile
- [ ] Reopening modal resets to form step
- [ ] Default topic is pre-selected if provided via `defaultTopic`
- [ ] Form preserves data if user closes and reopens (optional)

---

## Accessibility Checks

- [ ] Modal has role="dialog" and aria-modal="true"
- [ ] Form fields have associated labels
- [ ] Required fields indicated via aria-required
- [ ] Error messages have aria-live for screen readers
- [ ] Focus is trapped within modal
- [ ] Focus returns to trigger element on close

---

## Sample Test Data

```typescript
const mockTopicOptions = [
  { id: "1", label: "Strategic AI Consulting", value: "strategic-ai-consulting" },
  { id: "2", label: "Website Development", value: "website-development" },
  { id: "3", label: "Fractional CTO", value: "fractional-cto" },
]

const mockCalendarConfig = {
  provider: "calendly",
  embedUrl: "https://calendly.com/example",
  fallbackUrl: "https://calendly.com/example",
}

const mockFormData = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Acme Corp",
  topic: "strategic-ai-consulting",
  message: "I need help building an AI system...",
}
```
