'use client'

import { motion } from 'framer-motion'
import {
  Brain, Compass, Flame, GraduationCap, HeartPulse, Mountain, Trophy, Users,
} from 'lucide-react'

import { CtaSection } from '@/components/sections/cta-section'
import { PageHero } from '@/components/sections/page-hero'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContent } from '@/hooks/use-content'

const ease = [0.22, 1, 0.36, 1] as const
const defaultIcons = [Compass, Brain, Flame, GraduationCap, Users, Trophy, HeartPulse, Mountain]

const defaults = {
  hero: {
    eyebrow: 'Nos accompagnements',
    title: 'Une gamme adaptée pour la performance des individus et des équipes',
    description:
      "Quatre formats complémentaires (coaching exécutif, préparation mentale, bootcamp, formations) pour athlètes, dirigeants, managers et leurs équipes.",
    image: 'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
  },
  services: [
    {
      title: 'Coaching exécutif',
      description:
        "Permettre aux entrepreneurs et aux leaders de gagner en performance et en sérénité en développant une vision claire, en structurant leur stratégie et en maintenant leur équilibre.",
    },
    {
      title: 'Préparation mentale',
      description:
        "Permettre aux athlètes de développer un mindset de champion afin d'accéder à leur plein potentiel lors des échéances importantes.",
    },
    {
      title: 'Bootcamp',
      description:
        "Une expérience de coaching immersive et collective dans un cadre idéal, pour une transformation de votre performance profonde et durable.",
    },
    {
      title: 'Formations',
      description:
        "Optimiser votre potentiel individuel par l'acquisition de compétences dans des domaines spécifiques.",
    },
    {
      title: 'Accompagnement équipes',
      description:
        "Aider les équipes à atteindre leur plein potentiel en favorisant des interactions fluides et constructives, levier essentiel de la performance collective.",
    },
    {
      title: 'Préparation aux échéances',
      description:
        "Gestion du stress, concentration, routine de performance : se préparer mentalement aux moments décisifs, compétitions, négociations ou prises de parole.",
    },
    {
      title: 'Biohacking & énergie',
      description:
        "Optimiser concentration, flow, récupération et gestion du sommeil sous adrénaline grâce à des méthodes issues des neurosciences.",
    },
    {
      title: 'Séminaires sur-mesure',
      description:
        "Journées ou week-ends pour codir, comités et équipes dirigeantes. Cohésion, vision commune et performance collective.",
    },
  ],
}

export function ServicesContent() {
  const { data } = useContent('services', defaults)
  const hero = data.hero ?? defaults.hero
  const services = data.services ?? defaults.services

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        breadcrumb="Services"
      />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s: any, i: number) => {
              const Icon = defaultIcons[i] ?? Globe
              return (
                <motion.div
                  key={s.title || i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, ease, delay: i * 0.03 }}
                >
                  <Card className="h-full rounded-2xl border-border/80 bg-card/70 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle className="font-display text-base">{s.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{s.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
