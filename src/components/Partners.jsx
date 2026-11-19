import { Arrow, Doc, Chart, Key, Check, Files, Ruler, Calendar } from './Icons.jsx'
import { L, useLang, useT } from '../i18n.jsx'
import { CATEGORIES, PRODUCTS } from '../products.js'
import './Partners.css'

// `needs` in T: PDF & eSign, data visualization, licensing. The product categories
// (Documents & PDF, Design, Planning) go in between and link to their section on /products.
const CAT_ICONS = { docs: Files, design: Ruler, plan: Calendar }

const T = {
  en: {
    title: 'Our trusted',
    accent: 'partners',
    // Confirmed by United Addins (Nov 2026): Foxit distributor since 2012.
    // case study. Partner tier (Gold/Platinum) is intentionally not stated until Foxit confirms it.
    cred: <>Authorized distributor for <strong>Foxit</strong> (since 2012) and <strong>Mekko Graphics</strong></>,
    label: 'Explore by need',
    needs: [
      ['PDF & eSign', 'Create, edit, protect and sign documents.'],
      ['Data visualization', 'Marimekko, Bar Mekko, waterfall and more.'],
      ['Licensing & renewals', 'New licenses, renewals, upgrades and added seats.'],
    ],
  },
  de: {
    title: 'Unsere starken',
    accent: 'Partner',
    cred: <>Autorisierter Distributor für <strong>Foxit</strong> (seit 2012) und <strong>Mekko Graphics</strong></>,
    label: 'Nach Bedarf entdecken',
    needs: [
      ['PDF & eSign', 'Dokumente erstellen, bearbeiten, schützen und signieren.'],
      ['Datenvisualisierung', 'Marimekko, Bar Mekko, Wasserfall und mehr.'],
      ['Lizenzen & Verlängerungen', 'Neue Lizenzen, Verlängerungen, Upgrades und Lizenzerweiterungen.'],
    ],
  },
  fr: {
    title: 'Nos partenaires',
    accent: 'de confiance',
    cred: <>Distributeur agréé <strong>Foxit</strong> (depuis 2012) et <strong>Mekko Graphics</strong></>,
    label: 'Explorer par besoin',
    needs: [
      ['PDF et eSign', 'Créer, modifier, protéger et signer des documents.'],
      ['Visualisation de données', 'Marimekko, Bar Mekko, cascade et plus.'],
      ['Licences et renouvellements', 'Nouvelles licences, renouvellements, mises à niveau et postes supplémentaires.'],
    ],
  },
  es: {
    title: 'Nuestros socios',
    accent: 'de confianza',
    cred: <>Distribuidor autorizado de <strong>Foxit</strong> (desde 2012) y <strong>Mekko Graphics</strong></>,
    label: 'Explorar por necesidad',
    needs: [
      ['PDF y eSign', 'Cree, edite, proteja y firme documentos.'],
      ['Visualización de datos', 'Marimekko, Bar Mekko, cascada y más.'],
      ['Licencias y renovaciones', 'Nuevas licencias, renovaciones, actualizaciones y puestos adicionales.'],
    ],
  },
  nl: {
    title: 'Onze vertrouwde',
    accent: 'partners',
    cred: <>Geautoriseerd distributeur van <strong>Foxit</strong> (sinds 2012) en <strong>Mekko Graphics</strong></>,
    label: 'Ontdek per behoefte',
    needs: [
      ['PDF en eSign', 'Documenten maken, bewerken, beveiligen en ondertekenen.'],
      ['Datavisualisatie', 'Marimekko, Bar Mekko, watervaldiagrammen en meer.'],
      ['Licenties en verlengingen', 'Nieuwe licenties, verlengingen, upgrades en extra gebruikers.'],
    ],
  },
}

export default function Partners() {
  const t = useT(T)
  const lang = useLang()
  const [pdf, dataviz, licensing] = t.needs
  const cards = [
    [Doc, '/foxit', ...pdf],
    [Chart, '/mekko-graphics', ...dataviz],
    ...Object.entries(CATEGORIES).map(([key, label]) => [
      CAT_ICONS[key],
      `/products#${key}`,
      label[lang] || label.en,
      PRODUCTS.filter((p) => p.category === key).map((p) => p.name).join(', '),
    ]),
    [Key, '/contact', ...licensing],
  ]
  return (
    <section className="partners" id="partners">
      <div className="container">
        <div className="partners__card" data-reveal>
          <div className="partners__brands">
            <h2 className="partners__title">{t.title}<br /><span className="accent grad-text">{t.accent}</span></h2>
            <div className="partners__logos">
              {/* Official logos as published on foxit.com and mekkographics.com (Nov 2026). Mekko: main
                  lockup only, without the "an insightsoftware company" tagline. */}
              <L to="/foxit" className="brand brand--foxit">
                <img src="/partners/foxit.svg" alt="Foxit" width="125" height="52" />
              </L>
              <L to="/mekko-graphics" className="brand brand--mekko">
                <img src="/partners/mekko-graphics.svg" alt="Mekko Graphics" width="326" height="68" />
              </L>
            </div>
            <p className="partners__cred">
              <Check />
              <span>{t.cred}</span>
            </p>
          </div>

          <div className="partners__needs">
            <p className="partners__label">{t.label}</p>
            <div className="needs">
              {cards.map(([Icon, href, title, text], i) => {
                return (
                  <L key={href} to={href} className="need spot" data-reveal style={{ '--d': `${0.1 + i * 0.06}s` }}>
                    <span className="need__icon"><Icon /></span>
                    <span className="need__body">
                      <strong>{title}</strong>
                      <small>{text}</small>
                    </span>
                    <Arrow className="need__arrow" />
                  </L>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
