import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Liga a rolagem suave (não liga para quem prefere menos movimento). */
export function startSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ duration: 1.15, anchors: { offset: -90 } })
  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)
  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

/** Trava a rolagem da página (menu e galeria abertos). */
export function lockScroll(lock: boolean) {
  document.body.classList.toggle('is-locked', lock)
  if (lenis) {
    if (lock) lenis.stop()
    else lenis.start()
  }
}

/** Rola suavemente até um id de seção. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -90 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
