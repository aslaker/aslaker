// =============================================================================
// Data Types
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
// Component Props
// =============================================================================

export type ModalStep = 'form' | 'calendar' | 'success'

export interface ContactModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean
  /** The available topic options for the dropdown */
  topicOptions: TopicOption[]
  /** Configuration for the calendar embed */
  calendarConfig: CalendarConfig
  /** Pre-selected topic (e.g., when opened from a specific service card) */
  defaultTopic?: TopicValue
  /** Called when the modal should close */
  onClose: () => void
  /** Called when the form is submitted (before transitioning to calendar) */
  onFormSubmit: (data: ContactFormData) => void | Promise<void>
  /** Called when booking is completed */
  onBookingComplete?: () => void
}

export interface ContactSectionProps {
  /** The available topic options for the dropdown */
  topicOptions: TopicOption[]
  /** Configuration for the calendar embed */
  calendarConfig: CalendarConfig
  /** Called when the contact CTA is clicked (should open modal) */
  onContactClick: () => void
}
