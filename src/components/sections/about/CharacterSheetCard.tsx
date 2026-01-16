import type { TTRPGInterest, Trait } from '../../../types'

interface CharacterSheetCardProps {
  interest: TTRPGInterest
  onHover?: () => void
  onClick?: () => void
}

function StatBar({ trait }: { trait: Trait }) {
  const percentage = ((trait.value - 3) / 17) * 100
  const modifier = Math.floor((trait.value - 10) / 2)
  const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`

  return (
    <div className="group/stat">
      <div className="mb-1.5 flex items-center justify-between">
        <span
          className="font-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors"
          style={{ ['--hover-color' as string]: 'var(--theme-primary)' }}
        >
          {trait.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: 'var(--theme-secondary)' }}>
            ({modifierString})
          </span>
          <span className="font-mono text-sm font-bold" style={{ color: 'var(--theme-primary)' }}>
            {trait.value}
          </span>
        </div>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-zinc-800/80">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(to right, var(--theme-primary-darker), var(--theme-primary))`,
          }}
        />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.3)_1px,rgba(0,0,0,0.3)_2px)]" />
      </div>
      <p className="mt-1 font-mono text-xs italic text-zinc-600 transition-colors group-hover/stat:text-zinc-500">
        {trait.description}
      </p>
    </div>
  )
}

export function CharacterSheetCard({
  interest,
  onHover,
  onClick,
}: CharacterSheetCardProps) {
  const midpoint = Math.ceil(interest.traits.length / 2)
  const leftTraits = interest.traits.slice(0, midpoint)
  const rightTraits = interest.traits.slice(midpoint)

  return (
    <div
      onClick={onClick}
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
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-amber-950/5 via-transparent to-transparent opacity-30" />

      <div className="mb-4 flex items-center gap-2 pb-3" style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(var(--theme-primary-dark-rgb), 0.2)' }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'rgba(var(--theme-primary-dark-rgb), 0.7)' }} />
        </div>
        <span className="truncate font-mono text-xs" style={{ color: 'rgba(var(--theme-primary-dark-rgb), 0.5)' }}>
          ~/about/character_sheet.md
        </span>
      </div>

      <div className="mb-5 flex items-center gap-4">
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
          >
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="8.5" x2="22" y2="15.5" />
            <line x1="22" y1="8.5" x2="2" y2="15.5" />
          </svg>
        </div>
        <div>
          <h3 className="font-mono text-base font-bold tracking-tight sm:text-lg" style={{ color: 'var(--theme-primary)' }}>
            <span style={{ color: 'var(--theme-primary-darker)' }}>&gt; </span>
            {interest.title}
          </h3>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Character Stats
          </span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div className="space-y-4">
          {leftTraits.map((trait) => (
            <StatBar key={trait.name} trait={trait} />
          ))}
        </div>
        <div className="space-y-4">
          {rightTraits.map((trait) => (
            <StatBar key={trait.name} trait={trait} />
          ))}
        </div>
      </div>

      {interest.flavorText && (
        <div className="mt-auto border-t border-zinc-800 pt-4">
          <p className="font-mono text-xs italic text-zinc-500">
            <span style={{ color: 'var(--theme-primary-darker)' }}>&quot;</span>
            {interest.flavorText}
            <span style={{ color: 'var(--theme-primary-darker)' }}>&quot;</span>
          </p>
        </div>
      )}
    </div>
  )
}
