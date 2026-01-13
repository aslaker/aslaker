'use client'

import { MainNav } from './MainNav'
import { MobileMenu } from './MobileMenu'
import { SocialLinks } from './SocialLinks'

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter'
  url: string
}

export interface AppShellProps {
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
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Site Name */}
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault()
                  onNavigate('/')
                }
              }}
              className="group flex items-center gap-2 font-mono text-lg font-semibold tracking-tight text-zinc-100 transition-colors hover:text-lime-400"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="text-lime-400">{'>'}</span>
              <span>{siteName}</span>
              <span className="animate-pulse text-lime-400">_</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <MainNav items={navigationItems} onNavigate={onNavigate} />
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
                onNavigate={onNavigate}
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
