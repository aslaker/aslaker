# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for adamslaker.dev - an Astro static site with React components, deployed to Cloudflare Workers.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run deploy   # Build and deploy to Cloudflare (requires wrangler auth)
npm run test     # Run tests in watch mode
npm run test:run # Run tests once
```

## Architecture

**Framework Stack:**
- Astro 5 with static output mode
- React 19 for interactive components (client:load hydration)
- Tailwind CSS v4 with PostCSS
- Cloudflare Workers adapter for deployment

**Key Files:**
- `src/pages/index.astro` - Entry point that renders the main React app
- `src/components/PortfolioApp.tsx` - Root React component orchestrating all sections
- `src/data/site-data.ts` - All site content (navigation, projects, services, interests, blog posts)
- `src/types/index.ts` - TypeScript interfaces for all data models
- `wrangler.jsonc` - Cloudflare Workers configuration with custom domains

**Component Organization:**
- `src/components/shell/` - Layout components (AppShell, navigation, mobile menu, font selector)
- `src/components/sections/` - Page sections (hero, projects, about, consulting, contact, blog)
- `src/components/ui/` - Reusable UI primitives
- `src/context/` - React context providers (FontContext for user font preferences)

**Design System:**
- Lime/emerald accent colors with zinc neutral palette (defined in `tailwind.config.mjs`)
- Custom fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- User-selectable fonts via FontContext with localStorage persistence

**Data Flow:**
- All site content is defined in `src/data/site-data.ts` as typed constants
- PortfolioApp imports data and passes to section components as props
- Contact form submits to HubSpot API (portal/form IDs in PortfolioApp.tsx)

**Testing:**
- Vitest with jsdom environment
- React Testing Library
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Setup in `src/test/setup.ts`
