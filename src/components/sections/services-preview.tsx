'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Compass, Flame, GraduationCap } from 'lucide-react'
import Link from 'next/link'

import { SectionTitle } from '@/components/ui/section-title'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContent } from '@/hooks/use-content'

const iconMap: Record<string, any> = { Compass, Brain, Flame, GraduationCap }
const defaultServices = [
  { title: 'Coaching exécutif', desc: 'Entrepreneurs et dirigeants : gagner en performance et en sérénité en développant une vision claire, une stratégie structurée et un équilibre durable.' },
  { title: 'Préparation mentale', desc: 'Athlètes et équipes : développer un mindset de champion pour accéder à son plein potentiel lors des échéances importantes.' },
  { title: 'Bootcamp', desc: 'Une expérience de coaching immersive et collective, dans un cadre idéal, pour une transformation de la performance profonde et durable.' },
  { title: 'Formations', desc: 'Optimiser votre potentiel individuel par l\'acquisition de compétences dans des domaines spécifiques.' },
]

const defaultIcons = [Compass, Brain, Flame, GraduationCap]

const ease = [0.22, 1, 0.36, 1] as const

export function ServicesPreview() {
  const { data } = useContent('services', {
    hero: { eyebrow: 'Nos services' },
    services: defaultServices,
  })

  const services = (data.services ?? defaultServices).slice(0, 4)

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle
          eyebrow="Nos accompagnements"
          title="Une gamme adaptée pour la performance des individus et des équipes"
          description="Quatre formats complémentaires pour athlètes, dirigeants, managers et leurs équipes, avec une approche profondément humaine."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((s: any, i: number) => {
            const Icon = defaultIcons[i] ?? Compass
            return (
              <motion.div
                key={s.title || i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, ease, delay: i * 0.04 }}
              >
                <Card className="h-full rounded-2xl border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle className="font-display text-base">{s.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{s.desc || s.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" className="group" asChild>
            <Link href="/services">
              Voir tous nos services
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
