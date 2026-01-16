import { useState } from 'react'
import type { Hero as HeroType, SocialLink } from '../../../types'
import { TypingText } from './TypingText'
import { Github, Linkedin, Mail, Code2 } from 'lucide-react'

interface HeroProps {
  hero: HeroType
  socialLinks?: SocialLink[]
  onPrimaryCtaClick?: () => void
  onSecondaryCtaClick?: () => void
  onSocialLinkClick?: (id: string) => void
}

const icons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  code: Code2,
}

export function Hero({
  hero,
  socialLinks = [],
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  onSocialLinkClick,
}: HeroProps) {
  const [nameComplete, setNameComplete] = useState(false)
  const [titleComplete, setTitleComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleSocialClick = (link: SocialLink) => {
    if (onSocialLinkClick) {
      onSocialLinkClick(link.id)
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Animated gradient background with wave effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

        {/* Animated wave layers */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(var(--theme-primary-rgb), 0.15) 0%, transparent 50%)',
            animation: 'wave 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 60% 60%, rgba(var(--theme-secondary-rgb), 0.12) 0%, transparent 50%)',
            animation: 'wave 12s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 40% 40%, rgba(var(--theme-primary-rgb), 0.1) 0%, transparent 50%)',
            animation: 'wave 10s ease-in-out infinite 2s',
          }}
        />

        {/* Scanline overlay for terminal feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(var(--theme-primary-rgb), 0.5) 2px, rgba(var(--theme-primary-rgb), 0.5) 4px)',
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Terminal-style prefix */}
        <div className="mb-8 font-mono text-sm tracking-wider" style={{ color: 'rgba(var(--theme-primary-dark-rgb), 0.6)' }}>
          <span style={{ color: 'var(--theme-secondary)' }}>&gt;</span> initializing portfolio...
        </div>

        {/* Name with typing effect */}
        <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-100 mb-4 tracking-tight">
          <span className="relative">
            <span
              className="absolute inset-0 blur-lg"
              style={{
                background: 'rgba(var(--theme-primary-rgb), 0.2)',
                opacity: nameComplete ? 0.6 : 0,
                transition: 'opacity 0.5s ease-out',
              }}
            />
            <TypingText
              text={hero.name}
              delay={500}
              speed={100}
              onComplete={() => setNameComplete(true)}
              showCursor={!nameComplete}
            />
          </span>
        </h1>

        {/* Title with typing effect - starts after name completes */}
        <div className="h-12 sm:h-14 md:h-16 mb-6">
          {nameComplete && (
            <h2
              className="font-mono text-xl sm:text-2xl md:text-3xl tracking-wide"
              style={{
                color: 'var(--theme-primary)',
                textShadow: '0 0 20px rgba(var(--theme-primary-rgb), 0.4), 0 0 40px rgba(var(--theme-primary-rgb), 0.2)',
              }}
            >
              <TypingText
                text={hero.title}
                delay={300}
                speed={60}
                onComplete={() => {
                  setTitleComplete(true)
                  setTimeout(() => setShowContent(true), 400)
                }}
                showCursor={!titleComplete}
              />
            </h2>
          )}
        </div>

        {/* Tagline and CTAs - fade in after typing completes */}
        <div
          className={`transition-all duration-700 ease-out ${
            showContent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Tagline */}
          <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {hero.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onPrimaryCtaClick}
              className="group relative px-8 py-4 font-mono text-sm uppercase tracking-widest text-zinc-900 rounded-none overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-primary)',
                boxShadow: '0 0 0 rgba(var(--theme-primary-rgb), 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--theme-primary-rgb), 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(var(--theme-primary-rgb), 0)'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span style={{ color: 'var(--theme-primary-darker)' }}>&gt;</span>
                {hero.primaryCta.label}
              </span>
              {/* Glitch effect on hover */}
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-0" style={{ backgroundColor: 'var(--theme-secondary)' }} />
            </button>

            <button
              onClick={onSecondaryCtaClick}
              className="group px-8 py-4 font-mono text-sm uppercase tracking-widest rounded-none transition-all duration-300"
              style={{
                color: 'var(--theme-primary)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(var(--theme-primary-rgb), 0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--theme-primary)'
                e.currentTarget.style.backgroundColor = 'rgba(var(--theme-primary-rgb), 0.1)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(var(--theme-primary-rgb), 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-rgb), 0.5)'
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span className="flex items-center gap-2">
                <span style={{ color: 'var(--theme-secondary)' }}>&gt;</span>
                {hero.secondaryCta.label}
              </span>
            </button>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-6">
              {socialLinks.map((link) => {
                const Icon = icons[link.icon]
                return (
                  <button
                    key={link.id}
                    onClick={() => handleSocialClick(link)}
                    className="p-3 text-zinc-500 transition-all duration-300 rounded-sm"
                    style={{ '--hover-color': 'var(--theme-primary)' } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--theme-primary)'
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(var(--theme-primary-rgb), 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = ''
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    aria-label={link.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-zinc-600 font-mono text-xs">
            <span className="tracking-widest uppercase">scroll</span>
            <div
              className="w-px h-8"
              style={{
                background: 'linear-gradient(to bottom, rgba(var(--theme-primary-rgb), 0.5), transparent)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
