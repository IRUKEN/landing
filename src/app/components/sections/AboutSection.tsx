import { motion } from 'motion/react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const principles = [
  {
    index: '01',
    heading: 'Architecture before implementation',
    body: 'Before building, I map the problem. Dependencies, edge cases, constraints, users, workflows and failure modes matter. A good architecture does not only tell you what to build — it also tells you what to avoid.'
  },
  {
    index: '02',
    heading: 'Clarity reduces friction',
    body: 'Unclear systems create slow teams. Clear interfaces, useful documentation, predictable workflows and thoughtful UI decisions help people move faster. The goal is not to make things look complex — the goal is to make complexity easier to work with.'
  },
  {
    index: '03',
    heading: 'Constraints reveal better solutions',
    body: 'Budget, time, legacy code, compliance and team capacity are not just obstacles. They are signals. They force better decisions and remove weak options. The best solutions emerge when you cannot afford to be imprecise.'
  }
]

export function AboutSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-48 relative">
      {/* Section number watermark */}
      <div className="absolute left-8 top-24 select-none pointer-events-none">
        <div className="font-display font-bold text-text-primary/[0.04]" style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}>01</div>
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
              Strategic Foundation
            </span>
          </div>

          {/* Main thesis — full width, very large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="mb-32 max-w-[900px]"
          >
            <h2 className="font-display font-medium text-text-primary leading-[1.05] mb-10"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              I don't just look for fixes.{' '}
              <span style={{ color: 'var(--brand-primary)' }}>
                I look for the structure behind the problem.
              </span>
            </h2>
            <div className="h-px w-20 bg-border-primary mb-10" />
            <p className="text-text-secondary leading-relaxed max-w-[660px]"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
            >
              Good engineering starts before the first line of code. I try to understand the
              business goal, the technical constraints, the user behavior, the team workflow
              and the failure modes before deciding what to build. My strongest skill is
              connecting pieces that often look separate.
            </p>
          </motion.div>

          {/* Three principles — editorial vertical stack */}
          <div className="space-y-0">
            {principles.map((p, i) => (
              <motion.div
                key={p.index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.18, duration: 0.9 }}
                className="grid grid-cols-12 gap-8 py-16 border-t border-border-secondary first:border-t-0"
              >
                {/* Large index number — left gutter */}
                <div className="col-span-2 pt-1">
                  <span className="font-display font-semibold text-text-primary/10 select-none"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1 }}
                  >
                    {p.index}
                  </span>
                </div>

                {/* Heading */}
                <div className="col-span-4 pt-1">
                  <h3 className="font-display font-medium text-text-primary leading-snug"
                    style={{ fontSize: 'clamp(1.3rem, 2vw, 1.75rem)' }}
                  >
                    {p.heading}
                  </h3>
                </div>

                {/* Body — right side, offset */}
                <div className="col-span-6 flex items-start">
                  <p className="text-text-secondary leading-relaxed"
                    style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
                  >
                    {p.body}
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
