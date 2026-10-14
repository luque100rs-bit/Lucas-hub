import { motion, useReducedMotion } from 'motion/react'
import { aboutPhotos } from '../../content'
import { Section, Wrap } from '../Layout'
import { BlurFade } from '../magic/BlurFade'
import { SplitHeading } from '../SplitHeading'

export function About() {
  const reduce = useReducedMotion()
  return (
    <Section id="sobre" labelledBy="sobre-t">
      <Wrap className="grid items-center gap-[clamp(48px,7vw,110px)] md:grid-cols-2">
        <div className="grid max-w-[520px] gap-[22px]">
          <SplitHeading id="sobre-t" parts={[{ text: 'Sobre nós' }]} className="mb-2.5 font-serif text-[clamp(2.7rem,6.2vw,5rem)] leading-none font-light tracking-[-0.01em]" />
          <BlurFade delay={0.05}><p className="text-[1.04rem] text-ink2">A BL Escadas fabrica escadas pré-moldadas de concreto em Nova Iguaçu e atende obras em todo o Rio de Janeiro e região. A gente mede o seu vão, molda a escada sob medida e instala no local, da escada reta de obra até a flutuante com revestimento de madeira.</p></BlurFade>
          <BlurFade delay={0.12}><p className="text-[1.04rem] text-ink2">Como a peça chega pronta, o resto da obra continua andando. E você fala direto com quem fabrica, do primeiro contato pelo WhatsApp até a escada instalada.</p></BlurFade>
          <BlurFade delay={0.2}>
            <dl className="mt-[18px] grid grid-cols-2 gap-7 border-t border-line pt-7 max-sm:gap-[18px]">
              <div>
                <dt className="mb-2.5 font-serif text-[clamp(2.2rem,4vw,3rem)] leading-none font-light">RJ</dt>
                <dd className="text-[0.86rem] leading-normal text-ink3">Fabricamos em Nova Iguaçu e atendemos todo o estado e região</dd>
              </div>
              <div>
                <dt className="mb-2.5 font-serif text-[clamp(2.2rem,4vw,3rem)] leading-none font-light">Direto</dt>
                <dd className="text-[0.86rem] leading-normal text-ink3">Orçamento e atendimento com quem fabrica, pelo WhatsApp</dd>
              </div>
            </dl>
          </BlurFade>
        </div>

        <div className="group/strips flex h-[clamp(360px,46vw,600px)] gap-2 sm:gap-3">
          {aboutPhotos.map((p, i) => (
            <motion.figure
              key={p.src}
              tabIndex={0}
              initial={reduce ? false : { clipPath: 'inset(18% 0 0 0 round 20px)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0 round 20px)', opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: i * (reduce ? 0 : 32) }}
              className="group/strip relative min-w-0 flex-1 overflow-hidden rounded-[20px] bg-surface transition-[flex] duration-700 ease-[cubic-bezier(.22,1,.36,1)] [@media(hover:hover)]:group-hover/strips:flex-[0.8] [@media(hover:hover)]:hover:!flex-[1.9] focus-visible:flex-[1.9]"
            >
              <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" className="size-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-bg/80 to-transparent px-[18px] pt-12 pb-[18px] text-[0.72rem] tracking-[0.18em] whitespace-nowrap uppercase opacity-0 transition-all duration-500 group-hover/strip:translate-y-0 group-hover/strip:opacity-100 group-focus-visible/strip:translate-y-0 group-focus-visible/strip:opacity-100">
                {p.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Wrap>
    </Section>
  )
}
