import { useState, useEffect } from 'react'
import type { Service, Intro, CTA, LocalTechLabsCallout } from '../../../types'
import { ServiceCard } from './ServiceCard'

interface ConsultingSectionProps {
  intro: Intro
  services: Service[]
  cta: CTA
  localTechLabsCallout: LocalTechLabsCallout
  onBookConsult?: () => void
  onLocalTechLabsClick?: () => void
}

export function ConsultingSection({
  intro,
  services,
  cta,
  localTechLabsCallout,
  onBookConsult,
  onLocalTechLabsClick,
}: ConsultingSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleBookConsult = () => {
    if (onBookConsult) {
      onBookConsult()
    } else {
      const element = document.querySelector('#contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLocalTechLabsClick = () => {
    if (onLocalTechLabsClick) {
      onLocalTechLabsClick()
    } else {
      window.open(localTechLabsCallout.href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="consulting" className="min-h-screen bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM4NGNjMTYiPjE8L3RleHQ+PC9zdmc+')] animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="inline-block rounded border border-lime-500/30 bg-zinc-900/80 px-4 py-2">
            <span className="font-mono text-sm text-lime-500">
              <span className="text-lime-600">adam@portfolio</span>
              <span className="text-zinc-500">:</span>
              <span className="text-emerald-400">~/consulting</span>
              <span className="text-zinc-500">$ </span>
              <span className="text-zinc-300">cat services.md</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-lime-400" />
            </span>
          </div>
        </div>

        <div
          className={`mb-12 transition-all delay-150 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <h2 className="mb-4 text-2xl font-medium text-zinc-100 sm:text-3xl">
            <span className="text-lime-600"># </span>
            {intro.headline}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {intro.body}
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div
          className={`mb-8 text-center transition-all delay-500 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={handleBookConsult}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded border-none bg-lime-500 px-8 py-4 font-mono text-sm font-medium uppercase tracking-widest text-zinc-900 transition-all duration-300 hover:bg-lime-400 hover:shadow-[0_0_40px_rgba(163,230,53,0.4)]"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <span className="text-lime-700 transition-colors group-hover:text-lime-600">
                &gt;
              </span>
              {cta.text}
            </span>
          </button>
          <p className="mt-3 font-mono text-xs text-zinc-500">{cta.subtext}</p>
          <p className="mt-1 font-mono text-xs text-zinc-600 italic">
            {cta.attribution}
          </p>
        </div>

        <div
          className={`text-center transition-all delay-700 duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="inline-block rounded border border-zinc-800 bg-zinc-900/50 px-6 py-4 transition-all duration-300 hover:border-emerald-500/30">
            <p className="mb-2 text-sm text-zinc-400">
              {localTechLabsCallout.text}
            </p>
            <button
              type="button"
              onClick={handleLocalTechLabsClick}
              className="group inline-flex items-center gap-1 font-mono text-sm text-emerald-400 transition-colors hover:text-emerald-300"
            >
              <span className="text-zinc-600 transition-colors group-hover:text-emerald-500">
                →
              </span>
              {localTechLabsCallout.linkText}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`mt-12 text-center transition-all delay-[800ms] duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="font-mono text-xs text-zinc-600">
            <span className="text-lime-600">[</span>
            Ready to build something great together?
            <span className="text-lime-600">]</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes serviceSlideIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
      `}</style>
    </section>
  )
}
