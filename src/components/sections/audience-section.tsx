'use client'

import { motion } from 'framer-motion'

import { SectionTitle } from '@/components/ui/section-title'

const ease = [0.22, 1, 0.36, 1] as const

const audiences = [
  {
    label: 'Pour les athlètes',
    text: "Champions confirmés ou en devenir, qui veulent transformer la pression des grandes échéances en carburant.",
  },
  {
    label: 'Pour les dirigeants',
    text: "Entrepreneurs, CEO et leaders qui cherchent à décider clair, à déléguer juste et à tenir sur la longueur.",
  },
  {
    label: 'Pour les équipes',
    text: "Codirs, comités, équipes de haut niveau qui veulent aligner leur énergie autour d'objectifs qui ont du sens.",
  },
]

export function AudienceSection() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle eyebrow="Pour qui" title="Celles et ceux qu'on accompagne" />

        <div className="mx-auto mt-14 max-w-4xl divide-y divide-border/60 border-y border-border/60">
          {audiences.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease, delay: i * 0.06 }}
              className="grid gap-3 py-6 sm:grid-cols-[1fr_2fr] sm:gap-8 sm:py-8"
            >
              <p className="font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
                {a.label}
              </p>
              <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {a.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
