import { motion } from 'motion/react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const steps = [
  {
    number: '01',
    name: 'Context',
    question: 'What is the real goal?',
    body: 'Business needs, user needs, team constraints and operational pressure define what success actually means. Before anything else, I understand what winning looks like.'
  },
  {
    number: '02',
    name: 'Constraints',
    question: 'What cannot be ignored?',
    body: 'Time, budget, compliance, legacy systems, team capacity and risk shape the solution space. Constraints are not obstacles - they are filters that remove weak options.'
  },
  {
    number: '03',
    name: 'Structure',
    question: 'How do the pieces connect?',
    body: 'Frontend, backend, data, infrastructure, people and process all influence the final system. Structure is the decision about how the pieces relate to each other before a single line is written.'
  },
  {
    number: '04',
    name: 'Execution',
    question: 'What can be built clearly and safely?',
    body: 'The best implementation is the one that solves the problem without creating unnecessary complexity. Clarity and safety are not limitations - they are outcomes of good thinking.'
  },
  {
    number: '05',
    name: 'Feedback',
    question: 'How do we know it works?',
    body: 'Testing, observability, user feedback, documentation and iteration turn delivery into learning. Shipping is not the end - it is the beginning of understanding.'
  }
]

export function SystemsSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="systems" className="py-48 relative">
      {/* Section number watermark */}
      <div className="absolute right-8 top-24 select-none pointer-events-none text-right">
        <div className="font-display font-bold text-text-primary/[0.04]" style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}>03</div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-20">
            <div className="h-px w-12 bg-brand-primary" />
            <span className="font-mono text-[11px] text-brand-primary uppercase tracking-[0.2em]">
              Thinking Model
            </span>
          </div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="mb-24 max-w-[740px]"
          >
            <h2 className="font-display font-medium text-text-primary leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            >
              How I move from<br />ambiguity to execution
            </h2>
          </motion.div>

          {/* Steps - pure typographic, no cards */}
          <div className="relative">
            {/* Thin vertical rule */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.8, ease: 'easeInOut' }}
              className="absolute left-0 top-0 bottom-0 w-px origin-top"
              style={{ background: 'var(--border-secondary)' }}
            />

            <div className="pl-10 space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.14, duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-14 border-b border-border-secondary last:border-b-0 relative"
                >
                  {/* Tick mark on the rule */}
                  <div
                    className="absolute -left-10 top-1/2 -translate-y-1/2 w-2.5 h-px"
                    style={{ background: 'var(--brand-primary)', opacity: 0.6 }}
                  />

                  {/* Step number */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-[11px] tracking-[0.15em] text-text-tertiary/60">{step.number}</span>
                  </div>

                  {/* Step name - large */}
                  <div className="md:col-span-3">
                    <h3 className="font-display font-medium text-text-primary"
                      style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)' }}
                    >
                      {step.name}
                    </h3>
                  </div>

                  {/* Question - medium, brand color */}
                  <div className="md:col-span-3 flex items-center">
                    <p className="text-brand-primary/70 leading-snug"
                      style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
                    >
                      {step.question}
                    </p>
                  </div>

                  {/* Body - right */}
                  <div className="md:col-span-5 flex items-center">
                    <p className="text-text-secondary leading-relaxed"
                      style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
                    >
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing statement - full width, silent, large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-32 pt-16 border-t border-border-secondary max-w-[820px]"
          >
            <p className="font-display font-medium text-text-secondary leading-snug"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Skip the thinking, pay the price later.{' '}
              <span className="text-text-tertiary/60">
                Most failures happen when teams build before they understand the system.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
