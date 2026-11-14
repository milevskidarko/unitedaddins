import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { Arrow, Chevron, Menu, Close, Doc, Chart, Cubes, Key, Headset, Handshake } from './Icons.jsx'
import './Header.css'

const NAV = [
  {
    label: 'Products',
    items: [
      { icon: Doc, title: 'Foxit PDF Editor', text: 'Edit, create and manage PDFs', href: '#foxit' },
      { icon: Chart, title: 'Mekko Graphics', text: 'Charts in PowerPoint & Excel', href: '#mekko' },
      { icon: Cubes, title: 'Business software', text: 'Curated tools for every team', href: '#partners' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { icon: Doc, title: 'PDF & eSign', text: 'Paperless, secure workflows', href: '#foxit' },
      { icon: Chart, title: 'Data visualization', text: 'Consulting-grade charts', href: '#mekko' },
      { icon: Key, title: 'Find your plan', text: '3 questions, the right Foxit plan', href: '#plan' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { icon: Handshake, title: 'Our vendors', text: 'Foxit, Mekko Graphics & more', href: '#partners' },
      // The quote form requires a product, so partnership inquiries go by email instead.
      {
        icon: Cubes,
        title: 'Become a partner',
        text: 'Grow with United Addins',
        href: 'mailto:sales@unitedaddins.com?subject=Partnership%20inquiry',
      },
    ],
  },
  { label: 'About', href: '#why' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`} id="top">
      <div className="container header__inner">
        <Logo />

        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            {NAV.map((n) => (
              <li key={n.label} className={`nav__item ${n.items ? 'has-drop' : ''}`}>
                {n.items ? (
                  <>
                    <button className="nav__link" aria-haspopup="true">
                      {n.label} <Chevron className="nav__chev" />
                    </button>
                    <div className="drop">
                      <div className="drop__panel">
                        {n.items.map((it) => (
                          <a key={it.title} href={it.href} className="drop__item">
                            <span className="drop__icon"><it.icon /></span>
                            <span>
                              <strong>{it.title}</strong>
                              <small>{it.text}</small>
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a className="nav__link" href={n.href}>{n.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a href="#contact" className="btn btn-primary btn-sm header__cta">
            Contact Sales <Arrow />
          </a>
          <button
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer — rendered outside <header>: the header's backdrop-filter
          would otherwise become the containing block of this fixed element. */}
      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
        <div className="drawer__body">
          {NAV.map((n, i) => (
            <div key={n.label} className={`drawer__group ${expanded === i ? 'is-open' : ''}`}>
              {n.items ? (
                <>
                  <button className="drawer__link" onClick={() => setExpanded(expanded === i ? null : i)}>
                    {n.label} <Chevron />
                  </button>
                  <div className="drawer__sub">
                    <div>
                      {n.items.map((it) => (
                        <a key={it.title} href={it.href} onClick={close} className="drawer__subitem">
                          <span className="drop__icon"><it.icon /></span>
                          <span>
                            <strong>{it.title}</strong>
                            <small>{it.text}</small>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a className="drawer__link" href={n.href} onClick={close}>{n.label}</a>
              )}
            </div>
          ))}
          <a href="#contact" onClick={close} className="btn btn-primary drawer__cta">
            Contact Sales <Arrow />
          </a>
          <a href="#contact" onClick={close} className="drawer__support">
            <Headset /> Need help? Talk to our team
          </a>
        </div>
      </div>
    </>
  )
}
