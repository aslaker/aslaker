# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or import via CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Or via CSS import:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

## Font Usage

### Headings: Space Grotesk

A technical, modern geometric sans-serif with a hint of terminal aesthetic.

```css
font-family: 'Space Grotesk', system-ui, sans-serif;
```

Usage:
- Page titles
- Section headings
- Card titles
- Navigation items

### Body: Inter

Clean, highly readable sans-serif optimized for screens.

```css
font-family: 'Inter', system-ui, sans-serif;
```

Usage:
- Paragraph text
- Descriptions
- Form labels
- General UI text

### Mono: JetBrains Mono

A developer-focused monospace font perfect for the terminal aesthetic.

```css
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

Usage:
- Code blocks
- Terminal-style UI elements
- Tags and badges
- Technical identifiers
- Path displays (e.g., `~/projects/auto-claude`)
- Status indicators

## Tailwind CSS Configuration

If using Tailwind, extend the theme:

```js
// Note: In Tailwind v4, use CSS variables instead
// In your CSS:
@theme {
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

## Font Weight Guidelines

| Weight | Usage |
|--------|-------|
| 400 (Regular) | Body text, descriptions |
| 500 (Medium) | Navigation, labels |
| 600 (SemiBold) | Card titles, emphasis |
| 700 (Bold) | Page titles, strong emphasis |
