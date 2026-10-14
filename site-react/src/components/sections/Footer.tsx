import { ArrowRight } from 'lucide-react'
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_LABEL, waUrl } from '../../lib/whatsapp'
import { goTo, Wrap } from '../Layout'

const col = 'grid content-start gap-2 text-[0.92rem]'
const colTitle = 'mb-1.5 text-[0.7rem] font-semibold tracking-[0.2em] text-accent uppercase'
const colLink = 'w-fit text-ink2 transition-colors hover:text-ink'

export function Footer() {
  return (
    <footer className="border-t border-line pt-[clamp(64px,8vw,100px)] pb-7">
      <Wrap>
        <div className="grid gap-12 border-b border-line pb-12 md:grid-cols-[1fr_1.4fr]">
          <p className="font-serif text-[clamp(3rem,8vw,6.4rem)] leading-[0.9] font-light tracking-[-0.02em]">BL Escadas</p>
          <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
            <div className={`${col} max-sm:col-span-2`}>
              <strong className={colTitle}>Onde estamos</strong>
              <span className="text-ink2">Nova Iguaçu, RJ</span>
              <span className="text-ink2">Atendemos todo o Rio de Janeiro e região</span>
            </div>
            <div className={col}>
              <strong className={colTitle}>Contato</strong>
              <a className={colLink} href={waUrl()} target="_blank" rel="noopener">WhatsApp {PHONE_LABEL}</a>
              <a className={colLink} href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram @blescadas</a>
              <a className={colLink} href={FACEBOOK_URL} target="_blank" rel="noopener">Facebook</a>
            </div>
            <div className={col}>
              <strong className={colTitle}>Navegação</strong>
              <a className={colLink} href="#catalogo" onClick={goTo('catalogo')}>Catálogo</a>
              <a className={colLink} href="#projetos" onClick={goTo('projetos')}>Projetos</a>
              <a className={colLink} href="#processo" onClick={goTo('processo')}>Como funciona</a>
              <a className={colLink} href="#orcamento" onClick={goTo('orcamento')}>Orçamento</a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-[0.84rem] text-ink3">
          <p>© {new Date().getFullYear()} BL Escadas Pré-Moldadas. Escadas de concreto sob medida.</p>
          <a href="#topo" onClick={goTo('topo')} className="group inline-flex items-center gap-2.5 border-b border-line2 py-1 font-medium text-ink transition-colors hover:border-accent hover:text-accent2">
            Voltar ao topo <ArrowRight className="size-[18px] -rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </Wrap>
    </footer>
  )
}
