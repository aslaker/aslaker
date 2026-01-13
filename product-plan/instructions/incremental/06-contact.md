# Milestone 6: Contact

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Contact section — a two-step contact modal that captures lead information and facilitates booking a call.

## Overview

The contact section provides pathways to connect:
- Contact section with CTA button to open modal
- Modal step 1: Form (name, email, company, topic, message)
- Modal step 2: Embedded calendar widget for scheduling
- Success confirmation after booking
- Alternative contact methods (email, LinkedIn)

**Key Functionality:**
- Open contact modal from CTA button
- Fill out contact form with required fields
- Submit form (sync to HubSpot or similar)
- After submission, see calendar widget to book call
- Close modal at any point via X, backdrop, or Escape

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/contact/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/contact/components/`:

- `ContactSection.tsx` — Landing section with CTA button
- `ContactModal.tsx` — Two-step modal (form → calendar → success)

### Data Layer

The components expect these data shapes:

```typescript
type TopicValue = 'strategic-ai-consulting' | 'website-development' | 'fractional-cto' | 'speaking'

interface TopicOption {
  id: string
  label: string
  value: TopicValue
}

interface CalendarConfig {
  provider: 'calendly' | 'google'
  embedUrl: string
  fallbackUrl: string
}

interface ContactFormData {
  name: string
  email: string
  company: string
  topic: TopicValue
  message: string
}
```

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onContactClick` | Open the contact modal |
| `onClose` | Close the modal |
| `onFormSubmit` | Submit form data to backend (HubSpot) |
| `onBookingComplete` | Called after calendar booking completes |

### Backend Integration

**Form Submission:**
- Submit to HubSpot API or your preferred CRM
- Handle validation errors
- Show loading state during submission

**Calendar Integration:**
- Embed Calendly widget or Google Calendar appointment scheduling
- Provide fallback link if embed fails
- Detect when booking is complete

## Files to Reference

- `product-plan/sections/contact/README.md` — Feature overview and design intent
- `product-plan/sections/contact/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/contact/components/` — React components
- `product-plan/sections/contact/types.ts` — TypeScript interfaces
- `product-plan/sections/contact/sample-data.json` — Topic options and example submissions

## Expected User Flows

### Flow 1: Open Contact Modal

1. User clicks "Get in Touch" button in Contact section
2. Modal opens with form view
3. **Outcome:** User sees contact form

### Flow 2: Submit Contact Form

1. User fills out name, email, company (optional), topic, and message
2. User clicks "Submit & Schedule Call"
3. Form submits to backend
4. Modal transitions to calendar step
5. **Outcome:** Lead is captured, user sees calendar

### Flow 3: Book a Call

1. User sees embedded calendar widget
2. User selects available time slot
3. Booking completes
4. Modal shows success confirmation
5. **Outcome:** Meeting is scheduled

### Flow 4: Close Modal

1. User is viewing modal at any step
2. User clicks X, clicks backdrop, or presses Escape
3. **Outcome:** Modal closes

### Flow 5: Handle Form Errors

1. User submits form with invalid data
2. Validation errors display inline
3. Form data is preserved
4. **Outcome:** User can correct errors and resubmit

## Done When

- [ ] Contact section renders with CTA
- [ ] Modal opens from CTA click
- [ ] Form displays with all fields (name, email, company, topic, message)
- [ ] Form validates required fields
- [ ] Form submits to backend
- [ ] Calendar step shows after successful submission
- [ ] Success step shows after booking
- [ ] Modal closes via X, backdrop, or Escape
- [ ] Step indicator shows progress
- [ ] Responsive on mobile
- [ ] Alternative contact methods (email, LinkedIn) display
