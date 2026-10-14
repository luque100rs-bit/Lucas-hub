import { useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { contactPhoto, formModels } from '../../content'
import { cn } from '../../lib/cn'
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_LABEL, waUrl } from '../../lib/whatsapp'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../Icons'
import { Section, Wrap } from '../Layout'
import { BlurFade } from '../magic/BlurFade'
import { BorderBeam } from '../magic/BorderBeam'
import { ShimmerButton } from '../magic/ShimmerButton'
import { SplitHeading } from '../SplitHeading'

interface ContactProps {
  model: string
  onModelChange: (model: string) => void
}

const fieldLabel = 'text-[0.72rem] tracking-[0.16em] text-ink3 uppercase'
const fieldInput = 'w-full border-0 border-b border-line2 bg-transparent py-2.5 pb-3 text-base text-ink transition-colors placeholder:text-[#6c675f] hover:border-ink3 focus:border-accent focus:outline-none'

export function Contact({ model, onModelChange }: ContactProps) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState<{ url: string; opened: boolean } | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) {
      setError('Escreve seu nome pra gente saber com quem está falando.')
      document.getElementById('f-name')?.focus()
      return
    }
    setError('')
    const lines = [`Olá! Meu nome é ${name.trim()} e quero um orçamento.`, '', `*Modelo:* ${model}`]
    if (city.trim()) lines.push(`*Local da obra:* ${city.trim()}`)
    if (height.trim()) lines.push(`*Altura piso a piso:* ${height.trim()}`)
    if (width.trim()) lines.push(`*Largura:* ${width.trim()}`)
    if (msg.trim()) lines.push('', msg.trim())
    const url = waUrl(lines.join('\n'))
    const win = window.open(url, '_blank', 'noopener')
    setSent({ url, opened: Boolean(win) })
  }

  return (
    <Section id="orcamento" labelledBy="orc-t" className="!pt-0">
      <Wrap>
        <BlurFade>
          <div className="relative grid overflow-hidden rounded-[22px] border border-line bg-bg2 md:rounded-[28px] md:grid-cols-[0.9fr_1.1fr]">
            <BorderBeam size={220} duration={16} />
            <div className="relative min-h-[440px] md:min-h-[560px]">
              <img src={contactPhoto.src} alt={contactPhoto.alt} width={contactPhoto.width} height={contactPhoto.height} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover object-[50%_60%]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/50 to-bg/10" />
              <div className="absolute inset-x-0 bottom-0 p-[clamp(24px,3.5vw,40px)]">
                <p className="mb-[26px] max-w-[14ch] font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.05] font-light">Do concreto cru ao acabamento em madeira.</p>
                <ul className="grid gap-0.5">
                  {[
                    { href: waUrl(), icon: <WhatsAppIcon className="size-5" />, label: 'WhatsApp', value: PHONE_LABEL },
                    { href: INSTAGRAM_URL, icon: <InstagramIcon className="size-5" />, label: 'Instagram', value: '@blescadas' },
                    { href: FACEBOOK_URL, icon: <FacebookIcon className="size-5" />, label: 'Facebook', value: 'BL Escadas Pré-Moldadas' },
                  ].map((c) => (
                    <li key={c.label}>
                      <a href={c.href} target="_blank" rel="noopener" className="flex items-center gap-3.5 py-2 transition-colors hover:text-accent2">
                        {c.icon}
                        <span><small className="block text-[0.62rem] leading-tight tracking-[0.18em] text-ink3 uppercase">{c.label}</small>{c.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form onSubmit={submit} noValidate className="grid content-start gap-x-[18px] gap-y-[22px] p-[clamp(28px,4.5vw,56px)] sm:grid-cols-2">
              <SplitHeading id="orc-t" parts={[{ text: 'Peça seu orçamento' }]} className="font-serif text-[clamp(2.2rem,4.4vw,3.2rem)] leading-none font-light tracking-[-0.01em] sm:col-span-2" />
              <p className="-mt-2 mb-1.5 text-[0.95rem] text-ink2 sm:col-span-2">Só o nome é obrigatório. Ao enviar, a mensagem abre prontinha no WhatsApp pra você revisar.</p>

              <div className="grid gap-2">
                <label htmlFor="f-name" className={fieldLabel}>Seu nome</label>
                <input id="f-name" name="nome" type="text" autoComplete="name" required value={name} onChange={(e) => { setName(e.target.value); if (error) setError('') }} placeholder="Como podemos te chamar?" aria-invalid={Boolean(error)} aria-describedby="f-name-err" className={cn(fieldInput, error && 'border-[#e5776b]')} />
                {error && <p id="f-name-err" role="alert" className="text-[0.82rem] text-[#f0958a]">{error}</p>}
              </div>
              <div className="grid gap-2">
                <label htmlFor="f-city" className={fieldLabel}>Bairro / cidade da obra</label>
                <input id="f-city" name="local" type="text" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex.: Nova Iguaçu, RJ" className={fieldInput} />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <label htmlFor="f-model" className={fieldLabel}>Modelo</label>
                <div className="relative">
                  <select id="f-model" name="modelo" value={model} onChange={(e) => onModelChange(e.target.value)} className={cn(fieldInput, 'cursor-pointer appearance-none pr-7')}>
                    {formModels.map((m) => <option key={m} className="bg-surface text-ink">{m}</option>)}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0.5 size-[18px] -translate-y-1/2 text-ink2" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="f-height" className={fieldLabel}>Altura piso a piso</label>
                <input id="f-height" name="altura" type="text" inputMode="decimal" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Ex.: 2,90 m" className={fieldInput} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="f-width" className={fieldLabel}>Largura da escada</label>
                <input id="f-width" name="largura" type="text" inputMode="decimal" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Ex.: 70 cm" className={fieldInput} />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <label htmlFor="f-msg" className={fieldLabel}>Algo mais?</label>
                <textarea id="f-msg" name="detalhes" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Prazo, acabamento que pretende usar, se a obra já está pronta..." className={cn(fieldInput, 'min-h-24 resize-y')} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-[22px] gap-y-4 sm:col-span-2">
                <ShimmerButton type="submit" className="max-sm:w-full"><WhatsAppIcon className="size-[18px]" /> Enviar pelo WhatsApp</ShimmerButton>
                <p role="status" aria-live="polite" className="text-[0.88rem] text-ink2">
                  {sent && (
                    <>
                      {sent.opened ? 'Abrimos o WhatsApp numa nova aba. Se não apareceu, ' : 'Seu navegador bloqueou a nova aba. '}
                      <a href={sent.url} target="_blank" rel="noopener" className="text-accent2 underline underline-offset-[3px]">toque aqui pra abrir a mensagem</a>.
                    </>
                  )}
                </p>
              </div>
            </form>
          </div>
        </BlurFade>
      </Wrap>
    </Section>
  )
}
