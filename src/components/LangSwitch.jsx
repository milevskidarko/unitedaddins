import { Link, useLocation } from 'react-router-dom'
import { LANGS, localize, stripLang } from '../seo.js'
import { useLang } from '../i18n.jsx'

const NAMES = { en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', nl: 'Nederlands', it: 'Italiano', pl: 'Polski' }

// EN | DE | FR | ES | NL | IT | PL — links to the same page in another language (keeps the #section).
export default function LangSwitch({ className = '' }) {
  const lang = useLang()
  const { pathname, hash } = useLocation()
  const base = stripLang(pathname)
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language / Sprache / Langue / Idioma / Taal / Lingua / Język">
      {LANGS.map((l) => (
        <Link
          key={l}
          to={localize(base, l) + hash}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? 'true' : undefined}
          className={l === lang ? 'is-active' : ''}
          aria-label={NAMES[l]}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
