import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BlogList } from './BlogList'
import { BlogDetail } from './BlogDetail'
import { BlogPostCard } from './BlogPostCard'
import { RelatedPostCard } from './RelatedPostCard'
import type { Writing, Tag } from './types'

// =============================================================================
// Test Data
// =============================================================================

const mockWritings: Writing[] = [
  {
    id: 'writing-001',
    slug: 'building-autonomous-agents-with-claude',
    title: 'Building Autonomous Agents with Claude',
    excerpt: 'After months of building Auto-Claude, I learned key lessons about autonomous systems.',
    content: '# Building Autonomous Agents with Claude\n\nSome **bold** content here.\n\n## Key Takeaways\n\n1. First point\n2. Second point\n\n```typescript\nconst foo = "bar";\n```',
    thumbnailImage: '/images/blog/thumb.jpg',
    headerImage: '/images/blog/header.jpg',
    publishedAt: '2024-12-15',
    readTime: 8,
    tags: ['Agentic AI', 'Claude', 'TypeScript'],
  },
  {
    id: 'writing-002',
    slug: 'terraform-patterns-for-ai',
    title: 'Terraform Patterns for AI Workloads',
    excerpt: 'GPU instances are expensive and tricky to manage.',
    content: '# Terraform Patterns\n\nContent here.',
    thumbnailImage: '/images/blog/terraform-thumb.jpg',
    headerImage: '/images/blog/terraform-header.jpg',
    publishedAt: '2024-11-28',
    readTime: 6,
    tags: ['Cloud Ops', 'Terraform', 'AI Infrastructure'],
  },
  {
    id: 'writing-003',
    slug: 'type-safe-llm-outputs',
    title: 'Type-Safe LLM Outputs',
    excerpt: 'Using Zod schemas for structured generation.',
    content: '# Type-Safe Outputs\n\nContent here.',
    thumbnailImage: null,
    headerImage: '/images/blog/zod-header.jpg',
    publishedAt: '2024-11-10',
    readTime: 5,
    tags: ['TypeScript', 'Agentic AI', 'Zod'],
  },
  {
    id: 'writing-004',
    slug: 'why-i-stopped-using-langchain',
    title: 'Why I Stopped Using LangChain',
    excerpt: 'LangChain is powerful but often overkill.',
    content: '# Why I Stopped Using LangChain\n\nContent here.',
    thumbnailImage: null,
    headerImage: null,
    publishedAt: '2024-10-22',
    readTime: 7,
    tags: ['Agentic AI', 'Architecture', 'Opinion'],
  },
  {
    id: 'writing-005',
    slug: 'real-time-iss-tracking-with-react',
    title: 'Real-Time ISS Tracking with React',
    excerpt: 'Building Ephemeris, my open-source ISS tracker.',
    content: '# Real-Time ISS Tracking\n\nContent here.',
    thumbnailImage: '/images/blog/ephemeris-thumb.jpg',
    headerImage: '/images/blog/ephemeris-header.jpg',
    publishedAt: '2024-09-15',
    readTime: 10,
    tags: ['React', 'Open Source', 'TypeScript'],
  },
]

const mockTags: Tag[] = [
  'Agentic AI',
  'TypeScript',
  'Claude',
  'Cloud Ops',
  'Terraform',
  'AI Infrastructure',
  'Zod',
  'Architecture',
  'Opinion',
  'React',
  'Open Source',
]

const mockEmptyWritings: Writing[] = []

// =============================================================================
// Flow 1: Browse All Posts
// =============================================================================

describe('Flow 1: Browse All Posts', () => {
  it('should render all posts as cards', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
      />
    )

    // All 5 posts should be visible
    expect(screen.getByText('Building Autonomous Agents with Claude')).toBeInTheDocument()
    expect(screen.getByText('Terraform Patterns for AI Workloads')).toBeInTheDocument()
    expect(screen.getByText('Type-Safe LLM Outputs')).toBeInTheDocument()
    expect(screen.getByText('Why I Stopped Using LangChain')).toBeInTheDocument()
    expect(screen.getByText('Real-Time ISS Tracking with React')).toBeInTheDocument()
  })

  it('should show title, excerpt, date, and read time on each card', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
      />
    )

    // Check first post has title, excerpt, date, read time
    expect(screen.getByText('Building Autonomous Agents with Claude')).toBeInTheDocument()
    expect(screen.getByText(/After months of building Auto-Claude/)).toBeInTheDocument()
    expect(screen.getByText('8 min')).toBeInTheDocument()
    // Date formatting can vary by timezone, check for Dec and year
    expect(screen.getByText(/Dec 1[45], 2024/)).toBeInTheDocument()
  })

  it('should show tags on each card', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
      />
    )

    // Tags should be visible (formatted as #tag-name)
    expect(screen.getAllByText('#agentic-ai').length).toBeGreaterThan(0)
    expect(screen.getAllByText('#claude').length).toBeGreaterThan(0)
  })
})

// =============================================================================
// Flow 2: Filter by Tag
// =============================================================================

describe('Flow 2: Filter by Tag', () => {
  it('should call onTagFilter when a tag button is clicked', () => {
    const onTagFilter = vi.fn()

    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        onTagFilter={onTagFilter}
      />
    )

    // Click on a tag in the filter bar (first one should be Agentic AI)
    // Use getAllByRole since tags appear in both filter bar and post cards
    const tagButtons = screen.getAllByRole('button', { name: '#agentic-ai' })
    // First one in filter bar
    fireEvent.click(tagButtons[0])

    expect(onTagFilter).toHaveBeenCalledWith('Agentic AI')
  })

  it('should show only posts with active tag when filtered', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        activeTag="Cloud Ops"
      />
    )

    // Only Cloud Ops posts should be visible
    expect(screen.getByText('Terraform Patterns for AI Workloads')).toBeInTheDocument()

    // Other posts should not be visible
    expect(screen.queryByText('Building Autonomous Agents with Claude')).not.toBeInTheDocument()
  })

  it('should highlight the active tag', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        activeTag="Agentic AI"
      />
    )

    // Use getAllByRole since the tag appears in both filter bar and cards
    const tagButtons = screen.getAllByRole('button', { name: '#agentic-ai' })
    // First one (in filter bar) should have active styling
    expect(tagButtons[0]).toHaveClass('border-lime-500/50')
  })
})

// =============================================================================
// Flow 3: Clear Tag Filter
// =============================================================================

describe('Flow 3: Clear Tag Filter', () => {
  it('should call onTagFilter with null when "all" button is clicked', () => {
    const onTagFilter = vi.fn()

    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        activeTag="Agentic AI"
        onTagFilter={onTagFilter}
      />
    )

    // Click "all" button to clear filter
    const allButton = screen.getByRole('button', { name: 'all' })
    fireEvent.click(allButton)

    expect(onTagFilter).toHaveBeenCalledWith(null)
  })

  it('should show all posts when no active tag', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        activeTag={null}
      />
    )

    // All posts should be visible
    expect(screen.getByText('Building Autonomous Agents with Claude')).toBeInTheDocument()
    expect(screen.getByText('Terraform Patterns for AI Workloads')).toBeInTheDocument()
    expect(screen.getByText('Type-Safe LLM Outputs')).toBeInTheDocument()
  })
})

// =============================================================================
// Flow 4: Search Posts
// =============================================================================

describe('Flow 4: Search Posts', () => {
  it('should call onSearch when user types in search input', () => {
    const onSearch = vi.fn()

    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        onSearch={onSearch}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search posts...')
    fireEvent.change(searchInput, { target: { value: 'autonomous' } })

    expect(onSearch).toHaveBeenCalledWith('autonomous')
  })

  it('should filter posts based on search query', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        searchQuery="autonomous"
      />
    )

    // Posts matching "autonomous" should be visible
    expect(screen.getByText('Building Autonomous Agents with Claude')).toBeInTheDocument()

    // Non-matching posts should be hidden
    expect(screen.queryByText('Terraform Patterns for AI Workloads')).not.toBeInTheDocument()
  })

  it('should search case-insensitively', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        searchQuery="TERRAFORM"
      />
    )

    expect(screen.getByText('Terraform Patterns for AI Workloads')).toBeInTheDocument()
  })
})

// =============================================================================
// Flow 5: Read Full Article
// =============================================================================

describe('Flow 5: Read Full Article', () => {
  it('should call onPostClick with slug when post card is clicked', () => {
    const onPostClick = vi.fn()

    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        onPostClick={onPostClick}
      />
    )

    // Click on the first post
    const firstPostTitle = screen.getByText('Building Autonomous Agents with Claude')
    fireEvent.click(firstPostTitle.closest('article')!)

    expect(onPostClick).toHaveBeenCalledWith('building-autonomous-agents-with-claude')
  })

  it('should render full article on detail page', () => {
    const writing = mockWritings[0]

    render(
      <BlogDetail
        writing={writing}
        relatedWritings={mockWritings.slice(1, 4)}
      />
    )

    // Should show full title
    expect(screen.getByText('Building Autonomous Agents with Claude')).toBeInTheDocument()

    // Should show date (allow for timezone variations)
    expect(screen.getByText(/December 1[45], 2024/)).toBeInTheDocument()

    // Should show read time
    expect(screen.getByText(/8 min read/)).toBeInTheDocument()

    // Should render markdown content (check for heading)
    expect(screen.getByText('Key Takeaways')).toBeInTheDocument()
  })

  it('should render code blocks in article', () => {
    const writing = mockWritings[0]

    render(
      <BlogDetail
        writing={writing}
        relatedWritings={[]}
      />
    )

    // Code block content should be visible
    expect(screen.getByText(/const foo = "bar"/)).toBeInTheDocument()
  })
})

// =============================================================================
// Flow 6: Navigate to Related Post
// =============================================================================

describe('Flow 6: Navigate to Related Post', () => {
  it('should call onRelatedPostClick when related post is clicked', () => {
    const onRelatedPostClick = vi.fn()
    const writing = mockWritings[0]
    const relatedWritings = mockWritings.slice(1, 4)

    render(
      <BlogDetail
        writing={writing}
        relatedWritings={relatedWritings}
        onRelatedPostClick={onRelatedPostClick}
      />
    )

    // Click on a related post
    const relatedPost = screen.getByText('Terraform Patterns for AI Workloads')
    fireEvent.click(relatedPost.closest('article')!)

    expect(onRelatedPostClick).toHaveBeenCalledWith('terraform-patterns-for-ai')
  })

  it('should display related posts section', () => {
    const writing = mockWritings[0]
    const relatedWritings = mockWritings.slice(1, 4)

    render(
      <BlogDetail
        writing={writing}
        relatedWritings={relatedWritings}
      />
    )

    // Should show "Related Posts" heading
    expect(screen.getByText('Related Posts')).toBeInTheDocument()

    // Should show related post titles
    expect(screen.getByText('Terraform Patterns for AI Workloads')).toBeInTheDocument()
    expect(screen.getByText('Type-Safe LLM Outputs')).toBeInTheDocument()
  })
})

// =============================================================================
// Flow 7: Return to List
// =============================================================================

describe('Flow 7: Return to List', () => {
  it('should call onBack when back button is clicked', () => {
    const onBack = vi.fn()
    const writing = mockWritings[0]

    render(
      <BlogDetail
        writing={writing}
        relatedWritings={[]}
        onBack={onBack}
      />
    )

    // Click back button (labeled "cd ..")
    const backButton = screen.getByText('cd ..')
    fireEvent.click(backButton)

    expect(onBack).toHaveBeenCalled()
  })
})

// =============================================================================
// Empty State Tests
// =============================================================================

describe('Empty State Tests', () => {
  it('should show empty message when no posts exist', () => {
    render(
      <BlogList
        writings={mockEmptyWritings}
        tags={[]}
      />
    )

    expect(screen.getByText(/No posts found/i)).toBeInTheDocument()
  })

  it('should show empty message when search returns no results', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        searchQuery="xyznotfound"
      />
    )

    expect(screen.getByText(/No posts found/i)).toBeInTheDocument()
  })

  it('should offer option to clear filters when no results', () => {
    const onSearch = vi.fn()
    const onTagFilter = vi.fn()

    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        searchQuery="xyznotfound"
        onSearch={onSearch}
        onTagFilter={onTagFilter}
      />
    )

    const clearButton = screen.getByRole('button', { name: /clear filters/i })
    fireEvent.click(clearButton)

    expect(onSearch).toHaveBeenCalledWith('')
    expect(onTagFilter).toHaveBeenCalledWith(null)
  })
})

// =============================================================================
// Component Tests: BlogPostCard
// =============================================================================

describe('BlogPostCard Component', () => {
  it('should render post title', () => {
    render(
      <BlogPostCard
        writing={mockWritings[0]}
      />
    )

    expect(screen.getByText('Building Autonomous Agents with Claude')).toBeInTheDocument()
  })

  it('should render excerpt', () => {
    render(
      <BlogPostCard
        writing={mockWritings[0]}
      />
    )

    expect(screen.getByText(/After months of building Auto-Claude/)).toBeInTheDocument()
  })

  it('should render formatted date', () => {
    render(
      <BlogPostCard
        writing={mockWritings[0]}
      />
    )

    // Allow for timezone variations
    expect(screen.getByText(/Dec 1[45], 2024/)).toBeInTheDocument()
  })

  it('should render read time', () => {
    render(
      <BlogPostCard
        writing={mockWritings[0]}
      />
    )

    expect(screen.getByText('8 min')).toBeInTheDocument()
  })

  it('should render tag chips', () => {
    render(
      <BlogPostCard
        writing={mockWritings[0]}
      />
    )

    expect(screen.getByText('#agentic-ai')).toBeInTheDocument()
    expect(screen.getByText('#claude')).toBeInTheDocument()
  })

  it('should handle posts without thumbnail', () => {
    render(
      <BlogPostCard
        writing={mockWritings[2]} // This one has null thumbnailImage
      />
    )

    // Should still render without crashing
    expect(screen.getByText('Type-Safe LLM Outputs')).toBeInTheDocument()
  })
})

// =============================================================================
// Component Tests: RelatedPostCard
// =============================================================================

describe('RelatedPostCard Component', () => {
  it('should render title', () => {
    render(
      <RelatedPostCard
        writing={mockWritings[1]}
      />
    )

    expect(screen.getByText('Terraform Patterns for AI Workloads')).toBeInTheDocument()
  })

  it('should render date and read time', () => {
    render(
      <RelatedPostCard
        writing={mockWritings[1]}
      />
    )

    // Allow for timezone variations
    expect(screen.getByText(/Nov 2[78]/)).toBeInTheDocument()
    expect(screen.getByText(/6 min/)).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const onClick = vi.fn()

    render(
      <RelatedPostCard
        writing={mockWritings[1]}
        onClick={onClick}
      />
    )

    const card = screen.getByText('Terraform Patterns for AI Workloads').closest('article')!
    fireEvent.click(card)

    expect(onClick).toHaveBeenCalled()
  })

  it('should show placeholder for posts without thumbnail', () => {
    render(
      <RelatedPostCard
        writing={mockWritings[3]} // No thumbnail
      />
    )

    // Should show placeholder text
    expect(screen.getByText('{ }')).toBeInTheDocument()
  })
})

// =============================================================================
// Edge Cases
// =============================================================================

describe('Edge Cases', () => {
  it('should handle combined search + tag filter', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        activeTag="TypeScript"
        searchQuery="safe"
      />
    )

    // Should only show posts that match both TypeScript tag AND "safe" search
    expect(screen.getByText('Type-Safe LLM Outputs')).toBeInTheDocument()
    expect(screen.queryByText('Building Autonomous Agents with Claude')).not.toBeInTheDocument()
  })

  it('should handle posts without tags', () => {
    const writingWithoutTags: Writing = {
      ...mockWritings[0],
      tags: [],
    }

    render(
      <BlogPostCard writing={writingWithoutTags} />
    )

    // Should render without crashing
    expect(screen.getByText('Building Autonomous Agents with Claude')).toBeInTheDocument()
  })
})

// =============================================================================
// Accessibility Tests
// =============================================================================

describe('Accessibility', () => {
  it('should have accessible search input with placeholder', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search posts...')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
  })

  it('should have clickable tag filter buttons', () => {
    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
      />
    )

    const tagButtons = screen.getAllByRole('button', { name: /#/ })
    expect(tagButtons.length).toBeGreaterThan(0)
  })

  it('should have clickable post cards', () => {
    const onPostClick = vi.fn()

    render(
      <BlogList
        writings={mockWritings}
        tags={mockTags}
        onPostClick={onPostClick}
      />
    )

    const articles = screen.getAllByRole('article')
    fireEvent.click(articles[0])

    expect(onPostClick).toHaveBeenCalled()
  })
})
