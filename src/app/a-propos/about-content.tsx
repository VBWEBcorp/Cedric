'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

import { CtaSection } from '@/components/sections/cta-section'
import { PageHero } from '@/components/sections/page-hero'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  hero: {
    eyebrow: 'À propos',
    title: 'Trois experts, une vision commune de la performance',
    description:
      "Cédric, Franck et Fabrice unissent coaching exécutif, préparation mentale et biohacking pour faire de Hop4Lead un catalyseur de réussite.",
    image: 'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
  },
  team: [
    {
      name: 'Cédric Vanhoutte',
      role: 'Coach exécutif',
      photo: 'https://i.ibb.co/0p2ZtLK1/cedric-vanhoutte-sml-opt.webp',
      description:
        "J'accompagne entrepreneurs, dirigeants et managers à développer leur vision, prendre des décisions alignées et déployer des stratégies performantes et équilibrées. Certifié en coaching professionnel depuis 2018. Créateur du concept « Souris et entreprends ».",
    },
    {
      name: 'Franck Larrey',
      role: 'Préparateur mental',
      photo: 'https://i.ibb.co/5XSsxptF/franck-larrey-sml-opt.webp',
      description:
        "J'accompagne athlètes de haut niveau, dirigeants et équipes dans leur quête de l'excellence. Après 15 ans de carrière militaire, je pratique la préparation mentale à temps plein depuis 2017. Mon crédo : Success is a team sport.",
    },
    {
      name: 'Fabrice Bigot',
      role: 'Expert biohacking',
      photo: 'https://i.ibb.co/W4dBD6TL/fabrice-bigot-sml-opt.webp',
      description:
        "J'accompagne joueurs de poker et compétiteurs de haute intensité à optimiser concentration, flow et gestion du sommeil sous adrénaline. Je combine neurosciences, biohacking et méthodes cognitives novatrices.",
    },
  ],
  gallery: [
    'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
    'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
    'https://i.ibb.co/nN80hwPf/Les3experts-1.png',
    'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
    'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
  ],
}

export function AboutContent() {
  const { data } = useContent('about', defaults)
  const hero = data.hero ?? defaults.hero
  const team = data.team ?? defaults.team
  const gallery = data.gallery ?? defaults.gallery

  const galleryScrollRef = useRef<HTMLDivElement>(null)
  const scrollGallery = (dir: -1 | 1) => {
    const el = galleryScrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        breadcrumb="À propos"
      />

      <section className="border-b border-border/60 bg-muted/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle
            eyebrow="L'équipe"
            title="Trois expertises au service de votre performance"
          />
          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {team.map((m: any, i: number) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-[var(--shadow-sm)] ring-1 ring-foreground/5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-full object-cover ring-2 ring-background"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold tracking-tight text-foreground">
                      {m.name}
                    </p>
                    <p className="text-sm text-primary">{m.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle
              eyebrow="En images"
              title="Hop4Lead sur le terrain"
              align="left"
              className="mx-0"
            />
            <div className="hidden shrink-0 gap-2 sm:flex">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                aria-label="Image précédente"
                onClick={() => scrollGallery(-1)}
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                aria-label="Image suivante"
                onClick={() => scrollGallery(1)}
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
          <div
            ref={galleryScrollRef}
            className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 sm:gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            role="region"
            aria-label="Galerie photos"
          >
            {gallery.map((src: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease, delay: i * 0.06 }}
                className="shrink-0 snap-start basis-[70%] overflow-hidden rounded-2xl sm:basis-[45%] md:basis-[32%]"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
