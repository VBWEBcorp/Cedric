'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { SectionTitle } from '@/components/ui/section-title'
import { Button } from '@/components/ui/button'
import { useContent } from '@/hooks/use-content'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  eyebrow: 'Notre approche',
  title: 'Une performance écologique, humaine et durable',
  paragraph1:
    "Chez Hop4Lead, la performance s'inscrit dans une vision à long terme qui favorise l'épanouissement. Nous refusons la performance subie pour prôner une performance qui respecte l'individu et s'accorde avec ses aspirations.",
  paragraph2:
    "Coaching exécutif, préparation mentale et biohacking : trois expertises complémentaires au service des dirigeants, des athlètes et des équipes qui veulent aller plus haut sans se perdre.",
  image: 'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
}

export function StorySection() {
  const { data } = useContent('home', { story: defaults })
  const story = data.story ?? defaults

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle eyebrow={story.eyebrow} title={story.title} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease }}
          className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14"
        >
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <p>{story.paragraph1}</p>
            <p>{story.paragraph2}</p>
            <div className="pt-2">
              <Button variant="outline" className="group" asChild>
                <Link href="/a-propos">
                  Lire notre histoire
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/30">
            <img
              src={story.image}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
