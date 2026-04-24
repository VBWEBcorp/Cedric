import type { Metadata } from 'next'

import { AboutContent } from './about-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'

const description =
  "Hop4Lead : trois experts, Cédric Vanhoutte (coach exécutif), Franck Larrey (préparateur mental) et Fabrice Bigot (biohacking), au service d'une performance humaine et durable."

export const metadata: Metadata = {
  title: 'À propos',
  description,
  alternates: { canonical: '/a-propos' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('À propos', description, '/a-propos'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'À propos', path: '/a-propos' },
    ]),
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  )
}
