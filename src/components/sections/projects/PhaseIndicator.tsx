import type { ProjectPhase } from '../../../types'
import { PROJECT_PHASES } from '../../../data/site-data'

interface PhaseIndicatorProps {
  phase: ProjectPhase
  size?: 'sm' | 'md'
}

const PHASE_ORDER: ProjectPhase[] = [
  'concept',
  'design',
  'architecture',
  'building',
  'deployed',
  'iterating',
]

const COLOR_CLASSES = {
  zinc: {
    filled: 'bg-zinc-500',
    text: 'text-zinc-400',
  },
  purple: {
    filled: 'bg-purple-500',
    text: 'text-purple-400',
  },
  blue: {
    filled: 'bg-blue-500',
    text: 'text-blue-400',
  },
  amber: {
    filled: 'bg-amber-500',
    text: 'text-amber-400',
  },
  lime: {
    filled: 'bg-lime-500',
    text: 'text-lime-400',
  },
  emerald: {
    filled: 'bg-emerald-500',
    text: 'text-emerald-400',
  },
}

export function PhaseIndicator({ phase, size = 'sm' }: PhaseIndicatorProps) {
  const phaseData = PROJECT_PHASES[phase]
  const currentIndex = PHASE_ORDER.indexOf(phase)
  const colorClasses = COLOR_CLASSES[phaseData.color]

  const isSmall = size === 'sm'
  const blockSize = isSmall ? 'h-2 w-3' : 'h-3 w-4'
  const textSize = isSmall ? 'text-xs' : 'text-sm'
  const gap = isSmall ? 'gap-0.5' : 'gap-1'

  return (
    <div className="flex items-center gap-2 font-mono">
      {/* Status label */}
      <span className={`${textSize} text-zinc-600`}>[STATUS]</span>

      {/* Phase name */}
      <span className={`${textSize} ${colorClasses.text}`}>
        {phaseData.label}
      </span>

      {/* Progress bar */}
      <div className={`flex ${gap}`}>
        {PHASE_ORDER.map((p, idx) => {
          const isFilled = idx <= currentIndex
          const isCurrent = idx === currentIndex

          return (
            <div
              key={p}
              className={`
                ${blockSize} rounded-sm
                ${isFilled ? colorClasses.filled : 'bg-zinc-800'}
                ${isCurrent && phaseData.isActive ? 'animate-phase-pulse' : ''}
              `}
            />
          )
        })}
      </div>

      {/* Progress fraction */}
      <span className={`${textSize} text-zinc-600`}>
        {currentIndex + 1}/{PHASE_ORDER.length}
      </span>
    </div>
  )
}
