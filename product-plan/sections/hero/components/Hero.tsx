'use client'

import { useState } from 'react'
import type { HeroProps } from '../types'
import { TypingText } from './TypingText'

// Social icons as inline SVGs for portability
const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  ),
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
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(163, 230, 53, 0.15) 0%, transparent 50%)',
            animation: 'wave 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 60% 60%, rgba(52, 211, 153, 0.12) 0%, transparent 50%)',
            animation: 'wave 12s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 40% 40%, rgba(163, 230, 53, 0.1) 0%, transparent 50%)',
            animation: 'wave 10s ease-in-out infinite 2s',
          }}
        />

        {/* Scanline overlay for terminal feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(163, 230, 53, 0.5) 2px, rgba(163, 230, 53, 0.5) 4px)',
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
        <div className="mb-8 font-mono text-lime-500/60 text-sm tracking-wider">
          <span className="text-emerald-400">&gt;</span> initializing portfolio...
        </div>

        {/* Name with typing effect */}
        <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-100 mb-4 tracking-tight">
          <span className="relative">
            <span
              className="absolute inset-0 blur-lg bg-lime-400/20"
              style={{
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
              className="font-mono text-xl sm:text-2xl md:text-3xl text-lime-400 tracking-wide"
              style={{
                textShadow: '0 0 20px rgba(163, 230, 53, 0.4), 0 0 40px rgba(163, 230, 53, 0.2)',
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
              className="group relative px-8 py-4 font-mono text-sm uppercase tracking-widest text-zinc-900 bg-lime-400 rounded-none overflow-hidden transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lime-700 group-hover:text-lime-600">&gt;</span>
                {hero.primaryCta.label}
              </span>
              {/* Glitch effect on hover */}
              <div className="absolute inset-0 bg-emerald-400 translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-0" />
            </button>

            <button
              onClick={onSecondaryCtaClick}
              className="group px-8 py-4 font-mono text-sm uppercase tracking-widest text-lime-400 border border-lime-400/50 rounded-none transition-all duration-300 hover:border-lime-400 hover:bg-lime-400/10 hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]"
            >
              <span className="flex items-center gap-2">
                <span className="text-emerald-400 group-hover:text-lime-300">&gt;</span>
                {hero.secondaryCta.label}
              </span>
            </button>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-6">
              {socialLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onSocialLinkClick?.(link.id)}
                  className="p-3 text-zinc-500 hover:text-lime-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] rounded-sm"
                  aria-label={link.platform}
                >
                  {icons[link.icon]}
                </button>
              ))}
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
              className="w-px h-8 bg-gradient-to-b from-lime-400/50 to-transparent"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
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
