# Hero Section

## Overview

Terminal-inspired landing with typing animation for name and title, animated background, and dual CTAs.

## User Flows

1. **Landing Experience** — See typing animation reveal name and title
2. **Navigate to Projects** — Click primary CTA
3. **Initiate Contact** — Click secondary CTA
4. **Visit Social Profile** — Click social icon

## Design Decisions

- Typing effect for name then title
- Blocky blinking cursor
- Animated gradient/wave background
- Two CTAs fade in after typing
- Matrix-inspired aesthetic

## Components Provided

| Component | Description |
|-----------|-------------|
| `Hero` | Main hero with all content |
| `TypingText` | Reusable typing animation |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onPrimaryCtaClick` | Navigate to Projects |
| `onSecondaryCtaClick` | Open Contact |
| `onSocialLinkClick` | Open social profile |
