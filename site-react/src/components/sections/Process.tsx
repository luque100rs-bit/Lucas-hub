import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { steps } from '../../content'
import { cn } from '../../lib/cn'
import { Section, Wrap } from '../Layout'
import { BlurFade } from '../magic/BlurFade'
import { SplitHeading } from '../SplitHeading'

export function Process() {
  const reduce = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: box, offset: ['start 80%', 'end 65%'] })
  const [lit, setLit] = useState(reduce ? steps.length : 0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setLit(Math.min(steps.length, Math.floor(v * steps.length + 0.15) + (v > 0.02 ? 1 : 0)))
  })

  return (
    <Section id="processo" labelledBy="proc-t">
      <Wrap>
        <div className="mb-[clamp(44px,6vw,72px)] grid max-w-[620px] gap-[22px]">
          <SplitHeading id="proc-t" parts={[{ text: 'Como funciona' }]} className="font-serif text-[clamp(2.7rem,6.2vw,5rem)] leading-none font-light tracking-[-0.01em]" />
          <BlurFade delay={0.05}><p className="max-w-[52ch] text-[1.04rem] text-ink2">Da medida à instalação, em quatro passos. Só o primeiro depende de você.</p></BlurFade>
        </div>

        <div ref={box} className="relative">
          {/* trilho: horizontal no computador, vertical no celular */}
          <div aria-hidden="true" className="absolute top-[26px] right-0 left-0 h-px bg-line2 max-md:hidden">
            <motion.span style={{ scaleX: reduce ? 1 : scrollYProgress }} className="absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent2 shadow-[0_0_12px_rgb(201_165_123/0.5)]" />
          </div>
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[26px] w-px bg-line2 md:hidden">
            <motion.span style={{ scaleY: reduce ? 1 : scrollYProgress }} className="absolute inset-0 origin-top bg-gradient-to-b from-accent to-accent2 shadow-[0_0_12px_rgb(201_165_123/0.5)]" />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-7">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[52px_1fr] gap-x-[22px] md:block">
                <span className={cn('relative z-10 grid size-[52px] place-items-center rounded-full border bg-bg text-[0.95rem] tracking-[0.08em] transition-colors duration-700 md:mb-[26px]', i < lit ? 'border-accent text-accent2' : 'border-line2')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <BlurFade delay={i * 0.1} className="max-md:pt-2.5">
                  <h3 className="mb-2.5 font-serif text-[1.7rem] leading-[1.1] font-normal">{s.title}</h3>
                  <p className="max-w-[30ch] text-[0.94rem] text-ink2 max-md:max-w-none">{s.text}</p>
                </BlurFade>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </Section>
  )
}
