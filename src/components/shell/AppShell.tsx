import type { NavigationItem, SocialLink } from '../../types'
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
              className="group flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-zinc-100 transition-colors hover:text-lime-400"
            >
              <span className="text-lime-400">{'>'}</span>
              <span>{siteName}</span>
              <span className="animate-pulse text-lime-400">_</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <MainNav items={navigationItems} onNavigate={handleNavigate} />
              {socialLinks.length > 0 && (
                <>
                  <div className="h-5 w-px bg-zinc-800" />
                  <SocialLinks links={socialLinks} />
                </>
              )}
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
      <main>{children}</main>
    </div>
  )
}
