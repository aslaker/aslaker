import { ChevronDown, Type } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { FONT_OPTIONS, useFont } from '../../context/FontContext'

interface FontSelectorProps {
  variant?: 'compact' | 'full'
}

export function FontSelector({ variant = 'compact' }: FontSelectorProps) {
  const { currentFont, setFont } = useFont()
  const [isOpen, setIsOpen] = useState(false)
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
          className="group flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-3 text-left transition-all hover:border-lime-400/30 hover:bg-zinc-800"
        >
          <div className="flex items-center gap-3">
            <Type className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-lime-400" />
            <div>
              <div className="text-xs text-zinc-400">Don't like the font?</div>
              <div className="text-sm font-medium text-zinc-200" style={{ fontFamily: currentFont.family }}>
                {currentFont.name}
              </div>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl">
            <div className="p-1">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font.id}
                  onClick={() => {
                    setFont(font)
                    setIsOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors ${
                    currentFont.id === font.id
                      ? 'bg-lime-400/10 text-lime-400'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ fontFamily: font.family }}>
                      {font.name}
                    </div>
                    <div className="text-xs text-zinc-400">{font.description}</div>
                  </div>
                  {currentFont.id === font.id && (
                    <span className="h-2 w-2 rounded-full bg-lime-400" />
                  )}
                </button>
              ))}
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
        title="Change font"
      >
        <Type className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">Don't like the font?</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl">
          <div className="border-b border-zinc-800 px-3 py-2">
            <div className="text-xs font-medium text-zinc-400">Pick your poison</div>
          </div>
          <div className="p-1">
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.id}
                onClick={() => {
                  setFont(font)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors ${
                  currentFont.id === font.id
                    ? 'bg-lime-400/10 text-lime-400'
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
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-zinc-800 px-3 py-2">
            <div className="text-[10px] text-zinc-600">Saved to your browser</div>
          </div>
        </div>
      )}
    </div>
  )
}
