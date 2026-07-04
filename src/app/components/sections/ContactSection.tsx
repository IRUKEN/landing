import { motion } from 'motion/react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Mail, Linkedin, Github, Globe } from 'lucide-react'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@tabashsequeira.com',
    href: 'mailto:contact@tabashsequeira.com'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/erni-tabash',
    href: 'https://linkedin.com/in/erni-tabash'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/IRUKEN',
    href: 'https://github.com/IRUKEN'
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'ernitabash.com',
    href: 'https://ernitabash.com'
  }
]

export function ContactSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="contact" className="relative py-48">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-24">
            <div className="h-px w-12 bg-brand-primary" />
            <span className="font-mono text-[11px] text-brand-primary uppercase tracking-[0.2em]">
              Connect
            </span>
          </div>

          {/* Closing statement — the last page of the book */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-24 max-w-[800px]"
          >
            <h2 className="font-display font-medium text-text-primary leading-[1.05]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              If your system needs<br />
              to be clearer,<br />
              <span style={{ color: 'var(--brand-primary)' }}>let's talk.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-text-secondary leading-relaxed mb-20 max-w-[480px]"
            style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
          >
            Whether the challenge involves software, infrastructure,
            processes or people — I look for ways to bring structure
            to complexity.
          </motion.p>

          {/* Contact methods — minimal list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="space-y-0 border-t border-border-secondary max-w-[520px]"
          >
            {contacts.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                  className="group flex items-center justify-between py-5 border-b border-border-secondary/50 last:border-b-0 hover:border-brand-primary/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-5">
                    <Icon size={15} className="text-text-tertiary/50 group-hover:text-brand-primary transition-colors duration-300 flex-shrink-0" />
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors duration-300"
                      style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
                    >
                      {c.value}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-text-tertiary/30 group-hover:text-brand-primary/50 transition-colors duration-300 tracking-widest uppercase">
                    {c.label}
                  </span>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Footer — signature line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-32 pt-10 border-t border-border-secondary flex items-end justify-between"
          >
            <span className="font-mono text-[10px] text-text-tertiary/30 tracking-[0.2em] uppercase">
              © 2026 Tabash Sequeira
            </span>
            <span className="font-mono text-[10px] text-text-tertiary/30 tracking-[0.2em] uppercase">
              Built with clarity, precision and purpose
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
