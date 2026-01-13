'use client'

import { useState, useEffect } from 'react'
import type { ContactSectionProps } from '../types'

export function ContactSection({
  topicOptions,
  calendarConfig,
  onContactClick,
}: ContactSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Suppress unused variable warnings - these are passed for potential future use
  void topicOptions
  void calendarConfig

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      {/* Subtle grid background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(163, 230, 53, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(163, 230, 53, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* Terminal header */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="inline-block rounded border border-lime-500/30 bg-zinc-900/80 px-4 py-2">
            <span className="font-mono text-sm text-lime-500">
              <span className="text-lime-600">adam@portfolio</span>
              <span className="text-zinc-500">:</span>
              <span className="text-emerald-400">~/contact</span>
              <span className="text-zinc-500">$ </span>
              <span className="text-zinc-300">./reach-out.sh</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-lime-400" />
            </span>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`transition-all delay-150 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <h1 className="mb-4 text-3xl font-medium text-zinc-100 sm:text-4xl">
            <span className="text-lime-500"># </span>
            Let&apos;s Build Something
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-400">
            Whether you&apos;re looking to integrate AI into your product, need a
            technical partner, or want to explore what&apos;s possible—I&apos;d love to
            hear from you.
          </p>
        </div>

        {/* CTA Card */}
        <div
          className={`transition-all delay-300 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-lime-500/30 hover:shadow-[0_0_40px_rgba(163,230,53,0.05)]">
            {/* Corner accent */}
            <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
              <div className="absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-gradient-to-b from-lime-500/20 to-transparent" />
            </div>

            {/* Glow on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lime-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-zinc-700/50 bg-zinc-800/50 text-lime-500 transition-all duration-300 group-hover:border-lime-500/50 group-hover:shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-mono text-lg font-medium text-zinc-100">
                    Start a Conversation
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Response within 24 hours
                  </p>
                </div>
              </div>

              <p className="mb-6 text-zinc-400">
                Click below to open the contact form. Share your project details, and
                we&apos;ll schedule a time to chat about how I can help.
              </p>

              <button
                type="button"
                onClick={onContactClick}
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded border-none bg-lime-500 px-8 py-4 font-mono text-sm font-medium uppercase tracking-widest text-zinc-900 transition-all duration-300 hover:bg-lime-400 hover:shadow-[0_0_40px_rgba(163,230,53,0.4)]"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  <span className="text-lime-700 transition-colors group-hover/btn:text-lime-600">
                    &gt;
                  </span>
                  Get in Touch
                </span>
              </button>
            </div>

            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
          </div>
        </div>

        {/* Alternative contact methods */}
        <div
          className={`mt-8 text-center transition-all delay-500 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="mb-4 font-mono text-xs text-zinc-500">
            <span className="text-lime-600">[</span>
            Or reach out directly
            <span className="text-lime-600">]</span>
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:hello@adamslaker.dev"
              className="group inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-lime-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Email</span>
            </a>
            <a
              href="https://linkedin.com/in/adamslaker"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-lime-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Footer hint */}
        <div
          className={`mt-12 text-center transition-all delay-700 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="font-mono text-xs text-zinc-600">
            <span className="text-lime-600">[</span>
            Currently accepting new projects
            <span className="text-lime-600">]</span>
          </p>
        </div>
      </div>
    </div>
  )
}
