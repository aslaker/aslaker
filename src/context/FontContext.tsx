import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type FontOption = {
  id: string
  name: string
  family: string
  description: string
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'outfit',
    name: 'Outfit',
    family: "'Outfit', sans-serif",
    description: 'Geometric & modern',
  },
  {
    id: 'sora',
    name: 'Sora',
    family: "'Sora', sans-serif",
    description: 'Japanese-inspired',
  },
  {
    id: 'manrope',
    name: 'Manrope',
    family: "'Manrope', sans-serif",
    description: 'Quirky & warm',
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta Sans',
    family: "'Plus Jakarta Sans', sans-serif",
    description: 'Friendly & readable',
  },
  {
    id: 'bricolage',
    name: 'Bricolage Grotesque',
    family: "'Bricolage Grotesque', sans-serif",
    description: 'French flair',
  },
]

const STORAGE_KEY = 'aslaker-font-preference'
const DEFAULT_FONT = FONT_OPTIONS[0]

type FontContextType = {
  currentFont: FontOption
  setFont: (font: FontOption) => void
}

const FontContext = createContext<FontContextType | null>(null)

export function FontProvider({ children }: { children: ReactNode }) {
  const [currentFont, setCurrentFont] = useState<FontOption>(DEFAULT_FONT)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load saved font preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const found = FONT_OPTIONS.find((f) => f.id === saved)
      if (found) {
        setCurrentFont(found)
      }
    }
    setIsHydrated(true)
  }, [])

  // Apply font to document and save to localStorage
  useEffect(() => {
    if (!isHydrated) return

    document.documentElement.style.setProperty('--font-user-choice', currentFont.family)
    localStorage.setItem(STORAGE_KEY, currentFont.id)
  }, [currentFont, isHydrated])

  const setFont = (font: FontOption) => {
    setCurrentFont(font)
  }

  return (
    <FontContext.Provider value={{ currentFont, setFont }}>
      {children}
    </FontContext.Provider>
  )
}

export function useFont() {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
