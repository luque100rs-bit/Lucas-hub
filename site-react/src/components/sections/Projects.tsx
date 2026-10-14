import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { filters, photos, type Category } from '../../content'
import { cn } from '../../lib/cn'
import { INSTAGRAM_URL } from '../../lib/whatsapp'
import { InstagramIcon } from '../Icons'
import { Lightbox } from '../Lightbox'
import { Section, Wrap } from '../Layout'
import { BlurFade } from '../magic/BlurFade'
import { SplitHeading } from '../SplitHeading'

export function Projects() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [open, setOpen] = useState<number | null>(null)
  const visible = useMemo(() => photos.filter((p) => filter === 'all' || p.category === filter), [filter])

  return (
    <Section id="projetos" labelledBy="proj-t" className="border-t border-line">
      <Wrap>
        <div className="mb-[clamp(44px,6vw,72px)] grid max-w-[620px] gap-[22px]">
          <SplitHeading id="proj-t" parts={[{ text: 'Projetos' }]} className="font-serif text-[clamp(2.7rem,6.2vw,5rem)] leading-none font-light tracking-[-0.01em]" />
          <BlurFade delay={0.05}><p className="max-w-[52ch] text-[1.04rem] text-ink2">Fotos de obras de verdade: umas ainda com o escoramento, outras já com acabamento. Toque na foto pra ver maior.</p></BlurFade>
        </div>

        <BlurFade>
          <div role="group" aria-label="Filtrar projetos" className="-mt-6 mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn('min-h-[42px] shrink-0 rounded-full border px-[18px] text-[0.86rem] transition-colors', filter === f.id ? 'border-ink bg-ink text-bg' : 'border-line2 text-ink2 hover:border-ink3 hover:text-ink')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </BlurFade>

        <ul className={cn('grid auto-rows-[210px] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[clamp(200px,21vw,300px)] sm:grid-cols-3 sm:gap-3 lg:grid-cols-4')}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.src}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : Math.min(i, 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={cn('min-h-0', p.big && filter === 'all' && 'max-sm:col-span-2 sm:col-span-2 sm:row-span-2')}
              >
                <button type="button" onClick={() => setOpen(i)} aria-label={`Ampliar foto: ${p.title}, ${p.subtitle}`} className="group relative block size-full cursor-zoom-in overflow-hidden rounded-xl bg-surface text-left">
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-bg/85 to-transparent px-3 pt-10 pb-3 sm:px-[18px] sm:pt-14 sm:pb-4">
                    <strong className="text-base font-medium">{p.title}</strong>
                    <span className="text-[0.66rem] tracking-[0.16em] text-ink2 uppercase max-sm:hidden">{p.subtitle}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <BlurFade>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-[18px] border-t border-line pt-7">
            <p className="text-ink2">Quer ver mais? A gente posta as obras novas no Instagram.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="group inline-flex items-center gap-2.5 border-b border-line2 py-1.5 font-medium transition-colors hover:border-accent hover:text-accent2">
              <InstagramIcon className="size-[18px]" />@blescadas<ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </BlurFade>
      </Wrap>
      <Lightbox items={visible} index={open} onChange={setOpen} />
    </Section>
  )
}
