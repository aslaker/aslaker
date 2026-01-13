// =============================================================================
// Core Entities
// =============================================================================

/**
 * A featured technical project showcasing work in AI/agentic engineering,
 * full-stack development, or open source contributions.
 */
export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  logoUrl: string
  tags: string[]
  technologies: string[]
  screenshots: string[]
  githubUrl: string | null
  demoUrl: string | null
}

/**
 * A consulting service offering in the AI/agentic space.
 */
export interface Service {
  id: string
  title: string
  description: string
  placeholder: string
  icon: 'brain' | 'globe' | 'users' | 'microphone'
}

/**
 * An external profile or contact method for connecting.
 */
export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}

/**
 * A blog post or technical article sharing knowledge and expertise.
 */
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

// =============================================================================
// Interest Entities (About Section)
// =============================================================================

export interface Trait {
  name: string
  value: number
  description: string
}

export interface Game {
  name: string
  designer: string
  category: string
  playCount: number
  rating: number
}

export interface Trail {
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface RidingArea {
  name: string
  trails: Trail[]
}

export interface Coaching {
  certification: string
  yearsExperience: number
  organization: string
}

export type InterestTheme = 'character-sheet' | 'scorecard' | 'trail-map'

export interface TTRPGInterest {
  id: string
  title: string
  theme: 'character-sheet'
  traits: Trait[]
  flavorText?: string
}

export interface BoardGamesInterest {
  id: string
  title: string
  theme: 'scorecard'
  games: Game[]
  totalPlays: number
  favoriteDesigner: string
}

export interface MountainBikingInterest {
  id: string
  title: string
  theme: 'trail-map'
  areas: RidingArea[]
  coaching: Coaching
}

export type Interest = TTRPGInterest | BoardGamesInterest | MountainBikingInterest

// =============================================================================
// Hero Types
// =============================================================================

export interface CtaButton {
  label: string
  href: string
}

export interface Hero {
  name: string
  title: string
  tagline: string
  primaryCta: CtaButton
  secondaryCta: CtaButton
}

// =============================================================================
// Consulting Types
// =============================================================================

export interface Intro {
  headline: string
  body: string
}

export interface CTA {
  text: string
  subtext: string
  href: string
  attribution: string
}

export interface LocalTechLabsCallout {
  text: string
  linkText: string
  href: string
}

// =============================================================================
// Contact Types
// =============================================================================

export type TopicValue =
  | 'strategic-ai-consulting'
  | 'website-development'
  | 'fractional-cto'
  | 'speaking'

export interface TopicOption {
  id: string
  label: string
  value: TopicValue
}

export interface CalendarConfig {
  provider: 'calendly' | 'google'
  embedUrl: string
  fallbackUrl: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  topic: TopicValue
  message: string
}

export interface ContactSubmission extends ContactFormData {
  id: string
  submittedAt: string
}

// =============================================================================
// Navigation Types
// =============================================================================

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}
