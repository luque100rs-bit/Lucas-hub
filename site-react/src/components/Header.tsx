import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { menuLinks, navLinks } from '../content'
import { cn } from '../lib/cn'
import { lockScroll, scrollToId } from '../lib/scroll'
import { INSTAGRAM_URL, FACEBOOK_URL, PHONE_LABEL, waUrl } from '../lib/whatsapp'
import { FacebookIcon, InstagramIcon, StairMark, WhatsAppIcon } from './Icons'

export function Burger({ open, onClick, className }: { open: boolean; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={open}
      aria-controls="menu"
      className={cn('relative size-11 rounded-xl border border-line2 bg-bg/40', className)}
    >
      <span className={cn('absolute left-[13px] right-[13px] h-[1.5px] bg-current transition-all duration-300', open ? 'top-[21px] rotate-45' : 'top-[17px]')} />
      <span className={cn('absolute left-[13px] right-[13px] h-[1.5px] bg-current transition-all duration-300', open ? 'top-[21px] -rotate-45' : 'top-[25px]')} />
    </button>
  )
}

interface HeaderProps {
  visible: boolean
  active: string | null
  menuOpen: boolean
  onMenuToggle: () => void
}

/** Barra flutuante que aparece depois do topo, com a seção atual destacada. */
export function Header({ visible, active, menuOpen, onMenuToggle }: HeaderProps) {
  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!visible || undefined}
      inert={!visible || undefined}
      className="fixed top-3.5 left-2.5 right-2.5 z-[80] mx-auto flex max-w-fit items-center justify-between gap-3.5 rounded-full border border-line2 bg-[#0e0e10]/75 p-[7px] pl-2.5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl max-md:max-w-none"
    >
      <a href="#topo" onClick={(e) => { e.preventDefault(); scrollToId('topo') }} aria-label="BL Escadas, voltar ao início" className="flex items-center gap-3">
        <span className="grid size-[34px] place-items-center rounded-full border border-line2 text-accent"><StairMark className="size-[17px]" /></span>
        <span className="text-[0.72rem] font-semibold tracking-[0.22em] whitespace-nowrap uppercase">BL Escadas</span>
      </a>

      <nav aria-label="Seções" className="hidden md:flex">
        {navLinks.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => { e.preventDefault(); scrollToId(l.id) }}
            aria-current={active === l.id ? 'true' : undefined}
            className={cn('relative rounded-full px-3.5 py-2 text-[0.82rem] transition-colors', active === l.id ? 'text-ink' : 'text-ink2 hover:text-ink')}
          >
            {active === l.id && (
              <motion.span layoutId="nav-lamp" transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="absolute inset-0 -z-10 rounded-full bg-white/10">
                <span className="absolute -top-2 left-1/2 h-0.5 w-[26px] -translate-x-1/2 rounded bg-accent shadow-[0_0_14px_3px_rgb(201_165_123/0.55)]" />
              </motion.span>
            )}
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a href={waUrl()} target="_blank" rel="noopener" aria-label="Chamar no WhatsApp" className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-wa px-4 text-[0.86rem] font-semibold text-[#06301a] transition-colors hover:bg-[#3ae07a] max-md:size-10 max-md:justify-center max-md:p-0">
          <WhatsAppIcon className="size-5" />
          <span className="max-md:hidden">WhatsApp</span>
        </a>
        <Burger open={menuOpen} onClick={onMenuToggle} className="md:!hidden !size-10 !rounded-full" />
      </div>
    </motion.header>
  )
}

/** Menu em tela cheia (celular). */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-bg px-[clamp(16px,4vw,40px)] pt-28 pb-[max(28px,env(safe-area-inset-bottom))]"
        >
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[clamp(16px,4vw,40px)] py-[22px]">
            <span className="text-[0.82rem] font-semibold tracking-[0.2em] uppercase">BL Escadas</span>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar menu" className="grid size-11 place-items-center rounded-xl border border-line2">
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Menu" className="grid">
            {menuLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); onClose(); lockScroll(false); scrollToId(l.id) }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-line py-1 font-serif text-[clamp(2rem,9vw,3rem)] leading-[1.25] font-light transition-colors hover:text-accent2"
              >
                {l.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a href={waUrl()} target="_blank" rel="noopener" className="inline-flex min-h-[54px] items-center gap-2.5 rounded-[14px] bg-wa px-6 font-semibold text-[#06301a]">
              <WhatsAppIcon className="size-5" />{PHONE_LABEL}
            </a>
            <div className="flex gap-2.5">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram @blescadas" className="grid size-12 place-items-center rounded-[14px] border border-line2"><InstagramIcon className="size-5" /></a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener" aria-label="Facebook BL Escadas" className="grid size-12 place-items-center rounded-[14px] border border-line2"><FacebookIcon className="size-5" /></a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
