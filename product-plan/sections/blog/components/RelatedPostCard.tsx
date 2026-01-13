import type { Writing } from '../types'

interface RelatedPostCardProps {
  writing: Writing
  onClick?: () => void
}

export function RelatedPostCard({ writing, onClick }: RelatedPostCardProps) {
  const formattedDate = new Date(writing.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <article
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-900/50 transition-all duration-300 hover:border-lime-500/30 hover:bg-zinc-900"
    >
      {/* Thumbnail */}
      {writing.thumbnailImage && (
        <div className="relative h-32 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <img
            src={writing.thumbnailImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-30" />
        </div>
      )}

      {/* No image placeholder */}
      {!writing.thumbnailImage && (
        <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-zinc-800/50 to-zinc-900">
          <div className="font-mono text-2xl text-zinc-700">{'{ }'}</div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Meta */}
        <div className="mb-2 flex items-center gap-2 font-mono text-xs text-zinc-500">
          <span className="text-lime-500/70">//</span>
          <time dateTime={writing.publishedAt}>{formattedDate}</time>
          <span className="text-zinc-700">•</span>
          <span>{writing.readTime} min</span>
        </div>

        {/* Title */}
        <h3
          className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-200 transition-colors duration-200 group-hover:text-lime-400"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {writing.title}
        </h3>
      </div>

      {/* Corner accent */}
      <div className="absolute right-0 top-0 h-6 w-6 overflow-hidden">
        <div className="absolute -right-3 -top-3 h-6 w-6 rotate-45 bg-gradient-to-br from-lime-500/20 to-transparent transition-all duration-300 group-hover:from-lime-500/40" />
      </div>
    </article>
  )
}
