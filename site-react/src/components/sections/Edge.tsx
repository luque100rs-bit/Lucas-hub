import { Check } from 'lucide-react'
import { comparison, facts } from '../../content'
import { FactIcon } from '../Icons'
import { Section, Wrap } from '../Layout'
import { BlurFade } from '../magic/BlurFade'
import { SplitHeading } from '../SplitHeading'

export function Edge() {
  return (
    <Section id="diferenciais" labelledBy="dif-t" className="border-y border-line bg-bg2">
      <Wrap>
        <div className="mb-[clamp(44px,6vw,72px)] ml-auto grid max-w-[620px] justify-items-end gap-[22px] text-right">
          <SplitHeading id="dif-t" parts={[{ text: 'Menos obra, mais escada' }]} className="font-serif text-[clamp(2.7rem,6.2vw,5rem)] leading-none font-light tracking-[-0.01em]" />
          <BlurFade delay={0.05}><p className="max-w-[52ch] text-[1.04rem] text-ink2">A escada moldada no local prende a obra por dias. A pré-moldada é fabricada fora e chega pronta, então o resto do serviço continua andando.</p></BlurFade>
        </div>

        <ul className="mb-7 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <li key={f.title} className="bg-bg2 transition-colors duration-500 hover:bg-surface">
              <BlurFade delay={i * 0.08} className="h-full px-[26px] py-[30px]">
                <FactIcon name={f.icon} className="mb-[26px] size-[30px] text-accent" />
                <h3 className="mb-1.5 text-[1.05rem] font-medium">{f.title}</h3>
                <p className="text-[0.9rem] text-ink3">{f.text}</p>
              </BlurFade>
            </li>
          ))}
        </ul>

        <BlurFade>
          <div className="overflow-hidden rounded-[20px] border border-line">
            <div className="hidden grid-cols-2 border-b border-line text-[0.7rem] tracking-[0.2em] uppercase sm:grid" aria-hidden="true">
              <span className="px-[26px] py-4 text-ink3">Moldada no local</span>
              <span className="px-[26px] py-4 text-accent">Pré-moldada BL</span>
            </div>
            {comparison.map(([local, pre]) => (
              <div key={local} className="grid border-b border-line last:border-b-0 sm:grid-cols-2">
                <p className="px-[18px] py-3.5 text-[0.88rem] text-ink3 line-through decoration-white/25 sm:px-[26px] sm:py-5 sm:text-[0.95rem] sm:no-underline">{local}</p>
                <p className="flex gap-3 border-line bg-accent/5 px-[18px] py-3.5 text-[0.95rem] sm:border-l sm:px-[26px] sm:py-5">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
                  {pre}
                </p>
              </div>
            ))}
          </div>
        </BlurFade>
      </Wrap>
    </Section>
  )
}
