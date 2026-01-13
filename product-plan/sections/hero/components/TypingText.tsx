'use client'

import { useState, useEffect } from 'react'

interface TypingTextProps {
  text: string
  /** Delay in ms before typing starts */
  delay?: number
  /** Speed in ms per character */
  speed?: number
  /** Called when typing animation completes */
  onComplete?: () => void
  /** Additional classes for the text */
  className?: string
  /** Show cursor */
  showCursor?: boolean
}

export function TypingText({
  text,
  delay = 0,
  speed = 80,
  onComplete,
  className = '',
  showCursor = true,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
      onComplete?.()
    }
  }, [isTyping, displayedText, text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className={`
            inline-block w-[0.6em] h-[1.1em] ml-0.5 align-middle
            bg-lime-400
            ${isComplete ? 'animate-blink' : ''}
          `}
          style={{
            animation: isComplete ? 'blink 1s step-end infinite' : 'none',
          }}
        />
      )}
    </span>
  )
}
