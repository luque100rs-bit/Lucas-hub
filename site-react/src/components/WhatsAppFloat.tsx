import { motion } from 'motion/react'
import { waUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './Icons'

export function WhatsAppFloat({ visible }: { visible: boolean }) {
  return (
    <motion.a
      href={waUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      initial={false}
      animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-[60] flex h-14 items-center gap-2.5 rounded-[28px] bg-wa px-4 text-[#06301a] shadow-[0_14px_30px_-10px_rgb(37_211_102/0.45)] transition-colors hover:bg-[#3ae07a]"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="max-w-0 overflow-hidden text-[0.9rem] font-semibold whitespace-nowrap transition-[max-width] duration-500 group-hover:max-w-40 group-focus-visible:max-w-40">Pedir orçamento</span>
      {visible && <span aria-hidden="true" className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-[inherit] border-2 border-wa" />}
    </motion.a>
  )
}
