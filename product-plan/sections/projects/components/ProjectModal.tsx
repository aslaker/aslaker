import type { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose?: () => void
  onGitHubClick?: (url: string) => void
  onDemoClick?: (url: string) => void
}

export function ProjectModal({
  project,
  onClose,
  onGitHubClick,
  onDemoClick,
}: ProjectModalProps) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with matrix rain effect */}
      <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm">
        {/* Animated scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(132,204,22,0.03)_2px,rgba(132,204,22,0.03)_4px)] animate-pulse" />
      </div>

      {/* Modal container */}
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg border border-lime-500/40 bg-zinc-950 shadow-[0_0_60px_rgba(132,204,22,0.2)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'modalSlideIn 0.3s ease-out',
        }}
      >
        {/* Terminal header bar */}
        <div className="flex items-center justify-between border-b border-lime-500/30 bg-zinc-900/80 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-400"
                aria-label="Close modal"
              />
              <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <span className="h-3 w-3 rounded-full bg-lime-500/50" />
            </div>
            <span className="font-mono text-xs text-lime-500/70">
              project --view {project.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-zinc-500 transition-colors hover:text-lime-400"
          >
            [ESC]
          </button>
        </div>

        {/* Scrollable content */}
        <div className="max-h-[calc(90vh-60px)] overflow-y-auto p-6">
          {/* Project header */}
          <div className="mb-6">
            <div className="mb-4 flex items-start gap-4">
              {/* Logo placeholder */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded border border-lime-500/30 bg-zinc-900">
                <span className="font-mono text-3xl text-lime-400">
                  {project.title.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                <h2 className="mb-2 font-mono text-2xl font-bold text-lime-400">
                  <span className="text-lime-600">$ </span>
                  {project.title}
                </h2>
                <p className="font-mono text-sm leading-relaxed text-zinc-400">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-emerald-500/40 bg-emerald-950/50 px-3 py-1 font-mono text-xs text-emerald-400"
                >
                  [{tag}]
                </span>
              ))}
            </div>
          </div>

          {/* Full description */}
          <div className="mb-6 rounded border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-2 font-mono text-xs text-lime-500/70">
              # README.md
            </div>
            <div className="space-y-4 font-mono text-sm leading-relaxed text-zinc-300">
              {project.fullDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <div className="mb-3 font-mono text-xs text-lime-500/70">
              # Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-mono text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          {project.screenshots.length > 0 && (
            <div className="mb-6">
              <div className="mb-3 font-mono text-xs text-lime-500/70">
                # Screenshots ({project.screenshots.length})
              </div>
              <div className="grid gap-3">
                {project.screenshots.map((screenshot, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded border border-zinc-800 bg-zinc-900 p-2"
                  >
                    <div className="flex h-full items-center justify-center font-mono text-xs text-zinc-600">
                      [Screenshot {i + 1}]
                      <br />
                      {screenshot}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-6">
            {project.githubUrl && (
              <button
                onClick={() => onGitHubClick?.(project.githubUrl!)}
                className="group flex items-center gap-2 rounded border border-lime-500/40 bg-lime-950/30 px-4 py-2.5 font-mono text-sm text-lime-400 transition-all hover:border-lime-400 hover:bg-lime-950/50 hover:shadow-[0_0_20px_rgba(132,204,22,0.2)]"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>git clone</span>
                <span className="text-lime-600 opacity-0 transition-opacity group-hover:opacity-100">
                  _
                </span>
              </button>
            )}

            {project.demoUrl && (
              <button
                onClick={() => onDemoClick?.(project.demoUrl!)}
                className="group flex items-center gap-2 rounded border border-emerald-500/40 bg-emerald-950/30 px-4 py-2.5 font-mono text-sm text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-950/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>Live Demo</span>
                <span className="text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100">
                  _
                </span>
              </button>
            )}

            {!project.githubUrl && !project.demoUrl && (
              <div className="font-mono text-sm text-zinc-600">
                <span className="text-yellow-500/70">[!</span> Links unavailable
                - project in stealth mode
                <span className="text-yellow-500/70">]</span>
              </div>
            )}
          </div>
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes modalSlideIn {
            0% {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
