interface SectionDividerProps {
  toSection: string
}

export function SectionDivider({ toSection }: SectionDividerProps) {
  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      {/* Horizontal line with glow */}
      <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--theme-primary-dark-rgb), 0.3), transparent)' }} />

      {/* Center terminal prompt */}
      <div className="relative flex justify-center">
        <div className="bg-zinc-950 px-4 sm:px-6">
          <span className="font-mono text-xs text-zinc-600">
            <span style={{ color: 'var(--theme-primary-darker)' }}>cd</span>
            <span className="text-zinc-500"> ../</span>
            <span style={{ color: 'var(--theme-secondary)' }}>{toSection}</span>
            <span className="animate-pulse ml-1" style={{ color: 'var(--theme-primary)' }}>_</span>
          </span>
        </div>
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(var(--theme-primary-rgb), 0.2) 4px, rgba(var(--theme-primary-rgb), 0.2) 8px)',
        }}
      />
    </div>
  )
}
