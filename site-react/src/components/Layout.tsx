import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { scrollToId } from '../lib/scroll'

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1240px] px-[clamp(16px,4vw,40px)]', className)}>{children}</div>
}

export function Section({ id, labelledBy, className, children }: { id: string; labelledBy: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-[clamp(80px,11vw,150px)]', className)}>
      {children}
    </section>
  )
}

/** Clique em âncora interna: rola suave até a seção sem recarregar nada. */
export const goTo = (id: string, after?: () => void) => (e: MouseEvent) => {
  e.preventDefault()
  after?.()
  scrollToId(id)
}
