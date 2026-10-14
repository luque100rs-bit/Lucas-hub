import { marqueeItems } from '../../content'
import { StairMark } from '../Icons'
import { Marquee } from '../magic/Marquee'

/** Faixa com os modelos e a região atendida (só informações reais do negócio). */
export function MarqueeStrip() {
  return (
    <div aria-label="Modelos e região atendida" role="group" className="mt-10 border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <Marquee pauseOnHover duration="50s" gap="3rem" repeat={3}>
        {marqueeItems.map((item) => (
          <span key={item} className="flex items-center gap-12 font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] font-light whitespace-nowrap text-ink/90">
            {item}
            <StairMark className="size-4 text-accent" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
