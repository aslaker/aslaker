import type { Service } from '../types'

interface ServiceCardProps {
  service: Service
  index: number
}

const icons = {
  brain: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 4.5C10.5 4.5 9 5.5 9 7c0 1-1 2-2 2-1.5 0-2.5 1.5-2.5 3s1 3 2.5 3c1 0 2 1 2 2 0 1.5 1.5 2.5 3 2.5s3-1 3-2.5c0-1 1-2 2-2 1.5 0 2.5-1.5 2.5-3s-1-3-2.5-3c-1 0-2-1-2-2 0-1.5-1.5-2.5-3-2.5z" />
      <path d="M12 8v4M10 10h4" strokeLinecap="round" />
    </svg>
  ),
  globe: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10" />
      <path d="M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10" />
    </svg>
  ),
  users: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <path d="M15 15c2 0 4 1.5 4 4" />
    </svg>
  ),
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-lime-500/50 hover:bg-zinc-900 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)]"
      style={{
        animation: `serviceSlideIn 0.6s ease-out ${index * 0.1 + 0.3}s both`,
      }}
    >
      {/* Corner accent */}
      <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden">
        <div className="absolute -right-8 -top-8 h-16 w-16 rotate-45 bg-gradient-to-b from-lime-500/20 to-transparent" />
      </div>

      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lime-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

      {/* Icon */}
      <div className="mb-4 inline-flex items-center justify-center rounded border border-zinc-700/50 bg-zinc-800/50 p-3 text-lime-500 transition-all duration-300 group-hover:border-lime-500/50 group-hover:text-lime-400 group-hover:shadow-[0_0_15px_rgba(163,230,53,0.2)]">
        {icons[service.icon]}
      </div>

      {/* Title */}
      <h3 className="mb-3 font-mono text-lg font-medium text-zinc-100 transition-colors duration-300 group-hover:text-lime-50">
        {service.title}
      </h3>

      {/* Description */}
      <p className="mb-4 grow text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
        {service.description}
      </p>

      {/* Pricing placeholder */}
      <div className="inline-block self-start rounded border border-dashed border-zinc-700 bg-zinc-800/30 px-3 py-1.5 font-mono text-xs text-zinc-500 transition-all duration-300 group-hover:border-lime-500/30 group-hover:text-zinc-400">
        {service.placeholder}
      </div>

      {/* Animated bottom border on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
    </div>
  )
}
