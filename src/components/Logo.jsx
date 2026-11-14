import { useId } from 'react'

// "Interlock" mark: the A passes through the U with a clean gap (cut with a mask, so it
// works on any background). Same geometry as brand/united-addins-mark.svg.
const U = 'M6 6v16a12 12 0 0 0 24 0V6'
const A = 'M26 38 40 6h4l14 32'

export default function Logo({ light = false, tagline = false }) {
  // Unique ids: the logo appears twice on the page (header + footer).
  const id = useId().replace(/:/g, '')
  return (
    <a href="#top" className={`logo ${light ? 'logo--light' : ''}`} aria-label="United Addins home">
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
        {tagline && <small>Digital Solutions. Together.</small>}
      </span>
    </a>
  )
}
