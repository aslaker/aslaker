import type { MountainBikingInterest, RidingArea, Trail } from '../../../types'

interface TrailMapCardProps {
  interest: MountainBikingInterest
  onHover?: () => void
  onClick?: () => void
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

function TrailMarker({ trail }: { trail: Trail }) {
  const config = difficultyConfig[trail.difficulty]

  return (
    <div className="group/trail flex items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-zinc-800/50">
      <span className={`font-mono text-xs ${config.textColor}`}>
        {config.icon}
      </span>
      <span className="font-mono text-sm text-zinc-300 group-hover/trail:text-lime-400">
        {trail.name}
      </span>
    </div>
  )
}

function AreaSection({ area }: { area: RidingArea }) {
  if (area.trails.length === 0) {
    return (
      <div className="rounded border border-dashed border-zinc-700 bg-zinc-900/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-mono text-sm text-zinc-500">{area.name}</span>
          <span className="font-mono text-xs italic text-zinc-600">— unexplored</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded border border-zinc-800 bg-zinc-900/30">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
        <svg className="h-4 w-4 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-mono text-sm font-medium text-zinc-300">{area.name}</span>
        <span className="font-mono text-xs text-zinc-600">({area.trails.length} trails)</span>
      </div>
      <div className="grid grid-cols-1 gap-1 p-2 sm:grid-cols-2 lg:grid-cols-3">
        {area.trails.map((trail) => (
          <TrailMarker key={trail.name} trail={trail} />
        ))}
      </div>
    </div>
  )
}

export function TrailMapCard({
  interest,
  onHover,
  onClick,
}: TrailMapCardProps) {
  const allTrails = interest.areas.flatMap(a => a.trails)
  const difficultyCounts = allTrails.reduce((acc, trail) => {
    acc[trail.difficulty] = (acc[trail.difficulty] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const exploredAreas = interest.areas.filter(a => a.trails.length > 0)
  const unexploredAreas = interest.areas.filter(a => a.trails.length === 0)

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      className="group relative flex h-full w-full flex-col rounded-lg border border-lime-500/30 bg-zinc-950 p-5 text-left transition-all duration-300 hover:border-lime-400/60 hover:shadow-[0_0_30px_rgba(132,204,22,0.15)] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] opacity-50" />
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-lime-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-5">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="topo" patternUnits="userSpaceOnUse" width="20" height="20">
              <path
                d="M0 10 Q5 5, 10 10 T20 10"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-lime-500"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#topo)" />
        </svg>
      </div>

      <div className="mb-4 flex items-center gap-2 border-b border-lime-500/20 pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime-500/70" />
        </div>
        <span className="truncate font-mono text-xs text-lime-500/50">
          ~/about/trails.gpx
        </span>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded border border-lime-500/20 bg-zinc-900 sm:h-16 sm:w-16">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-lime-400 sm:h-10 sm:w-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
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
            <h3 className="font-mono text-base font-bold tracking-tight text-lime-400 group-hover:text-lime-300 sm:text-lg">
              <span className="text-lime-600">&gt; </span>
              {interest.title}
            </h3>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Trail Guide
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <div className="text-right">
            <div className="font-mono text-xl font-bold text-lime-400">{allTrails.length}</div>
            <div className="font-mono text-xs text-zinc-500">trails</div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-right">
            <div className="font-mono text-xl font-bold text-emerald-400">{interest.areas.length}</div>
            <div className="font-mono text-xs text-zinc-500">areas</div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4 rounded border border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-500">Difficulty:</span>
        {Object.entries(difficultyConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`font-mono text-sm ${config.textColor}`}>
              {config.icon}
            </span>
            <span className="font-mono text-xs text-zinc-400">
              {config.label}
            </span>
            <span className="font-mono text-xs text-zinc-600">
              ({difficultyCounts[key] || 0})
            </span>
          </div>
        ))}
      </div>

      {exploredAreas.length > 0 && (
        <div className="mb-4 space-y-3">
          {exploredAreas.map((area) => (
            <AreaSection key={area.name} area={area} />
          ))}
        </div>
      )}

      {unexploredAreas.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-600">
              On the Bucket List
            </span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {unexploredAreas.map((area) => (
              <AreaSection key={area.name} area={area} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto rounded border border-emerald-500/30 bg-emerald-950/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-mono text-sm font-medium text-emerald-400">
                {interest.coaching.certification}
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-500">
              {interest.coaching.organization}
            </p>
          </div>
          <div className="text-right">
            <div className="font-mono text-lg font-bold text-emerald-400">
              {interest.coaching.yearsExperience}+
            </div>
            <div className="font-mono text-xs text-zinc-500">years coaching</div>
          </div>
        </div>
      </div>
    </div>
  )
}
