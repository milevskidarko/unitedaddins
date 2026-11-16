import { Link, useLocation } from 'react-router-dom'
import { LANGS, localize, stripLang } from '../seo.js'
import { useLang } from '../i18n.jsx'

// EN | DE — links to the same page in the other language (keeps the #section).
export default function LangSwitch({ className = '' }) {
  const lang = useLang()
  const { pathname, hash } = useLocation()
  const base = stripLang(pathname)
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language / Sprache">
      {LANGS.map((l) => (
        <Link
          key={l}
          to={localize(base, l) + hash}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? 'true' : undefined}
          className={l === lang ? 'is-active' : ''}
          aria-label={l === 'en' ? 'English' : 'Deutsch'}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
