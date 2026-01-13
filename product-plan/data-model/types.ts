// Project types
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

// Blog/Writing types
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

// Service types
export interface Service {
  id: string
  title: string
  description: string
  placeholder: string
  icon: 'brain' | 'globe' | 'users'
}

// Interest types (About section)
export interface BaseTrait {
  name: string
  value: number
  description: string
}

export interface TTRPGInterest {
  id: string
  title: string
  theme: 'character-sheet'
  traits: BaseTrait[]
  flavorText?: string
}

export interface Game {
  name: string
  designer: string
  category: string
  playCount: number
  rating: number
}

export interface BoardGamesInterest {
  id: string
  title: string
  theme: 'scorecard'
  games: Game[]
  totalPlays: number
  favoriteDesigner: string
}

export interface Trail {
  name: string
  difficulty: 'green' | 'blue' | 'black' | 'double-black'
}

export interface RidingArea {
  name: string
  trails: Trail[]
}

export interface CoachingCredentials {
  certification: string
  yearsExperience: number
  organization: string
}

export interface MountainBikingInterest {
  id: string
  title: string
  theme: 'trail-map'
  areas: RidingArea[]
  coaching: CoachingCredentials
}

export type Interest = TTRPGInterest | BoardGamesInterest | MountainBikingInterest

// Social link types
export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

// Contact types
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

export interface ContactFormData {
  name: string
  email: string
  company: string
  topic: TopicValue
  message: string
}

export interface CalendarConfig {
  provider: 'calendly' | 'google'
  embedUrl: string
  fallbackUrl: string
}
