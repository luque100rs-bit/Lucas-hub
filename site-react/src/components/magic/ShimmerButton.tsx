import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Base = {
  children: ReactNode
  className?: string
  shimmerColor?: string
}
type AnchorProps = Base & Omit<ComponentPropsWithoutRef<'a'>, keyof Base> & { href: string }
type ButtonProps = Base & Omit<ComponentPropsWithoutRef<'button'>, keyof Base> & { href?: undefined }

const base =
  'group relative isolate inline-flex min-h-[54px] items-center justify-center gap-2.5 overflow-hidden rounded-[14px] px-7 text-[0.93rem] font-medium tracking-[0.01em] whitespace-nowrap transition-transform duration-200 active:scale-[0.98]'

/** Botão com um brilho que passa de tempos em tempos. Vira link quando recebe `href`. */
export function ShimmerButton(props: AnchorProps | ButtonProps) {
  const { children, className, shimmerColor = 'rgb(201 165 123 / 0.55)', ...rest } = props
  const inner = (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 animate-shimmer" style={{ background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)` }} />
      {children}
    </>
  )
  const cls = cn(base, 'bg-ink text-[#0a0a0b] hover:bg-accent2', className)
  if ('href' in rest && rest.href) {
    return <a {...(rest as Omit<AnchorProps, keyof Base>)} className={cls}>{inner}</a>
  }
  return <button type="button" {...(rest as Omit<ButtonProps, keyof Base>)} className={cls}>{inner}</button>
}
