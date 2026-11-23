import { L, useLang, useT } from '../i18n.jsx'
import { Arrow } from '../components/Icons.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { CATEGORIES, PRODUCTS } from '../products.js'
import '../components/Products.css'

const T = {
  en: {
    eyebrow: 'Products',
    title: 'Software we',
    accent: 'license & support',
    lead: 'From PDF and eSign to CAD, diagrams and project planning — one partner for licensing, renewals and advice.',
    featured: 'Our core partners',
    foxit: 'PDF Editor, PDF Editor+ and eSign — distributor since 2012.',
    mekko: 'Marimekko, Bar Mekko and more in PowerPoint & Excel.',
    presentations: 'Presentations',
    ee: 'Agendas, Harvey balls, alignment and slide checks in PowerPoint.',
    help: 'Not sure which product fits?',
    helpCta: 'Ask our team',
    legal: 'All product names are trademarks of their respective owners.',
  },
  de: {
    eyebrow: 'Produkte',
    title: 'Software, die wir',
    accent: 'lizenzieren & betreuen',
    lead: 'Von PDF und eSign über CAD und Diagramme bis zur Projektplanung — ein Partner für Lizenzen, Verlängerungen und Beratung.',
    featured: 'Unsere Kernpartner',
    foxit: 'PDF Editor, PDF Editor+ und eSign — Distributor seit 2012.',
    mekko: 'Marimekko, Bar Mekko und mehr in PowerPoint & Excel.',
    presentations: 'Präsentationen',
    ee: 'Agenden, Harvey Balls, Ausrichtung und Folienprüfung in PowerPoint.',
    help: 'Unsicher, welches Produkt passt?',
    helpCta: 'Fragen Sie unser Team',
    legal: 'Alle Produktnamen sind Marken ihrer jeweiligen Inhaber.',
  },
  fr: {
    eyebrow: 'Produits',
    title: 'Les logiciels que nous',
    accent: 'proposons et accompagnons',
    lead: 'Du PDF et de la signature électronique à la CAO, aux diagrammes et à la gestion de projets — un seul partenaire pour les licences, les renouvellements et le conseil.',
    featured: 'Nos partenaires principaux',
    foxit: 'PDF Editor, PDF Editor+ et eSign — distributeur depuis 2012.',
    mekko: 'Marimekko, Bar Mekko et plus dans PowerPoint et Excel.',
    presentations: 'Présentations',
    ee: 'Agendas, Harvey balls, alignement et vérification des diapositives dans PowerPoint.',
    help: 'Vous ne savez pas quel produit choisir ?',
    helpCta: 'Demandez à notre équipe',
    legal: 'Tous les noms de produits sont des marques de leurs propriétaires respectifs.',
  },
  es: {
    eyebrow: 'Productos',
    title: 'Software que',
    accent: 'licenciamos y respaldamos',
    lead: 'Desde PDF y firma electrónica hasta CAD, diagramas y planificación de proyectos — un solo socio para licencias, renovaciones y asesoramiento.',
    featured: 'Nuestros socios principales',
    foxit: 'PDF Editor, PDF Editor+ y eSign — distribuidor desde 2012.',
    mekko: 'Marimekko, Bar Mekko y más en PowerPoint y Excel.',
    presentations: 'Presentaciones',
    ee: 'Agendas, Harvey balls, alineación y revisión de diapositivas en PowerPoint.',
    help: '¿No sabe qué producto le conviene?',
    helpCta: 'Pregunte a nuestro equipo',
    legal: 'Todos los nombres de productos son marcas comerciales de sus respectivos propietarios.',
  },
  nl: {
    eyebrow: 'Producten',
    title: 'Software die wij',
    accent: 'leveren en ondersteunen',
    lead: 'Van PDF en e-handtekening tot CAD, diagrammen en projectplanning — één partner voor licenties, verlengingen en advies.',
    featured: 'Onze kernpartners',
    foxit: 'PDF Editor, PDF Editor+ en eSign — distributeur sinds 2012.',
    mekko: 'Marimekko, Bar Mekko en meer in PowerPoint en Excel.',
    presentations: 'Presentaties',
    ee: 'Agenda’s, Harvey balls, uitlijnen en diacontrole in PowerPoint.',
    help: 'Weet u niet welk product past?',
    helpCta: 'Vraag het ons team',
    legal: 'Alle productnamen zijn handelsmerken van hun respectieve eigenaars.',
  },
}

// Foxit and Mekko Graphics keep their own pages; shown here as cards like the others.
const FOXIT = { name: 'Foxit PDF Editor & eSign', vendor: 'Foxit', tone: '#ff5f1f', mark: 'Fx' }
const MEKKO = { name: 'Mekko Graphics', vendor: 'Mekko Graphics', tone: '#121e4d', mark: 'MG' }
const EE = { name: 'Efficient Elements', vendor: 'Efficient Elements GmbH', tone: '#0f8f7e', mark: 'EE' }

export default function ProductsPage() {
  const t = useT(T)
  const lang = useLang()

  return (
    <div className="page">
      <section className="section prod prod--list">
        <span className="prod__glow" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow" data-reveal>{t.eyebrow}</span>
          <h1 className="section-title" data-reveal style={{ '--d': '0.06s' }}>
            {t.title} <span className="accent grad-text">{t.accent}</span>
          </h1>
          <p className="section-lead" data-reveal style={{ '--d': '0.12s' }}>{t.lead}</p>

          <h2 className="prod__h2" data-reveal>{t.featured}</h2>
          <div className="pgrid pgrid--featured">
            <ProductCard product={FOXIT} href="/foxit" text={t.foxit} />
            <ProductCard product={MEKKO} href="/mekko-graphics" text={t.mekko} delay={0.06} />
          </div>

          {/* Efficient Elements has its own page but is not a core partner: own section under Foxit and Mekko. */}
          <div id="presentations" className="pcat">
            <h2 className="prod__h2" data-reveal>{t.presentations}</h2>
            <div className="pgrid">
              <ProductCard product={EE} href="/efficient-elements" text={t.ee} />
            </div>
          </div>

          {Object.entries(CATEGORIES).map(([key, label]) => (
            <div key={key} id={key} className="pcat">
              <h2 className="prod__h2" data-reveal>{label[lang] || label.en}</h2>
              <div className="pgrid">
                {PRODUCTS.filter((p) => p.category === key).map((p, i) => (
                  <ProductCard key={p.slug} product={p} href={`/${p.slug}`} text={(p[lang] || p.en).tagline} delay={i * 0.06} />
                ))}
              </div>
            </div>
          ))}

          <div className="prod__help" data-reveal>
            <strong>{t.help}</strong>
            <L to="/contact#quote" className="btn btn-primary btn-sm">{t.helpCta} <Arrow /></L>
          </div>
          <p className="prod__tm">{t.legal}</p>
        </div>
      </section>
    </div>
  )
}
