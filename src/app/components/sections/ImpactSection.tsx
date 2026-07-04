import { motion } from 'motion/react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const highlights = [
  {
    area: 'Frontend Engineering',
    body: 'Built and maintained modern web interfaces using React, Angular and TypeScript with attention to accessibility, responsiveness and user experience.'
  },
  {
    area: 'Backend & APIs',
    body: 'Worked with backend services, API integration and business logic across Java, .NET, Node.js and REST-based systems.'
  },
  {
    area: 'Cloud & DevOps',
    body: 'Contributed to deployment workflows, Docker-based environments, CI/CD processes, cloud platforms and operational troubleshooting.'
  },
  {
    area: 'Developer Experience',
    body: 'Created documentation, onboarding material, testing workflows and implementation patterns to help teams work with more clarity.'
  },
  {
    area: 'AI-Assisted Engineering',
    body: 'I use AI as an acceleration layer - not as a replacement for engineering judgment. Technical reasoning, testing, communication and production awareness remain the foundation.'
  }
]

const workAreas = [
  {
    title: 'Secrets & Certificates Management',
    description: 'User-facing credential and certificate management. UI work, API integration, validation logic and unit testing.'
  },
  {
    title: 'Telemetry Experience',
    description: 'Telemetry-related UI functionality, exposing relevant system events and improving visibility for users.'
  },
  {
    title: 'VM Startup Script Configuration',
    description: 'Configuration experience involving UI design, validation, file handling, localization and reusable logic separation.'
  },
  {
    title: 'Developer Documentation',
    description: 'Technical guides and onboarding resources to reduce friction for engineers working with complex systems.'
  },
  {
    title: 'Production Issue Investigation',
    description: 'Structured investigation of bugs, UI regressions, validation issues, permission behavior and data inconsistencies.'
  },
  {
    title: 'Cloud Platform Contributions',
    description: 'Cloud platform features and internal tooling in an enterprise environment, working across frontend, backend and documentation.'
  }
]

export function ImpactSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="impact" className="py-48 relative" style={{ background: 'var(--surface-bg)', backgroundOpacity: 0.2 }}>
      {/* Section number watermark */}
      <div className="absolute right-8 top-24 select-none pointer-events-none text-right">
        <div className="font-display font-bold text-text-primary/[0.04]" style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}>02</div>
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
              Experience
            </span>
          </div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="mb-32 max-w-[820px]"
          >
            <h2 className="font-display font-medium text-text-primary leading-[1.05] mb-10"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            >
              Building across product,<br />platform and operations.
            </h2>
            <div className="h-px w-20 bg-border-primary mb-10" />
            <p className="text-text-secondary leading-relaxed max-w-[620px]"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}
            >
              I do not define myself by one technology. I define myself by the ability
              to understand how the pieces connect - and to build systems that reflect
              that understanding.
            </p>
          </motion.div>

          {/* Experience highlights - editorial rows */}
          <div className="mb-32">
            <div className="space-y-0 border-t border-border-secondary">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.area}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 border-b border-border-secondary/50"
                >
                  <div className="md:col-span-1 pt-1">
                    <span className="font-mono text-[10px] text-text-tertiary/40 tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display font-medium text-text-primary"
                      style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
                    >
                      {item.area}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-text-secondary leading-relaxed"
                      style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
                    >
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Work areas - sparse, no card grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-[11px] text-text-tertiary/50 uppercase tracking-[0.2em]">
                Work areas
              </span>
              <div className="h-px flex-1 bg-border-secondary" />
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-12">
              {workAreas.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
                  className="border-l border-border-secondary pl-6"
                >
                  <h4 className="font-display font-medium text-text-primary mb-2"
                    style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-text-tertiary leading-relaxed"
                    style={{ fontSize: 'clamp(0.8rem, 1vw, 0.88rem)' }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
