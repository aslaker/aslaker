# Contact Section

## Overview

A two-step contact modal that captures lead information and facilitates booking a call. Features a terminal-styled form and calendar integration.

## User Flows

1. **Open Contact Modal** — Click CTA to open modal
2. **Fill Contact Form** — Enter name, email, company, topic, and message
3. **Submit & Schedule** — Submit form, then see calendar to book call
4. **View Success** — See confirmation after booking
5. **Close Modal** — Close via X, backdrop, or Escape at any point

## Design Decisions

- Three-step flow: Form → Calendar → Success
- Terminal-style header with step indicator dots
- Form fields have terminal aesthetic (monospace labels)
- Calendar widget embeds directly in modal
- Fallback link if calendar doesn't load

## Components Provided

| Component | Description |
|-----------|-------------|
| `ContactSection` | Landing section with CTA button |
| `ContactModal` | Multi-step modal (form/calendar/success) |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onContactClick` | Open the modal |
| `onClose` | Close the modal |
| `onFormSubmit` | Submit form data to backend |
| `onBookingComplete` | Called after calendar booking |
