# Test Instructions: Hero

## Overview

Test typing animation, CTA interactions, and social links.

---

## User Flow Tests

### Flow 1: Typing Animation

**Expected Results:**
- [ ] Name types out character by character
- [ ] After name completes, title types out
- [ ] Blinking cursor visible during typing
- [ ] CTAs fade in after typing completes

### Flow 2: Primary CTA

**Steps:**
1. User clicks "View Projects" button

**Expected Results:**
- [ ] `onPrimaryCtaClick` callback called
- [ ] Navigation to projects occurs

### Flow 3: Secondary CTA

**Steps:**
1. User clicks "Get in Touch" button

**Expected Results:**
- [ ] `onSecondaryCtaClick` callback called
- [ ] Contact modal opens

### Flow 4: Social Links

**Steps:**
1. User clicks GitHub icon

**Expected Results:**
- [ ] `onSocialLinkClick` called with URL
- [ ] Opens in new tab

---

## Component Tests

### Hero

- [ ] Shows name text after animation
- [ ] Shows title text after animation
- [ ] Shows tagline
- [ ] CTAs have correct labels
- [ ] Background animation runs

### TypingText

- [ ] Animates text character by character
- [ ] Shows cursor during animation
- [ ] Calls onComplete when done
