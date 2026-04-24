'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavLink {
  to: string
  label: string
}

const staticLinks: NavLink[] = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/services', label: 'Accompagnements' },
  { to: '/gallery', label: 'Galerie' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [links, setLinks] = useState<NavLink[]>(staticLinks)
  const pathname = usePathname()

  useEffect(() => {
    const checkFeatures = async () => {
      try {
        const [galleryRes, blogRes] = await Promise.all([
          fetch('/api/gallery/settings'),
          fetch('/api/blog/settings'),
        ])
        const gallery = await galleryRes.json().catch(() => ({ enabled: true }))
        const blog = await blogRes.json().catch(() => ({ enabled: true }))

        const dynamicLinks: NavLink[] = [
          { to: '/', label: 'Accueil' },
          { to: '/a-propos', label: 'À propos' },
          { to: '/services', label: 'Accompagnements' },
        ]
        if (gallery.enabled !== false) dynamicLinks.push({ to: '/gallery', label: 'Galerie' })
        if (blog.enabled !== false) dynamicLinks.push({ to: '/blog', label: 'Blog' })
        dynamicLinks.push({ to: '/contact', label: 'Contact' })
        setLinks(dynamicLinks)
      } catch (error) {
        console.error('Failed to check features:', error)
      }
    }
    checkFeatures()
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-3 sm:px-6">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 rounded-full border border-border/60 bg-background/80 px-5 pr-2 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)] ring-1 ring-foreground/[0.03] backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <Logo />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-2 rounded-full px-4"
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="text-sm font-medium">Menu</span>
        </Button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="main-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto mt-2 max-w-3xl overflow-hidden rounded-3xl border border-border/60 bg-background/95 shadow-xl backdrop-blur-xl"
          >
            <nav className="flex flex-col p-3" aria-label="Navigation principale">
              {links.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-muted',
                    pathname === l.to
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-border/60 pt-3">
                <Button className="w-full rounded-2xl" asChild>
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
