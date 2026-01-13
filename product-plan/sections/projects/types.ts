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

export interface ProjectsProps {
  projects: Project[]
  onSelectProject?: (projectId: string) => void
  onGitHubClick?: (url: string) => void
  onDemoClick?: (url: string) => void
  onCloseModal?: () => void
}
