import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface MarqueeProps {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  /** quantas cópias do conteúdo (precisa cobrir a largura da tela) */
  repeat?: number
  /** velocidade: tempo de uma volta completa */
  duration?: string
  gap?: string
}

/** Faixa que rola sem parar. A segunda cópia fica escondida dos leitores de tela. */
export function Marquee({ children, className, reverse, pauseOnHover, repeat = 3, duration = '45s', gap = '3rem' }: MarqueeProps) {
  return (
    <div
      className={cn('group flex overflow-hidden', className)}
      style={{ ['--duration' as string]: duration, ['--gap' as string]: gap, gap }}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            'marquee-track flex shrink-0 animate-marquee items-center justify-around',
            reverse && '[animation-direction:reverse]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
