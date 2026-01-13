// =============================================================================
// Data Types
// =============================================================================

export interface Service {
  id: string
  title: string
  description: string
  placeholder: string
  icon: 'brain' | 'globe' | 'users'
}

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
// Component Props
// =============================================================================

export interface ConsultingProps {
  /** Intro content with headline and body paragraph */
  intro: Intro
  /** The list of consulting services to display */
  services: Service[]
  /** Call-to-action configuration for booking */
  cta: CTA
  /** Subtle callout for Local Tech Labs */
  localTechLabsCallout: LocalTechLabsCallout
  /** Called when user clicks the main booking CTA */
  onBookConsult?: () => void
  /** Called when user clicks the Local Tech Labs link */
  onLocalTechLabsClick?: () => void
}
