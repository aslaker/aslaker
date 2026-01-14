import { useState, useEffect } from 'react'
import type { Interest, TTRPGInterest, BoardGamesInterest, MountainBikingInterest } from '../../../types'
import { CharacterSheetCard } from './CharacterSheetCard'
import { ScorecardCard } from './ScorecardCard'
import { TrailMapCard } from './TrailMapCard'

interface AboutGridProps {
  interests: Interest[]
  onCardHover?: (id: string) => void
  onCardClick?: (id: string) => void
  onContinueToConsulting?: () => void
}

function isTTRPGInterest(interest: Interest): interest is TTRPGInterest {
  return interest.theme === 'character-sheet'
}

function isBoardGamesInterest(interest: Interest): interest is BoardGamesInterest {
  return interest.theme === 'scorecard'
}

function isMountainBikingInterest(interest: Interest): interest is MountainBikingInterest {
  return interest.theme === 'trail-map'
}

const jumpLinkConfig: Record<string, { icon: React.ReactNode; label: string }> = {
  ttrpg: {
    label: 'RPGs',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  'board-games': {
    label: 'Board Games',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2C10.5 2 9 3.5 9 5C9 6.5 10 7.5 10 7.5L7 11L4 10L3 12L6 14L5 22H19L18 14L21 12L20 10L17 11L14 7.5C14 7.5 15 6.5 15 5C15 3.5 13.5 2 12 2Z" />
      </svg>
    ),
  },
  'mountain-biking': {
    label: 'MTB',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5" cy="17" r="3" />
        <circle cx="19" cy="17" r="3" />
        <path d="M12 17l-4-8 8 4-4 4z" />
      </svg>
    ),
  },
}

function JumpLinks({
  interests,
  isVisible,
}: {
  interests: Interest[]
  isVisible: boolean
}) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(`interest-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      className={`mb-8 transition-all delay-200 duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-zinc-600">jump to:</span>
        {interests.map((interest) => {
          const config = jumpLinkConfig[interest.id]
          if (!config) return null

          return (
            <button
              type="button"
              key={interest.id}
              onClick={() => scrollToSection(interest.id)}
              className="group flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-all hover:border-lime-500/50 hover:bg-zinc-900 hover:text-lime-400"
            >
              <span className="text-zinc-600 transition-colors group-hover:text-lime-500">
                {config.icon}
              </span>
              {config.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function InterestCard({
  interest,
  index,
  onHover,
  onClick,
}: {
  interest: Interest
  index: number
  onHover?: () => void
  onClick?: () => void
}) {
  const content = (() => {
    if (isTTRPGInterest(interest)) {
      return (
        <CharacterSheetCard
          interest={interest}
          onHover={onHover}
          onClick={onClick}
        />
      )
    }

    if (isBoardGamesInterest(interest)) {
      return (
        <ScorecardCard
          interest={interest}
          onHover={onHover}
          onClick={onClick}
        />
      )
    }

    if (isMountainBikingInterest(interest)) {
      return (
        <TrailMapCard
          interest={interest}
          onHover={onHover}
          onClick={onClick}
        />
      )
    }

    return null
  })()

  return (
    <div
      id={`interest-${interest.id}`}
      className="h-full scroll-mt-24"
      style={{ animation: `aboutFadeIn 0.5s ease-out ${index * 0.15}s both` }}
    >
      {content}
    </div>
  )
}

export function AboutGrid({
  interests,
  onCardHover,
  onCardClick,
  onContinueToConsulting,
}: AboutGridProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="min-h-screen bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM4NGNjMTYiPjE8L3RleHQ+PC9zdmc+')] animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="inline-block rounded border border-lime-500/30 bg-zinc-900/80 px-4 py-2">
            <span className="font-mono text-sm text-lime-500">
              <span className="text-lime-600">adam@portfolio</span>
              <span className="text-zinc-500">:</span>
              <span className="text-emerald-400">~/about</span>
              <span className="text-zinc-500">$ </span>
              <span className="text-zinc-300">cat interests.md</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-lime-400" />
            </span>
          </div>
        </div>

        <div
          className={`mb-6 transition-all delay-150 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <p className="font-mono text-sm leading-relaxed text-zinc-400">
            <span className="text-lime-600">&gt; </span>
            Beyond the code: the human behind the engineer. Each card reveals
            a different aspect of who I am when I&apos;m not building AI systems.
          </p>
        </div>

        <JumpLinks interests={interests} isVisible={isVisible} />

        <div className="flex flex-col gap-6">
          {interests.map((interest, index) => (
            <InterestCard
              key={interest.id}
              interest={interest}
              index={index}
              onHover={() => onCardHover?.(interest.id)}
              onClick={() => onCardClick?.(interest.id)}
            />
          ))}
        </div>

        {/* Section CTA */}
        <div
          className={`mt-12 text-center transition-all delay-700 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="mb-6 font-mono text-xs text-zinc-600">
            <span className="text-lime-600">[</span>
            Hover over cards to explore more details
            <span className="text-lime-600">]</span>
          </p>

          {/* Transition message */}
          <p className="mb-6 font-mono text-sm text-zinc-400">
            <span className="text-lime-600">&gt; </span>
            Now that you know me, let&apos;s talk about what we can build together.
          </p>

          {/* Primary CTA */}
          <button
            onClick={onContinueToConsulting}
            className="group inline-flex items-center gap-2 bg-lime-400 px-6 py-3 font-mono text-sm uppercase tracking-widest text-zinc-900 transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]"
          >
            <span className="text-lime-700 transition-colors group-hover:text-lime-600">
              &gt;
            </span>
            Explore Services
          </button>
        </div>
      </div>

      <style>{`
        @keyframes aboutFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            filter: blur(4px);
          }
          50% {
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
      `}</style>
    </section>
  )
}
