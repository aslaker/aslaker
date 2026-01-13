# adamslaker.dev — Product Overview

## Summary

A personal site and digital home for Adam Slaker - Principal Agentic Engineer, open source maintainer, and builder of intelligent systems. The site showcases his expertise in AI-powered development and full-stack engineering, his active projects, and the human behind the code.

The aesthetic is dark, terminal-inspired, and Matrix-themed with lime green accents on zinc backgrounds. Every section features monospace fonts, command-line styling, and subtle glow effects.

## Planned Sections

1. **Hero** — Terminal-inspired landing with typing animation for name and title, animated gradient background, and dual CTAs ("View Projects" / "Get in Touch")

2. **Projects** — Visual portfolio with MS-DOS/Matrix-styled card grid. Each card shows project details; clicking opens a modal with full description, tech stack, screenshots, and external links.

3. **About** — Three themed hobby cards revealing personality:
   - Character Sheet (TTRPG) with D&D-style stat bars
   - Scorecard (Board Games) with collection stats
   - Trail Map (Mountain Biking) with trails and coaching credentials

4. **Consulting** — Service offerings (Strategic AI, Website Development, Fractional CTO) with booking CTA and Local Tech Labs callout.

5. **Contact** — Two-step modal flow: contact form → calendar booking → success confirmation.

6. **Blog** — Searchable, filterable technical blog with markdown rendering, code highlighting, and related posts.

## Data Model

**Core Entities:**
- `Project` — Featured work with tags, technologies, and links
- `Writing` — Blog posts with markdown content
- `Service` — Consulting offerings
- `Interest` — Themed hobby data
- `SocialLink` — External profiles

## Design System

**Colors:**
- Primary: `lime` — Matrix-inspired green for accents
- Secondary: `emerald` — Subtle highlights
- Neutral: `zinc` — Dark backgrounds and text

**Typography:**
- Heading: Space Grotesk — Techy, modern feel
- Body: Inter — Clean readability
- Mono: JetBrains Mono — Terminal aesthetic

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Design tokens, data model types, routing, application shell
2. **Hero** — Landing section with typing animation
3. **Projects** — Project card grid and detail modals
4. **About** — Themed interest cards
5. **Consulting** — Service cards and booking CTA
6. **Contact** — Multi-step contact modal
7. **Blog** — Blog list and detail pages

Each milestone has dedicated instructions in `product-plan/instructions/`.
