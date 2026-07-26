import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Foundation' },
  { id: 'impact', label: 'Execution' },
  { id: 'systems', label: 'Framework' },
  { id: 'philosophy', label: 'Philosophy' },
  { href: '/cronogramas', label: 'Cronogramas' },
  { id: 'contact', label: 'Connect' }
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const observers = navItems.map(item => {
      if (!('id' in item)) return null
      const element = document.getElementById(item.id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id)
          }
        },
        { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
      )

      observer.observe(element)
      return observer
    })

    return () => observers.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    setIsMenuOpen(false)
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
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <div className="text-label text-text-primary font-semibold font-display truncate">
                Tabash Sequeira
              </div>
              <div className="hidden sm:block h-4 w-px bg-border-primary" />
              <div className="hidden sm:block text-label-sm text-text-tertiary font-mono whitespace-nowrap">
                SYSTEMS.STRATEGIST
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                'href' in item ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-label-sm transition-all duration-200 font-medium text-text-secondary hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      px-4 py-2 text-label-sm transition-all duration-200 font-medium
                      ${activeSection === item.id
                        ? 'text-brand-primary'
                        : 'text-text-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="h-px bg-brand-primary mt-1"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              ))}
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen(open => !open)}
              className="md:hidden inline-flex h-11 w-11 flex-shrink-0 items-center justify-center border border-border-primary text-text-primary hover:text-brand-primary hover:border-brand-primary/50 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-border-secondary bg-surface-bg/95"
          >
            <div className="px-5 py-3">
              {navItems.map(item => (
                'href' in item ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex w-full items-center justify-between py-4 text-left font-medium text-text-secondary hover:text-text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-text-tertiary/50">LINK</span>
                  </a>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      flex w-full items-center justify-between py-4 text-left font-medium transition-colors
                      ${activeSection === item.id
                        ? 'text-brand-primary'
                        : 'text-text-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-text-tertiary/50">
                      {item.id.toUpperCase()}
                    </span>
                  </button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
