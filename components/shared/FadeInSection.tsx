'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface FadeInSectionProps {
  children: ReactNode
  className?: string
}

export function FadeInSection({ children, className }: FadeInSectionProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
