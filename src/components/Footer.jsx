import { useRef } from 'react'
import Logo from './Logo.jsx'
import { L, useT } from '../i18n.jsx'
import { LinkedIn, Mail, Arrow, Check } from './Icons.jsx'
import './Footer.css'

const SALES_EMAIL = 'sales@unitedaddins.com'

const T = {
  en: {
    ready: 'Ready when you are.',
    build: 'Let’s build',
    quote: 'your quote.',
    talk: 'Talk to our team',
    badge: 'Authorized Foxit & Mekko Graphics distributor',
    cols: [
      { title: 'Products', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Bluebeam Revu', '/bluebeam'], ['SketchUp', '/sketchup'], ['All products', '/products']] },
      { title: 'Solutions', links: [['PDF & eSign', '/foxit'], ['Data visualization', '/mekko-graphics'], ['Find your plan', '/foxit#plan'], ['Volume licensing', '/contact']] },
      { title: 'Company', links: [['About', '/about'], ['Partners', '/#partners'], ['Request a quote', '/contact']] },
    ],
    rights: 'All rights reserved.',
    legal: 'All product names are trademarks of their respective owners.',
    top: 'Back to top',
    linkedin: 'United Addins on LinkedIn',
  },
  de: {
    ready: 'Bereit, wenn Sie es sind.',
    build: 'Stellen wir',
    quote: 'Ihr Angebot zusammen.',
    talk: 'Sprechen Sie mit uns',
    badge: 'Autorisierter Foxit- & Mekko-Graphics-Distributor',
    cols: [
      { title: 'Produkte', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Bluebeam Revu', '/bluebeam'], ['SketchUp', '/sketchup'], ['Alle Produkte', '/products']] },
      { title: 'Lösungen', links: [['PDF & eSign', '/foxit'], ['Datenvisualisierung', '/mekko-graphics'], ['Plan finden', '/foxit#plan'], ['Volumenlizenzen', '/contact']] },
      { title: 'Unternehmen', links: [['Über uns', '/about'], ['Partner', '/#partners'], ['Angebot anfordern', '/contact']] },
    ],
    rights: 'Alle Rechte vorbehalten.',
    legal: 'Alle Produktnamen sind Marken ihrer jeweiligen Inhaber.',
    top: 'Nach oben',
    linkedin: 'United Addins auf LinkedIn',
  },
  fr: {
    ready: 'Prêts quand vous l’êtes.',
    build: 'Composons',
    quote: 'votre devis.',
    talk: 'Parlez à notre équipe',
    badge: 'Distributeur agréé Foxit et Mekko Graphics',
    cols: [
      { title: 'Produits', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Bluebeam Revu', '/bluebeam'], ['SketchUp', '/sketchup'], ['Tous les produits', '/products']] },
      { title: 'Solutions', links: [['PDF et eSign', '/foxit'], ['Visualisation de données', '/mekko-graphics'], ['Trouver votre offre', '/foxit#plan'], ['Licences en volume', '/contact']] },
      { title: 'Entreprise', links: [['À propos', '/about'], ['Partenaires', '/#partners'], ['Demander un devis', '/contact']] },
    ],
    rights: 'Tous droits réservés.',
    legal: 'Tous les noms de produits sont des marques de leurs propriétaires respectifs.',
    top: 'Retour en haut',
    linkedin: 'United Addins sur LinkedIn',
  },
}

export default function Footer() {
  const t = useT(T)
  const mega = useRef(null)

  // The giant wordmark lights up under the cursor.
  const onMove = (e) => {
    const el = mega.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <footer className="footer" onPointerMove={onMove}>
      <span className="footer__glow" aria-hidden="true" />
      <div className="container">
        {/* Statement + direct contact */}
        <div className="footer__cta">
          <p className="footer__statement">
            {t.ready}
            <br />
            {t.build} <L to="/contact#quote" className="accent grad-text">{t.quote}</L>
          </p>
          <div className="footer__cta-actions">
            <a href={`mailto:${SALES_EMAIL}`} className="footer__mail">
              <span className="footer__mail-ic"><Mail /></span>
              <span>
                <small>{t.talk}</small>
                <strong>{SALES_EMAIL}</strong>
              </span>
              <Arrow className="footer__mail-arrow" />
            </a>
          </div>
        </div>

        <div className="footer__top">
          <div className="footer__brand">
            <Logo tagline light />
            <p className="footer__badge">
              <Check /> {t.badge}
            </p>
            <div className="footer__social">
              <a
                href="https://www.linkedin.com/company/united-addins/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.linkedin}
              >
                <LinkedIn />
              </a>
              <a href={`mailto:${SALES_EMAIL}`} aria-label={`Email ${SALES_EMAIL}`}><Mail /></a>
            </div>
          </div>
          {t.cols.map((c) => (
            <nav key={c.title} className="footer__col" aria-label={c.title}>
              <h3>{c.title}</h3>
              <ul>
                {c.links.map(([l, h]) => (
                  <li key={l}>
                    <L to={h}><span>{l}</span></L>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} United Addins. {t.rights}</p>
          <p className="footer__legal">{t.legal}</p>
          <button
            type="button"
            className="footer__top-btn"
            aria-label={t.top}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Arrow />
          </button>
        </div>
      </div>
      <div className="footer__mega" ref={mega} aria-hidden="true">United Addins</div>
      <span className="noise" aria-hidden="true" />
    </footer>
  )
}
