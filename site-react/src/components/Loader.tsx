import { motion } from 'motion/react'

/** Abertura: a escada da marca é desenhada e a tela sobe como uma cortina. */
export function Loader() {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[300] grid place-items-center bg-bg"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } }}
    >
      <motion.div className="grid justify-items-center gap-3.5" exit={{ opacity: 0, y: -14, transition: { duration: 0.4 } }}>
        <svg viewBox="0 0 132 100" fill="none" className="mb-2 w-[92px]">
          <motion.path
            d="M6 94h24V74h24V54h24V34h24V14h24"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.15, delay: 0.15, ease: [0.7, 0, 0.3, 1] }}
          />
        </svg>
        <motion.p
          className="font-serif text-[clamp(2rem,5vw,2.8rem)] leading-none font-light"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.14em' }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          BL Escadas
        </motion.p>
        <motion.p
          className="text-[0.62rem] tracking-[0.3em] text-ink3 uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Pré-moldadas · Nova Iguaçu
        </motion.p>
        <span className="mt-3.5 block h-px w-[140px] overflow-hidden bg-line2">
          <motion.span
            className="block h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
      </motion.div>
    </motion.div>
  )
}
