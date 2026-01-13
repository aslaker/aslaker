import { useState, useEffect } from 'react'

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
          `}
          style={{
            animation: isComplete ? 'blink 1s step-end infinite' : 'none',
          }}
        />
      )}
    </span>
  )
}
