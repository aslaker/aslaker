# Test Instructions: About

These test-writing instructions are **framework-agnostic**.

## Overview

Test the three themed interest cards and their unique data displays.

---

## User Flow Tests

### Flow 1: View All Interest Cards

**Setup:** Provide array of 3 interest objects (TTRPG, Board Games, MTB)

**Expected Results:**
- [ ] All three cards are visible
- [ ] Each card has unique themed styling
- [ ] Terminal header shows "~/about/interests.md"
- [ ] Jump links visible at top

### Flow 2: Jump Link Navigation

**Steps:**
1. User clicks "Board Games" jump link
2. Page scrolls to board games card

**Expected Results:**
- [ ] Smooth scroll to card
- [ ] Card is visible in viewport

### Flow 3: Character Sheet Card

**Expected Results:**
- [ ] Shows "IRL Character Sheet" title
- [ ] Shows all trait stat bars
- [ ] Each stat shows name, value (0-20), and description
- [ ] Stat bars filled proportionally
- [ ] Shows flavor text at bottom

### Flow 4: Scorecard Card

**Expected Results:**
- [ ] Shows "Board Game Stats" title
- [ ] Shows games table with columns
- [ ] Shows designer, category, play count, rating
- [ ] Top-rated games have star icon
- [ ] Shows total plays and game count

### Flow 5: Trail Map Card

**Expected Results:**
- [ ] Shows "Trail Systems" title
- [ ] Shows riding areas with trails
- [ ] Trails have difficulty indicators (green/blue/black)
- [ ] Shows coaching credentials badge

---

## Empty State Tests

- [ ] No interests: Shows placeholder message

---

## Accessibility Checks

- [ ] Cards are keyboard accessible
- [ ] Stat bars have aria-valuenow
- [ ] Difficulty colors have text alternatives
