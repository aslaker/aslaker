# Tailwind Color Configuration

## Color Choices

- **Primary:** `lime` — Matrix-inspired green for buttons, links, key accents
- **Secondary:** `emerald` — Subtle highlights, secondary hover states
- **Neutral:** `zinc` — Dark backgrounds, text colors, borders

## Usage Examples

### Primary (Lime)

```html
<!-- Buttons -->
<button class="bg-lime-500 hover:bg-lime-400 text-zinc-900">
  Primary Button
</button>

<!-- Links -->
<a class="text-lime-400 hover:text-lime-300">Link</a>

<!-- Accents -->
<span class="text-lime-500">$</span>
<span class="border-lime-500/30">...</span>

<!-- Glow effects -->
<div class="shadow-[0_0_30px_rgba(132,204,22,0.2)]">...</div>
```

### Secondary (Emerald)

```html
<!-- Tags and badges -->
<span class="bg-emerald-950/50 text-emerald-400 border-emerald-500/40">
  [Tag]
</span>

<!-- Secondary hover states -->
<button class="hover:text-emerald-400">...</button>
```

### Neutral (Zinc)

```html
<!-- Backgrounds -->
<div class="bg-zinc-950">Page background</div>
<div class="bg-zinc-900">Card background</div>
<div class="bg-zinc-800">Input background</div>

<!-- Text -->
<p class="text-zinc-100">Primary text</p>
<p class="text-zinc-400">Muted text</p>
<p class="text-zinc-600">Very muted</p>

<!-- Borders -->
<div class="border-zinc-800">Standard border</div>
```

## Dark Theme Palette

| Element | Color |
|---------|-------|
| Page background | `zinc-950` |
| Card background | `zinc-900` |
| Input background | `zinc-800/50` |
| Borders | `zinc-800` |
| Primary text | `zinc-100` |
| Muted text | `zinc-400` / `zinc-500` |
| Primary accent | `lime-400` / `lime-500` |
| Secondary accent | `emerald-400` |
