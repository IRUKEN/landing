import { motion } from 'motion/react'

// Strategic domains as constellation nodes - inspired by connected systems metaphor
const domains = [
  { x: 150, y: 80, label: 'Azure', sublabel: 'Cloud Platform', size: 6, delay: 0 },
  { x: 320, y: 60, label: 'Kubernetes', sublabel: 'Orchestration', size: 7, delay: 0.1 },
  { x: 480, y: 100, label: 'Security', sublabel: 'Zero Trust', size: 6, delay: 0.2 },
  { x: 100, y: 200, label: 'Developer', sublabel: 'Experience', size: 6, delay: 0.3 },
  { x: 280, y: 220, label: 'Architecture', sublabel: 'Strategic Core', size: 9, delay: 0.4 }, // Central
  { x: 460, y: 240, label: 'Observability', sublabel: 'Telemetry', size: 6, delay: 0.5 },
  { x: 140, y: 340, label: 'Automation', sublabel: 'CI/CD', size: 5, delay: 0.6 },
  { x: 320, y: 380, label: 'PlayFab', sublabel: 'Gaming Backend', size: 6, delay: 0.7 },
  { x: 500, y: 360, label: 'Scale', sublabel: '10M+ Users', size: 5, delay: 0.8 }
]

// Strategic connections showing system integration
const connections = [
  { from: 4, to: 0, strength: 1 },   // Architecture → Azure
  { from: 4, to: 1, strength: 1 },   // Architecture → K8s
  { from: 4, to: 2, strength: 1 },   // Architecture → Security
  { from: 4, to: 3, strength: 1 },   // Architecture → DevEx
  { from: 4, to: 5, strength: 1 },   // Architecture → Observability
  { from: 4, to: 6, strength: 0.7 }, // Architecture → Automation
  { from: 4, to: 7, strength: 1 },   // Architecture → PlayFab
  { from: 4, to: 8, strength: 0.7 }, // Architecture → Scale
  { from: 0, to: 1, strength: 0.5 }, // Azure → K8s
  { from: 1, to: 2, strength: 0.5 }, // K8s → Security
  { from: 3, to: 6, strength: 0.5 }, // DevEx → Automation
  { from: 5, to: 6, strength: 0.4 }, // Observability → Automation
  { from: 7, to: 8, strength: 0.5 }, // PlayFab → Scale
  { from: 2, to: 5, strength: 0.4 }  // Security → Observability
]

export function StrategicConstellation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 600 450" className="w-full h-full">
        {/* Background ambient glow */}
        <defs>
          <radialGradient id="ambientGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="450" fill="url(#ambientGlow)" />

        {/* Connection lines - showing system integration */}
        <g>
          {connections.map((conn, i) => (
            <motion.line
              key={i}
              x1={domains[conn.from].x}
              y1={domains[conn.from].y}
              x2={domains[conn.to].x}
              y2={domains[conn.to].y}
              stroke="var(--brand-primary)"
              strokeWidth={conn.strength * 1.5}
              strokeOpacity={conn.strength * 0.2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: conn.strength * 0.2 }}
              transition={{ duration: 1.5, delay: 0.8 + i * 0.03, ease: "easeOut" }}
            />
          ))}
        </g>

        {/* Domain nodes - the strategic constellation */}
        {domains.map((domain, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: domain.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer pulsing glow */}
            <motion.circle
              cx={domain.x}
              cy={domain.y}
              r={domain.size * 3.5}
              fill="var(--brand-primary)"
              opacity="0"
              animate={{
                r: [domain.size * 3.5, domain.size * 4.5, domain.size * 3.5],
                opacity: [0, 0.1, 0]
              }}
              transition={{
                duration: 3,
                delay: domain.delay + 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Middle ring */}
            <circle
              cx={domain.x}
              cy={domain.y}
              r={domain.size * 2}
              fill="none"
              stroke="var(--brand-primary)"
              strokeWidth="0.5"
              opacity="0.15"
            />

            {/* Inner ring */}
            <circle
              cx={domain.x}
              cy={domain.y}
              r={domain.size * 1.2}
              fill="none"
              stroke="var(--brand-primary)"
              strokeWidth="0.5"
              opacity="0.3"
            />

            {/* Core node - larger if it's Architecture */}
            <circle
              cx={domain.x}
              cy={domain.y}
              r={domain.size}
              fill="var(--brand-primary)"
              opacity={i === 4 ? 0.9 : 0.7}
            />

            {/* Center highlight */}
            <circle
              cx={domain.x}
              cy={domain.y}
              r={domain.size * 0.4}
              fill="var(--text-primary)"
              opacity="0.9"
            />

            {/* Label - Primary */}
            <text
              x={domain.x}
              y={domain.y + domain.size + 16}
              textAnchor="middle"
              className="fill-text-primary text-[11px] font-medium"
              opacity="0.9"
            >
              {domain.label}
            </text>

            {/* Label - Sublabel */}
            <text
              x={domain.x}
              y={domain.y + domain.size + 28}
              textAnchor="middle"
              className="fill-text-tertiary text-[9px]"
              opacity="0.6"
            >
              {domain.sublabel}
            </text>
          </motion.g>
        ))}

        {/* Strategic indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <line
            x1="30" y1="20" x2="80" y2="20"
            stroke="var(--brand-primary)"
            strokeWidth="1"
            opacity="0.3"
          />
          <text
            x="90"
            y="24"
            className="fill-text-tertiary text-[9px] font-mono uppercase tracking-wider"
            opacity="0.5"
          >
            Connected Systems Architecture
          </text>
        </motion.g>

        {/* Bottom coordinate indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7 }}
        >
          <text
            x="30"
            y="430"
            className="fill-text-tertiary text-[8px] font-mono"
            opacity="0.4"
          >
            MICROSOFT GAMING INFRASTRUCTURE
          </text>
        </motion.g>
      </svg>
    </div>
  )
}
