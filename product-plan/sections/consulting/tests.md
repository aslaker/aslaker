# Test Instructions: Consulting

## Overview

Test service cards display and booking CTA functionality.

---

## User Flow Tests

### Flow 1: View Services

**Setup:** Provide 3 service objects

**Expected Results:**
- [ ] All 3 service cards visible
- [ ] Each shows icon, title, description
- [ ] Each shows pricing placeholder text

### Flow 2: Book Consultation

**Steps:**
1. User clicks "Book a Consult" button

**Expected Results:**
- [ ] `onBookConsult` callback called
- [ ] Contact modal opens (handled externally)

### Flow 3: Local Tech Labs Link

**Steps:**
1. User clicks "Check out Local Tech Labs" link

**Expected Results:**
- [ ] `onLocalTechLabsClick` callback called
- [ ] Opens localtechlabs.io in new tab

---

## Component Tests

### ServiceCard

- [ ] Shows correct icon for service type
- [ ] Shows title and description
- [ ] Has hover animation effect

---

## Accessibility

- [ ] Book button is keyboard accessible
- [ ] External link indicates it opens new tab
