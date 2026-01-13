export interface HeroProps {
  name: string
  title: string
  tagline: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
  socialLinks?: SocialLink[]
  onPrimaryCtaClick?: () => void
  onSecondaryCtaClick?: () => void
  onSocialLinkClick?: (url: string) => void
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}

export interface TypingTextProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
}
