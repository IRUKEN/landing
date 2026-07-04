import { motion } from 'motion/react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const capabilities = {
  'Frontend': ['React', 'Angular', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  'Backend': ['.NET', 'Java', 'NestJS', 'Node.js', 'GraphQL'],
  'Cloud & Infrastructure': ['Azure', 'AWS', 'Kubernetes', 'Docker', 'Terraform'],
  'Security': ['OAuth 2.0', 'JWT', 'Certificate Management', 'Zero Trust Architecture'],
  'Data & Observability': ['Event Streaming', 'Telemetry', 'Distributed Tracing', 'Real-time Analytics']
}

export function TechSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="tech" className="py-32 bg-surface-bg/30">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-16"
        >
          {/* Section Header */}
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-display font-semibold text-text-primary">
              Technical Capabilities
            </h2>
            <p className="text-label text-text-secondary">
              Technology is a tool. Strategy is what matters.
            </p>
            <div className="h-px w-32 bg-border-primary" />
          </div>

          {/* Capability Groups */}
          <div className="grid grid-cols-2 gap-8">
            {Object.entries(capabilities).map(([category, techs], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-4"
              >
                <h3 className="text-label text-brand-primary font-medium uppercase tracking-wide">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-surface-bg border border-border-primary
                                 rounded-corner-md text-label-sm text-text-secondary
                                 hover:border-brand-primary hover:text-text-primary
                                 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
