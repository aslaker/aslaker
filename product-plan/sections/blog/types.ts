// =============================================================================
// Data Types
// =============================================================================

export interface Writing {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  thumbnailImage: string | null
  headerImage: string | null
  publishedAt: string
  readTime: number
  tags: string[]
}

export type Tag = string

// =============================================================================
// Component Props
// =============================================================================

export interface BlogListProps {
  /** The list of blog posts to display */
  writings: Writing[]
  /** All available tags for filtering */
  tags: Tag[]
  /** The currently active tag filter (if any) */
  activeTag?: Tag | null
  /** The current search query (if any) */
  searchQuery?: string
  /** Called when user clicks a tag to filter */
  onTagFilter?: (tag: Tag | null) => void
  /** Called when user updates the search query */
  onSearch?: (query: string) => void
  /** Called when user clicks a post to view details */
  onPostClick?: (slug: string) => void
}

export interface BlogDetailProps {
  /** The blog post to display */
  writing: Writing
  /** Related posts to show at the bottom */
  relatedWritings: Writing[]
  /** Called when user clicks a tag */
  onTagClick?: (tag: Tag) => void
  /** Called when user clicks a related post */
  onRelatedPostClick?: (slug: string) => void
  /** Called when user wants to go back to the list */
  onBack?: () => void
}
