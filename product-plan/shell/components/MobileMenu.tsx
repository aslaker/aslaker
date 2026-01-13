'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { NavigationItem, SocialLink } from './AppShell'
import { SocialLinks } from './SocialLinks'

interface MobileMenuProps {
  items: NavigationItem[]
  socialLinks?: SocialLink[]
  onNavigate?: (href: string) => void
}

export function MobileMenu({ items, socialLinks = [], onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = (href: string) => {
    setIsOpen(false)
    onNavigate?.(href)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-full w-72 transform bg-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Panel Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
          <span
            className="font-mono text-sm text-zinc-400"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Navigation
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault()
                  handleNavigate(item.href)
                }
              }}
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors
                ${
                  item.isActive
                    ? 'bg-lime-400/10 text-lime-400'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                }
              `}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {item.isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="border-t border-zinc-800 p-4">
            <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Connect
            </span>
            <SocialLinks links={socialLinks} size="lg" />
          </div>
        )}
      </div>
    </>
  )
}
