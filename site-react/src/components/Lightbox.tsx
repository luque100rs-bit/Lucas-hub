import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Photo } from '../content'
import { lockScroll } from '../lib/scroll'

interface LightboxProps {
  items: Photo[]
  index: number | null
  onChange: (index: number | null) => void
}

/** Visualização ampliada: setas do teclado, Esc, gesto de deslizar e foco preso dentro. */
export function Lightbox({ items, index, onChange }: LightboxProps) {
  const open = index !== null
  const dialog = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<Element | null>(null)
  const touchX = useRef<number | null>(null)

  const go = (delta: number) => {
    if (index === null) return
    onChange((index + delta + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement
    lockScroll(true)
    closeBtn.current?.focus()
    return () => {
      lockScroll(false)
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'Tab' && dialog.current) {
        const f = [...dialog.current.querySelectorAll<HTMLElement>('button')]
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const item = index === null ? null : items[index]

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onChange(null)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
          className="fixed inset-0 z-[120] grid place-items-center bg-[#060607]/95 px-4 py-16 backdrop-blur-md"
        >
          <figure className="grid max-w-[min(920px,100%)] justify-items-center gap-3.5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[calc(100svh-170px)] w-auto max-w-full rounded-[14px]"
              />
            </AnimatePresence>
            <figcaption className="flex items-baseline gap-4 text-[0.95rem]">
              <span>{item.title}</span>
              <span className="text-[0.72rem] tracking-[0.16em] text-ink3">{(index ?? 0) + 1} / {items.length}</span>
            </figcaption>
          </figure>
          <button ref={closeBtn} type="button" onClick={() => onChange(null)} aria-label="Fechar" className="absolute top-4 right-4 grid size-[52px] place-items-center rounded-full border border-line2 bg-[#141416]/60 transition-colors hover:border-ink"><X className="size-[22px]" /></button>
          <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute top-1/2 left-4 grid size-[52px] -translate-y-1/2 place-items-center rounded-full border border-line2 bg-[#141416]/60 transition-colors hover:border-ink max-sm:top-auto max-sm:bottom-4 max-sm:left-[calc(50%-60px)] max-sm:translate-y-0"><ChevronLeft className="size-[22px]" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="absolute top-1/2 right-4 grid size-[52px] -translate-y-1/2 place-items-center rounded-full border border-line2 bg-[#141416]/60 transition-colors hover:border-ink max-sm:top-auto max-sm:right-[calc(50%-60px)] max-sm:bottom-4 max-sm:translate-y-0"><ChevronRight className="size-[22px]" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
