import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import LangSwitch from './LangSwitch.jsx'
import { L, useT } from '../i18n.jsx'
import { LANGS, stripLang } from '../seo.js'
import { Arrow, Chevron, Menu, Close, Doc, Sign, Headset, Handshake, Cubes, Files, Ruler, Calendar, Slides } from './Icons.jsx'
import { CATEGORIES, PRESENTATIONS, PRODUCTS } from '../products.js'
import './Header.css'

// Products menu: PDF Editor and eSign as separate entries (they solve different problems), then
// Presentations and one entry per category (Documents & PDF, Design, Planning) → its section on /products.
const CAT_ICONS = { docs: Files, design: Ruler, plan: Calendar }

// Menu strings per language; the menu itself is built the same way for every language below.
const S = {
  en: {
    products: 'Products',
    pdf: ['PDF Editor', 'Foxit PDF Editor & Editor+ — edit, convert, protect'],
    esign: ['eSign', 'Foxit eSign — signatures, templates, audit trails'],
    all: ['All products', 'Everything we license, on one page'],
    partners: 'Partners',
    vendors: ['Our vendors', 'Foxit, Mekko Graphics and more'],
    become: ['Become a partner', 'Resellers, IT services and referrals'],
    about: 'About',
    contact: 'Contact',
    cta: 'Contact Sales',
    open: 'Open menu',
    close: 'Close menu',
    help: 'Need help? Talk to our team',
    main: 'Main',
    skip: 'Skip to content',
  },
  de: {
    products: 'Produkte',
    pdf: ['PDF Editor', 'Foxit PDF Editor & Editor+ — bearbeiten, konvertieren, schützen'],
    esign: ['eSign', 'Foxit eSign — Signaturen, Vorlagen, Prüfprotokolle'],
    all: ['Alle Produkte', 'Unser gesamtes Angebot auf einer Seite'],
    partners: 'Partner',
    vendors: ['Unsere Hersteller', 'Foxit, Mekko Graphics und mehr'],
    become: ['Partner werden', 'Reseller, IT-Dienstleister und Empfehlungen'],
    about: 'Über uns',
    contact: 'Kontakt',
    cta: 'Vertrieb kontaktieren',
    open: 'Menü öffnen',
    close: 'Menü schließen',
    help: 'Fragen? Sprechen Sie mit unserem Team',
    main: 'Hauptmenü',
    skip: 'Zum Inhalt springen',
  },
  fr: {
    products: 'Produits',
    pdf: ['PDF Editor', 'Foxit PDF Editor et Editor+ — modifier, convertir, protéger'],
    esign: ['eSign', 'Foxit eSign — signatures, modèles, pistes d’audit'],
    all: ['Tous les produits', 'Toute notre offre sur une seule page'],
    partners: 'Partenaires',
    vendors: ['Nos éditeurs', 'Foxit, Mekko Graphics et plus'],
    become: ['Devenir partenaire', 'Revendeurs, services IT et apporteurs d’affaires'],
    about: 'À propos',
    contact: 'Contact',
    cta: 'Contacter les ventes',
    open: 'Ouvrir le menu',
    close: 'Fermer le menu',
    help: 'Besoin d’aide ? Parlez à notre équipe',
    main: 'Menu principal',
    skip: 'Aller au contenu',
  },
  es: {
    products: 'Productos',
    pdf: ['PDF Editor', 'Foxit PDF Editor y Editor+ — editar, convertir, proteger'],
    esign: ['eSign', 'Foxit eSign — firmas, plantillas, registros de auditoría'],
    all: ['Todos los productos', 'Toda nuestra oferta en una sola página'],
    partners: 'Socios',
    vendors: ['Nuestros fabricantes', 'Foxit, Mekko Graphics y más'],
    become: ['Hágase partner', 'Revendedores, servicios IT y recomendaciones'],
    about: 'Sobre nosotros',
    contact: 'Contacto',
    cta: 'Contactar con ventas',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    help: '¿Necesita ayuda? Hable con nuestro equipo',
    main: 'Menú principal',
    skip: 'Ir al contenido',
  },
  nl: {
    products: 'Producten',
    pdf: ['PDF Editor', 'Foxit PDF Editor en Editor+ — bewerken, converteren, beveiligen'],
    esign: ['eSign', 'Foxit eSign — handtekeningen, sjablonen, audittrails'],
    all: ['Alle producten', 'Ons volledige aanbod op één pagina'],
    partners: 'Partners',
    vendors: ['Onze leveranciers', 'Foxit, Mekko Graphics en meer'],
    become: ['Partner worden', 'Resellers, IT-dienstverleners en doorverwijzers'],
    about: 'Over ons',
    contact: 'Contact',
    cta: 'Contact met sales',
    open: 'Menu openen',
    close: 'Menu sluiten',
    help: 'Hulp nodig? Spreek met ons team',
    main: 'Hoofdmenu',
    skip: 'Naar de inhoud',
  },
  it: {
    products: 'Prodotti',
    pdf: ['PDF Editor', 'Foxit PDF Editor ed Editor+ — modifica, converti, proteggi'],
    esign: ['eSign', 'Foxit eSign — firme, modelli, audit trail'],
    all: ['Tutti i prodotti', 'Tutta la nostra offerta in una pagina'],
    partners: 'Partner',
    vendors: ['I nostri vendor', 'Foxit, Mekko Graphics e altro'],
    become: ['Diventa partner', 'Rivenditori, servizi IT e segnalatori'],
    about: 'Chi siamo',
    contact: 'Contatti',
    cta: 'Contatta le vendite',
    open: 'Apri il menu',
    close: 'Chiudi il menu',
    help: 'Serve aiuto? Parla con il nostro team',
    main: 'Menu principale',
    skip: 'Vai al contenuto',
  },
  pl: {
    products: 'Produkty',
    pdf: ['PDF Editor', 'Foxit PDF Editor i Editor+ — edycja, konwersja, ochrona'],
    esign: ['eSign', 'Foxit eSign — podpisy, szablony, ścieżki audytu'],
    all: ['Wszystkie produkty', 'Cała nasza oferta na jednej stronie'],
    partners: 'Partnerzy',
    vendors: ['Nasi dostawcy', 'Foxit, Mekko Graphics i inni'],
    become: ['Zostań partnerem', 'Resellerzy, usługi IT i polecenia'],
    about: 'O nas',
    contact: 'Kontakt',
    cta: 'Poproś o wycenę',
    open: 'Otwórz menu',
    close: 'Zamknij menu',
    help: 'Potrzebujesz pomocy? Porozmawiaj z naszym zespołem',
    main: 'Menu główne',
    skip: 'Przejdź do treści',
  },
}

const buildNav = (lang, s) => ({
  ...s,
  nav: [
    {
      label: s.products,
      items: [
        { icon: Doc, title: s.pdf[0], text: s.pdf[1], href: '/foxit' },
        { icon: Sign, title: s.esign[0], text: s.esign[1], href: '/foxit#esign' },
        // Mekko Graphics and Efficient Elements share one "Presentations" entry → its section on /products.
        { icon: Slides, title: PRESENTATIONS[lang], text: 'Mekko Graphics, Efficient Elements', href: '/products#presentations', cat: true },
        ...Object.entries(CATEGORIES).map(([key, label]) => ({
          icon: CAT_ICONS[key],
          title: label[lang],
          text: PRODUCTS.filter((p) => p.category === key).map((p) => p.name).join(', '),
          href: `/products#${key}`,
          cat: true, // category titles in capitals, like on /products
        })),
        { icon: Cubes, title: s.all[0], text: s.all[1], href: '/products' },
      ],
    },
    {
      label: s.partners,
      items: [
        { icon: Handshake, title: s.vendors[0], text: s.vendors[1], href: '/products' },
        { icon: Cubes, title: s.become[0], text: s.become[1], href: '/partners' },
      ],
    },
    { label: s.about, href: '/about' },
    { label: s.contact, href: '/contact' },
  ],
})
const T = Object.fromEntries(LANGS.map((l) => [l, buildNav(l, S[l])]))

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
  const onDark = stripLang(pathname).replace(/\/+$/, '') === '/about'
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
