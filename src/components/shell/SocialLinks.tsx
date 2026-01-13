import { Github, Linkedin, Twitter } from 'lucide-react'
import type { SocialLink } from '../../types'

interface SocialLinksProps {
  links: SocialLink[]
  size?: 'sm' | 'md' | 'lg'
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: null, // handled separately if needed
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

const buttonSizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-10 w-10',
}

export function SocialLinks({ links, size = 'md' }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-1">
      {links.map((link) => {
        const Icon = iconMap[link.icon]
        if (!Icon) return null
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center justify-center rounded-lg text-zinc-400 transition-colors
              hover:bg-zinc-800 hover:text-lime-400
              ${buttonSizeClasses[size]}
            `}
            aria-label={`Visit ${link.platform}`}
          >
            <Icon className={sizeClasses[size]} />
          </a>
        )
      })}
    </div>
  )
}
