---
id: spec-008
title: Add favicon.ico, apple-touch-icon, and web manifest
priority: 2
domain: seo
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/public/favicon.ico
  - /workspace/public/apple-touch-icon.png
  - /workspace/public/android-chrome-192x192.png
  - /workspace/public/android-chrome-512x512.png
  - /workspace/public/site.webmanifest
  - /workspace/src/pages/index.astro
  - /workspace/src/pages/blog/index.astro
  - /workspace/src/pages/blog/[slug].astro
wcag_criteria: []
estimated_complexity: medium
---

## Problem

The site only has an SVG favicon, missing several important icon and manifest files:

1. **favicon.ico**: Fallback for older browsers and applications
2. **apple-touch-icon.png**: iOS home screen icon
3. **android-chrome icons**: Android PWA icons
4. **site.webmanifest**: Web app manifest for PWA support

**Impact:**
- Older browsers show no favicon
- iOS users adding to home screen see a screenshot, not a branded icon
- Android users cannot install as PWA properly
- Missing PWA signals for search engines

## Current State

File: `/workspace/public/favicon.svg` exists (default Astro icon)

Missing files:
- `/workspace/public/favicon.ico`
- `/workspace/public/apple-touch-icon.png`
- `/workspace/public/android-chrome-192x192.png`
- `/workspace/public/android-chrome-512x512.png`
- `/workspace/public/site.webmanifest`

Current favicon link in pages:
```astro
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

## Desired State

1. All icon formats available for cross-platform support
2. Web manifest file for PWA functionality
3. Proper meta tags linking to all icons
4. Consistent branding across all platforms

## Implementation Steps

### Step 1: Create icon assets

**Note:** These images need to be designed/created. Specifications:

| File | Dimensions | Format | Notes |
|------|------------|--------|-------|
| favicon.ico | 32x32 or 16x16+32x32 multi | ICO | Fallback favicon |
| apple-touch-icon.png | 180x180 | PNG | iOS home screen |
| android-chrome-192x192.png | 192x192 | PNG | Android small icon |
| android-chrome-512x512.png | 512x512 | PNG | Android splash |

Recommended design:
- Dark background (#09090b)
- Lime accent color (#84cc16)
- Simple, recognizable mark (initials "AS" or a symbol)
- Works at small sizes

### Step 2: Create web manifest

Create `/workspace/public/site.webmanifest`:

```json
{
  "name": "Adam Slaker - Principal Agentic Engineer",
  "short_name": "Adam Slaker",
  "description": "Building intelligent systems that think, adapt, and ship.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#09090b",
  "theme_color": "#84cc16",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Step 3: Update page templates with icon links

Update `/workspace/src/pages/index.astro` (and other pages):

```astro
<head>
  <!-- ... existing meta tags ... -->

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- Theme color for mobile browsers -->
  <meta name="theme-color" content="#84cc16" />
  <meta name="msapplication-TileColor" content="#09090b" />

  <!-- ... rest of head ... -->
</head>
```

### Step 4: Create a reusable head component (optional but recommended)

Create `/workspace/src/components/BaseHead.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
}

const {
  title,
  description,
  ogImage = 'https://adamslaker.dev/og-image.png',
  canonicalUrl,
  type = 'website',
  publishedTime,
  tags = []
} = Astro.props;

const siteUrl = 'https://adamslaker.dev';
---

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content={description} />
<meta name="author" content="Adam Slaker" />
<meta name="generator" content={Astro.generator} />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalUrl} />

<!-- Favicon -->
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Theme color -->
<meta name="theme-color" content="#84cc16" />
<meta name="msapplication-TileColor" content="#09090b" />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Adam Slaker" />

{type === 'article' && publishedTime && (
  <>
    <meta property="article:published_time" content={publishedTime} />
    <meta property="article:author" content="Adam Slaker" />
  </>
)}
{tags.map((tag) => <meta property="article:tag" content={tag} />)}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<title>{title}</title>
```

Then use in pages:
```astro
---
import BaseHead from "../components/BaseHead.astro";
---
<head>
  <BaseHead
    title="Adam Slaker | Principal Agentic Engineer"
    description="Building intelligent systems..."
    canonicalUrl="https://adamslaker.dev/"
  />
</head>
```

## Files to Modify

| File | Action |
|------|--------|
| `/workspace/public/favicon.ico` | Create new (32x32 ICO) |
| `/workspace/public/apple-touch-icon.png` | Create new (180x180 PNG) |
| `/workspace/public/android-chrome-192x192.png` | Create new (192x192 PNG) |
| `/workspace/public/android-chrome-512x512.png` | Create new (512x512 PNG) |
| `/workspace/public/site.webmanifest` | Create new file |
| `/workspace/src/pages/index.astro` | Add icon links |
| `/workspace/src/pages/blog/index.astro` | Add icon links |
| `/workspace/src/pages/blog/[slug].astro` | Add icon links |
| `/workspace/src/components/BaseHead.astro` | Create new (optional) |

## Testing Criteria

- [ ] favicon.ico loads in older browsers (IE11, Edge Legacy)
- [ ] SVG favicon loads in modern browsers
- [ ] iOS: Add to Home Screen shows custom icon (not screenshot)
- [ ] Android: Install PWA shows correct icon
- [ ] Chrome DevTools > Application > Manifest shows no errors
- [ ] Lighthouse PWA audit passes icon requirements
- [ ] Theme color appears in mobile browser UI

## Related Specs

- spec-005: Add OG images (related assets)

## References

- [Favicon Best Practices](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Apple Touch Icon Guidelines](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
