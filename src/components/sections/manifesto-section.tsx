'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function ManifestoSection() {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-xs font-semibold tracking-[0.22em] text-primary uppercase"
        >
          Notre conviction
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mt-5 font-display text-balance text-3xl leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl md:text-[2.5rem]"
        >
          La performance subie épuise. La performance écologique dure.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-7 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Nous croyons qu&apos;on peut performer longtemps sans se perdre. Que la réussite a plus
          de valeur quand elle respecte qui on est. Que l&apos;humain, bien accompagné, va
          toujours plus loin que ce qu&apos;il pensait possible.
        </motion.p>
      </div>
    </section>
  )
}
