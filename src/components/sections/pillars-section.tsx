'use client'

import { motion } from 'framer-motion'

import { SectionTitle } from '@/components/ui/section-title'

const ease = [0.22, 1, 0.36, 1] as const

const pillars = [
  {
    number: '01',
    title: 'Coaching exécutif',
    expert: 'Cédric Vanhoutte',
    description:
      "Entrepreneurs et dirigeants : clarifier votre vision, décider aligné, déployer une stratégie qui tient dans la durée.",
  },
  {
    number: '02',
    title: 'Préparation mentale',
    expert: 'Franck Larrey',
    description:
      "Athlètes et équipes : un mindset solide pour révéler votre plein potentiel au moment des échéances qui comptent.",
  },
  {
    number: '03',
    title: 'Biohacking',
    expert: 'Fabrice Bigot',
    description:
      "Compétiteurs de haute intensité : concentration, flow et récupération, pilotés par les neurosciences.",
  },
]

export function PillarsSection() {
  return (
    <section className="border-b border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle
          eyebrow="Notre approche"
          title="Trois expertises, une même vision"
          description="Cédric, Franck et Fabrice réunissent leurs spécialités pour vous accompagner sur tous les leviers de la performance."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="flex flex-col"
            >
              <p className="font-display text-[11px] font-bold tracking-[0.22em] text-primary">
                {p.number}
              </p>
              <h3 className="mt-4 font-display text-xl leading-tight tracking-[-0.01em] text-foreground sm:text-2xl">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.expert}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
