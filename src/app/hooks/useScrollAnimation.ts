import { useInView } from 'motion/react'
import { useRef } from 'react'

export function useScrollAnimation(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '-100px'
  })

  return { ref, isInView }
}
