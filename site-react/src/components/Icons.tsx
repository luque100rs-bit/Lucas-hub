import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.11-1.34A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.6 0-3.09-.46-4.35-1.26l-.31-.19-3.24.85.87-3.16-.2-.32A7.94 7.94 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.29-5.71c-.23-.12-1.37-.68-1.58-.75-.21-.08-.37-.12-.52.12-.15.23-.6.75-.74.9-.14.15-.27.17-.5.06-.23-.12-.98-.36-1.87-1.15-.69-.61-1.16-1.37-1.29-1.6-.14-.23-.01-.35.1-.47.11-.11.23-.27.35-.4.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.52-1.26-.72-1.72-.19-.46-.38-.4-.52-.4-.14 0-.29-.02-.44-.02s-.4.06-.61.29c-.21.23-.8.78-.8 1.9s.82 2.21.94 2.36c.12.15 1.61 2.46 3.9 3.45.55.24.97.38 1.3.48.55.17 1.05.15 1.44.09.44-.07 1.37-.56 1.56-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.28z" />
  </svg>
)

export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <g fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
    </g>
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
  </svg>
)

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.3c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4.02v2.2H8v3h2.4V21h3.1z" />
  </svg>
)

export const StairMark = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...p}>
    <path d="M3 20h6v-5h5v-5h7" />
  </svg>
)

export const FactIcon = ({ name, ...p }: P & { name: 'ruler' | 'stairs' | 'clock' | 'chat' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" {...p}>
    {name === 'ruler' && (<><path d="M3 17L17 3l4 4L7 21H3v-4z" /><path d="M13 7l2 2M10 10l1.5 1.5M7 13l2 2" /></>)}
    {name === 'stairs' && (<><path d="M4 20h5v-5h5v-5h6" /><path d="M4 20V4" /></>)}
    {name === 'clock' && (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)}
    {name === 'chat' && <path d="M21 12a9 9 0 01-13.3 7.9L3 21l1.1-4.6A9 9 0 1121 12z" />}
  </svg>
)

export const PlanU = (p: P) => (
  <svg viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Planta de escada em U" {...p}>
    <path d="M30 112V8h100v104H94V40H66v72z" />
    <path d="M30 40h36M94 40h36" />
    <path d="M30 54h36M30 68h36M30 82h36M30 96h36M94 54h36M94 68h36M94 82h36M94 96h36" strokeWidth=".8" />
    <path d="M48 106V24h64v82M107 100l5 6 5-6" stroke="var(--color-accent)" strokeWidth="1.5" />
  </svg>
)

export const PlanCustom = (p: P) => (
  <svg viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Croqui de escada sob medida em vão irregular" {...p}>
    <path d="M22 108V38L68 14l70 10v84z" strokeDasharray="5 5" stroke="var(--color-accent)" />
    <path d="M22 4v8M138 14v8M22 8h116" strokeWidth=".8" opacity=".6" />
    <path d="M150 24v84M146 24h8M146 108h8" strokeWidth=".8" opacity=".6" />
    <path d="M58 108V58h28V40h26V30" strokeWidth="1.6" />
    <circle cx="112" cy="30" r="3" fill="var(--color-accent)" stroke="none" />
  </svg>
)
