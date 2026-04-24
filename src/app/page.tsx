import type { Metadata } from 'next'

import { AudienceSection } from '@/components/sections/audience-section'
import { CtaSection } from '@/components/sections/cta-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ManifestoSection } from '@/components/sections/manifesto-section'
import { PillarsSection } from '@/components/sections/pillars-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import {
  localBusinessJsonLd,
  organizationJsonLd,
  webPageJsonLd,
  webSiteJsonLd,
} from '@/components/seo/json-ld'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webSiteJsonLd(),
    organizationJsonLd(),
    localBusinessJsonLd(),
    webPageJsonLd(siteConfig.name, siteConfig.description, '/'),
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ManifestoSection />
      <PillarsSection />
      <AudienceSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
