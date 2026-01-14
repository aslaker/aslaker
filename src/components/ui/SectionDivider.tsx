interface SectionDividerProps {
  toSection: string
}

export function SectionDivider({ toSection }: SectionDividerProps) {
  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      {/* Horizontal line with glow */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />

      {/* Center terminal prompt */}
      <div className="relative flex justify-center">
        <div className="bg-zinc-950 px-4 sm:px-6">
          <span className="font-mono text-xs text-zinc-600">
            <span className="text-lime-600">cd</span>
            <span className="text-zinc-500"> ../</span>
            <span className="text-emerald-400">{toSection}</span>
            <span className="animate-pulse text-lime-400 ml-1">_</span>
          </span>
        </div>
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(163, 230, 53, 0.2) 4px, rgba(163, 230, 53, 0.2) 8px)',
        }}
      />
    </div>
  )
}
