import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Foundation' },
  { id: 'impact', label: 'Execution' },
  { id: 'systems', label: 'Framework' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'contact', label: 'Connect' }
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')

  // Intersection Observer for active section detection
  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
      )

      observer.observe(element)
      return observer
    })

    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="border-b border-border-primary bg-surface-bg/80">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <div className="flex items-center gap-4">
              <div className="text-label text-text-primary font-semibold font-display">
                Tabash Sequeira
              </div>
              <div className="h-4 w-px bg-border-primary" />
              <div className="text-label-sm text-text-tertiary font-mono">
                SYSTEMS.STRATEGIST
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`
                    px-4 py-2 text-label-sm transition-all duration-200 font-medium
                    ${activeSection === id
                      ? 'text-brand-primary'
                      : 'text-text-secondary hover:text-text-primary'
                    }
                  `}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeSection"
                      className="h-px bg-brand-primary mt-1"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
