import { useId } from 'react'
import { L, useT } from '../i18n.jsx'

// "Interlock" mark, traced from the brand artwork: the A's left leg is a ribbon that sweeps
// over the U (cut apart by a slit) and folds into the bottom of the U; the A's crossbar is
// split from the ribbon by the same slit. Filled shapes, same geometry as
// brand/united-addins-mark.svg and public/favicon.svg.
const VIEWBOX = '243 155 595 339'
// U: left arm + bowl (its right end tucks under the ribbon), and the cut-off right arm.
const U = 'M246 203.5A46 46 0 0 1 338 203.5V339C338 370 360 395 394 395C420 395 442 389 461.6 379L470 400 430 482.6A148 148 0 0 1 246 339Z'
const U_ARM = 'M450 345.3V202A42 42 0 0 1 492 160H551Z'
// A: ribbon, flat top, right leg and crossbar in one outline.
const A =
  'M428.4 440L563.3 192.4Q581.5 159 619.5 159H634.3Q672.3 159 689 193.1L833.5 488H765.5Q735.5 488 722.3 461.1L702.7 421H567.8L603.2 356H670.8L624.9 260.7L517.4 456.6Q500.8 487 462.8 487H395Q372 487 352 481C385 478 421.2 453.2 428.4 440Z'

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
  return (
    <svg className={className} viewBox={VIEWBOX} aria-hidden="true">
      <g fill={color}>
        <path d={U} />
        <path d={U_ARM} />
        <path d={A} />
      </g>
    </svg>
  )
}

// The full-color mark on its own (no text, no link), e.g. on the dark disc in Leader.jsx.
export function BrandMark({ className }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox={VIEWBOX} aria-hidden="true">
      <MarkGradients id={id} />
      <g fill={`url(#${id}gu)`}>
        <path d={U} />
        <path d={U_ARM} />
      </g>
      <path d={A} fill={`url(#${id}ga)`} />
    </svg>
  )
}

function MarkGradients({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}gu`} gradientUnits="userSpaceOnUse" x1="260" y1="170" x2="420" y2="480">
        <stop offset="0" stopColor="#2f6dff" />
        <stop offset="1" stopColor="#4a35e8" />
      </linearGradient>
      <linearGradient id={`${id}ga`} gradientUnits="userSpaceOnUse" x1="560" y1="160" x2="840" y2="490">
        <stop offset="0" stopColor="#49c6ff" />
        <stop offset="0.5" stopColor="#4062ff" />
        <stop offset="1" stopColor="#a63cf4" />
      </linearGradient>
    </defs>
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
      <svg className="logo__mark" viewBox={VIEWBOX} aria-hidden="true">
        <MarkGradients id={id} />
        <g className="logo__draw logo__u" fill={`url(#${id}gu)`}>
          <path d={U} />
          <path d={U_ARM} />
        </g>
        <path className="logo__draw logo__a" d={A} fill={`url(#${id}ga)`} />
      </svg>
      <span className="logo__text">
        <strong>United Addins</strong>
        {tagline && <small>{t.tagline}</small>}
      </span>
    </L>
  )
}
