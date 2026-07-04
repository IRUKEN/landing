import { motion } from 'motion/react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const truths = [
  {
    number: '01',
    heading: 'Complexity is inevitable',
    body: 'Every product grows. Every team adds process. Every system gains dependencies. You cannot prevent complexity, but you can design for it.'
  },
  {
    number: '02',
    heading: 'Chaos is optional',
    body: 'Complexity becomes chaos when structure is missing. Clear architecture, communication and feedback loops keep systems usable.'
  },
  {
    number: '03',
    heading: 'Technology is a tool',
    body: 'React, .NET, Java, Kubernetes, AI and cloud platforms are tools. The real value is knowing when, why and how to use them.'
  },
  {
    number: '04',
    heading: 'Communication is engineering',
    body: 'A solution that cannot be explained clearly is not finished. Good communication reduces risk, improves collaboration and accelerates delivery.'
  }
]

export function PhilosophySection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="philosophy" className="relative" style={{ background: 'var(--surface-dark)' }}>
      {/* Section number watermark */}
      <div className="absolute right-8 top-24 select-none pointer-events-none text-right">
        <div className="font-display font-bold text-text-primary/[0.03]" style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}>04</div>
      </div>

      {/* Dominant quote — nearly full viewport height */}
      <div className="min-h-[90vh] flex flex-col justify-center px-8 md:px-16 max-w-[1400px] mx-auto pt-32 pb-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-24">
            <div className="h-px w-12 bg-brand-primary" />
            <span className="font-mono text-[11px] text-brand-primary uppercase tracking-[0.2em]">
              Philosophy
            </span>
          </div>

          {/* The statement — dominant, breathes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="mb-20"
          >
            <h2 className="font-display font-medium text-text-primary leading-[1.0]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              I don't just<br />
              build software.<br />
              <span style={{ color: 'var(--brand-primary)' }}>
                I build understanding<br />
                first.
              </span>
            </h2>
          </motion.div>

          {/* Attribution — quiet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex items-center gap-6"
          >
            <div className="h-px w-16 bg-brand-primary/50" />
            <span className="text-text-tertiary/60" style={{ fontSize: '0.9rem' }}>Tabash Sequeira</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Secondary content — truths as sparse list */}
      <div className="px-8 md:px-16 max-w-[1400px] mx-auto pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="border-t border-border-secondary pt-20 mb-16">
            <span className="font-mono text-[11px] text-text-tertiary/50 uppercase tracking-[0.2em]">
              Four things I believe
            </span>
          </div>

          {/* Truths — editorial, no card borders */}
          <div className="space-y-0">
            {truths.map((truth, i) => (
              <motion.div
                key={truth.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.8 }}
                className="grid grid-cols-12 gap-8 py-10 border-b border-border-secondary/50 last:border-b-0"
              >
                <div className="col-span-1">
                  <span className="font-mono text-[10px] text-text-tertiary/40 tracking-widest">{truth.number}</span>
                </div>
                <div className="col-span-4">
                  <h3 className="font-display font-medium text-text-primary"
                    style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}
                  >
                    {truth.heading}
                  </h3>
                </div>
                <div className="col-span-7">
                  <p className="text-text-secondary leading-relaxed"
                    style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
                  >
                    {truth.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
