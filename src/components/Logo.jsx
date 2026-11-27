import { useId } from 'react'
import { L, useT } from '../i18n.jsx'

// "Interlock" mark: the A passes through the U with a clean gap (cut with a mask, so it
// works on any background). Same geometry as brand/united-addins-mark.svg.
const U = 'M6 6v16a12 12 0 0 0 24 0V6'
const A = 'M26 38 40 6h4l14 32'

// One slogan everywhere (same as the home page headline).
const T = {
  en: { tagline: 'The right software. The right partnership.', home: 'United Addins home' },
  de: { tagline: 'Die richtige Software. Die richtige Partnerschaft.', home: 'United Addins Startseite' },
  fr: { tagline: 'Le bon logiciel. Le bon partenaire.', home: 'Accueil United Addins' },
  es: { tagline: 'El software adecuado. El socio adecuado.', home: 'Inicio de United Addins' },
  nl: { tagline: 'De juiste software. De juiste partner.', home: 'United Addins startpagina' },
}

// The bare mark in one color (white by default), for placing on a colored background.
export function LogoMark({ color = '#fff', className }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox="0 0 64 44" aria-hidden="true">
      <defs>
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="90" height="70">
          <rect x="-10" y="-10" width="90" height="70" fill="#fff" />
          <path d={A} fill="none" stroke="#000" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>
      <g fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d={U} mask={`url(#${id}m)`} />
        <path d={A} />
      </g>
    </svg>
  )
}

export default function Logo({ light = false, tagline = false }) {
  const t = useT(T)
  // Unique ids: the logo appears twice on the page (header + footer).
  const id = useId().replace(/:/g, '')
  return (
    <L
      to="/"
      className={`logo ${light ? 'logo--light' : ''}`}
      aria-label={t.home}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg className="logo__mark" viewBox="0 0 64 44" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="0.5" stopColor="#3b5bff" />
            <stop offset="1" stopColor="#7c5cff" />
          </linearGradient>
          <mask id={`${id}m`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="90" height="70">
            <rect x="-10" y="-10" width="90" height="70" fill="#fff" />
            <path d={A} fill="none" stroke="#000" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          </mask>
        </defs>
        <path
          className="logo__u"
          pathLength="1"
          d={U}
          fill="none"
          stroke={light ? '#4f7cff' : '#2449e8'}
          strokeWidth="9"
          strokeLinecap="round"
          mask={`url(#${id}m)`}
        />
        <path
          pathLength="1"
          d={A}
          fill="none"
          stroke={`url(#${id}g)`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__text">
        <strong>United Addins</strong>
        {tagline && <small>{t.tagline}</small>}
      </span>
    </L>
  )
}
