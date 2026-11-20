import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import LangSwitch from './LangSwitch.jsx'
import { L, useT } from '../i18n.jsx'
import { stripLang } from '../seo.js'
import { Arrow, Chevron, Menu, Close, Doc, Chart, Headset, Handshake, Cubes, Files, Ruler, Calendar } from './Icons.jsx'
import { CATEGORIES, PRODUCTS } from '../products.js'
import './Header.css'

// Products menu: one entry per category (Documents & PDF, Design, Planning) → its section on /products.
const CAT_ICONS = { docs: Files, design: Ruler, plan: Calendar }
const catItems = (lang) =>
  Object.entries(CATEGORIES).map(([key, label]) => ({
    icon: CAT_ICONS[key],
    title: label[lang],
    text: PRODUCTS.filter((p) => p.category === key).map((p) => p.name).join(', '),
    href: `/products#${key}`,
    cat: true, // category titles in capitals, like on /products
  }))

const T = {
  en: {
    nav: [
      {
        label: 'Products',
        items: [
          { icon: Doc, title: 'Foxit PDF Editor & eSign', text: 'Edit, protect and sign PDFs', href: '/foxit' },
          { icon: Chart, title: 'Mekko Graphics', text: 'Charts in PowerPoint & Excel', href: '/mekko-graphics' },
          ...catItems('en'),
          { icon: Cubes, title: 'All products', text: 'Everything we license, on one page', href: '/products' },
        ],
      },
      {
        label: 'Partners',
        items: [
          { icon: Handshake, title: 'Our vendors', text: 'Foxit, Mekko Graphics and more', href: '/products' },
          // The quote form requires a product, so partnership inquiries go by email instead.
          {
            icon: Cubes,
            title: 'Become a partner',
            text: 'Grow with United Addins',
            href: 'mailto:salesemea@unitedaddins.com?subject=Partnership%20inquiry',
          },
        ],
      },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: 'Contact Sales',
    open: 'Open menu',
    close: 'Close menu',
    help: 'Need help? Talk to our team',
    main: 'Main',
    skip: 'Skip to content',
  },
  de: {
    nav: [
      {
        label: 'Produkte',
        items: [
          { icon: Doc, title: 'Foxit PDF Editor & eSign', text: 'PDFs bearbeiten, schützen und signieren', href: '/foxit' },
          { icon: Chart, title: 'Mekko Graphics', text: 'Diagramme in PowerPoint & Excel', href: '/mekko-graphics' },
          ...catItems('de'),
          { icon: Cubes, title: 'Alle Produkte', text: 'Unser gesamtes Angebot auf einer Seite', href: '/products' },
        ],
      },
      {
        label: 'Partner',
        items: [
          { icon: Handshake, title: 'Unsere Hersteller', text: 'Foxit, Mekko Graphics und mehr', href: '/products' },
          {
            icon: Cubes,
            title: 'Partner werden',
            text: 'Wachsen Sie mit United Addins',
            href: 'mailto:salesemea@unitedaddins.com?subject=Partneranfrage',
          },
        ],
      },
      { label: 'Über uns', href: '/about' },
      { label: 'Kontakt', href: '/contact' },
    ],
    cta: 'Vertrieb kontaktieren',
    open: 'Menü öffnen',
    close: 'Menü schließen',
    help: 'Fragen? Sprechen Sie mit unserem Team',
    main: 'Hauptmenü',
    skip: 'Zum Inhalt springen',
  },
  fr: {
    nav: [
      {
        label: 'Produits',
        items: [
          { icon: Doc, title: 'Foxit PDF Editor & eSign', text: 'Modifier, protéger et signer des PDF', href: '/foxit' },
          { icon: Chart, title: 'Mekko Graphics', text: 'Graphiques dans PowerPoint et Excel', href: '/mekko-graphics' },
          ...catItems('fr'),
          { icon: Cubes, title: 'Tous les produits', text: 'Toute notre offre sur une seule page', href: '/products' },
        ],
      },
      {
        label: 'Partenaires',
        items: [
          { icon: Handshake, title: 'Nos éditeurs', text: 'Foxit, Mekko Graphics et plus', href: '/products' },
          {
            icon: Cubes,
            title: 'Devenir partenaire',
            text: 'Grandir avec United Addins',
            href: 'mailto:salesemea@unitedaddins.com?subject=Demande%20de%20partenariat',
          },
        ],
      },
      { label: 'À propos', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: 'Contacter les ventes',
    open: 'Ouvrir le menu',
    close: 'Fermer le menu',
    help: 'Besoin d’aide ? Parlez à notre équipe',
    main: 'Menu principal',
    skip: 'Aller au contenu',
  },
  es: {
    nav: [
      {
        label: 'Productos',
        items: [
          { icon: Doc, title: 'Foxit PDF Editor & eSign', text: 'Edite, proteja y firme PDF', href: '/foxit' },
          { icon: Chart, title: 'Mekko Graphics', text: 'Gráficos en PowerPoint y Excel', href: '/mekko-graphics' },
          ...catItems('es'),
          { icon: Cubes, title: 'Todos los productos', text: 'Toda nuestra oferta en una sola página', href: '/products' },
        ],
      },
      {
        label: 'Socios',
        items: [
          { icon: Handshake, title: 'Nuestros fabricantes', text: 'Foxit, Mekko Graphics y más', href: '/products' },
          {
            icon: Cubes,
            title: 'Conviértase en socio',
            text: 'Crezca con United Addins',
            href: 'mailto:salesemea@unitedaddins.com?subject=Solicitud%20de%20colaboraci%C3%B3n',
          },
        ],
      },
      { label: 'Sobre nosotros', href: '/about' },
      { label: 'Contacto', href: '/contact' },
    ],
    cta: 'Contactar con ventas',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    help: '¿Necesita ayuda? Hable con nuestro equipo',
    main: 'Menú principal',
    skip: 'Ir al contenido',
  },
  nl: {
    nav: [
      {
        label: 'Producten',
        items: [
          { icon: Doc, title: 'Foxit PDF Editor & eSign', text: 'PDF’s bewerken, beveiligen en ondertekenen', href: '/foxit' },
          { icon: Chart, title: 'Mekko Graphics', text: 'Grafieken in PowerPoint en Excel', href: '/mekko-graphics' },
          ...catItems('nl'),
          { icon: Cubes, title: 'Alle producten', text: 'Ons volledige aanbod op één pagina', href: '/products' },
        ],
      },
      {
        label: 'Partners',
        items: [
          { icon: Handshake, title: 'Onze leveranciers', text: 'Foxit, Mekko Graphics en meer', href: '/products' },
          {
            icon: Cubes,
            title: 'Partner worden',
            text: 'Groei met United Addins',
            href: 'mailto:salesemea@unitedaddins.com?subject=Partnerschapsaanvraag',
          },
        ],
      },
      { label: 'Over ons', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: 'Contact met sales',
    open: 'Menu openen',
    close: 'Menu sluiten',
    help: 'Hulp nodig? Spreek met ons team',
    main: 'Hoofdmenu',
    skip: 'Naar de inhoud',
  },
}

export default function Header() {
  const t = useT(T)
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const progress = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      // Reading-progress line under the header (set directly, no re-render).
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current?.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : '0')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close the mobile menu and any open dropdown after navigating.
  useEffect(() => {
    setOpen(false)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [pathname])

  const close = () => setOpen(false)
  // The About page starts with a dark section: light menu text until the header gets its background.
  const onDark = /^\/((de|fr|es|nl)\/)?about\/?$/.test(pathname)
  const isCurrent = (href) => !href.includes('#') && !href.startsWith('mailto:') && stripLang(pathname) === href

  return (
    <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''} ${onDark ? 'header--on-dark' : ''}`}>
      <div className="container header__inner">
        <Logo />

        <nav className="nav" aria-label={t.main}>
          <ul className="nav__list">
            {t.nav.map((n) => (
              <li key={n.label} className={`nav__item ${n.items ? 'has-drop' : ''}`}>
                {n.items ? (
                  <>
                    <button className="nav__link" aria-haspopup="true">
                      {n.label} <Chevron className="nav__chev" />
                    </button>
                    <div className="drop">
                      <div className="drop__panel">
                        {n.items.map((it) => (
                          <L key={it.title} to={it.href} className="drop__item">
                            <span className="drop__icon"><it.icon /></span>
                            <span>
                              <strong className={it.cat ? 'is-cat' : undefined}>{it.title}</strong>
                              <small>{it.text}</small>
                            </span>
                          </L>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <L className="nav__link" to={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                    {n.label}
                  </L>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <LangSwitch className="header__lang" />
          <ThemeToggle />
          <L to="/contact#quote" className="btn btn-primary btn-sm header__cta">
            {t.cta} <Arrow />
          </L>
          <button
            className="burger"
            aria-label={open ? t.close : t.open}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <span className="header__progress" ref={progress} aria-hidden="true" />
    </header>

      {/* Mobile drawer — rendered outside <header>: the header's backdrop-filter
          would otherwise become the containing block of this fixed element. */}
      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
        <div className="drawer__body">
          {t.nav.map((n, i) => (
            <div key={n.label} className={`drawer__group ${expanded === i ? 'is-open' : ''}`}>
              {n.items ? (
                <>
                  <button className="drawer__link" onClick={() => setExpanded(expanded === i ? null : i)}>
                    {n.label} <Chevron />
                  </button>
                  <div className="drawer__sub">
                    <div>
                      {n.items.map((it) => (
                        <L key={it.title} to={it.href} onClick={close} className="drawer__subitem">
                          <span className="drop__icon"><it.icon /></span>
                          <span>
                            <strong className={it.cat ? 'is-cat' : undefined}>{it.title}</strong>
                            <small>{it.text}</small>
                          </span>
                        </L>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <L className="drawer__link" to={n.href} onClick={close}>{n.label}</L>
              )}
            </div>
          ))}
          <LangSwitch className="drawer__lang" />
          <L to="/contact#quote" onClick={close} className="btn btn-primary drawer__cta">
            {t.cta} <Arrow />
          </L>
          <L to="/contact" onClick={close} className="drawer__support">
            <Headset /> {t.help}
          </L>
        </div>
      </div>
    </>
  )
}
