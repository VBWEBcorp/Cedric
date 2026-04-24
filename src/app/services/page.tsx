import type { Metadata } from 'next'

import { ServicesContent } from './services-content'
import {
  breadcrumbJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from '@/components/seo/json-ld'

const description =
  "Coaching exécutif, préparation mentale, bootcamp et formations : les accompagnements Hop4Lead pour dirigeants, athlètes et équipes."

const services = [
  { title: 'Coaching exécutif', desc: "Permettre aux entrepreneurs et aux leaders de gagner en performance et en sérénité en développant une vision claire, en structurant leur stratégie et en maintenant leur équilibre." },
  { title: 'Préparation mentale', desc: "Permettre aux athlètes de développer un mindset de champion afin d'accéder à leur plein potentiel lors des échéances importantes." },
  { title: 'Bootcamp', desc: "Une expérience de coaching immersive et collective dans un cadre idéal, pour une transformation profonde et durable." },
  { title: 'Formations', desc: "Optimiser votre potentiel individuel par l'acquisition de compétences dans des domaines spécifiques." },
]

export const metadata: Metadata = {
  title: 'Services',
  description,
  alternates: { canonical: '/services' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Services', description, '/services'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    ...services.map((s) => serviceJsonLd(s.title, s.desc, '/services')),
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  )
}
