import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { faq } from '../../content'
import { cn } from '../../lib/cn'
import { waUrl } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../Icons'
import { Section, Wrap } from '../Layout'
import { BlurFade } from '../magic/BlurFade'
import { SplitHeading } from '../SplitHeading'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Section id="duvidas" labelledBy="faq-t">
      <Wrap className="grid items-start gap-[clamp(40px,7vw,110px)] md:grid-cols-[0.8fr_1.2fr]">
        <div className="grid justify-items-start gap-[22px] md:sticky md:top-[110px]">
          <SplitHeading id="faq-t" parts={[{ text: 'Dúvidas' }]} className="font-serif text-[clamp(2.7rem,6.2vw,5rem)] leading-none font-light tracking-[-0.01em]" />
          <BlurFade delay={0.05}><p className="max-w-[36ch] text-ink2">Não achou a sua? Pergunta direto, a resposta costuma ser rápida.</p></BlurFade>
          <BlurFade delay={0.1}>
            <a href={waUrl()} target="_blank" rel="noopener" className="inline-flex min-h-[54px] items-center gap-2.5 rounded-[14px] border border-line2 px-7 text-[0.93rem] font-medium transition-colors hover:border-ink">
              <WhatsAppIcon className="size-[18px]" /> Perguntar no WhatsApp
            </a>
          </BlurFade>
        </div>

        <BlurFade>
          <div className="border-t border-line2">
            {faq.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q} className="border-b border-line2">
                  <h3 className="text-[1.08rem] font-medium">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-[26px] text-left leading-snug transition-colors hover:text-accent2"
                    >
                      {item.q}
                      <span aria-hidden="true" className={cn('relative size-8 shrink-0 rounded-full border transition-all duration-500', isOpen ? 'border-accent bg-accent text-[#111]' : 'border-line2')}>
                        <span className="absolute top-1/2 left-1/2 h-[1.3px] w-[11px] -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span className={cn('absolute top-1/2 left-1/2 h-[1.3px] w-[11px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-500', isOpen ? 'rotate-0' : 'rotate-90')} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pr-0 pb-[26px] text-ink2 sm:pr-14">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </BlurFade>
      </Wrap>
    </Section>
  )
}
