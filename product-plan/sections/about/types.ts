// =============================================================================
// Data Types
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
// Component Props
// =============================================================================

export interface AboutProps {
  /** The list of interests to display as themed cards */
  interests: Interest[]
  /** Called when user hovers over or interacts with a card */
  onCardHover?: (id: string) => void
  /** Called when user clicks on a card for more detail */
  onCardClick?: (id: string) => void
}

export interface InterestCardProps {
  /** The interest data to render */
  interest: Interest
  /** Called when user hovers over the card */
  onHover?: () => void
  /** Called when user clicks the card */
  onClick?: () => void
}

export interface TraitStatProps {
  /** The trait to display */
  trait: Trait
}

export interface GameEntryProps {
  /** The game to display */
  game: Game
}

export interface TrailMapProps {
  /** The riding areas to display */
  areas: RidingArea[]
  /** The coaching credentials */
  coaching: Coaching
}
