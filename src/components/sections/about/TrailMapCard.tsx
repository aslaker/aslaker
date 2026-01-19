import { useState } from 'react'
import type { MountainBikingInterest, RidingArea, Trail } from '../../../types'

interface TrailMapCardProps {
  interest: MountainBikingInterest
  onHover?: () => void
}

const difficultyConfig = {
  beginner: {
    color: 'bg-emerald-400',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    label: 'Green',
    icon: '●',
  },
  intermediate: {
    color: 'bg-blue-400',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    label: 'Blue',
    icon: '■',
  },
  advanced: {
    color: 'bg-zinc-950',
    textColor: 'text-zinc-300',
    borderColor: 'border-zinc-500/30',
    label: 'Black',
    icon: '◆',
  },
  expert: {
    color: 'bg-zinc-950',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    label: 'Double Black',
    icon: '◆◆',
  },
}

function TrailMarker({
  trail,
  delay,
  isVisible,
}: {
  trail: Trail
  delay: number
  isVisible: boolean
}) {
  const config = difficultyConfig[trail.difficulty]

  return (
    <div
      className="group/trail flex items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-zinc-800/50"
      style={{
        animation: isVisible ? `trailFadeIn 0.3s ease-out ${delay}s both` : 'none',
      }}
    >
      <span className={`font-mono text-xs ${config.textColor}`}>{config.icon}</span>
      <span className="font-mono text-sm text-zinc-300 transition-colors group-hover/trail:[color:var(--theme-primary)]">
        {trail.name}
      </span>
    </div>
  )
}

function AreaAccordion({
  area,
  isExpanded,
  onToggle,
}: {
  area: RidingArea
  isExpanded: boolean
  onToggle: () => void
}) {
  const areaSlug = area.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="rounded border border-zinc-800 bg-zinc-900/30 transition-all hover:border-zinc-700">
      {/* Clickable header */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${area.name} trails`}
        className="group/area flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-zinc-800/30 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-zinc-950"
        style={{ '--tw-ring-color': 'rgba(var(--theme-primary-dark-rgb), 0.5)' } as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            style={{ color: 'var(--theme-primary-dark)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-mono text-sm font-medium text-zinc-300 transition-colors group-hover/area:[color:var(--theme-primary)]">
            {area.name}
          </span>
          <span className="font-mono text-xs text-zinc-600">
            ({area.trails.length} trails)
          </span>
        </div>
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          style={{ color: 'var(--theme-primary-dark)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible trails */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-zinc-800 px-4 py-3">
            <div className="mb-2 font-mono text-xs text-zinc-400">
              <span style={{ color: 'var(--theme-primary-darker)' }} aria-hidden="true">&gt;</span> ls -la ./trails/{areaSlug}
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {area.trails.map((trail, idx) => (
                <TrailMarker
                  key={trail.name}
                  trail={trail}
                  delay={idx * 0.05}
                  isVisible={isExpanded}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TrailMapCard({
  interest,
  onHover,
}: TrailMapCardProps) {
  const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set())

  const toggleArea = (areaName: string) => {
    setExpandedAreas((prev) => {
      const next = new Set(prev)
      if (next.has(areaName)) {
        next.delete(areaName)
      } else {
        next.add(areaName)
      }
      return next
    })
  }

  const allTrails = interest.areas.flatMap((a) => a.trails)
  const difficultyCounts = allTrails.reduce(
    (acc, trail) => {
      acc[trail.difficulty] = (acc[trail.difficulty] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const exploredAreas = interest.areas.filter((a) => a.trails.length > 0)
  const unexploredAreas = interest.areas.filter((a) => a.trails.length === 0)

  return (
    <div
      onMouseEnter={onHover}
      className="group relative flex h-full w-full flex-col rounded-lg bg-zinc-950 p-5 text-left transition-all duration-300 sm:p-6"
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(var(--theme-primary-dark-rgb), 0.3)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-rgb), 0.6)'
        e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--theme-primary-dark-rgb), 0.15)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-dark-rgb), 0.3)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to bottom, rgba(var(--theme-primary-dark-rgb), 0.05), transparent)' }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-5" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="topo" patternUnits="userSpaceOnUse" width="20" height="20">
              <path
                d="M0 10 Q5 5, 10 10 T20 10"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                style={{ color: 'var(--theme-primary-dark)' }}
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#topo)" />
        </svg>
      </div>

      <div className="mb-4 flex items-center gap-2 pb-3" style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(var(--theme-primary-dark-rgb), 0.2)' }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'rgba(var(--theme-primary-dark-rgb), 0.7)' }} />
        </div>
        <span className="truncate font-mono text-xs" style={{ color: 'rgba(var(--theme-primary-dark-rgb), 0.5)' }}>~/about/trails.gpx</span>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded bg-zinc-900 sm:h-16 sm:w-16"
            style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(var(--theme-primary-dark-rgb), 0.2)' }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 sm:h-10 sm:w-10"
              style={{ color: 'var(--theme-primary)' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="5" cy="17" r="3" />
              <circle cx="19" cy="17" r="3" />
              <path d="M12 17l-4-8 8 4-4 4z" />
              <path d="M8 9l4 8" />
              <path d="M16 13l3 4" />
              <path d="M12 5l-4 4" />
            </svg>
          </div>
          <div>
            <h3 className="font-mono text-base font-bold tracking-tight sm:text-lg" style={{ color: 'var(--theme-primary)' }}>
              <span style={{ color: 'var(--theme-primary-darker)' }} aria-hidden="true">&gt; </span>
              {interest.title}
            </h3>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Trail Guide
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <div className="text-right">
            <div className="font-mono text-xl font-bold" style={{ color: 'var(--theme-primary)' }}>{allTrails.length}</div>
            <div className="font-mono text-xs text-zinc-500">trails</div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-right">
            <div className="font-mono text-xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
              {exploredAreas.length}
            </div>
            <div className="font-mono text-xs text-zinc-500">areas</div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4 rounded border border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-500">Difficulty:</span>
        {Object.entries(difficultyConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`font-mono text-sm ${config.textColor}`}>{config.icon}</span>
            <span className="font-mono text-xs text-zinc-400">{config.label}</span>
            <span className="font-mono text-xs text-zinc-600">
              ({difficultyCounts[key] || 0})
            </span>
          </div>
        ))}
      </div>

      {/* Terminal command header */}
      <div className="mb-3 font-mono text-xs text-zinc-400">
        <span style={{ color: 'var(--theme-primary-darker)' }} aria-hidden="true">&gt;</span> ls ./trails
      </div>

      {/* Area accordions */}
      <div className="mb-4 space-y-2">
        {exploredAreas.map((area) => (
          <AreaAccordion
            key={area.name}
            area={area}
            isExpanded={expandedAreas.has(area.name)}
            onToggle={() => toggleArea(area.name)}
          />
        ))}
      </div>

      {/* Bucket list indicator */}
      {unexploredAreas.length > 0 && (
        <div className="mb-4 font-mono text-xs text-zinc-600">
          <span style={{ color: 'var(--theme-primary-darker)' }}>+</span> {unexploredAreas.length} area
          {unexploredAreas.length !== 1 ? 's' : ''} on the bucket list
        </div>
      )}

      <div
        className="mt-auto rounded px-4 py-3"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(var(--theme-secondary-dark-rgb), 0.3)',
          backgroundColor: 'rgba(var(--theme-secondary-dark-rgb), 0.1)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <svg className="h-4 w-4" style={{ color: 'var(--theme-secondary)' }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-mono text-sm font-medium" style={{ color: 'var(--theme-secondary)' }}>
                {interest.coaching.certification}
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-500">{interest.coaching.organization}</p>
          </div>
          <div className="text-right">
            <div className="font-mono text-lg font-bold" style={{ color: 'var(--theme-secondary)' }}>
              {interest.coaching.yearsExperience}+
            </div>
            <div className="font-mono text-xs text-zinc-500">years coaching</div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes trailFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
