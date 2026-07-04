import { motion } from 'motion/react'
import heroImage from '../../../imports/ChatGPT_Image_Jun_7__2026__04_12_01_PM.png'

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Strategic vision"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient: left side darker for text legibility, right lets image breathe */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/60 to-[#020617]/20" />
        {/* Top and bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617]/70" />
      </div>

      {/* Architectural drafting overlay — pure geometry, no labels */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
          <defs>
            <filter id="subtle-blur">
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
          </defs>

          {/* Structural border rectangle — offset from edges */}
          <motion.rect
            x="3%" y="4%"
            width="94%" height="92%"
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="0.5"
            strokeOpacity="0.18"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.8 }}
          />

          {/* Horizontal guide — upper third */}
          <motion.line
            x1="3%" y1="28%" x2="97%" y2="28%"
            stroke="var(--border-primary)"
            strokeWidth="0.4"
            strokeOpacity="0.25"
            strokeDasharray="6 18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 2 }}
          />

          {/* Vertical guide — right third */}
          <motion.line
            x1="68%" y1="4%" x2="68%" y2="96%"
            stroke="var(--border-primary)"
            strokeWidth="0.4"
            strokeOpacity="0.18"
            strokeDasharray="4 20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 2.2 }}
          />

          {/* Compass arc — bottom right area */}
          <motion.path
            d="M 85% 88% A 80 80 0 0 0 72% 96%"
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="0.6"
            strokeOpacity="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 2.4 }}
          />

          {/* Crosshair marks at structural intersections */}
          {/* Top-left corner cross */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
          >
            <line x1="3%" y1="3.5%" x2="3%" y2="4.5%" stroke="var(--brand-primary)" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="2.5%" y1="4%" x2="3.5%" y2="4%" stroke="var(--brand-primary)" strokeWidth="0.8" strokeOpacity="0.4" />
          </motion.g>
          {/* Top-right corner cross */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
          >
            <line x1="97%" y1="3.5%" x2="97%" y2="4.5%" stroke="var(--brand-primary)" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="96.5%" y1="4%" x2="97.5%" y2="4%" stroke="var(--brand-primary)" strokeWidth="0.8" strokeOpacity="0.4" />
          </motion.g>
          {/* Intersection cross at right guide + upper guide */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            <line x1="68%" y1="27.5%" x2="68%" y2="28.5%" stroke="var(--brand-primary)" strokeWidth="0.8" strokeOpacity="0.35" />
            <line x1="67.5%" y1="28%" x2="68.5%" y2="28%" stroke="var(--brand-primary)" strokeWidth="0.8" strokeOpacity="0.35" />
          </motion.g>
        </svg>

        {/* Corner coordinate markers — typographic decoration only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute top-8 right-8 text-right"
        >
          <div className="font-mono text-[10px] text-text-tertiary/40 tracking-widest leading-relaxed">
            47.2° N<br />
            122.0° W
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.1 }}
          className="absolute bottom-8 right-8"
        >
          <div className="font-mono text-[10px] text-text-tertiary/30 tracking-widest">
            SYS.001
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 w-full relative" style={{ zIndex: 10 }}>
        <div className="flex items-center min-h-screen py-32">
          <div className="max-w-[560px]">

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="font-display font-semibold text-text-primary leading-[0.88] mb-14 tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', textShadow: '0 4px 60px rgba(0,0,0,0.95)' }}
            >
              Tabash<br />Sequeira
            </motion.h1>

            {/* Primary statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mb-10"
            >
              <p className="font-display font-medium text-text-primary leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', textShadow: '0 2px 30px rgba(0,0,0,0.9)' }}
              >
                I turn complexity<br />
                into{' '}
                <span className="italic" style={{ color: 'var(--brand-primary)' }}>usable systems</span>.
              </p>
            </motion.div>

            {/* Supporting line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-text-secondary leading-relaxed max-w-[440px] mb-14"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Some people see isolated problems. I see relationships,
              constraints, trade-offs and patterns. I bring structure
              to complexity.
            </motion.p>

            {/* Single CTA — understated */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-4 text-text-tertiary hover:text-brand-primary transition-colors duration-500 group"
            >
              <div className="h-px w-12 bg-border-primary group-hover:bg-brand-primary group-hover:w-16 transition-all duration-500" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">Read further</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
