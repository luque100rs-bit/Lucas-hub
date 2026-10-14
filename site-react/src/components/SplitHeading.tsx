import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../lib/cn'

export interface HeadingPart {
  text: string
  /** destaque em itálico dourado */
  em?: boolean
}

interface SplitHeadingProps {
  parts: HeadingPart[]
  as?: 'h1' | 'h2'
  id?: string
  className?: string
  delay?: number
  /** true: anima ao aparecer na tela. false: anima quando `start` vira true. */
  inView?: boolean
  start?: boolean
}

const container = (delay: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: delay } },
})
const word = {
  hidden: { y: '115%', rotate: 3 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const } },
}

/** Título que sobe palavra por palavra, de dentro de uma máscara. */
export function SplitHeading({ parts, as = 'h2', id, className, delay = 0, inView = true, start = true }: SplitHeadingProps) {
  const reduce = useReducedMotion()
  const label = parts.map((p) => p.text).join('')
  const Tag = motion[as]

  const tokens = parts.flatMap((p) =>
    p.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((t) => ({ t, em: p.em, space: /^\s+$/.test(t) })),
  )

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {parts.map((p, i) => (p.em ? <em key={i} className="font-light text-accent2 italic">{p.text}</em> : <span key={i}>{p.text}</span>))}
      </Tag>
    )
  }

  return (
    <Tag
      id={id}
      aria-label={label}
      className={className}
      variants={container(delay)}
      initial="hidden"
      whileInView={inView ? 'show' : undefined}
      animate={inView ? undefined : start ? 'show' : 'hidden'}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {tokens.map((tk, i) =>
        tk.space ? (
          ' '
        ) : (
          <span key={i} aria-hidden="true" className="-mt-[0.12em] -mb-[0.16em] inline-block overflow-hidden pt-[0.12em] pb-[0.16em] align-top">
            <motion.span variants={word} className={cn('inline-block origin-left will-change-transform', tk.em && 'font-light text-accent2 italic')}>
              {tk.t}
            </motion.span>
          </span>
        ),
      )}
    </Tag>
  )
}
