import { useEffect, useState } from 'react'

/** Diz se a pessoa já passou do topo e qual seção está em foco. */
export function useScrollUi(ids: readonly string[], heroId = 'topo') {
  const [active, setActive] = useState<string | null>(null)
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const hero = document.getElementById(heroId)
      setPast(window.scrollY > (hero?.offsetHeight ?? 600) * 0.7)

      const probe = window.scrollY + window.innerHeight * 0.35
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= probe) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = ids[ids.length - 1] ?? null
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids, heroId])

  return { active, past }
}
