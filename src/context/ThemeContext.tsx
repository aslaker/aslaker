import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Helper to convert hex color to RGB string (e.g., "163, 230, 53")
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 0, 0'
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

export type ThemeOption = {
  id: string
  name: string
  description: string
  colors: {
    primary: string      // Main accent (like lime-400)
    primaryDark: string  // Darker variant (like lime-500)
    primaryDarker: string // Even darker (like lime-600)
    secondary: string    // Secondary accent (like emerald-400)
    secondaryDark: string // Darker secondary (like emerald-500)
  }
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Classic hacker green',
    colors: {
      primary: '#a3e635',      // lime-400
      primaryDark: '#84cc16',  // lime-500
      primaryDarker: '#65a30d', // lime-600
      secondary: '#34d399',    // emerald-400
      secondaryDark: '#10b981', // emerald-500
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon pink & cyan',
    colors: {
      primary: '#f472b6',      // pink-400
      primaryDark: '#ec4899',  // pink-500
      primaryDarker: '#db2777', // pink-600
      secondary: '#22d3ee',    // cyan-400
      secondaryDark: '#06b6d4', // cyan-500
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange glow',
    colors: {
      primary: '#fb923c',      // orange-400
      primaryDark: '#f97316',  // orange-500
      primaryDarker: '#ea580c', // orange-600
      secondary: '#fbbf24',    // amber-400
      secondaryDark: '#f59e0b', // amber-500
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep blue waters',
    colors: {
      primary: '#60a5fa',      // blue-400
      primaryDark: '#3b82f6',  // blue-500
      primaryDarker: '#2563eb', // blue-600
      secondary: '#2dd4bf',    // teal-400
      secondaryDark: '#14b8a6', // teal-500
    },
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description: 'Soft purple dreams',
    colors: {
      primary: '#c084fc',      // purple-400
      primaryDark: '#a855f7',  // purple-500
      primaryDarker: '#9333ea', // purple-600
      secondary: '#f0abfc',    // fuchsia-300
      secondaryDark: '#e879f9', // fuchsia-400
    },
  },
]

const STORAGE_KEY = 'aslaker-theme-preference'
const DEFAULT_THEME = THEME_OPTIONS[0]

type ThemeContextType = {
  currentTheme: ThemeOption
  setTheme: (theme: ThemeOption) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(DEFAULT_THEME)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load saved theme preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const found = THEME_OPTIONS.find((t) => t.id === saved)
      if (found) {
        setCurrentTheme(found)
      }
    }
    setIsHydrated(true)
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!isHydrated) return

    const { colors } = currentTheme
    const root = document.documentElement

    // Set hex color values
    root.style.setProperty('--theme-primary', colors.primary)
    root.style.setProperty('--theme-primary-dark', colors.primaryDark)
    root.style.setProperty('--theme-primary-darker', colors.primaryDarker)
    root.style.setProperty('--theme-secondary', colors.secondary)
    root.style.setProperty('--theme-secondary-dark', colors.secondaryDark)

    // Set RGB values for rgba() usage
    root.style.setProperty('--theme-primary-rgb', hexToRgb(colors.primary))
    root.style.setProperty('--theme-primary-dark-rgb', hexToRgb(colors.primaryDark))
    root.style.setProperty('--theme-secondary-rgb', hexToRgb(colors.secondary))
    root.style.setProperty('--theme-secondary-dark-rgb', hexToRgb(colors.secondaryDark))

    localStorage.setItem(STORAGE_KEY, currentTheme.id)
  }, [currentTheme, isHydrated])

  const setTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
