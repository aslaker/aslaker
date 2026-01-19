---
id: spec-013
title: Indicate external links open in new tab
priority: 4
domain: accessibility
depends_on: []
blocks: []
parallel_safe: true
files:
  - /workspace/src/components/shell/SocialLinks.tsx
  - /workspace/src/components/sections/projects/ProjectModal.tsx
wcag_criteria:
  - "3.2.5 Change on Request (AAA)"
estimated_complexity: low
---

## Problem

External links (GitHub, LinkedIn, demo URLs) do not indicate they open in a new tab/window. While `rel="noopener noreferrer"` is used for security, users are not warned about the new window behavior, which can be disorienting.

**WCAG Criterion:** 3.2.5 Change on Request (Level AAA - best practice)

**Note:** While this is a Level AAA criterion, it is considered a best practice for Level AA compliance and improves user experience for all users.

## Current State

### SocialLinks (`/workspace/src/components/shell/SocialLinks.tsx`)

```tsx
<a
  href={link.url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={link.label}
  className="..."
>
  {/* icon */}
</a>
```

The aria-label is "GitHub" or "LinkedIn" but doesn't indicate new tab.

### ProjectModal (`/workspace/src/components/sections/projects/ProjectModal.tsx`)

```tsx
<button
  onClick={() => onGitHubClick?.(project.githubUrl!)}
  className="..."
>
  <span>git clone</span>
</button>
```

External links are handled via onClick with no indication of new tab behavior.

## Desired State

External links indicate they open in a new tab via:
1. Visually hidden text "(opens in new tab)"
2. Updated aria-label including the indication
3. Visual icon indicator (optional)

## Implementation Steps

### Step 1: Update SocialLinks component

```tsx
export function SocialLinks({ links, size = 'md' }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} (opens in new tab)`}
          className="..."
        >
          {/* icon */}
        </a>
      ))}
    </div>
  );
}
```

### Step 2: Update ProjectModal external links

Convert buttons to proper anchor elements with indication:

```tsx
{project.githubUrl && (
  <a
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 rounded border border-lime-500/40 ..."
  >
    <svg className="h-4 w-4" aria-hidden="true">
      {/* GitHub icon */}
    </svg>
    <span>View on GitHub</span>
    <span className="sr-only">(opens in new tab)</span>
  </a>
)}

{project.demoUrl && (
  <a
    href={project.demoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 rounded border border-emerald-500/40 ..."
  >
    <svg className="h-4 w-4" aria-hidden="true">
      {/* External link icon */}
    </svg>
    <span>Live Demo</span>
    <span className="sr-only">(opens in new tab)</span>
  </a>
)}
```

### Step 3 (Optional): Add visual external link indicator

Create a reusable external link icon component:

```tsx
function ExternalLinkIndicator() {
  return (
    <svg
      className="ml-1 h-3 w-3 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}
```

## Files to Modify

| File | Changes |
|------|---------|
| `/workspace/src/components/shell/SocialLinks.tsx` | Update aria-label |
| `/workspace/src/components/sections/projects/ProjectModal.tsx` | Add sr-only text or aria-label |
| `/workspace/src/components/sections/contact/ContactSection.tsx` | Add indication to email/LinkedIn links |

## Testing Criteria

- [ ] Screen reader announces "(opens in new tab)" for all external links
- [ ] Social links have updated aria-labels
- [ ] Project GitHub/demo links indicate new tab behavior
- [ ] Contact section external links indicate new tab
- [ ] Visual appearance is minimally affected

## Related Specs

- None (standalone improvement)

## References

- [WCAG 3.2.5 Change on Request](https://www.w3.org/WAI/WCAG21/Understanding/change-on-request.html)
- [WebAIM: Links and Hypertext](https://webaim.org/techniques/hypertext/hypertext_links)
