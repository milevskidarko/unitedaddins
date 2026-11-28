import { useRef } from 'react'
import Logo from './Logo.jsx'
import { L, useT } from '../i18n.jsx'
import { LinkedIn, Mail, Arrow, Check } from './Icons.jsx'
import { CATEGORIES, PRODUCTS } from '../products.js'
import './Footer.css'

// Every product with its own page, in the same order as /products.
const PRODUCT_LINKS = PRODUCTS.map((p) => [p.name, '/' + p.slug])
// Product categories (Documents & PDF, Design, Planning) → their section on /products, like the header menu.
const catLinks = (lang) => Object.entries(CATEGORIES).map(([key, label]) => [label[lang], '/products#' + key])

const SALES_EMAIL = 'salesemea@unitedaddins.com'

const T = {
  en: {
    ready: 'Ready when you are.',
    build: 'Let’s build',
    quote: 'your quote.',
    talk: 'Talk to our team',
    request: 'Send us your request',
    badge: 'Authorized Foxit & Mekko Graphics distributor',
    cols: [
      { title: 'Products', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Efficient Elements', '/efficient-elements'], ...PRODUCT_LINKS, ['All products', '/products']] },
      { title: 'Solutions', links: [['PDF editing', '/foxit'], ['eSign', '/foxit#esign'], ['Presentations', '/products#presentations'], ...catLinks('en'), ['Find your plan', '/foxit#plan'], ['Volume licensing', '/contact']] },
      { title: 'Company', links: [['About', '/about'], ['Partners', '/#partners'], ['Become a partner', '/partners'], ['Request a quote', '/contact']] },
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
    request: 'Anfrage senden',
    badge: 'Autorisierter Foxit- & Mekko-Graphics-Distributor',
    cols: [
      { title: 'Produkte', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Efficient Elements', '/efficient-elements'], ...PRODUCT_LINKS, ['Alle Produkte', '/products']] },
      { title: 'Lösungen', links: [['PDF-Bearbeitung', '/foxit'], ['eSign', '/foxit#esign'], ['Präsentationen', '/products#presentations'], ...catLinks('de'), ['Plan finden', '/foxit#plan'], ['Volumenlizenzen', '/contact']] },
      { title: 'Unternehmen', links: [['Über uns', '/about'], ['Partner', '/#partners'], ['Partner werden', '/partners'], ['Angebot anfordern', '/contact']] },
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
    request: 'Envoyer une demande',
    badge: 'Distributeur agréé Foxit et Mekko Graphics',
    cols: [
      { title: 'Produits', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Efficient Elements', '/efficient-elements'], ...PRODUCT_LINKS, ['Tous les produits', '/products']] },
      { title: 'Solutions', links: [['Édition PDF', '/foxit'], ['eSign', '/foxit#esign'], ['Présentations', '/products#presentations'], ...catLinks('fr'), ['Trouver votre offre', '/foxit#plan'], ['Licences en volume', '/contact']] },
      { title: 'Entreprise', links: [['À propos', '/about'], ['Partenaires', '/#partners'], ['Devenir partenaire', '/partners'], ['Demander un devis', '/contact']] },
    ],
    rights: 'Tous droits réservés.',
    legal: 'Tous les noms de produits sont des marques de leurs propriétaires respectifs.',
    top: 'Retour en haut',
    linkedin: 'United Addins sur LinkedIn',
  },
  es: {
    ready: 'Listos cuando usted lo esté.',
    build: 'Preparemos',
    quote: 'su presupuesto.',
    talk: 'Hable con nuestro equipo',
    request: 'Enviar una solicitud',
    badge: 'Distribuidor autorizado de Foxit y Mekko Graphics',
    cols: [
      { title: 'Productos', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Efficient Elements', '/efficient-elements'], ...PRODUCT_LINKS, ['Todos los productos', '/products']] },
      { title: 'Soluciones', links: [['Edición de PDF', '/foxit'], ['eSign', '/foxit#esign'], ['Presentaciones', '/products#presentations'], ...catLinks('es'), ['Encuentre su plan', '/foxit#plan'], ['Licencias por volumen', '/contact']] },
      { title: 'Empresa', links: [['Sobre nosotros', '/about'], ['Socios', '/#partners'], ['Hágase partner', '/partners'], ['Solicitar presupuesto', '/contact']] },
    ],
    rights: 'Todos los derechos reservados.',
    legal: 'Todos los nombres de productos son marcas comerciales de sus respectivos propietarios.',
    top: 'Volver arriba',
    linkedin: 'United Addins en LinkedIn',
  },
  nl: {
    ready: 'Klaar wanneer u dat bent.',
    build: 'Laten we',
    quote: 'uw offerte opstellen.',
    talk: 'Spreek met ons team',
    request: 'Aanvraag versturen',
    badge: 'Geautoriseerd distributeur van Foxit en Mekko Graphics',
    cols: [
      { title: 'Producten', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Efficient Elements', '/efficient-elements'], ...PRODUCT_LINKS, ['Alle producten', '/products']] },
      { title: 'Oplossingen', links: [['PDF bewerken', '/foxit'], ['eSign', '/foxit#esign'], ['Presentaties', '/products#presentations'], ...catLinks('nl'), ['Vind uw abonnement', '/foxit#plan'], ['Volumelicenties', '/contact']] },
      { title: 'Bedrijf', links: [['Over ons', '/about'], ['Partners', '/#partners'], ['Partner worden', '/partners'], ['Offerte aanvragen', '/contact']] },
    ],
    rights: 'Alle rechten voorbehouden.',
    legal: 'Alle productnamen zijn handelsmerken van hun respectieve eigenaars.',
    top: 'Terug naar boven',
    linkedin: 'United Addins op LinkedIn',
  },
  it: {
    ready: 'Pronti quando lo sei tu.',
    build: 'Prepariamo',
    quote: 'il tuo preventivo.',
    talk: 'Parla con il nostro team',
    request: 'Invia la tua richiesta',
    badge: 'Distributore autorizzato Foxit e Mekko Graphics',
    cols: [
      { title: 'Prodotti', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Efficient Elements', '/efficient-elements'], ...PRODUCT_LINKS, ['Tutti i prodotti', '/products']] },
      { title: 'Soluzioni', links: [['Modifica PDF', '/foxit'], ['eSign', '/foxit#esign'], ['Presentazioni', '/products#presentations'], ...catLinks('it'), ['Trova il tuo piano', '/foxit#plan'], ['Licenze multiple', '/contact']] },
      { title: 'Azienda', links: [['Chi siamo', '/about'], ['Partner', '/#partners'], ['Diventa partner', '/partners'], ['Richiedi un preventivo', '/contact']] },
    ],
    rights: 'Tutti i diritti riservati.',
    legal: 'Tutti i nomi dei prodotti sono marchi dei rispettivi proprietari.',
    top: 'Torna su',
    linkedin: 'United Addins su LinkedIn',
  },
  pl: {
    ready: 'Gotowi, kiedy Ty jesteś.',
    build: 'Przygotujmy',
    quote: 'Twoją wycenę.',
    talk: 'Porozmawiaj z naszym zespołem',
    request: 'Wyślij zapytanie',
    badge: 'Autoryzowany dystrybutor Foxit i Mekko Graphics',
    cols: [
      { title: 'Produkty', links: [['Foxit PDF Editor & eSign', '/foxit'], ['Mekko Graphics', '/mekko-graphics'], ['Efficient Elements', '/efficient-elements'], ...PRODUCT_LINKS, ['Wszystkie produkty', '/products']] },
      { title: 'Rozwiązania', links: [['Edycja PDF', '/foxit'], ['eSign', '/foxit#esign'], ['Prezentacje', '/products#presentations'], ...catLinks('pl'), ['Znajdź swój plan', '/foxit#plan'], ['Licencje grupowe', '/contact']] },
      { title: 'Firma', links: [['O nas', '/about'], ['Partnerzy', '/#partners'], ['Zostań partnerem', '/partners'], ['Poproś o wycenę', '/contact']] },
    ],
    rights: 'Wszelkie prawa zastrzeżone.',
    legal: 'Wszystkie nazwy produktów są znakami towarowymi ich właścicieli.',
    top: 'Do góry',
    linkedin: 'United Addins na LinkedIn',
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
            <L to="/contact#quote" className="footer__mail">
              <span className="footer__mail-ic"><Mail /></span>
              <span>
                <small>{t.talk}</small>
                <strong>{t.request}</strong>
              </span>
              <Arrow className="footer__mail-arrow" />
            </L>
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
