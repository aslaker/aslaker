import { useState, useEffect, useRef, useCallback } from 'react'
import type { ContactFormData, TopicOption, TopicValue, CalendarConfig } from '../../../types'

type ModalStep = 'form' | 'calendar' | 'success'

interface ContactModalProps {
  isOpen: boolean
  topicOptions: TopicOption[]
  calendarConfig: CalendarConfig
  defaultTopic?: TopicValue
  onClose: () => void
  onFormSubmit: (data: ContactFormData) => Promise<void>
  onBookingComplete?: () => void
}

export function ContactModal({
  isOpen,
  topicOptions,
  calendarConfig,
  defaultTopic,
  onClose,
  onFormSubmit,
  onBookingComplete,
}: ContactModalProps) {
  const [step, setStep] = useState<ModalStep>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    topic: defaultTopic || topicOptions[0]?.value || 'strategic-ai-consulting',
    message: '',
  })
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
      document.body.style.overflow = ''
      const timer = setTimeout(() => {
        setStep('form')
        setFormData({
          name: '',
          email: '',
          company: '',
          topic: defaultTopic || topicOptions[0]?.value || 'strategic-ai-consulting',
          message: '',
        })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, defaultTopic, topicOptions])

  useEffect(() => {
    if (defaultTopic) {
      setFormData((prev) => ({ ...prev, topic: defaultTopic }))
    }
  }, [defaultTopic])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement
      // Focus the first input after a short delay to allow animation
      const timer = setTimeout(() => {
        firstInputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Restore focus to the previously focused element
      previousActiveElement.current?.focus()
    }
  }, [isOpen])

  // Focus trap handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement?.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement?.focus()
    }
  }, [])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onFormSubmit(formData)
      // Open calendar in new tab after successful form submission
      window.open(calendarConfig.embedUrl, '_blank', 'noopener,noreferrer')
      setStep('success')
      onBookingComplete?.()
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-zinc-950/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          allowOutsideClick: true,
          returnFocusOnDeactivate: true,
          escapeDeactivates: true,
          onDeactivate: onClose,
        }}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className={`relative w-full max-w-lg overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl shadow-lime-500/5 transition-all duration-300 ${
            isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
          }`}
        >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={onClose}
                className="group h-3 w-3 rounded-full bg-red-500/80 transition-all hover:bg-red-500"
                aria-label="Close modal"
              >
                <span className="flex h-full w-full items-center justify-center text-[8px] font-bold text-transparent transition-colors group-hover:text-red-900">
                  x
                </span>
              </button>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 font-mono text-xs text-zinc-500">
              ~/contact
              {step === 'form' && '/form.sh'}
              {step === 'calendar' && '/schedule.sh'}
              {step === 'success' && '/success.sh'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {['form', 'calendar', 'success'].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  step === s
                    ? 'bg-lime-500 shadow-[0_0_6px_rgba(163,230,53,0.6)]'
                    : i < ['form', 'calendar', 'success'].indexOf(step)
                      ? 'bg-emerald-500/60'
                      : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-[400px] p-6">
          {step === 'form' && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <h2
                  id="contact-modal-title"
                  className="mb-2 font-mono text-lg font-medium text-zinc-100"
                >
                  <span className="text-lime-500">$</span> init contact
                </h2>
                <p className="text-sm text-zinc-400">
                  Tell me about your project. I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block font-mono text-xs text-zinc-400"
                    >
                      name<span className="text-lime-500">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 transition-all focus:border-lime-500/50 focus:outline-none focus:ring-1 focus:ring-lime-500/30"
                      placeholder="Ada Lovelace"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-mono text-xs text-zinc-400"
                    >
                      email<span className="text-lime-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 transition-all focus:border-lime-500/50 focus:outline-none focus:ring-1 focus:ring-lime-500/30"
                      placeholder="ada@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-1.5 block font-mono text-xs text-zinc-400"
                  >
                    company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 transition-all focus:border-lime-500/50 focus:outline-none focus:ring-1 focus:ring-lime-500/30"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="mb-1.5 block font-mono text-xs text-zinc-400"
                  >
                    topic<span className="text-lime-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 pr-10 font-mono text-sm text-zinc-100 transition-all focus:border-lime-500/50 focus:outline-none focus:ring-1 focus:ring-lime-500/30"
                    >
                      {topicOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-4 w-4 text-zinc-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-xs text-zinc-400"
                  >
                    message<span className="text-lime-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full resize-none rounded border border-zinc-700 bg-zinc-800/50 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 transition-all focus:border-lime-500/50 focus:outline-none focus:ring-1 focus:ring-lime-500/30"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded border-none bg-lime-500 px-6 py-3 font-mono text-sm font-medium text-zinc-900 transition-all duration-300 hover:bg-lime-400 hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="text-lime-700">&gt;</span>
                        Submit &amp; Schedule Call
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="animate-fadeIn flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-lime-500/30 bg-lime-500/10">
                <svg
                  className="h-8 w-8 text-lime-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-2 font-mono text-lg font-medium text-zinc-100">
                <span className="text-lime-500">$</span> echo &quot;Success!&quot;
              </h2>
              <p className="mb-6 max-w-xs text-sm text-zinc-400">
                Your details have been submitted. A calendar window opened in a new tab—pick a time that works for you!
              </p>
              <div className="space-y-2 font-mono text-xs text-zinc-500">
                <p>
                  <span className="text-zinc-600">&gt;</span> Details synced to HubSpot{' '}
                  <span className="text-lime-500">&#10003;</span>
                </p>
                <p>
                  <span className="text-zinc-600">&gt;</span> Calendar opened in new tab{' '}
                  <span className="text-lime-500">&#10003;</span>
                </p>
              </div>
              <a
                href={calendarConfig.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Didn&apos;t see the calendar? Click here
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 rounded border border-zinc-700 bg-zinc-800/50 px-6 py-2 font-mono text-sm text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
      </FocusTrap>
    </div>
  )
}
