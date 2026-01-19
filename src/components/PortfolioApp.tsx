import { useState } from 'react'
import { FontProvider } from '../context/FontContext'
import { AppShell } from './shell'
import { Hero } from './sections/hero'
import { ProjectsGrid } from './sections/projects'
import { AboutGrid } from './sections/about'
import { ConsultingSection } from './sections/consulting'
import { ContactSection, ContactModal } from './sections/contact'
import { SectionDivider } from './ui/SectionDivider'
import type { ContactFormData } from '../types'
import {
  navigationItems,
  hero,
  socialLinks,
  projects,
  interests,
  consultingIntro,
  services,
  consultingCta,
  localTechLabsCallout,
  topicOptions,
  calendarConfig,
} from '../data/site-data'

// HubSpot form submission helper
async function submitToHubSpot(data: ContactFormData): Promise<void> {
  const PORTAL_ID = '244730943'
  const FORM_ID = 'b37ab0cf-6d37-4402-84bd-db2f039e971e'

  const nameParts = data.name.trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: firstName },
          { name: 'lastname', value: lastName },
          { name: 'email', value: data.email },
          { name: 'company', value: data.company || '' },
          { name: 'topic', value: data.topic },
          { name: 'message', value: data.message },
        ],
      }),
    }
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('HubSpot submission failed:', errorData)
    throw new Error('Failed to submit form')
  }
}

export function PortfolioApp() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handlePrimaryCtaClick = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSecondaryCtaClick = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactClick = () => {
    setIsContactModalOpen(true)
  }

  const handleContinueToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContinueToConsulting = () => {
    const element = document.querySelector('#consulting')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = async (data: ContactFormData) => {
    await submitToHubSpot(data)
  }

  return (
    <FontProvider>
      <AppShell navigationItems={navigationItems} socialLinks={socialLinks}>
        <Hero
          hero={hero}
          socialLinks={socialLinks}
          onPrimaryCtaClick={handlePrimaryCtaClick}
          onSecondaryCtaClick={handleSecondaryCtaClick}
        />

        <SectionDivider toSection="projects" />

        <ProjectsGrid
          projects={projects}
          onContinueToAbout={handleContinueToAbout}
        />

        <SectionDivider toSection="about" />

        <AboutGrid
          interests={interests}
          onContinueToConsulting={handleContinueToConsulting}
        />

        <SectionDivider toSection="consulting" />

        <ConsultingSection
          intro={consultingIntro}
          services={services}
          cta={consultingCta}
          localTechLabsCallout={localTechLabsCallout}
          onBookConsult={handleContactClick}
        />

        <SectionDivider toSection="contact" />

        <ContactSection
          topicOptions={topicOptions}
          calendarConfig={calendarConfig}
          onContactClick={handleContactClick}
        />

        <ContactModal
          isOpen={isContactModalOpen}
          topicOptions={topicOptions}
          calendarConfig={calendarConfig}
          onClose={() => setIsContactModalOpen(false)}
          onFormSubmit={handleFormSubmit}
        />

        {/* Footer */}
        <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="font-mono text-xs text-zinc-400">
                <span className="text-lime-600">&gt;</span> adamslaker.dev
                <span className="text-zinc-500"> | </span>
                Built with Astro, React, and Tailwind CSS
              </p>
              <p className="font-mono text-xs text-zinc-400">
                <span className="text-emerald-500">&copy;</span> {new Date().getFullYear()} Adam Slaker
              </p>
            </div>
          </div>
        </footer>
      </AppShell>
    </FontProvider>
  )
}
