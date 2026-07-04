import { motion } from 'motion/react'

export function SystemDiagram() {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.2))' }}
      >
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(203, 213, 225, 0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="600" height="600" fill="url(#grid)" />

        {/* Connection Lines */}
        <motion.path
          d="M 100 300 Q 200 200 300 300"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 300 300 Q 400 400 500 300"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 100 300 L 300 100"
          stroke="var(--border-primary)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.path
          d="M 500 300 L 300 500"
          stroke="var(--border-primary)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />

        {/* Nodes */}
        {[
          { cx: 100, cy: 300, delay: 0 },
          { cx: 300, cy: 100, delay: 0.2 },
          { cx: 300, cy: 300, delay: 0.4 },
          { cx: 300, cy: 500, delay: 0.6 },
          { cx: 500, cy: 300, delay: 0.8 }
        ].map((node, i) => (
          <g key={i}>
            {/* Outer glow ring */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="0"
              fill="var(--brand-primary)"
              fillOpacity="0.1"
              initial={{ r: 0 }}
              animate={{ r: 20 }}
              transition={{
                duration: 1.5,
                delay: node.delay,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            {/* Node circle */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="6"
              fill="var(--brand-primary)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: node.delay }}
            />
            {/* Inner core */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="2"
              fill="var(--text-primary)"
            />
          </g>
        ))}

        {/* Coordinate Labels */}
        <text x="50" y="30" className="text-label-sm" fill="var(--text-tertiary)" opacity="0.5">
          X: 0.00
        </text>
        <text x="50" y="580" className="text-label-sm" fill="var(--text-tertiary)" opacity="0.5">
          Y: 1.00
        </text>
        <text x="520" y="30" className="text-label-sm" fill="var(--text-tertiary)" opacity="0.5">
          Z: 0.50
        </text>
      </svg>
    </div>
  )
}
