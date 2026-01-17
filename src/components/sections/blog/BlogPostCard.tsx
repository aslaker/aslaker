import type { BlogPostCardProps } from './types'

export function BlogPostCard({ writing, onTagClick, onClick }: BlogPostCardProps) {
  const formattedDate = new Date(writing.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <article
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${writing.title}`}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-900/50 transition-all duration-300 hover:border-lime-500/30 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-lime-500/10 via-emerald-500/5 to-transparent" />
      </div>

      <div className="relative flex flex-col sm:flex-row">
        {/* Thumbnail */}
        {writing.thumbnailImage && (
          <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48 md:w-56">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent sm:bg-gradient-to-r" />
            <img
              src={writing.thumbnailImage}
              alt={`Thumbnail for ${writing.title}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-30" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Meta line */}
          <div className="mb-3 flex items-center gap-3 font-mono text-xs text-zinc-500">
            <time dateTime={writing.publishedAt} className="flex items-center gap-1.5">
              <span className="text-lime-500/70">//</span>
              {formattedDate}
            </time>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {writing.readTime} min
            </span>
          </div>

          {/* Title */}
          <h2
            className="mb-2 text-lg font-semibold leading-snug text-zinc-100 transition-colors duration-200 group-hover:text-lime-400 sm:text-xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {writing.title}
          </h2>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-400">
            {writing.excerpt}
          </p>

          {/* Tags */}
          {writing.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {writing.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.stopPropagation()
                    onTagClick?.(tag)
                  }}
                  className="rounded border border-zinc-700/50 bg-zinc-800/50 px-2.5 py-1 font-mono text-xs text-zinc-400 transition-all duration-200 hover:border-lime-500/50 hover:bg-lime-500/10 hover:text-lime-400"
                >
                  #{tag.toLowerCase().replace(/\s+/g, '-')}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute right-0 top-0 h-8 w-8 overflow-hidden">
        <div className="absolute -right-4 -top-4 h-8 w-8 rotate-45 bg-gradient-to-br from-lime-500/20 to-transparent transition-all duration-300 group-hover:from-lime-500/40" />
      </div>
    </article>
  )
}
