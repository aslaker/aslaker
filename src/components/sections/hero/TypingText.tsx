import { useState, useEffect } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

interface TypingTextProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
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
  const prefersReducedMotion = useReducedMotion()
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // If reduced motion is preferred, show full text immediately
    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsComplete(true)
      onComplete?.()
      return
    }

    const startTimeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay, prefersReducedMotion, text, onComplete])

  useEffect(() => {
    if (!isTyping || prefersReducedMotion) return

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
      onComplete?.()
    }
  }, [isTyping, displayedText, text, speed, onComplete, prefersReducedMotion])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className={`
            inline-block w-[0.6em] h-[1.1em] ml-0.5 align-middle
            bg-lime-400
          `}
          style={{
            animation: !prefersReducedMotion && isComplete ? 'blink 1s step-end infinite' : 'none',
            opacity: prefersReducedMotion ? 1 : undefined,
          }}
        />
      )}
    </span>
  )
}
