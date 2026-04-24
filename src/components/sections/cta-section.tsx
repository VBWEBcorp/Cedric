'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useContent } from '@/hooks/use-content'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  eyebrow: 'Prêt à passer un cap ?',
  title: 'Parlons de votre performance',
  description: "Un premier échange sans engagement pour comprendre vos enjeux, individuels ou collectifs, et construire l'accompagnement qui vous ressemble.",
  button: 'Prendre contact',
}

const col1Images = [
  'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
  'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
  'https://i.ibb.co/nN80hwPf/Les3experts-1.png',
  'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
  'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
  'https://i.ibb.co/nN80hwPf/Les3experts-1.png',
]

const col2Images = [
  'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
  'https://i.ibb.co/nN80hwPf/Les3experts-1.png',
  'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
  'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
  'https://i.ibb.co/nN80hwPf/Les3experts-1.png',
  'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
]

function ScrollColumn({ images, direction, speed }: { images: string[]; direction: 'up' | 'down'; speed: number }) {
  // Triple the images so there's never a gap
  const tripled = [...images, ...images, ...images]
  // Each image block = height + gap. We need to scroll exactly one set of images.length
  // Using percentage-based: 1 set = 33.333% of tripled container
  const from = direction === 'up' ? '0%' : '-33.333%'
  const to = direction === 'up' ? '-33.333%' : '0%'

  return (
    <div className="w-[130px] lg:w-[150px] shrink-0">
      <motion.div
        className="flex flex-col gap-3"
        animate={{ y: [from, to] }}
        transition={{
          y: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          },
        }}
      >
        {tripled.map((src, i) => (
          <div
            key={`${direction}-${i}`}
            className="w-full aspect-[3/4] rounded-2xl overflow-hidden shrink-0"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function CtaSection() {
  const { data } = useContent('home', { cta: defaults })
  const cta = data.cta ?? defaults

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease }}
          className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-white dark:bg-zinc-900 shadow-[var(--shadow-lg)]"
        >

          <div className="relative flex items-stretch min-h-[420px] sm:min-h-[460px]">
            {/* Left - Text content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center p-10 sm:p-14 space-y-6">
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                {cta.eyebrow}
              </p>
              <h2 className="max-w-xl font-display text-balance text-3xl tracking-tight text-foreground sm:text-4xl">
                {cta.title}
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                {cta.description}
              </p>
              <Button size="lg" className="group" asChild>
                <Link href="/contact">
                  {cta.button}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            {/* Right - Scrolling images, clipped to card */}
            <div className="hidden md:block relative w-[300px] lg:w-[340px] shrink-0 overflow-hidden">
              {/* Fade top */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white dark:from-zinc-900 to-transparent z-20" />
              {/* Fade bottom */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent z-20" />
              {/* Fade left — smooth blend into text area */}
              <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-20" />

              <div className="absolute inset-0 overflow-hidden">
                <div className="flex gap-3 -rotate-6 translate-x-[10%]" style={{ height: '140%', marginTop: '-20%' }}>
                  <ScrollColumn images={col1Images} direction="up" speed={40} />
                  <ScrollColumn images={col2Images} direction="down" speed={45} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
