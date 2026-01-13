# Application Shell

## Overview

A minimal header navigation for adamslaker.dev — a personal site with a dark, terminal-inspired, Matrix aesthetic. The shell provides clean, unobtrusive navigation that lets the content shine while maintaining easy access to all sections.

## Design Intent

- **Minimal header** — Horizontal navigation bar at top of page
- **Dark theme** — zinc-950 background with lime-400 accents
- **Terminal aesthetic** — Monospace fonts, blinking cursor in logo
- **Content-first** — Header scrolls with page (not sticky)

## Navigation Structure

| Item | Description |
|------|-------------|
| Hero | Landing section (default view) |
| Projects | Project showcase with deep dives |
| About | Personal background and interests |
| Consulting | AI/agentic consulting services |
| Contact | Connection pathways |
| Blog | Technical writing (optional in nav) |

## Components Provided

### AppShell

Main layout wrapper that includes header and wraps content.

**Props:**
- `children` — Page content
- `navigationItems` — Array of nav items with label, href, isActive
- `socialLinks` — Optional array of social link objects
- `siteName` — Optional site name (defaults to "adamslaker.dev")
- `onNavigate` — Callback for navigation clicks

### MainNav

Desktop navigation component with horizontal link layout.

### MobileMenu

Mobile slide-out navigation with hamburger trigger.

### SocialLinks

Social media icon links (GitHub, LinkedIn, X/Twitter).

## Social Links

Included in header (desktop) and mobile menu:
- GitHub
- LinkedIn
- X/Twitter

## Responsive Behavior

- **Desktop (md+):** Full horizontal nav with all links visible, social icons inline
- **Tablet (sm-md):** Same as desktop, may condense spacing
- **Mobile (<sm):** Hamburger menu icon with slide-out navigation panel

## Design Tokens Applied

- **Primary (lime):** Active nav states, hover accents
- **Neutral (zinc):** Backgrounds, text colors, borders
- **Typography:** Space Grotesk for nav items and logo

## Dependencies

The components use `lucide-react` for icons:
- `Menu` and `X` for mobile menu
- `Github`, `Linkedin`, `Twitter` for social links

Install with: `npm install lucide-react`
