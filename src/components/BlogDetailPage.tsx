import { useCallback, useMemo } from 'react'
import { BlogDetail } from './sections/blog'
import { writings } from '../data/site-data'
import type { Writing } from '../types'

interface BlogDetailPageProps {
  slug: string
}

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  // Find the current writing by slug
  const writing = useMemo(() => {
    return writings.find((w) => w.slug === slug)
  }, [slug])

  // Find related posts (posts with overlapping tags)
  const relatedWritings = useMemo(() => {
    if (!writing) return []

    return writings
      .filter((w) => w.id !== writing.id)
      .map((w) => ({
        ...w,
        sharedTags: w.tags.filter((tag) => writing.tags.includes(tag)).length,
      }))
      .filter((w) => w.sharedTags > 0)
      .sort((a, b) => b.sharedTags - a.sharedTags)
      .slice(0, 3) as Writing[]
  }, [writing])

  const handleTagClick = useCallback((tag: string) => {
    // Navigate to blog list with tag filter
    // Using URL params would require more setup, so we'll just go to blog list
    window.location.href = `/blog`
  }, [])

  const handleRelatedPostClick = useCallback((relatedSlug: string) => {
    window.location.href = `/blog/${relatedSlug}`
  }, [])

  const handleBack = useCallback(() => {
    window.location.href = '/blog'
  }, [])

  if (!writing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="text-center">
          <h1 className="mb-4 font-mono text-2xl text-zinc-100">404: Post Not Found</h1>
          <p className="mb-6 font-mono text-sm text-zinc-500">
            The post you're looking for doesn't exist.
          </p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-zinc-800/50 px-4 py-2 font-mono text-sm text-zinc-400 transition-colors hover:border-lime-500/50 hover:text-lime-400"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </a>
        </div>
      </div>
    )
  }

  return (
    <BlogDetail
      writing={writing}
      relatedWritings={relatedWritings}
      onTagClick={handleTagClick}
      onRelatedPostClick={handleRelatedPostClick}
      onBack={handleBack}
    />
  )
}
