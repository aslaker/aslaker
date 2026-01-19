import { ChevronDown, Palette, Type } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { FONT_OPTIONS, useFont } from '../../context/FontContext'
import { THEME_OPTIONS, useTheme } from '../../context/ThemeContext'

interface StyleSelectorProps {
  variant?: 'compact' | 'full'
}

export function StyleSelector({ variant = 'compact' }: StyleSelectorProps) {
  const { currentFont, setFont } = useFont()
  const { currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'theme' | 'font'>('theme')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (variant === 'full') {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-3 text-left transition-all hover:border-[var(--theme-primary)]/30 hover:bg-zinc-800"
        >
          <div className="flex items-center gap-3">
            <Palette className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-[var(--theme-primary)]" />
            <div>
              <div className="text-xs text-zinc-500">Don't like the styles?</div>
              <div className="text-sm font-medium text-zinc-200">
                <span style={{ color: currentTheme.colors.primary }}>{currentTheme.name}</span>
                {' + '}
                <span style={{ fontFamily: currentFont.family }}>{currentFont.name}</span>
              </div>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl">
            {/* Tabs */}
            <div className="flex border-b border-zinc-800">
              <button
                onClick={() => setActiveTab('theme')}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === 'theme'
                    ? 'border-b-2 border-[var(--theme-primary)] text-[var(--theme-primary)]'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Palette className="h-3.5 w-3.5" />
                Colors
              </button>
              <button
                onClick={() => setActiveTab('font')}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === 'font'
                    ? 'border-b-2 border-[var(--theme-primary)] text-[var(--theme-primary)]'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Type className="h-3.5 w-3.5" />
                Font
              </button>
            </div>

            {/* Content */}
            <div className="p-1">
              {activeTab === 'theme' ? (
                <>
                  {THEME_OPTIONS.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors ${
                        currentTheme.id === theme.id
                          ? 'bg-[var(--theme-primary)]/10'
                          : 'hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Color preview dots */}
                        <div className="flex gap-1">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                        </div>
                        <div>
                          <div
                            className="text-sm font-medium"
                            style={{ color: currentTheme.id === theme.id ? theme.colors.primary : undefined }}
                          >
                            {theme.name}
                          </div>
                          <div className="text-xs text-zinc-500">{theme.description}</div>
                        </div>
                      </div>
                      {currentTheme.id === theme.id && (
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                      )}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {FONT_OPTIONS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setFont(font)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors ${
                        currentFont.id === font.id
                          ? 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium" style={{ fontFamily: font.family }}>
                          {font.name}
                        </div>
                        <div className="text-xs text-zinc-500">{font.description}</div>
                      </div>
                      {currentFont.id === font.id && (
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: 'var(--theme-primary)' }}
                        />
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Compact variant for desktop header
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-zinc-500 transition-all hover:bg-zinc-800 hover:text-zinc-300"
        title="Customize styles"
      >
        <Palette className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">Don't like the styles?</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl">
          {/* Tabs */}
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === 'theme'
                  ? 'border-b-2 border-[var(--theme-primary)] text-[var(--theme-primary)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Palette className="h-3 w-3" />
              Colors
            </button>
            <button
              onClick={() => setActiveTab('font')}
              className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === 'font'
                  ? 'border-b-2 border-[var(--theme-primary)] text-[var(--theme-primary)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Type className="h-3 w-3" />
              Font
            </button>
          </div>

          {/* Content */}
          <div className="p-1">
            {activeTab === 'theme' ? (
              <>
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors ${
                      currentTheme.id === theme.id
                        ? 'bg-[var(--theme-primary)]/10'
                        : 'hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Color preview dots */}
                      <div className="flex gap-0.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                      </div>
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: currentTheme.id === theme.id ? theme.colors.primary : undefined }}
                        >
                          {theme.name}
                        </div>
                        <div className="text-xs text-zinc-500">{theme.description}</div>
                      </div>
                    </div>
                    {currentTheme.id === theme.id && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                    )}
                  </button>
                ))}
              </>
            ) : (
              <>
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setFont(font)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors ${
                      currentFont.id === font.id
                        ? 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ fontFamily: font.family }}>
                        {font.name}
                      </div>
                      <div className="text-xs text-zinc-500">{font.description}</div>
                    </div>
                    {currentFont.id === font.id && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--theme-primary)' }}
                      />
                    )}
                  </button>
                ))}
              </>
            )}
          </div>

          <div className="border-t border-zinc-800 px-3 py-2">
            <div className="text-[10px] text-zinc-600">Saved to your browser</div>
          </div>
        </div>
      )}
    </div>
  )
}
