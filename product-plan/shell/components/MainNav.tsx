'use client'

import type { NavigationItem } from './AppShell'

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault()
              onNavigate(item.href)
            }
          }}
          className={`
            relative px-3 py-2 text-sm font-medium transition-colors
            ${
              item.isActive
                ? 'text-lime-400'
                : 'text-zinc-400 hover:text-zinc-100'
            }
          `}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {item.label}
          {item.isActive && (
            <span className="absolute bottom-0 left-3 right-3 h-px bg-lime-400" />
          )}
        </a>
      ))}
    </nav>
  )
}
