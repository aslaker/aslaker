import type { NavigationItem, SocialLink } from '../../types'
import { StyleSelector } from './StyleSelector'
import { MainNav } from './MainNav'
import { MobileMenu } from './MobileMenu'
import { SocialLinks } from './SocialLinks'

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  socialLinks?: SocialLink[]
  siteName?: string
  onNavigate?: (href: string) => void
}

export function AppShell({
  children,
  navigationItems,
  socialLinks = [],
  siteName = 'adamslaker.dev',
  onNavigate,
}: AppShellProps) {
  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = href
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Skip to main content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-lime-500 focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 border-b border-zinc-800/50 bg-zinc-950 md:bg-zinc-950/90 backdrop-blur-sm md:backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Site Name */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('/')
              }}
              className="group flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-zinc-100 transition-colors"
              style={{ '--hover-color': 'var(--theme-primary)' } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--theme-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = ''
              }}
            >
              <span style={{ color: 'var(--theme-primary)' }}>{'>'}</span>
              <span>{siteName}</span>
              <span className="animate-pulse" style={{ color: 'var(--theme-primary)' }}>_</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex">
              <MainNav items={navigationItems} onNavigate={handleNavigate} />
              {socialLinks.length > 0 && (
                <>
                  <div className="h-5 w-px bg-zinc-800" />
                  <SocialLinks links={socialLinks} />
                </>
              )}
              <div className="h-5 w-px bg-zinc-800" />
              <StyleSelector variant="compact" />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu
                items={navigationItems}
                socialLinks={socialLinks}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
