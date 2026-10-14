import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { Header, MobileMenu } from './components/Header'
import { Loader } from './components/Loader'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { About } from './components/sections/About'
import { Catalog } from './components/sections/Catalog'
import { Contact } from './components/sections/Contact'
import { Edge } from './components/sections/Edge'
import { Faq } from './components/sections/Faq'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { MarqueeStrip } from './components/sections/MarqueeStrip'
import { Process } from './components/sections/Process'
import { Projects } from './components/sections/Projects'
import { navLinks } from './content'
import { useScrollUi } from './hooks/useScrollUi'
import { lockScroll, startSmoothScroll } from './lib/scroll'

const sectionIds = navLinks.map((l) => l.id)

/** A tela de abertura aparece só na primeira visita da sessão e não para quem prefere menos movimento. */
function shouldShowLoader() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const seen = sessionStorage.getItem('bl-intro') === '1'
    sessionStorage.setItem('bl-intro', '1')
    return !seen
  } catch {
    return true
  }
}

export default function App() {
  const [showLoader] = useState(shouldShowLoader)
  const [loading, setLoading] = useState(showLoader)
  const [ready, setReady] = useState(!showLoader)
  const [menuOpen, setMenuOpen] = useState(false)
  const [model, setModel] = useState('Escada flutuante')
  const { active, past } = useScrollUi(sectionIds)

  useEffect(() => startSmoothScroll(), [])

  useEffect(() => {
    if (!showLoader) return
    lockScroll(true)
    const hide = setTimeout(() => setLoading(false), 1650)
    const start = setTimeout(() => { setReady(true); lockScroll(false) }, 1950)
    return () => { clearTimeout(hide); clearTimeout(start); lockScroll(false) }
  }, [showLoader])

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <a href="#conteudo" className="fixed top-3 left-3 z-[400] -translate-y-20 rounded-lg bg-ink px-3.5 py-2 text-bg focus:translate-y-0">Pular para o conteúdo</a>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Header visible={past} active={active} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <main id="conteudo">
        <Hero ready={ready} menuOpen={menuOpen} onMenuToggle={toggleMenu} />
        <MarqueeStrip />
        <About />
        <Catalog onPick={setModel} />
        <Projects />
        <Edge />
        <Process />
        <Faq />
        <Contact model={model} onModelChange={setModel} />
      </main>
      <Footer />
      <WhatsAppFloat visible={past} />
    </>
  )
}
