import { ArrowRight } from 'lucide-react'
import { models } from '../../content'
import { cn } from '../../lib/cn'
import { PlanCustom, PlanU } from '../Icons'
import { goTo, Section, Wrap } from '../Layout'
import { BlurFade } from '../magic/BlurFade'
import { MagicCard } from '../magic/MagicCard'
import { SplitHeading } from '../SplitHeading'

export function Catalog({ onPick }: { onPick: (option: string) => void }) {
  return (
    <Section id="catalogo" labelledBy="cat-t">
      <Wrap>
        <div className="mb-[clamp(44px,6vw,72px)] ml-auto grid max-w-[620px] justify-items-end gap-[22px] text-right">
          <SplitHeading id="cat-t" parts={[{ text: 'Catálogo' }]} className="font-serif text-[clamp(2.7rem,6.2vw,5rem)] leading-none font-light tracking-[-0.01em]" />
          <BlurFade delay={0.05}><p className="max-w-[52ch] text-[1.04rem] text-ink2">Cada vão pede uma escada. Esses são os formatos que mais fabricamos, e se o seu espaço não se encaixa em nenhum deles, a gente desenha a peça do zero.</p></BlurFade>
        </div>

        <ul className="grid gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(28px,3vw,40px)] sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m, i) => (
            <li key={m.name}>
              <BlurFade delay={(i % 3) * 0.08} className="h-full">
                <MagicCard className="flex h-full flex-col rounded-[14px]">
                  <div className={cn('relative mb-[22px] aspect-[4/3] overflow-hidden rounded-xl bg-surface', m.plan && 'grid place-items-center border border-line bg-[linear-gradient(rgb(255_255_255/.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.035)_1px,transparent_1px)] bg-[size:18px_18px] text-ink2', m.accent && 'border-accent/30 bg-[#17140f]')}>
                    {m.image && (
                      <img src={m.image.src} alt={m.image.alt} width={m.image.width} height={m.image.height} loading="lazy" decoding="async" style={{ objectPosition: m.image.position }} className="size-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover/magic:scale-[1.06]" />
                    )}
                    {m.plan === 'u' && <PlanU className="w-[58%] transition-transform duration-[1100ms] group-hover/magic:scale-105" />}
                    {m.plan === 'custom' && <PlanCustom className="w-[58%] transition-transform duration-[1100ms] group-hover/magic:scale-105" />}
                    {m.plan && <span className="absolute right-3.5 bottom-3 text-[0.64rem] tracking-[0.18em] text-ink3 uppercase">{m.accent ? 'Projeto especial' : 'Planta'}</span>}
                  </div>
                  <span className="mb-2 text-[0.72rem] tracking-[0.2em] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mb-2.5 text-[1.22rem] font-medium tracking-[0.01em]">{m.name}</h3>
                  <p className="mb-[26px] flex-1 text-[0.94rem] text-ink2">{m.text}</p>
                  <a
                    href="#orcamento"
                    onClick={goTo('orcamento', () => onPick(m.option))}
                    className="group/btn relative isolate flex min-h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[14px] border border-line2 text-[0.93rem] font-medium transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-ink before:transition-transform before:duration-500 hover:border-ink hover:text-bg hover:before:scale-y-100"
                  >
                    {m.cta}
                    <ArrowRight className="size-[18px] transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </MagicCard>
              </BlurFade>
            </li>
          ))}
        </ul>

        <BlurFade>
          <p className="mt-[clamp(40px,5vw,64px)] max-w-[70ch] border-t border-line pt-7 text-ink2">
            Também fazemos <b className="font-medium text-ink">escada clássica com corrimão</b>, <b className="font-medium text-ink">revestimento amadeirado</b> e larguras sob medida, como <b className="font-medium text-ink">55 cm</b> e <b className="font-medium text-ink">70 cm</b>.
          </p>
        </BlurFade>
      </Wrap>
    </Section>
  )
}
