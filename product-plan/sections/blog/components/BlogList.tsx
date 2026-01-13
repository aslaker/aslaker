import { useMemo, useState } from 'react'
import type { BlogListProps } from '../types'
import { BlogPostCard } from './BlogPostCard'

export function BlogList({
  writings,
  tags,
  activeTag,
  searchQuery = '',
  onTagFilter,
  onSearch,
  onPostClick,
}: BlogListProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery)

  // Filter writings based on active tag and search query
  const filteredWritings = useMemo(() => {
    return writings.filter((writing) => {
      // Tag filter
      if (activeTag && !writing.tags.includes(activeTag)) {
        return false
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          writing.title.toLowerCase().includes(query) ||
          writing.excerpt.toLowerCase().includes(query) ||
          writing.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      }
      return true
    })
  }, [writings, activeTag, searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(localSearch)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    // Optionally trigger search on every keystroke
    onSearch?.(e.target.value)
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-2 font-mono text-sm text-lime-500">
            <span className="text-zinc-600">$</span> cat /blog/index.md
          </div>
          <h1
            className="mb-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Technical Writing
          </h1>
          <p className="max-w-2xl text-lg text-zinc-400">
            Thoughts on AI/agentic engineering, cloud infrastructure, and building things that work.
          </p>
        </header>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Search posts..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-3 pl-12 pr-4 font-mono text-sm text-zinc-100 placeholder-zinc-600 transition-colors focus:border-lime-500/50 focus:outline-none focus:ring-1 focus:ring-lime-500/20"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('')
                  onSearch?.('')
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500 transition-colors hover:text-zinc-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>

          {/* Tag Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-xs text-zinc-600">filter:</span>
            <button
              onClick={() => onTagFilter?.(null)}
              className={`rounded border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
                !activeTag
                  ? 'border-lime-500/50 bg-lime-500/10 text-lime-400'
                  : 'border-zinc-700/50 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
              }`}
            >
              all
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagFilter?.(tag === activeTag ? null : tag)}
                className={`rounded border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
                  activeTag === tag
                    ? 'border-lime-500/50 bg-lime-500/10 text-lime-400'
                    : 'border-zinc-700/50 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                }`}
              >
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 font-mono text-xs text-zinc-500">
          <span className="text-lime-500/70">{'>>'}</span> showing {filteredWritings.length} of{' '}
          {writings.length} posts
          {activeTag && (
            <span>
              {' '}
              tagged <span className="text-lime-400">#{activeTag.toLowerCase().replace(/\s+/g, '-')}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {' '}
              matching <span className="text-lime-400">"{searchQuery}"</span>
            </span>
          )}
        </div>

        {/* Posts List */}
        {filteredWritings.length > 0 ? (
          <div className="space-y-4">
            {filteredWritings.map((writing, index) => (
              <div
                key={writing.id}
                className="animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
              >
                <BlogPostCard
                  writing={writing}
                  onTagClick={(tag) => onTagFilter?.(tag)}
                  onClick={() => onPostClick?.(writing.slug)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 py-16 text-center">
            <div className="mb-4 rounded-full bg-zinc-800/50 p-4">
              <svg
                className="h-8 w-8 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <p className="mb-1 font-mono text-sm text-zinc-400">No posts found</p>
            <p className="font-mono text-xs text-zinc-600">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setLocalSearch('')
                onSearch?.('')
                onTagFilter?.(null)
              }}
              className="mt-4 rounded border border-zinc-700 bg-zinc-800/50 px-4 py-2 font-mono text-xs text-zinc-400 transition-colors hover:border-lime-500/50 hover:text-lime-400"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Decorative footer element */}
        <div className="mt-12 border-t border-zinc-800/50 pt-8">
          <div className="font-mono text-xs text-zinc-700">
            <span className="text-zinc-600">{'/*'}</span> EOF <span className="text-zinc-600">{'*/'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
