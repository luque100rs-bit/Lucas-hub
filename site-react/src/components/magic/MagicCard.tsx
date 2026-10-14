import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface MagicCardProps {
  children: ReactNode
  className?: string
  gradientColor?: string
}

/** Cartão com um brilho que acompanha o mouse ou o dedo. O brilho não muda a leitura, só destaca. */
export function MagicCard({ children, className, gradientColor = 'rgb(201 165 123 / 0.16)' }: MagicCardProps) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const style = { '--glow': gradientColor } as CSSProperties
  return (
    <div onPointerMove={move} onPointerDown={move} style={style} className={cn('group/magic relative overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/magic:opacity-100"
        style={{ background: 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%)' }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}
