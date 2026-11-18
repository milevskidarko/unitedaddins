import { createContext, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PAGES, SITE, LANGS, OG_LOCALES, localize, langFromPath, pageKeyFromPath } from './seo.js'

// Language comes from the URL: /de/... is German, /fr/... French, everything else English.
// Each component keeps its own strings next to its markup: const T = { en: {...}, de: {...} }

const LangContext = createContext('en')

export function LangProvider({ children }) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

// Picks the current language's strings (falls back to English).
export function useT(dict) {
  const lang = useLang()
  return dict[lang] || dict.en
}

// Internal link that keeps the current language: <L to="/foxit#plan">
export function L({ to, children, ...rest }) {
  const lang = useLang()
  if (/^(mailto:|https?:)/.test(to)) {
    return <a href={to} {...rest}>{children}</a>
  }
  return <Link to={localize(to, lang)} {...rest}>{children}</Link>
}

export function useLocalize() {
  const lang = useLang()
  return (path) => localize(path, lang)
}

// Keeps <title>, description, canonical, hreflang and og: tags in sync on client-side navigation.
export function usePageMeta() {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  const key = pageKeyFromPath(pathname)
  useEffect(() => {
    const page = PAGES[key]
    if (!page) {
      document.title = 'Page not found — United Addins'
      return
    }
    const meta = page[lang] || page.en
    const url = SITE + localize(page.path, lang)
    document.title = meta.title
    const set = (sel, attr, value) => document.head.querySelector(sel)?.setAttribute(attr, value)
    set('meta[name="description"]', 'content', meta.description)
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:url"]', 'content', url)
    set('meta[property="og:title"]', 'content', meta.title)
    set('meta[property="og:description"]', 'content', meta.description)
    set('meta[property="og:locale"]', 'content', OG_LOCALES[lang])
    LANGS.forEach((l) => set(`link[rel="alternate"][hreflang="${l}"]`, 'href', SITE + localize(page.path, l)))
    set('link[rel="alternate"][hreflang="x-default"]', 'href', SITE + page.path)
  }, [key, lang])
}
