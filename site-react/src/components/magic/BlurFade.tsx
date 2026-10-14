import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface BlurFadeProps {
  children: ReactNode
  className?: string
  /** atraso em segundos */
  delay?: number
  duration?: number
  yOffset?: number
  blur?: string
}

/** Entrada com fade, deslocamento e desfoque quando o bloco aparece na tela (uma vez só). */
export function BlurFade({ children, className, delay = 0, duration = 0.9, yOffset = 22, blur = '8px' }: BlurFadeProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
