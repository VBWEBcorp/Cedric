'use client'

import { usePathname } from 'next/navigation'

import { CookieConsent } from '@/components/layout/cookie-consent'
import { FloatingCallButton } from '@/components/floating-call-button'
import { Footer } from '@/components/layout/footer'
import { MarketingBanner } from '@/components/marketing-banner'
import { MarketingPopup } from '@/components/marketing-popup'
import { Navbar } from '@/components/layout/navbar'

export function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPath = pathname?.startsWith('/admin') ?? false

  // Espace admin: pas de header/footer/bandeau public (y compris la page de connexion)
  if (isAdminPath) {
    return <>{children}</>
  }

  // Sinon: header + contenu + footer complet
  return (
    <>
      <MarketingBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCallButton />
      <MarketingPopup />
      <CookieConsent />
    </>
  )
}
