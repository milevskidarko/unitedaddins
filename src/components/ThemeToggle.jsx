import { useEffect, useState } from 'react'
import { useT } from '../i18n.jsx'

// Theme follows the operating system until the visitor picks one; the choice is remembered.
// The first paint is handled by the inline script in index.html (no white flash).
const T = {
  en: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
  de: { toDark: 'Dunkles Design aktivieren', toLight: 'Helles Design aktivieren' },
  fr: { toDark: 'Activer le mode sombre', toLight: 'Activer le mode clair' },
  es: { toDark: 'Activar modo oscuro', toLight: 'Activar modo claro' },
  nl: { toDark: 'Donkere modus inschakelen', toLight: 'Lichte modus inschakelen' },
  it: { toDark: 'Attiva la modalità scura', toLight: 'Attiva la modalità chiara' },
  pl: { toDark: 'Włącz tryb ciemny', toLight: 'Włącz tryb jasny' },
}

const current = () => document.documentElement.dataset.theme || 'light'

function apply(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#070c22' : '#f7f9ff')
}

export default function ThemeToggle({ className = '' }) {
  const t = useT(T)
  const [theme, setTheme] = useState(current)

  // Keep following the system while the visitor has not chosen.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      let saved = null
      try { saved = localStorage.getItem('theme') } catch { /* storage blocked */ }
      if (saved) return
      const next = e.matches ? 'dark' : 'light'
      apply(next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    // Smooth colour cross-fade, only for the switch itself.
    root.classList.add('theme-anim')
    apply(next)
    setTheme(next)
    window.setTimeout(() => root.classList.remove('theme-anim'), 450)
    try {
      // Picking the system's own theme again goes back to "follow the system".
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      if (next === system) localStorage.removeItem('theme')
      else localStorage.setItem('theme', next)
    } catch { /* storage blocked: still works for this visit */ }
  }

  const dark = theme === 'dark'
  return (
    <button
      type="button"
      className={`theme-toggle ${dark ? 'is-dark' : ''} ${className}`}
      onClick={toggle}
      aria-label={dark ? t.toLight : t.toDark}
      title={dark ? t.toLight : t.toDark}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <mask id="tt-moon">
          <rect width="24" height="24" fill="#fff" />
          <circle className="theme-toggle__cut" cx="24" cy="4" r="8" fill="#000" />
        </mask>
        <circle className="theme-toggle__core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#tt-moon)" />
        <g className="theme-toggle__rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4 6 18M18 6l1.4-1.4" />
        </g>
      </svg>
    </button>
  )
}
