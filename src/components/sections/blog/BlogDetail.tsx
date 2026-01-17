import { useMemo } from 'react'
import type { BlogDetailProps } from './types'
import { RelatedPostCard } from './RelatedPostCard'

// Simple markdown parser for the content
// In production, you'd use a library like react-markdown with rehype-highlight
function parseMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  let codeBlockLang = ''
  let keyIndex = 0

  const getKey = () => `md-${keyIndex++}`

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block handling
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeBlockLang = line.slice(3).trim()
        codeBlockContent = []
      } else {
        // End of code block
        elements.push(
          <div key={getKey()} className="group relative my-6">
            {/* Language badge */}
            {codeBlockLang && (
              <div className="absolute -top-3 left-4 z-10 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-xs text-lime-400">
                {codeBlockLang}
              </div>
            )}
            {/* Code block */}
            <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/80 p-4 pt-6">
              <code className="font-mono text-sm leading-relaxed text-zinc-300">
                {codeBlockContent.join('\n')}
              </code>
            </pre>
            {/* Decorative line numbers gutter effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 rounded-l-lg bg-gradient-to-r from-zinc-800/30 to-transparent" />
          </div>
        )
        inCodeBlock = false
        codeBlockLang = ''
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }

    // Empty lines
    if (line.trim() === '') {
      continue
    }

    // H1
    if (line.startsWith('# ')) {
      // Skip H1 as we render title separately
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={getKey()}
          className="mb-4 mt-10 text-2xl font-bold text-zinc-100"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <span className="mr-2 text-lime-500/50">##</span>
          {line.slice(3)}
        </h2>
      )
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={getKey()}
          className="mb-3 mt-8 text-xl font-semibold text-zinc-200"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {line.slice(4)}
        </h3>
      )
      continue
    }

    // List items
    if (line.startsWith('- ')) {
      elements.push(
        <li key={getKey()} className="mb-2 flex items-start gap-3 text-zinc-300">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500/50" />
          <span>{parseInlineMarkdown(line.slice(2))}</span>
        </li>
      )
      continue
    }

    // Numbered list items
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (numberedMatch) {
      elements.push(
        <li key={getKey()} className="mb-2 flex items-start gap-3 text-zinc-300">
          <span className="shrink-0 font-mono text-sm text-lime-500/70">{numberedMatch[1]}.</span>
          <span>{parseInlineMarkdown(numberedMatch[2])}</span>
        </li>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={getKey()} className="mb-4 leading-relaxed text-zinc-300">
        {parseInlineMarkdown(line)}
      </p>
    )
  }

  return elements
}

// Parse inline markdown (bold, italic, code, links)
function parseInlineMarkdown(text: string): React.ReactNode {
  // Simple implementation - in production use a proper parser
  const parts: React.ReactNode[] = []
  let remaining = text
  let keyIndex = 0

  const getKey = () => `inline-${keyIndex++}`

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      parts.push(
        <code
          key={getKey()}
          className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-lime-400"
        >
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Bold
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/)
    if (boldMatch) {
      parts.push(
        <strong key={getKey()} className="font-semibold text-zinc-100">
          {boldMatch[1]}
        </strong>
      )
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Link
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      parts.push(
        <a
          key={getKey()}
          href={linkMatch[2]}
          className="text-lime-400 underline decoration-lime-400/30 underline-offset-2 transition-colors hover:text-lime-300 hover:decoration-lime-300/50"
        >
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Regular text - find next special character or end
    const nextSpecial = remaining.search(/[`*\[]/)
    if (nextSpecial === -1) {
      parts.push(remaining)
      break
    } else if (nextSpecial === 0) {
      // If we're at a special char but didn't match, treat it as regular text
      parts.push(remaining[0])
      remaining = remaining.slice(1)
    } else {
      parts.push(remaining.slice(0, nextSpecial))
      remaining = remaining.slice(nextSpecial)
    }
  }

  return parts.length === 1 ? parts[0] : parts
}

export function BlogDetail({
  writing,
  relatedWritings,
  onTagClick,
  onRelatedPostClick,
  onBack,
}: BlogDetailProps) {
  const formattedDate = new Date(writing.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const renderedContent = useMemo(() => parseMarkdown(writing.content), [writing.content])

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header Image */}
      {writing.headerImage && (
        <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          <img
            src={writing.headerImage}
            alt={`Header image for ${writing.title}`}
            className="h-full w-full object-cover"
          />
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => onBack?.()}
          aria-label="Go back to all posts"
          className="group mb-8 flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-lime-400"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>cd ..</span>
        </button>

        {/* Article Header */}
        <header className={writing.headerImage ? '' : 'mt-4'}>
          {/* Meta line */}
          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-sm text-zinc-500">
            <time dateTime={writing.publishedAt} className="flex items-center gap-1.5">
              <span className="text-lime-500/70">//</span>
              {formattedDate}
            </time>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-zinc-600"
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
              {writing.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-6 text-3xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {writing.title}
          </h1>

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {writing.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="rounded border border-zinc-700/50 bg-zinc-800/50 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-all duration-200 hover:border-lime-500/50 hover:bg-lime-500/10 hover:text-lime-400"
              >
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            <span className="font-mono text-xs text-zinc-700">{'<article>'}</span>
            <div className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent" />
          </div>
        </header>

        {/* Article Content */}
        <article className="prose-zinc prose-lg max-w-none">
          {renderedContent}
        </article>

        {/* End divider */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          <span className="font-mono text-xs text-zinc-700">{'</article>'}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent" />
        </div>

        {/* Related Posts */}
        {relatedWritings.length > 0 && (
          <section className="mt-12">
            <h2
              className="mb-6 text-xl font-semibold text-zinc-200"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="mr-2 text-lime-500/50">//</span>
              Related Posts
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWritings.map((related) => (
                <RelatedPostCard
                  key={related.id}
                  writing={related}
                  onClick={() => onRelatedPostClick?.(related.slug)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-800/50 pt-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onBack?.()}
              aria-label="Go back to all posts"
              className="group flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-lime-400"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to all posts</span>
            </button>
            <div className="font-mono text-xs text-zinc-700">
              <span className="text-zinc-600">{'/*'}</span> EOF <span className="text-zinc-600">{'*/'}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
