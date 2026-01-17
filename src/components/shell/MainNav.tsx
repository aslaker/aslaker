import type { NavigationItem } from '../../types'

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
            relative px-3 py-2 text-sm font-medium transition-colors font-heading
            ${
              item.isActive
                ? ''
                : 'text-zinc-400 hover:text-zinc-100'
            }
          `}
          style={item.isActive ? { color: 'var(--theme-primary)' } : undefined}
        >
          {item.label}
          {item.isActive && (
            <span className="absolute bottom-0 left-3 right-3 h-px" style={{ backgroundColor: 'var(--theme-primary)' }} />
          )}
        </a>
      ))}
    </nav>
  )
}
