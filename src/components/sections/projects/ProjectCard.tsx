import type { Project } from '../../../types'
import { PROJECT_PHASES } from '../../../data/site-data'

const PHASE_COLOR_CLASSES = {
  zinc: 'text-zinc-400 border-zinc-500/40',
  purple: 'text-purple-400 border-purple-500/40',
  blue: 'text-blue-400 border-blue-500/40',
  amber: 'text-amber-400 border-amber-500/40',
  lime: 'text-lime-400 border-lime-500/40',
  emerald: 'text-emerald-400 border-emerald-500/40',
}

interface ProjectCardProps {
  project: Project
  index: number
  onSelect?: () => void
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const phaseData = PROJECT_PHASES[project.phase]
  const colorClasses = PHASE_COLOR_CLASSES[phaseData.color]

  return (
    <button
      onClick={onSelect}
      className="group relative flex w-full flex-col rounded-lg bg-zinc-950 p-5 text-left transition-all duration-300 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-950 sm:p-6"
      style={{
        animation: `matrixFadeIn 0.5s ease-out ${index * 0.15}s both`,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(var(--theme-primary-dark-rgb), 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-rgb), 0.6)'
        e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--theme-primary-dark-rgb), 0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-dark-rgb), 0.3)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 2px rgba(var(--theme-primary-dark-rgb), 0.5)`
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] opacity-50" />

      {/* CRT glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'linear-gradient(to bottom, rgba(var(--theme-primary-dark-rgb), 0.05), transparent)' }} />

      {/* Terminal header */}
      <div className="mb-4 flex items-center gap-2 pb-3" style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(var(--theme-primary-dark-rgb), 0.2)' }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'rgba(var(--theme-primary-dark-rgb), 0.7)' }} />
        </div>
        <span className="flex-1 truncate font-mono text-xs" style={{ color: 'rgba(var(--theme-primary-dark-rgb), 0.5)' }}>
          ~/projects/{project.id}
        </span>
        <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${colorClasses}`}>
          {phaseData.label}
        </span>
      </div>

      {/* Logo/Icon area */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded bg-zinc-900 sm:h-16 sm:w-16" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(var(--theme-primary-dark-rgb), 0.2)' }}>
        {project.logoUrl ? (
          <img
            src={project.logoUrl}
            alt={`${project.title} logo`}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
        ) : (
          <div className="font-mono text-xl sm:text-2xl" style={{ color: 'var(--theme-primary)' }}>
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="mb-3 font-mono text-base font-bold tracking-tight sm:text-lg" style={{ color: 'var(--theme-primary)' }}>
        <span style={{ color: 'var(--theme-primary-darker)' }}>&gt; </span>
        {project.title}
        <span className="ml-1 inline-block h-4 w-2 animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }} />
      </h3>

      {/* Short description */}
      <p className="mb-5 line-clamp-2 font-mono text-xs leading-relaxed text-zinc-300 sm:text-sm sm:leading-relaxed">
        {project.shortDescription}
      </p>

      {/* Tags */}
      <div className="mb-auto flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded px-2 py-1 font-mono text-xs"
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(var(--theme-secondary-dark-rgb), 0.3)',
              backgroundColor: 'rgba(var(--theme-secondary-dark-rgb), 0.1)',
              color: 'var(--theme-secondary)',
            }}
          >
            [{tag}]
          </span>
        ))}
      </div>

      {/* Technologies */}
      <div className="mt-6 border-t border-zinc-800 pt-4">
        <div className="flex flex-wrap gap-x-1 gap-y-1">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={tech}
              className="font-mono text-xs text-zinc-500 group-hover:text-zinc-400"
            >
              {tech}
              {idx < Math.min(project.technologies.length - 1, 3) && (
                <span style={{ color: 'var(--theme-primary-darker)' }}> | </span>
              )}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-xs text-zinc-600">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Keyframes for animation */}
      <style>{`
        @keyframes matrixFadeIn {
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
    </button>
  )
}
