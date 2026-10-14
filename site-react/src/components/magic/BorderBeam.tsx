import type { CSSProperties } from 'react'

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
}

/** Feixe de luz que percorre a borda do cartão. O pai precisa ser `relative` e ter cantos arredondados. */
export function BorderBeam({ size = 160, duration = 14, delay = 0, borderWidth = 1.5, colorFrom = '#e2c49d', colorTo = '#c9a57b' }: BorderBeamProps) {
  const style = {
    '--beam-size': `${size}px`,
    '--beam-duration': `${duration}s`,
    '--beam-delay': `-${delay}s`,
    '--beam-width': `${borderWidth}px`,
    '--beam-from': colorFrom,
    '--beam-to': colorTo,
  } as CSSProperties
  return <div aria-hidden="true" className="border-beam" style={style} />
}
