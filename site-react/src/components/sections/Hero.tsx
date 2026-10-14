import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import poster from '../../assets/video/escada-hero-poster.jpg'
import video from '../../assets/video/escada-hero.mp4'
import { INSTAGRAM_URL, waUrl } from '../../lib/whatsapp'
import { Burger } from '../Header'
import { InstagramIcon, StairMark, WhatsAppIcon } from '../Icons'
import { goTo } from '../Layout'
import { ShimmerButton } from '../magic/ShimmerButton'
import { SplitHeading } from '../SplitHeading'

const ease = [0.22, 1, 0.36, 1] as const
const links = [
  { id: 'topo', label: 'Início' },
  { id: 'sobre', label: 'Sobre nós' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'orcamento', label: 'Orçamento' },
]

interface HeroProps {
  ready: boolean
  menuOpen: boolean
  onMenuToggle: () => void
}

export function Hero({ ready, menuOpen, onMenuToggle }: HeroProps) {
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const media = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const bodyOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15])

  // O vídeo começa quando a foto se abre e para no último quadro.
  useEffect(() => {
    if (!ready || reduce) return
    const t = setTimeout(() => { media.current?.play().catch(() => {}) }, 150)
    return () => clearTimeout(t)
  }, [ready, reduce])

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: ready || reduce ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease },
  })

  return (
    <section ref={section} id="topo" aria-labelledby="hero-title" className="px-2.5 pt-3.5 md:px-[clamp(16px,4vw,40px)]">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 60, scale: 0.94 }}
        animate={ready || reduce ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1.4, ease }}
        className="relative mx-auto grid min-h-[min(860px,calc(100svh-28px))] max-w-[1400px] grid-rows-[auto_1fr_auto] overflow-hidden rounded-[22px] border border-line bg-bg2 p-4 md:rounded-[28px] md:px-[clamp(18px,3.2vw,44px)] md:pt-7 md:pb-[clamp(28px,4.5vw,56px)]"
      >
        <motion.div
          style={{ y: mediaY }}
          className="absolute inset-0 overflow-hidden md:left-[36%]"
          initial={reduce ? false : { clipPath: 'inset(0 0 0 100%)' }}
          animate={ready || reduce ? { clipPath: 'inset(0 0 0 0%)' } : undefined}
          transition={{ duration: 1.7, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.video
            ref={media}
            muted
            playsInline
            preload="auto"
            poster={poster}
            width={720}
            height={1280}
            aria-label="Animação de uma escada flutuante de madeira com um rastro de luz dourada subindo pelos degraus"
            className="h-[115%] w-full object-cover object-[50%_45%] md:object-[50%_55%]"
            initial={reduce ? false : { scale: 1.3 }}
            animate={ready || reduce ? { scale: 1 } : undefined}
            transition={{ duration: 2.6, delay: 0.1, ease }}
          >
            <source src={video} type="video/mp4" />
          </motion.video>
        </motion.div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_19/.55)_0%,rgb(17_17_19/.1)_28%,rgb(17_17_19/.7)_52%,#111113_78%)] md:bg-[linear-gradient(90deg,#111113_0%,#111113_34%,rgb(17_17_19/.82)_46%,rgb(17_17_19/.2)_68%,transparent_100%),linear-gradient(0deg,rgb(10_10_11/.55)_0%,transparent_30%)]" />

        <motion.div {...fade(0.55)} className="relative z-10 flex items-center justify-between gap-5">
          <a href="#topo" onClick={goTo('topo')} aria-label="BL Escadas Pré-Moldadas" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-line2 bg-bg/40 text-accent"><StairMark className="size-5" /></span>
            <span className="flex flex-col text-[0.82rem] leading-tight font-semibold tracking-[0.2em] uppercase">
              BL Escadas
              <small className="text-[0.6rem] font-medium tracking-[0.24em] text-ink3 max-md:hidden">Pré-moldadas</small>
            </span>
          </a>
          <nav aria-label="Principal" className="hidden gap-0.5 rounded-full border border-line2 bg-[#0c0c0e]/55 p-[5px] backdrop-blur-xl min-[1081px]:flex">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)} aria-current={l.id === 'topo' ? 'true' : undefined} className="rounded-full px-4 py-2 text-[0.82rem] text-ink2 transition-colors hover:bg-white/[0.06] hover:text-ink aria-[current]:bg-white/10 aria-[current]:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram @blescadas" className="grid size-11 place-items-center rounded-xl border border-line2 bg-bg/40 backdrop-blur-md transition-colors hover:border-accent hover:text-accent2 max-md:hidden"><InstagramIcon className="size-[18px]" /></a>
            <a href={waUrl()} target="_blank" rel="noopener" aria-label="WhatsApp (21) 96431-8649" className="grid size-11 place-items-center rounded-xl border border-line2 bg-bg/40 backdrop-blur-md transition-colors hover:border-accent hover:text-accent2"><WhatsAppIcon className="size-[18px]" /></a>
            <Burger open={menuOpen} onClick={onMenuToggle} className="min-[1081px]:hidden" />
          </div>
        </motion.div>

        <motion.div style={{ y: bodyY, opacity: bodyOpacity }} className="relative z-10 grid max-w-[640px] gap-[18px] self-end pt-[30vh] md:gap-[26px] md:pt-[72px]">
          <motion.p {...fade(0.7)} className="text-[0.72rem] font-semibold tracking-[0.22em] text-accent uppercase">Escadas pré-moldadas · Nova Iguaçu, RJ</motion.p>
          <SplitHeading
            as="h1"
            id="hero-title"
            inView={false}
            start={ready}
            delay={0.75}
            className="font-serif text-[clamp(2.9rem,6.4vw,5.6rem)] leading-[0.98] font-light tracking-[-0.015em]"
            parts={[{ text: 'Sua escada pronta em ' }, { text: 'dias', em: true }, { text: ', não em semanas.' }]}
          />
          <motion.p {...fade(1.35)} className="max-w-[50ch] text-[1.05rem] text-ink2">
            Flutuante, em L, reta ou caracol: a gente mede o seu vão, fabrica a escada de concreto sob medida e instala no local. Sem forma, sem escoramento e sem aquela obra molhada que atrasa todo o resto.
          </motion.p>
          <motion.div {...fade(1.5)} className="mt-1.5 flex flex-wrap gap-3 max-md:[&>*]:flex-1 max-md:[&>*]:basis-full">
            <ShimmerButton href="#catalogo" onClick={goTo('catalogo')}>
              Escolher minha escada <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </ShimmerButton>
            <a href={waUrl()} target="_blank" rel="noopener" className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-[14px] border border-line2 bg-bg/35 px-7 text-[0.93rem] font-medium backdrop-blur-md transition-colors hover:border-ink">
              <WhatsAppIcon className="size-[18px]" /> Pedir orçamento
            </a>
          </motion.div>
        </motion.div>

        <motion.a {...fade(1.8)} href="#sobre" onClick={goTo('sobre')} aria-label="Rolar para Sobre nós" className="absolute right-0 bottom-9 left-0 z-10 mx-auto flex w-max flex-col items-center gap-2.5 text-[0.64rem] tracking-[0.28em] text-ink2 uppercase transition-colors hover:text-ink max-md:hidden">
          <span className="relative h-[46px] w-px overflow-hidden bg-line2">
            <span className="absolute left-0 h-2/5 w-px animate-cue bg-accent2" />
          </span>
          Role
        </motion.a>
        <motion.p {...fade(1.8)} aria-hidden="true" className="absolute right-[clamp(18px,3.2vw,44px)] bottom-[clamp(28px,4.5vw,56px)] z-10 flex items-center gap-3.5 text-[0.7rem] tracking-[0.2em] text-ink/80 uppercase max-md:hidden">
          <span className="h-px w-14 bg-current" />Escadas sob medida
        </motion.p>
      </motion.div>
    </section>
  )
}
