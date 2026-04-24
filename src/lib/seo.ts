export const siteConfig = {
  name: 'Hop4Lead',
  url: 'https://hop4lead.com',
  locale: 'fr_FR',
  description:
    "Hop4Lead remet l'humain au cœur de la performance. Coaching exécutif, préparation mentale, bootcamps et formations pour athlètes, entrepreneurs, dirigeants et leurs équipes.",
  ogImage: 'https://i.ibb.co/kj6QHrW/LOGO-HOP4.webp',
  twitterHandle: '@hop4lead',
  themeColor: '#4698CB',
  phone: '+33 1 23 45 67 89',
  email: 'contact@hop4lead.com',
  address: {
    street: '',
    city: 'Paris',
    postalCode: '75000',
    country: 'FR',
  },
} as const

export type SeoMeta = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

export function buildTitle(page?: string) {
  if (!page) return siteConfig.name
  return `${page} - ${siteConfig.name}`
}

export const routes = [
  '/',
  '/a-propos',
  '/services',
  '/contact',
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/conditions-generales',
  '/politique-cookies',
] as const
