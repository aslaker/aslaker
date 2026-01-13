import { useState, useCallback } from 'react'
import { BlogList } from './sections/blog'
import { writings, blogTags } from '../data/site-data'
import type { Tag } from './sections/blog'

export function BlogListPage() {
  const [activeTag, setActiveTag] = useState<Tag | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleTagFilter = useCallback((tag: Tag | null) => {
    setActiveTag(tag)
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handlePostClick = useCallback((slug: string) => {
    window.location.href = `/blog/${slug}`
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation header */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="group flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-lime-400"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>cd ~</span>
          </a>
          <span className="font-mono text-xs text-zinc-600">adamslaker.dev/blog</span>
        </div>
      </nav>

      {/* Main content with top padding for fixed nav */}
      <div className="pt-16">
        <BlogList
          writings={writings}
          tags={blogTags}
          activeTag={activeTag}
          searchQuery={searchQuery}
          onTagFilter={handleTagFilter}
          onSearch={handleSearch}
          onPostClick={handlePostClick}
        />
      </div>
    </div>
  )
}
